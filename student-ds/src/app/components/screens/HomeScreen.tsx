import React, { useState, useRef } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Trophy, Star, Check, TrendingUp, X, ChevronRight, Download } from "lucide-react";
import Header from "../layout/Header";
import CompetencyDetailModal from "../dashboard/CompetencyDetailModal";
import WelcomeCard from "../dashboard/WelcomeCard";
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

  // Evidence Modal States
  const [evidenceFilter, setEvidenceFilter] = useState("전체");
  const [evidenceSort, setEvidenceSort] = useState("최신순");
  const filterScrollRef = useRef<HTMLDivElement>(null);

  // Evidence 필터링 함수
  const getFilteredEvidence = () => {
    let filtered = [...evidenceData];

    // 카테고리 필터
    if (evidenceFilter !== "전체") {
      filtered = filtered.filter(item => item.competency === evidenceFilter);
    }

    // 정렬
    if (evidenceSort === "최신순") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (evidenceSort === "점수순") {
      filtered.sort((a, b) => parseInt(b.score) - parseInt(a.score));
    }

    return filtered;
  };

  // 학기별 그룹화 함수
  const groupBySemester = (data: typeof evidenceData) => {
    return data.reduce((acc, item) => {
      const semester = item.semester || "기타";
      if (!acc[semester]) {
        acc[semester] = [];
      }
      acc[semester].push(item);
      return acc;
    }, {} as Record<string, typeof evidenceData>);
  };

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
          <h3 className="font-bold text-gray-800">종합 현황 레이더</h3>
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

      {/* Evidence 트래킹 */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Evidence 트래킹</h3>
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

      {/* Evidence 전체보기 모달 */}
      {showEvidenceModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] flex flex-col">
            {/* 고정 상단 영역 */}
            <div className="p-6 pb-0 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-xl">Evidence 전체 내역</h3>
                  <p className="text-sm text-gray-500">총 {evidenceData.length}건</p>
                </div>
                <button onClick={() => setShowEvidenceModal(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* 필터 탭 */}
              <div className="flex items-center justify-between gap-3 mb-4">
                {/* 이전 버튼 */}
                <button
                  onClick={() => {
                    if (filterScrollRef.current) {
                      filterScrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
                    }
                  }}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all shrink-0"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
                </button>

                {/* 카테고리 스크롤 영역 */}
                <div
                  ref={filterScrollRef}
                  className="flex-1 overflow-x-auto scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex gap-2">
                    {['전체', 'S', 'T', 'A', 'R'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setEvidenceFilter(filter)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                          evidenceFilter === filter
                            ? 'text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                        style={
                          evidenceFilter === filter && filter !== '전체'
                            ? { backgroundColor: starDetails[filter as keyof typeof starDetails].color }
                            : evidenceFilter === filter
                            ? { background: 'linear-gradient(to right, #E94E3C, #F7941D)' }
                            : {}
                        }
                      >
                        {filter === '전체' ? '전체' : `${filter} (${starDetails[filter as keyof typeof starDetails].name})`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 다음 버튼 */}
                <button
                  onClick={() => {
                    if (filterScrollRef.current) {
                      filterScrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
                    }
                  }}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all shrink-0"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* 정렬 옵션 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  {['최신순', '학기별', '점수순'].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setEvidenceSort(sort)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        evidenceSort === sort
                          ? 'bg-pink-100 text-pink-600 font-medium'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 스크롤 가능한 중간 영역 */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {/* 학기별 그룹 */}
              {evidenceSort === '학기별' ? (
                <div className="space-y-4">
                  {Object.entries(groupBySemester(getFilteredEvidence())).map(([semester, items]) => (
                    <div key={semester}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                        <h4 className="font-bold text-gray-800">{semester}</h4>
                        <span className="text-xs text-gray-500">({items.length}건)</span>
                      </div>
                      <div className="space-y-2">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                style={{ backgroundColor: starDetails[item.competency as keyof typeof starDetails].color }}
                              >
                                {item.competency}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-sm">{item.course}</p>
                                <p className="text-xs text-gray-500">{item.task}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                              </div>
                            </div>
                            <span className="font-bold text-green-600">{item.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {getFilteredEvidence().map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: starDetails[item.competency as keyof typeof starDetails].color }}
                        >
                          {item.competency}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{item.course}</p>
                          <p className="text-xs text-gray-500">{item.task}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.semester} · {item.date}</p>
                        </div>
                      </div>
                      <span className="font-bold text-green-600">{item.score}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 고정 하단 영역 */}
            <div className="p-6 pt-4 shrink-0">
              <button className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                PDF로 다운로드
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
