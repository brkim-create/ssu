"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Activity,
  ChevronDown,
} from "lucide-react";

// mockData imports
import {
  dashboardStats,
  gradeGrowthData,
  collegeHeatmapData,
} from "@/data/mockData";

// theme imports
import {
  competencyColors,
  subCompetencyBgColors,
  getHeatmapBgColor,
  getHeatmapTextColor,
  heatmapLegend,
} from "@shared/theme";

// recharts SSR 문제 방지를 위한 dynamic import
const AdminRadarChart = dynamic(
  () => import("../_components/charts/AdminRadarChart"),
  { ssr: false }
);
const AdminLineChart = dynamic(
  () => import("../_components/charts/AdminLineChart"),
  { ssr: false }
);

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
  const [selectedDepartment, setSelectedDepartment] = useState("AI빅데이터과");
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);

  // STAR 역량 계산 헬퍼
  const calculateSTARCompetencies = (deptData: (typeof collegeHeatmapData)[0]) => ({
    S: (deptData.기획 + deptData.실행 + deptData.화합 + deptData.통섭) / 4,
    T:
      (deptData.전공지식 +
        deptData.전공기술 +
        deptData.정보화 +
        deptData.신기술활용 +
        deptData.공감 +
        deptData.판단) /
      6,
    A: (deptData.사명감 + deptData.조직이해 + deptData.도전성) / 3,
    R:
      (deptData.경청 + deptData.협상 + deptData.외국어 + deptData.세계시민) / 4,
  });

  // 전체 평균 계산
  const calculateOverallAverage = () => {
    const all = collegeHeatmapData.map((d) => calculateSTARCompetencies(d));
    return {
      S: all.reduce((s, c) => s + c.S, 0) / all.length,
      T: all.reduce((s, c) => s + c.T, 0) / all.length,
      A: all.reduce((s, c) => s + c.A, 0) / all.length,
      R: all.reduce((s, c) => s + c.R, 0) / all.length,
    };
  };

  // 학과 비교 데이터
  const getDepartmentComparisonData = () => {
    const d = collegeHeatmapData.find((x) => x.college === selectedDepartment);
    if (!d) return [];
    const s = calculateSTARCompetencies(d);
    const a = calculateOverallAverage();
    return [
      { competency: "Self-directed", 선택학과: s.S, 전체평균: a.S },
      { competency: "Teamwork", 선택학과: s.T, 전체평균: a.T },
      { competency: "Analytical", 선택학과: s.A, 전체평균: a.A },
      { competency: "Relational", 선택학과: s.R, 전체평균: a.R },
    ];
  };

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
                    <span className="text-xs text-green-600">{item.change}</span>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  {IconComponent && <IconComponent className="w-4 h-4 text-gray-600" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 학과별 역량 비교 */}
        <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-gray-600" />
              </div>
              <h3 className="font-bold text-sm text-gray-900">
                학과별 S-T-A-R 역량 비교
              </h3>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                className="px-3 py-1 border rounded bg-white text-sm flex gap-2 items-center"
              >
                {selectedDepartment} <ChevronDown className="w-4 h-4" />
              </button>
              {showDeptDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-white border rounded shadow-lg z-10 w-48 max-h-48 overflow-y-auto">
                  {collegeHeatmapData.map((d) => (
                    <button
                      key={d.college}
                      onClick={() => {
                        setSelectedDepartment(d.college);
                        setShowDeptDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      {d.college}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div style={{ width: "100%", height: "220px" }}>
            <AdminRadarChart data={getDepartmentComparisonData()} />
          </div>
        </div>

        {/* 학년별 역량 성장 추이 */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <h3 className="font-bold text-sm mb-3">학년별 역량 성장 추이</h3>
          <AdminLineChart data={gradeGrowthData} />
        </div>
      </div>

      {/* 과별 역량 히트맵 */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-3 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">과별 역량 강/약점 히트맵</h3>
            <span className="text-xs text-gray-600">| 각 과의 S-T-A-R 역량 분포</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-600 mr-2">색상범례:</span>
            <div className="flex items-center gap-0.5">
              {heatmapLegend.map((item, idx) => (
                <div
                  key={idx}
                  className={`px-1.5 h-4 flex items-center justify-center text-[10px] ${
                    idx === heatmapLegend.length - 1
                      ? "text-gray-900 font-medium"
                      : "text-white"
                  }`}
                  style={{ backgroundColor: item.color }}
                >
                  {item.range}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse table-fixed">
            <thead>
              <tr className="border-b border-gray-300">
                <th
                  rowSpan={3}
                  className="p-2 font-medium bg-gray-100 border-r-2 border-gray-300 text-gray-900"
                  style={{ width: "140px", maxWidth: "140px" }}
                >
                  <div className="flex flex-col leading-tight text-xs">
                    <span className="self-end">역량분포</span>
                    <span className="self-center">∖</span>
                    <span className="self-start">과</span>
                  </div>
                </th>
                <th
                  colSpan={4}
                  className="text-center p-2 font-medium border-x border-gray-300 text-white"
                  style={{ backgroundColor: competencyColors.S }}
                >
                  Self-directed (S)
                </th>
                <th
                  colSpan={6}
                  className="text-center p-2 font-medium border-x border-gray-300 text-white"
                  style={{ backgroundColor: competencyColors.T }}
                >
                  Teamwork (T)
                </th>
                <th
                  colSpan={4}
                  className="text-center p-2 font-medium border-x border-gray-300 text-white"
                  style={{ backgroundColor: competencyColors.A }}
                >
                  Analytical (A)
                </th>
                <th
                  colSpan={4}
                  className="text-center p-2 font-medium border-x border-gray-300 text-white"
                  style={{ backgroundColor: competencyColors.R }}
                >
                  Relational (R)
                </th>
              </tr>
              <tr className="border-b border-gray-300">
                <th
                  colSpan={2}
                  className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 text-xs"
                  style={{ backgroundColor: subCompetencyBgColors.S }}
                >
                  창의적 문제해결
                </th>
                <th
                  colSpan={2}
                  className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 text-xs"
                  style={{ backgroundColor: subCompetencyBgColors.S }}
                >
                  융복합적사고
                </th>
                <th
                  colSpan={2}
                  className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 text-xs"
                  style={{ backgroundColor: subCompetencyBgColors.T }}
                >
                  전문지식
                </th>
                <th
                  colSpan={2}
                  className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 text-xs"
                  style={{ backgroundColor: subCompetencyBgColors.T }}
                >
                  미래혁신
                </th>
                <th
                  colSpan={2}
                  className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 text-xs"
                  style={{ backgroundColor: subCompetencyBgColors.T }}
                >
                  리더십
                </th>
                <th
                  colSpan={2}
                  className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 text-xs"
                  style={{ backgroundColor: subCompetencyBgColors.A }}
                >
                  공동체의식
                </th>
                <th
                  colSpan={2}
                  className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 text-xs"
                  style={{ backgroundColor: subCompetencyBgColors.A }}
                >
                  자기계발
                </th>
                <th
                  colSpan={2}
                  className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 text-xs"
                  style={{ backgroundColor: subCompetencyBgColors.R }}
                >
                  의사소통
                </th>
                <th
                  colSpan={2}
                  className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 text-xs"
                  style={{ backgroundColor: subCompetencyBgColors.R }}
                >
                  글로컬 시민
                </th>
              </tr>
              <tr className="border-b border-gray-300">
                {["기획", "실행", "화합", "통섭"].map((label) => (
                  <th
                    key={label}
                    className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 bg-white"
                    style={{ borderBottom: `3px solid ${competencyColors.S}` }}
                  >
                    {label}
                  </th>
                ))}
                {["전공지식", "전공기술", "정보화", "신기술활용", "공감", "판단"].map(
                  (label) => (
                    <th
                      key={label}
                      className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 bg-white whitespace-normal leading-tight"
                      style={{ borderBottom: `3px solid ${competencyColors.T}` }}
                    >
                      {label.includes("지식") || label.includes("기술") || label.includes("활용")
                        ? label.replace("전공", "전공\n").replace("신기술", "신기술\n")
                        : label}
                    </th>
                  )
                )}
                {["사명감", "조직이해", "도전성", "자기학습"].map((label) => (
                  <th
                    key={label}
                    className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 bg-white whitespace-normal leading-tight"
                    style={{ borderBottom: `3px solid ${competencyColors.A}` }}
                  >
                    {label.includes("이해") || label.includes("학습")
                      ? label.replace("조직", "조직\n").replace("자기", "자기\n")
                      : label}
                  </th>
                ))}
                {["경청", "협상", "외국어", "세계시민"].map((label) => (
                  <th
                    key={label}
                    className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 bg-white whitespace-normal leading-tight"
                    style={{ borderBottom: `3px solid ${competencyColors.R}` }}
                  >
                    {label.includes("시민") ? "세계\n시민" : label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {collegeHeatmapData.map((college, idx) => (
                <tr key={idx}>
                  <td
                    className="p-2 font-medium bg-gray-50 border-r-2 border-gray-300 text-xs text-gray-900"
                    style={{ width: "140px", maxWidth: "140px" }}
                  >
                    {college.college}
                  </td>
                  {[
                    college.기획,
                    college.실행,
                    college.화합,
                    college.통섭,
                    college.전공지식,
                    college.전공기술,
                    college.정보화,
                    college.신기술활용,
                    college.공감,
                    college.판단,
                    college.사명감,
                    college.조직이해,
                    college.도전성,
                    college.자기학습,
                    college.경청,
                    college.협상,
                    college.외국어,
                    college.세계시민,
                  ].map((value, i) => (
                    <td
                      key={i}
                      className={`${getHeatmapTextColor(value)} p-2 text-center font-medium border border-gray-300`}
                      style={{ backgroundColor: getHeatmapBgColor(value) }}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
