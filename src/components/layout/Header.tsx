'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROFILE } from '@/constants/profile';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-rose-100/50 bg-white/80 shadow-sm backdrop-blur-xl dark:border-rose-900/20 dark:bg-neutral-900/80'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex h-16 items-center justify-between gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex min-w-0 items-center gap-2"
              aria-label="홈으로 이동"
            >
              <span className="font-bold text-lg gradient-text">{PROFILE.name}</span>
            </button>

            <nav className="hidden items-center gap-6 md:flex" aria-label="메인 네비게이션">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="group relative text-sm font-medium text-neutral-600 transition-colors hover:text-rose-500 dark:text-neutral-300 dark:hover:text-rose-400"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-rose-500 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {mounted && (
                <button
                  onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-all hover:bg-rose-50 hover:text-rose-500 dark:text-neutral-400 dark:hover:bg-rose-900/20"
                  aria-label="다크 모드 전환"
                >
                  {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}

              <a
                href="/resume.pdf"
                download="Lee_Haeun_Resume.pdf"
                className="hidden h-[38px] min-w-24 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#f43f5e,#a855f7)] px-4 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-rose-200/50 dark:hover:shadow-rose-900/30 md:inline-flex"
                aria-label="이력서 다운로드"
              >
                <Download size={14} />
                이력서
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-all hover:bg-rose-50 dark:hover:bg-rose-900/20 md:hidden"
                aria-label="메뉴 열기 또는 닫기"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 top-16 z-40 border-b border-rose-100 bg-white/95 shadow-xl backdrop-blur-xl dark:border-rose-900/20 dark:bg-neutral-900/95"
          >
            <nav className="section-container flex flex-col gap-4 py-6">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="border-b border-neutral-100 py-2 text-left text-base font-medium text-neutral-700 transition-colors last:border-0 hover:text-rose-500 dark:border-neutral-800 dark:text-neutral-200"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/resume.pdf"
                download="Lee_Haeun_Resume.pdf"
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#f43f5e,#a855f7)] px-6 text-sm font-semibold text-white"
              >
                <Download size={14} />
                이력서 다운로드
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
