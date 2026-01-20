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
  Star,
} from "lucide-react";
import DownloadModal from "@/components/modals/mypage/DownloadModal";
import ComplaintListModal from "@/components/modals/mypage/ComplaintListModal";
import { complaints, CURRENT_STUDENT_ID } from "@/data/mockData";
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
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [complaintRatings, setComplaintRatings] = useState<Record<number, number>>({});

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
  const handleRatingSubmit = () => {
    if (ratingComplaintId && selectedRating > 0) {
      setComplaintRatings({ ...complaintRatings, [ratingComplaintId]: selectedRating });
      setShowRatingModal(false);
      setRatingComplaintId(null);
      setSelectedRating(0);
      setRatingComment("");
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
                ? "컴퓨터공학과 3학년"
                : "컴퓨터공학과 교수"}
            </p>
            <p className="text-gray-400 text-xs">
              {authTokens?.userId || "202012345"}
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
                    <span className="font-medium text-gray-800">컴퓨터공학과</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">학년</span>
                    <span className="font-medium text-gray-800">
                      {authTokens?.userType === 'student' ? '3학년' : '-'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">이메일</span>
                    <span className="font-medium text-gray-800">school@example.com</span>
                  </div>
                </div>
              </div>

              {/* 로그인 이력 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">최근 로그인 이력</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">2025.01.20 14:32</span>
                    </div>
                    <span className="text-gray-500">Chrome (Windows)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">2025.01.19 09:15</span>
                    </div>
                    <span className="text-gray-500">Safari (iPhone)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">2025.01.18 18:42</span>
                    </div>
                    <span className="text-gray-500">Chrome (Android)</span>
                  </div>
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
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-gray-800">공유하기</h3>
              <button onClick={() => setShowShareModal(false)}>
                <span className="text-2xl text-gray-400">×</span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {["카카오톡", "문자", "이메일", "링크복사"].map((method) => (
                <button
                  key={method}
                  className="flex flex-col items-center gap-2 p-4 hover:bg-gray-50 rounded-xl"
                  onClick={() => {
                    console.log(`Share via ${method}`);
                    setShowShareModal(false);
                  }}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-600">{method}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 검색 모달 */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-gray-800">검색</h3>
              <button onClick={() => setShowSearchModal(false)}>
                <span className="text-2xl text-gray-400">×</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full p-4 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">최근 검색어</p>
              <div className="flex flex-wrap gap-2">
                {["민원", "성적", "장학금"].map((term) => (
                  <span
                    key={term}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
              {/* PWA 푸시 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">PWA 푸시</p>
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
                <p className="text-xs text-gray-500">실시간으로 중요한 알림을 받을 수 있습니다</p>
              </div>

              {/* 카카오톡 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">카카오톡</p>
                      <p className="text-xs text-gray-500">카카오 알림톡</p>
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
                <p className="text-xs text-gray-500">카카오톡으로 알림을 받을 수 있습니다</p>
              </div>

              {/* 이메일 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <Send className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">이메일</p>
                      <p className="text-xs text-gray-500">school@example.com</p>
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
                <p className="text-xs text-gray-500">이메일로 상세한 알림을 받을 수 있습니다</p>
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
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">민원 처리가 완료되었습니다</h3>
              <p className="text-sm text-gray-500">처리 결과에 대해 평가해주세요</p>
            </div>

            {/* 별점 */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3 text-center">만족도를 선택해주세요</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        rating <= selectedRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-center mt-2">
                <span className="text-sm text-gray-500">
                  {selectedRating === 0 && "선택해주세요"}
                  {selectedRating === 1 && "매우 불만족"}
                  {selectedRating === 2 && "불만족"}
                  {selectedRating === 3 && "보통"}
                  {selectedRating === 4 && "만족"}
                  {selectedRating === 5 && "매우 만족"}
                </span>
              </div>
            </div>

            {/* 추가 의견 */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">추가 의견 (선택)</label>
              <textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                placeholder="더 좋은 서비스를 위한 의견을 남겨주세요"
                className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRatingModal(false);
                  setRatingComplaintId(null);
                  setSelectedRating(0);
                  setRatingComment("");
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
              >
                나중에
              </button>
              <button
                onClick={handleRatingSubmit}
                disabled={selectedRating === 0}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  selectedRating === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg"
                }`}
              >
                평가 제출
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 민원 리스트 모달 */}
      <ComplaintListModal
        isOpen={showComplaintListModal}
        onClose={() => setShowComplaintListModal(false)}
        complaints={myComplaints}
        onOpenDownloadModal={() => setShowDownloadModal(true)}
        onOpenRatingModal={handleRateComplaint}
        ratedComplaints={complaintRatings}
      />
    </div>
  );
}
