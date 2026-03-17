import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CEFR_LEVELS, getRecommendedTarget } from '@/lib/cefr';
import { buildStudyPlan, parseStoredList } from '@/lib/study-plan';

function startOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function getDayKey(date: Date) {
  const value = startOfDay(date);
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDayLabel(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

function calculateStreak(sessionDates: Date[]) {
  const sessionDays = new Set(sessionDates.map((date) => getDayKey(date)));
  const today = startOfDay(new Date());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  let cursor = sessionDays.has(getDayKey(today)) ? today : yesterday;
  if (!sessionDays.has(getDayKey(cursor))) {
    return 0;
  }

  let streak = 0;
  while (sessionDays.has(getDayKey(cursor))) {
    streak += 1;
    const previous = new Date(cursor);
    previous.setDate(previous.getDate() - 1);
    cursor = previous;
  }

  return streak;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const [userLevel, placementResult, studyPlan, sessions, quizResults, vocabProgress] = await Promise.all([
      prisma.userLevel.findUnique({ where: { userId } }),
      prisma.placementTestResult.findUnique({ where: { userId } }),
      prisma.studyPlan.findUnique({ where: { userId } }),
      prisma.studySession.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: 60,
      }),
      prisma.quizResult.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: 12,
      }),
      prisma.userVocabProgress.findMany({
        where: { userId },
        include: {
          vocab: {
            select: {
              cefrLevel: true,
            },
          },
        },
      }),
    ]);

    const streak = calculateStreak(sessions.map((session) => session.date));
    const wordsLearned = vocabProgress.filter((item) => item.status === 'learned').length;
    const difficultWords = vocabProgress.filter((item) => item.status === 'difficult').length;
    const wordsInReview = vocabProgress.filter(
      (item) => item.status === 'review' || item.status === 'difficult'
    ).length;

    const avgQuizScore = quizResults.length > 0
      ? Math.round(
          quizResults.reduce((sum, result) => sum + (result.score / Math.max(1, result.total)) * 100, 0) /
            quizResults.length
        )
      : 0;

    const recentQuizzes = quizResults.slice(0, 5).map((result) => ({
      score: result.score,
      total: result.total,
      date: result.date,
      percentage: Math.round((result.score / Math.max(1, result.total)) * 100),
    }));

    const vocabularyByLevel = CEFR_LEVELS.map((level) => ({
      level,
      learned: 0,
      review: 0,
      difficult: 0,
      total: 0,
    }));

    vocabProgress.forEach((item) => {
      const bucket = vocabularyByLevel.find((entry) => entry.level === item.vocab.cefrLevel);
      if (!bucket) {
        return;
      }

      bucket.total += 1;
      if (item.status === 'learned') {
        bucket.learned += 1;
      } else if (item.status === 'difficult') {
        bucket.difficult += 1;
      } else {
        bucket.review += 1;
      }
    });

    const today = startOfDay(new Date());
    const sessionByDay = new Map<string, { minutes: number; words: number }>();

    sessions.forEach((session) => {
      const key = getDayKey(session.date);
      const existing = sessionByDay.get(key) ?? { minutes: 0, words: 0 };
      existing.minutes += session.minutesSpent;
      existing.words += session.wordsStudied + session.wordsReviewed;
      sessionByDay.set(key, existing);
    });

    const studyActivity = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));
      const key = getDayKey(date);
      const totals = sessionByDay.get(key) ?? { minutes: 0, words: 0 };

      return {
        label: getDayLabel(date),
        minutes: totals.minutes,
        words: totals.words,
      };
    });

    const quizPerformance = [...quizResults]
      .reverse()
      .slice(-6)
      .map((result) => ({
        label: getDayLabel(result.date),
        score: Math.round((result.score / Math.max(1, result.total)) * 100),
      }));

    const placementSummary = placementResult
      ? {
          level: placementResult.level,
          score: placementResult.score,
          confidence: placementResult.confidence,
          strengths: parseStoredList(placementResult.strengths),
          weaknesses: parseStoredList(placementResult.weaknesses),
        }
      : null;

    const planPreview = buildStudyPlan(userLevel?.studyMinutes ?? 20, {
      currentLevel: userLevel?.currentCefr ?? placementResult?.level,
      targetLevel: userLevel?.targetCefr,
      weaknesses: parseStoredList(placementResult?.weaknesses),
    });

    return NextResponse.json({
      userLevel,
      placementResult: placementSummary,
      studyPlan: studyPlan
        ? {
            ...studyPlan,
            studyMinutes: userLevel?.studyMinutes ?? planPreview.minutes,
            focusAreas: planPreview.focusAreas,
            tagline: planPreview.tagline,
          }
        : null,
      streak,
      wordsLearned,
      wordsInReview,
      difficultWords,
      avgQuizScore,
      totalSessions: sessions.length,
      totalWordsTracked: vocabProgress.length,
      weeklyStudyMinutes: studyActivity.reduce((sum, item) => sum + item.minutes, 0),
      weeklyWordsStudied: studyActivity.reduce((sum, item) => sum + item.words, 0),
      recentQuizzes,
      vocabularyByLevel,
      studyActivity,
      quizPerformance,
      recommendedTarget: getRecommendedTarget(userLevel?.currentCefr ?? placementResult?.level ?? 'A1'),
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
