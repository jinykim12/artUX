---
layout: layouts/base.njk
title: 공식 배너
tags: components
section: components
permalink: /components/masthead/
---

# 공식 배너 (COMP-20)

**KWCAG 2.1 기준:** 1.3.1 정보와 관계, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-31

> 공식 배너(Masthead) 컴포넌트는 정부 공식 웹사이트임을 식별하는 최상단 얇은 바이다.
> KWCAG 2.1 AA 접근성 기준(role="banner" 맥락, 의미 있는 텍스트 제공)을 준수한다.
> CSS 클래스명은 `scss/6-components/_masthead.scss`와 일치시킨다.

**규칙: 공식 배너는 페이지 최상단에 배치하며, 정부 공식 사이트임을 사용자에게 명확히 전달해야 한다. `<header>` 태그 바깥(위)에 배치하여 사이트 헤더와 구분한다.**

---

## 기본 구조

공식 배너는 다음 순서로 구성된다:

```
<div class="masthead" role="region" aria-label="공식 사이트 안내">
  └── <div class="masthead-inner">
        ├── <img> — 정부 마크 (국가 문장)
        ├── <span class="masthead-text"> — 공식 사이트 안내 텍스트
        └── <button> — 상세 안내 토글 (선택)
              └── <div class="masthead-detail"> — 상세 안내 패널
```

---

## 기본 HTML 마크업

공식 배너는 `<header>` 태그보다 위에 배치한다. `role="region"`과 `aria-label`로 보조 기기에 영역 목적을 전달한다:

<div class="docs-preview">
<div class="masthead d-flex align-items-center gap-2 rounded px-3 py-2" role="region" aria-label="공식 사이트 안내" style="background:#13183f; color:#ffffffcc;">
  <div class="masthead-inner d-flex align-items-center gap-2">
    <span class="masthead-logo fw-bold text-white d-inline-flex align-items-center gap-1" aria-label="대한민국 정부">&#9733; 대한민국 정부</span>
    <span class="masthead-text">이 누리집은 대한민국 공식 전자정부 누리집입니다.</span>
  </div>
</div>
</div>

```html
<!-- 공식 배너 — 페이지 최상단 -->
<div class="masthead" role="region" aria-label="공식 사이트 안내">
    <div class="masthead-inner">
        <img src="/images/gov-mark.svg" alt="대한민국 정부" class="masthead-logo" width="24" height="24">
        <span class="masthead-text">이 누리집은 대한민국 공식 전자정부 누리집입니다.</span>
    </div>
</div>

<!-- 사이트 헤더 — 공식 배너 아래 -->
<header class="header">
    <!-- GNB 등 -->
</header>
```

상세 안내가 필요한 경우 토글 패널을 추가한다:

```html
<!-- 공식 배너 — 상세 안내 포함 -->
<div class="masthead" role="region" aria-label="공식 사이트 안내">
    <div class="masthead-inner">
        <img src="/images/gov-mark.svg" alt="대한민국 정부" class="masthead-logo" width="24" height="24">
        <span class="masthead-text">이 누리집은 대한민국 공식 전자정부 누리집입니다.</span>
        <button type="button" class="masthead-toggle" aria-expanded="false" aria-controls="masthead-detail">안내 보기</button>
    </div>
    <div class="masthead-detail" id="masthead-detail" hidden>
        <p>공식 누리집 주소는 <strong>.go.kr</strong>로 끝납니다.</p>
        <p>정부 누리집에서는 https:// 보안연결을 사용합니다.</p>
    </div>
</div>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `role="region"` | — | 공식 배너가 독립적인 콘텐츠 영역임을 보조 기기에 전달 |
| `aria-label="공식 사이트 안내"` | — | 영역의 목적을 보조 기기에 설명 |
| `aria-expanded="true/false"` | — | 상세 안내 패널 열림/닫힘 상태 전달 (토글 포함 시) |
| `aria-controls` | 상세 패널의 `id` | 토글 버튼이 제어하는 패널을 연결 (토글 포함 시) |
| `hidden` | — | 닫힌 상세 패널을 보조 기기와 시각적으로 모두 숨김 |

- `role="region"` + `aria-label` — 이 조합으로 스크린리더 사용자가 랜드마크 탐색 시 "공식 사이트 안내, 영역"으로 인식한다.
- `<header>` 바깥 배치 — 공식 배너는 사이트 헤더(`role="banner"`)와 별개의 영역이므로 `<header>` 태그 바깥에 배치한다.

---

## 접근성 체크리스트

공식 배너 마크업 검수 시 아래 항목을 확인한다.

- [ ] `role="region"` + `aria-label` 적용
- [ ] 정부 마크 이미지에 `alt` 텍스트 제공 ("대한민국 정부")
- [ ] 공식 사이트 안내 텍스트가 시각적으로 표시됨
- [ ] `<header>` 태그 바깥(위)에 배치
- [ ] 상세 안내 토글 포함 시 `aria-expanded` + `aria-controls` 적용
- [ ] 닫힌 상세 패널에 `hidden` 속성 적용
- [ ] 포커스 인디케이터 동작 확인 (토글 버튼)
- [ ] 텍스트/배경 대비비 4.5:1 이상 확인

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_masthead.scss` | 공식 배너 스타일, 최상단 고정, 배경색 |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--color-masthead-bg`, `--color-masthead-text` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Masthead (공식 배너)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| 최상단 배치 | 필수 — `<header>` 위 | ✅ |
| 정부 마크 표시 | 필수 — 국가 문장 | ✅ `alt` 텍스트 포함 |
| 공식 사이트 텍스트 | 필수 — "공식 전자정부 누리집" 안내 | ✅ |
| `.go.kr` 안내 | 권장 — 도메인 안내 | ✅ 상세 패널 |
| https 안내 | 권장 — 보안연결 안내 | ✅ 상세 패널 |
| 얇은 바 형태 | 필수 — 최소 높이, 차분한 배경색 | ✅ |

> **참고:** KRDS에서는 공공기관 웹사이트에 Masthead 배치를 필수로 요구한다. 배경색은 짙은 회색 또는 남색 계열을 권장한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Masthead <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 공식 배너 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 1.3.1 정보와 관계 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.2 이름, 역할, 값 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/region.html" target="_blank" rel="noopener" title="새 창으로 열림">W3C APG — Region Landmark <span class="sr-only">(새 창)</span></a>
- <a href="https://www.mois.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">전자정부 웹사이트 가이드라인 <span class="sr-only">(새 창)</span></a> — 행정안전부 전자정부 표준 프레임워크
