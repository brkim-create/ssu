// ============================================================
// Admin Dashboard Mock Data
// ============================================================

import type {
  Ticket,
  Template,
  CategoryStat,
  SpeedDataItem,
  KeywordItem,
  AdminUser,
  FAQScenario,
  CompetencyTrendItem,
  CollegeHeatmapItem,
  CertificationItem,
  DepartmentGapItem,
  GradeGrowthItem,
  CQIStatusItem,
  CurriculumIssues,
  StudentData,
  StudentRadarItem,
  BehaviorIndicator,
  EvidenceItem,
  CourseData,
  AchievementDistribution,
  AssessmentToolItem,
  UnderperformingStudent,
  CQIPerformanceData,
  TeachingMethodItem,
  DashboardStatCard,
  ComplaintStatCard,
  AssigneeOption,
} from '../types';

// 민원 티켓 데이터
export const ticketsData: Ticket[] = [
  {
    id: 1, title: '도서관 냉방 문제', category: '시설 및 환경', status: '처리중',
    date: '2025.01.15 14:30', author: '김OO', priority: 'high',
    assignee: '시설관리팀 박OO', replies: [], draftReply: '도서관 냉방 시설 점검 중입니다...', rejectedReason: null,
  },
  {
    id: 2, title: '장학금 지급 일정 문의', category: '학생 장학', status: '완료',
    date: '2025.01.14 09:15', author: '이OO', priority: 'medium',
    assignee: '학생지원팀 이OO',
    replies: [{ content: '안녕하세요. 장학금 지급은 매 학기 개강 후 2주 이내에 진행됩니다.', author: '학생지원팀 이OO', date: '2025.01.14 11:30' }],
    draftReply: null, rejectedReason: null,
  },
  {
    id: 3, title: '성적 정정 요청', category: '수업 및 학사', status: '접수',
    date: '2025.01.13 16:45', author: '박OO', priority: 'high',
    assignee: null, replies: [], draftReply: null, rejectedReason: null,
  },
  {
    id: 4, title: '기숙사 온수 불량', category: '학생 복지', status: '접수',
    date: '2025.01.13 11:20', author: '최OO', priority: 'medium',
    assignee: null, replies: [], draftReply: null, rejectedReason: null,
  },
  {
    id: 5, title: '와이파이 연결 오류', category: '시설 및 환경', status: '완료',
    date: '2025.01.12 15:00', author: '정OO', priority: 'low',
    assignee: '전산팀 김OO',
    replies: [{ content: '안녕하세요. 해당 건물의 AP 점검을 완료했습니다.', author: '전산팀 김OO', date: '2025.01.12 16:45' }],
    draftReply: null, rejectedReason: null,
  },
  {
    id: 6, title: '강의실 프로젝터 고장', category: '시설 및 환경', status: '완료',
    date: '2025.01.11 10:30', author: '한OO', priority: 'high',
    assignee: '시설관리팀 박OO',
    replies: [{ content: '안녕하세요. 해당 강의실 프로젝터를 긴급 점검했습니다.', author: '시설관리팀 박OO', date: '2025.01.11 14:20' }],
    draftReply: null, rejectedReason: null,
  },
  {
    id: 7, title: '학생증 재발급 문의', category: '수업 및 학사', status: '반려됨',
    date: '2025.01.10 13:20', author: '윤OO', priority: 'low',
    assignee: '학생지원팀 이OO',
    replies: [{ content: '학생증 재발급은 학생지원팀에 방문하시면 즉시 발급 가능합니다.', author: '학생지원팀 이OO', date: '2025.01.10 14:00' }],
    draftReply: null, rejectedReason: '답변 내용이 불충분합니다. 재발급 비용과 필요 서류를 명확히 안내해주세요.',
  },
  {
    id: 8, title: '동아리실 대여 신청', category: '학생 복지', status: '반려됨',
    date: '2025.01.09 10:15', author: '강OO', priority: 'medium',
    assignee: '학생지원팀 이OO',
    replies: [{ content: '동아리실 대여는 학생지원팀에 신청하시면 됩니다.', author: '학생지원팀 이OO', date: '2025.01.09 11:30' }],
    draftReply: null, rejectedReason: '대여 절차와 신청 양식 링크를 추가해주세요.',
  },
];

