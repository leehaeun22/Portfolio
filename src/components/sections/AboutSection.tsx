'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Heart, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { PROFILE } from '@/constants/profile';
import { fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem } from '@/utils/animations';

const INFO_CARDS = [
  { icon: GraduationCap, label: '학교', value: PROFILE.university },
  { icon: Heart, label: '전공', value: PROFILE.major },
  { icon: MapPin, label: '위치', value: PROFILE.location },
  { icon: Sparkles, label: '학년', value: PROFILE.year },
];

const STATS = [
  { value: '4+', label: '프로젝트' },
  { value: '10+', label: '기술 스택' },
  { value: '1', label: '수상 경험' },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...fadeInLeft} className="mb-10">
      <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-rose-500">
        About Me
      </span>
      <h2 className="text-heading-1 text-neutral-900 dark:text-white">{children}</h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-[linear-gradient(90deg,#f43f5e,#a855f7)]" />
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...scaleIn} className="flex justify-center">
            <div className="relative">
              <div className="relative flex h-72 w-72 items-center justify-center overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-xl shadow-rose-100/40 dark:border-rose-900/20 dark:bg-neutral-900 dark:shadow-rose-950/20 md:h-80 md:w-80">
                <Image
                  src="/avatar.png"
                  alt={`${PROFILE.name} 프로필 사진`}
                  width={320}
                  height={320}
                  className="h-full w-full object-cover"
                />
              </div>

              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-card absolute -right-4 -top-4 rounded-2xl px-4 py-2 shadow-lg"
              >
                <div>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">
                    {PROFILE.name}
                  </p>
                  <p className="text-xs text-rose-500">{PROFILE.major}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div>
            <SectionTitle>저를 소개합니다</SectionTitle>

            <motion.div {...fadeInRight} className="mb-8 space-y-4">
              {PROFILE.bio.split('\n').map((line) => (
                <p key={line} className="text-body-lg text-neutral-600 dark:text-neutral-300">
                  {line}
                </p>
              ))}
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {INFO_CARDS.map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  variants={staggerItem}
                  className="glass-card flex items-center gap-3 rounded-2xl p-4"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/40">
                    <Icon size={16} className="text-rose-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-400">{label}</p>
                    <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="flex flex-wrap gap-8"
            >
              {STATS.map(({ value, label }) => (
                <motion.div key={label} variants={staggerItem} className="text-center">
                  <p className="gradient-text text-3xl font-bold">{value}</p>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
