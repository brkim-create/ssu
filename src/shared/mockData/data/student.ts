// ============================================================
// Student Dashboard Mock Data
// ============================================================

import { getGradeFromScore } from '../../theme/grade';
import type {
  RadarDataItem,
  StarDetail,
  PODetail,
  ComplaintCategory,
  Complaint,
  Notification,
  FAQ,
  Evidence,
  JobFitData,
  ChatMessage,
  ChatbotAnswerTemplate,
  WelfareAnswerTemplate,
  SearchData,
  LoginHistory,
  ShareOption,
  NotificationChannel,
  UserProfile,
  StudentProfile,
  AppConfig,
} from '../types';

// 현재 로그인한 사용자 (더미)
export const CURRENT_STUDENT_ID = '202012345';

// 현재 로그인한 학생 프로필
export const currentStudentProfile: StudentProfile = {
  name: '김수성',
  department: '컴퓨터공학과',
  grade: '3학년',
  studentId: '202012345',
  totalScore: 81.3,
};

// STAR 핵심역량 진단 데이터
export const radarData: RadarDataItem[] = [
  { subject: 'S (창의)', myScore: 92, deptAvg: 72, totalAvg: 68, fullMark: 100 },
  { subject: 'T (실무)', myScore: 75, deptAvg: 75, totalAvg: 70, fullMark: 100 },
  { subject: 'A (인성)', myScore: 45, deptAvg: 80, totalAvg: 75, fullMark: 100 },
  { subject: 'R (소통)', myScore: 15, deptAvg: 68, totalAvg: 65, fullMark: 100 },
];

// 전공능력(PO) 핵심역량 진단 데이터
export const radarDataPO: RadarDataItem[] = [
  { subject: '창의적 문제해결', myScore: 87, deptAvg: 74, totalAvg: 70, fullMark: 100 },
  { subject: '융복합적 사고', myScore: 83, deptAvg: 70, totalAvg: 66, fullMark: 100 },
  { subject: '전문지식', myScore: 82, deptAvg: 78, totalAvg: 73, fullMark: 100 },
  { subject: '미래혁신', myScore: 75, deptAvg: 73, totalAvg: 68, fullMark: 100 },
  { subject: '리더십', myScore: 77, deptAvg: 74, totalAvg: 69, fullMark: 100 },
  { subject: '공동체의식', myScore: 90, deptAvg: 82, totalAvg: 77, fullMark: 100 },
  { subject: '자기계발', myScore: 94, deptAvg: 78, totalAvg: 73, fullMark: 100 },
  { subject: '의사소통', myScore: 72, deptAvg: 70, totalAvg: 67, fullMark: 100 },
  { subject: '글로컬 시민', myScore: 68, deptAvg: 66, totalAvg: 63, fullMark: 100 },
];

// 표준직무 적합도 데이터
export const jobFitData: JobFitData = {
  overallMatchRate: 78,
  recommendedJobs: [
    { name: '소프트웨어 개발자', matchRate: 92, grade: '우수' },
    { name: '데이터 분석가', matchRate: 85, grade: '우수' },
    { name: 'IT 컨설턴트', matchRate: 78, grade: '보통' },
  ],
};

// 역량 상세 데이터 (점수 기반 등급 자동 계산)
// 등급 기준: 90+ 마스터, 70+ 우수, 20+ 보통, 20미만 노력요망
const starScores = { S: 92, T: 75, A: 45, R: 15 };
export const starDetails: Record<string, StarDetail> = {
  S: { name: '창의', score: starScores.S, grade: getGradeFromScore(starScores.S), skills: ['창의적사고', '문제해결', '통찰력', '혁신'], color: '#E94E3C' },
  T: { name: '실무', score: starScores.T, grade: getGradeFromScore(starScores.T), skills: ['전공지식', '실무기술', '현장적응', '정보활용', '분석', '기획'], color: '#F7941D' },
  A: { name: '인성', score: starScores.A, grade: getGradeFromScore(starScores.A), skills: ['책임감', '성실성', '윤리의식', '협동심'], color: '#C13584' },
  R: { name: '소통', score: starScores.R, grade: getGradeFromScore(starScores.R), skills: ['경청', '설득', '조정', '리더십'], color: '#E94E3C' },
};

