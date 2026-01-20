"use client";

import { jobFitData, JobFitItem } from "@/data/mockData";

interface JobFitSectionProps {
  overallMatchRate?: number;
  recommendedJobs?: JobFitItem[];
}

/**
 * JobFitSection - 표준직무 적합도 섹션
 *
 * 학과 취업자 역량 일치도 및 추천 직무를 표시
 */
export default function JobFitSection({
  overallMatchRate = jobFitData.overallMatchRate,
  recommendedJobs = jobFitData.recommendedJobs,
}: JobFitSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <h3 className="font-bold text-gray-800 mb-3">표준직무 적합도</h3>

      {/* 전체 적합도 */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600">학과 취업자 역량 일치</span>
        <span className="text-2xl font-bold text-orange-500">
          {overallMatchRate}%
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all"
          style={{ width: `${overallMatchRate}%` }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-2 mb-4">
        ※ 나의 이수 역량과 학과 졸업생(취업자) 평균 역량 일치도
      </p>

      {/* 추천 직무 */}
      <div className="pt-4 border-t border-gray-100">
        <h4 className="font-bold text-gray-800 mb-3">추천 직무</h4>
        <div className="space-y-3">
          {recommendedJobs.map((job, idx) => (
            <JobCard key={idx} job={job} isTop={idx === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== Job Card 컴포넌트 ==========
interface JobCardProps {
  job: JobFitItem;
  isTop?: boolean;
}

function JobCard({ job, isTop = false }: JobCardProps) {
  const textColor = isTop ? "text-gray-600" : "text-gray-500";

  return (
    <div
      className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl ${
        !isTop ? "border border-gray-200/20" : ""
      }`}
    >
      <div>
        <div className="text-sm text-gray-600 mb-1">{job.name}</div>
        <div className={`text-2xl font-bold ${textColor}`}>{job.matchRate}%</div>
      </div>
      <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
        {job.grade}
      </div>
    </div>
  );
}
