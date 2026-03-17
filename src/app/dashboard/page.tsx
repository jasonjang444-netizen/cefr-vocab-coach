'use client';

import { useEffect, useMemo, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CEFR_COLORS,
  CEFR_DESCRIPTIONS,
  calculateProgress,
  formatLevelJourney,
  normalizeCefrLevel,
} from '@/lib/cefr';

interface DashboardData {
  userLevel: {
    currentCefr: string;
    targetCefr: string;
    studyMinutes: number;
  } | null;
  placementResult: {
    confidence: string;
    strengths: string[];
    weaknesses: string[];
  } | null;
  studyPlan: {
    dailyNewWords: number;
    dailyReview: number;
    collocations: number;
    examples: number;
    miniQuiz: number;
    studyMinutes: number;
    focusAreas: string[];
    tagline: string;
  } | null;
  streak: number;
  wordsLearned: number;
  wordsInReview: number;
  avgQuizScore: number;
  totalSessions: number;
  weeklyStudyMinutes: number;
  weeklyWordsStudied: number;
  recommendedTarget: string;
}

const actionCards = [
  {
    href: '/study',
    title: "Start Today's Study",
    description: 'Work through your new words, examples, and collocations for today.',
    color: 'linear-gradient(135deg, #22c55e, #16a34a)',
  },
  {
    href: '/quiz',
    title: 'Take Daily Test',
    description: 'Reinforce what you studied with a short vocabulary quiz.',
    color: 'linear-gradient(135deg, #6366f1, #4f46e5)',
  },
  {
    href: '/mistakes',
    title: 'Review Mistakes',
    description: 'Return to weak words and strengthen the ones you missed before.',
    color: 'linear-gradient(135deg, #f97316, #ea580c)',
  },
];

