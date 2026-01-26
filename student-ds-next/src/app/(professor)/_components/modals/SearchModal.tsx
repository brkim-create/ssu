"use client";

import { X, Search } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SearchModal - 통합 검색 모달
 */
export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 h-[80vh]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">통합 검색</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="학생, 과목, 리포트 검색..."
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            autoFocus
          />
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-gray-800">최근 검색</h4>
          {["김민수", "데이터구조", "CQI 보고서"].map((term, idx) => (
            <button
              key={idx}
              className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
