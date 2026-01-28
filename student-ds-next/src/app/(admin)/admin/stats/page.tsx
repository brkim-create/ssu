"use client";

import dynamic from "next/dynamic";
import { Search, Target, Clock } from "lucide-react";
import {
  complaintStats,
  categoryStats,
  keywordsData,
  speedData,
} from "@/data/mockData";

// recharts SSR prevention
const AdminPieChart = dynamic(
  () => import("../../_components/charts/AdminPieChart"),
  { ssr: false }
);
const AdminBarChart = dynamic(
  () => import("../../_components/charts/AdminBarChart"),
  { ssr: false }
);

/**
 * Admin Stats Page
 *
 * URL: /admin/stats
 */
export default function AdminStatsPage() {
  return (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="grid grid-cols-4 gap-3">
        {complaintStats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-3 border border-gray-200"
          >
            <p className="text-xs text-gray-500">{item.label}</p>
            <p
              className={`text-2xl font-bold ${
                item.color === "red" ? "text-red-500" : "text-gray-800"
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 bg-white rounded-lg shadow p-3 border border-gray-200">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-1.5">
            <Search className="w-4 h-4" /> {"\uD0A4\uC6CC\uB4DC \uBD84\uC11D"}
          </h3>
          <div
            className="flex flex-wrap gap-x-4 gap-y-3 items-center px-4"
            style={{
              minHeight: "140px",
              alignContent: "center",
            }}
          >
            {keywordsData.slice(0, 9).map((k, i) => (
              <span
                key={i}
                className={`${k.size} ${k.weight}`}
                style={{ color: categoryStats[i % 4].color }}
              >
                {k.word}
              </span>
            ))}
            <div className="basis-full h-0"></div>
            {keywordsData.slice(9).map((k, i) => (
              <span
                key={i + 9}
                className={`${k.size} ${k.weight}`}
                style={{ color: categoryStats[(i + 9) % 4].color }}
              >
                {k.word}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-1.5">
            <Target className="w-4 h-4" /> {"\uCE74\uD14C\uACE0\uB9AC\uBCC4 \uBBFC\uC6D0"}
          </h3>
          <div style={{ width: "100%", height: "280px", minHeight: "280px" }}>
            <AdminPieChart data={categoryStats} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {"\uC77C\uBCC4 \uCC98\uB9AC \uC2DC\uAC04"}
          </h3>
          <div style={{ width: "100%", height: "280px", minHeight: "280px" }}>
            <AdminBarChart data={speedData} />
          </div>
        </div>
      </div>
    </div>
  );
}
