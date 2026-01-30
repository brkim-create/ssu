"use client";

import { useState } from "react";
import CommonHeader from "../../_components/CommonHeader";
import { FileText, TrendingUp, Target } from "lucide-react";

// mockData imports from shared
import { currentSemester, courses } from "@shared/mockData/data/professor";

// 현재 학기 과목
const currentCourses = courses.filter((c) => c.semester === currentSemester);

/**
 * Report Page
 *
 * URL: /professor/report
 * 원본 코드 기반 마이그레이션
 */
export default function ProfessorReportPage() {
  const [selectedCourse, setSelectedCourse] = useState(currentCourses[0]);

  return (
    <div className="pb-4">
      {/* 공통 헤더 */}
      <CommonHeader title="리포트" subtitle="CQI 보고서 및 교육성과 분석">
        {/* 과목 선택 드롭다운 */}
        <div className="mt-4">
          <select
            value={selectedCourse.id}
            onChange={(e) => {
              const newCourse = currentCourses.find((c) => c.id === Number(e.target.value)) || currentCourses[0];
              setSelectedCourse(newCourse);
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
}
