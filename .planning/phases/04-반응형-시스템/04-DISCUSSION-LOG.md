# Phase 4: 반응형 시스템 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-26
**Phase:** 04-반응형-시스템
**Areas discussed:** 믹스인 파일 구조, Bootstrap 그리드 호환성, 모바일 퍼스트 작성 패턴

---

## 믹스인 파일 구조

### Q1: respond-to() 믹스인 배치 위치

| Option | Description | Selected |
|--------|-------------|----------|
| 별도 _breakpoints.scss | 2-tools/_breakpoints.scss 신규 생성. 브레이크포인트 변수 + respond-to() 믹스인을 한 파일에 응집. ROADMAP 제안과 일치. | ✓ |
| _mixin.scss에 통합 | 기존 _mixin.scss 하단에 추가. 파일 수 증가 없지만 파일이 길어짐. | |

**User's choice:** 별도 _breakpoints.scss
**Notes:** ROADMAP 제안과 일치. 기존 _mixin.scss(6종) 유지.

### Q2: 브레이크포인트 변수 형식

| Option | Description | Selected |
|--------|-------------|----------|
| Sass Map | $breakpoints: (mobile: 767px, tablet: 768px, ...) 형태. respond-to()에서 map-get으로 조회. 확장성 좋고 잘못된 키워드 사용 시 에러 발생 가능. | ✓ |
| 개별 변수 | $bp-mobile: 767px 등 개별 선언. ROADMAP 원안과 동일. 단순하지만 믹스인 내부에서 키워드 매핑을 별도로 구현해야 함. | |

**User's choice:** Sass Map
**Notes:** map-get + @error 조합으로 잘못된 키워드 사용 방지

### Q3: 미디어쿼리 전략

| Option | Description | Selected |
|--------|-------------|----------|
| min-width + range 병행 | respond-to(tablet)은 min-width:768, respond-to(tablet-only)는 768~1023 range. 모바일 퍼스트 기본 + 특정 구간 타겟팅 가능. | ✓ |
| min-width만 | 순수 모바일 퍼스트. range 필요 시 직접 @media 작성. 단순하지만 특정 구간 타겟팅 번거로움. | |

**User's choice:** min-width + range 병행
**Notes:** -only 접미사로 range 쿼리 지원

---

## Bootstrap 그리드 호환성

### Q4: Bootstrap 그리드 시스템 처리 방식

| Option | Description | Selected |
|--------|-------------|----------|
| Bootstrap 그리드 그대로 유지 | Bootstrap 그리드 클래스는 기본 breakpoint로 동작. 팀 respond-to()는 커스텀 컴포넌트 전용. 두 시스템 차이점 주석 문서화. | ✓ |
| Bootstrap $grid-breakpoints 오버라이드 | 팀 기준으로 재정의. col-md-6이 768px에서 동작. 통일성 좋지만 Bootstrap 컴포넌트 레이아웃 의도와 다를 수 있음. | |
| Claude 재량 | 플래너가 최적 방안 판단. | |

**User's choice:** Bootstrap 그리드 그대로 유지
**Notes:** 두 시스템 공존, 주석 대조표로 차이 안내

### Q5: 문서화 수준

| Option | Description | Selected |
|--------|-------------|----------|
| _breakpoints.scss 주석 | 파일 상단에 Bootstrap vs 팀 breakpoint 대조표 주석. 코드 작성 시 바로 확인 가능. | ✓ |
| 주석 + 사용 가이드 예시 | 대조표 + '언제 col-md 쓰고 언제 respond-to 쓰는지' 사용 가이드 포함. 더 자세하지만 주석 길어짐. | |

**User's choice:** _breakpoints.scss 주석
**Notes:** 간결한 대조표 수준

---

## 모바일 퍼스트 작성 패턴

### Q6: 예외 허용 여부

| Option | Description | Selected |
|--------|-------------|----------|
| 원칙 + 예외 허용 | 기본은 min-width(모바일 퍼스트). PC 전용 등 특수 경우 -only 변형 사용 허용. 주석으로 예외 사용 시점 안내. | ✓ |
| 엄격 min-width만 | max-width 사용 금지. 모든 컴포넌트를 모바일 기준 작성. 일관성 최고지만 특정 상황에서 불편. | |

**User's choice:** 원칙 + 예외 허용
**Notes:** respond-to(mobile-only) 등 -only 변형으로 예외 처리

### Q7: 문서화 위치

| Option | Description | Selected |
|--------|-------------|----------|
| _breakpoints.scss 통합 | 브레이크포인트 변수 + respond-to + 모바일 퍼스트 원칙 + Bootstrap 대조표를 한 파일에. | ✓ |
| 별도 안내 주석 | _breakpoints.scss에는 코드만, 원칙 안내는 다른 위치에 분리. | |

**User's choice:** _breakpoints.scss 통합
**Notes:** 반응형 관련 모든 기준이 한 곳에

---

## Claude's Discretion

- respond-to() 믹스인 내부 구현 세부사항
- 주석 구조 및 대조표 형식
- 사용 예시 코드 스니펫의 구체적 내용

## Deferred Ideas

None — discussion stayed within phase scope
