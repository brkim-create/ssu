interface WelcomeCardProps {
  userName?: string;
  score?: number;
}

/**
 * WelcomeCard - 홈 화면 환영 카드
 *
 * 역할:
 * - 사용자 환영 메시지
 * - 핵심 역량 점수 표시
 */
export default function WelcomeCard({
  userName = "김수성",
  score = 81.3,
}: WelcomeCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mt-2">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm opacity-90">환영합니다</p>
          <p className="font-bold text-lg text-[24px]">{userName} 님</p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-90 mb-1">핵심 역량 점수</p>
          <div className="flex items-end gap-2 justify-end">
            <span className="text-4xl font-bold text-[32px]">{score}</span>
            <span className="text-lg mb-1 text-[16px]">/ 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
