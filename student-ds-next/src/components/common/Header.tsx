"use client";

import { Share2, Search } from "lucide-react";

interface HeaderProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  onShareClick?: () => void;
  onSearchClick?: () => void;
}

/**
 * Header - 공통 헤더 컴포넌트
 *
 * 각 화면별 커스텀 콘텐츠(children)를 포함할 수 있음
 */
export default function Header({
  children,
  title,
  subtitle,
  onShareClick,
  onSearchClick,
}: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white px-4 py-6 rounded-b-3xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div>
          {title ? (
            <>
              <h1 className="text-xl font-bold">{title}</h1>
              {subtitle && (
                <p className="text-sm opacity-90 mt-1">{subtitle}</p>
              )}
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold">수성대학교</h1>
              <p className="text-sm opacity-90">AI-DX Observer</p>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {onShareClick && (
            <button
              onClick={onShareClick}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="공유"
            >
              <Share2 className="w-5 h-5" />
            </button>
          )}
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="검색"
            >
              <Search className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Custom Content */}
      {children}
    </div>
  );
}
