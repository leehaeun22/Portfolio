# System Architecture & Coding Conventions

> **[AI Agent Instruction]**
> - AI 에이전트는 코드를 생성하거나 수정할 때 **반드시** 본 문서에 정의된 디렉토리 구조, 네이밍 규칙, 코딩 스타일 가이드를 엄수해야 한다.
> - 본 문서의 규칙과 충돌하는 코드가 발견되면, 반드시 이 문서의 규칙을 우선 적용한다.
> - 규칙에 명시되지 않은 사안이 발생하면, 가장 유사한 기존 규칙을 참고하되 사용자에게 확인을 요청한다.

---

## 1. Repository Overview

본 리포지토리는 **개인 포트폴리오 웹 페이지** 프로젝트이며, **Next.js 15 App Router** 기반의 정적 사이트 생성(SSG) 중심 단일 프로젝트 구조를 채택한다.

**핵심 원칙:**
- **단일 프로젝트 구조:** 프론트엔드 중심의 포트폴리오 사이트 (백엔드는 Contact Form API 등 최소한만 포함)
- **정적 생성 우선:** ISR/SSG를 기본으로 활용하여 빠른 로딩 성능 확보
- **컴포넌트 블록 기반:** 포트폴리오 각 섹션을 독립적인 블록 컴포넌트로 구성
- **데이터 분리:** 개인 정보, 프로젝트 데이터 등을 `constants/`에서 중앙 관리

---

## 2. Directory Structure

```text
Root/
├── docs/                          # 프로젝트 문서
├── src/                           # 소스 코드
│   ├── app/                       # Next.js App Router 라우팅
│   │   ├── (portfolio)/           # 포트폴리오 메인 페이지 그룹
│   │   │   ├── page.tsx           #   메인 랜딩 (원페이지 스크롤)
│   │   │   └── projects/          #   프로젝트 상세 페이지
│   │   │       ├── page.tsx
│   │   │       └── [slug]/page.tsx
│   │   ├── (legal)/               # 법적 페이지 그룹
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   └── sitemap.ts
│   ├── components/                # 컴포넌트
│   │   ├── sections/              # 포트폴리오 섹션 블록
│   │   ├── layout/                # Header, Footer, Navigation
│   │   └── ui/                    # Button, Badge, Card 등
│   ├── hooks/                     # 커스텀 훅
│   ├── services/                  # API 통신 서비스
│   ├── interfaces/                # 타입/인터페이스
│   ├── utils/                     # 유틸리티
│   ├── constants/                 # 상수 및 포트폴리오 데이터
│   └── assets/                    # 이미지, 폰트
├── public/                        # 정적 파일
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 3. Naming Conventions

### 3.1 파일 네이밍

| Category                   | Convention           | Example                                |
| :------------------------- | :------------------- | :------------------------------------- |
| React 컴포넌트             | `PascalCase.tsx`     | `HeroSection.tsx`, `ProjectCard.tsx`   |
| 페이지 (App Router)        | `page.tsx`           | `app/(portfolio)/page.tsx`             |
| 레이아웃                   | `layout.tsx`         | `app/layout.tsx`                       |
| 커스텀 훅                  | `useCamelCase.ts`    | `useScrollAnimation.ts`               |
| 인터페이스/타입            | `kebab-case.types.ts`| `project.types.ts`                     |
| 유틸리티                   | `camelCase.ts`       | `formatDate.ts`, `cn.ts`              |
| 상수 데이터                | `camelCase.ts`       | `profile.ts`, `projects.ts`           |
| 환경 변수                  | `UPPER_SNAKE_CASE`   | `NEXT_PUBLIC_SITE_URL`                |

### 3.2 코드 네이밍

| Category                | Convention             | Example                                         |
| :---------------------- | :--------------------- | :---------------------------------------------- |
| React 컴포넌트          | `PascalCase`          | `export function HeroSection() {}`              |
| Props 인터페이스         | `[Component]Props`    | `interface HeroSectionProps {}`                 |
| 커스텀 훅               | `usePascalCase`       | `export function useScrollAnimation() {}`       |
| 타입/인터페이스          | `PascalCase`          | `interface ProjectData {}`                      |
| 상수                    | `UPPER_SNAKE_CASE`    | `const MAX_PROJECTS_PER_PAGE = 6`               |
| 함수                    | `camelCase`           | `function formatPhoneNumber() {}`               |
| CSS 클래스               | 사용 금지             | Tailwind 유틸리티만 허용                        |

---

## 4. Code Style & Formatting Rules

### 4.1 Next.js 특화 규칙
- **Rendering:** SSG를 기본, 상태 필요한 부분만 `'use client'`로 분리
- **Data:** 포트폴리오 데이터는 `constants/`에서 정적 관리
- **Image:** 반드시 `next/image` 사용 (`width`, `height`, `alt` 필수)

### 4.2 TypeScript 엄격 규칙
```jsonc
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### 4.3 ESLint & Prettier
```jsonc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 4.4 Import 순서
```typescript
// 1) External Libraries
import { motion } from 'framer-motion';

// 2) Internal Modules (@ alias)
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

// 3) Types / Interfaces
import type { ProjectData } from '@/interfaces/project.types';

// 4) Constants
import { PROFILE } from '@/constants/profile';
```

---

## 5. Component Architecture Rules

1. **함수 선언문** 사용: `export function ComponentName() {}`
2. **Props는 반드시 인터페이스로 타입 정의**
3. **Default Export 금지**: Named Export만 사용
4. **한 파일 = 한 컴포넌트**
5. **비즈니스 로직은 커스텀 훅으로 분리**

---

## 6. Git & Version Control

### 6.1 Branch Strategy

| Branch          | Purpose                    | Base        | Merge Target       |
| :-------------- | :------------------------- | :---------- | :------------------ |
| `main`          | 프로덕션 배포 (Vercel)     | -           | -                   |
| `develop`       | 개발 통합 브랜치           | `main`      | `main`              |
| `feature/*`     | 기능/섹션 개발             | `develop`   | `develop`           |
| `fix/*`         | 버그 수정                  | `develop`   | `develop`           |

### 6.2 Commit Convention
```text
<type>(<scope>): <short summary>
Types: feat, fix, docs, style, refactor, perf, test, chore, ci
Scope: fe, cms, docs, config
```

---

## 7. Testing Strategy

| Layer           | Tool             | Scope                              |
| :-------------- | :--------------- | :--------------------------------- |
| Component       | Vitest + RTL     | 섹션 블록, UI 컴포넌트             |
| E2E             | Playwright       | 메인 페이지 렌더링, Contact Form   |
| Performance     | Lighthouse CI    | Core Web Vitals (Score ≥ 90)       |