"use client";

import { FlaskConical } from "lucide-react";
import { teachingMethodData } from "@shared/mockData/data/professor";

/**
 * TeachingMethodDiagnosis - 교수법 연계 진단 섹션
 *
 * 교수법과 학생 성취도 간 상관관계를 보여주는 섹션
 * professor-ds App.tsx 336~371라인 기반 마이그레이션
 */
export default function TeachingMethodDiagnosis() {
  return (
    <div className="mx-4 mt-4 mb-4 bg-white rounded-2xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-gray-600" />
          </div>
          <h3 className="font-bold text-gray-800">교수법 연계 진단</h3>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Beta</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-4">교수법과 학생 성취도 간 상관관계</p>

      <div className="space-y-2">
        {teachingMethodData.map((method, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-sm font-medium text-gray-700">{method.method}</span>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-600 h-2 rounded-full"
                  style={{ width: `${method.score}%` }}
                />
              </div>
              <span className="text-sm font-bold text-gray-700 w-12 text-right">{method.score}점</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 p-3 bg-[rgb(241,245,249)] rounded-xl">
        <p className="text-sm text-[rgb(51,65,85)]">
          💡 <strong>인사이트:</strong> {
            (() => {
              const maxMethod = teachingMethodData.reduce((a, b) => a.score > b.score ? a : b);
              const minMethod = teachingMethodData.reduce((a, b) => a.score < b.score ? a : b);
              return `${maxMethod.method} 방식에서 가장 높은 평균 성취도(${maxMethod.score}점)를 보이며, ${minMethod.method} 방식(${minMethod.score}점)은 개선이 필요합니다.`;
            })()
          }
        </p>
      </div>
    </div>
  );
}
