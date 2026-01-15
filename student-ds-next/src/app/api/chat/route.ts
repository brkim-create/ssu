import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// System Prompt 정의
const SYSTEM_PROMPT = `당신은 수성대학교 학사 규정 및 민원 안내 챗봇입니다.

역할:
- 학생들의 학사 관련 질문에 친절하고 명확하게 답변합니다.
- 장학금, 수강신청, 휴/복학, 졸업요건 등 학사 전반에 대해 안내합니다.
- 정확한 정보를 모를 경우, 담당 부서 연락처를 안내합니다.

답변 스타일:
- 존댓말을 사용합니다.
- 간결하고 핵심적인 정보를 먼저 제공합니다.
- 필요시 추가 문의처를 안내합니다.

주요 연락처:
- 교학팀: 02-1234-5683 (학적, 수강, 성적)
- 학생처: 02-1234-5678 (장학금)
- 생활관리팀: 02-1234-5679 (기숙사)
- 복지팀: 02-1234-5680 (학생식당, 편의시설)`;

// 채팅 히스토리 타입 정의
interface ChatHistoryItem {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    // 환경변수 확인
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // 메시지 유효성 검사
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "메시지가 필요합니다." },
        { status: 400 }
      );
    }

    // Google Generative AI 클라이언트 초기화
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // 대화 히스토리 구성 (API 규칙: 첫 메시지는 user여야 함)
    const chatHistory: ChatHistoryItem[] = [];

    // 전달받은 히스토리 추가 (유효한 것만)
    if (Array.isArray(history)) {
      for (const item of history) {
        if (
          item &&
          item.role &&
          item.parts &&
          Array.isArray(item.parts) &&
          item.parts.length > 0
        ) {
          chatHistory.push({
            role: item.role as "user" | "model",
            parts: item.parts,
          });
        }
      }
    }

    // 채팅 세션 시작
    const chat = model.startChat({
      history: chatHistory,
    });

    // 메시지 전송 및 응답 수신
    const result = await chat.sendMessage(message);
    const response = result.response;
    const reply = response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini Chat API Error:", error);

    // 에러 타입에 따른 응답
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "챗봇 응답 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
