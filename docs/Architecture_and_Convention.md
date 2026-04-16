# System Architecture & Coding Conventions

> **[AI Agent Instruction]**
> - AI 에이전트는 코드를 생성하거나 수정할 때 **반드시** 본 문서에 정의된 디렉토리 구조, 네이밍 규칙, 코딩 스타일 가이드를 엄수해야 한다.
> - 본 문서의 규칙과 충돌하는 코드가 발견되면, 반드시 이 문서의 규칙을 우선 적용한다.
> - 규칙에 명시되지 않은 사안이 발생하면, 가장 유사한 기존 규칙을 참고하되 사용자에게 확인을 요청한다.

---

## 1. Repository Overview

본 리포지토리는 **Monorepo** 구조를 채택하며, 비즈니스 영역(Domain)에 따라 `External`(기업용 웹사이트)과 `Internal`(사내 대시보드)을 최상위 디렉토리로 분리하여 관리한다.

**핵심 원칙:**
- **도메인 중심 분리:** External과 Internal을 최상위 수준에서 분리하여 관심사 격리
- **프레임워크 이원화:** External(Next.js 15 App Router) / Internal(React 18 Vite SPA)
- **도메인 내 계층화:** 각 도메인 내부에 Frontend와 Backend를 독립적으로 구성
- **단계별 재사용:** 도메인 내 공유는 `{Domain}/_shared`에서, 전역 공유는 `Root/_shared`에서 관리

---

## 2. Directory Structure

```text
Root/
├── docs/                          # 프로젝트 문서
├── _shared/                       # 전역 공유 모듈 (인터페이스, 유틸리티 등)
│
├── External/                      # 기업 소개 웹사이트 도메인
│   ├── Frontend/                  # Next.js App Router 기반 라우팅
│   │   ├── app/                   # Next.js App Router 기반 라우팅
│   │   │   ├── (marketing)/       # 마케팅 페이지 그룹 (랜딩, 소개 등)
│   │   │   ├── (legal)/           # 법적 페이지 그룹
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/            # blocks/, layout/, ui/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── interfaces/
│   │   ├── utils/
│   │   ├── constants/
│   │   └── package.json
│   │
│   ├── Backend/                   # NestJS 기반 API
│   │   ├── src/                   # [domain] 모듈별 구성
│   │   ├── prisma/
│   │   └── package.json
│   │
│   └── _shared/                   # External 도메인 내 공통 모듈
│
├── Internal/                      # 사내 대시보드 도메인
│   ├── Frontend/                  # React 18 Vite SPA
│   │   ├── src/
│   │   │   │   │   └── [domain]-response.dto.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── [domain].entity.ts
│   │   │   │   ├── [domain].controller.ts
│   │   │   │   ├── [domain].service.ts
│   │   │   │   ├── [domain].module.ts
│   │   │   │   └── [domain].controller.spec.ts  # 유닛 테스트
│   │   │   ├── common/            # 공통 모듈 (Guard, Interceptor, Filter, Pipe)
│   │   │   │   ├── guards/
│   │   │   │   │   └── jwt-auth.guard.ts
│   │   │   │   ├── interceptors/
│   │   │   │   │   ├── logging.interceptor.ts
│   │   │   │   │   └── transform.interceptor.ts
│   │   │   │   ├── filters/
│   │   │   │   │   └── http-exception.filter.ts
│   │   │   │   ├── pipes/
│   │   │   │   │   └── validation.pipe.ts
│   │   │   │   └── decorators/
│   │   │   │       └── roles.decorator.ts
│   │   │   ├── config/            # 환경별 설정 (DB, JWT, Redis 등)
│   │   │   │   ├── database.config.ts
│   │   │   │   ├── jwt.config.ts
│   │   │   │   └── app.config.ts
│   │   │   ├── prisma/            # Prisma ORM 설정
│   │   │   │   ├── schema.prisma
│   │   │   │   ├── seed.ts
│   │   │   │   └── migrations/
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── test/                  # E2E 테스트
│   │   │   └── app.e2e-spec.ts
│   │   ├── .env.example
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── Internal_Web/              # 사내 대시보드 API (Phase 3)
│   │   └── ...
│   │
│   └── _shared/                   # Backend 공유 모듈
│       ├── interfaces/
│       ├── utils/
│       └── constants/
│
├── .github/
│   └── workflows/
│       ├── ci.yml                 # PR 시 Lint + Test + Build 검증
│       └── deploy.yml             # main 브랜치 배포 워크플로우
│
├── docker-compose.yml             # 로컬 개발 환경 (DB, Redis, App)
├── docker-compose.prod.yml        # 프로덕션 배포용
├── .gitignore
├── .prettierrc
├── .eslintrc.json
└── README.md
```

---

## 3. Naming Conventions

### 3.1 파일 네이밍

