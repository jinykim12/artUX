---
layout: layouts/base.njk
title: 반응형
tags: conventions
section: conventions
permalink: /conventions/responsive/
---

# 반응형 — Bootstrap 브레이크포인트 + 그리드

반응형은 **Bootstrap 5를 그대로 사용**한다. 커스텀 믹스인, 커스텀 그리드, 커스텀 브레이크포인트를 만들지 않는다.

---

## 브레이크포인트

| Bootstrap 키워드 | 최소 너비 | 용도 |
|-----------------|-----------|------|
| `sm` | 576px | 소형 모바일 |
| `md` | 768px | 태블릿 |
| `lg` | 992px | 소형 PC |
| `xl` | 1200px | PC |
| `xxl` | 1400px | 대형 PC |

### 모바일 퍼스트 원칙

기본 스타일은 모바일 기준으로 작성하고, 넓은 화면에서 확장한다:

```scss
.element {
    font-size: 14px;  // 모바일 기본 (미디어쿼리 없음)

    @media (min-width: 768px) {
        font-size: 16px;  // md — 태블릿 이상
    }

    @media (min-width: 1200px) {
        font-size: 18px;  // xl — PC 이상
    }
}
```

### 실전 예시

```scss
// 헤더 GNB — lg 이상에서만 표시
.header__gnb {
    display: none;

    @media (min-width: 992px) {
        display: flex;
    }
}

// 카드 그리드 — 모바일 1열 → 태블릿 2열 → PC 3열
// HTML에서 Bootstrap 그리드 클래스로 처리 (SCSS 불필요)
```

> **규칙: `@media (min-width: 768px)` 형태로 직접 작성한다. 커스텀 믹스인을 만들지 않는다.**

---

## 그리드

레이아웃은 **Bootstrap 그리드 시스템** (`container` + `row` + `col-*`)을 사용한다.

### 기본 구조

<div class="docs-preview">
<div class="container border">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4 border bg-light p-3">col-lg-4</div>
    <div class="col-12 col-md-6 col-lg-4 border bg-light p-3">col-lg-4</div>
    <div class="col-12 col-md-6 col-lg-4 border bg-light p-3">col-lg-4</div>
  </div>
</div>
</div>

```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4">카드 1</div>
        <div class="col-12 col-md-6 col-lg-4">카드 2</div>
        <div class="col-12 col-md-6 col-lg-4">카드 3</div>
    </div>
</div>
```

| 클래스 | 역할 |
|--------|------|
| `.container` | 최대 너비 제한 + 좌우 여백 |
| `.container-fluid` | 전체 너비 (여백 없음) |
| `.row` | Flexbox 행, 12컬럼 기반 |
| `.col-12` | 모바일 전체 너비 |
| `.col-md-6` | 태블릿(768px+) 2컬럼 |
| `.col-lg-4` | PC(992px+) 3컬럼 |
| `.col-lg-3` | PC(992px+) 4컬럼 |

### 간격 (Gutter)

`row`에 `g-*` 클래스로 컬럼 간 간격을 설정한다:

<div class="docs-preview">
<div class="container">
  <div class="row g-3">
    <div class="col-6"><div class="border bg-light p-3">g-3 간격</div></div>
    <div class="col-6"><div class="border bg-light p-3">g-3 간격</div></div>
    <div class="col-6"><div class="border bg-light p-3">g-3 간격</div></div>
    <div class="col-6"><div class="border bg-light p-3">g-3 간격</div></div>
  </div>
</div>
</div>

```html
<div class="row g-3">
    <div class="col-6"><div class="card">...</div></div>
    <div class="col-6"><div class="card">...</div></div>
</div>
```

| 클래스 | 간격 |
|--------|------|
| `g-0` | 0 |
| `g-1` | 0.25rem (4px) |
| `g-2` | 0.5rem (8px) |
| `g-3` | 1rem (16px) |
| `g-4` | 1.5rem (24px) |
| `g-5` | 3rem (48px) |

### 디자인 너비가 다를 때 (커스텀 container)

Bootstrap `.container`의 기본 `max-width`는 브레이크포인트별로 정해져 있다:

| 브레이크포인트 | `.container` max-width |
|---------------|----------------------|
| sm (576px+) | 540px |
| md (768px+) | 720px |
| lg (992px+) | 960px |
| xl (1200px+) | 1140px |
| xxl (1400px+) | 1320px |

