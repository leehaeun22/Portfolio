import { Github, Heart, Instagram, Mail } from 'lucide-react';
import { PROFILE } from '@/constants/profile';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: PROFILE.github, label: 'GitHub' },
    { icon: Instagram, href: PROFILE.instagram, label: 'Instagram' },
    { icon: Mail, href: `mailto:${PROFILE.email}`, label: 'Email' },
  ];

  return (
    <footer className="bg-neutral-950 py-12 text-white">
      <div className="section-container">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg gradient-text">{PROFILE.name}</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-neutral-400 transition-all duration-200 hover:bg-white/20 hover:text-rose-400"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <p className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-neutral-500">
            © {currentYear} {PROFILE.name}. Made with
            <Heart size={14} className="fill-rose-500 text-rose-500" />
            All rights reserved.
          </p>

          <p className="text-xs text-neutral-600">
            {PROFILE.university} · {PROFILE.major}
          </p>
        </div>
      </div>
    </footer>
  );
}
