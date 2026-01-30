"use client";

import { Trophy, Star, Check, TrendingUp } from "lucide-react";
import { starDetails, poDetails } from "@/data/mockData";
import { gradeBadgeTailwind } from "@shared/theme";

type ViewMode = "core" | "po";

interface CompetencyGridProps {
  mode: ViewMode;
  onSelectStar?: (key: string) => void;
  onSelectPO?: (key: string) => void;
}

// Grade Badge 아이콘 매핑
const gradeIcons: Record<string, React.ReactNode> = {
  마스터: <Trophy className="w-3 h-3" />,
  우수: <Star className="w-3 h-3" />,
  보통: <Check className="w-3 h-3" />,
  노력요망: <TrendingUp className="w-3 h-3" />,
};

// Grade Badge 설정 (theme 색상 + 아이콘)
const gradeBadge: Record<string, { bg: string; icon: React.ReactNode }> = {
  마스터: { bg: gradeBadgeTailwind.마스터.bg, icon: gradeIcons.마스터 },
  우수: { bg: gradeBadgeTailwind.우수.bg, icon: gradeIcons.우수 },
  보통: { bg: gradeBadgeTailwind.보통.bg, icon: gradeIcons.보통 },
  노력요망: { bg: gradeBadgeTailwind.노력요망.bg, icon: gradeIcons.노력요망 },
};

/**
 * CompetencyGrid - 역량 상세 카드 그리드 컴포넌트
 *
 * STAR 핵심역량 또는 전공능력(PO) 카드를 표시
 */
export default function CompetencyGrid({
  mode,
  onSelectStar,
  onSelectPO,
}: CompetencyGridProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <h3 className="font-bold text-gray-800 mb-3">역량 등급</h3>

      {mode === "core" ? (
        <StarCompetencyGrid onSelect={onSelectStar} />
      ) : (
        <POCompetencyGrid onSelect={onSelectPO} />
      )}
    </div>
  );
}

// ========== STAR 핵심역량 그리드 ==========
interface StarGridProps {
  onSelect?: (key: string) => void;
}

function StarCompetencyGrid({ onSelect }: StarGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(starDetails).map(([key, value]) => (
        <div
          key={key}
          onClick={() => onSelect?.(key)}
          className="bg-gray-50 rounded-2xl shadow p-4 cursor-pointer hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center justify-center gap-1">
              <div
                className="w-10 h-10 flex items-center justify-center font-bold text-2xl"
                style={{ color: "#0f172a" }}
              >
                {key}
              </div>
              <p className="text-sm text-gray-600">{value.name}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-2xl font-bold" style={{ color: "#0f172a" }}>
                {value.score}점
              </p>
              <GradeBadge grade={value.grade} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ========== 전공능력(PO) 그리드 ==========
interface POGridProps {
  onSelect?: (key: string) => void;
}

function POCompetencyGrid({ onSelect }: POGridProps) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {Object.entries(poDetails).map(([key, value]) => (
        <div
          key={key}
          onClick={() => onSelect?.(key)}
          className="bg-gray-50 rounded-xl shadow p-3 cursor-pointer hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  backgroundColor: `${value.color}20`,
                  color: value.color,
                }}
              >
                {value.category}
              </div>
              <p className="text-sm font-medium text-gray-800">{value.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-lg font-bold text-gray-800">{value.score}점</p>
              <GradeBadge grade={value.grade} size="lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ========== Grade Badge 컴포넌트 ==========
interface GradeBadgeProps {
  grade: string;
  size?: "sm" | "lg";
}

function GradeBadge({ grade, size = "sm" }: GradeBadgeProps) {
  const badge = gradeBadge[grade];
  const textColor = grade === "보통" ? "text-[#0f172a]" : "text-white";

  if (size === "lg") {
    return (
      <div
        className={`${badge.bg} ${textColor} text-[10px] px-2 py-1.5 rounded-full inline-flex items-center justify-center gap-1 whitespace-nowrap min-w-[60px]`}
      >
        <span>{badge.icon}</span>
        <span className="text-[11px]">{grade}</span>
      </div>
    );
  }

  return (
    <div
      className={`${badge.bg} ${textColor} text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 whitespace-nowrap`}
    >
      <span>{badge.icon}</span>
      <span className="text-[12px]">{grade}</span>
    </div>
  );
}
