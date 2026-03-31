---
layout: layouts/base.njk
title: 배지
tags: components
section: components
permalink: /components/badge/
---

# 배지 (COMP-13)

**KWCAG 2.1 기준:** 1.4.1 색의 사용, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-31

> 배지 컴포넌트는 상태, 카운트, 카테고리 등을 인라인으로 표시하는 라벨이다.
> KWCAG 2.1 AA 접근성 기준(색상만으로 정보 전달 금지, 스크린리더 맥락 제공)을 준수한다.
> CSS 클래스명은 `scss/6-components/_badge.scss`와 일치시킨다.

**규칙: 배지의 의미를 색상만으로 전달하면 안 된다. 텍스트 또는 `.sr-only` 보조 텍스트로 맥락을 반드시 제공해야 한다 (KWCAG 1.4.1).**

---

## 기본 구조

배지는 다음 순서로 구성된다:

```
<span class="badge">
  ├── <span class="sr-only"> — 스크린리더 전용 맥락 텍스트 (필요시)
  └── 표시 텍스트
```

---

## 기본 HTML 마크업

배지는 `<span>` 태그로 인라인 표시한다. 색상이 의미를 가지는 경우 `.sr-only` 텍스트로 스크린리더에 맥락을 전달한다:

<div class="docs-preview">
<span class="badge bg-primary">기본</span>
<span class="badge bg-success">완료</span>
<span class="badge bg-danger">오류</span>
<span class="badge bg-warning text-dark">주의</span>
<span class="badge bg-info">정보</span>
<span class="badge rounded-pill bg-primary">알림 <span class="sr-only">건수</span>5</span>
</div>

```html
<!-- 기본 배지 -->
<span class="badge bg-primary">기본</span>

<!-- 상태 배지 — 색상 + 텍스트로 의미 전달 -->
<span class="badge bg-success">완료</span>
<span class="badge bg-danger">오류</span>
<span class="badge bg-warning text-dark">주의</span>
<span class="badge bg-info">정보</span>

<!-- 둥근 알약형 배지 (rounded-pill) -->
<span class="badge rounded-pill bg-primary">알림 <span class="sr-only">건수</span>5</span>

<!-- 카운트 배지 — sr-only로 맥락 제공 -->
<span class="badge bg-primary">
    <span class="sr-only">읽지 않은 알림</span>
    3
</span>

<!-- 링크/버튼 내부 배지 — 부모 요소의 맥락 활용 -->
<a href="/notifications">
    알림
    <span class="badge bg-danger">
        <span class="sr-only">건수</span>
        5
    </span>
</a>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `.sr-only` | — | 시각적으로 숨기되 스크린리더가 읽을 수 있는 텍스트 제공 |
| `aria-hidden="true"` | — | 장식용 아이콘이 포함된 경우 보조 기기에서 숨김 |
| `aria-label` | — | 배지 단독 사용 시 전체 맥락을 직접 제공 (대안) |

- `.sr-only` — 숫자만 표시되는 카운트 배지에 "읽지 않은 알림"과 같은 맥락 텍스트를 추가하여 스크린리더 사용자가 숫자의 의미를 이해할 수 있게 한다.
- 색상만으로 상태를 구분하면 색각 이상 사용자가 정보를 파악할 수 없다. 반드시 텍스트("승인", "반려" 등)를 함께 표시한다.

---

## 접근성 체크리스트

배지 마크업 검수 시 아래 항목을 확인한다.

- [ ] 색상만으로 의미 전달하지 않음 — 텍스트 병행 (KWCAG 1.4.1)
- [ ] 카운트 배지에 `.sr-only`로 맥락 텍스트 제공
- [ ] 배지 텍스트 색상과 배경 색상의 대비비 4.5:1 이상 (KWCAG 1.4.3)
- [ ] 장식용 아이콘에 `aria-hidden="true"` 적용
- [ ] 배지가 링크/버튼 내부에 있을 때 부모 요소의 접근 가능한 이름이 명확한지 확인
- [ ] 동적 카운트 변경 시 `aria-live` 영역 고려 (선택)

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_badge.scss` | 배지 컴포넌트 스타일, 시맨틱 색상 변형 |
| `scss/5-objects/_sr-only.scss` | 스크린리더 전용 숨김 클래스 |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--color-success`, `--color-danger` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Badge (배지)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| 색상 + 텍스트 병행 | 필수 — 색상만으로 의미 전달 금지 | ✅ |
| 대비비 4.5:1 | 필수 — 텍스트/배경 명도 대비 | ✅ |
| 스크린리더 맥락 | 필수 — 카운트 배지 맥락 제공 | ✅ `.sr-only` |
| 시맨틱 색상 | 권장 — 성공/경고/오류/정보 | ✅ 클래스 변형 |
| 인라인 배치 | 권장 — 텍스트 흐름 내 배치 | ✅ `<span>` 사용 |

> **참고:** KRDS에서는 배지 크기를 소(sm), 중(md), 대(lg)로 구분한다. artpqUX에서는 `badge-sm`, `badge-lg` 클래스로 크기를 조절한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Badge <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 배지 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 1.4.1 색의 사용 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.2 이름, 역할, 값 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 1.4.3 최소 대비 <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-hidden" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-hidden <span class="sr-only">(새 창)</span></a>
