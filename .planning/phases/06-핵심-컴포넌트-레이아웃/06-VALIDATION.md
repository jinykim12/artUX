---
phase: 6
slug: 핵심-컴포넌트-레이아웃
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-26
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Dart Sass CLI + file existence checks |
| **Config file** | package.json `scripts.build:css` |
| **Quick run command** | `npm run build:css 2>&1` |
| **Full suite command** | `npm run build:css 2>&1 && grep -c "header" dist/artux.css && test -f docs/components/header.md` |
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
| 06-01-01 | 01 | 1 | COMP-01 | build+grep | `npm run build:css && grep "header" dist/artux.css` | ❌ W0 | ⬜ pending |
| 06-01-02 | 01 | 1 | COMP-01 | file check | `test -f docs/components/header.md && grep "aria-expanded" docs/components/header.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scss/6-components/_header.scss` — 신규 생성 대상
- [ ] `scss/5-objects/_layout.scss` — 신규 생성 대상
- [ ] `docs/components/` — 신규 디렉토리 생성

*Existing infrastructure (npm run build:css) covers compilation verification.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 모바일 햄버거 토글 동작 | COMP-01 | JS 동작 확인 필요 | 브라우저에서 햄버거 클릭 시 메뉴 패널 토글 확인 |
| 서브메뉴 키보드 탐색 | COMP-01 | 키보드 인터랙션 확인 | Tab/방향키로 서브메뉴 열기/닫기 확인 |
| respond-to() 반응형 분기 | COMP-01 | 뷰포트 리사이즈 필요 | PC/모바일 breakpoint에서 헤더 스타일 전환 확인 |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
