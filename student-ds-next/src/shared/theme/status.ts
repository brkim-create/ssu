// ============================================================
// SSU Dashboard - Status Theme
// 상태별 색상 및 스타일 (민원, 알림 등)
// ============================================================

import { ComplaintStatus } from '../mockData/types';

// 민원 상태별 배지 스타일 (Tailwind 클래스)
export const complaintStatusBadge: Record<string, string> = {
  접수: 'bg-blue-100 text-blue-700',
  처리중: 'bg-orange-100 text-orange-700',
  완료: 'bg-green-100 text-green-700',
  반려됨: 'bg-red-100 text-red-700',
};

// 민원 상태별 색상 (hex)
export const complaintStatusColors: Record<string, string> = {
  접수: '#3B82F6',    // blue-500
  처리중: '#F97316',  // orange-500
  완료: '#22C55E',    // green-500
  반려됨: '#EF4444',  // red-500
};

// 신호등 색상 (위험도)
export const trafficLightColors: Record<string, string> = {
  danger: '#EF4444',  // red-500
  warning: '#F59E0B', // amber-500
  safe: '#10B981',    // emerald-500
};

// 신호등 Tailwind 클래스
export const trafficLightTailwind: Record<string, { bg: string; text: string }> = {
  danger: { bg: 'bg-red-500', text: 'text-red-500' },
  warning: { bg: 'bg-amber-500', text: 'text-amber-500' },
  safe: { bg: 'bg-emerald-500', text: 'text-emerald-500' },
};

// 우선순위 배지 스타일
export const priorityBadge: Record<string, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-gray-100 text-gray-700',
};

// 헬퍼 함수: 상태에 따른 배지 클래스 반환
export const getStatusBadgeClass = (status: string): string => {
  return complaintStatusBadge[status] || 'bg-gray-100 text-gray-700';
};
