"use client";

import { Plus, Edit, Trash2 } from "lucide-react";
import { templatesData } from "@/data/mockData";

/**
 * Admin Templates Page
 *
 * URL: /admin/templates
 */
export default function AdminTemplatesPage() {
  return (
    <div className="p-4 bg-white h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-900">
          {"\uB2F5\uBCC0 \uD15C\uD50C\uB9BF"}
        </h2>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm">
          <Plus className="w-3 h-3" /> {"\uC0C8 \uD15C\uD50C\uB9BF"}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {templatesData.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-lg shadow p-3 border border-gray-200"
          >
            <div className="flex justify-between mb-2">
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                {t.category}
              </span>
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
