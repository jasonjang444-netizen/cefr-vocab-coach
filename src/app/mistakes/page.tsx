'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CEFR_COLORS, CefrLevel } from '@/lib/cefr';

interface MistakeWord {
  id: string;
  word: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
  collocations: string;
  cefrLevel: CefrLevel;
}

export default function MistakesPage() {
  const { data: session, status } = useSession();
  const [mistakes, setMistakes] = useState<MistakeWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const userId = (session?.user as Record<string, unknown> | undefined)?.id;
    if (status !== 'authenticated' || !userId) {
      return;
    }

    fetch(`/api/vocabulary?userId=${userId}&mode=all`)
      .then((response) => response.json())
      .then((data) => {
        const mistakeWords = (data.vocabulary || []).filter(
          (word: { userProgress?: { status: string }[] }) =>
            word.userProgress?.some(
              (progress: { status: string }) => progress.status === 'difficult' || progress.status === 'review'
            )
        );
        setMistakes(mistakeWords);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session, status]);

  const markAsLearned = async (vocabId: string) => {
    const userId = (session?.user as Record<string, unknown> | undefined)?.id;
    if (!userId) {
      return;
    }

    await fetch('/api/vocabulary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, vocabId, status: 'learned' }),
    });

    setMistakes((current) => current.filter((item) => item.id !== vocabId));
  };

  if (status === 'loading' || (status === 'authenticated' && loading)) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Loading review items...</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Preparing your mistake review list</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="glass" style={{ borderRadius: '24px', padding: '28px', maxWidth: '520px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '18px' }}>Log in to see the words waiting for review.</p>
          <Link href="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '14px 24px' }}>
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-grid min-h-screen" style={{ padding: '24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <div>
            <Link href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-block', marginBottom: '8px' }}>
              Back to Dashboard
            </Link>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Mistake Review</h1>
            <p style={{ color: 'var(--text-secondary)' }}>{mistakes.length} words waiting for another pass.</p>
          </div>
          <div className="glass" style={{ borderRadius: '20px', padding: '16px 18px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '4px' }}>Review queue</p>
            <p style={{ fontSize: '1.4rem', fontWeight: 800 }}>{mistakes.length}</p>
          </div>
        </div>

        {mistakes.length === 0 ? (
          <div className="glass animate-fade-in" style={{ borderRadius: '24px', padding: '42px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '10px' }}>No mistakes to review right now</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Nice work. Keep studying and any difficult or missed words will come back here automatically.
            </p>
            <Link href="/study" className="btn-primary" style={{ textDecoration: 'none', padding: '14px 22px' }}>
              Continue Studying
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {mistakes.map((word, index) => {
              const expanded = expandedId === word.id;
              return (
                <div
                  key={word.id}
                  className="card animate-fade-in"
                  style={{ padding: '20px', animationDelay: `${index * 0.05}s`, opacity: 0, cursor: 'pointer' }}
                  onClick={() => setExpandedId(expanded ? null : word.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '999px',
                          border: `1px solid ${CEFR_COLORS[word.cefrLevel]}`,
                          color: CEFR_COLORS[word.cefrLevel],
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        {word.cefrLevel}
                      </span>
                      <span style={{ fontWeight: 800, fontSize: '1.08rem' }}>{word.word}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>({word.partOfSpeech})</span>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{expanded ? 'Hide details' : 'Show details'}</span>
                  </div>

                  {expanded && (
                    <div className="animate-fade-in" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                      <p style={{ marginBottom: '8px' }}><strong>Meaning:</strong> {word.meaning}</p>
                      <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>&ldquo;{word.example}&rdquo;</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        {word.collocations.split(', ').map((collocation) => (
                          <span key={collocation} style={{ padding: '4px 10px', borderRadius: '999px', background: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-primary)', fontSize: '0.8rem' }}>
                            {collocation}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          void markAsLearned(word.id);
                        }}
                        style={{
                          padding: '10px 18px',
                          borderRadius: '12px',
                          border: '1px solid rgba(34, 197, 94, 0.28)',
                          background: 'rgba(34, 197, 94, 0.1)',
                          color: '#22c55e',
                          cursor: 'pointer',
                          fontWeight: 700,
                        }}
                      >
                        Mark as Learned
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
