---
layout: layouts/base.njk
title: 클래스 네이밍 규칙
tags: conventions
section: conventions
permalink: /conventions/naming/
---

# 클래스 네이밍 규칙

아트피큐 팀 퍼블리싱 클래스 네이밍 표준. Bootstrap 5와 충돌 없이 커스텀 클래스를 작성하기 위한 규칙을 명문화한다.

> **왜 네이밍 규칙이 필요한가?**
> 팀 협업에서 클래스 이름이 제각각이면 "이 클래스가 어느 컴포넌트에 속하는지", "Bootstrap 클래스인지 커스텀 클래스인지" 즉시 판단할 수 없다. 일관된 규칙으로 코드 작성자가 달라도 읽기 쉬운 마크업을 유지한다.

---

## 1. BEM 변형 (팀 표준)

팀은 BEM(Block–Element–Modifier) 방법론을 변형하여 사용한다. BEM은 클래스 이름만으로 "어느 블록에 속하는 요소인지", "어떤 상태/변형인지"를 즉시 알 수 있어 협업 시 가독성이 크게 향상된다.

| 구성 요소 | 구분자 | 예시 |
|-----------|--------|------|
| 블록 | 없음 | `.card`, `.form`, `.modal` |
| 요소 | `__` (언더스코어 2개) | `.card__title`, `.card__body` |
| 수정자 | `--` (하이픈 2개) | `.card--featured`, `.btn-link` |

아래 코드는 `.card` 컴포넌트를 BEM 패턴으로 분해한 예시다. 블록 · 요소 · 수정자를 어떻게 구분하는지 확인한다.

```scss
/* 블록 — 독립적인 컴포넌트 단위 */
.card { }
.form { }
.modal { }

/* 요소 — 블록의 하위 구성 요소, 언더스코어 2개로 연결 */
.card__title { }
.card__body { }
.card__footer { }

/* 수정자 — 블록 또는 요소의 변형, 하이픈 2개로 연결 */
.card--featured { }
.card--compact { }
.btn-link { }
```

### Bootstrap 클래스와 BEM의 경계

이 프로젝트는 Bootstrap 5 기반이므로, **Bootstrap에 이미 있는 컴포넌트는 Bootstrap 네이밍을 그대로 사용**하고, **Bootstrap에 없는 우리만의 컴포넌트에만 BEM을 적용**한다. 두 체계를 같은 요소에 중복 적용하지 않는다.

| 상황 | 사용하는 네이밍 | 예시 |
|------|----------------|------|
| Bootstrap 컴포넌트 | Bootstrap 하이픈 네이밍 | `.card-title`, `.modal-header`, `.btn-primary` |
| Bootstrap에 없는 커스텀 컴포넌트 | BEM (`__`, `--`) | `.gnb__toggle`, `.slider__status`, `.btn-link` |
| Bootstrap 컴포넌트에 변형 추가 | BEM 수정자만 추가 | `.card--featured`, `.table--striped-custom` |

```html
<!-- ✅ Bootstrap 카드 → Bootstrap 네이밍 그대로 사용 -->
<div class="card">
  <h3 class="card-title">제목</h3>
  <div class="card-body">본문</div>
</div>

<!-- ✅ 우리만의 컴포넌트 → BEM -->
<nav class="gnb">
  <button class="gnb__toggle" aria-expanded="false">메뉴</button>
  <ul class="gnb__sub" hidden>...</ul>
</nav>

<!-- ❌ 금지 — Bootstrap 카드에 BEM 요소를 중복 적용 -->
<div class="card">
  <h3 class="card-title card__title">제목</h3>
</div>
```

> **규칙: Bootstrap이 이미 제공하는 클래스(`card-title`, `modal-body`, `btn-primary`)를 BEM(`card__title`, `modal__body`)으로 다시 이름 짓지 않는다. BEM은 Bootstrap에 없는 커스텀 컴포넌트(`gnb`, `slider`, `skip-nav`)에만 사용한다.**

### 좋은 예 / 나쁜 예

❌ 나쁜 예: `.card__body__inner` (요소를 요소 안에 중첩 — BEM 의도에 어긋남)
✅ 좋은 예: `.card__inner` (블록에 직접 연결하여 의미 명확)

BEM 요소는 항상 블록에만 직접 연결한다. `.a__b__c` 처럼 요소를 다시 중첩 표현하지 않는다. 깊은 구조가 필요하면 블록을 분리하거나 `__inner` 패턴을 사용한다.

