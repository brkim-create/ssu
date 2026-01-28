// ============================================================
// SSU Dashboard - Grade Badge Theme
// 등급별 배지 색상 및 스타일
// ============================================================

import { CompetencyGrade } from '../mockData/types';

// 등급 배지 색상 (hex)
export const gradeColors: Record<string, string> = {
  마스터: '#FAAF40',   // yellow/gold
  우수: '#EE3E42',     // red
  보통: '#E2E8F0',     // slate-200
  노력요망: '#C5006F', // pink/magenta
};

// 등급 배지 Tailwind 클래스
export const gradeBadgeTailwind: Record<string, { bg: string; text: string }> = {
  마스터: { bg: 'bg-[#FAAF40]', text: 'text-white' },
  우수: { bg: 'bg-[#EE3E42]', text: 'text-white' },
  보통: { bg: 'bg-[#e2e8f0]', text: 'text-[#0f172a]' },
  노력요망: { bg: 'bg-[#C5006F]', text: 'text-white' },
};

// 등급별 아이콘 타입 (lucide-react 아이콘명)
export const gradeIconTypes: Record<string, string> = {
  마스터: 'Trophy',
  우수: 'Star',
  보통: 'Check',
  노력요망: 'TrendingUp',
};

// 헬퍼 함수: 등급에 따른 배지 클래스 반환
export const getGradeBadgeClass = (grade: string): { bg: string; text: string } => {
  return gradeBadgeTailwind[grade] || { bg: 'bg-gray-200', text: 'text-gray-700' };
};

// 헬퍼 함수: 점수에 따른 등급 반환
export const getGradeFromScore = (score: number): string => {
  if (score >= 90) return '마스터';
  if (score >= 70) return '우수';
  if (score >= 20) return '보통';
  return '노력요망';
};
