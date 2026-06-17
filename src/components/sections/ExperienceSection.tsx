'use client';

import { motion } from 'framer-motion';
import { Activity, Award, GraduationCap } from 'lucide-react';
import { EXPERIENCE } from '@/constants/experience';
import type { ExperienceType } from '@/interfaces/experience.types';
import { fadeInUp } from '@/utils/animations';

const TYPE_CONFIG: Record<
  ExperienceType,
  { icon: React.ElementType; dotClass: string; iconClass: string; badgeClass: string; label: string }
> = {
  education: {
    icon: GraduationCap,
    dotClass: 'border-rose-500 bg-rose-50 dark:bg-rose-950/40',
    iconClass: 'text-rose-500',
    badgeClass: 'bg-rose-50 text-rose-500 dark:bg-rose-950/40',
    label: '학력',
  },
  activity: {
    icon: Activity,
    dotClass: 'border-purple-500 bg-purple-50 dark:bg-purple-950/40',
    iconClass: 'text-purple-500',
    badgeClass: 'bg-purple-50 text-purple-500 dark:bg-purple-950/40',
    label: '활동',
  },
  award: {
    icon: Award,
    dotClass: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40',
    iconClass: 'text-amber-500',
    badgeClass: 'bg-amber-50 text-amber-500 dark:bg-amber-950/40',
    label: '수상',
  },
};

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding bg-[var(--bg-subtle)]">
      <div className="section-container">
        <motion.div {...fadeInUp} className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-rose-500">
            Experience
          </span>
          <h2 className="mb-4 text-heading-1 text-neutral-900 dark:text-white">
            경력 & 학력 타임라인
          </h2>
          <p className="mx-auto max-w-lg text-neutral-500 dark:text-neutral-400">
            지금까지 쌓아온 배움과 활동을 시간순으로 소개합니다.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[linear-gradient(90deg,#f43f5e,#a855f7)]" />
        </motion.div>

        <div className="relative mx-auto max-w-[960px]">
          <div className="absolute bottom-0 left-5 top-0 w-0.5 rounded-full bg-[linear-gradient(to_bottom,#f43f5e,#a855f7,transparent)] md:left-8" />

          <div className="space-y-8 pl-14 md:space-y-9 md:pl-20">
            {EXPERIENCE.map((item, index) => {
              const config = TYPE_CONFIG[item.type];
              const Icon = config.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div
                    className={`absolute -left-[3.05rem] top-6 flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-lg md:-left-[4.45rem] ${config.dotClass}`}
                  >
                    <Icon size={18} className={config.iconClass} />
                  </div>

                  <div className="glass-card h-auto rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:shadow-rose-100/20 dark:hover:shadow-rose-900/10 md:p-8">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span
                          className={`mb-3 inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold ${config.badgeClass}`}
                        >
                          {config.label}
                        </span>
                        <h3 className="text-lg font-bold leading-tight text-neutral-900 dark:text-white">
                          {item.organization}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-rose-500">{item.role}</p>
                      </div>
                      <span className="inline-flex h-8 items-center self-start whitespace-nowrap rounded-full bg-neutral-100 px-3 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-300">
                        {item.period}
                      </span>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
