# Design Template: Corporate Website (External_Web)

> **[AI Agent Instruction]**
> - 에이전트는 `@PRD.md`에 명시된 고객의 **업종**, **브랜드 무드**, **핵심 비즈니스 목표**를 종합 분석하여 아래의 디자인 시스템과 블록을 선택·조립한다.
> - 절대 인라인 스타일(`style={{}}`)이나 커스텀 CSS를 새로 작성하지 말 것. 모든 스타일링은 **Tailwind CSS**를 따른다.
> - 페이지 렌더링 시, 반드시 **[6. Page Assembly Logic]**의 조합 공식을 준수하여 컴포넌트를 배치한다.
> - 모든 컴포넌트는 **Framer Motion** 기반의 스크롤 트리거 애니메이션을 포함해야 한다.
> - 모든 페이지에 **SEO 메타 태그**, **OG 태그**, **구조화 데이터(JSON-LD)**를 필수 적용한다.

---

## 1. Design System Foundation (디자인 시스템 기반)

### 1.1 Theme Configuration

에이전트는 PRD 분석 후 `tailwind.config.ts`의 아래 디자인 토큰을 **가장 먼저** 설정한다.

```typescript
// tailwind.config.ts — 에이전트가 PRD 분석 결과에 따라 자동으로 채우는 영역
const designTokens = {
  colors: {
    primary: {
      50:  '#f0f9ff',  // Lightest
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',  // ★ Base — 업종 분석 후 교체
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',  // Darkest
    },
    neutral: {
      // Tailwind 기본 Zinc/Slate 팔레트 중 선택
    },
    accent: '#...', // 보조 포인트 컬러 (CTA 버튼, 배지 등)
  },
  borderRadius: {
    // 업종별 라운드 전략
    // 보수적/금융권 = '0rem'
    // 일반 B2B    = '0.5rem'
    // 트렌디/스타트업 = '1rem'
    // 라이프스타일/뷰티 = '1.5rem (full rounded)'
  },
  fontFamily: {
    heading: ['Pretendard', 'Inter', 'sans-serif'],  // 제목용
    body: ['Pretendard', 'Inter', 'sans-serif'],      // 본문용
    mono: ['JetBrains Mono', 'monospace'],             // 코드/숫자 강조용
  },
  fontSize: {
    // 반응형 타이포그래피 스케일 (clamp 사용)
    'display-1': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', fontWeight: '800' }],
    'display-2': ['clamp(2rem, 4vw, 3.5rem)',   { lineHeight: '1.15', fontWeight: '700' }],
    'heading-1': ['clamp(1.75rem, 3vw, 2.5rem)',{ lineHeight: '1.2', fontWeight: '700' }],
    'heading-2': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.25', fontWeight: '600' }],
    'heading-3': ['clamp(1.25rem, 2vw, 1.5rem)',{ lineHeight: '1.3', fontWeight: '600' }],
    'body-lg':   ['1.125rem', { lineHeight: '1.75' }],
    'body':      ['1rem',     { lineHeight: '1.75' }],
    'body-sm':   ['0.875rem', { lineHeight: '1.6' }],
    'caption':   ['0.75rem',  { lineHeight: '1.5' }],
  },
};
```

### 1.2 업종별 테마 프리셋

| 업종 카테고리          | Primary Color     | Radius   | Font Mood       | 추천 Formula |
| :-------------------- | :---------------- | :------- | :-------------- | :----------- |
| IT / SaaS / B2B 솔루션 | Blue (`#0ea5e9`)  | `0.75rem`| 깔끔, 전문적    | Formula 1    |
| 핀테크 / 금융          | Navy (`#1e3a5f`)  | `0rem`   | 보수적, 신뢰감  | Formula 3    |
| 뷰티 / 패션 / F&B     | Rose (`#f43f5e`)  | `1.5rem` | 감성적, 트렌디  | Formula 2    |
| 친환경 / 농업 / 헬스   | Green (`#22c55e`) | `1rem`   | 자연적, 따뜻한  | Formula 2    |
| 교육 / 컨설팅          | Teal (`#14b8a6`)  | `0.5rem` | 균형, 신뢰      | Formula 3    |
| 럭셔리 / 프리미엄      | Black/Gold (`#0a0a0a`) | `0rem` | 미니멀, 고급 | Formula 4    |
| 전문직 (법무/회계)     | Slate (`#475569`) | `0rem`   | 절제, 권위      | Formula 3    |
| 스타트업 / 크리에이티브 | Violet (`#8b5cf6`)| `1rem`   | 역동적, 혁신    | Formula 1    |

