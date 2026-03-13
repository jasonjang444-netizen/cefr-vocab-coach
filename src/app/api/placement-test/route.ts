import { NextResponse } from 'next/server';
import { PLACEMENT_QUESTIONS } from '@/lib/vocabulary-data';
import { prisma } from '@/lib/prisma';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET() {
  try {
    const questions = shuffleArray(PLACEMENT_QUESTIONS);
    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error generating placement test:', error);
    return NextResponse.json({ error: 'Failed to generate test' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, answers } = await request.json();

    if (!userId || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const questions = PLACEMENT_QUESTIONS;
    const levelScores: Record<string, { correct: number; total: number }> = {
      A1: { correct: 0, total: 0 },
      A2: { correct: 0, total: 0 },
      B1: { correct: 0, total: 0 },
      B2: { correct: 0, total: 0 },
      C1: { correct: 0, total: 0 },
      C2: { correct: 0, total: 0 },
    };

    let totalCorrect = 0;
    answers.forEach((answer: number, index: number) => {
      if (index < questions.length) {
        const q = questions[index];
        levelScores[q.cefrLevel].total++;
        if (answer === q.correctAnswer) {
          levelScores[q.cefrLevel].correct++;
          totalCorrect++;
        }
      }
    });

    // Determine level
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    let estimatedLevel = 'A1';
    for (const level of levels) {
      const ls = levelScores[level];
      if (ls.total > 0 && (ls.correct / ls.total) >= 0.5) {
        estimatedLevel = level;
      }
    }

    // Determine confidence
    const totalQuestions = questions.length;
    const accuracy = totalCorrect / totalQuestions;
    let confidence = 'Low';
    if (accuracy >= 0.7) confidence = 'High';
    else if (accuracy >= 0.4) confidence = 'Medium';

    // Find strengths and weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const typeScores: Record<string, { correct: number; total: number }> = {
      meaning: { correct: 0, total: 0 },
      completion: { correct: 0, total: 0 },
      usage: { correct: 0, total: 0 },
    };

    answers.forEach((answer: number, index: number) => {
      if (index < questions.length) {
        const q = questions[index];
        typeScores[q.type].total++;
        if (answer === q.correctAnswer) {
          typeScores[q.type].correct++;
        }
      }
    });

    Object.entries(typeScores).forEach(([type, scores]) => {
      if (scores.total > 0) {
        const ratio = scores.correct / scores.total;
        const label = type === 'meaning' ? 'Vocabulary meaning' : type === 'completion' ? 'Sentence completion' : 'Word usage';
        if (ratio >= 0.6) strengths.push(label);
        else weaknesses.push(label);
      }
    });

    if (strengths.length === 0) strengths.push('Basic vocabulary');
    if (weaknesses.length === 0) weaknesses.push('Advanced vocabulary');

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

    // Create/update user level
    await prisma.userLevel.upsert({
      where: { userId },
      create: {
        userId,
        currentCefr: estimatedLevel,
        targetCefr: levels[Math.min(levels.indexOf(estimatedLevel) + 1, 5)],
      },
      update: {
        currentCefr: estimatedLevel,
      },
    });

    return NextResponse.json({
      level: estimatedLevel,
      score: totalCorrect,
      total: totalQuestions,
      confidence,
      strengths,
      weaknesses,
      resultId: result.id,
    });
  } catch (error) {
    console.error('Error evaluating placement test:', error);
    return NextResponse.json({ error: 'Failed to evaluate test' }, { status: 500 });
  }
}
