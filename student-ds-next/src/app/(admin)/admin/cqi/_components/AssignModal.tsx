"use client";

import { X } from "lucide-react";
import { assigneeOptions } from "@/data/mockData";

interface AssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: () => void;
}

export default function AssignModal({
  isOpen,
  onClose,
  onAssign,
}: AssignModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-gray-900">담당자 배정</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            {assigneeOptions.map((opt) => (
              <option key={opt.id}>
                {opt.department} {opt.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2 justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
            >
              취소
            </button>
            <button
              onClick={() => {
                onAssign();
                onClose();
              }}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              배정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
