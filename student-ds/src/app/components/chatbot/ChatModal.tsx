import React, { useState, useRef, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";

// Props Interface
interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  onSuccess: (message: string, type: "complete" | "submit") => void;
}

// ì±„íŒ… ?‹µë³? ????…
interface ChatAnswers {
  facilityType?: string;
  building?: string;
  floor?: string;
  problemType?: string;
  detail?: string;
  // ?•™?ƒ ?¥?•™
  scholarshipType?: string;
  semester?: string;
  inquiryType?: string;
  // ?•™?ƒ ë³µì??
  welfareType?: string;
  welfareInquiry?: string;
  // ?ˆ˜?—… ë°? ?•™?‚¬
  academicType?: string;
  courseName?: string;
}

// ì±„íŒ… ?ˆ?Š¤?† ë¦? ????…
interface ChatMessage {
  type: "bot" | "user";
  message: string;
}

// ??™ ?‘?‹µ ?•¨?ˆ˜?“¤
const getScholarshipAnswer = (
  scholarshipType: string,
  semester: string,
  inquiryType: string
): string => {
  const answers: Record<string, string> = {
    "?‹ ì²? ê¸°ê°„": `${scholarshipType}?˜ ${semester} ?‹ ì²? ê¸°ê°„??? ?•™ê¸? ?‹œ?‘ 2ì£? ? „ë¶??„° 1ì£¼ê°„?…?‹ˆ?‹¤. ?•™?ƒ?¬?„¸?—?„œ ?‹ ì²??•˜?‹¤ ?ˆ˜ ?ˆ?œ¼ë©?, ??„¸?•œ ?¼? •??? ?•™?ƒì²? ê³µì???‚¬?•­?„ ?™•?¸?•´ì£¼ì„¸?š”.`,
    "?„ ë°? ê¸°ì??": `${scholarshipType} ?„ ë°? ê¸°ì????? ?‹¤?Œê³? ê°™ìŠµ?‹ˆ?‹¤:\n??? ì§ì „?•™ê¸? ?‰?  3.0 ?´?ƒ\n??? ?´?ˆ˜?•™?  12?•™?  ?´?ƒ\n??? ê°?? • ê²½ì œ ?ˆ˜ì¤? (êµ?ê°??¥?•™ê¸ˆì˜ ê²½ìš°)\n??„¸?•œ ê¸°ì????? ?•™?ƒì²?(02-1234-5678)ë¡? ë¬¸ì˜?•˜?‹œê¸? ë°”ë?‹ˆ?‹¤.`,
    "ì§?ê¸? ?¼? •": `${semester} ${scholarshipType} ì§?ê¸? ?¼? •??? ?•™ê¸? ê°œì‹œ ?›„ 1ê°œì›” ?´?‚´?…?‹ˆ?‹¤. ? •?™•?•œ ì§?ê¸‰ì¼??? ?•™?ƒ?¬?„¸ ë§ˆì´?˜?´ì§??—?„œ ?™•?¸?•˜?‹¤ ?ˆ˜ ?ˆ?Šµ?‹ˆ?‹¤.`,
    "ê¸°í?? ë¬¸ì˜": `${scholarshipType}?— ????•œ ì¶”ê?? ë¬¸ì˜?Š” ?•™?ƒì²? ?¥?•™?‹´?‹¹(scholarship@university.ac.kr / 02-1234-5678)?œ¼ë¡? ?—°?½ ì£¼ì‹œê¸? ë°”ë?‹ˆ?‹¤. ?ƒ?‹´ ?‹œê°„ì?? ?‰?¼ 09:00~18:00?…?‹ˆ?‹¤.`,
  };
  return (
    answers[inquiryType] ||
    "ë¬¸ì˜?•˜?‹  ?‚´?š©?— ????•œ ?‹µë³??„ ì¤?ë¹? ì¤‘ì…?‹ˆ?‹¤. ?•™?ƒì²˜ë¡œ ì§ì ‘ ë¬¸ì˜?•´ì£¼ì„¸?š”."
  );
};

