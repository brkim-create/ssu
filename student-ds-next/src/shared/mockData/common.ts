// ============================================================
// Common Constants & Utilities
// Shared across all projects
// ============================================================

// STAR 역량 색상
export const COMPETENCY_COLORS = {
  S: '#E94E3C', // 창의
  T: '#F7941D', // 실무
  A: '#C13584', // 인성
  R: '#5B51D8', // 소통
} as const;

// STAR 역량 이름
export const COMPETENCY_NAMES = {
  S: '창의역량',
  T: '실무역량',
  A: '인성역량',
  R: '소통역량',
} as const;

// STAR 역량 영문명
export const COMPETENCY_NAMES_EN = {
  S: 'Self-directed',
  T: 'Teamwork',
  A: 'Analytical',
  R: 'Relational',
} as const;

// 역량 등급
export const COMPETENCY_GRADES = ['마스터', '우수', '보통', '노력요망'] as const;

// 역량 등급별 색상
export const GRADE_COLORS = {
  마스터: '#E94E3C',
  우수: '#F7941D',
  보통: '#4A90E2',
  노력요망: '#9CA3AF',
} as const;

// 민원 상태
export const COMPLAINT_STATUS = {
  RECEIVED: '접수',
  PROCESSING: '처리중',
  COMPLETED: '완료',
  REJECTED: '반려됨',
} as const;

// 민원 상태별 색상
export const STATUS_COLORS = {
  접수: '#4A90E2',
  처리중: '#F7941D',
  완료: '#10B981',
  반려됨: '#EF4444',
} as const;

// 우선순위
export const PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

// 우선순위별 색상
export const PRIORITY_COLORS = {
  high: '#EF4444',
  medium: '#F7941D',
  low: '#9CA3AF',
} as const;

// 민원 카테고리
export const COMPLAINT_CATEGORIES = [
  '시설 및 환경',
  '학생 장학',
  '학생 복지',
  '수업 및 학사',
] as const;

// 역할
export const USER_ROLES = {
  SUPER_ADMIN: '슈퍼관리자',
  ADMIN: '일반관리자',
  PROFESSOR: '교수',
  STUDENT: '학생',
} as const;

// 학기
export const SEMESTERS = ['2025-1', '2024-2', '2024-1', '2023-2'] as const;

// 학년
export const GRADES = ['1학년', '2학년', '3학년', '4학년'] as const;
