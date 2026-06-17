import type { ProjectData } from '@/interfaces/project.types';

export const PROJECTS: ProjectData[] = [
  {
    id: 'project-1',
    slug: 'design-system',
    title: '디자인 시스템 구축',
    description:
      '팀 프로젝트에서 일관된 UI/UX를 위한 컴포넌트 라이브러리와 디자인 가이드라인을 설계했습니다.',
    longDescription:
      '재사용 가능한 컴포넌트를 설계하고, Figma 기반 디자인 토큰 시스템을 구축했습니다.',
    tags: ['Figma', 'React', 'Storybook', 'Design Tokens'],
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    githubUrl: 'https://github.com/haeunlee',
    liveUrl: '',
    featured: true,
  },
  {
    id: 'project-2',
    slug: 'web-portfolio',
    title: '개인 포트폴리오 웹사이트',
    description:
      'Next.js와 Framer Motion을 사용해 인터랙티브한 개인 포트폴리오를 제작했습니다.',
    longDescription:
      'SSG 기반의 정적 포트폴리오로 다크 모드, 반응형 디자인, 접근성을 함께 고려했습니다.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    category: 'Web',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    githubUrl: 'https://github.com/haeunlee',
    liveUrl: '',
    featured: true,
  },
  {
    id: 'project-3',
    slug: 'mobile-app',
    title: '캠퍼스 라이프 앱',
    description:
      '대학생을 위한 캠퍼스 생활 정보를 한눈에 확인할 수 있는 모바일 앱을 개발했습니다.',
    longDescription:
      '강의실 위치, 식당 메뉴, 동아리 공고 등 학생에게 필요한 정보를 통합 제공하는 앱입니다.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Figma'],
    category: 'Mobile',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    githubUrl: 'https://github.com/haeunlee',
    liveUrl: '',
    featured: false,
  },
  {
    id: 'project-4',
    slug: 'data-visualization',
    title: '데이터 시각화 대시보드',
    description:
      '학교 데이터를 인터랙티브 차트와 그래프로 시각화하는 웹 대시보드를 개발했습니다.',
    longDescription:
      '학과 성적 분포, 졸업 및 취업 현황 등을 시각화해 커뮤니티 의사결정을 돕는 프로젝트입니다.',
    tags: ['React', 'D3.js', 'Python', 'FastAPI'],
    category: 'Web',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    githubUrl: 'https://github.com/haeunlee',
    liveUrl: '',
    featured: false,
  },
];

export const PROJECT_CATEGORIES = ['All', 'Web', 'Mobile', 'Design'] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