// 템플릿 데이터
export const templatesData: Template[] = [
  { id: 1, category: '시설 관련', title: '에어컨 수리 접수 완료', content: '안녕하세요. 에어컨 수리 요청이 접수되었습니다.' },
  { id: 2, category: '시설 관련', title: '시설 점검 일정 안내', content: '시설 점검은 매주 월요일 오전에 진행됩니다.' },
  { id: 3, category: '장학 관련', title: '장학금 신청 기간 안내', content: '장학금 신청 기간은 매 학기 시작 2주 전부터 1주간입니다.' },
  { id: 4, category: '학사 관련', title: '성적 정정 처리 완료', content: '요청하신 성적 정정이 완료되었습니다.' },
];

// 카테고리 통계
export const categoryStats: CategoryStat[] = [
  { name: '시설', value: 45, color: '#E94E3C' },
  { name: '장학', value: 25, color: '#F7941D' },
  { name: '복지', value: 18, color: '#C13584' },
  { name: '학사', value: 12, color: '#5B51D8' },
];

// 처리 속도 데이터
export const speedData: SpeedDataItem[] = [
  { day: '월', time: 1.2 },
  { day: '화', time: 2.1 },
  { day: '수', time: 1.8 },
  { day: '목', time: 1.5 },
  { day: '금', time: 2.4 },
];

// 키워드 데이터
export const keywordsData: KeywordItem[] = [
  { word: '민원', size: 'text-6xl', weight: 'font-bold' },
  { word: '처리', size: 'text-5xl', weight: 'font-bold' },
  { word: '시설', size: 'text-5xl', weight: 'font-bold' },
  { word: '에어컨', size: 'text-4xl', weight: 'font-semibold' },
  { word: '학생', size: 'text-4xl', weight: 'font-semibold' },
  { word: '장학금', size: 'text-4xl', weight: 'font-semibold' },
  { word: '접수', size: 'text-3xl', weight: 'font-medium' },
  { word: '신청', size: 'text-3xl', weight: 'font-medium' },
  { word: '도서관', size: 'text-3xl', weight: 'font-medium' },
  { word: '수리', size: 'text-xl', weight: 'font-normal' },
  { word: '문의', size: 'text-xl', weight: 'font-normal' },
  { word: '지원', size: 'text-xl', weight: 'font-normal' },
  { word: '주차', size: 'text-lg', weight: 'font-normal' },
  { word: '청소', size: 'text-lg', weight: 'font-normal' },
  { word: '냉난방', size: 'text-lg', weight: 'font-normal' },
  { word: '프로젝터', size: 'text-lg', weight: 'font-normal' },
  { word: '전산', size: 'text-base', weight: 'font-normal' },
  { word: '환경', size: 'text-base', weight: 'font-normal' },
  { word: '네트워크', size: 'text-base', weight: 'font-normal' },
  { word: '복지', size: 'text-base', weight: 'font-normal' },
  { word: '학사', size: 'text-base', weight: 'font-normal' },
  { word: '상담', size: 'text-sm', weight: 'font-normal' },
  { word: '등록', size: 'text-sm', weight: 'font-normal' },
  { word: '휴학', size: 'text-sm', weight: 'font-normal' },
  { word: '복학', size: 'text-sm', weight: 'font-normal' },
  { word: '졸업', size: 'text-sm', weight: 'font-normal' },
];

// 사용자 데이터
export const usersData: AdminUser[] = [
  { id: 1, name: '김관리', dept: '교무처', role: '슈퍼관리자', status: '활성' },
  { id: 2, name: '이담당', dept: '시설관리팀', role: '일반관리자', status: '활성' },
  { id: 3, name: '박처리', dept: '학생지원팀', role: '일반관리자', status: '활성' },
];

