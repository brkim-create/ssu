import { X, Share2 } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ShareModal - 공유하기 모달
 *
 * 역할:
 * - 카카오톡, 페이스북, 트위터, 링크복사 공유 옵션 제공
 */
export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  if (!isOpen) return null;

  const handleShare = (platform: string) => {
    if (platform === "link") {
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다.");
    } else {
      alert(`${platform}으로 공유합니다.`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">공유하기</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => handleShare("카카오톡")}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <span className="text-xs text-gray-600">카카오톡</span>
          </button>
          <button
            onClick={() => handleShare("페이스북")}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white">f</span>
            </div>
            <span className="text-xs text-gray-600">페이스북</span>
          </button>
          <button
            onClick={() => handleShare("트위터")}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-sky-500 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white">𝕏</span>
            </div>
            <span className="text-xs text-gray-600">트위터</span>
          </button>
          <button
            onClick={() => handleShare("link")}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
              <Share2 className="w-6 h-6 text-gray-600" />
            </div>
            <span className="text-xs text-gray-600">링크 복사</span>
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
