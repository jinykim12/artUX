---
layout: layouts/base.njk
title: 버튼
tags: components
section: components
permalink: /components/button/
---

# 버튼 컴포넌트 (COMP-02)

**KWCAG 2.1 기준:** 2.1.1 키보드 접근성, 4.1.2 이름·역할·값
**적용 수준:** AA
**작성일:** 2026-03-26

> 버튼 접근성 원칙(role, aria-* 속성, 포커스 관리 등)은
> `docs/accessibility/` 관련 문서를 참고한다. 이 문서는 실제 마크업 패턴을 제공한다.
> CSS 클래스는 `scss/6-components/_button.scss`와 일치시킨다.

**규칙: 클릭 가능한 인터랙티브 요소에는 반드시 `<button>` 태그를 사용한다. `<div onclick>` 또는 `<span onclick>`은 키보드로 접근할 수 없어 접근성 위반이다.**

---

## 기본 버튼 (Primary)

`type="button"`을 명시하는 이유는 `<form>` 안에 버튼을 배치했을 때 `type` 미지정 시 기본값이 `type="submit"`이어서 의도치 않은 폼 제출이 발생하기 때문이다:

<div class="docs-preview">
  <button type="button" class="btn btn-primary">확인</button>
</div>

```html
<!-- 기본 버튼 — type="button" 명시 (form 내 submit 방지) -->
<button type="button" class="btn btn-primary">확인</button>
```

---

## Secondary / Outline / Ghost 버튼

용도에 따라 시각적 강조 수준을 다르게 한다. 스크린리더는 버튼 텍스트를 읽으므로 텍스트가 행동을 명확히 설명해야 한다:

```html
<!-- Secondary 버튼 — 보조 행동에 사용 (취소, 닫기 등) -->
<button type="button" class="btn btn-secondary">취소</button>

<!-- Outline Primary — 덜 강조된 주요 행동 (더보기 등) -->
<button type="button" class="btn btn-outline-primary">더보기</button>

<!-- Ghost 버튼 — 배경/테두리 없는 텍스트 버튼 (GNB 닫기, 보조 링크 등) -->
<button type="button" class="btn btn-ghost">닫기</button>
```

---

## 비활성 버튼

`disabled` 속성과 `aria-disabled="true"`를 반드시 쌍으로 적용한다. `disabled`만 쓰면 일부 구형 보조 기기에서 비활성 상태를 정확히 전달하지 못한다:

```html
<!-- disabled 속성 + aria-disabled="true" — 스크린 리더에서도 비활성 안내 -->
<!-- CSS disabled 선택자와 aria-disabled 속성은 항상 쌍으로 처리한다 -->
<button type="button" class="btn btn-primary" disabled aria-disabled="true">
  제출 불가
</button>
```

> **주의:** `disabled` 속성만 추가하면 시각적으로는 비활성 처리되지만,
> 일부 보조 기기에서 비활성 상태를 정확히 전달하지 못할 수 있다.
> `aria-disabled="true"`를 함께 사용해 스크린 리더에도 비활성 상태를 알린다.

---

## 아이콘 버튼

아이콘만 있고 텍스트가 없는 버튼은 스크린리더가 읽을 내용이 없어 "버튼"이라고만 읽힌다. `aria-label`로 버튼 목적을 반드시 설명해야 한다. SVG 아이콘의 `focusable="false"`는 Internet Explorer에서 SVG가 별도 포커스를 받는 버그를 방지한다:

```html
<!-- 아이콘 전용 버튼 — aria-label 필수 (텍스트 없으므로 스크린 리더 안내) -->
<!-- .btn--icon: 44×44px 정사각형 터치 타겟 (WCAG 2.5.8 최소 터치영역 44px 보장) -->
<button type="button" class="btn btn-ghost btn--icon" aria-label="삭제">
  <svg aria-hidden="true" focusable="false" width="16" height="16">
    <!-- 아이콘 경로 -->
  </svg>
</button>

<!-- 텍스트 + 아이콘 병용 버튼 — 아이콘에 aria-hidden="true" 처리 -->
<button type="button" class="btn btn-primary">
  <svg aria-hidden="true" focusable="false" width="16" height="16">
    <!-- 아이콘 경로 -->
  </svg>
  다운로드
</button>
```

❌ 나쁜 예: aria-label 없는 아이콘 버튼

```html
<button type="button" class="btn btn-ghost">
  <svg width="16" height="16"><!-- 아이콘 --></svg>
</button>
```

스크린리더가 이 버튼을 "버튼"이라고만 읽는다. 어떤 행동을 하는 버튼인지 전혀 알 수 없다.

✅ 좋은 예: aria-label로 목적 명시

```html
<button type="button" class="btn btn-ghost btn--icon" aria-label="삭제">
  <svg aria-hidden="true" focusable="false" width="16" height="16"><!-- 아이콘 --></svg>
</button>
```

> **주의:** 아이콘 전용 버튼(텍스트 없음)에는 반드시 `aria-label`을 추가한다.
> SVG 아이콘에는 `aria-hidden="true"` + `focusable="false"`를 함께 적용한다.

---

## 링크 스타일 버튼 (a 태그)

