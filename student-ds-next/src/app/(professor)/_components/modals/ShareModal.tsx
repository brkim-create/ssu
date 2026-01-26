"use client";

import { X, Download, Share2 } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ShareModal - 리포트 공유 모달 (교수용)
 * 프로토타입 기반
 */
export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">리포트 공유</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="space-y-3">
          <button className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-3">
            <Download className="w-5 h-5" />
            PDF로 다운로드
          </button>
          <button className="w-full py-4 bg-blue-50 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-3">
            <Share2 className="w-5 h-5" />
            이메일로 공유
          </button>
        </div>
      </div>
    </div>
  );
}
