"use client";

import { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { radarData, radarDataPO } from "@/data/mockData";

type RadarToggle = "core" | "po";

interface CompetencyRadarProps {
  initialToggle?: RadarToggle;
  onToggleChange?: (toggle: RadarToggle) => void;
}

/**
 * CompetencyRadar - 핵심역량 레이더 차트 컴포넌트
 *
 * Recharts를 사용하는 Client Component로 분리
 * - STAR 핵심역량 차트
 * - 하위역량(PO) 차트
 */
export default function CompetencyRadar({
  initialToggle = "core",
  onToggleChange,
}: CompetencyRadarProps) {
  const [radarToggle, setRadarToggle] = useState<RadarToggle>(initialToggle);

  const handleToggle = (toggle: RadarToggle) => {
    setRadarToggle(toggle);
    onToggleChange?.(toggle);
  };

  const currentData = radarToggle === "core" ? radarData : radarDataPO;
  const fontSize = radarToggle === "po" ? 10 : 12;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800">종합 현황 레이더</h3>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        <ToggleButton
          active={radarToggle === "core"}
          onClick={() => handleToggle("core")}
        >
          S·T·A·R 핵심역량
        </ToggleButton>
        <ToggleButton
          active={radarToggle === "po"}
          onClick={() => handleToggle("po")}
        >
          하위역량(PO)
        </ToggleButton>
      </div>

      {/* Radar Chart */}
      <div style={{ width: "100%", height: "280px" }}>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={currentData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize, fill: "#374151" }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
              axisLine={false}
            />
            <Radar
              name="내 점수"
              dataKey="myScore"
              stroke="#FFA500"
              fill="#FFA500"
              fillOpacity={0.15}
              strokeWidth={2}
            />
            <Radar
              name="학과 평균"
              dataKey="deptAvg"
              stroke="#FF6B35"
              fill="none"
              strokeWidth={2}
            />
            <Radar
              name="전체 평균"
              dataKey="totalAvg"
              stroke="#C13584"
              fill="none"
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <ChartLegend />
    </div>
  );
}

// ========== Sub Components ==========

interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function ToggleButton({ active, onClick, children }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
        active
          ? "bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white shadow-md"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

function ChartLegend() {
  const legends = [
    { color: "#FFA500", label: "내 점수" },
    { color: "#FF6B35", label: "학과 평균" },
    { color: "#C13584", label: "전체 평균" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 mt-2">
      {legends.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs text-gray-600">{label}</span>
        </div>
      ))}
    </div>
  );
}
