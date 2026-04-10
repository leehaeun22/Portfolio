# Design Template: Corporate Website (External_Web)

> **[AI Agent Instruction]**
> - 에이전트는 `@PRD.md`에 명시된 고객의 '업종'과 '브랜드 무드'를 분석하여 아래의 테마와 블록을 선택하여 조립한다.
> - 절대 인라인 스타일(`style={{}}`)이나 커스텀 CSS를 새로 작성하지 말 것. 모든 스타일링은 Tailwind CSS를 따른다.
> - 페이지 렌더링 시, 반드시 **[4. Page Assembly Logic]**의 조합 공식을 준수하여 컴포넌트를 배치한다.

## 1. Theme Configuration (테마 변수 설정)
에이전트는 요구사항 분석 후 `tailwind.config.ts`의 아래 변수를 가장 먼저 덮어쓴다.
* **Brand Color (`primary`):** [업종 분석 후 적절한 Hex 코드 주입. 예: IT=Blue, 친환경/농업=Green, 럭셔리/뷰티=Black or Gold]
* **Rounded (`radius`):** [보수적/금융권 = `0rem`, 일반 B2B = `0.5rem`, 트렌디/스타트업 = `1rem`]

## 2. Section Block Library (조립용 레고 블록)
에이전트는 각 페이지를 구성할 때 아래 경로에 미리 준비된 컴포넌트만 불러와서 조립한다. 새로운 UI 레이아웃을 임의로 창조하지 마라.

* **Hero Section (최상단 소개):**
    * `HeroTypeA` (중앙 정렬 + 풀스크린 배경 이미지) : 감성적, 브랜딩 중심
    * `HeroTypeB` (좌측 텍스트 + 우측 3D/일러스트) : IT 솔루션, SaaS, 기술 설명 중심
    * `HeroTypeC` (미니멀 타이포그래피 + 여백) : 전문직(법무/회계), 컨설팅 
* **Feature/Service Section (서비스 소개):**
    * `FeatureGrid` (3~4개 아이콘 카드 나열) : 핵심 메뉴나 특징이 많을 때 (A타입)
    * `FeatureZigzag` (텍스트-이미지 교차 배치) : 서비스 작동 방식 등 상세 설명이 필요할 때 (B타입)
    * `FeatureList` (좌측 아이콘 + 우측 텍스트 리스트) : 기능 요약용 (C타입)
* **Social Proof Section (신뢰도/증명):**
    * `StatsRow` (숫자 카운팅 애니메이션) : 누적 사용자, 거래액 등 강조
    * `ClientLogos` (고객사 로고 무한 스크롤 롤링) : B2B 솔루션 필수
    * `TestimonialCarousel` (고객 후기 슬라이더) : B2C, 서비스업 필수
* **Action Section (전환/문의):**
    * `CTA_Simple` (중앙 텍스트 + 큰 버튼 1개) : 회원가입/다운로드 유도용
    * `ContactForm` (이름/이메일/내용 입력 폼) : 견적 문의, 상담 신청용

## 3. Image & Icon Constraint
* 이미지가 들어갈 자리에는 반드시 `https://source.unsplash.com/1600x900/?[업종키워드]` (또는 최신 Unsplash API) 형식을 사용하여 임시 이미지를 렌더링한다.
* 아이콘은 `lucide-react` 라이브러리를 활용하여 텍스트 맥락에 맞는 것을 자동 임포트한다.

## 4. Page Assembly Logic (블록 조합 공식)
에이전트는 `@PRD.md`의 **핵심 비즈니스 목표**를 분석한 뒤, 메인 페이지(`MainPage.tsx`)를 아래의 공식 중 하나를 선택하여 조립한다.

* **Formula 1: IT / SaaS / B2B 솔루션형 (논리적 설득 구조)**
    * 조합: `HeroTypeB` ➡️ `ClientLogos` ➡️ `FeatureZigzag` ➡️ `FeatureGrid` ➡️ `CTA_Simple`
* **Formula 2: 뷰티 / F&B / 라이프스타일형 (시각적/감성적 구조)**
    * 조합: `HeroTypeA` ➡️ `StatsRow` ➡️ `FeatureGrid` ➡️ `TestimonialCarousel` ➡️ `ContactForm`
* **Formula 3: 전문직 / 컨설팅 / 에이전시형 (신뢰감 부여 구조)**
    * 조합: `HeroTypeC` ➡️ `FeatureList` ➡️ `StatsRow` ➡️ `ContactForm`

> **조합 예시 실행:** 만약 고객 요구사항이 "우리 회사는 중소기업용 회계 솔루션을 만드는 IT 스타트업입니다" 라면, 에이전트는 자동으로 **Formula 1**을 채택하여 페이지를 렌더링해야 한다.