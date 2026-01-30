// ============================================================
// SSU Dashboard - Color Palette
// 공통 색상 팔레트
// ============================================================

// 브랜드 색상
export const brandColors = {
  primary: '#E94E3C',
  secondary: '#F7941D',
  accent: '#C13584',
  gradient: {
    from: 'from-red-500',
    via: 'via-pink-500',
    to: 'to-orange-400',
    full: 'bg-gradient-to-r from-red-500 via-pink-500 to-orange-400',
  },
} as const;

// 기본 색상 (hex)
export const colors = {
  red: '#E94E3C',
  orange: '#F7941D',
  yellow: '#FAAF40',
  pink: '#C13584',
  purple: '#5B51D8',
  blue: '#4A90E2',
  green: '#10B981',
  gray: '#6B7280',
} as const;
