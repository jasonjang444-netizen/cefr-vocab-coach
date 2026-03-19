import { NextResponse } from 'next/server';
import { VOCABULARY_BANK, VOCABULARY_WORKBOOK_OVERRIDES } from '@/lib/vocabulary-data';
import { prisma } from '@/lib/prisma';

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const STUDY_SESSION_SIZE = 10;
const STUDY_LEVEL_MIX = {
  previous: 2,
  current: 7,
  next: 1,
} as const;

const getWorkbookOverride = (word: string) => VOCABULARY_WORKBOOK_OVERRIDES[word.toLowerCase()];
const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

const toVocabularyRecord = (item: (typeof VOCABULARY_BANK)[number]) => ({
  ...(() => {
    const workbookOverride = getWorkbookOverride(item.word);

    return {
      meaningKo: workbookOverride?.meaningKo ?? item.meaningKo,
      example: workbookOverride?.example || item.example,
      exampleKo: workbookOverride?.exampleKo ?? item.exampleKo,
      collocations: workbookOverride?.collocations || item.collocations.join(', '),
    };
  })(),
  word: item.word,
  partOfSpeech: item.partOfSpeech,
  meaning: item.meaning,
  collocationsKo: item.collocationsKo?.join(', '),
  cefrLevel: item.cefrLevel,
});

async function ensureVocabularyBankSeeded() {
  const existingWords = await prisma.vocabulary.findMany({
    select: { word: true },
  });
  const existingWordSet = new Set(existingWords.map((item) => item.word.toLowerCase()));
  const missingVocabulary = VOCABULARY_BANK.filter(
    (item) => !existingWordSet.has(item.word.toLowerCase()),
  );

  if (missingVocabulary.length > 0) {
    await prisma.vocabulary.createMany({
      data: missingVocabulary.map(toVocabularyRecord),
    });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const currentLevel = searchParams.get('currentLevel') || 'A1';
    const targetLevel = searchParams.get('targetLevel') || 'B1';
    const mode = searchParams.get('mode') || 'study';

    const currentIdx = CEFR_LEVELS.indexOf(currentLevel);
    const targetIdx = CEFR_LEVELS.indexOf(targetLevel);
    const normalizedCurrentIdx = currentIdx >= 0 ? currentIdx : 0;
    const normalizedTargetIdx =
      targetIdx >= normalizedCurrentIdx ? targetIdx : normalizedCurrentIdx;
    const currentStudyLevel = CEFR_LEVELS[normalizedCurrentIdx];
    const previousStudyLevel = normalizedCurrentIdx > 0 ? CEFR_LEVELS[normalizedCurrentIdx - 1] : null;
    const nextStudyLevel =
      normalizedCurrentIdx < CEFR_LEVELS.length - 1 ? CEFR_LEVELS[normalizedCurrentIdx + 1] : null;

    const studyLevels =
      mode === 'all'
        ? CEFR_LEVELS
        : mode === 'study'
          ? [previousStudyLevel, currentStudyLevel, nextStudyLevel].filter(
              (level): level is string => Boolean(level),
            )
          : CEFR_LEVELS.slice(normalizedCurrentIdx, normalizedTargetIdx + 1);

    await ensureVocabularyBankSeeded();

    const vocabulary = await prisma.vocabulary.findMany({
      where: {
        cefrLevel: { in: studyLevels },
      },
      include: {
        userProgress: userId ? { where: { userId } } : false,
      },
    });

    const studyVocabulary =
      mode === 'study'
        ? (() => {
            const vocabularyPool = (() => {
              const unlearnedVocabulary = vocabulary.filter(
                (item) => !item.userProgress?.some((progress) => progress.status === 'learned'),
              );

              return unlearnedVocabulary.length > 0 ? unlearnedVocabulary : vocabulary;
            })();

            const currentLevelVocabulary = shuffle(
              vocabularyPool.filter((item) => item.cefrLevel === currentStudyLevel),
            );
            const previousLevelVocabulary = previousStudyLevel
              ? shuffle(vocabularyPool.filter((item) => item.cefrLevel === previousStudyLevel))
              : [];
            const nextLevelVocabulary = nextStudyLevel
              ? shuffle(vocabularyPool.filter((item) => item.cefrLevel === nextStudyLevel))
              : [];

            const mixedVocabulary = [
              ...currentLevelVocabulary.splice(0, STUDY_LEVEL_MIX.current),
              ...previousLevelVocabulary.splice(0, STUDY_LEVEL_MIX.previous),
              ...nextLevelVocabulary.splice(0, STUDY_LEVEL_MIX.next),
            ];

            if (mixedVocabulary.length < STUDY_SESSION_SIZE) {
              mixedVocabulary.push(
                ...[
                  ...currentLevelVocabulary,
                  ...previousLevelVocabulary,
                  ...nextLevelVocabulary,
                ].slice(0, STUDY_SESSION_SIZE - mixedVocabulary.length),
              );
            }

            return mixedVocabulary;
          })()
        : vocabulary;

    const vocabularyWithWorkbookData = studyVocabulary.map((item) => {
      const workbookOverride = getWorkbookOverride(item.word);

      if (!workbookOverride) {
        return item;
      }

      return {
        ...item,
        meaningKo: workbookOverride.meaningKo || item.meaningKo,
        example: workbookOverride.example || item.example,
        exampleKo: workbookOverride.exampleKo || item.exampleKo,
        collocations: workbookOverride.collocations || item.collocations,
      };
    });

    const shuffled = shuffle(vocabularyWithWorkbookData);
    const result = mode === 'study' ? shuffled.slice(0, STUDY_SESSION_SIZE) : shuffled;

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
