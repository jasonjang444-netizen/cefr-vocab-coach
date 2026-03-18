'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useLanguage } from '@/components/language-context';

interface OnboardingSnapshot {
  placementResult: {
    level: string;
  } | null;
}

const contentByLanguage = {
  en: {
    loading: 'Loading your onboarding flow...',
    resuming: 'Resuming your onboarding...',
    badge: 'Step 1 of onboarding',
    welcome: 'Welcome,',
    intro:
      'Find your CEFR level, set your goal, and follow a personalized vocabulary plan. We will start by checking where you are now, then build a realistic daily routine that moves you toward your target.',
    placementLabel: 'Placement test',
    placementTitle: '20 questions',
    placementBody: 'A short vocabulary assessment covering A1 through C2.',
    getLabel: 'What you get',
    getTitle: 'Coach-style guidance',
    getBody: 'Current level, target recommendation, daily tasks, and review priorities.',
    steps: [
      'Take a CEFR placement test across vocabulary meaning, sentence completion, and usage.',
      'See your current level, confidence, strengths, and weak vocabulary areas.',
      'Choose the target level you want to reach and set your daily study time.',
      'Start a personalized vocabulary plan with quizzes, review, and progress tracking.',
    ],
    footer: 'The placement test takes about 5 minutes.',
    start: 'Start Placement Test',
  },
  ko: {
    loading: '온보딩 화면을 불러오는 중입니다...',
    resuming: '이전 온보딩 진행 상태를 불러오는 중입니다...',
    badge: '온보딩 1단계',
    welcome: '환영합니다,',
    intro:
      '현재 CEFR 레벨을 찾고, 목표를 설정한 뒤, 맞춤형 단어 플랜을 따라가게 됩니다. 먼저 지금 수준을 확인하고, 그다음 목표까지 갈 수 있는 현실적인 일일 루틴을 만들어드릴게요.',
    placementLabel: '레벨 테스트',
    placementTitle: '20문항',
    placementBody: 'A1부터 C2까지를 다루는 짧은 어휘 평가입니다.',
    getLabel: '제공 내용',
    getTitle: '코치형 가이드',
    getBody: '현재 레벨, 추천 목표, 일일 학습 과제, 복습 우선순위를 확인할 수 있어요.',
    steps: [
      '어휘 의미, 문장 완성, 사용법을 포함한 CEFR 레벨 테스트를 봅니다.',
      '현재 레벨, 신뢰도, 강점, 약한 어휘 영역을 확인합니다.',
      '도달하고 싶은 목표 레벨과 하루 학습 시간을 선택합니다.',
      '퀴즈, 복습, 진행도 추적이 포함된 맞춤형 단어 플랜을 시작합니다.',
    ],
    footer: '레벨 테스트는 약 5분 정도 걸립니다.',
    start: '레벨 테스트 시작',
  },
} as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const ui = contentByLanguage[language];
  const onboardingDone = Boolean((session?.user as Record<string, unknown> | undefined)?.onboardingDone);
  const userId = (session?.user as Record<string, unknown> | undefined)?.id as string | undefined;
  const [checkingProgress, setCheckingProgress] = useState(true);
  const shouldCheckProgress = status === 'authenticated' && !onboardingDone && Boolean(userId);
  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || (language === 'ko' ? '학습자' : 'Learner');

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
        <p style={{ color: 'var(--text-secondary)' }}>{checkingProgress ? ui.resuming : ui.loading}</p>
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
            {ui.badge}
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '14px' }}>
            {ui.welcome} <span className="gradient-text">{userName}</span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '640px', marginBottom: '28px' }}>
            {ui.intro}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '28px' }}>
            <div className="card" style={{ padding: '22px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                {ui.placementLabel}
              </p>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>{ui.placementTitle}</h2>
              <p style={{ color: 'var(--text-secondary)' }}>{ui.placementBody}</p>
            </div>

            <div className="card" style={{ padding: '22px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                {ui.getLabel}
              </p>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>{ui.getTitle}</h2>
              <p style={{ color: 'var(--text-secondary)' }}>{ui.getBody}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '14px', marginBottom: '32px' }}>
            {ui.steps.map((step, index) => (
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
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{ui.footer}</p>
            <button
              onClick={() => router.push('/placement-test')}
              className="btn-primary animate-pulse-glow"
              style={{ padding: '16px 26px', fontSize: '1rem' }}
            >
              {ui.start}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
