"use client";

import { useState } from "react";
import { Plus, Building, GraduationCap, Heart, BookOpen, ChevronRight } from "lucide-react";
import Header from "@/components/common/Header";
import { complaintCategories, complaints } from "@/data/mockData";

// 아이콘 매핑
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Building,
  GraduationCap,
  Heart,
  BookOpen,
};

/**
 * ComplaintsPage - 민원 센터 페이지
 */
export default function ComplaintsPage() {
  const [statusFilter, setStatusFilter] = useState("전체");

  // 통계 계산
  const stats = {
    접수: complaints.filter((c) => c.status === "접수").length,
    처리중: complaints.filter((c) => c.status === "처리중").length,
    완료: complaints.filter((c) => c.status === "완료").length,
  };
  const completionRate = Math.round((stats.완료 / complaints.length) * 100);

  // 필터링된 민원 목록
  const filteredComplaints = statusFilter === "전체"
    ? complaints
    : complaints.filter((c) => c.status === statusFilter);

  const handleCategoryClick = (categoryName: string) => {
    console.log("Category clicked:", categoryName);
    alert(`${categoryName} 카테고리가 선택되었습니다.`);
  };

  return (
    <div className="pb-4">
      {/* Header with Stats */}
      <Header title="민원 센터" subtitle="문제가 있다면 알려주세요.">
        <StatsOverview stats={stats} completionRate={completionRate} />
      </Header>

      {/* Categories */}
      <div className="mx-4 mt-4">
        <h3 className="font-bold text-gray-800 mb-3">민원 카테고리</h3>
        <div className="grid grid-cols-2 gap-3">
          {complaintCategories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Building;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className="bg-white rounded-xl shadow p-4 flex items-center gap-3 hover:shadow-lg transition-all"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${cat.color}20` }}
                >
                  <IconComponent className="w-5 h-5" style={{ color: cat.color }} />
                </div>
                <span className="text-sm font-medium text-gray-800">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mx-4 mt-6">
        <div className="flex gap-2 mb-3">
          {["전체", "접수", "처리중", "완료"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                statusFilter === status
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Complaint List */}
        <div className="space-y-3">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => console.log("Complaint clicked:", complaint.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={complaint.status} />
                    <span className="text-xs text-gray-400">{complaint.date}</span>
                  </div>
                  <h4 className="font-medium text-gray-800">{complaint.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{complaint.category}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => alert("새 민원 작성")}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg flex items-center justify-center text-white z-40 hover:shadow-xl transition-shadow"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

// ========== Sub Components ==========

interface StatsOverviewProps {
  stats: { 접수: number; 처리중: number; 완료: number };
  completionRate: number;
}

function StatsOverview({ stats, completionRate }: StatsOverviewProps) {
  return (
    <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mt-2">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm opacity-90">나의 민원 현황</p>
        <div className="flex items-center gap-1">
          <span className="text-sm">처리율</span>
          <span className="font-bold">{completionRate}%</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "접수", value: stats.접수, color: "text-blue-500" },
          { label: "처리중", value: stats.처리중, color: "text-orange-500" },
          { label: "완료", value: stats.완료, color: "text-green-500" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl p-3 text-center">
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-gray-600 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    접수: "bg-blue-100 text-blue-600",
    처리중: "bg-orange-100 text-orange-600",
    완료: "bg-green-100 text-green-600",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
