# Domain Pitfalls

**Domain:** ITCSS + BEM + SCSS(dart-sass) + Eleventy publishing guide system
**Researched:** 2026-03-26
**Team context:** Korean web publishers (HTML/CSS specialists, no JS frameworks)

---

## Critical Pitfalls

Mistakes that cause rewrites, broken builds, or silent regressions.

---

### Pitfall 1: Dart Sass @import Still In Use (Build Broken in Sass 3.0)

**What goes wrong:**
Any `@import` statement in SCSS triggers deprecation warnings starting Dart Sass 1.80.0 and will cause a hard build error in Dart Sass 3.0.0 (scheduled no earlier than 2 years after 1.80.0). If the team's starters or docs site SCSS ever use `@import`, future Sass upgrades will break the build silently until CI fails on upgrade.

**Why it happens:**
Developers copy old tutorials or third-party SCSS snippets that still use `@import`. The `@use`/`@forward` module system requires significantly different mental models — `@use` namespaces all members, `@forward` re-exports without consuming. Teams new to the module system often mix both syntaxes because Dart Sass accepts them simultaneously during the deprecation window.

**Consequences:**
- Deprecation warnings clutter every build, hiding real errors
- Hard breakage when upgrading Dart Sass past the 3.0 threshold
- Third-party SCSS dependencies (icon libraries, grid systems) still on `@import` cause compilation failures or namespace pollution

**Prevention:**
- Add `@use` / `@forward` rules to Stylelint to flag `@import` at commit time
- In `1-settings/`, `2-tools/`, `3-generic/` etc., each layer must expose an `_index.scss` that uses `@forward` to re-export partials. Consumers then `@use '1-settings'` once instead of importing individual partials
- Use the official Sass migrator to handle bulk migration: `npx sass-migrator module --migrate-deps main.scss`
- When integrating third-party SCSS, check if the package is already on the module system. If not, wrap its `@import` usage in an isolated `_vendor/` partial and document it as a known exception

**Detection:**
- Warning in Dart Sass build output: "Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0"
- `stylelint` with `scss/at-import-no-partial-leading-underscore` and `no-invalid-position-at-import-rule` rules

**Confidence:** HIGH — sourced from official Sass breaking-change documentation

---

### Pitfall 2: @use/@forward Namespace Collision and Scoping Mistakes

**What goes wrong:**
The `@use` module system gives each loaded module a namespace derived from the filename. A file named `_tokens.scss` becomes `tokens.$color-primary`. If two files in different ITCSS layers both forward the same sub-partial, consuming files that `@use` the layer index get the member under an unexpected namespace, or members are duplicated/undefined.

**Why it happens:**
Teams accustomed to `@import` expect all variables to be globally available. With `@use`, a variable loaded in `2-tools/_index.scss` is NOT automatically available in `4-elements/_buttons.scss` — it must be explicitly `@use`d there too.

**Common specific mistakes:**
1. Writing `@forward '1-settings'` in `main.scss` and then trying to use `$spacing-4` without a namespace — fails silently (outputs nothing, no error)
2. Using `@use 'sass:math'` but forgetting `math.div()` syntax and writing old `/` division — deprecated in Sass 1.33+, error in future versions
3. Writing `@use` after any rule other than `@forward` — Sass throws a hard error because `@use` must come before all other rules in a file

**Prevention:**
- Establish a convention: every partial that defines shared members (tokens, mixins, functions) gets `@forward`ed through its layer `_index.scss`, and every partial that *consumes* shared members gets its own `@use` statement at the top
- Prefer `@use '../../1-settings' as s` with a short alias when namespace verbosity is a problem
- Replace all `/` division with `math.div()` from `sass:math` from the start of the project; do not use it at all

**Detection:**
- Dart Sass error: "There is no variable named $xxx" when consumed without the namespace
- Dart Sass error: "@use rules must be written before any other rules"

**Confidence:** HIGH — sourced from official Sass @use and @forward documentation

---

### Pitfall 3: Style Dictionary v4 → v5 Breaking Changes

**What goes wrong:**
Style Dictionary v5 introduced a hard Node.js 22 minimum (v4 requires Node 18). The reference syntax customization is removed — if any token JSON uses a custom delimiter (e.g., `[[color.primary]]`), it silently breaks. Non-leaf-node references (referencing a token group rather than a leaf token) now throw errors.

