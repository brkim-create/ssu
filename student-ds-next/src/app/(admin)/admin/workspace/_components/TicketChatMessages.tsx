"use client";

import { type Ticket } from "@/data/mockData";
import { chatColors } from "@shared/theme";
import { CATEGORY_FACILITY } from "../constants";

interface TicketChatMessagesProps {
  ticket: Ticket;
}

export default function TicketChatMessages({ ticket }: TicketChatMessagesProps) {
  return (
    <div className="space-y-3">
      {/* 봇 질문 1 */}
      <div className="flex justify-end mb-2">
        <div className="max-w-[80%]">
          <div
            className="rounded-2xl rounded-tr-none p-3"
            style={{ background: chatColors.botMessage }}
          >
            <p className="text-sm text-gray-900">
              어떤 시설에 문제가 있나요?
            </p>
          </div>
        </div>
      </div>

      {/* 사용자 답변 1 */}
      <div className="flex mb-2">
        <div className="flex gap-2 max-w-[80%]">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 flex-shrink-0">
            {ticket.author.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium text-sm text-gray-900">
                {ticket.author}
              </p>
              <p className="text-xs text-gray-600">{ticket.date}</p>
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 border border-gray-200">
              <p className="text-sm text-gray-900">
                {ticket.category === CATEGORY_FACILITY
                  ? "강의실"
                  : ticket.category}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 봇 질문 2 */}
      <div className="flex justify-end mb-2">
        <div className="max-w-[80%]">
          <div
            className="rounded-2xl rounded-tr-none p-3"
            style={{ background: chatColors.botMessage }}
          >
            <p className="text-sm text-gray-900">
              상세 내용을 입력해주세요
            </p>
          </div>
        </div>
      </div>

      {/* 사용자 답변 2 */}
      <div className="flex mb-2">
        <div className="flex gap-2 max-w-[80%]">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 flex-shrink-0">
            {ticket.author.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium text-sm text-gray-900">
                {ticket.author}
              </p>
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 border border-gray-200">
              <p className="text-sm text-gray-900">
                {ticket.title}에 대해 문의드립니다. 빠른 조치 부탁드립니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 관리자 답변들 */}
      {ticket.replies?.map((reply, index) => (
        <div key={index} className="flex justify-end mt-4">
          <div className="flex flex-row-reverse gap-2 max-w-[80%]">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {reply.author.charAt(0)}
            </div>
            <div>
              <div className="flex flex-row-reverse items-center gap-2 mb-1">
                <p className="font-medium text-sm text-blue-600">
                  {reply.author}
                </p>
                <p className="text-xs text-gray-500">{reply.date}</p>
              </div>
              <div className="bg-blue-500 text-white rounded-2xl rounded-tr-none p-3">
                <p className="text-sm leading-relaxed">{reply.content}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
