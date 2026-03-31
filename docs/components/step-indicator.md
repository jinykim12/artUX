---
layout: layouts/base.njk
title: 단계 표시기
tags: components
section: components
permalink: /components/step-indicator/
---

# 단계 표시기 (COMP-15)

**KWCAG 2.1 기준:** 1.3.1 정보와 관계, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-31

> 단계 표시기 컴포넌트는 다단계 프로세스에서 현재 위치와 진행 상태를 표시한다.
> KWCAG 2.1 AA 접근성 기준(aria-current="step", 순서 목록, 상태 전달)을 준수한다.
> CSS 클래스명은 `scss/6-components/_step-indicator.scss`와 일치시킨다.

**규칙: 현재 단계에는 반드시 `aria-current="step"`을 적용하여 스크린리더 사용자가 현재 위치를 파악할 수 있어야 한다. 단계 목록은 `<ol>`(순서 목록)을 사용한다.**

---

## 기본 구조

단계 표시기는 다음 순서로 구성된다:

```
<nav aria-label="진행 단계">
  └── <ol class="step-indicator">
        ├── <li class="step-indicator-item step--completed"> — 완료 단계
        ├── <li class="step-indicator-item step--active" aria-current="step"> — 현재 단계
        └── <li class="step-indicator-item"> — 예정 단계
```

---

## 기본 HTML 마크업

단계 표시기는 `<nav>` 랜드마크로 감싸고 `aria-label`로 목적을 설명한다. `<ol>`로 순서를 전달하며, 현재 단계에 `aria-current="step"`을 적용한다:

<div class="docs-preview">
<nav aria-label="진행 단계">
  <ol class="step-indicator">
    <li class="step-indicator-item step--completed">
      <span class="step-indicator-marker" aria-hidden="true">&#10003;</span>
      <span class="step-indicator-label">약관 동의</span>
      <span class="sr-only">(완료)</span>
    </li>
    <li class="step-indicator-item step--active" aria-current="step">
      <span class="step-indicator-marker" aria-hidden="true">2</span>
      <span class="step-indicator-label">정보 입력</span>
    </li>
    <li class="step-indicator-item">
      <span class="step-indicator-marker" aria-hidden="true">3</span>
      <span class="step-indicator-label">인증</span>
    </li>
    <li class="step-indicator-item">
      <span class="step-indicator-marker" aria-hidden="true">4</span>
      <span class="step-indicator-label">가입 완료</span>
    </li>
  </ol>
</nav>
</div>

```html
<!-- 단계 표시기 -->
<nav aria-label="진행 단계">
    <ol class="step-indicator">
        <li class="step-indicator-item step--completed">
            <span class="step-indicator-marker" aria-hidden="true">✓</span>
            <span class="step-indicator-label">약관 동의</span>
            <span class="sr-only">(완료)</span>
        </li>
        <li class="step-indicator-item step--active" aria-current="step">
            <span class="step-indicator-marker" aria-hidden="true">2</span>
            <span class="step-indicator-label">정보 입력</span>
        </li>
        <li class="step-indicator-item">
            <span class="step-indicator-marker" aria-hidden="true">3</span>
            <span class="step-indicator-label">인증</span>
        </li>
        <li class="step-indicator-item">
            <span class="step-indicator-marker" aria-hidden="true">4</span>
            <span class="step-indicator-label">가입 완료</span>
        </li>
    </ol>
</nav>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `aria-current="step"` | — | 현재 활성 단계임을 보조 기기에 전달 |
| `aria-label="진행 단계"` | — | `<nav>` 랜드마크의 목적을 보조 기기에 설명 |
| `aria-hidden="true"` | — | 장식용 마커(숫자, 체크 아이콘)를 보조 기기에서 숨김 |
| `.sr-only` | — | 완료 상태 텍스트를 스크린리더에만 전달 |

- `aria-current="step"` — 이 속성이 없으면 스크린리더 사용자가 4개 목록 항목 중 어디가 현재 단계인지 알 수 없다.
- `<ol>` — 순서 목록을 사용해야 스크린리더가 "4개 항목 중 2번째"처럼 위치 정보를 전달한다.

---

## 접근성 체크리스트

단계 표시기 마크업 검수 시 아래 항목을 확인한다.

- [ ] `<ol>` 순서 목록 사용 (순서가 의미 있는 콘텐츠)
- [ ] `<nav>` 랜드마크로 감싸고 `aria-label` 적용
- [ ] 현재 단계에 `aria-current="step"` 적용
- [ ] 완료 단계에 `.sr-only` "(완료)" 텍스트 제공
- [ ] 장식용 마커에 `aria-hidden="true"` 적용
- [ ] 색상만으로 상태 구분하지 않음 — 텍스트/아이콘 병행 (KWCAG 1.4.1)
- [ ] 단계 전환 시 `aria-current` 속성 올바르게 이동
- [ ] 포커스 인디케이터 동작 확인 (클릭 가능한 단계일 경우)

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_step-indicator.scss` | 단계 표시기 스타일, 상태별 색상, 연결선 |
| `scss/5-objects/_sr-only.scss` | 스크린리더 전용 숨김 클래스 |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--color-primary`, `--color-text-muted` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Step indicator (단계 표시기)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<ol>` 순서 목록 | 필수 | ✅ |
| `aria-current="step"` | 필수 — 현재 단계 | ✅ |
| `<nav>` + `aria-label` | 필수 — 랜드마크 식별 | ✅ |
| 완료 상태 전달 | 필수 — 스크린리더 인식 | ✅ `.sr-only` "(완료)" |
| 색상 + 텍스트 병행 | 필수 — 색상만 의존 금지 | ✅ |
| 반응형 처리 | 권장 — 모바일 축약 표시 | ✅ CSS 처리 |

> **참고:** KRDS에서는 단계가 5개 이상일 경우 모바일에서 현재 단계와 전체 개수만 표시하는 축약 형태를 권장한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Step indicator <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 단계 표시기 명세
- <a href="https://www.w3.org/TR/wai-aria-1.2/#aria-current" target="_blank" rel="noopener" title="새 창으로 열림">W3C APG — aria-current <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 1.3.1 정보와 관계 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.2 이름, 역할, 값 <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-current" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-current <span class="sr-only">(새 창)</span></a>
