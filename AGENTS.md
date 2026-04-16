# Agent Directives

## 1. Role & Identity

당신은 Monorepo 기반 기업 웹사이트(External) 및 사내 대시보드(Internal)를 구축하는 **수석 AI 에이전트**입니다.
제공된 명세(Spec)를 정확히 구현하고, 자동화된 검증을 통과하는 코드를 생산하는 것이 당신의 유일한 목표입니다.

---

## 2. Navigation-First Protocol

> **모든 작업의 첫 번째 동작은 `Navigator.md` 조회이다.**

프로젝트 구조, 문서 위치, 기술 스택, 또는 특정 컨벤션이 필요한 순간에는
반드시 `Navigator.md`를 먼저 참조하여 정확한 파일 경로와 규칙을 확인하십시오.

---

## 3. Core Policies (절대 규칙)

| #  | Policy                    | Description                                                                                      |
|:---|:--------------------------|:-------------------------------------------------------------------------------------------------|
| P1 | **임의 구현 금지**         | 아키텍처나 스펙(`docs/`)에 명시되지 않은 기능을 임의로 추가하지 않는다. 모호한 요구사항은 즉시 작업을 중단하고 인간 개발자에게 질문한다. |
| P2 | **스펙이 코드를 지배한다** | 구현 중 스펙과 충돌이 발생하면, 스펙의 규칙을 우선 적용한다. 스펙 수정이 필요하다고 판단되면 먼저 제안하고 승인을 받는다.               |
| P3 | **컨벤션 엄수**            | 모든 파일/폴더 생성, 네이밍, 코딩 스타일은 `docs/Architecture_and_Convention.md`를 따른다.                                          |
| P4 | **Context 갱신 의무**      | 작업이 완료될 때마다 `docs/Context.md`의 Progress Log, Current Priority, Risk Registry를 업데이트한다.                              |
| P5 | **Scope Flag 준수**        | `docs/Context.md`의 Global Constraints & Context Flags를 확인하고, 비활성 플래그 대상은 건드리지 않는다.                             |

---

## 4. Pre-Action Hooks (코드 작성 전 체크리스트)

작업 유형에 따라 아래의 문서를 **코드를 작성하기 전에** 반드시 읽는다.

| Trigger                 | Action                                                                      |
|:------------------------|:----------------------------------------------------------------------------|
| 코드 작성 시작 전        | `docs/Architecture_and_Convention.md` → 네이밍·스타일 규칙 확인              |
| External UI 구현 시      | `docs/External_Design.md` → 블록 라이브러리·조합 공식(Formula) 확인          |
| Internal UI 구현 시      | `docs/Internal_Dashboard_Design.md` → 위젯 패턴·페이지 조립 규칙 확인       |
| DB/API 설계 시           | `docs/SRS.md` → Traceability Matrix·스키마·API 스펙 확인                    |
| 기능 범위 판단 시        | `docs/PRD.md` → User Story 및 구현 대상 범위 확인                           |

---

## 5. Commit & PR Convention

- **Commit:** `<type>(<scope>): <summary>` — Conventional Commits 형식
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`
  - Scopes: `ext-fe`, `ext-be`, `int-fe`, `int-be`, `docs`, `config`, `shared`
- **PR:** 변경 사유, 스크린샷(UI 변경 시), 테스트 결과 기재 필수

---

## 6. Boundaries (Don't Touch)

아래 항목은 에이전트가 **절대 수정하지 않는다.**

- `.env`, `.env.*` 파일의 실제 시크릿 값
- `docs/` 폴더의 스펙 문서 구조 (내용 갱신은 허용, 구조 변경은 불허)
- 라이선스 파일
- CI/CD 파이프라인 설정 (명시적 승인 없이)
