# Feature Landscape

**Domain:** HTML/CSS Publishing Guide System — Korean web publishing team (artpqUX)
**Researched:** 2026-03-26
**Confidence:** MEDIUM (Korean-specific standards verified via official KRDS/KWCAG sources; technical values cross-checked against community practice)

---

## Table Stakes

Features users (the publishing team) expect. Missing = system feels incomplete or unusable on real projects.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| ITCSS 7-layer SCSS architecture | Team agreed standard; prevents specificity conflicts | Medium | Layers: 1-settings, 2-tools, 3-generic, 4-elements, 5-objects, 6-components, 7-utilities |
| BEM naming convention document + Stylelint enforcement | Team agreed standard; prevents naming drift across developers | Low | Use `stylelint-selector-bem-pattern` or `@namics/stylelint-bem` |
| Design token definitions (color, type, spacing, grid) | Single source of truth; eliminates hardcoded values across codebase | Medium | JSON → SCSS variables + CSS custom properties via Style Dictionary |
| Responsive breakpoints + SCSS mixins | Every project is responsive; breakpoints must be consistent | Low | 4-tier: 360px / 768px / 1024px / 1280px (see Breakpoints section) |
| Common UI component snippets (HTML + SCSS) | Each new project re-invents the same components — core time waste | High | Minimum: button, form elements, card, table, modal, tab, pagination, breadcrumb |
| Accessibility checklist (KWCAG + WCAG 2.1 AA) | Public sector delivery requirement; legal obligation | Medium | KWCAG 2.2 expanded from 24 to 33 check items vs KWCAG 2.1 |
| Coding convention documentation | Prevents style debates and inconsistent code review | Low | Indentation, quotes, semicolons, comment language (Korean) |
| Eleventy documentation site | Team needs browsable reference during projects | Medium | Token/convention/component/accessibility sections with search |
| Starter kit directory (`starter/`) | Core value — new project bootstrap without re-discussion | Medium | Pre-configured SCSS folder, HTML template, config files |
| Korean typography defaults | Every Korean project needs correct Hangul rendering defaults | Low | Pretendard font stack, `word-break: keep-all`, line-height 1.6–1.75 |
| @use/@forward SCSS module system | Dart Sass standard; @import is deprecated and will be removed | Low | All partials use @use; public API exposed via @forward |

---

## Differentiators

Features that distinguish this system from a generic CSS boilerplate. Not universally expected, but high value for the team.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Pretendard GOV variant support | Government projects require Pretendard GOV (official since April 2024) | Low | Swap token; no structural change needed |
| pa11y-ci automated accessibility audit in build | Catches WCAG violations before delivery; no manual step needed | Medium | Runs against built HTML; integrates with npm scripts or CI |
| Style Dictionary token pipeline | JSON tokens generate both SCSS variables AND CSS custom properties simultaneously | Medium | Enables future theming; one edit propagates everywhere |
| 62.5% REM trick pre-configured | Team standard (1rem = 10px); reduces mental math in all pixel-to-rem conversions | Low | Set `html { font-size: 62.5%; }` in 4-elements layer; document clearly |
| 4px base spacing scale | Mathematical consistency; aligns with most design tools (8pt grid) | Low | Tokens: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px |
| KWCAG-specific HTML patterns | Public sector delivery; reduces rework after accessibility audits | Medium | Skip navigation, focus indicator enforcement, screen reader text class, WAI-ARIA landmarks |
| Documentation site offline-capable | Some government project environments restrict CDN access | Low | Self-host fonts + assets; no external CDN dependencies in production build |
| Component variant documentation | Shows BEM modifier usage in context; reduces guesswork | Low | Each component page: default state + all --modifier variants |
| Git branch naming + commit message convention doc | Reduces friction when onboarding new team members | Low | Korean commit messages; Conventional Commits type prefixes adapted to team |

---

## Anti-Features

