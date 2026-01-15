import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Send, Loader2 } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

// Props Interface
interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  onSuccess?: (message: string, type?: 'complete' | 'submit') => void;
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

// 채팅 히스토리 타입
interface ChatMessage {
  type: 'bot' | 'user';
  message: string;
}

// Gemini API를 사용할 카테고리
const GEMINI_CATEGORIES = ["학사 및 수업", "진로 및 취업"];

// ========== 기존 플로우용 정적 응답 함수들 ==========
const getScholarshipAnswer = (scholarshipType: string, semester: string, inquiryType: string): string => {
  const answers: Record<string, string> = {
    '신청 기간': `${scholarshipType}의 ${semester} 신청 기간은 학기 시작 2주 전부터 1주간입니다. 학생포털에서 신청하실 수 있으며, 자세한 일정은 학생처 공지사항을 확인해주세요.`,
    '선발 기준': `${scholarshipType} 선발 기준은 다음과 같습니다:\n• 직전학기 평점 3.0 이상\n• 이수학점 12학점 이상\n• 가정 경제 수준 (국가장학금의 경우)\n자세한 기준은 학생처(02-1234-5678)로 문의하시기 바랍니다.`,
    '지급 일정': `${semester} ${scholarshipType} 지급 일정은 학기 개시 후 1개월 이내입니다. 정확한 지급일은 학생포털 마이페이지에서 확인하실 수 있습니다.`,
    '기타 문의': `${scholarshipType}에 대한 추가 문의는 학생처 장학담당(scholarship@university.ac.kr / 02-1234-5678)으로 연락 주시기 바랍니다. 상담 시간은 평일 09:00~18:00입니다.`
  };
  return answers[inquiryType] || '문의하신 내용에 대한 답변을 준비 중입니다. 학생처로 직접 문의해주세요.';
};

const getWelfareAnswer = (welfareType: string, welfareInquiry: string): string => {
  const answers: Record<string, Record<string, string>> = {
    '기숙사': {
      '이용 시간': '기숙사 출입은 24시간 가능하며, 외박 시에는 사전 신청이 필요합니다. 문의: 생활관리팀(02-1234-5679)',
      '신청 방법': '기숙사 신청은 매 학기 학생포털 > 생활 > 기숙사 신청 메뉴에서 가능합니다. 신청 기간은 방학 중 2주간입니다.',
      '시설 문의': '기숙사 시설 문의 및 고장 신고는 생활관리팀(02-1234-5679)으로 연락 주시기 바랍니다.',
      '기타': '기타 기숙사 관련 문의는 생활관리팀(dorm@university.ac.kr)으로 연락해주세요.'
    },
    '학생식당': {
      '이용 시간': '학생식당 운영 시간:\n• 조식: 08:00~09:30\n• 중식: 11:30~13:30\n• 석식: 17:30~19:00',
      '신청 방법': '학생식당은 별도 신청 없이 이용 가능합니다. 식권은 현장에서 구매하거나 학생증으로 결제하실 수 있습니다.',
      '시설 문의': '식당 시설 및 메뉴 문의는 복지팀(02-1234-5680)으로 연락해주세요.',
      '기타': '기타 학생식당 관련 문의는 복지팀(welfare@university.ac.kr)으로 연락해주세요.'
    },
    '보건센터': {
      '이용 시간': '보건센터 운영 시간:\n• 평일: 09:00~18:00\n• 점심시간: 12:00~13:00\n• 응급상황 시 24시간 연락 가능',
      '신청 방법': '보건센터 이용은 방문 접수 또는 전화 예약(02-1234-5681) 가능합니다.',
      '시설 문의': '보건센터 시설 및 진료 문의: 02-1234-5681',
      '기타': '기타 건강 관련 문의는 보건센터(health@university.ac.kr)로 연락해주세요.'
    },
    '상담센터': {
      '이용 시간': '학생상담센터 운영 시간:\n• 평일: 09:00~18:00\n• 상담 예약제 운영\n• 비대면 상담 가능',
      '신청 방법': '상담 신청은 학생포털 또는 전화(02-1234-5682)로 예약하실 수 있습니다. 모든 상담 내용은 비밀이 보장됩니다.',
      '시설 문의': '상담센터 위치 및 프로그램 문의: 02-1234-5682',
      '기타': '기타 상담 관련 문의는 학생상담센터(counsel@university.ac.kr)로 연락해주세요.'
    }
  };
  return answers[welfareType]?.[welfareInquiry] || '문의하신 내용에 대한 답변을 준비 중입니다. 학생복지팀으로 직접 문의해주세요.';
};