**Why it happens:**
The jump from v3/v4 to v5 is significant. v4 already broke CTI (Category/Type/Item) conventions in favor of explicit `type` properties. v5 doubles down on DTCG alignment, where every token must have `$value` and `$type` (dollar-prefixed keys). Any token file using bare `value:` / `type:` format (v3 style) may still work in v4 but is not DTCG-compliant and will require migration for v5.

**v3 → v4 breaking changes (critical):**
- Configuration is now async: `await sd.buildAllPlatforms()` is required — forgetting `await` produces undefined behavior with no error
- The `hooks` property replaces top-level `parsers`, `transforms`, `formats` registrations
- CTI-based transforms removed: `name/cti/kebab` → `name/kebab`; custom token matchers checking `attributes.category` will fail — use `token.type` instead
- `extend()` is now async
- ESM only; CommonJS configs no longer work

**v4 → v5 breaking changes (critical):**
- Node.js 22+ required (breaking if CI runs Node 18 or 20)
- References to non-leaf token nodes forbidden; groups cannot be referenced
- Reference syntax delimiters fixed to `{token.path}` — no overrides allowed
- DTCG token format (`$value`, `$type`, `$description`) is the expected format

**Prevention:**
- Pin the Style Dictionary version explicitly in `package.json` (`"style-dictionary": "^4.x.x"`) and document the target major version in `starter/README.md`
- Decide at project start: DTCG format or legacy format? Use DTCG (`$value`/`$type`) from day one to avoid a future migration
- Write a small token validation script that runs in CI and verifies all tokens have `$type` defined
- When upgrading v3 → v4, run the provided codemod: `npx codemod styledictionary/4/migration-recipe`

**Detection:**
- Build errors about missing `await` on async calls produce silent/undefined output
- "Cannot reference token group" error in v5 when referencing group nodes

**Confidence:** HIGH — sourced from official Style Dictionary v4 migration page and v5 migration documentation

---

### Pitfall 4: Eleventy v3 ESM Migration Breaks All CommonJS Configs

**What goes wrong:**
Eleventy v3 is ESM-only. Any `eleventy.config.js` using `require()` / `module.exports` will throw `ERR_REQUIRE_ESM` at startup. The `eleventy-sass` plugin (the standard SCSS integration for Eleventy) has its own version constraints: `eleventy-sass` v3 requires Node.js 22 and the `--experimental-require-module` flag; older versions do not support Eleventy v3 at all.

**Why it happens:**
ESM migration is a single configuration flag (`"type": "module"` in `package.json`) but it changes how all `.js` files in the project are parsed. Any CommonJS file (plugins, data files, build scripts) that doesn't have a `.cjs` extension will break. `__dirname` and `__filename` are not available in ESM — code using them must switch to `import.meta.url`.

**Consequences:**
- Build fails on fresh install or CI with cryptic ESM errors
- The `permalink: "raw"` default change in v3's custom template language means SCSS files may output to the wrong path if `compileOptions.permalink` is not explicitly configured in the Sass plugin

**Prevention:**
- Start all new Eleventy projects with v3. Do not create a v2 project then upgrade
- Set `"type": "module"` in `package.json` from day one
- In `eleventy.config.js`, use `import` not `require`. Import JSON explicitly with `{ with: { type: "json" } }` assertion
- Configure the SCSS plugin with an explicit `compileOptions.permalink` function to control CSS output path — do not rely on the default
- Pin `eleventy-sass` at a version compatible with both Eleventy 3 and your Node version. Document the required Node version in `starter/package.json` engines field
- Replace `__dirname` with `new URL('.', import.meta.url).pathname`
- Use the `eleventy-upgrade-help` plugin when migrating existing v2 sites

**Sass-specific gotcha:**
The `compileOptions.permalink` option changed its default from `true` to `"raw"` in v3. Without explicit configuration, SCSS files may be served as raw `.scss` text rather than compiled `.css`. Always specify:
```js
compileOptions: {
  permalink: (contents, inputPath) => (data) => data.page.filePathStem + '.css'
}
```

**Detection:**
- `Error [ERR_REQUIRE_ESM]` at Eleventy startup
- SCSS files appearing as raw text in output instead of compiled CSS

