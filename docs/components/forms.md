---
layout: layouts/base.njk
title: 폼 컴포넌트
tags: components
section: components
permalink: /components/forms/
---

# 폼 컴포넌트 (COMP-03)

**KWCAG 2.1 기준:** 3.4.1 레이블 제공, 3.4.2 오류 정정
**적용 수준:** AA
**작성일:** 2026-03-26

> 폼 접근성 원칙(label-input 연결, required 표시, fieldset/legend 등)은
> `docs/accessibility/forms.md`를 참고한다. 이 문서는 실제 마크업 패턴을 제공한다.
> CSS 클래스는 `scss/6-components/_form.scss`와 일치시킨다.

**규칙: 모든 입력 필드에는 `<label>`이 연결되어야 한다. `placeholder`는 레이블을 대체할 수 없다.**

---

## 텍스트 입력 (input)

### 기본 텍스트 입력 (필수 필드)

`for`/`id` 연결로 `<label>`과 `<input>`을 묶고, 필수 표시는 시각(`*`)과 스크린리더용(`(필수)`) 두 가지를 동시에 제공한다. 시각적 `*`에 `aria-hidden="true"`를 붙이는 이유는 스크린리더가 "별표, 이름, 필수"처럼 중복 읽는 것을 막기 위해서다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="mb-3">
    <label for="preview-name" class="form-label">
      이름
      <span aria-hidden="true">*</span>
      <span class="sr-only">(필수)</span>
    </label>
    <input
      type="text"
      id="preview-name"
      name="name"
      class="form-control"
      required
      aria-required="true"
      autocomplete="name"
    >
  </div>
</form>
</div>

```html
<!-- 기본 텍스트 입력 — label for/id 매칭, aria-required + 시각적 * 병행 처리 -->
<div class="mb-3">
  <label for="user-name" class="form-label">
    이름
    <!-- 시각적 필수 표시 — 스크린 리더에서 중복 읽기 방지 -->
    <span aria-hidden="true">*</span>
    <!-- 스크린 리더 전용 필수 안내 텍스트 -->
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
```

### 오류 상태 입력

오류가 발생하면 `is-invalid`(시각) + `aria-invalid="true"`(스크린리더)를 반드시 쌍으로 처리한다. `aria-describedby`로 오류 메시지 요소를 연결하면 스크린리더가 필드에 포커스될 때 오류 내용을 자동으로 읽어준다:

```html
<!-- 오류 상태 — is-invalid + aria-invalid="true" 쌍 처리, aria-describedby로 오류 메시지 연결 -->
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
  <!-- role="alert" — 스크린 리더에 오류 내용 즉시 알림 -->
  <p id="email-error" class="form-error" role="alert">
    올바른 이메일 형식으로 입력해 주세요.
  </p>
</div>
```

❌ 나쁜 예: CSS 클래스만 추가

```html
<input class="form-control is-invalid">
```

이렇게 하면 오류 테두리는 보이지만, 스크린리더는 오류 상태를 전혀 인식하지 못한다. 시각장애인은 어느 필드가 잘못 입력되었는지 알 수 없다.

✅ 좋은 예: CSS 클래스 + aria-invalid 쌍으로 처리

```html
<input class="form-control is-invalid" aria-invalid="true" aria-describedby="email-error">
<p id="email-error" class="form-error" role="alert">올바른 이메일 형식으로 입력해 주세요.</p>
```

> **주의:** `is-invalid` 클래스와 `aria-invalid="true"` 속성은 항상 쌍으로 처리한다.
> CSS 클래스만 추가하면 시각적으로만 오류가 표시되고, 스크린 리더는 오류 상태를 인식하지 못한다.

---

## 선택 (select)

`<label>`과 `<select>`를 `for`/`id`로 연결한다. 기본 옵션에 빈 `value=""`를 넣어야 선택하지 않은 상태를 명확히 표현할 수 있다:

