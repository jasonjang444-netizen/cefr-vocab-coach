'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CEFR_COLORS, CEFR_DESCRIPTIONS, CEFR_LEVELS, calculateProgress, normalizeCefrLevel } from '@/lib/cefr';

interface DashboardData {
  userLevel: { currentCefr: string; targetCefr: string } | null;
  streak: number;
  wordsLearned: number;
  wordsInReview: number;
  difficultWords: number;
  avgQuizScore: number;
  totalSessions: number;
  weeklyStudyMinutes: number;
  weeklyWordsStudied: number;
  totalWordsTracked: number;
  recentQuizzes: { score: number; total: number; date: string; percentage: number }[];
  studyActivity: { label: string; minutes: number; words: number }[];
  quizPerformance: { label: string; score: number }[];
  vocabularyByLevel: { level: string; learned: number; review: number; difficult: number; total: number }[];
}

export default function ProgressPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [router, status]);

  useEffect(() => {
    const onboardingDone = Boolean((session?.user as Record<string, unknown> | undefined)?.onboardingDone);
    if (status === 'authenticated' && !onboardingDone) {
      router.replace('/onboarding');
    }
  }, [router, session, status]);

  useEffect(() => {
    const userId = (session?.user as Record<string, unknown> | undefined)?.id;
    if (!userId) {
      return;
    }

    fetch(`/api/dashboard?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load progress');
        }
        return response.json();
      })
      .then((dashboardData: DashboardData) => {
        setData(dashboardData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading progress data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="glass" style={{ borderRadius: '24px', padding: '28px', maxWidth: '520px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>We could not load your progress yet.</p>
          <Link href="/dashboard" className="btn-primary" style={{ textDecoration: 'none', padding: '14px 24px' }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentLevel = normalizeCefrLevel(data.userLevel?.currentCefr);
  const targetLevel = normalizeCefrLevel(data.userLevel?.targetCefr);
  const progress = calculateProgress(currentLevel, targetLevel, data.wordsLearned);

  return (
    <div className="bg-grid min-h-screen" style={{ padding: '24px' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <Link href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-block', marginBottom: '10px' }}>
              Back to Dashboard
            </Link>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>Progress Tracking</h1>
            <p style={{ color: 'var(--text-secondary)' }}>See how your daily practice is moving you from your current level to your target.</p>
          </div>
          <div className="glass" style={{ borderRadius: '20px', padding: '18px 20px', minWidth: '220px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '6px' }}>CEFR path</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 800 }}>{currentLevel} to {targetLevel}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{progress}% progress toward target</p>
          </div>
        </div>

        <div className="glass" style={{ borderRadius: '24px', padding: '28px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {CEFR_LEVELS.map((level, index) => {
              const isCompleted = index <= CEFR_LEVELS.indexOf(currentLevel);
              const isCurrent = level === currentLevel;
              const isTarget = level === targetLevel;

              return (
                <div key={level} style={{ flex: 1, minWidth: '88px', textAlign: 'center' }}>
                  <div
                    style={{
                      height: '42px',
                      borderRadius: index === 0 ? '10px 0 0 10px' : index === CEFR_LEVELS.length - 1 ? '0 10px 10px 0' : '0',
                      background: isCompleted ? CEFR_COLORS[level] : 'var(--bg-secondary)',
                      opacity: isCompleted ? 1 : 0.35,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      border: isCurrent ? '2px solid rgba(255,255,255,0.9)' : isTarget ? `2px dashed ${CEFR_COLORS[level]}` : 'none',
                    }}
                  >
                    {level}
                  </div>
                  <div style={{ marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {isCurrent ? 'Current' : isTarget ? 'Target' : CEFR_DESCRIPTIONS[level]}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="progress-bar" style={{ height: '12px' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Words learned', value: data.wordsLearned, color: '#22c55e' },
            { label: 'Words in review', value: data.wordsInReview, color: '#eab308' },
            { label: 'Difficult words', value: data.difficultWords, color: '#f97316' },
            { label: 'Quiz accuracy', value: `${data.avgQuizScore}%`, color: '#6366f1' },
            { label: 'Study streak', value: `${data.streak} days`, color: '#ec4899' },
            { label: 'Weekly study time', value: `${data.weeklyStudyMinutes} min`, color: '#a855f7' },
          ].map((item) => (
            <div key={item.label} className="card" style={{ padding: '20px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginBottom: '8px' }}>{item.label}</p>
              <p style={{ fontSize: '1.7rem', fontWeight: 800, color: item.color }}>{item.value}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px', marginBottom: '24px' }}>
          <div className="glass" style={{ borderRadius: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Vocabulary Growth</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Words touched each day through study and review sessions.</p>
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer>
                <AreaChart data={data.studyActivity}>
                  <defs>
                    <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={32} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(148,163,184,0.18)', borderRadius: 12 }} />
                  <Area type="monotone" dataKey="words" stroke="#6366f1" fill="url(#studyGradient)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass" style={{ borderRadius: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Quiz Performance</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Recent quiz percentages so you can see your retention trend.</p>
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer>
                <BarChart data={data.quizPerformance}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={32} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(148,163,184,0.18)', borderRadius: 12 }} />
                  <Bar dataKey="score" fill="#22c55e" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
          <div className="glass" style={{ borderRadius: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Words by CEFR Level</h2>
            <div style={{ display: 'grid', gap: '14px' }}>
              {data.vocabularyByLevel.map((item) => {
                const total = Math.max(1, item.total);
                const learnedPct = Math.round((item.learned / total) * 100);
                const reviewPct = Math.round((item.review / total) * 100);
                const difficultPct = Math.max(0, 100 - learnedPct - reviewPct);

                return (
                  <div key={item.level}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', gap: '12px', flexWrap: 'wrap' }}>
                      <span style={{ color: CEFR_COLORS[normalizeCefrLevel(item.level)], fontWeight: 800 }}>{item.level}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.total} tracked words</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '6px' }}>
                      <div style={{ height: '10px', borderRadius: '999px', background: '#22c55e', opacity: item.learned ? 1 : 0.15, width: `${Math.max(6, learnedPct)}%` }} />
                      <div style={{ height: '10px', borderRadius: '999px', background: '#eab308', opacity: item.review ? 1 : 0.15, width: `${Math.max(6, reviewPct)}%` }} />
                      <div style={{ height: '10px', borderRadius: '999px', background: '#f97316', opacity: item.difficult ? 1 : 0.15, width: `${Math.max(6, difficultPct)}%` }} />
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      Learned {item.learned} • Review {item.review} • Difficult {item.difficult}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass" style={{ borderRadius: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Recent Quiz Results</h2>
            {data.recentQuizzes.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No quizzes taken yet. Once you start daily tests, your recent results will show up here.</p>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {data.recentQuizzes.map((quiz) => (
                  <div key={`${quiz.date}-${quiz.score}-${quiz.total}`} className="card" style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 700 }}>{quiz.score}/{quiz.total} correct</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{new Date(quiz.date).toLocaleDateString()}</span>
                    </div>
                    <div className="progress-bar" style={{ height: '8px', marginBottom: '6px' }}>
                      <div className="progress-bar-fill" style={{ width: `${quiz.percentage}%` }} />
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{quiz.percentage}% score</p>
                  </div>
                ))}
              </div>
            )}

            <div className="card" style={{ padding: '18px', marginTop: '18px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '6px' }}>Overall totals</p>
              <p style={{ color: 'var(--text-secondary)' }}>Tracked vocabulary: <strong style={{ color: 'var(--text-primary)' }}>{data.totalWordsTracked}</strong></p>
              <p style={{ color: 'var(--text-secondary)' }}>Weekly words studied: <strong style={{ color: 'var(--text-primary)' }}>{data.weeklyWordsStudied}</strong></p>
              <p style={{ color: 'var(--text-secondary)' }}>Study sessions completed: <strong style={{ color: 'var(--text-primary)' }}>{data.totalSessions}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
