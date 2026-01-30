"use client";

import dynamic from "next/dynamic";
import { TrendingUp } from "lucide-react";
import { competencyTrendData } from "@/data/mockData";
import { competencyColors } from "@shared/theme";
import SectionHeader from "../../../_components/common/SectionHeader";

const CompetencyTrendChart = dynamic(
  () => import("../../../_components/charts/CompetencyTrendChart"),
  { ssr: false }
);

/**
 * CompetencyTrendSection - S-T-A-R 역량 연도별 추이 섹션
 *
 * 대학 전체 학생 평균값 기반 연도별 역량 추이 표시
 */
export default function CompetencyTrendSection() {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <SectionHeader
        icon={<TrendingUp className="w-4 h-4 text-gray-600" />}
        title="S-T-A-R 역량 연도별 추이"
        subtitle="대학 전체 학생 평균값"
      />
      <div
        className="flex flex-col items-center gap-3"
        style={{ width: "100%" }}
      >
        <div
          className="flex justify-center"
          style={{ width: "100%", height: "220px" }}
        >
          <CompetencyTrendChart data={competencyTrendData} />
        </div>
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: competencyColors.S }}
            ></div>
            <span className="text-xs" style={{ color: competencyColors.S }}>
              Self-directed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: competencyColors.T }}
            ></div>
            <span className="text-xs" style={{ color: competencyColors.T }}>
              Teamwork
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: competencyColors.A }}
            ></div>
            <span className="text-xs" style={{ color: competencyColors.A }}>
              Analytical
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: competencyColors.R }}
            ></div>
            <span className="text-xs" style={{ color: competencyColors.R }}>
              Relational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
