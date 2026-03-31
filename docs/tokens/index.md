---
layout: layouts/base.njk
title: 디자인 토큰
section: tokens
permalink: /tokens/
---

# 디자인 토큰

CSS Custom Properties(변수)로 정의된 팀 공통 디자인 토큰. `:root`에서 선언되며 Bootstrap 변수와 병행 운용한다. 프로젝트별로 `:root` 재선언을 통해 오버라이드할 수 있다.

> **왜 디자인 토큰을 사용하는가?**
> 색상이나 간격을 하드코딩하면 공공기관 A 프로젝트에서 `#005a9c`를 `#0d6efd`로 바꿀 때 파일 전체를 검색·치환해야 한다. 토큰을 사용하면 `_root.scss`의 `:root` 블록 한 곳만 수정하면 전체 UI에 즉시 반영된다.

---

## 색상 토큰

각 토큰이 어느 상황에 쓰이는지 "언제 이 토큰을 쓰는가"를 함께 확인한다.

| 토큰 | 기본값 | 사용 상황 |
|------|--------|-----------|
| `--color-primary` | `#0d6efd` | 주요 CTA 버튼, 링크 색상, 포커스 아웃라인, 브랜드 강조 요소에 사용 |
| `--color-secondary` | `#6c757d` | 보조 버튼, 배지(badge), 덜 중요한 UI 요소에 사용 |
| `--color-text` | `#212529` | 기본 본문 텍스트 전체에 사용 — 제목, 단락, 레이블 |
| `--color-text-muted` | `#6c757d` | 부차적인 설명 텍스트, 플레이스홀더, 힌트 문구에 사용 |
| `--color-bg` | `#ffffff` | 페이지 배경, 카드 배경, 모달 배경 등 흰 바탕이 필요한 곳에 사용 |
| `--color-border` | `#dee2e6` | 카드·폼·테이블의 테두리 및 구분선에 사용 |
| `--color-error` | `#dc3545` | 폼 유효성 실패 메시지, 오류 상태 아이콘, 알림에 사용 |
| `--color-success` | `#198754` | 폼 제출 성공, 완료 상태 배지, 긍정적 피드백에 사용 |

### 색상 스워치 미리보기

<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:1rem 0;">
  <div style="width:60px;height:60px;background:var(--color-primary,#0d6efd);border:1px solid #dee2e6;border-radius:.25rem;" title="--color-primary"></div>
  <div style="width:60px;height:60px;background:var(--color-secondary,#6c757d);border:1px solid #dee2e6;border-radius:.25rem;" title="--color-secondary"></div>
  <div style="width:60px;height:60px;background:var(--color-error,#dc3545);border:1px solid #dee2e6;border-radius:.25rem;" title="--color-error"></div>
  <div style="width:60px;height:60px;background:var(--color-success,#198754);border:1px solid #dee2e6;border-radius:.25rem;" title="--color-success"></div>
</div>

### 색상 사용 예시

아래 코드는 하드코딩 대신 색상 토큰을 사용하는 올바른 패턴이다.

```scss
/* 오류 메시지 컴포넌트 — error/success 토큰 사용 */
.form__error-msg {
  color: var(--color-error);      /* 오류 상태: 빨간 텍스트 */
}

.form__success-msg {
  color: var(--color-success);    /* 성공 상태: 초록 텍스트 */
}

/* 기본 본문 텍스트 — text/text-muted 구분 사용 */
.card__title {
  color: var(--color-text);       /* 주 텍스트: 진한 색 */
}

.card__desc {
  color: var(--color-text-muted); /* 부차 설명: 흐린 색 */
}
```

---

## 타이포그래피 토큰

폰트 관련 값은 모두 토큰으로 관리한다. 브라우저 기본값이 변해도, 또는 프로젝트 기본 폰트 크기를 조정해도 토큰 하나만 바꾸면 된다.

| 토큰 | 기본값 | 사용 상황 |
|------|--------|-----------|
| `--font-size-xs` | `1.1rem` (11px) | 보조 레이블, 뱃지 텍스트 등 매우 작은 글씨가 필요한 곳에 사용 |
| `--font-size-sm` | `1.3rem` (13px) | 캡션, 힌트 텍스트, 테이블 셀 등 작은 글씨가 필요한 곳에 사용 |
| `--font-size-base` | `1.6rem` (16px) | 단락 텍스트, 레이블, 기본 UI 텍스트에 사용 |
| `--font-size-md` | `1.9rem` (19px) | 소제목, 강조 본문 등 기본보다 약간 큰 텍스트에 사용 |
| `--font-size-lg` | `2.2rem` (22px) | 카드 제목, 섹션 서브타이틀 등 강조가 필요한 중간 크기 텍스트에 사용 |
| `--font-size-xl` | `2.8rem` (28px) | 페이지 부제목, 주요 섹션 제목에 사용 |
| `--font-size-2xl` | `3.6rem` (36px) | 페이지 주 제목, 히어로 헤드라인에 사용 |
| `--leading-normal` | `1.5` | 모든 기본 텍스트 줄 간격. 한국어 가독성에 최적화된 값 |

> **주의:** 폰트 패밀리는 `_font.scss`에서 직접 설정한다 — 공공기관 납품 시 `Pretendard GOV`, 일반 프로젝트는 `Noto Sans KR` 사용.

### 타이포그래피 사용 예시

