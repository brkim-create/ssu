"use client";

import { useState, useCallback, useMemo } from "react";
import { complaints, complaintCategories } from "@/data/mockData";
import type { ComplaintCategory } from "@/data/mockData";

// 챗봇으로 연결할 카테고리 목록
const CHAT_ENABLED_CATEGORIES = [
  "학생 장학",
  "수업 및 학사",
  "시설 및 환경",
  "학생 복지",
];

export interface ComplaintState {
  // Modal States
  showComplaintModal: boolean;
  selectedCategory: ComplaintCategory | null;
  showFAQ: boolean;
  expandedFAQ: number | null;
  showComplaintListModal: boolean;
  complaintDetailModal: any;

  // Chatbot States
  isChatModalOpen: boolean;
  chatCategory: string;

  // Filter States
  complaintStatusFilter: string;
  searchKeyword: string;
  periodFilter: string;

  // Rating States
  showRatingModal: boolean;
  complaintReadStatus: Record<number, boolean>;
  complaintRatedStatus: Record<number, boolean>;
  complaintRatings: Record<number, number>;
  ratingComplaintId: number | null;
  selectedRating: number;
  ratingComment: string;
}

export interface ComplaintActions {
  // Modal Actions
  openComplaintModal: (category?: ComplaintCategory) => void;
  closeComplaintModal: () => void;
  openFAQ: () => void;
  closeFAQ: () => void;
  setExpandedFAQ: (id: number | null) => void;
  openComplaintListModal: () => void;
  closeComplaintListModal: () => void;
  setComplaintDetailModal: (complaint: any) => void;

  // Chatbot Actions
  openChatModal: (category: string) => void;
  closeChatModal: () => void;

  // Filter Actions
  setComplaintStatusFilter: (status: string) => void;
  setSearchKeyword: (keyword: string) => void;
  setPeriodFilter: (period: string) => void;

  // Rating Actions
  handleRateComplaint: (complaintId: number) => void;
  handleRatingSubmit: () => void;
  setSelectedRating: (rating: number) => void;
  setRatingComment: (comment: string) => void;

  // Category Click Handler
  handleCategoryClick: (category: ComplaintCategory) => void;
  handleStatClick: (status: string) => void;
  handleComplaintSubmit: (data: any) => void;
  handleFABClick: () => void;
}

export interface ComplaintComputed {
  complaintStats: {
    접수: number;
    처리중: number;
    완료: number;
  };
  completionRate: number;
  categories: ComplaintCategory[];
  complaintList: typeof complaints;
}

