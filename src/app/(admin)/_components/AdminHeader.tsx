"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { useRole } from "../_contexts/RoleContext";

// 페이지별 제목 매핑
const pageTitles: Record<string, string> = {
  "/admin": "대시보드",
  "/admin/workspace": "워크스페이스",
  "/admin/stats": "통계/분석",
  "/admin/system": "시스템 관리",
};

// 서브메뉴 정의
const subMenus: Record<string, { href: string; label: string; superAdminOnly?: boolean }[]> = {
  "/admin/workspace": [
    { href: "/admin/workspace", label: "티켓 관리" },
    { href: "/admin/workspace/templates", label: "답변 템플릿", superAdminOnly: true },
  ],
  "/admin/system": [
    { href: "/admin/system", label: "사용자 관리" },
    { href: "/admin/system/scenario", label: "시나리오 관리" },
  ],
};

/**
 * AdminHeader - 관리자 페이지 헤더
 *
 * 페이지 제목 + 서브메뉴 탭 + 알림 버튼
 */
export default function AdminHeader() {
  const pathname = usePathname();
  const { userRole, ROLE_SUPER_ADMIN } = useRole();

  // 현재 카테고리 경로 추출
  const getCategoryPath = () => {
    if (pathname === "/admin") return "/admin";
    const parts = pathname.split("/");
    if (parts.length >= 3) {
      return `/${parts[1]}/${parts[2]}`;
    }
    return pathname;
  };

  const categoryPath = getCategoryPath();
  const pageTitle = pageTitles[categoryPath] || "관리자";
  const currentSubMenus = subMenus[categoryPath] || [];

  // 역할 기반 서브메뉴 필터링
  const filteredSubMenus = currentSubMenus.filter(
    (menu) => !menu.superAdminOnly || userRole === ROLE_SUPER_ADMIN
  );

  // 서브메뉴 활성 상태 확인
  const isSubMenuActive = (href: string) => {
    // 정확한 경로 매칭 (기본 서브메뉴의 경우)
    if (href === categoryPath) {
      return pathname === categoryPath;
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="bg-gray-800 shadow-sm px-4 h-[60px] flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-gray-100 text-[20px]">{pageTitle}</h1>

        {/* 서브메뉴 버튼들 */}
        {filteredSubMenus.length > 0 && (
          <div className="flex gap-2">
            {filteredSubMenus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  isSubMenuActive(menu.href)
                    ? "bg-gray-700 text-white font-medium border-l-2 border-pink-500"
                    : "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                }`}
              >
                {menu.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <button className="relative p-1.5 hover:bg-gray-700 rounded transition-colors">
        <Bell className="w-4 h-4 text-gray-300" />
        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
      </button>
    </header>
  );
}