// 금지어 목록
export const bannedWords: string[] = ['욕설1', '비방어1', '욕설2'];

// FAQ 시나리오
export const faqScenarios: FAQScenario[] = [
  { id: 1, category: '장학', question: '장학금 신청기간은?', answer: '매 학기 시작 2주 전부터 1주간' },
  { id: 2, category: '학사', question: '휴학 신청 방법은?', answer: '학생포털 > 학적 > 휴학신청' },
  { id: 3, category: '시설', question: '도서관 운영시간은?', answer: '평일 09:00-22:00' },
];

// S-T-A-R 역량 추이 데이터
export const competencyTrendData: CompetencyTrendItem[] = [
  { year: '2021', S: 65, T: 62, A: 68, R: 60 },
  { year: '2022', S: 68, T: 65, A: 70, R: 63 },
  { year: '2023', S: 71, T: 68, A: 73, R: 67 },
  { year: '2024', S: 74, T: 72, A: 76, R: 71 },
  { year: '2025', S: 77, T: 75, A: 79, R: 74 },
];

// 과별 역량 히트맵 데이터
export const collegeHeatmapData: CollegeHeatmapItem[] = [
  { college: 'AI빅데이터과', 기획: 92, 실행: 88, 화합: 15, 통섭: 67, 전공지식: 95, 전공기술: 91, 정보화: 89, 신기술활용: 97, 공감: 25, 판단: 73, 사명감: 56, 조직이해: 42, 도전성: 38, 자기학습: 85, 경청: 61, 협상: 54, 외국어: 8, 세계시민: 77 },
  { college: '메타버스크리에이터과', 기획: 78, 실행: 82, 화합: 45, 통섭: 52, 전공지식: 35, 전공기술: 68, 정보화: 91, 신기술활용: 85, 공감: 12, 판단: 58, 사명감: 93, 조직이해: 71, 도전성: 64, 자기학습: 72, 경청: 29, 협상: 48, 외국어: 19, 세계시민: 75 },
  { college: '웹툰웹소설과', 기획: 65, 실행: 58, 화합: 88, 통섭: 43, 전공지식: 28, 전공기술: 51, 정보화: 6, 신기술활용: 33, 공감: 94, 판단: 70, 사명감: 96, 조직이해: 84, 도전성: 79, 자기학습: 88, 경청: 22, 협상: 47, 외국어: 14, 세계시민: 60 },
  { college: '드론기계과', 기획: 55, 실행: 72, 화합: 31, 통섭: 86, 전공지식: 90, 전공기술: 93, 정보화: 81, 신기술활용: 87, 공감: 39, 판단: 76, 사명감: 11, 조직이해: 24, 도전성: 18, 자기학습: 65, 경청: 63, 협상: 50, 외국어: 3, 세계시민: 69 },
  { college: '간호학과', 기획: 98, 실행: 95, 화합: 91, 통섭: 89, 전공지식: 99, 전공기술: 96, 정보화: 92, 신기술활용: 88, 공감: 97, 판단: 94, 사명감: 90, 조직이해: 85, 도전성: 82, 자기학습: 95, 경청: 93, 협상: 87, 외국어: 84, 세계시민: 95 },
  { college: '방사선과', 기획: 44, 실행: 62, 화합: 36, 통섭: 59, 전공지식: 74, 전공기술: 68, 정보화: 53, 신기술활용: 46, 공감: 21, 판단: 57, 사명감: 65, 조직이해: 49, 도전성: 41, 자기학습: 58, 경청: 30, 협상: 37, 외국어: 26, 세계시민: 66 },
  { college: '치위생과', 기획: 83, 실행: 79, 화합: 71, 통섭: 88, 전공지식: 86, 전공기술: 81, 정보화: 75, 신기술활용: 69, 공감: 80, 판단: 77, 사명감: 89, 조직이해: 84, 도전성: 78, 자기학습: 81, 경청: 73, 협상: 70, 외국어: 67, 세계시민: 85 },
  { college: '뷰티스타일리스트과', 기획: 27, 실행: 48, 화합: 92, 통섭: 56, 전공지식: 63, 전공기술: 71, 정보화: 34, 신기술활용: 52, 공감: 87, 판단: 44, 사명감: 19, 조직이해: 40, 도전성: 33, 자기학습: 76, 경청: 95, 협상: 78, 외국어: 51, 세계시민: 82 },
  { college: '제과제빵커피과', 기획: 16, 실행: 23, 화합: 54, 통섭: 38, 전공지식: 76, 전공기술: 69, 정보화: 45, 신기술활용: 31, 공감: 58, 판단: 42, 사명감: 7, 조직이해: 20, 도전성: 5, 자기학습: 44, 경청: 61, 협상: 49, 외국어: 28, 세계시민: 64 },
  { college: '호텔조리과', 기획: 70, 실행: 81, 화합: 62, 통섭: 75, 전공지식: 88, 전공기술: 83, 정보화: 77, 신기술활용: 71, 공감: 79, 판단: 72, 사명감: 53, 조직이해: 46, 도전성: 39, 자기학습: 68, 경청: 80, 협상: 74, 외국어: 59, 세계시민: 86 },
  { college: '스포츠레저과', 기획: 91, 실행: 87, 화합: 17, 통섭: 94, 전공지식: 35, 전공기술: 68, 정보화: 90, 신기술활용: 82, 공감: 96, 판단: 85, 사명감: 29, 조직이해: 43, 도전성: 51, 자기학습: 0, 경청: 89, 협상: 92, 외국어: 55, 세계시민: 78 },
  { college: '치료재활과', 기획: 85, 실행: 93, 화합: 76, 통섭: 68, 전공지식: 52, 전공기술: 79, 정보화: 87, 신기술활용: 74, 공감: 65, 판단: 81, 사명감: 98, 조직이해: 91, 도전성: 86, 자기학습: 0, 경청: 41, 협상: 57, 외국어: 32, 세계시민: 72 },
  { college: '경찰행정과', 기획: 49, 실행: 66, 화합: 83, 통섭: 57, 전공지식: 71, 전공기술: 64, 정보화: 48, 신기술활용: 55, 공감: 37, 판단: 62, 사명감: 94, 조직이해: 88, 도전성: 77, 자기학습: 0, 경청: 69, 협상: 75, 외국어: 45, 세계시민: 81 },
  { college: '미술심리보육과', 기획: 37, 실행: 54, 화합: 89, 통섭: 61, 전공지식: 95, 전공기술: 88, 정보화: 73, 신기술활용: 66, 공감: 92, 판단: 78, 사명감: 60, 조직이해: 47, 도전성: 35, 자기학습: 0, 경청: 84, 협상: 71, 외국어: 42, 세계시민: 76 },
  { college: '반려동물보건과', 기획: 13, 실행: 26, 화합: 51, 통섭: 39, 전공지식: 67, 전공기술: 58, 정보화: 44, 신기술활용: 36, 공감: 72, 판단: 53, 사명감: 22, 조직이해: 16, 도전성: 9, 자기학습: 0, 경청: 65, 협상: 56, 외국어: 34, 세계시민: 48 },
  { college: '사회복지과', 기획: 88, 실행: 77, 화합: 94, 통섭: 82, 전공지식: 43, 전공기술: 86, 정보화: 79, 신기술활용: 62, 공감: 98, 판단: 91, 사명감: 75, 조직이해: 68, 도전성: 59, 자기학습: 0, 경청: 96, 협상: 89, 외국어: 73, 세계시민: 92 },
  { college: '유아교육과', 기획: 74, 실행: 69, 화합: 86, 통섭: 78, 전공지식: 81, 전공기술: 75, 정보화: 67, 신기술활용: 72, 공감: 89, 판단: 83, 사명감: 64, 조직이해: 58, 도전성: 52, 자기학습: 0, 경청: 90, 협상: 84, 외국어: 70, 세계시민: 87 },
];

