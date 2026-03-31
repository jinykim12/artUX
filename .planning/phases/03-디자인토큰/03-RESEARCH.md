# Phase 3: 디자인 토큰 - Research

**Researched:** 2026-03-26
**Domain:** CSS Custom Properties, Bootstrap 5 SCSS 변수 연동, 디자인 토큰 네이밍
**Confidence:** HIGH

---

## Summary

Phase 3의 핵심 과제는 세 가지로 요약된다. 첫째, `_root.scss`에 CSS Custom Properties 토큰을 62.5% REM 환경에 맞게 올바른 rem 값으로 채운다. 둘째, `$primary: var(--color-primary)` 패턴이 Sass에서 불가능하다는 제약을 이해하고, 대신 "단방향 참조" 주석 문서화로 매핑 관계를 명확히 한다. 셋째, `_project-overrides.scss` 파일을 `1-settings` 레이어에 배치하여 프로젝트별 `:root {}` 오버라이드 진입점을 제공한다.

Bootstrap 5.3은 자체 CSS Custom Properties를 `--bs-` 접두어로 `:root`에 선언한다. 팀 토큰은 `--color-`, `--font-size-`, `--spacing-` 등 별도 접두어를 사용하므로 Bootstrap `--bs-*` 변수와 이름 충돌이 없다. Style Dictionary v5(최신: 5.4.0)는 Node.js `>=22.0.0` 필요 — 현재 환경 Node.js v24.13.1이므로 기술적으로 가능하나, Phase 3 목표는 정적 SCSS 파일 작성이므로 도입은 비용 대비 효과가 낮다. **이번 Phase는 Style Dictionary 없이 순수 SCSS로 진행한다.**

**Primary recommendation:** `_root.scss`에 4개 범주(색상·타이포·간격·기타) 토큰을 직접 선언하고, Bootstrap `$primary`↔`--color-primary` 매핑은 주석 전용으로 문서화하며, `_project-overrides.scss`는 `scss/1-settings/` 레이어에 배치한다.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| TOKEN-01 | 색상 토큰이 CSS Custom Properties로 정의된다 (`--color-primary`, `--color-text`, `--color-border` 등) | Bootstrap `--bs-*` 접두어와 충돌 없는 `--color-*` 스키마 확정. 색상값은 Bootstrap 기본 팔레트 기준 |
| TOKEN-02 | 타이포그래피 토큰이 정의된다 (`--font-size-base`, `--font-weight-*`, `--leading-*`) | 62.5% REM 환경에서 px→rem 환산 규칙 확정 (1rem=10px) |
| TOKEN-03 | 간격 토큰이 4px 기반 스케일로 정의된다 (`--spacing-xs` ~ `--spacing-3xl`) | 4px 기반 7단계 스케일, 62.5% REM 환경 rem값 환산 완료 |
| TOKEN-04 | 그림자/전환/z-index 토큰이 정의된다 | Bootstrap `--bs-box-shadow-*` 값 참조, z-index는 Bootstrap 컴포넌트 z-index와 정렬 |
| TOKEN-05 | Bootstrap `$primary` 등 주요 변수와 CSS Custom Properties의 매핑 관계가 문서화된다 | Sass 컴파일-타임 vs CSS 런타임 제약으로 var() 직접 연결 불가 — 주석 문서화 패턴 확정 |
| TOKEN-06 | 프로젝트별 색상 오버라이드 방법이 문서화된다 (`_project-overrides.scss` 패턴) | `1-settings` 레이어 배치, `:root {}` 오버라이드 패턴 |
</phase_requirements>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Dart Sass | ^1.98.0 (설치됨) | SCSS 컴파일 | 이미 설치됨. CSS Custom Properties는 Sass 처리 없이 그대로 출력됨 |
| Bootstrap | 5.3.8 (설치됨) | `--bs-*` 접두어 CSS 변수 제공 | 이미 설치됨. `--bs-primary`, `--bs-body-font-size` 등 런타임 오버라이드 지원 |

