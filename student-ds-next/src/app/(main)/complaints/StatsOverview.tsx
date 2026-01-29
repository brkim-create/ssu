"use client";

interface StatsOverviewProps {
  stats: { 접수: number; 처리중: number; 완료: number };
  onStatClick?: (status: string) => void;
}

/**
 * StatsOverview - 민원 통계 요약 카드
 *
 * 접수/처리중/완료 상태별 민원 수 표시
 */
export default function StatsOverview({ stats, onStatClick }: StatsOverviewProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <div className="mb-3">
        <h3 className="font-bold text-gray-800">나의 민원 현황</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "접수", value: stats.접수, color: "text-blue-600" },
          { label: "처리중", value: stats.처리중, color: "text-orange-600" },
          { label: "완료", value: stats.완료, color: "text-green-600" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => onStatClick?.(item.label)}
            className="bg-gray-50 rounded-xl p-3 text-center hover:shadow-md transition-all"
          >
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-gray-600 mt-1">{item.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
