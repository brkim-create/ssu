"use client";

import { BarChart3 } from "lucide-react";
import { curriculumIssues } from "@/data/mockData";
import { competencyColors } from "@shared/theme";
import SectionHeader from "../../../_components/common/SectionHeader";

/**
 * CompetencyDistributionSection - 역량별 평가 분포 섹션
 *
 * 평가 쏠림 현상 진단:
 * - S-T-A-R 역량별 프로그레스 바
 * - 인사이트 박스
 */
export default function CompetencyDistributionSection() {
  const getCompetencyColor = (competency: string) => {
    if (competency.includes("Self-directed") || competency === "S")
      return competencyColors.S;
    if (competency.includes("Teamwork") || competency === "T")
      return competencyColors.T;
    if (competency.includes("Analytical") || competency === "A")
      return competencyColors.A;
    if (competency.includes("Relational") || competency === "R")
      return competencyColors.R;
    return competencyColors.S;
  };

  const sortedDistribution = [...curriculumIssues.competencyDistribution].sort(
    (a, b) => b.percentage - a.percentage
  );
  const highest = sortedDistribution[0];

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <SectionHeader
        icon={<BarChart3 className="w-4 h-4 text-gray-600" />}
        title="역량별 평가 분포"
        subtitle="평가 쏠림 현상 진단"
      />
      <div className="space-y-3 mt-4">
        {curriculumIssues.competencyDistribution.map((comp, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{comp.competency} 역량</span>
              <span className="text-sm text-gray-600">
                {comp.count}개 ({comp.percentage}%)
              </span>
            </div>
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full"
                style={{
                  width: `${comp.percentage}%`,
                  backgroundColor: getCompetencyColor(comp.competency),
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 {highest.competency} 역량이 {highest.percentage}%로 가장 높은 비율을
          차지하고 있습니다. 균형 있는 역량 평가를 위해 조정이 필요합니다.
        </p>
      </div>
    </div>
  );
}
