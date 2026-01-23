"use client";

import { Plus, Edit, Trash2 } from "lucide-react";
import { templatesData } from "@/data/mockData";

/**
 * Templates Page
 *
 * URL: /admin/cqi/templates
 * 답변 템플릿 관리 페이지
 */
export default function TemplatesPage() {
  return (
    <div className="p-4 bg-white h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-900">답변 템플릿</h2>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm">
          <Plus className="w-3 h-3" /> 새 템플릿
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {templatesData.map((t) => (
          <div key={t.id} className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t.category}</span>
              <div className="flex gap-1">
                <button>
                  <Edit className="w-3 h-3 text-gray-400" />
                </button>
                <button>
                  <Trash2 className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
            <p className="font-medium text-sm mb-1">{t.title}</p>
            <p className="text-xs text-gray-500 line-clamp-2">{t.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
