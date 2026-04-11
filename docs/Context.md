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
| **Project Name** | `[Project Name]`                                                  |
| **Codename** | `[Project Codename]`                                              |
| **Description** | `[프로젝트의 핵심 목표 및 요약 설명]`                             |
| **Current Phase**| Phase 1 — `[현재 진행 중인 페이즈의 이름]`                        |
| **Active Focus** | `[현재 에이전트가 집중해야 할 도메인/모듈]`                       |
| **Excluded** | `[현재 작업 범위에서 명시적으로 제외할 대상]`                     |
| **Repository** | `[Monorepo / Multi-repo 등 리포지토리 전략]`                      |
| **License** | `[Proprietary / MIT / GPL 등 라이선스 정책]`                      |

---

## 2. Technology Stack

### 2.1 Frontend
| Layer        | Tech & Version                      | Notes                               |
| :----------- | :---------------------------------- | :---------------------------------- |
| Framework    | `[e.g., Next.js 15 / React 18]`     | `[사용 방식: e.g., App Router]`     |
| Language     | `[e.g., TypeScript 5.x]`            | `[설정 제약: e.g., strict: true]`   |
| Styling      | `[e.g., Tailwind CSS / Styled]`     | `[스타일링 원칙]`                   |
| UI Library   | `[e.g., Shadcn UI / MUI]`           | `[UI 컴포넌트 라이브러리]`          |
| State Mgmt   | `[e.g., Zustand / Redux]`           | `[상태 관리 전략]`                  |
| Data Fetching| `[e.g., TanStack Query / Fetch]`    | `[API 통신 방식]`                   |

### 2.2 Backend
| Layer        | Tech & Version                      | Notes                               |
| :----------- | :---------------------------------- | :---------------------------------- |
| Framework    | `[e.g., NestJS / Spring Boot]`      | `[아키텍처 패턴]`                   |
| Language     | `[e.g., TypeScript / Java]`         | `[언어 및 버전]`                    |
| ORM          | `[e.g., Prisma / TypeORM]`          | `[데이터베이스 접근 도구]`          |
| Database     | `[e.g., PostgreSQL / MySQL]`        | `[메인 DB]`                         |
| Cache        | `[e.g., Redis / Memcached]`         | `[캐싱/세션 관리 용도]`             |
| Auth         | `[e.g., JWT / OAuth2]`              | `[인증/인가 방식]`                  |

### 2.3 Infrastructure & DevOps
| Layer        | Technology                          | Notes                               |
| :----------- | :---------------------------------- | :---------------------------------- |
| Container    | `[e.g., Docker / Docker Compose]`   | `[컨테이너화 전략]`                 |
| CI/CD        | `[e.g., GitHub Actions / Jenkins]`  | `[파이프라인 구성 방식]`            |
| Hosting      | `[e.g., Vercel (FE) / AWS (BE)]`    | `[배포 환경]`                       |
| Monitoring   | `[e.g., Sentry / Datadog]`          | `[에러 및 성능 모니터링]`           |

---

## 3. Environment Strategy

| Environment  | Branch           | URL Pattern                      | Purpose                  | Auto Deploy |
| :----------- | :--------------- | :------------------------------- | :----------------------- | :---------- |
| **Local** | `*`              | `localhost:[port]`               | 로컬 개발 및 디버깅      | -           |
| **Dev** | `[e.g., dev]`    | `dev.[domain]`                   | 기능 통합 테스트         | ✅           |
| **Staging** | `[e.g., release]`| `stg.[domain]`                   | QA 및 고객 리뷰          | ✅           |
| **Production**| `[e.g., main]`  | `www.[domain]`                   | 실 서비스 운영           | 수동 승인   |

---

## 4. Active Documentation Status

