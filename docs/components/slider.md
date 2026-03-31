---
layout: layouts/base.njk
title: 슬라이더 (Swiper.js)
tags: components
section: components
permalink: /components/slider/
---

# 슬라이더 / Swiper (COMP-10)

**KWCAG 2.1 기준:** 2.2.2 일시정지, 중지, 숨기기 / 1.3.1 정보와 관계
**적용 수준:** AA
**작성일:** 2026-03-26

> Swiper.js 기반 슬라이더 접근성 패턴.
> 자동 재생 사용 시 정지 버튼이 반드시 제공되어야 한다 (KWCAG 2.2.2).
> CSS 클래스는 `scss/6-components/_slider.scss`와 일치시킨다.
> aria-live 패턴 원칙은 `docs/accessibility/dynamic-content.md` 참조.

**규칙: 자동 재생 슬라이더에는 반드시 정지 버튼을 제공해야 한다. 정지 버튼이 없으면 KWCAG 2.2.2 기준 위반으로 공공기관 웹 접근성 심사에서 부적합 판정을 받는다.**

---

## 기본 HTML 구조

슬라이더 컨테이너에 `aria-label`을 붙이는 이유는 스크린리더 사용자가 이 영역이 "공지사항 슬라이더"임을 즉시 파악하게 하기 위해서다. `.slider__status` 영역은 슬라이드가 바뀔 때마다 "1 / 5"처럼 현재 위치를 스크린리더에 공지하는 역할을 한다. 반드시 페이지 최초 로드 시 DOM에 존재해야 한다:

<div class="docs-preview">
<div id="preview-slider" aria-label="공지사항 슬라이더" style="border:1px solid #dee2e6; border-radius:0.375rem; overflow:hidden;">
  <div id="preview-slide-area" style="background:#f0f0f0; padding:3rem 1.25rem; text-align:center; color:#555;">
    <p id="preview-slide-num" style="margin:0 0 0.25rem; font-weight:700;">슬라이드 1 / 3</p>
    <p id="preview-slide-text" style="margin:0; font-size:0.875rem;">2026년 상반기 사업 공고 안내</p>
  </div>
  <div style="display:flex; align-items:center; justify-content:center; gap:0.75rem; padding:0.625rem; border-top:1px solid #dee2e6;">
    <button type="button" id="preview-prev" aria-label="이전 슬라이드" class="btn btn-sm btn-outline-secondary">&lsaquo; 이전</button>
    <button type="button" id="preview-pause" aria-label="자동 재생 정지" class="btn btn-sm btn-outline-secondary">&#9646;&#9646; 정지</button>
    <button type="button" id="preview-play" aria-label="자동 재생 시작" class="btn btn-sm btn-outline-secondary" style="display:none;">&#9654; 재생</button>
    <button type="button" id="preview-next" aria-label="다음 슬라이드" class="btn btn-sm btn-outline-secondary">다음 &rsaquo;</button>
  </div>
  <div aria-live="polite" aria-atomic="true" class="sr-only" id="preview-slider-status">슬라이드 1 / 3</div>
</div>
<script>
(function () {
  var slides = ['2026년 상반기 사업 공고 안내', '웹접근성 품질인증 심사 일정 안내', '디자인시스템 KRDS v1.0.0 적용 가이드'];
  var current = 0;
  var total = slides.length;
  var timer = null;
  var numEl = document.getElementById('preview-slide-num');
  var textEl = document.getElementById('preview-slide-text');
  var statusEl = document.getElementById('preview-slider-status');
  var pauseBtn = document.getElementById('preview-pause');
  var playBtn = document.getElementById('preview-play');
  function update() { numEl.textContent = '슬라이드 ' + (current + 1) + ' / ' + total; textEl.textContent = slides[current]; statusEl.textContent = '슬라이드 ' + (current + 1) + ' / ' + total; }
  function next() { current = (current + 1) % total; update(); }
  function prev() { current = (current - 1 + total) % total; update(); }
  function startAutoplay() { timer = setInterval(next, 3000); pauseBtn.style.display = ''; playBtn.style.display = 'none'; }
  function stopAutoplay() { clearInterval(timer); timer = null; pauseBtn.style.display = 'none'; playBtn.style.display = ''; playBtn.focus(); }
  document.getElementById('preview-next').addEventListener('click', next);
  document.getElementById('preview-prev').addEventListener('click', prev);
  pauseBtn.addEventListener('click', stopAutoplay);
  playBtn.addEventListener('click', function () { startAutoplay(); pauseBtn.focus(); });
  startAutoplay();
})();
</script>
</div>

