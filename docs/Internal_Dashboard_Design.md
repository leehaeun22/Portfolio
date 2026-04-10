# Design Template: Admin Dashboard 01 (Data Heavy)

> **[AI Agent Instruction]**
> - 에이전트는 프론트엔드 화면(`Internal_Web`)을 구현할 때 반드시 본 문서에 명시된 컴포넌트만 조립하여 사용한다.
> - **절대 금지 사항:** 커스텀 CSS 파일(`.css`, `.scss`) 작성 및 `style={{}}` 인라인 스타일 사용을 엄격히 금지한다. 모든 스타일링은 Tailwind CSS 유틸리티 클래스만 사용한다.

## 1. Global Layout (기본 레이아웃)
모든 사내 대시보드 페이지는 아래의 `AdminLayout` 컴포넌트로 감싸야 한다.
* **Component:** `src/components/layout/AdminLayout.tsx`
* **Structure:**
    * `Sidebar`: 좌측 고정 (너비 `w-64`). 메뉴 네비게이션 포함.
    * `Header`: 상단 고정 (높이 `h-16`). 현재 접속 중인 관리자 정보 및 로그아웃 버튼 포함.
    * `MainContent`: 중앙 영역. 페이지 컴포넌트가 렌더링되는 곳 (`px-6 py-8`).

## 2. Component Mapping (UI 레고 블록)
UI 요소가 필요할 때는 창조하지 말고, 아래 지정된 Shadcn UI 컴포넌트를 Import 하여 사용한다.

| 필요 UI 기능 | 참조 컴포넌트 경로 | Tailwind 제약 조건 (옵션) |
| :--- | :--- | :--- |
| **버튼 (Button)** | `import { Button } from "@/components/ui/button"` | 기본 액션은 `variant="default"`, 취소/삭제는 `variant="destructive"` |
| **입력창 (Input)** | `import { Input } from "@/components/ui/input"` | 폼 요소는 반드시 `w-full` 적용 |
| **데이터 표 (Table)** | `import { DataTable } from "@/components/ui/data-table"` | 데이터 목록 출력 시 반드시 이 래퍼를 사용할 것. 페이징 처리 필수. |
| **카드 (Card)** | `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"` | 통계 수치나 대시보드 위젯을 감쌀 때 사용. `shadow-sm` 기본 적용. |
| **모달/팝업 (Dialog)** | `import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"` | 데이터 등록/수정 시 별도 페이지 이동 없이 모달창 사용을 권장. |
| **상태 뱃지 (Badge)** | `import { Badge } from "@/components/ui/badge"` | 승인/대기/반려 등의 상태값을 표시할 때 사용. |

## 3. Page Assembly Example (페이지 조립 예시)
에이전트는 새로운 페이지 생성 시 아래의 구조를 따른다.
1. `AdminLayout`으로 전체 래핑
2. 상단에 `Card`를 이용해 핵심 요약 통계 배치 (선택)
3. 하단에 `DataTable`을 이용해 본문 데이터 목록 배치
4. 우측 상단에 데이터를 추가할 수 있는 `Button` (클릭 시 `Dialog` 오픈) 배치