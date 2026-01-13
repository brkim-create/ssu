import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LabelList } from 'recharts';
import { Home, BookOpen, Users, FileText, User, ChevronRight, X, Search, Bell, Share2, Download, AlertCircle, TrendingUp, Award, Target, Clock, Settings, MessageCircle, Send, CheckCircle, ChartBar, ChartLine, TriangleAlert, FlaskConical, Calendar } from 'lucide-react';
//import logoImage from 'figma:asset/a5f360b8c95401cf229a69f0c0d2de04cefbe043.png';
const logoImage = "https://placehold.co/40x40";
// êµê³¼ëª©ì—­?Ÿ‰ ?„±ì·¨ë„ ?ˆ?Š¤?† ê·¸ë¨ ?°?´?„°
const histogramData = [
  { range: '0-20', students: 2 },
  { range: '21-40', students: 5 },
  { range: '41-60', students: 12 },
  { range: '61-80', students: 28 },
  { range: '81-100', students: 18 },
];

// ?‰ê°??„êµ¬ë³„ ë¶„ì„ ?°?´?„°
const assessmentData = [
  { name: 'ì¤‘ê°„ê³ ì‚¬', S: 75, T: 82, A: 78, R: 71 },
  { name: 'ê¸°ë§ê³ ì‚¬', S: 78, T: 85, A: 80, R: 74 },
  { name: 'ê³¼ì œ', S: 85, T: 88, A: 90, R: 82 },
  { name: 'ì¶œì„', S: 92, T: 90, A: 95, R: 88 },
];

// ê´??‹¬ ?•™?ƒ ?•Œë¦? ?°?´?„°
const concernStudents = [
  { id: 1, name: 'ê¹?ë¯¼ìˆ˜', competency: 'T', score: 65, threshold: 70, level: 'danger' },
  { id: 2, name: '?´ì§????', competency: 'S', score: 62, threshold: 70, level: 'danger' },
  { id: 3, name: 'ë°•ì???˜¸', competency: 'A', score: 68, threshold: 70, level: 'danger' },
  { id: 4, name: 'ìµœì„œ?—°', competency: 'R', score: 64, threshold: 70, level: 'danger' },
  { id: 5, name: '? •ë¯¼ì¬', competency: 'A', score: 72, threshold: 70, level: 'warning' },
  { id: 6, name: 'ê°•ì???›ˆ', competency: 'T', score: 71, threshold: 70, level: 'warning' },
  { id: 7, name: '?œ¤?„œ?•„', competency: 'S', score: 73, threshold: 70, level: 'warning' },
];

// ?„±ê³? ë¶„ì„ ë¦¬í¬?Š¸ ?°?´?„°
const performanceReport = {
  achievementRate: 87,
  yearlyImprovement: 5.2,
  weakAreas: [
    { area: 'R (?†Œ?†µ)', score: 73.5 },
    { area: 'S (ì°½ì˜)', score: 76.2 },
    { area: 'T (?‹¤ë¬?)', score: 80.1 },
  ],
};

// êµìˆ˜ë²? ?—°ê³? ì§„ë‹¨ ?°?´?„°
const teachingMethodData = [
  { method: 'PBL', score: 82.5 },
  { method: 'Flipped Learning', score: 79.3 },
  { method: 'ê°•ì˜?‹', score: 74.1 },
  { method: '?† ë¡ ì‹', score: 77.8 },
];

// ?‹´?‹¹ ê³¼ëª© ?°?´?„°
const courses = [
  { id: 1, name: '?°?´?„°êµ¬ì¡°', students: 65, semester: '2025-1', competency: 'T' },
  { id: 2, name: '?•Œê³ ë¦¬ì¦?', students: 58, semester: '2025-1', competency: 'S' },
  { id: 3, name: '?†Œ?”„?Š¸?›¨?–´ê³µí•™', students: 42, semester: '2025-1', competency: 'T' },
];

// ?•™?ƒ ëª©ë¡ ?°?´?„°
const studentList = [
  { id: 1, name: 'ê¹?ë¯¼ìˆ˜', studentId: '202012345', dept: 'ì»´í“¨?„°ê³µí•™ê³?', S: 85, T: 65, A: 78, R: 72 },
  { id: 2, name: '?´ì§????', studentId: '202012346', dept: 'ì»´í“¨?„°ê³µí•™ê³?', S: 88, T: 62, A: 90, R: 75 },
  { id: 3, name: 'ë°•ì???˜¸', studentId: '202012347', dept: 'ì»´í“¨?„°ê³µí•™ê³?', S: 92, T: 68, A: 85, R: 80 },
  { id: 4, name: 'ìµœì„œ?—°', studentId: '202012348', dept: 'ì»´í“¨?„°ê³µí•™ê³?', S: 78, T: 82, A: 72, R: 88 },
  { id: 5, name: '? •ë¯¼ì¬', studentId: '202012349', dept: 'ì»´í“¨?„°ê³µí•™ê³?', S: 82, T: 90, A: 71, R: 85 },
  { id: 6, name: 'ê°•ì˜ˆë¦?', studentId: '202012350', dept: 'ì»´í“¨?„°ê³µí•™ê³?', S: 90, T: 88, A: 95, R: 92 },
  { id: 7, name: '?œ¤?ƒœ?˜¸', studentId: '202012351', dept: 'ì»´í“¨?„°ê³µí•™ê³?', S: 75, T: 78, A: 80, R: 70 },
  { id: 8, name: '?•œ?†Œ?¬', studentId: '202012352', dept: 'ì»´í“¨?„°ê³µí•™ê³?', S: 88, T: 92, A: 88, R: 82 },
];

