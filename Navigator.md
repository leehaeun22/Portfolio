# Project Navigator

> 개인 포트폴리오 웹 페이지 프로젝트의 모든 지식, 문서, 코드 위치를 한눈에 파악하기 위한 지도.
> 에이전트는 작업 시작 전 이 문서를 가장 먼저 조회한다.

---

## 1. Specifications (명세 문서)

| Document                             | Path                                    | Purpose                                          |
|:-------------------------------------|:----------------------------------------|:-------------------------------------------------|
| **Product Requirements**             | `docs/PRD.md`                           | 포트폴리오 요구사항 정의, 섹션 구성, 디자인 결정  |
| **Software Requirements**            | `docs/SRS.md`                           | DB Schema, API Spec, Routing, Traceability Matrix |
| **Architecture & Convention**        | `docs/Architecture_and_Convention.md`   | 디렉토리 구조, 네이밍 규칙, 코딩 스타일 가이드    |
| **Portfolio Design**                 | `docs/External_Design.md`              | 포트폴리오 디자인 시스템, 섹션 블록 라이브러리     |
| **CMS Dashboard Design**            | `docs/Internal_Dashboard_Design.md`    | 콘텐츠 관리 대시보드 레이아웃, CRUD 워크플로우     |
| **Project Context (SSOT)**           | `docs/Context.md`                      | 프로젝트 현황, 기술 스택, Progress Log, Flags      |

---

## 2. Agent Configuration

| Document                | Path                     | Purpose                                    |
|:------------------------|:-------------------------|:-------------------------------------------|
| **Agent Directives**    | `AGENTS.md`              | 에이전트 역할, 절대 규칙, 행동 프로토콜     |
| **Gemini Configuration**| `.gemini/GEMINI.md`      | Antigravity 전용 확장 지시                  |

---

## 3. Codebase Structure

> 아래는 `docs/Architecture_and_Convention.md` §2에 정의된 프로젝트 구조의 요약이다.

```text
Root/
├── AGENTS.md                      # 에이전트 행동 지침
├── Navigator.md                   # 이 파일 — 프로젝트 지도
├── docs/                          # 명세 문서 모음
│
├── src/                           # 포트폴리오 웹 페이지 소스
│   ├── app/                       #   Next.js App Router 라우팅
│   │   ├── (portfolio)/           #     포트폴리오 메인 페이지 그룹
│   │   ├── (legal)/               #     법적 페이지 그룹
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/                #   섹션 블록 및 UI 컴포넌트
│   │   ├── sections/              #     Hero, About, Projects, Skills, Contact 등
│   │   ├── layout/                #     Header, Footer, Navigation
│   │   └── ui/                    #     Button, Badge, Card 등 원자 컴포넌트
│   ├── hooks/                     #   커스텀 훅
│   ├── services/                  #   API 통신 서비스
│   ├── interfaces/                #   타입/인터페이스
│   ├── utils/                     #   유틸리티
│   ├── constants/                 #   상수 (개인정보, 프로젝트 데이터 등)
│   └── assets/                    #   이미지, 폰트 등 정적 자산
│
├── public/                        # 정적 파일 (favicon, resume PDF 등)
├── .github/workflows/             # CI/CD 파이프라인
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Tech Stack Summary

| Layer        | Technology                            |
|:-------------|:--------------------------------------|
| Framework    | Next.js 15 (App Router, SSG 중심)     |
| Language     | TypeScript (strict)                   |
| Styling      | Tailwind CSS                          |
| Animation    | Framer Motion                         |
| UI Library   | 커스텀 섹션 블록 컴포넌트             |
| Icons        | lucide-react                          |
| Font         | Pretendard / Inter                    |
| Deployment   | Vercel                                |

---

## 5. Quick Reference

### 작업별 바로가기

| 작업 내용                          | 참조 문서                                   |
|:----------------------------------|:--------------------------------------------|
| "어떤 섹션을 만들어야 하지?"       | `docs/PRD.md` → §3 User Stories             |
| "디자인 토큰/테마 설정은?"         | `docs/External_Design.md` → §1 Design System |
| "어떤 섹션 블록을 쓰지?"           | `docs/External_Design.md` → §4 Section Library |
| "페이지 조합 공식은?"              | `docs/External_Design.md` → §6 Assembly Logic |
| "파일 이름은 어떻게?"              | `docs/Architecture_and_Convention.md` → §3   |
| "API 스펙은?"                      | `docs/SRS.md` → §3 API Specification        |
| "CMS 대시보드 패턴은?"             | `docs/Internal_Dashboard_Design.md` → §4~5  |
| "지금 뭘 해야 하지?"              | `docs/Context.md` → §6 Current Priority      |
| "현재 제외 대상은?"                | `docs/Context.md` → §8 Global Constraints    |
