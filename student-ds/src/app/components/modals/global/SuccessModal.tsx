interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: "complete" | "submit";
}

/**
 * SuccessModal - 성공/완료 알림 모달
 *
 * 역할:
 * - 작업 완료 또는 접수 완료 메시지 표시
 */
export default function SuccessModal({
  isOpen,
  onClose,
  message,
  type,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 mx-4 text-center animate-scale-up">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h3 className="font-bold text-xl mb-2">
          {type === "complete" ? "완료!" : "접수 완료!"}
        </h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
        >
          확인
        </button>
      </div>
    </div>
  );
}
