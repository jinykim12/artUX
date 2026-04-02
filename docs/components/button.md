---
layout: layouts/base.njk
title: 버튼
tags: components
section: components
permalink: /components/button/
---

# 버튼 컴포넌트

**Bootstrap 5 Button을 그대로 사용한다.** 커스텀 스타일은 최소화하고 접근성 규칙만 추가한다.

**규칙: 클릭 가능한 인터랙티브 요소에는 반드시 `<button>` 태그를 사용한다. `<div onclick>` 또는 `<span onclick>`은 키보드로 접근할 수 없어 접근성 위반이다.**

---

## 기본 버튼

`type="button"`을 명시하는 이유는 `<form>` 안에서 `type` 미지정 시 기본값이 `type="submit"`이어서 의도치 않은 폼 제출이 발생하기 때문이다:

<div class="docs-preview">
<div class="d-flex flex-wrap gap-2">
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-secondary">Secondary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-info">Info</button>
</div>
</div>

```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
```

---

## Outline 버튼

배경 없이 테두리만 있는 버튼. 덜 강조된 행동에 사용한다:

<div class="docs-preview">
<div class="d-flex flex-wrap gap-2">
  <button type="button" class="btn btn-outline-primary">Primary</button>
  <button type="button" class="btn btn-outline-secondary">Secondary</button>
  <button type="button" class="btn btn-outline-success">Success</button>
  <button type="button" class="btn btn-outline-danger">Danger</button>
</div>
</div>

```html
<button type="button" class="btn btn-outline-primary">Primary</button>
<button type="button" class="btn btn-outline-secondary">Secondary</button>
<button type="button" class="btn btn-outline-success">Success</button>
<button type="button" class="btn btn-outline-danger">Danger</button>
```

---

## 버튼 사이즈

<div class="docs-preview">
<div class="d-flex flex-wrap gap-2 align-items-center">
  <button type="button" class="btn btn-sm btn-primary">Small</button>
  <button type="button" class="btn btn-primary">Default</button>
  <button type="button" class="btn btn-lg btn-primary">Large</button>
</div>
</div>

```html
<button type="button" class="btn btn-sm btn-primary">Small</button>
<button type="button" class="btn btn-primary">Default</button>
<button type="button" class="btn btn-lg btn-primary">Large</button>
```

---

## 비활성 버튼

`disabled` 속성과 `aria-disabled="true"`를 쌍으로 적용한다:

<div class="docs-preview">
<div class="d-flex flex-wrap gap-2">
  <button type="button" class="btn btn-primary" disabled aria-disabled="true">비활성</button>
  <button type="button" class="btn btn-outline-primary" disabled aria-disabled="true">비활성</button>
</div>
</div>

```html
<button type="button" class="btn btn-primary" disabled aria-disabled="true">비활성</button>
<button type="button" class="btn btn-outline-primary" disabled aria-disabled="true">비활성</button>
```

---

## 아이콘 버튼

텍스트 없이 아이콘만 있는 버튼은 `aria-label` 필수:

<div class="docs-preview">
<div class="d-flex flex-wrap gap-2 align-items-center">
  <button type="button" class="btn btn-outline-secondary btn--icon" aria-label="삭제">&#128465;</button>
  <button type="button" class="btn btn-outline-secondary btn--icon" aria-label="검색">&#128269;</button>
  <button type="button" class="btn btn-primary">&#128190; 다운로드</button>
</div>
</div>

```html
<!-- 아이콘 전용 — aria-label 필수 -->
<button type="button" class="btn btn-outline-secondary btn--icon" aria-label="삭제">
    <svg aria-hidden="true" focusable="false" width="16" height="16"><!-- 아이콘 --></svg>
</button>

<!-- 텍스트 + 아이콘 — 아이콘에 aria-hidden -->
<button type="button" class="btn btn-primary">
    <svg aria-hidden="true" focusable="false" width="16" height="16"><!-- 아이콘 --></svg>
    다운로드
</button>
```

---

## 링크 스타일 버튼

Bootstrap `btn-link` 클래스로 링크처럼 보이는 버튼을 만든다:

<div class="docs-preview">
<div class="d-flex flex-wrap gap-2 align-items-center">
  <button type="button" class="btn btn-link">링크 스타일</button>
  <a href="#" onclick="return false;" class="btn btn-primary" role="button">a 태그 버튼</a>
</div>
</div>

```html
<!-- 링크처럼 보이는 버튼 -->
<button type="button" class="btn btn-link">링크 스타일</button>

<!-- a 태그를 버튼으로 — role="button" 추가 -->
<a href="/download" class="btn btn-primary" role="button">다운로드</a>
```

> **규칙:** `<a>` 태그에 `href` 없이 JS 클릭만 사용하면 키보드 접근 불가. 가능하면 `<button>` 사용.