// ?•Œë¦? ?°?´?„°
const notifications = [
  { id: 1, title: '?—­?Ÿ‰ ë¯¸ë‹¬ ?•™?ƒ ë°œê²¬', message: 'T(?‹¤ë¬?) ?—­?Ÿ‰ ë¯¸ë‹¬ ?•™?ƒ 3ëª…ì´ ?™•?¸?˜?—ˆ?Šµ?‹ˆ?‹¤.', time: '10ë¶? ? „', read: false },
  { id: 2, title: 'CQI ë³´ê³ ?„œ ? œì¶? ê¸°í•œ', message: '2025?•™?…„?„ 1?•™ê¸? CQI ë³´ê³ ?„œ ? œì¶? ê¸°í•œ?´ 7?¼ ?‚¨?•˜?Šµ?‹ˆ?‹¤.', time: '1?‹œê°? ? „', read: false },
  { id: 3, title: '?„±?  ?…? ¥ ?™„ë£?', message: 'ì¤‘ê°„ê³ ì‚¬ ?„±?  ?…? ¥?´ ?™„ë£Œë˜?—ˆ?Šµ?‹ˆ?‹¤.', time: '3?‹œê°? ? „', read: true },
  { id: 4, title: '?•™?ƒ ?ƒ?‹´ ?š”ì²?', message: 'ê¹?ë¯¼ìˆ˜ ?•™?ƒ?´ ?ƒ?‹´?„ ?š”ì²??–ˆ?Šµ?‹ˆ?‹¤.', time: '1?¼ ? „', read: true },
];

// ?•™?ƒë³? ì¢…í•©?˜„?™© ? ˆ?´?” ?°?´?„° ?ƒ?„± ?•¨?ˆ˜
const getStudentRadarSTAR = (student: any) => [
  { subject: 'S (ì°½ì˜)', ?‚´? ?ˆ˜: student.S, ?•™ê¸‰í‰ê·?: 78, ? „êµ??‰ê·?: 75 },
  { subject: 'T (?‹¤ë¬?)', ?‚´? ?ˆ˜: student.T, ?•™ê¸‰í‰ê·?: 80, ? „êµ??‰ê·?: 77 },
  { subject: 'A (?¸?„±)', ?‚´? ?ˆ˜: student.A, ?•™ê¸‰í‰ê·?: 83, ? „êµ??‰ê·?: 80 },
  { subject: 'R (?†Œ?†µ)', ?‚´? ?ˆ˜: student.R, ?•™ê¸‰í‰ê·?: 76, ? „êµ??‰ê·?: 74 },
];

// ?•˜?œ„?—­?Ÿ‰ PO (9ê°? ì¶? - ?‹œê³„ë°©?–¥ ?ƒ?‹¨ë¶??„°)
const getStudentRadarPO = (student: any) => {
  // STAR ?—­?Ÿ‰?„ ê¸°ë°˜?œ¼ë¡? ?•˜?œ„?—­?Ÿ‰ ? ?ˆ˜ ?ƒ?„± (?•½ê°„ì˜ ë³??™ ì¶”ê??)
  const variation = () => Math.floor(Math.random() * 10) - 5;
  return [
    { subject: 'ì°½ì˜? \në¬¸ì œ?•´ê²?', ?‚´? ?ˆ˜: Math.min(100, Math.max(0, student.S + variation())), ?•™ê¸‰í‰ê·?: 79, ? „êµ??‰ê·?: 76 },
    { subject: '?œµë³µí•©? \n?‚¬ê³?', ?‚´? ?ˆ˜: Math.min(100, Math.max(0, student.S + variation())), ?•™ê¸‰í‰ê·?: 77, ? „êµ??‰ê·?: 74 },
    { subject: '? „ë¬¸ì???‹', ?‚´? ?ˆ˜: Math.min(100, Math.max(0, student.T + variation())), ?•™ê¸‰í‰ê·?: 82, ? „êµ??‰ê·?: 79 },
    { subject: 'ë¯¸ë˜?˜?‹ ', ?‚´? ?ˆ˜: Math.min(100, Math.max(0, student.T + variation())), ?•™ê¸‰í‰ê·?: 78, ? „êµ??‰ê·?: 75 },
    { subject: 'ë¦¬ë”?‹­', ?‚´? ?ˆ˜: Math.min(100, Math.max(0, student.A + variation())), ?•™ê¸‰í‰ê·?: 80, ? „êµ??‰ê·?: 77 },
    { subject: 'ê³µë™ì²?\n?˜?‹', ?‚´? ?ˆ˜: Math.min(100, Math.max(0, student.A + variation())), ?•™ê¸‰í‰ê·?: 84, ? „êµ??‰ê·?: 81 },
    { subject: '?ê¸°ê³„ë°?', ?‚´? ?ˆ˜: Math.min(100, Math.max(0, student.R + variation())), ?•™ê¸‰í‰ê·?: 81, ? „êµ??‰ê·?: 78 },
    { subject: '?˜?‚¬?†Œ?†µ', ?‚´? ?ˆ˜: Math.min(100, Math.max(0, student.R + variation())), ?•™ê¸‰í‰ê·?: 75, ? „êµ??‰ê·?: 73 },
    { subject: 'ê¸?ë¡œì»¬\n?‹œë¯?', ?‚´? ?ˆ˜: Math.min(100, Math.max(0, student.R + variation())), ?•™ê¸‰í‰ê·?: 77, ? „êµ??‰ê·?: 74 },
  ];
};

