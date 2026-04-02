---
layout: layouts/base.njk
title: 디자인 토큰
section: tokens
permalink: /tokens/
---

# 디자인 토큰

**Bootstrap 5 CSS 변수(`--bs-*`)를 그대로 사용한다.** 커스텀 토큰을 별도로 정의하지 않는다.

색상을 바꾸고 싶으면 `_vendor.scss`에서 Bootstrap Sass 변수(`$primary` 등)를 수정하면 `--bs-*` CSS 변수가 자동 반영된다.

---

## 색상

Bootstrap이 컴파일 시 생성하는 CSS 변수를 직접 사용한다.

| Bootstrap 변수 | 기본값 | 사용 상황 |
|---------------|--------|-----------|
| `var(--bs-primary)` | `#0d6efd` | 주요 버튼, 링크, 포커스 아웃라인, 브랜드 강조 |
| `var(--bs-secondary)` | `#6c757d` | 보조 버튼, 배지, 덜 중요한 UI |
| `var(--bs-success)` | `#198754` | 성공 상태, 완료 배지 |
| `var(--bs-danger)` | `#dc3545` | 오류 메시지, 삭제 버튼 |
| `var(--bs-warning)` | `#ffc107` | 경고 상태 |
| `var(--bs-info)` | `#0dcaf0` | 정보 안내 |
| `var(--bs-body-color)` | `#212529` | 기본 본문 텍스트 |
| `var(--bs-secondary-color)` | `#6c757d` | 부차 설명, 힌트 텍스트 |
| `var(--bs-body-bg)` | `#ffffff` | 페이지/카드/모달 배경 |
| `var(--bs-border-color)` | `#dee2e6` | 테두리, 구분선 |
| `var(--bs-tertiary-bg)` | `#f8f9fa` | 연한 배경 (hover, 활성 상태) |

### 색상 스워치

<div class="docs-preview">
<div class="d-flex gap-2 flex-wrap">
  <div class="rounded border" title="--bs-primary"><span class="d-block bg-primary rounded" style="width:48px;height:48px;"></span></div>
  <div class="rounded border" title="--bs-secondary"><span class="d-block bg-secondary rounded" style="width:48px;height:48px;"></span></div>
  <div class="rounded border" title="--bs-success"><span class="d-block bg-success rounded" style="width:48px;height:48px;"></span></div>
  <div class="rounded border" title="--bs-danger"><span class="d-block bg-danger rounded" style="width:48px;height:48px;"></span></div>
  <div class="rounded border" title="--bs-warning"><span class="d-block bg-warning rounded" style="width:48px;height:48px;"></span></div>
  <div class="rounded border" title="--bs-info"><span class="d-block bg-info rounded" style="width:48px;height:48px;"></span></div>
</div>
</div>

### SCSS에서 사용

```scss
// Bootstrap 변수 직접 사용
.form-error {
    color: var(--bs-danger);
}

.skip-nav:focus {
    background: var(--bs-primary);
    outline: 2px solid var(--bs-primary);
}
```

### 색상 커스터마이징

프로젝트 브랜드 색상이 다를 때 `scss/3-generic/_vendor.scss` **한 곳만 수정**하면 전체 반영된다.

**수정 파일:** `scss/3-generic/_vendor.scss`

```scss
// _vendor.scss — 여기만 바꾸면 전체 반영
$primary:   #1a73e8;   // 메인 브랜드 색상
$secondary: #5f6368;   // 보조 색상
$success:   #198754;   // 성공 상태 (기본값 유지 가능)
$danger:    #dc3545;   // 오류 상태 (기본값 유지 가능)
$warning:   #ffc107;   // 경고 상태 (기본값 유지 가능)
$info:      #0dcaf0;   // 정보 안내 (기본값 유지 가능)
```

**반영 범위** — `$primary`를 `#1a73e8`로 바꾸면:

| 자동 변경되는 것 | 예시 |
|-----------------|------|
| CSS 변수 | `--bs-primary` → `#1a73e8` |
| 버튼 | `.btn-primary` 배경색 |
| 배경 | `.bg-primary` |
| 텍스트 | `.text-primary` |
| 테두리 | `.border-primary` |
| 배지 | `.badge.bg-primary` |
| 아웃라인 버튼 | `.btn-outline-primary` |
| 포커스 링 | `:focus-visible` 아웃라인 |

**실전 예시 — 공공기관 A (파란색 브랜드):**

```scss
$primary: #005bac;  // 기관 CI 색상
```

**실전 예시 — 공공기관 B (초록색 브랜드):**

```scss
$primary: #00843d;  // 기관 CI 색상
```

**추가 색상이 필요한 경우:**

Bootstrap 기본 6색(primary~info) 외에 프로젝트 전용 색상이 필요하면 `_vendor.scss`에 Bootstrap 커스텀 컬러를 추가한다:

