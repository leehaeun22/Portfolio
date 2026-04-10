# Product Requirements Document (PRD)

> **[AI Agent Instruction]**
> - 에이전트는 고객의 자연어 요구사항을 분석하여 아래 테이블의 빈칸을 채운다.
> - 고객이 명시하지 않은 기능은 절대 임의로 추가하지 않는다. (Over-engineering 엄금)
> - 모든 기능은 [External_Web]과 [Internal_Web] 중 어디에 속하는지 명확히 구분한다.

## 1. 프로젝트 개요
* **프로젝트명:** [AI가 채우는 곳]
* **주요 타겟 고객:** [AI가 채우는 곳]
* **핵심 비즈니스 목표:** [AI가 채우는 곳]

## 2. 필수 기능 명세 (User Story)
| 구분 | 권한 (Role) | 도메인 (Domain) | 유저 스토리 (고객 요구사항) | 소속 (External / Internal) |
| :--- | :--- | :--- | :--- | :--- |
| 기능 1 | [예: 일반유저] | [예: Notice] | [예: 사용자는 회사 공지사항 목록을 조회할 수 있다.] | External_Web |
| 기능 2 | [예: 관리자] | [예: Employee] | [예: 관리자는 직원의 연차 사용 내역을 승인/반려할 수 있다.] | Internal_Web |
| ... | | | | |