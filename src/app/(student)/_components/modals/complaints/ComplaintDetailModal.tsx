"use client";

import {
  X,
  Star,
  MessageCircle,
  Clock,
  Check,
  User,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Complaint } from "@/data/mockData";

interface ComplaintDetailModalProps {
  complaint: Complaint | null;
  complaintRatings: Record<number, number>;
  onClose: () => void;
  onRate: (complaintId: number) => void;
  onBack?: () => void;
}

/**
 * ComplaintDetailModal - 민원 상세보기 모달
 *
 * 민원의 상세 내용을 표시하는 공통 모달 컴포넌트
 * - 처리중 상태: 타임라인 + 담당자 정보 표시
 * - 완료 상태: 관리자 답변 + 첨부파일 표시
 */
export default function ComplaintDetailModal({
  complaint,
  complaintRatings,
  onClose,
  onRate,
  onBack,
}: ComplaintDetailModalProps) {
  if (!complaint) return null;

  const handleClose = () => {
    onClose();
    onBack?.();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md h-[85vh] rounded-t-3xl flex flex-col">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-6 rounded-t-3xl shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-xl">민원 상세보기</h3>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <span>{complaint.category}</span>
            <span>•</span>
            <span>{complaint.date}</span>
          </div>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* 제목 */}
          <div className="mb-6">
            <h4 className="font-bold text-lg text-gray-800 mb-2">
              {complaint.title}
            </h4>
            <div className="flex items-center gap-2">
              {complaint.status === "완료" ? (
                <>
                  {complaintRatings[complaint.id] ? (
                    <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium text-yellow-600">
                        {complaintRatings[complaint.id]}.0
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onRate(complaint.id)}
                      className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium hover:bg-yellow-100 transition-colors"
                    >
                      평가하기
                    </button>
                  )}
                </>
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    complaint.status === "접수"
                      ? "bg-blue-100 text-blue-700"
                      : complaint.status === "처리중"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {complaint.status}
                </span>
              )}
            </div>
          </div>

          {/* 내가 작성한 민원 내용 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <h5 className="font-bold text-gray-800">문의 내용</h5>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {complaint.content}
              </p>
            </div>
          </div>

          {/* 처리중 상태: 타임라인 + 담당자 정보 */}
          {complaint.status === "처리중" && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <h5 className="font-bold text-gray-800">처리 현황</h5>
              </div>

              {/* 타임라인 UI */}
              <div className="bg-blue-50 rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mb-2">
                  {["접수 확인", "담당자 배정", "처리중"].map((step, index) => (
                    <div
                      key={`${complaint.id}-${step}`}
                      className="flex items-center flex-1"
                    >
                      <div className="flex flex-col items-center w-full">
                        <div className="relative flex items-center justify-center w-full">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 z-10 ${
                              index < (complaint.currentStep || 0)
                                ? "bg-blue-500 text-white"
                                : index === (complaint.currentStep || 0)
                                  ? "bg-blue-500 text-white animate-pulse"
                                  : "bg-gray-300 text-gray-500"
                            }`}
                          >
                            {index < (complaint.currentStep || 0) ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <span className="text-xs font-bold">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          {index < 2 && (
                            <div
                              className={`absolute left-1/2 w-full h-0.5 ${
                                index < (complaint.currentStep || 0)
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                              }`}
                              style={{ top: "50%", transform: "translateY(-50%)" }}
                            />
                          )}
                        </div>
                        <span
                          className={`text-xs text-center whitespace-nowrap mt-1 ${
                            index <= (complaint.currentStep || 0)
                              ? "text-gray-800 font-medium"
                              : "text-gray-400"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 담당 정보 */}
              {complaint.department && complaint.assignee && (
                <div className="bg-white border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600 shrink-0" />
                    <div className="text-sm text-gray-800">
                      <span className="font-medium">부서:</span>{" "}
                      {complaint.department}
                      <span className="mx-2">|</span>
                      <span className="font-medium">담당:</span>{" "}
                      {complaint.assignee}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 완료 상태: 관리자 답변 + 첨부파일 */}
          {complaint.status === "완료" && complaint.adminResponse && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h5 className="font-bold text-gray-800">관리자 답변</h5>
              </div>

              {/* 관리자 답변 */}
              <div className="bg-green-50 rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-green-900">답변 내용</span>
                  <span className="text-xs text-green-700">
                    {complaint.responseDate}
                  </span>
                </div>
                <p className="text-sm text-green-900 leading-relaxed whitespace-pre-wrap">
                  {complaint.adminResponse}
                </p>
              </div>

              {/* 첨부파일 */}
              {complaint.attachments && complaint.attachments.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <h5 className="font-bold text-gray-800">
                      첨부파일 ({complaint.attachments.length})
                    </h5>
                  </div>
                  <div className="space-y-2">
                    {complaint.attachments.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <a
                          href={file.url}
                          download
                          className="ml-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shrink-0"
                        >
                          다운로드
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="w-full py-3 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
