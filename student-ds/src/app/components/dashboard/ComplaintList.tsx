import React from "react";
import { getIcon } from "../../../utils/iconMapper";

interface ComplaintCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
  items: string[];
}

interface ComplaintListProps {
  categories: ComplaintCategory[];
  onCategoryClick: (category: ComplaintCategory) => void;
}

export default function ComplaintList({
  categories,
  onCategoryClick,
}: ComplaintListProps) {
  return (
    <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
      <h3 className="font-bold text-gray-800 mb-3">민원 카테고리</h3>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryClick(cat)}
            className="bg-gray-50 rounded-2xl shadow p-5 text-left hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              {(() => {
                const Icon = getIcon(cat.icon);
                return <Icon className="w-6 h-6 text-gray-500" />;
              })()}
            </div>
            <p className="font-bold text-gray-800 mb-1">{cat.name}</p>
            <p className="text-xs text-gray-500">
              {cat.items.length}개 세부항목
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