### Style Dictionary (선택 — 이번 Phase 불채택)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| style-dictionary | 5.4.0 (npm 최신) | JSON 토큰 → SCSS/CSS 변환 | v2+ 요구사항, 다플랫폼(iOS/Android) 토큰 동기화 필요 시 |

**Style Dictionary 불채택 근거:** Node.js `>=22.0.0` 요구 충족(v24.13.1)이지만, 현재 Phase 목표는 정적 SCSS 파일 작성이고 팀 규모상 JSON 소스 관리 오버헤드가 실익보다 크다. v1 Phase 3에서는 불채택, ROADMAP Plan 9(선택)으로 명시된 대로 순수 SCSS로 진행한다.

### Installation
```bash
# 추가 설치 없음 — 기존 devDependencies로 충족됨
# sass ^1.98.0, bootstrap ^5.3.8 이미 설치
```

---

## Architecture Patterns

### Recommended Project Structure (Phase 3 변경 대상)
```
scss/
├── 1-settings/
│   ├── _variables.scss       # Bootstrap 오버라이드 문서화 원본 (기존)
│   ├── _project-overrides.scss  # NEW: 프로젝트별 :root 오버라이드 진입점
│   └── _index.scss           # @forward 추가 필요
├── 3-generic/
│   └── _root.scss            # 토큰 실체 — 이번 Phase에서 채움
```

### Pattern 1: CSS Custom Properties 토큰 선언 (_root.scss)

**What:** `:root {}` 블록에 카테고리별 CSS Custom Properties를 직접 선언한다.

**When to use:** 런타임 테마 오버라이드가 필요한 모든 토큰. Sass 컴파일 후에도 CSS에서 `var(--token-name)`으로 접근 가능.

**62.5% REM 환경 필수 규칙:**
- `html { font-size: 62.5% }` → 1rem = 10px
- 16px = 1.6rem, 14px = 1.4rem, 12px = 1.2rem, 10px = 1.0rem
- 간격 4px = 0.4rem, 8px = 0.8rem, 16px = 1.6rem, 24px = 2.4rem

**색상값 기준 (Bootstrap 5 기본 팔레트 기준):**
```scss
// Source: Bootstrap 5.3 scss/_variables.scss 기본값
// $primary: #0d6efd (Bootstrap 기본)
// $secondary: #6c757d
// $success: #198754
// $danger: #dc3545
// $body-color: #212529
// $border-color: #dee2e6
// $body-bg: #fff
```

**Bootstrap `--bs-box-shadow` 값 참조:**
```scss
// Bootstrap 5.3 기본 그림자 값 (dist/artux.css에서 확인 가능)
// --bs-box-shadow-sm: 0 .125rem .25rem rgba(0,0,0,.075)
// --bs-box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)
// --bs-box-shadow-lg: 0 1rem 3rem rgba(0,0,0,.175)
```

