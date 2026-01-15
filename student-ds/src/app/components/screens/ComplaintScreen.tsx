import React, { useState } from "react";
import { Plus, HelpCircle, X, Search, Star, ChevronRight, Download } from "lucide-react";
import Header from "../layout/Header";
import ComplaintList from "../dashboard/ComplaintList";
import WriteComplaintModal from "../dashboard/WriteComplaintModal";
import FAQModal from "../dashboard/FAQModal";
import ChatModal from "../chatbot/ChatModal"; // [추가] 챗봇 모달 import
import {
  complaintCategories,
  complaints,
  faqData,
  ComplaintCategory,
} from "../../../data/mockData";

interface ComplaintScreenProps {
  onShareClick: () => void;
  onSearchClick: () => void;
  onBellClick: () => void;
  onChatOpen: (category: string) => void;
}

const statusColor: Record<string, string> = {
  접수: "bg-blue-100 text-blue-600",
  처리중: "bg-orange-100 text-orange-600",
  완료: "bg-green-100 text-green-600",
};

/**
 * ComplaintScreen - 민원 센터 화면
 *
 * 역할:
 * - 민원 통계 표시 (접수/처리중/완료)
 * - 민원 카테고리 및 목록
 * - 민원 작성 모달
 * - FAQ 모달
 * - 챗봇 상담 연결 (학사/진로 카테고리)
 */
