'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useLanguage } from '@/components/language-context';

const contentByLanguage = {
  en: {
    login: 'Log In',
    startLearning: 'Start Learning',
    openDashboard: 'Open Dashboard',
    continueOnboarding: 'Continue Onboarding',
    seeHowItWorks: 'See How It Works',
    heroBadge: 'Personal vocabulary coach from current level to target level',
    heroTitleBefore: 'Reach your target ',
    heroTitleHighlight: 'CEFR level',
    heroTitleAfter: ' with a personalized vocabulary plan.',
    heroBody:
      'Take a placement test, set your goal, and follow a daily study plan designed around your level, your weak spots, and the amount of time you can realistically give each day.',
    dailyFocusLabel: 'Daily focus',
    dailyFocusTitle: 'What to study today',
    dailyFocusBody: '10 new words, 5 review words, 3 collocations, 3 examples, and a short quiz.',
    stats: [
      { label: 'Placement', value: '20 questions' },
      { label: 'Target path', value: 'A1 to C2' },
      { label: 'Habit loop', value: 'Study every day' },
      { label: 'Review', value: 'Mistakes resurface' },
    ],
    featuresTitle: 'Everything centers on guided daily improvement',
    featuresBody:
      'This is not just a vocabulary list. The app is structured to move learners from current level to target level through coach-like daily guidance.',
    featureCards: [
      {
        title: 'AI Placement Test',
        description:
          'Start with a CEFR placement test that checks vocabulary meaning, sentence completion, and usage across A1 to C2.',
      },
      {
        title: 'Personalized Study Plan',
        description:
          'Choose how many minutes you can study each day and get a plan built around your current level, target level, and weak areas.',
      },
      {
        title: 'Daily Study and Quizzes',
        description:
          'Study new words, collocations, and examples, then reinforce them with short daily quizzes and mistake review.',
      },
      {
        title: 'Progress Tracking',
        description:
          'See your current CEFR level, target level, study streak, quiz accuracy, and vocabulary growth in one place.',
      },
    ],
    userFlowTitle: 'User flow',
    journeySteps: [
      'Find your current CEFR level through a placement test.',
      'Choose the next level you want to reach, from A1 to C2.',
      'Follow a daily vocabulary plan that fits your schedule.',
      'Track progress and turn weak words into long-term strength.',
    ],
    feelingTitle: 'What the experience should feel like',
    promisePoints: [
      'Daily plans that feel coach-led instead of generic.',
      'Vocabulary sessions with definitions, collocations, and example sentences.',
      'A learning path built around current level, target level, and consistent improvement.',
    ],
    closingLabel: 'Current level to target level to daily improvement',
    closingTitle: 'Build a vocabulary habit that actually moves you forward.',
    closingBody:
      'Start with your CEFR level, pick the goal you want to reach, and let the platform guide what to learn today, what to review, and how your progress is changing over time.',
  },
  ko: {
    login: '로그인',
    startLearning: '시작하기',
    openDashboard: '대시보드 열기',
    continueOnboarding: '온보딩 계속하기',
    seeHowItWorks: '이용 방식 보기',
    heroBadge: '현재 레벨에서 목표 레벨까지 함께 가는 단어 코치',
    heroTitleBefore: '맞춤형 단어 학습 플랜으로 ',
    heroTitleHighlight: '목표 CEFR 레벨',
    heroTitleAfter: ' 에 도달하세요.',
    heroBody:
      '레벨 테스트를 보고 목표를 정한 뒤, 현재 수준과 약한 영역, 그리고 매일 현실적으로 투자할 수 있는 시간에 맞춘 학습 플랜을 따라가세요.',
    dailyFocusLabel: '오늘의 학습',
    dailyFocusTitle: '오늘 공부할 내용',
    dailyFocusBody: '새 단어 10개, 복습 단어 5개, 연어 3개, 예문 3개, 그리고 짧은 퀴즈가 제공됩니다.',
    stats: [
      { label: '레벨 테스트', value: '20문항' },
      { label: '목표 경로', value: 'A1부터 C2까지' },
      { label: '습관 루프', value: '매일 학습' },
      { label: '복습', value: '틀린 단어 재등장' },
    ],
    featuresTitle: '모든 경험은 매일의 성장에 맞춰져 있어요',
    featuresBody:
      '이 서비스는 단순한 단어장 앱이 아닙니다. 현재 레벨에서 목표 레벨까지 코치처럼 안내하는 흐름으로 설계되어 있습니다.',
    featureCards: [
      {
        title: 'AI 레벨 테스트',
        description: 'A1부터 C2까지 어휘 의미, 문장 완성, 사용법을 확인하는 CEFR 레벨 테스트로 시작하세요.',
      },
      {
        title: '맞춤형 학습 플랜',
        description: '하루 학습 시간을 선택하면 현재 레벨, 목표 레벨, 약한 영역에 맞춘 계획을 받아볼 수 있어요.',
      },
      {
        title: '매일 학습과 퀴즈',
        description: '새 단어, 연어, 예문을 공부한 뒤 짧은 일일 퀴즈와 오답 복습으로 익히세요.',
      },
      {
        title: '진행도 추적',
        description: '현재 CEFR 레벨, 목표 레벨, 연속 학습일, 퀴즈 정확도, 단어 성장 추이를 한눈에 볼 수 있어요.',
      },
    ],
    userFlowTitle: '사용 흐름',
    journeySteps: [
      '레벨 테스트로 현재 CEFR 수준을 확인합니다.',
      '다음에 도달하고 싶은 레벨을 A1부터 C2까지 선택합니다.',
      '내 일정에 맞는 매일의 단어 학습 플랜을 따릅니다.',
      '진행도를 추적하며 약한 단어를 장기 기억으로 바꿉니다.',
    ],
    feelingTitle: '서비스가 주는 느낌',
    promisePoints: [
      '기계적인 계획이 아니라 코치가 이끄는 듯한 일일 학습.',
      '뜻, 연어, 예문이 함께 있는 단어 학습 세션.',
      '현재 레벨, 목표 레벨, 꾸준한 성장에 맞춘 학습 경로.',
    ],
    closingLabel: '현재 레벨에서 목표 레벨, 그리고 매일의 성장까지',
    closingTitle: '실제로 앞으로 나아가게 해주는 단어 습관을 만들어보세요.',
    closingBody:
      '지금의 CEFR 레벨에서 시작해 원하는 목표를 정하고, 오늘 무엇을 배우고 무엇을 복습해야 하는지, 그리고 얼마나 성장하고 있는지까지 한 번에 확인하세요.',
  },
} as const;

