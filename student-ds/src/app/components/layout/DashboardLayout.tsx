import React from "react";
import {
  Home,
  FileText,
  Bell,
  User,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

/**
 * DashboardLayout - 앱의 기본 레이아웃 컴포넌트
 *
 * 역할:
 * - 최상위 컨테이너 래퍼 (max-width, 배경색 등)
 * - 하단 네비게이션 바 (Bottom Tab Navigation)
 * - 각 화면의 콘텐츠는 children으로 전달
 *
 * 헤더는 각 화면별로 다르므로 children에 포함됩니다.
 */
export default function DashboardLayout({
  children,
  activeTab,
  onTabChange,
}: DashboardLayoutProps) {
  const tabs = [
    { id: "home", icon: Home, label: "홈" },
    { id: "complaint", icon: FileText, label: "민원" },
    { id: "notification", icon: Bell, label: "알림", badge: 2 },
    { id: "mypage", icon: User, label: "MY" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 max-w-md mx-auto relative overflow-hidden">
      {/* Main Content Area */}
      <div className="pb-20">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-4 relative ${
                activeTab === tab.id ? "text-pink-500" : "text-gray-400"
              }`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{tab.label}</span>
              {tab.badge && (
                <div className="absolute -top-1 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">{tab.badge}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
