"use client";

import { useState, useRef, useEffect } from "react";
import { X, MessageCircle, Send, Loader2 } from "lucide-react";
import {
  chatbotOptions,
  chatbotInitialMessages,
  scholarshipAnswerTemplates,
  welfareAnswers,
  academicAnswerTemplates,
  ChatMessage,
} from "@/data/mockData";

// Gemini API를 사용할 카테고리
const GEMINI_CATEGORIES = ["학생 장학", "수업 및 학사"];

// Props Interface
interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  onSuccess?: (message: string, type?: "complete" | "submit") => void;
}

// 채팅 답변 타입 (기존 플로우용)
interface ChatAnswers {
  facilityType?: string;
  building?: string;
  floor?: string;
  problemType?: string;
  detail?: string;
  scholarshipType?: string;
  semester?: string;
  inquiryType?: string;
  welfareType?: string;
  welfareInquiry?: string;
  academicType?: string;
  courseName?: string;
}

// ========== 기존 플로우용 정적 응답 함수들 ==========
const getScholarshipAnswer = (
  scholarshipType: string,
  semester: string,
  inquiryType: string
): string => {
  const template = scholarshipAnswerTemplates[inquiryType];
  if (!template) {
    return "문의하신 내용에 대한 답변을 준비 중입니다. 학생처로 직접 문의해주세요.";
  }
  return template
    .replace(/{scholarshipType}/g, scholarshipType)
    .replace(/{semester}/g, semester);
};

const getWelfareAnswer = (
  welfareType: string,
  welfareInquiry: string
): string => {
  return (
    welfareAnswers[welfareType]?.[welfareInquiry] ||
    "문의하신 내용에 대한 답변을 준비 중입니다. 학생복지팀으로 직접 문의해주세요."
  );
};

const getAcademicAnswer = (academicType: string, detail: string): string => {
  const template = academicAnswerTemplates[academicType];
  if (!template) {
    return "문의하신 내용에 대한 답변을 준비 중입니다. 교학팀으로 직접 문의해주세요.";
  }
  return template.replace(/{detail}/g, detail);
};

// 카테고리별 초기 메시지 생성
const getInitialMessages = (category: string): ChatMessage[] => {
  if (GEMINI_CATEGORIES.includes(category)) {
    return [
      {
        type: "bot",
        message: `안녕하세요! '${category}' 관련 궁금한 점을 물어보세요.`,
      },
    ];
  }

  return (
    chatbotInitialMessages[category] || [
      { type: "bot", message: "안녕하세요! 문의를 도와드리겠습니다." },
    ]
  );
};

