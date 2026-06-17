import type { SkillCategory } from '@/interfaces/skill.types';

export const SKILLS: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: 'FE',
    skills: [
      { name: 'React', level: 80 },
      { name: 'Next.js', level: 75 },
      { name: 'TypeScript', level: 70 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind CSS', level: 80 },
    ],
  },
  {
    category: 'Design',
    icon: 'UX',
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'Adobe XD', level: 70 },
      { name: 'Illustrator', level: 65 },
      { name: 'Photoshop', level: 60 },
    ],
  },
  {
    category: 'Backend & Tools',
    icon: 'BT',
    skills: [
      { name: 'Python', level: 70 },
      { name: 'Node.js', level: 60 },
      { name: 'Git', level: 80 },
      { name: 'Firebase', level: 65 },
    ],
  },
  {
    category: 'Soft Skills',
    icon: 'SS',
    skills: [
      { name: '창의적 사고', level: 95 },
      { name: '팀워크', level: 90 },
      { name: '커뮤니케이션', level: 88 },
      { name: '문제 해결', level: 85 },
    ],
  },
];
