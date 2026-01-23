"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

// recharts SSR 문제 방지를 위한 dynamic import
const RadarChart = dynamic(() => import("recharts").then((mod) => mod.RadarChart), { ssr: false });
const Radar = dynamic(() => import("recharts").then((mod) => mod.Radar), { ssr: false });
const PolarGrid = dynamic(() => import("recharts").then((mod) => mod.PolarGrid), { ssr: false });
const PolarAngleAxis = dynamic(() => import("recharts").then((mod) => mod.PolarAngleAxis), { ssr: false });
const PolarRadiusAxis = dynamic(() => import("recharts").then((mod) => mod.PolarRadiusAxis), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false });

// 학생 데이터 타입
export interface StudentData {
  id: number;
  name: string;
  studentId: string;
  dept: string;
  S: number;
  T: number;
  A: number;
  R: number;
}

interface StudentDetailModalProps {
  /** 모달 표시 여부 */
  isOpen: boolean;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
  /** 학생 데이터 */
  studentData: StudentData | null;
  /** 상세 페이지 이동 버튼 표시 (기본: true) */
  showDetailPageButton?: boolean;
}

/**
 * StudentDetailModal - 학생 상세 정보 모달
 *
 * App.tsx 484~505라인 기반 마이그레이션
 * - 바텀시트 형태 모달
 * - 학생 기본 정보 + STAR 역량 레이더 차트
 * - 상세 페이지 이동 버튼 (선택)
 */
export default function StudentDetailModal({
  isOpen,
  onClose,
  studentData,
  showDetailPageButton = true,
}: StudentDetailModalProps) {
  const router = useRouter();

  // 모달이 닫혀있거나 학생 데이터가 없으면 렌더링하지 않음
  if (!isOpen || !studentData) return null;

  // 레이더 차트 데이터
  const radarData = [
    { subject: "S", score: studentData.S, fullMark: 100 },
    { subject: "T", score: studentData.T, fullMark: 100 },
    { subject: "A", score: studentData.A, fullMark: 100 },
    { subject: "R", score: studentData.R, fullMark: 100 },
  ];

  // 상세 페이지 이동
  const handleGoToDetail = () => {
    onClose();
    router.push(`/professor/students/${studentData.id}`);
  };

  // 배경 클릭 시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto animate-slide-up">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-xl">{studentData.name}</h3>
            <p className="text-sm text-gray-500">{studentData.studentId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="닫기"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* 학생 기본 정보 */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-600">
            <strong>학과:</strong> {studentData.dept}
          </p>
        </div>

        {/* 레이더 차트 */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <h4 className="font-bold text-gray-800 mb-3">역량 상세</h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 14, fontWeight: "bold" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar
                  dataKey="score"
                  stroke="#F7941D"
                  fill="#F7941D"
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* S/T/A/R 점수 카드 */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <ScoreCard label="S" sublabel="창의" score={studentData.S} color="#E94E3C" bgColor="bg-red-50" />
          <ScoreCard label="T" sublabel="실무" score={studentData.T} color="#F7941D" bgColor="bg-orange-50" />
          <ScoreCard label="A" sublabel="인성" score={studentData.A} color="#C13584" bgColor="bg-pink-50" />
          <ScoreCard label="R" sublabel="소통" score={studentData.R} color="#5B51D8" bgColor="bg-indigo-50" />
        </div>

        {/* 취약 역량 경고 */}
        {(studentData.S < 70 || studentData.T < 70 || studentData.A < 70 || studentData.R < 70) && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <p className="text-sm text-red-700 font-medium">
              ⚠️ 주의 필요 역량:{" "}
              {[
                studentData.S < 70 && "S",
                studentData.T < 70 && "T",
                studentData.A < 70 && "A",
                studentData.R < 70 && "R",
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        )}

        {/* 상세 페이지 이동 버튼 */}
        {showDetailPageButton && (
          <button
            onClick={handleGoToDetail}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            상세 페이지로 이동
          </button>
        )}

        {/* 슬라이드 애니메이션 */}
        <style jsx>{`
          @keyframes slide-up {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
          .animate-slide-up {
            animation: slide-up 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}

// ========== ScoreCard 서브컴포넌트 ==========
interface ScoreCardProps {
  label: string;
  sublabel: string;
  score: number;
  color: string;
  bgColor: string;
}

function ScoreCard({ label, sublabel, score, color, bgColor }: ScoreCardProps) {
  const isLow = score < 70;

  return (
    <div
      className={`${bgColor} border-2 rounded-xl p-3 text-center transition-all ${
        isLow ? "border-red-400 animate-pulse" : ""
      }`}
      style={{ borderColor: isLow ? undefined : color }}
    >
      <div className="text-xs font-medium text-gray-600 mb-1">
        {label}·{sublabel}
      </div>
      <div
        className={`text-xl font-bold ${isLow ? "text-red-600" : ""}`}
        style={{ color: isLow ? undefined : color }}
      >
        {score}
      </div>
    </div>
  );
}
