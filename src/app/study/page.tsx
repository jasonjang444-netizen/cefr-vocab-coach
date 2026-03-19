'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CEFR_COLORS, CefrLevel } from '@/lib/cefr';
import { useLanguage } from '@/components/language-context';

interface VocabItem {
  id: string;
  word: string;
  partOfSpeech: string;
  meaning: string;
  meaningKo?: string | null;
  example: string;
  exampleKo?: string | null;
  collocations: string;
  collocationsKo?: string | null;
  cefrLevel: CefrLevel;
  userProgress?: { status: string }[];
}

const copyByLanguage = {
  en: {
    loading: "Loading today's vocabulary...",
    emptyTitle: 'No words available',
    completeTitle: 'Session Complete!',
    emptyBody: 'There are no study words available for your current level right now.',
    completeBody: (count: number) => `You studied ${count} words today. Great work!`,
    quiz: 'Take a Quiz',
    back: 'Back to Dashboard',
    dashboard: 'Dashboard',
    reveal: 'Tap to reveal details',
    session: 'Today\'s Study',
    englishMeaning: 'English Meaning',
    koreanMeaning: 'Korean Meaning',
    englishExample: 'English Example',
    koreanExample: 'Korean Translation',
    collocations: 'Collocations',
    known: 'Known',
    difficult: 'Difficult',
    review: 'Review Later',
    koreanPending: 'Korean support is not available for this word yet.',
    languageEnglish: 'EN',
    languageKorean: 'KO',
    bilingualHint: 'Show Korean meaning and translated example sentence',
  },
  ko: {
    loading: '오늘의 단어를 불러오는 중입니다...',
    emptyTitle: '학습할 단어가 없어요',
    completeTitle: '학습 완료!',
    emptyBody: '현재 레벨에서 바로 학습할 단어가 없어요.',
    completeBody: (count: number) => `오늘 ${count}개의 단어를 학습했어요. 정말 잘했어요!`,
    quiz: '퀴즈 풀기',
    back: '대시보드로',
    dashboard: '대시보드',
    reveal: '탭해서 뜻과 예문 보기',
    session: '오늘의 학습',
    englishMeaning: '영어 뜻',
    koreanMeaning: '한국어 뜻',
    englishExample: '영어 예문',
    koreanExample: '한국어 해석',
    collocations: '연어',
    known: '알아요',
    difficult: '어려워요',
    review: '다시 볼래요',
    koreanPending: '이 단어의 한국어 정보는 아직 준비되지 않았어요.',
    languageEnglish: 'EN',
    languageKorean: 'KO',
    bilingualHint: '한국어 뜻과 예문 해석 보기',
  },
} as const;

