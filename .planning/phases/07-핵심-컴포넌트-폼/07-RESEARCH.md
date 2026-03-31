# Phase 7: 핵심 컴포넌트 — 폼 - Research

**Researched:** 2026-03-26
**Domain:** Bootstrap 5 폼 컴포넌트 오버라이드 + KWCAG 2.1 AA 폼 접근성 구현
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** `docs/components/forms.md` 통합 문서로 작성 — input, select, textarea, checkbox, radio 5종을 하나의 마크다운에 코드 블록으로 포함
- **D-02:** Phase 6 header.md 패턴과 일관성 유지 (docs/components/ 디렉토리)
- **D-03:** 기존 `docs/accessibility/forms.md`(Phase 5)는 접근성 원칙 문서로 유지, 이 문서는 실제 마크업 패턴 제공
- **D-04:** `scss/6-components/_form.scss` — Bootstrap 폼 전체 리디자인 (본격적 팀 스타일링)
- **D-05:** 입력 필드 높이, 패딩, 테두리 등 팀 표준으로 재정의
- **D-06:** 에러/성공 상태에 CSS 토큰(--color-error, --color-success) 적용
- **D-07:** 커스텀 체크박스/라디오 스타일링 포함
- **D-08:** `6-components/_index.scss`에 `@forward 'form'` 추가
- **D-09:** JS 예시 코드 포함 — 오류 발생 시 aria-describedby 연결, role="alert" 적용, 포커스 이동 기본 스니펫
- **D-10:** Phase 6 GNB JS 패턴과 일관성 유지

### Claude's Discretion
- _form.scss의 구체적 스타일링 값 (높이, 패딩, 테두리 색상 등)
- 폼 오류 JS 예시의 구체적 구현 방식
- 각 폼 요소별 마크업 스니펫의 세부 구조
- 에러/성공 토큰 색상값 (기존 _root.scss 토큰 활용)

### Deferred Ideas (OUT OF SCOPE)
없음 — 논의가 Phase 7 범위 내에서 완결됨
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| COMP-03 | 폼 컴포넌트 패턴이 제공된다 (input, select, textarea, checkbox, radio — 접근성 포함) | Bootstrap 5.3 form SCSS 클래스 구조 + 오버라이드 방법론 + 5종 마크업 패턴 확인 |
| A11Y-05 | 폼 접근성 패턴이 문서화된다 (label-input 연결, error 메시지, required 표시) | Phase 5 docs/accessibility/forms.md 이미 구현 완료. Phase 7은 실제 구현 마크업 패턴으로 보완 |
</phase_requirements>

---

## Summary

Phase 7은 두 가지 결과물을 만든다: (1) `scss/6-components/_form.scss` — Bootstrap 5.3 폼 클래스 전체를 팀 스타일로 리디자인하는 SCSS 파일, (2) `docs/components/forms.md` — 5종 폼 요소의 실제 마크업 패턴과 JS 오류 처리 예시를 담은 통합 문서.

Phase 5에서 `docs/accessibility/forms.md`를 통해 폼 접근성 원칙(label-input 연결, required 표시, aria-invalid, fieldset/legend 등)이 이미 완전히 문서화되어 있다. Phase 7의 A11Y-05 완료 표시는 이를 실제 마크업 패턴으로 구현하는 단계다. forms.md는 그 원칙을 따르는 실제 코드 스니펫을 제공하며, accessibility/forms.md를 참조하는 관계다.

Bootstrap 5.3의 폼 관련 SCSS는 `node_modules/bootstrap/scss/forms/` 아래에 분리되어 있다. 팀은 Bootstrap의 `.form-control`, `.form-check`, `.form-select` 클래스를 기반으로 하되, 이 클래스들을 SCSS에서 직접 셀렉터로 잡아 팀 토큰으로 재정의한다. 이는 Bootstrap의 Sass 변수 오버라이드 방식이 아닌 CSS 선택자 오버라이드 방식으로, 현재 프로젝트의 `_vendor.scss` 격리 구조에 맞는 접근이다.

**Primary recommendation:** `_form.scss`는 `.form-control`, `.form-select`, `.form-check-input` 등 Bootstrap 클래스를 셀렉터로 직접 참조하고, CSS 토큰(var(--*))만 사용하여 팀 스타일을 덮어쓴다. JS 예시는 Phase 6 GNB 패턴과 동일하게 IIFE + querySelector + setAttribute 기반으로 작성한다.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Bootstrap 5 | 5.3.8 | `.form-control`, `.form-select`, `.form-check` 등 폼 기반 클래스 | 현재 프로젝트 기반 프레임워크 — 변경 불가 |
| Dart Sass | 프로젝트 기준 | SCSS 컴파일 | 기존 `@use`/`@forward` 기반 빌드 시스템 |

