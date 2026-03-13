'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CEFR_COLORS } from '@/lib/cefr';

interface MistakeWord {
  id: string;
  word: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
  collocations: string;
  cefrLevel: string;
}

export default function MistakesPage() {
  const { data: session } = useSession();
  const [mistakes, setMistakes] = useState<MistakeWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const userId = (session?.user as Record<string, unknown>)?.id;
    if (!userId) {
      setLoading(false);
      return;
    }

    // Fetch vocabulary with difficult/review status
    fetch(`/api/vocabulary?userId=${userId}&level=C2`)
      .then((r) => r.json())
      .then((data) => {
        const mistakeWords = (data.vocabulary || []).filter(
          (v: { userProgress?: { status: string }[] }) =>
            v.userProgress && v.userProgress.some((p: { status: string }) => p.status === 'difficult' || p.status === 'review')
        );
        setMistakes(mistakeWords);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  const markAsLearned = async (vocabId: string) => {
    const userId = (session?.user as Record<string, unknown>)?.id;
    if (!userId) return;

    await fetch('/api/vocabulary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, vocabId, status: 'learned' }),
    });

    setMistakes(mistakes.filter((m) => m.id !== vocabId));
  };

  if (loading) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }} className="animate-float">🔄</div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading review items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-grid min-h-screen" style={{ padding: '24px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <Link href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>← Dashboard</Link>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Mistake Review</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{mistakes.length} words to review</p>
          </div>
          <div style={{ fontSize: '3rem' }}>🔄</div>
        </div>

        {mistakes.length === 0 ? (
          <div className="glass animate-fade-in" style={{ borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '8px' }}>No mistakes to review!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Great job! Keep studying and any difficult words will appear here.
            </p>
            <Link href="/study" className="btn-primary" style={{ textDecoration: 'none' }}>Continue Studying</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mistakes.map((word, i) => (
              <div
                key={word.id}
                className="card animate-fade-in"
                style={{
                  padding: '20px',
                  animationDelay: `${i * 0.05}s`,
                  opacity: 0,
                  cursor: 'pointer',
                }}
                onClick={() => setExpandedId(expandedId === word.id ? null : word.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      padding: '2px 10px',
                      borderRadius: '100px',
                      border: `1px solid ${CEFR_COLORS[word.cefrLevel]}`,
                      color: CEFR_COLORS[word.cefrLevel],
                      fontSize: '0.7rem',
                      fontWeight: '600',
                    }}>
                      {word.cefrLevel}
                    </span>
                    <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{word.word}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({word.partOfSpeech})</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)' }}>{expandedId === word.id ? '▲' : '▼'}</span>
                </div>

                {expandedId === word.id && (
                  <div className="animate-fade-in" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                    <p style={{ marginBottom: '8px' }}><strong>Meaning:</strong> {word.meaning}</p>
                    <p style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>&ldquo;{word.example}&rdquo;</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {word.collocations.split(', ').map((c, j) => (
                        <span key={j} style={{
                          padding: '2px 10px',
                          borderRadius: '100px',
                          background: 'rgba(99, 102, 241, 0.1)',
                          color: 'var(--accent-primary)',
                          fontSize: '0.8rem',
                        }}>
                          {c}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); markAsLearned(word.id); }}
                      style={{
                        padding: '8px 20px',
                        borderRadius: '10px',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        background: 'rgba(34, 197, 94, 0.1)',
                        color: '#22c55e',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                      }}
                    >
                      ✓ Mark as Learned
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
