# Phase 4: 반응형 시스템 - Research

**Researched:** 2026-03-26
**Domain:** Dart Sass 1.x 미디어쿼리 믹스인 / Bootstrap 5 브레이크포인트 비교
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** `scss/2-tools/_breakpoints.scss` 신규 생성 — 브레이크포인트 변수 + respond-to() 믹스인 + 모바일 퍼스트 원칙 + Bootstrap 대조표를 한 파일에 응집
**D-02:** 기존 `_mixin.scss`(6종)는 변경 없이 유지
**D-03:** `2-tools/_index.scss`에 `@forward 'breakpoints'` 추가

**D-04:** Sass Map 형태로 정의 —
```scss
$breakpoints: (mobile-max: 767px, tablet: 768px, tablet-max: 1023px, pc-sm: 1024px, pc-sm-max: 1279px, pc: 1280px)
```

**D-05:** respond-to()에서 `map-get`으로 조회, 잘못된 키워드 사용 시 `@error` 발생

**D-06:** min-width 기본 (모바일 퍼스트) + range(-only 접미사) 병행
- `respond-to(tablet)` → `@media (min-width: 768px)`
- `respond-to(pc-sm)` → `@media (min-width: 1024px)`
- `respond-to(pc)` → `@media (min-width: 1280px)`
- `respond-to(mobile-only)` → `@media (max-width: 767px)`
- `respond-to(tablet-only)` → `@media (min-width: 768px) and (max-width: 1023px)`
- `respond-to(pc-sm-only)` → `@media (min-width: 1024px) and (max-width: 1279px)`

**D-07:** Bootstrap `$grid-breakpoints`는 오버라이드하지 않음 — 기본값(xs:0 / sm:576 / md:768 / lg:992 / xl:1200 / xxl:1400) 유지
**D-08:** Bootstrap 그리드 클래스(col-md-6 등)는 Bootstrap 기본 breakpoint로 동작, 팀 respond-to()는 커스텀 컴포넌트 전용
**D-09:** `_breakpoints.scss` 상단에 Bootstrap vs 팀 breakpoint 대조표 주석 작성

**D-10:** 기본 원칙: 기본 스타일은 모바일 기준, respond-to()로 넓은 화면 확장
**D-11:** 예외 허용: PC 전용 컴포넌트 등 특수한 경우 `respond-to(mobile-only)`, `respond-to(tablet-only)` 등 -only 변형 사용 가능
**D-12:** 모바일 퍼스트 원칙 및 예외 사용 시점 안내를 `_breakpoints.scss` 주석에 포함

### Claude's Discretion

- respond-to() 믹스인 내부 구현 세부사항 (map-has-key vs map-get null 체크 등)
- `_breakpoints.scss` 내 주석 구조 및 대조표 형식
- 사용 예시 코드 스니펫의 구체적 내용

### Deferred Ideas (OUT OF SCOPE)

없음 — discussion이 Phase 범위 내에서 완결됨
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| RESP-01 | 팀 표준 브레이크포인트 4단계가 정의된다 (모바일 ~767px / 태블릿 768~1023px / 소형PC 1024~1279px / PC 1280px~) | Sass Map `$breakpoints` 변수 + 컴파일 테스트로 픽셀값 출력 확인 |
| RESP-02 | 반응형 미디어쿼리 믹스인이 제공된다 (`respond-to(mobile)`, `respond-to(tablet)` 등) | `respond-to()` 6키워드 컴파일 검증 완료 (Dart Sass 1.98.0) |
| RESP-03 | 모바일 퍼스트 작성 기준이 문서화된다 | 모바일 퍼스트 원칙 주석 + 예외 패턴 안내 (D-10, D-11, D-12) |
</phase_requirements>

---

## Summary

Phase 4는 SCSS 파일 한 개(`_breakpoints.scss`)를 신규 생성하고 `_index.scss`에 `@forward` 한 줄을 추가하는 것이 전부다. 코드 변경 범위가 명확하고 외부 의존성이 없으므로 구현 리스크는 낮다.

핵심 기술 결정은 이미 CONTEXT.md에서 확정되었다. 남은 discretion 항목은 Dart Sass 1.98.0 기준 어떤 내장 함수 모듈을 써야 deprecation 경고 없이 동작하는지다. 실제 컴파일 테스트로 검증한 결과, `@use 'sass:map'` + `@use 'sass:list'` 모듈을 사용해야 한다. 전통적인 전역 함수 `map-get()`, `index()`는 Dart Sass 1.98.0에서 deprecation 경고를 발생시킨다.