const getWelfareAnswer = (
  welfareType: string,
  welfareInquiry: string
): string => {
  const answers: Record<string, Record<string, string>> = {
    "ê¸°ìˆ™?‚¬": {
      "?´?š© ?‹œê°?":
        "ê¸°ìˆ™?‚¬ ì¶œì…??? 24?‹œê°? ê°??Š¥?•˜ë©?, ?™¸ë°? ?‹œ?—?Š” ?‚¬? „ ?‹ ì²??´ ?•„?š”?•©?‹ˆ?‹¤. ë¬¸ì˜: ?ƒ?™œê´?ë¦¬í??(02-1234-5679)",
      "?‹ ì²? ë°©ë²•":
        "ê¸°ìˆ™?‚¬ ?‹ ì²???? ë§? ?•™ê¸? ?•™?ƒ?¬?„¸ > ?ƒ?™œ > ê¸°ìˆ™?‚¬ ?‹ ì²? ë©”ë‰´?—?„œ ê°??Š¥?•©?‹ˆ?‹¤. ?‹ ì²? ê¸°ê°„??? ë°©í•™ ì¤? 2ì£¼ê°„?…?‹ˆ?‹¤.",
      "?‹œ?„¤ ë¬¸ì˜":
        "ê¸°ìˆ™?‚¬ ?‹œ?„¤ ë¬¸ì˜ ë°? ê³ ì¥ ?‹ ê³ ëŠ” ?ƒ?™œê´?ë¦¬í??(02-1234-5679)?œ¼ë¡? ?—°?½ ì£¼ì‹œê¸? ë°”ë?‹ˆ?‹¤.",
      "ê¸°í??":
        "ê¸°í?? ê¸°ìˆ™?‚¬ ê´?? ¨ ë¬¸ì˜?Š” ?ƒ?™œê´?ë¦¬í??(dorm@university.ac.kr)?œ¼ë¡? ?—°?½?•´ì£¼ì„¸?š”.",
    },
    "?•™?ƒ?‹?‹¹": {
      "?´?š© ?‹œê°?":
        "?•™?ƒ?‹?‹¹ ?š´?˜ ?‹œê°?:\n??? ì¡°ì‹: 08:00~09:30\n??? ì¤‘ì‹: 11:30~13:30\n??? ?„?‹: 17:30~19:00",
      "?‹ ì²? ë°©ë²•":
        "?•™?ƒ?‹?‹¹??? ë³„ë„ ?‹ ì²? ?—†?´ ?´?š© ê°??Š¥?•©?‹ˆ?‹¤. ?‹ê¶Œì?? ?˜„?¥?—?„œ êµ¬ë§¤?•˜ê±°ë‚˜ ?•™?ƒì¦ìœ¼ë¡? ê²°ì œ?•˜?‹¤ ?ˆ˜ ?ˆ?Šµ?‹ˆ?‹¤.",
      "?‹œ?„¤ ë¬¸ì˜":
        "?‹?‹¹ ?‹œ?„¤ ë°? ë©”ë‰´ ë¬¸ì˜?Š” ë³µì?????(02-1234-5680)?œ¼ë¡? ?—°?½?•´ì£¼ì„¸?š”.",
      "ê¸°í??":
        "ê¸°í?? ?•™?ƒ?‹?‹¹ ê´?? ¨ ë¬¸ì˜?Š” ë³µì?????(welfare@university.ac.kr)?œ¼ë¡? ?—°?½?•´ì£¼ì„¸?š”.",
    },
    "ë³´ê±´?„¼?„°": {
      "?´?š© ?‹œê°?":
        "ë³´ê±´?„¼?„° ?š´?˜ ?‹œê°?:\n??? ?‰?¼: 09:00~18:00\n??? ? ?‹¬?‹œê°?: 12:00~13:00\n??? ?‘ê¸‰ìƒ?™© ?‹œ 24?‹œê°? ?—°?½ ê°??Š¥",
      "?‹ ì²? ë°©ë²•":
        "ë³´ê±´?„¼?„° ?´?š©??? ë°©ë¬¸ ? ‘?ˆ˜ ?˜?Š” ? „?™” ?˜ˆ?•½(02-1234-5681) ê°??Š¥?•©?‹ˆ?‹¤.",
      "?‹œ?„¤ ë¬¸ì˜": "ë³´ê±´?„¼?„° ?‹œ?„¤ ë°? ì§„ë£Œ ë¬¸ì˜: 02-1234-5681",
      "ê¸°í??":
        "ê¸°í?? ê±´ê°• ê´?? ¨ ë¬¸ì˜?Š” ë³´ê±´?„¼?„°(health@university.ac.kr)ë¡? ?—°?½?•´ì£¼ì„¸?š”.",
    },
    "?ƒ?‹´?„¼?„°": {
      "?´?š© ?‹œê°?":
        "?•™?ƒ?ƒ?‹´?„¼?„° ?š´?˜ ?‹œê°?:\n??? ?‰?¼: 09:00~18:00\n??? ?ƒ?‹´ ?˜ˆ?•½? œ ?š´?˜\n??? ë¹„ë??ë©? ?ƒ?‹´ ê°??Š¥",
      "?‹ ì²? ë°©ë²•":
        "?ƒ?‹´ ?‹ ì²???? ?•™?ƒ?¬?„¸ ?˜?Š” ? „?™”(02-1234-5682)ë¡? ?˜ˆ?•½?•˜?‹¤ ?ˆ˜ ?ˆ?Šµ?‹ˆ?‹¤. ëª¨ë“  ?ƒ?‹´ ?‚´?š©??? ë¹„ë???´ ë³´ì¥?©?‹ˆ?‹¤.",
      "?‹œ?„¤ ë¬¸ì˜":
        "?ƒ?‹´?„¼?„° ?œ„ì¹? ë°? ?”„ë¡œê·¸?¨ ë¬¸ì˜: 02-1234-5682",
      "ê¸°í??":
        "ê¸°í?? ?ƒ?‹´ ê´?? ¨ ë¬¸ì˜?Š” ?•™?ƒ?ƒ?‹´?„¼?„°(counsel@university.ac.kr)ë¡? ?—°?½?•´ì£¼ì„¸?š”.",
    },
  };
  return (
    answers[welfareType]?.[welfareInquiry] ||
    "ë¬¸ì˜?•˜?‹  ?‚´?š©?— ????•œ ?‹µë³??„ ì¤?ë¹? ì¤‘ì…?‹ˆ?‹¤. ?•™?ƒë³µì??????œ¼ë¡? ì§ì ‘ ë¬¸ì˜?•´ì£¼ì„¸?š”."
  );
};

