---
layout: layouts/base.njk
title: 웹호환성
tags: conventions
section: conventions
permalink: /conventions/web-compatibility/
---

# 웹호환성 가이드

공공기관 납품 및 일반 서비스에서 브라우저 간 동일한 렌더링과 동작을 보장하기 위한 기준이다.

> **규칙: 웹접근성(KWCAG 2.1 AA)이 최우선이다. 호환성 대응이 접근성을 훼손해서는 안 된다. 예를 들어 IE 대응을 이유로 시맨틱 태그를 `<div>`로 대체하거나, `aria-*` 속성을 제거하는 것은 금지한다.**

---

## 1. 지원 브라우저 범위

`.browserslistrc` 파일에 명시된 범위를 기준으로 한다. Autoprefixer와 PostCSS가 이 파일을 참조한다.

| 브라우저 | 지원 범위 | 비고 |
|----------|-----------|------|
| Chrome | 최근 2버전 | 데스크탑 + Android |
| Firefox | 최근 2버전 | |
| Safari | 최근 2버전 | macOS + iOS |
| Edge | 최근 2버전 | Chromium 기반 |
| Samsung Internet | 한국 점유율 0.5% 이상 시 | `.browserslistrc` `> 0.5% in KR` 포함 |
| IE 11 | **미지원** | 2026년 기준 공공기관 IE11 지원 종료 |

> **공공기관 납품 시:** 발주처가 IE11 지원을 별도 요구하면 프로젝트 `.browserslistrc`에 `ie 11`을 추가하고, CSS Custom Properties 폴리필(`css-vars-ponyfill`) 적용을 검토한다. 단, 접근성 속성은 절대 제거하지 않는다.

---

## 2. 필수 HTML 선언

모든 HTML 파일에 아래 선언이 빠짐없이 존재해야 한다. 하나라도 누락되면 브라우저별 렌더링 차이가 발생한다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
</head>
```

| 선언 | 역할 | 누락 시 영향 |
|------|------|--------------|
| `<!DOCTYPE html>` | 표준 모드(Standards Mode) 강제 | Quirks Mode로 전환되어 박스 모델, 여백 계산이 브라우저마다 달라짐 |
| `lang="ko"` | 스크린리더 언어 엔진 선택 + 브라우저 번역 기능 | 접근성 위반(KWCAG 3.1.1) + Chrome 자동번역 오작동 |
| `charset="UTF-8"` | 문자 인코딩 선언 | 한글 깨짐, 특수문자 오류 |
| `viewport` | 모바일 반응형 기준점 | 모바일에서 PC 화면 그대로 축소 표시 |
| `X-UA-Compatible` | IE 최신 렌더링 모드 강제 | IE에서 호환성 보기 모드로 전환되어 레이아웃 깨짐 |

---

## 3. CSS 호환성 전략

### 3.1 Autoprefixer (vendor prefix 자동 처리)

프로젝트에 `autoprefixer`가 설치되어 있으며, `.browserslistrc` 범위에 맞춰 vendor prefix를 자동 추가한다.

```css
/* 작성 코드 (prefix 없이) */
.card {
  display: flex;
  gap: 1.6rem;
}

/* Autoprefixer 출력 (필요 시 자동 추가) */
.card {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: 1.6rem;
}
```

> **규칙: SCSS에 vendor prefix를 직접 작성하지 않는다. Autoprefixer가 `.browserslistrc` 기준으로 자동 처리한다.**

### 3.2 CSS Custom Properties (CSS 변수)

artpqUX는 디자인 토큰을 CSS Custom Properties(`--color-*`, `--spacing-*`)로 관리한다.

| 브라우저 | 지원 여부 |
|----------|-----------|
| Chrome 49+ | ✅ |
| Firefox 31+ | ✅ |
| Safari 9.1+ | ✅ |
| Edge 15+ | ✅ |
| IE 11 | ❌ 미지원 |

IE11 대응이 필요한 프로젝트는 `css-vars-ponyfill`을 추가하거나, SCSS 컴파일 시 fallback 값을 함께 출력한다.

### 3.3 Flexbox / Grid

| 속성 | 지원 범위 | 주의사항 |
|------|-----------|----------|
| `display: flex` | 모든 지원 브라우저 | `gap` 속성은 Chrome 84+, Safari 14.1+ — 구버전 대응 시 `margin`으로 대체 |
| `display: grid` | 모든 지원 브라우저 | `subgrid`는 Firefox 71+, Safari 16+ — 아직 범용 사용 불가 |

```scss
/* gap 미지원 브라우저 대응 패턴 */
.card-list {
  display: flex;
  flex-wrap: wrap;
  // gap 대신 margin 사용
  margin: calc(1.25rem / -2);

  > * {
    margin: calc(1.25rem / 2);
  }
}
```

### 3.4 폰트

```css
/* 시스템 폰트 스택 — 모든 OS에서 최적의 한국어 폰트 선택 */
font-family:
  'Pretendard GOV',      /* 공공기관 표준 */
  'Pretendard',
  -apple-system,         /* macOS/iOS */
  BlinkMacSystemFont,    /* Chrome macOS */
  'Malgun Gothic',       /* Windows */
  sans-serif;
