"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Share2,
  Search,
  Bell,
  Settings,
  User,
  ChevronRight,
  LogOut,
} from "lucide-react";
import SearchModal from "../../_components/modals/SearchModal";
import ShareModal from "../../_components/modals/ShareModal";
import NotificationModal from "../../_components/modals/NotificationModal";
import NotificationSettingsModal from "../../_components/modals/NotificationSettingsModal";
import ProfessorLoginInfoModal from "../../_components/modals/ProfessorLoginInfoModal";

// mockData imports from shared
import {
  professorProfile,
  loginHistory,
} from "@shared/mockData/data/professor";
import { clearAuthTokens, getAuthTokens } from "@/utils/auth";

/**
 * MyPage Screen
 *
 * URL: /professor/mypage
 * App.tsx 434~469줄 (MyPageScreen) 기반 마이그레이션
 *
 * 특이점: CommonHeader 대신 별도 헤더 사용 (프로필 카드 오버랩 디자인)
 */
export default function ProfessorMyPage() {
  const router = useRouter();
  const authTokens = getAuthTokens();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] =
    useState(false);
  const [showLoginInfoModal, setShowLoginInfoModal] = useState(false);

  // 로그아웃 핸들러
  const handleLogout = () => {
    clearAuthTokens();
    router.push("/login");
  };

  return (
    <div className="pb-4">
      {/* 별도 헤더 (프로필 카드 오버랩을 위해 pb-16) */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4 pb-16">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <Image
              src="/logo.png"
              alt="Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
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
              onClick={() => setShowNotificationModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all relative"
              aria-label="알림"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                2
              </span>
            </button>
          </div>
        </div>
        <h2 className="font-bold text-xl">마이페이지</h2>
      </div>

      {/* 프로필 카드 (헤더 위에 오버랩) */}
      <div className="mx-4 -mt-10 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {professorProfile.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-lg">{professorProfile.name}</p>
            <p className="text-gray-500 text-sm">
              {professorProfile.department}
            </p>
            <p className="text-gray-400 text-xs">
              {authTokens?.userId || professorProfile.employeeId}
            </p>
          </div>
        </div>
      </div>

      {/* 메뉴 목록 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        <button
          onClick={() => setShowNotificationSettingsModal(true)}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">알림 설정</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button
          onClick={() => setShowLoginInfoModal(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">로그인 정보 (SSO)</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* 로그아웃 버튼 */}
      <button
        onClick={handleLogout}
        className="mx-4 mt-4 w-[calc(100%-2rem)] py-3 text-red-500 hover:text-red-600 transition-all flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        로그아웃
      </button>

      {/* 알림 목록 모달 (헤더 Bell 아이콘) */}
      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
      />

      {/* 알림 설정 모달 (메뉴 버튼) */}
      <NotificationSettingsModal
        isOpen={showNotificationSettingsModal}
        onClose={() => setShowNotificationSettingsModal(false)}
      />

      {/* 로그인 정보 모달 */}
      <ProfessorLoginInfoModal
        isOpen={showLoginInfoModal}
        onClose={() => setShowLoginInfoModal(false)}
        professorProfile={professorProfile}
        loginHistory={loginHistory}
      />

      {/* 검색 모달 */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />

      {/* 공유 모달 */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
}
