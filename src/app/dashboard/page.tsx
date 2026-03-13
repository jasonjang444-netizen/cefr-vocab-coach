'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { CEFR_COLORS, CEFR_DESCRIPTIONS, calculateProgress } from '@/lib/cefr';

interface DashboardData {
  userLevel: { currentCefr: string; targetCefr: string; studyMinutes: number } | null;
  streak: number;
  wordsLearned: number;
  wordsInReview: number;
  avgQuizScore: number;
  totalSessions: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = (session?.user as Record<string, unknown>)?.id;
    if (!userId) return;

    fetch(`/api/dashboard?userId=${userId}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  if (loading) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }} className="animate-float">📊</div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const currentLevel = data?.userLevel?.currentCefr || 'A1';
  const targetLevel = data?.userLevel?.targetCefr || 'B1';
  const progress = calculateProgress(currentLevel, targetLevel, data?.wordsLearned || 0);

  return (
    <div className="bg-grid min-h-screen">
      {/* Top Nav */}
      <nav style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📚</div>
          <span style={{ fontWeight: '700', fontSize: '1.1rem' }} className="gradient-text">CEFR Coach</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{session?.user?.email}</span>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Welcome */}
        <div className="animate-fade-in" style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '6px' }}>
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}! 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Here&apos;s your learning progress</p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Current Level', value: currentLevel, color: CEFR_COLORS[currentLevel], sub: CEFR_DESCRIPTIONS[currentLevel], icon: '🎓' },
            { label: 'Target Level', value: targetLevel, color: CEFR_COLORS[targetLevel], sub: CEFR_DESCRIPTIONS[targetLevel], icon: '🎯' },
            { label: 'Study Streak', value: `${data?.streak || 0}`, color: '#f97316', sub: 'days', icon: '🔥' },
            { label: 'Words Learned', value: `${data?.wordsLearned || 0}`, color: '#22c55e', sub: 'total', icon: '📖' },
            { label: 'Quiz Accuracy', value: `${data?.avgQuizScore || 0}%`, color: '#6366f1', sub: 'average', icon: '📊' },
          ].map((stat, i) => (
            <div
              key={i}
              className="card animate-fade-in"
              style={{ padding: '24px', animationDelay: `${i * 0.1}s`, opacity: 0 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>{stat.label}</p>
                  <p style={{ fontSize: '1.8rem', fontWeight: '700', color: stat.color }}>{stat.value}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{stat.sub}</p>
                </div>
                <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="glass animate-fade-in" style={{ borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontWeight: '600' }}>Progress to {targetLevel}</span>
            <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>{progress}%</span>
          </div>
          <div className="progress-bar" style={{ height: '12px', borderRadius: '6px' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%`, borderRadius: '6px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: CEFR_COLORS[currentLevel], fontWeight: '600' }}>{currentLevel}</span>
            <span style={{ fontSize: '0.75rem', color: CEFR_COLORS[targetLevel], fontWeight: '600' }}>{targetLevel}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <Link href="/study" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0,
              }}>📖</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>Start Today&apos;s Study</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Learn new vocabulary for your level</p>
              </div>
            </div>
          </Link>

          <Link href="/quiz" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0,
              }}>📝</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>Take Daily Test</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Test your vocabulary knowledge</p>
              </div>
            </div>
          </Link>

          <Link href="/mistakes" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0,
              }}>🔄</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>Review Mistakes</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Strengthen weak vocabulary</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Links */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/progress" className="btn-secondary" style={{ textDecoration: 'none', padding: '10px 20px', fontSize: '0.85rem' }}>
            📊 View Progress
          </Link>
          <Link href="/placement-test" className="btn-secondary" style={{ textDecoration: 'none', padding: '10px 20px', fontSize: '0.85rem' }}>
            🔄 Retake Placement Test
          </Link>
        </div>
      </div>
    </div>
  );
}