// 전공능력(PO) 상세 데이터 (점수 기반 등급 자동 계산)
const poScores = {
  '창의적 문제해결': 87, '융복합적 사고': 83, '전문지식': 82,
  '미래혁신': 75, '리더십': 77, '공동체의식': 90,
  '자기계발': 94, '의사소통': 72, '글로컬 시민': 68,
};
export const poDetails: Record<string, PODetail> = {
  '창의적 문제해결': { name: '창의적 문제해결', score: poScores['창의적 문제해결'], grade: getGradeFromScore(poScores['창의적 문제해결']), category: 'S', skills: ['대안도출', '문제정의', '창의적접근'], color: '#E94E3C' },
  '융복합적 사고': { name: '융복합적 사고', score: poScores['융복합적 사고'], grade: getGradeFromScore(poScores['융복합적 사고']), category: 'S', skills: ['융합사고', '통합적접근', '다학제이해'], color: '#E94E3C' },
  '전문지식': { name: '전문지식', score: poScores['전문지식'], grade: getGradeFromScore(poScores['전문지식']), category: 'T', skills: ['전공지식', '실무기술', '현장적용'], color: '#F7941D' },
  '미래혁신': { name: '미래혁신', score: poScores['미래혁신'], grade: getGradeFromScore(poScores['미래혁신']), category: 'T', skills: ['신기술이해', '혁신마인드', '변화적응'], color: '#F7941D' },
  '리더십': { name: '리더십', score: poScores['리더십'], grade: getGradeFromScore(poScores['리더십']), category: 'T', skills: ['팀워크', '조직관리', '의사결정'], color: '#F7941D' },
  '공동체의식': { name: '공동체의식', score: poScores['공동체의식'], grade: getGradeFromScore(poScores['공동체의식']), category: 'A', skills: ['협동심', '사회적책임', '봉사정신'], color: '#C13584' },
  '자기계발': { name: '자기계발', score: poScores['자기계발'], grade: getGradeFromScore(poScores['자기계발']), category: 'A', skills: ['자율성', '학습능력', '경력개발'], color: '#C13584' },
  '의사소통': { name: '의사소통', score: poScores['의사소통'], grade: getGradeFromScore(poScores['의사소통']), category: 'R', skills: ['경청', '발표', '문서이해'], color: '#E94E3C' },
  '글로컬 시민': { name: '글로컬 시민', score: poScores['글로컬 시민'], grade: getGradeFromScore(poScores['글로컬 시민']), category: 'R', skills: ['외국어', '다문화이해', '글로벌마인드'], color: '#E94E3C' },
};

// 스킬별 달성도
export const skillProgress: Record<string, number> = {
  창의적사고: 85, 문제해결: 78, 통찰력: 72, 혁신: 88,
  전공지식: 90, 실무기술: 82, 현장적응: 75, 정보활용: 80, 분석: 85, 기획: 70,
  책임감: 95, 성실성: 92, 윤리의식: 88, 협동심: 85,
  경청: 70, 설득: 65, 조정: 72, 리더십: 78,
  대안도출: 87, 문제정의: 82, 창의적접근: 85,
  장비운용: 80, 실무적용: 83, 기술활용: 78,
  정보검색: 85, 데이터분석: 82, 문서작성: 88,
  외국어: 70, 다문화이해: 75, 글로벌마인드: 72,
  팀워크: 80, 갈등관리: 72, 협업: 85,
  자율성: 90, 학습능력: 92, 경력개발: 85,
  준법성: 95, 직업의식: 90,
  융합사고: 75, 신기술이해: 70, 응용력: 72,
  발표: 68, 문서이해: 75,
};

// 민원 카테고리
export const complaintCategories: ComplaintCategory[] = [
  { id: 1, icon: 'Building', name: '시설 및 환경', items: ['강의실', '도서관', '화장실', '휴게실'], color: '#E94E3C' },
  { id: 2, icon: 'GraduationCap', name: '학생 장학', items: [], color: '#4A90E2' },
  { id: 3, icon: 'Heart', name: '학생 복지', items: ['장학금', '기숙사', '식당', '보건'], color: '#C13584' },
  { id: 4, icon: 'BookOpen', name: '수업 및 학사', items: [], color: '#F7941D' },
];