`style.scss`는 이미 `@use '2-tools' as tools;`로 `_index.scss`를 로드하므로, `_index.scss`에 `@forward 'breakpoints'`를 추가하면 전체 빌드에 자동 포함된다. `style.scss` 변경은 불필요하다.

**Primary recommendation:** `@use 'sass:map'` + `@use 'sass:list'`를 사용하는 `respond-to()` 믹스인을 작성하면 Dart Sass 1.98.0에서 deprecation 경고 없이 컴파일된다.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Dart Sass (sass npm) | 1.98.0 (설치됨) | SCSS 컴파일 | 프로젝트에 이미 설치됨 |
| Bootstrap | 5.3.8 (설치됨) | 그리드/유틸리티 | 팀 표준 — 오버라이드 없이 기본값 유지 |

### 사용할 Dart Sass 내장 모듈

| 모듈 | 함수 | 역할 |
|------|------|------|
| `sass:map` | `map.get()`, `map.has-key()` | Sass Map에서 브레이크포인트 값 조회 |
| `sass:list` | `list.index()` | 키워드가 min-keys 목록에 있는지 확인 |

**설치:** 추가 패키지 없음 — Dart Sass 내장 모듈

---

## Architecture Patterns

### 파일 구조 (Phase 4 후)

```
scss/
└── 2-tools/
    ├── _index.scss        ← @forward 'breakpoints' 추가 (기존 파일 수정)
    ├── _mixin.scss        ← 변경 없음
    └── _breakpoints.scss  ← 신규 생성
```

### Pattern 1: respond-to() 믹스인 구현 (검증된 패턴)

**What:** Sass Map으로 팀 표준 브레이크포인트를 정의하고, 키워드 기반 믹스인으로 미디어쿼리를 제공한다.

**When to use:** 팀 커스텀 컴포넌트에서 반응형 스타일을 작성할 때. Bootstrap 그리드 클래스(col-md-6)는 이 믹스인 대신 Bootstrap 자체 breakpoint를 사용한다.

**검증된 구현 (Dart Sass 1.98.0 — 경고 없음):**

```scss
// Source: 로컬 컴파일 테스트 검증 (2026-03-26)
@use 'sass:map';
@use 'sass:list';

$breakpoints: (
  mobile-max:  767px,
  tablet:      768px,
  tablet-max:  1023px,
  pc-sm:       1024px,
  pc-sm-max:   1279px,
  pc:          1280px,
);

@mixin respond-to($key) {
  $min-keys: (tablet, pc-sm, pc);
  $only-map: (
    mobile-only: (max: map.get($breakpoints, mobile-max)),
    tablet-only: (min: map.get($breakpoints, tablet),  max: map.get($breakpoints, tablet-max)),
    pc-sm-only:  (min: map.get($breakpoints, pc-sm),   max: map.get($breakpoints, pc-sm-max)),
  );

  @if list.index($min-keys, $key) {
    @media (min-width: map.get($breakpoints, $key)) { @content; }
  } @else if map.has-key($only-map, $key) {
    $range: map.get($only-map, $key);
    $min: map.get($range, min);
    $max: map.get($range, max);
    @if $min and $max {
      @media (min-width: $min) and (max-width: $max) { @content; }
    } @else if $max {
      @media (max-width: $max) { @content; }
    } @else {
      @media (min-width: $min) { @content; }
    }
  } @else {
    @error "Unknown respond-to key: '#{$key}'. Available: tablet, pc-sm, pc, mobile-only, tablet-only, pc-sm-only.";
  }
}
```

**컴파일 출력 검증:**

| 키워드 | 출력 미디어쿼리 |
|--------|--------------|
| `respond-to(tablet)` | `@media (min-width: 768px)` |
| `respond-to(pc-sm)` | `@media (min-width: 1024px)` |
| `respond-to(pc)` | `@media (min-width: 1280px)` |
| `respond-to(mobile-only)` | `@media (max-width: 767px)` |
| `respond-to(tablet-only)` | `@media (min-width: 768px) and (max-width: 1023px)` |
| `respond-to(pc-sm-only)` | `@media (min-width: 1024px) and (max-width: 1279px)` |
| `respond-to(desktop)` (잘못된 키) | `@error` — 컴파일 중단 |

### Pattern 2: _mixin.scss 주석 구조 참고

기존 `_mixin.scss`의 주석 패턴(한국어 블록 주석, 사용 예, 파라미터 설명)을 `_breakpoints.scss`에도 동일하게 적용한다.

