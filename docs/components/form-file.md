---
layout: layouts/base.njk
title: 파일 첨부
tags: components
section: components
permalink: /components/form-file/
---

# 파일 첨부 (COMP-03-FILE)

**KWCAG 2.1 기준:** 3.4.1 레이블 제공, 3.4.2 오류 정정
**적용 수준:** AA
**작성일:** 2026-03-31

> 파일 첨부는 커스텀 스타일링 시에도 `<input type="file">`의 기본 접근성을 유지해야 한다.
> 허용 파일 형식과 용량 제한을 `aria-describedby`로 안내하고, 업로드된 파일 목록에 삭제 기능을 제공한다.
> 폼 접근성 원칙은 `docs/accessibility/forms.md`를 참고한다.

**규칙: 파일 입력에 `<label>`을 연결하고, 허용 형식/용량 제한을 `aria-describedby`로 안내한다. 커스텀 버튼 사용 시 원본 `<input>`의 접근성을 유지한다.**

---

## 기본 파일 첨부

`<input type="file">`에 `<label>`을 연결하고, `accept` 속성으로 허용 형식을 제한한다. 파일 형식과 용량 제한 힌트를 `aria-describedby`로 연결한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <label for="preview-file" class="form-label">첨부파일</label>
  <input type="file" id="preview-file" name="attachment" class="form-control" accept=".pdf,.hwp,.docx,.jpg,.png" aria-describedby="preview-file-hint">
  <p id="preview-file-hint" class="form-text mb-0">허용 형식: PDF, HWP, DOCX, JPG, PNG / 최대 10MB</p>
</form>
</div>

```html
<!-- 기본 파일 첨부 — label 연결, aria-describedby로 형식/용량 힌트 안내 -->
<div class="mb-3">
    <label for="file-upload" class="form-label">첨부파일</label>
    <input type="file" id="file-upload" name="attachment" class="form-control" accept=".pdf,.hwp,.docx,.jpg,.png" aria-describedby="file-hint">
    <p id="file-hint" class="form-text">허용 형식: PDF, HWP, DOCX, JPG, PNG / 최대 10MB</p>
</div>
```

---

## 커스텀 파일 업로드 버튼

기본 파일 입력의 디자인을 커스터마이징할 때, 원본 `<input>`을 `sr-only`로 숨기고 `<label>`을 버튼처럼 스타일링한다. 이렇게 하면 `<label>` 클릭 시 파일 선택 대화상자가 열리면서 스크린리더 접근성도 유지된다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="mb-3">
    <label for="preview-custom-file" class="btn btn-outline-secondary">파일 선택</label>
    <input type="file" id="preview-custom-file" name="attachment" class="d-none" accept=".pdf,.hwp,.docx,.jpg,.png" aria-describedby="preview-custom-file-hint" multiple>
    <p id="preview-custom-file-hint" class="form-text">허용 형식: PDF, HWP, DOCX, JPG, PNG / 파일당 최대 10MB, 최대 5개</p>
    <p class="form-text" aria-live="polite"></p>
  </div>
</form>
</div>

```html
<!-- 커스텀 파일 업로드 — input을 sr-only로 숨기고 label을 버튼으로 스타일링 -->
<div class="mb-3">
    <label for="custom-file" class="btn btn-outline file-upload-label">
        <svg aria-hidden="true" class="icon"><use href="#icon-upload"></use></svg>
        파일 선택
    </label>
    <input type="file" id="custom-file" name="attachment" class="sr-only" accept=".pdf,.hwp,.docx,.jpg,.png" aria-describedby="custom-file-hint" multiple>
    <p id="custom-file-hint" class="form-text">허용 형식: PDF, HWP, DOCX, JPG, PNG / 파일당 최대 10MB, 최대 5개</p>
    <!-- 선택된 파일명 표시 — aria-live로 변경 알림 -->
    <p id="custom-file-name" class="form-text" aria-live="polite"></p>
</div>
```

---

## 필수 파일 첨부