| Category                   | Convention           | Example                                |
| :------------------------- | :------------------- | :------------------------------------- |
| React 컴포넌트             | `PascalCase.tsx`     | `HeroTypeA.tsx`, `ContactForm.tsx`     |
| 페이지 (App Router)        | `page.tsx`           | `app/(marketing)/about/page.tsx`       |
| 레이아웃                   | `layout.tsx`         | `app/layout.tsx`                       |
| 커스텀 훅                  | `useCamelCase.ts`    | `useScrollAnimation.ts`               |
| 서비스 모듈                | `kebab-case.service.ts` | `contact.service.ts`                |
| 인터페이스/타입            | `kebab-case.types.ts`| `contact.types.ts`                     |
| 유틸리티                   | `camelCase.ts`       | `formatDate.ts`, `cn.ts`              |
| NestJS Controller          | `[domain].controller.ts` | `notice.controller.ts`             |
| NestJS Service             | `[domain].service.ts`| `notice.service.ts`                    |
| NestJS DTO                 | `verb-[domain].dto.ts`| `create-notice.dto.ts`                |
| NestJS Entity              | `[domain].entity.ts` | `notice.entity.ts`                     |
| 테스트 파일                | `*.spec.ts` / `*.e2e-spec.ts` | `notice.service.spec.ts`      |
| 환경 변수                  | `UPPER_SNAKE_CASE`   | `DATABASE_URL`, `JWT_SECRET`           |

### 3.2 코드 네이밍

| Category                | Convention             | Example                                         |
| :---------------------- | :--------------------- | :---------------------------------------------- |
| React 컴포넌트          | `PascalCase`          | `export function HeroTypeA() {}`                |
| Props 인터페이스         | `[Component]Props`    | `interface HeroTypeAProps {}`                   |
| 커스텀 훅               | `usePascalCase`       | `export function useScrollAnimation() {}`       |
| 타입/인터페이스          | `PascalCase`          | `interface ContactFormData {}`                  |
| 상수                    | `UPPER_SNAKE_CASE`    | `const MAX_FILE_SIZE = 5 * 1024 * 1024`         |
| 함수                    | `camelCase`           | `function formatPhoneNumber() {}`               |
| CSS 클래스 (커스텀 시)   | 사용 금지             | Tailwind 유틸리티만 허용                        |
| API Endpoint            | `kebab-case`          | `/api/external/contact-us`                      |
| DB 테이블               | `snake_case` (복수형) | `contact_submissions`, `site_configs`           |
| DB 컬럼                 | `snake_case`          | `created_at`, `is_active`                       |
| Enum                    | `UPPER_SNAKE_CASE`    | `enum Status { PENDING, APPROVED, REJECTED }`   |

---

## 4. Code Style & Formatting Rules

### 4.1 External_Web (Next.js 특화)
- **Rendering:** 가급적 서버 컴포넌트를 기본으로 하되, 상태가 필요한 부분만 'use client'로 분리.
- **Data Fetching:** Next.js 내장 fetch(ISR/SSR) 사용.

### 4.2 Internal_Web (React SPA 특화)
- **Routing:** `react-router-dom`의 useNavigate, Link 사용.
- **State:** 서버 상태는 `TanStack Query`, 전역 상태는 `Zustand` 사용.
- **Styling:** 외부와 동일하게 **Tailwind CSS** 유틸리티만 사용 (커스텀 CSS 금지).

### 4.3 TypeScript 엄격 규칙
```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,           // 필수
    "noImplicitAny": true,    // any 타입 사용 금지
    "noUnusedLocals": true,   // 미사용 변수 에러 처리
    "noUnusedParameters": true // 미사용 파라미터 에러 처리
  }
}
```

### 4.4 ESLint & Prettier
```jsonc
// .prettierrc
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

### 4.5 Import 순서 (자동 정렬)
```typescript
// 1) External Libraries
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// 2) Internal Modules (절대 경로 @ alias)
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

// 3) Types / Interfaces
import type { HeroTypeAProps } from '@/interfaces/block.types';

// 4) Constants
import { SITE_CONFIG } from '@/constants/siteConfig';
```

---

## 5. Component Architecture Rules

### 5.1 컴포넌트 작성 원칙

1. **함수 선언문(function declaration)** 사용: `export function ComponentName() {}`
2. **Props는 반드시 인터페이스로 타입 정의** — `interface ComponentNameProps {}`
3. **Default Export 금지**: Named Export만 사용 (트리 쉐이킹 최적화)
4. **한 파일 = 한 컴포넌트**: 헬퍼 컴포넌트는 별도 파일로 분리
5. **비즈니스 로직은 커스텀 훅으로 분리**: 컴포넌트는 UI 렌더링에만 집중

### 5.2 컴포넌트 파일 구조 템플릿
```typescript
// components/blocks/hero/HeroTypeA.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

