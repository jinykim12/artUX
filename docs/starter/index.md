---
layout: layouts/base.njk
title: 스타터 킷
---

# 스타터 킷

아트피큐 팀 퍼블리싱 표준 환경 — 신규 프로젝트 시작 템플릿

> **신입 팀원에게:** 이 스타터 킷은 "아트피큐 팀 방식으로 퍼블리싱 작업을 시작하는 가장 빠른 방법"이다. Bootstrap 5, Pretendard GOV 폰트, ITCSS 구조, 접근성 기본기(KWCAG 2.1 AA)가 모두 포함되어 있다. 처음 받은 프로젝트가 있다면 아래 5단계를 따라 30분 안에 작업 환경을 세팅할 수 있다.

---

## 빠른 시작 (5단계)

### 1단계. 스타터 킷 복사

프로젝트 폴더를 새로 만들고 스타터 킷 내용을 복사한다.

```bash
cp -r starter/ /path/to/my-project/
cd /path/to/my-project
```

### 2단계. 의존성 설치

처음 세팅할 때 한 번만 실행한다. `node_modules/` 폴더가 생성된다.

```bash
npm install
```

### 3단계. 프로젝트 정보 수정

`package.json` 파일을 열어서 `name`과 `description` 항목을 이번 프로젝트에 맞게 바꾼다.

```json
{
  "name": "jeju-dialect-portal",
  "description": "제주어사전 퍼블리싱 작업"
}
```

### 4단계. CSS 빌드

아래 명령으로 SCSS를 컴파일해서 `html/pub/css/style.css`를 생성한다. HTML 파일이 이 CSS를 불러온다.

```bash
npm run build:css
```

빌드 후 `html/pub/css/style.css` 파일이 생겼는지 확인한다. 없으면 터미널 오류 메시지를 확인한다.

### 5단계. 개발 시작

`html/index.html`을 브라우저에서 열고 작업을 시작한다. SCSS 파일을 수정할 때마다 자동으로 CSS가 다시 컴파일된다.

```bash
npm run watch:css
```

이 명령을 실행한 상태로 SCSS를 수정하면 저장할 때마다 `html/pub/css/style.css`가 자동 업데이트된다. 브라우저를 새로고침하면 변경 사항이 반영된다.

---

## SCSS 디렉토리 구조

ITCSS(Inverted Triangle CSS) 기반 7단계 레이어로 구성된다. 각 레이어가 무엇을 담는지 한 눈에 확인한다.

```
my-project/
├── html/
│   ├── index.html              # HTML 보일러플레이트
│   └── pub/
│       ├── css/
│       │   ├── style.css       # 빌드된 CSS
│       │   └── scss/           # ITCSS 7단계 SCSS 소스
│       │       ├── style.scss  # 진입점
│       │       ├── 1-settings/ # 변수, 프로젝트 오버라이드 ← 처음 수정하는 파일
│       │       ├── 2-tools/    # 믹스인 (respond-to 등)
│       │       ├── 3-generic/  # CSS 토큰, Bootstrap
│       │       ├── 4-elements/ # base, font, focus, sr-only
│       │       ├── 5-objects/  # 레이아웃
│       │       ├── 6-components/ # UI 컴포넌트 추가 ← 대부분의 작업이 여기
│       │       └── 7-utilities/  # 유틸리티 추가
│       ├── js/                 # JavaScript
│       └── images/             # 이미지 리소스
├── .browserslistrc
├── .editorconfig
├── CLAUDE.md
└── package.json
```

**처음 프로젝트를 받았을 때 수정하는 파일 순서:**
1. `html/pub/css/scss/1-settings/_project-overrides.scss` — 브랜드 컬러 설정
2. `html/pub/css/scss/4-elements/_font.scss` — 폰트 교체 (공공기관 vs 일반 프로젝트)
3. `html/pub/css/scss/6-components/` — 컴포넌트 파일 추가

---

## 프로젝트 색상 변경

새 프로젝트에서 색상을 변경할 때는 **두 곳을 반드시 함께 수정**해야 한다. 한 곳만 바꾸면 Bootstrap 컴포넌트와 팀 커스텀 컴포넌트가 서로 다른 색을 사용하는 불일치가 생긴다.

**수정할 두 곳:**
1. CSS Custom Properties — 커스텀 컴포넌트가 참조
2. Bootstrap Sass 변수 — Bootstrap 컴포넌트가 참조

**방법 A. 직접 수정 (각 파일 개별 수정)**

