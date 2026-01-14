import React, { useState } from "react";
import {
  FileText,
  User,
  Settings,
  Download,
  ChevronRight,
  LogOut,
  X,
  Bell,
  Shield,
} from "lucide-react";
import Header from "../layout/Header";
import { AuthTokens } from "../../utils/auth";

interface MyPageScreenProps {
  authTokens: AuthTokens | null;
  onShareClick: () => void;
  onSearchClick: () => void;
  onShowComplaintList: () => void;
  onLogout: () => void;
}

/**
 * MyPageScreen - 마이페이지 화면
 *
 * 역할:
 * - 사용자 프로필 표시
 * - 설정 메뉴 (알림, 다운로드, 민원내역, 로그인정보)
 * - 로그아웃 버튼
 */
export default function MyPageScreen({
  authTokens,
  onShareClick,
  onSearchClick,
  onShowComplaintList,
  onLogout,
}: MyPageScreenProps) {
  // Local Modal States
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] = useState(false);
  const [showLoginInfoModal, setShowLoginInfoModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    complaintStatus: true,
    competencyAlert: true,
    announcement: false,
    marketing: false,
  });

  return (
    <div className="pb-4">
      <Header
        onShareClick={onShareClick}
        onSearchClick={onSearchClick}
        title="마이페이지"
        extraPadding="pb-16"
      />

      {/* Profile Card */}
      <div className="mx-4 -mt-10 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {authTokens?.userName?.[0] || "김"}
          </div>
          <div>
            <p className="font-bold text-lg">
              {authTokens?.userName || "김수성"}
            </p>
            <p className="text-gray-500 text-sm">
              {authTokens?.userType === "student" ? "컴퓨터공학과 3학년" : "교수"}
            </p>
            <p className="text-gray-400 text-xs">
              {authTokens?.userId || "202012345"}
            </p>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        <button
          onClick={() => setShowNotificationSettingsModal(true)}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <span>알림 설정</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button
          onClick={() => setShowDownloadModal(true)}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-gray-400" />
            <span>민원 내역 다운로드</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button
          onClick={onShowComplaintList}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <span>작성 한 민원 전체보기</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button
          onClick={() => setShowLoginInfoModal(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <span>로그인 정보 (SSO)</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="mx-4 mt-4 w-[calc(100%-2rem)] py-3 text-red-500 hover:text-red-600 transition-all flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        로그아웃
      </button>

      {/* Notification Settings Modal */}
      {showNotificationSettingsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl">알림 설정</h3>
              <button onClick={() => setShowNotificationSettingsModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-pink-500" />
                  <div>
                    <p className="font-medium">민원 처리 상태</p>
                    <p className="text-sm text-gray-500">민원 접수, 처리중, 완료 알림</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.complaintStatus}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        complaintStatus: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-pink-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium">역량 진단 알림</p>
                    <p className="text-sm text-gray-500">역량 점수 변동, 진단 시작 알림</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.competencyAlert}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        competencyAlert: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-pink-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">공지사항</p>
                    <p className="text-sm text-gray-500">학교 및 학과 공지사항</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.announcement}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        announcement: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-pink-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
            <button
              onClick={() => setShowNotificationSettingsModal(false)}
              className="w-full mt-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
            >
              저장
            </button>
          </div>
        </div>
      )}

      {/* Login Info Modal */}
      {showLoginInfoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl">로그인 정보</h3>
              <button onClick={() => setShowLoginInfoModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">이름</p>
                <p className="font-medium">{authTokens?.userName || "김수성"}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">학번</p>
                <p className="font-medium">{authTokens?.userId || "202012345"}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">소속</p>
                <p className="font-medium">컴퓨터공학과</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">인증 방식</p>
                <p className="font-medium">SSO (Single Sign-On)</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-600">
                  * 로그인 정보는 학교 통합인증 시스템(SSO)과 연동됩니다.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowLoginInfoModal(false)}
              className="w-full mt-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl">민원 내역 다운로드</h3>
              <button onClick={() => setShowDownloadModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                민원 내역을 다운로드할 형식을 선택해주세요.
              </p>
              <button
                onClick={() => {
                  alert("PDF 다운로드를 시작합니다.");
                  setShowDownloadModal(false);
                }}
                className="w-full p-4 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-red-500" />
                  <div className="text-left">
                    <p className="font-medium">PDF 형식</p>
                    <p className="text-sm text-gray-500">인쇄용 문서 형식</p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => {
                  alert("Excel 다운로드를 시작합니다.");
                  setShowDownloadModal(false);
                }}
                className="w-full p-4 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-500" />
                  <div className="text-left">
                    <p className="font-medium">Excel 형식</p>
                    <p className="text-sm text-gray-500">스프레드시트 형식</p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <button
              onClick={() => setShowDownloadModal(false)}
              className="w-full mt-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
