'use client';

import { motion } from 'framer-motion';
import { SKILLS } from '@/constants/skills';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-[var(--bg-subtle)]">
      <div className="section-container">
        <motion.div {...fadeInUp} className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-rose-500">
            Skills
          </span>
          <h2 className="mb-4 text-heading-1 text-neutral-900 dark:text-white">
            기술 스택 & 역량
          </h2>
          <p className="mx-auto max-w-lg text-neutral-500 dark:text-neutral-400">
            다양한 프로젝트를 통해 쌓아온 기술과 협업 역량입니다.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[linear-gradient(90deg,#f43f5e,#a855f7)]" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 items-start gap-8 md:grid-cols-2"
        >
          {SKILLS.map((category) => (
            <motion.div
              key={category.category}
              variants={staggerItem}
              className="glass-card h-auto rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:shadow-rose-100/30 dark:hover:shadow-rose-900/20 md:p-8"
            >
              <div className="mb-7 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-sm font-bold text-rose-500 dark:bg-rose-950/40">
                  {category.icon}
                </span>
                <h3 className="text-xl font-bold leading-tight text-neutral-900 dark:text-white">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="text-sm font-medium leading-none text-neutral-700 dark:text-neutral-200">
                        {skill.name}
                      </span>
                      <span className="text-xs font-semibold leading-none text-rose-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="h-full rounded-full bg-[linear-gradient(90deg,#f43f5e,#a855f7)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
