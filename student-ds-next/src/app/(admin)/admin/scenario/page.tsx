"use client";

import { Bot, Plus, Edit } from "lucide-react";
import { faqScenarios } from "@/data/mockData";

/**
 * Admin Scenario Page
 *
 * URL: /admin/scenario
 */
export default function AdminScenarioPage() {
  return (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-pink-500" />
          <h2 className="font-bold text-gray-900">
            {"\uC2DC\uB098\uB9AC\uC624 \uAD00\uB9AC"}
          </h2>
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm">
          <Plus className="w-3 h-3" /> {"\uC0C8 \uC2DC\uB098\uB9AC\uC624"}
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">{"\uCE74\uD14C\uACE0\uB9AC"}</th>
              <th className="text-left p-3">{"\uC9C8\uBB38"}</th>
              <th className="text-left p-3">{"\uB2F5\uBCC0"}</th>
              <th className="text-center p-3">{"\uAD00\uB9AC"}</th>
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
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          {"\uD83D\uDCA1 \uCC57\uBD07 \uACE0\uB3C4\uD654 \uB300\uBE44: \uD604\uC7AC\uB294 FAQ \uAE30\uBC18\uB9CC \uC9C0\uC6D0"}
        </p>
      </div>
    </div>
  );
}