```html
<!-- select — label for/id 매칭, 기본 옵션 "선택하세요" -->
<div class="mb-3">
  <label for="region" class="form-label">지역</label>
  <select id="region" name="region" class="form-select">
    <!-- 기본값: 빈 value로 미선택 상태 표현 -->
    <option value="">선택하세요</option>
    <option value="seoul">서울</option>
    <option value="busan">부산</option>
    <option value="daegu">대구</option>
    <option value="incheon">인천</option>
  </select>
</div>
```

### 오류 상태 select

입력 필드와 동일하게 `is-invalid` + `aria-invalid` + `aria-describedby`를 모두 함께 적용한다:

```html
<!-- 오류 상태 select — is-invalid + aria-invalid + aria-describedby 쌍 처리 -->
<div class="mb-3">
  <label for="region-required" class="form-label">
    지역
    <span aria-hidden="true">*</span>
    <span class="sr-only">(필수)</span>
  </label>
  <select
    id="region-required"
    name="region"
    class="form-select is-invalid"
    aria-required="true"
    aria-invalid="true"
    aria-describedby="region-error"
  >
    <option value="">선택하세요</option>
    <option value="seoul">서울</option>
    <option value="busan">부산</option>
  </select>
  <p id="region-error" class="form-error" role="alert">
    지역을 선택해 주세요.
  </p>
</div>
```

---

## 텍스트 영역 (textarea)

`aria-describedby`를 사용하면 힌트 텍스트와 입력 필드를 연결할 수 있다. 스크린리더가 필드에 포커스될 때 힌트("최대 500자")도 함께 읽어준다:

```html
<!-- textarea — label for/id 매칭, aria-describedby로 힌트 텍스트 연결 -->
<div class="mb-3">
  <label for="message" class="form-label">문의 내용</label>
  <textarea
    id="message"
    name="message"
    class="form-control"
    rows="5"
    aria-describedby="message-hint"
  ></textarea>
  <!-- 힌트 텍스트 — aria-describedby로 입력 요소와 연결 -->
  <p id="message-hint" class="form-text">최대 500자까지 입력 가능합니다.</p>
</div>
```

### 힌트 + 오류 동시 참조

`aria-describedby`는 공백으로 구분하여 여러 요소를 동시에 연결할 수 있다. 힌트와 오류 메시지 두 개를 모두 연결하면 스크린리더가 "최소 10자 이상... 내용을 입력해 주세요" 순서로 읽어준다:

```html
<!-- aria-describedby로 힌트와 오류 메시지 동시 연결 (공백 구분) -->
<div class="mb-3">
  <label for="content" class="form-label">
    내용
    <span aria-hidden="true">*</span>
    <span class="sr-only">(필수)</span>
  </label>
  <textarea
    id="content"
    name="content"
    class="form-control is-invalid"
    rows="5"
    required
    aria-required="true"
    aria-invalid="true"
    aria-describedby="content-hint content-error"
  ></textarea>
  <p id="content-hint" class="form-text">최소 10자 이상 입력해 주세요.</p>
  <p id="content-error" class="form-error" role="alert">
    내용을 입력해 주세요.
  </p>
</div>
```

---

## 체크박스 (checkbox)

### 단일 체크박스

단일 체크박스는 `<label>`과 `for`/`id`로 연결한다. 체크박스 텍스트를 클릭해도 체크가 되어야 하므로 label 연결은 UX와 접근성 모두에 필요하다:

```html
<!-- 단일 체크박스 — form-check 구조, for/id 매칭 -->
<div class="form-check">
  <input
    type="checkbox"
    id="agree"
    name="agree"
    class="form-check-input"
  >
  <label for="agree" class="form-check-label">이용약관에 동의합니다.</label>
</div>
```

### 체크박스 그룹 (fieldset/legend 필수)

