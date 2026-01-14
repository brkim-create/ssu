import React, { useState } from "react";
import { Plus } from "lucide-react";
import Header from "../layout/Header";
import StatsOverview from "../dashboard/StatsOverview";
import ComplaintList from "../dashboard/ComplaintList";
import WriteComplaintModal from "../dashboard/WriteComplaintModal";
import FAQModal from "../dashboard/FAQModal";
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
 */
export default function ComplaintScreen({
  onShareClick,
  onSearchClick,
  onChatOpen,
}: ComplaintScreenProps) {
  // Modal States
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ComplaintCategory | null>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showComplaintListModal, setShowComplaintListModal] = useState(false);
  const [complaintDetailModal, setComplaintDetailModal] = useState<any>(null);

  // Filter States
  const [complaintStatusFilter, setComplaintStatusFilter] = useState<string>("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [periodFilter, setPeriodFilter] = useState("전체");

  // Rating States
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [complaintReadStatus, setComplaintReadStatus] = useState<{ [key: number]: boolean }>({});
  const [complaintRatedStatus, setComplaintRatedStatus] = useState<{ [key: number]: boolean }>({});
  const [complaintRatings, setComplaintRatings] = useState<{ [key: number]: number }>({});
  const [ratingComplaintId, setRatingComplaintId] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState("");

  // Computed Values
  const complaintStats = {
    접수: complaints.filter((c) => c.status === "접수").length,
    처리중: complaints.filter((c) => c.status === "처리중").length,
    완료: complaints.filter((c) => c.status === "완료").length,
  };
  const completionRate = Math.round((complaintStats.완료 / complaints.length) * 100);

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

  const handleCategoryClick = (cat: ComplaintCategory) => {
    setSelectedCategory(cat);
    onChatOpen(cat.name);
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
      <FAQModal
        isOpen={showFAQ}
        faqData={faqData}
        expandedId={expandedFAQ}
        onExpandChange={setExpandedFAQ}
        onClose={() => setShowFAQ(false)}
      />
    </div>
  );
}
