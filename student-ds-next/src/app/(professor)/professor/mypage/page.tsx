"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Share2, Search, Bell, Settings, User, ChevronRight, LogOut, X } from "lucide-react";
import SearchModal from "../../_components/modals/SearchModal";

// mockData imports from shared
import { professorProfile } from "@shared/mockData/data/professor";

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
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] = useState(false);
  const [showLoginInfoModal, setShowLoginInfoModal] = useState(false);

  // 로그아웃 핸들러
  const handleLogout = () => {
    // TODO: 실제 로그아웃 로직 구현
    // localStorage.clear();
    // router.replace("/login");
    alert("로그아웃 기능은 준비 중입니다.");
  };

  return (
    <div className="pb-4">
      {/* 별도 헤더 (프로필 카드 오버랩을 위해 pb-16) */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4 pb-16">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all" aria-label="공유">
              <Share2 className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
              aria-label="검색"
            >
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all relative" aria-label="알림">
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
            <p className="text-gray-500 text-sm">{professorProfile.department}</p>
            <p className="text-gray-400 text-xs">개설 과목: {professorProfile.courseCount}개</p>
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
        className="mx-4 mt-4 w-[calc(100%-2rem)] py-3 text-gray-500 text-sm flex items-center justify-center gap-2 hover:text-gray-700 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        로그아웃
      </button>

      {/* 알림 설정 모달 */}
      {showNotificationSettingsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">알림 설정</h3>
              <button
                onClick={() => setShowNotificationSettingsModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-gray-700">PWA 푸시 알림</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-pink-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-700">카카오톡 알림</span>
                <input type="checkbox" className="w-5 h-5 accent-pink-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-700">이메일 알림</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-pink-500" />
              </label>
            </div>
            <button
              onClick={() => setShowNotificationSettingsModal(false)}
              className="w-full mt-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold"
            >
              저장
            </button>
          </div>
        </div>
      )}

      {/* 로그인 정보 모달 */}
      {showLoginInfoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">로그인 정보</h3>
              <button
                onClick={() => setShowLoginInfoModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">이름</p>
                <p className="font-medium text-gray-800">{professorProfile.name}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">소속</p>
                <p className="font-medium text-gray-800">{professorProfile.department}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">인증 방식</p>
                <p className="font-medium text-gray-800">SSO (Single Sign-On)</p>
              </div>
            </div>
            <button
              onClick={() => setShowLoginInfoModal(false)}
              className="w-full mt-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 검색 모달 */}
      <SearchModal isOpen={showSearchModal} onClose={() => setShowSearchModal(false)} />
    </div>
  );
}
