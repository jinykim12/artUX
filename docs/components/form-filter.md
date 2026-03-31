---
layout: layouts/base.njk
title: 필터/정렬
tags: components
section: components
permalink: /components/form-filter/
---

# 필터/정렬 (COMP-03-FILTER)

**KWCAG 2.1 기준:** 3.4.1 레이블 제공, 3.2.2 예측 가능성, 4.1.2 이름·역할·값
**적용 수준:** AA
**작성일:** 2026-03-31

> 필터/정렬은 목록 콘텐츠를 좁히거나 재배치하는 UI이다.
> 필터 적용 후 결과 건수를 `aria-live="polite"`로 알려 스크린리더 사용자가 결과 변화를 인지할 수 있게 한다.
> 체크박스/라디오 필터 그룹은 `<fieldset>` + `<legend>`로 묶는다.
> 폼 접근성 원칙은 `docs/accessibility/forms.md`를 참고한다.

**규칙: 필터 적용 시 결과 건수를 `aria-live="polite"`로 알린다. 필터 초기화 버튼을 반드시 제공한다.**

---

## 기본 필터 패널

체크박스 필터, 라디오 필터, 정렬 셀렉트를 포함하는 기본 필터 패널이다:

<div class="docs-preview">
<form id="preview-filter-form" aria-label="검색 결과 필터" onsubmit="return false;">
  <div id="preview-filter-results" class="filter-results" aria-live="polite" aria-atomic="true">
    <p>총 <strong>128</strong>건의 결과가 있습니다.</p>
  </div>
  <div class="mb-3">
    <label for="preview-sort" class="form-label">정렬</label>
    <select id="preview-sort" name="sort" class="form-select">
      <option value="latest">최신순</option>
      <option value="popular">인기순</option>
      <option value="name-asc">이름순 (가나다)</option>
      <option value="price-low">가격 낮은순</option>
      <option value="price-high">가격 높은순</option>
    </select>
  </div>
  <fieldset class="mb-3">
    <legend class="form-label">카테고리</legend>
    <div class="form-check">
      <input type="checkbox" id="preview-cat-design" name="category" value="design" class="form-check-input">
      <label for="preview-cat-design" class="form-check-label">디자인 <span class="filter-count">(42)</span></label>
    </div>
    <div class="form-check">
      <input type="checkbox" id="preview-cat-dev" name="category" value="dev" class="form-check-input">
      <label for="preview-cat-dev" class="form-check-label">개발 <span class="filter-count">(56)</span></label>
    </div>
    <div class="form-check">
      <input type="checkbox" id="preview-cat-marketing" name="category" value="marketing" class="form-check-input">
      <label for="preview-cat-marketing" class="form-check-label">마케팅 <span class="filter-count">(30)</span></label>
    </div>
  </fieldset>
  <fieldset class="mb-3">
    <legend class="form-label">상태</legend>
    <div class="form-check">
      <input type="radio" id="preview-status-all" name="status" value="all" class="form-check-input" checked>
      <label for="preview-status-all" class="form-check-label">전체</label>
    </div>
    <div class="form-check">
      <input type="radio" id="preview-status-active" name="status" value="active" class="form-check-input">
      <label for="preview-status-active" class="form-check-label">진행중</label>
    </div>
    <div class="form-check">
      <input type="radio" id="preview-status-complete" name="status" value="complete" class="form-check-input">
      <label for="preview-status-complete" class="form-check-label">완료</label>
    </div>
  </fieldset>
  <div class="filter-actions">
    <button type="submit" class="btn btn-primary">필터 적용</button>
    <button type="reset" class="btn btn-secondary">초기화</button>
  </div>
</form>
</div>

