import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LabelList } from 'recharts';
import { Home, BookOpen, Users, FileText, User, ChevronRight, X, Search, Bell, Share2, Download, AlertCircle, TrendingUp, Award, Target, Clock, Settings, MessageCircle, Send, CheckCircle, ChartBar, ChartLine, TriangleAlert, FlaskConical, Calendar } from 'lucide-react';
import logoImage from 'figma:asset/a5f360b8c95401cf229a69f0c0d2de04cefbe043.png';

// 교과목역량 성취도 히스토그램 데이터
const histogramData = [
  { range: '0-20', students: 2 },
  { range: '21-40', students: 5 },
  { range: '41-60', students: 12 },
  { range: '61-80', students: 28 },
  { range: '81-100', students: 18 },
];

// 평가도구별 분석 데이터
const assessmentData = [
  { name: '중간고사', S: 75, T: 82, A: 78, R: 71 },
  { name: '기말고사', S: 78, T: 85, A: 80, R: 74 },
  { name: '과제', S: 85, T: 88, A: 90, R: 82 },
  { name: '출석', S: 92, T: 90, A: 95, R: 88 },
];

// 관심 학생 알림 데이터
const concernStudents = [
  { id: 1, name: '김민수', competency: 'T', score: 65, threshold: 70, level: 'danger' },
  { id: 2, name: '이지은', competency: 'S', score: 62, threshold: 70, level: 'danger' },
  { id: 3, name: '박준호', competency: 'A', score: 68, threshold: 70, level: 'danger' },
  { id: 4, name: '최서연', competency: 'R', score: 64, threshold: 70, level: 'danger' },
  { id: 5, name: '정민재', competency: 'A', score: 72, threshold: 70, level: 'warning' },
  { id: 6, name: '강지훈', competency: 'T', score: 71, threshold: 70, level: 'warning' },
  { id: 7, name: '윤서아', competency: 'S', score: 73, threshold: 70, level: 'warning' },
];

// 성과 분석 리포트 데이터
const performanceReport = {
  achievementRate: 87,
  yearlyImprovement: 5.2,
  weakAreas: [
    { area: 'R (소통)', score: 73.5 },
    { area: 'S (창의)', score: 76.2 },
    { area: 'T (실무)', score: 80.1 },
  ],
};

// 교수법 연계 진단 데이터
const teachingMethodData = [
  { method: 'PBL', score: 82.5 },
  { method: 'Flipped Learning', score: 79.3 },
  { method: '강의식', score: 74.1 },
  { method: '토론식', score: 77.8 },
];

// 담당 과목 데이터
const courses = [
  { id: 1, name: '데이터구조', students: 65, semester: '2025-1', competency: 'T' },
  { id: 2, name: '알고리즘', students: 58, semester: '2025-1', competency: 'S' },
  { id: 3, name: '소프트웨어공학', students: 42, semester: '2025-1', competency: 'T' },
];

// 학생 목록 데이터
const studentList = [
  { id: 1, name: '김민수', studentId: '202012345', dept: '컴퓨터공학과', S: 85, T: 65, A: 78, R: 72 },
  { id: 2, name: '이지은', studentId: '202012346', dept: '컴퓨터공학과', S: 88, T: 62, A: 90, R: 75 },
  { id: 3, name: '박준호', studentId: '202012347', dept: '컴퓨터공학과', S: 92, T: 68, A: 85, R: 80 },
  { id: 4, name: '최서연', studentId: '202012348', dept: '컴퓨터공학과', S: 78, T: 82, A: 72, R: 88 },
  { id: 5, name: '정민재', studentId: '202012349', dept: '컴퓨터공학과', S: 82, T: 90, A: 71, R: 85 },
  { id: 6, name: '강예린', studentId: '202012350', dept: '컴퓨터공학과', S: 90, T: 88, A: 95, R: 92 },
  { id: 7, name: '윤태호', studentId: '202012351', dept: '컴퓨터공학과', S: 75, T: 78, A: 80, R: 70 },
  { id: 8, name: '한소희', studentId: '202012352', dept: '컴퓨터공학과', S: 88, T: 92, A: 88, R: 82 },
];

