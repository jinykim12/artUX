---
layout: layouts/base.njk
title: 날짜 입력
tags: components
section: components
permalink: /components/form-date/
---

# 날짜 입력 (COMP-03-DATE)

**KWCAG 2.1 기준:** 3.4.1 레이블 제공, 3.4.2 오류 정정
**적용 수준:** AA
**작성일:** 2026-03-31

> 날짜 입력은 `input type="date"`를 기본으로 사용하되, 미지원 브라우저를 위한 텍스트 입력 폴백 패턴을 제공한다.
> 날짜 형식 힌트를 `aria-describedby`로 연결하여 스크린리더 사용자에게 입력 형식을 안내한다.
> 폼 접근성 원칙은 `docs/accessibility/forms.md`를 참고한다.

**규칙: 날짜 입력에 형식 힌트를 `aria-describedby`로 반드시 제공한다. 날짜 범위 입력 시 시작일/종료일을 `<fieldset>` + `<legend>`로 묶는다.**

---

## 기본 날짜 입력

`input type="date"`에 `<label>`을 연결하고, 날짜 형식 힌트를 `aria-describedby`로 안내한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="mb-3">
    <label for="preview-date" class="form-label">생년월일</label>
    <input type="date" id="preview-date" name="birth_date" class="form-control" aria-describedby="preview-date-hint" autocomplete="bday">
    <p id="preview-date-hint" class="form-text">형식: YYYY-MM-DD (예: 1990-01-15)</p>
  </div>
</form>
</div>

```html
<!-- 기본 날짜 입력 — label 연결, aria-describedby로 형식 힌트 안내 -->
<div class="mb-3">
    <label for="birth-date" class="form-label">생년월일</label>
    <input type="date" id="birth-date" name="birth_date" class="form-control" aria-describedby="date-hint" autocomplete="bday">
    <p id="date-hint" class="form-text">형식: YYYY-MM-DD (예: 1990-01-15)</p>
</div>
```

---

## 텍스트 입력 폴백 패턴

`input type="date"`를 지원하지 않는 환경에서 사용하는 텍스트 입력 폴백이다. `pattern` 속성과 `inputmode="numeric"`으로 입력을 유도한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="mb-3">
    <label for="preview-date-fallback" class="form-label">날짜</label>
    <input type="text" id="preview-date-fallback" name="date" class="form-control" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" inputmode="numeric" aria-describedby="preview-date-fallback-hint">
    <p id="preview-date-fallback-hint" class="form-text">형식: YYYY-MM-DD (예: 2026-03-31)</p>
  </div>
</form>
</div>

```html
<!-- 텍스트 폴백 — pattern으로 형식 검증, inputmode="numeric"으로 숫자 키보드 유도 -->
<div class="mb-3">
    <label for="date-fallback" class="form-label">날짜</label>
    <input type="text" id="date-fallback" name="date" class="form-control" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" inputmode="numeric" aria-describedby="date-fallback-hint">
    <p id="date-fallback-hint" class="form-text">형식: YYYY-MM-DD (예: 2026-03-31)</p>
</div>
```

---

## 필수 날짜 입력

날짜가 필수인 경우 `required`와 `aria-required="true"`를 적용한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="mb-3">
    <label for="preview-event-date" class="form-label">행사일 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="date" id="preview-event-date" name="event_date" class="form-control" required aria-required="true" aria-describedby="preview-event-date-hint">
    <p id="preview-event-date-hint" class="form-text">형식: YYYY-MM-DD</p>
  </div>
</form>
</div>

```html
<!-- 필수 날짜 — required + aria-required, 필수 표시 적용 -->
<div class="mb-3">
    <label for="event-date" class="form-label">행사일 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="date" id="event-date" name="event_date" class="form-control" required aria-required="true" aria-describedby="event-date-hint">
    <p id="event-date-hint" class="form-text">형식: YYYY-MM-DD</p>
</div>
```

---

## 날짜 오류 상태

날짜 형식이 올바르지 않거나 범위를 벗어났을 때의 오류 상태이다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="mb-3">
    <label for="preview-date-error" class="form-label">행사일 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="date" id="preview-date-error" name="event_date" class="form-control is-invalid" required aria-required="true" aria-invalid="true" aria-describedby="preview-date-error-hint preview-date-error-msg">
    <p id="preview-date-error-hint" class="form-text">형식: YYYY-MM-DD</p>
    <p id="preview-date-error-msg" class="form-error" role="alert">올바른 날짜를 입력해 주세요.</p>
  </div>
</form>
</div>