Features to explicitly NOT build in this system.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| JavaScript component behavior | Publishing team scope is HTML/CSS only; JS adds dependency and maintenance burden | Document ARIA patterns for common interactions; link to existing JS libraries when needed |
| Storybook integration | JS-component-centric; does not fit HTML/CSS snippet workflow | Eleventy custom documentation templates serve the same browsable purpose |
| React/Vue/Angular component wrappers | Out of scope by team decision; creates framework coupling | Provide clean HTML + SCSS that any framework can consume |
| Figma design tooling | Designs come from external designers; not the team's domain | Reference Figma component names in token naming for shared vocabulary |
| Backend/server-side logic | Outside publishing scope | Starter kit outputs static HTML only |
| Automatic Figma-to-code generation | Generates non-BEM, non-ITCSS code; fights team conventions | Manual implementation with guide reference |
| CSS-in-JS | Requires JS framework; conflicts with plain HTML/CSS workflow | SCSS modules + CSS custom properties cover all dynamic theming needs |
| Full-blown design system governance tooling | Over-engineered for a focused publishing team | Simple Markdown documentation in Eleventy is sufficient |

---

## Feature: UI Component Library

### Minimum required components (must-have for Korean web projects)

Based on analysis of KRDS (Korean Government Design System) component categories and common public sector site patterns:

**Navigation & Wayfinding**
- Breadcrumb (`breadcrumb`) — mandatory for deep-hierarchy public sector sites
- Pagination (`pagination`) — list/table pages universally require pagination
- Tab (`tab`) — content categorization; appears in nearly every service site
- Skip Navigation (`skip-nav`) — KWCAG hard requirement; must be first focusable element

**Actions**
- Button (`btn`) — primary, secondary, ghost, disabled, small/medium/large variants
- Link Button (`btn--link`) — visually styled anchor, distinct from native `<a>`

**Forms**
- Input (`input`) — text, email, password, number; with error/success states
- Textarea (`textarea`)
- Select (`select`) — custom styled; keyboard accessible
- Checkbox (`checkbox`) — single and group
- Radio (`radio`) — single and group
- Form Field wrapper (`form-field`) — label + input + error message group
- File Upload (`file-upload`) — common in public sector form submissions

**Data Display**
- Table (`table`) — responsive table; sortable column header variant; caption required for KWCAG
- Card (`card`) — content listing; image + title + description + CTA pattern
- Badge / Tag (`badge`, `tag`) — status labels; must have text alternative (not color alone)
- Alert (`alert`) — info / success / warning / error; role="alert" for screen readers

**Overlay**
- Modal (`modal`) — focus trap required; close on Escape; ARIA dialog pattern

**Feedback**
- Toast / Snackbar (`toast`) — transient notifications; ARIA live region required

**Layout Helpers**
- Container (`container`) — max-width wrapper with responsive padding
- Grid (`grid`) — 12-column grid object (ITCSS Objects layer)
- Section Heading (`section-heading`) — consistent heading + optional description pattern

### Nice-to-have components (defer until validation)

- Accordion
- Slider / Carousel (accessibility complexity is high; defer)
- Date Picker (high complexity; reference a JS library instead)
- Tooltip
- Step Indicator (wizard / multi-step form pattern)
- Side Navigation (for large content sites)

---

## Feature: Documentation Site

### Must-have features

| Feature | Rationale | Implementation |
|---------|-----------|----------------|
| Full-text search | Team must find token names and component names quickly | Eleventy + client-side search (Pagefind or Fuse.js) |
| Syntax-highlighted code blocks | Copy-pasteable HTML/SCSS snippets are the primary deliverable | Eleventy with highlight.js or Prism via plugin |
| One-click copy button on code blocks | Reduces friction; saves time on every component reference | Small vanilla JS; no dependency needed |
| Live HTML preview | See component rendering without leaving the docs | Inline iframe or details/summary toggle with rendered HTML |
| Token reference table | Designers and publishers need to agree on token names | Auto-generated from Style Dictionary output |
| Component state showcase | Each variant (default, hover, disabled, error) visible at a glance | Per-component page template |
| Accessibility notes per component | Explicit KWCAG/WCAG mapping reduces audit surprises | Fixed section in each component template |
| Breadcrumb / section navigation | Docs site itself must model correct accessible navigation | Required for usability at any content depth |

