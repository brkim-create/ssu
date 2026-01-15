import { useState } from "react";
import {
  FileText,
  User,
  Settings,
  Download,
  ChevronRight,
  LogOut,
} from "lucide-react";
import Header from "../layout/Header";
import { AuthTokens } from "../../utils/auth";
import { Complaint } from "../../../data/mockData";

// Modals
import NotificationSettingsModal from "../modals/mypage/NotificationSettingsModal";
import LoginInfoModal from "../modals/mypage/LoginInfoModal";
import DownloadModal from "../modals/mypage/DownloadModal";
import ComplaintListModal from "../modals/mypage/ComplaintListModal";

interface MyPageScreenProps {
  authTokens: AuthTokens | null;
  onShareClick: () => void;
  onSearchClick: () => void;
  onLogout: () => void;
  complaints: Complaint[];
  onComplaintClick: (complaint: Complaint) => void;
  onRateComplaint: (complaintId: number) => void;
  complaintReadStatus: { [key: number]: boolean };
  complaintRatings: { [key: number]: number };
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
  onLogout,
  complaints,
  onComplaintClick,
  onRateComplaint,
  complaintReadStatus,
  complaintRatings,
}: MyPageScreenProps) {
  // Local Modal States
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] = useState(false);
  const [showLoginInfoModal, setShowLoginInfoModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showComplaintListModal, setShowComplaintListModal] = useState(false);

  // Notification Channels State
  const [notificationChannels, setNotificationChannels] = useState({
    pwa: true,
    kakao: false,
    email: true,
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
            <span>민원 이력 다운로드</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button
          onClick={() => setShowComplaintListModal(true)}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <span>내가 쓴 민원 전체보기</span>
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

      {/* Modals */}
      <NotificationSettingsModal
        isOpen={showNotificationSettingsModal}
        onClose={() => setShowNotificationSettingsModal(false)}
        channels={notificationChannels}
        onChannelsChange={setNotificationChannels}
      />

      <LoginInfoModal
        isOpen={showLoginInfoModal}
        onClose={() => setShowLoginInfoModal(false)}
        authTokens={authTokens}
      />

      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />

      <ComplaintListModal
        isOpen={showComplaintListModal}
        onClose={() => setShowComplaintListModal(false)}
        complaints={complaints}
        onComplaintClick={onComplaintClick}
        onRateComplaint={onRateComplaint}
        complaintReadStatus={complaintReadStatus}
        complaintRatings={complaintRatings}
      />
    </div>
  );
}
