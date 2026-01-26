// ============================================================
// Search Types
// Prisma Model: SearchHistory, SearchRecommendation
// ============================================================

// 검색 추천
export interface SearchRecommendation {
  title: string;
  description: string;
  icon: string;
}

// 통합 검색 데이터
export interface SearchData {
  recentSearches: string[];
  popularSearches: string[];
  recommendations: SearchRecommendation[];
  filterTabs: string[];
}