// 민원 목록 데이터
export const complaints: Complaint[] = [
  {
    id: 1, studentId: '202012345', title: '강의실 에어컨 고장', status: '처리중', date: '2025.01.15',
    category: '시설 및 환경', content: '3호관 401호 강의실 에어컨이 작동하지 않습니다.',
    currentStep: 3, department: '시설관리팀', assignee: '김철수', isRead: true, isRated: false,
  },
  {
    id: 2, studentId: '202012345', title: '장학금 신청 기간 문의', status: '완료', date: '2025.01.14',
    category: '학생 복지', content: '2025년 1학기 장학금 신청 기간을 알고 싶습니다.',
    adminResponse: '2025년 1학기 장학금 신청 기간은 2월 1일부터 2월 15일까지입니다.',
    responseDate: '2025.01.15',
    attachments: [
      { id: 1, name: '장학금_안내.pdf', size: '245KB', url: '#' },
      { id: 2, name: '2025-1학기_장학금신청서.pdf', size: '1.2MB', url: '#' },
    ],
    isRead: false, isRated: false,
  },
  {
    id: 3, studentId: '202098765', title: '휴학 신청 방법', status: '접수', date: '2025.01.13',
    category: '학사 및 수업', content: '개인적인 사정으로 인해 휴학을 하려고 합니다.',
    currentStep: 1, isRead: true, isRated: false,
  },
  {
    id: 4, studentId: '202012345', title: '기숙사 식당 메뉴', status: '처리중', date: '2025.01.12',
    category: '학생 복지', content: '기숙사 식당 메뉴가 좀 더 다양했으면 좋겠습니다.',
    currentStep: 2, department: '생활관운영팀', assignee: '이영희', isRead: false, isRated: false,
  },
  {
    id: 5, studentId: '202012345', title: '도서관 와이파이 연결', status: '완료', date: '2025.01.11',
    category: '시설 및 환경', content: '도서관 3층 열람실에서 와이파이 연결이 잘 되지 않습니다.',
    adminResponse: '도서관 3층 와이파이 공유기 점검을 완료하였습니다.',
    responseDate: '2025.01.12',
    attachments: [{ id: 1, name: '와이파이_점검_완료.jpg', size: '2.3MB', url: '#' }],
    isRead: false, isRated: false,
  },
  {
    id: 6, studentId: '202012345', title: '성적 정정 요청', status: '접수', date: '2025.01.18',
    category: '학사 및 수업', content: '2024년 2학기 데이터베이스 과목 중간고사 점수가 잘못 기재된 것 같습니다.',
    isRead: false, isRated: false,
  },
  {
    id: 7, studentId: '202012345', title: '주차장 이용 문의', status: '접수', date: '2025.01.19',
    category: '시설 및 환경', content: '학교 주차장 이용 신청을 하고 싶습니다.',
    isRead: true, isRated: false,
  },
];

// 알림 데이터
export const studentNotifications: Notification[] = [
  { id: 1, title: '민원 처리 완료', message: '장학금 신청 기간 문의에 대한 답변이 등록되었습니다.', time: '10분 전', read: false },
  { id: 2, title: '학사 공지사항', message: '2025학년도 1학기 수강신청 안내', time: '1시간 전', read: false },
  { id: 3, title: '민원 접수 확인', message: '강의실 에어컨 고장 민원이 접수되었습니다.', time: '3시간 전', read: true },
  { id: 4, title: '역량 진단 알림', message: 'S(창의) 역량 진단이 시작되었습니다.', time: '1일 전', read: true },
];

// FAQ 데이터
export const faqData: FAQ[] = [
  { id: 1, question: '장학금 신청 기간은 언제인가요?', answer: '매 학기 시작 1달 전 공지사항을 확인해주세요.' },
  { id: 2, question: '휴학 신청 방법은?', answer: '학생 포털 시스템 > 학적 변동 메뉴에서 가능합니다.' },
  { id: 3, question: '증명서 발급은 어디서 하나요?', answer: '본관 1층 무인발급기 또는 인터넷 증명발급 사이트를 이용해주세요.' },
  { id: 4, question: '기숙사 입사 신청 기간은?', answer: '학생 포털 > 생활관 > 입사신청 메뉴에서 확인 가능합니다.' },
  { id: 5, question: '비밀번호를 분실했어요.', answer: '학생 포털 로그인 화면의 비밀번호 찾기를 이용해주세요.' },
];

