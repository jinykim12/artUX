# Phase 5: 접근성 기반 - Research

**Researched:** 2026-03-26
**Domain:** 웹 접근성 (KWCAG 2.1 AA / KRDS), SCSS 포커스 패턴, 공공기관 납품 체크리스트
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**포커스 스타일 표준화**
- D-01: focus() 믹스인을 `scss/2-tools/_mixin.scss`에서 `scss/4-elements/` 레이어로 이동 — Bootstrap 로드 이후라 `var(--color-primary)` 사용 가능
- D-02: 기존 하드코딩 #0d6efd 대신 CSS 토큰 `var(--color-primary)` 기반으로 변경
- D-03: 고대비 모드(forced-colors)는 별도 코드 없이 outline 기반이 자동 대응하는 점을 주석으로 안내만 함
- D-04: 기존 `2-tools/_mixin.scss`의 focus() 제거하고 새 위치로 이동

**문서화 범위와 형식**
- D-05: 접근성 가이드는 `docs/accessibility/` 디렉토리에 마크다운으로 작성
- D-06: 주제별 분리: images.md, color-contrast.md, keyboard.md, dynamic-content.md, forms.md 등
- D-07: Phase 10(Eleventy 문서 사이트)에서 자연스럽게 통합 가능하도록 마크다운 형식 유지

**KRDS 체크리스트**
- D-08: `docs/accessibility/checklist.md`에 마크다운 체크박스 형식으로 작성
- D-09: 각 항목에 KWCAG 2.1 조항 번호, 자동/수동 구분, 테스트 방법 포함
- D-10: 납품 시 복사해서 사용 가능한 실무 체크리스트 형태

**본문건너뛰기 패턴**
- D-11: `scss/6-components/_skip-nav.scss`에 독립 컴포넌트로 작성 (ROADMAP 제안 일치)
- D-12: `6-components/_index.scss`에 `@forward 'skip-nav'` 추가
- D-13: 포커스 시 즉시 노출 (애니메이션 없음) — 공공기관 표준 패턴
- D-14: `#skip-to-content` ID 패턴 사용

**기존 코드 활용**
- D-15: `.sr-only` / `.sr-only-focusable`은 이미 `_common.scss`에 구현됨 (A11Y-02) — 추가 작업 불필요, 기존 코드 유지
- D-16: 동적 콘텐츠 패턴(aria-live, role="alert", 모달 포커스 트랩)은 docs/ 문서로만 작성 (코드는 Phase 9에서 구현)

### Claude's Discretion
- focus() 믹스인의 새 위치 내 정확한 파일명 (_focus.scss vs _common.scss 내 포함)
- 각 접근성 가이드 문서의 세부 목차 및 예시 코드 수준
- KRDS 체크리스트의 구체적 항목 수와 분류 체계
- skip-nav 스타일링 세부사항 (배경색, 폰트 크기, z-index 등)

### Deferred Ideas (OUT OF SCOPE)
- 동적 콘텐츠 접근성 코드 구현 (aria-live, 모달 포커스 트랩) → Phase 9 (오버레이 컴포넌트)
- forced-colors 미디어쿼리 상세 대응 → v2 확장 문서 (EXT) 또는 필요 시 추후 Phase
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| A11Y-01 | 본문 건너뛰기 링크 패턴이 제공된다 (`skip-to-content`) | skip-nav SCSS 컴포넌트 패턴, HTML 보일러플레이트 |
| A11Y-02 | 스크린 리더 전용 텍스트 패턴이 제공된다 (`.sr-only`, `.sr-only-focusable`) | 이미 `_common.scss`에 구현됨 — 기존 코드 확인 완료 |
| A11Y-03 | 포커스 스타일 표준이 정의된다 (focus 믹스인, outline 기준) | focus() 믹스인 이동 + CSS 토큰 기반 재작성 패턴 |
| A11Y-04 | 이미지 대체텍스트 기준이 문서화된다 (장식 이미지 `alt=""`, 의미 이미지 설명) | docs/accessibility/images.md 신규 작성 |
| A11Y-05 | 폼 접근성 패턴이 문서화된다 (label-input 연결, error 메시지, required 표시) | REQUIREMENTS.md에는 Phase 7 배정, CONTEXT.md D-06에 forms.md 포함 확인 — 문서 작성 범위 |
| A11Y-06 | 색상 대비 기준이 문서화된다 (텍스트 4.5:1, 대형 텍스트 3:1) | docs/accessibility/color-contrast.md 신규 작성, KWCAG 1.3.3 기반 |
| A11Y-07 | 키보드 탐색 지원 기준이 문서화된다 (탭 순서, 포커스 트랩, 단축키) | docs/accessibility/keyboard.md 신규 작성 |
| A11Y-08 | KRDS 기반 접근성 체크리스트가 제공된다 (공공기관 납품 체크리스트) | docs/accessibility/checklist.md — KWCAG 2.1 24개 항목 기반 |
| A11Y-09 | 동적 콘텐츠 접근성 패턴이 제공된다 (aria-live, role="alert", 모달 포커스 트랩) | Phase 5에서 docs/accessibility/dynamic-content.md 문서만 작성, 코드는 Phase 9 |
</phase_requirements>