### 1.3 Dark / Light Mode

- 모든 디자인 토큰은 CSS Custom Properties(`var(--color-*)`)로 관리하여 **Dark Mode 자동 전환**을 지원한다.
- Tailwind `dark:` 접두사를 활용하며, 시스템 설정 또는 사용자 토글로 전환 가능.
- Dark Mode 배경: `#0a0a0a` (순수 검정 금지 → `#0a0a0a` ~ `#171717` 사이 사용)

---

## 2. Animation System (애니메이션 체계)

### 2.1 Core Animation Presets (Framer Motion)

```typescript
// utils/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};
```

### 2.2 애니메이션 적용 규칙

| 요소                   | 애니메이션 프리셋   | 적용 조건                                      |
| :--------------------- | :------------------ | :--------------------------------------------- |
| Hero 텍스트/버튼       | `fadeInUp`          | 페이지 로드 시 자동 실행                        |
| Section 제목           | `fadeInUp`          | 뷰포트 진입 시 트리거                           |
| Feature 카드           | `staggerContainer` + `staggerItem` | 카드 그룹이 뷰포트에 진입 시 순차 등장 |
| 이미지                 | `scaleIn`           | 뷰포트 진입 시                                  |
| 통계 숫자              | 카운팅 애니메이션    | 뷰포트 진입 시 0 → 목표값 카운트업              |
| CTA 버튼               | Hover scale(1.05)   | 마우스 호버 시                                  |
| Navigation 링크        | 밑줄 확장 애니메이션 | 마우스 호버 시                                  |
| 로고 스크롤            | CSS `@keyframes`    | 무한 반복 좌→우 또는 우→좌                      |

### 2.3 퍼포먼스 가이드라인
- `will-change` 속성은 애니메이션 직전에만 적용, 완료 후 제거
- `prefers-reduced-motion` 미디어 쿼리 대응: 접근성을 위해 애니메이션 비활성화 옵션 제공
- 복잡한 애니메이션은 `transform`과 `opacity`만 사용 (리플로우 방지)

---

## 3. Layout System (레이아웃 체계)

### 3.1 Global Layout Structure
```text
┌──────────────────────────────────────────────────────┐
│  Header (sticky, backdrop-blur, transparent → solid) │
├──────────────────────────────────────────────────────┤
│                                                      │
│  [Hero Section]                                      │
│                                                      │
│  [Section Block 1]                                   │
│                                                      │
│  [Section Block 2]                                   │
│                                                      │
│  [Section Block N...]                                │
│                                                      │
│  [CTA / Contact Section]                             │
│                                                      │
├──────────────────────────────────────────────────────┤
│  Footer (회사 정보, SNS 링크, 법적 고지)              │
└──────────────────────────────────────────────────────┘
```

### 3.2 Responsive Breakpoints

| Breakpoint | Tailwind Prefix | Min Width | Target            | 컨테이너 Max Width  |
| :--------- | :-------------- | :-------- | :---------------- | :------------------ |
| Mobile     | (default)       | 0px       | 스마트폰          | `100%`              |
| `sm`       | `sm:`           | 640px     | 대형 스마트폰     | `640px`             |
| `md`       | `md:`           | 768px     | 태블릿            | `768px`             |
| `lg`       | `lg:`           | 1024px    | 소형 데스크탑     | `1024px`            |
| `xl`       | `xl:`           | 1280px    | 데스크탑          | `1280px`            |
| `2xl`      | `2xl:`          | 1536px    | 대형 데스크탑     | `1400px`            |

### 3.3 Spacing System

- 세션 간 수직 간격: `py-20 md:py-28 lg:py-32`
- 컨테이너 수평 패딩: `px-4 sm:px-6 lg:px-8`
- 컴포넌트 간 간격: Tailwind의 `gap-*` 유틸리티 사용 (margin보다 gap 우선)

### 3.4 Header 컴포넌트 명세

