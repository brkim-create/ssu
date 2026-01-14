// supabase/functions/gemini-chat/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // 1. CORS 처리 (브라우저 접근 허용)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 2. 프론트엔드에서 보낸 데이터 받기
    const { message, category, history } = await req.json();

    // 3. API Key 설정 (Supabase Secrets에서 가져옴)
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY가 설정되지 않았습니다.');
    }

    // 4. Gemini 모델 초기화
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 5. 시스템 프롬프트 (AI의 페르소나 및 규칙 설정)
    const systemPrompt = `
      당신은 '수성대학교 학생종합지원프로그램(AI-DX Observer)'의 AI 상담 챗봇입니다.
      현재 사용자가 선택한 문의 카테고리는 '${category || '일반'}'입니다.
      
      [지침]
      1. 학생에게 친절하고 정중하게 존댓말로 답변하세요. (이모지 활용 가능 😊)
      2. 답변은 읽기 편하게 핵심 내용을 먼저 말하고, 필요하면 불렛 포인트(•)로 정리하세요.
      3. 규정에 없는 내용을 지어내지 마세요. 모르는 내용은 "학생처(053-XXX-XXXX)로 문의 부탁드립니다"라고 안내하세요.
      4. 사용자가 불만이나 고충을 이야기하면 공감하는 멘트를 먼저 해주세요.
    `;

    // 6. 대화 생성 및 전송
    const chat = model.startChat({
      history: history || [], // 이전 대화 문맥 유지
    });

    // 시스템 프롬프트와 사용자 메시지를 결합하여 전송
    const finalMessage = `${systemPrompt}\n\n사용자 질문: ${message}`;
    const result = await chat.sendMessage(finalMessage);
    const response = result.response;
    const text = response.text();

    // 7. 결과 반환
    return new Response(JSON.stringify({ reply: text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});