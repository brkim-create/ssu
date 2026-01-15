// ============================================================
// Student Dashboard Mock Data
// Supabase 연동을 위한 순수 데이터 파일 (컴포넌트/로직 제외)
// ============================================================

// ============================================================
// Type Definitions (Supabase 스키마 매칭용)
// ============================================================

export interface RadarDataItem {
  subject: string;
  myScore: number;
  deptAvg: number;
  totalAvg: number;
  fullMark: number;
}

export interface StarDetail {
  name: string;
  score: number;
  grade: string;
  skills: string[];
  color: string;
}

export interface PODetail {
  name: string;
  score: number;
  grade: string;
  category: string;
  skills: string[];
  color: string;
}

export interface ComplaintCategory {
  id: number;
  icon: string; // 문자열로 저장 (DB 호환)
  name: string;
  items: string[];
  color: string;
}

export interface ComplaintAttachment {
  id: number;
  name: string;
  size: string;
  url: string;
}

export interface Complaint {
  id: number;
  title: string;
  status: "접수" | "처리중" | "완료";
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

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface Evidence {
  course: string;
  task: string;
  score: string;
  competency: string;
  semester: string;
  date: string;
}

export interface JobFitItem {
  name: string;
  matchRate: number;
  category: string;
}

export interface JobFitData {
  recommendedJobs: JobFitItem[];
  topMatch: JobFitItem;
}

// ============================================================
// Mock Data
// ============================================================

// STAR 핵심역량 진단 데이터 (S:창의, T:실무, A:인성, R:소통)
export const radarData: RadarDataItem[] = [
  {
    subject: "S (창의)",
    myScore: 85,
    deptAvg: 72,
    totalAvg: 68,
    fullMark: 100,
  },
  {
    subject: "T (실무)",
    myScore: 78,
    deptAvg: 75,
    totalAvg: 70,
    fullMark: 100,
  },
  {
    subject: "A (인성)",
    myScore: 92,
    deptAvg: 80,
    totalAvg: 75,
    fullMark: 100,
  },
  {
    subject: "R (소통)",
    myScore: 70,
    deptAvg: 68,
    totalAvg: 65,
    fullMark: 100,
  },
];

// 전공능력(PO) 핵심역량 진단 데이터
export const radarDataPO: RadarDataItem[] = [
  {
    subject: "창의적문제해결",
    myScore: 87,
    deptAvg: 74,
    totalAvg: 70,
    fullMark: 100,
  },
  {
    subject: "전공실무기술",
    myScore: 83,
    deptAvg: 70,
    totalAvg: 66,
    fullMark: 100,
  },
  {
    subject: "정보활용능력",
    myScore: 82,
    deptAvg: 78,
    totalAvg: 73,
    fullMark: 100,
  },
  {
    subject: "글로벌역량",
    myScore: 75,
    deptAvg: 73,
    totalAvg: 68,
    fullMark: 100,
  },
  {
    subject: "대인관계",
    myScore: 77,
    deptAvg: 74,
    totalAvg: 69,
    fullMark: 100,
  },
  {
    subject: "자기계발능력",
    myScore: 90,
    deptAvg: 82,
    totalAvg: 77,
    fullMark: 100,
  },
  {
    subject: "직업윤리",
    myScore: 94,
    deptAvg: 78,
    totalAvg: 73,
    fullMark: 100,
  },
  {
    subject: "기술융합",
    myScore: 72,
    deptAvg: 70,
    totalAvg: 67,
    fullMark: 100,
  },
  {
    subject: "의사소통",
    myScore: 68,
    deptAvg: 66,
    totalAvg: 63,
    fullMark: 100,
  },
];

// 역량 상세 데이터
export const starDetails: Record<string, StarDetail> = {
  S: {
    name: "창의역량",
    score: 85,
    grade: "우수",
    skills: ["창의적사고", "문제해결", "통찰력", "혁신"],
    color: "#E94E3C",
  },
  T: {
    name: "실무역량",
    score: 78,
    grade: "보통",
    skills: ["전공지식", "실무기술", "현장적응", "정보활용", "분석", "기획"],
    color: "#F7941D",
  },
  A: {
    name: "인성역량",
    score: 92,
    grade: "최우수",
    skills: ["책임감", "성실성", "윤리의식", "협동심"],
    color: "#C13584",
  },
  R: {
    name: "소통역량",
    score: 70,
    grade: "보통",
    skills: ["경청", "설득", "조정", "리더십"],
    color: "#E94E3C",
  },
};

// 전공능력(PO) 상세 데이터
export const poDetails: Record<string, PODetail> = {
  창의적문제해결: {
    name: "창의적문제해결",
    score: 87,
    grade: "우수",
    category: "S",
    skills: ["대안도출", "문제정의", "창의적접근"],
    color: "#E94E3C",
  },
  전공실무기술: {
    name: "전공실무기술",
    score: 83,
    grade: "우수",
    category: "S",
    skills: ["장비운용", "실무적용", "기술활용"],
    color: "#E94E3C",
  },
  정보활용능력: {
    name: "정보활용능력",
    score: 82,
    grade: "우수",
    category: "T",
    skills: ["정보검색", "데이터분석", "문서작성"],
    color: "#F7941D",
  },
  글로벌역량: {
    name: "글로벌역량",
    score: 75,
    grade: "보통",
    category: "T",
    skills: ["외국어", "다문화이해", "글로벌마인드"],
    color: "#F7941D",
  },
  대인관계: {
    name: "대인관계",
    score: 77,
    grade: "보통",
    category: "T",
    skills: ["팀워크", "갈등관리", "협업"],
    color: "#F7941D",
  },
  자기계발능력: {
    name: "자기계발능력",
    score: 90,
    grade: "최우수",
    category: "A",
    skills: ["자율성", "학습능력", "경력개발"],
    color: "#C13584",
  },
  직업윤리: {
    name: "직업윤리",
    score: 94,
    grade: "최우수",
    category: "A",
    skills: ["준법성", "책임감", "직업의식"],
    color: "#C13584",
  },
  기술융합: {
    name: "기술융합",
    score: 72,
    grade: "보통",
    category: "R",
    skills: ["융합사고", "신기술이해", "응용력"],
    color: "#E94E3C",
  },
  의사소통: {
    name: "의사소통",
    score: 68,
    grade: "보통",
    category: "R",
    skills: ["경청", "발표", "문서이해"],
    color: "#E94E3C",
  },
};

// 민원 카테고리 (icon은 문자열로 저장 - DB 호환)
export const complaintCategories: ComplaintCategory[] = [
  {
    id: 1,
    icon: "Building",
    name: "시설 및 환경",
    items: ["강의실", "도서관", "화장실", "휴게실"],
    color: "#E94E3C",
  },
  {
    id: 2,
    icon: "GraduationCap",
    name: "학생 장학",
    items: [],
    color: "#4A90E2",
  },
  {
    id: 3,
    icon: "Heart",
    name: "학생 복지",
    items: ["장학금", "기숙사", "식당", "보건"],
    color: "#C13584",
  },
  {
    id: 4,
    icon: "BookOpen",
    name: "수업 및 학사",
    items: [],
    color: "#F7941D",
  },
];

// 민원 목록 데이터
export const complaints: Complaint[] = [
  {
    id: 1,
    title: "강의실 에어컨 고장",
    status: "처리중",
    date: "2025.01.15",
    category: "시설 및 환경",
    content:
      "3호관 401호 강의실 에어컨이 작동하지 않습니다. 확인 부탁드립니다. 수업에 지장이 있어 빠른 조치 부탁드립니다.",
    currentStep: 3,
    department: "시설관리팀",
    assignee: "김철수",
    isRead: true,
    isRated: false,
    rating: undefined,
  },
  {
    id: 2,
    title: "장학금 신청 기간 문의",
    status: "완료",
    date: "2025.01.14",
    category: "학생 복지",
    content:
      "2025년 1학기 장학금 신청 기간을 알고 싶습니다. 공지사항을 찾아보아도 보이지 않아 문의드립니다.",
    adminResponse:
      "2025년 1학기 장학금 신청 기간은 2월 1일부터 2월 15일까지입니다. 자세한 내용은 학과 홈페이지 공지사항을 참고해주세요.",
    responseDate: "2025.01.15",
    attachments: [
      { id: 1, name: "장학금_안내.pdf", size: "245KB", url: "#" },
      { id: 2, name: "2025-1학기_장학금신청서.pdf", size: "1.2MB", url: "#" },
    ],
    isRead: false,
    isRated: false,
    rating: undefined,
  },
  {
    id: 3,
    title: "휴학 신청 방법",
    status: "접수",
    date: "2025.01.13",
    category: "학사 및 수업",
    content:
      "개인적인 사정으로 인해 휴학을 하려고 합니다. 절차가 어떻게 되는지 궁금합니다.",
    currentStep: 1,
    isRead: true,
    isRated: false,
    rating: undefined,
  },
  {
    id: 4,
    title: "기숙사 식당 메뉴",
    status: "처리중",
    date: "2025.01.12",
    category: "학생 복지",
    content:
      "기숙사 식당 메뉴가 좀 더 다양했으면 좋겠습니다. 특히 저녁 메뉴 개선을 부탁드립니다.",
    currentStep: 2,
    department: "생활관운영팀",
    assignee: "이영희",
    isRead: false,
    isRated: false,
    rating: undefined,
  },
  {
    id: 5,
    title: "도서관 와이파이 연결",
    status: "완료",
    date: "2025.01.11",
    category: "시설 및 환경",
    content:
      "도서관 3층 열람실에서 와이파이 연결이 잘 되지 않습니다. 확인 후 조치 부탁드립니다.",
    adminResponse:
      "도서관 3층 와이파이 공유기 점검을 완료하였습니다. 현재 정상적으로 이용 가능합니다. 불편을 드려 죄송합니다.",
    responseDate: "2025.01.12",
    attachments: [
      { id: 1, name: "와이파이_점검_완료.jpg", size: "2.3MB", url: "#" },
    ],
    isRead: false,
    isRated: false,
    rating: undefined,
  },
];

// 알림 데이터
export const notifications: Notification[] = [
  {
    id: 1,
    title: "민원 처리 완료",
    message: "장학금 신청 기간 문의에 대한 답변이 등록되었습니다.",
    time: "10분 전",
    read: false,
  },
  {
    id: 2,
    title: "학사 공지사항",
    message: "2025학년도 1학기 수강신청 안내",
    time: "1시간 전",
    read: false,
  },
  {
    id: 3,
    title: "민원 접수 확인",
    message: "강의실 에어컨 고장 민원이 접수되었습니다.",
    time: "3시간 전",
    read: true,
  },
  {
    id: 4,
    title: "역량 진단 알림",
    message: "S(창의) 역량 진단이 시작되었습니다.",
    time: "1일 전",
    read: true,
  },
];

// FAQ 데이터
export const faqData: FAQ[] = [
  {
    id: 1,
    question: "장학금 신청 기간은 언제인가요?",
    answer: "매 학기 시작 1달 전 공지사항을 확인해주세요.",
  },
  {
    id: 2,
    question: "휴학 신청 방법은?",
    answer: "학생 포털 시스템 > 학적 변동 메뉴에서 가능합니다.",
  },
  {
    id: 3,
    question: "증명서 발급은 어디서 하나요?",
    answer: "본관 1층 무인발급기 또는 인터넷 증명발급 사이트를 이용해주세요.",
  },
  {
    id: 4,
    question: "기숙사 입사 신청 기간은?",
    answer: "학생 포털 > 생활관 > 입사신청 메뉴에서 확인 가능합니다.",
  },
  {
    id: 5,
    question: "비밀번호를 분실했어요.",
    answer: "학생 포털 로그인 화면의 비밀번호 찾기를 이용해주세요.",
  },
];

// Evidence 데이터
export const evidenceData: Evidence[] = [
  {
    course: "창의적문제해결",
    task: "팀 프로젝트 과제",
    score: "A+",
    competency: "S",
    semester: "2024-2학기",
    date: "2024.12.10",
  },
  {
    course: "전공실무기초",
    task: "실습 과제",
    score: "A",
    competency: "T",
    semester: "2024-2학기",
    date: "2024.12.08",
  },
  {
    course: "리더십과 소통",
    task: "발표 과제",
    score: "A+",
    competency: "R",
    semester: "2024-2학기",
    date: "2024.11.25",
  },
  {
    course: "자기계발",
    task: "진로 탐색 보고서",
    score: "A",
    competency: "A",
    semester: "2024-2학기",
    date: "2024.11.20",
  },
  {
    course: "정보활용",
    task: "데이터 분석 과제",
    score: "A+",
    competency: "T",
    semester: "2024-1학기",
    date: "2024.05.15",
  },
  {
    course: "직업윤리",
    task: "윤리 사례 분석",
    score: "B+",
    competency: "A",
    semester: "2024-1학기",
    date: "2024.05.10",
  },
  {
    course: "글로벌이해",
    task: "문화 이해 보고서",
    score: "A",
    competency: "S",
    semester: "2024-1학기",
    date: "2024.04.20",
  },
];
