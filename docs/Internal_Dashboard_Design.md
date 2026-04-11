# Design Template: Admin Dashboard (Internal_Web)

> **[AI Agent Instruction]**
> - ⚠️ **현재 `FLAG_NO_INTERNAL = true` 상태.** 본 문서는 Phase 3에서 활성화될 예정이며, 현재는 참조 전용이다.
> - 활성화 시, 에이전트는 프론트엔드 화면(`Internal_Web`)을 구현할 때 반드시 본 문서에 명시된 컴포넌트만 조립하여 사용한다.
> - **절대 금지 사항:** 커스텀 CSS 파일(`.css`, `.scss`) 작성 및 `style={{}}` 인라인 스타일 사용을 엄격히 금지한다. 모든 스타일링은 Tailwind CSS 유틸리티 클래스만 사용한다.
> - 모든 데이터 조회 화면은 **서버 사이드 페이징**, **검색**, **필터링**, **정렬** 기능을 기본 내장해야 한다.

---

## 1. Dashboard Design Principles

| Principle            | Description                                                              |
| :------------------- | :----------------------------------------------------------------------- |
| **Data-First**       | 시각적 화려함보다 데이터 가독성과 조작 효율을 최우선                      |
| **Consistency**      | 모든 페이지가 동일한 레이아웃, 컴포넌트, 인터랙션 패턴을 공유            |
| **Progressive Disclosure** | 핵심 정보를 먼저 노출, 상세 정보는 클릭/호버로 점진적 공개         |
| **Responsive**       | 최소 `lg:`(1024px) 이상에서 최적화, 태블릿/모바일은 기본 대응            |
| **Accessibility**    | 키보드 내비게이션 완전 지원, 색상 대비 WCAG AA 준수                      |

---

## 2. Global Layout (기본 레이아웃)

모든 사내 대시보드 페이지는 아래의 `AdminLayout` 컴포넌트로 감싸야 한다.

### 2.1 Layout Architecture
```text
┌──────────┬───────────────────────────────────────────────┐
│          │  Header (h-16, 검색창, 알림, 프로필 드롭다운)    │
│          ├───────────────────────────────────────────────┤
│ Sidebar  │                                               │
│ (w-64)   │  Breadcrumb (현재 위치 경로)                    │
│          │                                               │
│ ・메뉴    │  Page Title + Action Buttons                   │
│ ・서브메뉴 │                                               │
│ ・로고    │  ┌─────────────────────────────────────────┐   │
│          │  │  Main Content Area                       │   │
│ ─────── │  │  (px-6 py-8)                             │   │
│ 축소 토글 │  │                                           │   │
│          │  │  [Summary Cards]                         │   │
│          │  │                                           │   │
│          │  │  [Data Table / Charts / Forms]           │   │
│          │  │                                           │   │
│          │  └─────────────────────────────────────────┘   │
└──────────┴───────────────────────────────────────────────┘
```

### 2.2 Sidebar 명세
| Feature                | Specification                                                    |
| :--------------------- | :--------------------------------------------------------------- |
| **너비**               | 펼침: `w-64`, 축소: `w-16` (아이콘만 표시)                       |
| **토글**               | 하단 버튼으로 펼침/축소 전환, `localStorage`에 상태 저장          |
| **메뉴 구조**          | 최대 2-depth (그룹 제목 + 하위 메뉴)                              |
| **Active 상태**        | 현재 페이지 메뉴 `bg-primary-50 text-primary-700 font-semibold`  |
| **아이콘**             | 모든 메뉴 항목에 `lucide-react` 아이콘 필수                      |
| **반응형**             | `lg:` 이하에서는 기본 숨김, 햄버거 버튼으로 슬라이드 오픈        |

### 2.3 Header 명세
| Feature                | Specification                                                    |
| :--------------------- | :--------------------------------------------------------------- |
| **높이**               | `h-16`, `border-b border-neutral-200`                            |
| **좌측**               | 글로벌 검색 입력창 (`Cmd+K` 단축키 지원)                         |
| **우측**               | 알림 벨 아이콘(뱃지), 사용자 아바타 + 이름 + 드롭다운 메뉴       |
| **드롭다운 메뉴**      | 프로필, 설정, 로그아웃                                           |

---

## 3. Component Mapping (UI 레고 블록)

UI 요소가 필요할 때는 임의로 창조하지 말고, 아래 지정된 Shadcn UI 컴포넌트를 Import하여 사용한다.

### 3.1 Core UI Components

