# Phase 6: 핵심 컴포넌트 — 레이아웃 - Research

**Researched:** 2026-03-26
**Domain:** WAI-ARIA disclosure navigation, Bootstrap 5 GNB, accessible mobile menu, SCSS component architecture
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**헤더/GNB 마크업 패턴**
- **D-01:** HTML 스니펫은 `docs/components/header.md`에 마크다운 코드 블록으로 작성 — Phase 5 docs/ 패턴과 일관성 유지, Phase 10 Eleventy 통합 용이
- **D-02:** 2단계 서브메뉴(드롭다운) 포함 — aria-haspopup, aria-expanded 적용한 드롭다운 패턴
- **D-03:** PC 헤더와 모바일 전체메뉴 스니펫을 하나의 문서에 함께 작성 (별도 파일 분리 불필요)
- **D-04:** 모바일 전체메뉴 패널은 aria-hidden 토글 방식 — 햄버거 버튼에 aria-expanded + aria-controls, 패널에 aria-hidden="true/false" 토글

**레이아웃 SCSS 구조**
- **D-05:** `5-objects/_layout.scss`는 Bootstrap 그리드 사용 원칙 주석만 작성 — 커스텀 확장(sticky, container-fluid 변형 등)은 포함하지 않음
- **D-06:** Bootstrap 그리드 내장 클래스 중복 금지 원칙을 주석으로 명시

**GNB 접근성**
- **D-07:** GNB 접근성 JS 예시 코드 포함 — 햄버거 토글, 키보드 탐색(방향키/ESC), 서브메뉴 열기/닫기 기본 JS 스니펫
- **D-08:** aria-current="page" 현재 페이지 표시 패턴 포함
- **D-09:** 포커스 관리 설명 — 메뉴 열기 시 첫 메뉴 항목으로 포커스 이동, ESC 시 트리거로 복귀

**헤더 SCSS**
- **D-10:** `scss/6-components/_header.scss` — 헤더 공통 스타일, respond-to() 믹스인으로 PC/모바일 분기
- **D-11:** `6-components/_index.scss`에 `@forward 'header'` 추가

### Claude's Discretion
- _layout.scss 주석의 구체적 내용 및 예시 수준
- 헤더 SCSS 스타일링 세부사항 (색상, 높이, 패딩 등)
- JS 예시 코드의 구체적 구현 방식
- 서브메뉴 드롭다운의 CSS 애니메이션 여부

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| COMP-01 | 헤더/GNB 마크업 패턴이 제공된다 (PC 메뉴, 모바일 전체메뉴, 접근성 포함) | WAI-ARIA Disclosure Navigation pattern (W3C APG), aria-hidden 토글 모바일 패턴, Bootstrap 그리드 주석 가이드, SCSS respond-to() 분기 |
</phase_requirements>

---

## Summary

이 페이즈의 핵심은 세 가지 산출물이다: (1) `docs/components/header.md` 마크다운 문서(PC GNB + 모바일 전체메뉴 HTML 스니펫 + JS 예시), (2) `scss/6-components/_header.scss` (respond-to() 기반 PC/모바일 분기), (3) `scss/5-objects/_layout.scss` (Bootstrap 그리드 사용 원칙 주석).

WAI-ARIA 표준에서 내비게이션 서브메뉴에는 **Disclosure Navigation** 패턴을 쓰는 것이 정석이다. W3C APG는 사이트 내비게이션에 `role="menu"`를 쓰지 말 것을 명시적으로 경고한다 — menu role은 애플리케이션 메뉴(마우스 오른쪽 컨텍스트 메뉴)에 기대되는 복잡한 키보드 인터랙션을 보조기기가 강제하기 때문이다. 따라서 GNB 서브메뉴는 `<ul>` + `<button aria-expanded>` 조합으로 구현한다.

모바일 전체메뉴는 `aria-hidden` 토글 방식(D-04)으로 결정되어 있다. 이는 오버레이가 아닌 패널이 DOM에 항상 존재하되 `aria-hidden="true"`로 숨겼다가 열 때 `aria-hidden="false"`로 전환하는 패턴이다. 이 방식은 공공기관 사이트에서 가장 널리 검증된 방식이며, 화면 밖으로 슬라이드하거나 `display:none`을 토글하는 방식과 달리 트랜지션 없이도 즉시 동작하여 공공기관 접근성 요건에 부합한다.

