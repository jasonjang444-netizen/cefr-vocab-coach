'use client';

import { getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/language-context';

const copyByLanguage = {
  en: {
    title: 'Create your account',
    subtitle: 'Start your CEFR vocabulary journey with a personalized daily plan.',
    username: 'Username',
    usernamePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Password',
    passwordPlaceholder: 'Create a password',
    createAccount: 'Create Account',
    creatingAccount: 'Creating Account...',
    or: 'or',
    redirectingGoogle: 'Redirecting to Google...',
    continueWithGoogle: 'Continue with Google',
    haveAccount: 'Already have an account?',
    logIn: 'Log in',
    networkError: 'Network error. Please try again.',
    genericError: 'Something went wrong',
    autoLoginError: 'Account created, but automatic sign-in failed. Please log in.',
    googleUnavailable: 'Google sign-in is not configured yet. Please create an account with email for now.',
  },
  ko: {
    title: '계정을 만들어보세요',
    subtitle: '맞춤형 일일 플랜으로 CEFR 단어 학습을 시작하세요.',
    username: '사용자 이름',
    usernamePlaceholder: '이름을 입력하세요',
    email: '이메일',
    emailPlaceholder: 'you@example.com',
    password: '비밀번호',
    passwordPlaceholder: '비밀번호를 만들어주세요',
    createAccount: '계정 만들기',
    creatingAccount: '계정 생성 중...',
    or: '또는',
    redirectingGoogle: '구글로 이동하는 중...',
    continueWithGoogle: 'Google로 계속하기',
    haveAccount: '이미 계정이 있나요?',
    logIn: '로그인',
    networkError: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
    genericError: '문제가 발생했습니다.',
    autoLoginError: '계정은 생성되었지만 자동 로그인이 실패했습니다. 직접 로그인해주세요.',
    googleUnavailable: 'Google 로그인 설정이 아직 완료되지 않았습니다. 지금은 이메일로 가입해주세요.',
  },
} as const;

export default function SignupPage() {
  const { language } = useLanguage();
  const ui = copyByLanguage[language];
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [providersLoading, setProvidersLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let active = true;

    void getProviders()
      .then((providers) => {
        if (!active) {
          return;
        }

        setGoogleEnabled(Boolean(providers?.google));
      })
      .catch(() => {
        if (active) {
          setGoogleEnabled(false);
        }
      })
      .finally(() => {
        if (active) {
          setProvidersLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || ui.genericError);
        setLoading(false);
        return;
      }

      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError(ui.autoLoginError);
        setLoading(false);
        return;
      }

      router.push('/dashboard');
    } catch {
      setError(ui.networkError);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!googleEnabled) {
      setError(ui.googleUnavailable);
      return;
    }

    setError('');
    setGoogleLoading(true);
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="bg-grid bg-gradient-radial min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '460px' }}>
        <div style={{ textAlign: 'center', marginBottom: '34px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'inherit' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
              }}
            >
              C
            </div>
            <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              CEFR Vocab Coach
            </span>
          </Link>
        </div>

        <div className="glass" style={{ padding: '36px', borderRadius: '24px' }}>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, textAlign: 'center', marginBottom: '8px' }}>{ui.title}</h1>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '28px' }}>{ui.subtitle}</p>

          {error && (
            <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', color: '#fca5a5', marginBottom: '18px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ui.username}</label>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="input-field"
                placeholder={ui.usernamePlaceholder}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ui.email}</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="input-field"
                placeholder={ui.emailPlaceholder}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ui.password}</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="input-field"
                placeholder={ui.passwordPlaceholder}
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', marginTop: '4px' }} disabled={loading}>
              {loading ? ui.creatingAccount : ui.createAccount}
            </button>
          </form>

          {!providersLoading && googleEnabled && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '22px 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>{ui.or}</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="btn-secondary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                disabled={googleLoading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {googleLoading ? ui.redirectingGoogle : ui.continueWithGoogle}
              </button>
            </>
          )}

          <p style={{ textAlign: 'center', marginTop: '22px', color: 'var(--text-secondary)' }}>
            {ui.haveAccount}{' '}
            <Link href="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 700 }}>
              {ui.logIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
