import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Inbox,
  FileText,
  BarChart3,
  Bell,
  Search,
  Filter,
  X,
  Send,
  Paperclip,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Ban,
  Bot,
  TrendingUp,
  Award,
  BookOpen,
  AlertTriangle,
  Target,
  Activity,
  ChevronDown,
  GraduationCap,
  User,
  Briefcase,
  XCircle,
} from "lucide-react";

const logo = "https://placehold.co/40x40";

const ticketsData = [
  {
    id: 1,
    title: "도서관 냉방 문제",
    category: "시설 및 환경",
    status: "처리중",
    date: "2025.01.15 14:30",
    author: "김OO",
    priority: "high",
    assignee: "시설관리팀 박OO",
    replies: [],
    draftReply: "도서관 냉방 시설 점검 중입니다...",
    rejectedReason: null,
  },
  {
    id: 2,
    title: "장학금 지급 일정 문의",
    category: "학생 장학",
    status: "완료",
    date: "2025.01.14 09:15",
    author: "이OO",
    priority: "medium",
    assignee: "학생지원팀 이OO",
    replies: [
      {
        content:
          "안녕하세요. 장학금 지급은 매 학기 개강 후 2주 이내에 진행됩니다. 등록된 계좌로 자동 입금되오니 참고 부탁드립니다.",
        author: "학생지원팀 이OO",
        date: "2025.01.14 11:30",
      },
    ],
    draftReply: null,
    rejectedReason: null,
  },
  {
    id: 3,
    title: "성적 정정 요청",
    category: "수업 및 학사",
    status: "접수",
    date: "2025.01.13 16:45",
    author: "박OO",
    priority: "high",
    assignee: null,
    replies: [],
    draftReply: null,
    rejectedReason: null,
  },
  {
    id: 4,
    title: "기숙사 온수 불량",
    category: "학생 복지",
    status: "접수",
    date: "2025.01.13 11:20",
    author: "최OO",
    priority: "medium",
    assignee: null,
    replies: [],
    draftReply: null,
    rejectedReason: null,
  },
  {
    id: 5,
    title: "와이파이 연결 오류",
    category: "시설 및 환경",
    status: "완료",
    date: "2025.01.12 15:00",
    author: "정OO",
    priority: "low",
    assignee: "전산팀 김OO",
    replies: [
      {
        content:
          "안녕하세요. 해당 건물의 AP(무선 액세스 포인트) 점검을 완료했습니다. 펌웨어 업데이트 후 정상 작동 확인했으며, 추가 문제 발생 시 전산팀(내선 1234)로 연락 부탁드립니다.",
        author: "전산팀 김OO",
        date: "2025.01.12 16:45",
      },
    ],
    draftReply: null,
    rejectedReason: null,
  },
  {
    id: 6,
    title: "강의실 프로젝터 고장",
    category: "시설 및 환경",
    status: "완료",
    date: "2025.01.11 10:30",
    author: "한OO",
    priority: "high",
    assignee: "시설관리팀 박OO",
    replies: [
      {
        content:
          "안녕하세요. 해당 강의실 프로젝터를 긴급 점검했습니다. 램프 수명이 다해 신품으로 교체 완료했으며, 정상 작동 확인했습니다. 이용에 불편을 드려 죄송합니다.",
        author: "시설관리팀 박OO",
        date: "2025.01.11 14:20",
      },
    ],
    draftReply: null,
    rejectedReason: null,
  },
  {
    id: 7,
    title: "학생증 재발급 문의",
    category: "수업 및 학사",
    status: "반려됨",
    date: "2025.01.10 13:20",
    author: "윤OO",
    priority: "low",
    assignee: "학생지원팀 이OO",
    replies: [
      {
        content:
          "학생증 재발급은 학생지원팀에 방문하시면 즉시 발급 가능합니다.",
        author: "학생지원팀 이OO",
        date: "2025.01.10 14:00",
      },
    ],
    draftReply: null,
    rejectedReason:
      "답변 내용이 불충분합니다. 재발급 비용과 필요 서류를 명확히 안내해주세요.",
  },
  {
    id: 8,
    title: "동아리실 대여 신청",
    category: "학생 복지",
    status: "반려됨",
    date: "2025.01.09 10:15",
    author: "강OO",
    priority: "medium",
    assignee: "학생지원팀 이OO",
    replies: [
      {
        content: "동아리실 대여는 학생지원팀에 신청하시면 됩니다.",
        author: "학생지원팀 이OO",
        date: "2025.01.09 11:30",
      },
    ],
    draftReply: null,
    rejectedReason: "대여 절차와 신청 양식 링크를 추가해주세요.",
  },
];

const templatesData = [
  {
    id: 1,
    category: "시설 관련",
    title: "에어컨 수리 접수 완료",
    content:
      "안녕하세요. 에어컨 수리 요청이 접수되었습니다. 시설관리팀에서 확인 후 빠른 시일 내 조치하겠습니다.",
  },
  {
    id: 2,
    category: "시설 관련",
    title: "시설 점검 일정 안내",
    content: "시설 점검은 매주 월요일 오전에 진행됩니다.",
  },
  {
    id: 3,
    category: "장학 관련",
    title: "장학금 신청 기간 안내",
    content: "장학금 신청 기간은 매 학기 시작 2주 전부터 1주간입니다.",
  },
  {
    id: 4,
    category: "학사 관련",
    title: "성적 정정 처리 완료",
    content: "요청하신 성적 정정이 완료되었습니다.",
  },
];

const categoryStats = [
  { name: "시설", value: 45, color: "#E94E3C" },
  { name: "장학", value: 25, color: "#F7941D" },
  { name: "복지", value: 18, color: "#C13584" },
  { name: "학사", value: 12, color: "#5B51D8" },
];

const speedData = [
  { day: "월", time: 1.2 },
  { day: "화", time: 2.1 },
  { day: "수", time: 1.8 },
  { day: "목", time: 1.5 },
  { day: "금", time: 2.4 },
];

const keywordsData = [
  { word: "민원", size: "text-6xl", weight: "font-bold" },
  { word: "처리", size: "text-5xl", weight: "font-bold" },
  { word: "시설", size: "text-5xl", weight: "font-bold" },
  { word: "에어컨", size: "text-4xl", weight: "font-semibold" },
  { word: "학생", size: "text-4xl", weight: "font-semibold" },
  { word: "장학금", size: "text-4xl", weight: "font-semibold" },
  { word: "접수", size: "text-3xl", weight: "font-medium" },
  { word: "신청", size: "text-3xl", weight: "font-medium" },
  { word: "도서관", size: "text-3xl", weight: "font-medium" },
  { word: "수리", size: "text-xl", weight: "font-normal" },
  { word: "문의", size: "text-xl", weight: "font-normal" },
  { word: "지원", size: "text-xl", weight: "font-normal" },
  { word: "주차", size: "text-lg", weight: "font-normal" },
  { word: "청소", size: "text-lg", weight: "font-normal" },
  { word: "냉난방", size: "text-lg", weight: "font-normal" },
  { word: "프로젝터", size: "text-lg", weight: "font-normal" },
  { word: "전산", size: "text-base", weight: "font-normal" },
  { word: "환경", size: "text-base", weight: "font-normal" },
  { word: "네트워크", size: "text-base", weight: "font-normal" },
  { word: "복지", size: "text-base", weight: "font-normal" },
  { word: "학사", size: "text-base", weight: "font-normal" },
  { word: "상담", size: "text-sm", weight: "font-normal" },
  { word: "등록", size: "text-sm", weight: "font-normal" },
  { word: "휴학", size: "text-sm", weight: "font-normal" },
  { word: "복학", size: "text-sm", weight: "font-normal" },
  { word: "졸업", size: "text-sm", weight: "font-normal" },
];

