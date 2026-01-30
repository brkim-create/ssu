/**
 * Icon Mapper Utility
 * 문자열 아이콘 이름을 실제 Lucide React 컴포넌트로 변환
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
  type LucideIcon,
} from "lucide-react";

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

export const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || HelpCircle;
};

export default iconMap;