| Feature                 | Description                                                   |
| :---------------------- | :------------------------------------------------------------ |
| 포지션                  | `fixed top-0`, 전체 너비, `z-50`                              |
| 배경                    | 스크롤 전: `transparent`, 스크롤 후: `bg-white/80 backdrop-blur-xl` |
| 로고                    | 좌측 배치, 클릭 시 홈으로 이동                                 |
| 네비게이션              | 중앙 또는 우측 배치, 호버 시 밑줄 애니메이션                   |
| CTA 버튼                | 우측 끝, Primary 컬러 배경, 호버 시 밝기 변화                  |
| 모바일 대응             | `md:` 이하에서 햄버거 메뉴 → 슬라이드 드로어                  |
| Accessibility           | `nav` 시맨틱 태그, `aria-expanded`, 키보드 네비게이션          |

### 3.5 Footer 컴포넌트 명세

| Section              | Content                                                          |
| :------------------- | :--------------------------------------------------------------- |
| 회사 정보 영역       | 로고, 회사 소개 한 줄, 주소, 대표 전화, 이메일                   |
| 네비게이션 링크      | 주요 페이지 바로가기 (서비스, 회사 소개, 문의 등)                 |
| SNS 링크             | 아이콘 형태 (LinkedIn, Instagram, YouTube 등 업종 맞춤)          |
| 뉴스레터 구독        | 이메일 입력 + 구독 버튼 (선택적)                                 |
| 법적 고지            | © 저작권, 개인정보처리방침, 이용약관 링크                        |
| 디자인               | `bg-neutral-900 text-white` (Dark 고정), 섹션 구분선              |

---

## 4. Section Block Library (섹션 블록 라이브러리)

> 에이전트는 각 페이지를 구성할 때 아래에 정의된 컴포넌트만 불러와서 조립한다.
> 새로운 UI 레이아웃을 임의로 창조하지 마라. 새 블록이 필요하면 본 문서에 먼저 정의한다.

### 4.1 Hero Blocks (최상단 소개)

#### `HeroTypeA` — 감성 브랜딩형
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/hero/HeroTypeA.tsx`                           |
| **레이아웃**   | 중앙 정렬 + 풀스크린 배경 이미지/비디오                          |
| **적합 업종**  | 뷰티, 패션, F&B, 라이프스타일, 호텔/리조트                       |
| **필수 요소**  | 배경 이미지, 오버레이(50% 불투명도), 메인 타이틀(display-1), 서브 타이틀, CTA 버튼 |
| **애니메이션** | 텍스트 `fadeInUp` (stagger 0.2s), 배경 미세 줌인 효과(scale 1→1.05, 20s) |
| **반응형**     | Mobile: 풀스크린 유지, 텍스트 크기 축소                          |

#### `HeroTypeB` — IT 솔루션형
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/hero/HeroTypeB.tsx`                           |
| **레이아웃**   | 좌 50% 텍스트 + 우 50% 3D 일러스트/대시보드 목업/Lottie 애니메이션 |
| **적합 업종**  | IT, SaaS, B2B 솔루션, 핀테크, 스타트업                           |
| **필수 요소**  | 뱃지 태그("🚀 New Feature"), H1 타이틀, 설명 문단, CTA 버튼 2개(Primary + Ghost), 우측 비주얼 |
| **애니메이션** | 좌측 `fadeInLeft`, 우측 `fadeInRight` (동시, delay 0.2s)         |
| **반응형**     | Mobile: 세로 스택 (텍스트 위, 이미지 아래), 이미지 크기 축소     |

#### `HeroTypeC` — 미니멀 전문직형
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/hero/HeroTypeC.tsx`                           |
| **레이아웃**   | 풍부한 여백 + 대형 타이포그래피 + 미니멀 라인 장식               |
| **적합 업종**  | 법무, 회계, 컨설팅, 에이전시, 건축                               |
| **필수 요소**  | H1 타이틀(display-1, 굵은 서체), 한 줄 서브 카피, 하단으로 스크롤 유도 아이콘 |
| **애니메이션** | 글자 한 줄씩 `fadeInUp` (stagger 0.15s), 스크롤 유도 아이콘 bounce |
| **반응형**     | Mobile: 타이틀 크기 축소, 여백 축소                              |

#### `HeroTypeD` — 비디오 배경형 (신규)
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/hero/HeroTypeD.tsx`                           |
| **레이아웃**   | 풀스크린 루프 비디오 배경 + 중앙 콘텐츠 오버레이                 |
| **적합 업종**  | 제조업, 물류, 건설, 에너지, 테크 기업                            |
| **필수 요소**  | 배경 `<video>` (autoplay, muted, loop), 그라데이션 오버레이, 타이틀, CTA |
| **애니메이션** | 콘텐츠 `fadeInUp`, 비디오 자연 재생                              |
| **반응형**     | Mobile: 비디오 유지 (대역폭 고려 시 정적 이미지 대체)            |

