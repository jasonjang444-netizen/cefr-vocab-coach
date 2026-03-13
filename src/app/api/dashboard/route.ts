import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const userLevel = await prisma.userLevel.findUnique({
      where: { userId },
    });

    const placementResult = await prisma.placementTestResult.findUnique({
      where: { userId },
    });

    const studyPlan = await prisma.studyPlan.findUnique({
      where: { userId },
    });

    // Get study sessions for streak calculation
    const sessions = await prisma.studySession.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 30,
    });

    // Calculate streak
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const hasSession = sessions.some((s) => {
        const sessionDate = new Date(s.date);
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate.getTime() === checkDate.getTime();
      });
      if (hasSession) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    // Get quiz results
    const quizResults = await prisma.quizResult.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 10,
    });

    // Get vocab progress
    const vocabProgress = await prisma.userVocabProgress.findMany({
      where: { userId },
    });

    const wordsLearned = vocabProgress.filter((v) => v.status === 'learned').length;
    const wordsInReview = vocabProgress.filter((v) => v.status === 'review' || v.status === 'difficult').length;

    const avgQuizScore = quizResults.length > 0
      ? Math.round(quizResults.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) / quizResults.length)
      : 0;

    return NextResponse.json({
      userLevel,
      placementResult,
      studyPlan,
      streak,
      wordsLearned,
      wordsInReview,
      avgQuizScore,
      recentQuizzes: quizResults,
      totalSessions: sessions.length,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
