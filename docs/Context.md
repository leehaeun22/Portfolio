# Project Context & State Tracker

> **[AI Agent Instruction]**
> - 이 파일은 프로젝트의 현재 진행 상태를 나타내는 **단일 진실 공급원(SSOT, Single Source of Truth)** 이다.
> - 에이전트는 매 작업이 완료될 때마다 **[Progress Log]**, **[Current Priority]**, 그리고 **[Risk Registry]** 를 업데이트해야 한다.
> - 모든 작업은 이 파일의 `Global Constraints`를 최우선으로 준수한다.
> - 본 문서에 명시되지 않은 아키텍처 변경 및 주요 기술적 결정은 반드시 사용자의 승인을 받아야 한다.

---

## 1. Project Overview

| Key              | Value                                                             |
| :--------------- | :---------------------------------------------------------------- |
| **Project Name** | 개인 포트폴리오 웹 페이지                                        |
| **Codename**     | `portfolio`                                                       |
| **Description**  | 개발자 개인의 기술 스택, 프로젝트 경험, 경력 사항을 시각적으로 소개하는 프리미엄 포트폴리오 웹 페이지 |
| **Current Phase**| Phase 1 — 기획 및 프로젝트 스캐폴딩                               |
| **Active Focus** | 포트폴리오 프론트엔드 (Next.js SSG)                               |
| **Excluded**     | CMS 대시보드 (Phase 3 예정)                                       |
| **Repository**   | 단일 리포지토리                                                    |
| **License**      | MIT                                                                |

---

## 2. Technology Stack

### 2.1 Frontend
| Layer        | Tech & Version                      | Notes                               |
| :----------- | :---------------------------------- | :---------------------------------- |
| Framework    | Next.js 15                          | App Router, SSG/ISR 중심            |
| Language     | TypeScript 5.x                      | strict: true                        |
| Styling      | Tailwind CSS                        | 유틸리티 클래스만 사용              |
| UI Library   | 커스텀 섹션 블록 컴포넌트           | Lucide React 아이콘                 |
| Animation    | Framer Motion                       | 스크롤 트리거 애니메이션            |
| Font         | Pretendard / Inter                  | Google Fonts CDN                    |

### 2.2 Backend (최소)
| Layer        | Tech & Version                      | Notes                               |
| :----------- | :---------------------------------- | :---------------------------------- |
| API          | Next.js API Routes                  | Contact Form 전용                   |
| Email        | Resend / Nodemailer                 | 문의 메일 발송                      |

### 2.3 Infrastructure & DevOps
| Layer        | Technology                          | Notes                               |
| :----------- | :---------------------------------- | :---------------------------------- |
| Hosting      | Vercel                              | Next.js 최적화 배포                 |
| CI/CD        | GitHub Actions + Vercel             | main 브랜치 자동 배포               |
| Domain       | 커스텀 도메인                       | Vercel DNS 연동                     |
| Analytics    | Vercel Analytics / GA4              | 방문자 추적                         |

---

## 3. Environment Strategy

| Environment  | Branch           | URL Pattern                      | Purpose                  | Auto Deploy |
| :----------- | :--------------- | :------------------------------- | :----------------------- | :---------- |
| **Local**    | `*`              | `localhost:3000`                 | 로컬 개발 및 디버깅      | -           |
| **Preview**  | `feature/*`      | `*.vercel.app`                   | PR 프리뷰 배포           | ✅           |
| **Production**| `main`          | `www.[domain]`                   | 실 서비스 운영           | ✅           |

---

## 4. Active Documentation Status

| File                             | Status     | Owner   | Last Updated | Notes                                         |
| :------------------------------- | :--------- | :------ | :----------- | :-------------------------------------------- |
| `Context.md`                     | ✅ Active  | Agent   | 자동 갱신    | SSOT — 매 작업 완료 시 자동 업데이트          |
| `Architecture_Convention.md`     | ✅ Active  | Agent   | -            | 디렉토리 구조, 네이밍 규칙, 코드 컨벤션 문서  |
| `PRD.md`                         | 🔄 Draft   | User    | -            | 포트폴리오 요구사항 정의서                    |
| `SRS.md`                         | 🔄 Draft   | Agent   | -            | 소프트웨어 요구사항 명세                      |
| `External_Design.md`             | 🔄 Draft   | Agent   | -            | 포트폴리오 디자인 시스템                      |
| `Internal_Dashboard_Design.md`   | ⏸️ To-Do   | -       | -            | CMS 대시보드 (Phase 3 예정)                   |

