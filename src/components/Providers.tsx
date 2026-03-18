'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import GlobalLanguageToggle from '@/components/GlobalLanguageToggle';
import { LanguageProvider } from '@/components/language-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <GlobalLanguageToggle />
        {children}
      </LanguageProvider>
    </SessionProvider>
  );
}
