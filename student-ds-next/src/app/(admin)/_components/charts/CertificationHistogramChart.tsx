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

interface CertificationHistogramChartProps {
  data: Array<{
    range: string;
    students: number;
  }>;
}

/**
 * CertificationHistogramChart - 역량 인증 점수 구간별 학생 수 분포 히스토그램
 * professor-ds HistogramChart 기반
 */
export default function CertificationHistogramChart({ data }: CertificationHistogramChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="range" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} width={35} />
        <Tooltip
          formatter={(value: number) => [`${value}명`, '학생 수']}
          labelFormatter={(label) => `점수 구간: ${label}점`}
        />
        <Bar dataKey="students" fill="#C13584" radius={[6, 6, 0, 0]}>
          <LabelList
            dataKey="students"
            position="top"
            style={{ fontSize: 12, fill: "#374151", fontWeight: "bold" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