// 인증 현황 데이터
export const certificationData: CertificationItem[] = [
  { level: 'Advanced', count: 245, color: '#E94E3C', name: 'Advanced (245명)' },
  { level: 'Intermediate', count: 512, color: '#F7941D', name: 'Intermediate (512명)' },
  { level: 'Basic', count: 183, color: '#C13584', name: 'Basic (183명)' },
  { level: 'Low', count: 60, color: '#5B51D8', name: 'Low (60명)' },
];

// 과별 역량 달성도 (Gap Analysis)
export const departmentGapData: DepartmentGapItem[] = [
  { dept: 'AI빅데이터과', current: 85, target: 90, gap: -5 },
  { dept: '간호학과', current: 88, target: 90, gap: -2 },
  { dept: '치위생과', current: 86, target: 85, gap: 1 },
  { dept: '호텔조리과', current: 81, target: 85, gap: -4 },
  { dept: '사회복지과', current: 85, target: 90, gap: -5 },
];

// 학년별 성장 추이
export const gradeGrowthData: GradeGrowthItem[] = [
  { grade: '1학년', S: 62, T: 60, A: 65, R: 58 },
  { grade: '2학년', S: 70, T: 68, A: 72, R: 66 },
  { grade: '3학년', S: 76, T: 74, A: 78, R: 72 },
  { grade: '4학년', S: 82, T: 80, A: 84, R: 78 },
];