**Confidence:** HIGH — sourced from multiple community upgrade reports and the eleventy-sass GitHub issue tracker

---

## Moderate Pitfalls

Mistakes that cause regressions, maintenance pain, or team friction but do not destroy the build.

---

### Pitfall 5: ITCSS Object/Component Layer Confusion

**What goes wrong:**
The Objects layer (05) and Components layer (06) have ambiguous boundaries. Teams place styles in Objects that belong in Components, or duplicate cosmetic styles in Objects by accident. This defeats ITCSS's core benefit — the single-source-of-truth for where a style originates.

**Why it happens:**
Harry Roberts' original ITCSS definition describes Objects as layout-related, cosmetic-free patterns (the media object, flag object, grid). Components are full visual units with brand styling. In practice, teams treat Objects as "small components" and Components as "large components."

**Specific failure patterns:**
- A `c-card` component is split across both `05-objects/_o-box.scss` (padding/border-radius) and `06-components/_c-card.scss` (colors/typography). Debugging requires checking two files
- Generic layout grid defined in Objects layer, then overridden with specificity tricks in Components layer, creating the specificity wars ITCSS was designed to prevent
- Utilities layer (07) used to override component styles due to specificity creep from Component overrides — `!important` appears in utilities

**Prevention:**
- Write a team definition: "Objects = cosmetic-free layout structures (grid, container, media). Everything with a color or font is a Component or higher"
- If in doubt, put it in Components — Objects can always be extracted later
- Never override an Object inside a Component via added specificity; modify via a modifier class on the Object itself

**Confidence:** MEDIUM — sourced from xfive.co ITCSS guide and community patterns; some subjectivity inherent to the layer boundary question

---

### Pitfall 6: BEM Element Double-Underscore Nesting Anti-Pattern

**What goes wrong:**
Developers write `block__parent__child` to reflect DOM nesting depth, producing class names like `.card__header__title` or `.nav__list__item__link`. This is explicitly against BEM specification and creates unmaintainable class strings.

**Why it happens:**
The naming convention feels logical when developers try to "document" the HTML structure in the class name. Korean publishing teams receiving designs from external designers may try to mirror the Figma layer hierarchy in their BEM class names.

**Consequences:**
- Class names become brittle and break when the designer changes the DOM structure (e.g., removes the `header` wrapper but keeps the `title`)
- Stylelint BEM pattern matching fails because the double-underscore appears more than once
- CSS selectors like `.card__header__title` are technically valid but communicate incorrect block ownership

**Prevention:**
- BEM rule: the double underscore `__` appears exactly once per class name. Everything is a direct child of the Block, regardless of DOM depth
- Correct: `.card__title`, `.card__header`, `.card__body` — not `.card__header__title`
- If content inside `.card__header` is complex enough to need sub-elements, make it a new block: `class="card-header card-header__title"` (the `card-header` block owns its elements)
- Document this with before/after examples in the team guide; this is the #1 BEM mistake for teams new to the methodology

**Confidence:** HIGH — sourced from official BEM methodology documentation and Smashing Magazine BEM guide

---

### Pitfall 7: BEM Modifier Used Without Base Class

**What goes wrong:**
HTML written as `<button class="btn--primary">` instead of `<button class="btn btn--primary">`. The modifier class is applied alone, meaning it must define all button styles (defeating reuse) or some styles silently fail.

**Why it happens:**
Developers think of modifiers as "variants" and write only the variant class, expecting it to be self-contained. Some older CSS frameworks reinforce this pattern.

**Consequences:**
- Modifiers must redefine all base styles — no reuse, high maintenance
- Removing or adding the modifier changes all styles, not just the override
- Stylelint BEM plugin cannot detect this — it is a HTML authoring mistake, not a CSS mistake

**Prevention:**
- Document the rule prominently: "Modifiers augment, never replace"
- Include a Stylelint rule or custom check in the HTML linting step (if any)
- In the Eleventy component documentation templates, always show both classes in the example HTML snippets
- Code review checklist item: "Does every modifier class appear alongside its base class?"

**Confidence:** HIGH — sourced from BEM official documentation and Sparkbox BEM guide

---

