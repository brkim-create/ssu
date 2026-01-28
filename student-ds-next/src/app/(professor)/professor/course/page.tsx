"use client";

import { useState } from "react";
import CommonHeader from "../../_components/CommonHeader";
import CourseSelector from "../../_components/CourseSelector";
import { FileText, Target, Clock, MessageCircle, ChevronRight, Calendar, ChartBar } from "lucide-react";

// mockData imports from shared
import { currentSemester, courses, weeklyLectures, evaluationCriteriaByCourse, evaluationCriteria } from "@shared/mockData/data/professor";

// 현재 학기 과목만 필터링
const currentCourses = courses.filter((c) => c.semester === currentSemester);

/**
 * Course Management Page
 *
 * URL: /professor/course
 * 프로토타입 CourseScreen 기반
 */
export default function ProfessorCoursePage() {
  const [selectedCourse, setSelectedCourse] = useState(currentCourses[0]);
  const [selectedWeek, setSelectedWeek] = useState(1);

  return (
    <div className="pb-4">
      <CommonHeader title="과목 관리" subtitle="담당 과목 상세 관리">
        <CourseSelector
          courses={currentCourses}
          selectedCourse={selectedCourse}
          onCourseChange={setSelectedCourse}
        />
      </CommonHeader>

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
          {weeklyLectures
            .filter(lecture => lecture.courseId === selectedCourse.id && lecture.week === selectedWeek)
            .map((lecture, idx) => (
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
            ))}
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
          {(evaluationCriteriaByCourse[selectedCourse.id] || evaluationCriteria).map((criteria) => (
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
}
