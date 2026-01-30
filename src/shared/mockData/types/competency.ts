// ============================================================
// Competency Types (STAR 역량)
// Prisma Model: Competency, CompetencyScore, RadarData
// ============================================================

// STAR 역량 타입
export type CompetencyType = 'S' | 'T' | 'A' | 'R';

// 역량 등급
export type CompetencyGrade = '마스터' | '우수' | '보통' | '노력요망';

// 레이더 차트 데이터 (student-ds, professor-ds 공통)
export interface RadarDataItem {
  subject: string;
  myScore: number;
  deptAvg: number;
  totalAvg: number;
  fullMark?: number;
}

// 학생 레이더 차트 데이터 (admin-ds)
export interface StudentRadarItem {
  subject: string;
  student: number;
  deptAvg: number;
  totalAvg: number;
  fullMark: number;
}

// STAR 역량 상세 (student-ds)
export interface StarDetail {
  name: string;
  score: number;
  grade: string;
  skills: string[];
  color: string;
}

// 전공능력(PO) 상세 (student-ds)
export interface PODetail {
  name: string;
  score: number;
  grade: string;
  category: string;
  skills: string[];
  color: string;
}

// 역량 추이 데이터 (admin-ds)
export interface CompetencyTrendItem {
  year: string;
  S: number;
  T: number;
  A: number;
  R: number;
}

// 히스토그램 데이터 (professor-ds)
export interface HistogramDataItem {
  range: string;
  students: number;
}

// 성취도 분포 (admin-ds)
export interface AchievementDistribution {
  range: string;
  count: number;
}

// 역량 분포 (admin-ds)
export interface CompetencyDistribution {
  competency: CompetencyType;
  count: number;
  percentage: number;
}

// 행동지표 (admin-ds)
export interface BehaviorIndicator {
  code: string;
  name: string;
  achievement: number;
  status: 'excellent' | 'good' | 'poor';
}

// 학년별 성장 데이터 (admin-ds)
export interface GradeGrowthItem {
  grade: string;
  S: number;
  T: number;
  A: number;
  R: number;
}

// 과별 역량 히트맵 (admin-ds)
export interface CollegeHeatmapItem {
  college: string;
  기획: number;
  실행: number;
  화합: number;
  통섭: number;
  전공지식: number;
  전공기술: number;
  정보화: number;
  신기술활용: number;
  공감: number;
  판단: number;
  사명감: number;
  조직이해: number;
  도전성: number;
  자기학습: number;
  경청: number;
  협상: number;
  외국어: number;
  세계시민: number;
}

// 인증 현황 (admin-ds)
export interface CertificationItem {
  level: string;
  count: number;
  color: string;
  name: string;
}

// 과별 역량 Gap 분석 (admin-ds)
export interface DepartmentGapItem {
  dept: string;
  current: number;
  target: number;
  gap: number;
}

// 관심(위험) 학생 (professor-ds)
export interface ConcernStudent {
  id: number;
  name: string;
  competency: CompetencyType;
  score: number;
  threshold: number;
  level: 'danger' | 'warning';
}

// 역량 미달 학생 (admin-ds)
export interface UnderperformingStudent {
  name: string;
  studentId: string;
  targetComp: CompetencyType;
  score: number;
  threshold: number;
  gap: number;
}

// 성과 분석 약점 영역
export interface WeakArea {
  area: string;
  score: number;
  improvement?: string;
}

// 성과 분석 리포트 (professor-ds)
export interface PerformanceReport {
  achievementRate: number;
  yearlyImprovement: number;
  weakAreas: WeakArea[];
}

// CQI 성과 데이터 (admin-ds)
export interface CQIPerformanceData {
  targetAchievement: number;
  currentAchievement: number;
  achievementRate: number;
  yearOverYear: number;
  weakAreas: WeakArea[];
}

// 대시보드 통계 카드 (admin-ds)
export interface DashboardStatCard {
  label: string;
  value: string;
  iconType: 'users' | 'trending' | 'award' | 'check';
  color: 'blue' | 'green' | 'purple' | 'orange';
  change: string;
}