---

## Summary

Phase 5는 SCSS 코드 변경 2건 + 마크다운 문서 6건 신규 작성으로 구성된다. 코드 변경의 핵심은 `_mixin.scss`의 focus() 믹스인을 `4-elements` 레이어로 이동하고 하드코딩 색상을 CSS 토큰으로 교체하는 것이다. 문서 변경의 핵심은 `docs/accessibility/` 디렉토리를 새로 만들고 공공기관 납품에 실용적인 KWCAG 2.1 AA 기반 체크리스트와 주제별 가이드를 작성하는 것이다.

A11Y-02(sr-only)는 `_common.scss`에 이미 올바르게 구현되어 있어 추가 작업이 없다. A11Y-09의 동적 콘텐츠 코드 구현은 Phase 9로 완전히 미루어져 있으며, 이 Phase에서는 문서만 작성한다. A11Y-05(폼 접근성)는 REQUIREMENTS.md에서 Phase 7에 배정되어 있지만 CONTEXT.md D-06에 `forms.md`가 포함되어 있으므로 문서 작성 수준에서만 다룬다.

`focus()` 믹스인 이동 시 주의할 핵심 포인트는 두 가지다. 첫째, Sass의 `rgba($color, $alpha)` 함수는 CSS 변수를 인수로 받을 수 없으므로 `var(--color-primary)` 사용 시 `rgba()` 대신 `outline-color` 단독 사용 또는 CSS `color-mix()`/`opacity` 방식으로 전환해야 한다. 둘째, 2-tools 레이어는 CSS 출력이 없는 믹스인 전용이어야 하므로 focus() 실제 적용 스타일은 4-elements 레이어에 있어야 한다.

**Primary recommendation:** focus() 믹스인은 `scss/4-elements/_focus.scss` 독립 파일로 신규 작성 (믹스인 정의 + 전역 :focus-visible 적용 모두 포함), 기존 `_mixin.scss`의 focus()는 삭제 후 주석으로 이동 경로 안내.

---

## Standard Stack

### Core

| Library/Tool | Version | Purpose | Why Standard |
|---|---|---|---|
| Sass (Dart Sass) | 1.98.0 (확인됨) | SCSS 컴파일 | 프로젝트 기존 스택 |
| Bootstrap 5 | 5.3.8 (확인됨) | 베이스 스타일, `.visually-hidden` 참조 | 프로젝트 기존 스택 |

### 표준 CSS 기능 (외부 라이브러리 불필요)

| Feature | Purpose | 브라우저 지원 |
|---|---|---|
| `:focus-visible` | 키보드 포커스만 outline 표시 | Chrome 86+, Firefox 85+, Safari 15.4+ (HIGH) |
| `outline` 속성 | 포커스 인디케이터 — `box-shadow` 대신 권장 | 전 브라우저 |
| `forced-colors` 미디어쿼리 | 고대비 모드 자동 대응 | `outline` 기반이면 자동 적용됨 |

### 설치 불필요

이 Phase는 외부 라이브러리를 새로 설치하지 않는다. 모든 기술 스택이 프로젝트에 이미 존재한다.

---

## Architecture Patterns

### 파일 구조 (Phase 5 변경/신규 목록)

