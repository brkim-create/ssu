"use client";

import { AlertTriangle } from "lucide-react";
import { curriculumIssues } from "@/data/mockData";
import SectionHeader from "../../../_components/common/SectionHeader";

/**
 * CurriculumIssuesSection - 교육과정 적절성 섹션
 *
 * 미매핑 교과목 현황 표시:
 * - 미매핑 교과목 수 카드
 * - 미매핑 교과목 테이블
 */
export default function CurriculumIssuesSection() {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200 flex-1">
      <SectionHeader
        icon={<AlertTriangle className="w-4 h-4 text-gray-600" />}
        title="교육과정 적절성"
        subtitle="미매핑 교과목 현황"
      />
      <div className="pt-2">
        <div className="grid grid-cols-[150px_1fr] gap-4">
          {/* 좌측: 미매핑 교과목 수 카드 */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200 text-center flex flex-col justify-center h-full">
            <div className="text-xs text-orange-600 font-medium mb-1">
              미매핑 교과목
            </div>
            <div className="flex items-baseline gap-1 justify-center">
              <span className="text-2xl font-bold text-orange-600 text-[32px]">
                {curriculumIssues.unmappedCourses}
              </span>
              <span className="text-lg text-gray-400">/</span>
              <span className="text-lg text-gray-600 text-[24px]">
                {curriculumIssues.totalCourses}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-[14px]">
              {(
                (curriculumIssues.unmappedCourses /
                  curriculumIssues.totalCourses) *
                100
              ).toFixed(1)}
              % 미완료
            </div>
          </div>

          {/* 우측: 미매핑 교과목 테이블 */}
          <div className="max-h-40 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-gray-600 font-medium border-b">
                    교과명
                  </th>
                  <th className="px-3 py-2 text-left text-gray-600 font-medium border-b">
                    담당교수명
                  </th>
                  <th className="px-3 py-2 text-left text-gray-600 font-medium border-b">
                    과명
                  </th>
                </tr>
              </thead>
              <tbody>
                {curriculumIssues.unmappedCoursesList.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-2.5 text-gray-800">
                      {course.courseName}
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">
                      {course.professor}
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{course.dept}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
