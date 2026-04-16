# Project Navigator

> 프로젝트의 모든 지식, 문서, 코드 위치를 한눈에 파악하기 위한 지도.
> 에이전트는 작업 시작 전 이 문서를 가장 먼저 조회한다.

---

## 1. Specifications (명세 문서)

| Document                             | Path                                    | Purpose                                          |
|:-------------------------------------|:----------------------------------------|:-------------------------------------------------|
| **Product Requirements**             | `docs/PRD.md`                           | 제품 요구사항 정의, User Story, 디자인 결정       |
| **Software Requirements**            | `docs/SRS.md`                           | DB Schema, API Spec, Routing, Traceability Matrix |
| **Architecture & Convention**        | `docs/Architecture_and_Convention.md`   | 디렉토리 구조, 네이밍 규칙, 코딩 스타일 가이드    |
| **External Web Design**              | `docs/External_Design.md`              | 기업 웹사이트 디자인 시스템, 블록 라이브러리, Formula |
| **Internal Dashboard Design**        | `docs/Internal_Dashboard_Design.md`    | 사내 대시보드 레이아웃, 위젯 패턴, CRUD 워크플로우  |
| **Project Context (SSOT)**           | `docs/Context.md`                      | 프로젝트 현황, 기술 스택, Progress Log, Flags      |

---

## 2. Agent Configuration

| Document                | Path                     | Purpose                                    |
|:------------------------|:-------------------------|:-------------------------------------------|
| **Agent Directives**    | `AGENTS.md`              | 에이전트 역할, 절대 규칙, 행동 프로토콜     |
| **Gemini Configuration**| `.gemini/GEMINI.md`      | Antigravity 전용 확장 지시                  |

---

## 3. Codebase Structure

> 아래는 `docs/Architecture_and_Convention.md` §2에 정의된 Monorepo 구조의 요약이다.

```text
Root/
├── AGENTS.md                      # 에이전트 행동 지침 (오픈 표준)
├── Navigator.md                   # 이 파일 — 프로젝트 지도
├── docs/                          # 명세 문서 모음
│
├── External/                      # 기업 소개 웹사이트 도메인
│   ├── Frontend/                  #   Next.js 15 App Router
│   │   ├── app/                   #     라우팅 (Route Groups)
│   │   ├── components/            #     blocks/, layout/, ui/
│   │   ├── hooks/                 #     커스텀 훅
│   │   ├── services/              #     API 통신 서비스
│   │   ├── interfaces/            #     타입/인터페이스
│   │   ├── utils/                 #     유틸리티
│   │   └── constants/             #     상수
│   ├── Backend/                   #   NestJS API
│   │   ├── src/                   #     도메인 모듈별 구성
│   │   └── prisma/                #     Prisma ORM
│   └── _shared/                   #   External 내 공유 모듈
│
├── Internal/                      # 사내 대시보드 도메인 (Phase 3)
│   ├── Frontend/                  #   React 18 + Vite SPA
│   ├── Backend/                   #   NestJS API
│   └── _shared/                   #   Internal 내 공유 모듈
│
├── _shared/                       # 전역 공유 모듈
├── .github/workflows/             # CI/CD 파이프라인
└── docker-compose.yml             # 로컬 개발 환경
```

---

## 4. Tech Stack Summary

| Layer        | External                  | Internal              |
|:-------------|:--------------------------|:----------------------|
| Framework    | Next.js 15 (App Router)   | React 18 + Vite       |
| Language     | TypeScript (strict)       | TypeScript (strict)   |
| Styling      | Tailwind CSS              | Tailwind CSS          |
| Animation    | Framer Motion             | —                     |
| State        | Next.js built-in          | Zustand + TanStack Query |
| UI Library   | Custom Blocks             | Shadcn UI             |
| Backend      | NestJS                    | NestJS                |
| ORM          | Prisma                    | Prisma                |
| Icons        | lucide-react              | lucide-react          |

---

## 5. Quick Reference

### 작업별 바로가기

| 작업 내용                          | 참조 문서                                   |
|:----------------------------------|:--------------------------------------------|
| "어떤 기능을 만들어야 하지?"       | `docs/PRD.md` → §3 User Stories             |
| "DB 테이블 구조는?"               | `docs/SRS.md` → §2 Database Schema          |
| "API 엔드포인트는?"               | `docs/SRS.md` → §3 API Specification        |
| "파일 이름은 어떻게?"             | `docs/Architecture_and_Convention.md` → §3   |
| "어떤 UI 블록을 쓰지?"            | `docs/External_Design.md` → §4 Block Library |
| "페이지 조합 공식은?"             | `docs/External_Design.md` → §6 Formula       |
| "대시보드 패턴은?"                | `docs/Internal_Dashboard_Design.md` → §4~5   |
| "지금 뭘 해야 하지?"              | `docs/Context.md` → §6 Current Priority      |
| "현재 제외 대상은?"               | `docs/Context.md` → §8 Global Constraints    |
