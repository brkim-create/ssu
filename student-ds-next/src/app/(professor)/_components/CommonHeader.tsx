"use client";

import { useState } from "react";
import Image from "next/image";
import { Share2, Search, Bell } from "lucide-react";
import ShareModal from "./modals/ShareModal";
import SearchModal from "./modals/SearchModal";

interface CommonHeaderProps {
  /** 헤더 타이틀 */
  title: string;
  /** 서브타이틀 */
  subtitle: string;
  /** 추가 컨텐츠 (예: 과목 선택 드롭다운) */
  children?: React.ReactNode;
  /** 알림 개수 (기본: 2) */
  notificationCount?: number;
}

/**
 * CommonHeader - 교수용 공통 헤더 컴포넌트
 *
 * App.tsx 46~86라인 기반
 * - 그라데이션 배경
 * - 로고 + 아이콘 버튼 (공유, 검색, 알림)
 * - 타이틀/서브타이틀
 * - children 슬롯 (과목 드롭다운 등)
 * - 공유/검색 모달 연동
 */
export default function CommonHeader({
  title,
  subtitle,
  children,
  notificationCount = 2,
}: CommonHeaderProps) {
  // 모달 상태
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4">
        {/* 상단 영역: 로고 + 액션 버튼들 */}
        <div className="flex items-center justify-between mb-4">
          {/* 좌측: 로고 */}
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            {/* TODO: shared/assets/logo.png 연결 */}
            <Image
              src="/logo.png"
              alt="Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>

          {/* 우측: 액션 버튼들 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
              aria-label="공유"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
              aria-label="검색"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              className="p-2 hover:bg-white/20 rounded-lg transition-all relative"
              aria-label="알림"
            >
              <Bell className="w-6 h-6" />
              {/* 알림 뱃지 */}
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 타이틀 영역 */}
        <h1 className="font-bold text-xl mb-1">{title}</h1>
        <p className="text-sm opacity-90">{subtitle}</p>

        {/* 추가 컨텐츠 영역 (예: 과목 선택 드롭다운) */}
        {children}
      </header>

      {/* 모달들 */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
    </>
  );
}
