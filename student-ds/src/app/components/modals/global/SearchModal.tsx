import { useState } from "react";
import { X, Search } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SearchModal - 검색 모달
 *
 * 역할:
 * - 검색어 입력 및 검색 실행
 * - 최근 검색어 표시
 */
export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`"${searchQuery}" 검색 결과를 표시합니다.`);
      setSearchQuery("");
      onClose();
    }
  };

  const handleKeywordClick = (keyword: string) => {
    alert(`"${keyword}" 검색 결과를 표시합니다.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 mx-4 animate-slide-down">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">검색</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="검색어를 입력하세요..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-500"
            autoFocus
          />
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">최근 검색어</p>
          <div className="flex flex-wrap gap-2">
            {["장학금", "휴학", "성적", "수강신청"].map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleKeywordClick(keyword)}
                className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-all"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="w-full mt-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
        >
          검색
        </button>
      </div>
    </div>
  );
}
