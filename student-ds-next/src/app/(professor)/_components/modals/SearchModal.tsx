"use client";

import { useState } from "react";
import { X, Search, Trophy, Users, BookOpen, FileText } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SearchModal - 통합 검색 모달 (교수용)
 *
 * 참고: student-ds/src/app/components/modals/global/SearchModal.tsx
 *
 * 기능:
 * - 검색어 입력 및 검색 실행
 * - 필터 탭 (전체, 학생, 과목, CQI)
 * - 최근 검색어, 인기 검색어, 추천 표시
 */
export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");

  if (!isOpen) return null;

  // 배경 클릭 시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 키워드 클릭 핸들러
  const handleKeywordClick = (keyword: string) => {
    alert(`"${keyword}" 검색 결과를 표시합니다.`);
    onClose();
  };

  // 검색 실행 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`"${searchQuery}" 검색 결과를 표시합니다.`);
      onClose();
    }
  };

  // 검색 기록 삭제 핸들러
  const handleClearHistory = () => {
    alert("검색 기록이 삭제되었습니다.");
  };

  // 필터 탭 정의 (교수용)
  const filters = [
    { id: "전체", label: "전체", icon: null },
    { id: "학생", label: "학생", icon: Users },
    { id: "과목", label: "과목", icon: BookOpen },
    { id: "CQI", label: "CQI", icon: FileText },
  ];

  // 최근 검색어 (교수용)
  const recentSearches = ["김민수", "자료구조", "T역량 미달", "CQI 보고서"];

  // 인기 검색어 (교수용)
  const popularSearches = ["역량 미달 학생", "출석률", "성적 입력", "강의계획서"];

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-md rounded-t-3xl h-[85vh] flex flex-col animate-slide-up">
        {/* 고정 상단 영역 */}
        <div className="p-6 pb-4 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl">통합 검색</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="닫기"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* 검색창 */}
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="학생, 과목, CQI 검색..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                autoFocus
              />
            </div>
          </form>

          {/* 필터 탭 */}
          <div className="flex gap-2 mt-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1 ${
                  activeFilter === filter.id
                    ? "bg-pink-100 text-pink-600"
                    : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                }`}
              >
                {filter.icon && <filter.icon className="w-4 h-4" />}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* 스크롤 가능한 중간 영역 */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <div className="space-y-6">
            {/* 최근 검색어 */}
            <div>
              <h4 className="font-bold text-gray-800 mb-3">최근 검색어</h4>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, idx) => (
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

            {/* 인기 검색어 */}
            <div>
              <h4 className="font-bold text-gray-800 mb-3">인기 검색어</h4>
              <div className="space-y-2">
                {popularSearches.map((term, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleKeywordClick(term)}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    <span className="text-pink-500 font-bold text-sm w-5">
                      {idx + 1}
                    </span>
                    <span className="text-gray-800">{term}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 추천 */}
            <div>
              <h4 className="font-bold text-gray-800 mb-3">추천</h4>
              <div className="space-y-2">
                <div className="p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-bold text-gray-800">
                      우수 학생 확인
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    역량 점수 상위 학생들의 성과를 확인하세요
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-bold text-gray-800">
                      CQI 보고서 작성
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    2025-1학기 CQI 보고서 제출 기한이 7일 남았습니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 고정 하단 영역 */}
        <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
          <button
            onClick={handleClearHistory}
            className="w-full py-3 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            검색 기록 전체 삭제
          </button>
        </div>

        {/* 슬라이드 애니메이션 */}
        <style jsx>{`
          @keyframes slide-up {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
          .animate-slide-up {
            animation: slide-up 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}
