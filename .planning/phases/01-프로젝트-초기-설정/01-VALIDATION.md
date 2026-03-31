---
phase: 1
slug: 프로젝트-초기-설정
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-26
---

# Phase 1 — Validation Strategy

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | npm scripts (shell-based) |
| **Config file** | package.json |
| **Quick run command** | `npm run build:css` |
| **Full suite command** | `npm run build:css && npm run lint:css` |
| **Estimated runtime** | ~5 seconds |

## Sampling Rate

- **After every task commit:** Run `npm run build:css`
- **After wave complete:** Run `npm run build:css && npm run lint:css`

## Validation Dimensions

| Dimension | Check |
|-----------|-------|
| Build succeeds | `npm run build:css` exits 0 |
| Output file exists | `dist/artux.css` exists and > 0 bytes |
| Bootstrap included | `dist/artux.css` contains `.container` |
| SCSS entry point | `scss/style.scss` exists with Korean comments |
| EditorConfig | `.editorconfig` contains `indent_size = 2` |
| Import strategy | `scss/style.scss` or `scss/3-generic/_vendor.scss` contains bootstrap import |
