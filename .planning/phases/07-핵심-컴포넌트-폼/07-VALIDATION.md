---
phase: 7
slug: 핵심-컴포넌트-폼
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-26
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Dart Sass CLI + file existence checks |
| **Config file** | package.json `scripts.build:css` |
| **Quick run command** | `npm run build:css 2>&1` |
| **Full suite command** | `npm run build:css 2>&1 && grep -c "form-control" dist/artux.css && test -f docs/components/forms.md` |
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
| 07-01-01 | 01 | 1 | COMP-03 | build+grep | `npm run build:css && grep "form-control" dist/artux.css` | ❌ W0 | ⬜ pending |
| 07-02-01 | 02 | 1 | COMP-03, A11Y-05 | file check | `test -f docs/components/forms.md && grep "aria-describedby" docs/components/forms.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scss/6-components/_form.scss` — 신규 생성 대상
- [ ] `docs/components/forms.md` — 신규 생성 대상

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 커스텀 체크박스/라디오 시각적 확인 | COMP-03 | 렌더링 확인 필요 | 브라우저에서 체크박스/라디오 커스텀 스타일 표시 확인 |
| 오류 메시지 스크린리더 읽기 | A11Y-05 | 보조기술 테스트 | role="alert" 오류 메시지가 스크린리더에서 즉시 읽히는지 확인 |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity
- [ ] Wave 0 covers all MISSING references
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
