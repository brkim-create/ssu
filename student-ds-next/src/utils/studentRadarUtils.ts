/**
 * Student Radar Chart Utility Functions
 * 학생 역량 차트 데이터 생성을 위한 유틸리티
 *
 * 원본: professor-ds/src/utils/studentRadarUtils.ts
 */

// 학생 역량 타입
export interface StudentCompetency {
  S: number;
  T: number;
  A: number;
  R: number;
}

// 레이더 차트 데이터 아이템 타입
export interface RadarDataItem {
  subject: string;
  myScore: number;
  deptAvg: number;
  totalAvg: number;
}

// 학과 평균 및 전체 평균 상수 (DB에서 가져올 수 있음)
const DEPT_AVG = { S: 78, T: 80, A: 83, R: 76 };
const TOTAL_AVG = { S: 75, T: 77, A: 80, R: 74 };

const PO_DEPT_AVG: Record<string, number> = {
  "창의적\n문제해결": 79,
  "융복합\n사고": 77,
  전문지식: 82,
  미래설계: 78,
  리더십: 80,
  "공동체\n의식": 84,
  자기계발: 81,
  의사소통: 75,
  "글로컬\n역량": 77,
};

const PO_TOTAL_AVG: Record<string, number> = {
  "창의적\n문제해결": 76,
  "융복합\n사고": 74,
  전문지식: 79,
  미래설계: 75,
  리더십: 77,
  "공동체\n의식": 81,
  자기계발: 78,
  의사소통: 73,
  "글로컬\n역량": 74,
};

/**
 * 학생별 STAR 종합역량 레이더 차트 데이터 생성
 * @param student - 학생의 STAR 역량 점수
 * @returns 레이더 차트용 데이터 배열
 */
export const getStudentRadarSTAR = (student: StudentCompetency): RadarDataItem[] => [
  { subject: "S (창의)", myScore: student.S, deptAvg: DEPT_AVG.S, totalAvg: TOTAL_AVG.S },
  { subject: "T (실무)", myScore: student.T, deptAvg: DEPT_AVG.T, totalAvg: TOTAL_AVG.T },
  { subject: "A (인성)", myScore: student.A, deptAvg: DEPT_AVG.A, totalAvg: TOTAL_AVG.A },
  { subject: "R (소통)", myScore: student.R, deptAvg: DEPT_AVG.R, totalAvg: TOTAL_AVG.R },
];

/**
 * 학생별 전공능력(PO) 레이더 차트 데이터 생성
 * 주의: 실제 DB 연동 시 이 함수는 DB에서 가져온 데이터를 사용해야 함
 * @param student - 학생의 STAR 역량 점수 (PO는 STAR 기반으로 파생)
 * @returns 레이더 차트용 데이터 배열
 */
export const getStudentRadarPO = (student: StudentCompetency): RadarDataItem[] => {
  // STAR 점수를 기반으로 PO 점수 도출 (실제로는 DB에서 개별 PO 점수를 가져와야 함)
  // 여기서는 STAR 점수에 일정 오프셋을 적용한 시뮬레이션
  const poMapping: Record<string, { base: number; offset: number }> = {
    "창의적\n문제해결": { base: student.S, offset: 2 },
    "융복합\n사고": { base: student.S, offset: -3 },
    전문지식: { base: student.T, offset: 4 },
    미래설계: { base: student.T, offset: -2 },
    리더십: { base: student.A, offset: 3 },
    "공동체\n의식": { base: student.A, offset: 1 },
    자기계발: { base: student.R, offset: 5 },
    의사소통: { base: student.R, offset: -2 },
    "글로컬\n역량": { base: student.R, offset: 0 },
  };

  return Object.entries(poMapping).map(([subject, { base, offset }]) => ({
    subject,
    myScore: Math.min(100, Math.max(0, base + offset)),
    deptAvg: PO_DEPT_AVG[subject],
    totalAvg: PO_TOTAL_AVG[subject],
  }));
};