// CQI 운영 현황
export const cqiStatusData: CQIStatusItem[] = [
  { dept: 'AI빅데이터과', total: 28, completed: 26, rate: 92.9, lowGrade: 2 },
  { dept: '간호학과', total: 35, completed: 34, rate: 97.1, lowGrade: 1 },
  { dept: '치위생과', total: 30, completed: 29, rate: 96.7, lowGrade: 1 },
  { dept: '호텔조리과', total: 25, completed: 22, rate: 88.0, lowGrade: 3 },
  { dept: '사회복지과', total: 32, completed: 31, rate: 96.9, lowGrade: 1 },
  { dept: '스포츠레저과', total: 24, completed: 23, rate: 95.8, lowGrade: 1 },
  { dept: '경찰행정과', total: 27, completed: 25, rate: 92.6, lowGrade: 2 },
  { dept: '유아교육과', total: 29, completed: 28, rate: 96.6, lowGrade: 1 },
];

// 교육과정 적절성 데이터
export const curriculumIssues: CurriculumIssues = {
  unmappedCourses: 12,
  totalCourses: 245,
  competencyDistribution: [
    { competency: 'S', count: 68, percentage: 27.8 },
    { competency: 'T', count: 82, percentage: 33.5 },
    { competency: 'A', count: 55, percentage: 22.4 },
    { competency: 'R', count: 40, percentage: 16.3 },
  ],
  unmappedCoursesList: [
    { id: 1, courseName: 'AI 윤리와 철학', professor: '김철수', dept: 'AI빅데이터과' },
    { id: 2, courseName: '창업 실무', professor: '박영희', dept: '메타버스크리에이터과' },
    { id: 3, courseName: '디지털 마케팅', professor: '이민준', dept: '웹툰웹소설과' },
    { id: 4, courseName: '드론 법규', professor: '최서연', dept: '드론기계과' },
    { id: 5, courseName: '간호 윤리', professor: '정지훈', dept: '간호학과' },
    { id: 6, courseName: '방사선 안전관리', professor: '강민지', dept: '방사선과' },
    { id: 7, courseName: '구강보건교육', professor: '윤수진', dept: '치위생과' },
    { id: 8, courseName: '피부관리학 개론', professor: '임하늘', dept: '뷰티스타일리스트과' },
    { id: 9, courseName: '제과위생학', professor: '한소희', dept: '제과제빵커피과' },
    { id: 10, courseName: '외식산업론', professor: '오준호', dept: '호텔조리과' },
    { id: 11, courseName: '스포츠심리학', professor: '신예린', dept: '스포츠레저과' },
    { id: 12, courseName: '물리치료 개론', professor: '배성우', dept: '치료재활과' },
  ],
};

