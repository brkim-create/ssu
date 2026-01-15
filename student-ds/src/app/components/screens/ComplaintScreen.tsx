import React, { useState } from "react";
import { Plus, HelpCircle } from "lucide-react";
import Header from "../layout/Header";
import StatsOverview from "../dashboard/StatsOverview";
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
  onChatOpen: (category: string) => void;
}

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

  return (
    <div className="pb-4">
      <Header
        onShareClick={onShareClick}
        onSearchClick={onSearchClick}
        title="민원 센터"
        subtitle="문제가 있다면 알려주세요."
      >
        <StatsOverview
          stats={complaintStats}
          completionRate={completionRate}
          onStatClick={handleStatClick}
        />
      </Header>

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
    </div>
  );
}