import type { HeroTypeAProps } from '@/interfaces/block.types';

/**
 * HeroTypeA — 감성적 브랜딩 중심의 풀스크린 히어로 섹션
 * @usage 패션, 뷰티, 라이프스타일, F&B 등 감성 소구가 필요한 업종
 */
export function HeroTypeA({ title, subtitle, ctaText, backgroundImage }: HeroTypeAProps) {
  return (
    <section
      id="hero"
      className={cn(
        'relative flex min-h-screen items-center justify-center',
        'bg-cover bg-center bg-no-repeat',
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-label="메인 히어로 섹션"
    >
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 콘텐츠 */}
      <motion.div
        className="relative z-10 text-center text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-5xl font-bold leading-tight md:text-7xl">{title}</h1>
        <p className="mt-6 text-lg text-white/80 md:text-xl">{subtitle}</p>
        <Button className="mt-10" size="lg">
          {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </section>
  );
}
```

---

## 6. API Design Conventions (Backend)

### 6.1 RESTful Endpoint 규칙

| HTTP Method | Purpose              | URL Pattern                             | Response Code         |
| :---------- | :------------------- | :-------------------------------------- | :-------------------- |
| `GET`       | 리스트 조회          | `/api/external/{domain}`                | `200 OK`              |
| `GET`       | 단건 조회            | `/api/external/{domain}/:id`            | `200 OK` / `404`      |
| `POST`      | 생성                 | `/api/external/{domain}`                | `201 Created`         |
| `PATCH`     | 부분 수정            | `/api/external/{domain}/:id`            | `200 OK`              |
| `DELETE`    | 삭제 (Soft Delete)   | `/api/external/{domain}/:id`            | `204 No Content`      |

### 6.2 API Response 표준 포맷
```typescript
// 성공 응답
interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 에러 응답
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;        // 예: 'VALIDATION_ERROR', 'NOT_FOUND'
    message: string;     // 사용자 친화적 메시지
    details?: unknown;   // 상세 오류 정보 (개발 환경에서만 노출)
  };
}
```

### 6.3 Backend 도메인 모듈 규칙
- 모든 DTO는 `class-validator` 데코레이터로 검증
- 모든 Entity는 `created_at`, `updated_at`, `deleted_at` (Soft Delete 지원) 컬럼 필수
- Controller는 비즈니스 로직을 포함하지 않음 — Service에 위임
- Service 단에서 에러 발생 시 NestJS `HttpException` 계열 사용

---

## 7. Git & Version Control

### 7.1 Branch Strategy (Git Flow 변형)

| Branch          | Purpose                                | Base        | Merge Target |
| :-------------- | :------------------------------------- | :---------- | :----------- |
| `main`          | 프로덕션 배포 전용                     | -           | -            |
| `develop`       | 개발 통합 브랜치                       | `main`      | `main`       |
| `feature/*`     | 기능 개발                              | `develop`   | `develop`    |
| `fix/*`         | 버그 수정                              | `develop`   | `develop`    |
| `hotfix/*`      | 긴급 프로덕션 패치                     | `main`      | `main` + `develop` |
| `release/*`     | 릴리즈 준비 (Staging)                  | `develop`   | `main`       |

### 7.2 Commit Message Convention (Conventional Commits)

```text
<type>(<scope>): <short summary>

Types: feat, fix, docs, style, refactor, perf, test, chore, ci
Scope: ext-fe, ext-be, int-fe, int-be, docs, config, shared

Examples:
  feat(ext-fe): add HeroTypeB component with animation
  fix(ext-be): resolve contact form validation error
  docs: update PRD with new client requirements
  chore(config): update Tailwind config with brand colors
  refactor(shared): optimize date utility
```

### 7.3 PR Rules
- PR 제목은 Conventional Commit 형식 준수
- PR 본문에 **변경 사유**, **스크린샷** (UI 변경 시), **테스트 결과** 기재 필수
- 최소 1명의 리뷰어 승인 후 머지 (Squash Merge)
- CI 파이프라인 통과 필수 (Lint + Test + Build)

---

## 8. Testing Strategy

| Layer               | Tool             | Coverage Target | Scope                              |
| :------------------ | :--------------- | :-------------- | :--------------------------------- |
| Unit (FE)           | Vitest + RTL     | ≥ 80%           | 커스텀 훅, 유틸리티 함수           |
| Component (FE)      | Storybook        | 모든 블록 컴포넌트 | 시각적 회귀 테스트                |
| Unit (BE)           | Jest             | ≥ 80%           | Service 로직                       |
| Integration (BE)    | Jest + Supertest | 주요 API        | Controller + Service 연동          |
| E2E                 | Playwright       | 핵심 시나리오   | 메인 페이지 렌더링, 문의 폼 제출   |
| Performance         | Lighthouse CI    | Score ≥ 90      | Core Web Vitals 자동 측정          |