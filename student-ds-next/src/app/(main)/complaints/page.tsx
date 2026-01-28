"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Building, GraduationCap, Heart, BookOpen, HelpCircle, CheckCircle, Send, X, Star, MessageCircle, Copy, Download } from "lucide-react";
import Header from "@/components/common/Header";
import ChatModal from "@/components/chatbot/ChatModal";
import FAQModal from "@/components/modals/complaints/FAQModal";
import WriteComplaintModal from "@/components/modals/complaints/WriteComplaintModal";
import ComplaintDetailModal from "@/components/modals/complaints/ComplaintDetailModal";
import ComplaintListModal from "@/components/modals/mypage/ComplaintListModal";
import DownloadModal from "@/components/modals/mypage/DownloadModal";
import SearchModal from "@/components/modals/global/SearchModal";
import { complaintCategories, complaints, faqData, ComplaintCategory, Complaint, CURRENT_STUDENT_ID, currentStudentProfile, appConfig } from "@/data/mockData";

// 아이콘 매핑
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building,
  GraduationCap,
  Heart,
  BookOpen,
};

/**
 * ComplaintsPage - 민원 센터 페이지
 *
 * 역할:
 * - 민원 통계 표시 (접수/처리중/완료)
 * - 민원 카테고리 선택 및 작성
 * - 민원 목록은 마이페이지에서 확인
 */
