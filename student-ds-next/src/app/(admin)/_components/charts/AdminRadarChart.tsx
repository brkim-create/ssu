"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { competencyColors } from "@shared/theme";

interface RadarDataItem {
  competency: string;
  선택학과: number;
  전체평균: number;
}

interface AdminRadarChartProps {
  data: RadarDataItem[];
}

/**
 * AdminRadarChart - 관리자 대시보드용 레이더 차트
 *
 * SSR 문제 방지를 위해 별도 컴포넌트로 분리
 */
export default function AdminRadarChart({ data }: AdminRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart
        data={data}
        margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
      >
        <PolarGrid stroke="#d1d5db" />
        <PolarAngleAxis
          dataKey="competency"
          tick={{ fontSize: 11, fill: "#374151", fontWeight: 500 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: "#6b7280" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "12px",
          }}
        />
        <Radar
          name="전체평균"
          dataKey="전체평균"
          stroke="#9ca3af"
          fill="#9ca3af"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Radar
          name="선택학과"
          dataKey="선택학과"
          stroke={competencyColors.A}
          fill={competencyColors.A}
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
