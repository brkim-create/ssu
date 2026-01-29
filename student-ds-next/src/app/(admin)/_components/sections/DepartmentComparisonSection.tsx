"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Award, ChevronDown, Search } from "lucide-react";
import { competencyColors } from "@shared/theme";
import { collegeHeatmapData } from "@/data/mockData";
import SectionHeader from "../common/SectionHeader";
import CQIStatusSection from "./CQIStatusSection";

// recharts SSR 문제 방지를 위한 dynamic import
const AdminRadarChart = dynamic(
  () => import("../charts/AdminRadarChart"),
  { ssr: false },
);

/**
 * DepartmentComparisonSection - 학과별 S-T-A-R 역량 비교 섹션
 *
 * 포함 내용:
 * - 학과 선택 드롭다운
 * - S-T-A-R 대분류 레이더 차트
 * - 하위역량(PO) 9개 항목 레이더 차트
 * - CQI 운영 현황
 */
export default function DepartmentComparisonSection() {
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

  const legendContent = (
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
  );

  return (
    <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
      <SectionHeader
        icon={<Award className="w-4 h-4 text-gray-600" />}
        title="학과별 S-T-A-R 역량 비교"
        rightContent={legendContent}
      />

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
            S-T-A-R 대분류 역량
          </h4>
          <div style={{ width: "100%", height: "220px" }}>
            <AdminRadarChart data={getDepartmentComparisonData()} selectedDepartmentName={selectedDepartment} />
          </div>
        </div>

        {/* 하위역량(PO) 레이더 */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-2 text-center">
            하위역량(PO) 9개 항목
          </h4>
          <div style={{ width: "100%", height: "220px" }}>
            <AdminRadarChart data={getDepartmentPOComparisonData()} selectedDepartmentName={selectedDepartment} />
          </div>
        </div>
      </div>

      {/* CQI 운영 현황 */}
      <CQIStatusSection selectedDepartment={selectedDepartment} />
    </div>
  );
}