export default function ChatModal({
  isOpen,
  onClose,
  category,
  onSuccess,
}: ChatModalProps) {
  // 공통 state
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // 기존 플로우용 state
  const [chatStep, setChatStep] = useState(0);
  const [chatAnswers, setChatAnswers] = useState<ChatAnswers>({});

  // Gemini API 사용 여부
  const useGeminiAPI = GEMINI_CATEGORIES.includes(category);

  // 모달 열릴 때 초기화
  useEffect(() => {
    if (isOpen && category) {
      setChatStep(0);
      setChatAnswers({});
      setChatHistory(getInitialMessages(category));
      setUserInput("");
      setIsLoading(false);
    }
  }, [isOpen, category]);

  // 스크롤 자동 이동
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  // ========== Gemini API 모드: 메시지 전송 ==========
  const handleSendMessageAPI = async () => {
    if (!userInput.trim() || isLoading) return;

    const currentMessage = userInput;
    setUserInput("");
    setIsLoading(true);

    const newHistory: ChatMessage[] = [
      ...chatHistory,
      { type: "user", message: currentMessage },
    ];
    setChatHistory(newHistory);

    try {
      // Gemini API History 규칙: 첫 번째 메시지는 반드시 'user' role이어야 함
      // 현재 입력한 메시지는 제외 (API가 별도 처리)
      const pastHistory = newHistory.slice(0, -1);

      // 첫 메시지가 봇의 인사말이면 제거 (API 규칙 위반 방지)
      const validHistory =
        pastHistory.length > 0 && pastHistory[0].type === "bot"
          ? pastHistory.slice(1)
          : pastHistory;

      // Next.js API Route 호출
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
          category,
          history: validHistory.map((msg) => ({
            role: msg.type === "user" ? "user" : "model",
            parts: [{ text: msg.message }],
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API 요청 실패");
      }

      const data = await response.json();
      setChatHistory((prev) => [...prev, { type: "bot", message: data.reply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          message:
            "죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 모달 닫기 핸들러
  const handleClose = () => {
    if (
      !useGeminiAPI &&
      category !== "시설 및 환경" &&
      chatAnswers &&
      Object.keys(chatAnswers).length > 0
    ) {
      onSuccess?.("문의가 완료되었습니다!", "complete");
    }
    setChatStep(0);
    setChatHistory([]);
    setChatAnswers({});
    setUserInput("");
    onClose();
  };

  if (!isOpen) return null;

  // ========== Gemini API 모드 UI ==========
  if (useGeminiAPI) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center p-4">
        <div className="bg-white w-full max-w-md h-[80vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex justify-between items-center text-white flex-shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg">{category}</span>
                <span className="text-sm opacity-90">챗봇</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="hover:bg-white/20 rounded-full p-1 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 채팅 영역 */}
          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.type === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.type === "bot"
                      ? "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                      : "bg-orange-500 text-white rounded-tr-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                  <span className="text-xs text-gray-500">답변 생성 중...</span>
                </div>
              </div>
            )}
          </div>

          {/* 입력 영역 */}
          <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  !e.nativeEvent.isComposing &&
                  handleSendMessageAPI()
                }
                placeholder="질문을 입력하세요..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessageAPI}
                disabled={isLoading || !userInput.trim()}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white p-3 rounded-xl transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== 기존 단계별 플로우 모드 UI ==========
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md h-[90vh] flex flex-col rounded-t-3xl animate-slide-up">
        {/* 헤더 */}
        <div className="shrink-0 p-4 border-b border-gray-200 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">{category} 문의</h3>
                <p className="text-xs opacity-90">챗봇 상담</p>
              </div>
            </div>
            <button onClick={handleClose}>
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 채팅 영역 */}
        <div
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-3"
        >
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.type === "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] ${
                  msg.type === "bot"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-[#FEE500] text-gray-900"
                } rounded-2xl px-4 py-3`}
              >
                <p className="text-sm whitespace-pre-line">{msg.message}</p>
              </div>
            </div>
          ))}

          {/* 시설 및 환경 - Step 0 */}
          {chatStep === 0 && category === "시설 및 환경" && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {chatbotOptions.facilityTypes.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({ ...chatAnswers, facilityType: option });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: option },
                      { type: "bot", message: "어느 건물인가요?" },
                    ]);
                    setChatStep(1);
                  }}
                  className="py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* 학생 장학 - Step 0 (기존 플로우용 - Gemini 미사용 시) */}
          {chatStep === 0 && category === "학생 장학" && !useGeminiAPI && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {chatbotOptions.scholarshipTypes.map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setChatAnswers({
                        ...chatAnswers,
                        scholarshipType: option,
                      });
                      setChatHistory([
                        ...chatHistory,
                        { type: "user", message: option },
                        {
                          type: "bot",
                          message: "어느 학기에 대해 문의하시나요?",
                        },
                      ]);
                      setChatStep(1);
                    }}
                    className="py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-all"
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          )}

          {/* 학생 복지 - Step 0 */}
          {chatStep === 0 && category === "학생 복지" && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {chatbotOptions.welfareTypes.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({ ...chatAnswers, welfareType: option });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: option },
                      {
                        type: "bot",
                        message: "어떤 내용에 대해 문의하시나요?",
                      },
                    ]);
                    setChatStep(1);
                  }}
                  className="py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* 수업 및 학사 - Step 0 (기존 플로우용 - Gemini 미사용 시) */}
          {chatStep === 0 && category === "수업 및 학사" && !useGeminiAPI && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {chatbotOptions.academicTypes.map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setChatAnswers({ ...chatAnswers, academicType: option });
                      setChatHistory([
                        ...chatHistory,
                        { type: "user", message: option },
                        {
                          type: "bot",
                          message:
                            option === "성적 문의"
                              ? "과목명을 입력해주세요"
                              : "자세한 내용을 말씀해주세요",
                        },
                      ]);
                      setChatStep(1);
                    }}
                    className="py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-all"
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          )}

          {/* 시설 및 환경 - Step 1 */}
          {chatStep === 1 && category === "시설 및 환경" && (
            <div className="pt-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && userInput.trim()) {
                    setChatAnswers({ ...chatAnswers, building: userInput });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: userInput },
                      { type: "bot", message: "몇 층인가요?" },
                    ]);
                    setUserInput("");
                    setChatStep(2);
                  }
                }}
                placeholder="건물명을 입력하세요 (예: A동, 공학관)"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400"
              />
              <button
                onClick={() => {
                  if (userInput.trim()) {
                    setChatAnswers({ ...chatAnswers, building: userInput });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: userInput },
                      { type: "bot", message: "몇 층인가요?" },
                    ]);
                    setUserInput("");
                    setChatStep(2);
                  }
                }}
                className="mt-2 w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
              >
                다음
              </button>
            </div>
          )}

          {/* 학생 장학 - Step 1 */}
          {chatStep === 1 && category === "학생 장학" && !useGeminiAPI && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {chatbotOptions.semesters.map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setChatAnswers({ ...chatAnswers, semester: option });
                      setChatHistory([
                        ...chatHistory,
                        { type: "user", message: option },
                        {
                          type: "bot",
                          message: "어떤 내용에 대해 문의하시나요?",
                        },
                      ]);
                      setChatStep(2);
                    }}
                    className="py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-all"
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          )}

          {/* 학생 복지 - Step 1 */}
          {chatStep === 1 && category === "학생 복지" && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {chatbotOptions.welfareInquiryTypes.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({ ...chatAnswers, welfareInquiry: option });
                    const answer = getWelfareAnswer(
                      chatAnswers.welfareType || "",
                      option
                    );
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: option },
                      { type: "bot", message: answer },
                    ]);
                    setChatStep(99);
                  }}
                  className="py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* 수업 및 학사 - Step 1 */}
          {chatStep === 1 && category === "수업 및 학사" && !useGeminiAPI && (
            <div className="pt-2">
              {chatAnswers.academicType === "성적 문의" ? (
                <>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && userInput.trim()) {
                        setChatAnswers({
                          ...chatAnswers,
                          courseName: userInput,
                        });
                        const answer = getAcademicAnswer(
                          chatAnswers.academicType || "",
                          userInput
                        );
                        setChatHistory([
                          ...chatHistory,
                          { type: "user", message: userInput },
                          { type: "bot", message: answer },
                        ]);
                        setUserInput("");
                        setChatStep(99);
                      }
                    }}
                    placeholder="과목명을 입력하세요 (예: 데이터구조론)"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400"
                  />
                  <button
                    onClick={() => {
                      if (userInput.trim()) {
                        setChatAnswers({
                          ...chatAnswers,
                          courseName: userInput,
                        });
                        const answer = getAcademicAnswer(
                          chatAnswers.academicType || "",
                          userInput
                        );
                        setChatHistory([
                          ...chatHistory,
                          { type: "user", message: userInput },
                          { type: "bot", message: answer },
                        ]);
                        setUserInput("");
                        setChatStep(99);
                      }
                    }}
                    className="mt-2 w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
                  >
                    확인
                  </button>
                </>
              ) : (
                <>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="자세한 내용을 입력해주세요"
                    rows={4}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 resize-none"
                  />
                  <button
                    onClick={() => {
                      if (userInput.trim()) {
                        setChatAnswers({ ...chatAnswers, detail: userInput });
                        const answer = getAcademicAnswer(
                          chatAnswers.academicType || "",
                          userInput
                        );
                        setChatHistory([
                          ...chatHistory,
                          { type: "user", message: userInput },
                          { type: "bot", message: answer },
                        ]);
                        setUserInput("");
                        setChatStep(99);
                      }
                    }}
                    className="mt-2 w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
                  >
                    확인
                  </button>
                </>
              )}
            </div>
          )}

          {/* 시설 및 환경 - Step 2 */}
          {chatStep === 2 && category === "시설 및 환경" && (
            <div className="pt-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && userInput.trim()) {
                    setChatAnswers({ ...chatAnswers, floor: userInput });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: userInput },
                      { type: "bot", message: "어떤 문제인가요?" },
                    ]);
                    setUserInput("");
                    setChatStep(3);
                  }
                }}
                placeholder="층수를 입력하세요 (예: 3층)"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400"
              />
              <button
                onClick={() => {
                  if (userInput.trim()) {
                    setChatAnswers({ ...chatAnswers, floor: userInput });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: userInput },
                      { type: "bot", message: "어떤 문제인가요?" },
                    ]);
                    setUserInput("");
                    setChatStep(3);
                  }
                }}
                className="mt-2 w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
              >
                다음
              </button>
            </div>
          )}

          {/* 학생 장학 - Step 2 */}
          {chatStep === 2 && category === "학생 장학" && !useGeminiAPI && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {chatbotOptions.scholarshipInquiryTypes.map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setChatAnswers({ ...chatAnswers, inquiryType: option });
                      const answer = getScholarshipAnswer(
                        chatAnswers.scholarshipType || "",
                        chatAnswers.semester || "",
                        option
                      );
                      setChatHistory([
                        ...chatHistory,
                        { type: "user", message: option },
                        { type: "bot", message: answer },
                      ]);
                      setChatStep(99);
                    }}
                    className="py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-all"
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          )}

          {/* 시설 및 환경 - Step 3 */}
          {chatStep === 3 && category === "시설 및 환경" && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {chatbotOptions.problemTypes.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({ ...chatAnswers, problemType: option });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: option },
                      { type: "bot", message: "상세 내용을 말씀해주세요" },
                    ]);
                    setChatStep(4);
                  }}
                  className="py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* 시설 및 환경 - Step 4 */}
          {chatStep === 4 && category === "시설 및 환경" && (
            <div className="pt-2">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="문제 상황을 자세히 설명해주세요"
                rows={4}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 resize-none"
              />
              <button
                onClick={() => {
                  if (userInput.trim()) {
                    const finalAnswers = { ...chatAnswers, detail: userInput };
                    setChatAnswers(finalAnswers);
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: userInput },
                      {
                        type: "bot",
                        message: "입력하신 내용을 확인해주세요",
                      },
                      {
                        type: "bot",
                        message: `시설: ${finalAnswers.facilityType}\n위치: ${finalAnswers.building} ${finalAnswers.floor}\n문제: ${finalAnswers.problemType}\n상세: ${finalAnswers.detail}`,
                      },
                    ]);
                    setUserInput("");
                    setChatStep(5);
                  }
                }}
                className="mt-2 w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
              >
                확인
              </button>
            </div>
          )}

          {/* 시설 및 환경 - Step 5 (제출 확인) */}
          {chatStep === 5 && category === "시설 및 환경" && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setChatStep(0);
                  setChatHistory(getInitialMessages(category));
                  setChatAnswers({});
                  setUserInput("");
                }}
                className="py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
              >
                다시 작성
              </button>
              <button
                onClick={() => {
                  onSuccess?.(
                    "민원이 접수되었습니다!\n처리 결과는 알림으로 안내드리겠습니다.",
                    "submit"
                  );
                  setChatStep(0);
                  setChatHistory([]);
                  setChatAnswers({});
                  setUserInput("");
                  onClose();
                }}
                className="py-3 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
              >
                제출하기
              </button>
            </div>
          )}

          {/* 다른 카테고리 완료 단계 (Step 99) */}
          {chatStep === 99 && category !== "시설 및 환경" && (
            <div className="pt-2">
              <button
                onClick={() => {
                  onSuccess?.("문의가 완료되었습니다!", "complete");
                  setChatStep(0);
                  setChatHistory([]);
                  setChatAnswers({});
                  setUserInput("");
                  onClose();
                }}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
              >
                확인
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
