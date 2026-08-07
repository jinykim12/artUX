# ux_guide 작업 운영 계획

이 문서는 `D:\work\ux_guide` 폴더를 앞으로 Codex와 함께 계속 유지보수하기 위한 작업 계획이다.

## 목표

- 문서, SCSS, 스타터 킷의 기준을 일치시킨다.
- 터미널 명령으로 빌드/검증하고, 브라우저에서 문서 사이트를 확인하는 흐름을 고정한다.
- 새 프로젝트에 `starter/`를 복사했을 때 바로 사용할 수 있는 상태를 유지한다.
- Codex가 이후 작업에서 같은 기준을 반복해서 확인하지 않도록 루트 작업 규칙을 마련한다.

## 현재 사용 방식

이 프로젝트는 터미널 전용 도구가 아니라, 터미널로 빌드하고 브라우저에서 확인하는 문서 사이트형 가이드다.

| 영역 | 용도 |
| --- | --- |
| `docs/` | Eleventy 문서 사이트 원본 |
| `scss/` | 가이드 공통 SCSS 원본 |
| `dist/` | 루트 SCSS 빌드 결과 |
| `_site/` | Eleventy 문서 사이트 빌드 결과 |
| `starter/` | 신규 프로젝트 시작용 템플릿 |
| `.planning/` | 이전 Claude 작업 계획, 요구사항, 상태 기록 |

## 기본 작업 명령

루트 문서 사이트 작업:

```bash
npm install
npm run build
npm run serve
```

문서 사이트 확인:

```text
http://localhost:8080
```

스타터 킷 검증:

```bash
cd starter
npm install
npm run build:css
```

## 우선 정리 과제

### 1. REM 기준 통일

현재 `1rem = 10px` 흔적과 Bootstrap 기본 `1rem = 16px` 문서가 섞여 있다.

권장 기준:

- Bootstrap 기본 `1rem = 16px` 유지
- 62.5% REM 관련 주석, 토큰, 계획 문서의 현재 기준 설명 정리
- 터치 영역은 `44px` 또는 `2.75rem` 중 한 기준으로 문서와 SCSS를 통일

대상:

- `tokens.json`
- `scripts/build-tokens.js`
- `scss/3-generic/_root.scss`
- `starter/html/pub/css/scss/3-generic/_root.scss`
- `README.md`
- `starter/README.md`
- `starter/CLAUDE.md`
- `docs/tokens/index.md`

### 2. 토큰 정책 정리

현재 문서는 Bootstrap `--bs-*` 변수를 우선한다고 설명하지만, 실제로는 `tokens.json` 기반 커스텀 토큰 생성 구조가 남아 있다.

권장 기준:

- Bootstrap `--bs-*` 변수 우선
- 팀 토큰은 보조 토큰으로 유지하거나, 사용하지 않을 경우 빌드 흐름에서 제거
- `docs/tokens/index.md`에 실제 정책을 명확히 문서화

### 3. 스타터 킷 경로 정리

현재 스타터 실제 SCSS 경로:

```text
starter/html/pub/css/scss/
```

하지만 `scripts/sync-starter.sh`는 예전 구조인 `starter/scss`를 대상으로 한다.

수정 방향:

- `scripts/sync-starter.sh`의 대상 경로를 `starter/html/pub/css/scss`로 변경
- 스크립트 주석과 출력 문구를 현재 구조에 맞게 수정
- 스타터에 포함할 컴포넌트 범위를 결정하고 문서화

### 4. 스타터 단독 빌드 검증

목표:

- `starter/`를 복사한 새 프로젝트에서 `npm install && npm run build:css`가 성공해야 한다.
- 결과 파일은 `html/pub/css/style.css`여야 한다.

검증:

```bash
cd starter
npm install
npm run build:css
```

### 5. 개발 환경 정리

현재 `stylelint`는 Node 실행 환경 문제로 실패한다.

수정 방향:

- `.nvmrc`와 `package.json`의 Node 권장 버전 명시
- `README.md`에 Node 권장 버전 추가
- `npm run lint:css`가 실행 가능한지 재검증

### 6. Sass `@import` 경고 관리

현재 빌드는 성공하지만 Dart Sass deprecation 경고가 발생한다.

수정 방향:

- 당장 제거하기 어렵다면 기술부채로 문서화
- Bootstrap/Sass 업그레이드 시 처리할 항목으로 남김
- `docs/conventions/scss-rules.md`에 현재 전략을 명시

## Codex 작업 편의화 과제

### 1. 루트 작업 지침 파일 추가

후속 작업을 위해 루트에 `AGENTS.md`를 추가한다.

포함할 내용:

- 한국어 문서/주석 유지
- Bootstrap 5 기반 유지
- 스타터 실제 경로
- 빌드/검증 명령
- 문서 사이트 확인 방식
- Git 소유권 경고 대응 메모
- 사용자 변경사항 임의 되돌리기 금지

### 2. 작업 전 체크리스트 고정

Codex가 수정 전 항상 확인할 항목:

- `README.md`
- `package.json`
- 관련 `docs/**/*.md`
- 관련 `scss/**/*.scss`
- 관련 `starter/**`

### 3. 검증 명령 고정

작업 유형별 검증:

| 작업 유형 | 검증 |
| --- | --- |
| 문서만 수정 | `npm run eleventy:build` |
| SCSS 수정 | `npm run build:css` |
| 토큰 수정 | `npm run build` |
| 스타터 수정 | `cd starter && npm run build:css` |
| 전체 정리 | `npm run build` 후 스타터 빌드 |

## 진행 순서

1. `AGENTS.md` 추가 — 완료
2. REM 기준 통일 — 완료: 토큰/생성 스크립트/루트 및 스타터 산출물 정리
3. 토큰 정책 정리 — 완료: Bootstrap 변수 우선, 팀 토큰 보조 정책 반영
4. 스타터 동기화 스크립트 수정 — 완료
5. 스타터 단독 빌드 검증 — 완료
6. Node/stylelint 환경 정리 — 진행 중: `.nvmrc`를 Node 22로 조정
7. Sass `@import` 경고 문서화
8. 전체 빌드 검증 — 부분 완료: `npm run build`, 스타터 빌드 성공 / `npm run lint:css`는 Node 22 전환 후 재검증

## 완료 기준

- 루트 `npm run build` 성공
- 문서 사이트에서 `/tokens/`, `/starter/`, 주요 컴포넌트 페이지 접근 가능
- 스타터 `npm run build:css` 성공
- README, 스타터 README, Codex 작업 지침의 기준이 서로 충돌하지 않음
- 후속 작업자가 이 문서와 `AGENTS.md`만 읽고 작업을 시작할 수 있음
