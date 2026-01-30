// ============================================================
// Evidence Types
// Prisma Model: Evidence, EvidenceTracking
// ============================================================

import { CompetencyType } from './competency';

// Evidence (student-ds)
export interface Evidence {
  course: string;
  task: string;
  score: string;
  competency: string;
  semester: string;
  date: string;
}

// Evidence 트래킹 (admin-ds)
export interface EvidenceItem {
  competency: CompetencyType;
  course: string;
  assignment: string;
  score: number;
  semester: string;
}
