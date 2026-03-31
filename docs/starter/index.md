---
layout: layouts/base.njk
title: 스타터 킷
---

# 스타터 킷

신규 프로젝트를 시작할 때 이 스타터 킷을 복사하면 된다. Bootstrap 5, Pretendard 폰트, ITCSS 구조, 접근성(KWCAG 2.1 AA)이 모두 포함되어 있다.

---

## 시작하기 (처음 하는 사람도 따라할 수 있는 4단계)

### 1단계. 복사 + 설치

가이드 폴더 안의 `starter/`를 새 프로젝트 폴더로 복사하고 의존성을 설치한다.

```bash
cp -r starter/ /path/to/my-project/
cd /path/to/my-project
npm install
```

`npm install`을 실행하면 `node_modules/` 폴더가 생성된다. 이 폴더는 건드리지 않는다.

### 2단계. 빌드

```bash
npm run build:css
```

이 명령이 하는 일:

```
html/pub/css/scss/style.scss  →  (Sass 컴파일)  →  html/pub/css/style.css
```

여러 SCSS 파일을 하나의 CSS로 합쳐준다. `html/pub/css/style.css` 파일이 생겼는지 확인한다.

### 3단계. 브라우저에서 확인

`html/index.html`을 브라우저에서 연다. 기본 보일러플레이트 페이지가 보이면 성공이다.

### 4단계. 실시간 개발

```bash
npm run watch:css
```

이걸 켜놓으면 SCSS를 저장할 때마다 CSS가 자동으로 다시 만들어진다. 브라우저 새로고침만 하면 바로 반영된다.

---

## 폴더 구조 이해하기

```
새프로젝트/
├── html/
│   ├── index.html             ← 여기서 페이지 작업
│   └── pub/
│       ├── css/
│       │   ├── style.css      ← 자동 생성됨 (직접 수정 X)
│       │   └── scss/          ← 여기서 스타일 작업
│       │       ├── style.scss          # 진입점 (수정할 일 거의 없음)
│       │       ├── 1-settings/         # 색상 설정 ← 처음 수정하는 곳
│       │       ├── 2-tools/            # 믹스인 (respond-to 등)
│       │       ├── 3-generic/          # 디자인 토큰, Bootstrap
│       │       ├── 4-elements/         # 기본 스타일, 폰트, 포커스
│       │       ├── 5-objects/          # 레이아웃
│       │       ├── 6-components/       # 컴포넌트 ← 대부분의 작업이 여기
│       │       └── 7-utilities/        # 유틸리티
│       ├── js/                ← JavaScript 넣는 곳
│       └── images/            ← 이미지 넣는 곳
├── .browserslistrc            # 지원 브라우저 범위
├── .editorconfig              # 에디터 설정 (4 spaces)
├── CLAUDE.md                  # AI 작업 규칙
└── package.json               # 프로젝트 정보 + npm 스크립트
```

**핵심 규칙:**
- `style.css`는 **직접 수정하지 않는다** (빌드하면 덮어씀)
- 스타일은 항상 `scss/` 안에서 작업한다
- 이미지는 `pub/images/`, JS는 `pub/js/`에 넣는다

---

## 신규 프로젝트 전체 워크플로우

스타터 킷을 복사한 후 프로젝트 완료까지의 순서이다.

### 1단계. 프로젝트 정보 수정

| 파일 | 수정 항목 |
|------|-----------|
| `package.json` | `name`, `description`을 프로젝트에 맞게 변경 |
| `CLAUDE.md` | 프로젝트명, 특이사항 수정 |
| `html/index.html` | `<title>`, `<meta name="description">` 변경 |

### 2단계. 브랜드 컬러 설정

`html/pub/css/scss/1-settings/_project-overrides.scss`에서 프로젝트 색상을 지정한다.

```scss
:root {
    --color-primary: #프로젝트-메인-색상;
    --bs-primary:    #프로젝트-메인-색상;
}
```

### 3단계. 폰트 선택

`html/pub/css/scss/4-elements/_font.scss`에서 프로젝트 유형에 맞는 폰트를 설정한다.