여러 체크박스가 하나의 질문에 속한다면 `<fieldset>` + `<legend>`로 묶어야 한다. `<legend>` 없이 나열하면 스크린리더가 "디자인 체크박스"처럼 읽는 게 아니라, 그 체크박스가 무슨 질문("관심 분야")에 대한 답인지 알 수 없다:

```html
<!-- 체크박스 그룹 — fieldset/legend 필수: 그룹 맥락을 스크린 리더에 전달 -->
<fieldset>
  <!-- legend는 그룹 전체의 레이블 역할 — 각 체크박스 읽을 때 함께 읽힘 -->
  <legend class="form-label">관심 분야</legend>
  <div class="form-check">
    <input
      type="checkbox"
      id="interest-design"
      name="interest"
      value="design"
      class="form-check-input"
    >
    <label for="interest-design" class="form-check-label">디자인</label>
  </div>
  <div class="form-check">
    <input
      type="checkbox"
      id="interest-pub"
      name="interest"
      value="pub"
      class="form-check-input"
    >
    <label for="interest-pub" class="form-check-label">퍼블리싱</label>
  </div>
  <div class="form-check">
    <input
      type="checkbox"
      id="interest-dev"
      name="interest"
      value="dev"
      class="form-check-input"
    >
    <label for="interest-dev" class="form-check-label">개발</label>
  </div>
</fieldset>
```

> **주의:** 라디오/체크박스 그룹에 반드시 `<fieldset>` + `<legend>`를 사용한다.
> `<legend>` 없이 그룹을 나열하면 스크린 리더에서 각 옵션이 어느 그룹에 속하는지 알 수 없다.

---

## 라디오 (radio)

### 라디오 그룹 (fieldset/legend 필수)

라디오 버튼도 체크박스 그룹과 같은 이유로 `<fieldset>` + `<legend>`가 필수다. `<legend>`가 있으면 스크린리더가 "성별, 남성 라디오 버튼" 형태로 읽어서 선택 맥락을 바로 파악할 수 있다:

```html
<!-- 라디오 그룹 — fieldset/legend 필수, 각 항목에 for/id 매칭 -->
<fieldset>
  <!-- legend는 그룹 레이블 — 예: "성별, 남성 라디오 버튼" 으로 읽힘 -->
  <legend class="form-label">성별</legend>
  <div class="form-check">
    <input
      type="radio"
      id="gender-male"
      name="gender"
      value="male"
      class="form-check-input"
    >
    <label for="gender-male" class="form-check-label">남성</label>
  </div>
  <div class="form-check">
    <input
      type="radio"
      id="gender-female"
      name="gender"
      value="female"
      class="form-check-input"
    >
    <label for="gender-female" class="form-check-label">여성</label>
  </div>
  <div class="form-check">
    <input
      type="radio"
      id="gender-other"
      name="gender"
      value="other"
      class="form-check-input"
    >
    <label for="gender-other" class="form-check-label">기타</label>
  </div>
</fieldset>
```

### 필수 라디오 그룹

라디오 그룹이 필수 선택인 경우, `<fieldset>`에 `aria-required="true"`를 적용하고 `<legend>`에 필수 표시를 추가한다:

```html
<!-- 필수 라디오 그룹 — fieldset에 aria-required 적용 -->
<fieldset aria-required="true">
  <legend class="form-label">
    성별
    <span aria-hidden="true">*</span>
    <span class="sr-only">(필수)</span>
  </legend>
  <div class="form-check">
    <input
      type="radio"
      id="gender2-male"
      name="gender2"
      value="male"
      class="form-check-input"
      required
    >
    <label for="gender2-male" class="form-check-label">남성</label>
  </div>
  <div class="form-check">
    <input
      type="radio"
      id="gender2-female"
      name="gender2"
      value="female"
      class="form-check-input"
    >
    <label for="gender2-female" class="form-check-label">여성</label>
  </div>
</fieldset>
```

---

