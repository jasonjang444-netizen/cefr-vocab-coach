'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const onboardingSteps = [
  'Take a CEFR placement test across vocabulary meaning, sentence completion, and usage.',
  'See your current level, confidence, strengths, and weak vocabulary areas.',
  'Choose the target level you want to reach and set your daily study time.',
  'Start a personalized vocabulary plan with quizzes, review, and progress tracking.',
];

interface OnboardingSnapshot {
  placementResult: {
    level: string;
  } | null;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const onboardingDone = Boolean((session?.user as Record<string, unknown> | undefined)?.onboardingDone);
  const userId = (session?.user as Record<string, unknown> | undefined)?.id as string | undefined;
  const [checkingProgress, setCheckingProgress] = useState(true);
  const shouldCheckProgress = status === 'authenticated' && !onboardingDone && Boolean(userId);
  const userName =
    session?.user?.name ||
    session?.user?.email?.split('@')[0] ||
    'Learner';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [router, status]);

  useEffect(() => {
    if (status === 'authenticated' && onboardingDone) {
      router.replace('/dashboard');
    }
  }, [onboardingDone, router, status]);

  useEffect(() => {
    if (!shouldCheckProgress) {
      return;
    }

    let active = true;

    fetch(`/api/dashboard?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load onboarding progress');
        }

        return response.json() as Promise<OnboardingSnapshot>;
      })
      .then((data) => {
        if (!active) {
          return;
        }

        if (data.placementResult) {
          router.replace('/select-level');
          return;
        }

        setCheckingProgress(false);
      })
      .catch(() => {
        if (active) {
          setCheckingProgress(false);
        }
      });

    return () => {
      active = false;
    };
  }, [router, shouldCheckProgress, userId]);

  if (status === 'loading' || (shouldCheckProgress && checkingProgress)) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          {checkingProgress ? 'Resuming your onboarding...' : 'Loading your onboarding flow...'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '760px' }}>
        <div className="glass" style={{ borderRadius: '28px', padding: '36px' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '8px 14px',
              borderRadius: '999px',
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              color: 'var(--accent-primary)',
              fontSize: '0.82rem',
              marginBottom: '20px',
            }}
          >
            Step 1 of onboarding
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '14px' }}>
            Welcome, <span className="gradient-text">{userName}</span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '640px', marginBottom: '28px' }}>
            Find your CEFR level, set your goal, and follow a personalized vocabulary plan. We will start by checking where you are now, then build a realistic daily routine that moves you toward your target.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '28px' }}>
            <div className="card" style={{ padding: '22px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                Placement test
              </p>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>20 questions</h2>
              <p style={{ color: 'var(--text-secondary)' }}>A short vocabulary assessment covering A1 through C2.</p>
            </div>

            <div className="card" style={{ padding: '22px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                What you get
              </p>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>Coach-style guidance</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Current level, target recommendation, daily tasks, and review priorities.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '14px', marginBottom: '32px' }}>
            {onboardingSteps.map((step, index) => (
              <div key={step} className="card" style={{ padding: '16px 18px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    minWidth: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    background: 'var(--accent-gradient-subtle)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  {index + 1}
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>{step}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>The placement test takes about 5 minutes.</p>
            <button
              onClick={() => router.push('/placement-test')}
              className="btn-primary animate-pulse-glow"
              style={{ padding: '16px 26px', fontSize: '1rem' }}
            >
              Start Placement Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
