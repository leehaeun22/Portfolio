'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { PROJECTS, PROJECT_CATEGORIES } from '@/constants/projects';
import type { ProjectCategory } from '@/constants/projects';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const filtered = PROJECTS.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory,
  );

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <motion.div {...fadeInUp} className="mb-10 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-rose-500">
            Projects
          </span>
          <h2 className="mb-4 text-heading-1 text-neutral-900 dark:text-white">
            프로젝트 포트폴리오
          </h2>
          <p className="mx-auto max-w-lg text-neutral-500 dark:text-neutral-400">
            아이디어를 실제 서비스로 만들며 쌓은 작업들을 소개합니다.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[linear-gradient(90deg,#f43f5e,#a855f7)]" />
        </motion.div>

        <motion.div {...fadeInUp} className="mb-12 flex flex-wrap justify-center gap-3">
          {PROJECT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`inline-flex h-10 min-w-20 items-center justify-center whitespace-nowrap rounded-full px-5 text-sm font-semibold transition-all duration-200 ${
                activeCategory === category
                  ? 'scale-105 bg-[linear-gradient(135deg,#f43f5e,#a855f7)] text-white shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30'
                  : 'glass-card text-neutral-600 hover:scale-105 dark:text-neutral-300'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="initial"
            animate="whileInView"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:gap-9"
          >
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                variants={staggerItem}
                className="flex h-auto min-h-0 flex-col overflow-hidden rounded-[24px] border border-rose-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-100/40 dark:border-rose-900/20 dark:bg-neutral-900 dark:hover:shadow-rose-900/20"
              >
                <div className="group relative h-[260px] w-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-rose-50 to-purple-50 dark:from-rose-950/20 dark:to-purple-950/20">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-end justify-center gap-3 bg-gradient-to-t from-black/60 to-transparent pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white/90 px-4 text-xs font-semibold text-neutral-900 transition-colors hover:bg-white"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#f43f5e,#a855f7)] px-4 text-xs font-semibold text-white"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    )}
                  </div>

                  {project.featured && (
                    <div className="absolute left-3 top-3 rounded-full bg-[linear-gradient(135deg,#f43f5e,#a855f7)] px-3 py-1 text-xs font-bold text-white">
                      Featured
                    </div>
                  )}
                </div>

                <div className="box-border flex h-auto min-h-0 w-full min-w-0 flex-col overflow-visible px-7 pb-9 pt-6">
                  <h3 className="mb-2.5 break-keep whitespace-normal overflow-visible text-lg font-bold leading-tight text-neutral-900 dark:text-white md:text-xl">
                    {project.title}
                  </h3>
                  <p className="mb-4 break-keep whitespace-normal overflow-visible text-sm leading-7 text-neutral-500 dark:text-neutral-400">
                    {project.description}
                  </p>

                  <div className="box-border flex w-full flex-wrap gap-2 overflow-visible">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex max-w-full items-center whitespace-nowrap rounded-full border border-rose-100 bg-rose-50 px-2.5 py-1 text-[11px] font-medium leading-none text-rose-600 dark:border-rose-900/30 dark:bg-rose-950/30 dark:text-rose-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