---

### 4.2 Feature / Service Blocks (서비스 소개)

#### `FeatureGrid` — 그리드 카드형
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/feature/FeatureGrid.tsx`                      |
| **레이아웃**   | 3~4열 그리드 카드 나열 (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) |
| **적합 상황**  | 핵심 메뉴, 주요 특징이 3~6개인 경우                              |
| **카드 구성**  | 아이콘(Lucide, 48px), 제목(heading-3), 설명 문단(body-sm, 2~3줄), 선택적 링크 |
| **애니메이션** | `staggerContainer` + `staggerItem` (카드 순차 등장)              |
| **호버 효과**  | `translateY(-4px)`, `shadow-lg`, 아이콘 컬러 `primary-500` 전환  |

#### `FeatureZigzag` — 교차 배치형
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/feature/FeatureZigzag.tsx`                    |
| **레이아웃**   | 텍스트-이미지 교차 배치 (홀수: 좌텍스트+우이미지, 짝수: 반전)    |
| **적합 상황**  | 서비스 작동 흐름, 단계별 설명이 필요한 경우 (3~5개 섹션)         |
| **각 행 구성** | 뱃지("Step 1"), 제목, 설명 문단, 체크리스트(선택적), 관련 이미지 |
| **애니메이션** | 홀수 행 `fadeInLeft`, 짝수 행 `fadeInRight`                      |

#### `FeatureList` — 리스트형
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/feature/FeatureList.tsx`                      |
| **레이아웃**   | 좌측 아이콘/번호 + 우측 텍스트 리스트 (수직 나열)                |
| **적합 상황**  | 기능 요약, 장점 나열, FAQ 대체                                   |
| **각 행 구성** | 아이콘 또는 순번, 제목(heading-3), 짧은 설명(1~2줄)              |
| **애니메이션** | `staggerItem` (0.1s 간격)                                       |

#### `FeatureShowcase` — 대형 비주얼형 (신규)
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/feature/FeatureShowcase.tsx`                  |
| **레이아웃**   | 전체 너비 이미지/스크린샷 + 하단 또는 오버레이 텍스트            |
| **적합 상황**  | 제품 UI 데모, 대시보드 스크린샷 강조, 포트폴리오                 |
| **구성**       | 대형 이미지(rounded-xl, shadow-2xl), 제목, 설명, 선택적 CTA     |
| **애니메이션** | `scaleIn` + 스크롤에 따른 parallax 미세 효과                     |

---

### 4.3 Social Proof Blocks (신뢰도 / 증명)

#### `StatsRow` — 수치 강조형
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/social-proof/StatsRow.tsx`                    |
| **레이아웃**   | 3~4열 수평 나열 (`flex` or `grid`), 선택적 배경 그라데이션       |
| **각 항목**    | 대형 숫자(display-2, `font-mono`), 접미사("+", "%", "건" 등), 라벨(body-sm) |
| **애니메이션** | 뷰포트 진입 시 **숫자 카운트업** (0 → 목표값, duration 2s, `useCountUp` 훅 사용) |
| **반응형**     | Mobile: 2열 그리드 또는 세로 스택                                |

#### `ClientLogos` — 고객사 로고 롤링
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/social-proof/ClientLogos.tsx`                 |
| **레이아웃**   | 무한 수평 스크롤 롤링 (CSS `@keyframes` 사용, JS 불필요)        |
| **필수 사항**  | 로고 이미지 8~16개, 그레이 스케일 처리 (호버 시 원본 컬러 복원)  |
| **반응형**     | 모든 화면 크기에서 동일 작동                                     |

