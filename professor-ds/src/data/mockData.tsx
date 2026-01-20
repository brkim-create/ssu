// ============================================================
// Professor Dashboard Mock Data
// Re-export from shared mockData (중앙화된 데이터)
// ============================================================

// Types
export type {
  HistogramDataItem,
  AssessmentDataItem,
  ConcernStudent,
  WeakArea,
  PerformanceReport,
  TeachingMethod,
  Course,
  Student,
  StudentCompetency,
  Notification,
  RadarDataItem,
  WeeklyLecture,
  ProfessorProfile,
  CourseStatistics,
} from '@shared/mockData/types';

// Data
export {
  histogramData,
  assessmentData,
  concernStudents,
  performanceReport,
  teachingMethodData,
  courses,
  studentList,
  notifications,
  professorRadarData,
  weeklyLectures,
  professorProfile,
  courseStatistics,
} from '@shared/mockData/data/professor';
