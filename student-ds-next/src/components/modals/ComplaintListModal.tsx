"use client";

import { X } from "lucide-react";
import { Complaint } from "@/data/mockData";

interface ComplaintListModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaints: Complaint[];
}

// 상태별 스타일 매핑
const statusStyle: Record<string, { bg: string; text: string }> = {
  접수: { bg: "bg-blue-100", text: "text-blue-600" },
  처리중: { bg: "bg-orange-100", text: "text-orange-600" },
  완료: { bg: "bg-green-100", text: "text-green-600" },
};

/**
 * ComplaintListModal - 민원 내역 전체 보기 모달
 *
 * 역할:
 * - 내가 작성한 민원 내역 표시
 * - 상태별 색상 배지
 */
export default function ComplaintListModal({
  isOpen,
  onClose,
  complaints,
}: ComplaintListModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">내 민원 내역</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {complaints.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">작성한 민원이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {complaints.map((complaint) => {
              const style = statusStyle[complaint.status] || statusStyle["접수"];
              return (
                <div
                  key={complaint.id}
                  className="p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {complaint.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {complaint.category} · {complaint.date}
                      </p>
                    </div>
                    <span
                      className={`${style.bg} ${style.text} text-xs px-2 py-1 rounded-full font-medium`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                  {complaint.adminResponse && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">답변:</span>{" "}
                        {complaint.adminResponse}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
