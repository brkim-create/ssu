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

// 학생 하위역량(PO) 점수 (professor-ds)
export interface StudentPOScore {
  창의적문제해결: number;
  융복합적사고: number;
  전문지식: number;
  미래혁신: number;
  리더십: number;
  공동체의식: number;
  자기계발: number;
  의사소통: number;
  글로컬시민: number;
}

// 학생 기본 정보 (professor-ds, admin-ds 공통)
export interface Student extends StudentCompetency {
  id: number;
  name: string;
  studentId: string;
  dept: string;
  PO?: StudentPOScore;  // 하위역량 점수 (선택적)
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

// 현재 로그인한 학생 프로필 (student-ds)
export interface StudentProfile {
  name: string;
  department: string;
  grade: string;
  studentId: string;
  totalScore: number;
}

// 앱 설정 (student-ds)
export interface AppConfig {
  shareBaseUrl: string;
}
