"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  FileText,
  LogOut,
  ChevronRight,
  Download,
  Bell,
  Share2,
  Search,
} from "lucide-react";
import DownloadModal from "../_components/modals/mypage/DownloadModal";
import ComplaintListModal from "../_components/modals/mypage/ComplaintListModal";
import LoginInfoModal from "../_components/modals/mypage/LoginInfoModal";
import NotificationSettingsModal from "../_components/modals/mypage/NotificationSettingsModal";
import ComplaintDetailModal from "../_components/modals/complaints/ComplaintDetailModal";
import RatingModal from "../_components/modals/complaints/RatingModal";
import SearchModal from "../_components/modals/global/SearchModal";
import ShareModal from "../_components/modals/global/ShareModal";
import {
  complaints,
  CURRENT_STUDENT_ID,
  Complaint,
  loginHistory,
  userProfile,
  currentStudentProfile,
} from "@/data/mockData";
import { clearAuthTokens, checkAutoLogin, AuthTokens } from "@/utils/auth";

/**
 * MyPagePage - 마이페이지
 */
export default function MyPagePage() {
  const router = useRouter();

  // 인증 상태
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);

  // Modal 상태
  const [showComplaintListModal, setShowComplaintListModal] = useState(false);
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showLoginInfoModal, setShowLoginInfoModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // 평가 모달 상태
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingComplaintId, setRatingComplaintId] = useState<number | null>(null);
  const [complaintRatings, setComplaintRatings] = useState<Record<number, number>>({});

  // 민원 상세보기 모달 상태
  const [complaintDetailModal, setComplaintDetailModal] = useState<Complaint | null>(null);

  // 자동 로그인 체크
  useEffect(() => {
    const tokens = checkAutoLogin();
    if (tokens) {
      setAuthTokens(tokens);
    }
  }, []);

  // 현재 사용자의 민원만 필터링
  const myComplaints = complaints.filter(
    (c) => c.studentId === CURRENT_STUDENT_ID
  );

  // 평가하기 버튼 클릭
  const handleRateComplaint = (complaintId: number) => {
    setRatingComplaintId(complaintId);
    setShowRatingModal(true);
  };

  // 만족도 평가 제출
  const handleRatingSubmit = (rating: number) => {
    if (ratingComplaintId && rating > 0) {
      setComplaintRatings({ ...complaintRatings, [ratingComplaintId]: rating });
      setShowRatingModal(false);
      setRatingComplaintId(null);
    }
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    clearAuthTokens();
    setAuthTokens(null);
    router.push("/login");
  };

  return (
    <div className="pb-4">
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4 pb-16">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              onClick={() => router.push("/notification")}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
        <h2 className="font-bold text-xl">마이페이지</h2>
      </div>

      {/* 프로필 카드 */}
      <div className="mx-4 -mt-10 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {authTokens?.userName?.[0] || "학"}
          </div>
          <div>
            <p className="font-bold text-lg">
              {authTokens?.userName || "사용자"}
            </p>
            <p className="text-gray-500 text-sm">
              {authTokens?.userType === "student"
                ? `${currentStudentProfile.department} ${currentStudentProfile.grade}`
                : authTokens?.userType === "professor"
                  ? `${currentStudentProfile.department} 교수`
                  : authTokens?.userType === "admin"
                    ? "시스템 관리자"
                    : currentStudentProfile.department}
            </p>
            <p className="text-gray-400 text-xs">
              {authTokens?.userId || currentStudentProfile.studentId}
            </p>
          </div>
        </div>
      </div>

      {/* 메뉴 */}
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

      <button
        onClick={handleLogout}
        className="mx-4 mt-4 w-[calc(100%-2rem)] py-3 text-red-500 hover:text-red-600 transition-all flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        로그아웃
      </button>

      {/* Modals */}
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />

      {/* 로그인 정보 모달 */}
      <LoginInfoModal
        isOpen={showLoginInfoModal}
        onClose={() => setShowLoginInfoModal(false)}
        authTokens={authTokens}
        userProfile={userProfile}
        loginHistory={loginHistory}
      />

      {/* 공유 모달 */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      {/* 검색 모달 */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />

      {/* 알림 설정 모달 */}
      <NotificationSettingsModal
        isOpen={showNotificationSettingsModal}
        onClose={() => setShowNotificationSettingsModal(false)}
        userEmail={userProfile.email}
      />

      {/* 평가 모달 */}
      <RatingModal
        isOpen={showRatingModal}
        onSubmit={(rating) => handleRatingSubmit(rating)}
        onCancel={() => {
          setShowRatingModal(false);
          setRatingComplaintId(null);
        }}
      />

      {/* 민원 리스트 모달 */}
      <ComplaintListModal
        isOpen={showComplaintListModal}
        onClose={() => setShowComplaintListModal(false)}
        complaints={myComplaints}
        onOpenDownloadModal={() => setShowDownloadModal(true)}
        onOpenRatingModal={handleRateComplaint}
        ratedComplaints={complaintRatings}
        onOpenDetail={(complaint) => {
          setComplaintDetailModal(complaint);
          setShowComplaintListModal(false);
        }}
      />

      {/* 민원 상세보기 모달 */}
      <ComplaintDetailModal
        complaint={complaintDetailModal}
        complaintRatings={complaintRatings}
        onClose={() => setComplaintDetailModal(null)}
        onRate={handleRateComplaint}
        onBack={() => setShowComplaintListModal(true)}
      />
    </div>
  );
}
