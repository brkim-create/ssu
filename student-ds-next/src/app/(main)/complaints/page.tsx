"use client";

import { useState } from "react";
import { Plus, Building, GraduationCap, Heart, BookOpen } from "lucide-react";
import Header from "@/components/common/Header";
import ChatModal from "@/components/chatbot/ChatModal";
import { complaintCategories, complaints } from "@/data/mockData";

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
  // ChatModal 상태
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

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
    console.log("Chat success:", message, type);
    // 민원 접수 완료 시 추가 처리 가능
  };

  // Header 아이콘 핸들러
  const handleShareClick = () => console.log("Share clicked");
  const handleSearchClick = () => console.log("Search clicked");
  const handleBellClick = () => console.log("Bell clicked");

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

      {/* FAB - 새 민원 작성 */}
      <button
        onClick={() => alert("새 민원 작성")}
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
