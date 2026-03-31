---
layout: layouts/base.njk
title: 컨벤션
section: conventions
permalink: /conventions/
---

# 컨벤션

아트피큐 팀 퍼블리싱 코딩 컨벤션. 신규 프로젝트 시작 시 이 규칙을 기준으로 한다.

## 컨벤션 문서

| 문서 | 내용 |
|------|------|
| [클래스 네이밍 규칙](/conventions/naming/) | Bootstrap 유틸리티 기준, BEM 패턴, js- 접두사 |
| [SCSS 작성 규칙](/conventions/scss-rules/) | 중첩 깊이, 속성 순서, @use 전략, 주석 규칙 |
| [HTML 마크업 구조](/conventions/html-structure/) | 보일러플레이트, lang, 본문건너뛰기, 시맨틱 태그 |
| [코딩 스타일](/conventions/coding-style/) | 4 spaces, UTF-8, LF, editorconfig |
| [Git 커밋 규칙](/conventions/git-rules/) | 한국어 명령형, 타입 분류, 브랜치 전략 |

## 핵심 원칙

- Bootstrap 클래스는 추가만 — 기존 Bootstrap 클래스 직접 수정 금지
- 공공기관 납품 시 `transition: none` 전체 제거 (납품 직전 일괄 검토)
- `aria-*` 속성과 CSS 클래스는 항상 쌍으로 처리 (예: `is-invalid` + `aria-invalid="true"`)
- 포커스 아웃라인 제거 금지 — `:focus-visible` 항상 유지
- 들여쓰기 4 spaces, UTF-8, LF 줄 끝 — 모든 파일 통일