`html/pub/css/scss/3-generic/_root.scss`에서 CSS 토큰을 바꾼다.

```scss
:root {
  --color-primary: #1a73e8;  /* 변경 */
}
```

`html/pub/css/scss/3-generic/_vendor.scss`에서 Bootstrap Sass 변수도 동일하게 바꾼다.

```scss
$primary: #1a73e8;  /* 동일하게 변경 */
```

**방법 B. project-overrides 사용 (권장)**

`html/pub/css/scss/1-settings/_project-overrides.scss`의 주석을 해제하여 두 값을 한 파일에서 관리한다.

```scss
/* _project-overrides.scss — 주석 해제하여 사용 */
:root {
  --color-primary: #1a73e8;
  --bs-primary:    #1a73e8;
}
```

---

## 반응형 브레이크포인트

`respond-to()` 믹스인으로 반응형 스타일을 작성한다. 미디어쿼리 픽셀값을 직접 쓰지 않고 팀 표준 키워드를 사용하면 브레이크포인트가 변경되어도 믹스인 파일 한 곳만 수정하면 된다.

아래 코드는 모바일 기본 스타일을 작성하고, 태블릿과 PC에서 폰트 크기를 키우는 패턴이다.

```scss
@use '../2-tools' as tools;

.element {
  /* 모바일 기본 스타일 — 미디어쿼리 없이 작성 */
  font-size: 1.4rem;

  /* 태블릿 이상 (768px~) */
  @include tools.respond-to(tablet) {
    font-size: 1.6rem;
  }

  /* PC 이상 (1280px~) */
  @include tools.respond-to(pc) {
    font-size: 1.8rem;
  }
}
```

| 키워드 | 범위 | 주요 사용 상황 |
|--------|------|----------------|
| `mobile-only` | ~767px | 모바일에서만 적용되는 스타일 (숨김 등) |
| `tablet` | 768px~ | 태블릿 이상에서 레이아웃 전환 |
| `tablet-only` | 768px~1023px | 태블릿에서만 적용되는 중간 레이아웃 |
| `pc-sm` | 1024px~ | 소형 데스크톱 이상 레이아웃 |
| `pc-sm-only` | 1024px~1279px | 소형 데스크톱에서만 적용되는 스타일 |
| `pc` | 1280px~ | 풀 데스크톱 레이아웃 |

---

## 폰트 설정

프로젝트 유형에 따라 폰트 설정 방법이 다르다. `html/pub/css/scss/4-elements/_font.scss` 파일을 열면 주석으로 상세 지침이 있다.

**공공기관 프로젝트 (기본):** Pretendard GOV 사용

`html/pub/css/scss/4-elements/_font.scss`가 기본으로 활성화되어 있다. 폰트 파일을 프로젝트에 포함해야 한다.

- 포함할 파일: `font/woff2/*.woff2`, `font/woff/*.woff`
- 다운로드: https://github.com/orioncactus/pretendard/releases

**일반 프로젝트:** Noto Sans KR CDN 방식으로 전환

`_font.scss`의 주석 지침에 따라 `@font-face` 블록을 비활성화하고 HTML `<head>`에 Google Fonts `<link>` 태그를 추가한다.

```html
<!-- 일반 프로젝트: Noto Sans KR CDN 방식 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
```

---

## 접근성 기준

이 스타터 킷은 KWCAG 2.1 AA 준수를 기본으로 한다. 처음 파일을 열면 이미 아래 항목들이 구현되어 있다.

| 항목 | 파일 | 설명 |
|------|------|------|
| 본문건너뛰기 링크 | `html/index.html` | `<a href="#main-content" class="skip-nav">` 보일러플레이트 포함 |
| 포커스 인디케이터 | `html/pub/css/scss/4-elements/_focus.scss` | `:focus-visible` 2px 아웃라인 기본 적용 |
| 스크린리더 전용 텍스트 | `html/pub/css/scss/4-elements/_common.scss` | `.sr-only` 유틸리티 클래스 내장 |
| 한국어 줄바꿈 처리 | `html/pub/css/scss/4-elements/_common.scss` | `word-break: keep-all` 기본 적용 |

이 항목들은 공공기관 검수 시 반드시 확인하는 항목이다. 스타터 킷을 사용하면 기본으로 충족된다. 작업 중에 실수로 제거하지 않도록 주의한다.

---

## 신규 프로젝트 전체 워크플로우

스타터 킷을 복사한 후 프로젝트 완료까지의 전체 순서이다. 각 단계를 순서대로 따른다.