### Nice-to-have features

| Feature | Rationale |
|---------|-----------|
| Dark mode preview toggle | Useful for testing color token contrast in both schemes |
| Responsive preview (device size toggle) | Validate components at each breakpoint visually |
| Print-friendly stylesheet | Some public sector documentation is printed; offline reference |
| Changelog / version history page | Track what changed between project uses |

---

## Feature: Starter Kit (`starter/` directory)

### Must-have files and structure

```
starter/
├── src/
│   ├── scss/
│   │   ├── 1-settings/
│   │   │   ├── _colors.scss
│   │   │   ├── _typography.scss
│   │   │   ├── _spacing.scss
│   │   │   ├── _breakpoints.scss
│   │   │   └── _index.scss
│   │   ├── 2-tools/
│   │   │   ├── _mixins.scss        (breakpoint, visually-hidden, clearfix)
│   │   │   ├── _functions.scss     (rem(), em(), strip-unit())
│   │   │   └── _index.scss
│   │   ├── 3-generic/
│   │   │   ├── _normalize.scss
│   │   │   ├── _box-sizing.scss
│   │   │   └── _index.scss
│   │   ├── 4-elements/
│   │   │   ├── _base.scss          (html 62.5%, body font defaults)
│   │   │   ├── _typography.scss    (h1–h6, p, a base styles)
│   │   │   ├── _forms.scss
│   │   │   └── _index.scss
│   │   ├── 5-objects/
│   │   │   ├── _container.scss
│   │   │   ├── _grid.scss
│   │   │   └── _index.scss
│   │   ├── 6-components/           (empty; populated per project)
│   │   │   └── _index.scss
│   │   ├── 7-utilities/
│   │   │   ├── _visually-hidden.scss
│   │   │   ├── _display.scss
│   │   │   ├── _spacing.scss
│   │   │   └── _index.scss
│   │   └── main.scss               (root @use entry point)
│   └── html/
│       └── _base.html              (minimal HTML5 template)
├── tokens/
│   └── tokens.json                 (Style Dictionary source)
├── .stylelintrc.json
├── .editorconfig
├── package.json                    (npm scripts: build, watch, lint, a11y)
└── README.md
```

### Must-have npm scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `build` | dart-sass compile | Compile SCSS to CSS |
| `watch` | dart-sass --watch | Development mode |
| `lint:css` | stylelint | BEM + SCSS rules enforcement |
| `tokens` | style-dictionary build | Regenerate SCSS + CSS vars from tokens.json |
| `a11y` | pa11y-ci | Accessibility audit against built HTML |

---

## Feature: KWCAG-Specific Accessibility Requirements

KWCAG 2.1 (2019) is the legally enforceable standard for Korean public sector sites. KWCAG 2.2 expanded from 24 to 33 check items and added mobile/touch and focus visibility criteria. Both must be addressed for government project delivery.

### Requirements that require specific HTML/CSS patterns (beyond generic WCAG 2.1 AA)

