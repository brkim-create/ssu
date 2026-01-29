import { ReactNode } from "react";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * DashboardCard - 대시보드 카드 래퍼 컴포넌트
 *
 * 공통 스타일: mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4
 */
export default function DashboardCard({ children, className = "" }: DashboardCardProps) {
  return (
    <div className={`mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4 ${className}`.trim()}>
      {children}
    </div>
  );
}