export default function DashboardPage() {
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
          throw new Error('Failed to load dashboard');
        }
        return response.json();
      })
      .then((dashboardData: DashboardData) => {
        setData(dashboardData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  const firstName = useMemo(() => {
    const displayName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Learner';
    return displayName.split(' ')[0];
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Loading your dashboard...</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Preparing today&apos;s CEFR coach plan</p>
        </div>
      </div>
    );
  }

  const currentLevel = normalizeCefrLevel(data?.userLevel?.currentCefr);
  const targetLevel = normalizeCefrLevel(data?.userLevel?.targetCefr ?? data?.recommendedTarget);
  const progress = calculateProgress(currentLevel, targetLevel, data?.wordsLearned ?? 0);

  return (
    <div className="bg-grid min-h-screen">
      <nav style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)' }}>
        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/dashboard" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
              }}
            >
              C
            </div>
            <span className="gradient-text" style={{ fontWeight: 700, fontSize: '1.08rem' }}>
              CEFR Vocab Coach
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{session?.user?.email}</span>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="btn-secondary" style={{ padding: '10px 16px', fontSize: '0.9rem' }}>
              Log Out
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1180px', margin: '0 auto', padding: '28px 24px 40px' }}>
        <section className="animate-fade-in" style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Dashboard
          </p>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '8px' }}>Welcome back, {firstName}</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '760px' }}>
            Your vocabulary coach is focused on the path from <strong>{formatLevelJourney(currentLevel, targetLevel)}</strong>. Keep the streak going and chip away at the next level every day.
          </p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Current level', value: currentLevel, sub: CEFR_DESCRIPTIONS[currentLevel], color: CEFR_COLORS[currentLevel] },
            { label: 'Target level', value: targetLevel, sub: CEFR_DESCRIPTIONS[targetLevel], color: CEFR_COLORS[targetLevel] },
            { label: 'Study streak', value: `${data?.streak ?? 0} days`, sub: 'Consecutive active days', color: '#f97316' },
            { label: 'Words learned', value: `${data?.wordsLearned ?? 0}`, sub: 'Marked as learned', color: '#22c55e' },
            { label: 'Quiz accuracy', value: `${data?.avgQuizScore ?? 0}%`, sub: 'Average recent performance', color: '#6366f1' },
            { label: 'Weekly study time', value: `${data?.weeklyStudyMinutes ?? 0} min`, sub: 'Last 7 days', color: '#a855f7' },
          ].map((card) => (
            <div key={card.label} className="card" style={{ padding: '22px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '8px' }}>{card.label}</p>
              <p style={{ fontSize: '1.8rem', fontWeight: 800, color: card.color, marginBottom: '6px' }}>{card.value}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{card.sub}</p>
            </div>
          ))}
        </section>

        <section className="glass" style={{ borderRadius: '24px', padding: '28px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                CEFR progress
              </p>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Progress toward {targetLevel}</h2>
            </div>
            <p style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '1.1rem' }}>{progress}%</p>
          </div>

          <div className="progress-bar" style={{ height: '12px', marginBottom: '14px' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ color: CEFR_COLORS[currentLevel], fontWeight: 700 }}>{currentLevel}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{data?.wordsInReview ?? 0} words currently in review</span>
            <span style={{ color: CEFR_COLORS[targetLevel], fontWeight: 700 }}>{targetLevel}</span>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '24px' }}>
          <div className="glass" style={{ borderRadius: '24px', padding: '26px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Today&apos;s study plan
            </p>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>{data?.studyPlan?.tagline ?? 'Balanced daily session'}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '18px' }}>
              {data?.studyPlan?.studyMinutes ?? 20} minutes of focused practice for your current target.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px', marginBottom: '18px' }}>
              {[
                { label: 'New words', value: data?.studyPlan?.dailyNewWords ?? 0 },
                { label: 'Review', value: data?.studyPlan?.dailyReview ?? 0 },
                { label: 'Collocations', value: data?.studyPlan?.collocations ?? 0 },
                { label: 'Examples', value: data?.studyPlan?.examples ?? 0 },
              ].map((item) => (
                <div key={item.label} className="card" style={{ padding: '14px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '4px' }}>{item.label}</p>
                  <p style={{ fontSize: '1.3rem', fontWeight: 800 }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gap: '10px' }}>
              {(data?.studyPlan?.focusAreas ?? ['Build a balanced mix of new vocabulary and review.']).map((focus) => (
                <div key={focus} className="card" style={{ padding: '12px 14px' }}>
                  <p style={{ color: 'var(--text-secondary)' }}>{focus}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass" style={{ borderRadius: '24px', padding: '26px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Coach notes
            </p>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px' }}>Where to focus next</h2>
            <div style={{ display: 'grid', gap: '10px', marginBottom: '18px' }}>
              {(data?.placementResult?.weaknesses ?? ['Keep building consistent daily vocabulary review.']).map((item) => (
                <div key={item} className="card" style={{ padding: '12px 14px' }}>
                  <p style={{ color: 'var(--text-secondary)' }}>{item}</p>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Weekly output: <strong>{data?.weeklyWordsStudied ?? 0} words touched</strong> across study and review sessions.
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Total completed sessions: <strong>{data?.totalSessions ?? 0}</strong>
            </p>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '24px' }}>
          {actionCards.map((card) => (
            <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '24px', height: '100%' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: card.color,
                    marginBottom: '16px',
                  }}
                />
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>{card.title}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>{card.description}</p>
              </div>
            </Link>
          ))}
        </section>

        <section style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/progress" className="btn-secondary" style={{ textDecoration: 'none', padding: '12px 18px' }}>
            View Progress
          </Link>
          <Link href="/placement-test" className="btn-secondary" style={{ textDecoration: 'none', padding: '12px 18px' }}>
            Retake Placement Test
          </Link>
          <Link href="/study-plan" className="btn-secondary" style={{ textDecoration: 'none', padding: '12px 18px' }}>
            Adjust Study Plan
          </Link>
        </section>
      </main>
    </div>
  );
}
