// ============================================================
// Professor Dashboard Mock Data
// ============================================================

// 현재 학기 설정 (서버에서 내려주는 값 시뮬레이션)
export const currentSemester = '2025-1';

import type {
  HistogramDataItem,
  AssessmentDataItem,
  ConcernStudent,
  PerformanceReport,
  TeachingMethod,
  Course,
  Student,
  Notification,
  RadarDataItem,
  WeeklyLecture,
  ProfessorProfile,
  CourseStatistics,
  LoginHistory,
} from '../types';

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
  { id: 1, name: '자료구조', students: 65, semester: '2025-1', competency: 'T', totalWeeks: 15 },
  { id: 2, name: '알고리즘', students: 58, semester: '2025-1', competency: 'S', totalWeeks: 15 },
  { id: 3, name: '소프트웨어공학', students: 42, semester: '2025-1', competency: 'T', totalWeeks: 15 },
  { id: 4, name: '파이썬 기초', students: 30, semester: '2025-여름', competency: 'T', totalWeeks: 4 },
  { id: 5, name: '데이터분석 실습', students: 25, semester: '2025-여름', competency: 'S', totalWeeks: 8 },
];

// 학생 목록 데이터
export const studentList: Student[] = [
  {
    id: 1, name: '김민수', studentId: '202012345', dept: '컴퓨터공학과',
    S: 85, T: 65, A: 78, R: 72,
    PO: { 창의적문제해결: 87, 융복합적사고: 82, 전문지식: 69, 미래혁신: 63, 리더십: 81, 공동체의식: 79, 자기계발: 77, 의사소통: 70, 글로컬시민: 72 }
  },
  {
    id: 2, name: '이지은', studentId: '202012346', dept: '컴퓨터공학과',
    S: 88, T: 62, A: 90, R: 75,
    PO: { 창의적문제해결: 90, 융복합적사고: 85, 전문지식: 66, 미래혁신: 60, 리더십: 93, 공동체의식: 91, 자기계발: 80, 의사소통: 73, 글로컬시민: 75 }
  },
  {
    id: 3, name: '박지훈', studentId: '202012347', dept: '컴퓨터공학과',
    S: 92, T: 68, A: 85, R: 80,
    PO: { 창의적문제해결: 94, 융복합적사고: 89, 전문지식: 72, 미래혁신: 66, 리더십: 88, 공동체의식: 86, 자기계발: 85, 의사소통: 78, 글로컬시민: 80 }
  },
  {
    id: 4, name: '최서영', studentId: '202012348', dept: '컴퓨터공학과',
    S: 78, T: 82, A: 72, R: 88,
    PO: { 창의적문제해결: 80, 융복합적사고: 75, 전문지식: 86, 미래혁신: 80, 리더십: 75, 공동체의식: 73, 자기계발: 93, 의사소통: 86, 글로컬시민: 88 }
  },
  {
    id: 5, name: '이민재', studentId: '202012349', dept: '컴퓨터공학과',
    S: 82, T: 90, A: 71, R: 85,
    PO: { 창의적문제해결: 84, 융복합적사고: 79, 전문지식: 94, 미래혁신: 88, 리더십: 74, 공동체의식: 72, 자기계발: 90, 의사소통: 83, 글로컬시민: 85 }
  },
  {
    id: 6, name: '강예진', studentId: '202012350', dept: '컴퓨터공학과',
    S: 90, T: 88, A: 95, R: 92,
    PO: { 창의적문제해결: 92, 융복합적사고: 87, 전문지식: 92, 미래혁신: 86, 리더십: 98, 공동체의식: 96, 자기계발: 97, 의사소통: 90, 글로컬시민: 92 }
  },
  {
    id: 7, name: '조현우', studentId: '202012351', dept: '컴퓨터공학과',
    S: 75, T: 78, A: 80, R: 70,
    PO: { 창의적문제해결: 77, 융복합적사고: 72, 전문지식: 82, 미래혁신: 76, 리더십: 83, 공동체의식: 81, 자기계발: 75, 의사소통: 68, 글로컬시민: 70 }
  },
  {
    id: 8, name: '오현수', studentId: '202012352', dept: '컴퓨터공학과',
    S: 88, T: 92, A: 88, R: 82,
    PO: { 창의적문제해결: 90, 융복합적사고: 85, 전문지식: 96, 미래혁신: 90, 리더십: 91, 공동체의식: 89, 자기계발: 87, 의사소통: 80, 글로컬시민: 82 }
  },
];

// 알림 데이터
export const notifications: Notification[] = [
  { id: 1, title: '역량 미달 학생 발견', message: 'T(실무) 역량 미달 학생 3명이 확인되었습니다.', time: '10분 전', read: false },
  { id: 2, title: 'CQI 보고서 제출 기한', message: '2025학년도 1학기 CQI 보고서 제출 기한이 7일 남았습니다.', time: '1시간 전', read: false },
  { id: 3, title: '성적 입력 마감', message: '중간고사 성적 입력이 완료되었습니다.', time: '3시간 전', read: true },
  { id: 4, title: '학생 질의 답변', message: '김민수 학생이 질의를 등록했습니다.', time: '1일 전', read: true },
];

