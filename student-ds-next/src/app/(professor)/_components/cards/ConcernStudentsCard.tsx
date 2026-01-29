"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { competencyColors } from "@shared/theme";
import type { ConcernStudent } from "@shared/mockData/types/competency";
import DashboardCard from "../common/DashboardCard";

interface ConcernStudentsCardProps {
  concernStudents: ConcernStudent[];
}

/**
 * ConcernStudentsCard - 관심 학생 알림 카드
 *
 * 역량 미달/주의 요망 탭으로 필터링하여 학생 목록 표시
 */
export default function ConcernStudentsCard({ concernStudents }: ConcernStudentsCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<"역량 미달" | "주의 요망">("역량 미달");

  const dangerCount = concernStudents.filter((s) => s.level === "danger").length;
  const warningCount = concernStudents.filter((s) => s.level === "warning").length;

  const filteredStudents =
    selectedCategory === "역량 미달"
      ? concernStudents.filter((s) => s.level === "danger")
      : concernStudents.filter((s) => s.level === "warning");

  return (
    <DashboardCard>
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
          onClick={() => setSelectedCategory("역량 미달")}
          className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
            selectedCategory === "역량 미달" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          역량 미달 <span className="ml-1">({dangerCount})</span>
        </button>
        <button
          onClick={() => setSelectedCategory("주의 요망")}
          className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
            selectedCategory === "주의 요망" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          주의 요망 <span className="ml-1">({warningCount})</span>
        </button>
      </div>

      <div className="space-y-2">
        {filteredStudents.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-sm">해당 학생이 없습니다.</div>
        ) : (
          filteredStudents.map((student) => (
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
          ))
        )}
      </div>
    </DashboardCard>
  );
}
