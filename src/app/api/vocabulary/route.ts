import { NextResponse } from 'next/server';
import { VOCABULARY_BANK } from '@/lib/vocabulary-data';
import { prisma } from '@/lib/prisma';

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const currentLevel = searchParams.get('currentLevel') || 'A1';
    const targetLevel = searchParams.get('targetLevel') || 'B1';
    const mode = searchParams.get('mode') || 'study';

    const currentIdx = CEFR_LEVELS.indexOf(currentLevel);
    const targetIdx = CEFR_LEVELS.indexOf(targetLevel);

    const studyLevels =
      mode === 'all'
        ? CEFR_LEVELS
        : CEFR_LEVELS.slice(Math.max(0, currentIdx), Math.max(0, targetIdx) + 1);

    const vocabCount = await prisma.vocabulary.count();
    if (vocabCount === 0) {
      await prisma.vocabulary.createMany({
        data: VOCABULARY_BANK.map((item) => ({
          word: item.word,
          partOfSpeech: item.partOfSpeech,
          meaning: item.meaning,
          meaningKo: item.meaningKo,
          example: item.example,
          exampleKo: item.exampleKo,
          collocations: item.collocations.join(', '),
          collocationsKo: item.collocationsKo?.join(', '),
          cefrLevel: item.cefrLevel,
        })),
      });
    }

    const learnedVocabIds = userId
      ? (
          await prisma.userVocabProgress.findMany({
            where: { userId, status: 'learned' },
            select: { vocabId: true },
          })
        ).map((progress) => progress.vocabId)
      : [];

    const vocabulary = await prisma.vocabulary.findMany({
      where: {
        cefrLevel: { in: studyLevels },
        ...(mode === 'study' && learnedVocabIds.length > 0 ? { id: { notIn: learnedVocabIds } } : {}),
      },
      include: {
        userProgress: userId ? { where: { userId } } : false,
      },
    });

    const shuffled = vocabulary.sort(() => Math.random() - 0.5);
    const result = mode === 'study' ? shuffled.slice(0, 10) : shuffled;

    return NextResponse.json({ vocabulary: result });
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
