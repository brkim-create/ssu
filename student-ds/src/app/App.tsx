import React, { useState, useRef, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Home, FileText, Bell, User, Plus, ChevronRight, ChevronDown, Award, Target, Briefcase, BookOpen, X, MessageCircle, Building, GraduationCap, Heart, Clock, CheckCircle, AlertCircle, Search, Settings, Download, Send, Trophy, Star, Check, TrendingUp, Share2, Copy, Link, RotateCw, Upload, Trash, CircleHelp, LogOut } from 'lucide-react';
import logoImage from 'figma:asset/a5f360b8c95401cf229a69f0c0d2de04cefbe043.png';
import Login from './Login';
import { checkAutoLogin, clearAuthTokens, AuthTokens } from './utils/auth';
import ChatModal from './components/chatbot/ChatModal';

// STAR 레이더 차트 데이터
const radarData = [
  { subject: 'S (창의)', myScore: 85, deptAvg: 72, totalAvg: 68, fullMark: 100 },
  { subject: 'T (실무)', myScore: 78, deptAvg: 75, totalAvg: 70, fullMark: 100 },
  { subject: 'A (인성)', myScore: 92, deptAvg: 80, totalAvg: 75, fullMark: 100 },
  { subject: 'R (소통)', myScore: 70, deptAvg: 68, totalAvg: 65, fullMark: 100 },
];

