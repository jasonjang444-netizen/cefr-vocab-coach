import { NextResponse } from 'next/server';
import { PLACEMENT_QUESTIONS } from '@/lib/vocabulary-data';
import { prisma } from '@/lib/prisma';
import { getRecommendedTarget } from '@/lib/cefr';

interface SubmittedAnswer {
  questionId: number;
  selectedAnswer: number;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function buildQuestionSet() {
  return PLACEMENT_QUESTIONS.map((question, index) => ({
    ...question,
    id: index,
  }));
}

export async function GET() {
  try {
    const questions = shuffleArray(buildQuestionSet());
    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error generating placement test:', error);
    return NextResponse.json({ error: 'Failed to generate test' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, answers } = await request.json();

    if (!userId || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const normalizedAnswers: SubmittedAnswer[] = answers
      .map((answer: SubmittedAnswer | number, index: number) => {
        if (typeof answer === 'number') {
          return { questionId: index, selectedAnswer: answer };
        }

        return {
          questionId: Number(answer.questionId),
          selectedAnswer: Number(answer.selectedAnswer),
        };
      })
      .filter((answer) => Number.isInteger(answer.questionId) && Number.isInteger(answer.selectedAnswer));

    const questionMap = new Map(buildQuestionSet().map((question) => [question.id, question]));
    const levelScores: Record<string, { correct: number; total: number }> = {
      A1: { correct: 0, total: 0 },
      A2: { correct: 0, total: 0 },
      B1: { correct: 0, total: 0 },
      B2: { correct: 0, total: 0 },
      C1: { correct: 0, total: 0 },
      C2: { correct: 0, total: 0 },
    };

    const typeScores: Record<string, { correct: number; total: number }> = {
      meaning: { correct: 0, total: 0 },
      completion: { correct: 0, total: 0 },
      usage: { correct: 0, total: 0 },
    };

    let totalCorrect = 0;

    normalizedAnswers.forEach((answer) => {
      const question = questionMap.get(answer.questionId);
      if (!question) {
        return;
      }

      levelScores[question.cefrLevel].total += 1;
      typeScores[question.type].total += 1;

      if (answer.selectedAnswer === question.correctAnswer) {
        totalCorrect += 1;
        levelScores[question.cefrLevel].correct += 1;
        typeScores[question.type].correct += 1;
      }
    });

    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    let estimatedLevel = 'A1';

    for (const level of levels) {
      const scores = levelScores[level];
      if (scores.total > 0 && scores.correct / scores.total >= 0.5) {
        estimatedLevel = level;
      }
    }

    const totalQuestions = PLACEMENT_QUESTIONS.length;
    const accuracy = totalCorrect / totalQuestions;
    let confidence = 'Low';

    if (accuracy >= 0.75) {
      confidence = 'High';
    } else if (accuracy >= 0.45) {
      confidence = 'Medium';
    }

    const strengths: string[] = [];
    const weaknesses: string[] = [];

    Object.entries(typeScores).forEach(([type, scores]) => {
      if (scores.total === 0) {
        return;
      }

      const ratio = scores.correct / scores.total;
      const label =
        type === 'meaning'
          ? 'Vocabulary meaning'
          : type === 'completion'
            ? 'Sentence completion'
            : 'Word usage';

      if (ratio >= 0.6) {
        strengths.push(label);
      } else {
        weaknesses.push(label);
      }
    });

    if (strengths.length === 0) {
      strengths.push('Everyday vocabulary');
    }

    if (weaknesses.length === 0) {
      weaknesses.push('Advanced vocabulary');
    }

    const recommendedTarget = getRecommendedTarget(estimatedLevel);

    const result = await prisma.placementTestResult.upsert({
      where: { userId },
      create: {
        userId,
        level: estimatedLevel,
        score: totalCorrect,
        confidence,
        strengths: strengths.join(', '),
        weaknesses: weaknesses.join(', '),
      },
      update: {
        level: estimatedLevel,
        score: totalCorrect,
        confidence,
        strengths: strengths.join(', '),
        weaknesses: weaknesses.join(', '),
      },
    });

    await prisma.userLevel.upsert({
      where: { userId },
      create: {
        userId,
        currentCefr: estimatedLevel,
        targetCefr: recommendedTarget,
      },
      update: {
        currentCefr: estimatedLevel,
        targetCefr: recommendedTarget,
      },
    });

    return NextResponse.json({
      level: estimatedLevel,
      score: totalCorrect,
      total: totalQuestions,
      confidence,
      strengths,
      weaknesses,
      recommendedTarget,
      resultId: result.id,
    });
  } catch (error) {
    console.error('Error evaluating placement test:', error);
    return NextResponse.json({ error: 'Failed to evaluate test' }, { status: 500 });
  }
}