*(상태 코드: ✅ Active, 🔄 Draft, ⏸️ To-Do, ❄️ Frozen)*

---

## 5. Progress Log (Milestones)

### 2026-06-17 — GitHub Repository Push ✅
- [x] Git remote를 `https://github.com/leehaeun22/Portfolio.git`로 변경
- [x] Next.js 포트폴리오 웹사이트 소스, public assets, package files 커밋 생성
- [x] `.gitignore`를 Vercel/Next.js 배포에 맞게 정리하고 `.gitattributes`로 binary asset 보호
- [x] `main` 브랜치를 GitHub `leehaeun22/Portfolio` 저장소에 push 완료

### 2026-06-17 — Missing Webpack Chunk Recovery ✅
- [x] `Cannot find module './611.js'` 런타임 오류 원인인 stale `.next` / dev server 상태 정리
- [x] 포트 3000의 기존 Next.js dev server 프로세스 종료
- [x] `.next` 및 `node_modules/.cache` 삭제 후 `npm run build` 재실행
- [x] `.next/server/chunks/611.js`와 `.next/server/pages/_document.js` 참조 상태 확인
- [x] localhost:3000 dev server 재시작 후 Chrome 런타임에서 Runtime Error 미발생 확인

### 2026-06-17 — Dark Mode & Resume Download Fix ✅
- [x] Tailwind v4에서 `.dark` 클래스 기반 다크 모드가 동작하도록 `@custom-variant dark` 추가
- [x] Header 다크 모드 토글을 `resolvedTheme` 기준으로 변경
- [x] Header/Hero 이력서 링크에 `download="Lee_Haeun_Resume.pdf"`를 명시
- [x] production 렌더링에서 다크 모드 토글 후 `html.dark`, body 배경색, Hero 제목 색상 변경 확인
- [x] `npm run build` 통과 및 이력서 다운로드 속성 확인

### 2026-06-17 — Vercel Pre-Deploy QA ✅
- [x] `npm run build` 통과 확인
- [x] `package.json` scripts가 `next dev`, `next build`, `next start` 구조인지 확인
- [x] alias import 경로와 public asset 참조 누락 여부 확인
- [x] `public/favicon.ico`를 정상 ICO 파일로 교체하고 `/favicon.ico` 200 응답 확인
- [x] 누락되어 있던 `/resume.pdf` public asset을 추가해 Header/Hero 다운로드 링크 404 방지
- [x] `next start` production 모드에서 1440px, 1024px, 768px, 430px, 375px급 Chrome 렌더링 및 console error 없음 확인

### 2026-06-17 — Tailwind Reset Padding Fix ✅
- [x] `globals.css`의 전역 reset이 Tailwind margin/padding 유틸리티를 덮어쓰던 문제 수정
- [x] Projects 카드 본문 padding, margin, gap 유틸리티가 실제 렌더링에 적용되도록 복구
- [x] Projects 카드 제목/설명/태그 크기를 더 낮추고 하단 padding을 확보
- [x] Chrome 렌더링에서 카드 본문 좌측 여백 약 29px, 태그 하단 여백 약 37px 확보 확인
- [x] `npm run build` 통과 및 localhost:3000 정상 응답 확인

### 2026-06-17 — Projects Card Typography Tuning ✅
- [x] Projects 카드 제목 크기를 `text-xl md:text-2xl`로 축소
- [x] Projects 카드 설명 크기를 `text-sm md:text-base`로 축소
- [x] Projects 카드 태그 크기를 `text-xs font-medium`으로 축소
- [x] 이미지 wrapper, 이미지 높이, object-fit, 카드 구조는 변경하지 않음
- [x] `npm run build` 통과 및 localhost:3000 정상 응답 확인

