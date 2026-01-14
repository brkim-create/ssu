import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Send, Loader2 } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  onSuccess?: (message: string) => void;
}

interface ChatMessage {
  type: 'bot' | 'user';
  message: string;
}

export default function ChatModal({ isOpen, onClose, category, onSuccess }: ChatModalProps) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // 모달 열릴 때 초기 메시지 설정
  useEffect(() => {
    if (isOpen) {
      setChatHistory([
        { type: 'bot', message: `안녕하세요! '${category}' 관련 궁금한 점을 물어보세요. 😊` }
      ]);
    }
  }, [isOpen, category]);

  // 스크롤 자동 이동
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  // 메시지 전송 핸들러 (API 호출 로직 구현)
  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const currentMessage = userInput;
    setUserInput('');
    setIsLoading(true);

    // 1. 사용자 메시지 화면에 표시
    const newHistory = [...chatHistory, { type: 'user' as const, message: currentMessage }];
    setChatHistory(newHistory);

    try {
      // 2. Supabase Edge Function 호출 (gemini-chat)
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: {
          message: currentMessage,
          category: category,
          history: newHistory.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'model',
            parts: [{ text: msg.message }]
          })).slice(0, -1) // 문맥 유지를 위해 이전 대화 내역 전달
        },
      });

      if (error) throw error;

      // 3. AI 응답 화면에 표시
      const botReply = data.reply;
      setChatHistory(prev => [...prev, { type: 'bot', message: botReply }]);

      // onSuccess 콜백이 있다면 실행
      if (onSuccess) {
        onSuccess(botReply);
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
    setChatHistory([]);
    setUserInput('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center p-4">
      <div className="bg-white w-full max-w-md h-[80vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">

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

        {/* 채팅 내용 영역 */}
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
              onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && handleSendMessage()}
              placeholder="질문을 입력하세요..."
              className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
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
