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
  AlertTriangle,
  BookOpen,
  BarChart3,
  Search,
} from "lucide-react";

// mockData imports
import {
  dashboardStats,
  gradeGrowthData,
  collegeHeatmapData,
  curriculumIssues,
  cqiStatusData,
  competencyTrendData,
  certificationHistogramData,
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
  { ssr: false },
);
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
  const [deptSearchText, setDeptSearchText] = useState("");

  // 학과 검색 필터링
  const getFilteredDepartments = () => {
    if (!deptSearchText) return collegeHeatmapData;
    return collegeHeatmapData.filter((dept) =>
      dept.college.toLowerCase().includes(deptSearchText.toLowerCase()),
    );
  };

  // STAR 역량 계산 헬퍼
  const calculateSTARCompetencies = (
    deptData: (typeof collegeHeatmapData)[0],
  ) => ({
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

  // 학과 비교 데이터 (S-T-A-R 대분류)
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

  // 하위역량(PO) 9개 항목 비교 데이터
  const getDepartmentPOComparisonData = () => {
    const d = collegeHeatmapData.find((x) => x.college === selectedDepartment);
    if (!d) return [];

    type HeatmapKey = keyof typeof d;

    // 소수점 1자리 반올림 헬퍼
    const round1 = (v: number) => Math.round(v * 10) / 10;

    // 전체 평균 계산 헬퍼 (field1, field2의 평균을 전체 학과에 대해 계산)
    const calculatePOAverage = (
      field1: HeatmapKey,
      field2: HeatmapKey | null,
    ) => {
      const values = collegeHeatmapData.map((dept) =>
        field2
          ? ((dept[field1] as number) + (dept[field2] as number)) / 2
          : (dept[field1] as number),
      );
      return round1(values.reduce((a, b) => a + b, 0) / values.length);
    };

    // 선택 학과 PO 계산 헬퍼
    const calcDeptPO = (field1: HeatmapKey, field2: HeatmapKey | null) =>
      round1(
        field2
          ? ((d[field1] as number) + (d[field2] as number)) / 2
          : (d[field1] as number),
      );

    return [
      {
        competency: "창의적 문제해결",
        선택학과: calcDeptPO("기획", "실행"),
        전체평균: calculatePOAverage("기획", "실행"),
      },
      {
        competency: "융복합적 사고",
        선택학과: calcDeptPO("화합", "통섭"),
        전체평균: calculatePOAverage("화합", "통섭"),
      },
      {
        competency: "전문지식",
        선택학과: calcDeptPO("전공지식", "전공기술"),
        전체평균: calculatePOAverage("전공지식", "전공기술"),
      },
      {
        competency: "미래혁신",
        선택학과: calcDeptPO("정보화", "신기술활용"),
        전체평균: calculatePOAverage("정보화", "신기술활용"),
      },
      {
        competency: "리더십",
        선택학과: calcDeptPO("공감", "판단"),
        전체평균: calculatePOAverage("공감", "판단"),
      },
      {
        competency: "공동체 의식",
        선택학과: calcDeptPO("사명감", "조직이해"),
        전체평균: calculatePOAverage("사명감", "조직이해"),
      },
      {
        competency: "자기계발",
        선택학과: calcDeptPO("도전성", "자기학습"),
        전체평균: calculatePOAverage("도전성", "자기학습"),
      },
      {
        competency: "의사소통",
        선택학과: calcDeptPO("경청", "협상"),
        전체평균: calculatePOAverage("경청", "협상"),
      },
      {
        competency: "글로컬 시민",
        선택학과: calcDeptPO("외국어", "세계시민"),
        전체평균: calculatePOAverage("외국어", "세계시민"),
      },
    ];
  };

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

            {/* 범례 */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ backgroundColor: competencyColors.A }}
                ></div>
                <span className="text-gray-600">선택학과</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-sm bg-gray-400"></div>
                <span className="text-gray-600">전체평균</span>
              </div>
            </div>
          </div>

          {/* 학과 선택기 */}
          <div className="mb-4 relative">
            <button
              onClick={() => setShowDeptDropdown(!showDeptDropdown)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:bg-gray-50"
            >
              <span className="text-sm text-gray-900">
                {selectedDepartment}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showDeptDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-hidden">
                {/* 검색 입력 */}
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="학과 검색..."
                      value={deptSearchText}
                      onChange={(e) => setDeptSearchText(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded text-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                {/* 학과 목록 */}
                <div className="max-h-48 overflow-y-auto">
                  {getFilteredDepartments().map((dept) => (
                    <button
                      key={dept.college}
                      onClick={() => {
                        setSelectedDepartment(dept.college);
                        setShowDeptDropdown(false);
                        setDeptSearchText("");
                      }}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                        selectedDepartment === dept.college
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-900"
                      }`}
                    >
                      {dept.college}
                    </button>
                  ))}
                  {getFilteredDepartments().length === 0 && (
                    <div className="px-3 py-2 text-sm text-gray-500 text-center">
                      검색 결과가 없습니다
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* 비교 그래프 */}
          <div className="grid grid-cols-2 gap-4">
            {/* S-T-A-R 역량 레이더 */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 text-center">
                S-T-A-R {"\uB300\uBD84\uB958 \uC5ED\uB7C9"}
              </h4>
              <div style={{ width: "100%", height: "220px" }}>
                <AdminRadarChart data={getDepartmentComparisonData()} selectedDepartmentName={selectedDepartment} />
              </div>
            </div>

            {/* 하위역량(PO) 레이더 */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 text-center">
                {"\uD558\uC704\uC5ED\uB7C9"}(PO) 9{"\uAC1C \uD56D\uBAA9"}
              </h4>
              <div style={{ width: "100%", height: "220px" }}>
                <AdminRadarChart data={getDepartmentPOComparisonData()} selectedDepartmentName={selectedDepartment} />
              </div>
            </div>
          </div>

          {/* CQI 운영 현황 */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-gray-600" />
              </div>
              <h4 className="font-bold text-sm text-gray-900">
                CQI {"\uC6B4\uC601 \uD604\uD669"}
              </h4>
            </div>
            {(() => {
              const selectedCQI = cqiStatusData.find(
                (item) => item.dept === selectedDepartment,
              );
              if (!selectedCQI) {
                return (
                  <div className="text-xs text-gray-500 text-center py-3">
                    {
                      "\uD574\uB2F9 \uD559\uACFC\uC758 CQI \uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"
                    }
                  </div>
                );
              }
              return (
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">
                      {"\uC804\uCCB4 \uAD50\uACFC\uBAA9"}
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {selectedCQI.total}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">
                      {"\uC644\uB8CC"}
                    </p>
                    <p className="text-xl font-bold text-blue-700">
                      {selectedCQI.completed}
                    </p>
                  </div>
                  <div
                    className={`rounded-lg p-3 ${selectedCQI.rate >= 90 ? "bg-green-50" : "bg-yellow-50"}`}
                  >
                    <p className="text-xs text-gray-600 mb-1">
                      {"\uC644\uB8CC\uC728"}
                    </p>
                    <p
                      className={`text-xl font-bold ${selectedCQI.rate >= 90 ? "text-green-700" : "text-yellow-700"}`}
                    >
                      {selectedCQI.rate}%
                    </p>
                  </div>
                  <div
                    className={`rounded-lg p-3 ${selectedCQI.lowGrade > 0 ? "bg-red-50" : "bg-gray-50"}`}
                  >
                    <p className="text-xs text-gray-600 mb-1">
                      {"\uACBD\uACE0 \uB4F1\uAE09"}
                    </p>
                    <div className="flex items-center gap-1">
                      {selectedCQI.lowGrade > 0 ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <p className="text-xl font-bold text-red-700">
                            {selectedCQI.lowGrade}
                            {"\uAC74"}
                          </p>
                        </>
                      ) : (
                        <p className="text-xl font-bold text-gray-400">-</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* 오른쪽 컬럼: 학년별 성장 추이 + 교육과정 적절성 */}
        <div className="flex flex-col gap-4">
          {/* 학년별 역량 성장 추이 */}
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-gray-600" />
              </div>
              <h3 className="font-bold text-sm">
                {"\uD559\uB144\uBCC4 \uC5ED\uB7C9 \uC131\uC7A5 \uCD94\uC774"}
              </h3>
              <span className="text-xs text-gray-500">
                | 1{"\uD559\uB144"} → 4
                {
                  "\uD559\uB144 \uC9C4\uAE09\uC5D0 \uB530\uB978 \uC5ED\uB7C9 \uC0C1\uC2B9"
                }
              </span>
            </div>
            <AdminLineChart data={gradeGrowthData} />
          </div>

          {/* 교육과정 적절성 */}
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-gray-600" />
              </div>
              <h3 className="font-bold text-sm">교육과정 적절성</h3>
              <span className="text-xs text-gray-500">
                | 미매핑 교과목 현황
              </span>
            </div>
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
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">
              S-T-A-R {"\uC5ED\uB7C9 \uC5F0\uB3C4\uBCC4 \uCD94\uC774"}
            </h3>
            <span className="text-xs text-gray-600">
              | {"\uB300\uD559 \uC804\uCCB4 \uD559\uC0DD \uD3C9\uADE0\uAC12"}
            </span>
          </div>
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
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">역량 인증 현황</h3>
            <span className="text-xs text-gray-600">
              | 점수 구간별 학생 수 분포
            </span>
          </div>
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
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">
              {"\uC5ED\uB7C9\uBCC4 \uD3C9\uAC00 \uBD84\uD3EC"}
            </h3>
            <span className="text-xs text-gray-600">
              | {"\uD3C9\uAC00 \uC4F8\uB9BC \uD604\uC0C1 \uC9C4\uB2E8"}
            </span>
          </div>
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
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-3 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">
              과별 역량 강/약점 히트맵
            </h3>
            <span className="text-xs text-gray-600">
              | 각 과의 S-T-A-R 역량 분포
            </span>
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
                {[
                  "전공지식",
                  "전공기술",
                  "정보화",
                  "신기술활용",
                  "공감",
                  "판단",
                ].map((label) => (
                  <th
                    key={label}
                    className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 bg-white whitespace-normal leading-tight"
                    style={{ borderBottom: `3px solid ${competencyColors.T}` }}
                  >
                    {label.includes("지식") ||
                    label.includes("기술") ||
                    label.includes("활용")
                      ? label
                          .replace("전공", "전공\n")
                          .replace("신기술", "신기술\n")
                      : label}
                  </th>
                ))}
                {["사명감", "조직이해", "도전성", "자기학습"].map((label) => (
                  <th
                    key={label}
                    className="text-center p-2 font-medium border-x border-gray-300 text-gray-700 bg-white whitespace-normal leading-tight"
                    style={{ borderBottom: `3px solid ${competencyColors.A}` }}
                  >
                    {label.includes("이해") || label.includes("학습")
                      ? label
                          .replace("조직", "조직\n")
                          .replace("자기", "자기\n")
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
