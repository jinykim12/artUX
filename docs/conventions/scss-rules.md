---
layout: layouts/base.njk
title: SCSS 작성 규칙
tags: conventions
section: conventions
permalink: /conventions/scss-rules/
---

# SCSS 작성 규칙

아트피큐 팀 SCSS 파일 작성 표준. 모든 팀원이 동일한 구조로 SCSS 파일을 작성할 수 있도록 명문화한다.

> **왜 SCSS 규칙이 필요한가?**
> SCSS는 자유도가 높아서 작성자마다 구조가 달라지기 쉽다. 규칙 없이 작성하면 중첩이 깊어져 CSS 명시도 문제가 생기고, 속성 순서가 제멋대로여서 리뷰가 어려워진다. 팀 전체가 같은 규칙을 따르면 다른 사람이 작성한 파일도 즉시 읽을 수 있다.

---

## 1. 계층형 중첩 코딩 (팀 표준)

SCSS는 **계층형 중첩** 방식으로 작성한다. HTML 구조를 SCSS에 그대로 반영하여, 코드만 보고도 마크업 구조를 파악할 수 있게 한다.

계층형 코딩의 장점: (1) HTML 구조와 SCSS 구조가 1:1 대응이라 파일을 찾기 쉽다, (2) 부모-자식 관계가 시각적으로 드러나 코드 리뷰가 빠르다, (3) `&` 결합자로 BEM 수정자와 상태를 같은 블록에 묶을 수 있다.

✅ 팀 표준: 계층형 중첩 — HTML 구조를 SCSS에 그대로 반영한다
```scss
/* 헤더 컴포넌트 — HTML 구조를 계층형으로 반영 */
.header {
    background: var(--color-bg);
    padding: var(--spacing-md);

    &__inner {
        display: flex;
        align-items: center;
        max-width: 1280px;
        margin: 0 auto;
    }

    &__logo {
        flex-shrink: 0;

        img {
            height: 40px;
        }
    }

    &__gnb {
        margin-left: auto;

        .gnb__item {
            display: inline-block;

            &:hover {
                color: var(--color-primary);
            }
        }
    }
}
```

### 중첩 깊이 제한: 최대 4단계

계층형으로 작성하되 **4단계를 넘기지 않는다**. 5단계 이상은 컴파일된 CSS 선택자가 지나치게 길어져 우선순위 문제가 생긴다.

❌ 나쁜 예: 5단계 중첩 — 선택자가 너무 길어진다
```scss
.header {
    .header__gnb {
        .gnb__list {
            .gnb__item {
                .gnb__link {
                    color: red; /* 5단계 — 금지 */
                }
            }
        }
    }
}
```

✅ 좋은 예: `&` 결합자로 4단계 이내 유지
```scss
.header {
    &__gnb {
        .gnb__item {
            .gnb__link {
                color: var(--color-primary); /* 4단계 — 허용 */
            }
        }
    }
}
```

> **규칙: SCSS는 계층형 중첩으로 작성한다. `&` 결합자를 활용하여 중첩 깊이를 최대 4단계 이내로 유지한다.**

### 중첩 깊이에 포함하지 않는 패턴

의사 클래스(`:hover`, `:focus-visible`), 의사 요소(`::after`), BEM 수정자(`&--modifier`), 미디어쿼리(`@include respond-to`)는 논리적으로 같은 블록에 속하므로 중첩 깊이 계산에서 제외한다.

아래 코드는 깊이 계산에 포함하지 않는 패턴 세 가지를 보여준다.

```scss
/* 의사 클래스/의사 요소 — 깊이 미포함 */
.btn {
    &:hover { opacity: .9; }
    &:focus-visible { outline: 2px solid var(--color-primary); }
    &::after { content: ''; }
}

/* 수정자 — 같은 블록의 변형이므로 깊이 미포함 */
.card {
    &--featured {
        border-color: var(--color-primary);
    }
}

/* 미디어쿼리 — 같은 블록에서 반응형 처리 */
.component {
    font-size: 1rem;

    @include respond-to(pc) {
        font-size: 1.25rem;
    }
}
```

---

## 2. 속성 순서 (5그룹)

