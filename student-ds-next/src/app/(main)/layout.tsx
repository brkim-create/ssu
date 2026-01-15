"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Bell, User } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

// Navigation Tab 설정
const tabs = [
  { id: "home", href: "/", icon: Home, label: "홈" },
  { id: "complaint", href: "/complaints", icon: FileText, label: "민원" },
  { id: "notification", href: "/notification", icon: Bell, label: "알림", badge: 2 },
  { id: "mypage", href: "/mypage", icon: User, label: "MY" },
];

/**
 * MainLayout - 메인 영역 레이아웃
 *
 * Next.js App Router의 Route Group Layout
 * - 하단 네비게이션 바 포함
 * - URL 경로에 따른 탭 활성화 스타일 적용
 */
export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  // 현재 경로에 따른 활성 탭 판별
  const getActiveTab = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-100 max-w-md mx-auto relative overflow-hidden">
      {/* Main Content Area */}
      <main className="pb-20">{children}</main>

      {/* Bottom Navigation */}
      <BottomNavigation tabs={tabs} getActiveTab={getActiveTab} />
    </div>
  );
}

// ========== Bottom Navigation 컴포넌트 ==========
interface NavTab {
  id: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
}

interface BottomNavigationProps {
  tabs: NavTab[];
  getActiveTab: (href: string) => boolean;
}

function BottomNavigation({ tabs, getActiveTab }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const isActive = getActiveTab(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center py-2 px-4 relative transition-colors ${
                isActive ? "text-pink-500" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{tab.label}</span>

              {/* Badge */}
              {tab.badge && tab.badge > 0 && (
                <div className="absolute -top-1 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">{tab.badge}</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
