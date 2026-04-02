---
layout: layouts/base.njk
title: 사이드 메뉴
tags: components
section: components
permalink: /components/side-nav/
---

# 사이드 메뉴 (COMP-17)

**KWCAG 2.1 기준:** 2.4.1 블록 건너뛰기, 2.4.5 다양한 방법, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-31

> 사이드 메뉴 컴포넌트는 페이지 좌측에 배치되는 세로 내비게이션이다.
> KWCAG 2.1 AA 접근성 기준(nav 랜드마크, aria-current, 중첩 구조)을 준수한다.
> CSS 클래스명은 `scss/6-components/_side-nav.scss`와 일치시킨다.

**규칙: 사이드 메뉴는 `<nav>` 랜드마크에 `aria-label`로 목적을 명시해야 한다. 현재 페이지 링크에는 `aria-current="page"`를 적용하여 스크린리더 사용자가 현재 위치를 파악할 수 있어야 한다.**

---

## 기본 구조

사이드 메뉴는 다음 순서로 구성된다:

```
<nav aria-label="사이드 메뉴">
  └── <ul class="side-nav">
        ├── <li class="side-nav-item">
        │     └── <a href aria-current="page"> — 현재 페이지
        ├── <li class="side-nav-item side-nav-item--has-children">
        │     ├── <button aria-expanded> — 하위 메뉴 토글
        │     └── <ul class="side-nav-sub"> — 중첩 메뉴
        └── <li class="side-nav-item">
              └── <a href> — 일반 링크
```

---

## 기본 HTML 마크업

사이드 메뉴는 `<nav>` 랜드마크로 감싸고 `aria-label`로 다른 내비게이션과 구분한다. 현재 페이지에 `aria-current="page"`를 적용한다:

<div class="docs-preview">
<nav class="side-nav" aria-label="서브 메뉴">
  <ul class="side-nav__list">
    <li class="side-nav__item">
      <a href="#" onclick="return false;" class="side-nav__link">개요</a>
    </li>
    <li class="side-nav__item">
      <a href="#" onclick="return false;" class="side-nav__link" aria-current="page">시작하기</a>
    </li>
    <li class="side-nav__item">
      <a href="#" onclick="return false;" class="side-nav__link">컴포넌트</a>
    </li>
    <li class="side-nav__item">
      <a href="#" onclick="return false;" class="side-nav__link">접근성</a>
    </li>
    <li class="side-nav__item">
      <a href="#" onclick="return false;" class="side-nav__link">참고 자료</a>
    </li>
  </ul>
</nav>
</div>

```html
<!-- 사이드 메뉴 -->
<nav aria-label="사이드 메뉴">
    <ul class="side-nav">

        <li class="side-nav-item">
            <a href="/guide/overview">개요</a>
        </li>

        <!-- 현재 페이지 -->
        <li class="side-nav-item side-nav-item--active">
            <a href="/guide/getting-started" aria-current="page">시작하기</a>
        </li>

        <!-- 하위 메뉴가 있는 항목 (열림) -->
        <li class="side-nav-item side-nav-item--has-children">
            <button type="button" class="side-nav-toggle" aria-expanded="true">컴포넌트</button>
            <ul class="side-nav-sub">
                <li class="side-nav-item">
                    <a href="/guide/components/button">버튼</a>
                </li>
                <li class="side-nav-item">
                    <a href="/guide/components/modal">모달</a>
                </li>
                <li class="side-nav-item">
                    <a href="/guide/components/form">폼</a>
                </li>
            </ul>
        </li>

        <!-- 하위 메뉴가 있는 항목 (닫힘) -->
        <li class="side-nav-item side-nav-item--has-children">
            <button type="button" class="side-nav-toggle" aria-expanded="false">접근성</button>
            <ul class="side-nav-sub" hidden>
                <li class="side-nav-item">
                    <a href="/guide/a11y/keyboard">키보드</a>
                </li>
                <li class="side-nav-item">
                    <a href="/guide/a11y/screen-reader">스크린리더</a>
                </li>
            </ul>
        </li>

        <li class="side-nav-item">
            <a href="/guide/resources">참고 자료</a>
        </li>

    </ul>
</nav>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `aria-label="사이드 메뉴"` | — | `<nav>` 랜드마크의 목적을 보조 기기에 설명 |
| `aria-current="page"` | — | 현재 페이지 링크를 보조 기기에 전달 |
| `aria-expanded="true/false"` | — | 하위 메뉴 열림/닫힘 상태를 보조 기기에 전달 |
| `hidden` | — | 닫힌 하위 메뉴를 보조 기기와 시각적으로 모두 숨김 |

- `aria-current="page"` — 이 속성이 없으면 스크린리더 사용자가 여러 링크 중 어디가 현재 페이지인지 알 수 없다.
- `aria-label` — 페이지에 여러 `<nav>` 요소가 있을 때(GNB, 사이드, 푸터 등) 각각을 구분하기 위해 필수이다.

---

## 접근성 체크리스트

사이드 메뉴 마크업 검수 시 아래 항목을 확인한다.

- [ ] `<nav>` 랜드마크 사용 + `aria-label` 적용
- [ ] 현재 페이지 링크에 `aria-current="page"` 적용
- [ ] 중첩 메뉴 토글 버튼에 `aria-expanded` 적용
- [ ] 닫힌 하위 메뉴에 `hidden` 속성 적용
- [ ] 하위 메뉴 토글에 `<button>` 태그 사용 (키보드 접근 보장)
- [ ] `<ul>` / `<li>` 목록 구조 유지 (스크린리더 항목 수 전달)
- [ ] Tab 키로 모든 링크와 토글 버튼 접근 가능
- [ ] 포커스 인디케이터 동작 확인 (전역 `:focus-visible` — `_focus.scss`)
- [ ] 페이지 전환 시 `aria-current` 속성 올바르게 이동

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_side-nav.scss` | 사이드 메뉴 스타일, 중첩 들여쓰기, 활성 상태 |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용) |
| `scss/3-generic/_root.scss` | Bootstrap 변수 및 기본값 |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Side navigation (사이드 내비게이션)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<nav>` + `aria-label` | 필수 — 랜드마크 식별 | ✅ |
| `aria-current="page"` | 필수 — 현재 페이지 표시 | ✅ |
| `aria-expanded` | 필수 — 하위 메뉴 상태 | ✅ |
| 중첩 목록 구조 | 필수 — `<ul>` / `<li>` | ✅ |
| 키보드 접근 | 필수 — Tab 순서 보장 | ✅ |
| 반응형 처리 | 권장 — 모바일 접힘 | ✅ CSS 처리 |

> **참고:** KRDS에서는 사이드 메뉴 최대 중첩 깊이를 3단계로 권장한다. 3단계 이상은 정보 구조를 재검토할 것을 권고한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Side navigation <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 사이드 내비게이션 명세
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html" target="_blank" rel="noopener" title="새 창으로 열림">W3C APG — Navigation Landmark <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.4.1 블록 건너뛰기 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.4.5 다양한 방법 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.2 이름, 역할, 값 <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-current" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-current <span class="sr-only">(새 창)</span></a>