| Requirement | Technical Implementation | Confidence |
|-------------|-------------------------|------------|
| Skip navigation link (건너뛰기 링크) | `<a href="#main-content" class="skip-nav">` as first focusable element; visually hidden until focused | HIGH — legally required for Korean public sector |
| Keyboard focus indicator always visible | `outline` never set to `none` or `0` without alternative; minimum 3:1 contrast for focus ring (WCAG 2.2) | HIGH |
| Text alternatives for all non-text content | `alt` attribute required on all `<img>`; decorative images use `alt=""` | HIGH |
| Table captions required | `<caption>` element mandatory for all data tables; screen reader association | HIGH |
| Form label association | All form inputs have associated `<label>` via `for`/`id` or wrapping; no placeholder-only labels | HIGH |
| Color not the sole distinguisher | Error states, status indicators must use icon + text + color (never color alone) | HIGH |
| Touch target minimum size | Interactive elements minimum 44x44px (KWCAG mobile addition) | MEDIUM — applies to mobile responsive layouts |
| Korean text word-break | `word-break: keep-all` on body text; prevents mid-syllable line breaks that break Korean readability | MEDIUM — Korean-specific, not in WCAG |
| Language declaration | `<html lang="ko">` required; enables correct screen reader pronunciation of Hangul | HIGH |
| Audio/video captions | Any media content requires captions or transcripts | HIGH |
| Consistent navigation | Navigation landmarks (header, nav, main, footer) must be consistent across pages | MEDIUM |
| WAI-ARIA landmark roles | `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"` where native elements absent | HIGH |
| Screen reader text utility class | `.sr-only` / `.visually-hidden` class required for icon-only buttons and decorative patterns | HIGH |
| Contrast minimum 4.5:1 (normal text) | Design tokens must be validated at definition time, not after delivery | HIGH |
| Contrast minimum 3:1 (large text 18px+) | Applies to headings and large UI text | HIGH |

### Accessibility testing toolchain

| Tool | Purpose | When |
|------|---------|------|
| pa11y-ci | Automated WCAG 2.1 AA scan against built HTML | Pre-commit or CI |
| axe DevTools (browser extension) | Manual spot-check during development | During component development |
| NVDA (Windows) + JAWS (Windows) | Korean government acceptance tests typically require screen reader testing | Before client delivery |
| Keyboard-only navigation test | Manual: navigate entire page using Tab, Shift+Tab, Enter, Escape, arrow keys | Before each component merge |

---

## Feature: Korean Typography Defaults

### Font stack (recommended — MEDIUM confidence, verified from Pretendard official docs)

**For general web projects:**
```css
font-family: "Pretendard Variable", Pretendard, -apple-system,
  BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
  "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;
```

**For government/public sector projects (use Pretendard GOV):**
```css
font-family: "Pretendard GOV Variable", "Pretendard GOV",
  "Pretendard Variable", Pretendard, -apple-system,
  BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo",
  "Noto Sans KR", "Malgun Gothic", sans-serif;
```

Note: Pretendard GOV became the official Korean government UI typeface in April 2024 (MOIS/NIA designation).

### Typography scale (must-have tokens)

| Token name | Value | Use |
|-----------|-------|-----|
| `font-size-base` | 1.6rem (16px with 62.5% trick) | Body text baseline |
| `font-size-sm` | 1.4rem (14px) | Captions, helper text |
| `font-size-md` | 1.6rem (16px) | Body, form labels |
| `font-size-lg` | 1.8rem (18px) | Lead paragraph |
| `font-size-xl` | 2.0rem (20px) | H5–H6 |
| `font-size-2xl` | 2.4rem (24px) | H4 |
| `font-size-3xl` | 3.2rem (32px) | H3 |
| `font-size-4xl` | 4.0rem (40px) | H2 |
| `font-size-5xl` | 4.8rem (48px) | H1 |
| `line-height-body` | 1.6 | Body text — minimum WCAG; 1.75 preferred for Korean |
| `line-height-heading` | 1.3 | Heading elements |
| `word-break` | `keep-all` | Applied globally to body; Korean-specific |

### Korean-specific CSS rules (must-have in 4-elements layer)

```scss
body {
  word-break: keep-all;           // Prevent mid-word breaks in Korean
  overflow-wrap: break-word;      // Handle long URLs and code strings
  -webkit-text-size-adjust: 100%; // Prevent iOS auto-zoom on orientation change
  font-kerning: normal;
}
```

---

## Feature: Responsive Breakpoints

### Recommended breakpoints for Korean web projects

Based on Korean device usage statistics (iPhone prevalence among 20–30s; Galaxy prevalence elsewhere; Galaxy Tab and iPad for tablets).

