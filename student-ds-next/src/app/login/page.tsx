"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { mockSSOLogin, saveAuthTokens, checkAutoLogin } from "@/utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"student" | "professor">("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 이미 로그인된 경우 홈으로 리다이렉트
  useEffect(() => {
    const tokens = checkAutoLogin();
    if (tokens) {
      router.replace("/");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await mockSSOLogin(username, password, userType);

      if (result.success && result.tokens) {
        const tokens = { ...result.tokens, rememberMe };
        saveAuthTokens(tokens);

        // ✅ [수정됨] 사용자가 선택한 userType에 따라 이동 경로 분기
        if (userType === "professor") {
          router.push("/professor"); // 교수 메인으로 이동
        } else {
          router.push("/"); // 학생 메인으로 이동
        }
      } else {
        setError(result.error || "로그인에 실패했습니다.");
      }
    } catch {
      setError("서버와의 연결에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <img
              src="/logo.png"
              alt="대학교 로고"
              className="h-20 w-20 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
            대학교 통합 포털
          </h1>
          <p className="text-gray-600">STAR 역량 분석 시스템</p>
        </div>

        {/* 로그인 카드 */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* 사용자 타입 탭 */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              type="button"
              onClick={() => setUserType("student")}
              className={`relative flex-1 px-4 py-3 font-medium transition-all ${
                userType === "student"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              학생
              {userType === "student" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
              )}
            </button>
            <button
              type="button"
              onClick={() => setUserType("professor")}
              className={`relative flex-1 px-4 py-3 font-medium transition-all ${
                userType === "professor"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              교수
              {userType === "professor" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
              )}
            </button>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {userType === "student" ? "학번" : "교번"}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={
                  userType === "student"
                    ? "학번을 입력하세요"
                    : "교번을 입력하세요"
                }
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-600 cursor-pointer"
              >
                자동 로그인
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  로그인 중...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  로그인
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              비밀번호 찾기
            </button>
            <span className="text-gray-300 mx-3">|</span>
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              회원가입
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-blue-600 text-center">
              💡 개발 모드: 임의의 아이디/비밀번호(4자 이상)로 로그인 가능합니다
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2024 대학교. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