const usersData = [
  { id: 1, name: "김관리", dept: "교무처", role: "슈퍼관리자", status: "활성" },
  {
    id: 2,
    name: "이담당",
    dept: "시설관리팀",
    role: "일반관리자",
    status: "활성",
  },
  {
    id: 3,
    name: "박처리",
    dept: "학생지원팀",
    role: "일반관리자",
    status: "활성",
  },
];

const bannedWords = ["욕설1", "비방어1", "욕설2"];

const faqScenarios = [
  {
    id: 1,
    category: "장학",
    question: "장학금 신청기간은?",
    answer: "매 학기 시작 2주 전부터 1주간",
  },
  {
    id: 2,
    category: "학사",
    question: "휴학 신청 방법은?",
    answer: "학생포털 > 학적 > 휴학신청",
  },
  {
    id: 3,
    category: "시설",
    question: "도서관 운영시간은?",
    answer: "평일 09:00-22:00",
  },
];

// S-T-A-R 역량 데이터
const competencyTrendData = [
  { year: "2021", S: 65, T: 62, A: 68, R: 60 },
  { year: "2022", S: 68, T: 65, A: 70, R: 63 },
  { year: "2023", S: 71, T: 68, A: 73, R: 67 },
  { year: "2024", S: 74, T: 72, A: 76, R: 71 },
  { year: "2025", S: 77, T: 75, A: 79, R: 74 },
];

// 과별 역량 히트맵 데이터 (세부 항목별)
const collegeHeatmapData = [
  {
    college: "AI빅데이터과",
    기획: 92,
    실행: 88,
    화합: 15,
    통섭: 67,
    전공지식: 95,
    전공기술: 91,
    정보화: 89,
    신기술활용: 97,
    공감: 25,
    판단: 73,
    사명감: 56,
    조직이해: 42,
    도전성: 38,
    자기학습: 85,
    경청: 61,
    협상: 54,
    외국어: 8,
    세계시민: 77,
  },
  {
    college: "메타버스크리에이터과",
    기획: 78,
    실행: 82,
    화합: 45,
    통섭: 52,
    전공지식: 35,
    전공기술: 68,
    정보화: 91,
    신기술활용: 85,
    공감: 12,
    판단: 58,
    사명감: 93,
    조직이해: 71,
    도전성: 64,
    자기학습: 72,
    경청: 29,
    협상: 48,
    외국어: 19,
    세계시민: 75,
  },
  {
    college: "웹툰웹소설과",
    기획: 65,
    실행: 58,
    화합: 88,
    통섭: 43,
    전공지식: 28,
    전공기술: 51,
    정보화: 6,
    신기술활용: 33,
    공감: 94,
    판단: 70,
    사명감: 96,
    조직이해: 84,
    도전성: 79,
    자기학습: 88,
    경청: 22,
    협상: 47,
    외국어: 14,
    세계시민: 60,
  },
  {
    college: "드론기계과",
    기획: 55,
    실행: 72,
    화합: 31,
    통섭: 86,
    전공지식: 90,
    전공기술: 93,
    정보화: 81,
    신기술활용: 87,
    공감: 39,
    판단: 76,
    사명감: 11,
    조직이해: 24,
    도전성: 18,
    자기학습: 65,
    경청: 63,
    협상: 50,
    외국어: 3,
    세계시민: 69,
  },
  {
    college: "간호학과",
    기획: 98,
    실행: 95,
    화합: 91,
    통섭: 89,
    전공지식: 99,
    전공기술: 96,
    정보화: 92,
    신기술활용: 88,
    공감: 97,
    판단: 94,
    사명감: 90,
    조직이해: 85,
    도전성: 82,
    자기학습: 95,
    경청: 93,
    협상: 87,
    외국어: 84,
    세계시민: 95,
  },
  {
    college: "방사선과",
    기획: 44,
    실행: 62,
    화합: 36,
    통섭: 59,
    전공지식: 74,
    전공기술: 68,
    정보화: 53,
    신기술활용: 46,
    공감: 21,
    판단: 57,
    사명감: 65,
    조직이해: 49,
    도전성: 41,
    자기학습: 58,
    경청: 30,
    협상: 37,
    외국어: 26,
    세계시민: 66,
  },
  {
    college: "치위생과",
    기획: 83,
    실행: 79,
    화합: 71,
    통섭: 88,
    전공지식: 86,
    전공기술: 81,
    정보화: 75,
    신기술활용: 69,
    공감: 80,
    판단: 77,
    사명감: 89,
    조직이해: 84,
    도전성: 78,
    자기학습: 81,
    경청: 73,
    협상: 70,
    외국어: 67,
    세계시민: 85,
  },
  {
    college: "뷰티스타일리스트과",
    기획: 27,
    실행: 48,
    화합: 92,
    통섭: 56,
    전공지식: 63,
    전공기술: 71,
    정보화: 34,
    신기술활용: 52,
    공감: 87,
    판단: 44,
    사명감: 19,
    조직이해: 40,
    도전성: 33,
    자기학습: 76,
    경청: 95,
    협상: 78,
    외국어: 51,
    세계시민: 82,
  },
  {
    college: "제과제빵커피과",
    기획: 16,
    실행: 23,
    화합: 54,
    통섭: 38,
    전공지식: 76,
    전공기술: 69,
    정보화: 45,
    신기술활용: 31,
    공감: 58,
    판단: 42,
    사명감: 7,
    조직이해: 20,
    도전성: 5,
    자기학습: 44,
    경청: 61,
    협상: 49,
    외국어: 28,
    세계시민: 64,
  },
  {
    college: "호텔조리과",
    기획: 70,
    실행: 81,
    화합: 62,
    통섭: 75,
    전공지식: 88,
    전공기술: 83,
    정보화: 77,
    신기술활용: 71,
    공감: 79,
    판단: 72,
    사명감: 53,
    조직이해: 46,
    도전성: 39,
    자기학습: 68,
    경청: 80,
    협상: 74,
    외국어: 59,
    세계시민: 86,
  },
  {
    college: "스포츠레저과",
    기획: 91,
    실행: 87,
    화합: 17,
    통섭: 94,
    전공지식: 35,
    전공기술: 68,
    정보화: 90,
    신기술활용: 82,
    공감: 96,
    판단: 85,
    사명감: 29,
    조직이해: 43,
    도전성: 51,
    경청: 89,
    협상: 92,
    외국어: 55,
    세계시민: 78,
  },
  {
    college: "치료재활과",
    기획: 85,
    실행: 93,
    화합: 76,
    통섭: 68,
    전공지식: 52,
    전공기술: 79,
    정보화: 87,
    신기술활용: 74,
    공감: 65,
    판단: 81,
    사명감: 98,
    조직이해: 91,
    도전성: 86,
    경청: 41,
    협상: 57,
    외국어: 32,
    세계시민: 72,
  },
  {
    college: "경찰행정과",
    기획: 49,
    실행: 66,
    화합: 83,
    통섭: 57,
    전공지식: 71,
    전공기술: 64,
    정보화: 48,
    신기술활용: 55,
    공감: 37,
    판단: 62,
    사명감: 94,
    조직이해: 88,
    도전성: 77,
    경청: 69,
    협상: 75,
    외국어: 45,
    세계시민: 81,
  },
  {
    college: "미술심리보육과",
    기획: 37,
    실행: 54,
    화합: 89,
    통섭: 61,
    전공지식: 95,
    전공기술: 88,
    정보화: 73,
    신기술활용: 66,
    공감: 92,
    판단: 78,
    사명감: 60,
    조직이해: 47,
    도전성: 35,
    경청: 84,
    협상: 71,
    외국어: 42,
    세계시민: 76,
  },
  {
    college: "반려동물보건과",
    기획: 13,
    실행: 26,
    화합: 51,
    통섭: 39,
    전공지식: 67,
    전공기술: 58,
    정보화: 44,
    신기술활용: 36,
    공감: 72,
    판단: 53,
    사명감: 22,
    조직이해: 16,
    도전성: 9,
    경청: 65,
    협상: 56,
    외국어: 34,
    세계시민: 48,
  },
  {
    college: "사회복지과",
    기획: 88,
    실행: 77,
    화합: 94,
    통섭: 82,
    전공지식: 43,
    전공기술: 86,
    정보화: 79,
    신기술활용: 62,
    공감: 98,
    판단: 91,
    사명감: 75,
    조직이해: 68,
    도전성: 59,
    경청: 96,
    협상: 89,
    외국어: 73,
    세계시민: 92,
  },
  {
    college: "유아교육과",
    기획: 74,
    실행: 69,
    화합: 86,
    통섭: 78,
    전공지식: 81,
    전공기술: 75,
    정보화: 67,
    신기술활용: 72,
    공감: 89,
    판단: 83,
    사명감: 64,
    조직이해: 58,
    도전성: 52,
    경청: 90,
    협상: 84,
    외국어: 70,
    세계시민: 87,
  },
];