### 폼 관련 Bootstrap 클래스 (오버라이드 대상)

| 클래스 | 파일 | 역할 |
|--------|------|------|
| `.form-control` | `forms/_form-control.scss` | input, textarea 기본 스타일 |
| `.form-select` | `forms/_form-select.scss` | select 드롭다운 스타일 |
| `.form-check-input` | `forms/_form-check.scss` | checkbox, radio 커스텀 스타일 |
| `.form-check-label` | `forms/_form-check.scss` | checkbox, radio 레이블 |
| `.form-label` | `forms/_labels.scss` | 폼 레이블 상단 배치 |
| `.form-text` | `forms/_form-text.scss` | 힌트 텍스트 (helper text) |
| `.is-invalid` / `.is-valid` | `forms/_validation.scss` | 오류/성공 상태 클래스 |
| `.invalid-feedback` / `.valid-feedback` | `forms/_validation.scss` | 오류/성공 메시지 표시 |

### 폼 SCSS 오버라이드 전략

Bootstrap 5.3은 `_vendor.scss`의 `@import` 스코프로 격리되어 있다. `_form.scss`는 Bootstrap이 이미 출력한 클래스를 **후속 선언으로 덮어쓰는** 방식을 사용한다. `_vendor.scss`의 `@import "bootstrap/scss/bootstrap"` 이후에 `6-components/_form.scss`가 로드되므로 CSS 명세 cascade 순서가 보장된다.

```scss
// 금지 패턴 — Bootstrap 내부 Sass 변수는 _vendor.scss @import 스코프 밖에서 무효
$input-border-color: var(--color-border);  // 작동 안 함

// 올바른 패턴 — CSS 선택자로 직접 덮어쓰기
.form-control {
  border-color: var(--color-border);  // 작동함
}
```

---

## Architecture Patterns

### 추천 파일 구조

```
scss/6-components/
├── _index.scss           ← @forward 'form' 추가 (D-08)
├── _header.scss          ← Phase 6 기존
├── _skip-nav.scss        ← Phase 5 기존
└── _form.scss            ← Phase 7 신규 (D-04)

docs/components/
├── header.md             ← Phase 6 기존 (패턴 참고)
└── forms.md              ← Phase 7 신규 (D-01)
```

### Pattern 1: _form.scss 구조 (SCSS)

Bootstrap 클래스를 팀 토큰으로 재정의하는 방식. `_header.scss`와 동일한 패턴 — 한국어 주석, CSS 토큰만 사용, respond-to() 선택적 사용.

```scss
// Source: scss/6-components/_header.scss 패턴 참고
@use '../2-tools/breakpoints' as *;

// ====================================================
// [폼 컴포넌트 — COMP-03]
// Bootstrap .form-control / .form-select / .form-check 오버라이드
// CSS 토큰(var(--*))만 사용 — Sass 변수 오버라이드 방식 금지
// ====================================================

// ── 폼 레이블 ─────────────────────────────────────
.form-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

// ── 입력 필드 공통 (input, textarea) ──────────────
.form-control {
  height: 4.8rem;            // 48px — 터치 타겟 최소 크기
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  color: var(--color-text);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.4rem;
  transition: none;          // 공공기관 트랜지션 없음 원칙 적용

  &:focus {
    border-color: var(--color-primary);
    box-shadow: none;        // Bootstrap 기본 box-shadow 제거
    outline: 0;              // 전역 :focus-visible이 outline 처리
  }

  // textarea — height 자동
  &[rows] {
    height: auto;
  }

  // 오류 상태 (D-06)
  &.is-invalid {
    border-color: var(--color-error);
  }

  // 성공 상태 (D-06)
  &.is-valid {
    border-color: var(--color-success);
  }
}

// ── select ───────────────────────────────────────
.form-select {
  height: 4.8rem;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 0.4rem;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: none;
    outline: 0;
  }

  &.is-invalid { border-color: var(--color-error); }
  &.is-valid   { border-color: var(--color-success); }
}

// ── 체크박스/라디오 (D-07) ─────────────────────────
.form-check-input {
  width: 2.0rem;             // 20px
  height: 2.0rem;
  border: 2px solid var(--color-border);
  cursor: pointer;

  &:checked {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }

  &:focus {
    box-shadow: none;        // Bootstrap focus ring 제거 (전역 :focus-visible 사용)
  }
}

// ── 오류 메시지 ───────────────────────────────────
.invalid-feedback,
.form-error {
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
}

// ── 성공 메시지 ───────────────────────────────────
.valid-feedback,
.form-success {
  color: var(--color-success);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
}

// ── 힌트 텍스트 ───────────────────────────────────
.form-text,
.form-hint {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
}
```