export default function StudyPage() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const [vocabulary, setVocabulary] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [studied, setStudied] = useState(0);

  useEffect(() => {
    const userId = (session?.user as Record<string, unknown> | undefined)?.id;
    if (!userId) {
      return;
    }

    fetch(`/api/dashboard?userId=${userId}`)
      .then((response) => response.json())
      .then((dashboardData) => {
        const currentLevel = dashboardData?.userLevel?.currentCefr || 'A1';
        const targetLevel = dashboardData?.userLevel?.targetCefr || currentLevel;
        return fetch(`/api/vocabulary?userId=${userId}&currentLevel=${currentLevel}&targetLevel=${targetLevel}&mode=study`);
      })
      .then((response) => response.json())
      .then((data) => {
        setVocabulary(data.vocabulary || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  const markWord = async (wordStatus: string) => {
    const userId = (session?.user as Record<string, unknown> | undefined)?.id;
    const word = vocabulary[currentIndex];

    if (userId && word) {
      void fetch('/api/vocabulary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, vocabId: word.id, status: wordStatus }),
      });
    }

    setStudied((value) => value + 1);
    setShowMeaning(false);

    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex((value) => value + 1);
    } else {
      setCompleted(true);
    }
  };

  const ui = copyByLanguage[language];

  if (status === 'loading' || loading) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>{ui.loading}</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="glass" style={{ borderRadius: '24px', padding: '28px', maxWidth: '520px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '18px' }}>
            {language === 'ko' ? '학습을 계속하려면 로그인해주세요.' : 'Please log in to continue your study session.'}
          </p>
          <Link href="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '14px 22px' }}>
            {language === 'ko' ? '로그인' : 'Log In'}
          </Link>
        </div>
      </div>
    );
  }

  if (completed || vocabulary.length === 0) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="animate-fade-in" style={{ textAlign: 'center', maxWidth: '540px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
            {vocabulary.length === 0 ? ui.emptyTitle : ui.completeTitle}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>
            {vocabulary.length === 0 ? ui.emptyBody : ui.completeBody(studied)}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/quiz" className="btn-primary" style={{ textDecoration: 'none' }}>{ui.quiz}</Link>
            <Link href="/dashboard" className="btn-secondary" style={{ textDecoration: 'none' }}>{ui.back}</Link>
          </div>
        </div>
      </div>
    );
  }

  const word = vocabulary[currentIndex];
  const levelColor = CEFR_COLORS[word.cefrLevel] || '#6366f1';
  const progress = Math.round(((currentIndex + 1) / vocabulary.length) * 100);
  const displayMeaningKo = word.meaningKo?.trim() || '';
  const displayExampleKo = word.exampleKo?.trim() || '';
  const displayCollocations = (language === 'ko' && word.collocationsKo ? word.collocationsKo : word.collocations)
    .split(', ')
    .filter(Boolean);
  const missingKoreanSupport = language === 'ko' && !displayMeaningKo && !displayExampleKo;

  return (
    <div className="bg-grid min-h-screen" style={{ padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div>
            <Link href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block', marginBottom: '8px' }}>
              {ui.dashboard}
            </Link>
            <h1 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '6px' }}>{ui.session}</h1>
            <p style={{ color: 'var(--text-secondary)' }}>{currentIndex + 1} / {vocabulary.length}</p>
          </div>

          <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{ui.bilingualHint}</span>
        </div>

        <div className="progress-bar" style={{ marginBottom: '24px', height: '10px' }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div
          className="glass animate-fade-in"
          style={{
            borderRadius: '28px',
            padding: '32px',
            marginBottom: '20px',
            cursor: 'pointer',
          }}
          onClick={() => setShowMeaning((value) => !value)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: '999px',
                  border: `1px solid ${levelColor}`,
                  color: levelColor,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                }}
              >
                {word.cefrLevel}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{word.partOfSpeech}</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>{progress}%</span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: showMeaning ? '22px' : '0' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
              {language === 'ko' ? 'English Word' : 'Vocabulary Card'}
            </p>
            <h2 style={{ fontSize: 'clamp(2.2rem, 6vw, 3rem)', fontWeight: 800, marginBottom: '10px' }}>{word.word}</h2>
            {showMeaning && language === 'ko' && (
              <div className="card" style={{ maxWidth: '520px', margin: '0 auto', padding: '14px 16px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '6px' }}>{ui.koreanMeaning}</p>
                <p style={{ fontSize: '1.15rem', fontWeight: 700 }}>{displayMeaningKo || ui.koreanPending}</p>
              </div>
            )}
          </div>

          {!showMeaning ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{ui.reveal}</p>
          ) : (
            <div className="animate-fade-in">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                <div className="card" style={{ padding: '16px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{ui.englishMeaning}</p>
                  <p style={{ lineHeight: 1.7 }}>{word.meaning}</p>
                </div>
                <div className="card" style={{ padding: '16px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{ui.koreanMeaning}</p>
                  <p style={{ lineHeight: 1.7 }}>{displayMeaningKo || ui.koreanPending}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                <div className="card" style={{ padding: '16px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{ui.englishExample}</p>
                  <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>&ldquo;{word.example}&rdquo;</p>
                </div>
                <div className="card" style={{ padding: '16px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{ui.koreanExample}</p>
                  <p style={{ lineHeight: 1.8 }}>{displayExampleKo || ui.koreanPending}</p>
                </div>
              </div>

              <div className="card" style={{ padding: '16px', marginBottom: missingKoreanSupport ? '14px' : 0 }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{ui.collocations}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {displayCollocations.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '999px',
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: 'var(--accent-primary)',
                        fontSize: '0.84rem',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {missingKoreanSupport && (
                <div style={{ padding: '14px 16px', borderRadius: '16px', background: 'rgba(234, 179, 8, 0.12)', border: '1px solid rgba(234, 179, 8, 0.2)', color: '#fde68a' }}>
                  {ui.koreanPending}
                </div>
              )}
            </div>
          )}
        </div>

        {showMeaning && (
          <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            {[
              { label: ui.known, status: 'learned', color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)' },
              { label: ui.difficult, status: 'difficult', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)' },
              { label: ui.review, status: 'review', color: '#eab308', background: 'rgba(234, 179, 8, 0.1)', border: 'rgba(234, 179, 8, 0.3)' },
            ].map((action) => (
              <button
                key={action.status}
                onClick={() => void markWord(action.status)}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  border: `1px solid ${action.border}`,
                  background: action.background,
                  color: action.color,
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