// Evidence 데이터
export const evidenceData: Evidence[] = [
  { course: '창의적문제해결', task: '팀 프로젝트 과제', score: 'A+', competency: 'S', semester: '2024-2학기', date: '2024.12.10' },
  { course: '전공실무기초', task: '실습 과제', score: 'A', competency: 'T', semester: '2024-2학기', date: '2024.12.08' },
  { course: '리더십과 소통', task: '발표 과제', score: 'A+', competency: 'R', semester: '2024-2학기', date: '2024.11.25' },
  { course: '자기계발', task: '진로 탐색 보고서', score: 'A', competency: 'A', semester: '2024-2학기', date: '2024.11.20' },
  { course: '정보활용', task: '데이터 분석 과제', score: 'A+', competency: 'T', semester: '2024-1학기', date: '2024.05.15' },
  { course: '직업윤리', task: '윤리 사례 분석', score: 'B+', competency: 'A', semester: '2024-1학기', date: '2024.05.10' },
  { course: '글로벌이해', task: '문화 이해 보고서', score: 'A', competency: 'S', semester: '2024-1학기', date: '2024.04.20' },
];

// Chatbot 데이터
export const GEMINI_CATEGORIES = ['학생 장학', '수업 및 학사'];

export const chatbotOptions = {
  facilityTypes: ['강의실', '화장실', '엘리베이터', '기타 시설'],
  scholarshipTypes: ['성적장학금', '근로장학금', '국가장학금', '기타 장학금'],
  welfareTypes: ['기숙사', '학생식당', '보건센터', '상담센터'],
  academicTypes: ['성적 문의', '수강신청', '휴/복학', '졸업요건'],
  semesters: ['2025-1학기', '2024-2학기', '2024-1학기', '기타'],
  welfareInquiryTypes: ['이용 시간', '신청 방법', '시설 문의', '기타'],
  scholarshipInquiryTypes: ['신청 기간', '선발 기준', '지급 일정', '기타 문의'],
  problemTypes: ['고장/파손', '청결 문제', '안전 문제', '기타'],
};

export const chatbotInitialMessages: Record<string, ChatMessage[]> = {
  '시설 및 환경': [
    { type: 'bot', message: '안녕하세요! 시설 및 환경 관련 문의를 도와드리겠습니다.' },
    { type: 'bot', message: '어떤 시설에 문제가 있나요?' },
  ],
  '학생 장학': [
    { type: 'bot', message: '안녕하세요! 장학금 관련 문의를 도와드리겠습니다.' },
    { type: 'bot', message: '어떤 장학금에 대해 문의하시나요?' },
  ],
  '학생 복지': [
    { type: 'bot', message: '안녕하세요! 학생 복지 관련 문의를 도와드리겠습니다.' },
    { type: 'bot', message: '어떤 시설에 대해 문의하시나요?' },
  ],
  '수업 및 학사': [
    { type: 'bot', message: '안녕하세요! 수업 및 학사 관련 문의를 도와드리겠습니다.' },
    { type: 'bot', message: '어떤 내용에 대해 문의하시나요?' },
  ],
};

export const scholarshipAnswerTemplates: ChatbotAnswerTemplate = {
  '신청 기간': '{scholarshipType}의 {semester} 신청 기간은 학기 시작 2주 전부터 1주간입니다.',
  '선발 기준': '{scholarshipType} 선발 기준은 다음과 같습니다:\n• 직전학기 평점 3.0 이상\n• 이수학점 12학점 이상',
  '지급 일정': '{semester} {scholarshipType} 지급 일정은 학기 개시 후 1개월 이내입니다.',
  '기타 문의': '{scholarshipType}에 대한 추가 문의는 학생처 장학담당으로 연락 주시기 바랍니다.',
};