export function useComplaintLogic(onChatOpen?: (category: string) => void) {
  // ========== Modal States ==========
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ComplaintCategory | null>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showComplaintListModal, setShowComplaintListModal] = useState(false);
  const [complaintDetailModal, setComplaintDetailModal] = useState<any>(null);

  // ========== Chatbot States ==========
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatCategory, setChatCategory] = useState("학생 장학");

  // ========== Filter States ==========
  const [complaintStatusFilter, setComplaintStatusFilter] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [periodFilter, setPeriodFilter] = useState("전체");

  // ========== Rating States ==========
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [complaintReadStatus, setComplaintReadStatus] = useState<
    Record<number, boolean>
  >({});
  const [complaintRatedStatus, setComplaintRatedStatus] = useState<
    Record<number, boolean>
  >({});
  const [complaintRatings, setComplaintRatings] = useState<
    Record<number, number>
  >({});
  const [ratingComplaintId, setRatingComplaintId] = useState<number | null>(
    null
  );
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  // ========== Computed Values ==========
  const complaintStats = useMemo(
    () => ({
      접수: complaints.filter((c) => c.status === "접수").length,
      처리중: complaints.filter((c) => c.status === "처리중").length,
      완료: complaints.filter((c) => c.status === "완료").length,
    }),
    []
  );

  const completionRate = useMemo(
    () => Math.round((complaintStats.완료 / complaints.length) * 100),
    [complaintStats.완료]
  );

  // ========== Modal Actions ==========
  const openComplaintModal = useCallback((category?: ComplaintCategory) => {
    if (category) {
      setSelectedCategory(category);
    }
    setShowComplaintModal(true);
  }, []);

  const closeComplaintModal = useCallback(() => {
    setShowComplaintModal(false);
    setSelectedCategory(null);
  }, []);

  const openFAQ = useCallback(() => setShowFAQ(true), []);
  const closeFAQ = useCallback(() => setShowFAQ(false), []);

  const openComplaintListModal = useCallback(
    () => setShowComplaintListModal(true),
    []
  );

  const closeComplaintListModal = useCallback(() => {
    setShowComplaintListModal(false);
    setSearchKeyword("");
    setPeriodFilter("전체");
  }, []);

  // ========== Chatbot Actions ==========
  const openChatModal = useCallback((category: string) => {
    setChatCategory(category);
    setIsChatModalOpen(true);
  }, []);

  const closeChatModal = useCallback(() => setIsChatModalOpen(false), []);

  // ========== Rating Actions ==========
  const handleRateComplaint = useCallback((complaintId: number) => {
    setRatingComplaintId(complaintId);
    setShowRatingModal(true);
  }, []);

  const handleRatingSubmit = useCallback(() => {
    if (ratingComplaintId && selectedRating > 0) {
      setComplaintRatedStatus((prev) => ({
        ...prev,
        [ratingComplaintId]: true,
      }));
      setComplaintRatings((prev) => ({
        ...prev,
        [ratingComplaintId]: selectedRating,
      }));
      setShowRatingModal(false);
      setShowComplaintListModal(false);
      setRatingComplaintId(null);
      setSelectedRating(0);
      setRatingComment("");
      alert("평가를 등록해주셔서 감사합니다!");
    }
  }, [ratingComplaintId, selectedRating]);

  // ========== Category Click Handler ==========
  const handleCategoryClick = useCallback(
    (cat: ComplaintCategory) => {
      if (CHAT_ENABLED_CATEGORIES.includes(cat.name)) {
        setChatCategory(cat.name);
        setIsChatModalOpen(true);
        onChatOpen?.(cat.name);
      } else {
        setSelectedCategory(cat);
        setShowComplaintModal(true);
      }
    },
    [onChatOpen]
  );

  // ========== Stat Click Handler ==========
  const handleStatClick = useCallback((status: string) => {
    setComplaintStatusFilter(status);
    setShowComplaintListModal(true);
  }, []);

  // ========== Complaint Submit Handler ==========
  const handleComplaintSubmit = useCallback((data: any) => {
    alert(
      `민원이 접수되었습니다!\n\n카테고리: ${data.category.name}\n제목: ${data.title}\n내용: ${data.content}\n첨부파일: ${data.files.length}개`
    );
  }, []);

  // ========== FAB Click Handler ==========
  const handleFABClick = useCallback(() => {
    setSelectedCategory(complaintCategories[0]);
    setShowComplaintModal(true);
  }, []);

  // ========== Return Values ==========
  const state: ComplaintState = {
    showComplaintModal,
    selectedCategory,
    showFAQ,
    expandedFAQ,
    showComplaintListModal,
    complaintDetailModal,
    isChatModalOpen,
    chatCategory,
    complaintStatusFilter,
    searchKeyword,
    periodFilter,
    showRatingModal,
    complaintReadStatus,
    complaintRatedStatus,
    complaintRatings,
    ratingComplaintId,
    selectedRating,
    ratingComment,
  };

  const actions: ComplaintActions = {
    openComplaintModal,
    closeComplaintModal,
    openFAQ,
    closeFAQ,
    setExpandedFAQ,
    openComplaintListModal,
    closeComplaintListModal,
    setComplaintDetailModal,
    openChatModal,
    closeChatModal,
    setComplaintStatusFilter,
    setSearchKeyword,
    setPeriodFilter,
    handleRateComplaint,
    handleRatingSubmit,
    setSelectedRating,
    setRatingComment,
    handleCategoryClick,
    handleStatClick,
    handleComplaintSubmit,
    handleFABClick,
  };

  const computed: ComplaintComputed = {
    complaintStats,
    completionRate,
    categories: complaintCategories,
    complaintList: complaints,
  };

  return { state, actions, computed };
}
