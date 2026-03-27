'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/components/language-context';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  word: string;
  type: string;
}

const copyByLanguage = {
  en: {
    loading: 'Generating your quiz...',
    complete: 'Quiz Complete!',
    wordsToReview: 'Words to Review',
    studyMore: 'Study More',
    dashboard: 'Dashboard',
    backToDashboard: 'Back to Dashboard',
    meaning: 'Word Meaning',
    fillBlank: 'Fill in the Blank',
    usage: 'Correct Usage',
    seeResults: 'See Results',
    next: 'Next Question',
  },
  ko: {
    loading: '퀴즈를 생성하는 중입니다...',
    complete: '퀴즈 완료!',
    wordsToReview: '다시 볼 단어',
    studyMore: '더 공부하기',
    dashboard: '대시보드',
    backToDashboard: '대시보드로 돌아가기',
    meaning: '단어 의미',
    fillBlank: '빈칸 채우기',
    usage: '올바른 사용',
    seeResults: '결과 보기',
    next: '다음 문제',
  },
} as const;

function QuizPageContent() {
  const { data: session } = useSession();
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const ui = copyByLanguage[language];
  const quizLevel = searchParams.get('level') || 'B1';
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{ questionIdx: number; selected: number; correct: number; word: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadQuiz = async () => {
      setLoading(true);
      setQuizError(null);

      try {
        const response = await fetch(`/api/quiz?level=${encodeURIComponent(quizLevel)}`);

        if (!response.ok) {
          throw new Error(`Quiz request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (!isActive) {
          return;
        }

        setQuestions(Array.isArray(data.questions) ? data.questions : []);
      } catch {
        if (isActive) {
          setQuestions([]);
          setQuizError('Failed to load quiz.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadQuiz();

    return () => {
      isActive = false;
    };
  }, [quizLevel]);

  const handleAnswer = (answerIdx: number) => {
    if (showResult || !questions[currentQ]) {
      return;
    }

    setSelectedAnswer(answerIdx);
    setShowResult(true);
    setAnswers((prev) => [
      ...prev,
      {
        questionIdx: currentQ,
        selected: answerIdx,
        correct: questions[currentQ].correctAnswer,
        word: questions[currentQ].word,
      },
    ]);
  };

  const handleNext = async () => {
    if (!questions.length) {
      return;
    }

    setSelectedAnswer(null);
    setShowResult(false);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const userId = (session?.user as Record<string, unknown>)?.id;
      const score = answers.filter((a) => a.selected === a.correct).length;

      if (userId) {
        await fetch('/api/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, score, total: questions.length, answers }),
        });
      }

      setFinished(true);
    }
  };

  if (loading) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }} className="animate-float">?</div>
          <p style={{ color: 'var(--text-secondary)' }}>{ui.loading}</p>
        </div>
      </div>
    );
  }

  if (quizError || questions.length === 0) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="animate-fade-in glass" style={{ width: '100%', maxWidth: '560px', textAlign: 'center', padding: '32px', borderRadius: '20px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '12px' }}>
            Quiz unavailable
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
            {quizError || 'No quiz questions were generated for this level.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" className="btn-secondary" style={{ textDecoration: 'none' }}>Back to Dashboard</Link>
            <button
              onClick={() => {
                setLoading(true);
                setQuestions([]);
                setFinished(false);
                setCurrentQ(0);
                setSelectedAnswer(null);
                setShowResult(false);
                setAnswers([]);
                setQuizError(null);
                fetch(`/api/quiz?level=${encodeURIComponent(quizLevel)}`)
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error(`Quiz request failed with status ${response.status}`);
                    }

                    return response.json();
                  })
                  .then((data) => setQuestions(Array.isArray(data.questions) ? data.questions : []))
                  .catch(() => setQuizError('Failed to load quiz.'))
                  .finally(() => setLoading(false));
              }}
              className="btn-primary"
              style={{ border: 'none' }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const score = answers.filter((a) => a.selected === a.correct).length;
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    const mistakes = answers.filter((a) => a.selected !== a.correct);

    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="animate-fade-in" style={{ width: '100%', maxWidth: '560px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>
            {percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : 'C'}
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>{ui.complete}</h1>

          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            border: `4px solid ${percentage >= 70 ? '#22c55e' : percentage >= 50 ? '#eab308' : '#ef4444'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: '24px auto',
            background: `${percentage >= 70 ? '#22c55e' : percentage >= 50 ? '#eab308' : '#ef4444'}10`,
          }}>
            <span style={{ fontSize: '2.5rem', fontWeight: '800', color: percentage >= 70 ? '#22c55e' : percentage >= 50 ? '#eab308' : '#ef4444' }}>{percentage}%</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{score}/{questions.length}</span>
          </div>

          {mistakes.length > 0 && (
            <div className="glass" style={{ borderRadius: '16px', padding: '20px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>{ui.wordsToReview}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {mistakes.map((m, i) => (
                  <span key={i} style={{
                    padding: '4px 12px',
                    borderRadius: '100px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    fontSize: '0.85rem',
                  }}>
                    {m.word}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/study" className="btn-primary" style={{ textDecoration: 'none' }}>{ui.studyMore}</Link>
            <Link href="/dashboard" className="btn-secondary" style={{ textDecoration: 'none' }}>{ui.dashboard}</Link>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];
  const progress = questions.length > 0 ? (currentQ / questions.length) * 100 : 0;
  const questionTypeLabel =
    question?.type === 'meaning' ? ui.meaning : question?.type === 'fill-blank' ? ui.fillBlank : ui.usage;

  return (
    <div className="bg-grid min-h-screen" style={{ padding: '24px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <Link href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>{ui.backToDashboard}</Link>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {currentQ + 1} / {questions.length}
          </span>
        </div>

        <div className="progress-bar" style={{ marginBottom: '32px' }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: '100px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '16px' }}>
          {questionTypeLabel}
        </div>

        <div className="glass" style={{ borderRadius: '20px', padding: '32px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '600', lineHeight: '1.6', marginBottom: '24px' }}>
            {question?.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {question?.options.map((option, i) => {
              let borderColor = 'var(--border-color)';
              let bgColor = 'var(--bg-secondary)';

              if (showResult) {
                if (i === question.correctAnswer) {
                  borderColor = '#22c55e';
                  bgColor = 'rgba(34, 197, 94, 0.1)';
                } else if (i === selectedAnswer && i !== question.correctAnswer) {
                  borderColor = '#ef4444';
                  bgColor = 'rgba(239, 68, 68, 0.1)';
                }
              } else if (i === selectedAnswer) {
                borderColor = 'var(--accent-primary)';
                bgColor = 'rgba(99, 102, 241, 0.1)';
              }

              const badgeLabel =
                showResult && i === question.correctAnswer
                  ? 'O'
                  : showResult && i === selectedAnswer
                    ? 'X'
                    : String.fromCharCode(65 + i);

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: `2px solid ${borderColor}`,
                    background: bgColor,
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    cursor: showResult ? 'default' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: `2px solid ${showResult && i === question.correctAnswer ? '#22c55e' : showResult && i === selectedAnswer ? '#ef4444' : 'var(--text-muted)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    flexShrink: 0,
                    background: showResult && i === question.correctAnswer ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
                  }}>
                    {badgeLabel}
                  </span>
                  <span style={{ lineHeight: '1.4' }}>{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {showResult && (
          <button
            onClick={handleNext}
            className="btn-primary animate-fade-in"
            style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
          >
            {currentQ === questions.length - 1 ? ui.seeResults : ui.next}
          </button>
        )}
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="animate-fade-in" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }} className="animate-float">?</div>
            <p style={{ color: 'var(--text-secondary)' }}>Loading quiz...</p>
          </div>
        </div>
      }
    >
      <QuizPageContent />
    </Suspense>
  );
}
