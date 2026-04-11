# Software Requirements Specification (SRS) - [프로젝트명]

> **[AI Agent Instruction]**
> - 에이전트는 `@PRD.md`와 `@Architecture_and_Convention.md`를 바탕으로 본 문서를 작성한다.
> - PRD의 각 User Story(ID 기준)는 반드시 본 문서의 DB Schema, API, Frontend 섹션에 1:1 대응 매핑되어야 한다.
> - 데이터베이스 스키마 설계 시 **[데이터베이스 종류, 예: PostgreSQL]** 표준 타입을 준수한다.
> - API Endpoint 설계 시 **RESTful** 규칙을 엄수한다.
> - 본 문서의 모든 표 항목은 구현 시 **코드 자동 생성(Code Generation)의 입력값**으로 사용된다.
> - 현재 구현 범위(Scope)는 **[구현 대상 범위, 예: 전체 / 특정 모듈 / FLAG 설정 상태 등]**에 한정한다.

---

## 1. Traceability Matrix (추적성 매트릭스)

| PRD ID   | User Story 요약                          | DB Table(s)           | API Endpoint(s)                  | Frontend Page / Component      |
| :------- | :--------------------------------------- | :-------------------- | :------------------------------- | :----------------------------- |
| [ID-001] | [해당 User Story의 핵심 요구사항 요약]   | `[table_name]`        | `[METHOD] /api/...`              | `[PageName]`, `[Component]`    |
| [ID-002] | [DB/API가 필요 없는 프론트엔드 전용 기능]| -                     | -                                | `[PageName]`, `[Component]`    |

---

## 2. Database Schema (Entity 설계)

### 2.1 Entity Definition

#### `[table_name_1]` ([테이블 목적/설명])
| Column         | Type           | Constraints                    | Description              |
| :------------- | :------------- | :----------------------------- | :----------------------- |
| `id`           | `[TYPE]`       | PK, Auto Generate              | 고유 식별자              |
| `[column_name]`| `[TYPE]`       | [예: NOT NULL]                 | [컬럼 설명]              |
| `[column_name]`| `[TYPE]`       | [예: FK, DEFAULT ...]          | [컬럼 설명]              |
| `created_at`   | `[TYPE]`       | DEFAULT NOW()                  | 생성 일시                |

---

## 3. API Specification

### 3.1 [도메인/모듈 분류명] API

#### [API 도메인 그룹명]

| HTTP       | Endpoint URI               | Role     | Request DTO                              | Response DTO                  | Description         |
| :--------- | :------------------------- | :------- | :--------------------------------------- | :---------------------------- | :------------------ |
| `[METHOD]` | `/api/[endpoint_path]`     | [Public/User/Admin] | `[RequestDtoName]`            | `[ResponseDtoName]`           | [해당 API의 기능 설명] |

---

## 4. Frontend Routing & Page-Component Mapping

### 4.1 [웹/앱 분류명] 라우팅

| Route Path           | Page Component       | SEO Title Template                    | 주요 UI 블록 ([참조 문서] 참조)                              |
| :------------------- | :------------------- | :------------------------------------ | :----------------------------------------------------------- |
| `/[path]`            | `[PageComponentName]`| `[SEO 노출용 페이지 제목]`            | `[UI_Block_1]`, `[UI_Block_2]`                               |
| `/[path]/[id]`       | `[PageComponentName]`| `[SEO 노출용 페이지 제목]`            | `[UI_Block_1]`, `[UI_Block_2]`                               |

---

## 5. Infrastructure & Deployment

- **Framework**: [예: Next.js 15 (App Router), NestJS, etc.]
- **Database**: [예: PostgreSQL, MySQL, MongoDB, etc.]
- **Styling / UI**: [예: Tailwind CSS, Material UI, etc.]
- **Libraries / Tools**: [예: Framer Motion, Lucide React, Zustand, etc.]