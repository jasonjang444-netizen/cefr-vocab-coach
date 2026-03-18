'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CEFR_COLORS, CEFR_DESCRIPTIONS, CEFR_LEVELS, calculateProgress, normalizeCefrLevel } from '@/lib/cefr';
import { useLanguage } from '@/components/language-context';

interface DashboardData {
  userLevel: { currentCefr: string; targetCefr: string } | null;
  streak: number;
  wordsLearned: number;
  wordsInReview: number;
  difficultWords: number;
  avgQuizScore: number;
  totalSessions: number;
  weeklyStudyMinutes: number;
  weeklyWordsStudied: number;
  totalWordsTracked: number;
  recentQuizzes: { score: number; total: number; date: string; percentage: number }[];
  studyActivity: { label: string; minutes: number; words: number }[];
  quizPerformance: { label: string; score: number }[];
  vocabularyByLevel: { level: string; learned: number; review: number; difficult: number; total: number }[];
}

const contentByLanguage = {
  en: {
    loading: 'Loading progress data...',
    error: 'We could not load your progress yet.',
    backToDashboard: 'Back to Dashboard',
    title: 'Progress Tracking',
    subtitle: 'See how your daily practice is moving you from your current level to your target.',
    path: 'CEFR path',
    pathProgress: (progress: number) => `${progress}% progress toward target`,
    current: 'Current',
    target: 'Target',
    wordsLearned: 'Words learned',
    wordsInReview: 'Words in review',
    difficultWords: 'Difficult words',
    quizAccuracy: 'Quiz accuracy',
    studyStreak: 'Study streak',
    weeklyTime: 'Weekly study time',
    days: 'days',
    min: 'min',
    vocabGrowth: 'Vocabulary Growth',
    vocabGrowthBody: 'Words touched each day through study and review sessions.',
    quizPerformance: 'Quiz Performance',
    quizPerformanceBody: 'Recent quiz percentages so you can see your retention trend.',
    wordsByLevel: 'Words by CEFR Level',
    trackedWords: (count: number) => `${count} tracked words`,
    learnedReviewDifficult: (learned: number, review: number, difficult: number) =>
      `Learned ${learned} • Review ${review} • Difficult ${difficult}`,
    recentQuizResults: 'Recent Quiz Results',
    noQuizzes: 'No quizzes taken yet. Once you start daily tests, your recent results will show up here.',
    correct: (score: number, total: number) => `${score}/${total} correct`,
    score: (percentage: number) => `${percentage}% score`,
    overallTotals: 'Overall totals',
    trackedVocabulary: 'Tracked vocabulary',
    weeklyWordsStudied: 'Weekly words studied',
    sessionsCompleted: 'Study sessions completed',
  },
  ko: {
    loading: '진행 데이터를 불러오는 중입니다...',
    error: '아직 진행 데이터를 불러오지 못했습니다.',
    backToDashboard: '대시보드로 돌아가기',
    title: '진행도 추적',
    subtitle: '현재 레벨에서 목표 레벨까지, 매일의 학습이 얼마나 도움이 되고 있는지 확인하세요.',
    path: 'CEFR 경로',
    pathProgress: (progress: number) => `목표까지 ${progress}% 진행`,
    current: '현재',
    target: '목표',
    wordsLearned: '학습한 단어',
    wordsInReview: '복습 중 단어',
    difficultWords: '어려운 단어',
    quizAccuracy: '퀴즈 정확도',
    studyStreak: '학습 스트릭',
    weeklyTime: '주간 학습 시간',
    days: '일',
    min: '분',
    vocabGrowth: '단어 성장 추이',
    vocabGrowthBody: '학습과 복습을 통해 매일 다룬 단어 수를 보여줍니다.',
    quizPerformance: '퀴즈 성과',
    quizPerformanceBody: '최근 퀴즈 점수를 통해 기억 유지 흐름을 확인하세요.',
    wordsByLevel: 'CEFR 레벨별 단어',
    trackedWords: (count: number) => `추적 중인 단어 ${count}개`,
    learnedReviewDifficult: (learned: number, review: number, difficult: number) =>
      `학습 ${learned} • 복습 ${review} • 어려움 ${difficult}`,
    recentQuizResults: '최근 퀴즈 결과',
    noQuizzes: '아직 퀴즈 기록이 없어요. 일일 테스트를 시작하면 최근 결과가 여기에 표시됩니다.',
    correct: (score: number, total: number) => `${score}/${total} 정답`,
    score: (percentage: number) => `${percentage}% 점수`,
    overallTotals: '전체 합계',
    trackedVocabulary: '추적 중 단어',
    weeklyWordsStudied: '주간 학습 단어',
    sessionsCompleted: '완료한 학습 세션',
  },
} as const;