> **규칙: 커스텀 컴포넌트 클래스는 BEM 패턴(`block__element--modifier`)을 사용한다. 요소 중첩(`block__element__subelement`)은 금지하며, 블록을 분리하거나 `__inner` 접미사를 사용한다.**

---

## 2. Bootstrap 컴포넌트 커스터마이징

Bootstrap 컴포넌트의 스타일을 변경해야 할 때는 **클래스명은 그대로 두고 SCSS에서 오버라이드**한다. Bootstrap 클래스를 BEM으로 다시 이름 짓지 않는다.

### 방법 1: CSS 토큰 오버라이드 (기본 스타일 변경)

Bootstrap 컴포넌트 전체에 적용할 스타일 변경은 SCSS에서 해당 클래스를 직접 오버라이드한다. HTML은 Bootstrap 그대로 사용한다.

```scss
// scss/6-components/_card.scss
// Bootstrap 카드 기본 스타일을 프로젝트 토큰으로 변경
.card {
  --bs-card-border-radius: var(--radius-md);
  --bs-card-bg: var(--bs-body-bg);
  --bs-card-border-color: var(--bs-border-color);
}

.card-title {
  font-size: 20px;
  color: var(--bs-body-color);
}
```

```html
<!-- HTML은 Bootstrap 그대로 — 클래스를 바꾸지 않음 -->
<div class="card">
  <h3 class="card-title">제목</h3>
  <div class="card-body">본문</div>
</div>
```

### 방법 2: BEM 수정자 추가 (특정 변형만 다를 때)

기본 카드는 방법 1로 처리하고, **특정 변형**이 필요할 때만 BEM 수정자(`--`)를 추가한다. 수정자 안에서 Bootstrap 하위 요소를 선택하여 스타일을 변경한다.

```scss
// scss/6-components/_card.scss

// 강조 카드 변형 — BEM 수정자
.card--featured {
  border-color: var(--bs-primary);
  box-shadow: var(--shadow-md);

  // 수정자 안에서 Bootstrap 하위 요소 스타일 변경
  .card-title {
    color: var(--bs-primary);
    font-weight: var(--font-weight-bold);
  }

  .card-body {
    background-color: var(--bs-tertiary-bg);
  }
}
```

```html
<!-- 기본 카드 — Bootstrap만 -->
<div class="card">
  <h3 class="card-title">일반 공지</h3>
  <div class="card-body">본문</div>
</div>

<!-- 강조 카드 — Bootstrap + BEM 수정자 추가 -->
<div class="card card--featured">
  <h3 class="card-title">중요 공지</h3>
  <div class="card-body">본문</div>
</div>
```

### 요약

| 상황 | 방법 | 예시 |
|------|------|------|
| Bootstrap 기본 스타일 변경 | SCSS에서 Bootstrap 클래스 오버라이드 | `.card-title { font-size: ... }` |
| 특정 변형 추가 | BEM 수정자(`--`) 클래스 추가 | `.card--featured` |
| 변형 안에서 하위 요소 수정 | 수정자 안에서 Bootstrap 클래스 선택 | `.card--featured .card-title { ... }` |

> **규칙: Bootstrap 컴포넌트 클래스(`card-title`, `modal-body`)는 이름을 바꾸지 않는다. 기본 스타일은 SCSS에서 오버라이드하고, 변형이 필요하면 BEM 수정자(`--`)를 부모에 추가하여 하위 Bootstrap 요소를 잡는다.**

---

## 3. Bootstrap 유틸리티 사용 기준

Bootstrap 5가 제공하는 유틸리티 클래스는 그대로 사용하고, 직접 수정하지 않는다.

Bootstrap 유틸리티를 직접 덮어쓰면 Bootstrap 버전을 올릴 때 예기치 않은 충돌이 생기고, `!important` 우선순위 전쟁이 시작된다. 커스텀 클래스로 분리해야 이런 문제를 피할 수 있다.

### 기본 원칙

- Bootstrap 유틸리티(`d-flex`, `mt-3`, `text-center`, `gap-2` 등)는 있는 그대로 사용한다
- 기존 Bootstrap 유틸리티 클래스를 SCSS에서 직접 수정하지 않는다
- Bootstrap 유틸리티로 해결되지 않는 경우에만 커스텀 클래스를 작성한다

아래 코드는 Bootstrap 유틸리티와 커스텀 BEM 클래스를 함께 사용하는 올바른 방식이다.

```html
<!-- Good: Bootstrap 유틸리티 + 커스텀 클래스 병행 (커스텀 클래스는 마지막) -->
<div class="d-flex align-items-center gap-3 card__header">
  <!-- 레이아웃은 Bootstrap, 컴포넌트 의미는 BEM -->
</div>
```

