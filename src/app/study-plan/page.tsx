'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CEFR_COLORS, formatLevelJourney, normalizeCefrLevel } from '@/lib/cefr';
import { buildStudyPlan, STUDY_TIME_OPTIONS } from '@/lib/study-plan';
import { useLanguage } from '@/components/language-context';

interface DashboardData {
  userLevel: {
    currentCefr: string;
    targetCefr: string;
  } | null;
  placementResult: {
    weaknesses: string[];
  } | null;
}

const copyByLanguage = {
  en: {
    loading: 'Preparing your study plan...',
    step: 'Step 3 of onboarding',
    title: 'How many minutes per day do you want to study?',
    intro:
      'Your plan will be personalized for',
    introTail:
      'We will balance new words, review, collocations, example sentences, and short quizzes around the time you can realistically keep up every day.',
    dailyTime: 'Daily time',
    newWords: 'New words',
    reviewWords: 'Review words',
    collocations: 'Collocations',
    examples: 'Examples',
    miniQuizzes: 'Mini quizzes',
    planDirection: 'Plan direction',
    focusAreas: 'Focus areas',
    tuned: 'This routine is tuned for the journey from',
    back: 'Back to Target Level',
    start: 'Start Learning',
    creating: 'Creating Plan...',
  },
  ko: {
    loading: '학습 플랜을 준비하는 중입니다...',
    step: '온보딩 3단계',
    title: '하루에 몇 분 공부하고 싶나요?',
    intro: '학습 플랜은',
    introTail:
      '기준으로 개인화됩니다. 매일 꾸준히 이어갈 수 있는 시간 안에서 새 단어, 복습, 연어, 예문, 짧은 퀴즈를 균형 있게 배치해드릴게요.',
    dailyTime: '하루 학습 시간',
    newWords: '새 단어',
    reviewWords: '복습 단어',
    collocations: '연어',
    examples: '예문',
    miniQuizzes: '미니 퀴즈',
    planDirection: '플랜 방향',
    focusAreas: '집중 영역',
    tuned: '이 루틴은',
    back: '목표 레벨로 돌아가기',
    start: '학습 시작',
    creating: '플랜 생성 중...',
  },
} as const;

export default function StudyPlanPage() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const ui = copyByLanguage[language];
  const router = useRouter();
  const [selectedMinutes, setSelectedMinutes] = useState<number>(20);
  const [loading, setLoading] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('A1');
  const [targetLevel, setTargetLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('B1');
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [router, status]);

  useEffect(() => {
    const userId = (session?.user as Record<string, unknown> | undefined)?.id;
    if (!userId) {
      return;
    }

    fetch(`/api/dashboard?userId=${userId}`)
      .then((response) => response.json())
      .then((data: DashboardData) => {
        setCurrentLevel(normalizeCefrLevel(data.userLevel?.currentCefr));
        setTargetLevel(normalizeCefrLevel(data.userLevel?.targetCefr));
        setWeaknesses(data.placementResult?.weaknesses ?? []);
        setHydrated(true);
      })
      .catch(() => setHydrated(true));
  }, [session]);

  const planPreview = useMemo(
    () =>
      buildStudyPlan(selectedMinutes, {
        currentLevel,
        targetLevel,
        weaknesses,
      }),
    [currentLevel, selectedMinutes, targetLevel, weaknesses]
  );

  const handleContinue = async () => {
    const userId = (session?.user as Record<string, unknown> | undefined)?.id;
    if (!userId) {
      router.replace('/login');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, studyMinutes: selectedMinutes }),
      });

      if (!response.ok) {
        throw new Error('Failed to create plan');
      }

      router.push('/dashboard');
    } catch {
      setLoading(false);
    }
  };

  if (status === 'loading' || !hydrated) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>{ui.loading}</p>
      </div>
    );
  }

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '980px' }}>
        <div className="glass" style={{ borderRadius: '28px', padding: '34px', marginBottom: '20px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            {ui.step}
          </p>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '10px' }}>{ui.title}</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '720px' }}>
            {ui.intro} <strong>{formatLevelJourney(currentLevel, targetLevel)}</strong>. {ui.introTail}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px', marginBottom: '20px' }}>
          {STUDY_TIME_OPTIONS.map((option) => {
            const isSelected = selectedMinutes === option.minutes;
            return (
              <button
                key={option.minutes}
                onClick={() => setSelectedMinutes(option.minutes)}
                className="card"
                style={{
                  padding: '22px',
                  textAlign: 'left',
                  border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-card)',
                  cursor: 'pointer',
                }}
              >
                <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  {ui.dailyTime}
                </p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>{option.label}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{option.tagline}</p>
              </button>
            );
          })}
        </div>

        <div className="glass" style={{ borderRadius: '24px', padding: '28px', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '22px' }}>
            {[
              { label: ui.newWords, value: planPreview.dailyNewWords },
              { label: ui.reviewWords, value: planPreview.dailyReview },
              { label: ui.collocations, value: planPreview.collocations },
              { label: ui.examples, value: planPreview.examples },
              { label: ui.miniQuizzes, value: planPreview.miniQuiz },
            ].map((item) => (
              <div key={item.label} className="card" style={{ padding: '18px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginBottom: '6px' }}>{item.label}</p>
                <p style={{ fontSize: '1.6rem', fontWeight: 800 }}>{item.value}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'start' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                {ui.planDirection}
              </p>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>{planPreview.tagline}</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                {ui.tuned} <span style={{ color: CEFR_COLORS[currentLevel], fontWeight: 700 }}>{currentLevel}</span> to <span style={{ color: CEFR_COLORS[targetLevel], fontWeight: 700 }}>{targetLevel}</span>.
              </p>
            </div>

            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                {ui.focusAreas}
              </p>
              <div style={{ display: 'grid', gap: '10px' }}>
                {planPreview.focusAreas.map((item) => (
                  <div key={item} className="card" style={{ padding: '12px 14px' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/select-level')} className="btn-secondary" style={{ padding: '14px 22px' }}>
            {ui.back}
          </button>
          <button onClick={handleContinue} className="btn-primary" style={{ padding: '14px 22px' }} disabled={loading}>
            {loading ? ui.creating : ui.start}
          </button>
        </div>
      </div>
    </div>
  );
}
