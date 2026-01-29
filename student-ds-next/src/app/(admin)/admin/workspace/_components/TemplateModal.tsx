"use client";

import { X } from "lucide-react";
import { templatesData } from "@/data/mockData";

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (content: string) => void;
}

export default function TemplateModal({
  isOpen,
  onClose,
  onSelectTemplate,
}: TemplateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-gray-900">답변 템플릿</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          <div className="space-y-2">
            {templatesData.map((template) => (
              <div
                key={template.id}
                onClick={() => {
                  onSelectTemplate(template.content);
                  onClose();
                }}
                className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                    {template.category}
                  </span>
                  <h4 className="font-medium text-sm">{template.title}</h4>
                </div>
                <p className="text-sm text-gray-600">{template.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