// 하위역량(PO) 레이더 차트 데이터
const radarDataPO = [
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

// 역량 상세 데이터
const starDetails = {
  S: { name: '창의', score: 85, grade: '우수', skills: ['기획', '실행', '화합', '통섭'], color: '#E94E3C' },
  T: { name: '실무', score: 78, grade: '보통', skills: ['전공지식', '전공기술', '정보화', '신기술활용', '공감', '판단'], color: '#F7941D' },
  A: { name: '인성', score: 92, grade: '마스터', skills: ['사명감', '조직이해', '도전성', '자기학습'], color: '#C13584' },
  R: { name: '소통', score: 70, grade: '보통', skills: ['경청', '협상', '외국어', '세계시민'], color: '#E94E3C' },
};

// 하위역량(PO) 상세 데이터
const poDetails = {
  '창의적 문제해결': { name: '창의적 문제해결', score: 87, grade: '우수', category: 'S', skills: ['문제분석', '해결방안 도출', '창의적 접근'], color: '#E94E3C' },
  '융복합적 사고': { name: '융복합적 사고', score: 83, grade: '우수', category: 'S', skills: ['다학제적 접근', '통합적 사고', '시너지 창출'], color: '#E94E3C' },
  '전문지식': { name: '전문지식', score: 82, grade: '우수', category: 'T', skills: ['전공이론', '실무적용', '지식체계'], color: '#F7941D' },
  '미래혁신': { name: '미래혁신', score: 75, grade: '보통', category: 'T', skills: ['신기술 활용', '트렌드 파악', '혁신 마인드'], color: '#F7941D' },
  '리더십': { name: '리더십', score: 77, grade: '보통', category: 'T', skills: ['팀 관리', '의사결정', '동기부여'], color: '#F7941D' },
  '공동체의식': { name: '공동체의식', score: 90, grade: '마스터', category: 'A', skills: ['협력', '배려', '사회적 책임'], color: '#C13584' },
  '자기계발': { name: '자기계발', score: 94, grade: '마스터', category: 'A', skills: ['자기주도학습', '목표설정', '성찰'], color: '#C13584' },
  '의사소통': { name: '의사소통', score: 72, grade: '보통', category: 'R', skills: ['경청', '표현', '공감'], color: '#E94E3C' },
  '글로컬 시민': { name: '글로컬 시민', score: 68, grade: '보통', category: 'R', skills: ['다문화 이해', '글로벌 마인드', '지역사회 참여'], color: '#E94E3C' },
};

// 민원 카테고리
const complaintCategories = [
  { id: 1, icon: Building, name: '시설 및 환경', items: ['강의실', '공용시설', '청결', '안전'], color: '#E94E3C' },
  { id: 2, icon: GraduationCap, name: '학생 장학', items: ['장학 기준', '신청', '심사', '지급 오류'], color: '#4A90E2' },
  { id: 3, icon: Heart, name: '학생 복지', items: ['생활 시설', '학습공간', '건강', '교통'], color: '#C13584' },
  { id: 4, icon: BookOpen, name: '수업 및 학사', items: ['강의 운영', '성적', '휴복학', '시스템 오류'], color: '#F7941D' },
];

// 민원 목록 데이터
const complaints = [
  { 
    id: 1, 
    title: '도서관 냉방 문제', 
    status: '처리중', 
    date: '2025.01.15', 
    category: '시설 및 환경', 
    content: '중앙도서관 3층 열람실의 냉방 시스템이 제대로 작동하지 않아 실내 온도가 너무 높습니다. 학습하기 어려운 환경이니 빠른 조치 부탁드립니다.',
    currentStep: 3, 
    department: '시설관리팀', 
    assignee: '김민수', 
    isRead: true, 
    isRated: false, 
    rating: undefined 
  },
  { 
    id: 2, 
    title: '장학금 지급 일정 문의', 
    status: '완료', 
    date: '2025.01.14', 
    category: '학생 장학',
    content: '2025학년도 1학기 장학금 지급 일정이 궁금합니다. 정확한 지급일과 확인 방법을 알려주세요.',
    adminResponse: '2025학년도 1학기 장학금은 2월 28일에 일괄 지급 예정입니다. 장학금 종류에 따라 지급일이 다를 수 있으니 학생포털에서 확인하시기 바랍니다.',
    responseDate: '2025.01.15',
    attachments: [
      { id: 1, name: '장학금_지급_일정표.pdf', size: '245KB', url: '#' },
      { id: 2, name: '2025-1학기_장학안내.pdf', size: '1.2MB', url: '#' }
    ],
    isRead: false,
    isRated: false,
    rating: undefined
  },
  { 
    id: 3, 
    title: '성적 정정 요청', 
    status: '접수', 
    date: '2025.01.13', 
    category: '수업 및 학사', 
    content: '데이터구조론 과목의 중간고사 점수가 실제 점수와 다르게 입력된 것 같습니다. 확인 후 정정 부탁드립니다.',
    currentStep: 1, 
    isRead: true, 
    isRated: false, 
    rating: undefined 
  },
  { 
    id: 4, 
    title: '기숙사 시설 보수', 
    status: '처리중', 
    date: '2025.01.12', 
    category: '학생 복지', 
    content: '제2생활관 301호 화장실 샤워기에서 온수가 나오지 않습니다. 겨울철이라 매우 불편한 상황입니다.',
    currentStep: 2, 
    department: '생활관리팀', 
    assignee: '이지은', 
    isRead: false, 
    isRated: false, 
    rating: undefined 
  },
  { 
    id: 5, 
    title: '강의실 프로젝터 고장', 
    status: '완료', 
    date: '2025.01.11', 
    category: '시설 및 환경',
    content: '공학관 301호 강의실 프로젝터가 켜지지 않습니다. 다음 주 발표 수업이 있어 빠른 수리가 필요합니다.',
    adminResponse: '301호 강의실 프로젝터를 새 제품으로 교체 완료하였습니다. 추가로 HDMI 케이블과 리모컨도 함께 교체하였으니 불편 없이 사용하실 수 있습니다.',
    responseDate: '2025.01.12',
    attachments: [
      { id: 1, name: '교체_완료_사진1.jpg', size: '2.3MB', url: '#' },
      { id: 2, name: '교체_완료_사진2.jpg', size: '1.8MB', url: '#' },
      { id: 3, name: '조치_보고서.pdf', size: '456KB', url: '#' }
    ],
    isRead: false,
    isRated: false,
    rating: undefined
  },
];

// 알림 데이터
const notifications = [
  { id: 1, title: '민원 처리 완료', message: '장학금 지급 일정 문의가 완료되었습니다.', time: '10분 전', read: false },
  { id: 2, title: '새 공지사항', message: '2025학년도 1학기 수강신청 안내', time: '1시간 전', read: false },
  { id: 3, title: '민원 상태 변경', message: '도서관 냉방 문제가 처리중으로 변경되었습니다.', time: '3시간 전', read: true },
  { id: 4, title: '역량 평가 완료', message: 'S(창의) 역량 점수가 업데이트되었습니다.', time: '1일 전', read: true },
];

// FAQ 데이터
const faqData = [
  { id: 1, question: '장학금 신청기간은 언제인가요?', answer: '매 학기 시작 2주 전부터 1주간 신청 가능합니다.' },
  { id: 2, question: '휴학 신청은 어떻게 하나요?', answer: '학생포털 > 학적 > 휴학신청에서 가능합니다.' },
  { id: 3, question: '성적 정정 기간은 언제인가요?', answer: '성적 공개 후 1주일 이내입니다.' },
  { id: 4, question: '기숙사 신청 방법이 궁금해요', answer: '학생포털 > 생활 > 기숙사 신청에서 가능합니다.' },
  { id: 5, question: '증명서 발급은 어디서 하나요?', answer: '무인발급기 또는 학생포털에서 가능합니다.' },
];

// Evidence 데이터
const evidenceData = [
  { course: '창의적 문제해결', task: '팀 프로젝트 발표', score: 'A+', competency: 'S', semester: '2024-2학기', date: '2024.12.10' },
  { course: '데이터분석실무', task: '기말 프로젝트', score: 'A', competency: 'T', semester: '2024-2학기', date: '2024.12.08' },
  { course: '리더십과 소통', task: '토론 참여', score: 'A+', competency: 'R', semester: '2024-2학기', date: '2024.11.25' },
  { course: '직업윤리', task: '사례분석 보고서', score: 'A', competency: 'A', semester: '2024-2학기', date: '2024.11.20' },
  { course: '알고리즘', task: '중간 프로젝트', score: 'A+', competency: 'T', semester: '2024-1학기', date: '2024.05.15' },
  { course: '조직행동론', task: '팀 과제', score: 'B+', competency: 'A', semester: '2024-1학기', date: '2024.05.10' },
  { course: '창업과 혁신', task: '비즈니스 모델 개발', score: 'A', competency: 'S', semester: '2024-1학기', date: '2024.04.20' },
  { course: '프레젠테이션 스킬', task: '발표 평가', score: 'A+', competency: 'R', semester: '2024-1학기', date: '2024.04.15' },
  { course: '디자인씽킹', task: '프로토타입 제작', score: 'A', competency: 'S', semester: '2023-2학기', date: '2023.12.05' },
  { course: '데이터베이스', task: '시스템 설계', score: 'B+', competency: 'T', semester: '2023-2학기', date: '2023.11.30' },
  { course: '봉사활동론', task: '지역사회 봉사', score: 'A+', competency: 'A', semester: '2023-2학기', date: '2023.11.10' },
  { course: '영어회화', task: '토론 및 발표', score: 'A', competency: 'R', semester: '2023-2학기', date: '2023.10.25' },
];

export default function StudentDashboard() {
  // 인증 상태 관리
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // 자동 로그인 체크
  useEffect(() => {
    const tokens = checkAutoLogin();
    setAuthTokens(tokens);
    setIsCheckingAuth(false);
  }, []);

  // 로그인 핸들러
  const handleLoginSuccess = (tokens: AuthTokens) => {
    setAuthTokens(tokens);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    clearAuthTokens();
    setAuthTokens(null);
  };

  const [activeTab, setActiveTab] = useState('home');
  const [radarToggle, setRadarToggle] = useState<'core' | 'po'>('core'); // 레이더 토글: 핵심역량 vs 하위역량
  const [selectedStar, setSelectedStar] = useState<string | null>(null);
  const [selectedPO, setSelectedPO] = useState<string | null>(null);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [evidenceFilter, setEvidenceFilter] = useState<string>('전체');
  const [evidenceSort, setEvidenceSort] = useState<string>('최신순');
  const [showComplaintListModal, setShowComplaintListModal] = useState(false);
  const [complaintStatusFilter, setComplaintStatusFilter] = useState<string>('전체');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] = useState(false);
  const [showLoginInfoModal, setShowLoginInfoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successType, setSuccessType] = useState<'complete' | 'submit'>('complete');
  const [notificationChannels, setNotificationChannels] = useState({
    pwa: true,
    kakao: false,
    email: true,
  });
  const [complaintReadStatus, setComplaintReadStatus] = useState<{[key: number]: boolean}>({});
  const [complaintRatedStatus, setComplaintRatedStatus] = useState<{[key: number]: boolean}>({});
  const [complaintRatings, setComplaintRatings] = useState<{[key: number]: number}>({});
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingComplaintId, setRatingComplaintId] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState('');
  const [complaintDetailModal, setComplaintDetailModal] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [periodFilter, setPeriodFilter] = useState('전체');
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadPeriod, setDownloadPeriod] = useState('전체');
  const [downloadFormat, setDownloadFormat] = useState('PDF');
  
  // 민원 작성 폼 state
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintContent, setComplaintContent] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<Array<{
    id: string;
    file: File;
    preview: string;
    rotation: number;
  }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 채팅 모달 state
  const [showChatModal, setShowChatModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>(''); // 현재 채팅 카테고리 추적

  // 작성 옵션 state
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [agreeNotification, setAgreeNotification] = useState(false);
  const [showFileInfo, setShowFileInfo] = useState(false);

  // 자동 저장 (30초마다)
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (complaintTitle || complaintContent) {
        localStorage.setItem('complaint_draft', JSON.stringify({
          title: complaintTitle,
          content: complaintContent,
          timestamp: new Date().toISOString()
        }));
        console.log('✅ 자동 저장 완료');
      }
    }, 30000); // 30초

    return () => clearInterval(autoSaveInterval);
  }, [complaintTitle, complaintContent]);

  // 파일 선택 처리
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 5 - attachedFiles.length);
    
    newFiles.forEach(file => {
      // 파일 크기 체크 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name}은(는) 10MB를 초과합니다.`);
        return;
      }

      // 파일 형식 체크
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert(`${file.name}은(는) 지원하지 않는 형식입니다.`);
        return;
      }

      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedFiles(prev => [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: event.target?.result as string,
          rotation: 0
        }]);
      };
      reader.readAsDataURL(file);
    });

    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 파일 삭제
  const removeFile = (id: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== id));
  };

  // 이미지 회전
  const rotateImage = (id: string) => {
    setAttachedFiles(prev => prev.map(f => 
      f.id === id ? { ...f, rotation: (f.rotation + 90) % 360 } : f
    ));
  };

  // 상태별 색상
  const statusColor: Record<string, string> = {
    '접수': 'bg-blue-100 text-blue-600',
    '처리중': 'bg-orange-100 text-orange-600',
    '완료': 'bg-green-100 text-green-600',
    '반려': 'bg-red-100 text-red-600',
  };

  // 등급별 배지
  const gradeBadge: Record<string, { bg: string; icon: JSX.Element }> = {
    '마스터': { bg: 'bg-[#FAAF40]', icon: <Trophy className="w-3 h-3" /> },
    '우수': { bg: 'bg-[#EE3E42]', icon: <Star className="w-3 h-3" /> },
    '보통': { bg: 'bg-[#e2e8f0]', icon: <Check className="w-3 h-3" /> },
    '노력요망': { bg: 'bg-[#C5006F]', icon: <TrendingUp className="w-3 h-3" /> },
  };

  // 민원 통계
  const complaintStats = {
    접수: complaints.filter(c => c.status === '접수').length,
    처리중: complaints.filter(c => c.status === '처리중').length,
    완료: complaints.filter(c => c.status === '완료').length,
  };
  const completionRate = Math.round((complaintStats.완료 / complaints.length) * 100);

  // 민원 필터링
  const getFilteredComplaints = () => {
    let filtered = complaints;

    // 1. 상태 필터링
    if (complaintStatusFilter !== '전체') {
      filtered = filtered.filter(c => c.status === complaintStatusFilter);
    }

    // 2. 기간 필터링
    if (periodFilter !== '전체') {
      const now = new Date();
      const monthsAgo = periodFilter === '1개월' ? 1 : periodFilter === '3개월' ? 3 : 6;
      const filterDate = new Date(now.setMonth(now.getMonth() - monthsAgo));
      
      filtered = filtered.filter(c => {
        const complaintDate = new Date(c.date.replace(/\./g, '-'));
        return complaintDate >= filterDate;
      });
    }

    // 3. 키워드 필터링
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(keyword) || 
        c.content.toLowerCase().includes(keyword)
      );
    }

    return filtered;
  };

  // 민원 목록 모달 닫기 (X버튼)
  const handleCloseComplaintListModal = () => {
    setShowComplaintListModal(false);
    setSearchKeyword('');
    setPeriodFilter('전체');
  };

  // "평가하기" 버튼 클릭
  const handleRateComplaint = (complaintId: number) => {
    setRatingComplaintId(complaintId);
    setShowRatingModal(true);
  };

  // 만족도 평가 제출
  const handleRatingSubmit = () => {
    if (ratingComplaintId && selectedRating > 0) {
      setComplaintRatedStatus({...complaintRatedStatus, [ratingComplaintId]: true});
      setComplaintRatings({...complaintRatings, [ratingComplaintId]: selectedRating});
      setShowRatingModal(false);
      setShowComplaintListModal(false);
      setRatingComplaintId(null);
      setSelectedRating(0);
      setRatingComment('');
      alert('평가해 주셔서 감사합니다!');
    }
  };

  // 홈 화면
  const HomeScreen = () => (
    <div className="pb-4">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4 rounded-[0px]">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* 인사말 + 종합 점수 카드 */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mt-2">
          <div className="flex items-center justify-between gap-4">
            {/* 좌측: 인사말 */}
            <div>
              <p className="text-sm opacity-90">안녕하세요</p>
              <p className="font-bold text-lg text-[24px]">김수성 님</p>
            </div>
            
            {/* 우측: 종합 역량 점수 */}
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">종합 역량 점수</p>
              <div className="flex items-end gap-2 justify-end">
                <span className="text-4xl font-bold text-[32px]">81.3</span>
                <span className="text-lg mb-1 text-[16px]">/ 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STAR 레이더 차트 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">종합 현황 레이더</h3>
        </div>

        {/* 토글 버튼 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setRadarToggle('core')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              radarToggle === 'core'
                ? 'bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            S·T·A·R 핵심역량
          </button>
          <button
            onClick={() => setRadarToggle('po')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              radarToggle === 'po'
                ? 'bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            하위역량(PO)
          </button>
        </div>

        <div style={{ width: '100%', height: '280px' }}>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarToggle === 'core' ? radarData : radarDataPO}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: radarToggle === 'po' ? 10 : 12, fill: '#374151' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} />
              {/* 먼저 채색 영역 렌더링 (뒤에 배치) */}
              <Radar name="내 점수" dataKey="myScore" stroke="#FFA500" fill="#FFA500" fillOpacity={0.15} strokeWidth={2} />
              {/* 그 다음 라인들 렌더링 (위에 배치) */}
              <Radar name="학과 평균" dataKey="deptAvg" stroke="#FF6B35" fill="none" strokeWidth={2} />
              <Radar name="전체 평균" dataKey="totalAvg" stroke="#C13584" fill="none" strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 커스텀 범례 */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFA500]"></div>
            <span className="text-xs text-gray-600">내 점수</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]"></div>
            <span className="text-xs text-gray-600">학과 평균</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C13584]"></div>
            <span className="text-xs text-gray-600">전체 평균</span>
          </div>
        </div>
      </div>

      {/* 역량 등급 Badge */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">역량 등급</h3>
        
        {radarToggle === 'core' ? (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(starDetails).map(([key, value]) => (
              <div 
                key={key}
                onClick={() => setSelectedStar(key)}
                className="bg-gray-50 rounded-2xl shadow p-4 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center gap-6">
                  {/* 왼쪽 프레임: S + 창의 */}
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="w-10 h-10 flex items-center justify-center font-bold text-2xl"
                         style={{ color: '#0f172a' }}>
                      {key}
                    </div>
                    <p className="text-sm text-gray-600">{value.name}</p>
                  </div>
                  
                  {/* 오른쪽 프레임: 85점 + 우수 */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-2xl font-bold" style={{ color: '#0f172a' }}>{value.score}점</p>
                    <div className={`${gradeBadge[value.grade].bg} ${value.grade === '보통' ? 'text-[#0f172a]' : 'text-white'} text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 whitespace-nowrap`}>
                      <span>{gradeBadge[value.grade].icon}</span>
                      <span className="text-[12px]">{value.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(poDetails).map(([key, value]) => (
              <div 
                key={key}
                onClick={() => setSelectedPO(key)}
                className="bg-gray-50 rounded-xl shadow p-3 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                         style={{ backgroundColor: `${value.color}20`, color: value.color }}>
                      {value.category}
                    </div>
                    <p className="text-sm font-medium text-gray-800">{value.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-gray-800">{value.score}점</p>
                    <div className={`${gradeBadge[value.grade].bg} ${value.grade === '보통' ? 'text-[#0f172a]' : 'text-white'} text-[10px] px-2 py-1.5 rounded-full inline-flex items-center justify-center gap-1 whitespace-nowrap min-w-[60px]`}>
                      <span>{gradeBadge[value.grade].icon}</span>
                      <span className="text-[11px]">{value.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 표준직무 적합도 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">표준직무 적합도</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">학과 취업자 평균 대비</span>
          <span className="text-2xl font-bold text-orange-500">78%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full" style={{ width: '78%' }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-2 mb-4">※ 나의 이수 역량과 학과 졸업생(취업자) 평균 역량 일치도</p>
        
        {/* 추천 직무 적합도 */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-bold text-gray-800 mb-3">추천 직무</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="text-sm text-gray-600 mb-1">소프트웨어 개발자</div>
                <div className="text-2xl font-bold text-gray-600">92%</div>
              </div>
              <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">적합</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200/20">
              <div>
                <div className="text-sm text-gray-600 mb-1">데이터 분석가</div>
                <div className="text-2xl font-bold text-gray-500">85%</div>
              </div>
              <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">적합</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200/20">
              <div>
                <div className="text-sm text-gray-600 mb-1">IT 컨설턴트</div>
                <div className="text-2xl font-bold text-gray-500">78%</div>
              </div>
              <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">보통</div>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence 트래킹 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Evidence 트래킹</h3>
          <button 
            onClick={() => setShowEvidenceModal(true)}
            className="text-sm text-pink-500 font-medium"
          >
            전체 보기
          </button>
        </div>
        <div className="space-y-2">
          {evidenceData.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                     style={{ backgroundColor: starDetails[item.competency as keyof typeof starDetails].color }}>
                  {item.competency}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{item.course}</p>
                  <p className="text-xs text-gray-500">{item.task}</p>
                </div>
              </div>
              <span className="font-bold text-green-600">{item.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 행동지표 모달 (핵심역량) */}
      {selectedStar && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                     style={{ backgroundColor: starDetails[selectedStar as keyof typeof starDetails].color }}>
                  {selectedStar}
                </div>
                <div>
                  <h3 className="font-bold text-xl">{starDetails[selectedStar as keyof typeof starDetails].name} 역량</h3>
                  <p className="text-gray-500">행동지표 달성도</p>
                </div>
              </div>
              <button onClick={() => setSelectedStar(null)} className="p-2">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              {starDetails[selectedStar as keyof typeof starDetails].skills.map((skill, idx) => {
                const progress = Math.floor(Math.random() * 40) + 60;
                return (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{skill}</span>
                      <span className="font-bold" style={{ color: starDetails[selectedStar as keyof typeof starDetails].color }}>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" 
                           style={{ width: `${progress}%`, backgroundColor: starDetails[selectedStar as keyof typeof starDetails].color }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 행동지표 모달 (하위역량 PO) */}
      {selectedPO && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                     style={{ backgroundColor: `${poDetails[selectedPO as keyof typeof poDetails].color}20`, color: poDetails[selectedPO as keyof typeof poDetails].color }}>
                  {poDetails[selectedPO as keyof typeof poDetails].category}
                </div>
                <div>
                  <h3 className="font-bold text-xl">{poDetails[selectedPO as keyof typeof poDetails].name}</h3>
                  <p className="text-gray-500">행동지표 달성도</p>
                </div>
              </div>
              <button onClick={() => setSelectedPO(null)} className="p-2">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              {poDetails[selectedPO as keyof typeof poDetails].skills.map((skill, idx) => {
                const progress = Math.floor(Math.random() * 40) + 60;
                return (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{skill}</span>
                      <span className="font-bold" style={{ color: poDetails[selectedPO as keyof typeof poDetails].color }}>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" 
                           style={{ width: `${progress}%`, backgroundColor: poDetails[selectedPO as keyof typeof poDetails].color }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // 민원 화면
  const ComplaintScreen = () => (
    <div className="pb-4">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
        <h2 className="font-bold text-xl">민원 센터</h2>
        <p className="text-sm opacity-90 mb-3">문의사항을 편리하게 접수하세요</p>
        
        {/* 처리율 카드 - 헤더 내부 */}
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white font-medium whitespace-nowrap">처리율</span>
            <div className="flex-1 bg-white/30 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" 
                   style={{ width: `${completionRate}%` }}></div>
            </div>
            <span className="font-bold text-white whitespace-nowrap">{completionRate}%</span>
          </div>
        </div>
      </div>

      {/* 민원 현황판 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">내 민원 현황</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => {
              setComplaintStatusFilter('접수');
              setShowComplaintListModal(true);
            }}
            className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <p className="text-2xl font-bold text-blue-600">{complaintStats.접수}</p>
            <p className="text-xs text-gray-600">접수</p>
          </button>
          <button 
            onClick={() => {
              setComplaintStatusFilter('처리중');
              setShowComplaintListModal(true);
            }}
            className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <p className="text-2xl font-bold text-orange-600">{complaintStats.처리중}</p>
            <p className="text-xs text-gray-600">처리중</p>
          </button>
          <button 
            onClick={() => {
              setComplaintStatusFilter('완료');
              setShowComplaintListModal(true);
            }}
            className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <p className="text-2xl font-bold text-green-600">{complaintStats.완료}</p>
            <p className="text-xs text-gray-600">완료</p>
          </button>
        </div>
      </div>

      {/* 민원 카테고리 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">민원 카테고리</h3>
        <div className="grid grid-cols-2 gap-3">
          {complaintCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentCategory(cat.name);
                setShowChatModal(true);
              }}
              className="bg-gray-50 rounded-2xl shadow p-5 text-left hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <cat.icon className="w-6 h-6 text-gray-500" />
              </div>
              <p className="font-bold text-gray-800 mb-1">{cat.name}</p>
              <p className="text-xs text-gray-500">{cat.items.length}개 세부항목</p>
            </button>
          ))}
        </div>
      </div>

      {/* 민원 접수 모달 */}
      {showComplaintModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[90vh] flex flex-col animate-slide-up">
            {/* 고정 상단 영역 */}
            <div className="p-6 pb-4 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: `${selectedCategory.color}20` }}>
                    <selectedCategory.icon className="w-5 h-5" style={{ color: selectedCategory.color }} />
                  </div>
                  <h3 className="font-bold text-lg">{selectedCategory.name}</h3>
                </div>
                <button onClick={() => { 
                  setShowComplaintModal(false); 
                  setSelectedCategory(null);
                  setComplaintTitle('');
                  setComplaintContent('');
                  setAttachedFiles([]);
                  setSelectedSubCategory(null);
                }}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* 상세 카테고리 선택 */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">세부 카테고리 선택</label>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory.items.map((item: string, idx: number) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedSubCategory(item)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedSubCategory === item
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 스크롤 가능한 중간 영역 */}
            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-4 pb-4">
                {/* 제목 입력 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 font-bold">제목</label>
                    <span className="text-sm font-medium text-gray-500 text-[12px]">
                      {complaintTitle.length}/50
                    </span>
                  </div>
                  <input 
                    type="text"
                    placeholder="제목을 입력하세요 (최대 50자)"
                    maxLength={50}
                    value={complaintTitle}
                    onChange={(e) => setComplaintTitle(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-[6px] focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                {/* 문의 내용 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 text-[14px] font-bold">내용</label>
                    <span className="text-sm font-medium text-gray-500 text-[12px]">
                      {complaintContent.length}/100
                    </span>
                  </div>
                  <textarea 
                    placeholder="문의하실 내용을 작성해 주세요 (최대 100자)"
                    rows={6}
                    maxLength={100}
                    value={complaintContent}
                    onChange={(e) => setComplaintContent(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-[6px] focus:outline-none focus:border-blue-500 resize-none text-sm"
                  />
                </div>

                {/* 파일 첨부 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <label className="text-sm font-medium text-gray-700 font-bold">파일 첨부</label>
                      <button
                        onClick={() => setShowFileInfo(!showFileInfo)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        type="button"
                      >
                        <CircleHelp className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm font-medium text-blue-600 text-[12px]">
                      {attachedFiles.length}/5
                    </span>
                  </div>
                  
                  {/* 파일 안내 툴팁 */}
                  {showFileInfo && (
                    <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Upload className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div className="text-xs text-blue-900 space-y-1">
                          <p className="font-medium">📎 파일 첨부 안내</p>
                          <ul className="space-y-0.5 ml-1">
                            <li>• 최대 5개 파일</li>
                            <li>• 개당 10MB 이하</li>
                            <li>• JPG, PNG, PDF, DOCX</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-[6px] p-4 text-center">
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      multiple 
                      accept=".jpg,.jpeg,.png,.pdf,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={attachedFiles.length >= 5}
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={attachedFiles.length >= 5}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="text-sm font-medium">파일 선택</span>
                    </button>
                  </div>

                  {/* 파일 미리보기 */}
                  {attachedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {attachedFiles.map((fileItem) => (
                        <div key={fileItem.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          {/* 썸네일 */}
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
                            {fileItem.file.type.startsWith('image/') ? (
                              <img 
                                src={fileItem.preview} 
                                alt={fileItem.file.name}
                                style={{ transform: `rotate(${fileItem.rotation}deg)` }}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FileText className="w-8 h-8 text-gray-400" />
                            )}
                          </div>

                          {/* 파일 정보 */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {fileItem.file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(fileItem.file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>

                          {/* 액션 버튼 */}
                          <div className="flex items-center gap-1 shrink-0">
                            {fileItem.file.type.startsWith('image/') && (
                              <button 
                                onClick={() => rotateImage(fileItem.id)}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-all"
                                title="회전"
                              >
                                <RotateCw className="w-4 h-4 text-gray-600" />
                              </button>
                            )}
                            <button 
                              onClick={() => removeFile(fileItem.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-all"
                              title="삭제"
                            >
                              <Trash className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 작성 옵션 */}
                {/* 작성 옵션 */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">작성옵션</h3>
                  
                  {/* 익명 옵션 */}
                  <label className="flex items-start gap-3 mb-4 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-5 h-5 accent-blue-500 mt-0.5 shrink-0" 
                    />
                    <span className="text-gray-700">
                      <span className="font-medium text-[14px]">익명으로 작성</span><br/>
                      <span className="text-xs text-gray-500">작성자명 숨김 (관리자는 식별 가능)</span>
                    </span>
                  </label>
                  
                  {/* 알림 동의 */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={agreeNotification}
                      onChange={(e) => setAgreeNotification(e.target.checked)}
                      className="w-5 h-5 accent-blue-500 mt-0.5 shrink-0" 
                    />
                    <span className="text-gray-700">
                      <span className="font-medium text-[14px]">처리 결과 알림 수신 동의</span><br/>
                      <span className="text-xs text-gray-500">Push, Email로 결과를 받으시려면 동의해주세요</span>
                    </span>
                  </label>
                </div>

                {/* 공개 설정 */}
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-800 font-medium text-sm block mb-0.5">나만 보기</span>
                      <span className="text-xs text-gray-500">다른 학생에게는 비공개 처리 (기본값: 비공개)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsPrivate(!isPrivate)}
                      className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                        isPrivate ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          isPrivate ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 고정 하단 영역 */}
            <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
              <button 
                onClick={() => {
                  alert(`민원이 접수되었습니다!\n\n카테고리: ${selectedCategory.name}\n제목: ${complaintTitle}\n내용: ${complaintContent}\n첨부파일: ${attachedFiles.length}개`);
                  setShowComplaintModal(false);
                  setSelectedCategory(null);
                  setComplaintTitle('');
                  setComplaintContent('');
                  setAttachedFiles([]);
                  setSelectedSubCategory(null);
                  localStorage.removeItem('complaint_draft');
                }}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                제출하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 플로팅 버튼 */}
      <button 
        onClick={() => {
          setSelectedCategory(complaintCategories[0]);
          setShowComplaintModal(true);
        }}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg flex items-center justify-center text-white z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* FAQ 모달 */}
      {showFAQ && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">자주 찾는 질문</h3>
              <button onClick={() => setShowFAQ(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-2">
              {faqData.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedFAQ === faq.id ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-4 pb-4 text-gray-600 text-sm bg-gray-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-orange-50 rounded-2xl">
              <p className="text-sm text-orange-700">원하는 답변을 찾지 못하셨나요?</p>
              <button 
                onClick={() => { setShowFAQ(false); setShowComplaintModal(true); }}
                className="mt-2 text-orange-600 font-medium text-sm"
              >
                직접 문의하기 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // 알림 화면
  const NotificationScreen = () => (
    <div className="pb-4">
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
        <h2 className="font-bold text-xl">알림</h2>
        <p className="text-sm opacity-90">새로운 소식을 확인하세요</p>
      </div>

      <div className="mx-4 mt-4 space-y-3">
        {notifications.map((notif) => (
          <div key={notif.id} className={`bg-white rounded-2xl shadow p-4 ${!notif.read ? 'border-l-4 border-pink-500' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notif.read ? 'bg-pink-100' : 'bg-gray-100'}`}>
                  <Bell className={`w-5 h-5 ${!notif.read ? 'text-pink-500' : 'text-gray-400'}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{notif.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                </div>
              </div>
              {!notif.read && <div className="w-2 h-2 bg-pink-500 rounded-full"></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 마이페이지 화면
  const MyPageScreen = () => (
    <div className="pb-4">
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4 pb-16">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
        <h2 className="font-bold text-xl">마이페이지</h2>
      </div>

      {/* 프로필 카드 */}
      <div className="mx-4 -mt-10 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {authTokens?.userName?.[0] || '학'}
          </div>
          <div>
            <p className="font-bold text-lg">{authTokens?.userName || '사용자'}</p>
            <p className="text-gray-500 text-sm">
              {authTokens?.userType === 'student' ? '컴퓨터공학과 3학년' : '컴퓨터공학과 교수'}
            </p>
            <p className="text-gray-400 text-xs">{authTokens?.userId || '202012345'}</p>
          </div>
        </div>
      </div>

      {/* 메뉴 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        <button 
          onClick={() => setShowNotificationSettingsModal(true)}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <span>알림 설정</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button 
          onClick={() => setShowDownloadModal(true)}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-gray-400" />
            <span>민원 이력 다운로드</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button 
          onClick={() => {
            setComplaintStatusFilter('전체');
            setShowComplaintListModal(true);
          }}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <span>내가 쓴 민원 전체보기</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button 
          onClick={() => setShowLoginInfoModal(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <span>로그인 정보 (SSO)</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <button 
        onClick={handleLogout}
        className="mx-4 mt-4 w-[calc(100%-2rem)] py-3 text-red-500 hover:text-red-600 transition-all flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        로그아웃
      </button>
    </div>
  );

  // Evidence 필터링 및 정렬
  const getFilteredEvidence = () => {
    let filtered = evidenceData;
    
    // 필터링
    if (evidenceFilter !== '전체') {
      filtered = filtered.filter(item => item.competency === evidenceFilter);
    }
    
    // 정렬
    if (evidenceSort === '최신순') {
      filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (evidenceSort === '점수순') {
      const scoreValue: Record<string, number> = { 'A+': 4.5, 'A': 4.0, 'B+': 3.5, 'B': 3.0 };
      filtered = [...filtered].sort((a, b) => (scoreValue[b.score] || 0) - (scoreValue[a.score] || 0));
    }
    
    return filtered;
  };

  // 학기별 그룹핑
  const groupBySemester = (data: typeof evidenceData) => {
    const grouped: Record<string, typeof evidenceData> = {};
    data.forEach(item => {
      if (!grouped[item.semester]) {
        grouped[item.semester] = [];
      }
      grouped[item.semester].push(item);
    });
    return grouped;
  };

  // 로딩 중일 때
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 로그인하지 않은 경우
  if (!authTokens) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 max-w-md mx-auto relative overflow-hidden">
      {/* 메인 컨텐츠 */}
      <div className="pb-20">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'complaint' && <ComplaintScreen />}
        {activeTab === 'notification' && <NotificationScreen />}
        {activeTab === 'mypage' && <MyPageScreen />}
      </div>

      {/* 채팅 모달 */}
      <ChatModal
        isOpen={showChatModal}
        onClose={() => {
          setShowChatModal(false);
          setCurrentCategory('');
        }}
        category={currentCategory}
        onSuccess={(message, type) => {
          setSuccessMessage(message);
          setSuccessType(type);
          setShowSuccessModal(true);
        }}
      />

      {/* 민원 리스트 모달 */}
      {showComplaintListModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl h-[85vh] flex flex-col">
            {/* 고정 상단 영역 */}
            <div className="shrink-0">
              {/* 헤더 */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <h3 className="font-bold text-xl">내 민원 내역</h3>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500">총 {getFilteredComplaints().length}건</p>
                  <button onClick={handleCloseComplaintListModal}>
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* 상태 필터 탭 (언더라인 스타일) */}
              <div className="flex border-b border-gray-200 px-6">
                {['전체', '접수', '처리중', '완료'].map((status) => {
                  const count = status === '전체' 
                    ? complaints.length 
                    : complaints.filter(c => c.status === status).length;
                  
                  return (
                    <button
                      key={status}
                      onClick={() => setComplaintStatusFilter(status)}
                      className={`relative px-4 py-3 font-medium transition-all ${
                        complaintStatusFilter === status
                          ? 'text-gray-900'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {status}
                        <span className={`text-xs ${
                          complaintStatusFilter === status
                            ? 'text-red-500'
                            : 'text-gray-400'
                        }`}>
                          {count}
                        </span>
                      </span>
                      {complaintStatusFilter === status && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 검색창 + 기간 필터 */}
              <div className="px-6 pt-4 pb-3">
                {/* 검색바 */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="민원 제목 또는 내용 검색..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                  {searchKeyword && (
                    <button
                      onClick={() => setSearchKeyword('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>

                {/* 기간 필터 */}
                <div className="flex gap-2">
                  {['전체', '1개월', '3개월', '6개월'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setPeriodFilter(period)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        periodFilter === period
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 스크롤 가능한 중간 영역 */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="space-y-3 pb-4">
                {getFilteredComplaints().length > 0 ? (
                  getFilteredComplaints().map((complaint) => (
                  <div 
                    key={complaint.id} 
                    className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setComplaintDetailModal(complaint);
                      setShowComplaintListModal(false);
                      if (!complaint.isRead && !complaintReadStatus[complaint.id]) {
                        setComplaintReadStatus(prev => ({ ...prev, [complaint.id]: true }));
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <h4 className="font-bold text-gray-800">{complaint.title}</h4>
                        {!complaint.isRead && !complaintReadStatus[complaint.id] && (
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {/* 완료 상태일 때는 별점/평가하기 표시, 그 외에는 상태 태그 표시 */}
                        {complaint.status === '완료' ? (
                          <>
                            {complaintRatings[complaint.id] ? (
                              <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-medium text-yellow-600">{complaintRatings[complaint.id]}.0</span>
                              </div>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRateComplaint(complaint.id);
                                }}
                                className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium hover:bg-yellow-100 transition-colors"
                              >
                                평가하기
                              </button>
                            )}
                          </>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[complaint.status]}`}>
                            {complaint.status}
                          </span>
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                      <span>{complaint.category}</span>
                      <span>{complaint.date}</span>
                    </div>
                  </div>
                ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Search className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium mb-1">검색 결과가 없습니다</p>
                    <p className="text-sm text-gray-400">다른 검색어나 필터를 시도해보세요</p>
                  </div>
                )}
              </div>
            </div>

            {/* 고정 하단 영역 */}
            <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
              <button className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                민원 내역 다운로드
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evidence 전체보기 모달 */}
      {showEvidenceModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] flex flex-col">
            {/* 고정 상단 영역 */}
            <div className="p-6 pb-0 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-xl">Evidence 전체 내역</h3>
                  <p className="text-sm text-gray-500">총 {evidenceData.length}건</p>
                </div>
                <button onClick={() => setShowEvidenceModal(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* 필터 탭 */}
              <div className="flex items-center justify-between gap-3 mb-4">
                {/* 이전 버튼 */}
                <button
                  onClick={() => {
                    if (filterScrollRef.current) {
                      filterScrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
                    }
                  }}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all shrink-0"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
                </button>

                {/* 카테고리 스크롤 영역 */}
                <div 
                  ref={filterScrollRef}
                  className="flex-1 overflow-x-auto scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex gap-2">
                    {['전체', 'S', 'T', 'A', 'R'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setEvidenceFilter(filter)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                          evidenceFilter === filter
                            ? 'text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                        style={
                          evidenceFilter === filter && filter !== '전체'
                            ? { backgroundColor: starDetails[filter as keyof typeof starDetails].color }
                            : evidenceFilter === filter
                            ? { background: 'linear-gradient(to right, #E94E3C, #F7941D)' }
                            : {}
                        }
                      >
                        {filter === '전체' ? '전체' : `${filter} (${starDetails[filter as keyof typeof starDetails].name})`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 다음 버튼 */}
                <button
                  onClick={() => {
                    if (filterScrollRef.current) {
                      filterScrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
                    }
                  }}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all shrink-0"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* 정렬 옵션 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  {['최신순', '학기별', '점수순'].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setEvidenceSort(sort)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        evidenceSort === sort
                          ? 'bg-pink-100 text-pink-600 font-medium'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 스크롤 가능한 중간 영역 */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {/* 학기별 그룹 */}
              {evidenceSort === '학기별' ? (
                <div className="space-y-4">
                  {Object.entries(groupBySemester(getFilteredEvidence())).map(([semester, items]) => (
                    <div key={semester}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                        <h4 className="font-bold text-gray-800">{semester}</h4>
                        <span className="text-xs text-gray-500">({items.length}건)</span>
                      </div>
                      <div className="space-y-2">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                style={{ backgroundColor: starDetails[item.competency as keyof typeof starDetails].color }}
                              >
                                {item.competency}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-sm">{item.course}</p>
                                <p className="text-xs text-gray-500">{item.task}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                              </div>
                            </div>
                            <span className="font-bold text-green-600">{item.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {getFilteredEvidence().map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: starDetails[item.competency as keyof typeof starDetails].color }}
                        >
                          {item.competency}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{item.course}</p>
                          <p className="text-xs text-gray-500">{item.task}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.semester} · {item.date}</p>
                        </div>
                      </div>
                      <span className="font-bold text-green-600">{item.score}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 고정 하단 영역 */}
            <div className="p-6 pt-4 shrink-0">
              <button className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                PDF로 다운로드
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 성공 모달 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 animate-scale-up shadow-2xl">
            <div className="flex flex-col items-center text-center">
              {/* 아이콘 */}
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
                {successType === 'complete' ? (
                  <CheckCircle className="w-10 h-10 text-white" />
                ) : (
                  <Send className="w-10 h-10 text-white" />
                )}
              </div>
              
              {/* 메시지 */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {successType === 'complete' ? '완료되었습니다!' : '접수 완료!'}
              </h3>
              <p className="text-gray-600 whitespace-pre-line mb-6">
                {successMessage}
              </p>
              
              {/* 확인 버튼 */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'home', icon: Home, label: '홈' },
            { id: 'complaint', icon: FileText, label: '민원' },
            { id: 'notification', icon: Bell, label: '알림', badge: 2 },
            { id: 'mypage', icon: User, label: 'MY' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-4 relative ${
                activeTab === tab.id ? 'text-pink-500' : 'text-gray-400'
              }`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{tab.label}</span>
              {tab.badge && (
                <div className="absolute -top-1 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">{tab.badge}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 공유 모달 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">내 역량 리포트 공유</h3>
              <button onClick={() => setShowShareModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">역량 점수와 리포트를 공유하세요</p>

            <div className="space-y-3">
              <button className="w-full py-4 bg-yellow-400 text-gray-800 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all">
                <MessageCircle className="w-5 h-5" />
                카카오톡으로 공유
              </button>

              <button 
                onClick={() => {
                  navigator.clipboard.writeText('https://student-dashboard.example.com/report/김수성');
                  alert('링크가 복사되었습니다!');
                }}
                className="w-full py-4 bg-blue-50 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-100 transition-all"
              >
                <Copy className="w-5 h-5" />
                링크 복사
              </button>

              <button className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all">
                <Download className="w-5 h-5" />
                PDF로 다운로드
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500">
                💡 공유된 리포트는 7일간 유효합니다
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 검색 모달 */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl h-[85vh] flex flex-col">
            {/* 고정 상단 영역 */}
            <div className="p-6 pb-4 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl">통합 검색</h3>
                <button onClick={() => setShowSearchModal(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* 검색창 */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Evidence, 민원, 알림 검색..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  autoFocus
                />
              </div>

              {/* 필터 탭 */}
              <div className="flex gap-2 mt-4">
                {['전체', 'Evidence', '민원', '알림'].map((filter) => (
                  <button
                    key={filter}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-pink-100 hover:text-pink-600 transition-all"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* 스크롤 가능한 중간 영역 */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="space-y-4">
                {/* 최근 검색어 */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">최근 검색어</h4>
                  <div className="flex flex-wrap gap-2">
                    {['창의적 문제해결', '장학금', '도서관 냉방', 'S역량'].map((term, idx) => (
                      <button 
                        key={idx}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 인기 검색어 */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">인기 검색어</h4>
                  <div className="space-y-2">
                    {['수강신청', '성적 정정', '역량 점수', '민원 제출'].map((term, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
                        <span className="text-pink-500 font-bold text-sm">{idx + 1}</span>
                        <span className="text-gray-800">{term}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 추천 */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">추천</h4>
                  <div className="space-y-2">
                    <div className="p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-bold text-gray-800">S 창의 역량</span>
                      </div>
                      <p className="text-xs text-gray-600">최근 업데이트된 역량 점수를 확인하세요</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 고정 하단 영역 */}
            <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
              <button className="w-full py-3 text-gray-500 text-sm">
                검색 기록 전체 삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 알림 설정 모달 */}
      {showNotificationSettingsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">알림 설정</h3>
              <button onClick={() => setShowNotificationSettingsModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">받고 싶은 알림 채널을 선택하세요</p>

            <div className="space-y-4">
              {/* PWA 푸시 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">PWA 푸시</p>
                      <p className="text-xs text-gray-500">브라우저 알림</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationChannels({...notificationChannels, pwa: !notificationChannels.pwa})}
                    className={`w-12 h-6 rounded-full relative transition-all ${
                      notificationChannels.pwa ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationChannels.pwa ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">실시간으로 중요한 알림을 받을 수 있습니다</p>
              </div>

              {/* 카카오톡 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">카카오톡</p>
                      <p className="text-xs text-gray-500">카카오 알림톡</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationChannels({...notificationChannels, kakao: !notificationChannels.kakao})}
                    className={`w-12 h-6 rounded-full relative transition-all ${
                      notificationChannels.kakao ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationChannels.kakao ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">카카오톡으로 알림을 받을 수 있습니다</p>
              </div>

              {/* 이메일 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <Send className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">이메일</p>
                      <p className="text-xs text-gray-500">school@example.com</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationChannels({...notificationChannels, email: !notificationChannels.email})}
                    className={`w-12 h-6 rounded-full relative transition-all ${
                      notificationChannels.email ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationChannels.email ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">이메일로 상세한 알림을 받을 수 있습니다</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-700">
                💡 알림 채널은 언제든지 변경할 수 있습니다
              </p>
            </div>

            <button
              onClick={() => {
                setShowNotificationSettingsModal(false);
                alert('알림 설정이 저장되었습니다!');
              }}
              className="w-full mt-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold"
            >
              저장하기
            </button>
          </div>
        </div>
      )}

      {/* 로그인 정보 모달 */}
      {showLoginInfoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">로그인 정보</h3>
              <button onClick={() => setShowLoginInfoModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* SSO 연동 상태 */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">SSO 연동 완료</p>
                    <p className="text-xs text-gray-500">통합 인증 시스템</p>
                  </div>
                </div>
              </div>

              {/* 계정 정보 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">계정 정보</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {authTokens?.userType === 'student' ? '학번' : '교번'}
                    </span>
                    <span className="font-medium">{authTokens?.userId || '202012345'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">이름</span>
                    <span className="font-medium">{authTokens?.userName || '사용자'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">사용자 유형</span>
                    <span className="font-medium">
                      {authTokens?.userType === 'student' ? '학생' : '교수'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">자동 로그인</span>
                    <span className="font-medium">
                      {authTokens?.rememberMe ? '사용' : '미사용'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 학적 정보 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">학적 정보</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">학과</span>
                    <span className="font-medium text-gray-800">컴퓨터공학과</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">학년</span>
                    <span className="font-medium text-gray-800">
                      {authTokens?.userType === 'student' ? '3학년' : '-'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">이메일</span>
                    <span className="font-medium text-gray-800">school@example.com</span>
                  </div>
                </div>
              </div>

              {/* 로그인 이력 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">최근 로그인 이력</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">2025.01.20 14:32</span>
                    </div>
                    <span className="text-gray-500">Chrome (Windows)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">2025.01.19 09:15</span>
                    </div>
                    <span className="text-gray-500">Safari (iPhone)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">2025.01.18 18:42</span>
                    </div>
                    <span className="text-gray-500">Chrome (Android)</span>
                  </div>
                </div>
              </div>

              {/* 보안 설정 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">보안 설정</h4>
                <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all">
                  비밀번호 변경
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-xl">
              <p className="text-xs text-orange-700">
                ⚠️ 의심스러운 로그인 활동이 있다면 즉시 비밀번호를 변경하세요
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 만족도 평가 모달 */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">민원 처리가 완료되었습니다</h3>
              <p className="text-sm text-gray-500">처리 결과에 대해 평가해주세요</p>
            </div>

            {/* 별점 */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3 text-center">만족도를 선택해주세요</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        rating <= selectedRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-center mt-2">
                <span className="text-sm text-gray-500">
                  {selectedRating === 0 && '선택해주세요'}
                  {selectedRating === 1 && '매우 불만족'}
                  {selectedRating === 2 && '불만족'}
                  {selectedRating === 3 && '보통'}
                  {selectedRating === 4 && '만족'}
                  {selectedRating === 5 && '매우 만족'}
                </span>
              </div>
            </div>

            {/* 추��� 의견 */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">추가 의견 (선택)</label>
              <textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                placeholder="더 좋은 서비스를 위한 의견을 남겨주세요"
                className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRatingModal(false);
                  setRatingComplaintId(null);
                  setSelectedRating(0);
                  setRatingComment('');
                  setShowComplaintListModal(false);
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
              >
                나중에
              </button>
              <button
                onClick={handleRatingSubmit}
                disabled={selectedRating === 0}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  selectedRating === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg'
                }`}
              >
                평가 제출
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 민원 상세보기 모달 */}
      {complaintDetailModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md h-[85vh] rounded-t-3xl flex flex-col">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-6 rounded-t-3xl shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-xl">민원 상세보기</h3>
                <button
                  onClick={() => {
                    setComplaintDetailModal(null);
                    setShowComplaintListModal(true);
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <span>{complaintDetailModal.category}</span>
                <span>•</span>
                <span>{complaintDetailModal.date}</span>
              </div>
            </div>

            {/* 내용 */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* 제목 */}
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-800 mb-2">{complaintDetailModal.title}</h4>
                <div className="flex items-center gap-2">
                  {complaintDetailModal.status === '완료' ? (
                    <>
                      {complaintRatings[complaintDetailModal.id] ? (
                        <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-medium text-yellow-600">{complaintRatings[complaintDetailModal.id]}.0</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRateComplaint(complaintDetailModal.id)}
                          className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium hover:bg-yellow-100 transition-colors"
                        >
                          평가하기
                        </button>
                      )}
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      complaintDetailModal.status === '접수' ? 'bg-blue-100 text-blue-700' :
                      complaintDetailModal.status === '처리중' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {complaintDetailModal.status}
                    </span>
                  )}
                </div>
              </div>

              {/* 내가 작성한 민원 내용 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  <h5 className="font-bold text-gray-800">문의 내용</h5>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {complaintDetailModal.content}
                  </p>
                </div>
              </div>

              {/* 접수 상태: 내용만 보여줌 (위에 이미 표시됨) */}

              {/* 처리중 상태: 타임라인 + 담당자 정보 */}
              {complaintDetailModal.status === '처리중' && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h5 className="font-bold text-gray-800">처리 현황</h5>
                  </div>
                  
                  {/* 타임라인 UI */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      {['접수 확인', '담당자 배정', '처리중'].map((step, index) => (
                        <div key={`${complaintDetailModal.id}-${step}`} className="flex items-center flex-1">
                          <div className="flex flex-col items-center w-full">
                            <div className="relative flex items-center justify-center w-full">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 z-10 ${
                                index < complaintDetailModal.currentStep 
                                  ? 'bg-blue-500 text-white' 
                                  : index === complaintDetailModal.currentStep 
                                  ? 'bg-blue-500 text-white animate-pulse' 
                                  : 'bg-gray-300 text-gray-500'
                              }`}>
                                {index < complaintDetailModal.currentStep ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <span className="text-xs font-bold">{index + 1}</span>
                                )}
                              </div>
                              {index < 2 && (
                                <div className={`absolute left-1/2 w-full h-0.5 ${
                                  index < complaintDetailModal.currentStep ? 'bg-blue-500' : 'bg-gray-300'
                                }`} style={{ top: '50%', transform: 'translateY(-50%)' }} />
                              )}
                            </div>
                            <span className={`text-xs text-center whitespace-nowrap mt-1 ${
                              index <= complaintDetailModal.currentStep ? 'text-gray-800 font-medium' : 'text-gray-400'
                            }`}>
                              {step}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 담당 정보 */}
                  {complaintDetailModal.department && complaintDetailModal.assignee && (
                    <div className="bg-white border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-600 shrink-0" />
                        <div className="text-sm text-gray-800">
                          <span className="font-medium">부서:</span> {complaintDetailModal.department}
                          <span className="mx-2">|</span>
                          <span className="font-medium">담당:</span> {complaintDetailModal.assignee}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 완료 상태: 관리자 답변 + 첨부파일 */}
              {complaintDetailModal.status === '완료' && complaintDetailModal.adminResponse && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h5 className="font-bold text-gray-800">관리자 답변</h5>
                  </div>
                  
                  {/* 관리자 답변 */}
                  <div className="bg-green-50 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-green-900">답변 내용</span>
                      <span className="text-xs text-green-700">{complaintDetailModal.responseDate}</span>
                    </div>
                    <p className="text-sm text-green-900 leading-relaxed whitespace-pre-wrap">
                      {complaintDetailModal.adminResponse}
                    </p>
                  </div>

                  {/* 첨부파일 */}
                  {complaintDetailModal.attachments && complaintDetailModal.attachments.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <h5 className="font-bold text-gray-800">첨부파일 ({complaintDetailModal.attachments.length})</h5>
                      </div>
                      <div className="space-y-2">
                        {complaintDetailModal.attachments.map((file: any) => (
                          <div key={file.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                              </div>
                            </div>
                            <a 
                              href={file.url} 
                              download 
                              className="ml-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shrink-0"
                            >
                              다운로드
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 하단 버튼 */}
            <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
              <button
                onClick={() => {
                  setComplaintDetailModal(null);
                  setShowComplaintListModal(true);
                }}
                className="w-full py-3 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 민원 이력 다운로드 모달 */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl">민원 이력 다운로드</h3>
              <button onClick={() => setShowDownloadModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* 다운로드 옵션 */}
            <div className="space-y-6">
              {/* 기간 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  다운로드 기간
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['최근 1개월', '최근 3개월', '최근 6개월', '전체'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setDownloadPeriod(period)}
                      className={`p-3 rounded-xl border-2 font-medium transition-all ${
                        downloadPeriod === period
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {/* 파일 형식 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  파일 형식
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['PDF', 'Excel'].map((format) => (
                    <button
                      key={format}
                      onClick={() => setDownloadFormat(format)}
                      className={`p-3 rounded-xl border-2 font-medium transition-all ${
                        downloadFormat === format
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        {format}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 다운로드 내용 미리보기 */}
              <div className="bg-gradient-to-r from-red-50 via-pink-50 to-orange-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 mb-1">포함 내용</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 민원 제목 및 내용</li>
                      <li>• 처리 상태 및 담당자</li>
                      <li>• 답변 내용 (완료된 경우)</li>
                      <li>• 처리 일자 및 이력</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 안내 메시지 */}
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs text-blue-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    다운로드된 파일에는 개인정보가 포함되어 있으니 
                    보안에 유의해주시기 바랍니다.
                  </span>
                </p>
              </div>
            </div>

            {/* 버튼 */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
              >
                취소
              </button>
              <button
                onClick={() => {
                  // 실제로는 파일 생성 로직
                  alert(`${downloadPeriod} 민원 이력을 ${downloadFormat} 형식으로 다운로드합니다.`);
                  setShowDownloadModal(false);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                다운로드
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}