| 프로젝트 유형 | 폰트 | 처리 방법 |
|---------------|------|-----------|
| 공공기관 | Pretendard GOV | 기본 활성화 (폰트 파일 포함 필요) |
| 일반 | Noto Sans KR | `@font-face` 비활성화 → HTML `<link>` CDN 추가 |

### 4단계. 페이지 작성

`html/index.html`을 복사하여 페이지를 추가한다.

```
html/
├── index.html        ← 메인 페이지
├── about.html        ← index.html 복사해서 만듦
├── board.html        ← index.html 복사해서 만듦
└── pub/
```

**모든 페이지에 반드시 포함해야 하는 것:**

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

### 5단계. 컴포넌트 SCSS 추가

프로젝트에 필요한 컴포넌트 스타일을 추가한다.

1. `html/pub/css/scss/6-components/` 에 `_컴포넌트명.scss` 파일 생성
2. `_index.scss`에 `@forward '컴포넌트명';` 한 줄 추가
3. `npm run watch:css`가 자동으로 빌드해줌

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

### 6단계. 납품 전 검수

**1순위 — 웹접근성 (KWCAG 2.1 AA)**
- [ ] [접근성 체크리스트](/accessibility/checklist/) 24항목 확인
- [ ] 키보드만으로 전체 기능 탐색 가능 (Tab, Enter, ESC)
- [ ] 스크린리더(NVDA/VoiceOver) 테스트

**2순위 — 웹호환성**
- [ ] Chrome, Firefox, Safari, Edge 최신 버전 확인
- [ ] 모바일 (Android Chrome, iOS Safari) 확인

**3순위 — 코드 품질**
- [ ] `TEMP:`, `DEBUG:` 주석 전체 검색하여 제거
- [ ] `npm run build:css` 오류 없이 빌드 완료

---

## 색상 변경하기

색상을 바꿀 때는 **두 곳을 함께 수정**해야 한다. 한 곳만 바꾸면 Bootstrap 컴포넌트와 커스텀 컴포넌트 색이 달라진다.

**방법 A. 각각 수정**

`html/pub/css/scss/3-generic/_root.scss`:
```scss
:root {
    --color-primary: #1a73e8;
}
```

`html/pub/css/scss/3-generic/_vendor.scss`:
```scss
$primary: #1a73e8;
```

**방법 B. 한 파일에서 관리 (권장)**

`html/pub/css/scss/1-settings/_project-overrides.scss`:
```scss
:root {
    --color-primary: #1a73e8;
    --bs-primary:    #1a73e8;
}
```

---

## 반응형 작성법

미디어쿼리 픽셀값을 직접 쓰지 않고 `respond-to()` 믹스인을 사용한다.

```scss
@use '../2-tools' as tools;

.element {
    font-size: 0.875rem;           /* 모바일 기본 */

    @include tools.respond-to(tablet) {
        font-size: 1rem;           /* 태블릿 이상 */
    }

    @include tools.respond-to(pc) {
        font-size: 1.125rem;       /* PC 이상 */
    }
}
```

| 키워드 | 범위 |
|--------|------|
| `mobile-only` | ~767px |
| `tablet` | 768px~ |
| `tablet-only` | 768px~1023px |
| `pc-sm` | 1024px~ |
| `pc-sm-only` | 1024px~1279px |
| `pc` | 1280px~ |

---

## 접근성 (이미 적용되어 있는 것)

스타터 킷을 사용하면 아래 항목이 기본으로 포함되어 있다. 작업 중에 실수로 제거하지 않도록 주의한다.

| 항목 | 파일 | 설명 |
|------|------|------|
| 본문건너뛰기 링크 | `html/index.html` | `<a href="#main-content" class="skip-nav">` |
| 포커스 인디케이터 | `_focus.scss` | `:focus-visible` 아웃라인 |
| 스크린리더 전용 텍스트 | `_common.scss` | `.sr-only` 클래스 |
| 한국어 줄바꿈 | `_common.scss` | `word-break: keep-all` |