## 오류 처리 (JS 예시)

아래 예시는 Phase 6 GNB JS 패턴과 동일한 IIFE + querySelector 구조를 사용한다. (D-09, D-10)

### 마크업 준비

유효성 검사 대상 필드에 `data-validate` 속성을 붙이고, 오류 메시지 컨테이너는 처음부터 DOM에 비어있는 상태로 준비한다. 나중에 JS로 삽입하면 `role="alert"` 타이밍 문제가 생길 수 있다:

```html
<!-- 유효성 검사 대상 폼 — class="form-validate" 지정 -->
<form class="form-validate" novalidate>
  <!-- 필수 필드에 data-validate 속성 추가 — JS 순회 대상 -->
  <div class="mb-3">
    <label for="v-name" class="form-label">
      이름
      <span aria-hidden="true">*</span>
      <span class="sr-only">(필수)</span>
    </label>
    <input
      type="text"
      id="v-name"
      name="name"
      class="form-control"
      data-validate
      required
      aria-required="true"
      autocomplete="name"
    >
    <!-- 오류 메시지 컨테이너 — 미리 DOM에 존재, 내용은 비워둠 -->
    <!-- id는 반드시 "필드id-error" 패턴 유지 (JS에서 errorId = field.id + '-error') -->
    <p id="v-name-error" class="form-error" class="d-none"></p>
  </div>

  <div class="mb-3">
    <label for="v-email" class="form-label">
      이메일
      <span aria-hidden="true">*</span>
      <span class="sr-only">(필수)</span>
    </label>
    <input
      type="email"
      id="v-email"
      name="email"
      class="form-control"
      data-validate
      required
      aria-required="true"
      autocomplete="email"
    >
    <p id="v-email-error" class="form-error" class="d-none"></p>
  </div>

  <button type="submit" class="btn btn-primary">제출</button>
</form>
```

### JS 오류 처리 스니펫

오류 발생 시 첫 번째 오류 필드로 포커스를 이동시키는 것이 핵심이다. 그래야 키보드 사용자와 스크린리더 사용자가 어디서 오류가 났는지 바로 인식할 수 있다:

```javascript
// 폼 유효성 검사 및 오류 처리
// Phase 6 GNB JS 패턴(jQuery ready + selector)과 동일한 방식 (D-10)
// 오류 발생: is-invalid + aria-invalid="true" 쌍 처리, role="alert" 적용
// 첫 번째 오류 필드로 focus() 이동
$(function () {
  var $form = $('.form-validate');
  if (!$form.length) return;

  $form.on('submit', function (event) {
    event.preventDefault();

    var $firstInvalid = null;

    // [data-validate] 속성을 가진 필드 전체 순회
    $form.find('[data-validate]').each(function () {
      var $field = $(this);
      // 오류 메시지 요소 id 규칙: 필드id + '-error'
      var errorId = $field.attr('id') + '-error';
      var $errorEl = $('#' + errorId);
      var isEmpty = !$field.val().trim();

      if (isEmpty) {
        // 오류 상태 설정 — is-invalid + aria-invalid="true" 쌍으로 처리
        $field.addClass('is-invalid');
        $field.attr('aria-invalid', 'true');
        $field.attr('aria-describedby', errorId);

        // role="alert" — 스크린 리더에 오류 내용 즉시 알림
        // 오류 메시지 컨테이너 내용 변경 시 role="alert"가 트리거됨
        if ($errorEl.length) {
          var $label = $('label[for="' + $field.attr('id') + '"]');
          $errorEl.text($label.length ? $label.text().replace('*', '').trim() + '을(를) 입력해 주세요.' : '필수 입력 항목입니다.');
          $errorEl.attr('role', 'alert').show();
        }

        // 첫 번째 오류 필드 기록
        if (!$firstInvalid) $firstInvalid = $field;

      } else {
        // 오류 해제 — is-invalid + aria-invalid 쌍으로 제거
        $field.removeClass('is-invalid');
        $field.removeAttr('aria-invalid');
        $field.removeAttr('aria-describedby');
        if ($errorEl.length) {
          $errorEl.removeAttr('role').hide().text('');
        }
      }
    });

    // 첫 번째 오류 필드로 포커스 이동 — 키보드/스크린 리더 사용자 편의 (D-09)
    if ($firstInvalid) {
      $firstInvalid.focus();
    } else {
      // 모든 검사 통과 시 폼 제출
      $form[0].submit();
    }
  });
});
```

