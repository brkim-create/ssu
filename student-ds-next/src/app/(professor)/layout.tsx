"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, BookOpen, Users, FileText, User } from "lucide-react";

interface ProfessorLayoutProps {
  children: React.ReactNode;
}

/**
 * 네비게이션 탭 설정
 * App.tsx 508~517라인 기반 - onClick 방식에서 Link 방식으로 변환
 */
const tabs = [
  { id: "dashboard", href: "/professor", icon: Home, label: "홈" },
  { id: "course", href: "/professor/course", icon: BookOpen, label: "과목" },
  { id: "students", href: "/professor/students", icon: Users, label: "학생" },
  { id: "report", href: "/professor/report", icon: FileText, label: "리포트" },
  { id: "mypage", href: "/professor/mypage", icon: User, label: "MY" },
];

/**
 * ProfessorLayout - 교수용 전용 레이아웃
 *
 * Next.js App Router의 Route Group Layout
 * - 인증 체크 후 미인증 시 로그인 페이지로 리다이렉트
 * - 하단 네비게이션 바 포함 (Link 기반 라우팅)
 * - URL 경로에 따른 탭 활성화 스타일 적용
 */
export default function ProfessorLayout({ children }: ProfessorLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 인증 체크
  useEffect(() => {
    // TODO: 실제 인증 로직 구현
    // const tokens = checkAutoLogin();
    // if (tokens && tokens.role === 'professor') {
    //   setIsAuthenticated(true);
    // } else {
    //   router.replace("/login");
    // }

    // 임시: 인증 우회 (개발 중)
    setIsAuthenticated(true);
    setIsCheckingAuth(false);
  }, [router]);

  // 인증 체크 중 로딩 표시
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-100 max-w-md mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
    <div className="min-h-screen bg-gray-100 max-w-md mx-auto relative">
      {/* Main Content Area */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation - App.tsx 508~517라인 기반 */}
      <BottomNavigation pathname={pathname} />
    </div>
  );
}

// ========== Bottom Navigation 컴포넌트 ==========

interface BottomNavigationProps {
  pathname: string;
}

/**
 * BottomNavigation - 하단 네비게이션 바
 *
 * App.tsx의 setActiveTab 방식에서 Link + usePathname 방식으로 변환
 * - 현재 경로에 따라 활성 탭 자동 판별
 * - pink-500 색상으로 활성 탭 표시
 */
function BottomNavigation({ pathname }: BottomNavigationProps) {
  /**
   * 현재 경로에 따른 활성 탭 판별
   * - /professor 정확히 일치 시 dashboard 활성
   * - /professor/xxx 로 시작하면 해당 탭 활성
   */
  const isActiveTab = (href: string) => {
    if (href === "/professor") {
      return pathname === "/professor";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const isActive = isActiveTab(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center py-2 px-3 relative transition-colors ${
                isActive ? "text-pink-500" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