#### `TestimonialCarousel` — 고객 후기 슬라이더
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/social-proof/TestimonialCarousel.tsx`         |
| **레이아웃**   | 카드형 수평 슬라이더 (3장 동시 노출, 1장씩 자동 전환)            |
| **카드 구성**  | 인용문(이탤릭), 고객명, 직책/회사, 프로필 이미지(원형 아바타), 별점(선택적) |
| **컨트롤**     | 좌/우 화살표 버튼 + 하단 도트 네비게이션                         |
| **자동 전환**  | 5초 간격 자동 슬라이드 (호버 시 일시 정지)                       |
| **반응형**     | Mobile: 1장 노출, 스와이프 제스처 지원                           |

#### `AwardsGrid` — 수상/인증 뱃지 (신규)
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/social-proof/AwardsGrid.tsx`                  |
| **레이아웃**   | 4~6열 그리드, 각 셀에 수상 로고 + 수상명 + 연도                  |
| **적합 상황**  | 인증 마크 강조 (ISO, 특허, 수상 이력 등)                         |
| **애니메이션** | `staggerItem`                                                    |

---

### 4.4 Action Blocks (전환 / 문의)

#### `CTA_Simple` — 심플 전환형
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/action/CTA_Simple.tsx`                        |
| **레이아웃**   | 중앙 정렬, 배경 그라데이션(primary-500 → primary-700) 또는 단색  |
| **구성**       | 제목(heading-1, `text-white`), 부제(body-lg), 대형 CTA 버튼 1~2개 |
| **애니메이션** | `fadeInUp`, 버튼 `hover:scale-105`                               |

#### `CTA_WithImage` — 이미지 동반 전환형 (신규)
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/action/CTA_WithImage.tsx`                     |
| **레이아웃**   | 좌측 텍스트 + 우측 이미지 (또는 반전)                            |
| **구성**       | 제목, 설명, CTA 버튼, 보조 이미지/일러스트                       |
| **적합 상황**  | 데모 요청, 무료 체험, 앱 다운로드 유도                           |

#### `ContactForm` — 문의 폼
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/action/ContactForm.tsx`                       |
| **레이아웃**   | 좌측 연락처 정보 + 우측 입력 폼 (2열), 또는 단일 열 중앙 배치    |
| **필드 구성**  | 이름(필수), 이메일(필수), 전화번호(선택), 회사명(선택), 문의 유형(드롭다운, 선택), 문의 내용(필수, textarea) |
| **검증**       | `React Hook Form` + `Zod` 스키마 검증, 실시간 에러 메시지 노출   |
| **제출 후**    | 로딩 스피너 → 성공 토스트 메시지 → 폼 초기화                     |
| **Backend**    | `POST /api/external/contact` → DB 저장 + 이메일 알림 발송        |
| **스팸 방지**  | Google reCAPTCHA v3 또는 Honeypot 필드 적용                      |

#### `NewsletterBanner` — 뉴스레터 구독 (신규)
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/action/NewsletterBanner.tsx`                  |
| **레이아웃**   | 인라인 배너 (이메일 입력 + 구독 버튼)                            |
| **적합 상황**  | 콘텐츠 마케팅, 리드 수집                                         |

---

### 4.5 Content Blocks (콘텐츠 섹션 - 신규 카테고리)

#### `TeamGrid` — 팀 소개형
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/content/TeamGrid.tsx`                         |
| **레이아웃**   | 3~4열 그리드, 각 카드에 프로필 사진 + 이름 + 직책 + SNS 링크    |
| **적합 페이지**| About 페이지                                                     |
| **호버 효과**  | 이미지 살짝 확대, 오버레이에 SNS 아이콘 노출                    |

#### `Timeline` — 연혁 타임라인형
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/content/Timeline.tsx`                         |
| **레이아웃**   | 중앙 수직선 + 좌/우 교차 이벤트 카드                             |
| **적합 페이지**| About 페이지 (회사 연혁)                                         |
| **애니메이션** | 스크롤 진행에 따라 수직선 채워지며 카드 순차 등장                 |
| **반응형**     | Mobile: 좌측 정렬 단일 열                                        |