파일 첨부가 필수인 경우 `required`와 `aria-required="true"`를 적용한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="mb-3">
    <label for="preview-file-required" class="form-label">증빙서류 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="file" id="preview-file-required" name="document" class="form-control" required aria-required="true" accept=".pdf,.jpg,.png" aria-describedby="preview-file-required-hint">
    <p id="preview-file-required-hint" class="form-text">PDF, JPG, PNG 형식 / 최대 5MB</p>
  </div>
</form>
</div>

```html
<!-- 필수 파일 첨부 — required + aria-required 적용 -->
<div class="mb-3">
    <label for="file-required" class="form-label">증빙서류 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="file" id="file-required" name="document" class="form-control" required aria-required="true" accept=".pdf,.jpg,.png" aria-describedby="file-required-hint">
    <p id="file-required-hint" class="form-text">PDF, JPG, PNG 형식 / 최대 5MB</p>
</div>
```

---

## 파일 오류 상태

파일 형식이 올바르지 않거나 용량을 초과했을 때의 오류 상태이다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="mb-3">
    <label for="preview-file-error" class="form-label">첨부파일</label>
    <input type="file" id="preview-file-error" name="attachment" class="form-control is-invalid" aria-invalid="true" aria-describedby="preview-file-error-hint preview-file-error-msg" accept=".pdf,.hwp,.docx">
    <p id="preview-file-error-hint" class="form-text">허용 형식: PDF, HWP, DOCX / 최대 10MB</p>
    <p id="preview-file-error-msg" class="form-error" role="alert">파일 크기가 10MB를 초과합니다. 더 작은 파일을 선택해 주세요.</p>
  </div>
</form>
</div>

```html
<!-- 파일 오류 — is-invalid + aria-invalid 쌍 처리, role="alert"로 즉시 알림 -->
<div class="mb-3">
    <label for="file-error" class="form-label">첨부파일</label>
    <input type="file" id="file-error" name="attachment" class="form-control is-invalid" aria-invalid="true" aria-describedby="file-error-hint file-error-msg" accept=".pdf,.hwp,.docx">
    <p id="file-error-hint" class="form-text">허용 형식: PDF, HWP, DOCX / 최대 10MB</p>
    <p id="file-error-msg" class="form-error" role="alert">파일 크기가 10MB를 초과합니다. 더 작은 파일을 선택해 주세요.</p>
</div>
```

---

## 업로드된 파일 목록

업로드된 파일을 목록으로 표시하고, 각 파일에 삭제 버튼을 제공한다. 삭제 버튼의 `aria-label`에 파일명을 포함하여 어떤 파일을 삭제하는지 명확히 한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="mb-3">
    <label for="preview-file-multi" class="form-label">첨부파일</label>
    <input type="file" id="preview-file-multi" name="attachments" class="form-control" accept=".pdf,.hwp,.docx,.jpg,.png" aria-describedby="preview-file-multi-hint" multiple>
    <p id="preview-file-multi-hint" class="form-text">허용 형식: PDF, HWP, DOCX, JPG, PNG / 파일당 최대 10MB</p>
    <ul class="list-group mt-2" aria-live="polite" aria-label="업로드된 파일 목록">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>제안서.pdf <small class="text-muted">(2.3MB)</small></span>
        <button type="button" class="btn btn-sm btn-danger" aria-label="제안서.pdf 파일 삭제">삭제</button>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>참고자료.hwp <small class="text-muted">(1.1MB)</small></span>
        <button type="button" class="btn btn-sm btn-danger" aria-label="참고자료.hwp 파일 삭제">삭제</button>
      </li>
    </ul>
  </div>
</form>
</div>

```html
<!-- 업로드된 파일 목록 — aria-label에 파일명 포함, 삭제 후 aria-live 알림 -->
<div class="mb-3">
    <label for="file-multi" class="form-label">첨부파일</label>
    <input type="file" id="file-multi" name="attachments" class="form-control" accept=".pdf,.hwp,.docx,.jpg,.png" aria-describedby="file-multi-hint" multiple>
    <p id="file-multi-hint" class="form-text">허용 형식: PDF, HWP, DOCX, JPG, PNG / 파일당 최대 10MB</p>

    <!-- 업로드 파일 목록 — aria-live로 목록 변경 알림 -->
    <ul class="file-list" aria-live="polite" aria-label="업로드된 파일 목록">
        <li class="file-item">
            <span class="file-name">제안서.pdf</span>
            <span class="file-size">(2.3MB)</span>
            <button type="button" class="btn btn-sm btn-danger" aria-label="제안서.pdf 파일 삭제">삭제</button>
        </li>
        <li class="file-item">
            <span class="file-name">참고자료.hwp</span>
            <span class="file-size">(1.1MB)</span>
            <button type="button" class="btn btn-sm btn-danger" aria-label="참고자료.hwp 파일 삭제">삭제</button>
        </li>
    </ul>
</div>
```

