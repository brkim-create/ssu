"use client";

import { Bot, Plus, Edit } from "lucide-react";
import { faqScenarios } from "@/data/mockData";

/**
 * Scenario Management Page
 *
 * URL: /admin/system/scenario
 * 시나리오 관리 페이지 (시스템 관리 서브메뉴)
 */
export default function ScenarioPage() {
  return (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-pink-500" />
          <h2 className="font-bold text-gray-900">시나리오 관리</h2>
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm">
          <Plus className="w-3 h-3" /> 새 시나리오
        </button>
      </div>

      {/* 시나리오 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">카테고리</th>
              <th className="text-left p-3">질문</th>
              <th className="text-left p-3">답변</th>
              <th className="text-center p-3">관리</th>
            </tr>
          </thead>
          <tbody>
            {faqScenarios.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                    {f.category}
                  </span>
                </td>
                <td className="p-3 font-medium">{f.question}</td>
                <td className="p-3 text-gray-600">{f.answer}</td>
                <td className="p-3 text-center">
                  <button>
                    <Edit className="w-3 h-3 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 안내 메시지 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          💡 챗봇 고도화 대비: 현재는 FAQ 기반만 지원
        </p>
      </div>
    </div>
  );
}
