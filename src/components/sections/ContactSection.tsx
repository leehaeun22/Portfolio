'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, Github, Instagram, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROFILE } from '@/constants/profile';
import { fadeInLeft, fadeInRight, fadeInUp } from '@/utils/animations';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: '이메일',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/haeunlee',
    href: PROFILE.github,
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@haeunlee',
    href: PROFILE.instagram,
  },
];

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = '이름을 입력해주세요.';
    if (!form.email.trim()) newErrors.email = '이메일을 입력해주세요.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }
    if (!form.subject.trim()) newErrors.subject = '제목을 입력해주세요.';
    if (!form.message.trim()) newErrors.message = '메시지를 입력해주세요.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 dark:bg-neutral-800 dark:text-white ${
      errors[field]
        ? 'border-red-400'
        : 'border-neutral-200 hover:border-rose-300 dark:border-neutral-700 dark:hover:border-rose-700'
    }`;

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <motion.div {...fadeInUp} className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-rose-500">
            Contact
          </span>
          <h2 className="mb-4 text-heading-1 text-neutral-900 dark:text-white">
            함께 이야기해요
          </h2>
          <p className="mx-auto max-w-lg text-neutral-500 dark:text-neutral-400">
            궁금한 점이나 작업 제안이 있다면 언제든 연락해주세요.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[linear-gradient(90deg,#f43f5e,#a855f7)]" />
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-5">
          <motion.div {...fadeInLeft} className="space-y-5 lg:col-span-2">
            <div>
              <h3 className="mb-2 text-xl font-bold text-neutral-900 dark:text-white">
                연락처 정보
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                아래 채널로도 편하게 연락할 수 있습니다.
              </p>
            </div>

            {CONTACT_LINKS.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="glass-card group flex items-center gap-4 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg hover:shadow-rose-100/30 dark:hover:shadow-rose-900/20"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-rose-50 transition-transform group-hover:scale-110 dark:bg-rose-950/40">
                  <Icon size={20} className="text-rose-500" />
                </div>
                <div className="min-w-0">
                  <p className="mb-0.5 text-xs text-neutral-400">{label}</p>
                  <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                    {value}
                  </p>
                </div>
              </a>
            ))}

            <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4 text-sm dark:border-rose-900/30 dark:bg-rose-950/20">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">현재 활동 중</span>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400">
                협업과 프로젝트 참여를 환영합니다.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInRight} className="lg:col-span-3">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card flex min-h-[360px] flex-col items-center justify-center gap-4 rounded-2xl p-8 text-center md:p-10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/40">
                  <CheckCircle size={32} className="text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  메시지를 보냈어요!
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400">
                  빠른 시일 안에 답장드릴게요.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#f43f5e,#a855f7)] px-6 text-sm font-semibold text-white"
                >
                  다시 작성하기
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="glass-card space-y-5 rounded-2xl p-6 md:p-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      이름 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="홍길동"
                      className={inputClass('name')}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      이메일 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className={inputClass('email')}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    제목 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="작업 제안입니다"
                    className={inputClass('subject')}
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle size={12} /> {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    메시지 <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="함께 이야기하고 싶은 내용을 자유롭게 적어주세요."
                    className={`${inputClass('message')} resize-none`}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[linear-gradient(135deg,#f43f5e,#a855f7)] px-6 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-rose-200/50 disabled:cursor-not-allowed disabled:opacity-70 dark:hover:shadow-rose-900/30"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      전송 중...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      메시지 보내기
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
