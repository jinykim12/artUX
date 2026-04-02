---
layout: layouts/base.njk
title: 검색 폼
tags: components
section: components
permalink: /components/form-search/
---

# 검색 폼 (COMP-03-SEARCH)

**KWCAG 2.1 기준:** 3.4.1 레이블 제공, 3.4.2 오류 정정
**적용 수준:** AA
**작성일:** 2026-03-31

> 검색 폼은 `role="search"` 랜드마크를 사용하여 스크린리더가 페이지 내 검색 영역을 빠르게 탐색할 수 있게 한다.
> 폼 접근성 원칙은 `docs/accessibility/forms.md`를 참고한다.

**규칙: 검색 폼에는 `role="search"`와 `aria-label`을 반드시 제공한다. `<label>`이 시각적으로 숨겨지더라도 스크린리더 접근은 보장해야 한다.**

---

## 기본 검색 폼

가장 단순한 형태의 검색 폼이다. `role="search"`는 `<form>`에 적용하여 랜드마크 역할을 부여하고, `aria-label`로 검색 영역의 목적을 설명한다:

<div class="docs-preview">
<form role="search" aria-label="사이트 검색" onsubmit="return false;" class="d-flex gap-2">
  <label for="preview-search" class="sr-only">검색어</label>
  <input type="search" id="preview-search" name="q" class="form-control" placeholder="검색어를 입력하세요" autocomplete="search">
  <button type="submit" class="btn btn-primary text-nowrap">검색</button>
</form>
</div>

```html
<!-- 기본 검색 폼 — role="search" 랜드마크, aria-label로 목적 설명 -->
<form role="search" aria-label="사이트 검색" action="/search" method="get">
    <label for="search-input" class="sr-only">검색어</label>
    <input type="search" id="search-input" name="q" class="form-control" placeholder="검색어를 입력하세요" autocomplete="search">
    <button type="submit" class="btn btn-primary">검색</button>
</form>
```

> **참고:** `<label>`에 `sr-only` 클래스를 적용하면 시각적으로는 숨기면서 스크린리더에는 "검색어"라는 레이블이 전달된다. `placeholder`만으로는 레이블을 대체할 수 없다.

---

## 인라인 검색 폼 (헤더용)

헤더 영역에 배치하는 인라인 검색 폼이다. 검색 아이콘 버튼을 사용할 때 `aria-label`로 버튼 목적을 명시한다:

<div class="docs-preview">
<form role="search" aria-label="사이트 검색" onsubmit="return false;" class="d-flex gap-2">
  <label for="preview-header-search" class="sr-only">검색어</label>
  <input type="search" id="preview-header-search" name="q" class="form-control form-control-sm" placeholder="검색" autocomplete="search">
  <button type="submit" class="btn btn-sm btn-outline-secondary" aria-label="검색 실행">검색</button>
</form>
</div>

```html
<!-- 헤더 인라인 검색 — 아이콘 버튼에 aria-label 필수 -->
<form role="search" aria-label="사이트 검색" class="search-inline" action="/search" method="get">
    <label for="header-search" class="sr-only">검색어</label>
    <input type="search" id="header-search" name="q" class="form-control" placeholder="검색" autocomplete="search">
    <button type="submit" class="btn btn-icon" aria-label="검색 실행">
        <svg aria-hidden="true" class="icon"><use href="#icon-search"></use></svg>
    </button>
</form>
```

---

## 확장 검색 (필터 포함)

검색어 입력과 함께 카테고리, 날짜 범위 등의 필터를 제공하는 확장 검색 폼이다. `<fieldset>` + `<legend>`로 필터 그룹을 묶는다:

<div class="docs-preview">
<form role="search" aria-label="상세 검색" onsubmit="return false;">
  <div class="mb-3">
    <label for="preview-adv-search" class="form-label">검색어</label>
    <input type="search" id="preview-adv-search" name="q" class="form-control" autocomplete="search">
  </div>
  <fieldset class="mb-3">
    <legend class="form-label">검색 범위</legend>
    <div class="form-check form-check-inline">
      <input type="radio" id="preview-scope-all" name="preview-scope" value="all" class="form-check-input" checked>
      <label for="preview-scope-all" class="form-check-label">전체</label>
    </div>
    <div class="form-check form-check-inline">
      <input type="radio" id="preview-scope-title" name="preview-scope" value="title" class="form-check-input">
      <label for="preview-scope-title" class="form-check-label">제목</label>
    </div>
    <div class="form-check form-check-inline">
      <input type="radio" id="preview-scope-content" name="preview-scope" value="content" class="form-check-input">
      <label for="preview-scope-content" class="form-check-label">내용</label>
    </div>
  </fieldset>
  <fieldset class="mb-3">
    <legend class="form-label">기간</legend>
    <div class="d-flex gap-2">
      <div>
        <label for="preview-date-from" class="form-label">시작일</label>
        <input type="date" id="preview-date-from" name="date_from" class="form-control">
      </div>
      <div>
        <label for="preview-date-to" class="form-label">종료일</label>
        <input type="date" id="preview-date-to" name="date_to" class="form-control">
      </div>
    </div>
  </fieldset>
  <div class="mb-3">
    <label for="preview-adv-category" class="form-label">카테고리</label>
    <select id="preview-adv-category" name="category" class="form-select">
      <option value="">전체</option>
      <option value="notice">공지사항</option>
      <option value="news">뉴스</option>
      <option value="faq">FAQ</option>
    </select>
  </div>
  <button type="submit" class="btn btn-primary">검색</button>
  <button type="reset" class="btn btn-secondary">초기화</button>
