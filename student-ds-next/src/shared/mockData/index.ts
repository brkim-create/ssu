// ============================================================
// Shared MockData - Central Export
// For Prisma model conversion and cross-project data sharing
// ============================================================

// Types
export * from './types';

// Common Constants
export * from './common';

// Data (re-export with namespace for clarity)
export * as StudentMockData from './data/student';
export * as ProfessorMockData from './data/professor';
export * as AdminMockData from './data/admin';

// Also export all data directly for convenience
export * from './data';