```scss
// ----------------------------------------------------
// [믹스인명]
// 사용 예: @include respond-to(tablet) { ... }
// 파라미터: $key — 키워드 설명
// ----------------------------------------------------
```

### Pattern 3: _index.scss @forward 추가

```scss
// 현재 (변경 전)
@forward 'mixin';

// 변경 후
@forward 'mixin';
@forward 'breakpoints';
```

### Bootstrap vs 팀 브레이크포인트 대조표 (주석용)

```
// Bootstrap $grid-breakpoints (변경 없음 — D-07):
//   xs:  0       (모든 화면)
//   sm:  576px
//   md:  768px   ← 팀 tablet 기준과 동일
//   lg:  992px
//   xl:  1200px
//   xxl: 1400px
//
// 팀 표준 브레이크포인트:
//   모바일    ~767px     (기본 스타일 — 쿼리 없음)
//   태블릿    768~1023px (Bootstrap md~)
//   소형 PC  1024~1279px
//   PC       1280px~
//
// Bootstrap col-md-6 등 그리드 클래스는 Bootstrap breakpoint 기준.
// respond-to()는 커스텀 컴포넌트 스타일 전용.
```

### Anti-Patterns to Avoid

- **전역 `map-get()` 사용:** Dart Sass 1.98.0에서 `DEPRECATION WARNING [global-builtin]` 발생. `@use 'sass:map'` + `map.get()` 사용할 것.
- **전역 `index()` 사용:** 동일하게 deprecated. `@use 'sass:list'` + `list.index()` 사용할 것.
- **Bootstrap `$grid-breakpoints` 오버라이드:** D-07에서 금지 결정. Bootstrap 그리드 클래스가 깨진다.
- **`style.scss` 수정:** `@use '2-tools' as tools;`가 이미 있으므로 `_index.scss`에 `@forward` 추가만 하면 충분.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 브레이크포인트 맵 조회 | null 체크 분기 직접 작성 | `map.has-key()` + `@error` | 컴파일 타임에 오타를 즉시 잡아준다 |
| 범위 쿼리 계산 | 수동 px 계산 | `$breakpoints` 맵에서 조회 | 단일 진실의 원천, 수정 시 한 곳만 변경 |

**Key insight:** 컴파일 타임 `@error`가 런타임 에러보다 훨씬 빠른 피드백을 준다. 잘못된 키워드는 브라우저에서 아무 스타일도 안 걸리는 대신, 빌드 즉시 오류로 표시된다.

---

## Common Pitfalls

### Pitfall 1: 전역 내장 함수 deprecation 경고
**What goes wrong:** `map-get()`, `index()` 전역 함수 사용 시 Dart Sass 1.98.0에서 `DEPRECATION WARNING [global-builtin]` 경고 발생. Sass 3.0에서 제거 예정.
**Why it happens:** Dart Sass가 네임스페이스 기반 모듈 시스템으로 전환 중 (`@use 'sass:map'` 등).
**How to avoid:** `@use 'sass:map'` 후 `map.get()`, `map.has-key()` 사용. `@use 'sass:list'` 후 `list.index()` 사용.
**Warning signs:** 빌드 출력에 `DEPRECATION WARNING [global-builtin]` 문자열 등장.

### Pitfall 2: 2-tools 레이어에서 Bootstrap 변수 참조
**What goes wrong:** `_breakpoints.scss`에서 Bootstrap 변수(`$primary` 등)를 참조하면 컴파일 에러.
**Why it happens:** `2-tools`는 Bootstrap `@import` 이전에 로드된다 (Phase 1/2 결정, `style.scss` 구조 확인).
**How to avoid:** `_breakpoints.scss`는 순수 px 값과 Sass 자체 기능만 사용한다. Bootstrap 변수 참조 불필요.
**Warning signs:** `Undefined variable` 에러.

### Pitfall 3: `respond-to(mobile)` 키워드 기대
**What goes wrong:** 성공 기준 및 Phase 설명에 `respond-to(mobile)`이 언급되어 있으나, D-06에서 확정된 키워드 목록에 `mobile`은 없다. `mobile`은 기본 스타일(쿼리 없음)이므로 믹스인 키워드가 아니다.
**Why it happens:** "4개 키워드 지원"이라는 표현이 모바일을 포함한다고 오해될 수 있다.
**How to avoid:** 지원 키워드는 min-width용 3개 (tablet, pc-sm, pc) + range용 3개 (mobile-only, tablet-only, pc-sm-only) = 6개. `respond-to(mobile)` 입력 시 `@error` 발생이 정상이다.
**Warning signs:** 성공 기준 "respond-to(mobile) 동작"을 믹스인 키워드로 오해하는 경우.

