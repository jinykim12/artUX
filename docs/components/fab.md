---
layout: layouts/base.njk
title: 플로팅 버튼
tags: components
section: components
permalink: /components/fab/
---

# 플로팅 버튼 (COMP-19)

**KWCAG 2.1 기준:** 2.1.1 키보드 접근, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-31

> 플로팅 버튼(FAB) 컴포넌트는 화면에 고정 배치되는 주요 행동 버튼이다.
> KWCAG 2.1 AA 접근성 기준(aria-label 필수, 키보드 접근)을 준수한다.
> CSS 클래스명은 `scss/6-components/_fab.scss`와 일치시킨다.

**규칙: 플로팅 버튼은 아이콘만 표시하는 경우가 대부분이므로 `aria-label`이 필수이다. 키보드 Tab 순서에서 자연스러운 위치에 배치해야 한다.**

---

## 기본 구조

플로팅 버튼은 다음 순서로 구성된다:

```
<button class="fab" aria-label="행동 설명">
  └── <svg aria-hidden="true"> — 아이콘
```

---

## 기본 HTML 마크업

플로팅 버튼은 `position: fixed`로 화면에 고정 배치한다. 아이콘만 표시하므로 `aria-label`로 버튼 목적을 반드시 설명한다:

<div class="docs-preview">
<div class="d-flex gap-3 align-items-center">
  <button type="button" class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" aria-label="맨 위로" style="width:56px;height:56px;">
    <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
  </button>
  <button type="button" class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" aria-label="채팅 상담 열기" style="width:56px;height:56px;">
    <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
  </button>
  <span class="text-muted small">← 실제 사이트에서는 화면 우측 하단에 고정됩니다</span>
</div>
</div>

```html
<!-- 기본 FAB — 주요 행동 -->
<button type="button" class="fab" aria-label="새 글 작성">
    <svg aria-hidden="true" focusable="false" width="24" height="24"><!-- + 아이콘 --></svg>
</button>

<!-- 맨 위로 이동 FAB -->
<button type="button" class="fab fab--scroll-top" id="scrollTopBtn" aria-label="맨 위로 이동" hidden>
    <svg aria-hidden="true" focusable="false" width="24" height="24"><!-- ↑ 아이콘 --></svg>
</button>

<!-- 채팅 상담 FAB -->
<button type="button" class="fab fab--chat" aria-label="채팅 상담 열기">
    <svg aria-hidden="true" focusable="false" width="24" height="24"><!-- 채팅 아이콘 --></svg>
</button>
```

맨 위로 이동 버튼은 스크롤 위치에 따라 표시/숨김을 제어한다:

```html
<!-- FAB를 DOM 하단에 배치 — Tab 순서가 본문 콘텐츠 뒤에 오도록 -->
<main>
    <!-- 페이지 본문 -->
</main>
<footer>
    <!-- 푸터 -->
</footer>

<!-- FAB — 본문/푸터 뒤에 배치 -->
<button type="button" class="fab fab--scroll-top" id="scrollTopBtn" aria-label="맨 위로 이동" hidden>
    <svg aria-hidden="true" focusable="false" width="24" height="24"><!-- ↑ 아이콘 --></svg>
</button>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `aria-label` | 행동 설명 텍스트 | 아이콘 전용 버튼의 목적을 보조 기기에 전달 (필수) |
| `aria-hidden="true"` | — | 장식용 SVG 아이콘을 보조 기기에서 숨김 |
| `focusable="false"` | — | SVG 요소가 별도 포커스를 받지 않도록 처리 |
| `hidden` | — | 맨 위로 이동 버튼 등 조건부 표시 시 숨김 |

- `aria-label` — 이 속성이 없으면 스크린리더가 "버튼"이라고만 읽어서 어떤 행동을 하는 버튼인지 알 수 없다.
- Tab 순서 — FAB를 DOM 하단에 배치하여 본문 콘텐츠를 먼저 탐색한 후 FAB에 도달하도록 한다.

---

## 접근성 체크리스트

플로팅 버튼 마크업 검수 시 아래 항목을 확인한다.

- [ ] `aria-label` 필수 적용 (아이콘 전용 버튼)
- [ ] `<button>` 태그 사용 (키보드 접근 보장)
- [ ] SVG 아이콘에 `aria-hidden="true"` + `focusable="false"` 적용
- [ ] `min-height: 44px`, `min-width: 44px` 보장 (WCAG 2.5.8)
- [ ] Tab 순서가 자연스러운 위치에 배치 (본문 콘텐츠 뒤)
- [ ] 조건부 표시 시 `hidden` 속성으로 보조 기기에서도 숨김
- [ ] 포커스 인디케이터 동작 확인 (전역 `:focus-visible` — `_focus.scss`)
- [ ] 맨 위로 이동 시 smooth scroll 적용 + 포커스 이동 처리

---

## 맨 위로 이동 JS 예시

맨 위로 이동 버튼은 스크롤 위치에 따라 표시되며, 클릭 시 부드럽게 페이지 상단으로 이동한다:

```javascript
$(function () {
    var $scrollTopBtn = $('#scrollTopBtn');
    if (!$scrollTopBtn.length) return;

    var scrollThreshold = 300;

    // 스크롤 위치에 따라 버튼 표시/숨김
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > scrollThreshold) {
            $scrollTopBtn.removeAttr('hidden');
        } else {
            $scrollTopBtn.attr('hidden', '');
        }
    });

    // 클릭 시 맨 위로 smooth scroll
    $scrollTopBtn.on('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // 스크롤 완료 후 페이지 상단 요소로 포커스 이동
        setTimeout(function () {
            var $firstHeading = $('h1, [tabindex="-1"]').first();
            if ($firstHeading.length) {
                $firstHeading.attr('tabindex', '-1');
                $firstHeading.focus();
            }
        }, 500);
    });
});
```

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_fab.scss` | FAB 스타일, 고정 위치, 그림자, 크기 |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--z-fab`, `--shadow-lg`, `--touch-target-min` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **FAB (플로팅 버튼)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `aria-label` | 필수 — 아이콘 전용 버튼 | ✅ |
| 최소 터치 영역 44px | 필수 (WCAG 2.5.8) | ✅ |
| 고정 위치 | 필수 — `position: fixed` | ✅ |
| 맨 위로 이동 | 권장 — scroll-to-top 변형 | ✅ JS 예시 제공 |
| 키보드 접근 | 필수 — Tab 도달 가능 | ✅ |
| `<button>` 태그 | 필수 | ✅ |

> **참고:** KRDS에서는 FAB 위치를 우측 하단(기본) 또는 좌측 하단으로 권장한다. 화면에 동시 표시되는 FAB는 최대 2개로 제한할 것을 권고한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — FAB <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 플로팅 버튼 명세
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Button Pattern <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.1.1 키보드 접근 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.2 이름, 역할, 값 <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-label" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-label <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/API/Window/scrollTo" target="_blank" rel="noopener" title="새 창으로 열림">MDN — scrollTo <span class="sr-only">(새 창)</span></a>
