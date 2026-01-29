"use client";

import { useState } from "react";
import { CheckCircle, Star } from "lucide-react";

interface RatingModalProps {
  isOpen: boolean;
  onSubmit: (rating: number, comment: string) => void;
  onCancel: () => void;
}

const RATING_LABELS: Record<number, string> = {
  0: "선택해주세요",
  1: "매우 불만족",
  2: "불만족",
  3: "보통",
  4: "만족",
  5: "매우 만족",
};

/**
 * RatingModal - 민원 만족도 평가 모달
 *
 * 민원 처리 완료 후 사용자가 만족도를 평가할 수 있는 공통 모달 컴포넌트
 */
export default function RatingModal({
  isOpen,
  onSubmit,
  onCancel,
}: RatingModalProps) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedRating > 0) {
      onSubmit(selectedRating, ratingComment);
      // Reset state after submit
      setSelectedRating(0);
      setRatingComment("");
    }
  };

  const handleCancel = () => {
    onCancel();
    // Reset state on cancel
    setSelectedRating(0);
    setRatingComment("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-bold text-xl mb-2">민원 처리가 완료되었습니다</h3>
          <p className="text-sm text-gray-500">처리 결과에 대해 평가해주세요</p>
        </div>

        {/* 별점 */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3 text-center">
            만족도를 선택해주세요
          </p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => setSelectedRating(rating)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    rating <= selectedRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-500">
              {RATING_LABELS[selectedRating]}
            </span>
          </div>
        </div>

        {/* 추가 의견 */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            추가 의견 (선택)
          </label>
          <textarea
            value={ratingComment}
            onChange={(e) => setRatingComment(e.target.value)}
            placeholder="더 좋은 서비스를 위한 의견을 남겨주세요"
            className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
          >
            나중에
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedRating === 0}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              selectedRating === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg"
            }`}
          >
            평가 제출
          </button>
        </div>
      </div>
    </div>
  );
}