```html
<!-- 슬라이더 컨테이너 -->
<div class="swiper slider" aria-label="공지사항 슬라이더">

  <!-- Swiper 슬라이드 래퍼 -->
  <div class="swiper-wrapper">

    <div class="swiper-slide">
      <a href="/notice/1">
        <figure>
          <img src="slide1.jpg" alt="2026 공지사항 제목 1">
        </figure>
        <p>슬라이드 내용 1</p>
      </a>
    </div>

    <div class="swiper-slide">
      <a href="/notice/2">
        <figure>
          <img src="slide2.jpg" alt="2026 공지사항 제목 2">
        </figure>
        <p>슬라이드 내용 2</p>
      </a>
    </div>

    <div class="swiper-slide">
      <a href="/notice/3">
        <figure>
          <img src="slide3.jpg" alt="2026 공지사항 제목 3">
        </figure>
        <p>슬라이드 내용 3</p>
      </a>
    </div>

  </div>

  <!-- aria-live 상태 공지 영역 (초기 비어 있음 — JS로 "1 / 5" 텍스트 갱신) -->
  <!-- 반드시 페이지 최초 로드 시 DOM에 존재해야 함 (동적 삽입 금지) -->
  <span
    class="slider__status sr-only"
    aria-live="polite"
    aria-atomic="true"
  ></span>

  <!-- 컨트롤 영역: 정지/재생 버튼 + 페이지네이션 -->
  <div class="slider__controls">

    <!-- 정지 버튼 (자동 재생 중 기본 표시) -->
    <button type="button" class="slider__pause" aria-label="자동 재생 정지">
      <!-- 아이콘 예시 -->
      <svg width="16" height="16" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="4" height="10" fill="currentColor"/>
        <rect x="9" y="3" width="4" height="10" fill="currentColor"/>
      </svg>
    </button>

    <!-- 재생 버튼 (정지 상태 시 표시, 초기에는 숨김) -->
    <button type="button" class="slider__play" aria-label="자동 재생 시작" hidden>
      <!-- 아이콘 예시 -->
      <svg width="16" height="16" aria-hidden="true" focusable="false">
        <polygon points="5,3 13,8 5,13" fill="currentColor"/>
      </svg>
    </button>

    <!-- Swiper 페이지네이션 -->
    <div
      class="swiper-pagination"
      role="tablist"
      aria-label="슬라이드 탐색"
    ></div>

  </div>

</div>
```

❌ 나쁜 예: 자동 재생만 있고 정지 버튼 없음

```html
<div class="swiper">
  <div class="swiper-wrapper">...</div>
  <!-- 정지 버튼 없음 -->
</div>
```

시각장애인, 인지장애인, 주의력 장애인 등 움직이는 콘텐츠가 방해되는 사용자가 슬라이더를 멈출 방법이 없다. KWCAG 2.2.2 부적합 판정을 받는다.

✅ 좋은 예: 가시적 위치에 정지/재생 버튼 제공

