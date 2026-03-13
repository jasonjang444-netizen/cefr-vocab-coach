'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass" style={{ padding: '16px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📚</div>
            <span style={{ fontSize: '1.25rem', fontWeight: '700' }} className="gradient-text">CEFR Coach</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {session ? (
              <Link href="/dashboard" className="btn-primary" style={{ textDecoration: 'none', padding: '10px 24px', fontSize: '0.9rem' }}>Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="btn-secondary" style={{ textDecoration: 'none', padding: '10px 24px', fontSize: '0.9rem' }}>Log In</Link>
                <Link href="/signup" className="btn-primary" style={{ textDecoration: 'none', padding: '10px 24px', fontSize: '0.9rem' }}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '140px', paddingBottom: '100px', textAlign: 'center', position: 'relative' }}>
        {/* Floating orbs */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.08)', filter: 'blur(60px)' }} className="animate-float" />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.08)', filter: 'blur(60px)', animationDelay: '1s' }} className="animate-float" />

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }} className="animate-fade-in">
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '100px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', marginBottom: '28px', fontSize: '0.85rem', color: 'var(--accent-primary)' }}>
            <span>✨</span> AI-Powered Vocabulary Coach
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Reach your target{' '}
            <span className="gradient-text">CEFR level</span>
            <br />
            with a personalized
            <br />
            vocabulary plan
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.7' }}>
            Take an AI placement test and follow a daily learning path designed for your level. From A1 to C2, we guide your vocabulary journey.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn-primary animate-pulse-glow" style={{ textDecoration: 'none', padding: '16px 40px', fontSize: '1.1rem', borderRadius: '14px' }}>
              Start Learning — It&apos;s Free
            </Link>
            <Link href="#features" className="btn-secondary" style={{ textDecoration: 'none', padding: '16px 40px', fontSize: '1.1rem', borderRadius: '14px' }}>
              Learn More ↓
            </Link>
          </div>

          {/* Level pills */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '48px', flexWrap: 'wrap' }}>
            {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level, i) => (
              <div
                key={level}
                className={`level-${level.toLowerCase()} animate-fade-in`}
                style={{
                  padding: '8px 20px',
                  borderRadius: '100px',
                  border: '1px solid',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                }}
              >
                {level}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>
            Your path to <span className="gradient-text">fluency</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            A complete vocabulary learning system powered by AI and proven methods.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {[
            { icon: '🎯', title: 'AI Placement Test', desc: 'Discover your exact CEFR level with our intelligent assessment spanning A1 to C2.' },
            { icon: '📋', title: 'Personalized Study Plan', desc: 'Get a daily vocabulary plan tailored to your level, goals, and available study time.' },
            { icon: '📝', title: 'Daily Quizzes', desc: 'Reinforce learning with varied quiz formats: multiple choice, fill-in-blank, and usage.' },
            { icon: '📊', title: 'Progress Tracking', desc: 'Watch your vocabulary grow with detailed analytics, streak counting, and CEFR progress.' },
            { icon: '🔄', title: 'Smart Review', desc: 'Mistakes are tracked and automatically scheduled for review to strengthen retention.' },
            { icon: '🧠', title: 'AI-Powered Content', desc: 'Example sentences, collocations, and explanations generated to match your level.' },
          ].map((feature, i) => (
            <div
              key={i}
              className="card animate-fade-in"
              style={{
                padding: '32px',
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '12px' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '60px' }}>
          How it <span className="gradient-text">works</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {[
            { step: '01', title: 'Take the Placement Test', desc: 'Answer 20 questions spanning all CEFR levels. We pinpoint your current vocabulary level.' },
            { step: '02', title: 'Set Your Target', desc: 'Choose your target CEFR level. We show recommended targets and estimated timelines.' },
            { step: '03', title: 'Follow Your Daily Plan', desc: 'Study new words, review vocabulary, learn collocations, and take mini quizzes every day.' },
            { step: '04', title: 'Track Your Progress', desc: 'Watch your vocabulary grow, maintain study streaks, and see your CEFR level improve.' },
          ].map((item, i) => (
            <div
              key={i}
              className="card animate-slide-in"
              style={{
                padding: '32px',
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                animationDelay: `${i * 0.15}s`,
                opacity: 0,
              }}
            >
              <div style={{
                minWidth: '60px',
                height: '60px',
                borderRadius: '14px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: '800',
              }}>
                {item.step}
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '6px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div className="glass" style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 40px', borderRadius: '24px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>
            Ready to level up your vocabulary?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.05rem' }}>
            Start your journey from your current level to your target — one word at a time.
          </p>
          <Link href="/signup" className="btn-primary" style={{ textDecoration: 'none', padding: '16px 48px', fontSize: '1.1rem' }}>
            Start Free Placement Test
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          © 2026 CEFR Vocab Coach. Your personal vocabulary learning companion.
        </p>
      </footer>
    </div>
  );
}
