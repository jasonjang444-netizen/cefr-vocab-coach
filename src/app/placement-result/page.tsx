'use client';

import { startTransition, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CEFR_COLORS, CEFR_DESCRIPTIONS, getDifficulty, getRecommendedTarget, normalizeCefrLevel } from '@/lib/cefr';

interface PlacementResult {
  level: string;
  score: number;
  total: number;
  confidence: string;
  strengths: string[];
  weaknesses: string[];
  recommendedTarget?: string;
}

export default function PlacementResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<PlacementResult | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('placementResult');
    startTransition(() => {
      setResult(storedResult ? (JSON.parse(storedResult) as PlacementResult) : null);
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading your placement result...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="glass" style={{ borderRadius: '24px', padding: '28px', maxWidth: '520px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            We could not find your latest placement result.
          </p>
          <button onClick={() => router.push('/placement-test')} className="btn-primary" style={{ padding: '14px 24px' }}>
            Take Placement Test
          </button>
        </div>
      </div>
    );
  }

  const currentLevel = normalizeCefrLevel(result.level);
  const recommendedTarget = normalizeCefrLevel(result.recommendedTarget ?? getRecommendedTarget(currentLevel));
  const color = CEFR_COLORS[currentLevel];
  const description = CEFR_DESCRIPTIONS[currentLevel];
  const accuracy = Math.round((result.score / Math.max(1, result.total)) * 100);

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '860px' }}>
        <div className="glass" style={{ borderRadius: '28px', padding: '34px', marginBottom: '22px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            Placement result
          </p>
          <h1 style={{ fontSize: '2.3rem', fontWeight: 800, marginBottom: '12px' }}>Current level: {currentLevel}</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginBottom: '28px' }}>
            Your result suggests an overall <span style={{ color, fontWeight: 700 }}>{description}</span> vocabulary profile with <strong>{result.confidence.toLowerCase()}</strong> confidence.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div className="card" style={{ padding: '22px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '6px' }}>Correct answers</p>
              <p style={{ fontSize: '2rem', fontWeight: 800 }}>{result.score}/{result.total}</p>
            </div>
            <div className="card" style={{ padding: '22px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '6px' }}>Accuracy</p>
              <p style={{ fontSize: '2rem', fontWeight: 800 }}>{accuracy}%</p>
            </div>
            <div className="card" style={{ padding: '22px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '6px' }}>Recommended target</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: CEFR_COLORS[recommendedTarget] }}>{recommendedTarget}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '22px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px' }}>Strengths</h2>
            <div style={{ display: 'grid', gap: '10px' }}>
              {result.strengths.map((item) => (
                <div key={item} style={{ padding: '12px 14px', borderRadius: '14px', background: 'rgba(34, 197, 94, 0.1)', color: '#bbf7d0' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px' }}>Weak areas</h2>
            <div style={{ display: 'grid', gap: '10px' }}>
              {result.weaknesses.map((item) => (
                <div key={item} style={{ padding: '12px 14px', borderRadius: '14px', background: 'rgba(234, 179, 8, 0.12)', color: '#fde68a' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass" style={{ borderRadius: '24px', padding: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Next step
              </p>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '10px' }}>Choose the level you want to reach next.</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                The recommended step is <strong style={{ color: CEFR_COLORS[recommendedTarget] }}>{recommendedTarget}</strong>. {getDifficulty(currentLevel, recommendedTarget)}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => router.push('/placement-test')} className="btn-secondary" style={{ padding: '14px 22px' }}>
                Retake Test
              </button>
              <button onClick={() => router.push('/select-level')} className="btn-primary" style={{ padding: '14px 22px' }}>
                Choose Target Level
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