// 알림 데이터
const notifications = [
  { id: 1, title: '역량 미달 학생 발견', message: 'T(실무) 역량 미달 학생 3명이 확인되었습니다.', time: '10분 전', read: false },
  { id: 2, title: 'CQI 보고서 제출 기한', message: '2025학년도 1학기 CQI 보고서 제출 기한이 7일 남았습니다.', time: '1시간 전', read: false },
  { id: 3, title: '성적 입력 완료', message: '중간고사 성적 입력이 완료되었습니다.', time: '3시간 전', read: true },
  { id: 4, title: '학생 상담 요청', message: '김민수 학생이 상담을 요청했습니다.', time: '1일 전', read: true },
];

// 학생별 종합현황 레이더 데이터 생성 함수
const getStudentRadarSTAR = (student: any) => [
  { subject: 'S (창의)', 내점수: student.S, 학급평균: 78, 전국평균: 75 },
  { subject: 'T (실무)', 내점수: student.T, 학급평균: 80, 전국평균: 77 },
  { subject: 'A (인성)', 내점수: student.A, 학급평균: 83, 전국평균: 80 },
  { subject: 'R (소통)', 내점수: student.R, 학급평균: 76, 전국평균: 74 },
];

// 하위역량 PO (9개 축 - 시계방향 상단부터)
const getStudentRadarPO = (student: any) => {
  // STAR 역량을 기반으로 하위역량 점수 생성 (약간의 변동 추가)
  const variation = () => Math.floor(Math.random() * 10) - 5;
  return [
    { subject: '창의적\n문제해결', 내점수: Math.min(100, Math.max(0, student.S + variation())), 학급평균: 79, 전국평균: 76 },
    { subject: '융복합적\n사고', 내점수: Math.min(100, Math.max(0, student.S + variation())), 학급평균: 77, 전국평균: 74 },
    { subject: '전문지식', 내점수: Math.min(100, Math.max(0, student.T + variation())), 학급평균: 82, 전국평균: 79 },
    { subject: '미래혁신', 내점수: Math.min(100, Math.max(0, student.T + variation())), 학급평균: 78, 전국평균: 75 },
    { subject: '리더십', 내점수: Math.min(100, Math.max(0, student.A + variation())), 학급평균: 80, 전국평균: 77 },
    { subject: '공동체\n의식', 내점수: Math.min(100, Math.max(0, student.A + variation())), 학급평균: 84, 전국평균: 81 },
    { subject: '자기계발', 내점수: Math.min(100, Math.max(0, student.R + variation())), 학급평균: 81, 전국평균: 78 },
    { subject: '의사소통', 내점수: Math.min(100, Math.max(0, student.R + variation())), 학급평균: 75, 전국평균: 73 },
    { subject: '글로컬\n시민', 내점수: Math.min(100, Math.max(0, student.R + variation())), 학급평균: 77, 전국평균: 74 },
  ];
};

