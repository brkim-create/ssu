"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface HistogramChartProps {
  data: Array<{
    range: string;
    students: number;
  }>;
}

/**
 * HistogramChart - 점수 구간별 학생 수 분포 히스토그램
 * recharts SSR 문제 방지를 위해 별도 컴포넌트로 분리
 */
export default function HistogramChart({ data }: HistogramChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: 0, right: 10, top: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="range" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} width={35} />
        <Tooltip />
        <Bar dataKey="students" fill="#F7941D" radius={[8, 8, 0, 0]}>
          <LabelList dataKey="students" position="top" style={{ fontSize: 12, fill: "#374151", fontWeight: "bold" }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
