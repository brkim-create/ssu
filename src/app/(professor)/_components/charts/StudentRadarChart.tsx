"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface StudentRadarChartProps {
  data: Array<{
    subject: string;
    score: number;
    fullMark: number;
  }>;
}

/**
 * StudentRadarChart - 학생 역량 레이더 차트
 * recharts SSR 문제 방지를 위해 별도 컴포넌트로 분리
 */
export default function StudentRadarChart({ data }: StudentRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 14, fontWeight: "bold" }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
        <Radar
          dataKey="score"
          stroke="#F7941D"
          fill="#F7941D"
          fillOpacity={0.5}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
