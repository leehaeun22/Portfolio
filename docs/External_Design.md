# Design Template: Portfolio Website

> **[AI Agent Instruction]**
> - 에이전트는 `@PRD.md`에 명시된 개인의 **직군**, **브랜드 무드**, **포트폴리오 목표**를 종합 분석하여 아래의 디자인 시스템과 섹션 블록을 선택·조립한다.
> - 절대 인라인 스타일(`style={{}}`)이나 커스텀 CSS를 새로 작성하지 말 것. 모든 스타일링은 **Tailwind CSS**를 따른다.
> - 페이지 렌더링 시, 반드시 **[6. Page Assembly Logic]**의 조합 공식을 준수하여 컴포넌트를 배치한다.
> - 모든 컴포넌트는 **Framer Motion** 기반의 스크롤 트리거 애니메이션을 포함해야 한다.
> - 모든 페이지에 **SEO 메타 태그**, **OG 태그**, **구조화 데이터(JSON-LD)**를 필수 적용한다.

---

## 1. Design System Foundation (디자인 시스템 기반)

### 1.1 Theme Configuration

에이전트는 PRD 분석 후 `tailwind.config.ts`의 아래 디자인 토큰을 **가장 먼저** 설정한다.

```typescript
// tailwind.config.ts — 포트폴리오 디자인 토큰
const designTokens = {
  colors: {
    primary: {
      50:  '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',  // ★ Base — 직군 분석 후 교체
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    neutral: {
      // Tailwind 기본 Zinc/Slate 팔레트 중 선택
    },
    accent: '#...', // 보조 포인트 컬러 (CTA 버튼, 배지 등)
  },
  borderRadius: {
    // 직군별 라운드 전략
    // 개발자       = '0.75rem'
    // 디자이너     = '1.5rem (full rounded)'
    // 비즈니스/PM  = '0.5rem'
  },
  fontFamily: {
    heading: ['Pretendard', 'Inter', 'sans-serif'],
    body: ['Pretendard', 'Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],  // 코드/숫자 강조용
  },
  fontSize: {
    'display-1': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', fontWeight: '800' }],
    'display-2': ['clamp(2rem, 4vw, 3.5rem)',   { lineHeight: '1.15', fontWeight: '700' }],
    'heading-1': ['clamp(1.75rem, 3vw, 2.5rem)',{ lineHeight: '1.2', fontWeight: '700' }],
    'heading-2': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.25', fontWeight: '600' }],
    'heading-3': ['clamp(1.25rem, 2vw, 1.5rem)',{ lineHeight: '1.3', fontWeight: '600' }],
    'body-lg':   ['1.125rem', { lineHeight: '1.75' }],
    'body':      ['1rem',     { lineHeight: '1.75' }],
    'body-sm':   ['0.875rem', { lineHeight: '1.6' }],
    'caption':   ['0.75rem',  { lineHeight: '1.5' }],
  },
};
```

### 1.2 직군별 테마 프리셋

| 직군 카테고리        | Primary Color        | Radius    | Font Mood       | 추천 Formula |
| :------------------ | :------------------- | :-------- | :-------------- | :----------- |
| 프론트엔드 개발자    | Blue (`#0ea5e9`)     | `0.75rem` | 깔끔, 모던      | Formula 1    |
| 백엔드 개발자        | Emerald (`#10b981`)  | `0.5rem`  | 안정적, 전문적  | Formula 2    |
| 풀스택 개발자        | Violet (`#8b5cf6`)   | `0.75rem` | 역동적, 혁신    | Formula 1    |
| UI/UX 디자이너       | Rose (`#f43f5e`)     | `1.5rem`  | 감성적, 트렌디  | Formula 3    |
| PM / 기획자          | Teal (`#14b8a6`)     | `0.5rem`  | 균형, 신뢰      | Formula 2    |
| 데이터/AI 엔지니어   | Cyan (`#06b6d4`)     | `0.5rem`  | 분석적, 정밀    | Formula 2    |

### 1.3 Dark / Light Mode

- 모든 디자인 토큰은 CSS Custom Properties(`var(--color-*)`)로 관리하여 **Dark Mode 자동 전환**을 지원한다.
- Tailwind `dark:` 접두사를 활용하며, 시스템 설정 또는 사용자 토글로 전환 가능.
- Dark Mode 배경: `#0a0a0a` ~ `#171717` 사이 사용 (순수 검정 금지)

---

## 2. Animation System (애니메이션 체계)

