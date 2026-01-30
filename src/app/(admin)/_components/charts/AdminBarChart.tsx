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
import { barChartColors } from "@shared/theme";

interface SpeedDataItem {
  day: string;
  time: number;
}

interface AdminBarChartProps {
  data: SpeedDataItem[];
}

/**
 * AdminBarChart - 일별 처리 시간 바 차트
 *
 * SSR 문제 방지를 위해 별도 컴포넌트로 분리
 */
export default function AdminBarChart({ data }: AdminBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" height={60} tick={{ dy: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} iconType="circle" />
        <Bar
          dataKey="time"
          name="처리 시간(시간)"
          fill={barChartColors.primary}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
