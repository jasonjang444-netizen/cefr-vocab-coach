import { NextResponse } from 'next/server';
import { VOCABULARY_BANK } from '@/lib/vocabulary-data';
import { prisma } from '@/lib/prisma';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  word: string;
  type: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateQuizQuestions(level: string): QuizQuestion[] {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const levelIdx = levels.indexOf(level);
  const targetLevels = levels.slice(0, levelIdx + 1);

  const levelWords = VOCABULARY_BANK.filter((w) => targetLevels.includes(w.cefrLevel));
  const selectedWords = shuffleArray(levelWords).slice(0, 10);

  const questions: QuizQuestion[] = [];

  selectedWords.forEach((word, index) => {
    const otherWords = VOCABULARY_BANK.filter((w) => w.word !== word.word);
    const distractors = shuffleArray(otherWords).slice(0, 3);

    if (index % 3 === 0) {
      // Multiple choice - meaning
      const options = shuffleArray([
        word.meaning,
        ...distractors.map((d) => d.meaning),
      ]);
      questions.push({
        question: `What does "${word.word}" mean?`,
        options,
        correctAnswer: options.indexOf(word.meaning),
        word: word.word,
        type: 'meaning',
      });
    } else if (index % 3 === 1) {
      // Fill in the blank
      const blank = word.example.replace(new RegExp(word.word, 'gi'), '___');
      const options = shuffleArray([
        word.word,
        ...distractors.map((d) => d.word),
      ]);
      questions.push({
        question: blank,
        options,
        correctAnswer: options.indexOf(word.word),
        word: word.word,
        type: 'fill-blank',
      });
    } else {
      // Choose correct usage
      const correctSentence = word.example;
      const wrongSentences = distractors.map((d) =>
        d.example.replace(new RegExp(d.word, 'gi'), word.word)
      );
      const options = shuffleArray([correctSentence, ...wrongSentences]);
      questions.push({
        question: `Which sentence correctly uses "${word.word}"?`,
        options,
        correctAnswer: options.indexOf(correctSentence),
        word: word.word,
        type: 'usage',
      });
    }
  });

  return questions;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level') || 'B1';
    const questions = generateQuizQuestions(level);
    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, score, total, answers } = await request.json();

    if (!userId || score === undefined || !total) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await prisma.quizResult.create({
      data: {
        userId,
        score,
        total,
        answers: JSON.stringify(answers || []),
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json({ error: 'Failed to save quiz result' }, { status: 500 });
  }
}
