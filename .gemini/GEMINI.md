# Gemini (Antigravity) — Extended Directives

> 이 파일은 **Antigravity 전용** 확장 지시 사항이다.
> 범용 규칙은 루트의 `AGENTS.md`에 정의되어 있으며, 이 파일은 그것을 보충한다.

---

## 1. 기본 행동 원칙

1. **`AGENTS.md`를 먼저 읽는다.** — 이 파일보다 상위 우선순위.
2. **`Navigator.md`로 탐색한다.** — 프로젝트 구조·문서 위치를 파악할 때.
3. **이 파일의 지시사항으로 보충한다.** — Antigravity 고유 기능 활용 시.

```
우선순위: AGENTS.md > Navigator.md > GEMINI.md
```

---

## 2. Context Loading Order

매 대화 시작 시, 아래 순서로 컨텍스트를 로드한다.

| Step | File                     | Action                                             |
|:-----|:-------------------------|:---------------------------------------------------|
| 1    | `AGENTS.md`              | 역할, 절대 규칙, Boundaries 확인                    |
| 2    | `Navigator.md`           | 현재 작업에 필요한 문서 경로 파악                    |
| 3    | `docs/Context.md`        | 현재 Phase, Priority, Flags 확인                    |
| 4    | 대상 스펙 문서            | `Navigator.md`에서 식별한 관련 스펙 정독             |

---

## 3. Antigravity 활용 지침

### 3.1 도구 활용

| 상황                     | 활용 도구                                                    |
|:-------------------------|:------------------------------------------------------------|
| 이미지 에셋 필요 시       | `generate_image` 도구로 직접 생성 (placeholder 금지)         |
| 외부 문서 참조 시         | `read_url_content` 또는 `search_web`으로 최신 정보 수집      |
| 브라우저 검증 시          | `browser_subagent`로 실제 렌더링 확인                        |
| 파일 수정 시              | 단일 변경은 `replace_file_content`, 다중 변경은 `multi_replace_file_content` |

### 3.2 코드 생성 원칙

- 설명보다 **실행 가능한 코드**를 우선 제공한다.
- 파일 생성 시 **전체 경로**를 명시한다.
- 변경 사항이 여러 파일에 걸칠 경우, **의존 순서대로** (인터페이스 → 서비스 → 컴포넌트) 작성한다.

### 3.3 작업 완료 보고

매 작업 완료 시 아래 형식으로 요약한다:

```
## 작업 완료 요약
- **변경 파일:** [파일 목록]
- **변경 내용:** [1줄 요약]
- **Context.md 갱신:** [Yes/No]
- **잔여 작업:** [다음 Priority 안내]
```
