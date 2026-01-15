// supabase/functions/gemini-chat/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.21.0";

// CORS 헤더 설정 (모든 도메인 허용)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400', // 24시간 캐시
};

serve(async (req: Request) => {
  // 1. Preflight (OPTIONS) 요청 처리 - 브라우저 CORS 검사
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // 2. 요청 본문 파싱
    const { message, category, history } = await req.json();

    // 3. 입력 검증
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: '메시지가 필요합니다.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 4. API Key 확인
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      console.error('GEMINI_API_KEY가 설정되지 않았습니다.');
      return new Response(
        JSON.stringify({ error: '서버 설정 오류입니다. 관리자에게 문의하세요.' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 5. Gemini 모델 초기화
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 6. 시스템 프롬프트 (AI 페르소나 및 규칙)
    const systemPrompt = `
당신은 '수성대학교 학생종합지원프로그램(AI-DX Observer)'의 AI 상담 챗봇입니다.
현재 사용자가 선택한 문의 카테고리는 '${category || '일반'}'입니다.

[지침]
1. 학생에게 친절하고 정중하게 존댓말로 답변하세요. (이모지 활용 가능 😊)
2. 답변은 읽기 편하게 핵심 내용을 먼저 말하고, 필요하면 불렛 포인트(•)로 정리하세요.
3. 규정에 없는 내용을 지어내지 마세요. 모르는 내용은 "학생처(053-XXX-XXXX)로 문의 부탁드립니다"라고 안내하세요.
4. 사용자가 불만이나 고충을 이야기하면 공감하는 멘트를 먼저 해주세요.
5. 답변은 간결하게 300자 이내로 작성하세요.
    `.trim();

    // 7. 대화 생성 및 전송
    const chat = model.startChat({
      history: history || [],
    });

    const finalMessage = `${systemPrompt}\n\n사용자 질문: ${message}`;
    const result = await chat.sendMessage(finalMessage);
    const response = result.response;
    const text = response.text();

    // 8. 성공 응답 반환
    return new Response(
      JSON.stringify({ reply: text }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: unknown) {
    // 9. 에러 핸들링 (CORS 헤더 포함)
    console.error('Gemini Chat Error:', error);

    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

    return new Response(
      JSON.stringify({
        error: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        code: errorMessage
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
