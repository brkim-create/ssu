"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Building, GraduationCap, Heart, BookOpen, HelpCircle, CheckCircle, Send } from "lucide-react";
import Header from "@/components/common/Header";
import ChatModal from "@/components/chatbot/ChatModal";
import FAQModal from "@/components/modals/complaints/FAQModal";
import WriteComplaintModal from "@/components/modals/complaints/WriteComplaintModal";
import { complaintCategories, complaints, faqData, ComplaintCategory } from "@/data/mockData";

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

  // 통계 계산
  const stats = {
    접수: complaints.filter((c) => c.status === "접수").length,
    처리중: complaints.filter((c) => c.status === "처리중").length,
    완료: complaints.filter((c) => c.status === "완료").length,
  };
  const completionRate = Math.round((stats.완료 / complaints.length) * 100);

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
  const handleShareClick = () => console.log("Share clicked");
  const handleSearchClick = () => console.log("Search clicked");
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
        <StatsOverview stats={stats} />
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
                <p className="font-bold text-gray-800 mb-1">{cat.name}</p>
                <p className="text-xs text-gray-500">
                  {cat.items.length}개 세부항목
                </p>
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
}

function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800">나의 민원 현황</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "접수", value: stats.접수, color: "text-blue-600" },
          { label: "처리중", value: stats.처리중, color: "text-orange-600" },
          { label: "완료", value: stats.완료, color: "text-green-600" },
        ].map((item) => (
          <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center">
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-gray-600 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
