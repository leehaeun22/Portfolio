# Software Requirements Specification (SRS)

> **[AI Agent Instruction]**
> - 에이전트는 `@PRD.md` 와 `@Architecture_and_Convension.md`를 바탕으로 본 문서를 작성한다.
> - 데이터베이스 스키마 설계 시 PostgreSQL(또는 MySQL) 표준 타입을 준수한다.
> - API Endpoint 설계 시 RESTful 규칙을 엄수한다.

## 1. Database Schema (Entity)
| 도메인 | 테이블명 (Table) | 컬럼명 (Column) | 데이터 타입 (Type) | 제약조건 (Constraints) |
| :--- | :--- | :--- | :--- | :--- |
| User | `users` | `id` | UUID | Primary Key, Auto Generate |
| User | `users` | `email` | VARCHAR | Unique, Not Null |
| User | `users` | `role` | ENUM | 'ADMIN', 'USER' |
| ... | | | | |

## 2. API Specification (NestJS DTO & Controller)
| 소속 (Web) | HTTP | Endpoint URI | 권한 (Role) | Request DTO (Body/Query) | Response DTO |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Internal | GET | `/api/internal/employees/leave` | ADMIN | `?status=PENDING` | `LeaveListResponseDto` |
| Internal | POST | `/api/internal/employees/leave/:id/approve` | ADMIN | `{ isApproved: boolean }` | `LeaveApproveResponseDto` |
| ... | | | | | |

## 3. Frontend Routing & Components (React/Angular)
| 소속 (Web) | URL Path | 화면명 (Page Component) | 데이터 연동 API | 필요 UI 컴포넌트 (@Design 참조) |
| :--- | :--- | :--- | :--- | :--- |
| External | `/` | `MainPage` | None | `HeroSection`, `FeatureGrid` |
| Internal | `/admin/leave` | `LeaveManagementPage` | `GET /api/internal/employees/leave` | `DataTable`, `StatusBadge` |
| ... | | | | |