**Primary recommendation:** WAI-ARIA Disclosure Navigation 패턴(`aria-expanded` + `aria-controls`)을 GNB 기본 패턴으로 사용하고, 모바일 패널은 `aria-hidden` 토글로 구현한다.

---

## Standard Stack

### Core

| Library / Pattern | Version | Purpose | Why Standard |
|-------------------|---------|---------|--------------|
| Bootstrap 5 그리드 | 5.3.x (프로젝트 기존) | 레이아웃 컨테이너/컬럼 | 팀 표준 — Bootstrap 5 기반 유지 결정 |
| WAI-ARIA Disclosure Navigation | W3C APG 현행 | GNB 서브메뉴 접근성 패턴 | W3C 공식 권고 패턴, `role="menu"` 오용 방지 |
| `respond-to()` 믹스인 | Phase 4 구현 완료 | PC/모바일 미디어쿼리 분기 | artpqUX 팀 표준 브레이크포인트 |

### Supporting

| Library / Tool | Purpose | When to Use |
|----------------|---------|-------------|
| `focus()` 믹스인 (`4-elements/_focus.scss`) | 헤더 내 포커스 스타일 | 햄버거 버튼, GNB 링크에 포커스 표시 시 |
| CSS Custom Properties (`_root.scss`) | 헤더 색상/z-index 토큰 | `--z-dropdown`, `--color-primary` 등 활용 |
| 한국어 주석 블록 패턴 | SCSS 사용 설명 | 기존 `_skip-nav.scss` 패턴 그대로 계승 |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Disclosure Navigation | `role="menu"` + menuitem | menu role은 복잡한 AT 키보드 기대치를 강제함 — 사이트 내비에 부적합 (W3C 명시 경고) |
| `aria-hidden` 토글 | `display:none` 토글 | display:none도 스크린리더에서 숨겨지나, aria-hidden 방식이 트랜지션 없이 공공기관 기준에 더 명확함 |
| 커스텀 GNB JS 스니펫 | Bootstrap Collapse.js | Bootstrap JS는 Bootstrap DOM 구조를 요구 — 팀 커스텀 마크업과 충돌 가능 |

**Installation:** 신규 패키지 설치 없음 — Bootstrap 5, Dart Sass 모두 기존 프로젝트에 설치되어 있음.

---

## Architecture Patterns

### Recommended Project Structure (Phase 6 산출물)

```
scss/
├── 5-objects/
│   ├── _index.scss        # @forward 'layout' 추가
│   └── _layout.scss       # 신규: Bootstrap 그리드 원칙 주석 (코드 없음)
├── 6-components/
│   ├── _index.scss        # @forward 'header' 추가
│   ├── _skip-nav.scss     # 기존 (변경 없음)
│   └── _header.scss       # 신규: 헤더 공통 스타일 + respond-to() 분기
docs/
└── components/
    └── header.md          # 신규: PC GNB + 모바일 전체메뉴 스니펫 + JS 예시
```

### Pattern 1: GNB PC 서브메뉴 — Disclosure Navigation

**What:** W3C APG 표준 Disclosure Navigation. 최상위 항목은 `<button>`으로 드롭다운 토글, 서브메뉴는 `<ul>` 리스트.
**When to use:** PC 환경에서 2단계 드롭다운 메뉴 제공 시

```html
<!-- Source: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/ -->
<nav aria-label="주 메뉴">
  <ul class="gnb">
    <!-- 서브메뉴가 있는 항목 -->
    <li class="gnb__item">
      <button
        type="button"
        class="gnb__toggle"
        aria-expanded="false"
        aria-controls="submenu-about"
      >
        소개
      </button>
      <ul id="submenu-about" class="gnb__sub">
        <li><a href="/about/intro">기관 소개</a></li>
        <li><a href="/about/org">조직도</a></li>
      </ul>
    </li>
    <!-- 단순 링크 항목 (서브메뉴 없음) -->
    <li class="gnb__item">
      <a href="/news" aria-current="page">소식</a>
    </li>
  </ul>
</nav>
```

