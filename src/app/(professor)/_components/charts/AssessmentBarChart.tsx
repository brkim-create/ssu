"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AssessmentBarChartProps {
  data: Array<{
    name: string;
    S: number;
    T: number;
    A: number;
    R: number;
  }>;
}

/**
 * AssessmentBarChart - 평가 도구별 분석 차트
 * recharts SSR 문제 방지를 위해 별도 컴포넌트로 분리
 */
export default function AssessmentBarChart({ data }: AssessmentBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} width={35} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: "11px" }} />
        <Bar dataKey="S" fill="#E94E3C" radius={[4, 4, 0, 0]} name="S(창의)" />
        <Bar dataKey="T" fill="#F7941D" radius={[4, 4, 0, 0]} name="T(실무)" />
        <Bar dataKey="A" fill="#C13584" radius={[4, 4, 0, 0]} name="A(인성)" />
        <Bar dataKey="R" fill="#5B51D8" radius={[4, 4, 0, 0]} name="R(소통)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
