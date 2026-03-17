import { getLevelGap, normalizeCefrLevel } from '@/lib/cefr';

export interface StudyTimeOption {
  minutes: number;
  label: string;
  tagline: string;
  dailyNewWords: number;
  dailyReview: number;
  collocations: number;
  examples: number;
  miniQuiz: number;
}

export interface StudyPlanContext {
  currentLevel?: string | null;
  targetLevel?: string | null;
  weaknesses?: string[];
}

export interface GeneratedStudyPlan extends StudyTimeOption {
  focusAreas: string[];
}

export const STUDY_TIME_OPTIONS: StudyTimeOption[] = [
  {
    minutes: 10,
    label: '10 minutes',
    tagline: 'Quick daily habit',
    dailyNewWords: 6,
    dailyReview: 4,
    collocations: 2,
    examples: 2,
    miniQuiz: 1,
  },
  {
    minutes: 20,
    label: '20 minutes',
    tagline: 'Balanced daily session',
    dailyNewWords: 10,
    dailyReview: 5,
    collocations: 3,
    examples: 3,
    miniQuiz: 1,
  },
  {
    minutes: 30,
    label: '30 minutes',
    tagline: 'Focused progress block',
    dailyNewWords: 14,
    dailyReview: 7,
    collocations: 4,
    examples: 4,
    miniQuiz: 2,
  },
  {
    minutes: 45,
    label: '45 minutes',
    tagline: 'Deep vocabulary practice',
    dailyNewWords: 18,
    dailyReview: 9,
    collocations: 5,
    examples: 5,
    miniQuiz: 2,
  },
];

export function parseStoredList(value?: string | null): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getStudyTimeOption(minutes: number): StudyTimeOption {
  return (
    STUDY_TIME_OPTIONS.find((option) => option.minutes === minutes) ??
    STUDY_TIME_OPTIONS[1]
  );
}

export function buildStudyPlan(minutes: number, context: StudyPlanContext = {}): GeneratedStudyPlan {
  const basePlan = getStudyTimeOption(minutes);
  const currentLevel = normalizeCefrLevel(context.currentLevel);
  const targetLevel = normalizeCefrLevel(context.targetLevel ?? context.currentLevel);
  const gap = Math.max(0, getLevelGap(currentLevel, targetLevel));
  const weaknesses = (context.weaknesses ?? []).map((item) => item.toLowerCase());

  let dailyNewWords = basePlan.dailyNewWords;
  let dailyReview = basePlan.dailyReview;
  let collocations = basePlan.collocations;
  let examples = basePlan.examples;
  let miniQuiz = basePlan.miniQuiz;

  const focusAreas: string[] = [];

  if (gap >= 2) {
    dailyReview += 1;
    miniQuiz = Math.max(miniQuiz, 2);
    focusAreas.push('Bridge the gap between your current and target CEFR levels.');
  }

  if (gap >= 3) {
    dailyNewWords += 2;
    dailyReview += 1;
  }

  if (weaknesses.some((item) => item.includes('meaning'))) {
    dailyReview += 1;
    focusAreas.push('Strengthen meaning recall and precise definitions.');
  }

  if (weaknesses.some((item) => item.includes('completion'))) {
    examples += 1;
    focusAreas.push('Practice sentence completion in realistic context.');
  }

  if (weaknesses.some((item) => item.includes('usage'))) {
    collocations += 1;
    examples += 1;
    focusAreas.push('Focus on collocations and natural word usage.');
  }

  if (focusAreas.length === 0) {
    focusAreas.push('Build a balanced mix of new words, review, and retrieval practice.');
  }

  return {
    ...basePlan,
    dailyNewWords,
    dailyReview,
    collocations,
    examples,
    miniQuiz,
    focusAreas,
  };
}
