import { useState, useEffect } from "react";
import { X, Share2, Search } from "lucide-react";
import Login from "./Login";
import { checkAutoLogin, clearAuthTokens, AuthTokens } from "./utils/auth";

// Layout Components
import DashboardLayout from "./components/layout/DashboardLayout";

// Screen Components
import HomeScreen from "./components/screens/HomeScreen";
import ComplaintScreen from "./components/screens/ComplaintScreen";
import NotificationScreen from "./components/screens/NotificationScreen";
import MyPageScreen from "./components/screens/MyPageScreen";

// Global Components
import ChatModal from "./components/chatbot/ChatModal";

export default function StudentDashboard() {
  // ============================================================
  // Authentication State
  // ============================================================
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const tokens = checkAutoLogin();
    setAuthTokens(tokens);
    setIsCheckingAuth(false);
  }, []);

  const handleLoginSuccess = (tokens: AuthTokens) => {
    setAuthTokens(tokens);
  };

  const handleLogout = () => {
    clearAuthTokens();
    setAuthTokens(null);
  };

  // ============================================================
  // Navigation State
  // ============================================================
  const [activeTab, setActiveTab] = useState("home");

  // ============================================================
  // Global Modal States (앱 전역에서 사용되는 모달만)
  // ============================================================
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ChatModal State
  const [showChatModal, setShowChatModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");

  // Success Modal State (ChatModal에서 사용)
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successType, setSuccessType] = useState<"complete" | "submit">("complete");

  // ============================================================
  // Common Handler Functions
  // ============================================================
  const handleShareClick = () => setShowShareModal(true);
  const handleSearchClick = () => setShowSearchModal(true);

  const handleChatOpen = (category: string) => {
    setCurrentCategory(category);
    setShowChatModal(true);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`"${searchQuery}" 검색 결과를 표시합니다.`);
      setShowSearchModal(false);
      setSearchQuery("");
    }
  };

  // ============================================================
  // Loading & Auth Check
  // ============================================================
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!authTokens) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // ============================================================
  // Main Render - Using DashboardLayout
  // ============================================================
  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {/* Screen Content */}
      {activeTab === "home" && (
        <HomeScreen
          onShareClick={handleShareClick}
          onSearchClick={handleSearchClick}
        />
      )}
      {activeTab === "complaint" && (
        <ComplaintScreen
          onShareClick={handleShareClick}
          onSearchClick={handleSearchClick}
          onChatOpen={handleChatOpen}
        />
      )}
      {activeTab === "notification" && (
        <NotificationScreen
          onShareClick={handleShareClick}
          onSearchClick={handleSearchClick}
        />
      )}
      {activeTab === "mypage" && (
        <MyPageScreen
          authTokens={authTokens}
          onShareClick={handleShareClick}
          onSearchClick={handleSearchClick}
          onShowComplaintList={() => setActiveTab("complaint")}
          onLogout={handleLogout}
        />
      )}

      {/* ============================================================ */}
      {/* Global Modals */}
      {/* ============================================================ */}

      {/* ChatModal */}
      <ChatModal
        isOpen={showChatModal}
        onClose={() => {
          setShowChatModal(false);
          setCurrentCategory("");
        }}
        category={currentCategory}
        onSuccess={(message, type) => {
          setSuccessMessage(message);
          setSuccessType(type);
          setShowSuccessModal(true);
        }}
      />

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl">공유하기</h3>
              <button onClick={() => setShowShareModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => {
                  alert("카카오톡으로 공유합니다.");
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <span className="text-xs text-gray-600">카카오톡</span>
              </button>
              <button
                onClick={() => {
                  alert("페이스북으로 공유합니다.");
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">f</span>
                </div>
                <span className="text-xs text-gray-600">페이스북</span>
              </button>
              <button
                onClick={() => {
                  alert("트위터로 공유합니다.");
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 bg-sky-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">𝕏</span>
                </div>
                <span className="text-xs text-gray-600">트위터</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("링크가 복사되었습니다.");
                  setShowShareModal(false);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-xs text-gray-600">링크 복사</span>
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 mx-4 animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">검색</h3>
              <button onClick={() => setShowSearchModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="검색어를 입력하세요..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-500"
                autoFocus
              />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">최근 검색어</p>
              <div className="flex flex-wrap gap-2">
                {["장학금", "휴학", "성적", "수강신청"].map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      setSearchQuery(keyword);
                      handleSearch();
                    }}
                    className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-all"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="w-full mt-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
            >
              검색
            </button>
          </div>
        </div>
      )}

      {/* Success Modal (ChatModal 결과 표시용) */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 mx-4 text-center animate-scale-up">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="font-bold text-xl mb-2">
              {successType === "complete" ? "완료!" : "접수 완료!"}
            </h3>
            <p className="text-gray-600 mb-6">{successMessage}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
