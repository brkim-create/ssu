// ============================================================
// User & Student Types
// Prisma Model: User, Student, UserProfile
// ============================================================

// 학생 역량 점수 (professor-ds)
export interface StudentCompetency {
  S: number;
  T: number;
  A: number;
  R: number;
}

// 학생 기본 정보 (professor-ds, admin-ds 공통)
export interface Student extends StudentCompetency {
  id: number;
  name: string;
  studentId: string;
  dept: string;
}

// 사용자 프로필 (student-ds)
export interface UserProfile {
  department: string;
  grade: string;
  email: string;
}

// 관리자 사용자 (admin-ds)
export interface AdminUser {
  id: number;
  name: string;
  dept: string;
  role: '슈퍼관리자' | '일반관리자';
  status: '활성' | '비활성';
}

// 별칭 (원본 호환)
export type UserData = AdminUser;

// 로그인 이력
export interface LoginHistory {
  date: string;
  time: string;
  device: string;
}
