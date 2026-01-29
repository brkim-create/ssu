"use client";

import { evidenceData, starDetails } from "@/data/mockData";

interface EvidenceSectionProps {
  limit?: number;
  onViewAll?: () => void;
}

/**
 * EvidenceSection - Evidence 활동 내역 컴포넌트
 *
 * 학습 활동 내역을 표시하고, 전체보기 기능 제공
 */
export default function EvidenceSection({
  limit = 3,
  onViewAll,
}: EvidenceSectionProps) {
  const displayData = evidenceData.slice(0, limit);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800">Evidence 트래킹</h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-pink-500 font-medium hover:text-pink-600 transition-colors"
          >
            전체 보기
          </button>
        )}
      </div>

      {/* Evidence List */}
      <div className="space-y-2">
        {displayData.map((item, idx) => (
          <EvidenceItem key={idx} item={item} />
        ))}
      </div>

      {/* Empty State */}
      {displayData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">아직 등록된 활동 내역이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

// ========== Evidence Item 컴포넌트 ==========
interface EvidenceItemProps {
  item: {
    course: string;
    task: string;
    score: string;
    competency: string;
    semester: string;
    date: string;
  };
}

function EvidenceItem({ item }: EvidenceItemProps) {
  const competencyDetail =
    starDetails[item.competency as keyof typeof starDetails];
  const bgColor = competencyDetail?.color || "#6B7280";

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3">
        {/* Competency Badge */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
          style={{ backgroundColor: bgColor }}
        >
          {item.competency}
        </div>

        {/* Course Info */}
        <div>
          <p className="font-medium text-gray-800 text-sm">{item.course}</p>
          <p className="text-xs text-gray-500">{item.task}</p>
        </div>
      </div>

      {/* Score */}
      <span className="font-bold text-green-600">{item.score}</span>
    </div>
  );
}
