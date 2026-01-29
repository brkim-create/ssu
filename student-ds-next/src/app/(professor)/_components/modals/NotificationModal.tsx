"use client";

import { X, Bell } from "lucide-react";
import { professorNotifications as notifications } from "@shared/mockData/data/professor";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * NotificationModal - 알림 목록 모달
 * 프로토타입 NotificationScreen 기반
 */
export default function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl">알림</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-sm opacity-90">새로운 소식을 확인하세요</p>
        </div>

        {/* 알림 목록 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white rounded-2xl shadow p-4 ${!notif.read ? "border-l-4 border-pink-500" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      !notif.read ? "bg-pink-100" : "bg-gray-100"
                    }`}
                  >
                    <Bell className={`w-5 h-5 ${!notif.read ? "text-pink-500" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{notif.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                  </div>
                </div>
                {!notif.read && <div className="w-2 h-2 bg-pink-500 rounded-full"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
