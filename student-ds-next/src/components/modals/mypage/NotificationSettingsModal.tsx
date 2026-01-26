"use client";

import { X, Smartphone, MessageSquare, Mail } from "lucide-react";

interface NotificationChannels {
  pwa: boolean;
  kakao: boolean;
  email: boolean;
}

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  channels: NotificationChannels;
  onChannelsChange: (channels: NotificationChannels) => void;
}

export default function NotificationSettingsModal({
  isOpen,
  onClose,
  channels,
  onChannelsChange,
}: NotificationSettingsModalProps) {
  if (!isOpen) return null;

  const handleToggle = (key: keyof NotificationChannels) => {
    onChannelsChange({
      ...channels,
      [key]: !channels[key],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">알림 설정</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-gray-800 mb-4">알림 수신 채널</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">PWA 푸시 알림</p>
                    <p className="text-xs text-gray-500">브라우저 푸시 알림 수신</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("pwa")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    channels.pwa ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      channels.pwa ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">카카오톡 알림</p>
                    <p className="text-xs text-gray-500">카카오톡 알림톡 수신</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("kakao")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    channels.kakao ? "bg-yellow-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      channels.kakao ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">이메일 알림</p>
                    <p className="text-xs text-gray-500">학교 이메일로 수신</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("email")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    channels.email ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      channels.email ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-xs text-blue-700">
              💡 최소 1개 이상의 알림 채널을 선택해주세요. 민원 처리 상태 및 중요
              공지사항을 받아보실 수 있습니다.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
        >
          저장
        </button>
      </div>
    </div>
  );
}