---

## 로딩 상태

Bootstrap 스피너를 버튼 안에 넣어 로딩 상태를 표현한다:

<div class="docs-preview">
<button type="button" class="btn btn-primary" disabled aria-disabled="true" aria-busy="true">
  <span class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
  제출 중...
</button>
</div>

```html
<button type="button" class="btn btn-primary" disabled aria-disabled="true" aria-busy="true">
    <span class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
    제출 중...
</button>
```

---

## 버튼 그룹

관련 버튼을 묶을 때 Bootstrap `btn-group` 사용:

<div class="docs-preview">
<div class="btn-group" role="group" aria-label="정렬 옵션">
  <button type="button" class="btn btn-outline-primary active">최신순</button>
  <button type="button" class="btn btn-outline-primary">인기순</button>
  <button type="button" class="btn btn-outline-primary">이름순</button>
</div>
</div>

```html
<div class="btn-group" role="group" aria-label="정렬 옵션">
    <button type="button" class="btn btn-outline-primary active">최신순</button>
    <button type="button" class="btn btn-outline-primary">인기순</button>
    <button type="button" class="btn btn-outline-primary">이름순</button>
</div>
```

---

## 버튼 커스터마이징

버튼 스타일을 프로젝트에 맞게 변경할 때 Bootstrap Sass 변수를 사용한다. `_vendor.scss`에서 설정하면 모든 버튼에 자동 반영된다.

**기본 모양 변경:**

```scss
// _vendor.scss
$btn-border-radius:    0.5rem;    // 둥글기 (기본 0.375rem)
$btn-font-weight:      600;       // 글씨 굵기 (기본 400)
$btn-padding-y:        0.5rem;    // 상하 패딩 (기본 0.375rem)
$btn-padding-x:        1.25rem;   // 좌우 패딩 (기본 0.75rem)
```

**사이즈별 변경:**

```scss
// _vendor.scss
$btn-padding-y-sm:     0.25rem;   // Small 상하
$btn-padding-x-sm:     0.75rem;   // Small 좌우
$btn-font-size-sm:     0.8125rem; // Small 폰트

$btn-padding-y-lg:     0.75rem;   // Large 상하
$btn-padding-x-lg:     1.5rem;    // Large 좌우
$btn-font-size-lg:     1.125rem;  // Large 폰트
```

**실전 예시 — 둥근 버튼 + 굵은 텍스트:**

```scss
// _vendor.scss
$btn-border-radius: 2rem;    // pill 모양
$btn-font-weight:   700;
$btn-padding-x:     1.5rem;
```

**특정 버튼만 다르게** — HTML에서 Bootstrap 유틸리티 조합:

<div class="docs-preview">
<div class="d-flex flex-wrap gap-2 align-items-center">
  <button type="button" class="btn btn-primary rounded-pill">둥근 버튼</button>
  <button type="button" class="btn btn-primary w-100">전체 너비</button>
</div>
</div>

```html
<button type="button" class="btn btn-primary rounded-pill">둥근 버튼</button>
<button type="button" class="btn btn-primary w-100">전체 너비</button>
```

> **규칙: 버튼 스타일을 바꿀 때 CSS를 직접 쓰지 않는다. `_vendor.scss`의 Bootstrap 변수로 전체 변경하거나, HTML에서 Bootstrap 유틸리티 클래스를 조합한다.**

---

## 디자인에 맞춰 버튼 추가하기

피그마 디자인에 Bootstrap 기본에 없는 버튼이 있을 때 추가하는 방법이다.

### 1. Bootstrap 유틸리티 조합으로 해결 (우선)

대부분의 디자인 변형은 Bootstrap 클래스 조합으로 만들 수 있다. SCSS를 새로 작성하기 전에 먼저 시도한다:

<div class="docs-preview">
<div class="d-flex flex-wrap gap-2 align-items-center">
  <button type="button" class="btn btn-primary rounded-pill px-4">둥근 버튼</button>
  <button type="button" class="btn btn-outline-dark btn-sm">다크 아웃라인</button>
  <button type="button" class="btn btn-light border">연한 버튼</button>
  <button type="button" class="btn btn-primary w-100 mt-2">전체 너비 버튼</button>
</div>
</div>

```html
<!-- 둥근 pill 버튼 -->
<button type="button" class="btn btn-primary rounded-pill px-4">둥근 버튼</button>

<!-- 다크 아웃라인 -->
<button type="button" class="btn btn-outline-dark btn-sm">다크 아웃라인</button>

<!-- 연한 버튼 (테두리 포함) -->
<button type="button" class="btn btn-light border">연한 버튼</button>

<!-- 전체 너비 -->
<button type="button" class="btn btn-primary w-100">전체 너비 버튼</button>
```

### 2. 프로젝트 전용 색상 버튼 추가