피그마 디자인 너비가 이 값과 다를 때 대응 방법:

**방법 1. 풀사이즈 (전체 너비)** — `container-fluid` 사용

<div class="docs-preview">
<div class="container-fluid border bg-light p-3 text-center">container-fluid — 전체 너비</div>
</div>

```html
<!-- 전체 너비 — 좌우 여백만 있고 max-width 제한 없음 -->
<div class="container-fluid">
    전체 너비 콘텐츠
</div>
```

**방법 2. 디자인 너비가 1400px인 경우** — `container-xxl` 사용

<div class="docs-preview">
<div class="container-xxl border bg-light p-3 text-center">container-xxl — max-width: 1320px</div>
</div>

```html
<!-- xxl 기준 container -->
<div class="container-xxl">
    넓은 레이아웃
</div>
```

**방법 3. 디자인 너비가 Bootstrap 기본값과 맞지 않는 경우** — SCSS에서 `max-width`만 오버라이드

```scss
// 예: 디자인 너비가 1600px인 경우
.container--wide {
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 16px;
    padding-right: 16px;
}
```

```html
<div class="container-fluid container--wide">
    1600px 너비 레이아웃
</div>
```

**방법 4. 섹션별 너비가 다른 경우** — 섹션마다 다른 container 사용

```html
<!-- 히어로: 전체 너비 -->
<section class="container-fluid bg-light">
    <div class="container">
        히어로 콘텐츠 (기본 너비 안에서)
    </div>
</section>

<!-- 본문: 기본 너비 -->
<section class="container">
    본문 콘텐츠
</section>

<!-- 갤러리: 전체 너비 -->
<section class="container-fluid">
    전체 너비 갤러리
</section>
```

> **규칙: 기본은 Bootstrap `.container`를 사용한다. 디자인 너비가 다를 때만 `.container-fluid`, `.container-xxl` 등으로 대응하고, 그래도 안 맞으면 `max-width`만 오버라이드하는 커스텀 클래스를 하나 만든다. Bootstrap 그리드 시스템 자체를 재정의하지 않는다.**

---

## Flex 유틸리티

간단한 정렬은 Bootstrap Flex 유틸리티를 활용한다. 별도 CSS를 작성하지 않는다.

<div class="docs-preview">
<div class="d-flex justify-content-between align-items-center gap-3 border p-3">
  <span class="badge bg-primary">왼쪽</span>
  <span class="badge bg-secondary">오른쪽</span>
</div>
</div>

```html
<div class="d-flex justify-content-between align-items-center gap-3">
    <div>왼쪽</div>
    <div>오른쪽</div>
</div>
```

### 자주 쓰는 Flex 클래스

| 클래스 | 역할 |
|--------|------|
| `d-flex` | Flexbox 활성화 |
| `d-none d-md-flex` | 모바일 숨김, 태블릿 이상 Flex 표시 |
| `flex-wrap` | 줄바꿈 허용 |
| `gap-2`, `gap-3` | 아이템 간격 |
| `justify-content-between` | 양쪽 정렬 |
| `justify-content-center` | 가운데 정렬 |
| `align-items-center` | 세로 가운데 정렬 |

---

## 반응형 표시/숨김

Bootstrap `d-*` 유틸리티로 특정 브레이크포인트에서 요소를 표시/숨김 처리한다:

```html
<!-- 모바일에서만 표시 -->
<div class="d-block d-md-none">모바일 전용</div>

<!-- 태블릿 이상에서만 표시 -->
<div class="d-none d-md-block">태블릿+</div>

<!-- PC 이상에서만 표시 -->
<div class="d-none d-lg-block">PC+</div>
```

| 클래스 | 동작 |
|--------|------|
| `d-none` | 숨김 |
| `d-block` | 블록 표시 |
| `d-md-none` | 768px+ 숨김 |
| `d-md-block` | 768px+ 표시 |
| `d-lg-none` | 992px+ 숨김 |
| `d-lg-block` | 992px+ 표시 |

> **규칙: CSS로 `display: none`을 직접 작성하지 않는다. Bootstrap `d-none`, `d-md-block` 등 유틸리티를 사용한다.**
