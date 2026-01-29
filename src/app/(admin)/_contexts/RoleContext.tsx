"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const ROLE_SUPER_ADMIN = "슈퍼관리자";
const ROLE_GENERAL = "일반담당자";

interface RoleContextType {
  userRole: string;
  setUserRole: (role: string) => void;
  currentUserEmail: string;
  ROLE_SUPER_ADMIN: string;
  ROLE_GENERAL: string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState(ROLE_SUPER_ADMIN);
  const currentUserEmail = "admin@sc.ac.kr";

  return (
    <RoleContext.Provider
      value={{
        userRole,
        setUserRole,
        currentUserEmail,
        ROLE_SUPER_ADMIN,
        ROLE_GENERAL,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
