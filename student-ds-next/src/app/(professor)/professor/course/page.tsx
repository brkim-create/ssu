"use client";

import { useState } from "react";
import CommonHeader from "../../_components/CommonHeader";
import { FileText, Target, Calendar, ChevronRight } from "lucide-react";

// mockData imports from shared
import {
  currentSemester,
  courses,
  weeklyLectures,
} from "@shared/mockData/data/professor";

// 현재 학기 과목만 필터링
const currentCourses = courses.filter((c) => c.semester === currentSemester);

/**
 * Course Management Page
 *
 * URL: /professor/course
 * App.tsx 337~387라인 (CourseScreen) 기반 마이그레이션
 */
export default function ProfessorCoursePage() {
  const [selectedCourse, setSelectedCourse] = useState(currentCourses[0]);
  const [selectedWeek, setSelectedWeek] = useState(4); // 현재 진행중인 주차

  return (
    <div className="pb-4">
      {/* 공통 헤더 */}
      <CommonHeader title="과목 관리" subtitle="개설 과목 일정 및 관리">
        {/* 과목 선택 드롭다운 */}
        <div className="mt-4">
          <select
            value={selectedCourse.id}
            onChange={(e) => {
              const newCourse = currentCourses.find((c) => c.id === Number(e.target.value)) || currentCourses[0];
              setSelectedCourse(newCourse);
              if (selectedWeek > newCourse.totalWeeks) setSelectedWeek(1);
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

      {/* 메뉴 목록 */}
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
      </div>

      {/* 주차별 강의 현황 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">주차별 강의 현황</h3>
        </div>

        {/* 주차 선택 */}
        <div className="mb-4">
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(Number(e.target.value))}
            className="w-full p-3 bg-gray-50 text-gray-800 rounded-xl border-2 border-gray-200 font-medium"
          >
            {Array.from({ length: selectedCourse.totalWeeks }, (_, i) => i + 1).map((week) => (
              <option key={week} value={week}>
                {week}주차
              </option>
            ))}
          </select>
        </div>

        {/* 강의 목록 */}
        <div className="space-y-3">
          {(() => {
            const filteredLectures = weeklyLectures.filter((lecture) => lecture.week === selectedWeek);
            return filteredLectures.map((lecture, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-500">
                    {lecture.date} ({lecture.day})
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      lecture.status === "완료"
                        ? "bg-green-100 text-green-700"
                        : lecture.status === "진행중"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {lecture.status}
                  </span>
                </div>
                <p className="font-bold text-gray-800 mb-1">{lecture.title}</p>
                {lecture.status !== "예정" && <p className="text-sm text-gray-600">출석률: {lecture.attendance}%</p>}
              </div>
            ));
          })()}
        </div>
      </div>
    </div>
  );
}
