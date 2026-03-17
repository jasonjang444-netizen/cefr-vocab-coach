'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

const featureCards = [
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
];

const journeySteps = [
  'Find your current CEFR level through a placement test.',
  'Choose the next level you want to reach, from A1 to C2.',
  'Follow a daily vocabulary plan that fits your schedule.',
  'Track progress and turn weak words into long-term strength.',
];

const promisePoints = [
  'Daily plans that feel coach-led instead of generic.',
  'Vocabulary sessions with definitions, collocations, and example sentences.',
  'A learning path built around current level, target level, and consistent improvement.',
];

export default function LandingPage() {
  const { data: session } = useSession();
  const onboardingDone = Boolean((session?.user as Record<string, unknown> | undefined)?.onboardingDone);
  const primaryHref = session ? (onboardingDone ? '/dashboard' : '/onboarding') : '/signup';
  const primaryLabel = session ? (onboardingDone ? 'Open Dashboard' : 'Continue Onboarding') : 'Start Learning';

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
                Log In
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
                Personal vocabulary coach from current level to target level
              </div>

              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', lineHeight: 1.05, fontWeight: 800, marginBottom: '20px' }}>
                Reach your target <span className="gradient-text">CEFR level</span> with a personalized vocabulary plan.
              </h1>

              <p style={{ maxWidth: '640px', color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.8, marginBottom: '28px' }}>
                Take a placement test, set your goal, and follow a daily study plan designed around your level, your weak spots, and the amount of time you can realistically give each day.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <Link href={primaryHref} className="btn-primary animate-pulse-glow" style={{ textDecoration: 'none', padding: '16px 28px' }}>
                  {primaryLabel}
                </Link>
                <Link href="#features" className="btn-secondary" style={{ textDecoration: 'none', padding: '16px 28px' }}>
                  See How It Works
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
                    Daily focus
                  </p>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>What to study today</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    10 new words, 5 review words, 3 collocations, 3 examples, and a short quiz.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
                  {[
                    { label: 'Placement', value: '20 questions' },
                    { label: 'Target path', value: 'A1 to C2' },
                    { label: 'Habit loop', value: 'Study every day' },
                    { label: 'Review', value: 'Mistakes resurface' },
                  ].map((item) => (
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
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px' }}>Everything centers on guided daily improvement</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto' }}>
              This is not just a vocabulary list. The app is structured to move learners from current level to target level through coach-like daily guidance.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
            {featureCards.map((feature, index) => (
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
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '18px' }}>User flow</h2>
              <div style={{ display: 'grid', gap: '14px' }}>
                {journeySteps.map((step, index) => (
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
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '18px' }}>What the experience should feel like</h2>
              <div style={{ display: 'grid', gap: '12px' }}>
                {promisePoints.map((point) => (
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
              Current level to target level to daily improvement
            </p>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '14px' }}>Build a vocabulary habit that actually moves you forward.</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 24px' }}>
              Start with your CEFR level, pick the goal you want to reach, and let the platform guide what to learn today, what to review, and how your progress is changing over time.
            </p>
            <Link href={primaryHref} className="btn-primary" style={{ textDecoration: 'none', padding: '16px 28px' }}>
              {primaryLabel}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