// 학생 목록 데이터
export const studentsData: StudentData[] = [
  { id: 1, name: '김학생', studentId: '20210001', dept: 'AI빅데이터과', grade: 3, S: 78, T: 82, A: 75, R: 80, avg: 78.75, badge: '우수', jobMatch: 87 },
  { id: 2, name: '이학생', studentId: '20210002', dept: '간호학과', grade: 3, S: 92, T: 88, A: 91, R: 89, avg: 90.0, badge: '마스터', jobMatch: 95 },
  { id: 3, name: '박학생', studentId: '20210003', dept: '치위생과', grade: 3, S: 65, T: 68, A: 70, R: 66, avg: 67.25, badge: '보통', jobMatch: 72 },
  { id: 4, name: '최학생', studentId: '20210004', dept: '호텔조리과', grade: 3, S: 52, T: 58, A: 55, R: 54, avg: 54.75, badge: '노력요망', jobMatch: 58 },
  { id: 5, name: '정학생', studentId: '20210005', dept: '사회복지과', grade: 3, S: 75, T: 79, A: 72, R: 77, avg: 75.75, badge: '보통', jobMatch: 81 },
];

// 학생 개인 레이더 차트 데이터
export const studentRadarData: StudentRadarItem[] = [
  { subject: 'Self-directed', student: 78, deptAvg: 72, totalAvg: 70, fullMark: 100 },
  { subject: 'Teamwork', student: 82, deptAvg: 75, totalAvg: 73, fullMark: 100 },
  { subject: 'Analytical', student: 75, deptAvg: 70, totalAvg: 68, fullMark: 100 },
  { subject: 'Relational', student: 80, deptAvg: 74, totalAvg: 71, fullMark: 100 },
];

// 행동지표 달성도 데이터
export const behaviorIndicators: BehaviorIndicator[] = [
  { code: 'S1', name: '자기주도 학습', achievement: 85, status: 'excellent' },
  { code: 'S2', name: '시간 관리', achievement: 72, status: 'good' },
  { code: 'S3', name: '목표 설정', achievement: 76, status: 'good' },
  { code: 'T1', name: '팀워크 협력', achievement: 88, status: 'excellent' },
  { code: 'T2', name: '리더십', achievement: 79, status: 'good' },
  { code: 'T3', name: '의사소통', achievement: 80, status: 'excellent' },
];

// Evidence 트래킹 데이터
export const evidenceData: EvidenceItem[] = [
  { competency: 'S', course: '데이터구조', assignment: '프로젝트 1', score: 92, semester: '2024-1' },
  { competency: 'S', course: '알고리즘', assignment: '중간고사', score: 85, semester: '2024-1' },
  { competency: 'T', course: '소프트웨어공학', assignment: '팀 프로젝트', score: 88, semester: '2024-2' },
  { competency: 'A', course: '인공지능', assignment: '기말고사', score: 78, semester: '2024-2' },
  { competency: 'R', course: '캡스톤디자인', assignment: '최종발표', score: 90, semester: '2024-2' },
];

// 교수 앱 관리 - 강의 목록 데이터
export const coursesData: CourseData[] = [
  { id: 1, code: 'CS301', name: '데이터구조', professor: '김교수', students: 45, targetCompetency: 'S', avgScore: 76.5 },
  { id: 2, code: 'CS302', name: '알고리즘', professor: '이교수', students: 38, targetCompetency: 'S', avgScore: 72.3 },
  { id: 3, code: 'CS401', name: '소프트웨어공학', professor: '박교수', students: 42, targetCompetency: 'T', avgScore: 81.2 },
  { id: 4, code: 'CS402', name: '인공지능', professor: '최교수', students: 35, targetCompetency: 'A', avgScore: 78.8 },
];

