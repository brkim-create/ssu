"use client";

import { useState } from "react";
import { User, Settings, FileText, LogOut, ChevronRight } from "lucide-react";
import Header from "@/components/common/Header";
import ComplaintListModal from "@/components/modals/ComplaintListModal";
import { complaints, CURRENT_STUDENT_ID } from "@/data/mockData";

/**
 * MyPagePage - 마이페이지
 */
export default function MyPagePage() {
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  // 현재 사용자의 민원만 필터링
  const myComplaints = complaints.filter(
    (c) => c.studentId === CURRENT_STUDENT_ID
  );

  const handleMenuClick = (label: string) => {
    if (label === "민원 내역") {
      setShowComplaintModal(true);
    } else {
      console.log(`Clicked: ${label}`);
    }
  };

  const menuItems = [
    { icon: User, label: "내 정보 수정" },
    { icon: FileText, label: "민원 내역" },
    { icon: Settings, label: "알림 설정" },
    { icon: LogOut, label: "로그아웃" },
  ];

  // Header 아이콘 핸들러
  const handleShareClick = () => console.log("Share clicked");
  const handleSearchClick = () => console.log("Search clicked");
  const handleBellClick = () => console.log("Bell clicked");

  return (
    <div className="pb-4">
      <Header
        title="마이페이지"
        subtitle="내 정보를 관리하세요."
        onShareClick={handleShareClick}
        onSearchClick={handleSearchClick}
        onBellClick={handleBellClick}
      />

      {/* Profile Card */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">김수성</h3>
            <p className="text-sm text-gray-500">컴퓨터공학과 3학년</p>
            <p className="text-xs text-gray-400 mt-1">202012345@ssu.ac.kr</p>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            onClick={() => handleMenuClick(item.label)}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-gray-500" />
              <span className="text-gray-800">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>

      {/* App Version */}
      <div className="mx-4 mt-6 text-center">
        <p className="text-xs text-gray-400">Student Dashboard v1.0.0</p>
        <p className="text-xs text-gray-400 mt-1">수성대학교 AI-DX Observer</p>
      </div>

      {/* Modals */}
      <ComplaintListModal
        isOpen={showComplaintModal}
        onClose={() => setShowComplaintModal(false)}
        complaints={myComplaints}
      />
    </div>
  );
}
