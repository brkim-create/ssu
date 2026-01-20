// ============================================================
// Student Dashboard Mock Data
// Re-export from shared mockData (중앙화된 데이터)
// ============================================================

// Types
export type {
  RadarDataItem,
  StarDetail,
  PODetail,
  ComplaintCategory,
  ComplaintAttachment,
  Complaint,
  Notification,
  FAQ,
  Evidence,
  JobFitItem,
  JobFitData,
  ChatMessage,
  ChatbotAnswerTemplate,
  WelfareAnswerTemplate,
  SearchRecommendation,
  SearchData,
  LoginHistory,
  ShareOption,
  NotificationChannel,
  UserProfile,
  StudentProfile,
  AppConfig,
} from '@shared/mockData/types';

// Data
export {
  CURRENT_STUDENT_ID,
  currentStudentProfile,
  appConfig,
  radarData,
  radarDataPO,
  jobFitData,
  starDetails,
  poDetails,
  skillProgress,
  complaintCategories,
  complaints,
  notifications,
  faqData,
  evidenceData,
  GEMINI_CATEGORIES,
  chatbotOptions,
  chatbotInitialMessages,
  scholarshipAnswerTemplates,
  welfareAnswers,
  academicAnswerTemplates,
  searchData,
  loginHistory,
  shareOptions,
  notificationChannels,
  userProfile,
} from '@shared/mockData/data/student';
