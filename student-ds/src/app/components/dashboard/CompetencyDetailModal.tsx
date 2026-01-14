import React from "react";
import { X } from "lucide-react";
import { StarDetail, PODetail } from "../../../data/mockData";

interface CompetencyDetailModalProps {
  type: "star" | "po";
  selectedKey: string | null;
  details: Record<string, StarDetail> | Record<string, PODetail>;
  onClose: () => void;
}

/**
 * CompetencyDetailModal - STAR/PO 역량 상세 모달
 *
 * 역할:
 * - STAR 핵심역량 또는 전공능력(PO) 상세 분석 표시
 * - 하위 스킬별 진행률 바 표시
 */
export default function CompetencyDetailModal({
  type,
  selectedKey,
  details,
  onClose,
}: CompetencyDetailModalProps) {
  if (!selectedKey) return null;

  const detail = details[selectedKey];
  if (!detail) return null;

  const isStar = type === "star";
  const starDetail = detail as StarDetail;
  const poDetail = detail as PODetail;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {isStar ? (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: starDetail.color }}
              >
                {selectedKey}
              </div>
            ) : (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                style={{
                  backgroundColor: `${poDetail.color}20`,
                  color: poDetail.color,
                }}
              >
                {poDetail.category}
              </div>
            )}
            <div>
              <h3 className="font-bold text-xl">
                {isStar ? `${starDetail.name} 역량` : poDetail.name}
              </h3>
              <p className="text-gray-500">역량 상세 분석</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="space-y-3">
          {detail.skills.map((skill, idx) => {
            const progress = Math.floor(Math.random() * 40) + 60;
            return (
              <div key={idx} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{skill}</span>
                  <span className="font-bold" style={{ color: detail.color }}>
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: detail.color,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
