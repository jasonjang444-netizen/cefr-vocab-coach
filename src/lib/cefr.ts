export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export type CefrLevel = typeof CEFR_LEVELS[number];

export const CEFR_COLORS: Record<string, string> = {
  A1: '#22c55e',
  A2: '#84cc16',
  B1: '#eab308',
  B2: '#f97316',
  C1: '#ef4444',
  C2: '#a855f7',
};

export const CEFR_DESCRIPTIONS: Record<string, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
  C2: 'Proficiency',
};

export function getLevelIndex(level: string): number {
  return CEFR_LEVELS.indexOf(level as CefrLevel);
}

export function calculateProgress(current: string, target: string, wordsLearned: number = 0): number {
  const currentIdx = getLevelIndex(current);
  const targetIdx = getLevelIndex(target);
  if (targetIdx <= currentIdx) return 100;

  // Estimated words needed per CEFR level gap
  const wordsPerLevel = 300;
  const levelsToGo = targetIdx - currentIdx;
  const totalWordsNeeded = levelsToGo * wordsPerLevel;

  if (totalWordsNeeded === 0) return 100;
  return Math.min(100, Math.round((wordsLearned / totalWordsNeeded) * 100));
}

export function getDifficulty(current: string, target: string): string {
  const gap = getLevelIndex(target) - getLevelIndex(current);
  if (gap <= 0) return 'Already achieved!';
  if (gap === 1) return 'Achievable — ~2-3 months';
  if (gap === 2) return 'Moderate — ~4-6 months';
  if (gap === 3) return 'Challenging — ~8-12 months';
  return 'Very challenging — 12+ months';
}