### Pitfall 4: `_index.scss` @forward 순서
**What goes wrong:** `_index.scss`에서 `breakpoints`를 `mixin` 앞에 선언하면 문제는 없으나, 기존 코드 패턴과 다르다.
**Why it happens:** 순서 무관하지만 일관성이 중요하다.
**How to avoid:** 기존 `@forward 'mixin'` 뒤에 `@forward 'breakpoints'` 추가.

---

## Code Examples

### 검증된 구현 전체 (Dart Sass 1.98.0, 경고 없음)

```scss
// Source: 로컬 컴파일 테스트 검증 (Dart Sass 1.98.0, 2026-03-26)
@use 'sass:map';
@use 'sass:list';

// ====================================================
// artpqUX 팀 표준 브레이크포인트
//
// Bootstrap $grid-breakpoints (기본값 유지 — D-07):
//   xs:0 / sm:576 / md:768 / lg:992 / xl:1200 / xxl:1400
//
// 팀 브레이크포인트:
//   모바일   ~767px     기본 스타일 (미디어쿼리 없음)
//   태블릿   768~1023px Bootstrap md 시작점과 동일
//   소형 PC 1024~1279px Bootstrap 기준에 없는 팀 전용 구간
//   PC      1280px~
//
// Bootstrap 그리드 클래스(col-md-6 등)는 Bootstrap 기본 breakpoint 동작.
// respond-to()는 커스텀 컴포넌트 전용.
// ====================================================

$breakpoints: (
  mobile-max:  767px,
  tablet:      768px,
  tablet-max:  1023px,
  pc-sm:       1024px,
  pc-sm-max:   1279px,
  pc:          1280px,
) !default;

// ----------------------------------------------------
// [반응형 미디어쿼리 믹스인]
//
// 모바일 퍼스트 원칙:
//   기본 스타일 → 모바일 기준 작성 (쿼리 없음)
//   respond-to(tablet), respond-to(pc-sm), respond-to(pc) → 넓은 화면으로 확장
//
// 예외 허용:
//   PC 전용 컴포넌트 등 특수한 경우 -only 변형 사용 가능
//   respond-to(mobile-only), respond-to(tablet-only), respond-to(pc-sm-only)
//
// 사용 예:
//   .card {
//     padding: 1.6rem;                          // 모바일 기본
//     @include respond-to(tablet)  { padding: 2.4rem; }
//     @include respond-to(pc)      { padding: 3.2rem; }
//   }
//
//   .gnb-pc {
//     display: none;
//     @include respond-to(pc-sm) { display: flex; }
//   }
//
// 파라미터:
//   $key — tablet | pc-sm | pc | mobile-only | tablet-only | pc-sm-only
// ----------------------------------------------------
@mixin respond-to($key) {
  $min-keys: (tablet, pc-sm, pc);
  $only-map: (
    mobile-only: (max: map.get($breakpoints, mobile-max)),
    tablet-only: (min: map.get($breakpoints, tablet),  max: map.get($breakpoints, tablet-max)),
    pc-sm-only:  (min: map.get($breakpoints, pc-sm),   max: map.get($breakpoints, pc-sm-max)),
  );

  @if list.index($min-keys, $key) {
    @media (min-width: map.get($breakpoints, $key)) {
      @content;
    }
  } @else if map.has-key($only-map, $key) {
    $range: map.get($only-map, $key);
    $min: map.get($range, min);
    $max: map.get($range, max);
    @if $min and $max {
      @media (min-width: $min) and (max-width: $max) { @content; }
    } @else if $max {
      @media (max-width: $max) { @content; }
    } @else {
      @media (min-width: $min) { @content; }
    }
  } @else {
    @error "Unknown respond-to key: '#{$key}'. Available: tablet, pc-sm, pc, mobile-only, tablet-only, pc-sm-only.";
  }
}
```

### _index.scss 변경 후

```scss
// ====================================================
// 2-tools: 믹스인, 함수
// CSS 출력 없음 — 도구만 정의
// ====================================================
@forward 'mixin';
@forward 'breakpoints';
```

### 모바일 퍼스트 사용 패턴

