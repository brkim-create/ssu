"use client";

import { Bell } from "lucide-react";
import Header from "@/components/common/Header";

/**
 * NotificationPage - 알림 페이지
 */
export default function NotificationPage() {
  const notifications = [
    { id: 1, title: "민원 처리 완료", message: "장학금 신청 기간 문의에 대한 답변이 등록되었습니다.", time: "10분 전", read: false },
    { id: 2, title: "학사 공지사항", message: "2025학년도 1학기 수강신청 안내", time: "1시간 전", read: false },
    { id: 3, title: "민원 접수 확인", message: "강의실 에어컨 고장 민원이 접수되었습니다.", time: "3시간 전", read: true },
    { id: 4, title: "역량 진단 알림", message: "S(창의) 역량 진단이 시작되었습니다.", time: "1일 전", read: true },
  ];

  // Header 아이콘 핸들러
  const handleShareClick = () => console.log("Share clicked");
  const handleSearchClick = () => console.log("Search clicked");
  const handleBellClick = () => console.log("Bell clicked");

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
    </div>
  );
}