```html
<!-- 날짜 오류 — is-invalid + aria-invalid 쌍 처리, role="alert"로 즉시 알림 -->
<div class="mb-3">
    <label for="date-error" class="form-label">행사일 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="date" id="date-error" name="event_date" class="form-control is-invalid" required aria-required="true" aria-invalid="true" aria-describedby="date-error-hint date-error-msg">
    <p id="date-error-hint" class="form-text">형식: YYYY-MM-DD</p>
    <p id="date-error-msg" class="form-error" role="alert">올바른 날짜를 입력해 주세요.</p>
</div>
```

---

## 날짜 범위 (시작일~종료일)

시작일과 종료일을 함께 입력받을 때 `<fieldset>` + `<legend>`로 그룹화한다. `min`/`max` 속성으로 논리적 범위를 제한한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <fieldset class="mb-3">
    <legend class="form-label">조회 기간</legend>
    <div class="d-flex align-items-center gap-2">
      <div>
        <label for="preview-date-start" class="form-label">시작일</label>
        <input type="date" id="preview-date-start" name="date_start" class="form-control" aria-describedby="preview-date-range-hint">
      </div>
      <span aria-hidden="true">~</span>
      <div>
        <label for="preview-date-end" class="form-label">종료일</label>
        <input type="date" id="preview-date-end" name="date_end" class="form-control">
      </div>
    </div>
    <p id="preview-date-range-hint" class="form-text">시작일은 종료일보다 이전이어야 합니다.</p>
  </fieldset>
</form>
</div>

```html
<!-- 날짜 범위 — fieldset/legend로 그룹화, min/max로 범위 제한 -->
<fieldset class="mb-3">
    <legend class="form-label">조회 기간</legend>
    <div class="form-row">
        <div class="form-group">
            <label for="date-start" class="form-label">시작일</label>
            <input type="date" id="date-start" name="date_start" class="form-control" aria-describedby="date-range-hint">
        </div>
        <span class="form-separator" aria-hidden="true">~</span>
        <div class="form-group">
            <label for="date-end" class="form-label">종료일</label>
            <input type="date" id="date-end" name="date_end" class="form-control">
        </div>
    </div>
    <p id="date-range-hint" class="form-text">시작일은 종료일보다 이전이어야 합니다.</p>
</fieldset>
```

---

## 날짜 범위 오류 (시작일 > 종료일)

시작일이 종료일보다 이후인 경우의 오류 처리이다:

<div class="docs-preview">
<form onsubmit="return false;">
  <fieldset class="mb-3">
    <legend class="form-label">조회 기간</legend>
    <div class="d-flex align-items-center gap-2">
      <div>
        <label for="preview-date-start-err" class="form-label">시작일</label>
        <input type="date" id="preview-date-start-err" name="date_start" class="form-control is-invalid" aria-invalid="true" aria-describedby="preview-date-range-error" value="2026-04-01">
      </div>
      <span aria-hidden="true">~</span>
      <div>
        <label for="preview-date-end-err" class="form-label">종료일</label>
        <input type="date" id="preview-date-end-err" name="date_end" class="form-control is-invalid" aria-invalid="true" aria-describedby="preview-date-range-error" value="2026-03-15">
      </div>
    </div>
    <p id="preview-date-range-error" class="form-error" role="alert">시작일은 종료일보다 이전이어야 합니다.</p>
  </fieldset>
</form>
</div>

```html
<!-- 날짜 범위 오류 — 시작일이 종료일보다 이후일 때 -->
<fieldset class="mb-3">
    <legend class="form-label">조회 기간</legend>
    <div class="form-row">
        <div class="form-group">
            <label for="date-start-err" class="form-label">시작일</label>
            <input type="date" id="date-start-err" name="date_start" class="form-control is-invalid" aria-invalid="true" aria-describedby="date-range-error" value="2026-04-01">
        </div>
        <span class="form-separator" aria-hidden="true">~</span>
        <div class="form-group">
            <label for="date-end-err" class="form-label">종료일</label>
            <input type="date" id="date-end-err" name="date_end" class="form-control is-invalid" aria-invalid="true" aria-describedby="date-range-error" value="2026-03-15">
        </div>
    </div>
    <p id="date-range-error" class="form-error" role="alert">시작일은 종료일보다 이전이어야 합니다.</p>
</fieldset>
```

---

## 연·월·일 분리 입력

