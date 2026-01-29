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
  EvaluationCriteria,
} from '../types';

// 교과목 역량 성취도 히스토그램 데이터 (기본값)
export const histogramData: HistogramDataItem[] = [
  { range: '0-20', students: 2 },
  { range: '21-40', students: 5 },
  { range: '41-60', students: 12 },
  { range: '61-80', students: 28 },
  { range: '81-100', students: 18 },
];

// 과목별 히스토그램 데이터
export const histogramDataByCourse: Record<number, HistogramDataItem[]> = {
  1: [ // 자료구조
    { range: '0-20', students: 2 },
    { range: '21-40', students: 5 },
    { range: '41-60', students: 12 },
    { range: '61-80', students: 28 },
    { range: '81-100', students: 18 },
  ],
  2: [ // 알고리즘
    { range: '0-20', students: 1 },
    { range: '21-40', students: 3 },
    { range: '41-60', students: 8 },
    { range: '61-80', students: 25 },
    { range: '81-100', students: 21 },
  ],
  3: [ // 소프트웨어공학
    { range: '0-20', students: 0 },
    { range: '21-40', students: 2 },
    { range: '41-60', students: 6 },
    { range: '61-80', students: 20 },
    { range: '81-100', students: 14 },
  ],
};

// 평가 도구별 분석 데이터 (기본값)
export const assessmentData: AssessmentDataItem[] = [
  { name: '중간고사', S: 75, T: 82, A: 78, R: 71 },
  { name: '기말고사', S: 78, T: 85, A: 80, R: 74 },
  { name: '과제', S: 85, T: 88, A: 90, R: 82 },
  { name: '출석', S: 92, T: 90, A: 95, R: 88 },
];

