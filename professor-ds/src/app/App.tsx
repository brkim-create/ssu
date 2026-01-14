import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LabelList } from 'recharts';
import { Home, BookOpen, Users, FileText, User, ChevronRight, X, Search, Bell, Share2, TrendingUp, Target, Settings, ChartBar, ChartLine, TriangleAlert, Calendar } from 'lucide-react';
import {
  histogramData,
  assessmentData,
  concernStudents,
  performanceReport,
  courses,
  studentList,
} from '../data/mockData';
import { getStudentRadarSTAR, getStudentRadarPO } from '../utils/studentRadarUtils';

import logoImage from '../assets/logo.png';

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
  const [radarViewMode, setRadarViewMode] = useState<'STAR' | 'PO'>('STAR'); // 레이더 차트 모드
  const [selectedRadarStudent, setSelectedRadarStudent] = useState(studentList[0]); // 레이더 차트용 선택 학생
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
          <button onClick={() => setShowShareModal(true)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
            <Share2 className="w-6 h-6" />
          </button>
          <button onClick={() => setShowSearchModal(true)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
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
        >
          {courses.map(course => (
            <option key={course.id} value={course.id} className="bg-gray-800 text-white">
              {course.name} ({course.semester}학기) | {course.students}명 수강
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  // 대시보드 화면
  const DashboardScreen = () => (
    <div className="pb-4">
      <CommonHeader title="교과목 역량 대시보드" subtitle="개설 과목 학생 역량 성취도 분석" />

      {/* 교과목 역량 성취도 히스토그램 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <ChartBar className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-800">교과목 역량 성취도</h3>
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
        <div className="mt-3 p-3 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-700">
            <strong>평균 점수:</strong> 74.3점 | <strong>중앙값:</strong> 76점
          </p>
        </div>
      </div>

      {/* 학생별 종합역량 레이더 차트 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-800">학생별 종합역량 진단</h3>
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
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
        </div>

        {/* 뷰 모드 버튼 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setRadarViewMode('STAR')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
              radarViewMode === 'STAR' ? 'bg-gradient-to-r from-[#E94E3C] to-[#F7941D] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            S·T·A·R 핵심역량
          </button>
          <button
            onClick={() => setRadarViewMode('PO')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
              radarViewMode === 'PO' ? 'bg-gradient-to-r from-[#E94E3C] to-[#F7941D] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            전공능력(PO)
          </button>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={radarViewMode === 'STAR' ? getStudentRadarSTAR(selectedRadarStudent) : getStudentRadarPO(selectedRadarStudent)}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#4b5563' }} style={{ whiteSpace: 'pre-line' }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
            <Radar name="내 점수" dataKey="myScore" stroke="#F7941D" fill="#F7941D" fillOpacity={0.5} strokeWidth={2} />
            <Radar name="학과 평균" dataKey="deptAvg" stroke="#E94E3C" fill="#E94E3C" fillOpacity={0.3} strokeWidth={2} />
            <Radar name="전체 평균" dataKey="totalAvg" stroke="#C13584" fill="#C13584" fillOpacity={0.2} strokeWidth={2} />
            <Legend wrapperStyle={{ fontSize: '11px' }} iconType="circle" />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>

        {/* S/T/A/R 역량 카드 (STAR 모드일 때만) */}
        {radarViewMode === 'STAR' && (
          <div className="grid grid-cols-4 gap-2 mt-4">
            <div className="bg-red-50 border-2 border-[#E94E3C] rounded-xl p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">S·창의</div>
              <div className="text-xl font-bold text-[#E94E3C]">{selectedRadarStudent.S}</div>
            </div>
            <div className="bg-orange-50 border-2 border-[#F7941D] rounded-xl p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">T·실무</div>
              <div className="text-xl font-bold text-[#F7941D]">{selectedRadarStudent.T}</div>
            </div>
            <div className="bg-pink-50 border-2 border-[#C13584] rounded-xl p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">A·인성</div>
              <div className="text-xl font-bold text-[#C13584]">{selectedRadarStudent.A}</div>
            </div>
            <div className="bg-indigo-50 border-2 border-[#5B51D8] rounded-xl p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">R·소통</div>
              <div className="text-xl font-bold text-[#5B51D8]">{selectedRadarStudent.R}</div>
            </div>
          </div>
        )}
      </div>

      {/* 평가 도구별 분석 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <ChartLine className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">평가 도구별 분석</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">각 평가 도구별 역량 점수 비교</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={assessmentData} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} width={35} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Bar dataKey="S" fill="#E94E3C" radius={[4, 4, 0, 0]} name="S(창의)" />
            <Bar dataKey="T" fill="#F7941D" radius={[4, 4, 0, 0]} name="T(실무)" />
            <Bar dataKey="A" fill="#C13584" radius={[4, 4, 0, 0]} name="A(인성)" />
            <Bar dataKey="R" fill="#5B51D8" radius={[4, 4, 0, 0]} name="R(소통)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 관심(위험) 학생 알림 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <TriangleAlert className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">관심(위험) 학생 알림</h3>
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {concernStudents.filter(s => s.level === 'danger').length}명
          </span>
        </div>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedConcernCompetency('역량 미달')}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              selectedConcernCompetency === '역량 미달' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            역량 미달 <span className="ml-1">({concernStudents.filter(s => s.level === 'danger').length})</span>
          </button>
          <button
            onClick={() => setSelectedConcernCompetency('주의 요망')}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              selectedConcernCompetency === '주의 요망' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            주의 요망 <span className="ml-1">({concernStudents.filter(s => s.level === 'warning').length})</span>
          </button>
        </div>
        
        <div className="space-y-2">
          {(() => {
            const filteredStudents = selectedConcernCompetency === '역량 미달'
              ? concernStudents.filter(s => s.level === 'danger')
              : concernStudents.filter(s => s.level === 'warning');
            
            if (filteredStudents.length === 0) return <div className="py-8 text-center text-gray-400 text-sm">해당 학생이 없습니다.</div>;

            return filteredStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2">
                  <span style={{color: competencyColors[student.competency]}} className="font-bold text-lg">{student.competency}</span>
                  <span className="text-gray-800">{student.name}</span>
                </div>
                <span className="text-sm text-gray-500">{student.score}점 / 기준 {student.threshold}점</span>
              </div>
            ));
          })()}
        </div>
      </div>

      {/* 성과 분석 리포트 & 교수법 진단 (지면상 생략된 부분은 Part 3에서 계속) */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
         <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-800">성과 분석 리포트</h3>
          </div>
          <button className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">CQI 보고서용</button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">목표 달성률</p>
            <p className="text-3xl font-bold text-gray-700">{performanceReport.achievementRate}%</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-600 h-2 rounded-full" style={{ width: `${performanceReport.achievementRate}%` }}></div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
             <p className="text-xs text-gray-600 mb-1">전년 대비 향상</p>
             <div className="flex items-center justify-center gap-1">
               <TrendingUp className="w-6 h-6 text-gray-700" />
               <p className="text-3xl font-bold text-gray-700">{performanceReport.yearlyImprovement}%</p>
             </div>
          </div>
        </div>
        
        {/* 취약 역량 */}
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-sm font-bold text-gray-800 mb-2">취약 역량 점검</p>
          <div className="space-y-2">
            {performanceReport.weakAreas.map((area, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{area.area}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${area.score}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 w-12 text-right">{area.score}점</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  // 과목 관리 화면
  const CourseScreen = () => (
    <div className="pb-4">
      <CommonHeader title="과목 관리" subtitle="개설 과목 일정 및 관리" />

      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"><FileText className="w-5 h-5 text-gray-600" /></div>
            <div className="text-left"><p className="font-bold text-gray-800">강의계획서</p><p className="text-xs text-gray-500">주차별 강의 계획 및 평가 기준</p></div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"><Target className="w-5 h-5 text-gray-600" /></div>
            <div className="text-left"><p className="font-bold text-gray-800">성적 입력</p><p className="text-xs text-gray-500">중간/기말/과제 성적 관리</p></div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"><Calendar className="w-5 h-5 text-gray-600" /></div>
          <h3 className="font-bold text-gray-800">주차별 강의 현황</h3>
        </div>
        
        <div className="mb-4">
          <select value={selectedWeek} onChange={(e) => setSelectedWeek(Number(e.target.value))} className="w-full p-3 bg-gray-50 text-gray-800 rounded-xl border-2 border-gray-200 font-medium">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(week => <option key={week} value={week}>{week}주차</option>)}
          </select>
        </div>

        <div className="space-y-3">
          {(() => {
            const weeklyLectures = [
              { week: 1, date: '2025-03-03', day: '월', title: '자료구조 개론', status: '완료', attendance: 98 },
              { week: 1, date: '2025-03-05', day: '수', title: '배열 자료구조', status: '완료', attendance: 96 },
              { week: 2, date: '2025-03-10', day: '월', title: '배열과 리스트', status: '완료', attendance: 95 },
              { week: 2, date: '2025-03-12', day: '수', title: '연결 리스트', status: '완료', attendance: 94 },
              { week: 3, date: '2025-03-17', day: '월', title: '다항식 덧셈', status: '완료', attendance: 97 },
              { week: 3, date: '2025-03-19', day: '수', title: '희소 행렬', status: '완료', attendance: 95 },
              { week: 4, date: '2025-03-24', day: '월', title: '스택 구조', status: '진행중', attendance: 92 },
              { week: 4, date: '2025-03-26', day: '수', title: '큐 구조', status: '예정', attendance: 0 },
            ];
            const filteredLectures = weeklyLectures.filter(lecture => lecture.week === selectedWeek);
            return filteredLectures.map((lecture, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-500">{lecture.date} ({lecture.day})</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${lecture.status === '완료' ? 'bg-green-100 text-green-700' : lecture.status === '진행중' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'}`}>{lecture.status}</span>
                </div>
                <p className="font-bold text-gray-800 mb-1">{lecture.title}</p>
                {lecture.status !== '예정' && <p className="text-sm text-gray-600">출석률: {lecture.attendance}%</p>}
              </div>
            ));
          })()}
        </div>
      </div>
    </div>
  );

  // 학생 관리 화면
  const StudentScreen = () => (
    <div className="pb-4">
      <CommonHeader title="학생 관리" subtitle="수강생 역량 현황 및 지도" />
      <div className="mx-4 mt-4 space-y-3">
        {studentList.map(student => (
          <div key={student.id} className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all" onClick={() => { setSelectedStudent(student); setShowStudentDetailModal(true); }}>
            <div className="flex items-center justify-between mb-3">
              <div><p className="font-bold text-gray-800">{student.name}</p><p className="text-xs text-gray-500">{student.studentId} | {student.dept}</p></div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {['S', 'T', 'A', 'R'].map(comp => {
                const score = student[comp as keyof typeof student] as number;
                return (
                  <div key={comp} className={`text-center p-2 rounded-lg ${score < 70 ? 'bg-red-50' : 'bg-gray-50'}`}>
                    <p className="text-xs text-gray-600 mb-1">{comp}</p>
                    <p className={`font-bold ${score < 70 ? 'text-red-600' : 'text-gray-800'}`}>{score}</p>
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
      <CommonHeader title="리포트" subtitle="CQI 보고서 및 교육성과 분석" />
      <div className="mx-4 mt-4 space-y-3">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><FileText className="w-6 h-6 text-blue-600" /></div>
            <div><h3 className="font-bold text-gray-800">CQI 보고서</h3><p className="text-xs text-gray-500">2025-1학기</p></div>
          </div>
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">보고서 작성</button>
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
            <button onClick={() => setShowShareModal(true)} className="p-2 hover:bg-white/20 rounded-lg transition-all"><Share2 className="w-6 h-6" /></button>
            <button onClick={() => setShowSearchModal(true)} className="p-2 hover:bg-white/20 rounded-lg transition-all"><Search className="w-6 h-6" /></button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all"><Bell className="w-6 h-6" /></button>
          </div>
        </div>
        <h2 className="font-bold text-xl">마이페이지</h2>
      </div>

      <div className="mx-4 -mt-10 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">박</div>
          <div><p className="font-bold text-lg">박정인 교수</p><p className="text-gray-500 text-sm">컴퓨터공학과</p><p className="text-gray-400 text-xs">개설 과목: 3개</p></div>
        </div>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        <button onClick={() => setShowNotificationSettingsModal(true)} className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3"><Settings className="w-5 h-5 text-gray-400" /><span className="text-gray-700">알림 설정</span></div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button onClick={() => setShowLoginInfoModal(true)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3"><User className="w-5 h-5 text-gray-400" /><span className="text-gray-700">로그인 정보 (SSO)</span></div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <button className="mx-4 mt-4 w-[calc(100%-2rem)] py-3 text-gray-500 text-sm">로그아웃</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 max-w-md mx-auto relative overflow-hidden">
      <div className="pb-20 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 5rem)' }}>
        {activeTab === 'dashboard' && <DashboardScreen />}
        {activeTab === 'course' && <CourseScreen />}
        {activeTab === 'student' && <StudentScreen />}
        {activeTab === 'report' && <ReportScreen />}
        {activeTab === 'mypage' && <MyPageScreen />}
      </div>

      {/* 모달들 (관심학생, 학생상세, 공유, 검색, 알림설정, 로그인정보) */}
      {/* 지면 관계상 핵심 로직은 유지하되 반복되는 모달 UI는 간소화하여 포함되었습니다. 실제 구현시 위쪽에서 정의한 상태(ShowModal)를 사용해 렌더링하면 됩니다. */}
      {/* 예시: 학생 상세 모달 */}
      {showStudentDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div><h3 className="font-bold text-xl">{selectedStudent.name}</h3><p className="text-sm text-gray-500">{selectedStudent.studentId}</p></div>
              <button onClick={() => setShowStudentDetailModal(false)}><X className="w-6 h-6 text-gray-400" /></button>
            </div>
            {/* 레이더 차트 */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <h4 className="font-bold text-gray-800 mb-3">역량 상세</h4>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={[{ subject: 'S', score: selectedStudent.S, fullMark: 100 }, { subject: 'T', score: selectedStudent.T, fullMark: 100 }, { subject: 'A', score: selectedStudent.A, fullMark: 100 }, { subject: 'R', score: selectedStudent.R, fullMark: 100 }]}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar dataKey="score" stroke="#F7941D" fill="#F7941D" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {[{ id: 'dashboard', icon: Home, label: '홈' }, { id: 'course', icon: BookOpen, label: '과목' }, { id: 'student', icon: Users, label: '학생' }, { id: 'report', icon: FileText, label: '리포트' }, { id: 'mypage', icon: User, label: 'MY' }].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center py-2 px-3 relative ${activeTab === tab.id ? 'text-pink-500' : 'text-gray-400'}`}>
              <tab.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}