export default function ProfessorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedCompetency, setSelectedCompetency] = useState('전체');
  const [selectedConcernCompetency, setSelectedConcernCompetency] = useState('전체');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showConcernStudentModal, setShowConcernStudentModal] = useState(false);
  const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] = useState(false);
  const [showLoginInfoModal, setShowLoginInfoModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(4); // 현재 진행중인 주차
  const [radarViewMode, setRadarViewMode] = useState<'STAR' | 'PO'>('STAR'); // 레이더 차트 토글
  const [selectedRadarStudent, setSelectedRadarStudent] = useState(studentList[0]); // 레이더 차트에 표시할 학생
  const [notificationChannels, setNotificationChannels] = useState({
    pwa: true,
    kakao: false,
    email: true,
  });

  // 역량별 색상
  const competencyColors: Record<string, string> = {
    S: '#E94E3C',
    T: '#F7941D',
    A: '#C13584',
    R: '#5B51D8',
  };

  // 신호등 색상
  const trafficLightColor: Record<string, string> = {
    danger: '#EF4444',
    warning: '#F59E0B',
    safe: '#10B981',
  };

  // 공통 헤더 컴포넌트
  const CommonHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
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
      <h2 className="font-bold text-xl mb-1">{title}</h2>
      <p className="text-sm opacity-90">{subtitle}</p>
      
      {/* 과목 선택 드롭다운 */}
      <div className="mt-4">
        <select 
          value={selectedCourse.id}
          onChange={(e) => setSelectedCourse(courses.find(c => c.id === Number(e.target.value)) || courses[0])}
          className="w-full p-3 bg-white/20 text-white rounded-xl border-2 border-white/30 font-medium backdrop-blur-sm hover:bg-white/30 transition-all cursor-pointer"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'white\' d=\'M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            paddingRight: '2.5rem',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none'
          }}
        >
          {courses.map(course => (
            <option key={course.id} value={course.id} className="bg-gray-800 text-white">
              {course.name}  {course.semester}학기 | {course.students}명 수강
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  // 대시보드 화면
  const DashboardScreen = () => (
    <div className="pb-4">
      <CommonHeader 
        title="교과목 역량 관리" 
        subtitle="담당 과목 학생 역량 성취도 분석" 
      />

      {/* 교과목역량 성취도 히스토그램 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <ChartBar className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-800">교과목역량 성취도</h3>
          </div>
          <select 
            value={selectedCompetency}
            onChange={(e) => setSelectedCompetency(e.target.value)}
            className="text-sm p-2 border border-gray-200 rounded-lg"
          >
            <option value="전체">전체</option>
            <option value="S">S (창의)</option>
            <option value="T">T (실무)</option>
            <option value="A">A (인성)</option>
            <option value="R">R (소통)</option>
          </select>
        </div>
        <p className="text-xs text-gray-500 mb-4">점수 구간별 학생 수 분포</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={histogramData} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="range" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} width={35} />
            <Tooltip />
            <Bar dataKey="students" fill="#F7941D" radius={[8, 8, 0, 0]}>
              <LabelList dataKey="students" position="inside" style={{ fontSize: 13, fill: '#ffffff', fontWeight: 'bold' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 p-3 bg-[rgb(241,245,249)] rounded-xl">
          <p className="text-sm text-[rgb(51,65,85)]">
            <strong>평균 점수:</strong> 74.3점 | <strong>중앙값:</strong> 76점
          </p>
        </div>
      </div>

      {/* 학생별 종합현황 레이더 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-800">학생별 종합현황 레이더</h3>
          </div>
          <select 
            value={selectedRadarStudent.id}
            onChange={(e) => {
              const student = studentList.find(s => s.id === Number(e.target.value));
              if (student) setSelectedRadarStudent(student);
            }}
            className="text-sm p-2 border border-gray-200 rounded-lg bg-white"
          >
            {studentList.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {/* 토글 버튼 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setRadarViewMode('STAR')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
              radarViewMode === 'STAR'
                ? 'bg-gradient-to-r from-[#E94E3C] to-[#F7941D] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            S·T·A·R 핵심역량
          </button>
          <button
            onClick={() => setRadarViewMode('PO')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
              radarViewMode === 'PO'
                ? 'bg-gradient-to-r from-[#E94E3C] to-[#F7941D] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            하위역량(PO)
          </button>
        </div>

        {/* 레이더 차트 */}
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={radarViewMode === 'STAR' ? getStudentRadarSTAR(selectedRadarStudent) : getStudentRadarPO(selectedRadarStudent)}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 11, fill: '#4b5563' }}
              style={{ whiteSpace: 'pre-line' }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 10 }}
            />
            <Radar 
              name="내 점수" 
              dataKey="내점수" 
              stroke="#F7941D" 
              fill="#F7941D" 
              fillOpacity={0.5}
              strokeWidth={2}
            />
            <Radar 
              name="학급 평균" 
              dataKey="학급평균" 
              stroke="#E94E3C" 
              fill="#E94E3C" 
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar 
              name="전국 평균" 
              dataKey="전국평균" 
              stroke="#C13584" 
              fill="#C13584" 
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Legend 
              wrapperStyle={{ fontSize: '11px' }} 
              iconType="circle"
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>

        {/* S/T/A/R 역량별 수치 카드 */}
        {radarViewMode === 'STAR' && (
          <div className="grid grid-cols-4 gap-2 mt-4">
            <div className="bg-gradient-to-br from-[#E94E3C]/10 to-[#E94E3C]/5 border-2 border-[#E94E3C] rounded-xl p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">S·창의</div>
              <div className="text-xl font-bold text-[#E94E3C]">{selectedRadarStudent.S}</div>
            </div>
            <div className="bg-gradient-to-br from-[#F7941D]/10 to-[#F7941D]/5 border-2 border-[#F7941D] rounded-xl p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">T·실무</div>
              <div className="text-xl font-bold text-[#F7941D]">{selectedRadarStudent.T}</div>
            </div>
            <div className="bg-gradient-to-br from-[#C13584]/10 to-[#C13584]/5 border-2 border-[#C13584] rounded-xl p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">A·인성</div>
              <div className="text-xl font-bold text-[#C13584]">{selectedRadarStudent.A}</div>
            </div>
            <div className="bg-gradient-to-br from-[#5B51D8]/10 to-[#5B51D8]/5 border-2 border-[#5B51D8] rounded-xl p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">R·소통</div>
              <div className="text-xl font-bold text-[#5B51D8]">{selectedRadarStudent.R}</div>
            </div>
          </div>
        )}

        <div className="mt-3 p-3 bg-[rgb(241,245,249)] rounded-xl">
          <p className="text-sm text-[rgb(51,65,85)]">
            💡 <strong>{selectedRadarStudent.name} 학생 분석:</strong> {
              radarViewMode === 'STAR' 
                ? (() => {
                    const scores = { S: selectedRadarStudent.S, T: selectedRadarStudent.T, A: selectedRadarStudent.A, R: selectedRadarStudent.R };
                    const maxKey = Object.keys(scores).reduce((a, b) => scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b);
                    const minKey = Object.keys(scores).reduce((a, b) => scores[a as keyof typeof scores] < scores[b as keyof typeof scores] ? a : b);
                    const labels: Record<string, string> = { S: '창의', T: '실무', A: '인성', R: '소통' };
                    return `${labels[maxKey]} 역량이 가장 우수하며, ${labels[minKey]} 역량 개선이 필요합니다.`;
                  })()
                : '하위역량 중 강점과 보완점을 파악하여 맞춤형 학습 계획을 수립하세요.'
            }
          </p>
        </div>
      </div>

      {/* 평가도구별 분석 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <ChartLine className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">평가도구별 분석</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">각 평가 요소별 역량 점수 비교</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={assessmentData} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} width={35} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Bar dataKey="S" fill="#E94E3C" radius={[4, 4, 0, 0]} />
            <Bar dataKey="T" fill="#F7941D" radius={[4, 4, 0, 0]} />
            <Bar dataKey="A" fill="#C13584" radius={[4, 4, 0, 0]} />
            <Bar dataKey="R" fill="#5B51D8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 p-3 bg-[rgb(241,245,249)] rounded-xl">
          <p className="text-sm text-[rgb(51,65,85)]">
            💡 <strong>인사이트:</strong> 과제 평가에서 가장 높은 역량 점수를 보입니다.
          </p>
        </div>
      </div>

      {/* 관심 학생 알림 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <TriangleAlert className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">관심 학생 알림</h3>
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {concernStudents.filter(s => s.level === 'danger').length}명
          </span>
        </div>
        
        {/* 상태별 카테고리 버튼 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedConcernCompetency('역량 미달')}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              selectedConcernCompetency === '역량 미달'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            역량 미달
            <span className="ml-1">({concernStudents.filter(s => s.level === 'danger').length})</span>
          </button>
          <button
            onClick={() => setSelectedConcernCompetency('주의 필요')}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              selectedConcernCompetency === '주의 필요'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            주의 필요
            <span className="ml-1">({concernStudents.filter(s => s.level === 'warning').length})</span>
          </button>
        </div>
        
        {/* 필터링된 학생 리스트 */}
        <div className="space-y-2">
          {(() => {
            const filteredStudents = selectedConcernCompetency === '역량 미달'
              ? concernStudents.filter(s => s.level === 'danger')
              : concernStudents.filter(s => s.level === 'warning');
            
            if (filteredStudents.length === 0) {
              return (
                <div className="py-8 text-center">
                  <p className="text-gray-400 text-sm">해당 카테고리의 관심 학생이 없습니다</p>
                </div>
              );
            }

            return filteredStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 mt-[0px] mr-[10px] mb-[8px] ml-[10px]">
                <div className="flex items-center gap-2">
                  <span style={{color: competencyColors[student.competency]}} className="font-bold text-lg">
                    {student.competency}
                  </span>
                  <span className="text-gray-800">{student.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {student.score}점 / {student.threshold}점
                </span>
              </div>
            ));
          })()}
        </div>
      </div>

      {/* 성과 분석 리포트 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-800">성과 분석 리포트</h3>
          </div>
          <button className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
            CQI 보고서용
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* 목표 달성률 */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">목표 달성률</p>
            <p className="text-3xl font-bold text-gray-700">{performanceReport.achievementRate}%</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-600 h-2 rounded-full" 
                style={{ width: `${performanceReport.achievementRate}%` }}
              ></div>
            </div>
          </div>

          {/* 전년 대비 향상도 */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">전년 대비</p>
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="w-6 h-6 text-gray-700" />
              <p className="text-3xl font-bold text-gray-700">
                {performanceReport.yearlyImprovement}%
              </p>
            </div>
            <p className="text-xs text-gray-600 mt-2">향상</p>
          </div>
        </div>

        {/* 하위 영역 분석 */}
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-sm font-bold text-gray-800 mb-2">성취도 하위 영역</p>
          <div className="space-y-2">
            {performanceReport.weakAreas.map((area, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{area.area}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${area.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 w-12 text-right">{area.score}점</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => {
            alert('성과 분석 리포트 다운로드\n\n목표 달성률: 87%\n전년 대비 향상도: 5.2%\n\n성취도 하위 영역:\n• R (소통): 73.5점\n• S (창의): 76.2점\n• T (실무): 80.1점\n\nPDF/Excel 형식으로 다운로드됩니다.');
          }}
          className="w-full mt-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          PDF/Excel 다운로드
        </button>
      </div>

      {/* 교수법 연계 진단 */}
      <div className="mx-4 mt-4 mb-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-800">교수법 연계 진단</h3>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Beta</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">교수법과 학생 성취도 간 상관관계</p>
        
        <div className="space-y-2">
          {teachingMethodData.map((method, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">{method.method}</span>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-600 h-2 rounded-full" 
                    style={{ width: `${method.score}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-gray-700 w-12 text-right">{method.score}점</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-700">
            💡 PBL 방식에서 가장 높은 평균 성취도를 보입니다. (2차년도 고도화 예정)
          </p>
        </div>
      </div>
    </div>
  );

  // 과목관리 화면
  const CourseScreen = () => (
    <div className="pb-4">
      <CommonHeader 
        title="과목 관리" 
        subtitle="담당 과목 상세 관리" 
      />

      {/* 강의 관리 메뉴 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">강의계획서</p>
              <p className="text-xs text-gray-500">주차별 강의 계획 및 평가 기준</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">성적 입력</p>
              <p className="text-xs text-gray-500">중간/기말/과제 성적 관리</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">출석 관리</p>
              <p className="text-xs text-gray-500">주차별 출석 현황 확인</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">공지사항</p>
              <p className="text-xs text-gray-500">수강생 공지사항 작성/관리</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* 주차별 강의 현황 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">주차별 강의 현황</h3>
        </div>
        
        {/* 주차 선택 드롭다운 */}
        <div className="mb-4">
          <select 
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(Number(e.target.value))}
            className="w-full p-3 bg-gray-50 text-gray-800 rounded-xl border-2 border-gray-200 font-medium hover:bg-gray-100 transition-all cursor-pointer"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23666\' d=\'M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              paddingRight: '2.5rem',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(week => (
              <option key={week} value={week}>
                {week}주차
              </option>
            ))}
          </select>
        </div>

        {/* 선택된 주차의 강의 목록 */}
        <div className="space-y-3">
          {(() => {
            const weeklyLectures = [
              { week: 1, date: '2025-03-03', day: '월', title: '자료구조 개론', status: '완료', attendance: 98 },
              { week: 1, date: '2025-03-05', day: '수', title: '배열 자료구조', status: '완료', attendance: 96 },
              { week: 2, date: '2025-03-10', day: '월', title: '배열과 리스트', status: '완료', attendance: 95 },
              { week: 2, date: '2025-03-12', day: '수', title: '연결 리스트', status: '완료', attendance: 94 },
              { week: 3, date: '2025-03-17', day: '월', title: '스택과 큐', status: '완료', attendance: 97 },
              { week: 3, date: '2025-03-19', day: '수', title: '스택/큐 실습', status: '완료', attendance: 95 },
              { week: 4, date: '2025-03-24', day: '월', title: '트리 구조', status: '진행중', attendance: 92 },
              { week: 4, date: '2025-03-26', day: '수', title: '이진 트리', status: '예정', attendance: 0 },
              { week: 5, date: '2025-03-31', day: '월', title: '그래프 이론', status: '예정', attendance: 0 },
              { week: 5, date: '2025-04-02', day: '수', title: '그래프 탐색', status: '예정', attendance: 0 },
            ];

            const filteredLectures = weeklyLectures.filter(lecture => lecture.week === selectedWeek);

            return filteredLectures.map((lecture, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-500">
                        {lecture.date.split('-')[0]}년 {lecture.date.split('-')[1]}월 {lecture.date.split('-')[2]}일 ({lecture.day})
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        lecture.status === '완료' ? 'bg-green-100 text-green-700' : 
                        lecture.status === '진행중' ? 'bg-blue-100 text-blue-700' : 
                        'bg-gray-200 text-gray-500'
                      }`}>
                        {lecture.status}
                      </span>
                    </div>
                    <p className="font-bold text-gray-800 mb-1">{lecture.title}</p>
                    {lecture.status !== '예정' && (
                      <p className="text-sm text-gray-600">출석률: {lecture.attendance}%</p>
                    )}
                  </div>
                </div>
              </div>
            ));
          })()}
        </div>
      </div>

      {/* 평가 기준 */}
      <div className="mx-4 mt-4 mb-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <ChartBar className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">평가 기준</h3>
        </div>
        <div className="space-y-3">
          {[
            { name: '중간고사', weight: 30, color: 'bg-blue-500' },
            { name: '기말고사', weight: 30, color: 'bg-green-500' },
            { name: '과제', weight: 25, color: 'bg-orange-500' },
            { name: '출석', weight: 15, color: 'bg-purple-500' },
          ].map((criteria) => (
            <div key={criteria.name} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 w-20">{criteria.name}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div 
                  className={`${criteria.color} h-6 rounded-full flex items-center justify-end pr-2`}
                  style={{ width: `${criteria.weight}%` }}
                >
                  <span className="text-xs text-white font-bold">{criteria.weight}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 학생현황 화면
  const StudentScreen = () => (
    <div className="pb-4">
      <CommonHeader 
        title="학생 현황" 
        subtitle="수강생 역량 현황 및 상담 관리" 
      />

      <div className="mx-4 mt-4 space-y-3">
        {studentList.map(student => (
          <div 
            key={student.id} 
            className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all"
            onClick={() => {
              setSelectedStudent(student);
              setShowStudentDetailModal(true);
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-bold text-gray-800">{student.name}</p>
                <p className="text-xs text-gray-500">{student.studentId} | {student.dept}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {['S', 'T', 'A', 'R'].map(comp => {
                const score = student[comp as keyof typeof student] as number;
                const isLow = score < 70;
                return (
                  <div 
                    key={comp}
                    className={`text-center p-2 rounded-lg ${isLow ? 'bg-red-50' : 'bg-gray-50'}`}
                  >
                    <p className="text-xs text-gray-600 mb-1">{comp}</p>
                    <p className={`font-bold ${isLow ? 'text-red-600' : 'text-gray-800'}`}>
                      {score}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 리포트 화면
  const ReportScreen = () => (
    <div className="pb-4">
      <CommonHeader 
        title="리포트" 
        subtitle="CQI 보고서 및 교육성과 분석" 
      />

      <div className="mx-4 mt-4 space-y-3">
        {/* CQI 보고서 */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">CQI 보고서</h3>
              <p className="text-xs text-gray-500">2025-1학기</p>
            </div>
          </div>
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">
            보고서 작성
          </button>
        </div>

        {/* 학기별 성과 비교 */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">학기별 성과 비교</h3>
              <p className="text-xs text-gray-500">최근 3개 학기</p>
            </div>
          </div>
          <button className="w-full py-3 bg-green-600 text-white rounded-xl font-bold">
            분석 보기
          </button>
        </div>

        {/* 교육목표 달성도 */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">교육목표 달성도</h3>
              <p className="text-xs text-gray-500">학과 교육목표 대비</p>
            </div>
          </div>
          <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold">
            상세 분석
          </button>
        </div>
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
            박
          </div>
          <div>
            <p className="font-bold text-lg">박지훈 교수</p>
            <p className="text-gray-500 text-sm">컴퓨터공학과</p>
            <p className="text-gray-400 text-xs">담당 과목: 3개</p>
          </div>
        </div>
      </div>

      {/* 메뉴 카드 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* 알림 설정 */}
        <button 
          onClick={() => setShowNotificationSettingsModal(true)}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">알림 설정</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* 성과 분석 리포트 다운로드 */}
        <button 
          onClick={() => {
            alert('성과 분석 리포트 다운로드\n\n목표 달성률: 87%\n전년 대비 향상도: 5.2%\n\n성취도 하위 영역:\n• R (소통): 73.5점\n• S (창의): 76.2점\n• T (실무): 80.1점\n\nPDF/Excel 형식으로 다운로드됩니다.');
          }}
          className="w-full mt-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          PDF/Excel 다운로드
        </button>

        {/* 로그인 정보 */}
        <button 
          onClick={() => setShowLoginInfoModal(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">로그인 정보 (SSO)</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <button className="mx-4 mt-4 w-[calc(100%-2rem)] py-3 text-gray-500 text-sm">
        로그아웃
      </button>
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

  return (
    <div className="min-h-screen bg-gray-100 max-w-md mx-auto relative overflow-hidden">
      {/* 메인 컨텐츠 */}
      <div className="pb-20 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 5rem)' }}>
        {activeTab === 'dashboard' && <DashboardScreen />}
        {activeTab === 'course' && <CourseScreen />}
        {activeTab === 'student' && <StudentScreen />}
        {activeTab === 'report' && <ReportScreen />}
        {activeTab === 'mypage' && <MyPageScreen />}
      </div>

      {/* 관심 학생 상세 모달 */}
      {showConcernStudentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">관심 학생 전체 목록</h3>
              <button onClick={() => setShowConcernStudentModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              {concernStudents.map(student => (
                <div 
                  key={student.id}
                  className={`p-4 rounded-xl border-2 ${
                    student.level === 'danger' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: trafficLightColor[student.level] }}
                      ></div>
                      <p className="font-bold text-gray-800">{student.name}</p>
                    </div>
                    <span 
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{ 
                        backgroundColor: `${trafficLightColor[student.level]}20`,
                        color: trafficLightColor[student.level]
                      }}
                    >
                      {student.level === 'danger' ? '위험' : '주의'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {student.competency} 역량: {student.score}점 / 기준 {student.threshold}점
                  </p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold">
              학생 상담 일정 잡기
            </button>
          </div>
        </div>
      )}

      {/* 학생 상세 모달 */}
      {showStudentDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-xl">{selectedStudent.name}</h3>
                <p className="text-sm text-gray-500">{selectedStudent.studentId}</p>
              </div>
              <button onClick={() => setShowStudentDetailModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* 역량 레이더 차트 */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <h4 className="font-bold text-gray-800 mb-3">역량 현황</h4>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={[
                  { subject: 'S', score: selectedStudent.S, fullMark: 100 },
                  { subject: 'T', score: selectedStudent.T, fullMark: 100 },
                  { subject: 'A', score: selectedStudent.A, fullMark: 100 },
                  { subject: 'R', score: selectedStudent.R, fullMark: 100 },
                ]}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar dataKey="score" stroke="#F7941D" fill="#F7941D" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* 역량별 점수 */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {['S', 'T', 'A', 'R'].map(comp => {
                const score = selectedStudent[comp as keyof typeof selectedStudent] as number;
                const isLow = score < 70;
                return (
                  <div 
                    key={comp}
                    className={`p-4 rounded-xl ${isLow ? 'bg-red-50 border-2 border-red-200' : 'bg-gray-50'}`}
                  >
                    <p className="text-sm text-gray-600 mb-1">{comp} 역량</p>
                    <p className={`text-2xl font-bold ${isLow ? 'text-red-600' : 'text-gray-800'}`}>
                      {score}점
                    </p>
                    {isLow && (
                      <p className="text-xs text-red-600 mt-1">기준 미달</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 bg-blue-100 text-blue-600 rounded-xl font-bold">
                상담 요청
              </button>
              <button className="py-3 bg-green-100 text-green-600 rounded-xl font-bold">
                학습 지원
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 공유 모달 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">리포트 공유</h3>
              <button onClick={() => setShowShareModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-3">
                <Download className="w-5 h-5" />
                PDF로 다운로드
              </button>
              <button className="w-full py-4 bg-blue-50 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-3">
                <Share2 className="w-5 h-5" />
                이메일로 공유
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 검색 모달 */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 h-[80vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">통합 검색</h3>
              <button onClick={() => setShowSearchModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="학생, 과목, 리포트 검색..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                autoFocus
              />
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-gray-800">최근 검색</h4>
              {['김민수', '데이터구조', 'CQI 보고서'].map((term, idx) => (
                <button 
                  key={idx}
                  className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                >
                  {term}
                </button>
              ))}
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
                      <p className="text-xs text-gray-500">professor@example.com</p>
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
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">이름</span>
                    <span className="font-medium text-gray-800">박지훈</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">교번</span>
                    <span className="font-medium text-gray-800">P202001</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">학과</span>
                    <span className="font-medium text-gray-800">컴퓨터공학과</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">직급</span>
                    <span className="font-medium text-gray-800">조교수</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">이메일</span>
                    <span className="font-medium text-gray-800">professor@example.com</span>
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
                      <span className="text-gray-600">2025.01.23 14:32</span>
                    </div>
                    <span className="text-gray-500">Chrome (Windows)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">2025.01.22 09:15</span>
                    </div>
                    <span className="text-gray-500">Safari (iPhone)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">2025.01.21 18:42</span>
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

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'dashboard', icon: Home, label: '대시보드' },
            { id: 'course', icon: BookOpen, label: '과목관리' },
            { id: 'student', icon: Users, label: '학생현황' },
            { id: 'report', icon: FileText, label: '리포트' },
            { id: 'mypage', icon: User, label: 'MY' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-3 relative ${
                activeTab === tab.id ? 'text-pink-500' : 'text-gray-400'
              } ${
                (tab.id === 'course' || tab.id === 'report') ? 'opacity-40' : ''
              }`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}