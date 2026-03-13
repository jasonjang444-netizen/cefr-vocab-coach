'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const TIME_OPTIONS = [
  { minutes: 10, label: '10 min', emoji: '⚡', desc: 'Quick daily session', words: 5, review: 3, collocations: 2, examples: 2, quiz: 1 },
  { minutes: 20, label: '20 min', emoji: '📖', desc: 'Balanced learning', words: 10, review: 5, collocations: 3, examples: 3, quiz: 1 },
  { minutes: 30, label: '30 min', emoji: '🎯', desc: 'Focused study', words: 15, review: 8, collocations: 5, examples: 5, quiz: 2 },
  { minutes: 45, label: '45 min', emoji: '🏆', desc: 'Deep immersion', words: 20, review: 10, collocations: 7, examples: 7, quiz: 3 },
];

export default function StudyPlanPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (selected === null) return;
    setLoading(true);

    const userId = (session?.user as Record<string, unknown>)?.id;
    const option = TIME_OPTIONS[selected];

    try {
      await fetch('/api/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, studyMinutes: option.minutes }),
      });
      router.push('/dashboard');
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏱️</div>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>
          How much time per day?
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '36px' }}>
          We&apos;ll create a personalized plan based on your available study time.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {TIME_OPTIONS.map((option, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="card"
              style={{
                padding: '24px',
                cursor: 'pointer',
                border: selected === i ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                background: selected === i ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-card)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{option.emoji}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '4px' }}>{option.label}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{option.desc}</div>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className="glass animate-fade-in" style={{ borderRadius: '16px', padding: '24px', marginBottom: '24px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Your Daily Plan</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {[
                { label: 'New Words', value: TIME_OPTIONS[selected].words, icon: '📝' },
                { label: 'Review Words', value: TIME_OPTIONS[selected].review, icon: '🔄' },
                { label: 'Collocations', value: TIME_OPTIONS[selected].collocations, icon: '🔗' },
                { label: 'Examples', value: TIME_OPTIONS[selected].examples, icon: '💬' },
                { label: 'Mini Quizzes', value: TIME_OPTIONS[selected].quiz, icon: '📝' },
              ].map((item, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '10px', background: 'var(--bg-secondary)' }}>
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{item.value}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleContinue}
          className="btn-primary"
          style={{
            padding: '16px 48px',
            fontSize: '1.05rem',
            opacity: selected === null ? 0.5 : 1,
            cursor: selected === null ? 'not-allowed' : 'pointer',
          }}
          disabled={selected === null || loading}
        >
          {loading ? 'Creating plan...' : 'Start Learning →'}
        </button>
      </div>
    </div>
  );
}
