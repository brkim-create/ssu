"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "./_components/AdminSidebar";
import AdminHeader from "./_components/AdminHeader";
import { RoleProvider } from "@/contexts/RoleContext";
import { checkAutoLogin } from "@/utils/auth";

/**
 * Admin Layout
 *
 * 좌측 사이드바 + 헤더 + 콘텐츠 영역 구조
 * admin-ds-ui App.tsx 1360~1454라인 기반 마이그레이션
 *
 * - 인증 체크 후 미인증 시 /admin/login으로 리다이렉트
 * - /admin/login 페이지는 사이드바/헤더 없이 렌더링
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인 페이지 여부 확인
  const isLoginPage = pathname === "/admin/login";

  // 인증 체크
  useEffect(() => {
    // 로그인 페이지면 인증 체크 스킵
    if (isLoginPage) {
      setIsCheckingAuth(false);
      return;
    }

    const tokens = checkAutoLogin();
    if (tokens && tokens.userType === "admin") {
      setIsAuthenticated(true);
    } else {
      router.replace("/admin/login");
    }
    setIsCheckingAuth(false);
  }, [router, isLoginPage]);

  // 로그인 페이지는 사이드바/헤더 없이 바로 렌더링
  if (isLoginPage) {
    return <>{children}</>;
  }

  // 인증 체크 중 로딩 표시
  if (isCheckingAuth) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 미인증 시 빈 화면 (리다이렉트 중)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <RoleProvider>
      <div className="h-screen bg-gray-50 flex">
        {/* 좌측 사이드바 */}
        <AdminSidebar />

        {/* 우측 콘텐츠 영역 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 상단 헤더 */}
          <AdminHeader />

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </RoleProvider>
  );
}
