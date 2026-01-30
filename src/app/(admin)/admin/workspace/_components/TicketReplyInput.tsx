"use client";

import { FileText, Paperclip, Send, CheckCircle } from "lucide-react";

interface TicketReplyInputProps {
  draftReply: string;
  onDraftReplyChange: (value: string) => void;
  onOpenTemplateModal: () => void;
}

export default function TicketReplyInput({
  draftReply,
  onDraftReplyChange,
  onOpenTemplateModal,
}: TicketReplyInputProps) {
  return (
    <div className="border-t border-gray-300 p-3 bg-gray-50">
      <div className="flex gap-2 mb-2">
        <button
          onClick={onOpenTemplateModal}
          className="px-3 py-1.5 text-xs border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
        >
          <FileText className="w-3 h-3 inline mr-1" />
          템플릿
        </button>
      </div>
      <textarea
        value={draftReply}
        onChange={(e) => onDraftReplyChange(e.target.value)}
        placeholder="답변을 입력하세요..."
        className="w-full px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        rows={4}
      />
      <div className="flex justify-between items-center mt-2">
        <button className="text-gray-500 hover:text-gray-700">
          <Paperclip className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50">
            임시 저장
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1">
            <Send className="w-3 h-3" /> 전송
          </button>
          <button className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> 완료
          </button>
        </div>
      </div>
    </div>
  );
}