> **role="alert" 타이밍 주의:** 오류 메시지 컨테이너(`<p id="*-error">`)는 DOM에 미리 존재하되 내용을 비워둔다.
> 오류 발생 시 `textContent`를 업데이트하면 `role="alert"` 또는 `aria-live="assertive"`가 변경 내용을 스크린 리더에 즉시 전달한다.
> 처음부터 내용이 있는 상태로 `role="alert"`를 설정하면 스크린 리더가 읽지 않을 수 있다.
> 자세한 내용은 `docs/accessibility/forms.md`의 오류 메시지 섹션을 참고한다.

---

## 접근성 체크리스트

폼 마크업 검수 시 아래 항목을 확인한다.

- [ ] 모든 입력 필드에 `<label>`이 연결되어 있다 (`for`/`id` 매칭)
- [ ] 오류 메시지가 `aria-describedby`로 해당 입력 필드에 연결되어 있다
- [ ] 필수 입력 항목에 `aria-required="true"` + 시각적 `*` + `sr-only "(필수)"` 모두 적용
- [ ] 오류 상태에 `is-invalid` 클래스 + `aria-invalid="true"` 쌍으로 처리
- [ ] 오류 메시지에 `role="alert"` 적용 (스크린 리더 즉시 알림)
- [ ] 체크박스/라디오 그룹에 `<fieldset>` + `<legend>` 사용
- [ ] 체크박스/라디오 터치 영역 최소 44×44px 보장 — WCAG 2.5.8 최소 터치영역 (`.form-check-input` `min-width`/`min-height` 확인)
- [ ] `placeholder`만으로 레이블을 대체하지 않음
- [ ] 전체 폼 접근성 원칙은 `docs/accessibility/forms.md` 참조

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_form.scss` | 폼 컴포넌트 스타일 (Bootstrap 오버라이드) |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용, 폼 별도 설정 불필요) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--color-error`, `--color-success` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Text input (텍스트 입력 필드)**, **Textarea (텍스트 영역)**, **Select (셀렉트)**, **Checkbox / Radio** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<label>` 연결 | 필수 — `for`/`id` 매칭 | ✅ |
| `aria-required` + `required` | 필수 — 필수 입력 표시 | ✅ |
| `aria-invalid` | 필수 — 오류 상태 전달 | ✅ |
| `aria-describedby` | 필수 — 힌트/오류 메시지 연결 | ✅ |
| `role="alert"` 오류 | 필수 — 즉시 알림 | ✅ |
| `fieldset` / `legend` | 필수 — 라디오/체크박스 그룹 | ✅ |
| `autocomplete` | 권장 — 개인 정보 필드 | ✅ |

> **KRDS 추가:** KRDS는 **Date input (날짜 입력 필드)**, **File upload (파일 업로드)** 컴포넌트도 별도 정의한다. 공공기관 민원 신청서 등에서 자주 필요하므로 접근성 가이드(`docs/accessibility/forms.md`)를 참조하여 확장한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Text input / Select <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 입력 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.1 레이블 제공 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.2 오류 정정 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/tutorials/forms/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Form Concepts <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-describedby" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-describedby <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-invalid" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-invalid <span class="sr-only">(새 창)</span></a>
- `docs/accessibility/forms.md` — 폼 접근성 원칙 전체 가이드 (Phase 5)
