"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface CompetencyTrendItem {
  year: string;
  S: number;
  T: number;
  A: number;
  R: number;
}

interface Props {
  data: CompetencyTrendItem[];
}

export default function CompetencyTrendChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ left: -10, right: 15, top: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="year" style={{ fontSize: "11px" }} stroke="#6B7280" />
        <YAxis domain={[50, 90]} style={{ fontSize: "11px" }} stroke="#6B7280" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            color: "#111827",
          }}
        />
        <Line type="monotone" dataKey="S" stroke="#E94E3C" strokeWidth={2} name="Self-directed" />
        <Line type="monotone" dataKey="T" stroke="#F7941D" strokeWidth={2} name="Teamwork" />
        <Line type="monotone" dataKey="A" stroke="#C13584" strokeWidth={2} name="Analytical" />
        <Line type="monotone" dataKey="R" stroke="#5B51D8" strokeWidth={2} name="Relational" />
      </LineChart>
    </ResponsiveContainer>
  );
}
