"use client";

import { jobFitData } from "@/data/mockData";

interface JobFitSectionProps {
  overallMatchRate?: number;
}

/**
 * JobFitSection - 표준직무 적합도 섹션
 *
 * 학과 취업자 역량 일치도를 표시
 */
export default function JobFitSection({
  overallMatchRate = jobFitData.overallMatchRate,
}: JobFitSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <h3 className="font-bold text-gray-800 mb-3">표준직무 적합도</h3>

      {/* 전체 적합도 */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600">학과 취업자 역량 일치</span>
        <span className="text-2xl font-bold text-orange-500">
          {overallMatchRate}%
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all"
          style={{ width: `${overallMatchRate}%` }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">
        ※ 나의 이수 역량과 학과 졸업생(취업자) 평균 역량 일치도
      </p>
    </div>
  );
}
