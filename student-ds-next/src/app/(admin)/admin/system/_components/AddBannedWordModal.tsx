"use client";

import { X } from "lucide-react";

interface AddBannedWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

/**
 * AddBannedWordModal - 금칙어 추가 모달
 */
export default function AddBannedWordModal({
  isOpen,
  onClose,
  value,
  onChange,
  onSubmit,
}: AddBannedWordModalProps) {
  if (!isOpen) return null;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-gray-900">금칙어 추가</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            금칙어
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="추가할 금칙어를 입력하세요"
          />
        </div>
        <div className="flex gap-2 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded hover:opacity-90"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
