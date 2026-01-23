"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  X,
  XCircle,
  FileText,
  Paperclip,
  Send,
  CheckCircle,
} from "lucide-react";
import {
  ticketsData,
  templatesData,
  assigneeOptions,
  type Ticket,
} from "@/data/mockData";
import { getStatusBadgeClass, chatColors } from "@shared/theme";

// Role constants
const ROLE_SUPER_ADMIN = "\uC288\uD37C\uAD00\uB9AC\uC790";
const ROLE_GENERAL = "\uC77C\uBC18\uB2F4\uB2F9\uC790";
const STATUS_RECEIVED = "\uC811\uC218";
const STATUS_PROCESSING = "\uCC98\uB9AC\uC911";
const STATUS_COMPLETED = "\uC644\uB8CC";
const STATUS_REJECTED = "\uBC18\uB824\uB428";
const CATEGORY_FACILITY = "\uC2DC\uC124";

const userRole: string = ROLE_SUPER_ADMIN;

/**
 * Admin CQI/Tickets Page
 *
 * URL: /admin/cqi
 */
export default function AdminCQIPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [draftReplies, setDraftReplies] = useState<Record<number, string>>({});

  const itemsPerPage = 10;

  const tabs =
    userRole === ROLE_GENERAL
      ? [
          { key: "all", label: "\uC804\uCCB4" },
          { key: STATUS_RECEIVED, label: "\uC811\uC218" },
          { key: STATUS_COMPLETED, label: "\uC644\uB8CC" },
        ]
      : [
          { key: "all", label: "\uC804\uCCB4" },
          { key: STATUS_RECEIVED, label: "\uC811\uC218" },
          { key: STATUS_PROCESSING, label: "\uCC98\uB9AC\uC911" },
          { key: STATUS_COMPLETED, label: "\uC644\uB8CC" },
        ];

  const filteredTickets = useMemo(() => {
    if (statusFilter === "all") return ticketsData;
    return ticketsData.filter((t) => t.status === statusFilter);
  }, [statusFilter]);

  const statusCounts = useMemo(() => {
    return {
      all: ticketsData.length,
      [STATUS_RECEIVED]: ticketsData.filter((t) => t.status === STATUS_RECEIVED).length,
      [STATUS_PROCESSING]: ticketsData.filter((t) => t.status === STATUS_PROCESSING).length,
      [STATUS_COMPLETED]: ticketsData.filter((t) => t.status === STATUS_COMPLETED).length,
    };
  }, []);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-full">
      <div
        className={`${
          selectedTicket ? "w-1/2 border-r border-gray-300" : "w-full"
        } flex flex-col`}
      >
        <div className="flex border-b border-gray-300 bg-white px-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setStatusFilter(tab.key);
                setCurrentPage(1);
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
                {statusCounts[tab.key as keyof typeof statusCounts]}
              </span>
            </button>
          ))}
        </div>

        <div className="p-3 bg-white border-b border-gray-300 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={"\uAC80\uC0C9..."}
              className="w-full pl-8 pr-3 py-1.5 border border-gray-300 bg-white text-gray-900 rounded text-sm"
            />
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 bg-white text-gray-700 rounded text-sm hover:bg-gray-50">
            <Filter className="w-3 h-3" /> {"\uD544\uD130"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-300 sticky top-0">
              <tr>
                <th className="pl-6 pr-3 py-2 text-left text-xs font-medium text-gray-700">
                  {"\uBB38\uC758\uB0A0\uC9DC"}
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                  {"\uC81C\uBAA9"}
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                  {"\uCE74\uD14C\uACE0\uB9AC"}
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                  {"\uC791\uC131\uC790"}
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                  {"\uB2F4\uB2F9\uC790"}
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                  {"\uC0C1\uD0DC"}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    selectedTicket?.id === ticket.id ? "bg-pink-50" : ""
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

        <div className="bg-white border-t border-gray-300 px-3 py-2 flex items-center justify-between relative">
          <div className="text-xs text-gray-600">
            {"\uCD1D"} {filteredTickets.length}
            {"\uAC74 \uC911"} {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredTickets.length)}
            {"\uAC74 \uD45C\uC2DC"}
          </div>
          <div className="flex gap-1 absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {"\uC774\uC804"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
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
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {"\uB2E4\uC74C"}
            </button>
          </div>
        </div>
      </div>

      {selectedTicket && (
        <div className="w-1/2 flex flex-col bg-white">
          <div className="p-3 border-b border-gray-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs ${getStatusBadgeClass(
                    selectedTicket.status
                  )}`}
                >
                  {selectedTicket.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">{"\uB2F4\uB2F9\uC790"}:</span>
                  <span className="font-medium text-sm text-gray-900">
                    {selectedTicket.assignee || "\uBBF8\uBC30\uC815"}
                  </span>
                  <button
                    onClick={() => setShowAssignModal(true)}
                    className="px-2 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
                  >
                    {selectedTicket.assignee ? "\uBCC0\uACBD" : "\uBC30\uC815"}
                  </button>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h2 className="font-bold text-gray-900 mb-1">{selectedTicket.title}</h2>
            <div className="text-xs text-gray-600">
              #{selectedTicket.id.toString().padStart(6, "0")} ·{" "}
              {selectedTicket.category}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 bg-white">
            {userRole === ROLE_SUPER_ADMIN && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                <div className="flex items-center text-xs">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                    <span className="mt-1 text-[10px]">{"\uC811\uC218"}</span>
                  </div>
                  <div
                    className={`flex-1 h-0.5 mx-1 ${
                      selectedTicket.status !== STATUS_RECEIVED
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  ></div>

                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 ${
                        selectedTicket.status !== STATUS_RECEIVED
                          ? "bg-green-500"
                          : "bg-gray-300"
                      } rounded-full flex items-center justify-center text-white text-xs`}
                    >
                      {selectedTicket.status !== STATUS_RECEIVED ? "✓" : "2"}
                    </div>
                    <span className="mt-1 text-[10px]">{"\uBC30\uC815"}</span>
                  </div>
                  <div
                    className={`flex-1 h-0.5 mx-1 ${
                      selectedTicket.status === STATUS_PROCESSING ||
                      selectedTicket.status === STATUS_COMPLETED
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  ></div>

                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 ${
                        selectedTicket.status === STATUS_PROCESSING
                          ? "bg-orange-500"
                          : selectedTicket.status === STATUS_COMPLETED
                          ? "bg-green-500"
                          : "bg-gray-300"
                      } rounded-full flex items-center justify-center text-white text-xs`}
                    >
                      {selectedTicket.status === STATUS_COMPLETED ? "✓" : "3"}
                    </div>
                    <span className="mt-1 text-[10px]">{"\uCC98\uB9AC"}</span>
                  </div>
                  <div
                    className={`flex-1 h-0.5 mx-1 ${
                      selectedTicket.status === STATUS_COMPLETED
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  ></div>

                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 ${
                        selectedTicket.status === STATUS_COMPLETED
                          ? "bg-green-500"
                          : "bg-gray-300"
                      } rounded-full flex items-center justify-center text-white text-xs`}
                    >
                      {selectedTicket.status === STATUS_COMPLETED ? "✓" : "4"}
                    </div>
                    <span className="mt-1 text-[10px]">{"\uC644\uB8CC"}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedTicket.status === STATUS_REJECTED &&
              selectedTicket.rejectedReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-red-900 mb-1">
                        {"\uBC18\uB824 \uC0AC\uC720"}
                      </div>
                      <p className="text-sm text-red-700">
                        {selectedTicket.rejectedReason}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            <div className="space-y-3">
              <div className="flex justify-end mb-2">
                <div className="max-w-[80%]">
                  <div
                    className="rounded-2xl rounded-tr-none p-3"
                    style={{ background: chatColors.botMessage }}
                  >
                    <p className="text-sm text-gray-900">
                      {"\uC5B4\uB5A4 \uC2DC\uC124\uC5D0 \uBB38\uC81C\uAC00 \uC788\uB098\uC694?"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="flex gap-2 max-w-[80%]">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 flex-shrink-0">
                    {selectedTicket.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm text-gray-900">
                        {selectedTicket.author}
                      </p>
                      <p className="text-xs text-gray-600">{selectedTicket.date}</p>
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 border border-gray-200">
                      <p className="text-sm text-gray-900">
                        {selectedTicket.category === CATEGORY_FACILITY
                          ? "\uAC15\uC758\uC2E4"
                          : selectedTicket.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mb-2">
                <div className="max-w-[80%]">
                  <div
                    className="rounded-2xl rounded-tr-none p-3"
                    style={{ background: chatColors.botMessage }}
                  >
                    <p className="text-sm text-gray-900">
                      {"\uC0C1\uC138 \uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="flex gap-2 max-w-[80%]">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 flex-shrink-0">
                    {selectedTicket.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm text-gray-900">
                        {selectedTicket.author}
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 border border-gray-200">
                      <p className="text-sm text-gray-900">
                        {selectedTicket.title}
                        {"\uC5D0 \uB300\uD574 \uBB38\uC758\uB4DC\uB9BD\uB2C8\uB2E4. \uBE60\uB978 \uC870\uCE58 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selectedTicket.replies?.map((reply, index) => (
              <div key={index} className="flex justify-end mt-4">
                <div className="flex flex-row-reverse gap-2 max-w-[80%]">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {reply.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex flex-row-reverse items-center gap-2 mb-1">
                      <p className="font-medium text-sm text-blue-600">
                        {reply.author}
                      </p>
                      <p className="text-xs text-gray-500">{reply.date}</p>
                    </div>
                    <div className="bg-blue-500 text-white rounded-2xl rounded-tr-none p-3">
                      <p className="text-sm leading-relaxed">{reply.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {userRole === ROLE_GENERAL && selectedTicket.status !== STATUS_COMPLETED && (
            <div className="border-t border-gray-300 p-3 bg-gray-50">
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setShowTemplateModal(true)}
                  className="px-3 py-1.5 text-xs border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
                >
                  <FileText className="w-3 h-3 inline mr-1" />
                  {"\uD15C\uD50C\uB9BF"}
                </button>
              </div>
              <textarea
                value={draftReplies[selectedTicket.id] || ""}
                onChange={(e) =>
                  setDraftReplies((prev) => ({
                    ...prev,
                    [selectedTicket.id]: e.target.value,
                  }))
                }
                placeholder={"\uB2F5\uBCC0\uC744 \uC785\uB825\uD558\uC138\uC694..."}
                className="w-full px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                rows={4}
              />
              <div className="flex justify-between items-center mt-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <Paperclip className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50">
                    {"\uC784\uC2DC \uC800\uC7A5"}
                  </button>
                  <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1">
                    <Send className="w-3 h-3" /> {"\uC804\uC1A1"}
                  </button>
                  <button className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {"\uC644\uB8CC"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-gray-900">{"\uB2F5\uBCC0 \uD15C\uD50C\uB9BF"}</h3>
              <button
                onClick={() => setShowTemplateModal(false)}
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
                      if (selectedTicket) {
                        setDraftReplies((prev) => ({
                          ...prev,
                          [selectedTicket.id]: template.content,
                        }));
                      }
                      setShowTemplateModal(false);
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
      )}

      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-gray-900">{"\uB2F4\uB2F9\uC790 \uBC30\uC815"}</h3>
              <button
                onClick={() => setShowAssignModal(false)}
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
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
                >
                  {"\uCDE8\uC18C"}
                </button>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {"\uBC30\uC815"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