| 필요 UI 기능         | 컴포넌트 Import                                                          | 사용 규칙                                               |
| :------------------- | :----------------------------------------------------------------------- | :------------------------------------------------------- |
| **버튼 (Button)**    | `import { Button } from "@/components/ui/button"`                        | Default: `variant="default"`, 삭제: `variant="destructive"`, 보조: `variant="outline"`, 링크형: `variant="ghost"` |
| **입력창 (Input)**   | `import { Input } from "@/components/ui/input"`                          | 폼 내부에서는 `w-full`, Label 필수                       |
| **셀렉트 (Select)**  | `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"` | 드롭다운 선택 필드, 필터링 등 |
| **텍스트에어리어**   | `import { Textarea } from "@/components/ui/textarea"`                    | 장문 입력 (문의 내용, 비고 등)                           |
| **데이터 표 (Table)**| `import { DataTable } from "@/components/ui/data-table"`                 | 데이터 목록 필수, 서버 사이드 페이징·정렬·검색 내장      |
| **카드 (Card)**      | `import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"` | 통계 위젯, 정보 그룹핑                   |
| **모달 (Dialog)**    | `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"` | 등록/수정 시 별도 페이지 이동 없이 모달 사용 |
| **뱃지 (Badge)**     | `import { Badge } from "@/components/ui/badge"`                          | 상태값 표시: `PENDING=yellow`, `APPROVED=green`, `REJECTED=red` |
| **탭 (Tabs)**        | `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"` | 같은 페이지 내 뷰 전환                  |
| **토스트 (Toast)**   | `import { toast } from "sonner"`                                         | 성공/에러 알림. 우측 상단 고정                           |
| **달력 (Calendar)**  | `import { Calendar } from "@/components/ui/calendar"`                    | DatePicker 내부에서 사용                                 |
| **차트 (Chart)**     | `import { ... } from "recharts"`                                         | 꺾은선, 막대, 원형, 영역 차트                            |
| **스켈레톤**         | `import { Skeleton } from "@/components/ui/skeleton"`                    | 데이터 로딩 중 플레이스홀더                              |
| **알럿 다이얼로그**  | `import { AlertDialog, ... } from "@/components/ui/alert-dialog"`        | 삭제 등 위험 작업 전 확인용                              |
| **폼 (Form)**        | `import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"` | `react-hook-form` + `zod` 기반 |

---

## 4. Dashboard Widget Patterns (위젯 패턴)

### 4.1 Summary Stat Card
```text
┌────────────────────────┐
│ 📊 총 매출              │  ← CardTitle (body-sm, text-muted)
│ ₩ 1,234,567,890        │  ← 수치 (heading-2, font-mono, font-bold)
│ ▲ 12.5% vs 전월        │  ← 증감 표시 (text-green-600 or text-red-600)
└────────────────────────┘
```
- 3~4개 수평 배치 (`grid-cols-2 lg:grid-cols-4`)
- 선택적으로 미니 차트(Sparkline) 내장

### 4.2 Data Table Page Pattern
```text
┌─────────────────────────────────────────────────────────┐
│  [Search Input]  [Filter: 상태 ▼]  [Filter: 날짜 ▼]    │  ← 필터 바
│  [+ 신규 등록]                              [Excel 내보내기] │  ← 액션 바
├─────────────────────────────────────────────────────────┤
│  □ │ 이름      │ 이메일         │ 상태    │ 생성일     │  ← 컬럼 헤더 (정렬 가능)
├─────────────────────────────────────────────────────────┤
│  □ │ 홍길동    │ hong@...       │ 🟢 활성  │ 2026-01-01│  ← 데이터 행
│  □ │ 김영희    │ kim@...        │ 🟡 대기  │ 2026-01-02│
│  ...                                                     │
├─────────────────────────────────────────────────────────┤
│  선택된 항목: 2개  [일괄 삭제]    │  ◀ 1 2 3 ... 10 ▶   │  ← 일괄 액션 + 페이징
└─────────────────────────────────────────────────────────┘
```

### 4.3 Form Dialog Pattern
```text
┌─────────── Dialog ───────────┐
│  ✕                           │
│  [제목: 신규 등록]            │
│  ─────────────────────       │
│  이름 *     [___________]    │
│  이메일 *   [___________]    │
│  전화번호   [___________]    │
│  역할       [▼ 선택하세요]   │
│  비고       [____________]   │
│             [____________]   │
│  ─────────────────────       │
│  [취소]            [저장]    │
└──────────────────────────────┘
```

---

## 5. Page Assembly Rules (페이지 조립 규칙)

에이전트는 새로운 대시보드 페이지 생성 시 아래의 구조를 **순서대로** 따른다:

