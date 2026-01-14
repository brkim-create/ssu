import React, { useRef } from "react";
import {
  X,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Star,
} from "lucide-react";
import { getIcon } from "../../../utils/iconMapper";

interface ComplaintCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
  items: string[];
}

interface Complaint {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
  date: string;
  reply?: string;
}

interface ComplaintListProps {
  categories: ComplaintCategory[];
  complaints: Complaint[];
  onCategoryClick: (category: ComplaintCategory) => void;
  showListModal: boolean;
  onCloseListModal: () => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  searchKeyword: string;
  onSearchChange: (keyword: string) => void;
  periodFilter: string;
  onPeriodFilterChange: (period: string) => void;
  onComplaintClick: (complaint: Complaint) => void;
  onRateComplaint: (complaintId: number) => void;
  complaintReadStatus: { [key: number]: boolean };
  complaintRatedStatus: { [key: number]: boolean };
  complaintRatings: { [key: number]: number };
}

export default function ComplaintList({
  categories,
  complaints,
  onCategoryClick,
  showListModal,
  onCloseListModal,
  statusFilter,
  onStatusFilterChange,
  searchKeyword,
  onSearchChange,
  periodFilter,
  onPeriodFilterChange,
  onComplaintClick,
  onRateComplaint,
  complaintReadStatus,
  complaintRatedStatus,
  complaintRatings,
}: ComplaintListProps) {
  const filterScrollRef = useRef<HTMLDivElement>(null);

  const statusColor: Record<string, string> = {
    접수: "bg-blue-100 text-blue-600",
    처리중: "bg-orange-100 text-orange-600",
    완료: "bg-green-100 text-green-600",
    반려: "bg-red-100 text-red-600",
  };

  const getFilteredComplaints = () => {
    let filtered = complaints;

    if (statusFilter !== "전체") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    if (periodFilter !== "전체") {
      const now = new Date();
      const monthsAgo =
        periodFilter === "1개월" ? 1 : periodFilter === "3개월" ? 3 : 6;
      const filterDate = new Date(now.setMonth(now.getMonth() - monthsAgo));

      filtered = filtered.filter((c) => {
        const complaintDate = new Date(c.date.replace(/\./g, "-"));
        return complaintDate >= filterDate;
      });
    }

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(keyword) ||
          c.content.toLowerCase().includes(keyword)
      );
    }

    return filtered;
  };

  return (
    <>
      {/* Complaint Categories */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">민원 카테고리</h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat)}
              className="bg-gray-50 rounded-2xl shadow p-5 text-left hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                {(() => {
                  const Icon = getIcon(cat.icon);
                  return <Icon className="w-6 h-6 text-gray-500" />;
                })()}
              </div>
              <p className="font-bold text-gray-800 mb-1">{cat.name}</p>
              <p className="text-xs text-gray-500">
                {cat.items.length}개 세부항목
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Complaint List Modal */}
      {showListModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[90vh] flex flex-col animate-slide-up">
            <div className="p-6 pb-4 shrink-0 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl">내 민원 내역</h3>
                <button onClick={onCloseListModal}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="민원 제목 또는 내용 검색..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Status Filter */}
              <div
                ref={filterScrollRef}
                className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide"
              >
                {["전체", "접수", "처리중", "완료", "반려"].map((status) => (
                  <button
                    key={status}
                    onClick={() => onStatusFilterChange(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      statusFilter === status
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Period Filter */}
              <div className="flex gap-2 mt-3">
                {["전체", "1개월", "3개월", "6개월"].map((period) => (
                  <button
                    key={period}
                    onClick={() => onPeriodFilterChange(period)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      periodFilter === period
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Complaint List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-3">
                {getFilteredComplaints().length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>해당 조건의 민원이 없습니다.</p>
                  </div>
                ) : (
                  getFilteredComplaints().map((complaint) => (
                    <div
                      key={complaint.id}
                      onClick={() => onComplaintClick(complaint)}
                      className={`bg-gray-50 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all ${
                        !complaintReadStatus[complaint.id] &&
                        complaint.status === "완료"
                          ? "border-l-4 border-green-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                statusColor[complaint.status]
                              }`}
                            >
                              {complaint.status}
                            </span>
                            <span className="text-xs text-gray-400">
                              {complaint.category}
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-800">
                            {complaint.title}
                          </h4>
                        </div>
                        {complaint.status === "접수" && (
                          <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                        )}
                        {complaint.status === "처리중" && (
                          <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
                        )}
                        {complaint.status === "완료" && (
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {complaint.content}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">
                          {complaint.date}
                        </span>
                        {complaint.status === "완료" &&
                          !complaintRatedStatus[complaint.id] && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onRateComplaint(complaint.id);
                              }}
                              className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium hover:bg-yellow-200 transition-all"
                            >
                              <Star className="w-3 h-3" />
                              평가하기
                            </button>
                          )}
                        {complaintRatedStatus[complaint.id] && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span>{complaintRatings[complaint.id]}점 평가</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
