'use client';

import { useLanguage } from '@/components/language-context';

const copyByLanguage = {
  en: {
    label: 'Language',
    english: 'EN',
    korean: 'KO',
  },
  ko: {
    label: '언어',
    english: 'EN',
    korean: 'KO',
  },
} as const;

export default function GlobalLanguageToggle() {
  const { language, mounted, setLanguage } = useLanguage();
  const ui = copyByLanguage[language];

  if (!mounted) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 60,
      }}
    >
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px',
          borderRadius: '999px',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.22)',
          backdropFilter: 'blur(12px)',
        }}
        role="group"
        aria-label={ui.label}
      >
        <span className="language-toggle-label" style={{ color: 'var(--text-muted)', fontSize: '0.78rem', paddingLeft: '8px' }}>
          {ui.label}
        </span>
        {(['en', 'ko'] as const).map((value) => {
          const selected = language === value;
          return (
            <button
              key={value}
              onClick={() => setLanguage(value)}
              style={{
                border: 'none',
                background: selected ? 'var(--accent-gradient)' : 'transparent',
                color: selected ? '#ffffff' : 'var(--text-secondary)',
                padding: '8px 14px',
                borderRadius: '999px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.82rem',
                minWidth: '52px',
              }}
              aria-pressed={selected}
            >
              {value === 'en' ? ui.english : ui.korean}
            </button>
          );
        })}
      </div>
    </div>
  );
}
