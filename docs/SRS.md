# Software Requirements Specification (SRS) - 개인 포트폴리오

> **[AI Agent Instruction]**
> - 에이전트는 `@PRD.md`와 `@Architecture_and_Convention.md`를 바탕으로 본 문서를 작성한다.
> - PRD의 각 User Story(ID 기준)는 반드시 본 문서의 API, Frontend 섹션에 1:1 대응 매핑되어야 한다.
> - API Endpoint 설계 시 **RESTful** 규칙을 엄수한다.
> - 본 문서의 모든 표 항목은 구현 시 **코드 자동 생성(Code Generation)의 입력값**으로 사용된다.
> - 현재 구현 범위는 **포트폴리오 프론트엔드 + Contact API**에 한정한다. CMS 대시보드는 Phase 3에서 다룬다.

---

## 1. Traceability Matrix (추적성 매트릭스)

| PRD ID   | User Story 요약                     | API Endpoint(s)                  | Frontend Page / Component                    |
| :------- | :---------------------------------- | :------------------------------- | :------------------------------------------- |
| USR-001  | 히어로 섹션 — 이름/직함/CTA 표시    | -                                | `/`, `HeroSection`                           |
| USR-002  | 자기소개 섹션                       | -                                | `/`, `AboutSection`                          |
| USR-003  | 기술 스택 섹션                      | -                                | `/`, `SkillsSection`                         |
| USR-004  | 프로젝트 포트폴리오 (필터)          | -                                | `/`, `ProjectsSection`                       |
| USR-005  | 경력/학력 타임라인                  | -                                | `/`, `ExperienceSection`                     |
| USR-006  | 연락 폼 → 이메일 발송              | `POST /api/contact`              | `/`, `ContactSection`                        |
| USR-007  | 다크/라이트 모드 전환               | -                                | 전체, `ThemeToggle`                          |
| USR-008  | 반응형 모바일 대응                  | -                                | 전체, `Header`, `MobileDrawer`               |
| USR-009  | 프로젝트 상세 페이지                | -                                | `/projects/[slug]`, `ProjectDetail`          |

---

## 2. Data Model (정적 데이터 구조)

> 포트폴리오 데이터는 DB가 아닌 `constants/` 파일에서 정적으로 관리한다.
> 아래는 TypeScript 인터페이스 정의이다.

### 2.1 Profile (개인 정보)

```typescript
// constants/profile.ts
interface Profile {
  name: string;              // 이름
  greeting: string;          // 인사말 ("안녕하세요, ...")
  title: string;             // 직함 ("Frontend Developer")
  bio: string[];             // 자기소개 문단 배열
  email: string;
  phone?: string;
  location: string;          // "Seoul, South Korea"
  resumeUrl: string;         // 이력서 다운로드 URL
  profileImage: string;      // 프로필 이미지 경로
  socials: {
    github?: string;
    linkedin?: string;
    blog?: string;
    twitter?: string;
  };
}
```

### 2.2 Project (프로젝트)

```typescript
// constants/projects.ts
interface Project {
  slug: string;              // URL 슬러그
  title: string;
  description: string;       // 간략 설명 (카드용)
  longDescription?: string;  // 상세 설명 (상세 페이지용)
  thumbnail: string;         // 썸네일 이미지 경로
  images?: string[];         // 상세 스크린샷 배열
  category: ProjectCategory; // 'WEB' | 'MOBILE' | 'DESIGN' | 'OTHER'
  techStack: string[];       // 사용 기술 태그
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;         // "2025-01"
  endDate?: string;          // null이면 진행 중
  featured: boolean;         // 메인 페이지 노출 여부
}
```

### 2.3 Skill (기술 스택)

```typescript
// constants/skills.ts
interface Skill {
  name: string;
  icon: string;              // 아이콘 이름 또는 SVG 경로
  category: SkillCategory;   // 'FRONTEND' | 'BACKEND' | 'DEVOPS' | 'TOOLS' | 'OTHER'
  proficiency?: number;      // 0~100 (숙련도 바 표시용, 선택적)
}
```

### 2.4 Experience (경력/학력)

```typescript
// constants/experience.ts
interface Experience {
  type: 'WORK' | 'EDUCATION';
  organization: string;      // 회사명 또는 학교명
  role: string;              // 직함 또는 학과
  startDate: string;
  endDate?: string;          // null이면 재직/재학 중
  description: string[];     // 주요 업무/성과 목록
  location?: string;
}
```

---

## 3. API Specification

### 3.1 Contact API

| HTTP   | Endpoint URI    | Auth     | Request DTO          | Response DTO        | Description              |
| :----- | :-------------- | :------- | :------------------- | :------------------ | :----------------------- |
| `POST` | `/api/contact`  | Public   | `ContactRequestDto`  | `ContactResponseDto`| 방문자 문의 메시지 수신  |

#### ContactRequestDto
```typescript
interface ContactRequestDto {
  name: string;       // 필수, 1~50자
  email: string;      // 필수, 이메일 형식
  subject: string;    // 필수, 1~100자
  message: string;    // 필수, 1~2000자
}
```

#### ContactResponseDto
```typescript
interface ContactResponseDto {
  success: boolean;
  message: string;    // "메시지가 성공적으로 전송되었습니다."
}
```

#### Backend Logic
1. 입력값 검증 (Zod)
2. Rate Limiting (동일 IP 1분에 3건 제한)
3. 이메일 발송 (Resend 또는 Nodemailer)
4. 성공/실패 응답 반환

---

## 4. Frontend Routing & Page-Component Mapping

| Route Path           | Page Component       | SEO Title Template                                | 주요 섹션 블록                                                 |
| :------------------- | :------------------- | :------------------------------------------------ | :------------------------------------------------------------- |
| `/`                  | `HomePage`           | `[이름] — [직함] | 포트폴리오`                    | `HeroSection`, `AboutSection`, `SkillsSection`, `ProjectsSection`, `ExperienceSection`, `ContactSection` |
| `/projects/[slug]`   | `ProjectDetailPage`  | `[프로젝트명] — [이름] 포트폴리오`                | `ProjectDetail`, `TechStackBadges`, `ImageGallery`             |
| `/privacy`           | `PrivacyPage`        | `개인정보처리방침 — [이름]`                       | 정적 텍스트                                                    |

---

## 5. Infrastructure & Deployment

- **Framework**: Next.js 15 (App Router, SSG/ISR)
- **Language**: TypeScript 5.x (strict)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Font**: Pretendard / Inter (Google Fonts)
- **Email**: Resend (또는 Nodemailer)
- **Deployment**: Vercel (자동 배포)
- **Analytics**: Vercel Analytics 또는 GA4