const getAcademicAnswer = (academicType: string, detail: string): string => {
  const answers: Record<string, string> = {
    '성적 문의': `${detail} 과목의 성적 문의는 다음과 같이 진행됩니다:\n1. 성적 공개 후 1주일 이내 정정 신청 가능\n2. 학생포털 > 학사 > 성적정정신청\n3. 담당 교수 확인 후 처리\n문의: 교학팀(02-1234-5683)`,
    '수강신청': `수강신청 관련 안내:\n• 수강신청 기간: 학기 시작 2주 전\n• 정정 기간: 개강 후 1주\n• 포기 기간: 중간고사 이후 1주\n자세한 일정은 학생포털 학사일정을 확인해주세요.\n문의: 교학팀(02-1234-5683)`,
    '휴/복학': `휴학 및 복학 신청 안내:\n• 휴학: 학기 시작 전 또는 개강 후 2주 이내\n• 복학: 복학 학기 시작 1개월 전\n• 신청: 학생포털 > 학적 > 휴학/복학 신청\n문의: 교학팀(02-1234-5683)`,
    '졸업요건': `졸업요건 확인:\n• 총 이수학점: 130학점 이상\n• 전공학점: 60학점 이상\n• 교양학점: 30학점 이상\n• STAR 역량 기준 충족\n자세한 졸업요건은 학생포털 > 학사 > 졸업요건조회에서 확인하실 수 있습니다.\n문의: 교학팀(academic@university.ac.kr)`
  };
  return answers[academicType] || '문의하신 내용에 대한 답변을 준비 중입니다. 교학팀으로 직접 문의해주세요.';
};

// 카테고리별 초기 메시지 생성
const getInitialMessages = (category: string): ChatMessage[] => {
  if (GEMINI_CATEGORIES.includes(category)) {
    return [
      { type: 'bot', message: `안녕하세요! '${category}' 관련 궁금한 점을 물어보세요. 😊` }
    ];
  }

  const messages: Record<string, ChatMessage[]> = {
    '시설 및 환경': [
      { type: 'bot', message: '안녕하세요! 시설 및 환경 관련 문의를 도와드리겠습니다. 😊' },
      { type: 'bot', message: '어떤 시설에 문제가 있나요?' }
    ],
    '학생 장학': [
      { type: 'bot', message: '안녕하세요! 장학금 관련 문의를 도와드리겠습니다. 😊' },
      { type: 'bot', message: '어떤 장학금에 대해 문의하시나요?' }
    ],
    '학생 복지': [
      { type: 'bot', message: '안녕하세요! 학생 복지 관련 문의를 도와드리겠습니다. 😊' },
      { type: 'bot', message: '어떤 시설에 대해 문의하시나요?' }
    ],
    '수업 및 학사': [
      { type: 'bot', message: '안녕하세요! 수업 및 학사 관련 문의를 도와드리겠습니다. 😊' },
      { type: 'bot', message: '어떤 내용에 대해 문의하시나요?' }
    ]
  };
  return messages[category] || [
    { type: 'bot', message: '안녕하세요! 문의를 도와드리겠습니다. 😊' }
  ];
};