export default function LandingPage() {
  const { data: session } = useSession();
  const { language } = useLanguage();
  const ui = contentByLanguage[language];
  const onboardingDone = Boolean((session?.user as Record<string, unknown> | undefined)?.onboardingDone);
  const primaryHref = session ? (onboardingDone ? '/dashboard' : '/onboarding') : '/signup';
  const primaryLabel = session ? (onboardingDone ? ui.openDashboard : ui.continueOnboarding) : ui.startLearning;

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen">
      <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 20, padding: '16px 0' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
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
            <span className="gradient-text" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              CEFR Vocab Coach
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {!session && (
              <Link href="/login" className="btn-secondary" style={{ textDecoration: 'none', padding: '10px 20px' }}>
                {ui.login}
              </Link>
            )}
            <Link href={primaryHref} className="btn-primary" style={{ textDecoration: 'none', padding: '10px 22px' }}>
              {primaryLabel}
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 24px 48px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
              alignItems: 'center',
            }}
          >
            <div className="animate-fade-in">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  background: 'rgba(99, 102, 241, 0.12)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  color: 'var(--accent-primary)',
                  marginBottom: '20px',
                  fontSize: '0.85rem',
                }}
              >
                {ui.heroBadge}
              </div>

              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', lineHeight: 1.05, fontWeight: 800, marginBottom: '20px' }}>
                {ui.heroTitleBefore}
                <span className="gradient-text">{ui.heroTitleHighlight}</span>
                {ui.heroTitleAfter}
              </h1>

              <p style={{ maxWidth: '640px', color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.8, marginBottom: '28px' }}>
                {ui.heroBody}
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <Link href={primaryHref} className="btn-primary animate-pulse-glow" style={{ textDecoration: 'none', padding: '16px 28px' }}>
                  {primaryLabel}
                </Link>
                <Link href="#features" className="btn-secondary" style={{ textDecoration: 'none', padding: '16px 28px' }}>
                  {ui.seeHowItWorks}
                </Link>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level) => (
                  <span
                    key={level}
                    className={`level-${level.toLowerCase()}`}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '999px',
                      border: '1px solid currentColor',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                    }}
                  >
                    {level}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass animate-fade-in" style={{ borderRadius: '28px', padding: '28px' }}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div className="card" style={{ padding: '20px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                    {ui.dailyFocusLabel}
                  </p>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>{ui.dailyFocusTitle}</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>{ui.dailyFocusBody}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
                  {ui.stats.map((item) => (
                    <div key={item.label} className="card" style={{ padding: '18px' }}>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '6px' }}>{item.label}</p>
                      <p style={{ fontWeight: 700, fontSize: '1rem' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 56px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px' }}>{ui.featuresTitle}</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto' }}>{ui.featuresBody}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
            {ui.featureCards.map((feature, index) => (
              <div key={feature.title} className="card animate-fade-in" style={{ padding: '24px', animationDelay: `${index * 0.08}s`, opacity: 0 }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    background: 'var(--accent-gradient-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    marginBottom: '18px',
                  }}
                >
                  0{index + 1}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '10px' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 56px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            <div className="glass" style={{ borderRadius: '24px', padding: '28px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '18px' }}>{ui.userFlowTitle}</h2>
              <div style={{ display: 'grid', gap: '14px' }}>
                {ui.journeySteps.map((step, index) => (
                  <div key={step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        minWidth: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        background: 'var(--accent-gradient-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        color: 'var(--accent-primary)',
                      }}
                    >
                      {index + 1}
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass" style={{ borderRadius: '24px', padding: '28px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '18px' }}>{ui.feelingTitle}</h2>
              <div style={{ display: 'grid', gap: '12px' }}>
                {ui.promisePoints.map((point) => (
                  <div key={point} className="card" style={{ padding: '16px 18px' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div className="glass" style={{ borderRadius: '28px', padding: '40px 28px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.78rem' }}>
              {ui.closingLabel}
            </p>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '14px' }}>{ui.closingTitle}</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 24px' }}>{ui.closingBody}</p>
            <Link href={primaryHref} className="btn-primary" style={{ textDecoration: 'none', padding: '16px 28px' }}>
              {primaryLabel}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