```
scss/
├── 2-tools/
│   └── _mixin.scss          [수정] focus() 삭제, 이동 경로 주석 추가
├── 4-elements/
│   ├── _focus.scss          [신규] focus() 믹스인 정의 + :focus-visible 전역 적용
│   └── _index.scss          [수정] @forward 'focus' 추가
└── 6-components/
    ├── _skip-nav.scss       [신규] 본문건너뛰기 독립 컴포넌트
    └── _index.scss          [수정] @forward 'skip-nav' 추가

docs/
└── accessibility/           [신규 디렉토리]
    ├── checklist.md         [신규] KWCAG 2.1 AA 24개 항목 체크리스트 (A11Y-08)
    ├── images.md            [신규] 이미지 대체텍스트 가이드 (A11Y-04)
    ├── color-contrast.md    [신규] 색상 대비 기준 (A11Y-06)
    ├── keyboard.md          [신규] 키보드 탐색 기준 (A11Y-07)
    ├── forms.md             [신규] 폼 접근성 가이드 문서 (A11Y-05 — 코드는 Phase 7)
    └── dynamic-content.md   [신규] 동적 콘텐츠 패턴 가이드 (A11Y-09 — 코드는 Phase 9)
```

### Pattern 1: focus() 믹스인 — CSS 토큰 호환 방식

**문제:** `rgba($color, $alpha)`는 Sass 함수이므로 CSS 변수(`var(--color-primary)`)를 인수로 받을 수 없다. 컴파일 타임에 CSS 변수 값을 알 수 없기 때문이다.

**해결:** `rgba()` 대신 CSS 단계에서 처리 가능한 방식으로 전환한다. 가장 단순한 방법은 `outline-color`에 직접 CSS 변수를 할당하고, 반투명도가 필요하면 `box-shadow` 대신 `outline`의 완전 불투명 색상 사용 또는 별도 CSS 변수 `--color-focus` 토큰을 추가하는 것이다.

**권장 구현:**

```scss
// Source: 프로젝트 코드 분석 + MDN :focus-visible
// scss/4-elements/_focus.scss

// ----------------------------------------------------
// [포커스 스타일 표준 — A11Y-03]
// 이동: scss/2-tools/_mixin.scss → scss/4-elements/_focus.scss
//
// CSS 변수 호환 주의:
//   Sass rgba($var, $alpha) 불가 — CSS 변수는 컴파일 타임에 값이 없음
//   대신 outline: 2px solid var(--color-primary) 단독 사용
//
// 고대비 모드(forced-colors):
//   outline 기반 포커스 인디케이터는 forced-colors에서 자동 대응됨
//   별도 @media (forced-colors: active) 코드 불필요 — 주석으로 안내
// ----------------------------------------------------

@mixin focus($offset: -0.4rem) {
  outline-offset: $offset;
  outline: 2px solid var(--color-primary);
  // [고대비 모드] forced-colors 환경에서 outline은 Highlight 색상으로 자동 교체됨
}

// 전역 :focus-visible 적용
// :focus 대신 :focus-visible 사용 — 마우스 클릭 시 outline 미표시
// (키보드/보조기술 사용 시에만 outline 표시)
*:focus-visible {
  @include focus();
}

// :focus-visible 미지원 환경 폴백
// 구형 브라우저에서는 :focus로 폴백 (KWCAG 준수를 위해 반드시 유지)
*:focus:not(:focus-visible) {
  outline: 2px solid var(--color-primary);
  outline-offset: -0.4rem;
}
```

### Pattern 2: skip-nav 컴포넌트

**원칙:** 공공기관 표준 패턴 — 포커스 시 즉시 노출, 애니메이션 없음, `position: absolute` 기반.

```scss
// Source: KWCAG 2.4.1 반복 영역 건너뛰기 표준 패턴
// scss/6-components/_skip-nav.scss

.skip-nav {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;          // 모든 레이어 위
  overflow: hidden;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);

  &:focus {
    overflow: visible;
    width: auto;
    height: auto;
    padding: 0.8rem 1.6rem;
    clip: auto;
    background: var(--color-primary);
    color: #fff;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
    text-decoration: none;
    white-space: nowrap;
  }
}
```

**HTML 보일러플레이트:**

```html
<!-- 본문건너뛰기 — <body> 태그 바로 다음 첫 번째 요소 -->
<a href="#skip-to-content" class="skip-nav">본문 바로가기</a>

<!-- 본문 시작 지점 -->
<main id="skip-to-content">
  ...
</main>
```

### Pattern 3: sr-only (기존 코드 확인 — 변경 없음)

`scss/4-elements/_common.scss`에 이미 올바르게 구현되어 있다. A11Y-02를 충족한다.