```html
<div class="slider__controls">
  <button type="button" class="slider__pause" aria-label="자동 재생 정지">...</button>
  <button type="button" class="slider__play" aria-label="자동 재생 시작" hidden>...</button>
</div>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|-----|------|
| `aria-label` | `"공지사항 슬라이더"` 등 | 슬라이더 목적 설명 (컨테이너에 적용) |
| `aria-live="polite"` | `polite` | 현재 슬라이드 변경 상태를 스크린리더에 공지 |
| `aria-atomic="true"` | `true` | 슬라이드 번호 전체를 한 번에 읽음 |
| `hidden` | — | 비활성 버튼(재생/정지) 숨김 처리 — JS로 토글 |

- `aria-live="polite"` — 슬라이드가 바뀔 때마다 "2 / 5"처럼 스크린리더가 자동으로 읽어준다. `assertive` 대신 `polite`를 사용하는 이유는 사용자가 다른 콘텐츠를 읽고 있을 때 강제로 끊지 않기 위해서다.
- `aria-atomic="true"` — "2" 또는 "/ 5"처럼 일부만 읽히지 않고 "2 / 5" 전체를 하나의 단위로 읽습니다.

> **주의:** `aria-live` 상태 영역(`.slider__status`)은 페이지 최초 로드 시 DOM에 이미 존재해야 한다.
> JavaScript로 나중에 삽입한 요소에 `aria-live`를 추가하면 스크린리더가 인식하지 못할 수 있다.
> (`docs/accessibility/dynamic-content.md` 섹션 1 참조)

---

## 자동 재생 정지/재생 버튼 + aria-live 상태 공지 JS 예시

정지 버튼 클릭 후 재생 버튼으로 포커스를 이동하는 것이 핵심이다. 버튼이 `hidden` 처리되면 포커스가 사라지므로, 반드시 다음에 표시될 버튼으로 포커스를 이동해야 키보드 사용자가 방향을 잃지 않는다:

```javascript
// Swiper 자동 재생 + 정지/재생 버튼 + aria-live 상태 공지
$(function () {
  var $slider = $('.slider');
  var $statusEl = $slider.find('.slider__status');
  var $pauseBtn = $slider.find('.slider__pause');
  var $playBtn = $slider.find('.slider__play');

  var swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
      paginationBulletMessage: '{{index}}번 슬라이드로 이동',
    },
    keyboard: { enabled: true },
    on: {
      slideChange: function (swiper) {
        // aria-live 상태 갱신 — 스크린리더에 현재 슬라이드 번호 공지
        var current = swiper.realIndex + 1;
        var total = swiper.slides.length;
        if ($statusEl.length) {
          $statusEl.text(current + ' / ' + total);
        }
      }
    }
  });

  // 정지 버튼: 자동 재생 정지 후 재생 버튼으로 포커스 이동
  $pauseBtn.on('click', function () {
    swiper.autoplay.stop();
    $pauseBtn.prop('hidden', true);
    $playBtn.prop('hidden', false);
    $playBtn.focus();
  });

  // 재생 버튼: 자동 재생 시작 후 정지 버튼으로 포커스 이동
  $playBtn.on('click', function () {
    swiper.autoplay.start();
    $playBtn.prop('hidden', true);
    $pauseBtn.prop('hidden', false);
    $pauseBtn.focus();
  });
});
```

> **구현 팁:** 정지 버튼은 항상 가시적 위치에 배치해야 한다 (KWCAG 2.2.2). `display: none`이나 `visibility: hidden`으로 숨기지 않는다.
> 정지/재생 버튼 간 전환 시 `hidden` 속성과 `focus()` 호출을 함께 처리하여 키보드 사용자의 포커스 연속성을 보장한다.

---

## Swiper.js 접근성 옵션

| 옵션 | 값 예시 | 설명 |
|------|---------|------|
| `a11y.prevSlideMessage` | `'이전 슬라이드'` | 이전 버튼에 제공되는 aria-label 텍스트 |
| `a11y.nextSlideMessage` | `'다음 슬라이드'` | 다음 버튼에 제공되는 aria-label 텍스트 |
| `a11y.paginationBulletMessage` | `'{{index}}번 슬라이드로 이동'` | 페이지네이션 점 aria-label (`{{index}}`로 번호 삽입) |
| `keyboard.enabled` | `true` | 키보드 방향키 탐색 허용 (KWCAG 2.1.1) |

> **loop: true 사용 시 주의:** `loop: true`를 사용하면 Swiper가 슬라이드를 복제(clone)한다.
> 복제된 슬라이드(`swiper-slide-duplicate`)에 접근성 관련 id, aria 속성이 중복될 수 있으므로,
> 복제 슬라이드는 `aria-hidden="true"` 처리가 필요하다 (Swiper a11y 모듈이 자동 처리).

---

## 접근성 체크리스트

- [ ] 슬라이더 컨테이너에 `aria-label`로 목적 설명이 제공되는가 (예: `"공지사항 슬라이더"`)
- [ ] 자동 재생 사용 시 정지 버튼이 가시적 위치에 존재하는가 (KWCAG 2.2.2) — 없으면 공공기관 웹 접근성 심사 부적합
- [ ] `aria-live="polite"` 상태 영역(`.slider__status`)이 페이지 초기 로드 시 DOM에 존재하는가
- [ ] Swiper `a11y` 옵션이 활성화되어 이전/다음 버튼에 한국어 `aria-label`이 제공되는가
- [ ] `keyboard.enabled: true`로 키보드 탐색이 지원되는가 (KWCAG 2.1.1)
- [ ] 정지/재생 버튼 전환 시 `focus()` 호출로 포커스 연속성이 유지되는가
- [ ] `slideChange` 이벤트에서 `statusEl.textContent`가 "현재 / 전체" 형식으로 갱신되는가

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_slider.scss` | Swiper 슬라이더 CSS 토큰 오버라이드 + 정지/재생 버튼 스타일 |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--color-primary`, `--color-border` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Carousel (캐러셀)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| 정지 버튼 | 필수 (KWCAG 2.2.2) — 자동 재생 시 | ✅ |
| `aria-live="polite"` | 필수 — 슬라이드 변경 알림 | ✅ `.slider__status` |
| 이전/다음 `aria-label` | 필수 — 한국어 제공 | ✅ Swiper a11y 옵션 |
| 키보드 방향키 | 필수 (KWCAG 2.1.1) | ✅ `keyboard.enabled` |

---

> 관련 문서: [동적 콘텐츠 접근성 패턴](../accessibility/dynamic-content.md) — aria-live 원칙 상세 설명
