"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface CompetencyRadarChartProps {
  data: Array<{
    subject: string;
    myScore: number;
    deptAvg: number;
    totalAvg: number;
  }>;
}

/**
 * CompetencyRadarChart - 학생 종합역량 레이더 차트
 * recharts SSR 문제 방지를 위해 별도 컴포넌트로 분리
 */
export default function CompetencyRadarChart({ data }: CompetencyRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#4b5563" }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
        <Radar name="내 점수" dataKey="myScore" stroke="#F7941D" fill="#F7941D" fillOpacity={0.5} strokeWidth={2} />
        <Radar name="학과 평균" dataKey="deptAvg" stroke="#E94E3C" fill="#E94E3C" fillOpacity={0.3} strokeWidth={2} />
        <Radar name="전체 평균" dataKey="totalAvg" stroke="#C13584" fill="#C13584" fillOpacity={0.2} strokeWidth={2} />
        <Legend wrapperStyle={{ fontSize: "11px" }} iconType="circle" />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}