**핵심 규칙:**
- `aria-haspopup`은 `role="menu"` 팝업에서만 사용 — Disclosure 패턴에는 불필요 (W3C APG 명시)
- `aria-expanded="false"` → 서브메뉴 닫힘, `aria-expanded="true"` → 열림
- `aria-controls`는 서브메뉴 `<ul>`의 `id`를 가리킴
- `aria-current="page"` — 현재 페이지 링크에 적용 (D-08)

### Pattern 2: 모바일 전체메뉴 — aria-hidden 토글

**What:** 햄버거 버튼으로 전체메뉴 패널을 `aria-hidden` 토글로 열고 닫는 방식. 패널은 DOM에 항상 존재.
**When to use:** 모바일 뷰에서 전체메뉴 패널 표시/숨김 시 (D-04)

```html
<!-- 햄버거 버튼 -->
<button
  type="button"
  class="header__hamburger"
  aria-expanded="false"
  aria-controls="mobile-menu"
  aria-label="전체 메뉴 열기"
>
  <span class="header__hamburger-bar" aria-hidden="true"></span>
  <span class="header__hamburger-bar" aria-hidden="true"></span>
  <span class="header__hamburger-bar" aria-hidden="true"></span>
</button>

<!-- 모바일 메뉴 패널 -->
<div
  id="mobile-menu"
  class="header__mobile-menu"
  aria-hidden="true"
>
  <nav aria-label="전체 메뉴">
    <ul class="mobile-gnb">
      <li><a href="/" aria-current="page">홈</a></li>
      <li>
        <button type="button" aria-expanded="false" aria-controls="m-submenu-about">소개</button>
        <ul id="m-submenu-about">
          <li><a href="/about/intro">기관 소개</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</div>
```

**핵심 규칙:**
- `aria-hidden="true"` → 스크린리더에서 패널 전체 숨김
- `aria-hidden="false"` → 스크린리더에 패널 노출
- `aria-expanded` 와 `aria-hidden`은 JS가 동시에 업데이트
- 메뉴 열릴 때 첫 번째 메뉴 항목으로 `.focus()` 이동 (D-09)
- ESC 키 → 메뉴 닫기 + 햄버거 버튼으로 포커스 복귀 (D-09)

### Pattern 3: `_layout.scss` — 주석 전용 파일

**What:** 실제 CSS 규칙 없이, Bootstrap 그리드 사용 원칙만 주석으로 설명하는 SCSS 파일 (D-05, D-06).
**When to use:** 팀 내 Bootstrap 그리드 중복 작성 방지 가이드라인 제공 시

```scss
// ====================================================
// [레이아웃 원칙 — 5-objects]
//
// Bootstrap 5 그리드 시스템을 활용한다.
// 아래 클래스를 HTML에 직접 사용하고, SCSS로 재구현하지 않는다.
//
// ── 컨테이너 ──────────────────────────────────────
// .container         — 반응형 고정 너비 (xs~xxl 단계 자동)
// .container-fluid   — 항상 100% 너비
// .container-{bp}    — 특정 bp 이상에서만 고정 너비 (예: .container-lg)
//
// ── 그리드 ────────────────────────────────────────
// .row               — 그리드 행 (flex, gap 내장)
// .col               — 자동 너비 컬럼
// .col-{n}           — 고정 컬럼 수 (1~12)
// .col-{bp}-{n}      — 반응형 컬럼 (예: .col-md-6)
// .g-{n}, .gx-{n}    — 컬럼 간격(gutter) 조정
//
// ── 중복 금지 원칙 (D-06) ─────────────────────────
// Bootstrap 그리드 클래스(container, row, col-*)를
// SCSS로 재정의하거나 복제하지 않는다.
// 레이아웃 커스텀 확장이 필요한 경우 이 파일에 추가하기 전에
// Bootstrap 유틸리티 클래스 및 오버라이드(_variables.scss)로
// 해결 가능한지 먼저 검토한다.
// ====================================================
```

### Pattern 4: `_header.scss` — respond-to() 분기 구조

**What:** 헤더 컴포넌트 SCSS. 모바일 기본 + respond-to(pc-sm) 이상에서 PC 레이아웃으로 전환.
**When to use:** GNB PC 표시/모바일 전체메뉴 표시 분기 (D-10)

