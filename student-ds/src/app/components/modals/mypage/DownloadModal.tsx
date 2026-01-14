import { X, FileText, Download } from "lucide-react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * DownloadModal - 민원 내역 다운로드 모달
 *
 * 역할:
 * - PDF/Excel 형식 선택 및 다운로드
 */
export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  if (!isOpen) return null;

  const handleDownload = (format: "pdf" | "excel") => {
    alert(`${format.toUpperCase()} 다운로드를 시작합니다.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">민원 내역 다운로드</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            민원 내역을 다운로드할 형식을 선택해주세요.
          </p>
          <button
            onClick={() => handleDownload("pdf")}
            className="w-full p-4 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-all"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-red-500" />
              <div className="text-left">
                <p className="font-medium">PDF 형식</p>
                <p className="text-sm text-gray-500">인쇄용 문서 형식</p>
              </div>
            </div>
            <Download className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={() => handleDownload("excel")}
            className="w-full p-4 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-all"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-green-500" />
              <div className="text-left">
                <p className="font-medium">Excel 형식</p>
                <p className="text-sm text-gray-500">스프레드시트 형식</p>
              </div>
            </div>
            <Download className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
        >
          취소
        </button>
      </div>
    </div>
  );
}
