'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  CEFR_COLORS,
  CEFR_DESCRIPTIONS,
  CEFR_LEVELS,
  getDifficulty,
  getLevelIndex,
  getRecommendedTarget,
  normalizeCefrLevel,
} from '@/lib/cefr';
import { useLanguage } from '@/components/language-context';

interface DashboardSnapshot {
  userLevel: {
    currentCefr: string;
    targetCefr: string;
  } | null;
}

const copyByLanguage = {
  en: {
    loading: 'Loading your target options...',
    step: 'Step 2 of onboarding',
    title: 'What level do you want to reach?',
    recommendedLead: 'Your current level is',
    recommend: 'We recommend aiming for',
    stretch:
      ', but you can set a bigger stretch goal if you want a longer-term challenge.',
    currentLevel: 'Current level',
    recommended: 'Recommended',
    belowCurrent: 'Below current',
    available: 'Available',
    difficulty: 'Goal difficulty',
    back: 'Back to Result',
    continue: 'Continue to Study Plan',
    saving: 'Saving Target...',
  },
  ko: {
    loading: '목표 레벨 옵션을 불러오는 중입니다...',
    step: '온보딩 2단계',
    title: '어느 레벨까지 도달하고 싶나요?',
    recommendedLead: '현재 레벨은',
    recommend: '추천 목표는',
    stretch: '이지만, 더 긴 도전을 원한다면 더 높은 목표도 선택할 수 있어요.',
    currentLevel: '현재 레벨',
    recommended: '추천',
    belowCurrent: '현재보다 낮음',
    available: '선택 가능',
    difficulty: '목표 난이도',
    back: '결과로 돌아가기',
    continue: '학습 플랜으로 이동',
    saving: '목표 저장 중...',
  },
} as const;

export default function SelectLevelPage() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const ui = copyByLanguage[language];
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('A1');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [router, status]);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('placementResult');
    if (storedResult) {
      const parsed = JSON.parse(storedResult) as { level?: string; recommendedTarget?: string };
      const level = normalizeCefrLevel(parsed.level);
      setCurrentLevel(level);
      setSelectedLevel(normalizeCefrLevel(parsed.recommendedTarget ?? getRecommendedTarget(level)));
      setHydrated(true);
      return;
    }

    const userId = (session?.user as Record<string, unknown> | undefined)?.id;
    if (!userId) {
      return;
    }

    fetch(`/api/dashboard?userId=${userId}`)
      .then((response) => response.json())
      .then((data: DashboardSnapshot) => {
        const level = normalizeCefrLevel(data.userLevel?.currentCefr);
        setCurrentLevel(level);
        setSelectedLevel(normalizeCefrLevel(data.userLevel?.targetCefr ?? getRecommendedTarget(level)));
        setHydrated(true);
      })
      .catch(() => setHydrated(true));
  }, [session]);

  const handleContinue = async () => {
    if (!selectedLevel) {
      return;
    }

    const userId = (session?.user as Record<string, unknown> | undefined)?.id;
    if (!userId) {
      router.replace('/login');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/user-level', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, targetCefr: selectedLevel }),
      });

      if (!response.ok) {
        throw new Error('Failed to save target level');
      }

      router.push('/study-plan');
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

  const recommendedLevel = getRecommendedTarget(currentLevel);

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '860px' }}>
        <div className="glass" style={{ borderRadius: '28px', padding: '34px', marginBottom: '20px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            {ui.step}
          </p>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '10px' }}>{ui.title}</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '720px' }}>
            {ui.recommendedLead}{' '}
            <strong style={{ color: CEFR_COLORS[currentLevel] }}>{currentLevel}</strong> ({CEFR_DESCRIPTIONS[currentLevel]}). {ui.recommend}{' '}
            <strong style={{ color: CEFR_COLORS[recommendedLevel] }}>{recommendedLevel}</strong>
            {ui.stretch}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '14px', marginBottom: '20px' }}>
          {CEFR_LEVELS.map((level) => {
            const isSelected = selectedLevel === level;
            const isBelowCurrent = getLevelIndex(level) < getLevelIndex(currentLevel);
            const isCurrent = level === currentLevel;
            const isRecommended = level === recommendedLevel;

            return (
              <button
                key={level}
                onClick={() => !isBelowCurrent && setSelectedLevel(level)}
                className="card"
                style={{
                  padding: '22px 14px',
                  textAlign: 'center',
                  cursor: isBelowCurrent ? 'not-allowed' : 'pointer',
                  opacity: isBelowCurrent ? 0.45 : 1,
                  border: isSelected ? `2px solid ${CEFR_COLORS[level]}` : '1px solid var(--border-color)',
                  background: isSelected ? `${CEFR_COLORS[level]}18` : 'var(--bg-card)',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: CEFR_COLORS[level], marginBottom: '4px' }}>{level}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', minHeight: '38px' }}>{CEFR_DESCRIPTIONS[level]}</div>
                <div style={{ marginTop: '10px', minHeight: '18px', fontSize: '0.72rem', color: isRecommended ? CEFR_COLORS[level] : 'var(--text-muted)', fontWeight: 700 }}>
                  {isCurrent ? ui.currentLevel : isRecommended ? ui.recommended : isBelowCurrent ? ui.belowCurrent : ui.available}
                </div>
              </button>
            );
          })}
        </div>

        <div className="glass" style={{ borderRadius: '24px', padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                {ui.difficulty}
              </p>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
                {currentLevel} to {selectedLevel || recommendedLevel}
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {getDifficulty(currentLevel, selectedLevel || recommendedLevel)}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => router.push('/placement-result')} className="btn-secondary" style={{ padding: '14px 22px' }}>
                {ui.back}
              </button>
              <button onClick={handleContinue} className="btn-primary" style={{ padding: '14px 22px' }} disabled={!selectedLevel || loading}>
                {loading ? ui.saving : ui.continue}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
