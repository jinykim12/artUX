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
    min-width: 2.75rem;
    min-height: 2.75rem;
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