### 2.1 Core Animation Presets (Framer Motion)

```typescript
// utils/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};
```

### 2.2 애니메이션 적용 규칙

| 요소                   | 애니메이션 프리셋   | 적용 조건                                      |
| :--------------------- | :------------------ | :--------------------------------------------- |
| Hero 텍스트/버튼       | `fadeInUp`          | 페이지 로드 시 자동 실행                        |
| Section 제목           | `fadeInUp`          | 뷰포트 진입 시 트리거                           |
| 프로젝트 카드          | `staggerContainer` + `staggerItem` | 카드 그룹이 뷰포트에 진입 시 순차 등장 |
| 스킬 아이콘/바         | `staggerItem`       | 뷰포트 진입 시 순차 등장                        |
| 프로필 이미지          | `scaleIn`           | 뷰포트 진입 시                                  |
| 타임라인               | 스크롤 연동         | 스크롤 진행에 따라 수직선 채워짐                |
| CTA 버튼               | Hover scale(1.05)   | 마우스 호버 시                                  |
| Navigation 링크        | 밑줄 확장 애니메이션 | 마우스 호버 시                                  |

### 2.3 퍼포먼스 가이드라인
- `prefers-reduced-motion` 미디어 쿼리 대응: 접근성을 위해 애니메이션 비활성화 옵션 제공
- 복잡한 애니메이션은 `transform`과 `opacity`만 사용 (리플로우 방지)

---

## 3. Layout System (레이아웃 체계)

### 3.1 Global Layout Structure
```text
┌──────────────────────────────────────────────────────┐
│  Header (sticky, backdrop-blur, 다크모드 토글 포함)   │
├──────────────────────────────────────────────────────┤
│                                                      │
│  [Hero Section]          — 자기 소개, CTA            │
│                                                      │
│  [About Section]         — 상세 소개, 프로필 이미지  │
│                                                      │
│  [Skills Section]        — 기술 스택                 │
│                                                      │
│  [Projects Section]      — 프로젝트 포트폴리오       │
│                                                      │
│  [Experience Section]    — 경력/학력 타임라인         │
│                                                      │
│  [Contact Section]       — 연락 폼 / 연락처          │
│                                                      │
├──────────────────────────────────────────────────────┤
│  Footer (SNS 링크, 저작권)                            │
└──────────────────────────────────────────────────────┘
```

### 3.2 Responsive Breakpoints

| Breakpoint | Tailwind Prefix | Min Width | Target            | 컨테이너 Max Width  |
| :--------- | :-------------- | :-------- | :---------------- | :------------------ |
| Mobile     | (default)       | 0px       | 스마트폰          | `100%`              |
| `sm`       | `sm:`           | 640px     | 대형 스마트폰     | `640px`             |
| `md`       | `md:`           | 768px     | 태블릿            | `768px`             |
| `lg`       | `lg:`           | 1024px    | 소형 데스크탑     | `1024px`            |
| `xl`       | `xl:`           | 1280px    | 데스크탑          | `1280px`            |

### 3.3 Header 컴포넌트 명세

| Feature                 | Description                                                   |
| :---------------------- | :------------------------------------------------------------ |
| 포지션                  | `fixed top-0`, 전체 너비, `z-50`                              |
| 배경                    | 스크롤 전: `transparent`, 스크롤 후: `bg-white/80 backdrop-blur-xl dark:bg-neutral-900/80` |
| 로고/이름               | 좌측 배치, 클릭 시 최상단 스크롤                               |
| 네비게이션              | 섹션 앵커 링크 (Hero, About, Skills, Projects, Experience, Contact) |
| 다크모드 토글           | 우측, Sun/Moon 아이콘 전환                                    |
| 이력서 다운로드          | 우측 CTA 버튼                                                 |
| 모바일 대응             | `md:` 이하에서 햄버거 메뉴 → 슬라이드 드로어                  |

### 3.4 Footer 컴포넌트 명세

| Section              | Content                                                          |
| :------------------- | :--------------------------------------------------------------- |
| SNS 링크             | GitHub, LinkedIn, 기술 블로그 등 아이콘 링크                     |
| 저작권               | `© 2026 [이름]. All rights reserved.`                            |
| 디자인               | 미니멀, 중앙 정렬, `bg-neutral-950 text-white` (Dark 고정)       |

---

## 4. Section Block Library (섹션 블록 라이브러리)

