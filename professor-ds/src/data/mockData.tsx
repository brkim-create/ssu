// ============================================================
// Professor Dashboard Mock Data
// Supabase 연동을 위한 순수 데이터 파일 (컴포넌트/로직 제외)
// ============================================================

// ============================================================
// Type Definitions (Supabase 스키마 매칭용)
// ============================================================

export interface HistogramDataItem {
  range: string;
  students: number;
}

export interface AssessmentDataItem {
  name: string;
  S: number;
  T: number;
  A: number;
  R: number;
}

export interface ConcernStudent {
  id: number;
  name: string;
  competency: 'S' | 'T' | 'A' | 'R';
  score: number;
  threshold: number;
  level: 'danger' | 'warning';
}

export interface WeakArea {
  area: string;
  score: number;
}

export interface PerformanceReport {
  achievementRate: number;
  yearlyImprovement: number;
  weakAreas: WeakArea[];
}

export interface TeachingMethod {
  method: string;
  score: number;
}

export interface Course {
  id: number;
  name: string;
  students: number;
  semester: string;
  competency: 'S' | 'T' | 'A' | 'R';
}

export interface StudentCompetency {
  S: number;
  T: number;
  A: number;
  R: number;
}

export interface Student extends StudentCompetency {
  id: number;
  name: string;
  studentId: string;
  dept: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface RadarDataItem {
  subject: string;
  myScore: number;
  deptAvg: number;
  totalAvg: number;
}

// ============================================================
// Mock Data
// ============================================================

// 교과목 역량 성취도 히스토그램 데이터
export const histogramData: HistogramDataItem[] = [
  { range: '0-20', students: 2 },
  { range: '21-40', students: 5 },
  { range: '41-60', students: 12 },
  { range: '61-80', students: 28 },
  { range: '81-100', students: 18 },
];

// 평가 도구별 분석 데이터
export const assessmentData: AssessmentDataItem[] = [
  { name: '중간고사', S: 75, T: 82, A: 78, R: 71 },
  { name: '기말고사', S: 78, T: 85, A: 80, R: 74 },
  { name: '과제', S: 85, T: 88, A: 90, R: 82 },
  { name: '출석', S: 92, T: 90, A: 95, R: 88 },
];

// 관심(위험) 학생 데이터
export const concernStudents: ConcernStudent[] = [
  { id: 1, name: '김민수', competency: 'T', score: 65, threshold: 70, level: 'danger' },
  { id: 2, name: '이지은', competency: 'S', score: 62, threshold: 70, level: 'danger' },
  { id: 3, name: '박지훈', competency: 'A', score: 68, threshold: 70, level: 'danger' },
  { id: 4, name: '최서영', competency: 'R', score: 64, threshold: 70, level: 'danger' },
  { id: 5, name: '이민재', competency: 'A', score: 72, threshold: 70, level: 'warning' },
  { id: 6, name: '강수진', competency: 'T', score: 71, threshold: 70, level: 'warning' },
  { id: 7, name: '조현우', competency: 'S', score: 73, threshold: 70, level: 'warning' },
];

// 성과 분석 리포트 데이터
export const performanceReport: PerformanceReport = {
  achievementRate: 87,
  yearlyImprovement: 5.2,
  weakAreas: [
    { area: 'R (소통)', score: 73.5 },
    { area: 'S (창의)', score: 76.2 },
    { area: 'T (실무)', score: 80.1 },
  ],
};

// 교수법 성과 진단 데이터
export const teachingMethodData: TeachingMethod[] = [
  { method: 'PBL', score: 82.5 },
  { method: 'Flipped Learning', score: 79.3 },
  { method: '강의식', score: 74.1 },
  { method: '토론식', score: 77.8 },
];

// 개설 과목 데이터
export const courses: Course[] = [
  { id: 1, name: '자료구조', students: 65, semester: '2025-1', competency: 'T' },
  { id: 2, name: '알고리즘', students: 58, semester: '2025-1', competency: 'S' },
  { id: 3, name: '소프트웨어공학', students: 42, semester: '2025-1', competency: 'T' },
];

// 학생 목록 데이터
export const studentList: Student[] = [
  { id: 1, name: '김민수', studentId: '202012345', dept: '컴퓨터공학과', S: 85, T: 65, A: 78, R: 72 },
  { id: 2, name: '이지은', studentId: '202012346', dept: '컴퓨터공학과', S: 88, T: 62, A: 90, R: 75 },
  { id: 3, name: '박지훈', studentId: '202012347', dept: '컴퓨터공학과', S: 92, T: 68, A: 85, R: 80 },
  { id: 4, name: '최서영', studentId: '202012348', dept: '컴퓨터공학과', S: 78, T: 82, A: 72, R: 88 },
  { id: 5, name: '이민재', studentId: '202012349', dept: '컴퓨터공학과', S: 82, T: 90, A: 71, R: 85 },
  { id: 6, name: '강예진', studentId: '202012350', dept: '컴퓨터공학과', S: 90, T: 88, A: 95, R: 92 },
  { id: 7, name: '조현우', studentId: '202012351', dept: '컴퓨터공학과', S: 75, T: 78, A: 80, R: 70 },
  { id: 8, name: '오현수', studentId: '202012352', dept: '컴퓨터공학과', S: 88, T: 92, A: 88, R: 82 },
];

// 알림 데이터
export const notifications: Notification[] = [
  { id: 1, title: '역량 미달 학생 발견', message: 'T(실무) 역량 미달 학생 3명이 확인되었습니다.', time: '10분 전', read: false },
  { id: 2, title: 'CQI 보고서 제출 기한', message: '2025학년도 1학기 CQI 보고서 제출 기한이 7일 남았습니다.', time: '1시간 전', read: false },
  { id: 3, title: '성적 입력 마감', message: '중간고사 성적 입력이 완료되었습니다.', time: '3시간 전', read: true },
  { id: 4, title: '학생 질의 답변', message: '김민수 학생이 질의를 등록했습니다.', time: '1일 전', read: true },
];
