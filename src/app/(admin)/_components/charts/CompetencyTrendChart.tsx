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
import { competencyColors } from "@shared/theme";

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
        <Line type="monotone" dataKey="S" stroke={competencyColors.S} strokeWidth={2} name="Self-directed" />
        <Line type="monotone" dataKey="T" stroke={competencyColors.T} strokeWidth={2} name="Teamwork" />
        <Line type="monotone" dataKey="A" stroke={competencyColors.A} strokeWidth={2} name="Analytical" />
        <Line type="monotone" dataKey="R" stroke={competencyColors.R} strokeWidth={2} name="Relational" />
      </LineChart>
    </ResponsiveContainer>
  );
}