```scss
// 기존 구현 (변경 없음)
.sr-only {
  position: absolute !important;
  overflow: hidden !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  clip: rect(0, 0, 0, 0) !important;
  border: 0 !important;
}

.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static !important;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  overflow: visible !important;
  clip: auto !important;
}
```

### Anti-Patterns to Avoid

- **`outline: none` 전역 적용:** `_common.scss`에 이미 금지 주석이 있음. KWCAG 2.1 AA 2.1.1, 2.4.7 위반.
- **`rgba(var(--color-primary), 0.8)` 작성:** Sass는 CSS 변수를 `rgba()` 인수로 처리할 수 없어 컴파일 오류 발생.
- **skip-nav에 CSS `transition` 추가:** 공공기관 심사에서 감점 요인. 즉시 노출이 표준.
- **`clip-path` 단독 사용:** `clip: rect()` 구식이지만 `clip-path: inset(50%)` 방식도 있으나, 기존 `.sr-only` 패턴과 일관성을 위해 `clip: rect(0,0,0,0)` 유지.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| 색상 대비 계산 | 수작업 계산 공식 | [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) 링크를 문서에 포함 | WCAG 알고리즘 구현 복잡, 실무자는 도구 사용 |
| sr-only 패턴 | 새로 작성 | `_common.scss` 기존 구현 그대로 사용 | 이미 올바르게 구현됨, 중복 금지 |
| forced-colors 대응 | `@media (forced-colors: active)` 블록 추가 | outline 기반 패턴 유지로 자동 대응 | outline은 forced-colors 환경에서 자동으로 `Highlight` 시스템 색상으로 교체됨 |
| 접근성 자동화 테스트 | 수작업 체크 | docs 체크리스트 제공, pa11y는 v2(AUTO-02)에서 | Phase 5는 문서화 수준, 자동화는 v2 |

---

## KWCAG 2.1 AA 검사항목 구조 (체크리스트 작성 기준)

**출처:** KWCAG 2.1 공식 지침 (신뢰도: HIGH)

### 인식의 용이성 (7개 항목)

| 번호 | 항목명 | 핵심 기준 | 관련 A11Y 요구사항 |
|---|---|---|---|
| 1.1.1 | 적절한 대체 텍스트 제공 | 장식 이미지 `alt=""`, 의미 이미지 내용 설명 | A11Y-04 |
| 1.2.1 | 자막 제공 | 동영상 자막 또는 원고 제공 | — |
| 1.3.1 | 색에 무관한 콘텐츠 인식 | 색만으로 정보 전달 금지 | A11Y-06 |
| 1.3.2 | 명확한 지시 사항 제공 | 위치/색/모양/방향만으로 설명 금지 | — |
| 1.3.3 | 텍스트 콘텐츠의 명도 대비 | 일반 텍스트 4.5:1, 대형 텍스트 3:1 이상 | A11Y-06 |
| 1.3.4 | 자동 재생 금지 | 3초 이상 자동 재생 콘텐츠 정지 수단 제공 | — |
| 1.4.1 | 콘텐츠 간의 구분 | 인접 콘텐츠 구분 가능 | — |

### 운용의 용이성 (9개 항목)

| 번호 | 항목명 | 핵심 기준 | 관련 A11Y 요구사항 |
|---|---|---|---|
| 2.1.1 | 키보드 사용 보장 | 모든 기능 키보드만으로 이용 가능 | A11Y-07 |
| 2.1.2 | 초점 이동 | 포커스 트랩 금지 (탈출 수단 제공) | A11Y-07 |
| 2.1.3 | 조작 가능 | 클릭 가능 요소 최소 크기 44×44px (KWCAG) | — |
| 2.2.1 | 응답시간 조절 | 시간 제한 있는 콘텐츠 — 조절 수단 제공 | — |
| 2.2.2 | 정지 기능 제공 | 자동 전환 콘텐츠 — 정지/이전/다음 제공 | — |
| 2.3.1 | 깜빡임과 번쩍임 사용 제한 | 3~50Hz 깜빡임 금지 | — |
| 2.4.1 | 반복 영역 건너뛰기 | 본문건너뛰기 링크 제공 | A11Y-01 |
| 2.4.2 | 제목 제공 | 페이지/프레임 제목, 콘텐츠 블록 제목 | — |
| 2.4.3 | 적절한 링크 텍스트 | "여기", "바로가기" 등 무의미 링크 텍스트 금지 | — |

### 이해의 용이성 (6개 항목)

