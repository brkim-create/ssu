"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Inbox, FileText, BarChart3, Users, Bot } from "lucide-react";

// 메뉴 아이템 정의
const menuItems = [
  { href: "/admin", label: "대시보드", icon: Activity },
  { href: "/admin/cqi", label: "티켓/CQI", icon: Inbox },
  { href: "/admin/templates", label: "템플릿", icon: FileText },
  { href: "/admin/stats", label: "통계/분석", icon: BarChart3 },
  { href: "/admin/users", label: "사용자 관리", icon: Users },
  { href: "/admin/scenario", label: "시나리오", icon: Bot },
];

/**
 * AdminSidebar - 관리자 대시보드 사이드바
 *
 * admin-ds-ui App.tsx 1362~1453라인 기반 마이그레이션
 */
export default function AdminSidebar() {
  const pathname = usePathname();

  // 현재 경로가 메뉴 아이템과 일치하는지 확인
  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-48 bg-gray-800 shadow-lg flex flex-col border-r border-gray-700 h-screen">
      {/* 로고 헤더 */}
      <div className="h-[60px] px-3 flex items-center border-b border-gray-700 gap-2">
        <div className="w-8 h-8 bg-white rounded-lg p-1 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-800">SSU</span>
        </div>
        <div>
          <p className="font-bold text-sm text-white">수성대학교</p>
          <p className="text-xs text-gray-400">관리자</p>
        </div>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 p-2 space-y-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                active
                  ? "bg-gray-700 text-white border-l-2 border-pink-500"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* 하단 사용자 정보 */}
      <div className="p-2 border-t border-gray-700">
        <div className="flex items-center gap-2 text-white text-xs">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            관
          </div>
          <span>슈퍼관리자</span>
        </div>
      </div>
    </div>
  );
}