// 인증 현황 데이터
const certificationData = [
  { level: "Advanced", count: 245, color: "#E94E3C", name: "Advanced (245명)" },
  {
    level: "Intermediate",
    count: 512,
    color: "#F7941D",
    name: "Intermediate (512명)",
  },
  { level: "Basic", count: 183, color: "#C13584", name: "Basic (183명)" },
  { level: "Low", count: 60, color: "#5B51D8", name: "Low (60명)" },
];

// 과별 역량 달성도 (Gap Analysis)
const departmentGapData = [
  { dept: "AI빅데이터과", current: 85, target: 90, gap: -5 },
  { dept: "간호학과", current: 88, target: 90, gap: -2 },
  { dept: "치위생과", current: 86, target: 85, gap: 1 },
  { dept: "호텔조리과", current: 81, target: 85, gap: -4 },
  { dept: "사회복지과", current: 85, target: 90, gap: -5 },
];

// 학년별 성장 추이
const gradeGrowthData = [
  { grade: "1학년", S: 62, T: 60, A: 65, R: 58 },
  { grade: "2학년", S: 70, T: 68, A: 72, R: 66 },
  { grade: "3학년", S: 76, T: 74, A: 78, R: 72 },
  { grade: "4학년", S: 82, T: 80, A: 84, R: 78 },
];

// CQI 운영 현황
const cqiStatusData = [
  { dept: "AI빅데이터과", total: 28, completed: 26, rate: 92.9, lowGrade: 2 },
  { dept: "간호학과", total: 35, completed: 34, rate: 97.1, lowGrade: 1 },
  { dept: "치위생과", total: 30, completed: 29, rate: 96.7, lowGrade: 1 },
  { dept: "호텔조리과", total: 25, completed: 22, rate: 88.0, lowGrade: 3 },
  { dept: "사회복지과", total: 32, completed: 31, rate: 96.9, lowGrade: 1 },
  { dept: "스포츠레저과", total: 24, completed: 23, rate: 95.8, lowGrade: 1 },
  { dept: "경찰행정과", total: 27, completed: 25, rate: 92.6, lowGrade: 2 },
  { dept: "유아교육과", total: 29, completed: 28, rate: 96.6, lowGrade: 1 },
];

// 교육과정 적절성 데이터
const curriculumIssues = {
  unmappedCourses: 12,
  totalCourses: 245,
  competencyDistribution: [
    { competency: "S", count: 68, percentage: 27.8 },
    { competency: "T", count: 82, percentage: 33.5 },
    { competency: "A", count: 55, percentage: 22.4 },
    { competency: "R", count: 40, percentage: 16.3 },
  ],
  unmappedCoursesList: [
    {
      id: 1,
      courseName: "AI 윤리와 철학",
      professor: "김철수",
      dept: "AI빅데이터과",
    },
    {
      id: 2,
      courseName: "창업 실무",
      professor: "박영희",
      dept: "메타버스크리에이터과",
    },
    {
      id: 3,
      courseName: "디지털 마케팅",
      professor: "이민준",
      dept: "웹툰웹소설과",
    },
    { id: 4, courseName: "드론 법규", professor: "최서연", dept: "드론기계과" },
    { id: 5, courseName: "간호 윤리", professor: "정지훈", dept: "간호학과" },
    {
      id: 6,
      courseName: "방사선 안전관리",
      professor: "강민지",
      dept: "방사선과",
    },
    {
      id: 7,
      courseName: "구강보건교육",
      professor: "윤수진",
      dept: "치위생과",
    },
    {
      id: 8,
      courseName: "피부관리학 개론",
      professor: "임하늘",
      dept: "뷰티스타일리스트과",
    },
    {
      id: 9,
      courseName: "제과위생학",
      professor: "한소희",
      dept: "제과제빵커피과",
    },
    {
      id: 10,
      courseName: "외식산업론",
      professor: "오준호",
      dept: "호텔조리과",
    },
    {
      id: 11,
      courseName: "스포츠심리학",
      professor: "신예린",
      dept: "스포츠레저과",
    },
    {
      id: 12,
      courseName: "물리치료 개론",
      professor: "배성우",
      dept: "치료재활과",
    },
  ],
};

// 학생 앱 관리 - 학생 목록 데이터
const studentsData = [
  {
    id: 1,
    name: "김학생",
    studentId: "20210001",
    dept: "AI빅데이터과",
    grade: 3,
    S: 78,
    T: 82,
    A: 75,
    R: 80,
    avg: 78.75,
    badge: "우수",
    jobMatch: 87,
  },
  {
    id: 2,
    name: "이학생",
    studentId: "20210002",
    dept: "간호학과",
    grade: 3,
    S: 92,
    T: 88,
    A: 91,
    R: 89,
    avg: 90.0,
    badge: "마스터",
    jobMatch: 95,
  },
  {
    id: 3,
    name: "박학생",
    studentId: "20210003",
    dept: "치위생과",
    grade: 3,
    S: 65,
    T: 68,
    A: 70,
    R: 66,
    avg: 67.25,
    badge: "보통",
    jobMatch: 72,
  },
  {
    id: 4,
    name: "최학생",
    studentId: "20210004",
    dept: "호텔조리과",
    grade: 3,
    S: 52,
    T: 58,
    A: 55,
    R: 54,
    avg: 54.75,
    badge: "노력요망",
    jobMatch: 58,
  },
  {
    id: 5,
    name: "정학생",
    studentId: "20210005",
    dept: "사회복지과",
    grade: 3,
    S: 75,
    T: 79,
    A: 72,
    R: 77,
    avg: 75.75,
    badge: "보통",
    jobMatch: 81,
  },
];

