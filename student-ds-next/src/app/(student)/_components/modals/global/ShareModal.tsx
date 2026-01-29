"use client";

import { X, MessageCircle, Copy, Download } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">내 역량 리포트 공유</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          역량 점수와 리포트를 공유하세요
        </p>

        <div className="space-y-3">
          <button className="w-full py-4 bg-yellow-400 text-gray-800 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all">
            <MessageCircle className="w-5 h-5" />
            카카오톡으로 공유
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(
                "https://student-dashboard.example.com/report/김수성"
              );
              alert("링크가 복사되었습니다!");
            }}
            className="w-full py-4 bg-blue-50 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-100 transition-all"
          >
            <Copy className="w-5 h-5" />
            링크 복사
          </button>

          <button className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all">
            <Download className="w-5 h-5" />
            PDF로 다운로드
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500">
            💡 공유된 리포트는 7일간 유효합니다
          </p>
        </div>
      </div>
    </div>
  );
}
