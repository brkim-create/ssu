// JWT 토큰 및 인증 관리 유틸리티

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  userType: "student" | "professor" | "admin";
  rememberMe: boolean;
  userName?: string;
  userId?: string;
}

const AUTH_STORAGE_KEY = "auth_tokens";

/**
 * 로컬스토리지에 토큰 저장
 */
export const saveAuthTokens = (tokens: AuthTokens): void => {
  if (typeof window === "undefined") return;

  if (tokens.rememberMe) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
  } else {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
  }
};

/**
 * 로컬스토리지에서 토큰 가져오기
 */
export const getAuthTokens = (): AuthTokens | null => {
  if (typeof window === "undefined") return null;

  const stored =
    localStorage.getItem(AUTH_STORAGE_KEY) ||
    sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as AuthTokens;
  } catch {
    return null;
  }
};

/**
 * 토큰 삭제 (로그아웃)
 */
export const clearAuthTokens = (): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
};

/**
 * 토큰 유효성 검증
 */
export const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  } catch {
    return false;
  }
};

/**
 * Mock SSO 로그인
 */
export const mockSSOLogin = async (
  username: string,
  password: string,
  userType: "student" | "professor"
): Promise<{ success: boolean; tokens?: AuthTokens; error?: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!username || !password) {
    return { success: false, error: "아이디와 비밀번호를 입력해주세요." };
  }

  if (password.length < 4) {
    return { success: false, error: "비밀번호는 4자 이상이어야 합니다." };
  }

  const mockPayload = {
    sub: username,
    userType,
    exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 7,
  };

  const mockAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(mockPayload))}.mock_signature`;
  const mockRefreshToken = `refresh.${btoa(JSON.stringify({ ...mockPayload, exp: mockPayload.exp * 2 }))}.mock_signature`;

  return {
    success: true,
    tokens: {
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
      userType,
      rememberMe: false,
      userName: userType === "student" ? "김민준" : "이영희 교수",
      userId: username,
    },
  };
};

/**
 * Mock Admin 로그인
 */
export const mockAdminLogin = async (
  username: string,
  password: string
): Promise<{ success: boolean; tokens?: AuthTokens; error?: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!username || !password) {
    return { success: false, error: "아이디와 비밀번호를 입력해주세요." };
  }

  if (password.length < 4) {
    return { success: false, error: "비밀번호는 4자 이상이어야 합니다." };
  }

  const mockPayload = {
    sub: username,
    userType: "admin",
    exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 7,
  };

  const mockAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(mockPayload))}.mock_signature`;
  const mockRefreshToken = `refresh.${btoa(JSON.stringify({ ...mockPayload, exp: mockPayload.exp * 2 }))}.mock_signature`;

  return {
    success: true,
    tokens: {
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
      userType: "admin",
      rememberMe: false,
      userName: "관리자",
      userId: username,
    },
  };
};

/**
 * 자동 로그인 체크
 */
export const checkAutoLogin = (): AuthTokens | null => {
  const tokens = getAuthTokens();

  if (!tokens) return null;

  if (!isTokenValid(tokens.accessToken)) {
    if (tokens.refreshToken && isTokenValid(tokens.refreshToken)) {
      console.log("Refreshing access token...");
      return tokens;
    } else {
      clearAuthTokens();
      return null;
    }
  }

  return tokens;
};