export default function ChatModal({ isOpen, onClose, category, onSuccess }: ChatModalProps) {
  // 공통 state
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
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
      setUserInput('');
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
    setUserInput('');
    setIsLoading(true);

    const newHistory = [...chatHistory, { type: 'user' as const, message: currentMessage }];
    setChatHistory(newHistory);

    try {
      // Gemini API History 규칙: 첫 번째 메시지는 반드시 'user' role이어야 함
      // 현재 입력한 메시지는 제외 (API가 별도 처리)
      const pastHistory = newHistory.slice(0, -1);

      // 첫 메시지가 봇의 인사말이면 제거 (API 규칙 위반 방지)
      const validHistory = pastHistory.length > 0 && pastHistory[0].type === 'bot'
        ? pastHistory.slice(1)
        : pastHistory;

      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: {
          message: currentMessage,
          category: category,
          history: validHistory.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'model',
            parts: [{ text: msg.message }]
          }))
        },
      });

      if (error) throw error;

      setChatHistory(prev => [...prev, { type: 'bot', message: data.reply }]);

      if (onSuccess) {
        onSuccess(data.reply);
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setChatHistory(prev => [...prev, {
        type: 'bot',
        message: '죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 모달 닫기 핸들러
  const handleClose = () => {
    if (!useGeminiAPI && category !== '시설 및 환경' && chatAnswers && Object.keys(chatAnswers).length > 0) {
      onSuccess?.('문의가 완료되었습니다!', 'complete');
    }
    setChatStep(0);
    setChatHistory([]);
    setChatAnswers({});
    setUserInput('');
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
              <h3 className="font-bold text-lg">{category} AI 상담</h3>
            </div>
            <button onClick={handleClose} className="hover:bg-white/20 rounded-full p-1 transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 채팅 영역 */}
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.type === 'bot'
                    ? 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                    : 'bg-orange-500 text-white rounded-tr-none'
                }`}>
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
                onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && handleSendMessageAPI()}
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
        <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] ${
                msg.type === 'bot'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-[#FEE500] text-gray-900'
              } rounded-2xl px-4 py-3`}>
                <p className="text-sm whitespace-pre-line">{msg.message}</p>
              </div>
            </div>
          ))}

          {/* 시설 및 환경 - Step 0 */}
          {chatStep === 0 && category === '시설 및 환경' && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {['강의실', '화장실', '엘리베이터', '기타 시설'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({...chatAnswers, facilityType: option});
                    setChatHistory([...chatHistory,
                      { type: 'user', message: option },
                      { type: 'bot', message: '어느 건물인가요?' }
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

          {/* 학생 장학 - Step 0 */}
          {chatStep === 0 && category === '학생 장학' && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {['성적장학금', '근로장학금', '국가장학금', '기타 장학금'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({...chatAnswers, scholarshipType: option});
                    setChatHistory([...chatHistory,
                      { type: 'user', message: option },
                      { type: 'bot', message: '어느 학기에 대해 문의하시나요?' }
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

          {/* 학생 복지 - Step 0 */}
          {chatStep === 0 && category === '학생 복지' && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {['기숙사', '학생식당', '보건센터', '상담센터'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({...chatAnswers, welfareType: option});
                    setChatHistory([...chatHistory,
                      { type: 'user', message: option },
                      { type: 'bot', message: '어떤 내용에 대해 문의하시나요?' }
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

          {/* 수업 및 학사 - Step 0 */}
          {chatStep === 0 && category === '수업 및 학사' && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {['성적 문의', '수강신청', '휴/복학', '졸업요건'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({...chatAnswers, academicType: option});
                    setChatHistory([...chatHistory,
                      { type: 'user', message: option },
                      { type: 'bot', message: option === '성적 문의' ? '과목명을 입력해주세요' : '자세한 내용을 말씀해주세요' }
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

          {/* 시설 및 환경 - Step 1 */}
          {chatStep === 1 && category === '시설 및 환경' && (
            <div className="pt-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && userInput.trim()) {
                    setChatAnswers({...chatAnswers, building: userInput});
                    setChatHistory([...chatHistory,
                      { type: 'user', message: userInput },
                      { type: 'bot', message: '몇 층인가요?' }
                    ]);
                    setUserInput('');
                    setChatStep(2);
                  }
                }}
                placeholder="건물명을 입력하세요 (예: A동, 공학관)"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400"
              />
              <button
                onClick={() => {
                  if (userInput.trim()) {
                    setChatAnswers({...chatAnswers, building: userInput});
                    setChatHistory([...chatHistory,
                      { type: 'user', message: userInput },
                      { type: 'bot', message: '몇 층인가요?' }
                    ]);
                    setUserInput('');
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
          {chatStep === 1 && category === '학생 장학' && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {['2025-1학기', '2024-2학기', '2024-1학기', '기타'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({...chatAnswers, semester: option});
                    setChatHistory([...chatHistory,
                      { type: 'user', message: option },
                      { type: 'bot', message: '어떤 내용에 대해 문의하시나요?' }
                    ]);
                    setChatStep(2);
                  }}
                  className="py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* 학생 복지 - Step 1 */}
          {chatStep === 1 && category === '학생 복지' && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {['이용 시간', '신청 방법', '시설 문의', '기타'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({...chatAnswers, welfareInquiry: option});
                    const answer = getWelfareAnswer(chatAnswers.welfareType || '', option);
                    setChatHistory([...chatHistory,
                      { type: 'user', message: option },
                      { type: 'bot', message: answer }
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
          {chatStep === 1 && category === '수업 및 학사' && (
            <div className="pt-2">
              {chatAnswers.academicType === '성적 문의' ? (
                <>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && userInput.trim()) {
                        setChatAnswers({...chatAnswers, courseName: userInput});
                        const answer = getAcademicAnswer(chatAnswers.academicType || '', userInput);
                        setChatHistory([...chatHistory,
                          { type: 'user', message: userInput },
                          { type: 'bot', message: answer }
                        ]);
                        setUserInput('');
                        setChatStep(99);
                      }
                    }}
                    placeholder="과목명을 입력하세요 (예: 데이터구조론)"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400"
                  />
                  <button
                    onClick={() => {
                      if (userInput.trim()) {
                        setChatAnswers({...chatAnswers, courseName: userInput});
                        const answer = getAcademicAnswer(chatAnswers.academicType || '', userInput);
                        setChatHistory([...chatHistory,
                          { type: 'user', message: userInput },
                          { type: 'bot', message: answer }
                        ]);
                        setUserInput('');
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
                        setChatAnswers({...chatAnswers, detail: userInput});
                        const answer = getAcademicAnswer(chatAnswers.academicType || '', userInput);
                        setChatHistory([...chatHistory,
                          { type: 'user', message: userInput },
                          { type: 'bot', message: answer }
                        ]);
                        setUserInput('');
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
          {chatStep === 2 && category === '시설 및 환경' && (
            <div className="pt-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && userInput.trim()) {
                    setChatAnswers({...chatAnswers, floor: userInput});
                    setChatHistory([...chatHistory,
                      { type: 'user', message: userInput },
                      { type: 'bot', message: '어떤 문제인가요?' }
                    ]);
                    setUserInput('');
                    setChatStep(3);
                  }
                }}
                placeholder="층수를 입력하세요 (예: 3층)"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400"
              />
              <button
                onClick={() => {
                  if (userInput.trim()) {
                    setChatAnswers({...chatAnswers, floor: userInput});
                    setChatHistory([...chatHistory,
                      { type: 'user', message: userInput },
                      { type: 'bot', message: '어떤 문제인가요?' }
                    ]);
                    setUserInput('');
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
          {chatStep === 2 && category === '학생 장학' && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {['신청 기간', '선발 기준', '지급 일정', '기타 문의'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({...chatAnswers, inquiryType: option});
                    const answer = getScholarshipAnswer(
                      chatAnswers.scholarshipType || '',
                      chatAnswers.semester || '',
                      option
                    );
                    setChatHistory([...chatHistory,
                      { type: 'user', message: option },
                      { type: 'bot', message: answer }
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

          {/* 시설 및 환경 - Step 3 */}
          {chatStep === 3 && category === '시설 및 환경' && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {['고장/파손', '청결 문제', '안전 문제', '기타'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({...chatAnswers, problemType: option});
                    setChatHistory([...chatHistory,
                      { type: 'user', message: option },
                      { type: 'bot', message: '상세 내용을 말씀해주세요' }
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
          {chatStep === 4 && category === '시설 및 환경' && (
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
                    const finalAnswers = {...chatAnswers, detail: userInput};
                    setChatAnswers(finalAnswers);
                    setChatHistory([...chatHistory,
                      { type: 'user', message: userInput },
                      { type: 'bot', message: '입력하신 내용을 확인해주세요 ✅' },
                      { type: 'bot', message: `시설: ${finalAnswers.facilityType}\n위치: ${finalAnswers.building} ${finalAnswers.floor}\n문제: ${finalAnswers.problemType}\n상세: ${finalAnswers.detail}` }
                    ]);
                    setUserInput('');
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
          {chatStep === 5 && category === '시설 및 환경' && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setChatStep(0);
                  setChatHistory(getInitialMessages(category));
                  setChatAnswers({});
                  setUserInput('');
                }}
                className="py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
              >
                다시 작성
              </button>
              <button
                onClick={() => {
                  onSuccess?.('민원이 접수되었습니다!\n처리 결과는 알림으로 안내드리겠습니다.', 'submit');
                  setChatStep(0);
                  setChatHistory([]);
                  setChatAnswers({});
                  setUserInput('');
                  onClose();
                }}
                className="py-3 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
              >
                제출하기
              </button>
            </div>
          )}

          {/* 다른 카테고리 완료 단계 (Step 99) */}
          {chatStep === 99 && category !== '시설 및 환경' && (
            <div className="pt-2">
              <button
                onClick={() => {
                  onSuccess?.('문의가 완료되었습니다!', 'complete');
                  setChatStep(0);
                  setChatHistory([]);
                  setChatAnswers({});
                  setUserInput('');
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
