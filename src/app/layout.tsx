import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CEFR Vocab Coach — Reach Your Target Level",
  description: "Take an AI placement test and follow a personalized daily vocabulary learning path designed for your CEFR level. Your personal vocabulary coach from A1 to C2.",
  keywords: "CEFR, vocabulary, English learning, placement test, language coach, study plan",
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
      </body>
    </html>
  );
}