> 에이전트는 각 페이지를 구성할 때 아래에 정의된 섹션 블록만 불러와서 조립한다.
> 새로운 섹션을 임의로 창조하지 마라. 새 블록이 필요하면 본 문서에 먼저 정의한다.

### 4.1 HeroSection — 메인 인트로

| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/sections/HeroSection.tsx`                            |
| **레이아웃**   | 중앙 정렬 풀스크린, 또는 좌측 텍스트 + 우측 3D 아바타/일러스트   |
| **필수 요소**  | 인사말, 이름(display-1), 직함/한 줄 소개, CTA 버튼 2개 (이력서 다운로드 + 연락하기), 스크롤 유도 아이콘 |
| **애니메이션** | 텍스트 `fadeInUp` (stagger 0.2s), 스크롤 유도 아이콘 bounce      |
| **반응형**     | Mobile: 중앙 정렬, 텍스트 크기 축소                              |

### 4.2 AboutSection — 자기 소개

| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/sections/AboutSection.tsx`                           |
| **레이아웃**   | 좌 50% 프로필 이미지 + 우 50% 소개 텍스트, 또는 반전             |
| **필수 요소**  | 프로필 사진(둥근 모서리), 자기소개 문단 (2~3단락), 핵심 정보 카드 (경력 연수, 완료 프로젝트 수 등) |
| **애니메이션** | 이미지 `scaleIn`, 텍스트 `fadeInRight`                           |
| **반응형**     | Mobile: 세로 스택 (이미지 위, 텍스트 아래)                       |

### 4.3 SkillsSection — 기술 스택

| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/sections/SkillsSection.tsx`                          |
| **레이아웃**   | 카테고리별 그리드 (Frontend, Backend, DevOps, Tools 등)          |
| **필수 요소**  | 카테고리 제목, 기술 아이콘/로고 + 이름 + 숙련도 바(선택적)      |
| **애니메이션** | `staggerContainer` + `staggerItem` (아이콘 순차 등장)            |
| **호버 효과**  | 아이콘 `scale(1.1)`, 배경 하이라이트                             |

### 4.4 ProjectsSection — 프로젝트 포트폴리오

| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/sections/ProjectsSection.tsx`                        |
| **레이아웃**   | 필터 탭 (All, Web, Mobile, etc.) + 카드 그리드 (2~3열)           |
| **카드 구성**  | 프로젝트 썸네일, 제목, 간략 설명, 기술 태그(Badge), GitHub/Live 링크 |
| **애니메이션** | 필터 전환 시 `AnimatePresence` 레이아웃 애니메이션, 카드 `staggerItem` |
| **호버 효과**  | 이미지 오버레이 + 상세보기 버튼 노출                             |
| **반응형**     | Mobile: 1열, Tablet: 2열, Desktop: 3열                           |

### 4.5 ExperienceSection — 경력/학력

| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/sections/ExperienceSection.tsx`                      |
| **레이아웃**   | 수직 타임라인 (중앙선 + 좌/우 교차 카드) 또는 탭 (경력/학력)    |
| **카드 구성**  | 기간, 회사/학교명, 직함/학과, 주요 업무/성과 목록                |
| **애니메이션** | 스크롤 진행에 따라 수직선 채워지며 카드 순차 등장                 |
| **반응형**     | Mobile: 좌측 정렬 단일 열                                        |

### 4.6 ContactSection — 연락 폼

| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/sections/ContactSection.tsx`                         |
| **레이아웃**   | 좌측 연락처 정보 (이메일, GitHub, LinkedIn) + 우측 입력 폼       |
| **필드 구성**  | 이름(필수), 이메일(필수), 제목(필수), 메시지(필수, textarea)     |
| **검증**       | `React Hook Form` + `Zod` 스키마 검증, 실시간 에러 메시지 노출   |
| **제출 후**    | 로딩 스피너 → 성공 토스트 메시지 → 폼 초기화                     |
| **Backend**    | `POST /api/contact` → 이메일 발송 (Resend/Nodemailer)            |

### 4.7 StatsRow — 수치 강조 (선택)

| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/sections/StatsRow.tsx`                               |
| **레이아웃**   | 3~4열 수평 나열                                                  |
| **각 항목**    | 대형 숫자(display-2, `font-mono`), 라벨 (경력 연수, 프로젝트 수, 기술 스택 수 등) |
| **애니메이션** | 뷰포트 진입 시 숫자 카운트업 (0 → 목표값, `useCountUp` 훅)       |

---

## 5. Image & Asset Constraint

### 5.1 이미지 소스 규칙
| Priority | Source                                | 사용 조건                                       |
| :------- | :------------------------------------ | :---------------------------------------------- |
| 1순위    | 본인 제공 이미지                      | 프로필 사진, 프로젝트 스크린샷                   |
| 2순위    | AI 생성 이미지 (`generate_image` 도구) | 본인 자산이 없을 때, 맥락에 맞는 이미지 생성     |
| 3순위    | Unsplash API                          | `https://images.unsplash.com/photo-[id]?w=1600&q=80` |

### 5.2 아이콘 규칙
- **라이브러리:** `lucide-react` 통일
- **기술 스택 아이콘:** SVG 로고 파일 또는 `devicons` 활용

---

## 6. Page Assembly Logic (섹션 조합 공식)

> 에이전트는 `@PRD.md`의 **직군**과 **포트폴리오 목표**를 분석하여
> 아래 Formula 중 하나를 선택하고, 메인 페이지를 자동 조립한다.

### Formula 1: 개발자형 — 프로젝트 중심
```text
HeroSection (인사말 + 직함 + CTA)
  → AboutSection (간략 소개 + 핵심 수치)
  → SkillsSection (기술 스택 그리드)
  → ProjectsSection (프로젝트 카드 + 필터)
  → ExperienceSection (경력 타임라인)
  → ContactSection (연락 폼)
```
**흐름:** 첫인상 → 소개 → 역량 → 실적 증명 → 경험 → 연락

### Formula 2: 경력직형 — 경험 중심
```text
HeroSection (이름 + 한 줄 소개 + CTA)
  → StatsRow (경력 연수, 프로젝트 수, 수상 등)
  → ExperienceSection (경력 타임라인 강조)
  → SkillsSection (기술 스택)
  → ProjectsSection (대표 프로젝트)
  → ContactSection (연락 폼)
```
**흐름:** 첫인상 → 수치 신뢰 → 경험 → 역량 → 프로젝트 → 연락

### Formula 3: 디자이너형 — 비주얼 중심
```text
HeroSection (풀스크린 비주얼 + 미니멀 텍스트)
  → ProjectsSection (대형 썸네일 그리드, 필터)
  → AboutSection (감성적 소개)
  → SkillsSection (도구 아이콘 그리드)
  → ContactSection (미니멀 폼)
```
**흐름:** 시각적 임팩트 → 작품 → 소개 → 도구 → 연락

---

## 7. SEO & Performance Checklist

### 7.1 필수 SEO 구현 항목

| 항목                  | 구현 방법                                                           |
| :-------------------- | :----------------------------------------------------------------- |
| Title Tag             | Next.js `metadata.title` — 페이지별 고유 타이틀                    |
| Meta Description      | Next.js `metadata.description` — 55~160자 핵심 설명                |
| Open Graph Tags       | `metadata.openGraph` — title, description, image, url              |
| Canonical URL         | `metadata.alternates.canonical`                                    |
| Sitemap               | `app/sitemap.ts` (동적 생성)                                       |
| Robots.txt            | `/public/robots.txt`                                               |
| JSON-LD               | `Person`, `WebSite` 구조화 데이터                                  |
| H1 Tag                | 페이지당 정확히 1개                                                 |
| Alt Text              | 모든 이미지에 설명적 alt 텍스트 필수                                |
| 언어 선언             | `<html lang="ko">`                                                 |

### 7.2 Core Web Vitals 목표

| Metric | Target     | Optimization Strategy                                              |
| :----- | :--------- | :----------------------------------------------------------------- |
| LCP    | < 2.5s     | 히어로 이미지 `priority` + WebP + Vercel CDN                       |
| CLS    | < 0.1      | 이미지 width/height 명시, 폰트 `font-display: swap`               |
| INP    | < 200ms    | 인터랙션 핸들러 최적화                                              |

---

## 8. Accessibility (접근성) Requirements

| Category        | Requirement                                                        |
| :-------------- | :----------------------------------------------------------------- |
| 시맨틱 HTML     | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` 사용        |
| ARIA 속성       | 인터랙티브 요소에 `aria-label`, `aria-expanded`, `aria-controls`   |
| 키보드 네비게이션| 모든 인터랙티브 요소 Tab 접근 가능, 포커스 링 시각적 표시          |
| 색상 대비       | 텍스트/배경 대비율 **WCAG AA 4.5:1** 이상                         |
| 모션 감소       | `prefers-reduced-motion` 감지 시 애니메이션 비활성화               |