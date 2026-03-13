'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const userName = (session?.user as Record<string, unknown>)?.name || session?.user?.email?.split('@')[0] || 'Learner';

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        {/* Welcome illustration */}
        <div style={{ fontSize: '5rem', marginBottom: '24px' }} className="animate-float">🎓</div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }}>
          Welcome, <span className="gradient-text">{userName as string}!</span>
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 40px' }}>
          Let&apos;s find your current CEFR level, set your goal, and create a personalized vocabulary plan just for you.
        </p>

        {/* Steps preview */}
        <div className="glass" style={{ borderRadius: '20px', padding: '32px', marginBottom: '40px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>Here&apos;s what we&apos;ll do</h3>
          {[
            { icon: '📝', text: 'Take a quick placement test (5 minutes)', color: '#6366f1' },
            { icon: '🎯', text: 'See your current CEFR level', color: '#8b5cf6' },
            { icon: '📋', text: 'Choose your target level', color: '#a855f7' },
            { icon: '⚡', text: 'Generate your personalized study plan', color: '#ec4899' },
          ].map((step, i) => (
            <div
              key={i}
              className="animate-slide-in"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '14px 0',
                borderBottom: i < 3 ? '1px solid var(--border-color)' : 'none',
                animationDelay: `${i * 0.1 + 0.3}s`,
                opacity: 0,
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: `${step.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                flexShrink: 0,
              }}>
                {step.icon}
              </div>
              <span style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{step.text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push('/placement-test')}
          className="btn-primary animate-pulse-glow"
          style={{ padding: '18px 48px', fontSize: '1.15rem', borderRadius: '14px' }}
        >
          Start Placement Test →
        </button>

        <p style={{ color: 'var(--text-muted)', marginTop: '16px', fontSize: '0.85rem' }}>
          Takes about 5 minutes · 20 questions
        </p>
      </div>
    </div>
  );
}
