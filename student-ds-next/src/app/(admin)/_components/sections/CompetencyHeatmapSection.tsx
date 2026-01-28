"use client";

import { Activity } from "lucide-react";
import {
  competencyColors,
  subCompetencyBgColors,
  getHeatmapBgColor,
  getHeatmapTextColor,
  heatmapLegend,
} from "@shared/theme";
import { collegeHeatmapData } from "@/data/mockData";
import SectionHeader from "../common/SectionHeader";

/**
 * CompetencyHeatmapSection - 과별 역량 강/약점 히트맵
 *
 * admin/page.tsx에서 분리된 섹션 컴포넌트
 */
export default function CompetencyHeatmapSection() {
  const legendContent = (
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
  );

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <SectionHeader
        icon={<Activity className="w-4 h-4 text-gray-600" />}
        title="과별 역량 강/약점 히트맵"
        subtitle="각 과의 S-T-A-R 역량 분포"
        rightContent={legendContent}
      />
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
  );
}