```scss
// Source: scss/2-tools/_breakpoints.scss — respond-to() 키워드 참고
@use '../2-tools/breakpoints' as *;

// ====================================================
// [헤더 / GNB — COMP-01]
// PC: respond-to(pc-sm) 이상 GNB 수평 표시
// 모바일: 햄버거 버튼 + 전체메뉴 패널
//
// 사용 예 (HTML):
//   <header class="header" role="banner">
//     <a href="/" class="header__logo">로고</a>
//     <nav aria-label="주 메뉴" class="header__gnb">...</nav>
//     <button class="header__hamburger" ...>메뉴</button>
//   </header>
//
// 접근성:
//   - GNB에 aria-label="주 메뉴" 필수
//   - 햄버거 버튼에 aria-expanded + aria-controls 필수
//   - 모바일 패널에 aria-hidden 토글
// ====================================================

.header {
  position: sticky;
  top: 0;
  z-index: var(--z-dropdown);
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 6.0rem;   // 모바일 헤더 높이 (60px)
    padding: 0 var(--spacing-md);

    @include respond-to(pc-sm) {
      height: 8.0rem; // PC 헤더 높이 (80px)
    }
  }

  // PC GNB — pc-sm 이상 표시
  &__gnb {
    display: none;

    @include respond-to(pc-sm) {
      display: flex;
    }
  }

  // 햄버거 버튼 — pc-sm 이상 숨김
  &__hamburger {
    @include respond-to(pc-sm) {
      display: none;
    }
  }

  // 모바일 메뉴 패널
  &__mobile-menu {
    display: none; // JS로 aria-hidden + display 함께 제어

    &[aria-hidden="false"] {
      display: block;
    }

    @include respond-to(pc-sm) {
      display: none !important; // PC에서는 무조건 숨김
    }
  }
}
```

### Anti-Patterns to Avoid

- **`role="menu"` 사이트 내비게이션에 사용:** AT가 방향키 기반 탐색을 강제함 — 사이트 GNB에 부적합. W3C APG가 명시 경고.
- **`aria-haspopup` Disclosure 패턴에 사용:** `aria-haspopup`은 `role="menu"` 또는 `role="dialog"` 팝업에서만 의미 있음. Disclosure 서브메뉴에는 불필요.
- **Bootstrap Collapse.js 의존:** Bootstrap의 `data-bs-toggle="collapse"` 패턴은 Bootstrap 클래스 구조에 종속됨 — 팀 커스텀 GNB 마크업과 충돌 위험.
- **Bootstrap 그리드 SCSS 재정의:** `.container`, `.row`, `.col-*` 를 SCSS로 중복 정의 금지 (D-06).
- **`tabindex` 양수값 사용:** 키보드 탐색 순서를 DOM 순서에서 벗어나게 함 — Phase 5 keyboard.md에 이미 금지 원칙 명시.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 레이아웃 그리드 | 커스텀 `.grid`, `.col` 클래스 작성 | Bootstrap `.container`, `.row`, `.col-*` | Bootstrap이 반응형, gutter, offset 모두 제공. 중복 코드 발생 |
| 미디어쿼리 분기 | `@media (min-width: 1024px)` 직접 작성 | `@include respond-to(pc-sm)` | 팀 표준 브레이크포인트 준수. 키워드 오타 시 컴파일 에러로 즉시 발견 |
| 포커스 스타일 | `.gnb a:focus { outline: ... }` 재작성 | `_focus.scss`의 전역 `:focus-visible` 규칙 | 이미 전역 적용됨. 오버라이드 시 접근성 저하 위험 |
| GNB JS 상태 관리 라이브러리 | 별도 라이브러리 설치 | 바닐라 JS 스니펫 (이 페이즈 결정사항) | 공공기관 납품 환경에서 외부 JS 의존성 최소화 권장 |

**Key insight:** Bootstrap 그리드와 artpqUX 팀 믹스인(`respond-to`, `focus`)이 이미 레이아웃 인프라를 제공하고 있다. 이 페이즈는 그 위에 GNB 마크업 패턴과 헤더 SCSS만 추가하면 된다.

---

## Common Pitfalls

