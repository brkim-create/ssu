/**
 * Icon Mapper Utility
 * 문자열 아이콘 이름을 실제 Lucide React 컴포넌트로 변환
 * DB에서 문자열로 저장된 아이콘을 UI에서 렌더링할 때 사용
 */

import {
  Building,
  GraduationCap,
  Heart,
  BookOpen,
  Home,
  FileText,
  Bell,
  User,
  Settings,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  type LucideIcon
} from 'lucide-react';

// 문자열 키와 아이콘 컴포넌트 매핑
const iconMap: Record<string, LucideIcon> = {
  Building,
  GraduationCap,
  Heart,
  BookOpen,
  Home,
  FileText,
  Bell,
  User,
  Settings,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
};

/**
 * 문자열 아이콘 이름을 Lucide 컴포넌트로 변환
 * @param iconName - 아이콘 이름 문자열 (예: "Building", "Heart")
 * @returns Lucide 아이콘 컴포넌트 또는 기본 아이콘
 */
export const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || HelpCircle;
};

export default iconMap;