| 번호 | 항목명 | 핵심 기준 | 관련 A11Y 요구사항 |
|---|---|---|---|
| 3.1.1 | 기본 언어 표시 | `<html lang="ko">` 필수 | — |
| 3.2.1 | 사용자 요구에 따른 실행 | 포커스/입력 시 자동 컨텍스트 변경 금지 | — |
| 3.3.1 | 콘텐츠의 선형 구조 | 논리적 읽기 순서 유지 | — |
| 3.4.1 | 표의 구성 | `<caption>`, `<th scope>` 제공 | — |
| 3.5.1 | 레이블 제공 | 폼 요소에 `<label>` 연결 | A11Y-05 |
| 3.6.1 | 오류 정정 | 입력 오류 식별 및 수정 방법 제공 | A11Y-05 |

### 견고성 (2개 항목)

| 번호 | 항목명 | 핵심 기준 | 관련 A11Y 요구사항 |
|---|---|---|---|
| 4.1.1 | 마크업 오류 방지 | 시작/종료 태그, 중첩, 중복 속성 오류 금지 | — |
| 4.2.1 | 웹 애플리케이션 접근성 준수 | `aria-*`, `role` 올바른 사용 | A11Y-09 |

---

## Common Pitfalls

### Pitfall 1: rgba()와 CSS 변수 호환성

**What goes wrong:** `outline: 2px solid rgba(var(--color-primary), 0.8)` 작성 시 Dart Sass 컴파일 오류 또는 의도치 않은 결과 발생.

**Why it happens:** Sass `rgba()` 함수는 컴파일 타임에 색상값을 알아야 한다. CSS 커스텀 프로퍼티는 런타임 값이므로 Sass가 처리할 수 없다.

**How to avoid:** `rgba()` 제거하고 `outline: 2px solid var(--color-primary)` 단독 사용. 반투명도가 꼭 필요하면 `--color-focus-ring` 토큰을 `_root.scss`에 별도 정의하거나 CSS `color-mix(in srgb, var(--color-primary) 80%, transparent)` 사용 (CSS Color Level 5, Chrome 111+).

**Warning signs:** Sass 컴파일 시 `Error: $color: var(--color-primary) is not a color` 메시지.

### Pitfall 2: `_mixin.scss` focus() 삭제 후 기존 참조 코드 오류

**What goes wrong:** `_mixin.scss`에서 focus()를 삭제했는데 다른 파일에서 `@include tools.focus()` 형태로 여전히 참조하는 경우 컴파일 오류 발생.

**Why it happens:** 현재 `_mixin.scss`는 `2-tools` 네임스페이스로 노출되어 있어 `@include tools.focus()`로 호출 가능하다. 이동 후에는 `4-elements` 레이어의 믹스인을 참조해야 한다.

**How to avoid:** 프로젝트 전체에서 `tools.focus` 또는 `focus()` 호출 부분을 검색한 후, 삭제 전 실제 사용처를 확인한다. Phase 5 기준으로는 `_common.scss`에 `@use '../2-tools' as tools`가 있으나 `tools.focus()`를 직접 호출하는 코드는 없는 것으로 확인됨.

**Warning signs:** `sass --watch` 실행 시 `Error: Undefined mixin` 메시지.

### Pitfall 3: `_index.scss` @forward 누락

**What goes wrong:** `_focus.scss`를 새로 만들었지만 `scss/4-elements/_index.scss`에 `@forward 'focus'`를 추가하지 않으면 `style.scss`에서 로드되지 않는다.

**Why it happens:** `style.scss`는 `@use '4-elements' as elements`로 레이어 전체를 로드하지만, `_index.scss`에 `@forward`가 없으면 해당 파일은 번들에 포함되지 않는다.

**How to avoid:** `_focus.scss` 생성과 동시에 `_index.scss` 수정을 하나의 작업으로 묶는다. 동일하게 `_skip-nav.scss`와 `6-components/_index.scss` 수정도 함께 처리.

### Pitfall 4: docs/ 디렉토리가 프로젝트 루트에 미존재

**What goes wrong:** `docs/accessibility/` 폴더가 없는 상태에서 마크다운 파일만 작성하면 Phase 10(Eleventy)에서 통합 시 경로 충돌 가능성.

**Why it happens:** 현재 프로젝트 루트에는 `dist/`, `node_modules/`, `scss/`만 존재하고 `docs/` 디렉토리가 없다.