### 2026-06-17 — Projects Content Clipping Fix ✅
- [x] Projects 이미지 wrapper와 이미지 높이/object-fit/overflow 구조는 유지
- [x] project-content에 `w-full`, `box-border`, `min-w-0`, 충분한 padding을 명시해 카드 내부 폭 안정화
- [x] 제목/설명/태그 영역의 `truncate`, `line-clamp`, `max-height` 미사용 상태 확인
- [x] tags wrapper와 tag item에 `w-full`, `box-border`, `max-w-full`, `inline-flex`, `whitespace-nowrap`를 적용
- [x] 1440px, 1024px, 768px, 430px, 375px급 Chrome 렌더링에서 `Figma`, `Next.js`, `Flutter`, `React` 태그 전체 표시 확인

### 2026-06-17 — Runtime Chunk Recovery ✅
- [x] 중복 실행 중이던 이 프로젝트의 Next.js dev server 프로세스를 정리
- [x] `.next` 및 `node_modules/.cache` 정리 후 `npm run build` 통과 확인
- [x] build 실행 후 dev server를 다시 재시작해 개발 서버 HTML과 `_next/static` 청크 상태를 일치시킴
- [x] `main-app.js`, `app-pages-internals.js`, `page.js`, `layout.css`, `polyfills.js` 200 응답 확인
- [x] Chrome 런타임 검증으로 `__webpack_modules__[moduleId] is not a function` 오류 미발생 확인
- [x] Projects 이미지 wrapper 구조는 유지하고 본문 텍스트/태그 영역만 최소 보정

### 2026-06-17 — Next.js Loading Recovery ✅
- [x] `.next` 및 `node_modules/.cache` 정리 후 Next.js production build 통과
- [x] `next.config.ts`에서 로컬 개발 중 `_next/static` 404를 유발할 수 있는 `output: 'export'`, `trailingSlash` 제거
- [x] `layout.tsx`, `Header.tsx`, `HeroSection.tsx`, `profile.ts`의 깨진 JSX/문자열을 정상 UTF-8 렌더링 상태로 복구
- [x] localhost:3000에서 `main-app.js`, `app-pages-internals.js`, `page.js`, `layout.css`, `favicon.ico` 200 응답 확인
- [x] Chrome 렌더링 검증으로 Hero, Projects 카드, 홍익대학교 소프트웨어융합학과 4학년 문구 표시 확인

### 2026-06-17 — Projects Image Recovery ✅
- [x] Projects 카드 구조를 card → image-wrapper → image → content로 복구
- [x] image-wrapper와 project-card의 `overflow-hidden`을 유지해 이미지가 카드 밖으로 튀지 않도록 수정
- [x] project-content는 자연 높이와 줄바꿈을 유지해 제목/설명/태그 잘림 방지
- [x] 1440px, 1024px, 768px, 430px, 375px Chrome 렌더링 검사로 이미지/본문/태그 위치 확인

### 2026-06-17 — Targeted Layout Fix ✅
- [x] Projects 카드 본문 overflow를 visible로 조정하고 제목/설명/태그 영역 여백을 확대
- [x] Hero 제목을 데스크톱/태블릿 1줄 유지, 모바일에서는 `이하은입니다.` 단위 유지로 조정
- [x] 학교/학과/학년 데이터를 홍익대학교 / 소프트웨어융합학과 / 4학년으로 교체
- [x] 1440px, 1024px, 768px, 430px, 375px Chrome 렌더링 검사 완료

### 2026-06-17 — Layout Refinement ✅
- [x] Hero, Skills, Projects, Experience 섹션의 고정 높이성 여백을 제거하고 내용 기반 auto height로 정리
- [x] Hero CTA 및 Header 이력서 버튼의 줄바꿈 방지, 최소 클릭 크기, 중앙 정렬 개선
- [x] 손상된 한국어 문자열 리터럴을 복구해 Next.js production build 통과
- [x] 공통 section padding, card radius, display text line-height를 레이아웃 안정 기준에 맞게 조정

### Phase 1 — 기획 및 프로젝트 스캐폴딩 🔄
- [x] 프로젝트 명세 문서 작성 (PRD, SRS, Design)
- [ ] Next.js 프로젝트 초기화 및 Tailwind 설정
- [ ] 디자인 토큰 설정 (tailwind.config.ts)
- [ ] 공통 레이아웃 (Header, Footer, Navigation) 구현