SCSS 속성은 아래 5그룹 순서로 작성한다. 그룹 간 빈 줄로 구분한다.

속성 순서를 통일하면 리뷰어가 "포지셔닝 속성이 어디 있지?"를 찾는 시간을 없앨 수 있다. "레이아웃과 관련 없는 속성이 position 옆에 있다"는 혼란도 사라진다.

| 그룹 | 속성 예시 |
|------|-----------|
| 1. 포지셔닝 | `position`, `top`, `right`, `bottom`, `left`, `z-index` |
| 2. 박스 모델 | `display`, `width`, `height`, `padding`, `margin`, `overflow` |
| 3. 타이포그래피 | `font-family`, `font-size`, `font-weight`, `line-height`, `color`, `text-align` |
| 4. 시각 효과 | `background`, `border`, `border-radius`, `box-shadow`, `opacity`, `transition` |
| 5. 기타 | `cursor`, `pointer-events`, `user-select` |

아래 코드는 5그룹 순서를 모두 포함한 실전 예시다. 그룹 간 빈 줄 구분에 주목한다.

```scss
/* 속성 5그룹 순서 — 그룹 간 빈 줄로 구분 */
.component {
  /* 1. 포지셔닝 — 문서 흐름 밖에 있는지 여부부터 파악 */
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;

  /* 2. 박스 모델 — 공간을 얼마나 차지하는지 */
  display: flex;
  width: 100%;
  height: auto;
  padding: var(--spacing-md);
  margin: 0;
  overflow: hidden;

  /* 3. 타이포그래피 — 텍스트 표현 방식 */
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  font-weight: 400;
  line-height: var(--leading-normal);
  color: var(--color-text);
  text-align: left;

  /* 4. 시각 효과 — 색상, 테두리, 그림자 */
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: .25rem;
  box-shadow: var(--shadow-sm);
  opacity: 1;
  transition: none; /* 공공기관 납품 시 제거 */

  /* 5. 기타 — 상호작용 관련 */
  cursor: pointer;
  pointer-events: auto;
}
```

> **규칙: CSS 속성은 포지셔닝 → 박스 모델 → 타이포그래피 → 시각 효과 → 기타 순서로 작성한다. 그룹 간 빈 줄 한 줄을 삽입한다.**

---

## 3. `@use` vs `@import` 전략

### 팀 표준: `@use` 방식

Dart Sass 1.98.0 이상에서는 `@use`를 사용한다. `@import`는 Dart Sass에서 deprecated(지원 중단 예정)이다.

`@use`는 `@import`와 달리 파일을 한 번만 로드하고, 네임스페이스를 통해 어디서 왔는지 명확히 알 수 있다. `@import`는 동일 파일을 여러 번 불러올 수 있어 컴파일 결과물에 중복 CSS가 생길 위험이 있다.

아래 코드는 팀 파일 간 참조 시 `@use`를 올바르게 사용하는 예시다. `as *`를 사용하면 네임스페이스 없이 믹스인을 직접 호출할 수 있다.

```scss
/* Good: @use 방식 — 네임스페이스로 출처 명확 */
@use '../2-tools/mixin' as *;
@use '../1-settings/variables' as vars;

/* as * 로 불러오면 네임스페이스 없이 직접 사용 */
@include flex(center, center); /* 믹스인 직접 호출 */
```

### Bootstrap 격리 전략

Bootstrap 5.3.x는 내부적으로 `@import`를 사용하므로 `@use`로 직접 불러올 수 없다. Bootstrap은 `scss/3-generic/_vendor.scss`에 격리하여 `@import`로만 로드한다.

아래 코드는 Bootstrap을 `_vendor.scss`에 격리한 패턴이다. Bootstrap 오버라이드 변수를 `@import` 직전에 선언한다.

```scss
/* scss/3-generic/_vendor.scss 내부 — Bootstrap @import 격리 */
$font-size-base: .9375rem; /* Bootstrap 오버라이드 변수는 @import 직전에 선언 */
@import 'bootstrap/scss/bootstrap';
```

아래 코드는 메인 `style.scss`에서 `@use` 레이어를 먼저 로드하고, Bootstrap `@import`를 마지막에 배치하는 진입점 구조다.

