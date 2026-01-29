"use client";

import { useState, useMemo } from "react";
import { ticketsData, type Ticket } from "@/data/mockData";
import { useRole } from "@/contexts/RoleContext";
import {
  STATUS_RECEIVED,
  STATUS_PROCESSING,
  STATUS_COMPLETED,
  STATUS_REJECTED,
  SUPER_ADMIN_TABS,
  GENERAL_TABS,
} from "./constants";
import TicketListPanel from "./_components/TicketListPanel";
import TicketDetailPanel from "./_components/TicketDetailPanel";
import TemplateModal from "./_components/TemplateModal";
import AssignModal from "./_components/AssignModal";

/**
 * Admin Workspace/Tickets Page
 *
 * URL: /admin/workspace
 */
export default function AdminWorkspacePage() {
  const { userRole, ROLE_SUPER_ADMIN, ROLE_GENERAL } = useRole();

  // 상태 관리
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [draftReplies, setDraftReplies] = useState<Record<number, string>>({});

  const itemsPerPage = 10;

  // 역할 기반 탭 설정
  const tabs = userRole === ROLE_GENERAL ? GENERAL_TABS : SUPER_ADMIN_TABS;

  // 역할 기반 티켓 필터링
  const filteredTickets = useMemo(() => {
    if (userRole === ROLE_GENERAL) {
      if (statusFilter === "all") {
        return ticketsData.filter(
          (t) => t.status === STATUS_PROCESSING || t.status === STATUS_COMPLETED
        );
      }
      if (statusFilter === STATUS_RECEIVED) {
        return ticketsData.filter((t) => t.status === STATUS_PROCESSING);
      }
      if (statusFilter === STATUS_COMPLETED) {
        return ticketsData.filter((t) => t.status === STATUS_COMPLETED);
      }
    } else {
      if (statusFilter === "all") {
        return ticketsData.filter((t) => t.status !== STATUS_REJECTED);
      }
      return ticketsData.filter((t) => t.status === statusFilter);
    }
    return ticketsData;
  }, [statusFilter, userRole, ROLE_GENERAL]);

  // 역할 기반 상태 카운트
  const statusCounts = useMemo((): Record<string, number> => {
    const receivedCount = ticketsData.filter((t) => t.status === STATUS_RECEIVED).length;
    const processingCount = ticketsData.filter((t) => t.status === STATUS_PROCESSING).length;
    const completedCount = ticketsData.filter((t) => t.status === STATUS_COMPLETED).length;

    if (userRole === ROLE_GENERAL) {
      return {
        all: processingCount + completedCount,
        [STATUS_RECEIVED]: processingCount,
        [STATUS_PROCESSING]: processingCount,
        [STATUS_COMPLETED]: completedCount,
      };
    }
    return {
      all: receivedCount + processingCount + completedCount,
      [STATUS_RECEIVED]: receivedCount,
      [STATUS_PROCESSING]: processingCount,
      [STATUS_COMPLETED]: completedCount,
    };
  }, [userRole, ROLE_GENERAL]);

  // 템플릿 선택 핸들러
  const handleSelectTemplate = (content: string) => {
    if (selectedTicket) {
      setDraftReplies((prev) => ({
        ...prev,
        [selectedTicket.id]: content,
      }));
    }
  };

  // 답변 변경 핸들러
  const handleDraftReplyChange = (value: string) => {
    if (selectedTicket) {
      setDraftReplies((prev) => ({
        ...prev,
        [selectedTicket.id]: value,
      }));
    }
  };

  return (
    <div className="flex h-full">
      {/* 티켓 목록 패널 */}
      <TicketListPanel
        tickets={filteredTickets}
        selectedTicketId={selectedTicket?.id ?? null}
        onSelectTicket={setSelectedTicket}
        tabs={tabs}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        statusCounts={statusCounts}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        isDetailOpen={!!selectedTicket}
      />

      {/* 티켓 상세 패널 */}
      {selectedTicket && (
        <TicketDetailPanel
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onOpenAssignModal={() => setShowAssignModal(true)}
          onOpenTemplateModal={() => setShowTemplateModal(true)}
          draftReply={draftReplies[selectedTicket.id] || ""}
          onDraftReplyChange={handleDraftReplyChange}
          isSuperAdmin={userRole === ROLE_SUPER_ADMIN}
          isGeneralRole={userRole === ROLE_GENERAL}
        />
      )}

      {/* 템플릿 모달 */}
      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* 담당자 배정 모달 */}
      <AssignModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onAssign={() => {}}
      />
    </div>
  );
}
