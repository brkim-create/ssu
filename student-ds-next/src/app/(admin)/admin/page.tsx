"use client";

import dynamic from "next/dynamic";
import { Users, TrendingUp, Award, CheckCircle } from "lucide-react";

// mockData imports
import {
  dashboardStats,
  gradeGrowthData,
  certificationHistogramData,
} from "@/data/mockData";

// recharts SSR 문제 방지를 위한 dynamic import
const AdminLineChart = dynamic(
  () => import("../_components/charts/AdminLineChart"),
  { ssr: false },
);
const CertificationHistogramChart = dynamic(
  () => import("../_components/charts/CertificationHistogramChart"),
  { ssr: false },
);

// Section components
import CompetencyHeatmapSection from "./_components/sections/CompetencyHeatmapSection";
import DepartmentComparisonSection from "./_components/sections/DepartmentComparisonSection";
import CurriculumIssuesSection from "./_components/sections/CurriculumIssuesSection";
import CompetencyTrendSection from "./_components/sections/CompetencyTrendSection";
import CompetencyDistributionSection from "./_components/sections/CompetencyDistributionSection";
import SectionHeader from "../_components/common/SectionHeader";

// 아이콘 맵
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  trending: TrendingUp,
  award: Award,
  check: CheckCircle,
};

/**
 * Admin Dashboard Page
 *
 * URL: /admin
 * admin-ds-ui App.tsx DashboardScreen 기반 마이그레이션
 */
export default function AdminDashboardPage() {
  // 히스토그램 데이터에서 평균/중앙값 계산 (구간 중앙값 기반 근사)
  const calculateHistogramStats = () => {
    const total = certificationHistogramData.reduce(
      (sum, d) => sum + d.students,
      0,
    );

    // 각 구간의 중앙값 계산
    const getMidpoint = (range: string) => {
      const [min, max] = range.split("-").map(Number);
      return (min + max) / 2;
    };

    // 가중 평균 계산
    const weightedSum = certificationHistogramData.reduce(
      (sum, d) => sum + getMidpoint(d.range) * d.students,
      0,
    );
    const average = Math.round((weightedSum / total) * 10) / 10;

    // 중앙값 계산 (누적 분포에서 50% 위치)
    const midPosition = total / 2;
    let cumulative = 0;
    let median = 0;
    for (const d of certificationHistogramData) {
      cumulative += d.students;
      if (cumulative >= midPosition) {
        median = getMidpoint(d.range);
        break;
      }
    }

    return { average, median: Math.round(median * 10) / 10 };
  };

  const histogramStats = calculateHistogramStats();

  return (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-3">
        {dashboardStats.map((item, i) => {
          const IconComponent = iconMap[item.iconType];
          return (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-3 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">{item.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-gray-900">
                      {item.value}
                    </p>
                    <span className="text-xs text-green-600">
                      {item.change}
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  {IconComponent && (
                    <IconComponent className="w-4 h-4 text-gray-600" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 학과별 역량 비교 + CQI 운영 현황 */}
        <DepartmentComparisonSection />

        {/* 오른쪽 컬럼: 학년별 성장 추이 + 교육과정 적절성 */}
        <div className="flex flex-col gap-4">
          {/* 학년별 역량 성장 추이 */}
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <SectionHeader
              icon={<TrendingUp className="w-4 h-4 text-gray-600" />}
              title="학년별 역량 성장 추이"
              subtitle="1학년 → 4학년 진급에 따른 역량 상승"
            />
            <AdminLineChart data={gradeGrowthData} />
          </div>

          {/* 교육과정 적절성 */}
          <CurriculumIssuesSection />
        </div>
      </div>

      {/* 역량 추이 및 인증 현황 */}
      <div className="grid grid-cols-3 gap-4">
        {/* S-T-A-R 역량 연도별 추이 */}
        <CompetencyTrendSection />

        {/* 역량 인증 현황 */}
        <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
          <SectionHeader
            icon={<Award className="w-4 h-4 text-gray-600" />}
            title="역량 인증 현황"
            subtitle="점수 구간별 학생 수 분포"
          />
          <div style={{ width: "100%", height: "230px" }}>
            <CertificationHistogramChart data={certificationHistogramData} />
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-700">
              <strong>평균 점수:</strong> {histogramStats.average.toFixed(1)}점 |{" "}
              <strong>중앙값:</strong> {histogramStats.median.toFixed(1)}점
            </p>
          </div>
        </div>

        {/* 역량별 평가 분포 */}
        <CompetencyDistributionSection />
      </div>

      {/* 과별 역량 히트맵 */}
      <CompetencyHeatmapSection />
    </div>
  );
}
