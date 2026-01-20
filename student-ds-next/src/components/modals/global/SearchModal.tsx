"use client";

import { useState } from "react";
import { X, Search, Trophy } from "lucide-react";
import { searchData } from "@/data/mockData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");

  if (!isOpen) return null;

  const handleKeywordClick = (keyword: string) => {
    alert(`"${keyword}" 검색 결과를 표시합니다.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl h-[85vh] flex flex-col">
        <div className="p-6 pb-4 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl">통합 검색</h3>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Evidence, 민원, 알림 검색..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              autoFocus
            />
          </div>

          <div className="flex gap-2 mt-4">
            {searchData.filterTabs.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeFilter === filter
                    ? "bg-pink-100 text-pink-600"
                    : "bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-800 mb-3">최근 검색어</h4>
              <div className="flex flex-wrap gap-2">
                {searchData.recentSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleKeywordClick(term)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-3">인기 검색어</h4>
              <div className="space-y-2">
                {searchData.popularSearches.map((term, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleKeywordClick(term)}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    <span className="text-pink-500 font-bold text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-gray-800">{term}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-3">추천</h4>
              {searchData.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-bold text-gray-800">
                      {rec.title}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
          <button className="w-full py-3 text-gray-500 text-sm">
            검색 기록 전체 삭제
          </button>
        </div>
      </div>
    </div>
  );
}
