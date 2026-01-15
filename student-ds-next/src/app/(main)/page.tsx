"use client";

import { useState } from "react";

// Components
import Header from "@/components/common/Header";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import CompetencyRadar from "@/components/dashboard/CompetencyRadar";
import CompetencyGrid from "@/components/dashboard/CompetencyGrid";
import EvidenceSection from "@/components/dashboard/EvidenceSection";
import JobFitSection from "@/components/dashboard/JobFitSection";

/**
 * HomePage - 메인 대시보드 페이지
 *
 * 역할:
 * - STAR/PO 레이더 차트 표시
 * - 역량 상세 카드
 * - Evidence 활동 내역
 */
export default function HomePage() {
  // ========== Local State ==========
  const [radarToggle, setRadarToggle] = useState<"core" | "po">("core");

  // ========== Handlers ==========
  const handleShareClick = () => {
    console.log("Share clicked");
  };

  const handleSearchClick = () => {
    console.log("Search clicked");
  };

  const handleBellClick = () => {
    console.log("Bell clicked");
  };

  const handleToggleChange = (toggle: "core" | "po") => {
    setRadarToggle(toggle);
  };

  const handleSelectStar = (key: string) => {
    console.log("Selected STAR:", key);
    // TODO: 모달 구현 시 활성화
  };

  const handleSelectPO = (key: string) => {
    console.log("Selected PO:", key);
    // TODO: 모달 구현 시 활성화
  };

  const handleViewAllEvidence = () => {
    console.log("View all evidence clicked");
    // TODO: 모달 구현 시 활성화
  };

  return (
    <div className="pb-4">
      {/* Header with Welcome Card */}
      <Header
        onShareClick={handleShareClick}
        onSearchClick={handleSearchClick}
        onBellClick={handleBellClick}
      >
        <WelcomeCard userName="김수성" score={81.3} />
      </Header>

      {/* Main Content */}
      <div className="mx-4 mt-4 space-y-4">
        {/* Radar Chart Section */}
        <CompetencyRadar
          initialToggle={radarToggle}
          onToggleChange={handleToggleChange}
        />

        {/* Skill Detail Cards */}
        <CompetencyGrid
          mode={radarToggle}
          onSelectStar={handleSelectStar}
          onSelectPO={handleSelectPO}
        />

        {/* 표준직무 적합도 */}
        <JobFitSection />

        {/* Evidence Section */}
        <EvidenceSection limit={3} onViewAll={handleViewAllEvidence} />
      </div>
    </div>
  );
}
