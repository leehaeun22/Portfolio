# System Architecture & Coding Conventions

## 1. Repository Overview
본 리포지토리는 Monorepo 구조를 지향하며, B2B 기업용 웹사이트(External_Web)와 사내 대시보드(Internal_Web)를 동시에 지원하기 위한 마스터 템플릿이다. AI 에이전트는 코드를 생성하거나 수정할 때 반드시 아래의 디렉토리 구조와 규칙을 엄수해야 한다.

## 2. Directory Structure
```text
Root/
├── Frontend/
│   ├── External_Web/ (기업 소개 웹사이트)
│   │   ├── Pages/      (라우팅 단위 페이지 컴포넌트)
│   │   ├── Components/ (재사용 가능한 UI 컴포넌트)
│   │   ├── Hooks/      (커스텀 React/Angular 훅)
│   │   ├── Services/   (API 호출 및 비즈니스 로직)
│   │   ├── Interfaces/ (타입스크립트 타입 및 인터페이스 명세)
│   │   └── Utils/      (공통 유틸리티 함수)
│   └── Internal_Web/   (사내 대시보드 웹사이트 - 구조는 External과 동일)
│
└── Backend/
    ├── External_Web/
    │   └── [Domain_Name]/ (NestJS 리소스 모듈, 예: intro, notice)
    │       ├── dto/
    │       │   ├── requestDto.ts
    │       │   └── responseDto.ts
    │       ├── entity/
    │       │   └── entity.ts
    │       ├── [domain].controller.ts
    │       ├── [domain].service.ts
    │       └── [domain].module.ts
    └── Internal_Web/
        └── [Domain_Name]/ (대시보드 API 리소스)