### Pitfall 1: `role="menu"` 오용
**What goes wrong:** GNB 서브메뉴에 `role="menu"`, `role="menuitem"` 적용 시 NVDA, JAWS 등 스크린리더가 방향키 전용 탐색을 기대함. Tab 키로 링크 탐색이 불가해짐.
**Why it happens:** "메뉴"라는 단어에서 직관적으로 menu role을 선택.
**How to avoid:** GNB는 Disclosure Navigation 패턴 사용. `role="menu"`는 앱리케이션 컨텍스트 메뉴(우클릭, 에디터 툴바)에만 사용.
**Warning signs:** `role="menu"` 또는 `role="menuitem"` 이 GNB `<ul>` 또는 `<li>`에 있으면 즉시 제거.

### Pitfall 2: `aria-hidden`과 `aria-expanded` 미동기화
**What goes wrong:** 햄버거 버튼의 `aria-expanded`는 업데이트했으나 패널의 `aria-hidden`을 함께 바꾸지 않으면 스크린리더가 잘못된 상태를 읽음.
**Why it happens:** 버튼만 업데이트하는 단순 토글 구현.
**How to avoid:** JS 토글 함수에서 두 속성을 항상 동시에 업데이트.
**Warning signs:** 버튼 상태(expanded)와 패널 상태(hidden)가 불일치하는 경우.

### Pitfall 3: 모바일 메뉴 `display:none` 단독 사용
**What goes wrong:** CSS `display:none`만으로 패널 숨기면 `aria-hidden` 없이도 스크린리더에서 숨겨지지만, `aria-hidden` 없으면 스크린리더가 패널 존재를 보조기기에 따라 다르게 처리할 수 있음.
**Why it happens:** CSS 만으로도 시각적으로 동작해서 테스트 통과.
**How to avoid:** `aria-hidden="true/false"` 를 CSS `display` 와 함께 JS로 관리 (D-04 준수).

### Pitfall 4: PC 헤더 `display:none` 모바일 메뉴가 PC에서 노출
**What goes wrong:** `respond-to(pc-sm)` 분기에서 `.header__mobile-menu { display: none !important }` 빠지면 JS로 열린 모바일 메뉴가 PC 화면에 그대로 보임.
**Why it happens:** 반응형 분기 시 모바일 메뉴의 PC 숨김 처리를 빠뜨림.
**How to avoid:** `_header.scss`에서 `.header__mobile-menu`의 pc-sm 이상 `display: none !important` 규칙 필수.

### Pitfall 5: 서브메뉴 z-index 충돌
**What goes wrong:** PC GNB 서브메뉴가 헤더 아래 콘텐츠에 가려짐.
**Why it happens:** `.header`에 `z-index` 미설정 또는 서브메뉴 `z-index` 부재.
**How to avoid:** `_root.scss`의 `--z-dropdown: 1000` 토큰을 `.header`에 적용. 서브메뉴 자체는 부모 stacking context 내에서 처리.

---

## Code Examples

### GNB JS 토글 스니펫 (D-07 기준)

```javascript
// Source: WAI-ARIA APG Disclosure Navigation 패턴 기반
// 햄버거 버튼 — 모바일 전체메뉴 토글
const hamburger = document.querySelector('.header__hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', function () {
  const isExpanded = this.getAttribute('aria-expanded') === 'true';
  const willOpen   = !isExpanded;

  // aria-expanded + aria-hidden 동시 업데이트 (D-04)
  this.setAttribute('aria-expanded', String(willOpen));
  mobileMenu.setAttribute('aria-hidden', String(!willOpen));

  // 메뉴 열릴 때 첫 항목으로 포커스 이동 (D-09)
  if (willOpen) {
    const firstLink = mobileMenu.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }
});

// ESC 키 → 메뉴 닫기 + 햄버거로 포커스 복귀 (D-09)
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.focus(); // 트리거로 포커스 복귀
    }
  }
});

// GNB 서브메뉴 토글 (PC + 모바일 공통)
document.querySelectorAll('.gnb__toggle, [data-submenu-toggle]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    const submenuId  = this.getAttribute('aria-controls');
    const submenu    = document.getElementById(submenuId);

    this.setAttribute('aria-expanded', String(!isExpanded));

    // 서브메뉴 표시/숨김 (CSS와 함께 제어)
    if (submenu) {
      submenu.hidden = isExpanded;
    }
  });
});

// ESC 키 → 열린 서브메뉴 닫기 + 토글 버튼으로 포커스 복귀
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const openToggle = document.querySelector('.gnb__toggle[aria-expanded="true"]');
    if (openToggle) {
      const submenuId = openToggle.getAttribute('aria-controls');
      const submenu   = document.getElementById(submenuId);
      openToggle.setAttribute('aria-expanded', 'false');
      if (submenu) submenu.hidden = true;
      openToggle.focus();
    }
  }
});
```

