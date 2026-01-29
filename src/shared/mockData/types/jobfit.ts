// ============================================================
// Job Fit Types
// Prisma Model: JobFit, RecommendedJob
// ============================================================

// 추천 직무 항목
export interface JobFitItem {
  name: string;
  matchRate: number;
  category?: string;
  grade: string;
}

// 표준직무 적합도 데이터
export interface JobFitData {
  overallMatchRate: number;
  recommendedJobs: JobFitItem[];
}
