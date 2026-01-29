"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import CommonHeader from "../_components/CommonHeader";
import CourseSelector from "../_components/CourseSelector";
import StudentRadarSection from "../_components/cards/StudentRadarSection";
import TeachingMethodDiagnosis from "../_components/TeachingMethodDiagnosis";
import { ChartBar, ChartLine, FileText, TrendingUp, TriangleAlert, Download } from "lucide-react";

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

// recharts SSR 문제 방지를 위한 dynamic import
const HistogramChart = dynamic(() => import("../_components/charts/HistogramChart"), { ssr: false });
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

  // 선택된 과목의 수강생 목록
  const filteredStudentList = getStudentsByCourse(selectedCourse.id);

  return (
    <div className="pb-4">
      {/* 공통 헤더 */}
      <CommonHeader title="교과목 역량 관리" subtitle="담당 과목 학생 역량 성취도 분석">
        <CourseSelector
          courses={currentCourses}
          selectedCourse={selectedCourse}
          onCourseChange={setSelectedCourse}
        />
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
      <StudentRadarSection key={selectedCourse.id} students={filteredStudentList} />

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
        {(() => {
          // 선택된 과목의 수강생만 필터링
          const courseConcernStudents = concernStudents.filter((s) => {
            const student = studentList.find((st) => st.id === s.id);
            return student?.courseIds?.includes(selectedCourse.id);
          });
          const dangerCount = courseConcernStudents.filter((s) => s.level === "danger").length;
          const warningCount = courseConcernStudents.filter((s) => s.level === "warning").length;

          return (
            <>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <TriangleAlert className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="font-bold text-gray-800">관심 학생 알림</h3>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {dangerCount}명
                </span>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setSelectedConcernCompetency("역량 미달")}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                    selectedConcernCompetency === "역량 미달" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  역량 미달 <span className="ml-1">({dangerCount})</span>
                </button>
                <button
                  onClick={() => setSelectedConcernCompetency("주의 요망")}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                    selectedConcernCompetency === "주의 요망" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  주의 요망 <span className="ml-1">({warningCount})</span>
                </button>
              </div>

              <div className="space-y-2">
                {(() => {
                  const filteredStudents =
                    selectedConcernCompetency === "역량 미달"
                      ? courseConcernStudents.filter((s) => s.level === "danger")
                      : courseConcernStudents.filter((s) => s.level === "warning");

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
            </>
          );
        })()}
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
