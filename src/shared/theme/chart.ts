// ============================================================
// SSU Dashboard - Chart Theme
// 차트 색상 설정
// ============================================================

import { CompetencyType } from '../mockData/types';

// STAR 역량별 라인 차트 색상
export const competencyLineColors: Record<CompetencyType, string> = {
  S: '#E94E3C', // 창의역량
  T: '#F7941D', // 실무역량
  A: '#C13584', // 인성역량
  R: '#5B51D8', // 소통역량
};

// 바 차트 기본 색상
export const barChartColors = {
  primary: '#E94E3C',
  secondary: '#F7941D',
  tertiary: '#C13584',
} as const;

// 레이더 차트 색상
export const radarChartCompareColors = {
  selected: { stroke: '#C13584', fill: '#C13584', fillOpacity: 0.3 },
  average: { stroke: '#9ca3af', fill: '#9ca3af', fillOpacity: 0.3 },
} as const;

// 카카오톡 스타일 채팅 색상
export const chatColors = {
  botMessage: '#FEE500', // 카카오 노란색
  userMessage: '#E5E7EB', // gray-200
  adminMessage: '#3B82F6', // blue-500
} as const;

// 파이 차트 색상 팔레트
export const pieChartPalette = [
  '#E94E3C',
  '#F7941D',
  '#C13584',
  '#5B51D8',
  '#4A90E2',
  '#10B981',
] as const;
