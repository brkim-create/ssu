"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Activity, Inbox, BarChart3, Users, ChevronDown, LogOut } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { clearAuthTokens } from "@/utils/auth";
import { pendingTicketCount } from "@/data/mockData";

// 메뉴 아이템 정의
const menuItems = [
  { href: "/admin", label: "대시보드", icon: Activity },
  { href: "/admin/workspace", label: "워크스페이스", icon: Inbox, badge: pendingTicketCount },
  { href: "/admin/stats", label: "통계/분석", icon: BarChart3, superAdminOnly: true },
  { href: "/admin/system", label: "시스템 관리", icon: Users, superAdminOnly: true },
];

/**
 * AdminSidebar - 관리자 대시보드 사이드바
 *
 * admin-ds-ui App.tsx 1362~1453라인 기반 마이그레이션
 */
export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { userRole, setUserRole, currentUserEmail, ROLE_SUPER_ADMIN, ROLE_GENERAL } = useRole();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  // 현재 경로가 메뉴 아이템과 일치하는지 확인
  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  // 역할 기반 메뉴 필터링
  const filteredMenuItems = menuItems.filter(
    (item) => !item.superAdminOnly || userRole === ROLE_SUPER_ADMIN
  );

  // 역할 변경 핸들러
  const handleRoleChange = (role: string) => {
    setUserRole(role);
    setShowRoleDropdown(false);
    router.push("/admin");
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    clearAuthTokens();
    router.push("/admin/login");
  };

  return (
    <div className="w-48 bg-gray-800 shadow-lg flex flex-col border-r border-gray-700 h-screen">
      {/* 로고 헤더 */}
      <div className="h-[60px] px-3 flex items-center border-b border-gray-700 gap-2">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
          <Image
            src="/logo.png"
            alt="Logo"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <div>
          <p className="font-bold text-sm text-white">수성대학교</p>
          <p className="text-xs text-white">관리자</p>
        </div>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 p-2 space-y-0.5">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                active
                  ? "bg-gray-700 text-white border-l-2 border-pink-500"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs px-1.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 하단 사용자 정보 */}
      <div className="p-2 border-t border-gray-700 relative">
        <button
          onClick={() => setShowRoleDropdown(!showRoleDropdown)}
          className="w-full flex items-center gap-2 hover:bg-gray-700 rounded p-1 transition-colors"
        >
          <div className="w-7 h-7 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {userRole === ROLE_SUPER_ADMIN ? "슈" : "일"}
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs font-medium text-white">{userRole}</p>
            <p className="text-xs text-gray-400">{currentUserEmail}</p>
          </div>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>

        {showRoleDropdown && (
          <div className="absolute bottom-full left-2 right-2 mb-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
            {[ROLE_SUPER_ADMIN, ROLE_GENERAL].map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors ${
                  userRole === role
                    ? "bg-gray-700 text-white border-l-2 border-pink-500"
                    : "text-gray-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                    {role === ROLE_SUPER_ADMIN ? "슈" : "일"}
                  </div>
                  <span>{role}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="w-full mt-2 flex items-center gap-2 px-2 py-1.5 rounded text-sm text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}
