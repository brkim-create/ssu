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
  X,
  MessageCircle,
  Send,
  CheckCircle,
  Clock,
} from "lucide-react";
import DownloadModal from "@/components/modals/mypage/DownloadModal";
import ComplaintListModal from "@/components/modals/mypage/ComplaintListModal";
import ComplaintDetailModal from "@/components/modals/complaints/ComplaintDetailModal";
import RatingModal from "@/components/modals/complaints/RatingModal";
import SearchModal from "@/components/modals/global/SearchModal";
import ShareModal from "@/components/modals/global/ShareModal";
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

  // 알림 설정 상태
  const [notificationChannels, setNotificationChannels] = useState({
    pwa: true,
    kakao: false,
    email: true,
  });

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
                : `${currentStudentProfile.department} 교수`}
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
      {showLoginInfoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">로그인 정보</h3>
              <button onClick={() => setShowLoginInfoModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* SSO 연동 상태 */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">SSO 연동 완료</p>
                    <p className="text-xs text-gray-500">통합 인증 시스템</p>
                  </div>
                </div>
              </div>

              {/* 계정 정보 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">계정 정보</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {authTokens?.userType === 'student' ? '학번' : '교번'}
                    </span>
                    <span className="font-medium">{authTokens?.userId || '202012345'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">이름</span>
                    <span className="font-medium">{authTokens?.userName || '사용자'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">사용자 유형</span>
                    <span className="font-medium">
                      {authTokens?.userType === 'student' ? '학생' : '교수'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">자동 로그인</span>
                    <span className="font-medium">
                      {authTokens?.rememberMe ? '사용' : '미사용'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 학적 정보 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">학적 정보</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">학과</span>
                    <span className="font-medium text-gray-800">{userProfile.department}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">학년</span>
                    <span className="font-medium text-gray-800">
                      {authTokens?.userType === 'student' ? userProfile.grade : '-'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">이메일</span>
                    <span className="font-medium text-gray-800">{userProfile.email}</span>
                  </div>
                </div>
              </div>

              {/* 로그인 이력 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">최근 로그인 이력</h4>
                <div className="space-y-2">
                  {loginHistory.map((log, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{log.date} {log.time}</span>
                      </div>
                      <span className="text-gray-500">{log.device}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 보안 설정 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">보안 설정</h4>
                <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all">
                  비밀번호 변경
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-xl">
              <p className="text-xs text-orange-700">
                ⚠️ 의심스러운 로그인 활동이 있다면 즉시 비밀번호를 변경하세요
              </p>
            </div>
          </div>
        </div>
      )}

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
      {showNotificationSettingsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">알림 설정</h3>
              <button onClick={() => setShowNotificationSettingsModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">받고 싶은 알림 채널을 선택하세요</p>

            <div className="space-y-4">
              {/* PWA 푸시 알림 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">PWA 푸시 알림</p>
                      <p className="text-xs text-gray-500">브라우저 알림</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationChannels({...notificationChannels, pwa: !notificationChannels.pwa})}
                    className={`w-12 h-6 rounded-full relative transition-all ${
                      notificationChannels.pwa ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationChannels.pwa ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">앱이 열려있지 않아도 중요한 알림을 받을 수 있습니다</p>
              </div>

              {/* 카카오톡 알림 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">카카오톡 알림</p>
                      <p className="text-xs text-gray-500">카카오톡 연동</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationChannels({...notificationChannels, kakao: !notificationChannels.kakao})}
                    className={`w-12 h-6 rounded-full relative transition-all ${
                      notificationChannels.kakao ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationChannels.kakao ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">카카오톡 알림톡으로 민원 처리 상태를 알려드립니다</p>
              </div>

              {/* 이메일 알림 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Send className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">이메일 알림</p>
                      <p className="text-xs text-gray-500">{userProfile.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationChannels({...notificationChannels, email: !notificationChannels.email})}
                    className={`w-12 h-6 rounded-full relative transition-all ${
                      notificationChannels.email ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationChannels.email ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">자세한 내용은 이메일로 확인할 수 있습니다</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-700">
                💡 알림 채널은 언제든지 변경할 수 있습니다
              </p>
            </div>

            <button
              onClick={() => {
                setShowNotificationSettingsModal(false);
                alert('알림 설정이 저장되었습니다!');
              }}
              className="w-full mt-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold"
            >
              저장하기
            </button>
          </div>
        </div>
      )}

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