```

---

## 4. 크로스브라우저 테스트 절차

### 4.1 테스트 체크리스트

신규 페이지 또는 주요 컴포넌트 변경 시 아래 브라우저에서 확인한다.

- [ ] **Chrome** (최신) — 기준 브라우저
- [ ] **Firefox** (최신) — Flexbox/Grid 렌더링 차이 확인
- [ ] **Safari** (최신) — iOS 사파리 포함, `position: sticky`, `gap` 동작 확인
- [ ] **Edge** (최신) — Chromium 기반이므로 대부분 Chrome과 동일
- [ ] **모바일 Chrome** (Android) — 터치 이벤트, viewport 확인
- [ ] **모바일 Safari** (iOS) — 100vh 문제, input zoom 확인

### 4.2 주요 확인 항목

| 항목 | 확인 내용 |
|------|-----------|
| 레이아웃 | Flex/Grid 정렬, 여백, 줄바꿈이 브라우저별 동일한지 |
| 폰트 | 한국어 렌더링, `word-break: keep-all` 적용 여부 |
| 포커스 스타일 | `:focus-visible` 동작 여부 (Safari 15.4+) |
| 모달/오버레이 | `position: fixed` + `overflow: hidden` 조합 동작 |
| 스크롤 | `scroll-behavior: smooth`, `overflow-y: auto` 동작 |
| 폼 | `<select>`, `<input type="date">` 네이티브 UI 차이 |

### 4.3 iOS Safari 주의사항

```scss
/* 100vh 문제 — iOS Safari에서 주소창 포함 높이 계산 */
.full-height {
  height: 100vh;
  height: 100dvh; /* dvh: iOS Safari 15.4+ 동적 뷰포트 높이 */
}

/* input 포커스 시 자동 줌 방지 — font-size 16px 이상 */
input, select, textarea {
  font-size: max(1.6rem, 16px);
}
```

---

## 5. W3C 유효성 검사

### HTML 검사

마크업 오류는 브라우저별 오류 복구 방식이 달라 호환성 문제를 유발한다. KWCAG 4.1.1(마크업 오류 방지) 준수를 위해서도 필수이다.

**검사 방법:**
```bash
# 방법 1: W3C 온라인 validator
# https://validator.w3.org 에서 URL 또는 파일 직접 업로드

# 방법 2: CLI (vnu 설치 필요)
npx vnu --format json --errors-only _site/index.html
```

**주요 검사 항목:**
- 중복 `id` 속성 없음
- 시작/종료 태그 짝 일치
- 속성값 따옴표 누락 없음
- 폐기된(deprecated) 태그/속성 미사용

### CSS 검사

```bash
# Stylelint (프로젝트 설정 기반 자동 검사)
npm run lint:css

# W3C CSS Validator (선택)
# https://jigsaw.w3.org/css-validator/
```

---

## 6. 체크리스트

프로젝트 납품/배포 전 아래 항목을 확인한다.

- [ ] `.browserslistrc` 파일이 프로젝트 루트에 존재하고 지원 범위가 명시되어 있다
- [ ] `<!DOCTYPE html>`, `lang="ko"`, `charset="UTF-8"`, `viewport` 메타태그가 모든 HTML에 존재한다
- [ ] SCSS에 vendor prefix를 직접 작성하지 않았다 (Autoprefixer에 위임)
- [ ] CSS Custom Properties 사용 시 IE11 대응 필요 여부를 확인했다
- [ ] W3C HTML Validator로 마크업 오류가 0건임을 확인했다
- [ ] `npm run lint:css` Stylelint 검사를 통과했다
- [ ] Chrome, Firefox, Safari, Edge 최신 버전에서 레이아웃/기능을 확인했다
- [ ] 모바일(Android Chrome, iOS Safari)에서 터치/스크롤/폼 동작을 확인했다
- [ ] `:focus-visible` 포커스 스타일이 지원 브라우저에서 정상 표시된다
- [ ] 웹접근성(KWCAG 2.1 AA) 체크리스트를 먼저 통과한 후 호환성 검사를 진행했다

---

## 참고

- <a href="https://caniuse.com/" target="_blank" rel="noopener" title="새 창으로 열림">Can I Use <span class="sr-only">(새 창)</span></a> — CSS/JS 기능별 브라우저 지원 현황
- <a href="https://browsersl.ist/" target="_blank" rel="noopener" title="새 창으로 열림">Browserslist <span class="sr-only">(새 창)</span></a> — `.browserslistrc` 쿼리 결과 확인
- <a href="https://validator.w3.org/" target="_blank" rel="noopener" title="새 창으로 열림">W3C HTML Validator <span class="sr-only">(새 창)</span></a>
- <a href="https://jigsaw.w3.org/css-validator/" target="_blank" rel="noopener" title="새 창으로 열림">W3C CSS Validator <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties" target="_blank" rel="noopener" title="새 창으로 열림">MDN — CSS Custom Properties <span class="sr-only">(새 창)</span></a>
- <a href="https://webaim.org/projects/screenreadersurvey/" target="_blank" rel="noopener" title="새 창으로 열림">WebAIM — Screen Reader Survey <span class="sr-only">(새 창)</span></a> — 보조 기술별 브라우저 조합 통계
