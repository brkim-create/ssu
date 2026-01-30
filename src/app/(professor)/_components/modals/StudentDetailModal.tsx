"use client";

import { X } from "lucide-react";
import dynamic from "next/dynamic";

// recharts SSR 문제 방지를 위한 dynamic import
const StudentRadarChart = dynamic(() => import("../charts/StudentRadarChart"), { ssr: false });

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
}

/**
 * StudentDetailModal - 학생 상세 정보 모달
 *
 * 원본 코드 기반 마이그레이션
 * - 바텀시트 형태 모달
 * - 학생 기본 정보 + STAR 역량 레이더 차트
 * - 상담 요청 / 학습 지원 버튼
 */
export default function StudentDetailModal({
  isOpen,
  onClose,
  studentData,
}: StudentDetailModalProps) {
  // 모달이 닫혀있거나 학생 데이터가 없으면 렌더링하지 않음
  if (!isOpen || !studentData) return null;

  // 레이더 차트 데이터
  const radarData = [
    { subject: "S", score: studentData.S, fullMark: 100 },
    { subject: "T", score: studentData.T, fullMark: 100 },
    { subject: "A", score: studentData.A, fullMark: 100 },
    { subject: "R", score: studentData.R, fullMark: 100 },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto scrollbar-hide">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-xl">{studentData.name}</h3>
            <p className="text-sm text-gray-500">{studentData.studentId}</p>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* 역량 레이더 차트 */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <h4 className="font-bold text-gray-800 mb-3">역량 현황</h4>
          <div className="h-[250px]">
            <StudentRadarChart data={radarData} />
          </div>
        </div>

        {/* 역량별 점수 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {(["S", "T", "A", "R"] as const).map((comp) => {
            const score = studentData[comp];
            const isLow = score < 70;
            return (
              <div
                key={comp}
                className={`p-4 rounded-xl ${isLow ? "bg-red-50 border-2 border-red-200" : "bg-gray-50"}`}
              >
                <p className="text-sm text-gray-600 mb-1">{comp} 역량</p>
                <p className={`text-2xl font-bold ${isLow ? "text-red-600" : "text-gray-800"}`}>
                  {score}점
                </p>
                {isLow && <p className="text-xs text-red-600 mt-1">기준 미달</p>}
              </div>
            );
          })}
        </div>

        {/* 하단 버튼 */}
        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 bg-blue-100 text-blue-600 rounded-xl font-bold">
            상담 요청
          </button>
          <button className="py-3 bg-green-100 text-green-600 rounded-xl font-bold">
            학습 지원
          </button>
        </div>
      </div>
    </div>
  );
}
