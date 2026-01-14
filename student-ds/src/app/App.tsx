import { useState, useEffect } from "react";
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

// Global Modals
import ShareModal from "./components/modals/global/ShareModal";
import SearchModal from "./components/modals/global/SearchModal";
import SuccessModal from "./components/modals/global/SuccessModal";

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
  // Global Modal States
  // ============================================================
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // ChatModal State
  const [showChatModal, setShowChatModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");

  // Success Modal State
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
  // Main Render
  // ============================================================
  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {/* Screen Content */}
      {activeTab === "home" && (
        <HomeScreen
          authTokens={authTokens}
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

      {/* Global Modals */}
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

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
        type={successType}
      />
    </DashboardLayout>
  );
}
