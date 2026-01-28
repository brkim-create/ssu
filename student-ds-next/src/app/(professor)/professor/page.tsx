"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import CommonHeader from "../_components/CommonHeader";
import TeachingMethodDiagnosis from "../_components/TeachingMethodDiagnosis";
import { ChartBar, ChartLine, User, FileText, TrendingUp, TriangleAlert, Download } from "lucide-react";

// mockData imports from shared
import {
  currentSemester,
  histogramDataByCourse,
  assessmentData,
  concernStudents,
  performanceReport,
  courses,
  studentList,
  courseStatisticsByCourse,
} from "@shared/mockData/data/professor";
import { competencyColors } from "@shared/theme";
import { getStudentRadarSTAR, getStudentRadarPO } from "@/utils/studentRadarUtils";

// recharts SSR 문제 방지를 위한 dynamic import
const HistogramChart = dynamic(() => import("../_components/charts/HistogramChart"), { ssr: false });
const CompetencyRadarChart = dynamic(() => import("../_components/charts/CompetencyRadarChart"), { ssr: false });
const AssessmentBarChart = dynamic(() => import("../_components/charts/AssessmentBarChart"), { ssr: false });

// 현재 학기 과목만 필터링
const currentCourses = courses.filter((c) => c.semester === currentSemester);

// 과목별 학생 필터링 함수
const getStudentsByCourse = (courseId: number) =>
  studentList.filter((s) => s.courseIds?.includes(courseId));

/**
 * Professor Dashboard Page
 *
 * URL: /professor
 * App.tsx 89~335라인 (DashboardScreen) 기반 마이그레이션
 */
