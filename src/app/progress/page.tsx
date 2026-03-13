'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CEFR_LEVELS, CEFR_COLORS, CEFR_DESCRIPTIONS, calculateProgress } from '@/lib/cefr';

interface DashboardData {
  userLevel: { currentCefr: string; targetCefr: string } | null;
  streak: number;
  wordsLearned: number;
  wordsInReview: number;
  avgQuizScore: number;
  totalSessions: number;
  recentQuizzes: { score: number; total: number; date: string }[];
}

export default function ProgressPage() {
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
          <p style={{ color: 'var(--text-secondary)' }}>Loading progress data...</p>
        </div>
      </div>
    );
  }

  const currentLevel = data?.userLevel?.currentCefr || 'A1';
  const targetLevel = data?.userLevel?.targetCefr || 'B1';
  const progress = calculateProgress(currentLevel, targetLevel, data?.wordsLearned || 0);
  const quizzes = data?.recentQuizzes || [];

  return (
    <div className="bg-grid min-h-screen" style={{ padding: '24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <Link href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>← Dashboard</Link>
          <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Progress Tracking</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Your vocabulary learning journey</p>
        </div>

        {/* CEFR Level Progress */}
        <div className="glass animate-fade-in" style={{ borderRadius: '20px', padding: '32px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '24px' }}>CEFR Level Progress</h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            {CEFR_LEVELS.map((level, i) => {
              const isCurrentOrBelow = CEFR_LEVELS.indexOf(level) <= CEFR_LEVELS.indexOf(currentLevel as typeof CEFR_LEVELS[number]);
              const isCurrent = level === currentLevel;
              const isTarget = level === targetLevel;
              const color = CEFR_COLORS[level];

              return (
                <div key={level} style={{ flex: 1, textAlign: 'center' }}>
                  <div
                    style={{
                      height: '40px',
                      borderRadius: i === 0 ? '8px 0 0 8px' : i === 5 ? '0 8px 8px 0' : '0',
                      background: isCurrentOrBelow ? color : 'var(--bg-secondary)',
                      opacity: isCurrentOrBelow ? 1 : 0.3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      border: isTarget ? `2px dashed ${color}` : isCurrent ? `2px solid ${color}` : 'none',
                    }}
                  >
                    <span style={{ fontWeight: '700', fontSize: '0.85rem', color: isCurrentOrBelow ? 'white' : 'var(--text-muted)' }}>
                      {level}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {isCurrent ? 'Current' : isTarget ? 'Target' : CEFR_DESCRIPTIONS[level]}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Overall progress: <strong style={{ color: 'var(--accent-primary)' }}>{progress}%</strong>
            </span>
            <span style={{ color: CEFR_COLORS[currentLevel], fontSize: '0.9rem', fontWeight: '600' }}>
              {currentLevel} → {targetLevel}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Words Learned', value: data?.wordsLearned || 0, icon: '📖', color: '#22c55e' },
            { label: 'Words in Review', value: data?.wordsInReview || 0, icon: '🔄', color: '#eab308' },
            { label: 'Quiz Accuracy', value: `${data?.avgQuizScore || 0}%`, icon: '📊', color: '#6366f1' },
            { label: 'Study Streak', value: `${data?.streak || 0} days`, icon: '🔥', color: '#f97316' },
            { label: 'Total Sessions', value: data?.totalSessions || 0, icon: '📋', color: '#8b5cf6' },
            { label: 'Quizzes Taken', value: quizzes.length, icon: '📝', color: '#ec4899' },
          ].map((stat, i) => (
            <div
              key={i}
              className="card animate-fade-in"
              style={{ padding: '20px', animationDelay: `${i * 0.05}s`, opacity: 0 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '6px' }}>{stat.label}</p>
                  <p style={{ fontSize: '1.6rem', fontWeight: '700', color: stat.color }}>{stat.value}</p>
                </div>
                <span style={{ fontSize: '1.3rem' }}>{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quiz History */}
        <div className="glass animate-fade-in" style={{ borderRadius: '20px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>Recent Quiz Results</h2>

          {quizzes.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No quizzes taken yet. Take your first quiz to see results here.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quizzes.map((quiz, i) => {
                const pct = Math.round((quiz.score / quiz.total) * 100);
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', borderRadius: '10px', background: 'var(--bg-secondary)' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: `${pct >= 70 ? '#22c55e' : pct >= 50 ? '#eab308' : '#ef4444'}15`,
                      border: `2px solid ${pct >= 70 ? '#22c55e' : pct >= 50 ? '#eab308' : '#ef4444'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: pct >= 70 ? '#22c55e' : pct >= 50 ? '#eab308' : '#ef4444',
                      flexShrink: 0,
                    }}>
                      {pct}%
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{quiz.score}/{quiz.total} correct</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          {new Date(quiz.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="progress-bar" style={{ marginTop: '8px', height: '4px' }}>
                        <div style={{
                          height: '100%',
                          borderRadius: '2px',
                          width: `${pct}%`,
                          background: pct >= 70 ? '#22c55e' : pct >= 50 ? '#eab308' : '#ef4444',
                          transition: 'width 0.5s ease',
                        }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Vocabulary by Level */}
        <div className="glass animate-fade-in" style={{ borderRadius: '20px', padding: '28px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>Vocabulary by Level</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CEFR_LEVELS.map((level) => {
              const words = Math.floor(Math.random() * 15); // Placeholder
              const maxWords = 20;
              const barWidth = (words / maxWords) * 100;

              return (
                <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '32px', fontWeight: '600', color: CEFR_COLORS[level], fontSize: '0.9rem' }}>{level}</span>
                  <div style={{ flex: 1 }}>
                    <div className="progress-bar" style={{ height: '20px', borderRadius: '10px' }}>
                      <div style={{
                        height: '100%',
                        borderRadius: '10px',
                        width: `${barWidth}%`,
                        background: CEFR_COLORS[level],
                        transition: 'width 1s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '8px',
                      }}>
                        {words > 2 && (
                          <span style={{ fontSize: '0.7rem', fontWeight: '700', color: 'white' }}>{words}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span style={{ width: '50px', textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {words} words
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
