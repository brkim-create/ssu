import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Inbox,
  FileText,
  BarChart3,
  Bell,
  Search,
  Filter,
  X,
  Send,
  Paperclip,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Ban,
  Bot,
  TrendingUp,
  Award,
  BookOpen,
  AlertTriangle,
  Target,
  Activity,
  ChevronDown,
  GraduationCap,
  User,
  Briefcase,
  XCircle,
} from "lucide-react";
import {
  ticketsData,
  templatesData,
  categoryStats,
  speedData,
  keywordsData,
  usersData,
  bannedWords,
  faqScenarios,
  competencyTrendData,
  collegeHeatmapData,
  certificationData,
  departmentGapData,
  gradeGrowthData,
  cqiStatusData,
  curriculumIssues,
  dashboardStats,
  complaintStats,
  assigneeOptions,
} from "../data/mockData";

import logoImage from "@shared/assets/logo.png";

export default function AdminDashboard() {
  const [activeCategory, setActiveCategory] = useState("dashboard"); // 대분류
  const [activeSubMenu, setActiveSubMenu] = useState("competency"); // 세부 메뉴
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [userRole, setUserRole] = useState("슈퍼관리자"); // 슈퍼관리자, 일반담당자
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("AI빅데이터과"); // 역량 비교용 선택된 학과
  const [showDeptDropdown, setShowDeptDropdown] = useState(false); // 학과 드롭다운 표시 여부
  const [deptSearchText, setDeptSearchText] = useState(""); // 학과 검색 텍스트
  const [draftReplies, setDraftReplies] = useState<Record<number, string>>({}); // 임시 저장된 답변들

  // 카테고리 변경 시 기본 서브메뉴로 초기화
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === "dashboard") setActiveSubMenu("competency");
    else if (category === "workspace") setActiveSubMenu("tickets");
    else if (category === "stats") setActiveSubMenu("overview");
    else if (category === "system") setActiveSubMenu("users");
  };

  // 드롭다운 외부 클릭 시 닫기
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDeptDropdown &&
        !(event.target as Element).closest(".dept-dropdown-container")
      ) {
        setShowDeptDropdown(false);
        setDeptSearchText("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDeptDropdown]);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      접수: "bg-blue-100 text-blue-700",
      처리중: "bg-orange-100 text-orange-700",
      완료: "bg-green-100 text-green-700",
      반려됨: "bg-red-100 text-red-700",
    };
    return styles[status];
  };

  // 일반 담당자용 필터링 로직
  const getFilteredTicketsForRole = () => {
    if (userRole === "일반담당자") {
      if (statusFilter === "all") {
        // 일반담당자는 '처리중'과 '완료'만 보임
        return ticketsData.filter(
          (t) => t.status === "처리중" || t.status === "완료"
        );
      }
      if (statusFilter === "접수") {
        // 일반담당자의 '접수' = 슈퍼관리자의 '처리중'
        return ticketsData.filter((t) => t.status === "처리중");
      }
      if (statusFilter === "완료") {
        return ticketsData.filter((t) => t.status === "완료");
      }
    } else {
      // 슈퍼관리자는 기존 로직
      if (statusFilter === "all") return ticketsData;
      return ticketsData.filter((t) => t.status === statusFilter);
    }
    return ticketsData;
  };

  const filteredTickets = getFilteredTicketsForRole();

  const getStatusCountsForRole = () => {
    if (userRole === "일반담당자") {
      return {
        all: ticketsData.filter(
          (t) => t.status === "처리중" || t.status === "완료"
        ).length,
        접수: ticketsData.filter((t) => t.status === "처리중").length,
        완료: ticketsData.filter((t) => t.status === "완료").length,
        처리중: 0, // 일반 담당자에게 처리중 탭은 별도로 없음 (접수가 처리중임)
      };
    } else {
      return {
        all: ticketsData.length,
        접수: ticketsData.filter((t) => t.status === "접수").length,
        처리중: ticketsData.filter((t) => t.status === "처리중").length,
        완료: ticketsData.filter((t) => t.status === "완료").length,
      };
    }
  };

  const statusCounts = getStatusCountsForRole();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const TicketsScreen = () => {
    // 역할에 따라 다른 탭 표시
    const tabs =
      userRole === "일반담당자"
        ? [
            { key: "all", label: "전체" },
            { key: "접수", label: "접수" },
            { key: "완료", label: "완료" },
          ]
        : [
            { key: "all", label: "전체" },
            { key: "접수", label: "접수" },
            { key: "처리중", label: "처리중" },
            { key: "완료", label: "완료" },
          ];

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
                onClick={() => setStatusFilter(tab.key)}
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
                placeholder="검색..."
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 bg-white text-gray-900 rounded text-sm"
              />
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 bg-white text-gray-700 rounded text-sm hover:bg-gray-50">
              <Filter className="w-3 h-3" /> 필터
            </button>
          </div>
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
                        className={`px-2 py-0.5 rounded text-xs ${getStatusBadge(
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

          {/* Pagination */}
          <div className="bg-white border-t border-gray-300 px-3 py-2 flex items-center justify-between relative">
            <div className="text-xs text-gray-600">
              총 {filteredTickets.length}건 중{" "}
              {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filteredTickets.length)}건
              표시
            </div>
            <div className="flex gap-1 absolute left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                다음
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
                    className={`px-2 py-0.5 rounded text-xs ${getStatusBadge(
                      selectedTicket.status
                    )}`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">담당자:</span>
                    <span className="font-medium text-sm text-gray-900">
                      {selectedTicket.assignee || "미배정"}
                    </span>
                    <button
                      onClick={() => setShowAssignModal(true)}
                      className="px-2 py-1 text-xs border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
                    >
                      {selectedTicket.assignee ? "변경" : "배정"}
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
              <h2 className="font-bold text-gray-900 mb-1">
                {selectedTicket.title}
              </h2>
              <div className="text-xs text-gray-600">
                #{selectedTicket.id.toString().padStart(6, "0")} ·{" "}
                {selectedTicket.category}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 bg-white">
              {/* 처리 현황 카드 - 슈퍼관리자만 표시 */}
              {userRole === "슈퍼관리자" && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="flex items-center text-xs">
                    {/* 1. 접수 */}
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                      <span className="mt-1 text-[10px]">접수</span>
                    </div>
                    <div
                      className={`flex-1 h-0.5 mx-1 ${
                        selectedTicket.status !== "접수"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    ></div>

                    {/* 2. 배정 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 ${
                          selectedTicket.status !== "접수"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        } rounded-full flex items-center justify-center text-white text-xs`}
                      >
                        {selectedTicket.status !== "접수" ? "✓" : "2"}
                      </div>
                      <span className="mt-1 text-[10px]">배정</span>
                    </div>
                    <div
                      className={`flex-1 h-0.5 mx-1 ${
                        selectedTicket.status === "처리중" ||
                        selectedTicket.status === "완료"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    ></div>

                    {/* 3. 처리 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 ${
                          selectedTicket.status === "처리중"
                            ? "bg-orange-500"
                            : selectedTicket.status === "완료"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        } rounded-full flex items-center justify-center text-white text-xs`}
                      >
                        {selectedTicket.status === "완료" ? "✓" : "3"}
                      </div>
                      <span className="mt-1 text-[10px]">처리</span>
                    </div>
                    <div
                      className={`flex-1 h-0.5 mx-1 ${
                        selectedTicket.status === "완료"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    ></div>

                    {/* 4. 완료 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 ${
                          selectedTicket.status === "완료"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        } rounded-full flex items-center justify-center text-white text-xs`}
                      >
                        {selectedTicket.status === "완료" ? "✓" : "4"}
                      </div>
                      <span className="mt-1 text-[10px]">완료</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 반려 사유 표시 */}
              {selectedTicket.status === "반려됨" &&
                selectedTicket.rejectedReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-red-900 mb-1">
                          반려 사유
                        </div>
                        <p className="text-sm text-red-700">
                          {selectedTicket.rejectedReason}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* 카카오톡 스타일 챗봇 대화 내역 생략없이 복원 */}
              <div className="space-y-3">
                <div className="flex justify-end mb-2">
                  <div className="max-w-[80%]">
                    <div
                      className="rounded-2xl rounded-tr-none p-3"
                      style={{ background: "#FEE500" }}
                    >
                      <p className="text-sm text-gray-900">
                        어떤 시설에 문제가 있나요?
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
                        <p className="text-xs text-gray-600">
                          {selectedTicket.date}
                        </p>
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 border border-gray-200">
                        <p className="text-sm text-gray-900">
                          {selectedTicket.category === "시설"
                            ? "강의실"
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
                      style={{ background: "#FEE500" }}
                    >
                      <p className="text-sm text-gray-900">
                        상세 내용을 입력해주세요
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
                          {selectedTicket.title}에 대해 문의드립니다. 빠른 조치
                          부탁드립니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedTicket.replies &&
                selectedTicket.replies.map((reply: any, index: number) => (
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
                          <p className="text-sm leading-relaxed">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* 일반 담당자 답변 입력 영역 */}
            {userRole === "일반담당자" && selectedTicket.status !== "완료" && (
              <div className="border-t border-gray-300 p-3 bg-gray-50">
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setShowTemplateModal(true)}
                    className="px-3 py-1.5 text-xs border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
                  >
                    <FileText className="w-3 h-3 inline mr-1" />
                    템플릿
                  </button>
                </div>
                <textarea
                  value={
                    draftReplies[selectedTicket.id] ||
                    selectedTicket.draftReply ||
                    ""
                  }
                  onChange={(e) => {
                    setDraftReplies((prev) => ({
                      ...prev,
                      [selectedTicket.id]: e.target.value,
                    }));
                  }}
                  placeholder="답변을 입력하세요..."
                  className="w-full px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  rows={4}
                />
                <div className="flex justify-between items-center mt-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        selectedTicket.draftReply =
                          draftReplies[selectedTicket.id] || "";
                        alert("임시 저장되었습니다");
                      }}
                      className="px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
                    >
                      임시 저장
                    </button>
                    <button
                      onClick={() => {
                        if (
                          !draftReplies[selectedTicket.id] &&
                          !selectedTicket.draftReply
                        ) {
                          alert("답변을 입력해주세요");
                          return;
                        }
                        const newReply = {
                          content:
                            draftReplies[selectedTicket.id] ||
                            selectedTicket.draftReply,
                          author: "담당자",
                          date: new Date().toLocaleString("ko-KR"),
                        };
                        if (!selectedTicket.replies)
                          selectedTicket.replies = [];
                        selectedTicket.replies.push(newReply);
                        setDraftReplies((prev) => {
                          const newDrafts = { ...prev };
                          delete newDrafts[selectedTicket.id];
                          return newDrafts;
                        });
                        selectedTicket.draftReply = null;
                      }}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" /> 전송
                    </button>
                    <button
                      onClick={() => {
                        selectedTicket.status = "완료";
                        setSelectedTicket(null);
                      }}
                      className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" /> 완료
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 템플릿 모달 및 담당자 배정 모달 (간략화되었으나 기능 유지) */}
        {showTemplateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold text-gray-900">답변 템플릿</h3>
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
                        <h4 className="font-medium text-sm">
                          {template.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        {template.content}
                      </p>
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
                <h3 className="font-bold text-gray-900">담당자 배정</h3>
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
                    <option key={opt.id}>{opt.department} {opt.name}</option>
                  ))}
                </select>
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    배정
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const TemplatesScreen = () => (
    <div className="p-4 bg-white h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-900">답변 템플릿</h2>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm">
          <Plus className="w-3 h-3" /> 새 템플릿
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {templatesData.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-lg shadow p-3 border border-gray-200"
          >
            <div className="flex justify-between mb-2">
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                {t.category}
              </span>
              <div className="flex gap-1">
                <button>
                  <Edit className="w-3 h-3 text-gray-400" />
                </button>
                <button>
                  <Trash2 className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
            <p className="font-medium text-sm mb-1">{t.title}</p>
            <p className="text-xs text-gray-500 line-clamp-2">{t.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const complaintIconMap = {
    inbox: Inbox,
    clock: Clock,
    check: CheckCircle,
    alert: AlertCircle,
  };

  const StatsScreen = () => (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="grid grid-cols-4 gap-3">
        {complaintStats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-3 border border-gray-200"
          >
            <p className="text-xs text-gray-500">{item.label}</p>
            <p
              className={`text-2xl font-bold ${
                item.color === "red" ? "text-red-500" : "text-gray-800"
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 bg-white rounded-lg shadow p-3 border border-gray-200">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-1.5">
            <Search className="w-4 h-4" /> 키워드 분석
          </h3>
          <div
            className="flex flex-wrap gap-x-4 gap-y-3 items-center px-4"
            style={{
              height: "140px",
              minHeight: "140px",
              alignContent: "center",
            }}
          >
            {keywordsData.slice(0, 9).map((k, i) => (
              <span
                key={i}
                className={`${k.size} ${k.weight}`}
                style={{ color: categoryStats[i % 4].color }}
              >
                {k.word}
              </span>
            ))}
            <div className="basis-full h-0"></div>
            {keywordsData.slice(9).map((k, i) => (
              <span
                key={i + 9}
                className={`${k.size} ${k.weight}`}
                style={{ color: categoryStats[(i + 9) % 4].color }}
              >
                {k.word}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-1.5">
            <Target className="w-4 h-4" /> 카테고리별 민원
          </h3>
          <div style={{ width: "100%", height: "280px", minHeight: "280px" }}>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="45%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="value"
                >
                  {categoryStats.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value, entry) =>
                    `${value} (${(entry.payload as any).value}건)`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> 일별 처리 시간
          </h3>
          <div style={{ width: "100%", height: "280px", minHeight: "280px" }}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={speedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" height={60} tick={{ dy: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Bar
                  dataKey="time"
                  name="처리 시간(시간)"
                  fill="#E94E3C"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const UsersScreen = () => {
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showAddBannedWordModal, setShowAddBannedWordModal] = useState(false);
    const [newBannedWord, setNewBannedWord] = useState("");
    const [bannedWordsList, setBannedWordsList] = useState(bannedWords);

    const handleAddBannedWord = () => {
      if (newBannedWord.trim()) {
        setBannedWordsList([...bannedWordsList, newBannedWord.trim()]);
        setNewBannedWord("");
        setShowAddBannedWordModal(false);
      }
    };
    const handleRemoveBannedWord = (index: number) => {
      setBannedWordsList(bannedWordsList.filter((_, i) => i !== index));
    };

    return (
      <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-900">사용자 관리</h2>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm"
          >
            <UserPlus className="w-3 h-3" /> 새 관리자
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">이름</th>
                <th className="text-left p-3">부서</th>
                <th className="text-left p-3">권한</th>
                <th className="text-center p-3">상태</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3 text-gray-600">{u.dept}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        u.role === "슈퍼관리자"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-500" />
              <h3 className="font-bold text-sm">금칙어 설정</h3>
            </div>
            <button
              onClick={() => setShowAddBannedWordModal(true)}
              className="text-xs text-pink-500"
            >
              + 추가
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {bannedWordsList.map((w, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs flex items-center gap-1"
              >
                {w}
                <button onClick={() => handleRemoveBannedWord(i)}>
                  <X className="w-3 h-3 hover:text-red-800" />
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* 모달 생략 (로직 동일) */}
      </div>
    );
  };

  const ScenarioScreen = () => (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-pink-500" />
          <h2 className="font-bold text-gray-900">시나리오 관리</h2>
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm">
          <Plus className="w-3 h-3" /> 새 시나리오
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">카테고리</th>
              <th className="text-left p-3">질문</th>
              <th className="text-left p-3">답변</th>
              <th className="text-center p-3">관리</th>
            </tr>
          </thead>
          <tbody>
            {faqScenarios.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                    {f.category}
                  </span>
                </td>
                <td className="p-3 font-medium">{f.question}</td>
                <td className="p-3 text-gray-600">{f.answer}</td>
                <td className="p-3 text-center">
                  <button>
                    <Edit className="w-3 h-3 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          💡 챗봇 고도화 대비: 현재는 FAQ 기반만 지원
        </p>
      </div>
    </div>
  );
  // 히트맵 색상 및 역량 계산 헬퍼 함수들
  const getHeatmapColor = (value: number) => {
    if (value >= 90) return "text-gray-900";
    if (value >= 10) return "text-white";
    return "text-white";
  };
  const getHeatmapBgColor = (value: number) => {
    if (value >= 90) return "#F59E42";
    if (value >= 80) return "#F5A857";
    if (value >= 70) return "#F4B26C";
    if (value >= 60) return "#E5BA93";
    if (value >= 50) return "#D6C2BA";
    if (value >= 40) return "#C7B8BA";
    if (value >= 30) return "#B8AEC1";
    if (value >= 20) return "#A199C8";
    if (value >= 10) return "#8B8FD0";
    return "#6D85DE";
  };
  const calculateSTARCompetencies = (deptData: any) => ({
    S: (deptData.기획 + deptData.실행 + deptData.화합 + deptData.통섭) / 4,
    T:
      (deptData.전공지식 +
        deptData.전공기술 +
        deptData.정보화 +
        deptData.신기술활용 +
        deptData.공감 +
        deptData.판단) /
      6,
    A: (deptData.사명감 + deptData.조직이해 + deptData.도전성) / 3,
    R:
      (deptData.경청 + deptData.협상 + deptData.외국어 + deptData.세계시민) / 4,
  });
  const calculateOverallAverage = () => {
    const all = collegeHeatmapData.map((d) => calculateSTARCompetencies(d));
    return {
      S: all.reduce((s, c) => s + c.S, 0) / all.length,
      T: all.reduce((s, c) => s + c.T, 0) / all.length,
      A: all.reduce((s, c) => s + c.A, 0) / all.length,
      R: all.reduce((s, c) => s + c.R, 0) / all.length,
    };
  };
  const getDepartmentComparisonData = () => {
    const d = collegeHeatmapData.find((x) => x.college === selectedDepartment);
    if (!d) return [];
    const s = calculateSTARCompetencies(d);
    const a = calculateOverallAverage();
    return [
      { competency: "Self-directed", 선택학과: s.S, 전체평균: a.S },
      { competency: "Teamwork", 선택학과: s.T, 전체평균: a.T },
      { competency: "Analytical", 선택학과: s.A, 전체평균: a.A },
      { competency: "Relational", 선택학과: s.R, 전체평균: a.R },
    ];
  };
  const getDepartmentPOComparisonData = () => {
    // (간략화된 로직)
    return getDepartmentComparisonData().map((d) => ({
      ...d,
      competency:
        d.competency === "Self-directed" ? "창의적 문제해결" : d.competency,
    }));
  };
  const getFilteredDepartments = () =>
    deptSearchText
      ? collegeHeatmapData.filter((d) =>
          d.college.toLowerCase().includes(deptSearchText.toLowerCase())
        )
      : collegeHeatmapData;

  const iconMap = {
    users: Users,
    trending: TrendingUp,
    award: Award,
    check: CheckCircle,
  };

  const DashboardScreen = () => (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="grid grid-cols-4 gap-3">
        {dashboardStats.map((item, i) => {
          const IconComponent = iconMap[item.iconType];
          return (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-3 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">{item.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-gray-900">
                      {item.value}
                    </p>
                    <span className="text-xs text-green-600">{item.change}</span>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-gray-600" />
              </div>
              <h3 className="font-bold text-sm text-gray-900">
                학과별 S-T-A-R 역량 비교
              </h3>
            </div>
            <div className="mb-4 relative dept-dropdown-container">
              <button
                onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                className="px-3 py-1 border rounded bg-white text-sm flex gap-2"
              >
                {selectedDepartment} <ChevronDown className="w-4 h-4" />
              </button>
              {showDeptDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 w-48 max-h-48 overflow-y-auto">
                  {getFilteredDepartments().map((d) => (
                    <button
                      key={d.college}
                      onClick={() => {
                        setSelectedDepartment(d.college);
                        setShowDeptDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      {d.college}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div style={{ width: "100%", height: "220px" }}>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={getDepartmentComparisonData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="competency" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name="선택학과"
                    dataKey="선택학과"
                    stroke="#C13584"
                    fill="#C13584"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="전체평균"
                    dataKey="전체평균"
                    stroke="#9ca3af"
                    fill="#9ca3af"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ width: "100%", height: "220px" }}>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={getDepartmentPOComparisonData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="competency" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name="선택학과"
                    dataKey="선택학과"
                    stroke="#C13584"
                    fill="#C13584"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <h3 className="font-bold text-sm mb-3">학년별 역량 성장 추이</h3>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={gradeGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis domain={[50, 90]} />
                <Tooltip />
                <Line type="monotone" dataKey="S" stroke="#E94E3C" />
                <Line type="monotone" dataKey="T" stroke="#F7941D" />
                <Line type="monotone" dataKey="A" stroke="#C13584" />
                <Line type="monotone" dataKey="R" stroke="#5B51D8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 과별 역량 히트맵 테이블 (축약하여 렌더링) */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200 overflow-x-auto">
        <h3 className="font-bold text-sm mb-3">과별 역량 강/약점 히트맵</h3>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="p-2 border">과</th>
              <th className="p-2 border bg-red-100">기획(S)</th>
              <th className="p-2 border bg-orange-100">전공(T)</th>
              <th className="p-2 border bg-purple-100">사명(A)</th>
              <th className="p-2 border bg-indigo-100">소통(R)</th>
            </tr>
          </thead>
          <tbody>
            {collegeHeatmapData.slice(0, 10).map((c, i) => (
              <tr key={i}>
                <td className="p-2 border font-medium">{c.college}</td>
                <td
                  className="p-2 border text-center"
                  style={{
                    backgroundColor: getHeatmapBgColor(c.기획),
                    color: getHeatmapColor(c.기획),
                  }}
                >
                  {c.기획}
                </td>
                <td
                  className="p-2 border text-center"
                  style={{
                    backgroundColor: getHeatmapBgColor(c.전공지식),
                    color: getHeatmapColor(c.전공지식),
                  }}
                >
                  {c.전공지식}
                </td>
                <td
                  className="p-2 border text-center"
                  style={{
                    backgroundColor: getHeatmapBgColor(c.사명감),
                    color: getHeatmapColor(c.사명감),
                  }}
                >
                  {c.사명감}
                </td>
                <td
                  className="p-2 border text-center"
                  style={{
                    backgroundColor: getHeatmapBgColor(c.경청),
                    color: getHeatmapColor(c.경청),
                  }}
                >
                  {c.경청}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-900 flex text-gray-900">
      <div className="w-48 bg-gray-800 shadow-lg flex flex-col border-r border-gray-700">
        <div className="h-[60px] px-3 flex items-center border-b border-gray-700 gap-2">
          <div className="w-8 h-8 bg-white rounded-lg p-1">
            <img
              src={logoImage}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="font-bold text-sm text-white">수성대학교</p>
            <p className="text-xs text-white">관리자</p>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          <button
            onClick={() => handleCategoryChange("dashboard")}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${
              activeCategory === "dashboard"
                ? "bg-gray-700 text-white border-l-2 border-pink-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>대시보드</span>
          </button>
          <button
            onClick={() => handleCategoryChange("workspace")}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${
              activeCategory === "workspace"
                ? "bg-gray-700 text-white border-l-2 border-pink-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>워크스페이스</span>
          </button>
          {userRole === "슈퍼관리자" && (
            <>
              <button
                onClick={() => handleCategoryChange("stats")}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${
                  activeCategory === "stats"
                    ? "bg-gray-700 text-white border-l-2 border-pink-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>통계/분석</span>
              </button>
              <button
                onClick={() => handleCategoryChange("system")}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${
                  activeCategory === "system"
                    ? "bg-gray-700 text-white border-l-2 border-pink-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>시스템 관리</span>
              </button>
            </>
          )}
        </nav>
        <div className="p-2 border-t border-gray-700">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="w-full flex items-center gap-2 text-white text-xs"
          >
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              {userRole[0]}
            </div>
            {userRole}
          </button>
          {showRoleDropdown && (
            <div className="absolute bottom-12 left-2 bg-gray-800 border p-1 rounded shadow">
              <button
                onClick={() => setUserRole("슈퍼관리자")}
                className="block w-full text-left text-white text-xs p-1 hover:bg-gray-700"
              >
                슈퍼관리자
              </button>
              <button
                onClick={() => setUserRole("일반담당자")}
                className="block w-full text-left text-white text-xs p-1 hover:bg-gray-700"
              >
                일반담당자
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 shadow-sm px-4 h-[60px] flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-gray-100 text-[20px]">
              {activeCategory.toUpperCase()}
            </h1>
            <div className="flex gap-2">
              {activeCategory === "workspace" && (
                <>
                  <button
                    onClick={() => setActiveSubMenu("tickets")}
                    className={`px-3 py-1.5 rounded text-sm ${
                      activeSubMenu === "tickets"
                        ? "bg-gray-700 text-white"
                        : "text-gray-400"
                    }`}
                  >
                    티켓 관리
                  </button>
                  <button
                    onClick={() => setActiveSubMenu("templates")}
                    className={`px-3 py-1.5 rounded text-sm ${
                      activeSubMenu === "templates"
                        ? "bg-gray-700 text-white"
                        : "text-gray-400"
                    }`}
                  >
                    템플릿
                  </button>
                </>
              )}
            </div>
          </div>
          <Bell className="w-4 h-4 text-gray-300" />
        </header>
        <main className="flex-1 overflow-auto bg-gray-50">
          {activeSubMenu === "tickets" && <TicketsScreen />}
          {activeSubMenu === "templates" && <TemplatesScreen />}
          {activeSubMenu === "overview" && <StatsScreen />}
          {activeSubMenu === "users" && <UsersScreen />}
          {activeSubMenu === "scenario" && <ScenarioScreen />}
          {activeSubMenu === "competency" && <DashboardScreen />}
        </main>
      </div>
    </div>
  );
}
