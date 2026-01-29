"use client";

import { Search, Filter } from "lucide-react";
import { type Ticket } from "@/data/mockData";
import { getStatusBadgeClass } from "@shared/theme";

interface TicketListPanelProps {
  tickets: Ticket[];
  selectedTicketId: number | null;
  onSelectTicket: (ticket: Ticket) => void;
  tabs: { key: string; label: string }[];
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  statusCounts: Record<string, number>;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  isDetailOpen: boolean;
}

export default function TicketListPanel({
  tickets,
  selectedTicketId,
  onSelectTicket,
  tabs,
  statusFilter,
  onStatusFilterChange,
  statusCounts,
  currentPage,
  onPageChange,
  itemsPerPage,
  isDetailOpen,
}: TicketListPanelProps) {
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const paginatedTickets = tickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className={`${
        isDetailOpen ? "w-1/2 border-r border-gray-300" : "w-full"
      } flex flex-col`}
    >
      {/* 탭 필터 */}
      <div className="flex border-b border-gray-300 bg-white px-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              onStatusFilterChange(tab.key);
              onPageChange(1);
            }}
            className={`px-3 py-2 text-sm border-b-2 ${
              statusFilter === tab.key
                ? "border-pink-500 text-pink-500"
                : "border-transparent text-gray-600"
            }`}
          >
            {tab.label}{" "}
            <span
              className={`ml-1 px-1.5 rounded-full text-xs ${
                statusFilter === tab.key
                  ? "bg-pink-100 text-pink-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {statusCounts[tab.key] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* 검색 바 */}
      <div className="p-3 bg-white border-b border-gray-300 flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="검색..."
            className="w-full pl-8 pr-3 py-1.5 border border-gray-300 bg-white text-gray-900 rounded text-sm"
          />
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 bg-white text-gray-700 rounded text-sm hover:bg-gray-50">
          <Filter className="w-3 h-3" /> 필터
        </button>
      </div>

      {/* 테이블 */}
      <div className="flex-1 overflow-y-auto bg-white">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-300 sticky top-0">
            <tr>
              <th className="pl-6 pr-3 py-2 text-left text-xs font-medium text-gray-700">
                문의날짜
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                제목
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                카테고리
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                작성자
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                담당자
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                상태
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTickets.map((ticket) => (
              <tr
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                className={`border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedTicketId === ticket.id ? "bg-pink-50" : ""
                }`}
              >
                <td className="pl-6 pr-3 py-3 text-xs text-gray-600">
                  {ticket.date}
                </td>
                <td className="px-3 py-3 text-sm font-medium text-gray-900">
                  {ticket.title}
                </td>
                <td className="px-3 py-3 text-xs text-gray-600">
                  {ticket.category}
                </td>
                <td className="px-3 py-3 text-xs text-gray-600">
                  {ticket.author}
                </td>
                <td className="px-3 py-3 text-xs text-gray-600">
                  {ticket.assignee || "-"}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${getStatusBadgeClass(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="bg-white border-t border-gray-300 px-3 py-2 flex items-center justify-between relative">
        <div className="text-xs text-gray-600">
          총 {tickets.length}건 중 {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, tickets.length)}건 표시
        </div>
        <div className="flex gap-1 absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-2 py-1 text-xs border rounded ${
                currentPage === page
                  ? "bg-pink-600 text-white border-pink-600"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
