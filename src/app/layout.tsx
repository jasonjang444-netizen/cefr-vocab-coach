import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Providers from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CEFR Vocab Coach | Reach Your Target Level',
  description:
    'Take a placement test, set your CEFR goal, and follow a personalized daily vocabulary path from A1 to C2.',
  keywords: ['CEFR', 'vocabulary', 'English learning', 'placement test', 'study plan'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