| Name | Min-width | Design at | Target |
|------|-----------|-----------|--------|
| `mobile` (default, no mixin) | — | 360px | Android baseline (Galaxy A series) |
| `tablet-sm` | 768px | 768px | iPad mini, Galaxy Tab small |
| `tablet` | 1024px | 1024px | iPad, Galaxy Tab large, laptop |
| `desktop` | 1280px | 1280px | Standard desktop monitor |
| `wide` | 1440px | 1440px | Large desktop (optional) |

Key evidence: Korean usage data shows a significant gap between 428px–601px where few devices land, meaning a single mobile breakpoint below 768px is sufficient. No need for a separate 480px breakpoint.

### SCSS mixin pattern (must-have in 2-tools layer)

```scss
// Mobile-first approach — min-width queries only
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'tablet-sm' {
    @media (min-width: 768px) { @content; }
  } @else if $breakpoint == 'tablet' {
    @media (min-width: 1024px) { @content; }
  } @else if $breakpoint == 'desktop' {
    @media (min-width: 1280px) { @content; }
  } @else if $breakpoint == 'wide' {
    @media (min-width: 1440px) { @content; }
  }
}
```

Usage: `@include respond-to('tablet') { ... }`

---

## Feature: Git Workflow Conventions

### Branch naming (must-have in coding convention doc)

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feat/[description]` | `feat/button-component` |
| Fix | `fix/[description]` | `fix/modal-focus-trap` |
| Docs | `docs/[description]` | `docs/bem-naming-guide` |
| Chore | `chore/[description]` | `chore/update-dependencies` |
| Hotfix | `hotfix/[description]` | `hotfix/contrast-ratio-header` |
| Release | `release/[version]` | `release/1.2.0` |

### Commit message format (Korean, must-have)

Team policy: Korean commit messages. Adopt Conventional Commits type prefixes in Korean context:

```
[타입]: [무엇을 했는지 — 50자 이하]

[선택] 상세 내용 — 왜 이 변경을 했는지 설명
```

| 타입 | 용도 |
|-----|------|
| `feat` | 새 기능/컴포넌트 추가 |
| `fix` | 버그, 스타일 오류 수정 |
| `docs` | 문서, 가이드 변경 |
| `style` | 들여쓰기, 따옴표 등 코드 의미 변경 없는 서식 수정 |
| `refactor` | 기능 변경 없는 구조 개선 |
| `chore` | 빌드, 패키지, 설정 변경 |
| `a11y` | 접근성 개선 (팀 커스텀 타입) |
| `token` | 디자인 토큰 변경 (팀 커스텀 타입) |

Example: `feat: 버튼 컴포넌트 SCSS + HTML 스니펫 추가`

### Branch strategy (must-have)

For a small publishing team (3–7 people), a simplified GitHub Flow is sufficient:
- `main` — always deployable; documentation site source
- Short-lived feature branches from `main`; merge via Pull Request
- No separate `develop` branch (over-engineered for this team size)
- Hotfixes branch from `main`; merge back to `main` directly

Git Flow (with `develop`) is NOT recommended — unnecessary complexity for a documentation/guide system without release cadence.

---

## Feature Dependencies

```
Design Tokens (tokens.json)
  → SCSS Variables (_colors.scss, _typography.scss, _spacing.scss)
    → All component SCSS (import via @use)
      → Documentation site component pages (HTML snippets)
        → pa11y-ci accessibility audit

