'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  cefrLevel: string;
  type: 'meaning' | 'completion' | 'usage';
}

interface StoredAnswer {
  questionId: number;
  selectedAnswer: number;
}

const typeLabels: Record<Question['type'], string> = {
  meaning: 'Vocabulary meaning',
  completion: 'Sentence completion',
  usage: 'Word usage',
};

export default function PlacementTestPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<StoredAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [router, status]);

  useEffect(() => {
    fetch('/api/placement-test')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load test');
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load the placement test. Please try again.');
        setLoading(false);
      });
  }, []);

  const submitTest = async (finalAnswers: StoredAnswer[]) => {
    const userId = (session?.user as Record<string, unknown> | undefined)?.id;
    if (!userId) {
      router.replace('/login');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/placement-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, answers: finalAnswers }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit test');
      }

      const data = await response.json();
      sessionStorage.setItem('placementResult', JSON.stringify(data));
      router.push('/placement-result');
    } catch {
      setSubmitting(false);
      setError('Could not score the placement test. Please try again.');
    }
  };

  const handleNext = () => {
    if (selectedAnswer === null || !questions[currentQ]) {
      return;
    }

    const nextAnswers = [
      ...answers,
      {
        questionId: questions[currentQ].id,
        selectedAnswer,
      },
    ];

    setAnswers(nextAnswers);
    setSelectedAnswer(null);

    if (currentQ === questions.length - 1) {
      void submitTest(nextAnswers);
      return;
    }

    setCurrentQ((value) => value + 1);
  };

  if (loading || status === 'loading') {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Preparing your placement test...</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>20 questions across A1 to C2</p>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Analyzing your results...</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>We are estimating your current CEFR level and focus areas.</p>
        </div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="glass" style={{ borderRadius: '24px', padding: '28px', maxWidth: '480px', textAlign: 'center' }}>
          <p style={{ color: '#fca5a5', marginBottom: '18px' }}>{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary" style={{ padding: '14px 24px' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];
  const progress = Math.round(((currentQ + 1) / Math.max(1, questions.length)) * 100);

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '760px' }}>
        <div style={{ marginBottom: '22px', display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
              Placement test
            </p>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>Find your current CEFR vocabulary level</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Question {currentQ + 1} of {questions.length}</p>
          </div>
          <div style={{ minWidth: '180px' }}>
            <div className="progress-bar" style={{ height: '10px', marginBottom: '8px' }}>
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'right' }}>{progress}% complete</p>
          </div>
        </div>

        <div className="glass" style={{ borderRadius: '26px', padding: '32px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span
              className={`level-${question.cefrLevel.toLowerCase()}`}
              style={{
                padding: '6px 12px',
                borderRadius: '999px',
                border: '1px solid currentColor',
                fontSize: '0.82rem',
                fontWeight: 700,
              }}
            >
              {question.cefrLevel}
            </span>
            <span style={{ padding: '6px 12px', borderRadius: '999px', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
              {typeLabels[question.type]}
            </span>
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, lineHeight: 1.5, marginBottom: '24px' }}>{question.question}</h2>

          <div style={{ display: 'grid', gap: '12px' }}>
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              return (
                <button
                  key={`${question.id}-${option}`}
                  onClick={() => setSelectedAnswer(index)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '16px 18px',
                    borderRadius: '16px',
                    border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--text-muted)',
                      color: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {error && <p style={{ color: '#fca5a5', marginTop: '16px' }}>{error}</p>}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginTop: '28px', flexWrap: 'wrap' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              The test mixes easier and harder questions to estimate your level more accurately.
            </p>
            <button
              onClick={handleNext}
              className="btn-primary"
              style={{ padding: '14px 22px', minWidth: '180px', opacity: selectedAnswer === null ? 0.6 : 1 }}
              disabled={selectedAnswer === null}
            >
              {currentQ === questions.length - 1 ? 'Finish Test' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