#### `FAQ_Accordion` — FAQ 아코디언형
| Attribute      | Specification                                                    |
| :------------- | :--------------------------------------------------------------- |
| **경로**       | `components/blocks/content/FAQ_Accordion.tsx`                    |
| **레이아웃**   | 질문 클릭 → 답변 확장 (아코디언), 한 번에 하나만 열림            |
| **적합 페이지**| 서비스 페이지 하단, 별도 FAQ 페이지                              |
| **Accessibility** | `aria-expanded`, `aria-controls` 적용                          |

---

## 5. Image & Asset Constraint

### 5.1 이미지 소스 규칙
| Priority | Source                                | 사용 조건                                       |
| :------- | :------------------------------------ | :---------------------------------------------- |
| 1순위    | 고객 제공 이미지                      | 고객이 직접 제공한 브랜드 자산                   |
| 2순위    | AI 생성 이미지 (`generate_image` 도구) | 고객 자산이 없을 때, 업종에 맞는 이미지 생성     |
| 3순위    | Unsplash API                          | `https://images.unsplash.com/photo-[id]?w=1600&q=80` 형식 |

### 5.2 이미지 최적화 규칙
- **형식:** WebP 우선, `<picture>` 태그로 Fallback 지원
- **Next.js Image:** 반드시 `next/image` 컴포넌트 사용 (`width`, `height`, `alt` 필수)
- **Lazy Loading:** 히어로 이미지는 `priority`, 나머지는 기본 lazy
- **사이즈:** 히어로 배경 ≤ 500KB, 카드 이미지 ≤ 200KB, 로고 ≤ 50KB

### 5.3 아이콘 규칙
- **라이브러리:** `lucide-react` 통일
- **크기 기준:** UI 아이콘 = `20px`, 카드 아이콘 = `40~48px`, 장식용 = `64px`
- **컬러:** 기본 `currentColor`, 강조 시 `text-primary-500`

---

## 6. Page Assembly Logic (블록 조합 공식)

> 에이전트는 `@PRD.md`의 **업종**과 **핵심 비즈니스 목표**를 분석하여
> 아래 Formula 중 하나를 선택하고, 메인 페이지(`app/(marketing)/page.tsx`)를 자동 조립한다.

### Formula 1: IT / SaaS / B2B 솔루션형 — 논리적 설득 구조
```text
HeroTypeB
  → ClientLogos
  → FeatureZigzag (3~4 rows)
  → FeatureGrid (3~4 cards)
  → StatsRow
  → TestimonialCarousel
  → CTA_Simple
```
**설득 흐름:** 솔루션 소개 → 신뢰도(고객사) → 기능 상세 → 수치 증명 → 후기 → 전환

### Formula 2: 뷰티 / F&B / 라이프스타일형 — 시각적·감성적 구조
```text
HeroTypeA (풀스크린 비주얼)
  → StatsRow
  → FeatureGrid (3 cards, 감성적 카피)
  → FeatureShowcase (제품 대형 이미지)
  → TestimonialCarousel
  → ContactForm
```
**설득 흐름:** 시각적 임팩트 → 수치 신뢰 → 핵심 특장점 → 제품 비주얼 → 후기 → 문의

### Formula 3: 전문직 / 컨설팅 / 에이전시형 — 신뢰감 부여 구조
```text
HeroTypeC (미니멀 타이포)
  → FeatureList (전문 서비스 목록)
  → StatsRow
  → Timeline (회사 연혁 / 프로젝트 이력)
  → AwardsGrid (인증/수상)
  → ContactForm
```
**설득 흐름:** 권위적 첫인상 → 전문성 어필 → 수치 증명 → 역사/실적 → 인증 → 상담 유도

### Formula 4: 럭셔리 / 프리미엄 브랜드형 — 미니멀 프레스티지 구조 (신규)
```text
HeroTypeA (영상 or 고해상도 이미지, 어두운 톤)
  → FeatureShowcase (풀 블리드 이미지 × 3)
  → StatsRow (미니멀, 컬러 억제)
  → CTA_Simple (여백 극대화)
```
**설득 흐름:** 몰입감 있는 비주얼 → 제품 미학 강조 → 절제된 신뢰 수치 → 우아한 전환