// 과목별 평가 도구 분석 데이터
export const assessmentDataByCourse: Record<number, AssessmentDataItem[]> = {
  1: [ // 자료구조 - 과제가 가장 높음
    { name: '중간고사', S: 72, T: 75, A: 70, R: 68 },
    { name: '기말고사', S: 75, T: 78, A: 73, R: 71 },
    { name: '과제', S: 92, T: 95, A: 90, R: 88 },
    { name: '출석', S: 80, T: 82, A: 84, R: 78 },
  ],
  2: [ // 알고리즘 - 기말고사가 가장 높음
    { name: '중간고사', S: 75, T: 73, A: 70, R: 68 },
    { name: '기말고사', S: 93, T: 91, A: 89, R: 87 },
    { name: '과제', S: 78, T: 76, A: 74, R: 72 },
    { name: '출석', S: 82, T: 80, A: 83, R: 79 },
  ],
  3: [ // 소프트웨어공학 - 출석이 가장 높음
    { name: '중간고사', S: 74, T: 76, A: 72, R: 70 },
    { name: '기말고사', S: 77, T: 79, A: 75, R: 73 },
    { name: '과제', S: 80, T: 82, A: 78, R: 76 },
    { name: '출석', S: 94, T: 96, A: 92, R: 90 },
  ],
};

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
    courseIds: [1, 2],  // 자료구조, 알고리즘
    S: 85, T: 65, A: 78, R: 72,
    PO: { 창의적문제해결: 87, 융복합적사고: 82, 전문지식: 69, 미래혁신: 63, 리더십: 81, 공동체의식: 79, 자기계발: 77, 의사소통: 70, 글로컬시민: 72 }
  },
  {
    id: 2, name: '이지은', studentId: '202012346', dept: '컴퓨터공학과',
    courseIds: [1, 3],  // 자료구조, 소프트웨어공학
    S: 88, T: 62, A: 90, R: 75,
    PO: { 창의적문제해결: 90, 융복합적사고: 85, 전문지식: 66, 미래혁신: 60, 리더십: 93, 공동체의식: 91, 자기계발: 80, 의사소통: 73, 글로컬시민: 75 }
  },
  {
    id: 3, name: '박지훈', studentId: '202012347', dept: '컴퓨터공학과',
    courseIds: [1, 2, 3],  // 자료구조, 알고리즘, 소프트웨어공학
    S: 92, T: 68, A: 85, R: 80,
    PO: { 창의적문제해결: 94, 융복합적사고: 89, 전문지식: 72, 미래혁신: 66, 리더십: 88, 공동체의식: 86, 자기계발: 85, 의사소통: 78, 글로컬시민: 80 }
  },
  {
    id: 4, name: '최서영', studentId: '202012348', dept: '컴퓨터공학과',
    courseIds: [2, 3],  // 알고리즘, 소프트웨어공학
    S: 78, T: 82, A: 72, R: 88,
    PO: { 창의적문제해결: 80, 융복합적사고: 75, 전문지식: 86, 미래혁신: 80, 리더십: 75, 공동체의식: 73, 자기계발: 93, 의사소통: 86, 글로컬시민: 88 }
  },
  {
    id: 5, name: '이민재', studentId: '202012349', dept: '컴퓨터공학과',
    courseIds: [1, 2],  // 자료구조, 알고리즘
    S: 82, T: 90, A: 71, R: 85,
    PO: { 창의적문제해결: 84, 융복합적사고: 79, 전문지식: 94, 미래혁신: 88, 리더십: 74, 공동체의식: 72, 자기계발: 90, 의사소통: 83, 글로컬시민: 85 }
  },
  {
    id: 6, name: '강예진', studentId: '202012350', dept: '컴퓨터공학과',
    courseIds: [1, 2, 3],  // 자료구조, 알고리즘, 소프트웨어공학
    S: 90, T: 88, A: 95, R: 92,
    PO: { 창의적문제해결: 92, 융복합적사고: 87, 전문지식: 92, 미래혁신: 86, 리더십: 98, 공동체의식: 96, 자기계발: 97, 의사소통: 90, 글로컬시민: 92 }
  },
  {
    id: 7, name: '조현우', studentId: '202012351', dept: '컴퓨터공학과',
    courseIds: [1],  // 자료구조
    S: 75, T: 78, A: 80, R: 70,
    PO: { 창의적문제해결: 77, 융복합적사고: 72, 전문지식: 82, 미래혁신: 76, 리더십: 83, 공동체의식: 81, 자기계발: 75, 의사소통: 68, 글로컬시민: 70 }
  },
  {
    id: 8, name: '오현수', studentId: '202012352', dept: '컴퓨터공학과',
    courseIds: [2, 3],  // 알고리즘, 소프트웨어공학
    S: 88, T: 92, A: 88, R: 82,
    PO: { 창의적문제해결: 90, 융복합적사고: 85, 전문지식: 96, 미래혁신: 90, 리더십: 91, 공동체의식: 89, 자기계발: 87, 의사소통: 80, 글로컬시민: 82 }
  },
  {
    id: 9, name: '정수빈', studentId: '202012353', dept: '컴퓨터공학과',
    courseIds: [1, 3],  // 자료구조, 소프트웨어공학
    S: 79, T: 85, A: 82, R: 77,
    PO: { 창의적문제해결: 81, 융복합적사고: 76, 전문지식: 89, 미래혁신: 83, 리더십: 85, 공동체의식: 83, 자기계발: 80, 의사소통: 75, 글로컬시민: 77 }
  },
  {
    id: 10, name: '한소희', studentId: '202012354', dept: '컴퓨터공학과',
    courseIds: [1, 2],  // 자료구조, 알고리즘
    S: 94, T: 76, A: 88, R: 84,
    PO: { 창의적문제해결: 96, 융복합적사고: 91, 전문지식: 80, 미래혁신: 74, 리더십: 91, 공동체의식: 89, 자기계발: 88, 의사소통: 82, 글로컬시민: 84 }
  },
  {
    id: 11, name: '윤태호', studentId: '202012355', dept: '컴퓨터공학과',
    courseIds: [2],  // 알고리즘
    S: 70, T: 72, A: 68, R: 65,
    PO: { 창의적문제해결: 72, 융복합적사고: 67, 전문지식: 76, 미래혁신: 70, 리더십: 71, 공동체의식: 69, 자기계발: 68, 의사소통: 63, 글로컬시민: 65 }
  },
  {
    id: 12, name: '송다연', studentId: '202012356', dept: '컴퓨터공학과',
    courseIds: [1, 2, 3],  // 자료구조, 알고리즘, 소프트웨어공학
    S: 86, T: 83, A: 91, R: 87,
    PO: { 창의적문제해결: 88, 융복합적사고: 83, 전문지식: 87, 미래혁신: 81, 리더십: 94, 공동체의식: 92, 자기계발: 91, 의사소통: 85, 글로컬시민: 87 }
  },
  {
    id: 13, name: '임준혁', studentId: '202012357', dept: '컴퓨터공학과',
    courseIds: [3],  // 소프트웨어공학
    S: 81, T: 87, A: 75, R: 79,
    PO: { 창의적문제해결: 83, 융복합적사고: 78, 전문지식: 91, 미래혁신: 85, 리더십: 78, 공동체의식: 76, 자기계발: 83, 의사소통: 77, 글로컬시민: 79 }
  },
  {
    id: 14, name: '김하늘', studentId: '202012358', dept: '컴퓨터공학과',
    courseIds: [1, 3],  // 자료구조, 소프트웨어공학
    S: 73, T: 69, A: 77, R: 71,
    PO: { 창의적문제해결: 75, 융복합적사고: 70, 전문지식: 73, 미래혁신: 67, 리더십: 80, 공동체의식: 78, 자기계발: 74, 의사소통: 69, 글로컬시민: 71 }
  },
  {
    id: 15, name: '박서준', studentId: '202012359', dept: '컴퓨터공학과',
    courseIds: [1, 2],  // 자료구조, 알고리즘
    S: 89, T: 94, A: 84, R: 88,
    PO: { 창의적문제해결: 91, 융복합적사고: 86, 전문지식: 98, 미래혁신: 92, 리더십: 87, 공동체의식: 85, 자기계발: 92, 의사소통: 86, 글로컬시민: 88 }
  },
  {
    id: 16, name: '이채원', studentId: '202012360', dept: '컴퓨터공학과',
    courseIds: [2, 3],  // 알고리즘, 소프트웨어공학
    S: 77, T: 80, A: 86, R: 82,
    PO: { 창의적문제해결: 79, 융복합적사고: 74, 전문지식: 84, 미래혁신: 78, 리더십: 89, 공동체의식: 87, 자기계발: 85, 의사소통: 80, 글로컬시민: 82 }
  },
  {
    id: 17, name: '최우진', studentId: '202012361', dept: '컴퓨터공학과',
    courseIds: [1],  // 자료구조
    S: 67, T: 63, A: 70, R: 66,
    PO: { 창의적문제해결: 69, 융복합적사고: 64, 전문지식: 67, 미래혁신: 61, 리더십: 73, 공동체의식: 71, 자기계발: 69, 의사소통: 64, 글로컬시민: 66 }
  },
  {
    id: 18, name: '강민지', studentId: '202012362', dept: '컴퓨터공학과',
    courseIds: [1, 2, 3],  // 자료구조, 알고리즘, 소프트웨어공학
    S: 91, T: 89, A: 93, R: 90,
    PO: { 창의적문제해결: 93, 융복합적사고: 88, 전문지식: 93, 미래혁신: 87, 리더십: 96, 공동체의식: 94, 자기계발: 95, 의사소통: 88, 글로컬시민: 90 }
  },
];

