---
layout: layouts/base.njk
title: 브레드크럼
tags: components
section: components
permalink: /components/breadcrumb/
---

# 브레드크럼 컴포넌트 (COMP-09)

**KWCAG 2.1 기준:** 2.4.8 현재 위치 정보, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-26

> 브레드크럼은 사용자가 현재 위치한 페이지 경로를 계층적으로 안내한다.
> CSS 클래스는 `scss/6-components/_breadcrumb.scss`와 일치시킨다.

**규칙: 브레드크럼은 `<nav aria-label="breadcrumb">`로 감싸고, 현재 페이지(마지막 항목)에 `aria-current="page"`를 반드시 적용한다.**

---

## 기본 브레드크럼

`<nav aria-label="breadcrumb">`으로 감싸는 이유는 페이지에 GNB `<nav>`, 페이지네이션 `<nav>` 등 여러 내비게이션이 있을 때 스크린리더가 각각을 구분할 수 있게 하기 위해서다. `aria-label` 없이 `<nav>`만 사용하면 스크린리더가 "탐색 1, 탐색 2"처럼 번호를 매겨 읽어 어느 것이 브레드크럼인지 알 수 없다.

`<ol>` 순서 목록을 사용하는 이유는 브레드크럼이 계층 순서(홈 → 게시판 → 공지사항)를 가지기 때문이다. `<ul>` 비순서 목록은 순서를 의미적으로 표현하지 않는다:

<div class="docs-preview">
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#" onclick="return false;">홈</a></li>
    <li class="breadcrumb-item"><a href="#" onclick="return false;">게시판</a></li>
    <li class="breadcrumb-item active" aria-current="page">공지사항</li>
  </ol>
</nav>
</div>

```html
<!-- 브레드크럼 — nav + aria-label 필수, 마지막 항목 aria-current="page" -->
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">홈</a></li>
    <li class="breadcrumb-item"><a href="/board">게시판</a></li>
    <li class="breadcrumb-item active" aria-current="page">공지사항</li>
  </ol>
</nav>
```

현재 페이지("공지사항")에 `<a>` 링크를 달지 않는 이유: 지금 보고 있는 페이지로 이동하는 링크는 무의미하다. 텍스트만 표시하여 클릭 불가를 명확히 한다. `aria-current="page"`가 있으면 스크린리더가 "현재 위치, 공지사항"처럼 읽어준다.

❌ 나쁜 예: nav 없음, aria-current 없음, 현재 페이지에 링크

```html
<ul class="breadcrumb">
  <li><a href="/">홈</a></li>
  <li><a href="/board">게시판</a></li>
  <li><a href="/board/notice">공지사항</a></li>
</ul>
```

스크린리더가 이것을 내비게이션 영역으로 인식하지 못하고, 현재 페이지도 다른 링크와 구분이 없다. KWCAG 2.4.8 현재 위치 정보 기준에서 내가 어디에 있는지 파악할 수 없어 부적합 판정을 받는다.

✅ 좋은 예: nav + aria-label + ol + aria-current

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">홈</a></li>
    <li class="breadcrumb-item"><a href="/board">게시판</a></li>
    <li class="breadcrumb-item active" aria-current="page">공지사항</li>
  </ol>
</nav>
```

---

## 접근성 체크리스트

브레드크럼 마크업 검수 시 아래 항목을 확인한다.

- [ ] `<nav>` 태그에 `aria-label="breadcrumb"` 필수 (랜드마크 구분) — 없으면 페이지 내 여러 `<nav>` 중 어느 것이 브레드크럼인지 스크린리더가 구분할 수 없다
- [ ] `<ol>` 순서 목록 사용 (페이지 계층 순서를 의미적으로 표현)
- [ ] 마지막 항목(현재 페이지)에 `aria-current="page"` 필수
- [ ] 현재 페이지는 링크 없이 텍스트만 표시 (클릭 불가 명시)

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_breadcrumb.scss` | 브레드크럼 컴포넌트 스타일 (Bootstrap 오버라이드) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--color-primary`, `--color-text-muted` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Breadcrumb (브레드크럼)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<nav aria-label="breadcrumb">` | 필수 | ✅ |
| `aria-current="page"` | 필수 — 현재 페이지 | ✅ |
| 구분자 `aria-hidden` | 권장 — 장식 기호 숨김 | ✅ |

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Breadcrumb <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 브레드크럼 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.4.8 현재 위치 정보 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Breadcrumb <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-current" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-current <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-label" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-label <span class="sr-only">(새 창)</span></a>