**How to avoid:** `docs/accessibility/` 디렉토리를 명시적으로 생성하는 태스크를 계획에 포함. Phase 10 Eleventy 입력 경로와 충돌하지 않도록 디렉토리 구조를 먼저 확인할 필요는 없음 — 마크다운 소스 파일은 `docs/`에, Eleventy 출력은 `_site/` 또는 `dist/`에 분리되는 것이 표준이므로 충돌 없음.

### Pitfall 5: skip-nav z-index 값

**What goes wrong:** skip-nav의 z-index가 낮으면 포커스 시 다른 요소 뒤에 가려진다.

**Why it happens:** 헤더에 `position: fixed`와 높은 z-index가 있을 때 skip-nav가 헤더 뒤에 숨어 보이지 않게 된다.

**How to avoid:** `z-index: 9999` 또는 `var(--z-modal)` (현재 1050) 이상으로 설정. 공공기관 현장에서는 9999가 관행적으로 사용됨. 프로젝트 `_root.scss`의 `--z-modal: 1050`보다 높은 값을 사용하거나 별도 토큰 `--z-skip-nav: 9999` 추가 고려.

---

## Code Examples

### focus() 믹스인 최종 구현 (CSS 토큰 기반)

```scss
// Source: 프로젝트 코드 + MDN CSS Custom Properties 호환성 분석
// 파일: scss/4-elements/_focus.scss

// [포커스 스타일 표준 — A11Y-03]
// 원본 위치: scss/2-tools/_mixin.scss (삭제됨)
// 이동 이유: Bootstrap @use 이후 레이어라 var(--color-primary) 사용 가능
//
// CSS 변수 호환:
//   Sass rgba(var(--color-primary), 0.8) 불가 → 단독 CSS 변수 사용
//
// 고대비 모드(forced-colors: active):
//   outline 기반 포커스는 시스템 Highlight 색상으로 자동 대응됨
//   별도 @media (forced-colors) 코드 불필요 (Phase 5 범위 외)
@mixin focus($offset: -0.4rem) {
  outline-offset: $offset;
  outline: 2px solid var(--color-primary);
}

// 전역 포커스 인디케이터
// :focus-visible — 키보드/보조기술 포커스 시에만 적용 (마우스 제외)
// 브라우저 지원: Chrome 86+, Firefox 85+, Safari 15.4+
*:focus-visible {
  @include focus();
}
```

### _mixin.scss 수정 (focus 제거 + 안내 주석)

```scss
// 삭제된 focus() 믹스인 자리에 추가할 주석
// ----------------------------------------------------
// [포커스 스타일 — 이동됨]
// focus() 믹스인은 scss/4-elements/_focus.scss로 이동되었습니다.
// CSS 토큰(var(--color-primary)) 사용을 위해 레이어를 변경했습니다.
// 사용: @include elements.focus();
// ----------------------------------------------------
```

### 4-elements/_index.scss 수정

```scss
// 기존
@forward 'base';
@forward 'font';
@forward 'common';

// 수정 후
@forward 'base';
@forward 'font';
@forward 'common';
@forward 'focus';  // A11Y-03 포커스 스타일 표준
```

### 6-components/_index.scss 수정

```scss
// 수정 후
// Phase 6~9에서 채워짐
@forward 'skip-nav';  // A11Y-01 본문건너뛰기
```

### skip-nav HTML + SCSS 패턴

```html
<!-- HTML 보일러플레이트 (docs/accessibility/checklist.md에 포함) -->
<body>
  <a href="#skip-to-content" class="skip-nav">본문 바로가기</a>
  <header>...</header>
  <main id="skip-to-content">
    ...
  </main>
</body>
```