### Pattern 2: 폼 마크업 패턴 (5종)

Phase 5의 `docs/accessibility/forms.md`에서 이미 정의된 접근성 원칙을 따른다. forms.md는 해당 원칙을 구현한 실제 코드 스니펫을 제공한다.

**input (text/email/tel 등):**

```html
<!-- 기본 텍스트 입력 — label for/id 매칭 (Phase 5 패턴 1) -->
<div class="mb-3">
  <label for="user-name" class="form-label">
    이름
    <span aria-hidden="true">*</span>
    <span class="sr-only">(필수)</span>
  </label>
  <input
    type="text"
    id="user-name"
    name="name"
    class="form-control"
    required
    aria-required="true"
    autocomplete="name"
  >
</div>

<!-- 오류 상태 -->
<div class="mb-3">
  <label for="user-email" class="form-label">이메일</label>
  <input
    type="email"
    id="user-email"
    name="email"
    class="form-control is-invalid"
    aria-describedby="email-error"
    aria-invalid="true"
    autocomplete="email"
  >
  <p id="email-error" class="form-error" role="alert">
    올바른 이메일 형식으로 입력해 주세요.
  </p>
</div>
```

**select:**

```html
<div class="mb-3">
  <label for="region" class="form-label">지역</label>
  <select id="region" name="region" class="form-select">
    <option value="">선택하세요</option>
    <option value="seoul">서울</option>
    <option value="busan">부산</option>
  </select>
</div>
```

**textarea:**

```html
<div class="mb-3">
  <label for="message" class="form-label">문의 내용</label>
  <textarea
    id="message"
    name="message"
    class="form-control"
    rows="5"
    aria-describedby="message-hint"
  ></textarea>
  <p id="message-hint" class="form-text">최대 500자까지 입력 가능합니다.</p>
</div>
```

**checkbox (단일 / 그룹):**

```html
<!-- 단일 체크박스 -->
<div class="form-check">
  <input type="checkbox" id="agree" name="agree" class="form-check-input">
  <label for="agree" class="form-check-label">이용약관에 동의합니다.</label>
</div>

<!-- 체크박스 그룹 — fieldset/legend 필수 (Phase 5 패턴) -->
<fieldset>
  <legend class="form-label">관심 분야</legend>
  <div class="form-check">
    <input type="checkbox" id="interest-design" name="interest" value="design" class="form-check-input">
    <label for="interest-design" class="form-check-label">디자인</label>
  </div>
  <div class="form-check">
    <input type="checkbox" id="interest-pub" name="interest" value="pub" class="form-check-input">
    <label for="interest-pub" class="form-check-label">퍼블리싱</label>
  </div>
</fieldset>
```

**radio:**

```html
<!-- 라디오 그룹 — fieldset/legend 필수 -->
<fieldset>
  <legend class="form-label">성별</legend>
  <div class="form-check">
    <input type="radio" id="gender-male" name="gender" value="male" class="form-check-input">
    <label for="gender-male" class="form-check-label">남성</label>
  </div>
  <div class="form-check">
    <input type="radio" id="gender-female" name="gender" value="female" class="form-check-input">
    <label for="gender-female" class="form-check-label">여성</label>
  </div>
</fieldset>
```

### Pattern 3: 폼 오류 처리 JS (D-09, D-10)

Phase 6 GNB JS 패턴과 동일한 구조 — IIFE, querySelector/querySelectorAll, setAttribute.

