---
layout: layouts/base.njk
title: Git 커밋 규칙
tags: conventions
section: conventions
permalink: /conventions/git-rules/
---

# Git 커밋 규칙

아트피큐 팀의 Git 커밋 메시지, 타입 분류, 브랜치 전략을 정의한다. 팀원 누구나 이력 추적과 코드 리뷰를 동일한 기준으로 수행할 수 있어야 한다.

> **왜 커밋 메시지 규칙이 필요한가?**
> "수정함", "작업중", "css 수정" 같은 커밋 메시지가 쌓이면 나중에 특정 기능이 언제 추가됐는지, 어떤 버그가 어디서 수정됐는지 `git log`만으로 추적이 불가능하다. 규칙에 맞는 메시지를 작성하면 3개월 뒤에도 이력만 보고 변경 의도를 파악할 수 있다.

---

## 1. 커밋 메시지 형식

```
type(scope): 한국어 설명
```

- **type**: 변경 종류 분류 (아래 타입 분류표 참조)
- **scope**: 변경 대상 영역 (선택, 소괄호로 감쌈)
- **한국어 설명**: **명령형 동사**로 마무리 — "추가", "수정", "제거", "개선", "정의"

"명령형 동사"란 "~했다" (과거형) 대신 "~추가" (현재형 명령)로 끝내는 방식이다. "버튼 컴포넌트를 추가했다" → "버튼 컴포넌트 추가"

### 커밋 메시지 예시

아래는 팀 표준에 맞는 커밋 메시지 예시다. type + scope + 한국어 동사 끝 구조를 확인한다.

```bash
feat(button): .btn-link 스타일 보완
fix(form): aria-invalid 누락 수정
docs(tokens): 간격 토큰 설명 보완
style(header): 불필요한 공백 제거
refactor(modal): 포커스 트랩 로직 구조 개선
chore(build): Eleventy 빌드 스크립트 경로 수정
a11y(skip-nav): 본문건너뛰기 포커스 스타일 개선
```

> **규칙: 커밋 메시지는 `type(scope): 한국어 동사` 형식을 따른다. 영문 혼용과 과거형(`~했다`) 표현은 피한다.**

---

## 2. 커밋 타입 분류표

어떤 타입을 선택해야 할지 헷갈릴 때는 "코드 동작이 바뀌었는가?"를 기준으로 판단한다. 동작이 바뀌면 `feat` 또는 `fix`, 동작은 동일하고 코드만 정리하면 `refactor`나 `style`이다.

| 타입 | 용도 | 예시 |
|------|------|------|
| `feat` | 새 기능, 신규 컴포넌트 추가 | 버튼 컴포넌트 신규 작성 |
| `fix` | 버그 수정, 오류 교정 | 폼 유효성 오류 메시지 누락 수정 |
| `docs` | 문서 변경 (코드 변경 없음) | 컨벤션 문서 내용 보완 |
| `style` | 코드 포매팅, 세미콜론 등 (로직 변경 없음) | 들여쓰기 정렬, 공백 정리 |
| `refactor` | 코드 구조 개선 (기능 변경 없음) | 중복 믹스인 통합 |
| `chore` | 빌드 설정, 패키지 관리 등 | npm 의존성 업데이트 |
| `a11y` | 접근성 개선 (팀 추가 타입) | ARIA 속성 누락 추가 |
| `perf` | 성능 개선 | 불필요한 CSS 선택자 제거로 렌더링 최적화 |

`a11y` 타입은 아트피큐 팀 추가 타입이다. 공공기관 납품 품질 관리를 위해 접근성 커밋을 별도로 분류하면 납품 전 접근성 작업 이력을 쉽게 확인할 수 있다.

---

## 3. scope 예시

scope는 변경 영역을 명확히 전달한다. 팀 프로젝트에서 자주 사용하는 scope:

| scope | 설명 |
|-------|------|
| `button` | 버튼 컴포넌트 |
| `form` | 폼 관련 (input, select, checkbox 등) |
| `modal` | 모달/다이얼로그 |
| `tab` | 탭 컴포넌트 |
| `tokens` | 디자인 토큰 (CSS Custom Properties) |
| `docs` | 문서 사이트 (.md 파일, Eleventy 설정) |
| `starter` | 스타터 킷 파일 |
| `build` | 빌드 설정, package.json, Sass 컴파일 |
| `skip-nav` | 본문건너뛰기 |
| `header` | 헤더/GNB 영역 |