```html
<!-- 필터/정렬 패널 — fieldset/legend로 그룹화, aria-live로 결과 알림 -->
<form id="filter-form" aria-label="검색 결과 필터">
    <!-- 결과 건수 알림 — aria-live="polite"로 필터 적용 시 갱신 알림 -->
    <div id="filter-results" class="filter-results" aria-live="polite" aria-atomic="true">
        <p>총 <strong>128</strong>건의 결과가 있습니다.</p>
    </div>

    <!-- 정렬 -->
    <div class="mb-3">
        <label for="sort-order" class="form-label">정렬</label>
        <select id="sort-order" name="sort" class="form-select">
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
            <option value="name-asc">이름순 (가나다)</option>
            <option value="price-low">가격 낮은순</option>
            <option value="price-high">가격 높은순</option>
        </select>
    </div>

    <!-- 카테고리 필터 (체크박스 그룹) -->
    <fieldset class="mb-3">
        <legend class="form-label">카테고리</legend>
        <div class="form-check">
            <input type="checkbox" id="cat-design" name="category" value="design" class="form-check-input">
            <label for="cat-design" class="form-check-label">디자인 <span class="filter-count">(42)</span></label>
        </div>
        <div class="form-check">
            <input type="checkbox" id="cat-dev" name="category" value="dev" class="form-check-input">
            <label for="cat-dev" class="form-check-label">개발 <span class="filter-count">(56)</span></label>
        </div>
        <div class="form-check">
            <input type="checkbox" id="cat-marketing" name="category" value="marketing" class="form-check-input">
            <label for="cat-marketing" class="form-check-label">마케팅 <span class="filter-count">(30)</span></label>
        </div>
    </fieldset>

    <!-- 상태 필터 (라디오 그룹) -->
    <fieldset class="mb-3">
        <legend class="form-label">상태</legend>
        <div class="form-check">
            <input type="radio" id="status-all" name="status" value="all" class="form-check-input" checked>
            <label for="status-all" class="form-check-label">전체</label>
        </div>
        <div class="form-check">
            <input type="radio" id="status-active" name="status" value="active" class="form-check-input">
            <label for="status-active" class="form-check-label">진행중</label>
        </div>
        <div class="form-check">
            <input type="radio" id="status-complete" name="status" value="complete" class="form-check-input">
            <label for="status-complete" class="form-check-label">완료</label>
        </div>
    </fieldset>

    <!-- 필터 액션 -->
    <div class="filter-actions">
        <button type="submit" class="btn btn-primary">필터 적용</button>
        <button type="reset" class="btn btn-secondary">초기화</button>
    </div>
</form>
```

---

## 실시간 필터 (자동 적용)

체크박스 변경 시 자동으로 필터를 적용하는 패턴이다. `aria-live` 영역에 결과 건수를 실시간으로 알린다:

```html
<!-- 실시간 필터 — 체크박스 변경 시 자동 필터 적용, aria-live로 결과 알림 -->
<form id="live-filter-form" aria-label="실시간 필터">
    <div id="live-filter-results" class="filter-results" aria-live="polite" aria-atomic="true">
        <p>총 <strong>128</strong>건의 결과가 있습니다.</p>
    </div>

    <fieldset class="mb-3">
        <legend class="form-label">유형</legend>
        <div class="form-check">
            <input type="checkbox" id="type-article" name="type" value="article" class="form-check-input" data-auto-filter>
            <label for="type-article" class="form-check-label">아티클</label>
        </div>
        <div class="form-check">
            <input type="checkbox" id="type-video" name="type" value="video" class="form-check-input" data-auto-filter>
            <label for="type-video" class="form-check-label">동영상</label>
        </div>
        <div class="form-check">
            <input type="checkbox" id="type-download" name="type" value="download" class="form-check-input" data-auto-filter>
            <label for="type-download" class="form-check-label">다운로드</label>
        </div>
    </fieldset>

    <button type="reset" class="btn btn-secondary btn-sm">필터 초기화</button>
</form>
```

---

## 적용된 필터 태그

현재 적용 중인 필터를 태그로 표시하고, 개별 해제 및 전체 초기화를 제공한다:

```html
<!-- 적용된 필터 태그 — 개별 해제 버튼에 aria-label 포함, aria-live로 변경 알림 -->
<div class="filter-tags" aria-live="polite" aria-label="적용된 필터">
    <span class="filter-tag">
        디자인
        <button type="button" class="btn-tag-remove" aria-label="디자인 필터 해제">
            <svg aria-hidden="true" class="icon"><use href="#icon-close"></use></svg>
        </button>
    </span>
    <span class="filter-tag">
        진행중
        <button type="button" class="btn-tag-remove" aria-label="진행중 필터 해제">
            <svg aria-hidden="true" class="icon"><use href="#icon-close"></use></svg>
        </button>
    </span>
    <button type="button" class="btn btn-text btn-sm">전체 초기화</button>
</div>
```