디자인에서 Bootstrap 6색 외 브랜드 색상 버튼이 필요하면 `_vendor.scss`에서 색상을 추가한다:

```scss
// _vendor.scss — 커스텀 색상 추가
$custom-colors: (
    "brand": #ff6b00,    // → .btn-brand, .btn-outline-brand 자동 생성
    "accent": #6f42c1,   // → .btn-accent, .btn-outline-accent 자동 생성
);
$theme-colors: map-merge($theme-colors, $custom-colors);
```

```html
<!-- 자동 생성된 커스텀 버튼 -->
<button type="button" class="btn btn-brand">브랜드</button>
<button type="button" class="btn btn-outline-accent">액센트</button>
```

### 3. 디자인 전용 버튼 SCSS 추가 (마지막 수단)

Bootstrap 유틸리티로도, 색상 추가로도 안 되는 특수한 디자인일 때만 SCSS를 작성한다:

<div class="docs-preview">
<div class="d-flex flex-wrap gap-3 align-items-center">
  <button type="button" class="btn text-white fw-bold rounded-pill px-4 py-2 border-0" style="background:linear-gradient(135deg,var(--bs-primary),#6f42c1);">지금 신청하기</button>
  <button type="button" class="btn p-0 border-0 bg-transparent text-primary text-decoration-underline">자세히 보기 →</button>
</div>
</div>

```scss
// scss/6-components/_button.scss에 추가

// 그라데이션 CTA 버튼 (피그마 디자인 전용)
.btn-cta {
    background: linear-gradient(135deg, var(--bs-primary), #6f42c1);
    color: #fff;
    border: none;
    padding: 12px 32px;
    font-weight: 700;
    border-radius: 32px;

    &:hover {
        filter: brightness(0.9);
        color: #fff;
    }
}

// 텍스트 전용 버튼 (밑줄 + 아이콘)
.btn-text {
    background: none;
    border: none;
    color: var(--bs-primary);
    padding: 0;
    text-decoration: underline;

    &:hover {
        text-decoration: none;
    }
}
```

```html
<button type="button" class="btn btn-cta">지금 신청하기</button>
<button type="button" class="btn btn-text">자세히 보기 →</button>
```

### 추가 시 체크리스트

- [ ] Bootstrap 유틸리티 조합으로 먼저 시도했는가
- [ ] 색상만 다르면 `$custom-colors`로 추가했는가
- [ ] SCSS 작성 시 `_button.scss`에 추가했는가 (새 파일 만들지 않음)
- [ ] `type="button"` 명시했는가
- [ ] 포커스 상태(`:focus-visible`)가 정상 동작하는가
- [ ] 비활성 상태(`disabled`)가 구분 가능한가
- [ ] 최소 터치 영역 44px 확보했는가

> **규칙: Bootstrap 유틸리티 조합 → 색상 추가 → SCSS 작성 순서로 시도한다. SCSS는 마지막 수단이다.**

---

## 접근성 체크리스트

- [ ] `type="button"` 또는 `type="submit"` 명시
- [ ] `disabled` 사용 시 `aria-disabled="true"` 병행
- [ ] 아이콘 전용 버튼에 `aria-label` 필수
- [ ] SVG 아이콘에 `aria-hidden="true"` + `focusable="false"`
- [ ] `<a>` 태그 버튼 사용 시 `role="button"` 추가
- [ ] 로딩 상태 시 `aria-busy="true"` + 스피너에 `aria-hidden="true"`
- [ ] 포커스 인디케이터 동작 확인

---

## 커스텀 SCSS (Bootstrap 외)

Bootstrap에 없는 것만 `_button.scss`에 정의한다:

```scss
// transition 제거 (공공기관 원칙)
.btn { transition: none; }

// 아이콘 전용 버튼 — 44px 정사각형 터치 타겟 (WCAG 2.5.8)
.btn--icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    padding: 0;
}
```

> **규칙: Bootstrap에 있는 버튼 variant(primary, secondary, outline 등)는 커스텀 SCSS로 재정의하지 않는다.**

---

## KRDS v1.0.0 대응

| 항목 | KRDS 명세 | 구현 |
|------|-----------|------|
| `type` 명시 | 필수 | ✅ Bootstrap 기본 |
| 아이콘 버튼 `aria-label` | 필수 | ✅ |
| 비활성 상태 | `aria-disabled="true"` | ✅ |
| 포커스 인디케이터 | 필수 | ✅ Bootstrap `:focus-visible` |

---

## 참고

- <a href="https://getbootstrap.com/docs/5.3/components/buttons/" target="_blank" rel="noopener" title="새 창으로 열림">Bootstrap 5.3 — Buttons <span class="sr-only">(새 창)</span></a>
- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Button <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Button Pattern <span class="sr-only">(새 창)</span></a>