### `aria-current="page"` 현재 페이지 패턴 (D-08)

```html
<!-- Source: W3C APG Disclosure Navigation + Bootstrap navbar docs -->
<nav aria-label="주 메뉴">
  <ul class="gnb">
    <li class="gnb__item">
      <!-- 현재 페이지: aria-current="page" -->
      <a href="/" class="gnb__link" aria-current="page">홈</a>
    </li>
    <li class="gnb__item">
      <!-- 다른 페이지: aria-current 없음 -->
      <a href="/news" class="gnb__link">소식</a>
    </li>
  </ul>
</nav>
```

### `5-objects/_index.scss` 업데이트 패턴

```scss
// ====================================================
// 5-objects: 레이아웃 패턴 (container 확장, grid 등)
// ====================================================
@forward 'layout';  // Bootstrap 그리드 사용 원칙 주석 (COMP-01 관련 레이아웃 가이드)
```

### `6-components/_index.scss` 업데이트 패턴

```scss
// ====================================================
// 6-components: UI 컴포넌트 (btn, form, card 등)
// ====================================================
@forward 'skip-nav';  // 본문건너뛰기 (A11Y-01)
@forward 'header';    // 헤더/GNB (COMP-01)
// Phase 7~9에서 추가 컴포넌트 채워짐
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `role="menu"` + menuitem 으로 GNB 구현 | Disclosure Navigation (`aria-expanded` + `<ul>`) | WAI-ARIA APG 현행 (2020~) | menu role 오용 시 AT 호환성 문제. Disclosure 패턴이 사이트 GNB 표준 |
| `aria-haspopup="true"` 서브메뉴 | `aria-haspopup` 생략 (Disclosure 패턴) | WAI-ARIA 1.2 / APG 현행 | `aria-haspopup`은 menu/dialog/listbox 팝업에만 적용. 단순 드롭다운에는 불필요 |
| 모바일 메뉴 CSS transition + display:none | `aria-hidden` 토글 (즉시 표시) | 공공기관 표준 (지속) | 공공기관: 애니메이션 없는 즉시 노출. Phase 5 skip-nav에서도 동일 원칙 적용 |

**Deprecated / outdated:**
- `role="navigation"` on `<div>`: `<nav>` 요소 사용으로 대체 (HTML5 시맨틱)
- `aria-haspopup="true"` on GNB toggle: Disclosure 패턴에서는 `aria-expanded` 만으로 충분

---

## Open Questions

1. **서브메뉴 드롭다운 CSS 애니메이션 여부**
   - What we know: D-05/D-06에서 _layout.scss 주석만이라 결정됨. Claude's Discretion으로 남겨져 있음.
   - What's unclear: `_header.scss`에서 서브메뉴 열기 시 `height` 또는 `opacity` 트랜지션을 적용할지 여부.
   - Recommendation: 공공기관 납품 맥락에서 skip-nav와 동일하게 트랜지션 없이 즉시 표시를 기본으로 삼고, 트랜지션은 미포함. (`prefers-reduced-motion` 대응 불필요해짐)

2. **모바일 메뉴 패널 내 서브메뉴 방향키 탐색 포함 여부**
   - What we know: D-07에서 방향키 탐색 JS 스니펫을 포함하도록 결정됨.
   - What's unclear: 방향키 탐색이 PC GNB에만인지, 모바일 패널 내부까지 포함인지.
   - Recommendation: 모바일 패널은 Tab 기반 탐색으로 충분. 방향키 탐색은 PC GNB 수평 탐색(좌우 방향키)과 서브메뉴 수직 탐색(상하 방향키) 위주로 JS 스니펫 제공. 단, 스니펫은 예시 수준으로 프로젝트에서 활성화 여부 선택.

---

## Environment Availability

Step 2.6: SKIPPED — 이 페이즈는 SCSS 파일 추가, 마크다운 문서 작성, 바닐라 JS 스니펌 작성으로 구성된 코드/문서 변경이다. 외부 런타임, 서비스, CLI 도구에 대한 새로운 의존성 없음.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | 자동화 테스트 프레임워크 없음 (artpqUX v1 범위 외, AUTO-01~03은 v2) |
| Config file | — |
| Quick run command | `npx sass scss/style.scss /dev/null --no-source-map` (SCSS 컴파일 오류 확인) |
| Full suite command | 동일 (`npx sass scss/style.scss /dev/null --no-source-map`) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| COMP-01 | `_header.scss`가 SCSS 컴파일 오류 없이 빌드됨 | smoke | `npx sass scss/style.scss /dev/null --no-source-map` | ❌ Wave 0 (style.scss에 6-components 로드 경로 확인 필요) |
| COMP-01 | `_layout.scss`가 5-objects에 @forward되어 로드됨 | smoke | 동일 | ❌ Wave 0 |
| COMP-01 | `docs/components/header.md` 파일 존재 | manual | `ls docs/components/header.md` | ❌ Wave 0 (docs/components/ 디렉토리 신규 생성) |
| COMP-01 | PC GNB HTML 스니펫에 aria-expanded 포함 여부 | manual | — | manual 검수 |
| COMP-01 | 모바일 패널에 aria-hidden 토글 패턴 포함 | manual | — | manual 검수 |

### Sampling Rate
- **Per task commit:** `npx sass scss/style.scss /dev/null --no-source-map`
- **Per wave merge:** 동일
- **Phase gate:** SCSS 컴파일 성공 + `docs/components/header.md` 존재 확인 후 `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `docs/components/` 디렉토리 신규 생성 필요
- [ ] `scss/5-objects/_layout.scss` 신규 파일 생성
- [ ] `scss/6-components/_header.scss` 신규 파일 생성
- [ ] `scss/5-objects/_index.scss`에 `@forward 'layout'` 추가
- [ ] `scss/6-components/_index.scss`에 `@forward 'header'` 추가