---

## 필터 JS 스니펫

필터 적용/초기화 시 결과 건수를 `aria-live` 영역에 업데이트한다:

```javascript
// 필터 적용/초기화 — aria-live 영역에 결과 건수 업데이트
$(function () {
    var $form = $('#filter-form');
    var $resultsEl = $('#filter-results');
    if (!$form.length || !$resultsEl.length) return;

    // 필터 적용
    $form.on('submit', function (event) {
        event.preventDefault();
        // 필터 로직 수행 후 결과 건수 업데이트
        var count = 42; // 서버 응답 또는 클라이언트 필터 결과
        $resultsEl.html('<p>총 <strong>' + count + '</strong>건의 결과가 있습니다.</p>');
    });

    // 초기화
    $form.on('reset', function () {
        // 폼 리셋 후 결과 건수 원복
        setTimeout(function () {
            $resultsEl.html('<p>총 <strong>128</strong>건의 결과가 있습니다.</p>');
        }, 0);
    });

    // 실시간 필터 — 체크박스 변경 시 자동 필터 적용
    var $liveForm = $('#live-filter-form');
    var $liveResultsEl = $('#live-filter-results');
    if (!$liveForm.length || !$liveResultsEl.length) return;

    $liveForm.on('change', '[data-auto-filter]', function () {
        // 필터 로직 수행 후 결과 건수 업데이트
        var checked = $liveForm.find('[data-auto-filter]:checked').length;
        var count = checked > 0 ? 35 : 128; // 예시 값
        $liveResultsEl.html('<p>총 <strong>' + count + '</strong>건의 결과가 있습니다.</p>');
    });
});
```

---

## 모바일 필터 (접기/펼치기)

모바일에서 필터를 접기/펼치기 형태로 제공한다. `aria-expanded`로 상태를 전달한다:

```html
<!-- 모바일 필터 — aria-expanded로 접기/펼치기 상태 전달 -->
<div class="filter-mobile">
    <button type="button" class="btn btn-outline" aria-expanded="false" aria-controls="filter-panel">
        필터
        <span class="filter-badge" aria-label="적용된 필터 2개">2</span>
    </button>
    <div id="filter-panel" class="filter-panel" style="display: none;">
        <!-- 필터 내용은 위 기본 필터 패널과 동일 -->
    </div>
</div>
```

---

## 접근성 체크리스트

- [ ] 체크박스/라디오 필터 그룹에 `<fieldset>` + `<legend>` 사용
- [ ] 모든 입력 요소에 `<label>` 연결 (`for`/`id` 매칭)
- [ ] 정렬 셀렉트에 `<label>` 연결
- [ ] 필터 적용 시 결과 건수를 `aria-live="polite"` 영역으로 알림
- [ ] 필터 초기화 버튼 제공
- [ ] 적용된 필터 태그의 해제 버튼에 `aria-label` 포함
- [ ] 모바일 접기/펼치기에 `aria-expanded` + `aria-controls` 적용
- [ ] 필터 폼에 `aria-label`로 목적 설명
- [ ] 실시간 필터 사용 시 결과 갱신을 `aria-live`로 알림

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **필터링/정렬** 패턴에 대응한다. Checkbox, Radio, Select 컴포넌트를 조합하여 구현한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<label>` 연결 | 필수 — `for`/`id` 매칭 | ✅ |
| `fieldset` / `legend` | 필수 — 필터 그룹화 | ✅ |
| `aria-live` 결과 알림 | 필수 — 결과 건수 갱신 알림 | ✅ |
| 필터 초기화 | 필수 — 초기 상태 복원 | ✅ |
| `aria-expanded` | 권장 — 모바일 접기/펼치기 | ✅ |
| `aria-label` 폼 | 권장 — 폼 목적 설명 | ✅ |

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Checkbox / Radio / Select <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.1 레이블 제공 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.2.2 예측 가능성 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/tutorials/forms/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Form Concepts <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-live" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-live <span class="sr-only">(새 창)</span></a>
- `docs/accessibility/forms.md` — 폼 접근성 원칙 전체 가이드
- `docs/components/forms.md` — 폼 컴포넌트 기본 패턴
