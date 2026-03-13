import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId, studyMinutes } = await request.json();

    if (!userId || !studyMinutes) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate plan based on study time
    let dailyNewWords = 5;
    let dailyReview = 3;
    let collocations = 2;
    let examples = 2;
    let miniQuiz = 1;

    if (studyMinutes >= 20) {
      dailyNewWords = 10;
      dailyReview = 5;
      collocations = 3;
      examples = 3;
    }
    if (studyMinutes >= 30) {
      dailyNewWords = 15;
      dailyReview = 8;
      collocations = 5;
      examples = 5;
      miniQuiz = 2;
    }
    if (studyMinutes >= 45) {
      dailyNewWords = 20;
      dailyReview = 10;
      collocations = 7;
      examples = 7;
      miniQuiz = 3;
    }

    const plan = await prisma.studyPlan.upsert({
      where: { userId },
      create: {
        userId,
        dailyNewWords,
        dailyReview,
        collocations,
        examples,
        miniQuiz,
      },
      update: {
        dailyNewWords,
        dailyReview,
        collocations,
        examples,
        miniQuiz,
      },
    });

    // Mark onboarding as done
    await prisma.userLevel.update({
      where: { userId },
      data: {
        onboardingDone: true,
        studyMinutes,
      },
    });

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Error creating study plan:', error);
    return NextResponse.json({ error: 'Failed to create study plan' }, { status: 500 });
  }
}
