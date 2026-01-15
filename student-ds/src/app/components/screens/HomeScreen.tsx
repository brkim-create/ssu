import React, { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Trophy, Star, Check, TrendingUp } from "lucide-react";
import Header from "../layout/Header";
import CompetencyDetailModal from "../dashboard/CompetencyDetailModal";
import WelcomeCard from "../dashboard/WelcomeCard";
import EvidenceListModal from "../modals/home/EvidenceListModal";
import {
  radarData,
  radarDataPO,
  starDetails,
  poDetails,
  evidenceData,
} from "../../../data/mockData";

interface HomeScreenProps {
  onShareClick: () => void;
  onSearchClick: () => void;
  onBellClick: () => void;
}

/**
 * HomeScreen - 홈 화면 (핵심역량 대시보드)
 *
 * 역할:
 * - STAR/PO 레이더 차트 표시
 * - 역량 상세 카드 및 모달
 * - Evidence 활동 내역
 */
export default function HomeScreen({
  onShareClick,
  onSearchClick,
  onBellClick,
}: HomeScreenProps) {
  // Local States
  const [radarToggle, setRadarToggle] = useState<"core" | "po">("core");
  const [selectedStar, setSelectedStar] = useState<string | null>(null);
  const [selectedPO, setSelectedPO] = useState<string | null>(null);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);

  // Grade Badge Config
  const gradeBadge: Record<string, { bg: string; icon: React.ReactNode }> = {
    최우수: { bg: "bg-[#FAAF40]", icon: <Trophy className="w-3 h-3" /> },
    우수: { bg: "bg-[#EE3E42]", icon: <Star className="w-3 h-3" /> },
    보통: { bg: "bg-[#e2e8f0]", icon: <Check className="w-3 h-3" /> },
    미흡: { bg: "bg-[#C5006F]", icon: <TrendingUp className="w-3 h-3" /> },
  };

  return (
    <div className="pb-4">
      <Header onShareClick={onShareClick} onSearchClick={onSearchClick} onBellClick={onBellClick}>
        <WelcomeCard userName="김수성" score={81.3} />
      </Header>

      {/* Radar Chart Section */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">핵심 역량 진단</h3>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setRadarToggle("core")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              radarToggle === "core"
                ? "bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            S·T·A·R 핵심역량
          </button>
          <button
            onClick={() => setRadarToggle("po")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              radarToggle === "po"
                ? "bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            전공능력(PO)
          </button>
        </div>

        <div style={{ width: "100%", height: "280px" }}>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarToggle === "core" ? radarData : radarDataPO}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fontSize: radarToggle === "po" ? 10 : 12,
                  fill: "#374151",
                }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
                axisLine={false}
              />
              <Radar
                name="내 점수"
                dataKey="myScore"
                stroke="#FFA500"
                fill="#FFA500"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Radar
                name="학과 평균"
                dataKey="deptAvg"
                stroke="#FF6B35"
                fill="none"
                strokeWidth={2}
              />
              <Radar
                name="전체 평균"
                dataKey="totalAvg"
                stroke="#C13584"
                fill="none"
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFA500]"></div>
            <span className="text-xs text-gray-600">내 점수</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]"></div>
            <span className="text-xs text-gray-600">학과 평균</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C13584]"></div>
            <span className="text-xs text-gray-600">전체 평균</span>
          </div>
        </div>
      </div>

      {/* Skill Detail Cards */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">역량 상세</h3>
        {radarToggle === "core" ? (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(starDetails).map(([key, value]) => (
              <div
                key={key}
                onClick={() => setSelectedStar(key)}
                className="bg-gray-50 rounded-2xl shadow p-4 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div
                      className="w-10 h-10 flex items-center justify-center font-bold text-2xl"
                      style={{ color: "#0f172a" }}
                    >
                      {key}
                    </div>
                    <p className="text-sm text-gray-600">{value.name}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "#0f172a" }}
                    >
                      {value.score}점
                    </p>
                    <div
                      className={`${gradeBadge[value.grade].bg} ${
                        value.grade === "보통" ? "text-[#0f172a]" : "text-white"
                      } text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 whitespace-nowrap`}
                    >
                      <span>{gradeBadge[value.grade].icon}</span>
                      <span className="text-[12px]">{value.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(poDetails).map(([key, value]) => (
              <div
                key={key}
                onClick={() => setSelectedPO(key)}
                className="bg-gray-50 rounded-xl shadow p-3 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{
                        backgroundColor: `${value.color}20`,
                        color: value.color,
                      }}
                    >
                      {value.category}
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      {value.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-gray-800">
                      {value.score}점
                    </p>
                    <div
                      className={`${gradeBadge[value.grade].bg} ${
                        value.grade === "보통" ? "text-[#0f172a]" : "text-white"
                      } text-[10px] px-2 py-1.5 rounded-full inline-flex items-center justify-center gap-1 whitespace-nowrap min-w-[60px]`}
                    >
                      <span>{gradeBadge[value.grade].icon}</span>
                      <span className="text-[11px]">{value.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 표준직무 적합도 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">표준직무 적합도</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">학과 취업자 평균 대비</span>
          <span className="text-2xl font-bold text-orange-500">78%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full" style={{ width: '78%' }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-2 mb-4">※ 나의 이수 역량과 학과 졸업생(취업자) 평균 역량 일치도</p>

        {/* 추천 직무 적합도 */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-bold text-gray-800 mb-3">추천 직무</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="text-sm text-gray-600 mb-1">소프트웨어 개발자</div>
                <div className="text-2xl font-bold text-gray-600">92%</div>
              </div>
              <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">적합</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200/20">
              <div>
                <div className="text-sm text-gray-600 mb-1">데이터 분석가</div>
                <div className="text-2xl font-bold text-gray-500">85%</div>
              </div>
              <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">적합</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200/20">
              <div>
                <div className="text-sm text-gray-600 mb-1">IT 컨설턴트</div>
                <div className="text-2xl font-bold text-gray-500">78%</div>
              </div>
              <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">보통</div>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Section */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Evidence 활동 내역</h3>
          <button
            onClick={() => setShowEvidenceModal(true)}
            className="text-sm text-pink-500 font-medium"
          >
            전체 보기
          </button>
        </div>
        <div className="space-y-2">
          {evidenceData.slice(0, 3).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{
                    backgroundColor:
                      starDetails[item.competency as keyof typeof starDetails]
                        .color,
                  }}
                >
                  {item.competency}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {item.course}
                  </p>
                  <p className="text-xs text-gray-500">{item.task}</p>
                </div>
              </div>
              <span className="font-bold text-green-600">{item.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <CompetencyDetailModal
        type="star"
        selectedKey={selectedStar}
        details={starDetails}
        onClose={() => setSelectedStar(null)}
      />

      <CompetencyDetailModal
        type="po"
        selectedKey={selectedPO}
        details={poDetails}
        onClose={() => setSelectedPO(null)}
      />

      <EvidenceListModal
        isOpen={showEvidenceModal}
        onClose={() => setShowEvidenceModal(false)}
        evidenceData={evidenceData}
      />
    </div>
  );
}
