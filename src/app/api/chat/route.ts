import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// System Prompt 생성 함수
const createSystemPrompt = (category?: string) => `당신은 '수성대학교 학생종합지원프로그램(AI-DX Observer)'의 AI 상담 챗봇입니다.
현재 사용자가 선택한 문의 카테고리는 '${category || "일반"}'입니다.

[지침]
1. 학생에게 친절하고 정중하게 존댓말로 답변하세요. (이모지 활용 가능 😊)
2. 답변은 읽기 편하게 핵심 내용을 먼저 말하고, 필요하면 불렛 포인트(•)로 정리하세요.
3. 규정에 없는 내용을 지어내지 마세요. 모르는 내용은 "학생처(053-XXX-XXXX)로 문의 부탁드립니다"라고 안내하세요.
4. 사용자가 불만이나 고충을 이야기하면 공감하는 멘트를 먼저 해주세요.
5. 답변은 간결하게 300자 이내로 작성하세요.`;

// 채팅 히스토리 타입 정의
interface ChatHistoryItem {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function POST(request: NextRequest) {
  try {
    const { message, history, category } = await request.json();

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
      model: "gemini-2.5-flash",
      systemInstruction: createSystemPrompt(category),
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "챗봇 응답 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
