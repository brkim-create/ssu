/**
 * Student Radar Chart Utility Functions
 * 학생 역량 차트 데이터 생성을 위한 유틸리티
 *
 * 원본: professor-ds/src/utils/studentRadarUtils.ts
 */

import { starAvgData, poAvgData } from "@shared/mockData/data/professor";
import type { StudentPOScore } from "@shared/mockData/types/user";

// 학생 역량 타입
export interface StudentCompetency {
  S: number;
  T: number;
  A: number;
  R: number;
  PO?: StudentPOScore;
}

// 레이더 차트 데이터 아이템 타입
export interface RadarDataItem {
  subject: string;
  myScore: number;
  deptAvg: number;
  totalAvg: number;
}

// PO 키와 차트 표시명 매핑
const PO_DISPLAY_MAP: Record<keyof StudentPOScore, string> = {
  창의적문제해결: "창의적\n문제해결",
  융복합적사고: "융복합적\n사고",
  전문지식: "전문지식",
  미래혁신: "미래혁신",
  리더십: "리더십",
  공동체의식: "공동체\n의식",
  자기계발: "자기계발",
  의사소통: "의사소통",
  글로컬시민: "글로컬\n시민",
};

/**
 * 학생별 STAR 종합역량 레이더 차트 데이터 생성
 * @param student - 학생의 STAR 역량 점수
 * @returns 레이더 차트용 데이터 배열
 */
export const getStudentRadarSTAR = (student: StudentCompetency): RadarDataItem[] => [
  { subject: "S (창의)", myScore: student.S, deptAvg: starAvgData.dept.S, totalAvg: starAvgData.total.S },
  { subject: "T (실무)", myScore: student.T, deptAvg: starAvgData.dept.T, totalAvg: starAvgData.total.T },
  { subject: "A (인성)", myScore: student.A, deptAvg: starAvgData.dept.A, totalAvg: starAvgData.total.A },
  { subject: "R (소통)", myScore: student.R, deptAvg: starAvgData.dept.R, totalAvg: starAvgData.total.R },
];

/**
 * 학생별 전공능력(PO) 레이더 차트 데이터 생성
 * @param student - 학생 데이터 (PO 점수 포함)
 * @returns 레이더 차트용 데이터 배열
 */
export const getStudentRadarPO = (student: StudentCompetency): RadarDataItem[] => {
  if (!student.PO) {
    // PO 데이터가 없는 경우 빈 배열 반환
    return [];
  }

  const poKeys: (keyof StudentPOScore)[] = [
    "창의적문제해결",
    "융복합적사고",
    "전문지식",
    "미래혁신",
    "리더십",
    "공동체의식",
    "자기계발",
    "의사소통",
    "글로컬시민",
  ];

  return poKeys.map((key) => {
    const displayName = PO_DISPLAY_MAP[key];
    return {
      subject: displayName,
      myScore: student.PO![key],
      deptAvg: poAvgData.dept[displayName],
      totalAvg: poAvgData.total[displayName],
    };
  });
};