</form>
</div>

```html
<!-- 확장 검색 폼 — 필터 포함, fieldset/legend로 그룹화 -->
<form role="search" aria-label="상세 검색" action="/search" method="get">
    <div class="mb-3">
        <label for="adv-search-input" class="form-label">검색어</label>
        <input type="search" id="adv-search-input" name="q" class="form-control" autocomplete="search">
    </div>

    <fieldset class="mb-3">
        <legend class="form-label">검색 범위</legend>
        <div class="form-check form-check-inline">
            <input type="radio" id="scope-all" name="scope" value="all" class="form-check-input" checked>
            <label for="scope-all" class="form-check-label">전체</label>
        </div>
        <div class="form-check form-check-inline">
            <input type="radio" id="scope-title" name="scope" value="title" class="form-check-input">
            <label for="scope-title" class="form-check-label">제목</label>
        </div>
        <div class="form-check form-check-inline">
            <input type="radio" id="scope-content" name="scope" value="content" class="form-check-input">
            <label for="scope-content" class="form-check-label">내용</label>
        </div>
    </fieldset>

    <fieldset class="mb-3">
        <legend class="form-label">기간</legend>
        <div class="form-row">
            <div class="form-group">
                <label for="date-from" class="form-label">시작일</label>
                <input type="date" id="date-from" name="date_from" class="form-control">
            </div>
            <div class="form-group">
                <label for="date-to" class="form-label">종료일</label>
                <input type="date" id="date-to" name="date_to" class="form-control">
            </div>
        </div>
    </fieldset>

    <div class="mb-3">
        <label for="adv-category" class="form-label">카테고리</label>
        <select id="adv-category" name="category" class="form-select">
            <option value="">전체</option>
            <option value="notice">공지사항</option>
            <option value="news">뉴스</option>
            <option value="faq">FAQ</option>
        </select>
    </div>

    <button type="submit" class="btn btn-primary">검색</button>
    <button type="reset" class="btn btn-secondary">초기화</button>
</form>
```

---

## 검색 결과 안내

검색 결과 영역에 `aria-live="polite"`를 적용하면 결과가 갱신될 때 스크린리더가 변경 내용을 읽어준다:

<div class="docs-preview">
<div aria-live="polite" aria-atomic="true">
  <p>"접근성" 검색 결과 <strong>42</strong>건이 있습니다.</p>
</div>
</div>

```html
<!-- 검색 결과 안내 — aria-live="polite"로 결과 갱신 알림 -->
<div id="search-results" aria-live="polite" aria-atomic="true">
    <p>"접근성" 검색 결과 <strong>42</strong>건이 있습니다.</p>
</div>
```

---

## 접근성 체크리스트

- [ ] `<form>`에 `role="search"` 적용
- [ ] `aria-label`로 검색 폼의 목적을 설명
- [ ] 검색 입력 필드에 `<label>` 연결 (`for`/`id` 매칭)
- [ ] `<label>`이 시각적으로 숨겨진 경우 `sr-only` 클래스 사용
- [ ] `autocomplete="search"` 적용
- [ ] 아이콘 전용 버튼에 `aria-label` 제공
- [ ] 필터 그룹에 `<fieldset>` + `<legend>` 사용
- [ ] 검색 결과 영역에 `aria-live="polite"` 적용
- [ ] `placeholder`만으로 레이블을 대체하지 않음

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Text input (텍스트 입력 필드)** + **Button (버튼)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `role="search"` | 필수 — 검색 랜드마크 | ✅ |
| `<label>` 연결 | 필수 — `for`/`id` 매칭 | ✅ |
| `aria-label` | 필수 — 폼 목적 설명 | ✅ |
| `autocomplete` | 권장 — 검색어 자동완성 | ✅ |
| `aria-live` 결과 | 권장 — 결과 갱신 알림 | ✅ |

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Text input / Button <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 입력 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.1 레이블 제공 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/tutorials/forms/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Search Form <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Roles/search_role" target="_blank" rel="noopener" title="새 창으로 열림">MDN — role="search" <span class="sr-only">(새 창)</span></a>
- `docs/accessibility/forms.md` — 폼 접근성 원칙 전체 가이드
- `docs/components/forms.md` — 폼 컴포넌트 기본 패턴
