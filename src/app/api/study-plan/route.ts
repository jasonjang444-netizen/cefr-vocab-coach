import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildStudyPlan, parseStoredList } from '@/lib/study-plan';

export async function POST(request: Request) {
  try {
    const { userId, studyMinutes } = await request.json();

    if (!userId || !studyMinutes) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [userLevel, placementResult] = await Promise.all([
      prisma.userLevel.findUnique({ where: { userId } }),
      prisma.placementTestResult.findUnique({ where: { userId } }),
    ]);

    const planDetails = buildStudyPlan(studyMinutes, {
      currentLevel: userLevel?.currentCefr,
      targetLevel: userLevel?.targetCefr,
      weaknesses: parseStoredList(placementResult?.weaknesses),
    });

    const plan = await prisma.studyPlan.upsert({
      where: { userId },
      create: {
        userId,
        dailyNewWords: planDetails.dailyNewWords,
        dailyReview: planDetails.dailyReview,
        collocations: planDetails.collocations,
        examples: planDetails.examples,
        miniQuiz: planDetails.miniQuiz,
      },
      update: {
        dailyNewWords: planDetails.dailyNewWords,
        dailyReview: planDetails.dailyReview,
        collocations: planDetails.collocations,
        examples: planDetails.examples,
        miniQuiz: planDetails.miniQuiz,
      },
    });

    await prisma.userLevel.upsert({
      where: { userId },
      create: {
        userId,
        studyMinutes,
        onboardingDone: true,
      },
      update: {
        onboardingDone: true,
        studyMinutes,
      },
    });

    return NextResponse.json({
      plan: {
        ...plan,
        studyMinutes,
        focusAreas: planDetails.focusAreas,
        tagline: planDetails.tagline,
      },
    });
  } catch (error) {
    console.error('Error creating study plan:', error);
    return NextResponse.json({ error: 'Failed to create study plan' }, { status: 500 });
  }
}
