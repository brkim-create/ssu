"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { User } from "lucide-react";
import { getStudentRadarSTAR, getStudentRadarPO } from "@/utils/studentRadarUtils";
import type { Student } from "@shared/mockData/types/user";

const CompetencyRadarChart = dynamic(() => import("../charts/CompetencyRadarChart"), { ssr: false });

interface StudentRadarSectionProps {
  students: Student[];
}

/**
 * StudentRadarSection - 학생별 종합역량 레이더 차트 섹션
 *
 * STAR/PO 모드 토글, 학생 선택, 역량 카드, 분석 코멘트 포함
 */
export default function StudentRadarSection({ students }: StudentRadarSectionProps) {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [viewMode, setViewMode] = useState<"STAR" | "PO">("STAR");

  // 레이더 차트 데이터
  const radarData =
    viewMode === "STAR"
      ? getStudentRadarSTAR(selectedStudent)
      : getStudentRadarPO(selectedStudent);

  if (!students.length) {
    return (
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <p className="text-center text-gray-500 py-8">수강생이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">학생별 종합현황 레이더</h3>
        </div>
        <select
          value={selectedStudent.id}
          onChange={(e) => {
            const student = students.find((s) => s.id === Number(e.target.value));
            if (student) setSelectedStudent(student);
          }}
          className="text-sm p-2 border border-gray-200 rounded-lg bg-white"
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      {/* 뷰 모드 버튼 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setViewMode("STAR")}
          className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
            viewMode === "STAR"
              ? "bg-gradient-to-r from-[#E94E3C] to-[#F7941D] text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          S·T·A·R 핵심역량
        </button>
        <button
          onClick={() => setViewMode("PO")}
          className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
            viewMode === "PO"
              ? "bg-gradient-to-r from-[#E94E3C] to-[#F7941D] text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          하위역량(PO)
        </button>
      </div>

      <div className="h-[320px]">
        <CompetencyRadarChart data={radarData} />
      </div>

      {/* S/T/A/R 역량 카드 (STAR 모드일 때만) */}
      {viewMode === "STAR" && (
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="bg-red-50 border-2 border-[#E94E3C] rounded-xl p-3 text-center">
            <div className="text-xs font-medium text-gray-600 mb-1">S·창의</div>
            <div className="text-xl font-bold text-[#E94E3C]">{selectedStudent.S}</div>
          </div>
          <div className="bg-orange-50 border-2 border-[#F7941D] rounded-xl p-3 text-center">
            <div className="text-xs font-medium text-gray-600 mb-1">T·실무</div>
            <div className="text-xl font-bold text-[#F7941D]">{selectedStudent.T}</div>
          </div>
          <div className="bg-pink-50 border-2 border-[#C13584] rounded-xl p-3 text-center">
            <div className="text-xs font-medium text-gray-600 mb-1">A·인성</div>
            <div className="text-xl font-bold text-[#C13584]">{selectedStudent.A}</div>
          </div>
          <div className="bg-indigo-50 border-2 border-[#5B51D8] rounded-xl p-3 text-center">
            <div className="text-xs font-medium text-gray-600 mb-1">R·소통</div>
            <div className="text-xl font-bold text-[#5B51D8]">{selectedStudent.R}</div>
          </div>
        </div>
      )}

      {/* 학생 분석 코멘트 */}
      <div className="mt-3 p-3 bg-[rgb(241,245,249)] rounded-xl">
        <p className="text-sm text-[rgb(51,65,85)]">
          💡 <strong>{selectedStudent.name} 학생 분석:</strong>{" "}
          {viewMode === "STAR"
            ? (() => {
                const scores = { S: selectedStudent.S, T: selectedStudent.T, A: selectedStudent.A, R: selectedStudent.R };
                const maxKey = Object.keys(scores).reduce((a, b) =>
                  scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b
                );
                const minKey = Object.keys(scores).reduce((a, b) =>
                  scores[a as keyof typeof scores] < scores[b as keyof typeof scores] ? a : b
                );
                const labels: Record<string, string> = { S: "창의", T: "실무", A: "인성", R: "소통" };
                return `${labels[maxKey]} 역량이 가장 우수하며, ${labels[minKey]} 역량 개선이 필요합니다.`;
              })()
            : (() => {
                if (!selectedStudent.PO) return "하위역량 데이터가 없습니다.";
                const poScores = selectedStudent.PO;
                const poKeys = Object.keys(poScores);
                const maxKey = poKeys.reduce((a, b) => (poScores[a as keyof typeof poScores] > poScores[b as keyof typeof poScores] ? a : b));
                const minKey = poKeys.reduce((a, b) => (poScores[a as keyof typeof poScores] < poScores[b as keyof typeof poScores] ? a : b));
                return `${maxKey} 역량이 가장 우수하며, ${minKey} 역량 개선이 필요합니다.`;
              })()}
        </p>
      </div>
    </div>
  );
}
