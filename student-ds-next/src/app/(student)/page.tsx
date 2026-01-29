"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import Header from "./_components/common/Header";
import WelcomeCard from "./_components/dashboard/WelcomeCard";
import CompetencyRadar from "./_components/dashboard/CompetencyRadar";
import CompetencyGrid from "./_components/dashboard/CompetencyGrid";
import EvidenceSection from "./_components/dashboard/EvidenceSection";
import JobFitSection from "./_components/dashboard/JobFitSection";

// Modals
import SearchModal from "./_components/modals/global/SearchModal";
import ShareModal from "./_components/modals/global/ShareModal";
import EvidenceListModal from "./_components/modals/home/EvidenceListModal";
import CompetencyDetailModal from "./_components/modals/home/CompetencyDetailModal";

// Data
import { evidenceData, currentStudentProfile } from "@/data/mockData";

/**
 * HomePage - 메인 대시보드 페이지
 *
 * 역할:
 * - STAR/PO 레이더 차트 표시
 * - 역량 상세 카드
 * - Evidence 활동 내역
 */
export default function HomePage() {
  const router = useRouter();

  // ========== Local State ==========
  const [radarToggle, setRadarToggle] = useState<"core" | "po">("core");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isEvidenceListOpen, setIsEvidenceListOpen] = useState(false);
  const [selectedStar, setSelectedStar] = useState<string | null>(null);
  const [selectedPO, setSelectedPO] = useState<string | null>(null);

  // ========== Handlers ==========
  const handleShareClick = () => {
    setIsShareOpen(true);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleBellClick = () => {
    router.push("/notification");
  };

  const handleToggleChange = (toggle: "core" | "po") => {
    setRadarToggle(toggle);
  };

  const handleSelectStar = (key: string) => {
    setSelectedStar(key);
  };

  const handleSelectPO = (key: string) => {
    setSelectedPO(key);
  };

  const handleViewAllEvidence = () => {
    setIsEvidenceListOpen(true);
  };

  return (
    <div className="pb-4">
      {/* Header with Welcome Card */}
      <Header
        onShareClick={handleShareClick}
        onSearchClick={handleSearchClick}
        onBellClick={handleBellClick}
      >
        <WelcomeCard userName={currentStudentProfile.name} score={currentStudentProfile.totalScore} />
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

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
      <EvidenceListModal
        isOpen={isEvidenceListOpen}
        onClose={() => setIsEvidenceListOpen(false)}
        evidenceData={evidenceData}
      />
      <CompetencyDetailModal
        isOpen={selectedStar !== null}
        onClose={() => setSelectedStar(null)}
        type="star"
        selectedKey={selectedStar}
      />
      <CompetencyDetailModal
        isOpen={selectedPO !== null}
        onClose={() => setSelectedPO(null)}
        type="po"
        selectedKey={selectedPO}
      />
    </div>
  );
}
