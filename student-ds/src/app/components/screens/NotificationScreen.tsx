import React from "react";
import { Bell } from "lucide-react";
import Header from "../layout/Header";
import { notifications } from "../../../data/mockData";

interface NotificationScreenProps {
  onShareClick: () => void;
  onSearchClick: () => void;
  onBellClick: () => void;
}

/**
 * NotificationScreen - 알림 화면
 *
 * 역할:
 * - 알림 목록 표시
 * - 읽음/안읽음 상태 표시
 */
export default function NotificationScreen({
  onShareClick,
  onSearchClick,
  onBellClick,
}: NotificationScreenProps) {
  return (
    <div className="pb-4">
      <Header
        onShareClick={onShareClick}
        onSearchClick={onSearchClick}
        onBellClick={onBellClick}
        title="알림"
        subtitle="주요 소식을 확인하세요"
      />

      <div className="mx-4 mt-4 space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`bg-white rounded-2xl shadow p-4 ${
              !notif.read ? "border-l-4 border-pink-500" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    !notif.read ? "bg-pink-100" : "bg-gray-100"
                  }`}
                >
                  <Bell
                    className={`w-5 h-5 ${
                      !notif.read ? "text-pink-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{notif.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                </div>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