| File                             | Status     | Owner   | Last Updated | Notes                                         |
| :------------------------------- | :--------- | :------ | :----------- | :-------------------------------------------- |
| `Context.md`                     | ✅ Active  | Agent   | 자동 갱신    | SSOT — 매 작업 완료 시 자동 업데이트          |
| `Architecture_Convention.md`     | 🔄 Draft   | Agent   | -            | 디렉토리 구조, 네이밍 규칙, 코드 컨벤션 문서  |
| `PRD.md`                         | 🔄 Active  | User    | -            | 제품 요구사항 정의서 (Product Requirements)   |
| `SRS.md`                         | 🔄 Draft   | Agent   | -            | 소프트웨어 요구사항 명세 (System Requirements)|
| `UI_UX_Guidelines.md`            | ⏸️ To-Do   | -       | -            | 디자인 시스템 및 UI 컴포넌트 정책             |

*(상태 코드: ✅ Active(활성), 🔄 Draft(작성 중/수정 중), ⏸️ To-Do(예정), ❄️ Frozen(동결))*

---

## 5. Progress Log (Milestones)

### Phase 1 — `[초기 설정 및 기획]` 🔄
- [x] 프로젝트 요구사항 수집 및 PRD 초안 작성
- [ ] 베이스 리포지토리 초기화 및 기술 스택 스캐폴딩
- [ ] 핵심 아키텍처 설계 및 컨벤션 문서화
- [ ] CI/CD 파이프라인 기초 설정

### Phase 2 — `[핵심 기능 개발]` ⏸️
- [ ] `[핵심 도메인 1 개발]`
- [ ] `[핵심 도메인 2 개발]`
- [ ] 공통 UI 컴포넌트 및 레이아웃 구현

### Phase 3 — `[최적화 및 배포]` ⏸️
- [ ] 보안 점검 및 성능 최적화
- [ ] E2E / 통합 테스트 작성
- [ ] 프로덕션 환경 배포

---

## 6. Current Priority (Next Action)

| Priority | Target               | Task                                                                     | Blocker / Requirement          |
| :------- | :------------------- | :----------------------------------------------------------------------- | :----------------------------- |
| **P0** | `[최우선 목표]`      | `[현재 즉시 실행해야 할 구체적인 작업 (예: 프로젝트 스캐폴딩)]`          | `[작업 선행 조건]`             |
| **P1** | `[다음 목표]`        | `[P0 완료 후 진행할 작업]`                                               | P0 완료                        |
| **P2** | `[대기 중인 목표]`   | `[가까운 시일 내에 처리할 작업]`                                         | -                              |

---

## 7. Risk Registry

| ID    | Risk                                      | Impact | Probability | Mitigation                                              | Status    |
| :---- | :---------------------------------------- | :----- | :---------- | :------------------------------------------------------- | :-------- |
| RSK-1 | `[예상되는 기술적/일정상 위험 요소 1]`    | High   | Medium      | `[해결 및 완화 방안]`                                   | Open      |
| RSK-2 | `[예상되는 기술적/일정상 위험 요소 2]`    | Medium | Low         | `[해결 및 완화 방안]`                                   | Open      |

---

## 8. Global Constraints & Context Flags

| Flag                   | Value   | Description                                                                                   |
| :--------------------- | :------ | :-------------------------------------------------------------------------------------------- |
| `STRICT_CONVENTION`    | `true`  | 모든 파일/폴더 생성 및 네이밍은 `Architecture_Convention.md`의 규칙을 엄격히 따름             |
| `STRICT_TYPESCRIPT`    | `true`  | `any` 타입 사용 금지. 모든 변수/함수에 명시적 타입 정의 필수                                  |
| `TEST_DRIVEN`          | `false` | `[true/false 설정에 따른 TDD 혹은 테스트 코드 작성 의무화 여부]`                              |
| `UI_MOBILE_FIRST`      | `true`  | `[모바일 퍼스트, 데스크탑 퍼스트 등 기본 UI 접근 전략]`                                       |
| `FLAG_EXCLUDE_[NAME]`  | `true`  | `[특정 기능/모듈의 코드 생성을 현재 단계에서 명시적으로 차단할 때 사용하는 플래그]`           |