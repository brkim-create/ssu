"use client";

import Image from "next/image";
import { Share2, Search, Bell } from "lucide-react";

interface HeaderProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  onShareClick?: () => void;
  onSearchClick?: () => void;
  onBellClick?: () => void;
}

/**
 * Header - 공통 헤더 컴포넌트
 *
 * 역할:
 * - 로고 및 액션 버튼 (공유, 검색, 알림)
 * - 선택적 제목/부제목
 * - 선택적 커스텀 콘텐츠 (children)
 */
export default function Header({
  children,
  title,
  subtitle,
  onShareClick,
  onSearchClick,
  onBellClick,
}: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
          <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {onShareClick && (
            <button
              onClick={onShareClick}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
              aria-label="공유"
            >
              <Share2 className="w-6 h-6" />
            </button>
          )}
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
              aria-label="검색"
            >
              <Search className="w-6 h-6" />
            </button>
          )}
          {onBellClick && (
            <button
              onClick={onBellClick}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
              aria-label="알림"
            >
              <Bell className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Title & Subtitle */}
      {title && <h2 className="font-bold text-xl">{title}</h2>}
      {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}

      {/* Custom Content */}
      {children}
    </div>
  );
}
