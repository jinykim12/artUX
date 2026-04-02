---
layout: layouts/base.njk
title: 스피너
tags: components
section: components
permalink: /components/spinner/
---

# 스피너 (COMP-16)

**KWCAG 2.1 기준:** 4.1.3 상태 메시지, 2.2.2 일시 정지, 중지, 숨기기
**적용 수준:** AA
**작성일:** 2026-03-31

> 스피너 컴포넌트는 콘텐츠 로딩 상태를 시각적으로 표시한다.
> KWCAG 2.1 AA 접근성 기준(role="status", 스크린리더 로딩 안내)을 준수한다.
> CSS 클래스명은 `scss/6-components/_spinner.scss`와 일치시킨다.

**규칙: 스피너에는 반드시 `role="status"`와 `.sr-only` "로딩 중" 텍스트를 포함해야 한다. 로딩 대상 컨테이너에는 `aria-busy="true"`를 적용하여 콘텐츠가 변경 중임을 보조 기기에 전달한다.**

---

## 기본 구조

스피너는 다음 순서로 구성된다:

```
<div class="spinner" role="status">
  └── <span class="sr-only"> — "로딩 중" 스크린리더 전용 텍스트
```

---

## 기본 HTML 마크업

스피너는 `role="status"`로 보조 기기에 상태 정보를 전달한다. 시각적 애니메이션은 스크린리더가 인식하지 못하므로 `.sr-only` 텍스트가 필수이다:

<div class="docs-preview">
  <div class="spinner" role="status">
    <span class="sr-only">로딩 중</span>
  </div>
</div>

```html
<!-- 기본 스피너 -->
<div class="spinner" role="status">
    <span class="sr-only">로딩 중</span>
</div>

<!-- 스피너 크기 변형 -->
<div class="spinner spinner-sm" role="status">
    <span class="sr-only">로딩 중</span>
</div>

<!-- 버튼 내부 스피너 (로딩 상태) -->
<button type="button" class="btn btn-primary" disabled aria-disabled="true">
    <span class="spinner spinner-sm" aria-hidden="true"></span>
    제출 중...
</button>

<!-- 콘텐츠 영역 로딩 — aria-busy 적용 -->
<div class="content-area" aria-busy="true">
    <div class="spinner" role="status">
        <span class="sr-only">콘텐츠를 불러오는 중</span>
    </div>
</div>
```

로딩 완료 후에는 `aria-busy`를 제거한다:

```html
<!-- 로딩 완료 후 -->
<div class="content-area">
    <p>불러온 콘텐츠가 여기에 표시됩니다.</p>
</div>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `role="status"` | — | 상태 메시지임을 보조 기기에 전달 (암묵적 aria-live="polite") |
| `.sr-only` | — | "로딩 중" 텍스트를 스크린리더에만 전달 |
| `aria-busy="true"` | — | 컨테이너의 콘텐츠가 변경 중임을 보조 기기에 전달 |
| `aria-hidden="true"` | — | 버튼 내부 장식용 스피너를 보조 기기에서 숨김 |

- `role="status"` — 이 속성이 없으면 스크린리더 사용자는 로딩이 진행 중인지 전혀 알 수 없다.
- `aria-busy="true"` — 콘텐츠 영역이 로딩 중일 때 보조 기기가 불완전한 콘텐츠를 읽지 않도록 한다. 로딩 완료 후 반드시 제거한다.

---

## 접근성 체크리스트

스피너 마크업 검수 시 아래 항목을 확인한다.

- [ ] `role="status"` 적용 (독립 스피너에)
- [ ] `.sr-only` "로딩 중" 텍스트 포함
- [ ] 로딩 대상 컨테이너에 `aria-busy="true"` 적용
- [ ] 로딩 완료 후 `aria-busy` 속성 제거
- [ ] 버튼 내부 장식용 스피너에 `aria-hidden="true"` 적용
- [ ] 스피너 애니메이션이 `prefers-reduced-motion`을 존중하는지 확인
- [ ] 5초 이상 지속되는 로딩 시 진행 상태 안내 고려 (KWCAG 2.2.2)

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_spinner.scss` | 스피너 컴포넌트 스타일, 회전 애니메이션, 크기 변형 |
| `scss/4-elements/_common.scss` | `.sr-only` 유틸리티 (Bootstrap `.visually-hidden` 별칭) |
| `scss/3-generic/_root.scss` | Bootstrap 변수 및 레이아웃 기본값 |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Spinner (스피너)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `role="status"` | 필수 | ✅ |
| `.sr-only` 텍스트 | 필수 — "로딩 중" 안내 | ✅ |
| `aria-busy` | 필수 — 컨테이너 로딩 상태 | ✅ |
| 크기 변형 | 권장 — sm / md / lg | ✅ 클래스 변형 |
| `prefers-reduced-motion` | 필수 — 모션 감소 대응 | ✅ SCSS 미디어쿼리 |
| 버튼 내부 스피너 | 권장 — 제출 중 상태 | ✅ |

> **참고:** KRDS에서는 전체 페이지 로딩과 부분 영역 로딩을 구분하여 스피너 크기와 위치를 달리할 것을 권장한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Spinner <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 스피너 명세
- <a href="https://www.w3.org/TR/wai-aria-1.2/#status" target="_blank" rel="noopener" title="새 창으로 열림">W3C APG — role="status" <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.3 상태 메시지 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.2.2 일시 정지, 중지, 숨기기 <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-busy" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-busy <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/CSS/@media/prefers-reduced-motion" target="_blank" rel="noopener" title="새 창으로 열림">MDN — prefers-reduced-motion <span class="sr-only">(새 창)</span></a>