아래 코드는 폰트 크기를 하드코딩하지 않고 토큰으로 관리하는 패턴이다.

```scss
/* 카드 컴포넌트 텍스트 계층 */
.card__label {
  font-size: var(--font-size-sm);   /* 캡션 레이블: 13px */
  color: var(--color-text-muted);
}

.card__title {
  font-size: var(--font-size-lg);   /* 카드 제목: 22px */
  color: var(--color-text);
}

.card__body {
  font-size: var(--font-size-base);   /* 기본 본문: 16px */
  line-height: var(--leading-normal);
}
```

---

## 간격 토큰

Bootstrap `$spacers` 맵 기반 CSS Custom Properties. Bootstrap의 `mt-3`, `p-3` 등 유틸리티와 동일한 스케일을 공유한다.

| 토큰 | 값 | 픽셀 환산 | 사용 상황 |
|------|----|-----------|-----------|
| `--spacing-xs` | `0.4rem` | 4px | 아이콘과 텍스트 사이 최소 여백, 배지 내부 패딩 |
| `--spacing-sm` | `0.8rem` | 8px | 버튼 내부 세로 패딩, 인라인 요소 간 간격 |
| `--spacing-md` | `2.0rem` | 20px | 카드 내부 패딩, 폼 필드 간격 등 **일반적인 요소 간격** — 가장 자주 사용 |
| `--spacing-lg` | `2.8rem` | 28px | 섹션 내부 여백, 카드 간 간격, 폼 그룹 간격 |
| `--spacing-xl` | `3.2rem` | 32px | 컴포넌트 간 넉넉한 여백, 그리드 갭 |
| `--spacing-2xl` | `4.8rem` | 48px | 섹션 간 큰 여백, 히어로 섹션 상하 패딩 등 넉넉한 공간이 필요한 곳 |
| `--spacing-3xl` | `6.4rem` | 64px | 페이지 최상단/최하단 대형 여백 |

### 간격 사용 예시

아래 코드는 간격 토큰을 컴포넌트 패딩과 레이아웃 여백에 사용하는 패턴이다.

```scss
/* 카드 컴포넌트 — 내부 패딩은 spacing-md (20px) */
.card__body {
  padding: var(--spacing-md);
}

/* 폼 필드 간 간격 — spacing-md (20px) */
.form__group + .form__group {
  margin-top: var(--spacing-md);
}

/* 섹션 간 큰 여백 — spacing-2xl (48px) */
.section {
  padding-top: var(--spacing-2xl);
  padding-bottom: var(--spacing-2xl);
}
```

---

## 터치 영역 토큰

인터랙티브 요소의 최소 터치 영역을 토큰으로 관리한다. WCAG 2.5.8(최소 크기) 및 KWCAG 모바일 접근성 기준을 만족하기 위해, 버튼·체크박스·라디오·탭 등 모든 인터랙티브 요소는 아래 최솟값을 보장해야 한다.

| 토큰 | 값 | 사용 상황 |
|------|----|-----------|
| `--touch-target-min` | `4.4rem (44px)` | 버튼, 탭, 체크박스, 라디오, 슬라이더 컨트롤 등 터치/클릭 가능한 모든 인터랙티브 요소의 최소 크기 (WCAG 2.5.8) |

> **규칙: 모든 인터랙티브 요소의 터치 영역은 최소 44×44px을 보장해야 한다.** 시각적으로 작게 표시되더라도 `min-width`/`min-height` 또는 패딩으로 실제 터치 가능 영역을 44px 이상으로 확보한다.

```scss
/* 터치 영역 최솟값 보장 — WCAG 2.5.8 */
.btn {
  min-height: var(--touch-target-min); /* 44px */
}

.form-check-input {
  min-width: var(--touch-target-min);  /* 44px */
  min-height: var(--touch-target-min); /* 44px */
}
```

---

## 전체 사용 예시

아래 코드는 색상·타이포그래피·간격 토큰을 모두 활용한 컴포넌트 예시다. 하드코딩 값이 하나도 없음에 주목한다.

```scss
/* 모든 값을 토큰으로 관리한 컴포넌트 */
.component {
  color: var(--color-text);
  background: var(--color-bg);
  padding: var(--spacing-md);
  font-size: var(--font-size-base);
  border: 1px solid var(--color-border);
}
```

---

## 프로젝트별 오버라이드 방법

공공기관마다 브랜드 컬러가 다르다. `_root.scss`의 `:root` 블록을 프로젝트 진입 CSS 파일에서 재선언하면 전체 UI 색상을 한 번에 교체할 수 있다.

아래 코드는 공공기관 브랜드 컬러로 primary 색상을 교체하는 예시다.

```css
/* 프로젝트 진입 CSS — 기관 브랜드 컬러로 토큰 오버라이드 */
:root {
  --color-primary: #005a9e; /* 공공기관 브랜드 컬러로 교체 */
}
```

> **폰트 패밀리 설정:** `--font-family-base`는 CSS Custom Property 토큰이 아닌 `_font.scss`에서 직접 선언한다. 공공기관 납품 시 `Pretendard GOV`, 일반 프로젝트는 `Noto Sans KR`로 변경한다.

이 한 곳만 바꾸면 버튼, 링크, 포커스 아웃라인, 강조 테두리 등 `--color-primary`를 참조하는 모든 요소가 동시에 변경된다.
