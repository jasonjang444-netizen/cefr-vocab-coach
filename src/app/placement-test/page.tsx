'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  cefrLevel: string;
  type: string;
}

export default function PlacementTestPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/placement-test')
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      submitTest(newAnswers);
    }
  };

  const submitTest = async (finalAnswers: number[]) => {
    setSubmitting(true);
    const userId = (session?.user as Record<string, unknown>)?.id;

    try {
      const res = await fetch('/api/placement-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, answers: finalAnswers }),
      });

      const data = await res.json();
      // Store result in session storage for the results page
      sessionStorage.setItem('placementResult', JSON.stringify(data));
      router.push('/placement-result');
    } catch {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }} className="animate-float">📝</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Preparing your placement test...</p>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }} className="animate-float">🧠</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Analyzing your results...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '640px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Placement Test</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Question {currentQ + 1} of {questions.length}
            </span>
          </div>
          {/* Progress bar */}
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Level indicator */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '100px', border: '1px solid', marginBottom: '20px', fontSize: '0.8rem', fontWeight: '600' }}
          className={`level-${question?.cefrLevel?.toLowerCase()}`}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
          {question?.cefrLevel} Level
        </div>

        {/* Question card */}
        <div className="glass" style={{ borderRadius: '20px', padding: '36px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {question?.type === 'meaning' ? '📖 Vocabulary Meaning' : question?.type === 'completion' ? '✏️ Sentence Completion' : '💡 Word Usage'}
            </span>
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '28px', lineHeight: '1.5' }}>
            {question?.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {question?.options.map((option, i) => (
              <button
                key={i}
                onClick={() => setSelectedAnswer(i)}
                style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: selectedAnswer === i ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: selectedAnswer === i ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  border: selectedAnswer === i ? '2px solid var(--accent-primary)' : '1px solid var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: selectedAnswer === i ? 'var(--accent-primary)' : 'var(--text-muted)',
                  flexShrink: 0,
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '1.05rem',
            opacity: selectedAnswer === null ? 0.5 : 1,
            cursor: selectedAnswer === null ? 'not-allowed' : 'pointer',
          }}
          disabled={selectedAnswer === null}
        >
          {currentQ === questions.length - 1 ? 'Finish Test' : 'Next Question →'}
        </button>
      </div>
    </div>
  );
}
