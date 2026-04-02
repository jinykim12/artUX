---
layout: layouts/base.njk
title: 툴팁
tags: components
section: components
permalink: /components/tooltip/
---

# 툴팁 (COMP-14)

**KWCAG 2.1 기준:** 1.4.13 호버 또는 포커스 콘텐츠, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-31

> 툴팁 컴포넌트는 요소에 마우스 호버 또는 키보드 포커스 시 추가 설명을 표시한다.
> KWCAG 2.1 AA 접근성 기준(role="tooltip", aria-describedby, 키보드 접근)을 준수한다.
> CSS 클래스명은 `scss/6-components/_tooltip.scss`와 일치시킨다.

**규칙: 툴팁은 마우스 호버뿐 아니라 키보드 포커스에서도 반드시 표시되어야 한다. ESC 키로 툴팁을 닫을 수 있어야 한다 (KWCAG 1.4.13).**

---

## 기본 구조

툴팁은 다음 순서로 구성된다:

```
<button data-bs-toggle="tooltip" title="설명 텍스트"> — 트리거 요소
  └── Bootstrap이 자동 생성하는 tooltip 팝오버 (role="tooltip")
```

---

## 기본 HTML 마크업

트리거 요소에 `aria-describedby`를 설정하여 툴팁 텍스트를 보조 기기에 연결한다. 툴팁 요소에 `role="tooltip"`을 적용한다:

<div class="docs-preview">
<button type="button" class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="변경사항을 저장합니다 (Ctrl+S)">저장</button>
<button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="삭제된 항목은 복구할 수 없습니다">삭제</button>
</div>

```html
<!-- 버튼에 연결된 툴팁 -->
<button type="button" class="btn btn-primary" data-bs-toggle="tooltip" title="변경사항을 저장합니다 (Ctrl+S)">저장</button>

<!-- 아이콘 버튼에 연결된 툴팁 -->
<button type="button" class="btn btn-outline-secondary btn--icon" data-bs-toggle="tooltip" aria-label="도움말" title="이 기능에 대한 자세한 안내를 확인합니다.">
    <svg aria-hidden="true" focusable="false" width="16" height="16"><!-- 아이콘 --></svg>
</button>

<!-- 텍스트 링크에 연결된 툴팁 -->
<a href="/terms" data-bs-toggle="tooltip" title="서비스 이용약관 전문을 확인합니다.">이용약관</a>

<!-- 방향 지정 -->
<button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="위쪽 툴팁">위</button>
<button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="아래쪽 툴팁">아래</button>
<button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left" title="왼쪽 툴팁">좌</button>
<button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" title="오른쪽 툴팁">우</button>

<!-- Bootstrap 툴팁 초기화 -->
<script>
var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltipTriggerList.forEach(function(el) { new bootstrap.Tooltip(el); });
</script>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `role="tooltip"` | — | 이 요소가 툴팁임을 보조 기기에 전달 |
| `aria-describedby` | 툴팁 요소의 `id` | 트리거 요소의 추가 설명으로 툴팁 텍스트를 연결 |
| `hidden` | — | 툴팁이 숨겨진 상태에서 보조 기기와 시각적으로 모두 숨김 |

- `aria-describedby` — 이 속성이 없으면 스크린리더 사용자가 트리거 요소에 포커스해도 툴팁 내용을 들을 수 없다.
- `role="tooltip"` — 보조 기기가 이 요소를 툴팁으로 인식하여 적절한 안내를 제공한다.

---

## 접근성 체크리스트

툴팁 마크업 검수 시 아래 항목을 확인한다.

- [ ] `role="tooltip"` 적용 (툴팁 요소에)
- [ ] `aria-describedby`로 트리거와 툴팁 연결
- [ ] 마우스 호버 시 툴팁 표시
- [ ] 키보드 포커스 시 툴팁 표시 (KWCAG 1.4.13)
- [ ] ESC 키로 툴팁 닫기 지원 (KWCAG 1.4.13)
- [ ] 마우스를 툴팁 위로 이동해도 툴팁이 사라지지 않음 (KWCAG 1.4.13 지속성)
- [ ] 툴팁이 다른 콘텐츠를 가리지 않도록 위치 조정
- [ ] 숨겨진 상태에서 `hidden` 속성 적용
- [ ] 포커스 인디케이터 동작 확인 (전역 `:focus-visible` — `_focus.scss`)

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_tooltip.scss` | 툴팁 컴포넌트 스타일, 위치 계산, 화살표 |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용) |
| `scss/3-generic/_root.scss` | Bootstrap 변수 및 기본값 |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Tooltip (툴팁)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `role="tooltip"` | 필수 | ✅ |
| `aria-describedby` | 필수 — 트리거 연결 | ✅ |
| 키보드 포커스 표시 | 필수 — focus + hover | ✅ |
| ESC 닫기 | 필수 — KWCAG 1.4.13 | ✅ |
| 호버 지속성 | 필수 — 툴팁 위 마우스 유지 | ✅ |
| 위치 자동 조정 | 권장 — 뷰포트 내 표시 | ✅ CSS 처리 |

> **참고:** KRDS에서는 툴팁 방향을 상/하/좌/우 4방향으로 제공할 것을 권장한다. artpqUX에서는 `.tooltip--top`, `.tooltip--bottom`, `.tooltip--left`, `.tooltip--right` 클래스로 방향을 지정한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Tooltip <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 툴팁 명세
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/" target="_blank" rel="noopener" title="새 창으로 열림">W3C APG — Tooltip Pattern <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 1.4.13 호버 또는 포커스 콘텐츠 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.2 이름, 역할, 값 <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Roles/tooltip_role" target="_blank" rel="noopener" title="새 창으로 열림">MDN — role="tooltip" <span class="sr-only">(새 창)</span></a>
