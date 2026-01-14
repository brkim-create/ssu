import { X, Bell, Shield, FileText } from "lucide-react";

interface NotificationSettings {
  complaintStatus: boolean;
  competencyAlert: boolean;
  announcement: boolean;
  marketing: boolean;
}

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: NotificationSettings;
  onSettingsChange: (settings: NotificationSettings) => void;
}

/**
 * NotificationSettingsModal - 알림 설정 모달
 *
 * 역할:
 * - 민원 처리 상태, 역량 진단, 공지사항 알림 토글
 */
export default function NotificationSettingsModal({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}: NotificationSettingsModalProps) {
  if (!isOpen) return null;

  const handleToggle = (key: keyof NotificationSettings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">알림 설정</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-pink-500" />
              <div>
                <p className="font-medium">민원 처리 상태</p>
                <p className="text-sm text-gray-500">민원 접수, 처리중, 완료 알림</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.complaintStatus}
                onChange={() => handleToggle("complaintStatus")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-pink-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-orange-500" />
              <div>
                <p className="font-medium">역량 진단 알림</p>
                <p className="text-sm text-gray-500">역량 점수 변동, 진단 시작 알림</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.competencyAlert}
                onChange={() => handleToggle("competencyAlert")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-pink-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">공지사항</p>
                <p className="text-sm text-gray-500">학교 및 학과 공지사항</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.announcement}
                onChange={() => handleToggle("announcement")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-pink-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
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
