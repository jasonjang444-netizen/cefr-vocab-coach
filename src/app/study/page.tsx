'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CEFR_COLORS } from '@/lib/cefr';

interface VocabItem {
  id: string;
  word: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
  collocations: string;
  cefrLevel: string;
  userProgress?: { status: string }[];
}

export default function StudyPage() {
  const { data: session } = useSession();
  const [vocabulary, setVocabulary] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [studied, setStudied] = useState(0);

  useEffect(() => {
    const userId = (session?.user as Record<string, unknown>)?.id;
    fetch(`/api/vocabulary?userId=${userId || ''}&level=B1`)
      .then((r) => r.json())
      .then((data) => {
        setVocabulary(data.vocabulary || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  const markWord = async (status: string) => {
    const userId = (session?.user as Record<string, unknown>)?.id;
    const word = vocabulary[currentIndex];

    if (userId && word) {
      fetch('/api/vocabulary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, vocabId: word.id, status }),
      });
    }

    setStudied(studied + 1);
    setShowMeaning(false);

    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  if (loading) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }} className="animate-float">📖</div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading today&apos;s vocabulary...</p>
        </div>
      </div>
    );
  }

  if (completed || vocabulary.length === 0) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="animate-fade-in" style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '12px' }}>
            {vocabulary.length === 0 ? 'No words available' : 'Session Complete!'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            {vocabulary.length === 0 ? 'Complete the placement test first to get started.' : `You studied ${studied} words today. Great work!`}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/quiz" className="btn-primary" style={{ textDecoration: 'none' }}>Take a Quiz</Link>
            <Link href="/dashboard" className="btn-secondary" style={{ textDecoration: 'none' }}>Back to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  const word = vocabulary[currentIndex];
  const levelColor = CEFR_COLORS[word.cefrLevel] || '#6366f1';
  const progress = ((currentIndex) / vocabulary.length) * 100;

  return (
    <div className="bg-grid min-h-screen" style={{ padding: '24px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Link href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>← Dashboard</Link>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {currentIndex + 1} / {vocabulary.length}
          </span>
        </div>

        {/* Progress */}
        <div className="progress-bar" style={{ marginBottom: '32px' }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Word Card */}
        <div
          className="glass animate-fade-in"
          style={{
            borderRadius: '24px',
            padding: '40px',
            marginBottom: '24px',
            cursor: 'pointer',
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          onClick={() => setShowMeaning(!showMeaning)}
        >
          {/* Level badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{
              padding: '4px 12px',
              borderRadius: '100px',
              border: `1px solid ${levelColor}`,
              color: levelColor,
              fontSize: '0.75rem',
              fontWeight: '600',
            }}>
              {word.cefrLevel}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{word.partOfSpeech}</span>
          </div>

          {/* Word */}
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', textAlign: 'center' }}>
            {word.word}
          </h2>

          {!showMeaning ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '20px', fontSize: '0.9rem' }}>
              Tap to reveal meaning →
            </p>
          ) : (
            <div className="animate-fade-in" style={{ marginTop: '20px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-secondary)', marginBottom: '16px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Definition</p>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.5' }}>{word.meaning}</p>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-secondary)', marginBottom: '16px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Example</p>
                <p style={{ fontSize: '1rem', lineHeight: '1.5', fontStyle: 'italic', color: 'var(--text-secondary)' }}>&ldquo;{word.example}&rdquo;</p>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-secondary)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Collocations</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {word.collocations.split(', ').map((c, i) => (
                    <span key={i} style={{
                      padding: '4px 12px',
                      borderRadius: '100px',
                      background: 'rgba(99, 102, 241, 0.1)',
                      color: 'var(--accent-primary)',
                      fontSize: '0.85rem',
                    }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        {showMeaning && (
          <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <button
              onClick={() => markWord('learned')}
              style={{
                padding: '16px',
                borderRadius: '14px',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                background: 'rgba(34, 197, 94, 0.1)',
                color: '#22c55e',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
              }}
            >
              ✓ Known
            </button>
            <button
              onClick={() => markWord('difficult')}
              style={{
                padding: '16px',
                borderRadius: '14px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
              }}
            >
              ✗ Difficult
            </button>
            <button
              onClick={() => markWord('review')}
              style={{
                padding: '16px',
                borderRadius: '14px',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                background: 'rgba(234, 179, 8, 0.1)',
                color: '#eab308',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
              }}
            >
              ↻ Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
