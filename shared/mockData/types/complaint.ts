// ============================================================
// Complaint / Ticket Types
// Prisma Model: Complaint, TicketReply, ComplaintCategory
// ============================================================

// 민원 상태
export type ComplaintStatus = '접수' | '처리중' | '완료' | '반려됨';

// 민원 우선순위
export type ComplaintPriority = 'high' | 'medium' | 'low';

// 민원 첨부파일
export interface ComplaintAttachment {
  id: number;
  name: string;
  size: string;
  url: string;
}

// 민원 카테고리 (student-ds)
export interface ComplaintCategory {
  id: number;
  icon: string;
  name: string;
  items: string[];
  color: string;
}

// 민원 (student-ds 관점)
export interface Complaint {
  id: number;
  studentId: string;
  title: string;
  status: '접수' | '처리중' | '완료';
  date: string;
  category: string;
  content: string;
  currentStep?: number;
  department?: string;
  assignee?: string;
  adminResponse?: string;
  responseDate?: string;
  attachments?: ComplaintAttachment[];
  isRead: boolean;
  isRated: boolean;
  rating?: number;
}

// 티켓 답변 (admin-ds)
export interface TicketReply {
  content: string;
  author: string;
  date: string;
}

// 티켓 (admin-ds 관점)
export interface Ticket {
  id: number;
  title: string;
  category: string;
  status: ComplaintStatus;
  date: string;
  author: string;
  priority: ComplaintPriority;
  assignee: string | null;
  replies: TicketReply[];
  draftReply: string | null;
  rejectedReason: string | null;
}

// 템플릿 (admin-ds)
export interface Template {
  id: number;
  category: string;
  title: string;
  content: string;
}

// 카테고리 통계 (admin-ds)
export interface CategoryStat {
  name: string;
  value: number;
  color: string;
}

// 처리 속도 데이터 (admin-ds)
export interface SpeedDataItem {
  day: string;
  time: number;
}

// 키워드 데이터 (admin-ds)
export interface KeywordItem {
  word: string;
  size: string;
  weight: string;
}
