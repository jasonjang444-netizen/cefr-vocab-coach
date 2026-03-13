'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CEFR_LEVELS, CEFR_COLORS, CEFR_DESCRIPTIONS, getDifficulty, getLevelIndex } from '@/lib/cefr';

export default function SelectLevelPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState('A1');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('placementResult');
    if (stored) {
      const result = JSON.parse(stored);
      setCurrentLevel(result.level);
    }
  }, []);

  const handleContinue = async () => {
    if (!selectedLevel) return;
    setLoading(true);

    const userId = (session?.user as Record<string, unknown>)?.id;
    try {
      await fetch('/api/user-level', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, targetCefr: selectedLevel }),
      });
      router.push('/study-plan');
    } catch {
      setLoading(false);
    }
  };

  const currentIdx = getLevelIndex(currentLevel);
  const recommendedLevel = CEFR_LEVELS[Math.min(currentIdx + 1, 5)];

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>
          What level do you want to <span className="gradient-text">reach</span>?
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Current level: <span style={{ color: CEFR_COLORS[currentLevel], fontWeight: '600' }}>{currentLevel}</span> ({CEFR_DESCRIPTIONS[currentLevel]})
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '36px' }}>
          Recommended target: <strong style={{ color: CEFR_COLORS[recommendedLevel] }}>{recommendedLevel}</strong>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {CEFR_LEVELS.map((level) => {
            const isBelow = getLevelIndex(level) <= currentIdx;
            const isRecommended = level === recommendedLevel;
            const isSelected = level === selectedLevel;
            const color = CEFR_COLORS[level];

            return (
              <button
                key={level}
                onClick={() => !isBelow && setSelectedLevel(level)}
                className="card"
                style={{
                  padding: '24px 16px',
                  cursor: isBelow ? 'not-allowed' : 'pointer',
                  opacity: isBelow ? 0.4 : 1,
                  border: isSelected ? `2px solid ${color}` : '1px solid var(--border-color)',
                  background: isSelected ? `${color}15` : 'var(--bg-card)',
                  position: 'relative',
                  textAlign: 'center',
                }}
              >
                {isRecommended && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '2px 10px',
                    borderRadius: '100px',
                    background: color,
                    color: 'white',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                  }}>
                    Recommended
                  </div>
                )}
                <div style={{ fontSize: '2rem', fontWeight: '800', color, marginBottom: '4px' }}>{level}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{CEFR_DESCRIPTIONS[level]}</div>
                {isBelow && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>Already achieved</div>}
              </button>
            );
          })}
        </div>

        {selectedLevel && (
          <div className="glass animate-fade-in" style={{ borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>{currentLevel} → {selectedLevel}:</strong>{' '}
              {getDifficulty(currentLevel, selectedLevel)}
            </p>
          </div>
        )}

        <button
          onClick={handleContinue}
          className="btn-primary"
          style={{
            padding: '16px 48px',
            fontSize: '1.05rem',
            opacity: !selectedLevel ? 0.5 : 1,
            cursor: !selectedLevel ? 'not-allowed' : 'pointer',
          }}
          disabled={!selectedLevel || loading}
        >
          {loading ? 'Setting target...' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}
