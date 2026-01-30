"use client";

import { BookOpen, AlertTriangle } from "lucide-react";
import { cqiStatusData } from "@/data/mockData";
import SectionHeader from "../../../_components/common/SectionHeader";

interface CQIStatusSectionProps {
  selectedDepartment: string;
}

/**
 * CQIStatusSection - CQI 운영 현황 섹션
 *
 * 선택된 학과의 CQI 현황을 표시:
 * - 전체 교과목 수
 * - 완료 건수
 * - 완료율
 * - 경고 등급
 */
export default function CQIStatusSection({
  selectedDepartment,
}: CQIStatusSectionProps) {
  const selectedCQI = cqiStatusData.find(
    (item) => item.dept === selectedDepartment
  );

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <SectionHeader
        icon={<BookOpen className="w-4 h-4 text-gray-600" />}
        title="CQI 운영 현황"
      />
      {!selectedCQI ? (
        <div className="text-xs text-gray-500 text-center py-3">
          해당 학과의 CQI 데이터가 없습니다
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">전체 교과목</p>
            <p className="text-xl font-bold text-gray-900">{selectedCQI.total}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">완료</p>
            <p className="text-xl font-bold text-blue-700">
              {selectedCQI.completed}
            </p>
          </div>
          <div
            className={`rounded-lg p-3 ${
              selectedCQI.rate >= 90 ? "bg-green-50" : "bg-yellow-50"
            }`}
          >
            <p className="text-xs text-gray-600 mb-1">완료율</p>
            <p
              className={`text-xl font-bold ${
                selectedCQI.rate >= 90 ? "text-green-700" : "text-yellow-700"
              }`}
            >
              {selectedCQI.rate}%
            </p>
          </div>
          <div
            className={`rounded-lg p-3 ${
              selectedCQI.lowGrade > 0 ? "bg-red-50" : "bg-gray-50"
            }`}
          >
            <p className="text-xs text-gray-600 mb-1">경고 등급</p>
            <div className="flex items-center gap-1">
              {selectedCQI.lowGrade > 0 ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <p className="text-xl font-bold text-red-700">
                    {selectedCQI.lowGrade}건
                  </p>
                </>
              ) : (
                <p className="text-xl font-bold text-gray-400">-</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