export default function ProfessorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedCompetency, setSelectedCompetency] = useState('? „ì²?');
  const [selectedConcernCompetency, setSelectedConcernCompetency] = useState('? „ì²?');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showConcernStudentModal, setShowConcernStudentModal] = useState(false);
  const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] = useState(false);
  const [showLoginInfoModal, setShowLoginInfoModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(4); // ?˜„?¬ ì§„í–‰ì¤‘ì¸ ì£¼ì°¨
  const [radarViewMode, setRadarViewMode] = useState<'STAR' | 'PO'>('STAR'); // ? ˆ?´?” ì°¨íŠ¸ ?† ê¸?
  const [selectedRadarStudent, setSelectedRadarStudent] = useState(studentList[0]); // ? ˆ?´?” ì°¨íŠ¸?— ?‘œ?‹œ?•  ?•™?ƒ
  const [notificationChannels, setNotificationChannels] = useState({
    pwa: true,
    kakao: false,
    email: true,
  });

  // ?—­?Ÿ‰ë³? ?ƒ‰?ƒ
  const competencyColors: Record<string, string> = {
    S: '#E94E3C',
    T: '#F7941D',
    A: '#C13584',
    R: '#5B51D8',
  };

  // ?‹ ?˜¸?“± ?ƒ‰?ƒ
  const trafficLightColor: Record<string, string> = {
    danger: '#EF4444',
    warning: '#F59E0B',
    safe: '#10B981',
  };

  // ê³µí†µ ?—¤?” ì»´í¬?„Œ?Š¸
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
      
      {/* ê³¼ëª© ?„ ?ƒ ?“œë¡??‹¤?š´ */}
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
              {course.name}  {course.semester}?•™ê¸? | {course.students}ëª? ?ˆ˜ê°?
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  // ????‹œë³´ë“œ ?™”ë©?
  const DashboardScreen = () => (
    <div className="pb-4">
      <CommonHeader 
        title="êµê³¼ëª? ?—­?Ÿ‰ ê´?ë¦?" 
        subtitle="?‹´?‹¹ ê³¼ëª© ?•™?ƒ ?—­?Ÿ‰ ?„±ì·¨ë„ ë¶„ì„" 
      />

      {/* êµê³¼ëª©ì—­?Ÿ‰ ?„±ì·¨ë„ ?ˆ?Š¤?† ê·¸ë¨ */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <ChartBar className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-800">êµê³¼ëª©ì—­?Ÿ‰ ?„±ì·¨ë„</h3>
          </div>
          <select 
            value={selectedCompetency}
            onChange={(e) => setSelectedCompetency(e.target.value)}
            className="text-sm p-2 border border-gray-200 rounded-lg"
          >
            <option value="? „ì²?">? „ì²?</option>
            <option value="S">S (ì°½ì˜)</option>
            <option value="T">T (?‹¤ë¬?)</option>
            <option value="A">A (?¸?„±)</option>
            <option value="R">R (?†Œ?†µ)</option>
          </select>
        </div>
        <p className="text-xs text-gray-500 mb-4">? ?ˆ˜ êµ¬ê°„ë³? ?•™?ƒ ?ˆ˜ ë¶„í¬</p>
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
            <strong>?‰ê·? ? ?ˆ˜:</strong> 74.3?  | <strong>ì¤‘ì•™ê°?:</strong> 76? 
          </p>
        </div>
      </div>

      {/* ?•™?ƒë³? ì¢…í•©?˜„?™© ? ˆ?´?” */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-800">?•™?ƒë³? ì¢…í•©?˜„?™© ? ˆ?´?”</h3>
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

        {/* ?† ê¸? ë²„íŠ¼ */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setRadarViewMode('STAR')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
              radarViewMode === 'STAR'
                ? 'bg-gradient-to-r from-[#E94E3C] to-[#F7941D] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            SÂ·TÂ·AÂ·R ?•µ?‹¬?—­?Ÿ‰
          </button>
          <button
            onClick={() => setRadarViewMode('PO')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
              radarViewMode === 'PO'
                ? 'bg-gradient-to-r from-[#E94E3C] to-[#F7941D] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ?•˜?œ„?—­?Ÿ‰(PO)
          </button>
        </div>

        {/* ? ˆ?´?” ì°¨íŠ¸ */}
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
              name="?‚´ ? ?ˆ˜" 
              dataKey="?‚´? ?ˆ˜" 
              stroke="#F7941D" 
              fill="#F7941D" 
              fillOpacity={0.5}
              strokeWidth={2}
            />
            <Radar 
              name="?•™ê¸? ?‰ê·?" 
              dataKey="?•™ê¸‰í‰ê·?" 
              stroke="#E94E3C" 
              fill="#E94E3C" 
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar 
              name="? „êµ? ?‰ê·?" 
              dataKey="? „êµ??‰ê·?" 
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

        {/* S/T/A/R ?—­?Ÿ‰ë³? ?ˆ˜ì¹? ì¹´ë“œ */}
        {radarViewMode === 'STAR' && (
          <div className="grid grid-cols-4 gap-2 mt-4">
            <div className="bg-gradient-to-br from-[#E94E3C]/10 to-[#E94E3C]/5 border-2 border-[#E94E3C] rounded-xl p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">SÂ·ì°½ì˜</div>
              <div className="text-xl font-bold text-[#E94E3C]">{selectedRadarStudent.S}</div>
            </div>
            <div className="bg-gradient-to-br from-[#F7941D]/10 to-[#F7941D]/5 border-2 border-[#F7941D] rounded-xl p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">TÂ·?‹¤ë¬?</div>
              <div className="text-xl font-bold text-[#F7941D]">{selectedRadarStudent.T}</div>
            </div>
            <div className="bg-gradient-to-br from-[#C13584]/10 to-[#C13584]/5 border-2 border-[#C13584] rounded-xl p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">AÂ·?¸?„±</div>
              <div className="text-xl font-bold text-[#C13584]">{selectedRadarStudent.A}</div>
            </div>
            <div className="bg-gradient-to-br from-[#5B51D8]/10 to-[#5B51D8]/5 border-2 border-[#5B51D8] rounded-xl p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">RÂ·?†Œ?†µ</div>
              <div className="text-xl font-bold text-[#5B51D8]">{selectedRadarStudent.R}</div>
            </div>
          </div>
        )}

        <div className="mt-3 p-3 bg-[rgb(241,245,249)] rounded-xl">
          <p className="text-sm text-[rgb(51,65,85)]">
            ?Ÿ’? <strong>{selectedRadarStudent.name} ?•™?ƒ ë¶„ì„:</strong> {
              radarViewMode === 'STAR' 
                ? (() => {
                    const scores = { S: selectedRadarStudent.S, T: selectedRadarStudent.T, A: selectedRadarStudent.A, R: selectedRadarStudent.R };
                    const maxKey = Object.keys(scores).reduce((a, b) => scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b);
                    const minKey = Object.keys(scores).reduce((a, b) => scores[a as keyof typeof scores] < scores[b as keyof typeof scores] ? a : b);
                    const labels: Record<string, string> = { S: 'ì°½ì˜', T: '?‹¤ë¬?', A: '?¸?„±', R: '?†Œ?†µ' };
                    return `${labels[maxKey]} ?—­?Ÿ‰?´ ê°??¥ ?š°?ˆ˜?•˜ë©?, ${labels[minKey]} ?—­?Ÿ‰ ê°œì„ ?´ ?•„?š”?•©?‹ˆ?‹¤.`;
                  })()
                : '?•˜?œ„?—­?Ÿ‰ ì¤? ê°•ì ê³? ë³´ì™„? ?„ ?ŒŒ?•…?•˜?—¬ ë§ì¶¤?˜• ?•™?Šµ ê³„íš?„ ?ˆ˜ë¦½í•˜?„¸?š”.'
            }
          </p>
        </div>
      </div>

      {/* ?‰ê°??„êµ¬ë³„ ë¶„ì„ */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <ChartLine className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">?‰ê°??„êµ¬ë³„ ë¶„ì„</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">ê°? ?‰ê°? ?š”?†Œë³? ?—­?Ÿ‰ ? ?ˆ˜ ë¹„êµ</p>
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
            ?Ÿ’? <strong>?¸?‚¬?´?Š¸:</strong> ê³¼ì œ ?‰ê°??—?„œ ê°??¥ ?†’??? ?—­?Ÿ‰ ? ?ˆ˜ë¥? ë³´ì…?‹ˆ?‹¤.
          </p>
        </div>
      </div>

      {/* ê´??‹¬ ?•™?ƒ ?•Œë¦? */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <TriangleAlert className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">ê´??‹¬ ?•™?ƒ ?•Œë¦?</h3>
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {concernStudents.filter(s => s.level === 'danger').length}ëª?
          </span>
        </div>
        
        {/* ?ƒ?ƒœë³? ì¹´í…Œê³ ë¦¬ ë²„íŠ¼ */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedConcernCompetency('?—­?Ÿ‰ ë¯¸ë‹¬')}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              selectedConcernCompetency === '?—­?Ÿ‰ ë¯¸ë‹¬'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ?—­?Ÿ‰ ë¯¸ë‹¬
            <span className="ml-1">({concernStudents.filter(s => s.level === 'danger').length})</span>
          </button>
          <button
            onClick={() => setSelectedConcernCompetency('ì£¼ì˜ ?•„?š”')}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              selectedConcernCompetency === 'ì£¼ì˜ ?•„?š”'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ì£¼ì˜ ?•„?š”
            <span className="ml-1">({concernStudents.filter(s => s.level === 'warning').length})</span>
          </button>
        </div>
        
        {/* ?•„?„°ë§ëœ ?•™?ƒ ë¦¬ìŠ¤?Š¸ */}
        <div className="space-y-2">
          {(() => {
            const filteredStudents = selectedConcernCompetency === '?—­?Ÿ‰ ë¯¸ë‹¬'
              ? concernStudents.filter(s => s.level === 'danger')
              : concernStudents.filter(s => s.level === 'warning');
            
            if (filteredStudents.length === 0) {
              return (
                <div className="py-8 text-center">
                  <p className="text-gray-400 text-sm">?•´?‹¹ ì¹´í…Œê³ ë¦¬?˜ ê´??‹¬ ?•™?ƒ?´ ?—†?Šµ?‹ˆ?‹¤</p>
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
                  {student.score}?  / {student.threshold}? 
                </span>
              </div>
            ));
          })()}
        </div>
      </div>

      {/* ?„±ê³? ë¶„ì„ ë¦¬í¬?Š¸ */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-800">?„±ê³? ë¶„ì„ ë¦¬í¬?Š¸</h3>
          </div>
          <button className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
            CQI ë³´ê³ ?„œ?š©
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* ëª©í‘œ ?‹¬?„±ë¥? */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">ëª©í‘œ ?‹¬?„±ë¥?</p>
            <p className="text-3xl font-bold text-gray-700">{performanceReport.achievementRate}%</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-600 h-2 rounded-full" 
                style={{ width: `${performanceReport.achievementRate}%` }}
              ></div>
            </div>
          </div>

          {/* ? „?…„ ???ë¹? ?–¥?ƒ?„ */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">? „?…„ ???ë¹?</p>
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="w-6 h-6 text-gray-700" />
              <p className="text-3xl font-bold text-gray-700">
                {performanceReport.yearlyImprovement}%
              </p>
            </div>
            <p className="text-xs text-gray-600 mt-2">?–¥?ƒ</p>
          </div>
        </div>

        {/* ?•˜?œ„ ?˜?—­ ë¶„ì„ */}
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-sm font-bold text-gray-800 mb-2">?„±ì·¨ë„ ?•˜?œ„ ?˜?—­</p>
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
                  <span className="text-sm font-bold text-gray-800 w-12 text-right">{area.score}? </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => {
            alert('?„±ê³? ë¶„ì„ ë¦¬í¬?Š¸ ?‹¤?š´ë¡œë“œ\n\nëª©í‘œ ?‹¬?„±ë¥?: 87%\n? „?…„ ???ë¹? ?–¥?ƒ?„: 5.2%\n\n?„±ì·¨ë„ ?•˜?œ„ ?˜?—­:\n??? R (?†Œ?†µ): 73.5? \n??? S (ì°½ì˜): 76.2? \n??? T (?‹¤ë¬?): 80.1? \n\nPDF/Excel ?˜•?‹?œ¼ë¡? ?‹¤?š´ë¡œë“œ?©?‹ˆ?‹¤.');
          }}
          className="w-full mt-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          PDF/Excel ?‹¤?š´ë¡œë“œ
        </button>
      </div>

      {/* êµìˆ˜ë²? ?—°ê³? ì§„ë‹¨ */}
      <div className="mx-4 mt-4 mb-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-800">êµìˆ˜ë²? ?—°ê³? ì§„ë‹¨</h3>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Beta</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">êµìˆ˜ë²•ê³¼ ?•™?ƒ ?„±ì·¨ë„ ê°? ?ƒê´?ê´?ê³?</p>
        
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
                <span className="text-sm font-bold text-gray-700 w-12 text-right">{method.score}? </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-700">
            ?Ÿ’? PBL ë°©ì‹?—?„œ ê°??¥ ?†’??? ?‰ê·? ?„±ì·¨ë„ë¥? ë³´ì…?‹ˆ?‹¤. (2ì°¨ë…„?„ ê³ ë„?™” ?˜ˆ? •)
          </p>
        </div>
      </div>
    </div>
  );

  // ê³¼ëª©ê´?ë¦? ?™”ë©?
  const CourseScreen = () => (
    <div className="pb-4">
      <CommonHeader 
        title="ê³¼ëª© ê´?ë¦?" 
        subtitle="?‹´?‹¹ ê³¼ëª© ?ƒ?„¸ ê´?ë¦?" 
      />

      {/* ê°•ì˜ ê´?ë¦? ë©”ë‰´ */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">ê°•ì˜ê³„íš?„œ</p>
              <p className="text-xs text-gray-500">ì£¼ì°¨ë³? ê°•ì˜ ê³„íš ë°? ?‰ê°? ê¸°ì??</p>
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
              <p className="font-bold text-gray-800">?„±?  ?…? ¥</p>
              <p className="text-xs text-gray-500">ì¤‘ê°„/ê¸°ë§/ê³¼ì œ ?„±?  ê´?ë¦?</p>
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
              <p className="font-bold text-gray-800">ì¶œì„ ê´?ë¦?</p>
              <p className="text-xs text-gray-500">ì£¼ì°¨ë³? ì¶œì„ ?˜„?™© ?™•?¸</p>
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
              <p className="font-bold text-gray-800">ê³µì???‚¬?•­</p>
              <p className="text-xs text-gray-500">?ˆ˜ê°•ìƒ ê³µì???‚¬?•­ ?‘?„±/ê´?ë¦?</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* ì£¼ì°¨ë³? ê°•ì˜ ?˜„?™© */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">ì£¼ì°¨ë³? ê°•ì˜ ?˜„?™©</h3>
        </div>
        
        {/* ì£¼ì°¨ ?„ ?ƒ ?“œë¡??‹¤?š´ */}
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
                {week}ì£¼ì°¨
              </option>
            ))}
          </select>
        </div>

        {/* ?„ ?ƒ?œ ì£¼ì°¨?˜ ê°•ì˜ ëª©ë¡ */}
        <div className="space-y-3">
          {(() => {
            const weeklyLectures = [
              { week: 1, date: '2025-03-03', day: '?›”', title: '?ë£Œêµ¬ì¡? ê°œë¡ ', status: '?™„ë£?', attendance: 98 },
              { week: 1, date: '2025-03-05', day: '?ˆ˜', title: 'ë°°ì—´ ?ë£Œêµ¬ì¡?', status: '?™„ë£?', attendance: 96 },
              { week: 2, date: '2025-03-10', day: '?›”', title: 'ë°°ì—´ê³? ë¦¬ìŠ¤?Š¸', status: '?™„ë£?', attendance: 95 },
              { week: 2, date: '2025-03-12', day: '?ˆ˜', title: '?—°ê²? ë¦¬ìŠ¤?Š¸', status: '?™„ë£?', attendance: 94 },
              { week: 3, date: '2025-03-17', day: '?›”', title: '?Š¤?ƒê³? ?', status: '?™„ë£?', attendance: 97 },
              { week: 3, date: '2025-03-19', day: '?ˆ˜', title: '?Š¤?ƒ/? ?‹¤?Šµ', status: '?™„ë£?', attendance: 95 },
              { week: 4, date: '2025-03-24', day: '?›”', title: '?Š¸ë¦? êµ¬ì¡°', status: 'ì§„í–‰ì¤?', attendance: 92 },
              { week: 4, date: '2025-03-26', day: '?ˆ˜', title: '?´ì§? ?Š¸ë¦?', status: '?˜ˆ? •', attendance: 0 },
              { week: 5, date: '2025-03-31', day: '?›”', title: 'ê·¸ë˜?”„ ?´ë¡?', status: '?˜ˆ? •', attendance: 0 },
              { week: 5, date: '2025-04-02', day: '?ˆ˜', title: 'ê·¸ë˜?”„ ?ƒ?ƒ‰', status: '?˜ˆ? •', attendance: 0 },
            ];

            const filteredLectures = weeklyLectures.filter(lecture => lecture.week === selectedWeek);

            return filteredLectures.map((lecture, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-500">
                        {lecture.date.split('-')[0]}?…„ {lecture.date.split('-')[1]}?›” {lecture.date.split('-')[2]}?¼ ({lecture.day})
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        lecture.status === '?™„ë£?' ? 'bg-green-100 text-green-700' : 
                        lecture.status === 'ì§„í–‰ì¤?' ? 'bg-blue-100 text-blue-700' : 
                        'bg-gray-200 text-gray-500'
                      }`}>
                        {lecture.status}
                      </span>
                    </div>
                    <p className="font-bold text-gray-800 mb-1">{lecture.title}</p>
                    {lecture.status !== '?˜ˆ? •' && (
                      <p className="text-sm text-gray-600">ì¶œì„ë¥?: {lecture.attendance}%</p>
                    )}
                  </div>
                </div>
              </div>
            ));
          })()}
        </div>
      </div>

      {/* ?‰ê°? ê¸°ì?? */}
      <div className="mx-4 mt-4 mb-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <ChartBar className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">?‰ê°? ê¸°ì??</h3>
        </div>
        <div className="space-y-3">
          {[
            { name: 'ì¤‘ê°„ê³ ì‚¬', weight: 30, color: 'bg-blue-500' },
            { name: 'ê¸°ë§ê³ ì‚¬', weight: 30, color: 'bg-green-500' },
            { name: 'ê³¼ì œ', weight: 25, color: 'bg-orange-500' },
            { name: 'ì¶œì„', weight: 15, color: 'bg-purple-500' },
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

  // ?•™?ƒ?˜„?™© ?™”ë©?
  const StudentScreen = () => (
    <div className="pb-4">
      <CommonHeader 
        title="?•™?ƒ ?˜„?™©" 
        subtitle="?ˆ˜ê°•ìƒ ?—­?Ÿ‰ ?˜„?™© ë°? ?ƒ?‹´ ê´?ë¦?" 
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

  // ë¦¬í¬?Š¸ ?™”ë©?
  const ReportScreen = () => (
    <div className="pb-4">
      <CommonHeader 
        title="ë¦¬í¬?Š¸" 
        subtitle="CQI ë³´ê³ ?„œ ë°? êµìœ¡?„±ê³? ë¶„ì„" 
      />

      <div className="mx-4 mt-4 space-y-3">
        {/* CQI ë³´ê³ ?„œ */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">CQI ë³´ê³ ?„œ</h3>
              <p className="text-xs text-gray-500">2025-1?•™ê¸?</p>
            </div>
          </div>
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">
            ë³´ê³ ?„œ ?‘?„±
          </button>
        </div>

        {/* ?•™ê¸°ë³„ ?„±ê³? ë¹„êµ */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">?•™ê¸°ë³„ ?„±ê³? ë¹„êµ</h3>
              <p className="text-xs text-gray-500">ìµœê·¼ 3ê°? ?•™ê¸?</p>
            </div>
          </div>
          <button className="w-full py-3 bg-green-600 text-white rounded-xl font-bold">
            ë¶„ì„ ë³´ê¸°
          </button>
        </div>

        {/* êµìœ¡ëª©í‘œ ?‹¬?„±?„ */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">êµìœ¡ëª©í‘œ ?‹¬?„±?„</h3>
              <p className="text-xs text-gray-500">?•™ê³? êµìœ¡ëª©í‘œ ???ë¹?</p>
            </div>
          </div>
          <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold">
            ?ƒ?„¸ ë¶„ì„
          </button>
        </div>
      </div>
    </div>
  );

  // ë§ˆì´?˜?´ì§? ?™”ë©?
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
        <h2 className="font-bold text-xl">ë§ˆì´?˜?´ì§?</h2>
      </div>

      {/* ?”„ë¡œí•„ ì¹´ë“œ */}
      <div className="mx-4 -mt-10 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            ë°?
          </div>
          <div>
            <p className="font-bold text-lg">ë°•ì???›ˆ êµìˆ˜</p>
            <p className="text-gray-500 text-sm">ì»´í“¨?„°ê³µí•™ê³?</p>
            <p className="text-gray-400 text-xs">?‹´?‹¹ ê³¼ëª©: 3ê°?</p>
          </div>
        </div>
      </div>

      {/* ë©”ë‰´ ì¹´ë“œ */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* ?•Œë¦? ?„¤? • */}
        <button 
          onClick={() => setShowNotificationSettingsModal(true)}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">?•Œë¦? ?„¤? •</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* ?„±ê³? ë¶„ì„ ë¦¬í¬?Š¸ ?‹¤?š´ë¡œë“œ */}
        <button 
          onClick={() => {
            alert('?„±ê³? ë¶„ì„ ë¦¬í¬?Š¸ ?‹¤?š´ë¡œë“œ\n\nëª©í‘œ ?‹¬?„±ë¥?: 87%\n? „?…„ ???ë¹? ?–¥?ƒ?„: 5.2%\n\n?„±ì·¨ë„ ?•˜?œ„ ?˜?—­:\n??? R (?†Œ?†µ): 73.5? \n??? S (ì°½ì˜): 76.2? \n??? T (?‹¤ë¬?): 80.1? \n\nPDF/Excel ?˜•?‹?œ¼ë¡? ?‹¤?š´ë¡œë“œ?©?‹ˆ?‹¤.');
          }}
          className="w-full mt-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          PDF/Excel ?‹¤?š´ë¡œë“œ
        </button>

        {/* ë¡œê·¸?¸ ? •ë³? */}
        <button 
          onClick={() => setShowLoginInfoModal(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">ë¡œê·¸?¸ ? •ë³? (SSO)</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <button className="mx-4 mt-4 w-[calc(100%-2rem)] py-3 text-gray-500 text-sm">
        ë¡œê·¸?•„?›ƒ
      </button>
    </div>
  );

  // ?•Œë¦? ?™”ë©?
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
        <h2 className="font-bold text-xl">?•Œë¦?</h2>
        <p className="text-sm opacity-90">?ƒˆë¡œìš´ ?†Œ?‹?„ ?™•?¸?•˜?„¸?š”</p>
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
      {/* ë©”ì¸ ì»¨í…ì¸? */}
      <div className="pb-20 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 5rem)' }}>
        {activeTab === 'dashboard' && <DashboardScreen />}
        {activeTab === 'course' && <CourseScreen />}
        {activeTab === 'student' && <StudentScreen />}
        {activeTab === 'report' && <ReportScreen />}
        {activeTab === 'mypage' && <MyPageScreen />}
      </div>

      {/* ê´??‹¬ ?•™?ƒ ?ƒ?„¸ ëª¨ë‹¬ */}
      {showConcernStudentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">ê´??‹¬ ?•™?ƒ ? „ì²? ëª©ë¡</h3>
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
                      {student.level === 'danger' ? '?œ„?—˜' : 'ì£¼ì˜'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {student.competency} ?—­?Ÿ‰: {student.score}?  / ê¸°ì?? {student.threshold}? 
                  </p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold">
              ?•™?ƒ ?ƒ?‹´ ?¼? • ?¡ê¸?
            </button>
          </div>
        </div>
      )}

      {/* ?•™?ƒ ?ƒ?„¸ ëª¨ë‹¬ */}
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

            {/* ?—­?Ÿ‰ ? ˆ?´?” ì°¨íŠ¸ */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <h4 className="font-bold text-gray-800 mb-3">?—­?Ÿ‰ ?˜„?™©</h4>
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

            {/* ?—­?Ÿ‰ë³? ? ?ˆ˜ */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {['S', 'T', 'A', 'R'].map(comp => {
                const score = selectedStudent[comp as keyof typeof selectedStudent] as number;
                const isLow = score < 70;
                return (
                  <div 
                    key={comp}
                    className={`p-4 rounded-xl ${isLow ? 'bg-red-50 border-2 border-red-200' : 'bg-gray-50'}`}
                  >
                    <p className="text-sm text-gray-600 mb-1">{comp} ?—­?Ÿ‰</p>
                    <p className={`text-2xl font-bold ${isLow ? 'text-red-600' : 'text-gray-800'}`}>
                      {score}? 
                    </p>
                    {isLow && (
                      <p className="text-xs text-red-600 mt-1">ê¸°ì?? ë¯¸ë‹¬</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 bg-blue-100 text-blue-600 rounded-xl font-bold">
                ?ƒ?‹´ ?š”ì²?
              </button>
              <button className="py-3 bg-green-100 text-green-600 rounded-xl font-bold">
                ?•™?Šµ ì§??›
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ê³µìœ  ëª¨ë‹¬ */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">ë¦¬í¬?Š¸ ê³µìœ </h3>
              <button onClick={() => setShowShareModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-3">
                <Download className="w-5 h-5" />
                PDFë¡? ?‹¤?š´ë¡œë“œ
              </button>
              <button className="w-full py-4 bg-blue-50 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-3">
                <Share2 className="w-5 h-5" />
                ?´ë©”ì¼ë¡? ê³µìœ 
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ê²??ƒ‰ ëª¨ë‹¬ */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 h-[80vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">?†µ?•© ê²??ƒ‰</h3>
              <button onClick={() => setShowSearchModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="?•™?ƒ, ê³¼ëª©, ë¦¬í¬?Š¸ ê²??ƒ‰..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                autoFocus
              />
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-gray-800">ìµœê·¼ ê²??ƒ‰</h4>
              {['ê¹?ë¯¼ìˆ˜', '?°?´?„°êµ¬ì¡°', 'CQI ë³´ê³ ?„œ'].map((term, idx) => (
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

      {/* ?•Œë¦? ?„¤? • ëª¨ë‹¬ */}
      {showNotificationSettingsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">?•Œë¦? ?„¤? •</h3>
              <button onClick={() => setShowNotificationSettingsModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">ë°›ê³  ?‹¶??? ?•Œë¦? ì±„ë„?„ ?„ ?ƒ?•˜?„¸?š”</p>

            <div className="space-y-4">
              {/* PWA ?‘¸?‹œ */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">PWA ?‘¸?‹œ</p>
                      <p className="text-xs text-gray-500">ë¸Œë¼?š°??? ?•Œë¦?</p>
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
                <p className="text-xs text-gray-500">?‹¤?‹œê°„ìœ¼ë¡? ì¤‘ìš”?•œ ?•Œë¦¼ì„ ë°›ì„ ?ˆ˜ ?ˆ?Šµ?‹ˆ?‹¤</p>
              </div>

              {/* ì¹´ì¹´?˜¤?†¡ */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">ì¹´ì¹´?˜¤?†¡</p>
                      <p className="text-xs text-gray-500">ì¹´ì¹´?˜¤ ?•Œë¦¼í†¡</p>
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
                <p className="text-xs text-gray-500">ì¹´ì¹´?˜¤?†¡?œ¼ë¡? ?•Œë¦¼ì„ ë°›ì„ ?ˆ˜ ?ˆ?Šµ?‹ˆ?‹¤</p>
              </div>

              {/* ?´ë©”ì¼ */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <Send className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">?´ë©”ì¼</p>
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
                <p className="text-xs text-gray-500">?´ë©”ì¼ë¡? ?ƒ?„¸?•œ ?•Œë¦¼ì„ ë°›ì„ ?ˆ˜ ?ˆ?Šµ?‹ˆ?‹¤</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-700">
                ?Ÿ’? ?•Œë¦? ì±„ë„??? ?–¸? œ?“ ì§? ë³?ê²½í•  ?ˆ˜ ?ˆ?Šµ?‹ˆ?‹¤
              </p>
            </div>

            <button
              onClick={() => {
                setShowNotificationSettingsModal(false);
                alert('?•Œë¦? ?„¤? •?´ ????¥?˜?—ˆ?Šµ?‹ˆ?‹¤!');
              }}
              className="w-full mt-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold"
            >
              ????¥?•˜ê¸?
            </button>
          </div>
        </div>
      )}

      {/* ë¡œê·¸?¸ ? •ë³? ëª¨ë‹¬ */}
      {showLoginInfoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">ë¡œê·¸?¸ ? •ë³?</h3>
              <button onClick={() => setShowLoginInfoModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* SSO ?—°?™ ?ƒ?ƒœ */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">SSO ?—°?™ ?™„ë£?</p>
                    <p className="text-xs text-gray-500">?†µ?•© ?¸ì¦? ?‹œ?Š¤?…œ</p>
                  </div>
                </div>
              </div>

              {/* ê³„ì • ? •ë³? */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">ê³„ì • ? •ë³?</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">?´ë¦?</span>
                    <span className="font-medium text-gray-800">ë°•ì???›ˆ</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">êµë²ˆ</span>
                    <span className="font-medium text-gray-800">P202001</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">?•™ê³?</span>
                    <span className="font-medium text-gray-800">ì»´í“¨?„°ê³µí•™ê³?</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">ì§ê¸‰</span>
                    <span className="font-medium text-gray-800">ì¡°êµ?ˆ˜</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">?´ë©”ì¼</span>
                    <span className="font-medium text-gray-800">professor@example.com</span>
                  </div>
                </div>
              </div>

              {/* ë¡œê·¸?¸ ?´? ¥ */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">ìµœê·¼ ë¡œê·¸?¸ ?´? ¥</h4>
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

              {/* ë³´ì•ˆ ?„¤? • */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">ë³´ì•ˆ ?„¤? •</h4>
                <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all">
                  ë¹„ë??ë²ˆí˜¸ ë³?ê²?
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-xl">
              <p className="text-xs text-orange-700">
                ?š ï¸? ?˜?‹¬?Š¤?Ÿ¬?š´ ë¡œê·¸?¸ ?™œ?™?´ ?ˆ?‹¤ë©? ì¦‰ì‹œ ë¹„ë??ë²ˆí˜¸ë¥? ë³?ê²½í•˜?„¸?š”
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ?•˜?‹¨ ?„¤ë¹„ê²Œ?´?…˜ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'dashboard', icon: Home, label: '????‹œë³´ë“œ' },
            { id: 'course', icon: BookOpen, label: 'ê³¼ëª©ê´?ë¦?' },
            { id: 'student', icon: Users, label: '?•™?ƒ?˜„?™©' },
            { id: 'report', icon: FileText, label: 'ë¦¬í¬?Š¸' },
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