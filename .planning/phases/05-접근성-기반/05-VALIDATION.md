---
phase: 5
slug: 접근성-기반
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-26
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Dart Sass CLI (컴파일 검증) + file existence checks |
| **Config file** | package.json `scripts.build:css` |
| **Quick run command** | `npm run build:css 2>&1` |
| **Full suite command** | `npm run build:css 2>&1 && grep -c "sr-only" dist/artux.css && grep -c "skip-to-content" dist/artux.css` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build:css 2>&1`
- **After every plan wave:** Run full suite command
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | A11Y-03 | build+grep | `npm run build:css && grep "outline" dist/artux.css` | ❌ W0 | ⬜ pending |
| 05-01-02 | 01 | 1 | A11Y-01 | build+grep | `npm run build:css && grep "skip-to-content" dist/artux.css` | ❌ W0 | ⬜ pending |
| 05-02-01 | 02 | 2 | A11Y-04~09 | file check | `test -d docs/accessibility && ls docs/accessibility/*.md` | ❌ W0 | ⬜ pending |
| 05-02-02 | 02 | 2 | A11Y-08 | file check | `test -f docs/accessibility/checklist.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scss/4-elements/_focus.scss` — 신규 생성 대상 (focus 믹스인 이동)
- [ ] `scss/6-components/_skip-nav.scss` — 신규 생성 대상
- [ ] `docs/accessibility/` — 신규 디렉토리 생성

*Existing infrastructure (npm run build:css) covers compilation verification.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| skip-nav 포커스 시 화면 노출 | A11Y-01 | 시각적 확인 필요 | Tab 키로 포커스 이동 시 skip-nav 링크가 화면 상단에 나타나는지 확인 |
| .sr-only 스크린리더 가독성 | A11Y-02 | 스크린리더 테스트 필요 | NVDA/VoiceOver로 .sr-only 텍스트가 읽히는지 확인 |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