// 학생 개인 레이더 차트 데이터
const studentRadarData = [
  {
    subject: "Self-directed",
    student: 78,
    deptAvg: 72,
    totalAvg: 70,
    fullMark: 100,
  },
  {
    subject: "Teamwork",
    student: 82,
    deptAvg: 75,
    totalAvg: 73,
    fullMark: 100,
  },
  {
    subject: "Analytical",
    student: 75,
    deptAvg: 70,
    totalAvg: 68,
    fullMark: 100,
  },
  {
    subject: "Relational",
    student: 80,
    deptAvg: 74,
    totalAvg: 71,
    fullMark: 100,
  },
];

// 행동지표 달성도 데이터
const behaviorIndicators = [
  { code: "S1", name: "자기주도 학습", achievement: 85, status: "excellent" },
  { code: "S2", name: "시간 관리", achievement: 72, status: "good" },
  { code: "S3", name: "목표 설정", achievement: 76, status: "good" },
  { code: "T1", name: "팀워크 협력", achievement: 88, status: "excellent" },
  { code: "T2", name: "리더십", achievement: 79, status: "good" },
  { code: "T3", name: "의사소통", achievement: 80, status: "excellent" },
];

// Evidence 트래킹 데이터
const evidenceData = [
  {
    competency: "S",
    course: "데이터구조",
    assignment: "프로젝트 1",
    score: 92,
    semester: "2024-1",
  },
  {
    competency: "S",
    course: "알고리즘",
    assignment: "중간고사",
    score: 85,
    semester: "2024-1",
  },
  {
    competency: "T",
    course: "소프트웨어공학",
    assignment: "팀 프로젝트",
    score: 88,
    semester: "2024-2",
  },
  {
    competency: "A",
    course: "인공지능",
    assignment: "기말고사",
    score: 78,
    semester: "2024-2",
  },
  {
    competency: "R",
    course: "캡스톤디자인",
    assignment: "최종발표",
    score: 90,
    semester: "2024-2",
  },
];

// 교수 앱 관리 - 강의 목록 데이터
const coursesData = [
  {
    id: 1,
    code: "CS301",
    name: "데이터구조",
    professor: "김교수",
    students: 45,
    targetCompetency: "S",
    avgScore: 76.5,
  },
  {
    id: 2,
    code: "CS302",
    name: "알고리즘",
    professor: "이교수",
    students: 38,
    targetCompetency: "S",
    avgScore: 72.3,
  },
  {
    id: 3,
    code: "CS401",
    name: "소프트웨어공학",
    professor: "박교수",
    students: 42,
    targetCompetency: "T",
    avgScore: 81.2,
  },
  {
    id: 4,
    code: "CS402",
    name: "인공지능",
    professor: "최교수",
    students: 35,
    targetCompetency: "A",
    avgScore: 78.8,
  },
];

// 교과목 역량 성취도 분포 (히스토그램용)
const courseAchievementDistribution = [
  { range: "0-60", count: 3 },
  { range: "60-70", count: 8 },
  { range: "70-80", count: 15 },
  { range: "80-90", count: 12 },
  { range: "90-100", count: 7 },
];

// 평가도구별 역량 점수
const assessmentToolData = [
  { tool: "중간고사", S: 72, T: 68, A: 75, R: 70 },
  { tool: "기말고사", S: 75, T: 71, A: 78, R: 73 },
  { tool: "과제", S: 82, T: 85, A: 79, R: 81 },
  { tool: "출석", S: 88, T: 90, A: 86, R: 89 },
  { tool: "프로젝트", S: 85, T: 92, A: 83, R: 87 },
];

// 역량 미달 학생 리스트
const underperformingStudents = [
  {
    name: "최학생",
    studentId: "20210004",
    targetComp: "S",
    score: 52,
    threshold: 60,
    gap: -8,
  },
  {
    name: "박학생",
    studentId: "20220015",
    targetComp: "T",
    score: 58,
    threshold: 65,
    gap: -7,
  },
  {
    name: "정학생",
    studentId: "20220023",
    targetComp: "A",
    score: 61,
    threshold: 70,
    gap: -9,
  },
];

// CQI 성과 분석 데이터
const cqiPerformanceData = {
  targetAchievement: 85,
  currentAchievement: 78.5,
  achievementRate: 92.4,
  yearOverYear: 3.8,
  weakAreas: [
    {
      area: "Analytical 역량",
      score: 68.5,
      improvement: "문제해결 과제 강화 필요",
    },
    {
      area: "Self-directed 역량",
      score: 71.2,
      improvement: "자기주도 학습 시간 확대",
    },
  ],
};

