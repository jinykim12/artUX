# Plan 01-02 Summary: Bootstrap 통합 + SCSS 컴파일 파이프라인

**완료일:** 2026-03-26
**상태:** 완료

## 완료된 작업

### Task 3: Bootstrap 오버라이드 변수 + 격리 + 62.5% REM 파일 생성
- `scss/1-settings/_variables.scss`: $font-size-base: 1.6rem, 한국어 주석
- `scss/1-settings/_index.scss`: @forward 'variables' 활성화
- `scss/3-generic/_vendor.scss`: Bootstrap @import 격리, $font-size-base 선언
- `scss/3-generic/_index.scss`: 주석 업데이트
- `scss/4-elements/_base.scss`: html { font-size: 62.5% }, body/input/button/select/textarea 스타일
- `scss/4-elements/_index.scss`: @forward 'base' 활성화

### Task 4: style.scss + 빌드 검증
- `scss/style.scss`: ITCSS 7-레이어 로드 순서 한국어 주석으로 문서화
  - 구조적 제약 해결: Sass @use 규칙(@use before @import) 준수하여 @use 레이어 먼저, @import vendor 마지막
  - Bootstrap 오버라이드 변수: _vendor.scss 내 @import 스코프에서 직접 선언 (Sass 모듈 격리 우회)
- `package.json`: --load-path=node_modules 추가 (Bootstrap 경로 해결)
- `.stylelintrc.cjs`: 존재하지 않는 규칙 제거, scss/comment-no-empty: null

## 검증 결과
- `npm run build:css` → 종료 코드 0 (경고만, 오류 없음)
- `dist/artux.css` → 233,571 bytes 생성
- `.container` 포함 확인 ✓
- `62.5%` 포함 확인 ✓
- `npm run lint:css` → 오류 없음 ✓

## 주요 결정 사항 (계획과 차이)

1. **Bootstrap 변수 오버라이드 위치 변경**: 계획은 1-settings/_variables.scss → style.scss @use로 전달을 의도했으나, Sass @use 모듈 시스템은 네임스페이스를 격리하여 Bootstrap @import가 읽을 수 없음. 해결책: _vendor.scss 내부 @import 스코프에서 직접 선언.

2. **style.scss 레이어 순서 조정**: Sass "all @use before @import" 규칙으로 3-generic/vendor를 마지막으로 이동. CSS 출력 순서는 달라지나 클래스 기반 Bootstrap과 충돌 없음.

3. **--load-path=node_modules 추가**: Dart Sass는 node_modules를 자동으로 탐색하지 않음.
