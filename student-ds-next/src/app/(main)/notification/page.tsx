"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import Header from "@/components/common/Header";
import SearchModal from "@/components/modals/global/SearchModal";
import ShareModal from "@/components/modals/global/ShareModal";
import { notifications } from "@/data/mockData";

/**
 * NotificationPage - 알림 페이지
 */
export default function NotificationPage() {
  const router = useRouter();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Header 아이콘 핸들러
  const handleShareClick = () => setShowShareModal(true);
  const handleSearchClick = () => setShowSearchModal(true);
  const handleBellClick = () => router.push("/notification");

  return (
    <div className="pb-4">
      <Header
        title="알림"
        subtitle="새로운 소식을 확인하세요."
        onShareClick={handleShareClick}
        onSearchClick={handleSearchClick}
        onBellClick={handleBellClick}
      />

      <div className="mx-4 mt-4 space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-xl shadow p-4 ${
              !notification.read ? "border-l-4 border-pink-500" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                !notification.read ? "bg-pink-100" : "bg-gray-100"
              }`}>
                <Bell className={`w-5 h-5 ${!notification.read ? "text-pink-500" : "text-gray-400"}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-800">{notification.title}</h4>
                  <span className="text-xs text-gray-400">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 검색 모달 */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />

      {/* 공유 모달 */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
}
