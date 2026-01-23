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

/**
 * AdminLineChart - 학년별 역량 성장 추이 차트
 *
 * SSR 문제 방지를 위해 별도 컴포넌트로 분리
 */
export default function AdminLineChart({ data }: AdminLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="grade" />
        <YAxis domain={[50, 90]} />
        <Tooltip />
        <Line type="monotone" dataKey="S" stroke={competencyColors.S} />
        <Line type="monotone" dataKey="T" stroke={competencyColors.T} />
        <Line type="monotone" dataKey="A" stroke={competencyColors.A} />
        <Line type="monotone" dataKey="R" stroke={competencyColors.R} />
      </LineChart>
    </ResponsiveContainer>
  );
}
