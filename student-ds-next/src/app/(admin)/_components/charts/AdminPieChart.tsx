"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CategoryStatItem {
  name: string;
  value: number;
  color: string;
}

interface AdminPieChartProps {
  data: CategoryStatItem[];
}

/**
 * AdminPieChart - 카테고리별 민원 파이 차트
 *
 * SSR 문제 방지를 위해 별도 컴포넌트로 분리
 */
export default function AdminPieChart({ data }: AdminPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={40}
          outerRadius={70}
          dataKey="value"
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value, entry) =>
            `${value} (${(entry.payload as unknown as CategoryStatItem).value}건)`
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