export default function ComplaintsPage() {
  const router = useRouter();

  // Modal 상태
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [expandedFAQId, setExpandedFAQId] = useState<number | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedCategoryForWrite, setSelectedCategoryForWrite] = useState<ComplaintCategory | null>(null);

  // 성공 모달 상태
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successType, setSuccessType] = useState<"submit" | "complete">("submit");

  // 민원 목록 모달 상태
  const [showComplaintListModal, setShowComplaintListModal] = useState(false);
  const [complaintStatusFilter, setComplaintStatusFilter] = useState("전체");
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // 평가 모달 상태
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [complaintRatings, setComplaintRatings] = useState<Record<number, number>>({});
  const [ratingComplaintId, setRatingComplaintId] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  // 민원 상세 모달 상태
  const [complaintDetailModal, setComplaintDetailModal] = useState<Complaint | null>(null);

  // 공유/검색 모달 상태
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // 현재 사용자의 민원만 필터링
  const myComplaints = complaints.filter(
    (c) => c.studentId === CURRENT_STUDENT_ID
  );

  // 통계 계산 (내 민원 기준)
  const stats = {
    접수: myComplaints.filter((c) => c.status === "접수").length,
    처리중: myComplaints.filter((c) => c.status === "처리중").length,
    완료: myComplaints.filter((c) => c.status === "완료").length,
  };
  const completionRate = myComplaints.length > 0
    ? Math.round((stats.완료 / myComplaints.length) * 100)
    : 0;

  // 통계 클릭 시 민원 목록 모달 열기
  const handleStatClick = (status: string) => {
    setComplaintStatusFilter(status);
    setShowComplaintListModal(true);
  };

  // "평가하기" 버튼 클릭
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
      // 민원 목록 모달은 유지 (다른 민원도 평가 가능)
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setSelectedCategory("");
  };

  const handleChatSuccess = (message: string, type?: "complete" | "submit") => {
    setSuccessMessage(message);
    setSuccessType(type || "complete");
    setShowSuccessModal(true);
  };

  // 민원 작성 모달 열기 (FAB 버튼)
  const handleOpenWriteModal = () => {
    // 첫 번째 카테고리를 기본 선택
    if (complaintCategories.length > 0) {
      setSelectedCategoryForWrite(complaintCategories[0]);
      setIsWriteModalOpen(true);
    }
  };

  // 민원 작성 제출 핸들러
  const handleComplaintSubmit = (data: {
    category: ComplaintCategory;
    subCategory: string | null;
    title: string;
    content: string;
    files: unknown[];
    isAnonymous: boolean;
    isPrivate: boolean;
    agreeNotification: boolean;
  }) => {
    console.log("Complaint submitted:", data);
    alert("민원이 성공적으로 접수되었습니다.");
  };

  // Header 아이콘 핸들러
  const handleShareClick = () => setShowShareModal(true);
  const handleSearchClick = () => setShowSearchModal(true);
  const handleBellClick = () => router.push("/notification");

  return (
    <div className="pb-4">
      {/* Header with Progress Bar */}
      <Header
        title="민원 센터"
        subtitle="문제가 있다면 알려주세요."
        onShareClick={handleShareClick}
        onSearchClick={handleSearchClick}
        onBellClick={handleBellClick}
      >
        <ProgressBar completionRate={completionRate} />
      </Header>

      {/* Stats Overview */}
      <div className="mx-4 mt-4">
        <StatsOverview stats={stats} onStatClick={handleStatClick} />
      </div>

      {/* Categories */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">민원 카테고리</h3>
        <div className="grid grid-cols-2 gap-3">
          {complaintCategories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Building;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className="bg-gray-50 rounded-2xl shadow p-5 text-left hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <IconComponent className="w-6 h-6 text-gray-500" />
                </div>
                <p className={`font-bold text-gray-800${cat.name !== "학생 장학" && cat.name !== "수업 및 학사" ? " mb-1" : ""}`}>{cat.name}</p>
                {cat.name !== "학생 장학" && cat.name !== "수업 및 학사" && (
                  <p className="text-xs text-gray-500">
                    {cat.items.length}개 세부항목
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAB - FAQ */}
      <button
        onClick={() => setIsFAQOpen(true)}
        className="fixed bottom-40 right-4 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 z-40 hover:shadow-xl transition-shadow"
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      {/* FAB - 새 민원 작성 */}
      <button
        onClick={handleOpenWriteModal}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg flex items-center justify-center text-white z-40 hover:shadow-xl transition-shadow"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* ChatModal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={handleChatClose}
        category={selectedCategory}
        onSuccess={handleChatSuccess}
      />

      {/* FAQModal */}
      <FAQModal
        isOpen={isFAQOpen}
        faqData={faqData}
        expandedId={expandedFAQId}
        onExpandChange={setExpandedFAQId}
        onClose={() => {
          setIsFAQOpen(false);
          setExpandedFAQId(null);
        }}
      />

      {/* WriteComplaintModal */}
      <WriteComplaintModal
        isOpen={isWriteModalOpen}
        category={selectedCategoryForWrite}
        onClose={() => {
          setIsWriteModalOpen(false);
          setSelectedCategoryForWrite(null);
        }}
        onSubmit={handleComplaintSubmit}
      />

      {/* 성공 모달 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 animate-scale-up shadow-2xl">
            <div className="flex flex-col items-center text-center">
              {/* 아이콘 */}
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
                {successType === "complete" ? (
                  <CheckCircle className="w-10 h-10 text-white" />
                ) : (
                  <Send className="w-10 h-10 text-white" />
                )}
              </div>

              {/* 메시지 */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {successType === "complete" ? "완료되었습니다!" : "접수 완료!"}
              </h3>
              <p className="text-gray-600 whitespace-pre-line mb-6">
                {successMessage}
              </p>

              {/* 확인 버튼 */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 민원 목록 모달 */}
      <ComplaintListModal
        isOpen={showComplaintListModal}
        onClose={() => setShowComplaintListModal(false)}
        complaints={myComplaints}
        onOpenDownloadModal={() => setShowDownloadModal(true)}
        initialStatusFilter={complaintStatusFilter}
        onOpenRatingModal={handleRateComplaint}
        ratedComplaints={complaintRatings}
        onOpenDetail={(complaint) => {
          setComplaintDetailModal(complaint);
          setShowComplaintListModal(false);
        }}
      />

      {/* 다운로드 모달 */}
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />

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

      {/* 민원 상세보기 모달 */}
      <ComplaintDetailModal
        complaint={complaintDetailModal}
        complaintRatings={complaintRatings}
        onClose={() => setComplaintDetailModal(null)}
        onRate={handleRateComplaint}
        onBack={() => setShowComplaintListModal(true)}
      />

      {/* 공유 모달 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">내 역량 리포트 공유</h3>
              <button onClick={() => setShowShareModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">역량 점수와 리포트를 공유하세요</p>

            <div className="space-y-3">
              <button className="w-full py-4 bg-yellow-400 text-gray-800 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all">
                <MessageCircle className="w-5 h-5" />
                카카오톡으로 공유
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${appConfig.shareBaseUrl}/${currentStudentProfile.name}`);
                  alert('링크가 복사되었습니다!');
                }}
                className="w-full py-4 bg-blue-50 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-100 transition-all"
              >
                <Copy className="w-5 h-5" />
                링크 복사
              </button>

              <button className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all">
                <Download className="w-5 h-5" />
                PDF로 다운로드
                
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500">
                💡 공유된 리포트는 7일간 유효합니다
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 검색 모달 */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />

    </div>
  );
}

// ========== Sub Components ==========

// 처리율 프로그레스 바 (Header 내부용)
function ProgressBar({ completionRate }: { completionRate: number }) {
  return (
    <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 mt-2">
      <div className="flex items-center gap-3 text-sm">
        <span className="text-white font-medium whitespace-nowrap">처리율</span>
        <div className="flex-1 bg-white/30 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <span className="font-bold text-white whitespace-nowrap">
          {completionRate}%
        </span>
      </div>
    </div>
  );
}

interface StatsOverviewProps {
  stats: { 접수: number; 처리중: number; 완료: number };
  onStatClick?: (status: string) => void;
}

function StatsOverview({ stats, onStatClick }: StatsOverviewProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <div className="mb-3">
        <h3 className="font-bold text-gray-800">나의 민원 현황</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "접수", value: stats.접수, color: "text-blue-600" },
          { label: "처리중", value: stats.처리중, color: "text-orange-600" },
          { label: "완료", value: stats.완료, color: "text-green-600" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => onStatClick?.(item.label)}
            className="bg-gray-50 rounded-xl p-3 text-center hover:shadow-md transition-all"
          >
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-gray-600 mt-1">{item.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
