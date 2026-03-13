import { NextResponse } from 'next/server';
import { VOCABULARY_BANK } from '@/lib/vocabulary-data';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const level = searchParams.get('level') || 'B1';

    // Get words at or below the target level
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const levelIdx = levels.indexOf(level);
    const targetLevels = levels.slice(0, levelIdx + 1);

    // First seed vocabulary if empty
    const vocabCount = await prisma.vocabulary.count();
    if (vocabCount === 0) {
      await prisma.vocabulary.createMany({
        data: VOCABULARY_BANK.map((v) => ({
          word: v.word,
          partOfSpeech: v.partOfSpeech,
          meaning: v.meaning,
          example: v.example,
          collocations: v.collocations.join(', '),
          cefrLevel: v.cefrLevel,
        })),
      });
    }

    // Get vocabulary for the user's level range
    const vocabulary = await prisma.vocabulary.findMany({
      where: {
        cefrLevel: { in: targetLevels },
      },
      include: {
        userProgress: userId ? {
          where: { userId },
        } : false,
      },
      take: 10,
    });

    return NextResponse.json({ vocabulary });
  } catch (error) {
    console.error('Error fetching vocabulary:', error);
    return NextResponse.json({ error: 'Failed to fetch vocabulary' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, vocabId, status } = await request.json();

    if (!userId || !vocabId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const progress = await prisma.userVocabProgress.upsert({
      where: {
        userId_vocabId: { userId, vocabId },
      },
      create: {
        userId,
        vocabId,
        status,
        lastReviewed: new Date(),
      },
      update: {
        status,
        lastReviewed: new Date(),
      },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error('Error updating vocabulary progress:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