// 교과목 역량 성취도 분포
export const courseAchievementDistribution: AchievementDistribution[] = [
  { range: '0-60', count: 3 },
  { range: '60-70', count: 8 },
  { range: '70-80', count: 15 },
  { range: '80-90', count: 12 },
  { range: '90-100', count: 7 },
];

// 평가도구별 역량 점수
export const assessmentToolData: AssessmentToolItem[] = [
  { tool: '중간고사', S: 72, T: 68, A: 75, R: 70 },
  { tool: '기말고사', S: 75, T: 71, A: 78, R: 73 },
  { tool: '과제', S: 82, T: 85, A: 79, R: 81 },
  { tool: '출석', S: 88, T: 90, A: 86, R: 89 },
  { tool: '프로젝트', S: 85, T: 92, A: 83, R: 87 },
];

// 역량 미달 학생 리스트
export const underperformingStudents: UnderperformingStudent[] = [
  { name: '최학생', studentId: '20210004', targetComp: 'S', score: 52, threshold: 60, gap: -8 },
  { name: '박학생', studentId: '20220015', targetComp: 'T', score: 58, threshold: 65, gap: -7 },
  { name: '정학생', studentId: '20220023', targetComp: 'A', score: 61, threshold: 70, gap: -9 },
];

// CQI 성과 분석 데이터
export const cqiPerformanceData: CQIPerformanceData = {
  targetAchievement: 85,
  currentAchievement: 78.5,
  achievementRate: 92.4,
  yearOverYear: 3.8,
  weakAreas: [
    { area: 'Analytical 역량', score: 68.5, improvement: '문제해결 과제 강화 필요' },
    { area: 'Self-directed 역량', score: 71.2, improvement: '자기주도 학습 시간 확대' },
  ],
};

// 교수법 연계 진단 데이터
export const teachingMethodData: TeachingMethodItem[] = [
  { method: 'PBL', S: 82, T: 88, A: 79, R: 85, satisfaction: 4.2 },
  { method: 'Flipped', S: 78, T: 75, A: 82, R: 76, satisfaction: 3.8 },
  { method: '강의식', S: 70, T: 68, A: 72, R: 69, satisfaction: 3.5 },
  { method: '토론식', S: 75, T: 92, A: 74, R: 88, satisfaction: 4.5 },
];

// 대시보드 통계 카드 데이터
export const dashboardStats: DashboardStatCard[] = [
  { label: '전체 학생수', value: '1,000명', iconType: 'users', color: 'blue', change: '+5.2%' },
  { label: '평균 역량 점수', value: '76.3', iconType: 'trending', color: 'green', change: '+3.8%' },
  { label: '인증 달성률', value: '87.5%', iconType: 'award', color: 'purple', change: '+2.1%' },
  { label: 'CQI 완료율', value: '92.3%', iconType: 'check', color: 'orange', change: '+1.5%' },
];

// 민원 통계 카드 데이터
export const complaintStats: ComplaintStatCard[] = [
  { label: '전체 민원', value: '156', iconType: 'inbox', color: 'blue' },
  { label: '평균 처리시간', value: '1.8일', iconType: 'clock', color: 'green' },
  { label: '처리 완료율', value: '87%', iconType: 'check', color: 'orange' },
  { label: '지연 건수', value: '5', iconType: 'alert', color: 'red' },
];

// 담당자 배정 옵션 데이터
export const assigneeOptions: AssigneeOption[] = [
  { id: 1, name: '박OO', department: '시설관리팀' },
  { id: 2, name: '이OO', department: '학생지원팀' },
  { id: 3, name: '김OO', department: '전산팀' },
];
