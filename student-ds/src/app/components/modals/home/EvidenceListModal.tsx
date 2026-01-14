import { X } from "lucide-react";
import { Evidence, starDetails } from "../../../../data/mockData";

interface EvidenceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidenceData: Evidence[];
}

/**
 * EvidenceListModal - Evidence 활동 내역 전체 보기 모달
 *
 * 역할:
 * - 모든 Evidence 활동 내역 표시
 * - 역량별 색상 배지
 */
export default function EvidenceListModal({
  isOpen,
  onClose,
  evidenceData,
}: EvidenceListModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">Evidence 활동 내역</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="space-y-3">
          {evidenceData.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{
                    backgroundColor:
                      starDetails[item.competency as keyof typeof starDetails].color,
                  }}
                >
                  {item.competency}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.course}</p>
                  <p className="text-sm text-gray-500">{item.task}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {item.semester} · {item.date}
                  </p>
                </div>
              </div>
              <span className="font-bold text-green-600 text-lg">{item.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