하나의 날짜를 연/월/일 세 개의 필드로 분리 입력받는 패턴이다. `<fieldset>` + `<legend>`로 묶어 하나의 날짜 질문임을 전달한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <fieldset class="mb-3">
    <legend class="form-label">생년월일 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></legend>
    <div class="d-flex gap-2">
      <div>
        <label for="preview-birth-year" class="form-label">년</label>
        <input type="text" id="preview-birth-year" name="birth_year" class="form-control" inputmode="numeric" pattern="\d{4}" maxlength="4" required aria-required="true" placeholder="YYYY">
      </div>
      <div>
        <label for="preview-birth-month" class="form-label">월</label>
        <select id="preview-birth-month" name="birth_month" class="form-select" required aria-required="true">
          <option value="">선택</option>
          <option value="01">1월</option>
          <option value="02">2월</option>
          <option value="03">3월</option>
          <option value="04">4월</option>
          <option value="05">5월</option>
          <option value="06">6월</option>
          <option value="07">7월</option>
          <option value="08">8월</option>
          <option value="09">9월</option>
          <option value="10">10월</option>
          <option value="11">11월</option>
          <option value="12">12월</option>
        </select>
      </div>
      <div>
        <label for="preview-birth-day" class="form-label">일</label>
        <input type="text" id="preview-birth-day" name="birth_day" class="form-control" inputmode="numeric" pattern="\d{1,2}" maxlength="2" required aria-required="true" placeholder="DD">
      </div>
    </div>
  </fieldset>
</form>
</div>

```html
<!-- 연·월·일 분리 입력 — fieldset/legend로 하나의 날짜 그룹화 -->
<fieldset class="mb-3">
    <legend class="form-label">생년월일 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></legend>
    <div class="form-row">
        <div class="form-group">
            <label for="birth-year" class="form-label">년</label>
            <input type="text" id="birth-year" name="birth_year" class="form-control" inputmode="numeric" pattern="\d{4}" maxlength="4" required aria-required="true" placeholder="YYYY">
        </div>
        <div class="form-group">
            <label for="birth-month" class="form-label">월</label>
            <select id="birth-month" name="birth_month" class="form-select" required aria-required="true">
                <option value="">선택</option>
                <option value="01">1월</option>
                <option value="02">2월</option>
                <option value="03">3월</option>
                <option value="04">4월</option>
                <option value="05">5월</option>
                <option value="06">6월</option>
                <option value="07">7월</option>
                <option value="08">8월</option>
                <option value="09">9월</option>
                <option value="10">10월</option>
                <option value="11">11월</option>
                <option value="12">12월</option>
            </select>
        </div>
        <div class="form-group">
            <label for="birth-day" class="form-label">일</label>
            <input type="text" id="birth-day" name="birth_day" class="form-control" inputmode="numeric" pattern="\d{1,2}" maxlength="2" required aria-required="true" placeholder="DD">
        </div>
    </div>
</fieldset>
```

---

## 접근성 체크리스트

- [ ] 모든 날짜 입력에 `<label>` 연결 (`for`/`id` 매칭)
- [ ] 날짜 형식 힌트를 `aria-describedby`로 연결
- [ ] 필수 날짜에 `aria-required="true"` + 시각적 `*` + `sr-only "(필수)"` 적용
- [ ] 오류 상태에 `is-invalid` + `aria-invalid="true"` 쌍 처리
- [ ] 오류 메시지에 `role="alert"` 적용
- [ ] 날짜 범위(시작일~종료일)를 `<fieldset>` + `<legend>`로 그룹화
- [ ] 분리 입력(연/월/일)을 `<fieldset>` + `<legend>`로 그룹화
- [ ] `~` 등 시각적 구분자에 `aria-hidden="true"` 적용
- [ ] 텍스트 폴백 사용 시 `pattern` + `inputmode` 제공

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Date input (날짜 입력 필드)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<label>` 연결 | 필수 — `for`/`id` 매칭 | ✅ |
| `aria-describedby` | 필수 — 형식 힌트 연결 | ✅ |
| `aria-required` + `required` | 필수 — 필수 입력 표시 | ✅ |
| `aria-invalid` | 필수 — 오류 상태 전달 | ✅ |
| `role="alert"` 오류 | 필수 — 즉시 알림 | ✅ |
| `fieldset` / `legend` | 필수 — 날짜 범위/분리 그룹 | ✅ |
| `min` / `max` 범위 | 권장 — 논리적 범위 제한 | ✅ |

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Date input <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 날짜 입력 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.1 레이블 제공 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.2 오류 정정 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/tutorials/forms/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Form Concepts <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/date" target="_blank" rel="noopener" title="새 창으로 열림">MDN — input type="date" <span class="sr-only">(새 창)</span></a>
- `docs/accessibility/forms.md` — 폼 접근성 원칙 전체 가이드
- `docs/components/forms.md` — 폼 컴포넌트 기본 패턴