ITCSS layer order
  → 1-settings → 2-tools → 3-generic → 4-elements → 5-objects → 6-components → 7-utilities
    (each layer @use's the layers above it; never imports downward)

Starter kit
  → Requires: SCSS architecture + tokens + mixins + editorconfig + stylelintrc complete
```

---

## MVP Recommendation

**Build in this order, stop when usable:**

1. **SCSS architecture skeleton** — ITCSS folder structure, @use/@forward wiring, 62.5% base, normalize (blocks nothing else from starting)
2. **Design tokens** — colors, spacing, typography as SCSS variables (unblocks all component work)
3. **Responsive breakpoints + core mixins** — respond-to(), rem(), visually-hidden (needed by every component)
4. **Button + Form components** — highest reuse rate; validate BEM naming and ITCSS placement
5. **Eleventy docs site shell** — navigation, token reference page, one component page template
6. **Accessibility patterns** — skip nav, focus styles, sr-only class, KWCAG checklist document
7. **Remaining components** — card, table, modal, tab, pagination, breadcrumb
8. **Starter kit packaging** — consolidate validated files into `starter/` with README

**Defer:**
- Pretendard GOV swap — document the pattern, implement only when first government project starts
- pa11y-ci CI integration — implement after docs site is built (needs a URL to test)
- Documentation site search — implement after enough content exists to warrant search
- Nice-to-have components (accordion, date picker, tooltip) — add as real projects request them

---

## Sources

- Pretendard official documentation: [GitHub - orioncactus/pretendard](https://github.com/orioncactus/pretendard/blob/main/packages/pretendard/docs/en/README.md) — HIGH confidence
- KRDS component categories: [HANUI component library](https://hanui.io/components/list) based on KRDS — MEDIUM confidence
- KRDS launch: [Design Compass — KRDS Korean Government Design System](https://designcompass.org/en/2024/04/17/krds/) — MEDIUM confidence
- KWCAG 2025 criteria expansion (24→33 items): [jinbytes.com KWCAG 2025 summary](https://jinbytes.com/entry/KWCAG-2025-웹-접근성-최신-기준-정리) — MEDIUM confidence (article describes changes but does not list all 33 criteria)
- KWCAG legal framework: [W3C WAI — Republic of Korea](https://www.w3.org/WAI/policies/republic-of-korea/) — HIGH confidence
- KWCAG overview: [blog.greeden.me — Understanding KWCAG](https://blog.greeden.me/en/2024/11/01/understanding-koreas-web-accessibility-standard-kwcag-building-an-inclusive-web-environment-for-all/) — MEDIUM confidence
- Korean breakpoint analysis: [velog.io — 반응형 UI 해상도 기준](https://velog.io/@sangpok/%EB%B0%98%EC%9D%91%ED%98%95-UI-%ED%95%B4%EC%83%81%EB%8F%84-%EA%B8%B0%EC%A4%80) — MEDIUM confidence
- Korean typography (line-height, word-break): community research aggregated from [lqez.github.io](https://lqez.github.io/blog/hangul-typo-on-web.html) and [Naver SmartStudio Blog](https://smartstudio.tech/deepdive-linebreak-css-about-language/) — MEDIUM confidence
- Stylelint BEM: [stylelint-selector-bem-pattern](https://github.com/simonsmith/stylelint-selector-bem-pattern), [@namics/stylelint-bem](https://www.npmjs.com/package/@namics/stylelint-bem) — HIGH confidence
- pa11y-ci: [pa11y GitHub](https://github.com/pa11y/pa11y) — HIGH confidence
- Style Dictionary: [GitHub - style-dictionary](https://github.com/style-dictionary/style-dictionary) — HIGH confidence
- ITCSS+BEM starter patterns: [benmarshall.me ITCSS guide](https://benmarshall.me/itcss/) — MEDIUM confidence
- Conventional Commits: [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/) — HIGH confidence

---

## Gaps to Address

- **KWCAG 2.2 full criteria list** — Only general category information found. The complete 33-item checklist requires direct access to the official KISA/NIA KWCAG 2.2 specification (Korean language). Recommend obtaining the official PDF from `https://www.wa.or.kr` before finalizing the accessibility checklist feature.
- **Pretendard GOV CDN URL** — The government variant CDN path was not confirmed in research. Verify via `https://github.com/orioncactus/pretendard` before using in starter kit.
- **KRDS exact breakpoint values** — The official KRDS technical spec was not publicly accessible in English. Values above are derived from Korean community practice, not KRDS official documentation. Confirm at `https://uiux.egovframe.go.kr`.
- **Korean screen reader list** — JAWS and NVDA are referenced in international contexts. The dominant Korean screen reader (Sense Reader, NVDA-ko) market for government QA testing was not confirmed. Validate with team members who have delivered public sector projects previously.
