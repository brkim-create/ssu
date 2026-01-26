"use client";

interface StatsOverviewProps {
  stats: {
    접수: number;
    처리중: number;
    완료: number;
  };
  completionRate: number;
  onStatClick?: (status: string) => void;
}

/**
 * StatsOverview - 민원 통계 요약 카드
 */
export default function StatsOverview({
  stats,
  completionRate,
  onStatClick,
}: StatsOverviewProps) {
  const statItems = [
    { label: "접수", value: stats.접수, color: "text-blue-500" },
    { label: "처리중", value: stats.처리중, color: "text-orange-500" },
    { label: "완료", value: stats.완료, color: "text-green-500" },
  ];

  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-white/80 text-sm">나의 민원 현황</p>
        <div className="flex items-center gap-1">
          <span className="text-white text-sm">처리율</span>
          <span className="text-white font-bold">{completionRate}%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {statItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onStatClick?.(item.label)}
            className="bg-white rounded-xl p-3 text-center hover:shadow-md transition-shadow"
          >
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-gray-600 mt-1">{item.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