```scss
// 올바른 패턴: 기본 = 모바일
.component {
  font-size: 1.4rem;             // 모바일

  @include respond-to(tablet) {
    font-size: 1.6rem;           // 태블릿+
  }

  @include respond-to(pc) {
    font-size: 1.8rem;           // PC+
  }
}

// 허용 예외: PC 전용 요소
.gnb-desktop {
  display: none;

  @include respond-to(pc-sm) {
    display: flex;
  }
}

// 허용 예외: 모바일 전용 요소
.mobile-menu-btn {
  display: flex;

  @include respond-to(pc-sm) {
    display: none;
  }
}
```

### 빌드 검증 명령

```bash
npm run build:css
```

빌드 성공 + 출력된 `dist/artux.css`에서 정확한 px 값 확인:
```
@media (min-width: 768px) { ... }
@media (min-width: 1024px) { ... }
@media (min-width: 1280px) { ... }
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `map-get($map, $key)` 전역 함수 | `map.get($map, $key)` (sass:map 모듈) | Dart Sass 1.23+ | 전역 함수 deprecation 경고 없음 |
| `index($list, $val)` 전역 함수 | `list.index($list, $val)` (sass:list 모듈) | Dart Sass 1.23+ | 동일 |
| `@import` | `@use` / `@forward` | Dart Sass 1.33+ | Phase 1에서 이미 @use 전략 채택 완료 |

**Deprecated/outdated:**
- `map-get()` 전역: Dart Sass 3.0에서 제거 예정 — `map.get()` 사용
- `index()` 전역: 동일 — `list.index()` 사용

---

## Open Questions

없음 — CONTEXT.md 결정 사항과 컴파일 테스트로 모든 구현 세부사항이 확인되었다.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Dart Sass (npm) | SCSS 컴파일 | ✓ | 1.98.0 | — |
| Node.js | npm run build:css | ✓ | 24.13.1 | — |
| Bootstrap | 그리드 호환성 참조 | ✓ | 5.3.8 | — |

**Missing dependencies:** 없음. 모든 의존성이 이미 설치되어 있다.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Dart Sass CLI (sass npm 1.98.0) |
| Config file | package.json scripts.build:css |
| Quick run command | `npm run build:css` |
| Full suite command | `npm run build:css` (빌드 성공 + dist/artux.css 미디어쿼리 확인) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| RESP-01 | `$breakpoints` 맵에 4단계 픽셀값이 정의됨 | 컴파일 스모크 | `npm run build:css` | ✅ Wave 0 불필요 |
| RESP-02 | `respond-to()` 6키워드가 올바른 미디어쿼리로 출력됨 | 컴파일 스모크 | `npm run build:css` | ✅ Wave 0 불필요 |
| RESP-03 | 모바일 퍼스트 원칙이 주석과 예시 코드로 명시됨 | 수동 코드 리뷰 | — (주석 검토) | manual-only |

**수동 검증:**
- `dist/artux.css`에서 `@media (min-width: 768px)`, `@media (min-width: 1024px)`, `@media (min-width: 1280px)` 문자열 확인
- `_breakpoints.scss` 주석에 Bootstrap 대조표, 모바일 퍼스트 원칙, 예시 코드 포함 여부 확인

### Sampling Rate
- **Per task commit:** `npm run build:css` (경고 없이 성공 확인)
- **Per wave merge:** `npm run build:css` + dist/artux.css 미디어쿼리 그렙 확인
- **Phase gate:** 빌드 성공 + 6키워드 출력 확인 후 `/gsd:verify-work`

### Wave 0 Gaps

없음 — 기존 빌드 인프라(sass CLI, package.json scripts)가 Phase 4 검증에 충분하다.

---

## Sources

### Primary (HIGH confidence)
- 로컬 컴파일 테스트 (Dart Sass 1.98.0) — 6키워드 출력값, deprecation 경고 재현 및 수정 패턴 직접 검증
- `node_modules/bootstrap/scss/mixins/_breakpoints.scss` — Bootstrap 공식 브레이크포인트 믹스인 구현 참조
- `node_modules/bootstrap/scss/_variables.scss` line 484-491 — Bootstrap 기본 `$grid-breakpoints` 값 확인

### Secondary (MEDIUM confidence)
- Dart Sass 공식 문서 (sass-lang.com/d/import) — `@import` 및 전역 내장 함수 deprecation 정책

### Tertiary (LOW confidence)

없음.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — 설치된 버전 직접 확인
- Architecture: HIGH — 컴파일 테스트로 검증된 구현 패턴
- Pitfalls: HIGH — Dart Sass 1.98.0에서 직접 에러/경고 재현

**Research date:** 2026-03-26
**Valid until:** 2026-06-26 (Dart Sass 안정 릴리스 기준 90일)
