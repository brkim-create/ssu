"use client";

import { useState, useEffect } from "react";
import { X, Search, ChevronRight, Download, Star } from "lucide-react";
import { Complaint } from "@/data/mockData";

interface ComplaintListModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaints: Complaint[];
  onOpenDownloadModal: () => void;
  initialStatusFilter?: string;
  onOpenRatingModal?: (complaintId: number) => void;
  ratedComplaints?: Record<number, number>;
  onOpenDetail?: (complaint: Complaint) => void;
}

export default function ComplaintListModal({
  isOpen,
  onClose,
  complaints,
  onOpenDownloadModal,
  initialStatusFilter = "전체",
  onOpenRatingModal,
  ratedComplaints = {},
  onOpenDetail,
}: ComplaintListModalProps) {
  // 필터 상태
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [periodFilter, setPeriodFilter] = useState("전체");

  // 모달이 열릴 때 초기 필터 적용
  useEffect(() => {
    if (isOpen) {
      setStatusFilter(initialStatusFilter);
    }
  }, [isOpen, initialStatusFilter]);

  // 읽음/평가 상태
  const [readStatus, setReadStatus] = useState<Record<number, boolean>>({});
  const [ratings, setRatings] = useState<Record<number, number>>({});

  if (!isOpen) return null;

  // 상태별 색상
  const statusColor = (status: string) => {
    const colors: Record<string, string> = {
      접수: "bg-blue-100 text-blue-700",
      처리중: "bg-yellow-100 text-yellow-700",
      완료: "bg-green-100 text-green-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  // 민원 필터링 함수
  const getFilteredComplaints = () => {
    let filtered = complaints;

    // 상태 필터
    if (statusFilter !== "전체") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    // 검색어 필터
    if (searchKeyword) {
      filtered = filtered.filter(
        (c) =>
          c.title.includes(searchKeyword) ||
          c.content.includes(searchKeyword) ||
          c.category.includes(searchKeyword)
      );
    }

    // 기간 필터
    if (periodFilter !== "전체") {
      const now = new Date();
      let monthsAgo = 0;
      if (periodFilter === "1개월") monthsAgo = 1;
      else if (periodFilter === "3개월") monthsAgo = 3;
      else if (periodFilter === "6개월") monthsAgo = 6;

      const filterDate = new Date(now.setMonth(now.getMonth() - monthsAgo));
      filtered = filtered.filter((c) => new Date(c.date) >= filterDate);
    }

    return filtered;
  };

  // 모달 닫기 (상태 초기화)
  const handleClose = () => {
    setSearchKeyword("");
    setPeriodFilter("전체");
    onClose();
  };

  // 민원 평가
  const handleRateComplaint = (id: number, rating: number) => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
  };

  // 다운로드 버튼 클릭
  const handleDownloadClick = () => {
    handleClose();
    onOpenDownloadModal();
  };

  const filteredComplaints = getFilteredComplaints();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl h-[85vh] flex flex-col">
        {/* 고정 상단 영역 */}
        <div className="shrink-0">
          {/* 헤더 */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <h3 className="font-bold text-xl">내 민원 내역</h3>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">총 {filteredComplaints.length}건</p>
              <button onClick={handleClose}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>

          {/* 상태 필터 탭 (언더라인 스타일) */}
          <div className="flex border-b border-gray-200 px-6">
            {["전체", "접수", "처리중", "완료"].map((status) => {
              const count =
                status === "전체"
                  ? complaints.length
                  : complaints.filter((c) => c.status === status).length;

              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`relative px-4 py-3 font-medium transition-all ${
                    statusFilter === status
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {status}
                    <span
                      className={`text-xs ${
                        statusFilter === status
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                  {statusFilter === status && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 검색창 + 기간 필터 */}
          <div className="px-6 pt-4 pb-3">
            {/* 검색바 */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="민원 제목 또는 내용 검색..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
              {searchKeyword && (
                <button
                  onClick={() => setSearchKeyword("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* 기간 필터 */}
            <div className="flex gap-2">
              {["전체", "1개월", "3개월", "6개월"].map((period) => (
                <button
                  key={period}
                  onClick={() => setPeriodFilter(period)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    periodFilter === period
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 스크롤 가능한 중간 영역 */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <div className="space-y-3 pb-4">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    if (!complaint.isRead && !readStatus[complaint.id]) {
                      setReadStatus((prev) => ({
                        ...prev,
                        [complaint.id]: true,
                      }));
                    }
                    if (onOpenDetail) {
                      onOpenDetail(complaint);
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2 flex-1">
                      <h4 className="font-bold text-gray-800">
                        {complaint.title}
                      </h4>
                      {!complaint.isRead && !readStatus[complaint.id] && (
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* 완료 상태일 때는 별점/평가하기 표시, 그 외에는 상태 태그 표시 */}
                      {complaint.status === "완료" ? (
                        <>
                          {(ratedComplaints[complaint.id] || ratings[complaint.id]) ? (
                            <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-xs font-medium text-yellow-600">
                                {ratedComplaints[complaint.id] || ratings[complaint.id]}.0
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenRatingModal) {
                                  onOpenRatingModal(complaint.id);
                                } else {
                                  // fallback: 바로 5점 평가
                                  handleRateComplaint(complaint.id, 5);
                                }
                              }}
                              className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium hover:bg-yellow-100 transition-colors"
                            >
                              평가하기
                            </button>
                          )}
                        </>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                            complaint.status
                          )}`}
                        >
                          {complaint.status}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                    <span>{complaint.category}</span>
                    <span>{complaint.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <Search className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium mb-1">
                  검색 결과가 없습니다
                </p>
                <p className="text-sm text-gray-400">
                  다른 검색어나 필터를 시도해보세요
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 고정 하단 영역 */}
        <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
          <button
            onClick={handleDownloadClick}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            민원 내역 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
