import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '이하은 | 홍익대학교 포트폴리오',
  description:
    '홍익대학교 소프트웨어융합학과 이하은의 개인 포트폴리오입니다. 창의적인 아이디어와 기술 역량을 소개합니다.',
  keywords: [
    '이하은',
    '홍익대학교',
    '소프트웨어융합학과',
    '포트폴리오',
    'Haeun Lee',
    'Frontend Developer',
  ],
  authors: [{ name: '이하은' }],
  icons: {
    icon: '/avatar.png',
  },
  openGraph: {
    title: '이하은 | 홍익대학교 포트폴리오',
    description: '홍익대학교 소프트웨어융합학과 이하은의 개인 포트폴리오입니다.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