export default function ComplaintScreen({
  onShareClick,
  onSearchClick,
  onBellClick,
  onChatOpen,
}: ComplaintScreenProps) {
  // Modal States
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ComplaintCategory | null>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showComplaintListModal, setShowComplaintListModal] = useState(false);
  const [complaintDetailModal, setComplaintDetailModal] = useState<any>(null);

  // [추가] Chatbot States
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatCategory, setChatCategory] = useState("학사 및 수업");

  // Filter States
  const [complaintStatusFilter, setComplaintStatusFilter] =
    useState<string>("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [periodFilter, setPeriodFilter] = useState("전체");

  // Rating States
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [complaintReadStatus, setComplaintReadStatus] = useState<{
    [key: number]: boolean;
  }>({});
  const [complaintRatedStatus, setComplaintRatedStatus] = useState<{
    [key: number]: boolean;
  }>({});
  const [complaintRatings, setComplaintRatings] = useState<{
    [key: number]: number;
  }>({});
  const [ratingComplaintId, setRatingComplaintId] = useState<number | null>(
    null
  );
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState("");

  // Computed Values
  const complaintStats = {
    접수: complaints.filter((c) => c.status === "접수").length,
    처리중: complaints.filter((c) => c.status === "처리중").length,
    완료: complaints.filter((c) => c.status === "완료").length,
  };
  const completionRate = Math.round(
    (complaintStats.완료 / complaints.length) * 100
  );

  // Handlers
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
      setComplaintRatedStatus({
        ...complaintRatedStatus,
        [ratingComplaintId]: true,
      });
      setComplaintRatings({
        ...complaintRatings,
        [ratingComplaintId]: selectedRating,
      });
      setShowRatingModal(false);
      setShowComplaintListModal(false);
      setRatingComplaintId(null);
      setSelectedRating(0);
      setRatingComment("");
      alert("평가를 등록해주셔서 감사합니다!");
    }
  };

  // [수정] 카테고리 클릭 핸들러: 챗봇 플로우 vs 글쓰기 모달
  const handleCategoryClick = (cat: ComplaintCategory) => {
    // 챗봇으로 연결할 카테고리 목록 (Gemini API + 기존 단계별 플로우 모두 포함)
    const chatEnabledCategories = [
      "학생 장학", // Gemini API
      "수업 및 학사", // Gemini API
      "시설 및 환경", // 기존 단계별 플로우
      "학생 복지", // 기존 단계별 플로우
    ];

    if (chatEnabledCategories.includes(cat.name)) {
      // 챗봇 모달 열기
      setChatCategory(cat.name);
      setIsChatModalOpen(true);
      onChatOpen(cat.name);
    } else {
      // 그 외 -> 기존 글쓰기 모달 열기
      setSelectedCategory(cat);
      setShowComplaintModal(true);
    }
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

  // 필터링된 민원 목록
  const getFilteredComplaints = () => {
    let filtered = complaints;

    // 상태 필터
    if (complaintStatusFilter !== "전체") {
      filtered = filtered.filter((c) => c.status === complaintStatusFilter);
    }

    // 기간 필터
    if (periodFilter !== "전체") {
      const now = new Date();
      const monthsAgo =
        periodFilter === "1개월" ? 1 : periodFilter === "3개월" ? 3 : 6;
      const filterDate = new Date(now.setMonth(now.getMonth() - monthsAgo));

      filtered = filtered.filter((c) => {
        const complaintDate = new Date(c.date.replace(/\./g, "-"));
        return complaintDate >= filterDate;
      });
    }

    // 검색어 필터
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(keyword) ||
          c.content.toLowerCase().includes(keyword)
      );
    }

    return filtered;
  };

  return (
    <div className="pb-4">
      <Header
        onShareClick={onShareClick}
        onSearchClick={onSearchClick}
        onBellClick={onBellClick}
        title="민원 센터"
        subtitle="문제가 있다면 알려주세요."
      >
        {/* 처리율 Progress Bar - 헤더 안 */}
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white font-medium whitespace-nowrap">
              처리율
            </span>
            <div className="flex-1 bg-white/30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <span className="font-bold text-white whitespace-nowrap">
              {completionRate}%
            </span>
          </div>
        </div>
      </Header>

      {/* 내 민원 현황 - 헤더 밖 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">내 민원 현황</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleStatClick("접수")}
            className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <p className="text-2xl font-bold text-blue-600">{complaintStats.접수}</p>
            <p className="text-xs text-gray-600">접수</p>
          </button>
          <button
            onClick={() => handleStatClick("처리중")}
            className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <p className="text-2xl font-bold text-orange-600">{complaintStats.처리중}</p>
            <p className="text-xs text-gray-600">처리중</p>
          </button>
          <button
            onClick={() => handleStatClick("완료")}
            className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <p className="text-2xl font-bold text-green-600">{complaintStats.완료}</p>
            <p className="text-xs text-gray-600">완료</p>
          </button>
        </div>
      </div>

      <ComplaintList
        categories={complaintCategories}
        onCategoryClick={handleCategoryClick}
      />

      {/* 민원 작성 모달 (시설, 일반 등) */}
      <WriteComplaintModal
        isOpen={showComplaintModal}
        category={selectedCategory}
        onClose={() => {
          setShowComplaintModal(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleComplaintSubmit}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-4 flex flex-col gap-3 z-40">
        <button
          onClick={() => setShowFAQ(true)}
          className="w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-all"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            setSelectedCategory(complaintCategories[0]);
            setShowComplaintModal(true);
          }}
          className="w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg flex items-center justify-center text-white"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* FAQ Modal */}
      <FAQModal
        isOpen={showFAQ}
        faqData={faqData}
        expandedId={expandedFAQ}
        onExpandChange={setExpandedFAQ}
        onClose={() => setShowFAQ(false)}
      />

      {/* [추가] 챗봇 모달 (학사, 진로 -> Gemini AI) */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        category={chatCategory}
        onSuccess={(msg) => console.log("AI 응답:", msg)}
      />

      {/* 민원 리스트 모달 */}
      {showComplaintListModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl h-[85vh] flex flex-col">
            {/* 고정 상단 영역 */}
            <div className="shrink-0">
              {/* 헤더 */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <h3 className="font-bold text-xl">내 민원 내역</h3>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500">총 {getFilteredComplaints().length}건</p>
                  <button onClick={handleCloseComplaintListModal}>
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* 상태 필터 탭 (언더라인 스타일) */}
              <div className="flex border-b border-gray-200 px-6">
                {['전체', '접수', '처리중', '완료'].map((status) => {
                  const count = status === '전체'
                    ? complaints.length
                    : complaints.filter(c => c.status === status).length;

                  return (
                    <button
                      key={status}
                      onClick={() => setComplaintStatusFilter(status)}
                      className={`relative px-4 py-3 font-medium transition-all ${
                        complaintStatusFilter === status
                          ? 'text-gray-900'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {status}
                        <span className={`text-xs ${
                          complaintStatusFilter === status
                            ? 'text-red-500'
                            : 'text-gray-400'
                        }`}>
                          {count}
                        </span>
                      </span>
                      {complaintStatusFilter === status && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 검색창 + 기간 필터 */}
              <div className="px-6 pt-4 pb-3">
                {/* 검색바 */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="민원 제목 또는 내용 검색..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                  {searchKeyword && (
                    <button
                      onClick={() => setSearchKeyword('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>

                {/* 기간 필터 */}
                <div className="flex gap-2">
                  {['전체', '1개월', '3개월', '6개월'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setPeriodFilter(period)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        periodFilter === period
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 스크롤 가능한 중간 영역 */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="space-y-3 pb-4">
                {getFilteredComplaints().length > 0 ? (
                  getFilteredComplaints().map((complaint) => (
                  <div
                    key={complaint.id}
                    className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setComplaintDetailModal(complaint);
                      setShowComplaintListModal(false);
                      if (!complaint.isRead && !complaintReadStatus[complaint.id]) {
                        setComplaintReadStatus(prev => ({ ...prev, [complaint.id]: true }));
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <h4 className="font-bold text-gray-800">{complaint.title}</h4>
                        {!complaint.isRead && !complaintReadStatus[complaint.id] && (
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {/* 완료 상태일 때는 별점/평가하기 표시, 그 외에는 상태 태그 표시 */}
                        {complaint.status === '완료' ? (
                          <>
                            {complaintRatings[complaint.id] ? (
                              <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-medium text-yellow-600">{complaintRatings[complaint.id]}.0</span>
                              </div>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRateComplaint(complaint.id);
                                }}
                                className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium hover:bg-yellow-100 transition-colors"
                              >
                                평가하기
                              </button>
                            )}
                          </>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[complaint.status]}`}>
                            {complaint.status}
                          </span>
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                      <span>{complaint.category}</span>
                      <span>{complaint.date}</span>
                    </div>
                  </div>
                ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Search className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium mb-1">검색 결과가 없습니다</p>
                    <p className="text-sm text-gray-400">다른 검색어나 필터를 시도해보세요</p>
                  </div>
                )}
              </div>
            </div>

            {/* 고정 하단 영역 */}
            <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
              <button className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                민원 내역 다운로드
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