// 교수법 연계 진단 데이터
const teachingMethodData = [
  { method: "PBL", S: 82, T: 88, A: 79, R: 85, satisfaction: 4.2 },
  { method: "Flipped", S: 78, T: 75, A: 82, R: 76, satisfaction: 3.8 },
  { method: "강의식", S: 70, T: 68, A: 72, R: 69, satisfaction: 3.5 },
  { method: "토론식", S: 75, T: 92, A: 74, R: 88, satisfaction: 4.5 },
];
export default function AdminDashboard() {
  const [activeCategory, setActiveCategory] = useState("dashboard"); // 대분류
  const [activeSubMenu, setActiveSubMenu] = useState("competency"); // 세부 메뉴
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [userRole, setUserRole] = useState("슈퍼관리자"); // 슈퍼관리자, 일반담당자
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("AI빅데이터과"); // 역량 비교용 선택된 학과
  const [showDeptDropdown, setShowDeptDropdown] = useState(false); // 학과 드롭다운 표시 여부
  const [deptSearchText, setDeptSearchText] = useState(""); // 학과 검색 텍스트
  const [draftReplies, setDraftReplies] = useState<Record<number, string>>({}); // 임시 저장된 답변들

  // 카테고리 변경 시 기본 서브메뉴로 초기화
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === "dashboard") setActiveSubMenu("competency");
    else if (category === "workspace") setActiveSubMenu("tickets");
    else if (category === "stats") setActiveSubMenu("overview");
    else if (category === "system") setActiveSubMenu("users");
    else if (category === "apps") setActiveSubMenu("student-app");
  };

  // 드롭다운 외부 클릭 시 닫기
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDeptDropdown &&
        !(event.target as Element).closest(".dept-dropdown-container")
      ) {
        setShowDeptDropdown(false);
        setDeptSearchText("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDeptDropdown]);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      접수: "bg-blue-100 text-blue-700",
      처리중: "bg-orange-100 text-orange-700",
      완료: "bg-green-100 text-green-700",
      반려됨: "bg-red-100 text-red-700",
    };
    return styles[status];
  };

  // 일반 담당자용 필터링 로직
  const getFilteredTicketsForRole = () => {
    if (userRole === "일반담당자") {
      if (statusFilter === "all") {
        // 일반담당자는 '처리중'과 '완료'만 보임
        return ticketsData.filter(
          (t) => t.status === "처리중" || t.status === "완료"
        );
      }
      if (statusFilter === "접수") {
        // 일반담당자의 '접수' = 슈퍼관리자의 '처리중'
        return ticketsData.filter((t) => t.status === "처리중");
      }
      if (statusFilter === "완료") {
        return ticketsData.filter((t) => t.status === "완료");
      }
    } else {
      // 슈퍼관리자는 기존 로직
      if (statusFilter === "all") return ticketsData;
      return ticketsData.filter((t) => t.status === statusFilter);
    }
    return ticketsData;
  };

  const filteredTickets = getFilteredTicketsForRole();

  const getStatusCountsForRole = () => {
    if (userRole === "일반담당자") {
      return {
        all: ticketsData.filter(
          (t) => t.status === "처리중" || t.status === "완료"
        ).length,
        접수: ticketsData.filter((t) => t.status === "처리중").length,
        완료: ticketsData.filter((t) => t.status === "완료").length,
        처리중: 0, // 일반 담당자에게 처리중 탭은 별도로 없음 (접수가 처리중임)
      };
    } else {
      return {
        all: ticketsData.length,
        접수: ticketsData.filter((t) => t.status === "접수").length,
        처리중: ticketsData.filter((t) => t.status === "처리중").length,
        완료: ticketsData.filter((t) => t.status === "완료").length,
      };
    }
  };

  const statusCounts = getStatusCountsForRole();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const TicketsScreen = () => {
    // 역할에 따라 다른 탭 표시
    const tabs =
      userRole === "일반담당자"
        ? [
            { key: "all", label: "전체" },
            { key: "접수", label: "접수" },
            { key: "완료", label: "완료" },
          ]
        : [
            { key: "all", label: "전체" },
            { key: "접수", label: "접수" },
            { key: "처리중", label: "처리중" },
            { key: "완료", label: "완료" },
          ];

    return (
      <div className="flex h-full">
        <div
          className={`${
            selectedTicket ? "w-1/2 border-r border-gray-300" : "w-full"
          } flex flex-col`}
        >
          <div className="flex border-b border-gray-300 bg-white px-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-2 text-sm border-b-2 ${
                  statusFilter === tab.key
                    ? "border-pink-500 text-pink-500"
                    : "border-transparent text-gray-600"
                }`}
              >
                {tab.label}{" "}
                <span
                  className={`ml-1 px-1.5 rounded-full text-xs ${
                    statusFilter === tab.key
                      ? "bg-pink-100 text-pink-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {statusCounts[tab.key as keyof typeof statusCounts]}
                </span>
              </button>
            ))}
          </div>
          <div className="p-3 bg-white border-b border-gray-300 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="검색..."
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 bg-white text-gray-900 rounded text-sm"
              />
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 bg-white text-gray-700 rounded text-sm hover:bg-gray-50">
              <Filter className="w-3 h-3" /> 필터
            </button>
          </div>
          <div className="flex-1 overflow-y-auto bg-white">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-300 sticky top-0">
                <tr>
                  <th className="pl-6 pr-3 py-2 text-left text-xs font-medium text-gray-700">
                    문의날짜
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                    제목
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                    카테고리
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                    작성자
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                    담당자
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                      selectedTicket?.id === ticket.id ? "bg-pink-50" : ""
                    }`}
                  >
                    <td className="pl-6 pr-3 py-3 text-xs text-gray-600">
                      {ticket.date}
                    </td>
                    <td className="px-3 py-3 text-sm font-medium text-gray-900">
                      {ticket.title}
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600">
                      {ticket.category}
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600">
                      {ticket.author}
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600">
                      {ticket.assignee || "-"}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${getStatusBadge(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white border-t border-gray-300 px-3 py-2 flex items-center justify-between relative">
            <div className="text-xs text-gray-600">
              총 {filteredTickets.length}건 중{" "}
              {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filteredTickets.length)}건
              표시
            </div>
            <div className="flex gap-1 absolute left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2 py-1 text-xs border rounded ${
                      currentPage === page
                        ? "bg-pink-600 text-white border-pink-600"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                다음
              </button>
            </div>
          </div>
        </div>

        {selectedTicket && (
          <div className="w-1/2 flex flex-col bg-white">
            <div className="p-3 border-b border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${getStatusBadge(
                      selectedTicket.status
                    )}`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">담당자:</span>
                    <span className="font-medium text-sm text-gray-900">
                      {selectedTicket.assignee || "미배정"}
                    </span>
                    <button
                      onClick={() => setShowAssignModal(true)}
                      className="px-2 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
                    >
                      {selectedTicket.assignee ? "변경" : "배정"}
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h2 className="font-bold text-gray-900 mb-1">
                {selectedTicket.title}
              </h2>
              <div className="text-xs text-gray-600">
                #{selectedTicket.id.toString().padStart(6, "0")} ·{" "}
                {selectedTicket.category}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 bg-white">
              {/* 처리 현황 카드 - 슈퍼관리자만 표시 */}
              {userRole === "슈퍼관리자" && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="flex items-center text-xs">
                    {/* 1. 접수 */}
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                      <span className="mt-1 text-[10px]">접수</span>
                    </div>
                    <div
                      className={`flex-1 h-0.5 mx-1 ${
                        selectedTicket.status !== "접수"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    ></div>

                    {/* 2. 배정 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 ${
                          selectedTicket.status !== "접수"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        } rounded-full flex items-center justify-center text-white text-xs`}
                      >
                        {selectedTicket.status !== "접수" ? "✓" : "2"}
                      </div>
                      <span className="mt-1 text-[10px]">배정</span>
                    </div>
                    <div
                      className={`flex-1 h-0.5 mx-1 ${
                        selectedTicket.status === "처리중" ||
                        selectedTicket.status === "완료"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    ></div>

                    {/* 3. 처리 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 ${
                          selectedTicket.status === "처리중"
                            ? "bg-orange-500"
                            : selectedTicket.status === "완료"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        } rounded-full flex items-center justify-center text-white text-xs`}
                      >
                        {selectedTicket.status === "완료" ? "✓" : "3"}
                      </div>
                      <span className="mt-1 text-[10px]">처리</span>
                    </div>
                    <div
                      className={`flex-1 h-0.5 mx-1 ${
                        selectedTicket.status === "완료"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    ></div>

                    {/* 4. 완료 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 ${
                          selectedTicket.status === "완료"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        } rounded-full flex items-center justify-center text-white text-xs`}
                      >
                        {selectedTicket.status === "완료" ? "✓" : "4"}
                      </div>
                      <span className="mt-1 text-[10px]">완료</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 반려 사유 표시 */}
              {selectedTicket.status === "반려됨" &&
                selectedTicket.rejectedReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-red-900 mb-1">
                          반려 사유
                        </div>
                        <p className="text-sm text-red-700">
                          {selectedTicket.rejectedReason}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* 카카오톡 스타일 챗봇 대화 내역 생략없이 복원 */}
              <div className="space-y-3">
                <div className="flex justify-end mb-2">
                  <div className="max-w-[80%]">
                    <div
                      className="rounded-2xl rounded-tr-none p-3"
                      style={{ background: "#FEE500" }}
                    >
                      <p className="text-sm text-gray-900">
                        어떤 시설에 문제가 있나요?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 flex-shrink-0">
                      {selectedTicket.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm text-gray-900">
                          {selectedTicket.author}
                        </p>
                        <p className="text-xs text-gray-600">
                          {selectedTicket.date}
                        </p>
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 border border-gray-200">
                        <p className="text-sm text-gray-900">
                          {selectedTicket.category === "시설"
                            ? "강의실"
                            : selectedTicket.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mb-2">
                  <div className="max-w-[80%]">
                    <div
                      className="rounded-2xl rounded-tr-none p-3"
                      style={{ background: "#FEE500" }}
                    >
                      <p className="text-sm text-gray-900">
                        상세 내용을 입력해주세요
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex mb-2">
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 flex-shrink-0">
                      {selectedTicket.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm text-gray-900">
                          {selectedTicket.author}
                        </p>
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 border border-gray-200">
                        <p className="text-sm text-gray-900">
                          {selectedTicket.title}에 대해 문의드립니다. 빠른 조치
                          부탁드립니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedTicket.replies &&
                selectedTicket.replies.map((reply: any, index: number) => (
                  <div key={index} className="flex justify-end mt-4">
                    <div className="flex flex-row-reverse gap-2 max-w-[80%]">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                        {reply.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex flex-row-reverse items-center gap-2 mb-1">
                          <p className="font-medium text-sm text-blue-600">
                            {reply.author}
                          </p>
                          <p className="text-xs text-gray-500">{reply.date}</p>
                        </div>
                        <div className="bg-blue-500 text-white rounded-2xl rounded-tr-none p-3">
                          <p className="text-sm leading-relaxed">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* 일반 담당자 답변 입력 영역 */}
            {userRole === "일반담당자" && selectedTicket.status !== "완료" && (
              <div className="border-t border-gray-300 p-3 bg-gray-50">
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setShowTemplateModal(true)}
                    className="px-3 py-1.5 text-xs border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
                  >
                    <FileText className="w-3 h-3 inline mr-1" />
                    템플릿
                  </button>
                </div>
                <textarea
                  value={
                    draftReplies[selectedTicket.id] ||
                    selectedTicket.draftReply ||
                    ""
                  }
                  onChange={(e) => {
                    setDraftReplies((prev) => ({
                      ...prev,
                      [selectedTicket.id]: e.target.value,
                    }));
                  }}
                  placeholder="답변을 입력하세요..."
                  className="w-full px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  rows={4}
                />
                <div className="flex justify-between items-center mt-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        selectedTicket.draftReply =
                          draftReplies[selectedTicket.id] || "";
                        alert("임시 저장되었습니다");
                      }}
                      className="px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
                    >
                      임시 저장
                    </button>
                    <button
                      onClick={() => {
                        if (
                          !draftReplies[selectedTicket.id] &&
                          !selectedTicket.draftReply
                        ) {
                          alert("답변을 입력해주세요");
                          return;
                        }
                        const newReply = {
                          content:
                            draftReplies[selectedTicket.id] ||
                            selectedTicket.draftReply,
                          author: "담당자",
                          date: new Date().toLocaleString("ko-KR"),
                        };
                        if (!selectedTicket.replies)
                          selectedTicket.replies = [];
                        selectedTicket.replies.push(newReply);
                        setDraftReplies((prev) => {
                          const newDrafts = { ...prev };
                          delete newDrafts[selectedTicket.id];
                          return newDrafts;
                        });
                        selectedTicket.draftReply = null;
                      }}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" /> 전송
                    </button>
                    <button
                      onClick={() => {
                        selectedTicket.status = "완료";
                        setSelectedTicket(null);
                      }}
                      className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" /> 완료
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 템플릿 모달 및 담당자 배정 모달 (간략화되었으나 기능 유지) */}
        {showTemplateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold text-gray-900">답변 템플릿</h3>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <div className="space-y-2">
                  {templatesData.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => {
                        if (selectedTicket) {
                          setDraftReplies((prev) => ({
                            ...prev,
                            [selectedTicket.id]: template.content,
                          }));
                        }
                        setShowTemplateModal(false);
                      }}
                      className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                          {template.category}
                        </span>
                        <h4 className="font-medium text-sm">
                          {template.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        {template.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold text-gray-900">담당자 배정</h3>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>시설관리팀 박OO</option>
                  <option>학생지원팀 이OO</option>
                  <option>전산팀 김OO</option>
                </select>
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    배정
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const TemplatesScreen = () => (
    <div className="p-4 bg-white h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-900">답변 템플릿</h2>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm">
          <Plus className="w-3 h-3" /> 새 템플릿
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {templatesData.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-lg shadow p-3 border border-gray-200"
          >
            <div className="flex justify-between mb-2">
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                {t.category}
              </span>
              <div className="flex gap-1">
                <button>
                  <Edit className="w-3 h-3 text-gray-400" />
                </button>
                <button>
                  <Trash2 className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
            <p className="font-medium text-sm mb-1">{t.title}</p>
            <p className="text-xs text-gray-500 line-clamp-2">{t.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const StatsScreen = () => (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "전체 민원", value: "156", icon: Inbox, color: "blue" },
          {
            label: "평균 처리시간",
            value: "1.8일",
            icon: Clock,
            color: "green",
          },
          {
            label: "처리 완료율",
            value: "87%",
            icon: CheckCircle,
            color: "orange",
          },
          { label: "지연 건수", value: "5", icon: AlertCircle, color: "red" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-3 border border-gray-200"
          >
            <p className="text-xs text-gray-500">{item.label}</p>
            <p
              className={`text-2xl font-bold ${
                item.color === "red" ? "text-red-500" : "text-gray-800"
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 bg-white rounded-lg shadow p-3 border border-gray-200">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-1.5">
            <Search className="w-4 h-4" /> 키워드 분석
          </h3>
          <div
            className="flex flex-wrap gap-x-4 gap-y-3 items-center px-4"
            style={{
              height: "140px",
              minHeight: "140px",
              alignContent: "center",
            }}
          >
            {keywordsData.slice(0, 9).map((k, i) => (
              <span
                key={i}
                className={`${k.size} ${k.weight}`}
                style={{ color: categoryStats[i % 4].color }}
              >
                {k.word}
              </span>
            ))}
            <div className="basis-full h-0"></div>
            {keywordsData.slice(9).map((k, i) => (
              <span
                key={i + 9}
                className={`${k.size} ${k.weight}`}
                style={{ color: categoryStats[(i + 9) % 4].color }}
              >
                {k.word}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-1.5">
            <Target className="w-4 h-4" /> 카테고리별 민원
          </h3>
          <div style={{ width: "100%", height: "280px", minHeight: "280px" }}>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="45%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="value"
                >
                  {categoryStats.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value, entry) =>
                    `${value} (${(entry.payload as any).value}건)`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 일별 처리 시간
          </h3>
          <div style={{ width: "100%", height: "280px", minHeight: "280px" }}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={speedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" height={60} tick={{ dy: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Bar
                  dataKey="time"
                  name="처리 시간(시간)"
                  fill="#E94E3C"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const UsersScreen = () => {
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showAddBannedWordModal, setShowAddBannedWordModal] = useState(false);
    const [newBannedWord, setNewBannedWord] = useState("");
    const [bannedWordsList, setBannedWordsList] = useState(bannedWords);

    const handleAddBannedWord = () => {
      if (newBannedWord.trim()) {
        setBannedWordsList([...bannedWordsList, newBannedWord.trim()]);
        setNewBannedWord("");
        setShowAddBannedWordModal(false);
      }
    };
    const handleRemoveBannedWord = (index: number) => {
      setBannedWordsList(bannedWordsList.filter((_, i) => i !== index));
    };

    return (
      <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-900">사용자 관리</h2>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm"
          >
            <UserPlus className="w-3 h-3" /> 새 관리자
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">이름</th>
                <th className="text-left p-3">부서</th>
                <th className="text-left p-3">권한</th>
                <th className="text-center p-3">상태</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3 text-gray-600">{u.dept}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        u.role === "슈퍼관리자"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-500" />
              <h3 className="font-bold text-sm">금칙어 설정</h3>
            </div>
            <button
              onClick={() => setShowAddBannedWordModal(true)}
              className="text-xs text-pink-500"
            >
              + 추가
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {bannedWordsList.map((w, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs flex items-center gap-1"
              >
                {w}
                <button onClick={() => handleRemoveBannedWord(i)}>
                  <X className="w-3 h-3 hover:text-red-800" />
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* 모달 생략 (로직 동일) */}
      </div>
    );
  };

  const ScenarioScreen = () => (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-pink-500" />
          <h2 className="font-bold text-gray-900">시나리오 관리</h2>
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm">
          <Plus className="w-3 h-3" /> 새 시나리오
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">카테고리</th>
              <th className="text-left p-3">질문</th>
              <th className="text-left p-3">답변</th>
              <th className="text-center p-3">관리</th>
            </tr>
          </thead>
          <tbody>
            {faqScenarios.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                    {f.category}
                  </span>
                </td>
                <td className="p-3 font-medium">{f.question}</td>
                <td className="p-3 text-gray-600">{f.answer}</td>
                <td className="p-3 text-center">
                  <button>
                    <Edit className="w-3 h-3 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          💡 챗봇 고도화 대비: 현재는 FAQ 기반만 지원
        </p>
      </div>
    </div>
  );
  // 히트맵 색상 및 역량 계산 헬퍼 함수들
  const getHeatmapColor = (value: number) => {
    if (value >= 90) return "text-gray-900";
    if (value >= 10) return "text-white";
    return "text-white";
  };
  const getHeatmapBgColor = (value: number) => {
    if (value >= 90) return "#F59E42";
    if (value >= 80) return "#F5A857";
    if (value >= 70) return "#F4B26C";
    if (value >= 60) return "#E5BA93";
    if (value >= 50) return "#D6C2BA";
    if (value >= 40) return "#C7B8BA";
    if (value >= 30) return "#B8AEC1";
    if (value >= 20) return "#A199C8";
    if (value >= 10) return "#8B8FD0";
    return "#6D85DE";
  };
  const calculateSTARCompetencies = (deptData: any) => ({
    S: (deptData.기획 + deptData.실행 + deptData.화합 + deptData.통섭) / 4,
    T:
      (deptData.전공지식 +
        deptData.전공기술 +
        deptData.정보화 +
        deptData.신기술활용 +
        deptData.공감 +
        deptData.판단) /
      6,
    A: (deptData.사명감 + deptData.조직이해 + deptData.도전성) / 3,
    R:
      (deptData.경청 + deptData.협상 + deptData.외국어 + deptData.세계시민) / 4,
  });
  const calculateOverallAverage = () => {
    const all = collegeHeatmapData.map((d) => calculateSTARCompetencies(d));
    return {
      S: all.reduce((s, c) => s + c.S, 0) / all.length,
      T: all.reduce((s, c) => s + c.T, 0) / all.length,
      A: all.reduce((s, c) => s + c.A, 0) / all.length,
      R: all.reduce((s, c) => s + c.R, 0) / all.length,
    };
  };
  const getDepartmentComparisonData = () => {
    const d = collegeHeatmapData.find((x) => x.college === selectedDepartment);
    if (!d) return [];
    const s = calculateSTARCompetencies(d);
    const a = calculateOverallAverage();
    return [
      { competency: "Self-directed", 선택학과: s.S, 전체평균: a.S },
      { competency: "Teamwork", 선택학과: s.T, 전체평균: a.T },
      { competency: "Analytical", 선택학과: s.A, 전체평균: a.A },
      { competency: "Relational", 선택학과: s.R, 전체평균: a.R },
    ];
  };
  const getDepartmentPOComparisonData = () => {
    // (간략화된 로직)
    return getDepartmentComparisonData().map((d) => ({
      ...d,
      competency:
        d.competency === "Self-directed" ? "창의적 문제해결" : d.competency,
    }));
  };
  const getFilteredDepartments = () =>
    deptSearchText
      ? collegeHeatmapData.filter((d) =>
          d.college.toLowerCase().includes(deptSearchText.toLowerCase())
        )
      : collegeHeatmapData;

  const DashboardScreen = () => (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: "전체 학생수",
            value: "1,000명",
            icon: Users,
            color: "blue",
            change: "+5.2%",
          },
          {
            label: "평균 역량 점수",
            value: "76.3",
            icon: TrendingUp,
            color: "green",
            change: "+3.8%",
          },
          {
            label: "인증 달성률",
            value: "87.5%",
            icon: Award,
            color: "purple",
            change: "+2.1%",
          },
          {
            label: "CQI 완료율",
            value: "92.3%",
            icon: CheckCircle,
            color: "orange",
            change: "+1.5%",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-3 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">{item.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {item.value}
                  </p>
                  <span className="text-xs text-green-600">{item.change}</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <item.icon className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-gray-600" />
              </div>
              <h3 className="font-bold text-sm text-gray-900">
                학과별 S-T-A-R 역량 비교
              </h3>
            </div>
            <div className="mb-4 relative dept-dropdown-container">
              <button
                onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                className="px-3 py-1 border rounded bg-white text-sm flex gap-2"
              >
                {selectedDepartment} <ChevronDown className="w-4 h-4" />
              </button>
              {showDeptDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 w-48 max-h-48 overflow-y-auto">
                  {getFilteredDepartments().map((d) => (
                    <button
                      key={d.college}
                      onClick={() => {
                        setSelectedDepartment(d.college);
                        setShowDeptDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      {d.college}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div style={{ width: "100%", height: "220px" }}>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={getDepartmentComparisonData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="competency" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name="선택학과"
                    dataKey="선택학과"
                    stroke="#C13584"
                    fill="#C13584"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="전체평균"
                    dataKey="전체평균"
                    stroke="#9ca3af"
                    fill="#9ca3af"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ width: "100%", height: "220px" }}>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={getDepartmentPOComparisonData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="competency" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name="선택학과"
                    dataKey="선택학과"
                    stroke="#C13584"
                    fill="#C13584"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <h3 className="font-bold text-sm mb-3">학년별 역량 성장 추이</h3>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={gradeGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis domain={[50, 90]} />
                <Tooltip />
                <Line type="monotone" dataKey="S" stroke="#E94E3C" />
                <Line type="monotone" dataKey="T" stroke="#F7941D" />
                <Line type="monotone" dataKey="A" stroke="#C13584" />
                <Line type="monotone" dataKey="R" stroke="#5B51D8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 과별 역량 히트맵 테이블 (축약하여 렌더링) */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200 overflow-x-auto">
        <h3 className="font-bold text-sm mb-3">과별 역량 강/약점 히트맵</h3>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="p-2 border">과</th>
              <th className="p-2 border bg-red-100">기획(S)</th>
              <th className="p-2 border bg-orange-100">전공(T)</th>
              <th className="p-2 border bg-purple-100">사명(A)</th>
              <th className="p-2 border bg-indigo-100">소통(R)</th>
            </tr>
          </thead>
          <tbody>
            {collegeHeatmapData.slice(0, 10).map((c, i) => (
              <tr key={i}>
                <td className="p-2 border font-medium">{c.college}</td>
                <td
                  className="p-2 border text-center"
                  style={{
                    backgroundColor: getHeatmapBgColor(c.기획),
                    color: getHeatmapColor(c.기획),
                  }}
                >
                  {c.기획}
                </td>
                <td
                  className="p-2 border text-center"
                  style={{
                    backgroundColor: getHeatmapBgColor(c.전공지식),
                    color: getHeatmapColor(c.전공지식),
                  }}
                >
                  {c.전공지식}
                </td>
                <td
                  className="p-2 border text-center"
                  style={{
                    backgroundColor: getHeatmapBgColor(c.사명감),
                    color: getHeatmapColor(c.사명감),
                  }}
                >
                  {c.사명감}
                </td>
                <td
                  className="p-2 border text-center"
                  style={{
                    backgroundColor: getHeatmapBgColor(c.경청),
                    color: getHeatmapColor(c.경청),
                  }}
                >
                  {c.경청}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const StudentAppScreen = () => (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
        <h3 className="font-bold text-sm mb-3">학생 상세 역량 (김학생)</h3>
        <div className="grid grid-cols-2 gap-4">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={studentRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar
                name="내 점수"
                dataKey="student"
                stroke="#E94E3C"
                fill="#E94E3C"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-bold">행동지표 달성도</h4>
              {behaviorIndicators.map((b) => (
                <div key={b.code} className="flex justify-between text-sm mt-1">
                  <span>{b.name}</span>
                  <span className="font-bold text-blue-600">
                    {b.achievement}%
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-bold">Evidence</h4>
              {evidenceData.map((e, i) => (
                <div key={i} className="text-xs mt-1 text-gray-600">
                  {e.course} - {e.assignment}: <b>{e.score}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfessorAppScreen = () => (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-sm mb-3">교과목 성취도 분포</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={courseAchievementDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-sm mb-3">평가도구별 분석</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={assessmentToolData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tool" />
              <YAxis domain={[60, 100]} />
              <Legend />
              <Bar dataKey="S" fill="#E94E3C" />
              <Bar dataKey="T" fill="#F7941D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-900 flex text-gray-900">
      <div className="w-48 bg-gray-800 shadow-lg flex flex-col border-r border-gray-700">
        <div className="h-[60px] px-3 flex items-center border-b border-gray-700 gap-2">
          <div className="w-8 h-8 bg-white rounded-lg p-1">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="font-bold text-sm text-white">수성대학교</p>
            <p className="text-xs text-white">관리자</p>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          <button
            onClick={() => handleCategoryChange("dashboard")}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${
              activeCategory === "dashboard"
                ? "bg-gray-700 text-white border-l-2 border-pink-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>대시보드</span>
          </button>
          <button
            onClick={() => handleCategoryChange("workspace")}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${
              activeCategory === "workspace"
                ? "bg-gray-700 text-white border-l-2 border-pink-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>워크스페이스</span>
          </button>
          {userRole === "슈퍼관리자" && (
            <>
              <button
                onClick={() => handleCategoryChange("stats")}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${
                  activeCategory === "stats"
                    ? "bg-gray-700 text-white border-l-2 border-pink-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>통계/분석</span>
              </button>
              <button
                onClick={() => handleCategoryChange("system")}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${
                  activeCategory === "system"
                    ? "bg-gray-700 text-white border-l-2 border-pink-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>시스템 관리</span>
              </button>
            </>
          )}
        </nav>
        <div className="p-2 border-t border-gray-700">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="w-full flex items-center gap-2 text-white text-xs"
          >
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              {userRole[0]}
            </div>
            {userRole}
          </button>
          {showRoleDropdown && (
            <div className="absolute bottom-12 left-2 bg-gray-800 border p-1 rounded shadow">
              <button
                onClick={() => setUserRole("슈퍼관리자")}
                className="block w-full text-left text-white text-xs p-1 hover:bg-gray-700"
              >
                슈퍼관리자
              </button>
              <button
                onClick={() => setUserRole("일반담당자")}
                className="block w-full text-left text-white text-xs p-1 hover:bg-gray-700"
              >
                일반담당자
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 shadow-sm px-4 h-[60px] flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-gray-100 text-[20px]">
              {activeCategory.toUpperCase()}
            </h1>
            <div className="flex gap-2">
              {activeCategory === "workspace" && (
                <>
                  <button
                    onClick={() => setActiveSubMenu("tickets")}
                    className={`px-3 py-1.5 rounded text-sm ${
                      activeSubMenu === "tickets"
                        ? "bg-gray-700 text-white"
                        : "text-gray-400"
                    }`}
                  >
                    티켓 관리
                  </button>
                  <button
                    onClick={() => setActiveSubMenu("templates")}
                    className={`px-3 py-1.5 rounded text-sm ${
                      activeSubMenu === "templates"
                        ? "bg-gray-700 text-white"
                        : "text-gray-400"
                    }`}
                  >
                    템플릿
                  </button>
                </>
              )}
              {activeCategory === "apps" && (
                <>
                  <button
                    onClick={() => setActiveSubMenu("student-app")}
                    className="px-3 py-1.5 rounded text-sm bg-gray-700 text-white"
                  >
                    학생 앱
                  </button>
                  <button
                    onClick={() => setActiveSubMenu("professor-app")}
                    className="px-3 py-1.5 rounded text-sm text-gray-400"
                  >
                    교수 앱
                  </button>
                </>
              )}
            </div>
          </div>
          <Bell className="w-4 h-4 text-gray-300" />
        </header>
        <main className="flex-1 overflow-auto bg-gray-50">
          {activeSubMenu === "tickets" && <TicketsScreen />}
          {activeSubMenu === "templates" && <TemplatesScreen />}
          {activeSubMenu === "overview" && <StatsScreen />}
          {activeSubMenu === "users" && <UsersScreen />}
          {activeSubMenu === "scenario" && <ScenarioScreen />}
          {activeSubMenu === "competency" && <DashboardScreen />}
          {activeSubMenu === "student-app" && <StudentAppScreen />}
          {activeSubMenu === "professor-app" && <ProfessorAppScreen />}
        </main>
      </div>
    </div>
  );
}