---

## 드래그 앤 드롭 영역

드래그 앤 드롭 업로드 영역을 제공할 때도 기본 `<input type="file">`을 함께 포함하여 키보드 접근성을 보장한다:

<div class="docs-preview">
<div class="border border-2 border-dashed rounded p-4 text-center" role="presentation" aria-describedby="preview-dropzone-hint">
  <p class="mb-1">파일을 여기에 끌어다 놓으세요.</p>
  <p class="mb-2">또는</p>
  <label for="preview-file-drop" class="btn btn-outline-secondary">파일 선택</label>
  <input type="file" id="preview-file-drop" name="attachments" class="d-none" accept=".pdf,.hwp,.docx,.jpg,.png" multiple>
  <p id="preview-dropzone-hint" class="form-text mt-2 mb-0">허용 형식: PDF, HWP, DOCX, JPG, PNG / 파일당 최대 10MB</p>
</div>
</div>

```html
<!-- 드래그 앤 드롭 — 기본 file input 병행으로 키보드 접근성 보장 -->
<div class="file-dropzone" role="presentation" aria-describedby="dropzone-hint">
    <p>파일을 여기에 끌어다 놓으세요.</p>
    <p>또는</p>
    <label for="file-drop" class="btn btn-outline">파일 선택</label>
    <input type="file" id="file-drop" name="attachments" class="sr-only" accept=".pdf,.hwp,.docx,.jpg,.png" multiple>
    <p id="dropzone-hint" class="form-text">허용 형식: PDF, HWP, DOCX, JPG, PNG / 파일당 최대 10MB</p>
</div>
```

---

## 접근성 체크리스트

- [ ] 파일 입력에 `<label>` 연결 (`for`/`id` 매칭)
- [ ] 허용 파일 형식을 `aria-describedby`로 안내
- [ ] 파일 용량 제한을 `aria-describedby`로 안내
- [ ] 필수 첨부에 `aria-required="true"` + 시각적 `*` + `sr-only "(필수)"` 적용
- [ ] 오류 상태에 `is-invalid` + `aria-invalid="true"` 쌍 처리
- [ ] 오류 메시지에 `role="alert"` 적용
- [ ] 업로드 파일 목록에 `aria-live="polite"` 적용
- [ ] 삭제 버튼에 `aria-label`로 파일명 포함 (예: "제안서.pdf 파일 삭제")
- [ ] 커스텀 버튼 사용 시 원본 `<input>`의 접근성 유지
- [ ] 드래그 앤 드롭 사용 시 기본 파일 입력도 함께 제공

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **File upload (파일 업로드)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<label>` 연결 | 필수 — `for`/`id` 매칭 | ✅ |
| `aria-describedby` | 필수 — 형식/용량 힌트 연결 | ✅ |
| `aria-required` + `required` | 필수 — 필수 첨부 표시 | ✅ |
| `aria-invalid` | 필수 — 오류 상태 전달 | ✅ |
| `role="alert"` 오류 | 필수 — 즉시 알림 | ✅ |
| `accept` 속성 | 권장 — 허용 형식 제한 | ✅ |
| `aria-live` 파일 목록 | 권장 — 목록 변경 알림 | ✅ |

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — File upload <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 파일 업로드 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.1 레이블 제공 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.2 오류 정정 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/tutorials/forms/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Form Concepts <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/HTML/Element/input/file" target="_blank" rel="noopener" title="새 창으로 열림">MDN — input type="file" <span class="sr-only">(새 창)</span></a>
- `docs/accessibility/forms.md` — 폼 접근성 원칙 전체 가이드
- `docs/components/forms.md` — 폼 컴포넌트 기본 패턴
