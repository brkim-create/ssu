"use client";

import dynamic from "next/dynamic";
import {
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

// mockData imports
import {
  dashboardStats,
  gradeGrowthData,
  curriculumIssues,
  competencyTrendData,
  certificationHistogramData,
} from "@/data/mockData";

// theme imports
import { competencyColors } from "@shared/theme";

// recharts SSR 문제 방지를 위한 dynamic import
const AdminLineChart = dynamic(
  () => import("../_components/charts/AdminLineChart"),
  { ssr: false },
);
const CompetencyTrendChart = dynamic(
  () => import("../_components/charts/CompetencyTrendChart"),
  { ssr: false },
);
const CertificationHistogramChart = dynamic(
  () => import("../_components/charts/CertificationHistogramChart"),
  { ssr: false },
);

// Section components
import CompetencyHeatmapSection from "./_components/sections/CompetencyHeatmapSection";
import DepartmentComparisonSection from "./_components/sections/DepartmentComparisonSection";
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
                          <td className="px-3 py-2.5 text-gray-600">
                            {course.dept}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 역량 추이 및 인증 현황 */}
      <div className="grid grid-cols-3 gap-4">
        {/* 대학 역량 지표 - Line Chart */}
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
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <SectionHeader
            icon={<BarChart3 className="w-4 h-4 text-gray-600" />}
            title="역량별 평가 분포"
            subtitle="평가 쏠림 현상 진단"
          />
          <div className="space-y-3 mt-4">
            {curriculumIssues.competencyDistribution.map((comp, idx) => {
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

              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">
                      {comp.competency} {"\uC5ED\uB7C9"}
                    </span>
                    <span className="text-sm text-gray-600">
                      {comp.count}
                      {"\uAC1C"} ({comp.percentage}%)
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
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              {(() => {
                const sorted = [
                  ...curriculumIssues.competencyDistribution,
                ].sort((a, b) => b.percentage - a.percentage);
                const highest = sorted[0];
                return `💡 ${highest.competency} 역량이 ${highest.percentage}%로 가장 높은 비율을 차지하고 있습니다. 균형 있는 역량 평가를 위해 조정이 필요합니다.`;
              })()}
            </p>
          </div>
        </div>
      </div>

      {/* 과별 역량 히트맵 */}
      <CompetencyHeatmapSection />
    </div>
  );
}