**_root.scss 전체 구조 예시:**
```scss
// Source: Bootstrap 5.3 기본값 기준, 62.5% REM 환경 적용
:root {
  // ── 색상 토큰 ──────────────────────────────
  --color-primary:    #0d6efd;   // Bootstrap $primary 기본값
  --color-secondary:  #6c757d;   // Bootstrap $secondary 기본값
  --color-text:       #212529;   // Bootstrap $body-color
  --color-text-muted: #6c757d;   // Bootstrap $text-muted
  --color-bg:         #fff;      // Bootstrap $body-bg
  --color-border:     #dee2e6;   // Bootstrap $border-color
  --color-error:      #dc3545;   // Bootstrap $danger
  --color-success:    #198754;   // Bootstrap $success

  // ── 타이포그래피 토큰 ──────────────────────
  // [62.5% REM 주의] 1rem = 10px
  --font-size-xs:    1.0rem;  // 10px
  --font-size-sm:    1.2rem;  // 12px
  --font-size-base:  1.6rem;  // 16px (Bootstrap $font-size-base 대응)
  --font-size-md:    1.8rem;  // 18px
  --font-size-lg:    2.0rem;  // 20px
  --font-size-xl:    2.4rem;  // 24px
  --font-size-2xl:   3.2rem;  // 32px

  --font-weight-regular: 400;
  --font-weight-medium:  500;
  --font-weight-bold:    700;

  --leading-tight:   1.25;
  --leading-normal:  1.5;    // Bootstrap $line-height-base
  --leading-loose:   1.75;

  // ── 간격 토큰 (4px 기반 7단계) ────────────
  // [62.5% REM 주의] 4px = 0.4rem
  --spacing-xs:   0.4rem;  //  4px
  --spacing-sm:   0.8rem;  //  8px
  --spacing-md:   1.6rem;  // 16px
  --spacing-lg:   2.4rem;  // 24px
  --spacing-xl:   3.2rem;  // 32px
  --spacing-2xl:  4.8rem;  // 48px
  --spacing-3xl:  6.4rem;  // 64px

  // ── 기타 토큰 ────────────────────────────
  --shadow-sm: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  --shadow-md: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 1rem 3rem rgba(0, 0, 0, 0.175);

  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;

  --z-dropdown: 1000;
  --z-overlay:  1040;
  --z-modal:    1050;
}
```

### Pattern 2: Bootstrap $primary ↔ --color-primary 매핑 (단방향 주석)

**핵심 제약:** `$primary: var(--color-primary)` 은 Sass에서 동작하지 않는다.
- Sass 변수는 컴파일-타임에 정적값으로 확정되어야 한다
- `var()`는 CSS 런타임 함수 — Bootstrap의 `tint-color()`, `shade-color()`, `color-contrast()` 등 Sass 색상 함수에 전달 불가
- `map-merge()` 등 Bootstrap 내부 색상 맵 연산에도 사용 불가

**올바른 패턴 — 단방향 참조 (값 동기화):**
```scss
// _vendor.scss 내 Bootstrap $primary 오버라이드
$primary: #0d6efd; // --color-primary와 값 동기화 유지 (주석으로 명시)

// _root.scss 내 토큰 선언
:root {
  --color-primary: #0d6efd; // $primary와 값 동기화 유지 (주석으로 명시)
}
```

**Bootstrap 자체 CSS 변수와의 관계:**
Bootstrap 5.3은 `--bs-primary: #0d6efd`를 `:root`에 자동 선언한다.
팀 `--color-primary`는 독립 토큰으로 별도 관리 — Bootstrap CSS 컴포넌트는 `--bs-primary`를 내부적으로 참조하므로, 컴포넌트 색상을 런타임에 바꾸려면 `--bs-primary`도 오버라이드해야 한다.

**_project-overrides.scss 내 런타임 오버라이드 패턴:**
```scss
// 프로젝트 테마 오버라이드 예시
:root {
  --color-primary: #1a73e8;     // 팀 토큰 오버라이드
  --bs-primary: #1a73e8;        // Bootstrap 컴포넌트 런타임 오버라이드 (선택)
  --bs-primary-rgb: 26, 115, 232; // Bootstrap RGB 버전도 함께 오버라이드
}
```

### Pattern 3: _project-overrides.scss 배치

**배치 위치:** `scss/1-settings/_project-overrides.scss`

**근거:**
- `1-settings` 레이어는 ITCSS에서 "변수와 설정"을 담당 — CSS 출력 없음
- `_root.scss`보다 먼저 로드되지만, `:root {}` CSS 출력은 `3-generic` 단계에서 발생
- `_project-overrides.scss`가 `:root {}` 블록을 담는 경우, 이 파일은 `3-generic/_root.scss` 이후에 출력되어 cascade로 오버라이드됨

