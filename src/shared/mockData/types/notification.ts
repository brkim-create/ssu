// ============================================================
// Notification Types
// Prisma Model: Notification, NotificationChannel
// ============================================================

// 알림 (student-ds, professor-ds 공통)
export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// 알림 채널 설정
export interface NotificationChannel {
  id: string;
  name: string;
  description: string;
  subText: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
}

// 공유 옵션
export interface ShareOption {
  id: string;
  name: string;
  icon: string;
}
