// ============================================================
// FAQ Types
// Prisma Model: FAQ, FAQScenario
// ============================================================

// FAQ (student-ds)
export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

// FAQ 시나리오 (admin-ds)
export interface FAQScenario {
  id: number;
  category: string;
  question: string;
  answer: string;
}
