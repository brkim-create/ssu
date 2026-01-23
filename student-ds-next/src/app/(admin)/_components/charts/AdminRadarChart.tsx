"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { radarChartCompareColors } from "@shared/theme";

interface RadarDataItem {
  competency: string;
  선택학과: number;
  전체평균: number;
}

interface AdminRadarChartProps {
  data: RadarDataItem[];
}

/**
 * AdminRadarChart - 관리자 대시보드용 레이더 차트
 *
 * SSR 문제 방지를 위해 별도 컴포넌트로 분리
 */
export default function AdminRadarChart({ data }: AdminRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="competency" />
        <PolarRadiusAxis domain={[0, 100]} />
        <Radar
          name="선택학과"
          dataKey="선택학과"
          stroke={radarChartCompareColors.selected.stroke}
          fill={radarChartCompareColors.selected.fill}
          fillOpacity={radarChartCompareColors.selected.fillOpacity}
        />
        <Radar
          name="전체평균"
          dataKey="전체평균"
          stroke={radarChartCompareColors.average.stroke}
          fill={radarChartCompareColors.average.fill}
          fillOpacity={radarChartCompareColors.average.fillOpacity}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}