❌ 나쁜 예: Bootstrap `.mt-3`을 직접 덮어쓰는 SCSS 작성
```scss
/* 절대 금지 — Bootstrap 유틸리티 직접 수정 */
.mt-3 { margin-top: 20px !important; }
```

✅ 좋은 예: 커스텀 클래스로 분리
```scss
/* 올바른 방식 — 전용 커스텀 클래스 작성 */
.section__top { margin-top: 24px; }
```

### 커스텀 클래스 작성 시점

| 상황 | 처리 방법 |
|------|-----------|
| Bootstrap 유틸리티로 충분 | 유틸리티 클래스만 사용 |
| Bootstrap variant가 없는 경우 | 팀 커스텀 클래스 작성 (예: `.btn-link`) |
| 컴포넌트 고유 구조 | BEM 블록/요소 패턴 사용 |
| 프로젝트별 오버라이드 | CSS Custom Property 오버라이드 사용 |

> **규칙: Bootstrap 유틸리티 클래스(`d-flex`, `text-center`)는 BEM으로 감싸지 않고 그대로 사용한다. Bootstrap 클래스 자체를 SCSS에서 직접 수정하는 것은 금지한다.**

---

## 4. 커스텀 클래스 작성 기준

### HTML 마크업 클래스 순서

HTML 요소에서 클래스를 나열할 때 Bootstrap 유틸리티 클래스를 먼저, 커스텀 클래스를 마지막에 위치시킨다. 이 순서를 유지하면 "Bootstrap이 하는 일"과 "우리가 추가한 것"을 한눈에 구분할 수 있다.

아래 코드는 클래스 순서를 올바르게 배치한 예시다.

```html
<!-- 순서: Bootstrap 클래스 → 커스텀 클래스 -->
<div class="d-flex align-items-center card__header">
<button class="btn btn-primary btn-link">
<section class="container py-4 section--hero">
```

❌ 나쁜 예: 커스텀 클래스가 앞에 위치 — Bootstrap과 커스텀의 경계가 불분명
```html
<div class="card__header d-flex align-items-center">
```

✅ 좋은 예: Bootstrap 유틸리티 먼저, 커스텀 BEM 클래스 마지막
```html
<div class="d-flex align-items-center card__header">
```

> **규칙: HTML 클래스 순서는 Bootstrap 유틸리티 → Bootstrap 컴포넌트 → 커스텀 BEM 클래스 순서를 따른다.**

### 팀 표준 커스텀 variant

Bootstrap에 없는 variant는 팀 표준으로 명시하여 사용한다.

| 클래스 | 설명 | 기준 |
|--------|------|------|
| `.btn-link` | 아웃라인 스타일 고스트 버튼 | Phase 08-01 결정 |
| `.card--featured` | 강조 카드 수정자 | BEM 수정자 패턴 |
| `.form--search` | 검색 폼 변형 | BEM 수정자 패턴 |

---

## 5. `js-` 접두사 규칙

`js-` 접두사 클래스는 **JavaScript 훅 전용**으로, 절대 스타일을 부여하지 않는다.

JS와 CSS의 역할이 혼재되면 나중에 JavaScript 로직을 수정할 때 클래스를 제거하거나 이름을 바꿀 수 없다. 스타일이 연결되어 있기 때문이다. `js-` 클래스는 오직 JS 선택자로만 쓰고, 스타일은 별도 클래스로 분리한다.

### 규칙

- `js-` 접두사 클래스에는 CSS/SCSS 규칙 작성 금지
- JavaScript에서 DOM 선택자로만 사용
- 스타일 변경이 필요하면 별도 클래스를 추가/제거하는 방식 사용

아래 코드는 `js-` 클래스를 JS 훅으로만 사용하고, 시각적 상태 변화는 `is-` 클래스로 분리한 올바른 패턴이다.

```html
<!-- Good: js- 클래스는 JS 훅 전용 — 스타일 없음 -->
<button class="btn btn-primary js-modal-trigger">모달 열기</button>
<div class="card js-accordion-panel">내용</div>
```

```javascript
// JS에서 js- 클래스로 요소를 선택하고, 상태는 is- 클래스로 토글
var $trigger = $('.js-modal-trigger');
$trigger.on('click', openModal);

// 시각적 상태 변경은 is- 클래스 사용 (스타일 부여 허용)
$trigger.addClass('is-active');
```