### Phase 2 — 포트폴리오 섹션 개발 ⏸️
- [ ] Hero 섹션 구현
- [ ] About 섹션 구현
- [ ] Skills 섹션 구현
- [ ] Projects 섹션 구현 (필터링 포함)
- [ ] Experience / Education 섹션 구현
- [ ] Contact 섹션 구현 (이메일 전송 API 포함)
- [ ] Dark Mode 토글 구현
- [ ] 반응형 최적화

### Phase 3 — 최적화 및 배포 ⏸️
- [ ] SEO 최적화 (메타태그, OG, JSON-LD, sitemap)
- [ ] 성능 최적화 (Lighthouse 90+ 달성)
- [ ] Vercel 배포 및 커스텀 도메인 연결
- [ ] CMS 대시보드 (선택)

---

## 6. Current Priority (Next Action)

> Current note: Runtime chunk mismatch 복구 완료. `npm run build`를 실행한 뒤에는 dev server를 재시작해 `.next` 산출물과 브라우저 청크가 섞이지 않게 유지한다.

> Current note: Next.js 흰 화면 및 `_next/static` 404 복구 완료. 다음 작업은 현재 실행 중인 `localhost:3000` 기준의 추가 시각 QA 및 사용자 확인이다.

| Priority | Target               | Task                                                                     | Blocker / Requirement          |
| :------- | :------------------- | :----------------------------------------------------------------------- | :----------------------------- |
| **P0**   | Portfolio Layout     | 브라우저 인스턴스 복구 후 Hero/Skills/Projects/Experience 반응형 시각 QA | Browser `iab` unavailable      |
| **P0**   | 프로젝트 초기화      | Next.js 15 스캐폴딩 + Tailwind + Framer Motion 설정                     | 명세 문서 완료                 |
| **P1**   | 레이아웃 구현        | Header, Footer, Navigation 공통 레이아웃 구현                            | P0 완료                        |
| **P2**   | Hero 섹션            | HeroSection 컴포넌트 구현 및 개인 정보 데이터 연동                       | P1 완료                        |

---

## 7. Risk Registry

> Current note: dev server가 실행 중인 상태에서 `npm run build`가 `.next`를 다시 쓰면 청크 404 또는 `__webpack_modules__` 런타임 오류가 재발할 수 있으므로 build 후 dev server 재시작이 필요하다.

> Current note: `_next/static` asset 404 및 흰 화면 리스크는 `.next` 재생성, config 정리, dev server 재시작, Chrome 렌더링 검증으로 완화됨.

| ID    | Risk                                      | Impact | Probability | Mitigation                                              | Status    |
| :---- | :---------------------------------------- | :----- | :---------- | :------------------------------------------------------- | :-------- |
| RSK-3 | Browser `iab` unavailable during visual QA | Medium | Medium | `npm run build` 통과로 정적 검증 완료, 브라우저 인스턴스 복구 후 시각 QA 재시도 | Open |
| RSK-1 | 포트폴리오 콘텐츠(프로젝트 데이터) 부재   | High   | Medium      | 더미 데이터로 먼저 구현 후 실제 데이터 교체              | Open      |
| RSK-2 | 이미지 자산 부족                          | Medium | High        | AI 이미지 생성 도구 또는 Unsplash로 대체                 | Open      |

---

## 8. Global Constraints & Context Flags

| Flag                   | Value   | Description                                                                                   |
| :--------------------- | :------ | :-------------------------------------------------------------------------------------------- |
| `STRICT_CONVENTION`    | `true`  | 모든 파일/폴더 생성 및 네이밍은 `Architecture_Convention.md`의 규칙을 엄격히 따름             |
| `STRICT_TYPESCRIPT`    | `true`  | `any` 타입 사용 금지. 모든 변수/함수에 명시적 타입 정의 필수                                  |
| `UI_MOBILE_FIRST`      | `true`  | 모바일 퍼스트 반응형 디자인                                                                    |
| `FLAG_NO_CMS`          | `true`  | CMS 대시보드(Internal) 코드 생성을 현재 단계에서 차단                                         |
| `DARK_MODE`            | `true`  | 다크 모드 지원 필수                                                                            |
