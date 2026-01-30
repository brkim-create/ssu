"use client";

import { ReactNode } from "react";

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  rightContent?: ReactNode;
}

/**
 * SectionHeader - 섹션 헤더 공통 컴포넌트
 *
 * admin 대시보드 섹션들의 헤더 패턴 공통화
 */
export default function SectionHeader({
  icon,
  title,
  subtitle,
  rightContent,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-3 justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-bold text-sm text-gray-900">{title}</h3>
        {subtitle && (
          <span className="text-xs text-gray-600">| {subtitle}</span>
        )}
      </div>
      {rightContent}
    </div>
  );
}
