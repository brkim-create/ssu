"use client";

import CommonHeader from "../../_components/CommonHeader";
import { FileText, Target, Clock, MessageCircle, ChevronRight } from "lucide-react";

/**
 * Course Management Page
 *
 * URL: /professor/course
 * 프로토타입 CourseScreen 기반
 */
export default function ProfessorCoursePage() {
  return (
    <div className="pb-4">
      <CommonHeader title="과목 관리" subtitle="담당 과목 상세 관리" />

      {/* 강의 관리 메뉴 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">강의계획서</p>
              <p className="text-xs text-gray-500">주차별 강의 계획 및 평가 기준</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">성적 입력</p>
              <p className="text-xs text-gray-500">중간/기말/과제 성적 관리</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">출석 관리</p>
              <p className="text-xs text-gray-500">주차별 출석 현황 확인</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-800">공지사항</p>
              <p className="text-xs text-gray-500">수강생 공지사항 작성/관리</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
