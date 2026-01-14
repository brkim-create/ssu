import { X } from "lucide-react";
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
 * - SSO 로그인 정보 표시 (이름, 학번, 소속, 인증방식)
 */
export default function LoginInfoModal({
  isOpen,
  onClose,
  authTokens,
}: LoginInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">로그인 정보</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">이름</p>
            <p className="font-medium">{authTokens?.userName || "김수성"}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">학번</p>
            <p className="font-medium">{authTokens?.userId || "202012345"}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">소속</p>
            <p className="font-medium">컴퓨터공학과</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">인증 방식</p>
            <p className="font-medium">SSO (Single Sign-On)</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-600">
              * 로그인 정보는 학교 통합인증 시스템(SSO)과 연동됩니다.
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