export const welfareAnswers: WelfareAnswerTemplate = {
  기숙사: {
    '이용 시간': '기숙사 출입은 24시간 가능하며, 외박 시에는 사전 신청이 필요합니다.',
    '신청 방법': '기숙사 신청은 매 학기 학생포털 > 생활 > 기숙사 신청 메뉴에서 가능합니다.',
    '시설 문의': '기숙사 시설 문의 및 고장 신고는 생활관리팀으로 연락 주시기 바랍니다.',
    기타: '기타 기숙사 관련 문의는 생활관리팀으로 연락해주세요.',
  },
  학생식당: {
    '이용 시간': '학생식당 운영 시간:\n• 조식: 08:00~09:30\n• 중식: 11:30~13:30\n• 석식: 17:30~19:00',
    '신청 방법': '학생식당은 별도 신청 없이 이용 가능합니다.',
    '시설 문의': '식당 시설 및 메뉴 문의는 복지팀으로 연락해주세요.',
    기타: '기타 학생식당 관련 문의는 복지팀으로 연락해주세요.',
  },
  보건센터: {
    '이용 시간': '보건센터 운영 시간:\n• 평일: 09:00~18:00\n• 점심시간: 12:00~13:00',
    '신청 방법': '보건센터 이용은 방문 접수 또는 전화 예약 가능합니다.',
    '시설 문의': '보건센터 시설 및 진료 문의: 02-1234-5681',
    기타: '기타 건강 관련 문의는 보건센터로 연락해주세요.',
  },
  상담센터: {
    '이용 시간': '학생상담센터 운영 시간:\n• 평일: 09:00~18:00\n• 상담 예약제 운영',
    '신청 방법': '상담 신청은 학생포털 또는 전화로 예약하실 수 있습니다.',
    '시설 문의': '상담센터 위치 및 프로그램 문의: 02-1234-5682',
    기타: '기타 상담 관련 문의는 학생상담센터로 연락해주세요.',
  },
};

export const academicAnswerTemplates: ChatbotAnswerTemplate = {
  '성적 문의': '{detail} 과목의 성적 문의는 다음과 같이 진행됩니다:\n1. 성적 공개 후 1주일 이내 정정 신청 가능\n2. 학생포털 > 학사 > 성적정정신청',
  수강신청: '수강신청 관련 안내:\n• 수강신청 기간: 학기 시작 2주 전\n• 정정 기간: 개강 후 1주',
  '휴/복학': '휴학 및 복학 신청 안내:\n• 휴학: 학기 시작 전 또는 개강 후 2주 이내\n• 복학: 복학 학기 시작 1개월 전',
  졸업요건: '졸업요건 확인:\n• 총 이수학점: 130학점 이상\n• 전공학점: 60학점 이상\n• STAR 역량 기준 충족',
};

// 검색 데이터
export const searchData: SearchData = {
  recentSearches: ['창의적 문제해결', '장학금', '도서관 냉방', 'S역량'],
  popularSearches: ['수강신청', '성적 정정', '역량 점수', '민원 제출'],
  recommendations: [{ title: 'S 창의 역량', description: '최근 업데이트된 역량 점수를 확인하세요', icon: 'Trophy' }],
  filterTabs: ['전체', 'Evidence', '민원', '알림'],
};

// 마이페이지 데이터
export const studentLoginHistory: LoginHistory[] = [
  { date: '2025.01.20', time: '14:32', device: 'Chrome (Windows)' },
  { date: '2025.01.19', time: '09:15', device: 'Safari (iPhone)' },
  { date: '2025.01.18', time: '18:42', device: 'Chrome (Android)' },
];

export const shareOptions: ShareOption[] = [
  { id: 'kakao', name: '카카오톡', icon: 'MessageCircle' },
  { id: 'sms', name: '문자', icon: 'MessageSquare' },
  { id: 'email', name: '이메일', icon: 'Mail' },
  { id: 'link', name: '링크복사', icon: 'Link' },
];

export const notificationChannels: NotificationChannel[] = [
  { id: 'pwa', name: 'PWA 푸시', description: '실시간으로 중요한 알림을 받을 수 있습니다', subText: '브라우저 알림', icon: 'Bell', iconBgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 'kakao', name: '카카오톡', description: '카카오톡으로 알림을 받을 수 있습니다', subText: '카카오 알림톡', icon: 'MessageCircle', iconBgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { id: 'email', name: '이메일', description: '이메일로 상세한 알림을 받을 수 있습니다', subText: 'school@example.com', icon: 'Send', iconBgColor: 'bg-pink-100', iconColor: 'text-pink-600' },
];

export const userProfile: UserProfile = {
  department: '컴퓨터공학과',
  grade: '3학년',
  email: 'school@example.com',
};

// 앱 설정
export const appConfig: AppConfig = {
  shareBaseUrl: 'https://student-dashboard.example.com/report',
};