```javascript
// 폼 실시간 오류 처리 — aria-describedby + role="alert" + 포커스 이동
// Phase 6 GNB JS 패턴(IIFE + querySelector)과 동일한 방식
(function () {
  var form = document.querySelector('.form-validate');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var firstInvalid = null;

    // 각 필드 유효성 검사
    var fields = form.querySelectorAll('[data-validate]');
    fields.forEach(function (field) {
      var errorId = field.id + '-error';
      var errorEl = document.getElementById(errorId);
      var isEmpty = !field.value.trim();

      if (isEmpty) {
        // 오류 상태 설정
        field.classList.add('is-invalid');
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', errorId);

        // role="alert" — 스크린 리더에 즉시 오류 알림
        if (errorEl) {
          errorEl.setAttribute('role', 'alert');
          errorEl.style.display = 'block';
        }

        // 첫 번째 오류 필드 기록
        if (!firstInvalid) firstInvalid = field;

      } else {
        // 오류 해제
        field.classList.remove('is-invalid');
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
        if (errorEl) {
          errorEl.removeAttribute('role');
          errorEl.style.display = 'none';
        }
      }
    });

    // 첫 번째 오류 필드로 포커스 이동 (D-09)
    if (firstInvalid) {
      firstInvalid.focus();
    } else {
      // 모든 검사 통과 시 폼 제출
      form.submit();
    }
  });
})();
```

### Anti-Patterns to Avoid

- **Bootstrap focus ring 이중 적용:** `.form-control:focus`에 `box-shadow`와 전역 `:focus-visible` outline이 동시에 표시됨. `_form.scss`에서 `&:focus { box-shadow: none; outline: 0; }`으로 Bootstrap 기본 제거 필요 — 전역 `_focus.scss`의 `:focus-visible`이 outline을 처리한다.
- **Sass 변수 오버라이드 방식 시도:** `$input-border-color` 등 Bootstrap Sass 변수는 `_vendor.scss` `@import` 스코프 밖에서 선언해도 Bootstrap이 읽지 못함. 반드시 CSS 선택자 오버라이드 사용.
- **placeholder를 label 대신 사용:** Phase 5 `docs/accessibility/forms.md`에서 이미 금지 원칙 수립. forms.md 마크업 패턴에서도 모든 예시에 `<label>` 포함.
- **checkbox/radio에 for/id 없이 감싸기 패턴만 사용:** Bootstrap `.form-check` 구조에서는 `<input>`과 `<label>`이 형제 요소. 감싸기 패턴 대신 for/id 매칭 패턴 사용.
- **트랜지션 애니메이션 추가:** 공공기관 납품 원칙상 폼 요소에도 `transition: none` 적용 (Phase 5/6 결정 일관성).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 폼 유효성 검사 메시지 스타일 | `.error-message` 커스텀 클래스 신규 정의 | Bootstrap `.is-invalid` / `.invalid-feedback` 오버라이드 | Bootstrap 클래스 이미 DOM 구조에 통합됨. 신규 클래스는 문서-스타일 불일치 유발 |
| 커스텀 체크박스 SVG 배경 | SVG 데이터 URI 직접 작성 | Bootstrap `_form-check.scss`의 CSS 변수 `--bs-form-check-bg-image` 오버라이드 | Bootstrap이 이미 SVG 처리. 직접 작성 시 고대비 모드 대응 누락 위험 |
| focus 스타일 | `_form.scss`에 별도 outline 정의 | `scss/4-elements/_focus.scss` 전역 `:focus-visible` | 이미 구현됨. 중복 정의 시 명세 충돌 |

---

## Common Pitfalls

### Pitfall 1: .form-control과 .form-select의 :focus 처리 이중화
**What goes wrong:** `_focus.scss`의 전역 `*:focus-visible`이 outline을 적용하는데, Bootstrap의 `.form-control:focus`가 `box-shadow: 0 0 0 0.25rem rgba($primary, 0.25)`도 추가함. 두 가지 포커스 인디케이터가 동시에 나타남.
**Why it happens:** Bootstrap의 `_form-control.scss`는 `:focus`에 `box-shadow` 기반 ring을 적용. 팀은 outline 기반 포커스를 표준으로 사용.
**How to avoid:** `_form.scss`에서 `.form-control:focus`, `.form-select:focus`, `.form-check-input:focus`에 `box-shadow: none; outline: 0;` 명시. 전역 `:focus-visible`의 outline이 단독으로 처리.
**Warning signs:** 브라우저 DevTools에서 `.form-control:focus`의 computed box-shadow가 `0 0 0 0.25rem` 값을 가짐.

