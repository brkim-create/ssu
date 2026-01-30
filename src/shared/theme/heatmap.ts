// ============================================================
// SSU Dashboard - Heatmap Theme
// 히트맵 색상 (10단계 그라데이션)
// ============================================================

// 히트맵 배경색 (점수 범위별)
export const heatmapBgColors: Record<string, string> = {
  '90-100': '#F59E42',
  '80-90': '#F5A857',
  '70-80': '#F4B26C',
  '60-70': '#E5BA93',
  '50-60': '#D6C2BA',
  '40-50': '#C7B8BA',
  '30-40': '#B8AEC1',
  '20-30': '#A199C8',
  '10-20': '#8B8FD0',
  '0-10': '#6D85DE',
};

// 히트맵 색상 배열 (인덱스 기반 접근용)
export const heatmapColorScale = [
  '#6D85DE', // 0-10
  '#8B8FD0', // 10-20
  '#A199C8', // 20-30
  '#B8AEC1', // 30-40
  '#C7B8BA', // 40-50
  '#D6C2BA', // 50-60
  '#E5BA93', // 60-70
  '#F4B26C', // 70-80
  '#F5A857', // 80-90
  '#F59E42', // 90-100
] as const;

// 히트맵 범례 데이터
export const heatmapLegend = [
  { range: '0~10', color: '#6D85DE' },
  { range: '10~20', color: '#8B8FD0' },
  { range: '20~30', color: '#A199C8' },
  { range: '30~40', color: '#B8AEC1' },
  { range: '40~50', color: '#C7B8BA' },
  { range: '50~60', color: '#D6C2BA' },
  { range: '60~70', color: '#E5BA93' },
  { range: '70~80', color: '#F4B26C' },
  { range: '80~90', color: '#F5A857' },
  { range: '90~100', color: '#F59E42' },
] as const;

// 헬퍼 함수: 점수에 따른 히트맵 배경색 반환
export const getHeatmapBgColor = (value: number): string => {
  if (value >= 90) return '#F59E42';
  if (value >= 80) return '#F5A857';
  if (value >= 70) return '#F4B26C';
  if (value >= 60) return '#E5BA93';
  if (value >= 50) return '#D6C2BA';
  if (value >= 40) return '#C7B8BA';
  if (value >= 30) return '#B8AEC1';
  if (value >= 20) return '#A199C8';
  if (value >= 10) return '#8B8FD0';
  return '#6D85DE';
};

// 헬퍼 함수: 점수에 따른 히트맵 텍스트 색상 반환
export const getHeatmapTextColor = (value: number): string => {
  if (value >= 90) return 'text-gray-900';
  return 'text-white';
};
