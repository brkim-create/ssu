// 티켓 상태 상수
export const STATUS_RECEIVED = "접수";
export const STATUS_PROCESSING = "처리중";
export const STATUS_COMPLETED = "완료";
export const STATUS_REJECTED = "반려됨";

// 카테고리 상수
export const CATEGORY_FACILITY = "시설";

// 탭 설정
export const SUPER_ADMIN_TABS = [
  { key: "all", label: "전체" },
  { key: STATUS_RECEIVED, label: "접수" },
  { key: STATUS_PROCESSING, label: "처리중" },
  { key: STATUS_COMPLETED, label: "완료" },
];

export const GENERAL_TABS = [
  { key: "all", label: "전체" },
  { key: STATUS_RECEIVED, label: "접수" },
  { key: STATUS_COMPLETED, label: "완료" },
];
