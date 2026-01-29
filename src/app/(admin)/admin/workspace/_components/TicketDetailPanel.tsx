"use client";

import { X, XCircle } from "lucide-react";
import { type Ticket } from "@/data/mockData";
import { getStatusBadgeClass } from "@shared/theme";
import { STATUS_REJECTED, STATUS_COMPLETED } from "../constants";
import TicketProgressSteps from "./TicketProgressSteps";
import TicketChatMessages from "./TicketChatMessages";
import TicketReplyInput from "./TicketReplyInput";

interface TicketDetailPanelProps {
  ticket: Ticket;
  onClose: () => void;
  onOpenAssignModal: () => void;
  onOpenTemplateModal: () => void;
  draftReply: string;
  onDraftReplyChange: (value: string) => void;
  isSuperAdmin: boolean;
  isGeneralRole: boolean;
}

export default function TicketDetailPanel({
  ticket,
  onClose,
  onOpenAssignModal,
  onOpenTemplateModal,
  draftReply,
  onDraftReplyChange,
  isSuperAdmin,
  isGeneralRole,
}: TicketDetailPanelProps) {
  return (
    <div className="w-1/2 flex flex-col bg-white">
      {/* 헤더 */}
      <div className="p-3 border-b border-gray-300">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-xs ${getStatusBadgeClass(
                ticket.status
              )}`}
            >
              {ticket.status}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">담당자:</span>
              <span className="font-medium text-sm text-gray-900">
                {ticket.assignee || "미배정"}
              </span>
              <button
                onClick={onOpenAssignModal}
                className="px-2 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
              >
                {ticket.assignee ? "변경" : "배정"}
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <h2 className="font-bold text-gray-900 mb-1">{ticket.title}</h2>
        <div className="text-xs text-gray-600">
          #{ticket.id.toString().padStart(6, "0")} · {ticket.category}
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 overflow-y-auto p-3 bg-white">
        {/* 진행 단계 (슈퍼관리자만) */}
        {isSuperAdmin && <TicketProgressSteps status={ticket.status} />}

        {/* 반려 사유 */}
        {ticket.status === STATUS_REJECTED && ticket.rejectedReason && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-red-900 mb-1">
                  반려 사유
                </div>
                <p className="text-sm text-red-700">{ticket.rejectedReason}</p>
              </div>
            </div>
          </div>
        )}

        {/* 채팅 메시지 */}
        <TicketChatMessages ticket={ticket} />
      </div>

      {/* 답변 입력 (일반담당자 + 미완료 상태) */}
      {isGeneralRole && ticket.status !== STATUS_COMPLETED && (
        <TicketReplyInput
          draftReply={draftReply}
          onDraftReplyChange={onDraftReplyChange}
          onOpenTemplateModal={onOpenTemplateModal}
        />
      )}
    </div>
  );
}