```scss
/* scss/style.scss — @use 계층 먼저, @import는 마지막 */
@use '1-settings' as settings;
@use '2-tools' as tools;
@use '3-generic' as generic;
@use '4-elements' as elements;
@use '6-components' as components;

/* Bootstrap (@import 격리 — @use 이후에 위치) */
@import '3-generic/vendor';
```

### 기존 `@import` 프로젝트와의 공존

| 상황 | 처리 방법 |
|------|-----------|
| 신규 파일 | `@use` 방식으로 작성 |
| 기존 `@import` 파일 | 유지 (마이그레이션은 점진적으로) |
| Bootstrap 관련 | `@import` 유지 (`_vendor.scss` 격리) |

> **규칙: `@import` → `@use` 마이그레이션은 신규 파일부터 점진적으로 전환한다. 기존 파일을 일괄 전환하지 않는다. Bootstrap은 항상 `_vendor.scss`에 격리한다.**

---

## 4. 주석 규칙

### 섹션 구분

파일 내 주요 섹션은 구분선으로 시작한다. 큰 컴포넌트 파일에서 variant별 섹션이 어디서 시작하는지 빠르게 파악할 수 있다.

아래 코드는 섹션 구분선 패턴을 보여준다. `// ====` 구분선으로 시각적 경계를 만든다.

```scss
// ============================================================
// 버튼 컴포넌트 — 기본/고스트/아이콘 variant
// ============================================================

.btn { }

// ============================================================
// 고스트 variant
// ============================================================

.btn--ghost { }
```

### 파일 상단 주석

모든 SCSS partial 파일은 첫 줄에 파일 목적을 한 줄 주석으로 작성한다. 파일을 열었을 때 즉시 목적을 알 수 있어야 한다.

```scss
// _button.scss — 버튼 컴포넌트 스타일 (기본, 고스트, 아이콘)
```

### 특수 주석 태그

| 태그 | 용도 | 납품 전 처리 |
|------|------|-------------|
| `// TODO: 내용` | 팀원 확인 필요 | 유지 가능 (이슈 추적용) |
| `// TEMP: 내용` | 임시 코드 | **반드시 제거** |
| `// DEBUG: 내용` | 디버깅 코드 | **반드시 제거** |

아래 코드는 각 태그를 언제 어떻게 쓰는지 보여주는 실전 예시다.

```scss
/* TODO: 추후 처리 필요 — 이슈 추적용으로 납품 후에도 유지 가능 */
// TODO: 고대비 모드(forced-colors) 대응 필요 — 담당자: 홍길동
.btn--ghost { }

/* TEMP: 임시 코드 — 납품 전 전체 검색 후 반드시 삭제 */
// TEMP: 디자인 수정 전 임시 값 — 납품 전 삭제
.hero { height: 600px; }

/* DEBUG: 디버그 코드 — 납품 전 전체 검색 후 반드시 삭제 */
// DEBUG: 레이아웃 확인용 — 납품 전 삭제
* { outline: 1px solid red; }
```

> **규칙: 납품 전 `TEMP:`, `DEBUG:` 태그를 전체 검색하여 남은 임시 코드를 제거한다. VS Code에서 `Ctrl+Shift+F`로 프로젝트 전체 검색.**

---

## 5. 공공기관 납품 필수 규칙

공공기관 프로젝트 납품 전 반드시 확인하는 SCSS 규칙.

### 애니메이션/전환 제거

공공기관 접근성 기준(KWCAG 2.1)은 전정기관 장애 사용자를 위해 화면 움직임을 제한한다. 깜빡임이나 슬라이딩 전환이 있으면 검수에서 지적된다. 납품 직전 `transition` / `animation` 값을 `none`으로 일괄 처리한다.

아래 코드는 납품 전 전환/애니메이션을 비활성화하는 패턴이다.

```scss
/* 납품 전: 전체 제거 대상 */
.component {
  transition: none; /* Phase 09 결정 상속 */
}

.modal {
  animation: none; /* 동일 원칙 적용 */
}

/* 슬라이더(.swiper-slide)도 동일 */
.swiper-slide {
  transition: none; /* Phase 09-02 결정 */
}
```

