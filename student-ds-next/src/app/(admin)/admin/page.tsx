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
  certificationStats,
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
const CompetencyTrendChart = dynamic(
  () => import("../_components/charts/CompetencyTrendChart"),
  { ssr: false }
);
const CertificationHistogramChart = dynamic(
  () => import("../_components/charts/CertificationHistogramChart"),
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
  const [deptSearchText, setDeptSearchText] = useState("");

  // 학과 검색 필터링
  const getFilteredDepartments = () => {
    if (!deptSearchText) return collegeHeatmapData;
    return collegeHeatmapData.filter((dept) =>
      dept.college.toLowerCase().includes(deptSearchText.toLowerCase())
    );
  };

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

    // 선택 학과 PO 계산
    const deptPO = {
      창의적문제해결: (d.기획 + d.실행) / 2,
      융복합적사고: (d.화합 + d.통섭) / 2,
      전문지식: (d.전공지식 + d.전공기술) / 2,
      미래혁신: (d.정보화 + d.신기술활용) / 2,
      리더십: (d.공감 + d.판단) / 2,
      공동체의식: (d.사명감 + d.조직이해) / 2,
      자기계발: (d.도전성 + d.자기학습) / 2,
      의사소통: (d.경청 + d.협상) / 2,
      글로컬시민: (d.외국어 + d.세계시민) / 2,
    };

    // 전체 평균 PO 계산
    const allPO = collegeHeatmapData.map((item) => ({
      창의적문제해결: (item.기획 + item.실행) / 2,
      융복합적사고: (item.화합 + item.통섭) / 2,
      전문지식: (item.전공지식 + item.전공기술) / 2,
      미래혁신: (item.정보화 + item.신기술활용) / 2,
      리더십: (item.공감 + item.판단) / 2,
      공동체의식: (item.사명감 + item.조직이해) / 2,
      자기계발: (item.도전성 + item.자기학습) / 2,
      의사소통: (item.경청 + item.협상) / 2,
      글로컬시민: (item.외국어 + item.세계시민) / 2,
    }));

    const avgPO = {
      창의적문제해결: allPO.reduce((s, c) => s + c.창의적문제해결, 0) / allPO.length,
      융복합적사고: allPO.reduce((s, c) => s + c.융복합적사고, 0) / allPO.length,
      전문지식: allPO.reduce((s, c) => s + c.전문지식, 0) / allPO.length,
      미래혁신: allPO.reduce((s, c) => s + c.미래혁신, 0) / allPO.length,
      리더십: allPO.reduce((s, c) => s + c.리더십, 0) / allPO.length,
      공동체의식: allPO.reduce((s, c) => s + c.공동체의식, 0) / allPO.length,
      자기계발: allPO.reduce((s, c) => s + c.자기계발, 0) / allPO.length,
      의사소통: allPO.reduce((s, c) => s + c.의사소통, 0) / allPO.length,
      글로컬시민: allPO.reduce((s, c) => s + c.글로컬시민, 0) / allPO.length,
    };

    return [
      { competency: "\uCC3D\uC758\uC801\uBB38\uC81C\uD574\uACB0", 선택학과: deptPO.창의적문제해결, 전체평균: avgPO.창의적문제해결 },
      { competency: "\uC735\uBCF5\uD569\uC0AC\uACE0", 선택학과: deptPO.융복합적사고, 전체평균: avgPO.융복합적사고 },
      { competency: "\uC804\uBB38\uC9C0\uC2DD", 선택학과: deptPO.전문지식, 전체평균: avgPO.전문지식 },
      { competency: "\uBBF8\uB798\uD601\uC2E0", 선택학과: deptPO.미래혁신, 전체평균: avgPO.미래혁신 },
      { competency: "\uB9AC\uB354\uC2ED", 선택학과: deptPO.리더십, 전체평균: avgPO.리더십 },
      { competency: "\uACF5\uB3D9\uCCB4\uC758\uC2DD", 선택학과: deptPO.공동체의식, 전체평균: avgPO.공동체의식 },
      { competency: "\uC790\uAE30\uACC4\uBC1C", 선택학과: deptPO.자기계발, 전체평균: avgPO.자기계발 },
      { competency: "\uC758\uC0AC\uC18C\uD1B5", 선택학과: deptPO.의사소통, 전체평균: avgPO.의사소통 },
      { competency: "\uAE00\uB85C\uCEEC\uC2DC\uBBFC", 선택학과: deptPO.글로컬시민, 전체평균: avgPO.글로컬시민 },
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
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#C13584' }}></div>
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
              <span className="text-sm text-gray-900">{selectedDepartment}</span>
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
                        setDeptSearchText('');
                      }}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                        selectedDepartment === dept.college ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
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
              <h4 className="text-xs font-semibold text-gray-700 mb-2 text-center">S-T-A-R {"\uB300\uBD84\uB958 \uC5ED\uB7C9"}</h4>
              <div style={{ width: "100%", height: "220px" }}>
                <AdminRadarChart data={getDepartmentComparisonData()} />
              </div>
            </div>

            {/* 하위역량(PO) 레이더 */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 text-center">{"\uD558\uC704\uC5ED\uB7C9"}(PO) 9{"\uAC1C \uD56D\uBAA9"}</h4>
              <div style={{ width: "100%", height: "220px" }}>
                <AdminRadarChart data={getDepartmentPOComparisonData()} />
              </div>
            </div>
          </div>

          {/* CQI 운영 현황 */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-gray-600" />
              </div>
              <h4 className="font-bold text-sm text-gray-900">CQI {"\uC6B4\uC601 \uD604\uD669"}</h4>
            </div>
            {(() => {
              const selectedCQI = cqiStatusData.find(item => item.dept === selectedDepartment);
              if (!selectedCQI) {
                return (
                  <div className="text-xs text-gray-500 text-center py-3">
                    {"\uD574\uB2F9 \uD559\uACFC\uC758 CQI \uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"}
                  </div>
                );
              }
              return (
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">{"\uC804\uCCB4 \uAD50\uACFC\uBAA9"}</p>
                    <p className="text-xl font-bold text-gray-900">{selectedCQI.total}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">{"\uC644\uB8CC"}</p>
                    <p className="text-xl font-bold text-blue-700">{selectedCQI.completed}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${selectedCQI.rate >= 90 ? 'bg-green-50' : 'bg-yellow-50'}`}>
                    <p className="text-xs text-gray-600 mb-1">{"\uC644\uB8CC\uC728"}</p>
                    <p className={`text-xl font-bold ${selectedCQI.rate >= 90 ? 'text-green-700' : 'text-yellow-700'}`}>
                      {selectedCQI.rate}%
                    </p>
                  </div>
                  <div className={`rounded-lg p-3 ${selectedCQI.lowGrade > 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
                    <p className="text-xs text-gray-600 mb-1">{"\uACBD\uACE0 \uB4F1\uAE09"}</p>
                    <div className="flex items-center gap-1">
                      {selectedCQI.lowGrade > 0 ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <p className="text-xl font-bold text-red-700">{selectedCQI.lowGrade}{"\uAC74"}</p>
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
              <h3 className="font-bold text-sm">{"\uD559\uB144\uBCC4 \uC5ED\uB7C9 \uC131\uC7A5 \uCD94\uC774"}</h3>
              <span className="text-xs text-gray-500">| 1{"\uD559\uB144"} → 4{"\uD559\uB144 \uC9C4\uAE09\uC5D0 \uB530\uB978 \uC5ED\uB7C9 \uC0C1\uC2B9"}</span>
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
              <span className="text-xs text-gray-500">| 미매핑 교과목 현황</span>
            </div>
            <div className="pt-2">
              <div className="grid grid-cols-[150px_1fr] gap-4">
                {/* 좌측: 미매핑 교과목 수 카드 */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200 text-center flex flex-col justify-center h-full">
                  <div className="text-xs text-orange-600 font-medium mb-1">미매핑 교과목</div>
                  <div className="flex items-baseline gap-1 justify-center">
                    <span className="text-2xl font-bold text-orange-600 text-[32px]">{curriculumIssues.unmappedCourses}</span>
                    <span className="text-lg text-gray-400">/</span>
                    <span className="text-lg text-gray-600 text-[24px]">{curriculumIssues.totalCourses}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-[14px]">
                    {((curriculumIssues.unmappedCourses / curriculumIssues.totalCourses) * 100).toFixed(1)}% 미완료
                  </div>
                </div>

                {/* 우측: 미매핑 교과목 테이블 */}
                <div className="max-h-40 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left text-gray-600 font-medium border-b">교과명</th>
                        <th className="px-3 py-2 text-left text-gray-600 font-medium border-b">담당교수명</th>
                        <th className="px-3 py-2 text-left text-gray-600 font-medium border-b">과명</th>
                      </tr>
                    </thead>
                    <tbody>
                      {curriculumIssues.unmappedCoursesList.map((course) => (
                        <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-3 py-2.5 text-gray-800">{course.courseName}</td>
                          <td className="px-3 py-2.5 text-gray-600">{course.professor}</td>
                          <td className="px-3 py-2.5 text-gray-600">{course.dept}</td>
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
            <h3 className="font-bold text-sm text-gray-900">S-T-A-R {"\uC5ED\uB7C9 \uC5F0\uB3C4\uBCC4 \uCD94\uC774"}</h3>
            <span className="text-xs text-gray-600">| {"\uB300\uD559 \uC804\uCCB4 \uD559\uC0DD \uD3C9\uADE0\uAC12"}</span>
          </div>
          <div className="flex flex-col items-center gap-3" style={{ width: "100%" }}>
            <div className="flex justify-center" style={{ width: "100%", height: "220px" }}>
              <CompetencyTrendChart data={competencyTrendData} />
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#E94E3C" }}></div>
                <span className="text-xs" style={{ color: "#E94E3C" }}>Self-directed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#F7941D" }}></div>
                <span className="text-xs" style={{ color: "#F7941D" }}>Teamwork</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#C13584" }}></div>
                <span className="text-xs" style={{ color: "#C13584" }}>Analytical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#5B51D8" }}></div>
                <span className="text-xs" style={{ color: "#5B51D8" }}>Relational</span>
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
            <span className="text-xs text-gray-600">| 점수 구간별 학생 수 분포</span>
          </div>
          <div style={{ width: "100%", height: "230px" }}>
            <CertificationHistogramChart data={certificationHistogramData} />
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-700">
              <strong>평균 점수:</strong> {certificationStats.averageScore}점 | <strong>중앙값:</strong> {certificationStats.medianScore}점
            </p>
          </div>
        </div>

        {/* 역량별 평가 분포 */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="font-bold text-sm text-gray-900">{"\uC5ED\uB7C9\uBCC4 \uD3C9\uAC00 \uBD84\uD3EC"}</h3>
            <span className="text-xs text-gray-600">| {"\uD3C9\uAC00 \uC4F8\uB9BC \uD604\uC0C1 \uC9C4\uB2E8"}</span>
          </div>
          <div className="space-y-3 mt-4">
            {curriculumIssues.competencyDistribution.map((comp, idx) => {
              const getCompetencyColor = (competency: string) => {
                if (competency.includes("Self-directed") || competency === "S") return "#E94E3C";
                if (competency.includes("Teamwork") || competency === "T") return "#F7941D";
                if (competency.includes("Analytical") || competency === "A") return "#C13584";
                if (competency.includes("Relational") || competency === "R") return "#5B51D8";
                return "#E94E3C";
              };

              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{comp.competency} {"\uC5ED\uB7C9"}</span>
                    <span className="text-sm text-gray-600">{comp.count}{"\uAC1C"} ({comp.percentage}%)</span>
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
              {"\uD83D\uDCA1 T \uC5ED\uB7C9\uC774 33.5%\uB85C \uAC00\uC7A5 \uB192\uC740 \uBE44\uC728\uC744 \uCC28\uC9C0\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4. \uADE0\uD615 \uC788\uB294 \uC5ED\uB7C9 \uD3C9\uAC00\uB97C \uC704\uD574 \uC870\uC815\uC774 \uD544\uC694\uD569\uB2C8\uB2E4."}
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