**중요:** `_project-overrides.scss`가 실제 CSS를 출력(`:`root {}`)한다면 `1-settings`에 물리적으로 두되 `_index.scss` forward 순서상 `3-generic` 이후 로드되도록 `style.scss`에서 별도 `@use`로 처리하거나, `3-generic` 내에 배치하는 것이 더 자연스럽다.

**권장 접근:** `_project-overrides.scss`는 `scss/1-settings/`에 두고, 내용은 `:root {}` 오버라이드 블록으로 구성한다. `style.scss`에서 Bootstrap `@import` 이전, `3-generic` @use 이후에 별도 `@use`로 로드한다.

```scss
// style.scss 업데이트 예시
@use '3-generic' as generic;
// ...
@use '1-settings/project-overrides';  // _root.scss 이후 배치로 cascade 보장
@import '3-generic/vendor';           // Bootstrap (마지막)
```

### Anti-Patterns to Avoid

- **`$primary: var(--color-primary)` 사용:** Sass 컴파일 오류 또는 예상치 못한 동작. Bootstrap 색상 함수가 모두 깨짐. 절대 사용 금지.
- **`--font-size-base: 16px`로 선언:** 62.5% REM 환경에서 px 단위 CSS 커스텀 프로퍼티는 동작하나, 팀 규칙은 rem 사용. `1.6rem`으로 통일.
- **Bootstrap `--bs-*` 변수를 팀 토큰 이름으로 재사용:** `--bs-primary`를 `--color-primary`처럼 쓰는 것은 Bootstrap 내부 의존성 오염. 분리 유지.
- **`_project-overrides.scss`를 `_root.scss`보다 먼저 출력:** `:root {}` 선언 순서상 팀 토큰이 오버라이드를 덮어쓰게 됨. cascade 순서 확인 필수.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 색상 함수 (lighten, darken) | 직접 px 계산 | Bootstrap `tint-color()`, `shade-color()` (Sass 함수) 또는 CSS `color-mix()` | Bootstrap이 이미 전체 팔레트 함수 제공 |
| px→rem 수동 계산 | 스프레드시트 | 62.5% REM 규칙 암기 (10px = 1rem) | 규칙이 단순하여 도구 불필요 |
| 토큰 자동 생성 도구 | Style Dictionary 직접 구현 | Style Dictionary v5 (선택 사항) | Phase 3는 정적 SCSS 파일로 충분 |

**Key insight:** CSS Custom Properties 토큰은 Sass 컴파일과 무관하게 `:root {}`에 정적으로 선언하면 충분하다. Bootstrap `--bs-*` 변수 시스템이 이미 런타임 오버라이드를 지원하므로, 팀 토큰은 컴포넌트 구현에 사용할 의미론적 별칭 역할을 한다.

---

## Common Pitfalls

### Pitfall 1: `$primary: var(--color-primary)` 시도
**What goes wrong:** Sass 컴파일 자체는 될 수 있으나, Bootstrap 내부의 `tint-color($primary, 80%)` 등 색상 함수 호출이 `var()` 문자열을 전달받아 런타임 오류 또는 잘못된 CSS가 생성된다.
**Why it happens:** Sass 변수는 컴파일-타임 개념, CSS custom properties는 런타임 개념. 혼용 불가.
**How to avoid:** `$primary: #0d6efd`로 정적값 선언. 주석으로 `--color-primary`와 값 동기화 관계 명시.
**Warning signs:** 컴파일된 CSS에서 버튼 `:hover` 배경색이 이상하거나, `.btn-primary`의 색상 변형이 모두 동일 색상으로 나타남.

### Pitfall 2: 62.5% REM 환경에서 rem 값 오류
**What goes wrong:** 일반 1rem=16px 기준으로 토큰을 작성하면 실제 픽셀값이 60% 작아짐.
**Why it happens:** `html { font-size: 62.5% }` → 1rem = 10px. 표준 16px 기준 계산 공식(`px / 16 = rem`)이 이 환경에서 맞지 않음.
**How to avoid:** `px / 10 = rem` 공식 사용. `--font-size-base: 1.6rem` (=16px), `--spacing-md: 1.6rem` (=16px).
**Warning signs:** 컴파일 후 브라우저에서 간격이 매우 좁거나 폰트가 작게 보임.

### Pitfall 3: Bootstrap `--bs-*` 변수와 팀 토큰 혼동
**What goes wrong:** Bootstrap이 자체적으로 `--bs-primary`, `--bs-body-font-size` 등을 `:root`에 선언한다. 팀 토큰 `--color-primary`를 변경해도 Bootstrap `.btn-primary`의 런타임 색상은 바뀌지 않음.
**Why it happens:** Bootstrap 컴포넌트는 `--bs-primary`를 직접 참조함. 팀 `--color-primary`와 연결 관계 없음.
**How to avoid:** 프로젝트에서 Bootstrap 컴포넌트 색상을 런타임에 바꾸려면 `--bs-primary`도 함께 오버라이드. `_project-overrides.scss` 주석에 명시.
**Warning signs:** `:root { --color-primary: red }` 선언 후 `.btn-primary`가 여전히 파란색.

### Pitfall 4: `_project-overrides.scss`의 cascade 순서 실수
**What goes wrong:** `_project-overrides.scss`가 `_root.scss`보다 먼저 컴파일되면, `:root {}` 오버라이드가 기본 토큰에 덮어쓰여짐. CSS cascade는 나중에 선언된 것이 우선.
**Why it happens:** SCSS `@use` 순서가 CSS 출력 순서를 결정함.
**How to avoid:** `style.scss`에서 `@use '3-generic'` 이후 `_project-overrides.scss` @use 배치.
**Warning signs:** 빌드 후 `dist/artux.css`에서 `:root` 블록이 두 개일 때 오버라이드 블록이 더 위에 있음.

### Pitfall 5: `--color-text-muted` 등 누락 토큰으로 컴포넌트 참조 오류
**What goes wrong:** Phase 2 `_root.scss` 주석에는 14종 예정 토큰이 안내되었으나 `--color-text-muted`는 목록에 없었음.
**Why it happens:** ROADMAP Plan 1에는 포함(`--color-text-muted`), Phase 2 뼈대 주석에는 미포함.
**How to avoid:** ROADMAP Phase 3 Plan 1 목록 기준으로 모든 토큰 구현. `--color-text-muted` 포함 필수.
**Warning signs:** 이후 컴포넌트 Phase에서 `var(--color-text-muted)` 참조 시 값 없음(상속).

---

## Code Examples

### 색상 토큰 — Bootstrap 기본값 기준 정렬

```scss
// Source: Bootstrap 5.3 scss/_variables.scss 기본값 참조
// 이 값들은 _vendor.scss의 $primary 등과 수동으로 동기화한다.
// Bootstrap Sass 변수 ↔ CSS Custom Properties 매핑:
//   $primary (#0d6efd)    → --color-primary
//   $secondary (#6c757d)  → --color-secondary
//   $body-color (#212529) → --color-text
//   $text-muted (#6c757d) → --color-text-muted
//   $body-bg (#fff)       → --color-bg
//   $border-color         → --color-border
//   $danger (#dc3545)     → --color-error
//   $success (#198754)    → --color-success
:root {
  --color-primary:    #0d6efd;
  --color-secondary:  #6c757d;
  --color-text:       #212529;
  --color-text-muted: #6c757d;
  --color-bg:         #fff;
  --color-border:     #dee2e6;
  --color-error:      #dc3545;
  --color-success:    #198754;
}
```

### 타이포그래피 토큰 — 62.5% REM 환경

```scss
// Source: 62.5% REM 규칙 적용 (1rem = 10px)
// _base.scss: html { font-size: 62.5% } 이미 선언됨
:root {
  --font-size-xs:    1.0rem;  // 10px
  --font-size-sm:    1.2rem;  // 12px
  --font-size-base:  1.6rem;  // 16px (Bootstrap $font-size-base: 1.6rem 대응)
  --font-size-md:    1.8rem;  // 18px
  --font-size-lg:    2.0rem;  // 20px
  --font-size-xl:    2.4rem;  // 24px
  --font-size-2xl:   3.2rem;  // 32px

  --font-weight-regular: 400;
  --font-weight-medium:  500;
  --font-weight-bold:    700;

  --leading-tight:  1.25;
  --leading-normal: 1.5;   // Bootstrap $line-height-base 기본값
  --leading-loose:  1.75;
}
```

### 간격 토큰 — 4px 기반 7단계

```scss
// Source: 4px 기반 스케일, 62.5% REM 환경 (4px = 0.4rem)
:root {
  --spacing-xs:   0.4rem;  //  4px
  --spacing-sm:   0.8rem;  //  8px
  --spacing-md:   1.6rem;  // 16px
  --spacing-lg:   2.4rem;  // 24px
  --spacing-xl:   3.2rem;  // 32px
  --spacing-2xl:  4.8rem;  // 48px
  --spacing-3xl:  6.4rem;  // 64px
}
```

### Bootstrap `$primary` 오버라이드 + 주석 문서화 (_vendor.scss)

```scss
// _vendor.scss 내 Bootstrap 오버라이드 패턴
//
// [토큰 매핑 주석]
// Bootstrap Sass 변수는 컴파일-타임 정적값 — var() 사용 불가
// CSS Custom Properties(--color-*)와 값을 수동으로 동기화한다.
// 색상 변경 시 두 곳을 함께 수정:
//   1. 이 파일의 $primary 값
//   2. scss/3-generic/_root.scss의 --color-primary 값
//
$font-size-base: 1.6rem;  // --font-size-base와 동기화
$primary:    #0d6efd;     // --color-primary와 동기화
$secondary:  #6c757d;     // --color-secondary와 동기화

@import "bootstrap/scss/bootstrap";
```

### `_project-overrides.scss` 패턴

```scss
// scss/1-settings/_project-overrides.scss
// ====================================================
// 프로젝트별 디자인 토큰 오버라이드
//
// 사용법: 이 파일의 :root {} 값을 수정하여
//         _root.scss 기본 토큰을 프로젝트별로 교체한다.
//
// [중요] _vendor.scss의 Bootstrap Sass 변수($primary 등)는
//        별도로 수정해야 Bootstrap 컴포넌트에 반영된다.
//
// [중요] Bootstrap 컴포넌트 런타임 색상 변경 시
//        --bs-primary도 함께 오버라이드해야 한다.
//        (Bootstrap 컴포넌트는 --bs-primary를 내부 참조)
// ====================================================

// :root {
//   // 예시: 프로젝트 브랜드 색상이 #1a73e8인 경우
//   --color-primary:       #1a73e8;
//   --color-secondary:     #5f6368;
//
//   // Bootstrap 컴포넌트도 런타임에 바꾸려면 --bs-* 도 오버라이드
//   --bs-primary:          #1a73e8;
//   --bs-primary-rgb:      26, 115, 232;
// }
```

### 토큰 네이밍 규칙 문서 (주석 형태)

```scss
// ====================================================
// 토큰 네이밍 규칙: --[카테고리]-[이름]-[변형]
// ====================================================
//
// 카테고리 목록:
//   --color-*      색상 (primary, secondary, text, bg, border, error, success)
//   --font-size-*  폰트 크기 (xs, sm, base, md, lg, xl, 2xl)
//   --font-weight-* 폰트 굵기 (regular, medium, bold)
//   --leading-*    줄간격 (tight, normal, loose)
//   --spacing-*    간격 (xs, sm, md, lg, xl, 2xl, 3xl)
//   --shadow-*     그림자 (sm, md, lg)
//   --transition-* 전환 속도 (fast, base)
//   --z-*          z-index (dropdown, overlay, modal)
//
// Bootstrap 충돌 방지:
//   Bootstrap 5.3은 --bs- 접두어 사용 → 이름 충돌 없음
//   팀 토큰은 --color-, --font-size- 등 카테고리 접두어 사용
// ====================================================
```

---

## Runtime State Inventory

해당 없음 — 이 Phase는 신규 SCSS 파일 작성 및 기존 `_root.scss` 채우기로 런타임 상태 변경 없음.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | 빌드 스크립트 | ✓ | v24.13.1 | — |
| npm | 패키지 관리 | ✓ | 11.8.0 | — |
| Dart Sass | SCSS 컴파일 | ✓ | ^1.98.0 (설치됨) | — |
| Bootstrap | CSS 변수 참조 | ✓ | 5.3.8 (설치됨) | — |
| Style Dictionary | (선택, 불채택) | 기술적 가능 | 5.4.0 (미설치) | 순수 SCSS로 대체 |

**Missing dependencies with no fallback:** 없음

**Missing dependencies with fallback:**
- Style Dictionary v5: 미설치. 이번 Phase는 채택하지 않으므로 설치 불필요.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | 없음 — CSS 출력 검증은 grep 기반 |
| Config file | none |
| Quick run command | `npm run build:css && grep -c 'var(--' dist/artux.css` |
| Full suite command | `npm run build:css` (exit code 0 확인) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TOKEN-01 | `:root`에 `--color-primary` 등 8종 색상 토큰 출력 | smoke | `grep -c '\-\-color-' dist/artux.css` (≥8 확인) | ❌ Wave 0 |
| TOKEN-02 | `:root`에 `--font-size-xs`~`--font-size-2xl` 7종 출력 | smoke | `grep -c '\-\-font-size-' dist/artux.css` (≥7 확인) | ❌ Wave 0 |
| TOKEN-03 | `--spacing-xs`~`--spacing-3xl` 7단계, 4px 배수 확인 | smoke | `grep '\-\-spacing-' dist/artux.css` (값 육안 확인) | ❌ Wave 0 |
| TOKEN-04 | `--shadow-*` 3종, `--transition-*` 2종, `--z-*` 3종 출력 | smoke | `grep -E '\-\-(shadow|transition|z)-' dist/artux.css` | ❌ Wave 0 |
| TOKEN-05 | `_root.scss` 및 `_vendor.scss`에 매핑 주석 존재 | manual | 파일 열어 주석 확인 | ❌ Wave 0 |
| TOKEN-06 | `_project-overrides.scss` 파일 존재, `:root {}` 예시 포함 | smoke | `test -f scss/1-settings/_project-overrides.scss` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run build:css && echo "EXIT:$?"`
- **Per wave merge:** `npm run build:css` 전체 오류 없음 + grep으로 토큰 수 확인
- **Phase gate:** `:root` 블록에 4개 범주 토큰 모두 포함 + `_project-overrides.scss` 존재

### Wave 0 Gaps

- [ ] `scss/3-generic/_root.scss` — 토큰 실체로 채우기 (현재 빈 `:root {}`)
- [ ] `scss/1-settings/_project-overrides.scss` — 신규 생성
- [ ] `scss/1-settings/_index.scss` — `@forward 'project-overrides'` 추가 여부 결정 (또는 style.scss에서 별도 @use)
- [ ] `scss/3-generic/_vendor.scss` — `$primary`, `$secondary` 주석 해제 및 매핑 주석 추가

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Sass 변수만으로 테마 관리 | CSS Custom Properties + Sass 변수 병행 | Bootstrap 5.2+ | 런타임 테마 전환 가능 (JS로 `:root` 값 변경) |
| Style Dictionary v3 (CommonJS) | Style Dictionary v5 (ESM, Node>=22) | 2024~2025 | 프로젝트 이 Phase에서 불채택 — 순수 SCSS로 충분 |
| `--bs-*` 없음 (Bootstrap 4) | `--bs-*` 전체 컴포넌트 CSS 변수 (Bootstrap 5.2+) | Bootstrap 5.2 | 컴포넌트별 런타임 오버라이드 가능, 팀 토큰과 분리 필요 |

**Deprecated/outdated:**
- `@import` 기반 Sass: Bootstrap 5.x는 아직 내부적으로 사용하나 Dart Sass deprecation 경고 발생. `_vendor.scss` 격리 패턴으로 처리 완료 (Phase 2).
- Style Dictionary v3/v4: v5(ESM)로 단계별 마이그레이션 중. Phase 3에서 비채택으로 영향 없음.

---

## Open Questions

1. **`_project-overrides.scss`가 `:root {}` CSS를 출력할 경우 `style.scss` 로드 순서 확정**
   - What we know: `1-settings`는 CSS 출력 없는 계층으로 설계됨. `_project-overrides.scss`는 `:root {}` 오버라이드를 담음.
   - What's unclear: `@forward 'project-overrides'`를 `1-settings/_index.scss`에 추가하면 `style.scss`의 `@use '1-settings'`에 포함되어 3-generic보다 먼저 출력됨 → cascade 역전 위험.
   - Recommendation: `_project-overrides.scss`는 `style.scss`에서 `@use '3-generic'` 이후 별도 `@use '1-settings/project-overrides'`로 직접 로드. `_index.scss`에는 forward 하지 않음.

2. **`--color-text-muted` 포함 여부**
   - What we know: ROADMAP Phase 3 Plan 1 목록에 포함. Phase 2 `_root.scss` 예정 토큰 주석에는 미포함.
   - What's unclear: 없음 — ROADMAP 기준으로 포함 확정.
   - Recommendation: `--color-text-muted: #6c757d` 포함.

3. **`--font-size-md`(18px) 토큰 필요 여부**
   - What we know: ROADMAP는 `--font-size-xs ~ --font-size-2xl` 스케일로만 명시. 중간 단계(md) 포함 여부 모호.
   - What's unclear: xs/sm/base/lg/xl/2xl이 6단계면 base와 lg 사이 gap이 4px(16px→20px)으로 충분한지.
   - Recommendation: `--font-size-md: 1.8rem`(18px) 포함하여 7단계로 구성. 공공기관 UI에서 18px 사용 빈번.

---

## Sources

### Primary (HIGH confidence)
- Bootstrap 5.3 공식 문서 (https://getbootstrap.com/docs/5.3/customize/css-variables/) — `--bs-*` 접두어 정책, `:root` 변수 목록
- Bootstrap 5.3 공식 문서 (https://getbootstrap.com/docs/5.3/customize/sass/) — `$primary: var()` 불가 근거, Sass 변수 오버라이드 순서
- npm registry — Style Dictionary v5.4.0 `engines: { node: '>=22.0.0' }` 직접 확인
- 프로젝트 소스 파일 직접 확인 — `_root.scss`, `_vendor.scss`, `_variables.scss`, `_base.scss`, `_common.scss`, `style.scss`

### Secondary (MEDIUM confidence)
- Brave Search: "Bootstrap 5 CSS custom properties design tokens 2025" — 복수 소스 일치
- Brave Search: "CSS custom properties 62.5% rem trick" — Stack Overflow + SitePoint 일치

### Tertiary (LOW confidence)
- 없음

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — 기존 설치 라이브러리 직접 확인, npm registry 버전 확인
- Architecture: HIGH — Bootstrap 공식 문서 + 프로젝트 소스 직접 확인
- Pitfalls: HIGH — Bootstrap 공식 문서에서 Sass/CSS 변수 제약 명확히 확인

**Research date:** 2026-03-26
**Valid until:** 2026-06-26 (Bootstrap 5.x 안정 릴리스 기준 90일)
