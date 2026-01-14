import React from "react";
import { X, ChevronDown } from "lucide-react";
import { FAQ } from "../../../data/mockData";

interface FAQModalProps {
  isOpen: boolean;
  faqData: FAQ[];
  expandedId: number | null;
  onExpandChange: (id: number | null) => void;
  onClose: () => void;
}

/**
 * FAQModal - 자주 묻는 질문 모달
 *
 * 역할:
 * - FAQ 목록 표시
 * - 아코디언 스타일 확장/축소
 */
export default function FAQModal({
  isOpen,
  faqData,
  expandedId,
  onExpandChange,
  onClose,
}: FAQModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">자주 묻는 질문</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="space-y-2">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  onExpandChange(expandedId === faq.id ? null : faq.id)
                }
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedId === faq.id && (
                <div className="px-4 pb-4 text-gray-600 text-sm bg-gray-50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