const getAcademicAnswer = (academicType: string, detail: string): string => {
  const answers: Record<string, string> = {
    "?„±?  ë¬¸ì˜": `${detail} ê³¼ëª©?˜ ?„±?  ë¬¸ì˜?Š” ?‹¤?Œê³? ê°™ì´ ì§„í–‰?©?‹ˆ?‹¤:\n1. ?„±?  ê³µê°œ ?›„ 1ì£¼ì¼ ?´?‚´ ? •? • ?‹ ì²? ê°??Š¥\n2. ?•™?ƒ?¬?„¸ > ?•™?‚¬ > ?„±? ? •? •?‹ ì²?\n3. ?‹´?‹¹ êµìˆ˜ ?™•?¸ ?›„ ì²˜ë¦¬\në¬¸ì˜: êµí•™???(02-1234-5683)`,
    "?ˆ˜ê°•ì‹ ì²?": `?ˆ˜ê°•ì‹ ì²? ê´?? ¨ ?•ˆ?‚´:\n??? ?ˆ˜ê°•ì‹ ì²? ê¸°ê°„: ?•™ê¸? ?‹œ?‘ 2ì£? ? „\n??? ? •? • ê¸°ê°„: ê°œê°• ?›„ 1ì£?\n??? ?¬ê¸? ê¸°ê°„: ì¤‘ê°„ê³ ì‚¬ ?´?›„ 1ì£?\n??„¸?•œ ?¼? •??? ?•™?ƒ?¬?„¸ ?•™?‚¬?¼? •?„ ?™•?¸?•´ì£¼ì„¸?š”.\në¬¸ì˜: êµí•™???(02-1234-5683)`,
    "?œ´/ë³µí•™": `?œ´?•™ ë°? ë³µí•™ ?‹ ì²? ?•ˆ?‚´:\n??? ?œ´?•™: ?•™ê¸? ?‹œ?‘ ? „ ?˜?Š” ê°œê°• ?›„ 2ì£? ?´?‚´\n??? ë³µí•™: ë³µí•™ ?•™ê¸? ?‹œ?‘ 1ê°œì›” ? „\n??? ?‹ ì²?: ?•™?ƒ?¬?„¸ > ?•™?  > ?œ´?•™/ë³µí•™ ?‹ ì²?\në¬¸ì˜: êµí•™???(02-1234-5683)`,
    "ì¡¸ì—…?š”ê±?": `ì¡¸ì—…?š”ê±? ?™•?¸:\n??? ì´? ?´?ˆ˜?•™? : 130?•™?  ?´?ƒ\n??? ? „ê³µí•™? : 60?•™?  ?´?ƒ\n??? êµì–‘?•™? : 30?•™?  ?´?ƒ\n??? STAR ?—­?Ÿ‰ ê¸°ì?? ì¶©ì¡±\n??„¸?•œ ì¡¸ì—…?š”ê±´ì?? ?•™?ƒ?¬?„¸ > ?•™?‚¬ > ì¡¸ì—…?š”ê±´ì¡°?šŒ?—?„œ ?™•?¸?•˜?‹¤ ?ˆ˜ ?ˆ?Šµ?‹ˆ?‹¤.\në¬¸ì˜: êµí•™???(academic@university.ac.kr)`,
  };
  return (
    answers[academicType] ||
    "ë¬¸ì˜?•˜?‹  ?‚´?š©?— ????•œ ?‹µë³??„ ì¤?ë¹? ì¤‘ì…?‹ˆ?‹¤. êµí•™????œ¼ë¡? ì§ì ‘ ë¬¸ì˜?•´ì£¼ì„¸?š”."
  );
};

