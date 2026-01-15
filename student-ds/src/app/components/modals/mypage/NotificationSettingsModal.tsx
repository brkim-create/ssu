import { X, Bell, MessageCircle, Send } from "lucide-react";

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

/**
 * NotificationSettingsModal - 알림 설정 모달
 *
 * 역할:
 * - PWA 푸시, 카카오톡, 이메일 알림 채널 토글
 */
export default function NotificationSettingsModal({
  isOpen,
  onClose,
  channels,
  onChannelsChange,
}: NotificationSettingsModalProps) {
  if (!isOpen) return null;

  const handleSave = () => {
    onClose();
    alert("알림 설정이 저장되었습니다!");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">알림 설정</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">받고 싶은 알림 채널을 선택하세요</p>

        <div className="space-y-4">
          {/* PWA 푸시 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">PWA 푸시</p>
                  <p className="text-xs text-gray-500">브라우저 알림</p>
                </div>
              </div>
              <button
                onClick={() =>
                  onChannelsChange({ ...channels, pwa: !channels.pwa })
                }
                className={`w-12 h-6 rounded-full relative transition-all ${
                  channels.pwa ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    channels.pwa ? "right-1" : "left-1"
                  }`}
                ></div>
              </button>
            </div>
            <p className="text-xs text-gray-500">
              실시간으로 중요한 알림을 받을 수 있습니다
            </p>
          </div>

          {/* 카카오톡 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">카카오톡</p>
                  <p className="text-xs text-gray-500">카카오 알림톡</p>
                </div>
              </div>
              <button
                onClick={() =>
                  onChannelsChange({ ...channels, kakao: !channels.kakao })
                }
                className={`w-12 h-6 rounded-full relative transition-all ${
                  channels.kakao ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    channels.kakao ? "right-1" : "left-1"
                  }`}
                ></div>
              </button>
            </div>
            <p className="text-xs text-gray-500">
              카카오톡으로 알림을 받을 수 있습니다
            </p>
          </div>

          {/* 이메일 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Send className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">이메일</p>
                  <p className="text-xs text-gray-500">school@example.com</p>
                </div>
              </div>
              <button
                onClick={() =>
                  onChannelsChange({ ...channels, email: !channels.email })
                }
                className={`w-12 h-6 rounded-full relative transition-all ${
                  channels.email ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    channels.email ? "right-1" : "left-1"
                  }`}
                ></div>
              </button>
            </div>
            <p className="text-xs text-gray-500">
              이메일로 상세한 알림을 받을 수 있습니다
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700">
            💡 알림 채널은 언제든지 변경할 수 있습니다
          </p>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