### Pitfall 8: Stylelint BEM Plugin Requires Explicit Configuration

**What goes wrong:**
`stylelint-selector-bem-pattern` has no default configuration. Installing the plugin without providing a primary option object causes it to silently do nothing (no errors, no validation). The plugin also treats every file as an "implicit component" — meaning it derives the expected block name from the filename. A file named `_buttons.scss` will only allow `.btn` or `.buttons` block names, not arbitrary block names.

**Why it happens:**
The plugin's README is sparse on the no-default-config behavior. Teams install it, see no errors, and believe BEM validation is active when it is not.

**Consequences:**
- BEM validation silently inactive; non-compliant class names ship undetected
- Unexpected validation failures when file name does not match the block name used inside (e.g., a file named `_form.scss` that contains `.input` blocks)

**Prevention:**
- Always provide an explicit configuration with a regex that matches the team's BEM pattern:
  ```json
  "plugin/selector-bem-pattern": {
    "preset": "bem",
    "componentName": "[A-Z][a-zA-Z]+",
    "componentSelectors": {
      "initial": "^\\.{componentName}(?:__[a-z][a-zA-Z0-9-]+)?(?:--[a-z][a-zA-Z0-9-]+)?$"
    }
  }
  ```
- Use a naming convention that matches your BEM variant (e.g., block names are lowercase kebab, not camelCase) and document the exact regex used in the team guide
- Name SCSS files to match their primary block name: `_c-card.scss` for the `.c-card` block (ITCSS component prefix + block name)

**Confidence:** HIGH — sourced from `stylelint-selector-bem-pattern` GitHub README and npm documentation

---

### Pitfall 9: pa11y-ci Chromium/Puppeteer Failures in CI

**What goes wrong:**
pa11y-ci uses Puppeteer (headless Chrome) to load pages and run accessibility checks. On Linux CI runners (GitHub Actions, Ubuntu 22.04+), Chrome may not be found at the default path, causing pa11y to fail before running any tests. The error is a path/sandbox issue, not an accessibility issue.

**Why it happens:**
- Ubuntu 22.04+ changed the default Chrome installation path
- pa11y-ci v3 does not resolve this automatically; v4 fixes it but requires pa11y 9
- Docker containers for CI typically require `--no-sandbox` in Chrome launch args for security reasons

**Consequences:**
- CI accessibility step fails on every run with a Puppeteer launch error
- Teams disable the step to unblock CI, and it never gets re-enabled

**Prevention:**
- Use pa11y-ci v4 (based on pa11y 9 and modern Puppeteer) to avoid the Ubuntu 22.04 path issue
- Add Chrome sandbox args to `.pa11yci` config:
  ```json
  {
    "defaults": {
      "chromeLaunchConfig": {
        "args": ["--no-sandbox", "--disable-setuid-sandbox"]
      }
    },
    "urls": []
  }
  ```
- For local development, the Eleventy dev server must be running before pa11y-ci runs. Add a `pretest` npm script that starts the server, or use a concurrency tool
- Require even-numbered LTS Node.js (20 or 22) for pa11y-ci

**Second gotcha — sitemap vs URL list:**
If a `sitemap` key is present in `.pa11yci`, the `urls` array is completely ignored. This is undocumented behavior that causes teams to believe they have URL coverage when they do not.

**Detection:**
- `Error: Failed to launch the browser process` in CI output
- Zero test results when both `sitemap` and `urls` are configured

**Confidence:** HIGH — sourced from pa11y-ci GitHub README and Spring Nature CI integration article

---

### Pitfall 10: 62.5% Root Font-Size Trick Breaks Third-Party Components and User Preferences

**What goes wrong:**
Setting `html { font-size: 62.5% }` (so 1rem = 10px) interferes with users who have changed their browser default font size for accessibility reasons. It also breaks any third-party CSS that assumes 1rem ≈ 16px — tooltips, modal libraries, or copied components will render at 37.5% of their intended size.

**Why it happens:**
The project has already decided to use this technique (noted in `PROJECT.md`: "62.5% REM 트릭 적용(1rem = 10px)"). It is a developer convenience that trades accessibility correctness for math simplicity.

