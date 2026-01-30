import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Student Dashboard - 수성대학교",
  description: "수성대학교 학생종합지원프로그램 (AI-DX Observer)",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * RootLayout - 루트 레이아웃
 *
 * 전역 CSS, 폰트, 메타데이터 설정
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
