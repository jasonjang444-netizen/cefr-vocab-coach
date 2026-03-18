'use client';

import { startTransition, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CEFR_COLORS, CEFR_DESCRIPTIONS, getDifficulty, getRecommendedTarget, normalizeCefrLevel } from '@/lib/cefr';
import { useLanguage } from '@/components/language-context';

interface PlacementResult {
  level: string;
  score: number;
  total: number;
  confidence: string;
  strengths: string[];
  weaknesses: string[];
  recommendedTarget?: string;
}

const copyByLanguage = {
  en: {
    loading: 'Loading your placement result...',
    missing: 'We could not find your latest placement result.',
    takeTest: 'Take Placement Test',
    section: 'Placement result',
    currentLevel: 'Current level',
    confidence: 'confidence',
    correctAnswers: 'Correct answers',
    accuracy: 'Accuracy',
    recommendedTarget: 'Recommended target',
    strengths: 'Strengths',
    weaknesses: 'Weak areas',
    nextStep: 'Next step',
    nextTitle: 'Choose the level you want to reach next.',
    retake: 'Retake Test',
    chooseTarget: 'Choose Target Level',
  },
  ko: {
    loading: '레벨 테스트 결과를 불러오는 중입니다...',
    missing: '최근 레벨 테스트 결과를 찾지 못했습니다.',
    takeTest: '레벨 테스트 보기',
    section: '레벨 테스트 결과',
    currentLevel: '현재 레벨',
    confidence: '신뢰도',
    correctAnswers: '정답 수',
    accuracy: '정확도',
    recommendedTarget: '추천 목표',
    strengths: '강점',
    weaknesses: '약한 영역',
    nextStep: '다음 단계',
    nextTitle: '다음에 도달하고 싶은 레벨을 선택하세요.',
    retake: '테스트 다시 보기',
    chooseTarget: '목표 레벨 선택',
  },
} as const;

export default function PlacementResultPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const ui = copyByLanguage[language];
  const [result, setResult] = useState<PlacementResult | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('placementResult');
    startTransition(() => {
      setResult(storedResult ? (JSON.parse(storedResult) as PlacementResult) : null);
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>{ui.loading}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="glass" style={{ borderRadius: '24px', padding: '28px', maxWidth: '520px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{ui.missing}</p>
          <button onClick={() => router.push('/placement-test')} className="btn-primary" style={{ padding: '14px 24px' }}>
            {ui.takeTest}
          </button>
        </div>
      </div>
    );
  }

  const currentLevel = normalizeCefrLevel(result.level);
  const recommendedTarget = normalizeCefrLevel(result.recommendedTarget ?? getRecommendedTarget(currentLevel));
  const description = CEFR_DESCRIPTIONS[currentLevel];
  const accuracy = Math.round((result.score / Math.max(1, result.total)) * 100);

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '860px' }}>
        <div className="glass" style={{ borderRadius: '28px', padding: '34px', marginBottom: '22px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            {ui.section}
          </p>
          <h1 style={{ fontSize: '2.3rem', fontWeight: 800, marginBottom: '12px' }}>{ui.currentLevel}: {currentLevel}</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginBottom: '28px' }}>
            {language === 'ko'
              ? `결과상 전반적인 어휘 프로필은 ${description} 수준이며, 신뢰도는 ${result.confidence.toLowerCase()}입니다.`
              : `Your result suggests an overall ${description} vocabulary profile with ${result.confidence.toLowerCase()} ${ui.confidence}.`}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div className="card" style={{ padding: '22px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '6px' }}>{ui.correctAnswers}</p>
              <p style={{ fontSize: '2rem', fontWeight: 800 }}>{result.score}/{result.total}</p>
            </div>
            <div className="card" style={{ padding: '22px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '6px' }}>{ui.accuracy}</p>
              <p style={{ fontSize: '2rem', fontWeight: 800 }}>{accuracy}%</p>
            </div>
            <div className="card" style={{ padding: '22px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '6px' }}>{ui.recommendedTarget}</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: CEFR_COLORS[recommendedTarget] }}>{recommendedTarget}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '22px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px' }}>{ui.strengths}</h2>
            <div style={{ display: 'grid', gap: '10px' }}>
              {result.strengths.map((item) => (
                <div key={item} style={{ padding: '12px 14px', borderRadius: '14px', background: 'rgba(34, 197, 94, 0.1)', color: '#bbf7d0' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px' }}>{ui.weaknesses}</h2>
            <div style={{ display: 'grid', gap: '10px' }}>
              {result.weaknesses.map((item) => (
                <div key={item} style={{ padding: '12px 14px', borderRadius: '14px', background: 'rgba(234, 179, 8, 0.12)', color: '#fde68a' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass" style={{ borderRadius: '24px', padding: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                {ui.nextStep}
              </p>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '10px' }}>{ui.nextTitle}</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {language === 'ko'
                  ? `추천 단계는 ${recommendedTarget}이며, ${getDifficulty(currentLevel, recommendedTarget)}`
                  : `The recommended step is ${recommendedTarget}. ${getDifficulty(currentLevel, recommendedTarget)}`}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => router.push('/placement-test')} className="btn-secondary" style={{ padding: '14px 22px' }}>
                {ui.retake}
              </button>
              <button onClick={() => router.push('/select-level')} className="btn-primary" style={{ padding: '14px 22px' }}>
                {ui.chooseTarget}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
