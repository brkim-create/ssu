// ============================================================
// SSU Dashboard - Competency Theme
// STAR 역량별 색상 및 스타일
// ============================================================

import { CompetencyType } from '../mockData/types';

// 역량별 색상 (hex)
export const competencyColors: Record<CompetencyType, string> = {
  S: '#E94E3C', // 창의역량 - 빨강
  T: '#F7941D', // 실무역량 - 주황
  A: '#C13584', // 인성역량 - 핑크
  R: '#5B51D8', // 소통역량 - 보라
};

// 역량별 Tailwind 클래스
export const competencyTailwind: Record<CompetencyType, { bg: string; text: string; border: string }> = {
  S: { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500' },
  T: { bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500' },
  A: { bg: 'bg-pink-600', text: 'text-pink-600', border: 'border-pink-600' },
  R: { bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-600' },
};

// 역량별 라벨
export const competencyLabels: Record<CompetencyType, { short: string; full: string }> = {
  S: { short: 'S', full: '창의역량' },
  T: { short: 'T', full: '실무역량' },
  A: { short: 'A', full: '인성역량' },
  R: { short: 'R', full: '소통역량' },
};

// 레이더 차트 색상
export const radarChartColors = {
  myScore: { stroke: '#FFA500', fill: '#FFA500' },
  deptAvg: { stroke: '#FF6B35', fill: 'none' },
  totalAvg: { stroke: '#C13584', fill: 'none' },
} as const;

// 레이더 차트 범례
export const radarLegends = [
  { color: '#FFA500', label: '내 점수' },
  { color: '#FF6B35', label: '학과 평균' },
  { color: '#C13584', label: '전체 평균' },
] as const;

// 하위 역량 배경색 (히트맵 헤더용)
export const subCompetencyBgColors = {
  S: '#FCDED9', // Self-directed 하위역량 (창의적 문제해결, 융복합적사고)
  T: '#FEF0E5', // Teamwork 하위역량 (전문지식, 미래혁신, 리더십)
  A: '#F8E4F1', // Analytical 하위역량 (공동체의식, 자기계발)
  R: '#E8E6FA', // Relational 하위역량 (의사소통, 글로컬 시민)
} as const;

// 하위 역량 라벨
export const subCompetencyLabels = {
  S: ['창의적 문제해결', '융복합적사고'],
  T: ['전문지식', '미래혁신', '리더십'],
  A: ['공동체의식', '자기계발'],
  R: ['의사소통', '글로컬 시민'],
} as const;

// 세부 역량 항목
export const competencyDetailItems = {
  S: ['기획', '실행', '화합', '통섭'],
  T: ['전공지식', '전공기술', '정보화', '신기술활용', '공감', '판단'],
  A: ['사명감', '조직이해', '도전성', '자기학습'],
  R: ['경청', '협상', '외국어', '세계시민'],
} as const;
