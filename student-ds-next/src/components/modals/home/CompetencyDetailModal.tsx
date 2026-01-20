"use client";

import { X } from "lucide-react";
import { starDetails, poDetails, skillProgress } from "@/data/mockData";

interface CompetencyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "star" | "po";
  selectedKey: string | null;
}

export default function CompetencyDetailModal({
  isOpen,
  onClose,
  type,
  selectedKey,
}: CompetencyDetailModalProps) {
  if (!isOpen || !selectedKey) return null;

  // STAR 핵심역량 모달
  if (type === "star") {
    const detail = starDetails[selectedKey];
    if (!detail) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
        <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[70vh] flex flex-col">
          {/* 고정 상단 영역 */}
          <div className="p-6 pb-4 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* 역량 아이콘 */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: detail.color }}
                >
                  {selectedKey}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-800">
                    {detail.name}
                  </h3>
                  <p className="text-sm text-gray-500">행동지표 달성도</p>
                </div>
              </div>
              <button onClick={onClose}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>

          {/* 스크롤 가능한 영역 */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-4">
              {detail.skills.map((skill, idx) => {
                const progress = skillProgress[skill] || 75;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {skill}
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {progress}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: detail.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 하위역량(PO) 모달
  if (type === "po") {
    const detail = poDetails[selectedKey];
    if (!detail) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
        <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[70vh] flex flex-col">
          {/* 고정 상단 영역 */}
          <div className="p-6 pb-4 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* 카테고리 아이콘 (연한 배경 + 색상 문자) */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                  style={{
                    backgroundColor: `${detail.color}20`,
                    color: detail.color,
                  }}
                >
                  {detail.category}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-800">
                    {detail.name}
                  </h3>
                  <p className="text-sm text-gray-500">행동지표 달성도</p>
                </div>
              </div>
              <button onClick={onClose}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>

          {/* 스크롤 가능한 영역 */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-4">
              {detail.skills.map((skill, idx) => {
                const progress = skillProgress[skill] || 75;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {skill}
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {progress}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: detail.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
