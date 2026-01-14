import React, { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Home,
  FileText,
  Bell,
  User,
  Plus,
  ChevronRight,
  ChevronDown,
  X,
  Search,
  Settings,
  Download,
  Trophy,
  Star,
  Check,
  TrendingUp,
  Share2,
  LogOut,
} from "lucide-react";
import Login from "./Login";
import { checkAutoLogin, clearAuthTokens, AuthTokens } from "./utils/auth";
import ChatModal from "./components/chatbot/ChatModal";
import StatsOverview from "./components/dashboard/StatsOverview";
import ComplaintList from "./components/dashboard/ComplaintList";
import WriteComplaintModal from "./components/dashboard/WriteComplaintModal";
import {
  radarData,
  radarDataPO,
  starDetails,
  poDetails,
  complaintCategories,
  complaints,
  notifications,
  faqData,
  evidenceData,
} from "../data/mockData";

import logoImage from "../assets/logo.png";

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
  const [radarToggle, setRadarToggle] = useState<"core" | "po">("core");

  // ============================================================
  // Modal States
  // ============================================================
  const [selectedStar, setSelectedStar] = useState<string | null>(null);
  const [selectedPO, setSelectedPO] = useState<string | null>(null);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [showComplaintListModal, setShowComplaintListModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] = useState(false);
  const [showLoginInfoModal, setShowLoginInfoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  // ============================================================
  // Filter States
  // ============================================================
  const [evidenceFilter, setEvidenceFilter] = useState<string>("전체");
  const [evidenceSort, setEvidenceSort] = useState<string>("최신순");
  const [complaintStatusFilter, setComplaintStatusFilter] = useState<string>("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [periodFilter, setPeriodFilter] = useState("전체");
  const [downloadPeriod, setDownloadPeriod] = useState("전체");
  const [downloadFormat, setDownloadFormat] = useState("PDF");

  // ============================================================
  // Success Modal State
  // ============================================================
  const [successMessage, setSuccessMessage] = useState("");
  const [successType, setSuccessType] = useState<"complete" | "submit">("complete");

  // ============================================================
  // Notification Settings
  // ============================================================
  const [notificationChannels, setNotificationChannels] = useState({
    pwa: true,
    kakao: false,
    email: true,
  });

  // ============================================================
  // Complaint Rating State
  // ============================================================
  const [complaintReadStatus, setComplaintReadStatus] = useState<{ [key: number]: boolean }>({});
  const [complaintRatedStatus, setComplaintRatedStatus] = useState<{ [key: number]: boolean }>({});
  const [complaintRatings, setComplaintRatings] = useState<{ [key: number]: number }>({});
  const [ratingComplaintId, setRatingComplaintId] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState("");
  const [complaintDetailModal, setComplaintDetailModal] = useState<any>(null);

  // ============================================================
  // ChatModal State
  // ============================================================
  const [showChatModal, setShowChatModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");

  // ============================================================
  // Computed Values
  // ============================================================
  const complaintStats = {
    접수: complaints.filter((c) => c.status === "접수").length,
    처리중: complaints.filter((c) => c.status === "처리중").length,
    완료: complaints.filter((c) => c.status === "완료").length,
  };
  const completionRate = Math.round((complaintStats.완료 / complaints.length) * 100);

  // ============================================================
  // Grade Badge Config
  // ============================================================
  const gradeBadge: Record<string, { bg: string; icon: React.ReactNode }> = {
    최우수: { bg: "bg-[#FAAF40]", icon: <Trophy className="w-3 h-3" /> },
    우수: { bg: "bg-[#EE3E42]", icon: <Star className="w-3 h-3" /> },
    보통: { bg: "bg-[#e2e8f0]", icon: <Check className="w-3 h-3" /> },
    미흡: { bg: "bg-[#C5006F]", icon: <TrendingUp className="w-3 h-3" /> },
  };

  // ============================================================
  // Event Handlers
  // ============================================================
  const handleCloseComplaintListModal = () => {
    setShowComplaintListModal(false);
    setSearchKeyword("");
    setPeriodFilter("전체");
  };

  const handleRateComplaint = (complaintId: number) => {
    setRatingComplaintId(complaintId);
    setShowRatingModal(true);
  };

  const handleRatingSubmit = () => {
    if (ratingComplaintId && selectedRating > 0) {
      setComplaintRatedStatus({ ...complaintRatedStatus, [ratingComplaintId]: true });
      setComplaintRatings({ ...complaintRatings, [ratingComplaintId]: selectedRating });
      setShowRatingModal(false);
      setShowComplaintListModal(false);
      setRatingComplaintId(null);
      setSelectedRating(0);
      setRatingComment("");
      alert("평가를 등록해주셔서 감사합니다!");
    }
  };

  const handleCategoryClick = (cat: any) => {
    setSelectedCategory(cat);
    setCurrentCategory(cat.name);
    setShowChatModal(true);
  };

  const handleStatClick = (status: string) => {
    setComplaintStatusFilter(status);
    setShowComplaintListModal(true);
  };

  const handleComplaintSubmit = (data: any) => {
    alert(
      `민원이 접수되었습니다!\n\n카테고리: ${data.category.name}\n제목: ${data.title}\n내용: ${data.content}\n첨부파일: ${data.files.length}개`
    );
  };

  // ============================================================
  // Home Screen Component
  // ============================================================
  const HomeScreen = () => (
    <div className="pb-4">
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4 rounded-[0px]">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowShareModal(true)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Share2 className="w-6 h-6" />
            </button>
            <button onClick={() => setShowSearchModal(true)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mt-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm opacity-90">환영합니다</p>
              <p className="font-bold text-lg text-[24px]">김수성 님</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">핵심 역량 점수</p>
              <div className="flex items-end gap-2 justify-end">
                <span className="text-4xl font-bold text-[32px]">81.3</span>
                <span className="text-lg mb-1 text-[16px]">/ 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Radar Chart Section */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">핵심 역량 진단</h3>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setRadarToggle("core")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              radarToggle === "core"
                ? "bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            S·T·A·R 핵심역량
          </button>
          <button
            onClick={() => setRadarToggle("po")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              radarToggle === "po"
                ? "bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            전공능력(PO)
          </button>
        </div>

        <div style={{ width: "100%", height: "280px" }}>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarToggle === "core" ? radarData : radarDataPO}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: radarToggle === "po" ? 10 : 12, fill: "#374151" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} />
              <Radar name="내 점수" dataKey="myScore" stroke="#FFA500" fill="#FFA500" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="학과 평균" dataKey="deptAvg" stroke="#FF6B35" fill="none" strokeWidth={2} />
              <Radar name="전체 평균" dataKey="totalAvg" stroke="#C13584" fill="none" strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFA500]"></div>
            <span className="text-xs text-gray-600">내 점수</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]"></div>
            <span className="text-xs text-gray-600">학과 평균</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C13584]"></div>
            <span className="text-xs text-gray-600">전체 평균</span>
          </div>
        </div>
      </div>

      {/* Skill Detail Cards */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">역량 상세</h3>
        {radarToggle === "core" ? (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(starDetails).map(([key, value]) => (
              <div
                key={key}
                onClick={() => setSelectedStar(key)}
                className="bg-gray-50 rounded-2xl shadow p-4 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="w-10 h-10 flex items-center justify-center font-bold text-2xl" style={{ color: "#0f172a" }}>
                      {key}
                    </div>
                    <p className="text-sm text-gray-600">{value.name}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-2xl font-bold" style={{ color: "#0f172a" }}>{value.score}점</p>
                    <div className={`${gradeBadge[value.grade].bg} ${value.grade === "보통" ? "text-[#0f172a]" : "text-white"} text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 whitespace-nowrap`}>
                      <span>{gradeBadge[value.grade].icon}</span>
                      <span className="text-[12px]">{value.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(poDetails).map(([key, value]) => (
              <div
                key={key}
                onClick={() => setSelectedPO(key)}
                className="bg-gray-50 rounded-xl shadow p-3 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: `${value.color}20`, color: value.color }}>
                      {value.category}
                    </div>
                    <p className="text-sm font-medium text-gray-800">{value.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-gray-800">{value.score}점</p>
                    <div className={`${gradeBadge[value.grade].bg} ${value.grade === "보통" ? "text-[#0f172a]" : "text-white"} text-[10px] px-2 py-1.5 rounded-full inline-flex items-center justify-center gap-1 whitespace-nowrap min-w-[60px]`}>
                      <span>{gradeBadge[value.grade].icon}</span>
                      <span className="text-[11px]">{value.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Evidence Section */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Evidence 활동 내역</h3>
          <button onClick={() => setShowEvidenceModal(true)} className="text-sm text-pink-500 font-medium">
            전체 보기
          </button>
        </div>
        <div className="space-y-2">
          {evidenceData.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: starDetails[item.competency as keyof typeof starDetails].color }}
                >
                  {item.competency}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{item.course}</p>
                  <p className="text-xs text-gray-500">{item.task}</p>
                </div>
              </div>
              <span className="font-bold text-green-600">{item.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Star Detail Modal */}
      {selectedStar && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: starDetails[selectedStar as keyof typeof starDetails].color }}>
                  {selectedStar}
                </div>
                <div>
                  <h3 className="font-bold text-xl">{starDetails[selectedStar as keyof typeof starDetails].name} 역량</h3>
                  <p className="text-gray-500">역량 상세 분석</p>
                </div>
              </div>
              <button onClick={() => setSelectedStar(null)} className="p-2">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              {starDetails[selectedStar as keyof typeof starDetails].skills.map((skill, idx) => {
                const progress = Math.floor(Math.random() * 40) + 60;
                return (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{skill}</span>
                      <span className="font-bold" style={{ color: starDetails[selectedStar as keyof typeof starDetails].color }}>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${progress}%`, backgroundColor: starDetails[selectedStar as keyof typeof starDetails].color }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PO Detail Modal */}
      {selectedPO && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: `${poDetails[selectedPO as keyof typeof poDetails].color}20`, color: poDetails[selectedPO as keyof typeof poDetails].color }}>
                  {poDetails[selectedPO as keyof typeof poDetails].category}
                </div>
                <div>
                  <h3 className="font-bold text-xl">{poDetails[selectedPO as keyof typeof poDetails].name}</h3>
                  <p className="text-gray-500">역량 상세 분석</p>
                </div>
              </div>
              <button onClick={() => setSelectedPO(null)} className="p-2">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              {poDetails[selectedPO as keyof typeof poDetails].skills.map((skill, idx) => {
                const progress = Math.floor(Math.random() * 40) + 60;
                return (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{skill}</span>
                      <span className="font-bold" style={{ color: poDetails[selectedPO as keyof typeof poDetails].color }}>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${progress}%`, backgroundColor: poDetails[selectedPO as keyof typeof poDetails].color }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ============================================================
  // Complaint Screen Component (Refactored)
  // ============================================================
  const ComplaintScreen = () => (
    <div className="pb-4">
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowShareModal(true)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Share2 className="w-6 h-6" />
            </button>
            <button onClick={() => setShowSearchModal(true)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
        <h2 className="font-bold text-xl">민원 센터</h2>
        <p className="text-sm opacity-90 mb-3">문제가 있다면 알려주세요.</p>

        <StatsOverview
          stats={complaintStats}
          completionRate={completionRate}
          onStatClick={handleStatClick}
        />
      </div>

      <ComplaintList
        categories={complaintCategories}
        complaints={complaints}
        onCategoryClick={handleCategoryClick}
        showListModal={showComplaintListModal}
        onCloseListModal={handleCloseComplaintListModal}
        statusFilter={complaintStatusFilter}
        onStatusFilterChange={setComplaintStatusFilter}
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        periodFilter={periodFilter}
        onPeriodFilterChange={setPeriodFilter}
        onComplaintClick={(complaint) => setComplaintDetailModal(complaint)}
        onRateComplaint={handleRateComplaint}
        complaintReadStatus={complaintReadStatus}
        complaintRatedStatus={complaintRatedStatus}
        complaintRatings={complaintRatings}
      />

      <WriteComplaintModal
        isOpen={showComplaintModal}
        category={selectedCategory}
        onClose={() => {
          setShowComplaintModal(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleComplaintSubmit}
      />

      {/* Floating Action Button */}
      <button
        onClick={() => {
          setSelectedCategory(complaintCategories[0]);
          setShowComplaintModal(true);
        }}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg flex items-center justify-center text-white z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* FAQ Modal */}
      {showFAQ && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">자주 묻는 질문</h3>
              <button onClick={() => setShowFAQ(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-2">
              {faqData.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedFAQ === faq.id ? "rotate-180" : ""}`} />
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-4 pb-4 text-gray-600 text-sm bg-gray-50">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ============================================================
  // Notification Screen Component
  // ============================================================
  const NotificationScreen = () => (
    <div className="pb-4">
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowShareModal(true)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Share2 className="w-6 h-6" />
            </button>
            <button onClick={() => setShowSearchModal(true)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
        <h2 className="font-bold text-xl">알림</h2>
        <p className="text-sm opacity-90">주요 소식을 확인하세요</p>
      </div>

      <div className="mx-4 mt-4 space-y-3">
        {notifications.map((notif) => (
          <div key={notif.id} className={`bg-white rounded-2xl shadow p-4 ${!notif.read ? "border-l-4 border-pink-500" : ""}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notif.read ? "bg-pink-100" : "bg-gray-100"}`}>
                  <Bell className={`w-5 h-5 ${!notif.read ? "text-pink-500" : "text-gray-400"}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{notif.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                </div>
              </div>
              {!notif.read && <div className="w-2 h-2 bg-pink-500 rounded-full"></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================================
  // MyPage Screen Component
  // ============================================================
  const MyPageScreen = () => (
    <div className="pb-4">
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4 pb-16">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowShareModal(true)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Share2 className="w-6 h-6" />
            </button>
            <button onClick={() => setShowSearchModal(true)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
        <h2 className="font-bold text-xl">마이페이지</h2>
      </div>

      <div className="mx-4 -mt-10 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {authTokens?.userName?.[0] || "김"}
          </div>
          <div>
            <p className="font-bold text-lg">{authTokens?.userName || "김수성"}</p>
            <p className="text-gray-500 text-sm">{authTokens?.userType === "student" ? "컴퓨터공학과 3학년" : "교수"}</p>
            <p className="text-gray-400 text-xs">{authTokens?.userId || "202012345"}</p>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        <button onClick={() => setShowNotificationSettingsModal(true)} className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <span>알림 설정</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button onClick={() => setShowDownloadModal(true)} className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-gray-400" />
            <span>민원 내역 다운로드</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button onClick={() => { setComplaintStatusFilter("전체"); setShowComplaintListModal(true); }} className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <span>작성 한 민원 전체보기</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button onClick={() => setShowLoginInfoModal(true)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <span>로그인 정보 (SSO)</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <button onClick={handleLogout} className="mx-4 mt-4 w-[calc(100%-2rem)] py-3 text-red-500 hover:text-red-600 transition-all flex items-center justify-center gap-2">
        <LogOut className="w-5 h-5" />
        로그아웃
      </button>
    </div>
  );

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
    <div className="min-h-screen bg-gray-100 max-w-md mx-auto relative overflow-hidden">
      <div className="pb-20">
        {activeTab === "home" && <HomeScreen />}
        {activeTab === "complaint" && <ComplaintScreen />}
        {activeTab === "notification" && <NotificationScreen />}
        {activeTab === "mypage" && <MyPageScreen />}
      </div>

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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {[
            { id: "home", icon: Home, label: "홈" },
            { id: "complaint", icon: FileText, label: "민원" },
            { id: "notification", icon: Bell, label: "알림", badge: 2 },
            { id: "mypage", icon: User, label: "MY" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-4 relative ${activeTab === tab.id ? "text-pink-500" : "text-gray-400"}`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{tab.label}</span>
              {tab.badge && (
                <div className="absolute -top-1 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">{tab.badge}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