```scss
// Source: KWCAG 2.4.1 반복 영역 건너뛰기 표준 패턴
// 파일: scss/6-components/_skip-nav.scss
.skip-nav {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  overflow: hidden;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  text-decoration: none;
  white-space: nowrap;

  &:focus {
    overflow: visible;
    width: auto;
    height: auto;
    padding: 0.8rem 1.6rem;
    clip: auto;
    background: var(--color-primary);
    color: #fff;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
    // [공공기관 표준] 애니메이션 없음 — transition 추가 금지
  }
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|---|---|---|---|
| `outline: none` + custom `:focus` | `:focus-visible` | Chrome 86 (2020), Safari 15.4 (2022) | 마우스 클릭 시 outline 미표시, 키보드 시 표시 — 디자인과 접근성 모두 만족 |
| Bootstrap `.visually-hidden` | 팀 관행 `.sr-only` 유지 | Bootstrap 5.0 (2021) | 두 클래스 병행 존재. 팀은 `.sr-only` 유지 결정 |
| `clip: rect(0,0,0,0)` | `clip-path: inset(50%)` 권장 | ~2022 | 기존 코드 호환성 위해 `clip` 유지. 신규 코드에서는 `clip-path` 가능하나 통일성 위해 기존 패턴 유지 |

**Deprecated/outdated:**
- `outline: 0`: 접근성 위반. `_common.scss`에 이미 금지 주석 있음.
- `@include focus($color: #0d6efd)`: Phase 5 이후 CSS 토큰 기반으로 대체.

---

## Open Questions

1. **focus() 적용 범위 — 믹스인 노출 방법**
   - What we know: 이동 후 파일은 `4-elements` 레이어. 현재 style.scss에서 `@use '4-elements' as elements`로 로드됨.
   - What's unclear: 다른 컴포넌트 파일에서 `@include elements.focus()` 형태로 참조해야 하는지, 아니면 `_focus.scss`에서 전역 `:focus-visible` 스타일만 출력하고 믹스인은 별도 노출하지 않는지.
   - Recommendation: Phase 5에서는 `_focus.scss`가 (1) 믹스인 정의 + (2) 전역 `:focus-visible` 적용을 모두 담당. 다른 컴포넌트에서 커스텀 포커스가 필요하면 해당 컴포넌트에서 `@use '../4-elements/focus' as focus-tools`로 직접 참조하는 패턴은 Phase 6+ 에서 필요 시 도입.

2. **docs/ 디렉토리 위치 — Phase 10 Eleventy 입력 경로 충돌 가능성**
   - What we know: Phase 10에서 Eleventy 문서 사이트가 생성될 예정. 현재 `docs/` 디렉토리 미존재.
   - What's unclear: Eleventy 입력 경로가 `docs/`가 될지 `src/`가 될지 미결정.
   - Recommendation: Phase 5에서는 `docs/accessibility/`에 마크다운을 작성하되, Phase 10에서 Eleventy 입력 경로가 확정되면 이동/심링크 처리. 현재는 경로 고정 위험 없음.

3. **checklist.md 항목 수 — KRDS vs KWCAG 2.1 vs KWCAG 2.2**
   - What we know: REQUIREMENTS.md에 "KRDS 기반" 명시. KWCAG 2.1은 24개 항목, KWCAG 2.2는 추가 항목 포함. 공공기관 납품은 현재 KWCAG 2.1 AA 기준.
   - What's unclear: KRDS(한국형 디지털 서비스 표준)의 접근성 요구사항이 KWCAG 2.1을 포함하는지, 별도 항목이 있는지.
   - Recommendation: checklist.md는 KWCAG 2.1 24개 항목을 기본으로 하고, KRDS 추가 항목(모바일 접근성, 터치 조작 크기 등)을 별도 섹션으로 분리. 납품 실무에서 KWCAG 2.1 AA 24개 항목이 핵심 기준.

---

## Environment Availability

Step 2.6: SKIPPED — 이 Phase는 SCSS 파일 수정과 마크다운 문서 작성으로만 구성되며, 외부 도구/서비스/런타임 신규 의존성이 없다. 기존 스택(Dart Sass 1.98.0, npm 빌드)으로 모든 작업 수행 가능.

---

## Validation Architecture

`workflow.nyquist_validation: true` — 검증 아키텍처 포함.

### Test Framework

| Property | Value |
|---|---|
| Framework | 없음 (JavaScript 단위 테스트 불필요) |
| SCSS 빌드 검증 | `npm run build:css` (컴파일 오류 = 빌드 실패) |
| 스타일 린트 | `npm run lint:css` (stylelint 17.5.0) |
| Quick run command | `npm run build:css` |
| Full suite command | `npm run build:css && npm run lint:css` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|---|---|---|---|---|
| A11Y-01 | skip-nav 컴포넌트 SCSS 빌드 성공 | smoke | `npm run build:css` | ❌ Wave 0 — `_skip-nav.scss` 신규 |
| A11Y-02 | `.sr-only` 기존 코드 유지 확인 | smoke | `npm run build:css` | ✅ `_common.scss` |
| A11Y-03 | `_focus.scss` SCSS 빌드 성공, `var(--color-primary)` 사용 | smoke | `npm run build:css` | ❌ Wave 0 — `_focus.scss` 신규 |
| A11Y-04 | `docs/accessibility/images.md` 파일 존재 | manual | `ls docs/accessibility/images.md` | ❌ Wave 0 — 신규 |
| A11Y-05 | `docs/accessibility/forms.md` 파일 존재 | manual | `ls docs/accessibility/forms.md` | ❌ Wave 0 — 신규 |
| A11Y-06 | `docs/accessibility/color-contrast.md` 파일 존재 | manual | `ls docs/accessibility/color-contrast.md` | ❌ Wave 0 — 신규 |
| A11Y-07 | `docs/accessibility/keyboard.md` 파일 존재 | manual | `ls docs/accessibility/keyboard.md` | ❌ Wave 0 — 신규 |
| A11Y-08 | `docs/accessibility/checklist.md` 파일 존재 + 24개 항목 포함 | manual | `ls docs/accessibility/checklist.md` | ❌ Wave 0 — 신규 |
| A11Y-09 | `docs/accessibility/dynamic-content.md` 파일 존재 | manual | `ls docs/accessibility/dynamic-content.md` | ❌ Wave 0 — 신규 |

**접근성 기능 자동 테스트 (v2 범위):**
- pa11y / axe-core 기반 접근성 자동 테스트는 REQUIREMENTS.md AUTO-02로 v2 범위. Phase 5에서는 포함하지 않음.

### Sampling Rate

- **Per task commit:** `npm run build:css`
- **Per wave merge:** `npm run build:css && npm run lint:css`
- **Phase gate:** `npm run build:css && npm run lint:css` 전체 그린 후 `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `scss/4-elements/_focus.scss` — A11Y-03 (신규 파일, 빌드에 포함되어야 함)
- [ ] `scss/4-elements/_index.scss` — `@forward 'focus'` 추가
- [ ] `scss/6-components/_skip-nav.scss` — A11Y-01 (신규 파일)
- [ ] `scss/6-components/_index.scss` — `@forward 'skip-nav'` 추가
- [ ] `docs/accessibility/` — 신규 디렉토리 생성
- [ ] `docs/accessibility/checklist.md` — A11Y-08
- [ ] `docs/accessibility/images.md` — A11Y-04
- [ ] `docs/accessibility/color-contrast.md` — A11Y-06
- [ ] `docs/accessibility/keyboard.md` — A11Y-07
- [ ] `docs/accessibility/forms.md` — A11Y-05
- [ ] `docs/accessibility/dynamic-content.md` — A11Y-09

---

## Sources

### Primary (HIGH confidence)
- 직접 파일 읽기: `scss/4-elements/_common.scss` — sr-only 구현 현황 확인
- 직접 파일 읽기: `scss/2-tools/_mixin.scss` — 기존 focus() 믹스인 확인
- 직접 파일 읽기: `scss/3-generic/_root.scss` — CSS 토큰 정의 확인
- 직접 파일 읽기: `scss/style.scss` — SCSS 로드 순서 확인
- MDN :focus-visible — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible

### Secondary (MEDIUM confidence)
- KWCAG 2.1 검사항목 24개 구조: websoul.co.kr/accessibility + uxkm.io 교차 확인
- KRDS 접근성 가이드: www.krds.go.kr/html/site/utility/utility_04.html
- skip-nav CSS 패턴: naradesign.github.io/skip-navigation.html
- :focus-visible 브라우저 지원: css-tricks.com almanac (2025-01-28)

### Tertiary (LOW confidence)
- KRDS의 KWCAG 2.1 외 추가 항목 구체 내용 — KRDS 사이트에서 상세 접근성 항목 목록 미확인

---

## Metadata

**Confidence breakdown:**
- SCSS 구현 패턴 (focus 이동, CSS 변수 호환): HIGH — 기존 코드 직접 확인, Sass/CSS 동작 원리 기반
- skip-nav 컴포넌트 패턴: HIGH — KWCAG 2.4.1 표준 패턴
- sr-only 기존 코드 상태: HIGH — 파일 직접 확인
- KWCAG 2.1 24개 항목 구조: HIGH — 복수 공식 출처 교차 확인
- KRDS 추가 항목 세부 내용: LOW — 공식 사이트에서 상세 목록 직접 확인 못함

**Research date:** 2026-03-26
**Valid until:** 2026-04-26 (KWCAG는 안정적 표준, CSS 브라우저 지원은 30일 내 변동 없음)