// 교수용 레이더 차트 데이터 (필요시 사용)
export const professorRadarData: RadarDataItem[] = [
  { subject: 'S (창의)', myScore: 76.2, deptAvg: 72, totalAvg: 68 },
  { subject: 'T (실무)', myScore: 80.1, deptAvg: 75, totalAvg: 70 },
  { subject: 'A (인성)', myScore: 85.5, deptAvg: 80, totalAvg: 75 },
  { subject: 'R (소통)', myScore: 73.5, deptAvg: 68, totalAvg: 65 },
];

// 주차별 강의 데이터
export const weeklyLectures: WeeklyLecture[] = [
  // 정규학기 (15주)
  { week: 1, date: '2025-03-03', day: '월', title: '자료구조 개론', status: '완료', attendance: 98 },
  { week: 1, date: '2025-03-05', day: '수', title: '배열 자료구조', status: '완료', attendance: 96 },
  { week: 2, date: '2025-03-10', day: '월', title: '배열과 리스트', status: '완료', attendance: 95 },
  { week: 2, date: '2025-03-12', day: '수', title: '연결 리스트', status: '완료', attendance: 94 },
  { week: 3, date: '2025-03-17', day: '월', title: '다항식 덧셈', status: '완료', attendance: 97 },
  { week: 3, date: '2025-03-19', day: '수', title: '희소 행렬', status: '완료', attendance: 95 },
  { week: 4, date: '2025-03-24', day: '월', title: '스택 구조', status: '진행중', attendance: 92 },
  { week: 4, date: '2025-03-26', day: '수', title: '큐 구조', status: '예정', attendance: 0 },
  { week: 5, date: '2025-03-31', day: '월', title: '트리 기초', status: '예정', attendance: 0 },
  { week: 5, date: '2025-04-02', day: '수', title: '이진 트리', status: '예정', attendance: 0 },
  { week: 6, date: '2025-04-07', day: '월', title: '이진 탐색 트리', status: '예정', attendance: 0 },
  { week: 6, date: '2025-04-09', day: '수', title: 'AVL 트리', status: '예정', attendance: 0 },
  { week: 7, date: '2025-04-14', day: '월', title: '힙 구조', status: '예정', attendance: 0 },
  { week: 7, date: '2025-04-16', day: '수', title: '우선순위 큐', status: '예정', attendance: 0 },
  { week: 8, date: '2025-04-21', day: '월', title: '중간고사', status: '예정', attendance: 0 },
  { week: 9, date: '2025-04-28', day: '월', title: '그래프 기초', status: '예정', attendance: 0 },
  { week: 9, date: '2025-04-30', day: '수', title: '그래프 표현', status: '예정', attendance: 0 },
  { week: 10, date: '2025-05-05', day: '월', title: 'DFS/BFS', status: '예정', attendance: 0 },
  { week: 10, date: '2025-05-07', day: '수', title: '최단 경로', status: '예정', attendance: 0 },
  { week: 11, date: '2025-05-12', day: '월', title: '정렬 알고리즘 1', status: '예정', attendance: 0 },
  { week: 11, date: '2025-05-14', day: '수', title: '정렬 알고리즘 2', status: '예정', attendance: 0 },
  { week: 12, date: '2025-05-19', day: '월', title: '해싱 기초', status: '예정', attendance: 0 },
  { week: 12, date: '2025-05-21', day: '수', title: '해시 테이블', status: '예정', attendance: 0 },
  { week: 13, date: '2025-05-26', day: '월', title: '동적 프로그래밍', status: '예정', attendance: 0 },
  { week: 13, date: '2025-05-28', day: '수', title: 'DP 응용', status: '예정', attendance: 0 },
  { week: 14, date: '2025-06-02', day: '월', title: '종합 복습', status: '예정', attendance: 0 },
  { week: 14, date: '2025-06-04', day: '수', title: '문제 풀이', status: '예정', attendance: 0 },
  { week: 15, date: '2025-06-09', day: '월', title: '기말고사', status: '예정', attendance: 0 },
];

// 교수 프로필 데이터
export const professorProfile: ProfessorProfile = {
  name: '박정인 교수',
  department: '컴퓨터공학과',
  courseCount: 3,
  employeeId: 'P202001',
  position: '조교수',
  email: 'professor@example.com',
};

// 로그인 이력 데이터
export const loginHistory: LoginHistory[] = [
  { date: '2025.01.23', time: '14:32', device: 'Chrome (Windows)' },
  { date: '2025.01.22', time: '09:15', device: 'Safari (iPhone)' },
  { date: '2025.01.21', time: '18:42', device: 'Chrome (Android)' },
];

// 과목 통계 데이터
export const courseStatistics: CourseStatistics = {
  averageScore: 74.3,
  medianScore: 76,
};

// STAR 역량 평균 데이터
export const starAvgData = {
  dept: { S: 78, T: 80, A: 83, R: 76 },
  total: { S: 75, T: 77, A: 80, R: 74 },
};

// PO(전공능력) 평균 데이터
export const poAvgData = {
  dept: {
    "창의적\n문제해결": 79,
    "융복합적\n사고": 77,
    전문지식: 82,
    미래혁신: 78,
    리더십: 80,
    "공동체\n의식": 84,
    자기계발: 81,
    의사소통: 75,
    "글로컬\n시민": 77,
  } as Record<string, number>,
  total: {
    "창의적\n문제해결": 76,
    "융복합적\n사고": 74,
    전문지식: 79,
    미래혁신: 75,
    리더십: 77,
    "공동체\n의식": 81,
    자기계발: 78,
    의사소통: 73,
    "글로컬\n시민": 74,
  } as Record<string, number>,
};