```scss
// _vendor.scss — 커스텀 색상 추가
$custom-colors: (
    "brand":  #ff6b00,
    "accent": #6f42c1,
);

// Bootstrap 색상맵에 병합
$theme-colors: map-merge($theme-colors, $custom-colors);
```

이렇게 하면 `.btn-brand`, `.bg-brand`, `.text-brand` 등 Bootstrap 유틸리티가 자동 생성된다.

> **규칙: 색상은 항상 `_vendor.scss`에서 Bootstrap Sass 변수로 관리한다. CSS에 `color: #005bac` 같은 하드코딩을 하지 않는다.**

---

## 타이포그래피

Bootstrap 기본 폰트 크기 체계를 사용한다.

| 값 | 픽셀 | 사용 상황 |
|----|------|-----------|
| `0.75rem` | 12px | 매우 작은 텍스트 (배지, 보조 레이블) |
| `0.875rem` | 14px | 작은 텍스트 (캡션, 힌트, 테이블 셀) |
| `1rem` | 16px | 기본 본문 (Bootstrap `$font-size-base`) |
| `1.25rem` | 20px | Bootstrap `$font-size-lg`, `$h5-font-size` |
| `1.5rem` | 24px | Bootstrap `$h4-font-size` |
| `1.75rem` | 28px | Bootstrap `$h3-font-size` |
| `2rem` | 32px | Bootstrap `$h2-font-size` |
| `2.5rem` | 40px | Bootstrap `$h1-font-size` |

```scss
// 직접 px 값 사용 — 별도 토큰 불필요
.card-title {
    font-size: 20px;
    font-weight: 700;
}

.form-hint {
    font-size: 14px;
}
```

HTML에서는 Bootstrap 유틸리티 클래스 활용:

```html
<p class="fs-5">큰 텍스트 (1.25rem)</p>
<p class="fs-6">작은 텍스트 (1rem)</p>
<p class="small">더 작은 텍스트 (0.875rem)</p>
<p class="fw-bold">굵은 텍스트</p>
```

| Bootstrap 클래스 | 크기 |
|-----------------|------|
| `.fs-1` | 2.5rem |
| `.fs-2` | 2rem |
| `.fs-3` | 1.75rem |
| `.fs-4` | 1.5rem |
| `.fs-5` | 1.25rem |
| `.fs-6` | 1rem |
| `.small` | 0.875em |

---

## 간격

Bootstrap 간격 유틸리티(`p-*`, `m-*`, `gap-*`)를 사용한다. 커스텀 SCSS에서는 px 직접 사용.

| Bootstrap 유틸리티 | 값 | 픽셀 |
|-------------------|-----|------|
| `p-1`, `m-1`, `gap-1` | 0.25rem | 4px |
| `p-2`, `m-2`, `gap-2` | 0.5rem | 8px |
| `p-3`, `m-3`, `gap-3` | 1rem | 16px |
| `p-4`, `m-4`, `gap-4` | 1.5rem | 24px |
| `p-5`, `m-5`, `gap-5` | 3rem | 48px |

```html
<!-- HTML — Bootstrap 유틸리티 사용 -->
<div class="p-3 mb-4 gap-2">콘텐츠</div>
```

```scss
// SCSS — px 직접 사용
.header__inner {
    padding: 0 20px;
}
```

---

## 그림자

| Bootstrap 변수 | 사용 상황 |
|---------------|-----------|
| `var(--bs-box-shadow-sm)` | 카드, 작은 요소 |
| `var(--bs-box-shadow)` | 모달, 드롭다운 |
| `var(--bs-box-shadow-lg)` | 대형 오버레이 |

HTML에서는 Bootstrap 클래스 사용:

```html
<div class="shadow-sm">작은 그림자</div>
<div class="shadow">기본 그림자</div>
<div class="shadow-lg">큰 그림자</div>
```

---

## z-index

Bootstrap 기본 z-index 체계를 따른다.

| 값 | Bootstrap 용도 |
|----|---------------|
| `1000` | 드롭다운 |
| `1020` | Sticky 요소 |
| `1030` | Fixed 요소 (FAB 등) |
| `1040` | 모달 백드롭 |
| `1050` | 모달 |
| `1060` | 팝오버 |
| `1070` | 툴팁 |

---

## 접근성 — 터치 영역

WCAG 2.5.8 기준 모든 인터랙티브 요소의 터치 영역은 **최소 44×44px**을 보장한다.

```scss
// 아이콘 전용 버튼 — 44px 정사각형
.btn--icon {
    min-width: 44px;
    min-height: 44px;
}
```

> **규칙: Bootstrap 버튼은 기본 높이가 44px에 근접하므로 별도 설정이 불필요하다. 아이콘 전용 버튼처럼 텍스트가 없는 요소만 `min-width`/`min-height`로 보장한다.**