export default function ProfessorDashboardPage() {
  // 상태 관리
  const [selectedCourse, setSelectedCourse] = useState(currentCourses[0]);
  const [selectedConcernCompetency, setSelectedConcernCompetency] = useState("역량 미달");
  const [radarViewMode, setRadarViewMode] = useState<"STAR" | "PO">("STAR");

  // 선택된 과목의 수강생 목록
  const filteredStudentList = getStudentsByCourse(selectedCourse.id);
  const [selectedRadarStudent, setSelectedRadarStudent] = useState(filteredStudentList[0] || studentList[0]);

  // 레이더 차트 데이터 (STAR/PO 모드에 따라 다른 함수 사용)
  const radarData =
    radarViewMode === "STAR"
      ? getStudentRadarSTAR(selectedRadarStudent)
      : getStudentRadarPO(selectedRadarStudent);

  return (
    <div className="pb-4">
      {/* 공통 헤더 */}
      <CommonHeader title="교과목 역량 관리" subtitle="담당 과목 학생 역량 성취도 분석">
        {/* 과목 선택 드롭다운 */}
        <div className="mt-4">
          <select
            value={selectedCourse.id}
            onChange={(e) => {
              const newCourse = currentCourses.find((c) => c.id === Number(e.target.value)) || currentCourses[0];
              setSelectedCourse(newCourse);
              // 과목 변경 시 해당 과목 수강생 중 첫 번째 학생으로 초기화
              const newStudents = getStudentsByCourse(newCourse.id);
              if (newStudents.length > 0) {
                setSelectedRadarStudent(newStudents[0]);
              }
            }}
            className="w-full p-3 bg-white/20 text-white rounded-xl border-2 border-white/30 font-medium backdrop-blur-sm hover:bg-white/30 transition-all cursor-pointer"
          >
            {currentCourses.map((course) => (
              <option key={course.id} value={course.id} className="bg-gray-800 text-white">
                {course.name} ({course.semester}학기) | {course.students}명 수강
              </option>
            ))}
          </select>
        </div>
      </CommonHeader>

      {/* 교과목 역량 성취도 히스토그램 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <ChartBar className="w-5 h-5 text-gray-600" />
            </div>
            <h3 className="font-bold text-gray-800">교과목 역량 성취도</h3>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">점수 구간별 학생 수 분포</p>
        <div className="h-[250px]">
          <HistogramChart data={histogramDataByCourse[selectedCourse.id] || []} />
        </div>
        <div className="mt-3 p-3 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-700">
            <strong>평균 점수:</strong> {courseStatisticsByCourse[selectedCourse.id]?.averageScore ?? '-'}점 | <strong>중앙값:</strong> {courseStatisticsByCourse[selectedCourse.id]?.medianScore ?? '-'}점
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
            <h3 className="font-bold text-gray-800">학생별 종합현황 레이더</h3>
          </div>
          <select
            value={selectedRadarStudent.id}
            onChange={(e) => {
              const student = filteredStudentList.find((s) => s.id === Number(e.target.value));
              if (student) setSelectedRadarStudent(student);
            }}
            className="text-sm p-2 border border-gray-200 rounded-lg bg-white"
          >
            {filteredStudentList.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {/* 뷰 모드 버튼 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setRadarViewMode("STAR")}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
              radarViewMode === "STAR"
                ? "bg-gradient-to-r from-[#E94E3C] to-[#F7941D] text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            S·T·A·R 핵심역량
          </button>
          <button
            onClick={() => setRadarViewMode("PO")}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
              radarViewMode === "PO"
                ? "bg-gradient-to-r from-[#E94E3C] to-[#F7941D] text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            하위역량(PO)
          </button>
        </div>

        <div className="h-[320px]">
          <CompetencyRadarChart data={radarData} />
        </div>

        {/* S/T/A/R 역량 카드 (STAR 모드일 때만) */}
        {radarViewMode === "STAR" && (
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

        {/* 학생 분석 코멘트 */}
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
                : (() => {
                    if (!selectedRadarStudent.PO) return '하위역량 데이터가 없습니다.';
                    const poScores = selectedRadarStudent.PO;
                    const poKeys = Object.keys(poScores) as (keyof typeof poScores)[];
                    const maxKey = poKeys.reduce((a, b) => poScores[a] > poScores[b] ? a : b);
                    const minKey = poKeys.reduce((a, b) => poScores[a] < poScores[b] ? a : b);
                    return `${maxKey} 역량이 가장 우수하며, ${minKey} 역량 개선이 필요합니다.`;
                  })()
            }
          </p>
        </div>
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
        <div className="h-[200px]">
          <AssessmentBarChart data={assessmentData} />
        </div>
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
            {concernStudents.filter((s) => s.level === "danger").length}명
          </span>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedConcernCompetency("역량 미달")}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              selectedConcernCompetency === "역량 미달" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            역량 미달 <span className="ml-1">({concernStudents.filter((s) => s.level === "danger").length})</span>
          </button>
          <button
            onClick={() => setSelectedConcernCompetency("주의 요망")}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              selectedConcernCompetency === "주의 요망" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            주의 요망 <span className="ml-1">({concernStudents.filter((s) => s.level === "warning").length})</span>
          </button>
        </div>

        <div className="space-y-2">
          {(() => {
            const filteredStudents =
              selectedConcernCompetency === "역량 미달"
                ? concernStudents.filter((s) => s.level === "danger")
                : concernStudents.filter((s) => s.level === "warning");

            if (filteredStudents.length === 0)
              return <div className="py-8 text-center text-gray-400 text-sm">해당 학생이 없습니다.</div>;

            return filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2">
                  <span style={{ color: competencyColors[student.competency as keyof typeof competencyColors] }} className="font-bold text-lg">
                    {student.competency}
                  </span>
                  <span className="text-gray-800">{student.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {student.score}점 / 기준 {student.threshold}점
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
          <button className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">CQI 보고서용</button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">목표 달성률</p>
            <p className="text-3xl font-bold text-gray-700">{performanceReport.achievementRate}%</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-600 h-2 rounded-full" style={{ width: `${performanceReport.achievementRate}%` }} />
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
          <p className="text-sm font-bold text-gray-800 mb-2">성취도 하위 영역</p>
          <div className="space-y-2">
            {performanceReport.weakAreas.map((area, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{area.area}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${area.score}%` }} />
                  </div>
                  <span className="text-sm font-bold text-gray-800 w-12 text-right">{area.score}점</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 다운로드 버튼 */}
        <button
          onClick={() => {
            alert(
              "성과 분석 리포트 다운로드\n\n목표 달성률: 87%\n전년 대비 향상도: 5.2%\n\n성취도 하위 영역:\n• R (소통): 73.5점\n• S (창의): 76.2점\n• T (실무): 80.1점\n\nPDF/Excel 형식으로 다운로드됩니다."
            );
          }}
          className="w-full mt-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          PDF/Excel 다운로드
        </button>
      </div>

      {/* 교수법 연계 진단 */}
      <TeachingMethodDiagnosis />
    </div>
  );
}
