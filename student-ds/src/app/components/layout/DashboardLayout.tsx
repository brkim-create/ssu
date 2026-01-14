import React from "react";
import {
  Home,
  FileText,
  Bell,
  User,
  Share2,
  Search,
} from "lucide-react";
import logoImage from "../../../assets/logo.png";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onShareClick: () => void;
  onSearchClick: () => void;
  title?: string;
  subtitle?: string;
  headerContent?: React.ReactNode;
}

export default function DashboardLayout({
  children,
  activeTab,
  onTabChange,
  onShareClick,
  onSearchClick,
  title,
  subtitle,
  headerContent,
}: DashboardLayoutProps) {
  const tabs = [
    { id: "home", icon: Home, label: "홈" },
    { id: "complaint", icon: FileText, label: "민원" },
    { id: "notification", icon: Bell, label: "알림", badge: 2 },
    { id: "mypage", icon: User, label: "MY" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 max-w-md mx-auto relative overflow-hidden">
      <div className="pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
              <img
                src={logoImage}
                alt="Logo"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onShareClick}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <Share2 className="w-6 h-6" />
              </button>
              <button
                onClick={onSearchClick}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <Search className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
                <Bell className="w-6 h-6" />
              </button>
            </div>
          </div>

          {title && <h2 className="font-bold text-xl">{title}</h2>}
          {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}

          {headerContent}
        </div>

        {/* Main Content */}
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
