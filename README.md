# artpqUX 퍼블리싱 가이드 시스템

아트피큐 퍼블리싱 전담팀의 HTML/CSS 작업 표준 가이드.
Bootstrap 5 기반으로 팀 공통 변수, 믹스인, 컴포넌트 패턴을 정의하고,
KRDS v1.0.0(범정부 UI/UX 디자인시스템) 및 KWCAG 2.1 AA 접근성 기준을 준수하는 퍼블리싱 표준을 제공한다.

## 무엇이 들어있나

| 카테고리 | 내용 |
|----------|------|
| **SCSS 시스템** | ITCSS 7단계 구조, 디자인 토큰(CSS Custom Properties), 반응형 믹스인(`respond-to()`) |
| **컴포넌트 10종** | 헤더/GNB, 폼, 버튼, 카드, 테이블, 페이지네이션, 브레드크럼, 모달, 탭, 슬라이더 |
| **접근성 가이드** | KRDS v1.0.0 체크리스트(24항목), 색상 대비, 키보드 탐색, 이미지 대체텍스트, 동적 콘텐츠 |
| **컨벤션 문서** | 네이밍 규칙, SCSS 작성 규칙, HTML 구조, 웹호환성, 코딩 스타일, Git 커밋 규칙 |
| **문서 사이트** | Eleventy 기반 정적 사이트 — 브라우저에서 가이드 열람 + 코드 복사 |
| **스타터 킷** | `starter/` 복사 한 번으로 신규 프로젝트 즉시 시작 |

## 빠른 시작

### 가이드 문서 열람

```bash
npm install
npm run serve
# → http://localhost:3000 에서 문서 사이트 열림
```

### 신규 프로젝트 시작 (스타터 킷)

```bash
cp -r starter/ /path/to/my-project/
cd /path/to/my-project
npm install
npm run build:css
# → dist/style.css 생성 완료, 작업 시작
```

## 기술 스택

- **CSS 프레임워크:** Bootstrap 5.3.x
- **전처리기:** Dart Sass 1.98.x (SCSS)
- **SCSS 구조:** ITCSS 7단계 (`@use`/`@forward` 기반)
- **문서 사이트:** Eleventy 3.x (Nunjucks 템플릿)
- **접근성:** KWCAG 2.1 AA / KRDS v1.0.0 공공기관 기준
- **웹호환성:** Autoprefixer + `.browserslistrc` 기반 크로스브라우저 대응
- **폰트:** Pretendard GOV (공공기관) / Noto Sans KR (일반)

## 프로젝트 구조

```
artpqUX/
├── scss/                  # SCSS 소스 (ITCSS 7단계)
│   ├── 1-settings/        # 변수, 프로젝트 오버라이드
│   ├── 2-tools/           # 믹스인 (respond-to, focus 등)
│   ├── 3-generic/         # 토큰(_root.scss), Bootstrap(_vendor.scss)
│   ├── 4-elements/        # HTML 기본 스타일
│   ├── 5-objects/         # 레이아웃 패턴
│   ├── 6-components/      # UI 컴포넌트 10종
│   ├── 7-utilities/       # 유틸리티 클래스
│   └── style.scss         # 진입점
├── docs/                  # Eleventy 문서 사이트 소스
│   ├── components/        # 컴포넌트 마크업 패턴 (10종)
│   ├── accessibility/     # 접근성 가이드 (6종 + 체크리스트)
│   ├── conventions/       # 코딩 컨벤션 (5종)
│   ├── tokens/            # 디자인 토큰 목록
│   └── starter/           # 스타터 킷 안내
├── starter/               # 신규 프로젝트 스타터 킷
│   ├── scss/              # ITCSS 구조 복사본
│   ├── html/index.html    # HTML 보일러플레이트
│   ├── CLAUDE.md          # AI 작업 규칙
│   └── README.md          # 시작 가이드
├── dist/                  # 빌드 결과물 (artux.css)
└── _site/                 # Eleventy 빌드 결과물
```

## npm 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run build:css` | SCSS → dist/artux.css 컴파일 |
| `npm run watch:css` | SCSS 변경 감지 + 자동 재컴파일 |
| `npm run build` | CSS 빌드 + Eleventy 문서 사이트 빌드 |
| `npm run serve` | CSS watch + Eleventy dev 서버 (localhost:3000) |

## 접근성 기준

이 가이드는 **KWCAG 2.1 AA** + **KRDS v1.0.0** 기준을 충족한다:
- 최소 터치영역 44px (`--touch-target-min`)
- 색상 대비 4.5:1 이상
- 키보드 탐색 가능 (모든 인터랙티브 요소)
- 본문건너뛰기 링크
- 스크린리더 호환 (`.sr-only`, `aria-*` 속성)
- KRDS v1.0.0 공공기관 납품 체크리스트 24항목 포함
- 웹호환성: `.browserslistrc` 기반 지원 브라우저 명시, W3C 유효성 검사

## REM 환경

Bootstrap 기본값 `1rem = 16px`을 그대로 사용한다.
px → rem 환산: `px / 16 = rem` (예: 44px = 2.75rem)

## 라이선스

팀 내부 사용 목적.
