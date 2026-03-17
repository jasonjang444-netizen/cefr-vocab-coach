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

interface DashboardSnapshot {
  userLevel: {
    currentCefr: string;
    targetCefr: string;
  } | null;
}

export default function SelectLevelPage() {
  const { data: session, status } = useSession();
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
        <p style={{ color: 'var(--text-secondary)' }}>Loading your target options...</p>
      </div>
    );
  }

  const recommendedLevel = getRecommendedTarget(currentLevel);

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '860px' }}>
        <div className="glass" style={{ borderRadius: '28px', padding: '34px', marginBottom: '20px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            Step 2 of onboarding
          </p>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '10px' }}>What level do you want to reach?</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Your current level is <strong style={{ color: CEFR_COLORS[currentLevel] }}>{currentLevel}</strong> ({CEFR_DESCRIPTIONS[currentLevel]}). We recommend aiming for <strong style={{ color: CEFR_COLORS[recommendedLevel] }}>{recommendedLevel}</strong>, but you can set a bigger stretch goal if you want a longer-term challenge.
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
                  {isCurrent ? 'Current level' : isRecommended ? 'Recommended' : isBelowCurrent ? 'Below current' : 'Available'}
                </div>
              </button>
            );
          })}
        </div>

        <div className="glass" style={{ borderRadius: '24px', padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Goal difficulty
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
                Back to Result
              </button>
              <button onClick={handleContinue} className="btn-primary" style={{ padding: '14px 22px' }} disabled={!selectedLevel || loading}>
                {loading ? 'Saving Target...' : 'Continue to Study Plan'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
