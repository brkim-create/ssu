// ============================================================
// Course Types
// Prisma Model: Course, CourseMapping, Assessment
// ============================================================

import { CompetencyType } from './competency';

// 개설 과목 (professor-ds)
export interface Course {
  id: number;
  name: string;
  students: number;
  semester: string;
  competency: CompetencyType;
  totalWeeks: number; // 총 주차 수 (정규학기: 15-16, 계절학기: 4-8)
}

// 강의 데이터 (admin-ds)
export interface CourseData {
  id: number;
  code: string;
  name: string;
  professor: string;
  students: number;
  targetCompetency: CompetencyType;
  avgScore: number;
}

// 미매핑 과목 (admin-ds)
export interface UnmappedCourse {
  id: number;
  courseName: string;
  professor: string;
  dept: string;
}

// 교육과정 적절성 (admin-ds)
export interface CurriculumIssues {
  unmappedCourses: number;
  totalCourses: number;
  competencyDistribution: {
    competency: CompetencyType;
    count: number;
    percentage: number;
  }[];
  unmappedCoursesList: UnmappedCourse[];
}

// 평가 도구별 분석 (professor-ds)
export interface AssessmentDataItem {
  name: string;
  S: number;
  T: number;
  A: number;
  R: number;
}

// 평가 도구별 역량 점수 (admin-ds)
export interface AssessmentToolItem {
  tool: string;
  S: number;
  T: number;
  A: number;
  R: number;
}

// 교수법 (professor-ds)
export interface TeachingMethod {
  method: string;
  score: number;
}

// 교수법 연계 진단 (admin-ds)
export interface TeachingMethodItem {
  method: string;
  S: number;
  T: number;
  A: number;
  R: number;
  satisfaction: number;
}

// CQI 운영 현황 (admin-ds)
export interface CQIStatusItem {
  dept: string;
  total: number;
  completed: number;
  rate: number;
  lowGrade: number;
}

// 주차별 강의 (professor-ds)
export interface WeeklyLecture {
  week: number;
  date: string;
  day: string;
  title: string;
  status: '완료' | '진행중' | '예정';
  attendance: number;
}

// 교수 프로필 (professor-ds)
export interface ProfessorProfile {
  name: string;
  department: string;
  courseCount: number;
  employeeId: string;      // 교번
  position: string;        // 직급
  email: string;           // 이메일
}

// 과목 통계 (professor-ds)
export interface CourseStatistics {
  averageScore: number;
  medianScore: number;
}

// 평가 기준 (professor-ds)
export interface EvaluationCriteria {
  name: string;
  weight: number;
  color: string;
}
