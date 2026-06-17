'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { PROFILE } from '@/constants/profile';
import { fadeInUp } from '@/utils/animations';

const ROLES = ['프론트엔드 개발자', 'UI/UX 디자이너', '크리에이티브 메이커'];

export function HeroSection() {
  const handleScrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20"
    >
      <div className="absolute inset-0 animate-gradient bg-[linear-gradient(135deg,#fff1f2_0%,#fdf4ff_30%,#f0f9ff_60%,#fff1f2_100%)]" />
      <div className="absolute inset-0 hidden animate-gradient dark:block dark:bg-[linear-gradient(135deg,#1a0010_0%,#12001a_30%,#001214_60%,#1a0010_100%)]" />

      <div className="relative z-10 flex min-h-[calc(100vh-10rem)] items-center">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto flex max-w-[1100px] flex-col items-center text-center"
          >
            <div className="relative mb-3">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white shadow-xl shadow-rose-200/40 dark:border-neutral-900 dark:shadow-rose-950/30 md:h-36 md:w-36">
                <Image
                  src="/avatar.png"
                  alt={`${PROFILE.name} 프로필 이미지`}
                  width={144}
                  height={144}
                  className="h-full w-full rounded-full object-cover"
                  priority
                />
              </div>
            </div>

            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm backdrop-blur dark:border-rose-900/40 dark:bg-neutral-900/70 dark:text-rose-300">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              활동 중
            </span>

            <motion.div {...fadeInUp} className="mb-5">
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 dark:border-rose-800/40 dark:bg-rose-950/30 dark:text-rose-400">
                <Sparkles size={14} />
                {PROFILE.university} {PROFILE.major} {PROFILE.year}
              </span>
            </motion.div>

            <h1 className="mb-4 max-w-[1100px] text-center text-[clamp(2.35rem,5vw,4.65rem)] font-extrabold leading-[1.1] tracking-normal text-neutral-950 [word-break:keep-all] dark:text-white sm:whitespace-nowrap">
              안녕하세요,{' '}
              <span className="whitespace-nowrap">
                <span className="gradient-text">{PROFILE.name}</span>입니다.
              </span>
            </h1>

            <div className="mb-3 flex flex-wrap justify-center gap-2.5">
              {ROLES.map((role) => (
                <span
                  key={role}
                  className="glass-card inline-flex min-h-9 items-center rounded-full px-4 text-sm font-semibold text-neutral-700 dark:text-neutral-200"
                >
                  {role}
                </span>
              ))}
            </div>

            <p className="mx-auto mb-6 max-w-2xl text-body-lg text-neutral-600 dark:text-neutral-300">
              {PROFILE.bioShort}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() =>
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex h-12 min-w-[120px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#f43f5e,#a855f7)] px-6 text-[15px] font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-rose-200/50 dark:hover:shadow-rose-900/30"
              >
                <Mail size={16} />
                연락하기
              </button>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card inline-flex h-12 min-w-[120px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-semibold text-neutral-700 transition-all duration-200 hover:scale-105 hover:shadow-lg dark:text-neutral-200"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="/resume.pdf"
                download="Lee_Haeun_Resume.pdf"
                className="glass-card inline-flex h-12 min-w-[120px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-semibold text-neutral-700 transition-all duration-200 hover:scale-105 hover:shadow-lg dark:text-neutral-200"
              >
                이력서
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        onClick={handleScrollToAbout}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-neutral-400 transition-colors hover:text-rose-500 md:flex"
        aria-label="아래로 스크롤"
      >
        <span className="text-xs font-medium">Scroll</span>
        <ArrowDown size={20} />
      </button>
    </section>
  );
}