`<a>` 태그는 "페이지 이동"에, `<button>` 태그는 "행동 실행"에 사용하는 것이 원칙이다. 이동 목적지가 없는 클릭 행동에는 `<button>`을 사용해야 키보드 접근성을 보장할 수 있다:

```html
<!-- a 태그를 버튼처럼 사용할 때 — role="button" 추가 -->
<!-- href가 있으면 <a> 태그, 없으면 <button>을 사용하는 것이 원칙 -->
<a href="#" class="btn btn-primary" role="button">다운로드</a>

<!-- href 없는 경우 — button 태그 사용 권장 -->
<!-- <a> 태그에 href 없이 JS 클릭만 사용하면 키보드 접근성 문제 발생 가능 -->
<button type="button" class="btn btn-primary">다운로드</button>
```

❌ 나쁜 예: href 없는 `<a>` 태그에 JS 이벤트만

```html
<a onclick="doSomething()">클릭</a>
```

이렇게 하면 Tab으로 포커스가 가지 않아 키보드 사용자가 이 요소에 접근할 수 없다. 공공기관 웹 접근성 검사(KWCAG 2.1.1)에서 부적합 판정을 받는다.

✅ 좋은 예: `<button>` 사용

```html
<button type="button" onclick="doSomething()">클릭</button>
```

> **주의:** `<a>` 태그를 버튼처럼 사용할 때는 `role="button"`을 추가한다.
> 가능하면 `<button>` 태그를 사용하는 것을 권장한다.

---

## 로딩 상태 버튼

폼 제출 중 버튼이 비활성되면서 텍스트가 "제출 중..."으로 바뀐다. `aria-busy="true"`를 추가하면 스크린리더가 "바쁨" 상태임을 인식한다:

```html
<!-- 로딩 상태 — aria-busy="true" + 텍스트 변경으로 스크린 리더에 상태 전달 -->
<button type="button" class="btn btn-primary" aria-busy="true" disabled aria-disabled="true">
  제출 중...
</button>
```

---

## 접근성 체크리스트

버튼 마크업 검수 시 아래 항목을 확인한다.

- [ ] `type="button"` 또는 `type="submit"` 명시 — 미지정 시 form 내에서 submit 동작
- [ ] `disabled` 속성 사용 시 `aria-disabled="true"` 병행 처리
- [ ] 아이콘 전용 버튼에 `aria-label` 필수 (시각적 텍스트 없는 경우)
- [ ] SVG 아이콘에 `aria-hidden="true"` + `focusable="false"` 적용
- [ ] `<a>` 태그로 버튼 역할 사용 시 `role="button"` 추가
- [ ] 로딩 상태 시 `aria-busy="true"` + 텍스트 변경 처리
- [ ] 포커스 인디케이터 동작 확인 (전역 `:focus-visible` — `_focus.scss`)
- [ ] `outline: none`을 CSS에서 직접 제거하지 않음 — 키보드 사용자가 포커스 위치를 알 수 없게 되어 KWCAG 2.1 AA 부적합 판정을 받는다
- [ ] 버튼 `min-height: 44px` 보장 — WCAG 2.5.8 최소 터치영역 44px 준수 (`.btn--icon`은 44×44px 정사각형 확보)

---

## 버튼 사이즈 규칙

모든 버튼은 `min-height: 44px`을 기본으로 한다. 이는 WCAG 2.5.8(최소 크기) 기준의 최소 터치영역 44px을 보장하기 위함이다. 텍스트 버튼은 패딩으로 높이가 결정되므로 `min-height`로 44px 이하로 떨어지지 않도록 막는다. 아이콘 전용 버튼(`.btn--icon`)은 44×44px 정사각형 터치 타겟을 확보한다.

| 변수 | 값 | 설명 |
|------|----|------|
| `min-height` | `44px` | 모든 버튼 최소 높이 — WCAG 2.5.8 최소 터치영역 |
| `.btn--icon` 크기 | `44×44px` | 아이콘 전용 버튼 정사각형 터치 타겟 |

> **규칙: WCAG 2.5.8 최소 터치영역 44px을 보장한다.** 모바일 환경에서 손가락으로 버튼을 탭할 때 충분한 터치 영역이 확보되어야 오작동 없이 사용 가능하다.

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_button.scss` | 버튼 컴포넌트 스타일 (Bootstrap 오버라이드) |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용, 버튼 별도 설정 불필요) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--color-primary`, `--spacing-*` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Button (버튼)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `type` 명시 | 필수 — `"button"` 또는 `"submit"` | ✅ |
| 아이콘 버튼 `aria-label` | 필수 — 텍스트 없는 버튼 | ✅ |
| 비활성 상태 | `aria-disabled="true"` 권장 (`disabled` 속성 병행) | ✅ |
| 최소 터치 영역 44px | 필수 (WCAG 2.5.8) | ✅ `--touch-target-min` |
| 포커스 인디케이터 | 필수 — `:focus-visible` | ✅ 전역 `_focus.scss` |

> **KRDS 추가:** KRDS는 **FAB (플로팅 버튼)** 컴포넌트도 정의한다. 우측 하단 고정 버튼이 필요한 경우 `position: fixed` + `aria-label`로 구현한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Button <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 버튼 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.1.1 키보드 접근성 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.2 이름·역할·값 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Button Pattern <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-disabled" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-disabled <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-label" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-label <span class="sr-only">(새 창)</span></a>