### Pitfall 2: is-invalid / aria-invalid 불일치
**What goes wrong:** 시각적으로는 `.is-invalid` 클래스가 붙어 빨간 테두리가 표시되지만, `aria-invalid="true"` 속성이 없어 스크린 리더가 오류 상태를 인식 못 함.
**Why it happens:** CSS 클래스와 ARIA 속성은 별개. JS에서 클래스만 추가하고 ARIA 속성을 누락하는 실수.
**How to avoid:** JS 오류 처리 시 `classList.add('is-invalid')`와 `setAttribute('aria-invalid', 'true')`를 항상 쌍으로 처리. forms.md의 JS 예시에 이 패턴을 포함.
**Warning signs:** Accessibility tree inspector(브라우저 DevTools → Accessibility)에서 해당 input의 'Invalid' 속성이 false로 표시.

### Pitfall 3: role="alert" 동적 삽입 타이밍
**What goes wrong:** `role="alert"` 요소가 DOM에 처음부터 있거나, 내용을 비워둔 채 추가만 하면 스크린 리더가 읽지 않음.
**Why it happens:** `role="alert"` 또는 `aria-live="assertive"`는 **내용이 변경될 때** 스크린 리더에 알림을 보냄. 처음부터 내용이 있거나 요소 삽입 자체가 아닌 텍스트 변경이 트리거.
**How to avoid:** 오류 메시지 컨테이너를 DOM에 미리 배치하되 내용은 비움. 오류 발생 시 `textContent`를 업데이트하거나 `style.display`를 변경. Phase 5 `docs/accessibility/forms.md`의 오류 메시지 패턴 참고.
**Warning signs:** NVDA/JAWS 테스트 시 오류 발생 후 스크린 리더가 아무것도 읽지 않음.

### Pitfall 4: fieldset에 form-label 클래스 적용 시 margin-bottom 이중
**What goes wrong:** `<legend class="form-label">`에 `.form-label`의 `margin-bottom` + Bootstrap `legend`의 `margin-bottom`이 겹쳐 간격이 2배가 됨.
**Why it happens:** Bootstrap `_reboot.scss`에 `legend { margin-bottom: 0.5rem; }` 기본 스타일 존재.
**How to avoid:** `_form.scss`에서 `fieldset { legend.form-label { margin-bottom: var(--spacing-xs); } }` 처리하거나, forms.md 마크업 패턴에서 `<legend>` 스타일 클래스를 별도 정의.

### Pitfall 5: 커스텀 체크박스/라디오 appearance: none 과 고대비 모드
**What goes wrong:** CSS로 완전히 커스텀한 체크박스가 Windows 고대비 모드(Forced Colors)에서 배경색이 사라지고 체크 여부를 구분 불가.
**Why it happens:** `forced-colors` 모드에서 `background-color`, `background-image`가 시스템 색상으로 강제 치환되며 커스텀 SVG 배경이 사라질 수 있음.
**How to avoid:** Bootstrap의 CSS 변수 기반 체크박스(`--bs-form-check-bg-image`)를 그대로 활용하거나, `@media (forced-colors: active)` 폴백을 추가. 기본 수준으로는 Bootstrap이 처리하므로 신규 SVG를 작성하지 않는 것이 안전.

---

## Code Examples

### _form.scss — @use 임포트 헤더

```scss
// Source: scss/6-components/_header.scss 패턴 적용
@use '../2-tools/breakpoints' as *;

// ====================================================
// [폼 컴포넌트 — COMP-03]
// 작성일: 2026-03-26
// Bootstrap .form-control / .form-select / .form-check 오버라이드
// CSS 토큰(var(--*))만 사용
// ====================================================
```

### _index.scss — @forward 추가 위치

```scss
// Source: scss/6-components/_index.scss 현재 상태
@forward 'skip-nav';  // 본문건너뛰기 (A11Y-01)
@forward 'header';    // 헤더/GNB (COMP-01)
@forward 'form';      // 폼 컴포넌트 (COMP-03) ← 추가
```

### forms.md — 문서 헤더 구조 (header.md 패턴 적용)

```markdown
# 폼 컴포넌트 (COMP-03)

**KWCAG 2.1 기준:** 3.4.1 레이블 제공, 3.4.2 오류 정정
**적용 수준:** AA
**작성일:** 2026-03-26

> 폼 접근성 원칙(label-input 연결, required 표시, fieldset/legend 등)은
> `docs/accessibility/forms.md`를 참고한다. 이 문서는 실제 마크업 패턴을 제공한다.
> CSS 클래스는 `scss/6-components/_form.scss`와 일치시킨다.
```

### CSS 토큰 사용 현황 (기존 _root.scss 토큰 활용)