export default function ProgressPage() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const ui = contentByLanguage[language];
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [router, status]);

  useEffect(() => {
    const onboardingDone = Boolean((session?.user as Record<string, unknown> | undefined)?.onboardingDone);
    if (status === 'authenticated' && !onboardingDone) {
      router.replace('/onboarding');
    }
  }, [router, session, status]);

  useEffect(() => {
    const userId = (session?.user as Record<string, unknown> | undefined)?.id;
    if (!userId) {
      return;
    }

    fetch(`/api/dashboard?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load progress');
        }
        return response.json();
      })
      .then((dashboardData: DashboardData) => {
        setData(dashboardData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>{ui.loading}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="glass" style={{ borderRadius: '24px', padding: '28px', maxWidth: '520px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{ui.error}</p>
          <Link href="/dashboard" className="btn-primary" style={{ textDecoration: 'none', padding: '14px 24px' }}>
            {ui.backToDashboard}
          </Link>
        </div>
      </div>
    );
  }

  const currentLevel = normalizeCefrLevel(data.userLevel?.currentCefr);
  const targetLevel = normalizeCefrLevel(data.userLevel?.targetCefr);
  const progress = calculateProgress(currentLevel, targetLevel, data.wordsLearned);

  return (
    <div className="bg-grid min-h-screen" style={{ padding: '24px' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <Link href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-block', marginBottom: '10px' }}>
              {ui.backToDashboard}
            </Link>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>{ui.title}</h1>
            <p style={{ color: 'var(--text-secondary)' }}>{ui.subtitle}</p>
          </div>
          <div className="glass" style={{ borderRadius: '20px', padding: '18px 20px', minWidth: '220px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '6px' }}>{ui.path}</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 800 }}>{currentLevel} to {targetLevel}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ui.pathProgress(progress)}</p>
          </div>
        </div>

        <div className="glass" style={{ borderRadius: '24px', padding: '28px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {CEFR_LEVELS.map((level, index) => {
              const isCompleted = index <= CEFR_LEVELS.indexOf(currentLevel);
              const isCurrent = level === currentLevel;
              const isTarget = level === targetLevel;

              return (
                <div key={level} style={{ flex: 1, minWidth: '88px', textAlign: 'center' }}>
                  <div
                    style={{
                      height: '42px',
                      borderRadius: index === 0 ? '10px 0 0 10px' : index === CEFR_LEVELS.length - 1 ? '0 10px 10px 0' : '0',
                      background: isCompleted ? CEFR_COLORS[level] : 'var(--bg-secondary)',
                      opacity: isCompleted ? 1 : 0.35,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      border: isCurrent ? '2px solid rgba(255,255,255,0.9)' : isTarget ? `2px dashed ${CEFR_COLORS[level]}` : 'none',
                    }}
                  >
                    {level}
                  </div>
                  <div style={{ marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {isCurrent ? ui.current : isTarget ? ui.target : CEFR_DESCRIPTIONS[level]}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="progress-bar" style={{ height: '12px' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: ui.wordsLearned, value: data.wordsLearned, color: '#22c55e' },
            { label: ui.wordsInReview, value: data.wordsInReview, color: '#eab308' },
            { label: ui.difficultWords, value: data.difficultWords, color: '#f97316' },
            { label: ui.quizAccuracy, value: `${data.avgQuizScore}%`, color: '#6366f1' },
            { label: ui.studyStreak, value: `${data.streak} ${ui.days}`, color: '#ec4899' },
            { label: ui.weeklyTime, value: `${data.weeklyStudyMinutes} ${ui.min}`, color: '#a855f7' },
          ].map((item) => (
            <div key={item.label} className="card" style={{ padding: '20px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginBottom: '8px' }}>{item.label}</p>
              <p style={{ fontSize: '1.7rem', fontWeight: 800, color: item.color }}>{item.value}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px', marginBottom: '24px' }}>
          <div className="glass" style={{ borderRadius: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>{ui.vocabGrowth}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{ui.vocabGrowthBody}</p>
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer>
                <AreaChart data={data.studyActivity}>
                  <defs>
                    <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={32} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(148,163,184,0.18)', borderRadius: 12 }} />
                  <Area type="monotone" dataKey="words" stroke="#6366f1" fill="url(#studyGradient)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass" style={{ borderRadius: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>{ui.quizPerformance}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{ui.quizPerformanceBody}</p>
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer>
                <BarChart data={data.quizPerformance}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={32} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(148,163,184,0.18)', borderRadius: 12 }} />
                  <Bar dataKey="score" fill="#22c55e" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
          <div className="glass" style={{ borderRadius: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>{ui.wordsByLevel}</h2>
            <div style={{ display: 'grid', gap: '14px' }}>
              {data.vocabularyByLevel.map((item) => {
                const total = Math.max(1, item.total);
                const learnedPct = Math.round((item.learned / total) * 100);
                const reviewPct = Math.round((item.review / total) * 100);
                const difficultPct = Math.max(0, 100 - learnedPct - reviewPct);

                return (
                  <div key={item.level}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', gap: '12px', flexWrap: 'wrap' }}>
                      <span style={{ color: CEFR_COLORS[normalizeCefrLevel(item.level)], fontWeight: 800 }}>{item.level}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ui.trackedWords(item.total)}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '6px' }}>
                      <div style={{ height: '10px', borderRadius: '999px', background: '#22c55e', opacity: item.learned ? 1 : 0.15, width: `${Math.max(6, learnedPct)}%` }} />
                      <div style={{ height: '10px', borderRadius: '999px', background: '#eab308', opacity: item.review ? 1 : 0.15, width: `${Math.max(6, reviewPct)}%` }} />
                      <div style={{ height: '10px', borderRadius: '999px', background: '#f97316', opacity: item.difficult ? 1 : 0.15, width: `${Math.max(6, difficultPct)}%` }} />
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      {ui.learnedReviewDifficult(item.learned, item.review, item.difficult)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass" style={{ borderRadius: '24px', padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>{ui.recentQuizResults}</h2>
            {data.recentQuizzes.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>{ui.noQuizzes}</p>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {data.recentQuizzes.map((quiz) => (
                  <div key={`${quiz.date}-${quiz.score}-${quiz.total}`} className="card" style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 700 }}>{ui.correct(quiz.score, quiz.total)}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {new Date(quiz.date).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US')}
                      </span>
                    </div>
                    <div className="progress-bar" style={{ height: '8px', marginBottom: '6px' }}>
                      <div className="progress-bar-fill" style={{ width: `${quiz.percentage}%` }} />
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{ui.score(quiz.percentage)}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="card" style={{ padding: '18px', marginTop: '18px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '6px' }}>{ui.overallTotals}</p>
              <p style={{ color: 'var(--text-secondary)' }}>{ui.trackedVocabulary}: <strong style={{ color: 'var(--text-primary)' }}>{data.totalWordsTracked}</strong></p>
              <p style={{ color: 'var(--text-secondary)' }}>{ui.weeklyWordsStudied}: <strong style={{ color: 'var(--text-primary)' }}>{data.weeklyWordsStudied}</strong></p>
              <p style={{ color: 'var(--text-secondary)' }}>{ui.sessionsCompleted}: <strong style={{ color: 'var(--text-primary)' }}>{data.totalSessions}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
