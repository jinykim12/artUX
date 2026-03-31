---
phase: 4
slug: 반응형-시스템
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-26
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Dart Sass CLI (컴파일 검증) |
| **Config file** | package.json `scripts.build:css` |
| **Quick run command** | `npm run build:css 2>&1` |
| **Full suite command** | `npm run build:css 2>&1 && grep -c "@media" dist/artux.css` |
| **Estimated runtime** | ~3 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build:css 2>&1`
- **After every plan wave:** Run `npm run build:css 2>&1 && grep -c "@media" dist/artux.css`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | RESP-01 | build | `npm run build:css 2>&1` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | RESP-02 | grep | `grep "respond-to" scss/2-tools/_breakpoints.scss` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 1 | RESP-03 | grep | `grep -i "모바일 퍼스트\|mobile.first" scss/2-tools/_breakpoints.scss` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scss/2-tools/_breakpoints.scss` — 신규 생성 대상 (Phase 4 핵심 산출물)

*Existing infrastructure (npm run build:css) covers compilation verification.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Bootstrap 그리드와 팀 breakpoint 대조표 정확성 | RESP-01 | 주석 내용 검증 | _breakpoints.scss 상단 주석에서 Bootstrap sm/md/lg/xl/xxl 값과 팀 4단계 값 대조 확인 |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