```scss
// _root.scss에 이미 정의된 토큰 — Phase 7에서 활용
--color-error:      #dc3545;   // .is-invalid, .form-error
--color-success:    #198754;   // .is-valid, .form-success
--color-border:     #dee2e6;   // 기본 테두리
--color-primary:    #0d6efd;   // :focus 테두리
--color-text:       #212529;   // 입력 텍스트
--color-text-muted: #6c757d;   // 힌트 텍스트
--font-size-base:   1.6rem;    // 입력 텍스트 크기
--font-size-sm:     1.2rem;    // 힌트/오류 메시지 크기
--spacing-xs:       0.4rem;    // 레이블 margin-bottom
--spacing-sm:       0.8rem;    // 입력 vertical padding
--spacing-md:       1.6rem;    // 입력 horizontal padding
```

---

## Environment Availability

Step 2.6: SKIPPED — Phase 7은 SCSS 파일 생성과 마크다운 문서 작성만 포함. 외부 CLI 도구나 서비스 의존성 없음.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | 없음 (nyquist_validation: true이나 현재 테스트 인프라 미구축) |
| Config file | 없음 |
| Quick run command | 해당 없음 — 마크업/SCSS 결과물은 수동 브라우저 검증 |
| Full suite command | 해당 없음 |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| COMP-03 | _form.scss가 존재하며 5종 폼 요소 스타일 정의 | manual | 브라우저에서 forms.md HTML 렌더링 확인 | ❌ Wave 0 생성 |
| COMP-03 | docs/components/forms.md 존재 및 5종 코드 블록 포함 | manual | 파일 존재 + 섹션 확인 | ❌ Wave 0 생성 |
| A11Y-05 | forms.md의 모든 마크업 패턴에 label 연결, aria-invalid 패턴 포함 | manual | 문서 검토 | ❌ Wave 0 생성 |
| COMP-03 | @forward 'form'이 _index.scss에 추가됨 | manual | `grep "@forward 'form'" scss/6-components/_index.scss` | ❌ Wave 0 생성 |

> 참고: 이 프로젝트는 HTML/CSS 퍼블리싱 가이드로, 자동화 테스트(AUTO-02 pa11y-ci 등)는 v2 요구사항. v1 단계에서는 수동 브라우저 검증이 기준.

### Sampling Rate

- **Per task commit:** `grep "@forward 'form'" scss/6-components/_index.scss` (빠른 통합 확인)
- **Per wave merge:** 브라우저에서 폼 마크업 렌더링 + 스크린 리더 탭 탐색 확인
- **Phase gate:** forms.md 5종 마크업 + _form.scss 오류/성공 상태 시각 확인 완료 후 `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `scss/6-components/_form.scss` — COMP-03 (신규 생성)
- [ ] `docs/components/forms.md` — COMP-03 (신규 생성)
- [ ] `scss/6-components/_index.scss` — `@forward 'form'` 추가

---

## Sources

### Primary (HIGH confidence)

- 프로젝트 코드베이스 직접 분석 — `scss/6-components/_header.scss`, `_index.scss`, `_focus.scss`, `_root.scss`, `_mixin.scss`
- 프로젝트 코드베이스 직접 분석 — `docs/components/header.md`, `docs/accessibility/forms.md`
- `node_modules/bootstrap/package.json` — 버전 5.3.8 확인
- `node_modules/bootstrap/scss/forms/` — `_form-control.scss`, `_form-check.scss`, `_validation.scss` 직접 확인
- `scss/3-generic/_vendor.scss` — Bootstrap `@import` 격리 패턴 확인
- `.planning/REQUIREMENTS.md` — COMP-03, A11Y-05 요구사항 확인
- `.planning/phases/07-핵심-컴포넌트-폼/07-CONTEXT.md` — D-01~D-10 결정 확인

### Secondary (MEDIUM confidence)

- WAI-ARIA authoring practices (W3C APG) — `role="alert"` 동적 삽입 타이밍 패턴 (Phase 5 docs/accessibility/forms.md에서 이미 반영됨)

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — Bootstrap 5.3.8 버전 및 폼 관련 SCSS 파일 구조 직접 확인
- Architecture: HIGH — 기존 `_header.scss` 패턴, `_index.scss` 구조, `_root.scss` 토큰 직접 확인
- Pitfalls: HIGH — Bootstrap 코드베이스 직접 확인 (`:focus` box-shadow, `_reboot.scss` legend 스타일), Phase 5 접근성 원칙과 교차 검증

**Research date:** 2026-03-26
**Valid until:** 2026-04-25 (Bootstrap 5.3 안정 릴리스 기준 30일)