❌ 나쁜 예: `js-` 클래스에 CSS 직접 작성
```scss
/* 절대 금지 */
.js-modal-trigger { color: red; }
```

> **규칙: `js-` 접두사 클래스에는 CSS/SCSS 속성을 작성하지 않는다. JS DOM 선택자 역할만 한다. 상태 표현은 `is-active`, `is-open` 등 `is-` 패턴을 사용한다.**

### 상태 클래스 (is- 패턴)

동적 상태를 표현할 때는 `is-` 접두사를 사용하며, 스타일 부여가 허용된다. `is-` 클래스는 JS가 부착/제거하는 상태 플래그이므로 스타일을 가질 수 있다.

```scss
/* is- 상태 클래스는 컴포넌트 선택자 안에 중첩하여 작성 */
.card {
  &.is-active { border-color: var(--bs-primary); }
  &.is-loading { opacity: .6; }
  &.is-disabled { cursor: not-allowed; }
}
```

---

## 6. 파일 네이밍 규칙

### SCSS 파일

| 규칙 | 예시 |
|------|------|
| 소문자 + 하이픈 | `button-group.scss` |
| Partial 언더스코어 접두사 | `_button-group.scss` |
| ITCSS 레이어 번호 디렉토리 | `6-components/`, `2-tools/` |

아래는 ITCSS 레이어 구조에서 파일 이름을 어떻게 배치하는지 보여주는 예시다.

```
scss/
  1-settings/
    _variables.scss
  2-tools/
    _mixin.scss
  6-components/
    _button.scss
    _button-group.scss
    _card.scss
```

### HTML 파일

- 소문자 + 하이픈: `main-visual.html`, `product-list.html`
- 페이지 단위 파일은 경로로 구분: `components/button.html`

### JavaScript 파일

- 소문자 + 하이픈: `modal-handler.js`, `tab-controller.js`
- 모듈 파일도 동일 규칙 적용

> **규칙: 모든 파일 이름(SCSS, HTML, JS)은 소문자 + 하이픈(-) 조합을 사용한다. camelCase, PascalCase, 언더스코어(_) 구분자는 사용하지 않는다.**

---

## 7. 피해야 할 패턴

각 패턴이 왜 문제인지 이유와 함께 대비 예시를 확인한다.

### camelCase 클래스명 — BEM 가독성 저하

❌ 나쁜 예: camelCase는 HTML/CSS 관례와 어긋나고 BEM 구조를 파악하기 어렵다.
```scss
.cardTitle { font-size: 19px; }
.modalContent { padding: 16px; }
```

✅ 좋은 예: BEM 패턴으로 컴포넌트 소속이 명확해진다.
```scss
.card__title { font-size: 19px; }
.modal__content { padding: 16px; }
```

### 의미 없는 약어 — 협업 시 의미 파악 불가

❌ 나쁜 예: `wrp`, `cont`, `hd`는 처음 보는 팀원이 무슨 요소인지 알 수 없다.
```scss
.wrp { display: flex; }
.cont { max-width: 1200px; }
.hd { font-size: 32px; }
```

✅ 좋은 예: 전체 단어를 사용하면 코드 리뷰와 유지보수가 쉬워진다.
```scss
.wrapper { display: flex; }
.container { max-width: 1200px; }
.heading { font-size: 32px; }
```

### Bootstrap 클래스 직접 덮어쓰기 — 업그레이드 충돌 위험

❌ 나쁜 예: Bootstrap 유틸리티를 직접 수정하면 Bootstrap 버전 업 시 충돌한다.
```scss
.mt-3 { margin-top: 1.5rem !important; }
.btn-primary { background-color: #005a9c; }
```

✅ 좋은 예: 커스텀 클래스로 분리하면 Bootstrap과 독립적으로 관리된다.
```scss
.section__top { margin-top: 24px; }
.btn--agency { background-color: var(--bs-primary); }
```

### 피해야 할 패턴 요약

| 패턴 | 이유 |
|------|------|
| camelCase 클래스명 | HTML/CSS 관례와 불일치, BEM 가독성 저하 |
| 의미 없는 약어 (`wrp`, `cont`) | 협업 시 의미 파악 어려움 |
| Bootstrap 클래스 직접 수정 | Bootstrap 업그레이드 시 충돌, 명시도 문제 |
| `js-` 클래스에 스타일 부여 | JS/CSS 역할 혼재, 리팩터링 시 오류 위험 |
| 요소 중첩 표현 (`.a__b__c`) | BEM 의도와 불일치, 가독성 저하 |