// 알림 데이터
export const professorNotifications: Notification[] = [
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
  // 자료구조 (courseId: 1)
  { courseId: 1, week: 1, date: '2025-03-03', day: '월', title: '자료구조 개론', status: '완료', attendance: 98 },
  { courseId: 1, week: 1, date: '2025-03-05', day: '수', title: '배열 자료구조', status: '완료', attendance: 96 },
  { courseId: 1, week: 2, date: '2025-03-10', day: '월', title: '배열과 리스트', status: '완료', attendance: 95 },
  { courseId: 1, week: 2, date: '2025-03-12', day: '수', title: '연결 리스트', status: '완료', attendance: 94 },
  { courseId: 1, week: 3, date: '2025-03-17', day: '월', title: '다항식 덧셈', status: '완료', attendance: 97 },
  { courseId: 1, week: 3, date: '2025-03-19', day: '수', title: '희소 행렬', status: '완료', attendance: 95 },
  { courseId: 1, week: 4, date: '2025-03-24', day: '월', title: '스택 구조', status: '진행중', attendance: 92 },
  { courseId: 1, week: 4, date: '2025-03-26', day: '수', title: '큐 구조', status: '예정', attendance: 0 },
  { courseId: 1, week: 5, date: '2025-03-31', day: '월', title: '트리 기초', status: '예정', attendance: 0 },
  { courseId: 1, week: 5, date: '2025-04-02', day: '수', title: '이진 트리', status: '예정', attendance: 0 },
  { courseId: 1, week: 6, date: '2025-04-07', day: '월', title: '이진 탐색 트리', status: '예정', attendance: 0 },
  { courseId: 1, week: 6, date: '2025-04-09', day: '수', title: 'AVL 트리', status: '예정', attendance: 0 },
  { courseId: 1, week: 7, date: '2025-04-14', day: '월', title: '힙 구조', status: '예정', attendance: 0 },
  { courseId: 1, week: 7, date: '2025-04-16', day: '수', title: '우선순위 큐', status: '예정', attendance: 0 },
  { courseId: 1, week: 8, date: '2025-04-21', day: '월', title: '중간고사', status: '예정', attendance: 0 },
  { courseId: 1, week: 9, date: '2025-04-28', day: '월', title: '그래프 기초', status: '예정', attendance: 0 },
  { courseId: 1, week: 9, date: '2025-04-30', day: '수', title: '그래프 표현', status: '예정', attendance: 0 },
  { courseId: 1, week: 10, date: '2025-05-05', day: '월', title: 'DFS/BFS', status: '예정', attendance: 0 },
  { courseId: 1, week: 10, date: '2025-05-07', day: '수', title: '최단 경로', status: '예정', attendance: 0 },
  { courseId: 1, week: 11, date: '2025-05-12', day: '월', title: '정렬 알고리즘 1', status: '예정', attendance: 0 },
  { courseId: 1, week: 11, date: '2025-05-14', day: '수', title: '정렬 알고리즘 2', status: '예정', attendance: 0 },
  { courseId: 1, week: 12, date: '2025-05-19', day: '월', title: '해싱 기초', status: '예정', attendance: 0 },
  { courseId: 1, week: 12, date: '2025-05-21', day: '수', title: '해시 테이블', status: '예정', attendance: 0 },
  { courseId: 1, week: 13, date: '2025-05-26', day: '월', title: '동적 프로그래밍', status: '예정', attendance: 0 },
  { courseId: 1, week: 13, date: '2025-05-28', day: '수', title: 'DP 응용', status: '예정', attendance: 0 },
  { courseId: 1, week: 14, date: '2025-06-02', day: '월', title: '종합 복습', status: '예정', attendance: 0 },
  { courseId: 1, week: 14, date: '2025-06-04', day: '수', title: '문제 풀이', status: '예정', attendance: 0 },
  { courseId: 1, week: 15, date: '2025-06-09', day: '월', title: '기말고사', status: '예정', attendance: 0 },
  // 알고리즘 (courseId: 2)
  { courseId: 2, week: 1, date: '2025-03-04', day: '화', title: '알고리즘 개론', status: '완료', attendance: 97 },
  { courseId: 2, week: 1, date: '2025-03-06', day: '목', title: '시간복잡도 분석', status: '완료', attendance: 95 },
  { courseId: 2, week: 2, date: '2025-03-11', day: '화', title: '분할정복 기초', status: '완료', attendance: 96 },
  { courseId: 2, week: 2, date: '2025-03-13', day: '목', title: '병합정렬', status: '완료', attendance: 94 },
  { courseId: 2, week: 3, date: '2025-03-18', day: '화', title: '퀵정렬', status: '완료', attendance: 95 },
  { courseId: 2, week: 3, date: '2025-03-20', day: '목', title: '이진탐색', status: '완료', attendance: 93 },
  { courseId: 2, week: 4, date: '2025-03-25', day: '화', title: '동적계획법 기초', status: '진행중', attendance: 91 },
  { courseId: 2, week: 4, date: '2025-03-27', day: '목', title: 'LCS 알고리즘', status: '예정', attendance: 0 },
  { courseId: 2, week: 5, date: '2025-04-01', day: '화', title: '배낭 문제', status: '예정', attendance: 0 },
  { courseId: 2, week: 5, date: '2025-04-03', day: '목', title: 'DP 최적화', status: '예정', attendance: 0 },
  // 소프트웨어공학 (courseId: 3)
  { courseId: 3, week: 1, date: '2025-03-03', day: '월', title: 'SW공학 개론', status: '완료', attendance: 96 },
  { courseId: 3, week: 1, date: '2025-03-05', day: '수', title: '소프트웨어 생명주기', status: '완료', attendance: 94 },
  { courseId: 3, week: 2, date: '2025-03-10', day: '월', title: '요구사항 분석', status: '완료', attendance: 95 },
  { courseId: 3, week: 2, date: '2025-03-12', day: '수', title: 'UML 기초', status: '완료', attendance: 93 },
  { courseId: 3, week: 3, date: '2025-03-17', day: '월', title: '유스케이스 다이어그램', status: '완료', attendance: 94 },
  { courseId: 3, week: 3, date: '2025-03-19', day: '수', title: '클래스 다이어그램', status: '완료', attendance: 92 },
  { courseId: 3, week: 4, date: '2025-03-24', day: '월', title: '설계 패턴 기초', status: '진행중', attendance: 90 },
  { courseId: 3, week: 4, date: '2025-03-26', day: '수', title: '생성 패턴', status: '예정', attendance: 0 },
  { courseId: 3, week: 5, date: '2025-03-31', day: '월', title: '구조 패턴', status: '예정', attendance: 0 },
  { courseId: 3, week: 5, date: '2025-04-02', day: '수', title: '행위 패턴', status: '예정', attendance: 0 },
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
export const professorLoginHistory: LoginHistory[] = [
  { date: '2025.01.23', time: '14:32', device: 'Chrome (Windows)' },
  { date: '2025.01.22', time: '09:15', device: 'Safari (iPhone)' },
  { date: '2025.01.21', time: '18:42', device: 'Chrome (Android)' },
];

// 과목 통계 데이터 (기본값)
export const courseStatistics: CourseStatistics = {
  averageScore: 74.3,
  medianScore: 76,
};

// 과목별 통계 데이터
export const courseStatisticsByCourse: Record<number, CourseStatistics> = {
  1: { averageScore: 74.3, medianScore: 76 },   // 자료구조
  2: { averageScore: 78.5, medianScore: 80 },   // 알고리즘
  3: { averageScore: 81.2, medianScore: 83 },   // 소프트웨어공학
};

// 평가 기준 데이터 (기본값)
export const evaluationCriteria: EvaluationCriteria[] = [
  { name: '중간고사', weight: 30, color: 'bg-blue-500' },
  { name: '기말고사', weight: 30, color: 'bg-green-500' },
  { name: '과제', weight: 25, color: 'bg-orange-500' },
  { name: '출석', weight: 15, color: 'bg-purple-500' },
];

// 과목별 평가 기준 데이터
export const evaluationCriteriaByCourse: Record<number, EvaluationCriteria[]> = {
  1: [ // 자료구조
    { name: '중간고사', weight: 30, color: 'bg-blue-500' },
    { name: '기말고사', weight: 30, color: 'bg-green-500' },
    { name: '과제', weight: 25, color: 'bg-orange-500' },
    { name: '출석', weight: 15, color: 'bg-purple-500' },
  ],
  2: [ // 알고리즘
    { name: '중간고사', weight: 25, color: 'bg-blue-500' },
    { name: '기말고사', weight: 35, color: 'bg-green-500' },
    { name: '과제', weight: 30, color: 'bg-orange-500' },
    { name: '출석', weight: 10, color: 'bg-purple-500' },
  ],
  3: [ // 소프트웨어공학
    { name: '중간고사', weight: 20, color: 'bg-blue-500' },
    { name: '기말고사', weight: 20, color: 'bg-green-500' },
    { name: '프로젝트', weight: 40, color: 'bg-orange-500' },
    { name: '출석', weight: 20, color: 'bg-purple-500' },
  ],
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
