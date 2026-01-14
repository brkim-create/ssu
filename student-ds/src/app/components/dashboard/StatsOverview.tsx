import React from "react";

interface ComplaintStats {
  접수: number;
  처리중: number;
  완료: number;
}

interface StatsOverviewProps {
  stats: ComplaintStats;
  completionRate: number;
  onStatClick: (status: string) => void;
}

export default function StatsOverview({
  stats,
  completionRate,
  onStatClick,
}: StatsOverviewProps) {
  return (
    <>
      {/* Progress Bar Section */}
      <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 mb-3">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-white font-medium whitespace-nowrap">
            처리율
          </span>
          <div className="flex-1 bg-white/30 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <span className="font-bold text-white whitespace-nowrap">
            {completionRate}%
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">내 민원 현황</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onStatClick("접수")}
            className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <p className="text-2xl font-bold text-blue-600">{stats.접수}</p>
            <p className="text-xs text-gray-600">접수</p>
          </button>
          <button
            onClick={() => onStatClick("처리중")}
            className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <p className="text-2xl font-bold text-orange-600">{stats.처리중}</p>
            <p className="text-xs text-gray-600">처리중</p>
          </button>
          <button
            onClick={() => onStatClick("완료")}
            className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <p className="text-2xl font-bold text-green-600">{stats.완료}</p>
            <p className="text-xs text-gray-600">완료</p>
          </button>
        </div>
      </div>
    </>
  );
}