### 5.1 Page Template
```typescript
// app/(dashboard)/[domain]/page.tsx

export default function DomainPage() {
  return (
    <AdminLayout>
      {/* 1. Breadcrumb */}
      <Breadcrumb items={[{ label: '홈', href: '/' }, { label: '도메인명' }]} />

      {/* 2. Page Header: 제목 + 주요 액션 버튼 */}
      <div className="flex items-center justify-between">
        <h1 className="text-heading-2 font-bold">페이지 제목</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> 신규 등록</Button>
          </DialogTrigger>
          <DialogContent>{/* Form */}</DialogContent>
        </Dialog>
      </div>

      {/* 3. Summary Cards (선택) */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="지표명" value="1,234" change={12.5} />
        {/* ... */}
      </div>

      {/* 4. Data Table (필수) */}
      <div className="mt-8">
        <DataTable
          columns={columns}
          data={data}
          searchable
          filterable
          sortable
          pagination={{ pageSize: 20 }}
        />
      </div>
    </AdminLayout>
  );
}
```

### 5.2 CRUD 워크플로우

| Action    | UI Pattern                              | API Method | 성공 후 동작                   |
| :-------- | :-------------------------------------- | :--------- | :----------------------------- |
| **Create**| "+" 버튼 → Dialog (Form) → 저장         | `POST`     | 토스트 알림 + 테이블 새로고침  |
| **Read**  | DataTable 자동 페이징 + 검색/필터        | `GET`      | -                              |
| **Update**| 행 클릭 또는 편집 아이콘 → Dialog (Form) | `PATCH`    | 토스트 알림 + 해당 행 갱신     |
| **Delete**| 삭제 아이콘 → AlertDialog 확인 → 삭제    | `DELETE`   | 토스트 알림 + 해당 행 제거     |
| **Bulk**  | 체크박스 다중 선택 → 일괄 액션 버튼      | `POST`     | 토스트 알림 + 테이블 새로고침  |

---

## 6. Chart & Visualization Guidelines

| Chart Type     | Use Case                                     | Library Component             |
| :------------- | :------------------------------------------- | :---------------------------- |
| 꺾은선 (Line)  | 시간 추이 데이터 (매출, 방문자 등)            | `<LineChart />`               |
| 막대 (Bar)     | 카테고리별 비교 (상위 5개 등)                 | `<BarChart />`                |
| 원형 (Pie)     | 비율/구성 분석 (최대 6개 항목)                | `<PieChart />`                |
| 영역 (Area)    | 누적 트렌드 (매출 구성 변화 등)               | `<AreaChart />`               |
| 스파크라인     | Summary Card 내 미니 트렌드                   | `<SparklineChart />`          |
| 히트맵         | 시간대별 활동 패턴                            | 커스텀 Grid (Tailwind 활용)   |

**차트 공통 규칙:**
- 컬러 팔레트는 `primary` 계열 + `neutral` 계열만 사용 (최대 6색)
- 범례(Legend)는 차트 하단에 배치
- 툴팁(Tooltip) 기본 활성화
- 반응형 `ResponsiveContainer` 래핑 필수
- 로딩 상태 시 `Skeleton` 표시

---

## 7. Authentication & Authorization (인증/인가)

### 7.1 로그인 페이지
| Feature              | Specification                                                     |
| :------------------- | :---------------------------------------------------------------- |
| 경로                 | `/login`                                                          |
| 레이아웃             | 좌측 브랜딩 영역 (로고 + 일러스트) + 우측 로그인 폼              |
| 필드                 | 이메일, 비밀번호, "로그인 유지" 체크박스                          |
| 인증 방식            | JWT (Access Token + Refresh Token)                                |
| 에러 처리            | 인라인 에러 메시지 + 로그인 실패 횟수 제한 (5회 → 잠금)           |

### 7.2 Role-Based Access

| Role          | Dashboard 접근 | 데이터 조회 | 데이터 수정 | 사용자 관리 |
| :------------ | :------------- | :---------- | :---------- | :---------- |
| `SUPER_ADMIN` | ✅             | ✅          | ✅          | ✅          |
| `ADMIN`       | ✅             | ✅          | ✅          | ❌          |
| `EDITOR`      | ✅             | ✅          | ✅ (본인)   | ❌          |
| `VIEWER`      | ✅             | ✅          | ❌          | ❌          |

---

## 8. Error & Empty States

| State              | UI                                                               |
| :----------------- | :--------------------------------------------------------------- |
| **데이터 없음**    | 빈 상태 일러스트 + "아직 데이터가 없습니다" + CTA 버튼            |
| **검색 결과 없음** | "검색 결과가 없습니다. 다른 키워드를 시도해보세요."               |
| **로딩 중**        | `Skeleton` 컴포넌트 (실제 레이아웃과 동일한 형태)                |
| **에러 발생**      | 에러 메시지 + "다시 시도" 버튼                                   |
| **권한 없음**      | "접근 권한이 없습니다. 관리자에게 문의하세요." + 돌아가기 버튼    |