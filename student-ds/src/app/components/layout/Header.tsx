import React from "react";
import { Bell, Share2, Search } from "lucide-react";
import logoImage from "../../../assets/logo.png";

interface HeaderProps {
  onShareClick: () => void;
  onSearchClick: () => void;
  onBellClick?: () => void;
  title?: string;
  subtitle?: string;
  /** 헤더 영역에 추가할 커스텀 콘텐츠 (예: 통계 카드, 환영 메시지 등) */
  children?: React.ReactNode;
  /** 헤더 그라데이션 영역의 추가 padding (예: MyPage의 pb-16) */
  extraPadding?: string;
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
  onShareClick,
  onSearchClick,
  onBellClick,
  title,
  subtitle,
  children,
  extraPadding = "",
}: HeaderProps) {
  return (
    <div className={`bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4 ${extraPadding}`}>
      {/* Top Bar: Logo + Action Buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
          <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onShareClick}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <Share2 className="w-6 h-6" />
          </button>
          <button
            onClick={onSearchClick}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <Search className="w-6 h-6" />
          </button>
          <button
            onClick={onBellClick}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <Bell className="w-6 h-6" />
          </button>
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
