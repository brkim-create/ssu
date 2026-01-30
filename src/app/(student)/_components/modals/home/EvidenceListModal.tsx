"use client";

import { useState, useRef } from "react";
import { X, ChevronRight, Download } from "lucide-react";
import { Evidence, starDetails } from "@/data/mockData";

interface EvidenceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidenceData: Evidence[];
}

export default function EvidenceListModal({
  isOpen,
  onClose,
  evidenceData,
}: EvidenceListModalProps) {
  const [evidenceFilter, setEvidenceFilter] = useState("전체");
  const [evidenceSort, setEvidenceSort] = useState("최신순");
  const filterScrollRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // 필터링된 데이터 가져오기
  const getFilteredEvidence = () => {
    let filtered = [...evidenceData];

    // 카테고리 필터
    if (evidenceFilter !== "전체") {
      filtered = filtered.filter((item) => item.competency === evidenceFilter);
    }

    // 정렬
    if (evidenceSort === "최신순") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (evidenceSort === "점수순") {
      const scoreOrder: Record<string, number> = { "A+": 5, A: 4, "B+": 3, B: 2, "C+": 1, C: 0 };
      filtered.sort((a, b) => (scoreOrder[b.score] || 0) - (scoreOrder[a.score] || 0));
    }

    return filtered;
  };

  // 학기별 그룹핑
  const groupBySemester = (data: Evidence[]) => {
    return data.reduce((acc, item) => {
      if (!acc[item.semester]) {
        acc[item.semester] = [];
      }
      acc[item.semester].push(item);
      return acc;
    }, {} as Record<string, Evidence[]>);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] flex flex-col">
        {/* 고정 상단 영역 */}
        <div className="p-6 pb-0 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-xl">Evidence 전체 내역</h3>
              <p className="text-sm text-gray-500">총 {evidenceData.length}건</p>
            </div>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* 필터 탭 */}
          <div className="flex items-center justify-between gap-3 mb-4">
            {/* 이전 버튼 */}
            <button
              onClick={() => {
                if (filterScrollRef.current) {
                  filterScrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
                }
              }}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all shrink-0"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
            </button>

            {/* 카테고리 스크롤 영역 */}
            <div
              ref={filterScrollRef}
              className="flex-1 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              <div className="flex gap-2">
                {["전체", "S", "T", "A", "R"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setEvidenceFilter(filter)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                      evidenceFilter === filter
                        ? "text-white shadow-lg"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    style={
                      evidenceFilter === filter && filter !== "전체"
                        ? { backgroundColor: starDetails[filter as keyof typeof starDetails].color }
                        : evidenceFilter === filter
                        ? { background: "linear-gradient(to right, #E94E3C, #F7941D)" }
                        : {}
                    }
                  >
                    {filter === "전체"
                      ? "전체"
                      : `${filter} (${starDetails[filter as keyof typeof starDetails].name})`}
                  </button>
                ))}
              </div>
            </div>

            {/* 다음 버튼 */}
            <button
              onClick={() => {
                if (filterScrollRef.current) {
                  filterScrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
                }
              }}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all shrink-0"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* 정렬 옵션 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              {["최신순", "학기별", "점수순"].map((sort) => (
                <button
                  key={sort}
                  onClick={() => setEvidenceSort(sort)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    evidenceSort === sort
                      ? "bg-pink-100 text-pink-600 font-medium"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 스크롤 가능한 중간 영역 */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {/* 학기별 그룹 */}
          {evidenceSort === "학기별" ? (
            <div className="space-y-4">
              {Object.entries(groupBySemester(getFilteredEvidence())).map(
                ([semester, items]) => (
                  <div key={semester}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                      <h4 className="font-bold text-gray-800">{semester}</h4>
                      <span className="text-xs text-gray-500">({items.length}건)</span>
                    </div>
                    <div className="space-y-2">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                              style={{
                                backgroundColor:
                                  starDetails[item.competency as keyof typeof starDetails].color,
                              }}
                            >
                              {item.competency}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">{item.course}</p>
                              <p className="text-xs text-gray-500">{item.task}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                            </div>
                          </div>
                          <span className="font-bold text-green-600">{item.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {getFilteredEvidence().map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{
                        backgroundColor:
                          starDetails[item.competency as keyof typeof starDetails].color,
                      }}
                    >
                      {item.competency}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{item.course}</p>
                      <p className="text-xs text-gray-500">{item.task}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.semester} · {item.date}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">{item.score}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 고정 하단 영역 */}
        <div className="p-6 pt-4 shrink-0">
          <button className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            PDF로 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