**Consequences:**
- A user who sets their browser default to 24px for low-vision reasons sees body text at a smaller effective size than a standard 16px site would provide, because `html { font-size: 62.5% }` scales down their preference
- `body { font-size: 1.6rem }` (the common mitigation) only fixes body-level inheritance; form inputs, `<select>`, `<button>` and other form elements do not inherit font-size in most browsers and remain broken
- Any SCSS or CSS copied from a design system assuming 16px base renders incorrectly

**Prevention (given the team has already decided to use this technique):**
- Mandatory: set `body { font-size: 1.6rem }` — but go further and also explicitly set `input, button, select, textarea { font-size: 1.6rem }` to cover non-inheriting elements
- Never mix rem-based third-party libraries with this technique without auditing their font sizes first
- Document the 62.5% convention clearly in `starter/README.md` with a warning that any copied CSS using rem units must be recalculated (divide original rem value by 0.625)
- For components that will be exposed in the public guide site, add a note in the accessibility checklist: "Test with browser default font size set to 24px — does the text still render correctly?"
- Consider SCSS mixins that convert px to rem using the 10px base, making the math benefit explicit in code rather than relying on the global font-size hack

**Confidence:** HIGH — sourced from FED Mentor detailed analysis and Adrian Roselli accessibility post

---

## Minor Pitfalls

Smaller issues that cause confusion or inconsistency but are easily caught.

---

### Pitfall 11: ITCSS Utilities Layer Specificity vs BEM Modifier Overlap

**What goes wrong:**
Utility classes (07-utilities, e.g., `.u-visually-hidden`, `.u-text-center`) are meant to be single-purpose, immutable overrides. If they share responsibility with BEM modifiers (e.g., `.c-card--text-center`), developers are unsure which to use, resulting in inconsistent code.

**Prevention:**
- Write a rule: Utilities are for cross-component, project-wide overrides. BEM modifiers are for component-specific state or variant
- Utilities should carry `!important` intentionally (they are the exception to the rule, by design in ITCSS) — document this explicitly so publishers understand it is not a mistake

**Confidence:** MEDIUM

---

### Pitfall 12: Style Dictionary Async Build Not Awaited in Custom Scripts

**What goes wrong:**
When the team writes a custom Node.js build script wrapping Style Dictionary v4+ and forgets `await` on `buildAllPlatforms()`, the script exits before tokens are written. No error is thrown.

**Prevention:**
- Always use `async/await` or `.then()` chaining in token build scripts
- Add a post-build check in the npm script that verifies the output file exists and has a non-zero size

**Confidence:** HIGH

---

### Pitfall 13: YAML Frontmatter Tabs in Eleventy v3

**What goes wrong:**
Eleventy v3 upgraded `js-yaml` from v3 to v4, which is strict about tabs in YAML frontmatter. Any `.md` or `.njk` template file using tabs in its frontmatter block breaks the build with a cryptic YAML parse error.

**Prevention:**
- Configure the editor (`.editorconfig`) to use 2 spaces for all template files
- Add a `.editorconfig` to the starter kit with `indent_style = space`

**Confidence:** HIGH — sourced from Eleventy v3 upgrade notes

---

### Pitfall 14: Korean Public Sector IE Support (Now Resolved, but Confirm Per Project)

**What goes wrong:**
Historically, Korean public institutions required IE11 support due to ActiveX and government security certificate plugins. Microsoft ended IE11 support on June 15, 2022. Korean government policy now officially recommends migration to Chrome, Edge, Samsung Internet, and Naver Whale.

**Current status:**
IE11 is formally end-of-life even for the Korean public sector. However, individual project clients (especially older local governments or medical institutions) may still have legacy requirements or use Edge's IE Mode. CSS custom properties have zero IE11 support.

**Prevention:**
- At project kickoff, explicitly ask the client: "Does any target user group use IE11 or Edge IE Mode?" Document the answer
- If the answer is yes, CSS custom properties from Style Dictionary must be compiled away to static values using a PostCSS plugin (`postcss-custom-properties`) — they cannot be used directly
- The team's current stack assumes no IE11. Flag this assumption in the starter kit `README.md`
- If IE support is required for a specific project, that project should not use the `starter/` kit as-is without the PostCSS fallback step

**Confidence:** MEDIUM — IE end-of-life for Korean public sector is confirmed from 2022 policy; individual project requirements may still vary

---

