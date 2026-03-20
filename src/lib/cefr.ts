export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export type CefrLevel = typeof CEFR_LEVELS[number];

export const CEFR_COLORS: Record<CefrLevel, string> = {
  A1: '#22c55e',
  A2: '#84cc16',
  B1: '#eab308',
  B2: '#f97316',
  C1: '#ef4444',
  C2: '#a855f7',
};

export const CEFR_DESCRIPTIONS: Record<CefrLevel, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
  C2: 'Proficiency',
};

const CEFR_WORD_MILESTONES: Record<CefrLevel, number> = {
  A1: 0,
  A2: 180,
  B1: 420,
  B2: 760,
  C1: 1120,
  C2: 1500,
};

export function normalizeCefrLevel(level?: string | null): CefrLevel {
  return CEFR_LEVELS.includes(level as CefrLevel) ? (level as CefrLevel) : 'A1';
}

export function getLevelIndex(level: string): number {
  return CEFR_LEVELS.indexOf(normalizeCefrLevel(level));
}

export function getLevelGap(current: string, target: string): number {
  return getLevelIndex(target) - getLevelIndex(current);
}

export function getRecommendedTarget(current: string): CefrLevel {
  const currentIndex = getLevelIndex(current);
  return CEFR_LEVELS[Math.min(currentIndex + 1, CEFR_LEVELS.length - 1)];
}

export function calculateProgress(current: string, target: string, wordsLearned = 0): number {
  const currentLevel = normalizeCefrLevel(current);
  const targetLevel = normalizeCefrLevel(target);
  const gap = getLevelGap(currentLevel, targetLevel);

  if (currentLevel === 'C2') {
    return 0;
  }

  if (gap <= 0) {
    return 100;
  }

  const currentMilestone = CEFR_WORD_MILESTONES[currentLevel];
  const targetMilestone = CEFR_WORD_MILESTONES[targetLevel];
  const wordsNeeded = Math.max(1, targetMilestone - currentMilestone);

  return Math.min(100, Math.round((Math.max(0, wordsLearned) / wordsNeeded) * 100));
}

export function getDifficulty(current: string, target: string): string {
  const gap = getLevelGap(current, target);

  if (gap < 0) {
    return 'Below your current level. Useful only if you want to rebuild confidence.';
  }

  if (gap === 0) {
    return 'A consolidation goal focused on accuracy, confidence, and review.';
  }

  if (gap === 1) {
    return 'Recommended next step. A realistic challenge with steady daily practice.';
  }

  if (gap === 2) {
    return 'Stretch goal. You can reach it with consistent review and regular testing.';
  }

  if (gap === 3) {
    return 'Ambitious goal. Expect a longer runway and more deliberate study blocks.';
  }

  return 'High stretch goal. Best treated as a long-term roadmap rather than a short sprint.';
}

export function formatLevelJourney(current: string, target: string): string {
  return `${normalizeCefrLevel(current)} to ${normalizeCefrLevel(target)}`;
}