### Formula 5: 제조업 / 산업재 / 인프라형 — 실증 기반 구조 (신규)
```text
HeroTypeD (공정/인프라 영상 배경)
  → ClientLogos
  → FeatureZigzag (기술력/공정 단계)
  → StatsRow (생산량, 글로벌 거점 수 등)
  → AwardsGrid (ISO, 인증, 특허)
  → ContactForm
```
**설득 흐름:** 현장감 있는 영상 → 거래처 신뢰 → 기술력/공정 → 수치 증명 → 인증 → 문의

---

## 7. Multi-Page Structure (다중 페이지 구성)

기업 웹사이트는 메인(랜딩) 페이지 외에 아래의 서브 페이지가 필요할 수 있다.
에이전트는 PRD를 분석하여 필요한 페이지만 생성한다.

| Page               | Route Path     | 필수/선택 | 주요 블록 조합                                           |
| :----------------- | :------------- | :-------- | :------------------------------------------------------- |
| **메인 (랜딩)**    | `/`            | 필수      | Formula 1~5 중 택 1                                      |
| **회사 소개**      | `/about`       | 선택      | `HeroTypeC` + `Timeline` + `TeamGrid` + `AwardsGrid`    |
| **서비스/제품**    | `/services`    | 선택      | `FeatureZigzag` + `FeatureShowcase` + `CTA_Simple`       |
| **포트폴리오**     | `/portfolio`   | 선택      | 이미지 갤러리 그리드 + 필터 (카테고리별)                  |
| **문의하기**       | `/contact`     | 선택      | `ContactForm` + 구글 맵 임베드 + 연락처 카드             |
| **FAQ**            | `/faq`         | 선택      | `FAQ_Accordion`                                          |
| **개인정보처리방침**| `/privacy`    | 필수      | 정적 텍스트 페이지                                       |
| **이용약관**       | `/terms`       | 필수      | 정적 텍스트 페이지                                       |

---

## 8. SEO & Performance Checklist

### 8.1 필수 SEO 구현 항목

| 항목                  | 구현 방법                                                           |
| :-------------------- | :----------------------------------------------------------------- |
| Title Tag             | Next.js `metadata.title` — 페이지별 고유 타이틀                    |
| Meta Description      | Next.js `metadata.description` — 55~160자 핵심 설명                |
| Open Graph Tags       | `metadata.openGraph` — title, description, image, url              |
| Twitter Card          | `metadata.twitter` — summary_large_image                           |
| Canonical URL         | `metadata.alternates.canonical`                                    |
| Sitemap               | `/public/sitemap.xml` (빌드 시 자동 생성)                          |
| Robots.txt            | `/public/robots.txt`                                               |
| JSON-LD               | `Organization`, `WebSite`, `BreadcrumbList` 구조화 데이터          |
| H1 Tag                | 페이지당 정확히 1개                                                 |
| Alt Text              | 모든 `<img>` / `next/image`에 설명적 alt 텍스트 필수               |
| 언어 선언             | `<html lang="ko">`                                                 |

### 8.2 Core Web Vitals 목표

| Metric | Target     | Optimization Strategy                                              |
| :----- | :--------- | :----------------------------------------------------------------- |
| LCP    | < 2.5s     | 히어로 이미지 `priority` + WebP + CDN                              |
| CLS    | < 0.1      | 이미지 width/height 명시, 폰트 `font-display: swap`               |
| INP    | < 200ms    | 인터랙션 핸들러 최적화, React `useTransition` 활용                 |
| FCP    | < 1.8s     | 크리티컬 CSS 인라인, 불필요한 JS 지연 로딩                         |

---

## 9. Accessibility (접근성) Requirements

| Category        | Requirement                                                        |
| :-------------- | :----------------------------------------------------------------- |
| 시맨틱 HTML     | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>` 사용 |
| ARIA 속성       | 인터랙티브 요소에 `aria-label`, `aria-expanded`, `aria-controls`   |
| 키보드 네비게이션| 모든 인터랙티브 요소 Tab 접근 가능, 포커스 링 시각적 표시          |
| 색상 대비       | 텍스트/배경 대비율 **WCAG AA 4.5:1** 이상                         |
| 모션 감소       | `prefers-reduced-motion` 감지 시 애니메이션 비활성화               |
| 스크린 리더     | 장식용 이미지 `alt=""`, 의미 있는 이미지 설명적 alt                |