// ============================================================
// Chatbot Types
// Prisma Model: ChatMessage, ChatbotTemplate
// ============================================================

// 채팅 메시지
export interface ChatMessage {
  type: 'bot' | 'user';
  message: string;
}

// 챗봇 응답 템플릿
export interface ChatbotAnswerTemplate {
  [key: string]: string;
}

// 복지 응답 템플릿
export interface WelfareAnswerTemplate {
  [facility: string]: {
    [inquiryType: string]: string;
  };
}
