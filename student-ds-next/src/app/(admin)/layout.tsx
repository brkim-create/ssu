import AdminSidebar from "./_components/AdminSidebar";
import { RoleProvider } from "@/contexts/RoleContext";

/**
 * Admin Layout
 *
 * 좌측 사이드바 + 우측 콘텐츠 영역 구조
 * admin-ds-ui App.tsx 1360~1454라인 기반 마이그레이션
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProvider>
      <div className="h-screen bg-gray-50 flex">
        {/* 좌측 사이드바 */}
        <AdminSidebar />

        {/* 우측 콘텐츠 영역 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </RoleProvider>
  );
}
