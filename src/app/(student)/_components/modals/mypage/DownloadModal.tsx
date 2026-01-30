"use client";

import { useState } from "react";
import { X, Download, FileText, AlertCircle } from "lucide-react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [downloadPeriod, setDownloadPeriod] = useState("전체");
  const [downloadFormat, setDownloadFormat] = useState("PDF");

  if (!isOpen) return null;

  const handleDownload = () => {
    alert(
      `${downloadPeriod} 민원 이력을 ${downloadFormat} 형식으로 다운로드합니다.`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">민원 이력 다운로드</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              다운로드 기간
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["최근 1개월", "최근 3개월", "최근 6개월", "전체"].map(
                (period) => (
                  <button
                    key={period}
                    onClick={() => setDownloadPeriod(period)}
                    className={`p-3 rounded-xl border-2 font-medium transition-all ${
                      downloadPeriod === period
                        ? "border-red-500 bg-red-50 text-red-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {period}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              파일 형식
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["PDF", "Excel"].map((format) => (
                <button
                  key={format}
                  onClick={() => setDownloadFormat(format)}
                  className={`p-3 rounded-xl border-2 font-medium transition-all ${
                    downloadFormat === format
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    {format}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 via-pink-50 to-orange-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 mb-1">포함 내용</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 민원 제목 및 내용</li>
                  <li>• 처리 상태 및 담당자</li>
                  <li>• 답변 내용 (완료된 경우)</li>
                  <li>• 처리 일자 및 이력</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-xs text-blue-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                다운로드된 파일에는 개인정보가 포함되어 있으니 보안에 유의해주시기
                바랍니다.
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
          >
            취소
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 py-3 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