// ì¹´í…Œê³ ë¦¬ë³? ì´ˆê¸° ë©”ì‹œì§? ?ƒ?„±
const getInitialMessages = (category: string): ChatMessage[] => {
  const messages: Record<string, ChatMessage[]> = {
    "?‹œ?„¤ ë°? ?™˜ê²?": [
      {
        type: "bot",
        message:
          "?•ˆ?…•?•˜?„¸?š”! ?‹œ?„¤ ë°? ?™˜ê²? ê´?? ¨ ë¬¸ì˜ë¥? ?„????“œë¦¬ê² ?Šµ?‹ˆ?‹¤. ?Ÿ˜?",
      },
      { type: "bot", message: "?–´?–¤ ?‹œ?„¤?— ë¬¸ì œê°? ?ˆ?‚˜?š”?" },
    ],
    "?•™?ƒ ?¥?•™": [
      {
        type: "bot",
        message:
          "?•ˆ?…•?•˜?„¸?š”! ?¥?•™ê¸? ê´?? ¨ ë¬¸ì˜ë¥? ?„????“œë¦¬ê² ?Šµ?‹ˆ?‹¤. ?Ÿ˜?",
      },
      {
        type: "bot",
        message: "?–´?–¤ ?¥?•™ê¸ˆì— ????•´ ë¬¸ì˜?•˜?‹œ?‚˜?š”?",
      },
    ],
    "?•™?ƒ ë³µì??": [
      {
        type: "bot",
        message:
          "?•ˆ?…•?•˜?„¸?š”! ?•™?ƒ ë³µì?? ê´?? ¨ ë¬¸ì˜ë¥? ?„????“œë¦¬ê² ?Šµ?‹ˆ?‹¤. ?Ÿ˜?",
      },
      { type: "bot", message: "?–´?–¤ ?‹œ?„¤?— ????•´ ë¬¸ì˜?•˜?‹œ?‚˜?š”?" },
    ],
    "?ˆ˜?—… ë°? ?•™?‚¬": [
      {
        type: "bot",
        message:
          "?•ˆ?…•?•˜?„¸?š”! ?ˆ˜?—… ë°? ?•™?‚¬ ê´?? ¨ ë¬¸ì˜ë¥? ?„????“œë¦¬ê² ?Šµ?‹ˆ?‹¤. ?Ÿ˜?",
      },
      { type: "bot", message: "?–´?–¤ ?‚´?š©?— ????•´ ë¬¸ì˜?•˜?‹œ?‚˜?š”?" },
    ],
  };
  return (
    messages[category] || [
      {
        type: "bot",
        message: "?•ˆ?…•?•˜?„¸?š”! ë¬¸ì˜ë¥? ?„????“œë¦¬ê² ?Šµ?‹ˆ?‹¤. ?Ÿ˜?",
      },
    ]
  );
};