---

## Project Constraints (from CLAUDE.md)

CLAUDE.md 파일이 존재하지 않음 — 별도 프로젝트 전용 지침 없음. 대신 STATE.md의 Key Decisions가 프로젝트 제약으로 기능함:

- Bootstrap 5 기반 유지 (Bootstrap 제거 불가)
- KRDS / KWCAG 2.1 AA 준수 필수 (공공기관 납품)
- 인포마인드 언급 금지 (memory/feedback_no_infomind.md)
- 퍼블리싱 전담팀 — React/Vue 컴포넌트, 피그마 가이드 범위 외
- IE11 지원 없음 (2026년 기준 공공기관도 IE11 지원 종료)
- Dart Sass 1.98.0 — `@use`/`@forward` 모듈 시스템 사용, `@import` 사용 금지

---

## Sources

### Primary (HIGH confidence)
- W3C WAI APG — Disclosure Navigation: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/ — Disclosure 패턴 마크업, ARIA 속성, 키보드 인터랙션 확인
- W3C WAI APG — Disclosure Navigation Hybrid: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/ — 링크+토글 버튼 혼합 패턴 확인
- 프로젝트 소스 직접 검사 — `scss/2-tools/_breakpoints.scss`, `scss/6-components/_skip-nav.scss`, `scss/3-generic/_root.scss`, `scss/4-elements/_focus.scss` (실제 파일 읽기로 확인)

### Secondary (MEDIUM confidence)
- Bootstrap 5.3 Navbar docs (https://getbootstrap.com/docs/5.3/components/navbar/) — Bootstrap navbar accessibility, aria-current 패턴 확인
- MDN — ARIA menu role (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menu_role) — role="menu" 적용 범위 확인

### Tertiary (LOW confidence)
- 없음

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Bootstrap 5 기 설치됨, WAI-ARIA 패턴 W3C APG 공식 문서로 확인
- Architecture: HIGH — 기존 프로젝트 파일 직접 읽어 통합 지점 확인, _skip-nav.scss 패턴 계승
- Pitfalls: HIGH — `role="menu"` 오용 경고는 W3C APG 공식 문서에 명시; aria-hidden 동기화 이슈는 공공기관 접근성 실무 패턴

**Research date:** 2026-03-26
**Valid until:** 2026-06-26 (90일 — WAI-ARIA / Bootstrap 5 안정적 스펙)
