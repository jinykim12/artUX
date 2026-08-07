# Codex 작업 지침

이 저장소는 artpqUX 퍼블리싱 가이드 시스템이다. Codex는 이 파일을 우선 참고해 작업한다.

## 프로젝트 성격

- Bootstrap 5 기반 HTML/CSS 퍼블리싱 가이드다.
- Eleventy 문서 사이트로 가이드를 제공한다.
- `starter/`는 신규 프로젝트 시작용 템플릿이다.
- 문서와 주석은 한국어를 기본으로 작성한다.

## 주요 경로

| 경로 | 설명 |
| --- | --- |
| `docs/` | Eleventy 문서 원본 |
| `docs/_includes/layouts/base.njk` | 문서 사이트 기본 레이아웃 |
| `docs/_data/navigation.js` | 문서 사이트 사이드바 네비게이션 |
| `scss/` | 루트 가이드 SCSS 원본 |
| `dist/artux.css` | 루트 SCSS 빌드 결과 |
| `starter/html/pub/css/scss/` | 스타터 킷 SCSS 원본 |
| `starter/html/pub/css/style.css` | 스타터 킷 CSS 빌드 결과 |
| `.planning/` | 이전 Claude 작업 계획과 상태 기록 |

## 작업 기준

- Bootstrap 5 기반을 유지한다.
- REM 기준은 Bootstrap 기본값인 1rem = 16px를 사용한다.
- Bootstrap에 이미 있는 컴포넌트는 재구현하지 않고 보완만 한다.
- 접근성 기준은 KWCAG 2.1 AA / KRDS v1.0.0을 우선한다.
- 클릭 가능한 요소는 `<button>` 또는 의미 있는 `<a>`를 사용한다.
- `outline: none` 단독 사용을 금지한다.
- 공공기관 납품 기준상 전환 효과는 기본적으로 사용하지 않는다.
- 사용자 또는 이전 작업자가 만든 변경사항을 임의로 되돌리지 않는다.

## 현재 정리 필요 항목

세부 계획은 `WORKSPACE-PLAN.md`를 따른다.

우선순위:

1. REM 기준 통일
2. 토큰 정책 정리
3. 스타터 킷 경로와 동기화 스크립트 정리
4. 스타터 단독 빌드 검증
5. Node/stylelint 환경 정리
6. Sass `@import` 경고 문서화

## 기본 명령

루트 설치:

```bash
npm install
```

루트 전체 빌드:

```bash
npm run build
```

문서 사이트 개발 서버:

```bash
npm run serve
```

문서 사이트 주소:

```text
http://localhost:8080
```

SCSS 빌드:

```bash
npm run build:css
```

스타터 빌드:

```bash
cd starter
npm install
npm run build:css
```

## 검증 기준

| 작업 유형 | 검증 명령 |
| --- | --- |
| 문서 수정 | `npm run eleventy:build` |
| SCSS 수정 | `npm run build:css` |
| 토큰 수정 | `npm run build` |
| 스타터 수정 | `cd starter && npm run build:css` |
| 전체 정리 | `npm run build`, 이후 스타터 빌드 |

## 주의 사항

- 현재 Git 상태 확인 시 Windows `dubious ownership` 경고가 발생할 수 있다.
- 필요 시 사용자가 승인하면 다음 명령으로 Git safe directory를 등록한다.

```bash
git config --global --add safe.directory D:/work/ux_guide
```

- `scripts/sync-starter.sh`는 현재 실제 스타터 경로와 맞지 않을 수 있다. 수정 전 `starter/html/pub/css/scss/` 구조를 기준으로 확인한다.
- `stylelint`는 Node 22.x 기준으로 실행한다. Node 20.9.0에서는 JSON import 문법 오류로 실행 전 실패할 수 있다.
