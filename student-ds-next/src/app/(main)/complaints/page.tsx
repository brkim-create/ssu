"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Building, GraduationCap, Heart, BookOpen, HelpCircle, CheckCircle, Send, X, Search, Star, ChevronRight, MessageCircle, Clock, Check, User, FileText, Copy, Download, Trophy, Bell } from "lucide-react";
import Header from "@/components/common/Header";
import ChatModal from "@/components/chatbot/ChatModal";
import FAQModal from "@/components/modals/complaints/FAQModal";
import WriteComplaintModal from "@/components/modals/complaints/WriteComplaintModal";
import { complaintCategories, complaints, faqData, ComplaintCategory, Complaint } from "@/data/mockData";

// 아이콘 매핑
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building,
  GraduationCap,
  Heart,
  BookOpen,
};

/**
 * ComplaintsPage - 민원 센터 페이지
 *
 * 역할:
 * - 민원 통계 표시 (접수/처리중/완료)
 * - 민원 카테고리 선택 및 작성
 * - 민원 목록은 마이페이지에서 확인
 */
export default function ComplaintsPage() {
  const router = useRouter();

  // Modal 상태
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [expandedFAQId, setExpandedFAQId] = useState<number | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedCategoryForWrite, setSelectedCategoryForWrite] = useState<ComplaintCategory | null>(null);

  // 성공 모달 상태
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successType, setSuccessType] = useState<"submit" | "complete">("submit");

  // 민원 목록 모달 상태
  const [showComplaintListModal, setShowComplaintListModal] = useState(false);
  const [complaintStatusFilter, setComplaintStatusFilter] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [periodFilter, setPeriodFilter] = useState("전체");

  // 평가 모달 상태
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [complaintReadStatus, setComplaintReadStatus] = useState<Record<number, boolean>>({});
  const [complaintRatedStatus, setComplaintRatedStatus] = useState<Record<number, boolean>>({});
  const [complaintRatings, setComplaintRatings] = useState<Record<number, number>>({});
  const [ratingComplaintId, setRatingComplaintId] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  // 민원 상세 모달 상태
  const [complaintDetailModal, setComplaintDetailModal] = useState<Complaint | null>(null);

  // 공유/검색/알림설정 모달 상태
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] = useState(false);
  const [notificationChannels, setNotificationChannels] = useState({
    pwa: true,
    kakao: false,
    email: true,
  });

  // 통계 계산
  const stats = {
    접수: complaints.filter((c) => c.status === "접수").length,
    처리중: complaints.filter((c) => c.status === "처리중").length,
    완료: complaints.filter((c) => c.status === "완료").length,
  };
  const completionRate = Math.round((stats.완료 / complaints.length) * 100);

  // 민원 필터링
  const getFilteredComplaints = () => {
    let filtered = [...complaints];

    // 1. 상태 필터링
    if (complaintStatusFilter !== "전체") {
      filtered = filtered.filter((c) => c.status === complaintStatusFilter);
    }

    // 2. 기간 필터링
    if (periodFilter !== "전체") {
      const now = new Date();
      const monthsAgo = periodFilter === "1개월" ? 1 : periodFilter === "3개월" ? 3 : 6;
      const filterDate = new Date(now.setMonth(now.getMonth() - monthsAgo));

      filtered = filtered.filter((c) => {
        const complaintDate = new Date(c.date.replace(/\./g, "-"));
        return complaintDate >= filterDate;
      });
    }

    // 3. 키워드 필터링
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(keyword) ||
          c.content.toLowerCase().includes(keyword)
      );
    }

    return filtered;
  };

  // 민원 목록 모달 닫기 (X버튼)
  const handleCloseComplaintListModal = () => {
    setShowComplaintListModal(false);
    setSearchKeyword("");
    setPeriodFilter("전체");
  };

  // 통계 클릭 시 민원 목록 모달 열기
  const handleStatClick = (status: string) => {
    setComplaintStatusFilter(status);
    setShowComplaintListModal(true);
  };

  // "평가하기" 버튼 클릭
  const handleRateComplaint = (complaintId: number) => {
    setRatingComplaintId(complaintId);
    setShowRatingModal(true);
  };

  // 만족도 평가 제출
  const handleRatingSubmit = () => {
    if (ratingComplaintId && selectedRating > 0) {
      setComplaintRatedStatus({ ...complaintRatedStatus, [ratingComplaintId]: true });
      setComplaintRatings({ ...complaintRatings, [ratingComplaintId]: selectedRating });
      setShowRatingModal(false);
      setShowComplaintListModal(false);
      setRatingComplaintId(null);
      setSelectedRating(0);
      setRatingComment("");
      alert("평가해 주셔서 감사합니다!");
    }
  };

  // 민원 상세 모달 열기
  const handleOpenComplaintDetail = (complaint: Complaint) => {
    setShowComplaintListModal(false);
    setComplaintDetailModal(complaint);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setSelectedCategory("");
  };

  const handleChatSuccess = (message: string, type?: "complete" | "submit") => {
    setSuccessMessage(message);
    setSuccessType(type || "complete");
    setShowSuccessModal(true);
  };

  // 민원 작성 모달 열기 (FAB 버튼)
  const handleOpenWriteModal = () => {
    // 첫 번째 카테고리를 기본 선택
    if (complaintCategories.length > 0) {
      setSelectedCategoryForWrite(complaintCategories[0]);
      setIsWriteModalOpen(true);
    }
  };

  // 민원 작성 제출 핸들러
  const handleComplaintSubmit = (data: {
    category: ComplaintCategory;
    subCategory: string | null;
    title: string;
    content: string;
    files: unknown[];
    isAnonymous: boolean;
    isPrivate: boolean;
    agreeNotification: boolean;
  }) => {
    console.log("Complaint submitted:", data);
    alert("민원이 성공적으로 접수되었습니다.");
  };

  // Header 아이콘 핸들러
  const handleShareClick = () => setShowShareModal(true);
  const handleSearchClick = () => setShowSearchModal(true);
  const handleBellClick = () => setShowNotificationSettingsModal(true);

  return (
    <div className="pb-4">
      {/* Header with Progress Bar */}
      <Header
        title="민원 센터"
        subtitle="문제가 있다면 알려주세요."
        onShareClick={handleShareClick}
        onSearchClick={handleSearchClick}
        onBellClick={handleBellClick}
      >
        <ProgressBar completionRate={completionRate} />
      </Header>

      {/* Stats Overview */}
      <div className="mx-4 mt-4">
        <StatsOverview stats={stats} onStatClick={handleStatClick} />
      </div>

      {/* Categories */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">민원 카테고리</h3>
        <div className="grid grid-cols-2 gap-3">
          {complaintCategories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Building;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className="bg-gray-50 rounded-2xl shadow p-5 text-left hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <IconComponent className="w-6 h-6 text-gray-500" />
                </div>
                <p className="font-bold text-gray-800 mb-1">{cat.name}</p>
                <p className="text-xs text-gray-500">
                  {cat.items.length}개 세부항목
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAB - FAQ */}
      <button
        onClick={() => setIsFAQOpen(true)}
        className="fixed bottom-40 right-4 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 z-40 hover:shadow-xl transition-shadow"
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      {/* FAB - 새 민원 작성 */}
      <button
        onClick={handleOpenWriteModal}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg flex items-center justify-center text-white z-40 hover:shadow-xl transition-shadow"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* ChatModal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={handleChatClose}
        category={selectedCategory}
        onSuccess={handleChatSuccess}
      />

      {/* FAQModal */}
      <FAQModal
        isOpen={isFAQOpen}
        faqData={faqData}
        expandedId={expandedFAQId}
        onExpandChange={setExpandedFAQId}
        onClose={() => {
          setIsFAQOpen(false);
          setExpandedFAQId(null);
        }}
      />

      {/* WriteComplaintModal */}
      <WriteComplaintModal
        isOpen={isWriteModalOpen}
        category={selectedCategoryForWrite}
        onClose={() => {
          setIsWriteModalOpen(false);
          setSelectedCategoryForWrite(null);
        }}
        onSubmit={handleComplaintSubmit}
      />

      {/* 성공 모달 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 animate-scale-up shadow-2xl">
            <div className="flex flex-col items-center text-center">
              {/* 아이콘 */}
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
                {successType === "complete" ? (
                  <CheckCircle className="w-10 h-10 text-white" />
                ) : (
                  <Send className="w-10 h-10 text-white" />
                )}
              </div>

              {/* 메시지 */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {successType === "complete" ? "완료되었습니다!" : "접수 완료!"}
              </h3>
              <p className="text-gray-600 whitespace-pre-line mb-6">
                {successMessage}
              </p>

              {/* 확인 버튼 */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 민원 목록 모달 */}
      {showComplaintListModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] flex flex-col">
            {/* 헤더 */}
            <div className="p-6 pb-4 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl">민원 내역</h3>
                <button onClick={handleCloseComplaintListModal}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* 검색 */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="제목 또는 내용 검색"
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* 상태 필터 */}
              <div className="flex gap-2 mb-3">
                {["전체", "접수", "처리중", "완료"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setComplaintStatusFilter(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      complaintStatusFilter === status
                        ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* 기간 필터 */}
              <div className="flex gap-2">
                {["전체", "1개월", "3개월", "6개월"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setPeriodFilter(period)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      periodFilter === period
                        ? "bg-pink-100 text-pink-600 font-medium"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* 민원 목록 */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="space-y-3">
                {getFilteredComplaints().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    검색 결과가 없습니다.
                  </div>
                ) : (
                  getFilteredComplaints().map((complaint) => (
                    <div
                      key={complaint.id}
                      onClick={() => handleOpenComplaintDetail(complaint)}
                      className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                complaint.status === "접수"
                                  ? "bg-blue-100 text-blue-600"
                                  : complaint.status === "처리중"
                                  ? "bg-orange-100 text-orange-600"
                                  : "bg-green-100 text-green-600"
                              }`}
                            >
                              {complaint.status}
                            </span>
                            <span className="text-xs text-gray-400">
                              {complaint.date}
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-800">
                            {complaint.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {complaint.content}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                      </div>

                      {/* 완료된 민원에 평가 버튼 */}
                      {complaint.status === "완료" &&
                        !complaintRatedStatus[complaint.id] && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRateComplaint(complaint.id);
                            }}
                            className="mt-2 w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg text-sm font-medium"
                          >
                            평가하기
                          </button>
                        )}

                      {/* 이미 평가한 경우 */}
                      {complaint.status === "완료" &&
                        complaintRatedStatus[complaint.id] && (
                          <div className="mt-2 flex items-center justify-center gap-1 py-2 bg-gray-100 rounded-lg">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= (complaintRatings[complaint.id] || 0)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500 ml-1">
                              평가 완료
                            </span>
                          </div>
                        )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 평가 모달 */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                민원 처리 만족도 평가
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                서비스 개선을 위해 평가해 주세요.
              </p>

              {/* 별점 */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= selectedRating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* 코멘트 */}
              <textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                placeholder="의견을 남겨주세요 (선택)"
                rows={3}
                className="w-full p-3 bg-gray-100 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
              />

              {/* 버튼 */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRatingModal(false);
                    setSelectedRating(0);
                    setRatingComment("");
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
                >
                  취소
                </button>
                <button
                  onClick={handleRatingSubmit}
                  disabled={selectedRating === 0}
                  className="flex-1 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold disabled:opacity-50"
                >
                  제출
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 민원 상세보기 모달 */}
      {complaintDetailModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md h-[85vh] rounded-t-3xl flex flex-col">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-6 rounded-t-3xl shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-xl">민원 상세보기</h3>
                <button
                  onClick={() => {
                    setComplaintDetailModal(null);
                    setShowComplaintListModal(true);
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <span>{complaintDetailModal.category}</span>
                <span>•</span>
                <span>{complaintDetailModal.date}</span>
              </div>
            </div>

            {/* 내용 */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* 제목 */}
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-800 mb-2">{complaintDetailModal.title}</h4>
                <div className="flex items-center gap-2">
                  {complaintDetailModal.status === '완료' ? (
                    <>
                      {complaintRatings[complaintDetailModal.id] ? (
                        <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-medium text-yellow-600">{complaintRatings[complaintDetailModal.id]}.0</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRateComplaint(complaintDetailModal.id)}
                          className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium hover:bg-yellow-100 transition-colors"
                        >
                          평가하기
                        </button>
                      )}
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      complaintDetailModal.status === '접수' ? 'bg-blue-100 text-blue-700' :
                      complaintDetailModal.status === '처리중' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {complaintDetailModal.status}
                    </span>
                  )}
                </div>
              </div>

              {/* 내가 작성한 민원 내용 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  <h5 className="font-bold text-gray-800">문의 내용</h5>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {complaintDetailModal.content}
                  </p>
                </div>
              </div>

              {/* 처리중 상태: 타임라인 + 담당자 정보 */}
              {complaintDetailModal.status === '처리중' && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h5 className="font-bold text-gray-800">처리 현황</h5>
                  </div>

                  {/* 타임라인 UI */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      {['접수 확인', '담당자 배정', '처리중'].map((step, index) => (
                        <div key={`${complaintDetailModal.id}-${step}`} className="flex items-center flex-1">
                          <div className="flex flex-col items-center w-full">
                            <div className="relative flex items-center justify-center w-full">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 z-10 ${
                                index < (complaintDetailModal.currentStep || 0)
                                  ? 'bg-blue-500 text-white'
                                  : index === (complaintDetailModal.currentStep || 0)
                                  ? 'bg-blue-500 text-white animate-pulse'
                                  : 'bg-gray-300 text-gray-500'
                              }`}>
                                {index < (complaintDetailModal.currentStep || 0) ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <span className="text-xs font-bold">{index + 1}</span>
                                )}
                              </div>
                              {index < 2 && (
                                <div className={`absolute left-1/2 w-full h-0.5 ${
                                  index < (complaintDetailModal.currentStep || 0) ? 'bg-blue-500' : 'bg-gray-300'
                                }`} style={{ top: '50%', transform: 'translateY(-50%)' }} />
                              )}
                            </div>
                            <span className={`text-xs text-center whitespace-nowrap mt-1 ${
                              index <= (complaintDetailModal.currentStep || 0) ? 'text-gray-800 font-medium' : 'text-gray-400'
                            }`}>
                              {step}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 담당 정보 */}
                  {complaintDetailModal.department && complaintDetailModal.assignee && (
                    <div className="bg-white border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-600 shrink-0" />
                        <div className="text-sm text-gray-800">
                          <span className="font-medium">부서:</span> {complaintDetailModal.department}
                          <span className="mx-2">|</span>
                          <span className="font-medium">담당:</span> {complaintDetailModal.assignee}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 완료 상태: 관리자 답변 + 첨부파일 */}
              {complaintDetailModal.status === '완료' && complaintDetailModal.adminResponse && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h5 className="font-bold text-gray-800">관리자 답변</h5>
                  </div>

                  {/* 관리자 답변 */}
                  <div className="bg-green-50 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-green-900">답변 내용</span>
                      <span className="text-xs text-green-700">{complaintDetailModal.responseDate}</span>
                    </div>
                    <p className="text-sm text-green-900 leading-relaxed whitespace-pre-wrap">
                      {complaintDetailModal.adminResponse}
                    </p>
                  </div>

                  {/* 첨부파일 */}
                  {complaintDetailModal.attachments && complaintDetailModal.attachments.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <h5 className="font-bold text-gray-800">첨부파일 ({complaintDetailModal.attachments.length})</h5>
                      </div>
                      <div className="space-y-2">
                        {complaintDetailModal.attachments.map((file) => (
                          <div key={file.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                              </div>
                            </div>
                            <a
                              href={file.url}
                              download
                              className="ml-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shrink-0"
                            >
                              다운로드
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 하단 버튼 */}
            <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
              <button
                onClick={() => {
                  setComplaintDetailModal(null);
                  setShowComplaintListModal(true);
                }}
                className="w-full py-3 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 공유 모달 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">내 역량 리포트 공유</h3>
              <button onClick={() => setShowShareModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">역량 점수와 리포트를 공유하세요</p>

            <div className="space-y-3">
              <button className="w-full py-4 bg-yellow-400 text-gray-800 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all">
                <MessageCircle className="w-5 h-5" />
                카카오톡으로 공유
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://student-dashboard.example.com/report/김수성');
                  alert('링크가 복사되었습니다!');
                }}
                className="w-full py-4 bg-blue-50 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-100 transition-all"
              >
                <Copy className="w-5 h-5" />
                링크 복사
              </button>

              <button className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all">
                <Download className="w-5 h-5" />
                PDF로 다운로드
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500">
                💡 공유된 리포트는 7일간 유효합니다
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 검색 모달 */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl h-[85vh] flex flex-col">
            {/* 고정 상단 영역 */}
            <div className="p-6 pb-4 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl">통합 검색</h3>
                <button onClick={() => setShowSearchModal(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* 검색창 */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Evidence, 민원, 알림 검색..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  autoFocus
                />
              </div>

              {/* 필터 탭 */}
              <div className="flex gap-2 mt-4">
                {['전체', 'Evidence', '민원', '알림'].map((filter) => (
                  <button
                    key={filter}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-pink-100 hover:text-pink-600 transition-all"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* 스크롤 가능한 중간 영역 */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="space-y-4">
                {/* 최근 검색어 */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">최근 검색어</h4>
                  <div className="flex flex-wrap gap-2">
                    {['창의적 문제해결', '장학금', '도서관 냉방', 'S역량'].map((term, idx) => (
                      <button
                        key={idx}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 인기 검색어 */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">인기 검색어</h4>
                  <div className="space-y-2">
                    {['수강신청', '성적 정정', '역량 점수', '민원 제출'].map((term, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
                        <span className="text-pink-500 font-bold text-sm">{idx + 1}</span>
                        <span className="text-gray-800">{term}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 추천 */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">추천</h4>
                  <div className="space-y-2">
                    <div className="p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-bold text-gray-800">S 창의 역량</span>
                      </div>
                      <p className="text-xs text-gray-600">최근 업데이트된 역량 점수를 확인하세요</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 고정 하단 영역 */}
            <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
              <button className="w-full py-3 text-gray-500 text-sm">
                검색 기록 전체 삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 알림 설정 모달 */}
      {showNotificationSettingsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">알림 설정</h3>
              <button onClick={() => setShowNotificationSettingsModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">받고 싶은 알림 채널을 선택하세요</p>

            <div className="space-y-4">
              {/* PWA 푸시 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">PWA 푸시</p>
                      <p className="text-xs text-gray-500">브라우저 알림</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationChannels({...notificationChannels, pwa: !notificationChannels.pwa})}
                    className={`w-12 h-6 rounded-full relative transition-all ${
                      notificationChannels.pwa ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationChannels.pwa ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">실시간으로 중요한 알림을 받을 수 있습니다</p>
              </div>

              {/* 카카오톡 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">카카오톡</p>
                      <p className="text-xs text-gray-500">카카오 알림톡</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationChannels({...notificationChannels, kakao: !notificationChannels.kakao})}
                    className={`w-12 h-6 rounded-full relative transition-all ${
                      notificationChannels.kakao ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationChannels.kakao ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">카카오톡으로 알림을 받을 수 있습니다</p>
              </div>

              {/* 이메일 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <Send className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">이메일</p>
                      <p className="text-xs text-gray-500">school@example.com</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationChannels({...notificationChannels, email: !notificationChannels.email})}
                    className={`w-12 h-6 rounded-full relative transition-all ${
                      notificationChannels.email ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationChannels.email ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">이메일로 상세한 알림을 받을 수 있습니다</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-700">
                💡 알림 채널은 언제든지 변경할 수 있습니다
              </p>
            </div>

            <button
              onClick={() => {
                setShowNotificationSettingsModal(false);
                alert('알림 설정이 저장되었습니다!');
              }}
              className="w-full mt-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold"
            >
              저장하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ========== Sub Components ==========

// 처리율 프로그레스 바 (Header 내부용)
function ProgressBar({ completionRate }: { completionRate: number }) {
  return (
    <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 mt-2">
      <div className="flex items-center gap-3 text-sm">
        <span className="text-white font-medium whitespace-nowrap">처리율</span>
        <div className="flex-1 bg-white/30 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <span className="font-bold text-white whitespace-nowrap">
          {completionRate}%
        </span>
      </div>
    </div>
  );
}

interface StatsOverviewProps {
  stats: { 접수: number; 처리중: number; 완료: number };
  onStatClick?: (status: string) => void;
}

function StatsOverview({ stats, onStatClick }: StatsOverviewProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <div className="mb-3">
        <h3 className="font-bold text-gray-800">나의 민원 현황</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "접수", value: stats.접수, color: "text-blue-600" },
          { label: "처리중", value: stats.처리중, color: "text-orange-600" },
          { label: "완료", value: stats.완료, color: "text-green-600" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => onStatClick?.(item.label)}
            className="bg-gray-50 rounded-xl p-3 text-center hover:shadow-md transition-all"
          >
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-gray-600 mt-1">{item.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
