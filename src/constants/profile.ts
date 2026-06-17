// Personal portfolio data

export const PROFILE = {
  name: '이하은',
  nameEn: 'Lee Haeun',
  university: '홍익대학교',
  major: '소프트웨어융합학과',
  year: '4학년',
  email: 'haeun@example.com',
  github: 'https://github.com/haeunlee',
  instagram: 'https://instagram.com/haeunlee',
  blog: '',
  location: '서울, 대한민국',
  bio: `안녕하세요. 홍익대학교 소프트웨어융합학과 4학년 이하은입니다.\n창의적인 아이디어로 일상에 가치를 더하는 것을 좋아합니다.\n디자인과 기술의 경계에서 새로운 가능성을 탐구하고 있습니다.`,
  bioShort: '홍익대학교에서 꿈을 키우는 프론트엔드 개발자 이하은입니다.',
  availableForWork: true,
  avatarEmoji: '/profile.png',
} as const;

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: PROFILE.github,
    icon: 'github',
  },
  {
    name: 'Instagram',
    url: PROFILE.instagram,
    icon: 'instagram',
  },
  {
    name: 'Email',
    url: `mailto:${PROFILE.email}`,
    icon: 'mail',
  },
] as const;