> **규칙: 공공기관 납품 전 `transition`, `animation` 속성 값을 `none`으로 일괄 처리한다. 프로젝트 전체에서 `transition:` 을 검색하여 빠진 항목이 없는지 확인한다.**

### CSS Custom Properties 우선 사용

하드코딩 값은 프로젝트별 테마 오버라이드를 불가능하게 만든다. 공공기관마다 브랜드 컬러가 다르므로, 모든 색상을 토큰으로 관리해야 `:root` 한 곳에서 전체 교체가 가능하다.

❌ 나쁜 예: 하드코딩 값은 "이 색이 어디서 왔는지" 추적이 불가능하다.
```scss
.component {
  color: #333333;
  background: #005a9c;
  border: 1px solid #dddddd;
}
```

✅ 좋은 예: CSS Custom Property로 관리하면 `:root` 오버라이드 한 줄로 전체 변경된다.
```scss
.component {
  color: var(--color-text);
  background: var(--color-primary);
  border: 1px solid var(--color-border);
}
```

> **규칙: 모든 색상, 간격, 폰트 크기는 CSS Custom Properties(`var(--)`)를 우선 사용한다. 하드코딩 색상값(`#hex`, `rgb()`)은 `_root.scss` 토큰 정의 파일 이외의 곳에 사용하지 않는다.**

### 포커스 아웃라인 제거 금지

포커스 아웃라인을 완전히 없애면 키보드/스크린 리더 사용자가 현재 어느 요소에 있는지 알 수 없다. KWCAG 2.1 검수에서 즉시 지적된다. `:focus-visible`을 사용해 마우스 사용자에게는 숨기고 키보드 사용자에게만 표시하는 방식으로 처리한다.

❌ 나쁜 예: 포커스 아웃라인 완전 제거 — KWCAG 2.1 위반
```scss
:focus { outline: none; }
:focus { outline: 0; }
```

✅ 좋은 예: `:focus-visible`로 키보드 포커스만 표시 — 접근성과 시각 디자인 동시 충족
```scss
:focus { outline: none; }
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

> **규칙: `:focus { outline: none }` 단독 사용은 금지이다. 반드시 `:focus-visible` 스타일을 함께 작성한다.**

---

## 6. `@forward` 사용 지침

각 ITCSS 레이어의 `_index.scss` 파일은 `@forward`를 사용해 레이어 내 partial을 집계한다.

`@forward`를 사용하면 상위 진입점(`style.scss`)에서 레이어 이름 하나만 `@use`해도 그 레이어 전체 파일이 로드된다. 컴포넌트가 늘어나도 `style.scss`를 직접 수정할 필요가 없다.

### 구조 패턴

아래 코드는 `6-components` 레이어의 `_index.scss`가 각 컴포넌트 partial을 `@forward`로 집계하는 패턴이다.

```scss
/* scss/6-components/_index.scss */
@forward 'button';
@forward 'card';
@forward 'form';
@forward 'modal';
@forward 'tab';
@forward 'slider';
```

아래 코드는 `style.scss`에서 레이어 이름 하나만으로 전체 컴포넌트를 로드하는 진입점 패턴이다.

```scss
/* scss/style.scss */
@use '6-components' as components; /* _index.scss를 통해 전체 로드 */
```

### 컴포넌트 추가 시 필수 절차

새 컴포넌트 SCSS 파일을 추가할 때는 반드시 **동시에** `_index.scss`에 `@forward`를 등록한다. `@forward` 미등록 시 컴포넌트 스타일이 빌드에 포함되지 않는다. "분명히 SCSS를 작성했는데 CSS에 반영이 안 된다"는 상황의 가장 흔한 원인이다.

```bash
# 1. 컴포넌트 파일 생성
touch scss/6-components/_tooltip.scss

# 2. 즉시 _index.scss에 @forward 추가 (동시 작업 필수)
# scss/6-components/_index.scss에 추가:
# @forward 'tooltip';
```

> **규칙: 새 SCSS partial 파일 생성과 `_index.scss`의 `@forward` 등록은 같은 커밋에 포함한다. 파일만 만들고 등록을 빠뜨리면 빌드에서 제외된다.**
