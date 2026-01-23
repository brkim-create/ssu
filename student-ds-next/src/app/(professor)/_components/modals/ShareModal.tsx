"use client";

import { X, MessageCircle, Copy, Download } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ShareModal - 공유하기 모달 (교수용)
 *
 * 참고: student-ds/src/app/components/modals/global/ShareModal.tsx
 *
 * 기능:
 * - 교과목 역량 리포트 공유 (카카오톡, 링크복사, PDF 다운로드)
 */
export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  if (!isOpen) return null;

  // 배경 클릭 시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 링크 복사 핸들러
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://professor-dashboard.example.com/report/course/1"
      );
      alert("링크가 복사되었습니다!");
    } catch (err) {
      alert("링크 복사에 실패했습니다.");
    }
  };

  // 카카오톡 공유 핸들러
  const handleKakaoShare = () => {
    // TODO: 카카오 SDK 연동
    alert("카카오톡 공유 기능은 준비 중입니다.");
  };

  // PDF 다운로드 핸들러
  const handlePdfDownload = () => {
    // TODO: PDF 생성 및 다운로드
    alert("PDF 다운로드 기능은 준비 중입니다.");
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">교과목 역량 리포트 공유</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="닫기"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          학생 역량 분석 리포트를 공유하세요
        </p>

        {/* 공유 옵션들 */}
        <div className="space-y-3">
          <button
            onClick={handleKakaoShare}
            className="w-full py-4 bg-yellow-400 text-gray-800 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            카카오톡으로 공유
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full py-4 bg-blue-50 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-100 transition-all"
          >
            <Copy className="w-5 h-5" />
            링크 복사
          </button>

          <button
            onClick={handlePdfDownload}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all"
          >
            <Download className="w-5 h-5" />
            PDF로 다운로드
          </button>
        </div>

        {/* 안내 문구 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500">
            공유된 리포트는 7일간 유효합니다. CQI 보고서로도 활용할 수 있습니다.
          </p>
        </div>

        {/* 슬라이드 애니메이션 */}
        <style jsx>{`
          @keyframes slide-up {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
          .animate-slide-up {
            animation: slide-up 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}