### 1단계. 스타터 킷 복사 + 의존성 설치

```bash
cp -r starter/ /path/to/my-project/
cd /path/to/my-project
npm install
```

### 2단계. 프로젝트 정보 수정

| 파일 | 수정 항목 |
|------|-----------|
| `package.json` | `name`, `description`을 프로젝트에 맞게 변경 |
| `CLAUDE.md` | 프로젝트명, 특이사항 수정 |
| `html/index.html` | `<title>`, `<meta name="description">` 변경 |

### 3단계. 브랜드 컬러 설정

`html/pub/css/scss/1-settings/_project-overrides.scss`에서 프로젝트 색상을 지정한다.

```scss
:root {
    --color-primary: #프로젝트-메인-색상;
    --bs-primary:    #프로젝트-메인-색상;
}
```

### 4단계. 폰트 선택

`html/pub/css/scss/4-elements/_font.scss`에서 프로젝트 유형에 맞는 폰트를 설정한다.

| 프로젝트 유형 | 폰트 | 처리 방법 |
|---------------|------|-----------|
| 공공기관 | Pretendard GOV | 기본 활성화 (폰트 파일 포함 필요) |
| 일반 | Noto Sans KR | `@font-face` 비활성화 → HTML `<link>` CDN 추가 |

### 5단계. CSS 빌드 확인

```bash
npm run build:css
```

`html/pub/css/style.css` 파일이 생성되었는지 확인한다. 오류가 나면 터미널 메시지를 확인한다.

### 6단계. 페이지 작성

`html/index.html`을 복사하여 페이지를 추가한다. **모든 페이지에 아래 항목이 반드시 포함**되어야 한다:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>페이지 제목 | 사이트명</title>
    <link rel="stylesheet" href="pub/css/style.css">
</head>
<body>
    <a href="#main-content" class="skip-nav">본문 바로가기</a>
    <header role="banner">...</header>
    <main id="main-content">...</main>
    <footer role="contentinfo">...</footer>
    <script src="pub/js/파일명.js" defer></script>
</body>
</html>
```

**필수 체크:**
- [ ] `lang="ko"` 선언
- [ ] `charset`, `viewport`, `X-UA-Compatible` 메타태그
- [ ] 본문건너뛰기 링크 (`skip-nav` → `#main-content`)
- [ ] 시맨틱 태그 (`<header>`, `<main>`, `<footer>`)
- [ ] CSS 경로: `pub/css/style.css`
- [ ] JS 경로: `pub/js/파일명.js`

### 7단계. 컴포넌트 SCSS 추가

프로젝트에 필요한 컴포넌트를 추가한다.

1. `html/pub/css/scss/6-components/_컴포넌트명.scss` 파일 생성
2. `html/pub/css/scss/6-components/_index.scss`에 `@forward '컴포넌트명';` 추가
3. 개발 중에는 `npm run watch:css`로 자동 빌드

```scss
// 컴포넌트 파일 기본 구조
@use '../2-tools/breakpoints' as *;

.컴포넌트명 {
    // 모바일 기본 스타일
    // CSS 토큰 사용: var(--color-*), var(--spacing-*)

    @include respond-to(pc-sm) {
        // PC 스타일
    }
}
```

### 8단계. 납품 전 검수

아래 순서대로 검수한다. **웹접근성이 최우선**이다.

**1순위 — 웹접근성 (KWCAG 2.1 AA)**
- [ ] [접근성 체크리스트](/accessibility/checklist/) 24항목 확인
- [ ] 키보드만으로 전체 기능 탐색 가능 여부 (Tab, Enter, ESC)
- [ ] 스크린리더(NVDA/VoiceOver) 테스트
- [ ] pa11y 자동 검사: `npx pa11y http://localhost:포트 --standard WCAG2AA`

**2순위 — 웹호환성**
- [ ] Chrome, Firefox, Safari, Edge 최신 버전 확인
- [ ] 모바일 (Android Chrome, iOS Safari) 확인
- [ ] W3C HTML Validator: <a href="https://validator.w3.org" target="_blank" rel="noopener" title="새 창으로 열림">validator.w3.org <span class="sr-only">(새 창)</span></a>

**3순위 — 코드 품질**
- [ ] `TEMP:`, `DEBUG:` 주석 전체 검색하여 제거
- [ ] `npm run build:css` 오류 없이 빌드 완료
- [ ] 불필요한 `console.log` 제거
