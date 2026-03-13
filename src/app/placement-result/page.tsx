'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CEFR_COLORS, CEFR_DESCRIPTIONS } from '@/lib/cefr';

interface PlacementResult {
  level: string;
  score: number;
  total: number;
  confidence: string;
  strengths: string[];
  weaknesses: string[];
}

export default function PlacementResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<PlacementResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('placementResult');
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  if (!result) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading results...</p>
        </div>
      </div>
    );
  }

  const color = CEFR_COLORS[result.level] || '#6366f1';
  const description = CEFR_DESCRIPTIONS[result.level] || '';
  const accuracy = Math.round((result.score / result.total) * 100);

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '560px', textAlign: 'center' }}>
        {/* Celebration */}
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>

        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>Test Complete!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '36px' }}>Here are your results</p>

        {/* Level Result Card */}
        <div className="glass" style={{ borderRadius: '20px', padding: '40px', marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Your Current Level</p>

          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: `4px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            background: `${color}15`,
          }}>
            <span style={{ fontSize: '2.5rem', fontWeight: '800', color }}>{result.level}</span>
          </div>

          <p style={{ fontSize: '1.2rem', fontWeight: '600', color, marginBottom: '4px' }}>{description}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Confidence: {result.confidence}</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
            <div>
              <p style={{ fontSize: '1.8rem', fontWeight: '700' }}>{result.score}/{result.total}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Correct Answers</p>
            </div>
            <div>
              <p style={{ fontSize: '1.8rem', fontWeight: '700' }}>{accuracy}%</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Accuracy</p>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div className="card" style={{ padding: '20px', textAlign: 'left' }}>
            <p style={{ color: 'var(--success)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>💪 Strengths</p>
            {result.strengths.map((s, i) => (
              <p key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>• {s}</p>
            ))}
          </div>
          <div className="card" style={{ padding: '20px', textAlign: 'left' }}>
            <p style={{ color: 'var(--warning)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>🎯 Areas to Improve</p>
            {result.weaknesses.map((w, i) => (
              <p key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>• {w}</p>
            ))}
          </div>
        </div>

        <button
          onClick={() => router.push('/select-level')}
          className="btn-primary animate-pulse-glow"
          style={{ padding: '16px 48px', fontSize: '1.1rem' }}
        >
          Choose Your Target Level →
        </button>
      </div>
    </div>
  );
}