export default function ChatModal({
  isOpen,
  onClose,
  category,
  onSuccess,
}: ChatModalProps) {
  // ì±„íŒ… state
  const [chatStep, setChatStep] = useState(0);
  const [chatAnswers, setChatAnswers] = useState<ChatAnswers>({});
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // ëª¨ë‹¬?´ ?—´ë¦? ?•Œ ì´ˆê¸°?™”
  useEffect(() => {
    if (isOpen && category) {
      setChatStep(0);
      setChatAnswers({});
      setChatHistory(getInitialMessages(category));
      setUserInput("");
    }
  }, [isOpen, category]);

  // ì±„íŒ… ??™ ?Š¤?¬ë¡?
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // ëª¨ë‹¬ ?‹«ê¸? ?•¸?“¤?Ÿ¬
  const handleClose = () => {
    // ?‹œ?„¤ ë°? ?™˜ê²? ?™¸?—?Š” ?™„ë£? ?ƒ?ƒœë¡? ????¥
    if (
      category !== "?‹œ?„¤ ë°? ?™˜ê²?" &&
      chatAnswers &&
      Object.keys(chatAnswers).length > 0
    ) {
      onSuccess("ë¬¸ì˜ê°? ?™„ë£Œë˜?—ˆ?Šµ?‹ˆ?‹¤!", "complete");
    }
    // ?ƒ?ƒœ ì´ˆê¸°?™”
    setChatStep(0);
    setChatHistory([]);
    setChatAnswers({});
    setUserInput("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md h-[90vh] flex flex-col rounded-t-3xl animate-slide-up">
        {/* ?—¤?” */}
        <div className="shrink-0 p-4 border-b border-gray-200 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">{category} ë¬¸ì˜</h3>
                <p className="text-xs opacity-90">ì±—ë´‡ ?ƒ?‹´</p>
              </div>
            </div>
            <button onClick={handleClose}>
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ì±„íŒ… ?˜?—­ */}
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

          {/* ?‹œ?„¤ ë°? ?™˜ê²? - Step 0 */}
          {chatStep === 0 && category === "?‹œ?„¤ ë°? ?™˜ê²?" && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                "ê°•ì˜?‹¤",
                "?™”?¥?‹¤",
                "?—˜ë¦¬ë² ?´?„°",
                "ê¸°í?? ?‹œ?„¤",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({ ...chatAnswers, facilityType: option });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: option },
                      { type: "bot", message: "?–´?Š ê±´ë¬¼?¸ê°??š”?" },
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

          {/* ?•™?ƒ ?¥?•™ - Step 0 */}
          {chatStep === 0 && category === "?•™?ƒ ?¥?•™" && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                "?„±? ?¥?•™ê¸?",
                "ê·¼ë¡œ?¥?•™ê¸?",
                "êµ?ê°??¥?•™ê¸?",
                "ê¸°í?? ?¥?•™ê¸?",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({ ...chatAnswers, scholarshipType: option });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: option },
                      {
                        type: "bot",
                        message: "?–´?Š ?•™ê¸°ì— ????•´ ë¬¸ì˜?•˜?‹œ?‚˜?š”?",
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

          {/* ?•™?ƒ ë³µì?? - Step 0 */}
          {chatStep === 0 && category === "?•™?ƒ ë³µì??" && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                "ê¸°ìˆ™?‚¬",
                "?•™?ƒ?‹?‹¹",
                "ë³´ê±´?„¼?„°",
                "?ƒ?‹´?„¼?„°",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({ ...chatAnswers, welfareType: option });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: option },
                      {
                        type: "bot",
                        message: "?–´?–¤ ?‚´?š©?— ????•´ ë¬¸ì˜?•˜?‹œ?‚˜?š”?",
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

          {/* ?ˆ˜?—… ë°? ?•™?‚¬ - Step 0 */}
          {chatStep === 0 && category === "?ˆ˜?—… ë°? ?•™?‚¬" && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                "?„±?  ë¬¸ì˜",
                "?ˆ˜ê°•ì‹ ì²?",
                "?œ´/ë³µí•™",
                "ì¡¸ì—…?š”ê±?",
              ].map((option) => (
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
                          option === "?„±?  ë¬¸ì˜"
                            ? "ê³¼ëª©ëª…ì„ ?…? ¥?•´ì£¼ì„¸?š”"
                            : "??„¸?•œ ?‚´?š©?„ ë§ì???•´ì£¼ì„¸?š”",
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

          {/* ?‹œ?„¤ ë°? ?™˜ê²? - Step 1 */}
          {chatStep === 1 && category === "?‹œ?„¤ ë°? ?™˜ê²?" && (
            <div className="pt-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && userInput.trim()) {
                    setChatAnswers({ ...chatAnswers, building: userInput });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: userInput },
                      { type: "bot", message: "ëª? ì¸µì¸ê°??š”?" },
                    ]);
                    setUserInput("");
                    setChatStep(2);
                  }
                }}
                placeholder="ê±´ë¬¼ëª…ì„ ?…? ¥?•˜?„¸?š” (?˜ˆ: A?™, ê³µí•™ê´?)"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400"
              />
              <button
                onClick={() => {
                  if (userInput.trim()) {
                    setChatAnswers({ ...chatAnswers, building: userInput });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: userInput },
                      { type: "bot", message: "ëª? ì¸µì¸ê°??š”?" },
                    ]);
                    setUserInput("");
                    setChatStep(2);
                  }
                }}
                className="mt-2 w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
              >
                ?‹¤?Œ
              </button>
            </div>
          )}

          {/* ?•™?ƒ ?¥?•™ - Step 1 */}
          {chatStep === 1 && category === "?•™?ƒ ?¥?•™" && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {["2025-1?•™ê¸?", "2024-2?•™ê¸?", "2024-1?•™ê¸?", "ê¸°í??"].map(
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
                          message:
                            "?–´?–¤ ?‚´?š©?— ????•´ ë¬¸ì˜?•˜?‹œ?‚˜?š”?",
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

          {/* ?•™?ƒ ë³µì?? - Step 1 */}
          {chatStep === 1 && category === "?•™?ƒ ë³µì??" && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {["?´?š© ?‹œê°?", "?‹ ì²? ë°©ë²•", "?‹œ?„¤ ë¬¸ì˜", "ê¸°í??"].map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setChatAnswers({
                        ...chatAnswers,
                        welfareInquiry: option,
                      });
                      const answer = getWelfareAnswer(
                        chatAnswers.welfareType || "",
                        option
                      );
                      setChatHistory([
                        ...chatHistory,
                        { type: "user", message: option },
                        { type: "bot", message: answer },
                      ]);
                      setChatStep(99); // ?™„ë£? ?‹¨ê³?
                    }}
                    className="py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-all"
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          )}

          {/* ?ˆ˜?—… ë°? ?•™?‚¬ - Step 1 */}
          {chatStep === 1 && category === "?ˆ˜?—… ë°? ?•™?‚¬" && (
            <div className="pt-2">
              {chatAnswers.academicType === "?„±?  ë¬¸ì˜" ? (
                <>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => {
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
                    placeholder="ê³¼ëª©ëª…ì„ ?…? ¥?•˜?„¸?š” (?˜ˆ: ?°?´?„°êµ¬ì¡°ë¡?)"
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
                    ?™•?¸
                  </button>
                </>
              ) : (
                <>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="??„¸?•œ ?‚´?š©?„ ?…? ¥?•´ì£¼ì„¸?š”"
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
                    ?™•?¸
                  </button>
                </>
              )}
            </div>
          )}

          {/* ?‹œ?„¤ ë°? ?™˜ê²? - Step 2 */}
          {chatStep === 2 && category === "?‹œ?„¤ ë°? ?™˜ê²?" && (
            <div className="pt-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && userInput.trim()) {
                    setChatAnswers({ ...chatAnswers, floor: userInput });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: userInput },
                      { type: "bot", message: "?–´?–¤ ë¬¸ì œ?¸ê°??š”?" },
                    ]);
                    setUserInput("");
                    setChatStep(3);
                  }
                }}
                placeholder="ì¸µìˆ˜ë¥? ?…? ¥?•˜?„¸?š” (?˜ˆ: 3ì¸?)"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400"
              />
              <button
                onClick={() => {
                  if (userInput.trim()) {
                    setChatAnswers({ ...chatAnswers, floor: userInput });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: userInput },
                      { type: "bot", message: "?–´?–¤ ë¬¸ì œ?¸ê°??š”?" },
                    ]);
                    setUserInput("");
                    setChatStep(3);
                  }
                }}
                className="mt-2 w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
              >
                ?‹¤?Œ
              </button>
            </div>
          )}

          {/* ?•™?ƒ ?¥?•™ - Step 2 */}
          {chatStep === 2 && category === "?•™?ƒ ?¥?•™" && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                "?‹ ì²? ê¸°ê°„",
                "?„ ë°? ê¸°ì??",
                "ì§?ê¸? ?¼? •",
                "ê¸°í?? ë¬¸ì˜",
              ].map((option) => (
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
                    setChatStep(99); // ?™„ë£? ?‹¨ê³?
                  }}
                  className="py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* ?‹œ?„¤ ë°? ?™˜ê²? - Step 3 */}
          {chatStep === 3 && category === "?‹œ?„¤ ë°? ?™˜ê²?" && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                "ê³ ì¥/?ŒŒ?†",
                "ì²?ê²? ë¬¸ì œ",
                "?•ˆ? „ ë¬¸ì œ",
                "ê¸°í??",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setChatAnswers({ ...chatAnswers, problemType: option });
                    setChatHistory([
                      ...chatHistory,
                      { type: "user", message: option },
                      {
                        type: "bot",
                        message: "?ƒ?„¸ ?‚´?š©?„ ë§ì???•´ì£¼ì„¸?š”",
                      },
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

          {/* ?‹œ?„¤ ë°? ?™˜ê²? - Step 4 */}
          {chatStep === 4 && category === "?‹œ?„¤ ë°? ?™˜ê²?" && (
            <div className="pt-2">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="ë¬¸ì œ ?ƒ?™©?„ ??„¸?ˆ ?„¤ëª…í•´ì£¼ì„¸?š”"
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
                        message:
                          "?…? ¥?•˜?‹  ?‚´?š©?„ ?™•?¸?•´ì£¼ì„¸?š” ?œ…",
                      },
                      {
                        type: "bot",
                        message: `
?‹œ?„¤: ${finalAnswers.facilityType}
?œ„ì¹?: ${finalAnswers.building} ${finalAnswers.floor}
ë¬¸ì œ: ${finalAnswers.problemType}
?ƒ?„¸: ${finalAnswers.detail}
                      `.trim(),
                      },
                    ]);
                    setUserInput("");
                    setChatStep(5);
                  }
                }}
                className="mt-2 w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
              >
                ?™•?¸
              </button>
            </div>
          )}

          {/* ?‹œ?„¤ ë°? ?™˜ê²? - Step 5 (? œì¶? ?™•?¸) */}
          {chatStep === 5 && category === "?‹œ?„¤ ë°? ?™˜ê²?" && (
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
                ?‹¤?‹œ ?‘?„±
              </button>
              <button
                onClick={() => {
                  onSuccess(
                    "ë¯¼ì›?´ ? ‘?ˆ˜?˜?—ˆ?Šµ?‹ˆ?‹¤!\nì²˜ë¦¬ ê²°ê³¼?Š” ?•Œë¦¼ìœ¼ë¡? ?•ˆ?‚´?“œë¦¬ê² ?Šµ?‹ˆ?‹¤.",
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
                ? œì¶œí•˜ê¸?
              </button>
            </div>
          )}

          {/* ?‹¤ë¥? ì¹´í…Œê³ ë¦¬ ?™„ë£? ?‹¨ê³? (Step 99) */}
          {chatStep === 99 && category !== "?‹œ?„¤ ë°? ?™˜ê²?" && (
            <div className="pt-2">
              <button
                onClick={() => {
                  onSuccess("ë¬¸ì˜ê°? ?™„ë£Œë˜?—ˆ?Šµ?‹ˆ?‹¤!", "complete");
                  setChatStep(0);
                  setChatHistory([]);
                  setChatAnswers({});
                  setUserInput("");
                  onClose();
                }}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium"
              >
                ?™•?¸
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
