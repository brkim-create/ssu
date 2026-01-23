"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { competencyColors } from "@shared/theme";

interface GradeGrowthItem {
  grade: string;
  S: number;
  T: number;
  A: number;
  R: number;
}

interface AdminLineChartProps {
  data: GradeGrowthItem[];
}

const legendItems = [
  { key: "S", label: "Self-directed", color: competencyColors.S },
  { key: "T", label: "Teamwork", color: competencyColors.T },
  { key: "A", label: "Analytical", color: competencyColors.A },
  { key: "R", label: "Relational", color: competencyColors.R },
];

/**
 * AdminLineChart - 학년별 역량 성장 추이 차트
 *
 * SSR 문제 방지를 위해 별도 컴포넌트로 분리
 */
export default function AdminLineChart({ data }: AdminLineChartProps) {
  return (
    <div style={{ width: "100%", minHeight: "150px" }}>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="grade" tick={{ fontSize: 11 }} />
          <YAxis domain={[50, 90]} tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "12px",
            }}
          />
          <Line type="monotone" dataKey="S" stroke={competencyColors.S} strokeWidth={2} name="Self-directed" />
          <Line type="monotone" dataKey="T" stroke={competencyColors.T} strokeWidth={2} name="Teamwork" />
          <Line type="monotone" dataKey="A" stroke={competencyColors.A} strokeWidth={2} name="Analytical" />
          <Line type="monotone" dataKey="R" stroke={competencyColors.R} strokeWidth={2} name="Relational" />
        </LineChart>
      </ResponsiveContainer>

      {/* 커스텀 범례 */}
      <div className="flex justify-center gap-4 flex-wrap mt-2">
        {legendItems.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-xs" style={{ color: item.color }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
