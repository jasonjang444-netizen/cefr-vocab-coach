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
import { useLanguage } from '@/components/language-context';

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

const contentByLanguage = {
  en: {
    loading: 'Loading your dashboard...',
    loadingSub: "Preparing today's CEFR coach plan",
    logout: 'Log Out',
    section: 'Dashboard',
    welcome: 'Welcome back,',
    intro: (journey: string) =>
      `Your vocabulary coach is focused on the path from ${journey}. Keep the streak going and chip away at the next level every day.`,
    stats: {
      currentLevel: 'Current level',
      targetLevel: 'Target level',
      streak: 'Study streak',
      streakSub: 'Consecutive active days',
      wordsLearned: 'Words learned',
      wordsLearnedSub: 'Marked as learned',
      quizAccuracy: 'Quiz accuracy',
      quizAccuracySub: 'Average recent performance',
      weeklyTime: 'Weekly study time',
      weeklyTimeSub: 'Last 7 days',
      days: 'days',
      min: 'min',
    },
    progressSection: 'CEFR progress',
    progressTitle: (target: string) => `Progress toward ${target}`,
    wordsInReview: (count: number) => `${count} words currently in review`,
    todayPlan: "Today's study plan",
    balancedSession: 'Balanced daily session',
    focusedPractice: (minutes: number) => `${minutes} minutes of focused practice for your current target.`,
    newWords: 'New words',
    review: 'Review',
    collocations: 'Collocations',
    examples: 'Examples',
    defaultFocus: 'Build a balanced mix of new vocabulary and review.',
    coachNotes: 'Coach notes',
    focusNext: 'Where to focus next',
    defaultWeakness: 'Keep building consistent daily vocabulary review.',
    weeklyOutput: (count: number) => `Weekly output: ${count} words touched across study and review sessions.`,
    totalSessions: (count: number) => `Total completed sessions: ${count}`,
    actions: [
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
    ],
    viewProgress: 'View Progress',
    retakePlacement: 'Retake Placement Test',
    adjustPlan: 'Adjust Study Plan',
  },
  ko: {
    loading: '대시보드를 불러오는 중입니다...',
    loadingSub: '오늘의 CEFR 코치 플랜을 준비하고 있어요',
    logout: '로그아웃',
    section: '대시보드',
    welcome: '다시 오신 걸 환영해요,',
    intro: (journey: string) =>
      `당신의 단어 코치는 ${journey} 경로에 맞춰져 있어요. 학습 스트릭을 이어가며 매일 조금씩 다음 레벨로 나아가보세요.`,
    stats: {
      currentLevel: '현재 레벨',
      targetLevel: '목표 레벨',
      streak: '학습 스트릭',
      streakSub: '연속 학습일',
      wordsLearned: '학습한 단어',
      wordsLearnedSub: '학습 완료로 표시됨',
      quizAccuracy: '퀴즈 정확도',
      quizAccuracySub: '최근 평균 성과',
      weeklyTime: '주간 학습 시간',
      weeklyTimeSub: '최근 7일',
      days: '일',
      min: '분',
    },
    progressSection: 'CEFR 진행도',
    progressTitle: (target: string) => `${target} 목표까지의 진행도`,
    wordsInReview: (count: number) => `현재 복습 중인 단어 ${count}개`,
    todayPlan: '오늘의 학습 플랜',
    balancedSession: '균형 잡힌 일일 세션',
    focusedPractice: (minutes: number) => `현재 목표에 맞춘 ${minutes}분 집중 학습입니다.`,
    newWords: '새 단어',
    review: '복습',
    collocations: '연어',
    examples: '예문',
    defaultFocus: '새 단어와 복습 단어의 균형을 맞춰 학습해보세요.',
    coachNotes: '코치 노트',
    focusNext: '다음 집중 포인트',
    defaultWeakness: '매일 꾸준한 단어 복습을 계속해보세요.',
    weeklyOutput: (count: number) => `주간 학습량: 학습과 복습을 합쳐 ${count}개 단어를 다뤘어요.`,
    totalSessions: (count: number) => `완료한 학습 세션: ${count}회`,
    actions: [
      {
        href: '/study',
        title: '오늘의 학습 시작',
        description: '오늘의 새 단어, 예문, 연어 학습을 진행하세요.',
        color: 'linear-gradient(135deg, #22c55e, #16a34a)',
      },
      {
        href: '/quiz',
        title: '일일 테스트 보기',
        description: '짧은 단어 퀴즈로 오늘 공부한 내용을 확인하세요.',
        color: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      },
      {
        href: '/mistakes',
        title: '오답 복습',
        description: '이전에 틀렸던 단어를 다시 확인하고 약한 부분을 보완하세요.',
        color: 'linear-gradient(135deg, #f97316, #ea580c)',
      },
    ],
    viewProgress: '진행도 보기',
    retakePlacement: '레벨 테스트 다시 보기',
    adjustPlan: '학습 플랜 조정',
  },
} as const;

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const ui = contentByLanguage[language];
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
    const displayName = session?.user?.name || session?.user?.email?.split('@')[0] || (language === 'ko' ? '학습자' : 'Learner');
    return displayName.split(' ')[0];
  }, [language, session]);

  if (status === 'loading' || loading) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>{ui.loading}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{ui.loadingSub}</p>
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
              {ui.logout}
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1180px', margin: '0 auto', padding: '28px 24px 40px' }}>
        <section className="animate-fade-in" style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            {ui.section}
          </p>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '8px' }}>
            {ui.welcome} {firstName}
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '760px' }}>
            {ui.intro(formatLevelJourney(currentLevel, targetLevel))}
          </p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: ui.stats.currentLevel, value: currentLevel, sub: CEFR_DESCRIPTIONS[currentLevel], color: CEFR_COLORS[currentLevel] },
            { label: ui.stats.targetLevel, value: targetLevel, sub: CEFR_DESCRIPTIONS[targetLevel], color: CEFR_COLORS[targetLevel] },
            { label: ui.stats.streak, value: `${data?.streak ?? 0} ${ui.stats.days}`, sub: ui.stats.streakSub, color: '#f97316' },
            { label: ui.stats.wordsLearned, value: `${data?.wordsLearned ?? 0}`, sub: ui.stats.wordsLearnedSub, color: '#22c55e' },
            { label: ui.stats.quizAccuracy, value: `${data?.avgQuizScore ?? 0}%`, sub: ui.stats.quizAccuracySub, color: '#6366f1' },
            { label: ui.stats.weeklyTime, value: `${data?.weeklyStudyMinutes ?? 0} ${ui.stats.min}`, sub: ui.stats.weeklyTimeSub, color: '#a855f7' },
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
                {ui.progressSection}
              </p>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{ui.progressTitle(targetLevel)}</h2>
            </div>
            <p style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '1.1rem' }}>{progress}%</p>
          </div>

          <div className="progress-bar" style={{ height: '12px', marginBottom: '14px' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ color: CEFR_COLORS[currentLevel], fontWeight: 700 }}>{currentLevel}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{ui.wordsInReview(data?.wordsInReview ?? 0)}</span>
            <span style={{ color: CEFR_COLORS[targetLevel], fontWeight: 700 }}>{targetLevel}</span>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '24px' }}>
          <div className="glass" style={{ borderRadius: '24px', padding: '26px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              {ui.todayPlan}
            </p>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>{data?.studyPlan?.tagline ?? ui.balancedSession}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '18px' }}>
              {ui.focusedPractice(data?.studyPlan?.studyMinutes ?? 20)}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px', marginBottom: '18px' }}>
              {[
                { label: ui.newWords, value: data?.studyPlan?.dailyNewWords ?? 0 },
                { label: ui.review, value: data?.studyPlan?.dailyReview ?? 0 },
                { label: ui.collocations, value: data?.studyPlan?.collocations ?? 0 },
                { label: ui.examples, value: data?.studyPlan?.examples ?? 0 },
              ].map((item) => (
                <div key={item.label} className="card" style={{ padding: '14px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '4px' }}>{item.label}</p>
                  <p style={{ fontSize: '1.3rem', fontWeight: 800 }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gap: '10px' }}>
              {(data?.studyPlan?.focusAreas ?? [ui.defaultFocus]).map((focus) => (
                <div key={focus} className="card" style={{ padding: '12px 14px' }}>
                  <p style={{ color: 'var(--text-secondary)' }}>{focus}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass" style={{ borderRadius: '24px', padding: '26px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              {ui.coachNotes}
            </p>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px' }}>{ui.focusNext}</h2>
            <div style={{ display: 'grid', gap: '10px', marginBottom: '18px' }}>
              {(data?.placementResult?.weaknesses ?? [ui.defaultWeakness]).map((item) => (
                <div key={item} className="card" style={{ padding: '12px 14px' }}>
                  <p style={{ color: 'var(--text-secondary)' }}>{item}</p>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <strong>{ui.weeklyOutput(data?.weeklyWordsStudied ?? 0)}</strong>
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              <strong>{ui.totalSessions(data?.totalSessions ?? 0)}</strong>
            </p>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '24px' }}>
          {ui.actions.map((card) => (
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
            {ui.viewProgress}
          </Link>
          <Link href="/placement-test" className="btn-secondary" style={{ textDecoration: 'none', padding: '12px 18px' }}>
            {ui.retakePlacement}
          </Link>
          <Link href="/study-plan" className="btn-secondary" style={{ textDecoration: 'none', padding: '12px 18px' }}>
            {ui.adjustPlan}
          </Link>
        </section>
      </main>
    </div>
  );
}