### Pitfall 15: Stylelint Config Scope Prevents Per-File Overrides

**What goes wrong:**
`stylelint-selector-bem-pattern` does not support nested option merging. To disable the plugin for a specific file (e.g., a vendor override partial), the only option is a `/* stylelint-disable */` comment. Teams forget this and instead modify the global config, inadvertently relaxing validation project-wide.

**Prevention:**
- Document the correct per-file disable pattern in the team guide
- Prefer `/* stylelint-disable plugin/selector-bem-pattern */` at the top of vendor/override files over modifying global config

**Confidence:** HIGH — sourced from `stylelint-selector-bem-pattern` documentation

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|---|---|---|
| SCSS architecture setup | @use/@forward index file pattern; `@import` from old examples | Establish `_index.scss` per layer before writing any rules |
| Token pipeline (Style Dictionary) | v3 vs v4 vs v5 format mismatch; async API without await | Pick a version, document it, use DTCG format from day one |
| Eleventy doc site setup | ESM config errors; eleventy-sass permalink default change | Start v3-native, set `"type":"module"`, explicit permalink config |
| BEM component SCSS | Double-underscore nesting; modifier-without-base in HTML | Document with examples, add Stylelint plugin with explicit regex |
| Accessibility testing (pa11y-ci) | Puppeteer launch failure in CI; sitemap vs urls conflict | Use pa11y-ci v4, add `--no-sandbox`, test URL list separately |
| Starter kit documentation | 62.5% rem trick incompatibility with third-party CSS | Document the convention and its implications explicitly in starter README |
| Public sector project delivery | IE11/Edge Mode CSS custom property fallback | Ask client about browser requirements; document assumption in starter kit |

---

## Sources

- [Sass: Breaking Change — @import and global built-in functions](https://sass-lang.com/documentation/breaking-changes/import/)
- [Sass: @import is Deprecated (official blog)](https://sass-lang.com/blog/import-is-deprecated/)
- [Sass: @use documentation](https://sass-lang.com/documentation/at-rules/use/)
- [Sass: @forward documentation](https://sass-lang.com/documentation/at-rules/forward/)
- [Style Dictionary v4 Migration Guidelines](https://styledictionary.com/versions/v4/migration/)
- [Style Dictionary v5 Migration Guidelines](https://styledictionary.com/versions/v5/migration/)
- [Style Dictionary DTCG format guide](https://styledictionary.com/info/dtcg/)
- [Eleventy v3 upgrade notes — Andreas Mausch](https://andreas-mausch.de/blog/2025-03-22-eleventy-upgrade-v2-to-v3/)
- [Upgrading to Eleventy v3 — Max Böck](https://mxb.dev/blog/eleventy-v3-update/)
- [eleventy-sass ESM and v3 compatibility issue](https://github.com/kentaroi/eleventy-sass/issues/30)
- [pa11y-ci GitHub README](https://github.com/pa11y/pa11y-ci)
- [Integrating pa11y-ci in CI/CD — Springer Nature QA](https://medium.com/springernature-qa/integrating-pa11y-ci-in-your-ci-cd-pipeline-f143bb5e36f)
- [stylelint-selector-bem-pattern GitHub README](https://github.com/simonsmith/stylelint-selector-bem-pattern)
- [BEM: Battling BEM — 10 Common Problems — Smashing Magazine](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/)
- [BEM by Example — Sparkbox](https://sparkbox.com/foundry/bem_by_example)
- [BEM grandchild nesting anti-pattern — Scalable CSS](https://scalablecss.com/bem-nesting-grandchild-elements/)
- [ITCSS scalable architecture — xfive.co](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture)
- [62.5% font-size trick accessibility analysis — FED Mentor](https://fedmentor.dev/posts/rem-html-font-size-hack/)
- [The Ultimate Base Font Size — Adrian Roselli](https://adrianroselli.com/2024/03/the-ultimate-ideal-bestest-base-font-size-that-everyone-is-keeping-a-secret-especially-chet.html)
- [Korean government IE11 end-of-life policy — ZDNet Korea (2021)](https://zdnet.co.kr/view/?no=20211003170116)
- [KWCAG overview — W3C WAI Korea policy](https://www.w3.org/WAI/policies/republic-of-korea/)