scope는 강제가 아니라 선택이다. 하지만 여러 팀원이 같은 컴포넌트를 작업할 때는 scope를 작성하면 `git log --grep="(button)"` 으로 버튼 관련 커밋만 필터링할 수 있어 유용하다.

---

## 4. 좋은 커밋 / 나쁜 커밋 예시

### 나쁜 커밋 — 왜 나쁜지 이유와 함께 확인한다

❌ 내용을 알 수 없는 커밋 — 3개월 뒤 이 커밋이 무엇을 했는지 알 수 없다
```bash
fix: 수정함
update
작업중
wip
css 수정
```

❌ 범위가 너무 넓은 커밋 — 어떤 파일의 무엇이 정리됐는지 파악 불가
```bash
style: 전체 파일 정리
```

❌ 영문 혼용 — 팀 규칙 위반 (한국어 표준)
```bash
feat(button): add ghost variant
```

### 좋은 커밋 — 무엇을, 어디에, 어떻게 변경했는지 명확하다

✅ 대상, 내용, 동사가 명확하게 전달되는 커밋
```bash
feat(button): .btn-link 스타일 보완
fix(form): aria-invalid 누락 수정
docs(conventions): HTML 마크업 기본 구조 문서 추가
a11y(modal): 포커스 트랩 role="dialog" aria-modal="true" 적용
chore(build): npm-run-all2 병렬 빌드 스크립트 추가
```

---

## 5. 브랜치 전략

아트피큐 팀은 간소화된 Git Flow를 사용한다. `main` 브랜치는 항상 납품 가능한 상태를 유지하며, 기능 개발은 `feature/` 브랜치에서 진행하고 `develop`을 통해 통합한다.

| 브랜치 | 용도 | 예시 |
|--------|------|------|
| `main` | 납품 가능 상태 — 항상 안정적인 코드 유지 | — |
| `develop` | 개발 통합 — 기능 브랜치 병합 대상 | — |
| `feature/이슈번호-설명` | 기능별 개발 브랜치 | `feature/42-modal-component` |
| `hotfix/이슈번호-설명` | 긴급 수정 브랜치 — `main` 직접 분기 | `hotfix/55-skip-nav-focus` |

### 브랜치 흐름

아래 다이어그램은 기능 브랜치가 `develop`에 병합되고 최종적으로 `main`에 납품되는 흐름이다.

```
main ──────────────────────────────────────── 납품
  └─ develop ────────────────────────────── 통합
       ├─ feature/42-modal-component ──┘   기능
       └─ feature/45-form-validation ──┘   기능
```

소규모 단독 작업 또는 단일 파일 수정은 `develop` 직접 커밋 가능하다.

---

## 6. 커밋 원자성 원칙

"하나의 커밋 = 하나의 논리적 변경"이 원칙이다.

원자적 커밋이 중요한 이유: 커밋 하나를 되돌려야 할 때(`git revert`) 관련 없는 변경이 함께 섞여 있으면 되돌릴 수 없다. 한 가지 목적만 담은 커밋이어야 안전하게 되돌리거나 체리픽(`git cherry-pick`)할 수 있다.

```bash
# Good — 같은 목적이라면 복수 파일도 하나의 커밋으로 묶음
# feat(form): 유효성 검사 오류 메시지 패턴 추가
#   - scss/6-components/_form.scss  (스타일)
#   - docs/components/form.md       (문서)
```

```bash
# Bad — 목적이 다른 변경을 하나의 커밋으로 묶음
# update: 폼 스타일 수정 + 버튼 컴포넌트 추가 + README 업데이트
```

❌ 나쁜 예: 서로 다른 목적 3가지가 하나의 커밋에 섞임
```bash
git commit -m "update: 폼 스타일 수정 + 버튼 컴포넌트 추가 + README 업데이트"
```

✅ 좋은 예: 목적별로 3개 커밋으로 분리
```bash
git commit -m "feat(button): 버튼 컴포넌트 신규 추가"
git commit -m "fix(form): 폼 유효성 스타일 수정"
git commit -m "docs(readme): 설치 방법 업데이트"
```

> **규칙: 한 커밋에는 하나의 논리적 목적만 담는다. 여러 작업이 섞이면 `git add -p`(부분 스테이징)로 나눠서 커밋한다.**

### 납품 전 커밋 이력 정리

납품 브랜치(`main`)에 병합 전 `develop` 브랜치의 임시/WIP 커밋은 `git rebase -i` 로 정리한다. 단, 공유 브랜치(`develop`)의 이미 push된 커밋은 force push 전 팀 전체에 공유하고 동의를 받은 후 진행한다.
