import { X, CheckCircle, Clock } from "lucide-react";
import { AuthTokens } from "../../../utils/auth";

interface LoginInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  authTokens: AuthTokens | null;
}

/**
 * LoginInfoModal - 로그인 정보 모달
 *
 * 역할:
 * - SSO 연동 상태 표시
 * - 계정 정보, 학적 정보 표시
 * - 로그인 이력, 보안 설정
 */
export default function LoginInfoModal({
  isOpen,
  onClose,
  authTokens,
}: LoginInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">로그인 정보</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          {/* SSO 연동 상태 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="font-bold text-gray-800">SSO 연동 완료</p>
                <p className="text-xs text-gray-500">통합 인증 시스템</p>
              </div>
            </div>
          </div>

          {/* 계정 정보 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-gray-800 mb-3">계정 정보</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {authTokens?.userType === "student" ? "학번" : "교번"}
                </span>
                <span className="font-medium">
                  {authTokens?.userId || "202012345"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">이름</span>
                <span className="font-medium">
                  {authTokens?.userName || "사용자"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">사용자 유형</span>
                <span className="font-medium">
                  {authTokens?.userType === "student" ? "학생" : "교수"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">자동 로그인</span>
                <span className="font-medium">
                  {authTokens?.rememberMe ? "사용" : "미사용"}
                </span>
              </div>
            </div>
          </div>

          {/* 학적 정보 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-gray-800 mb-3">학적 정보</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">학과</span>
                <span className="font-medium text-gray-800">컴퓨터공학과</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">학년</span>
                <span className="font-medium text-gray-800">
                  {authTokens?.userType === "student" ? "3학년" : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">이메일</span>
                <span className="font-medium text-gray-800">
                  school@example.com
                </span>
              </div>
            </div>
          </div>

          {/* 로그인 이력 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-gray-800 mb-3">최근 로그인 이력</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">2025.01.20 14:32</span>
                </div>
                <span className="text-gray-500">Chrome (Windows)</span>
              </div>
              <div className="flex items-center justify-between py-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">2025.01.19 09:15</span>
                </div>
                <span className="text-gray-500">Safari (iPhone)</span>
              </div>
              <div className="flex items-center justify-between py-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">2025.01.18 18:42</span>
                </div>
                <span className="text-gray-500">Chrome (Android)</span>
              </div>
            </div>
          </div>

          {/* 보안 설정 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-gray-800 mb-3">보안 설정</h4>
            <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all">
              비밀번호 변경
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-orange-50 rounded-xl">
          <p className="text-xs text-orange-700">
            ⚠️ 의심스러운 로그인 활동이 있다면 즉시 비밀번호를 변경하세요
          </p>
        </div>
      </div>
    </div>
  );
}
