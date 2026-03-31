---
layout: layouts/base.njk
title: 동적 콘텐츠 접근성
tags: accessibility
section: accessibility
permalink: /accessibility/dynamic-content/
---

# 동적 콘텐츠 접근성 패턴

> **안내:** 이 문서는 패턴 가이드이다. SCSS 코드 구현은 Phase 9(오버레이 컴포넌트)에서 진행된다.

KWCAG 2.1 관련 조항: **4.2.1 웹 애플리케이션 접근성 준수**

자바스크립트로 동적으로 변경되는 UI 요소는 스크린리더 사용자에게 변경 사항이 전달되지 않을 수 있다. 화면이 바뀌어도 스크린리더는 DOM 변경을 자동으로 감지하지 못하기 때문이다. WAI-ARIA 속성을 사용하여 보조 기술이 동적 변경을 인식할 수 있도록 해야 한다.

> **규칙: JavaScript로 DOM을 변경할 때 스크린리더 사용자에게 변경 내용이 전달되지 않으면 그 변경은 그들에게 "없는 것"과 같습니다. 검색 결과가 갱신되어도, 오류 메시지가 나타나도, 로딩이 완료되어도 스크린리더 사용자는 아무런 알림을 받지 못합니다. `aria-live`와 `role="alert"`가 이 문제를 해결합니다.**

---

## 1. aria-live 영역

`aria-live` 속성은 스크린리더에게 해당 영역이 동적으로 변경될 수 있음을 알리고, 변경 내용을 자동으로 읽도록 지시합니다.

**왜 `aria-live`가 필요한가?** 스크린리더는 사용자가 포커스를 이동시킨 요소만 읽는다. 포커스가 다른 곳에 있는 상태에서 DOM이 바뀌어도 스크린리더는 그 변경을 감지하지 않는다. `aria-live`를 선언한 영역은 내용이 바뀌는 순간 스크린리더가 자동으로 읽어주어 사용자에게 변경을 알린다.

### polite vs assertive 차이점

| 속성 값 | 동작 | 사용 시점 |
|---------|------|-----------|
| `aria-live="polite"` | 현재 읽는 내용을 마친 후 변경 내용 읽음 | 정보성 알림, 검색 결과 갱신, 로딩 완료 등 |
| `aria-live="assertive"` | 현재 읽는 내용을 중단하고 즉시 읽음 | 긴급 오류, 시스템 경고 등 즉각 인지가 필요한 경우 |

> **규칙: `aria-live="assertive"`는 사용자가 읽고 있던 내용을 강제로 끊는다. 진짜 긴급한 상황(세션 만료, 결제 오류 등)이 아니면 `polite`를 사용한다. 남용하면 사용자 경험이 극도로 불편해진다.**

### 추가 속성

- `aria-atomic="true"`: 영역 내 일부만 바뀌어도 전체 내용을 읽음 (짧은 상태 메시지에 권장)
- `aria-atomic="false"`: 변경된 부분만 읽음 (기본값, 긴 목록에 적합)
- `aria-relevant`: 어떤 변경(추가/삭제/텍스트)을 알릴지 지정 (기본값 `additions text`로 충분)

### 사용 예

**검색 결과 갱신:**

검색 결과 수가 바뀔 때 스크린리더 사용자에게 결과 건수를 자동으로 알리는 패턴이다. `aria-atomic="true"`로 전체 문장을 읽어준다.

```html
<!-- 검색 결과 수 변경 시 스크린리더가 자동으로 읽어줌 -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
  검색 결과 <span id="result-count">24</span>건이 표시됩니다.
</div>
```

**로딩 상태 안내:**

JS가 이 요소의 텍스트를 교체하면 스크린리더가 새 내용을 자동으로 읽는다. 시각 사용자가 스피너로 로딩 상태를 파악하는 것과 동등한 경험을 제공한다.

```html
<!-- JS로 텍스트를 교체하면 스크린리더가 자동으로 읽음 -->
<div aria-live="polite" aria-atomic="true" id="loading-status">
  <!-- JS로 "불러오는 중..." → "로드 완료" 텍스트 교체 -->
</div>
```

**알림 메시지 (비긴급):**

저장 완료, 복사 완료 같은 토스트 메시지를 스크린리더에 전달하는 패턴이다.

```html
<!-- 토스트 메시지 삽입 시 스크린리더가 자동 낭독 -->
<div aria-live="polite" aria-atomic="true" class="toast-region">
  <!-- 저장 완료, 복사 완료 등의 토스트 메시지 삽입 -->
</div>
```

> **규칙: `aria-live` 영역은 페이지 최초 로드 시 이미 DOM에 존재해야 한다. JavaScript로 나중에 삽입한 요소에 `aria-live`를 추가하면 스크린리더가 인식하지 못할 수 있다. 빈 상태로 HTML에 미리 포함시킨 후 JS로 내용만 교체한다.**

---

## 2. role="alert"

`role="alert"`는 `aria-live="assertive"` + `aria-atomic="true"`를 암시적으로 포함하는 단축 패턴이다. 스크린리더가 즉시 해당 내용을 읽는다.

**왜 폼 오류에 `role="alert"`가 필요한가?** 사용자가 제출 버튼을 누르면 포커스는 그대로인데 오류 메시지가 DOM에 추가된다. `role="alert"` 없이는 스크린리더 사용자가 오류가 발생했는지조차 알지 못한다. 버튼을 눌렀는데 반응이 없는 것처럼 느껴진다.

### 사용 예

**폼 제출 오류:**

```html
<!-- 폼 오류 메시지 — role="alert"로 오류 발생 즉시 스크린리더가 읽어줌 -->
<div role="alert" class="error-message">
  <strong>오류:</strong> 이메일 형식이 올바르지 않습니다.
</div>
```

**시스템 경고:**

```html
<!-- 세션 만료 경고 — 즉각적인 인지가 필요한 경우 role="alert" 사용 -->
<div role="alert">
  세션이 5분 후 만료됩니다. <button type="button">연장하기</button>
</div>
```

### role="alert" vs aria-live="assertive"

두 방식은 동작이 같지만 의미론적 차이가 있습니다.

- `role="alert"`: 사용자 행동에 반응하는 경고성 메시지 (폼 오류, 세션 경고)
- `aria-live="assertive"`: 시스템이 자체적으로 발생시키는 긴급 알림

아래 코드는 `role="alert"` 요소를 처음에 빈 상태로 두고 오류 발생 시 JS로 텍스트를 삽입하는 가장 안정적인 패턴이다.

```html
<!-- 초기 상태: 빈 상태로 DOM에 미리 존재 -->
<div role="alert" id="form-error" class="visually-hidden"></div>

<!-- 오류 발생 시 JS로 텍스트 삽입 — 삽입 즉시 스크린리더가 읽음 -->
<!-- document.getElementById('form-error').textContent = '이메일 형식이 올바르지 않습니다.'; -->
```

---

## 3. 모달 포커스 트랩

모달이 열리면 키보드 포커스가 모달 안에서만 순환해야 한다. 모달 뒤 배경으로 포커스가 빠져나가면 스크린리더 사용자는 현재 위치를 잃게 된다. 모달이 열려 있는 것처럼 보이지만 실제로는 배경 콘텐츠를 조작하게 되어 예측 불가능한 상황이 발생한다.

**위반 시 영향:** KWCAG 2.1.1 위반. 키보드/스크린리더 사용자가 모달에서 탈출할 방법을 잃거나, 모달 배경의 버튼을 실수로 활성화할 수 있습니다.

> **코드 구현(JavaScript 포커스 트랩 로직)은 Phase 9(오버레이 컴포넌트)에서 진행된다.**

### 포커스 관리 원칙

1. **열릴 때:** 모달 내부의 첫 번째 대화형 요소(제목 또는 닫기 버튼)로 포커스 이동
2. **Tab 순환:** 마지막 포커스 요소에서 Tab 시 첫 번째 요소로 순환 (Shift+Tab 역방향도 동일)
3. **Escape 닫기:** `Escape` 키로 모달 닫기 지원 (KWCAG 2.1.1)
4. **닫힌 후:** 모달을 열었던 트리거 요소(버튼 등)로 포커스 복원

아래 코드는 접근성 속성이 완비된 모달 HTML 구조이다. `role`, `aria-modal`, `aria-labelledby`, `tabindex="-1"` 네 가지 속성이 핵심이다.

```html
<!-- 모달 트리거 — 닫힌 후 이 버튼으로 포커스가 복귀되어야 함 -->
<button type="button" id="modal-trigger" data-bs-toggle="modal" data-bs-target="#exampleModal">
  공지사항 보기
</button>

<!-- 모달 — role, aria-modal, aria-labelledby, tabindex="-1" 네 가지가 필수 -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="modal-title">공지사항</h2>
        <button type="button" class="btn-close" aria-label="닫기" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <!-- 모달 콘텐츠 -->
      </div>
      <div class="modal-footer">
        <button type="button" data-bs-dismiss="modal">닫기</button>
      </div>
    </div>
  </div>
</div>
```

### 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `role="dialog"` | — | 이 요소가 대화 상자임을 보조 기술에 전달 |
| `aria-modal="true"` | — | 모달 배경 콘텐츠를 보조 기술에서 숨김 |
| `aria-labelledby` | 모달 제목 요소의 ID | 모달 제목을 스크린리더가 자동으로 읽도록 연결 |
| `aria-describedby` | 모달 설명 요소의 ID | 모달에 대한 부가 설명이 있을 때 사용 |
| `tabindex="-1"` | — | JS로 `focus()` 호출이 가능하도록 포커스 가능 상태로 만듦 |

---

## 4. 탭 패널

탭 컴포넌트는 WAI-ARIA Tab 패턴을 따라야 스크린리더에서 올바르게 동작한다. `role="tablist"`, `role="tab"`, `role="tabpanel"` 세 가지 role이 짝을 이뤄야 한다.

**왜 ARIA 탭 패턴이 필요한가?** 탭처럼 생긴 버튼들도 스크린리더에게는 그냥 "버튼 목록"에 불과하다. `role="tablist"`, `role="tab"`, `aria-selected`를 선언해야 스크린리더가 "상품 정보 탭 목록, 상세 정보 탭 선택됨 1/3"처럼 구조를 안내할 수 있다.

아래 코드는 WAI-ARIA 탭 패턴의 완전한 HTML 구조이다.

```html
<div class="tab-component">
  <!-- 탭 목록 — role="tablist"로 탭 그룹임을 선언 -->
  <ul role="tablist" aria-label="상품 정보">
    <li role="presentation">
      <button role="tab" id="tab-detail" aria-controls="panel-detail" aria-selected="true" tabindex="0">상세 정보</button>
    </li>
    <li role="presentation">
      <button role="tab" id="tab-review" aria-controls="panel-review" aria-selected="false" tabindex="-1">리뷰</button>
    </li>
    <li role="presentation">
      <button role="tab" id="tab-qna" aria-controls="panel-qna" aria-selected="false" tabindex="-1">Q&amp;A</button>
    </li>
  </ul>

  <!-- 탭 패널 — aria-labelledby로 대응하는 탭 버튼과 연결 -->
  <div role="tabpanel" id="panel-detail" aria-labelledby="tab-detail">
    <!-- 상세 정보 콘텐츠 -->
  </div>
  <div role="tabpanel" id="panel-review" aria-labelledby="tab-review" hidden>
    <!-- 리뷰 콘텐츠 -->
  </div>
  <div role="tabpanel" id="panel-qna" aria-labelledby="tab-qna" hidden>
    <!-- Q&A 콘텐츠 -->
  </div>
</div>
```

### 키보드 상호작용

| 키 | 동작 |
|----|------|
| Tab | 탭 목록 → 활성 탭 패널 내부로 이동 |
| 좌/우 방향키 | 탭 목록 내에서 이전/다음 탭 이동 및 자동 활성화 |
| Home | 첫 번째 탭으로 이동 |
| End | 마지막 탭으로 이동 |

> **규칙: 비활성 탭에는 `tabindex="-1"` + `aria-selected="false"`, 활성 탭에는 `tabindex="0"` + `aria-selected="true"`를 설정한다. 탭 전환 시 JS로 이 두 속성을 함께 갱신해야 한다.**

---

## 5. 아코디언 / 토글

아코디언은 `aria-expanded`로 현재 펼침/접힘 상태를 스크린리더에 전달한다.

**왜 `aria-expanded`가 필요한가?** 아코디언이 펼쳐져도 스크린리더는 시각적 변화를 모른다. `aria-expanded`로 상태를 선언해야 "자주 묻는 질문 1, 펼쳐짐 버튼"처럼 읽혀 현재 상태를 알 수 있다. `aria-expanded="false"`일 때는 "접힘"으로 읽혀 콘텐츠가 숨겨져 있음을 알린다.

아래 코드는 `aria-expanded` 상태를 사용하는 아코디언 HTML 구조이다.

```html
<div class="accordion">
  <div class="accordion-item">
    <h3 class="accordion-header">
      <!-- aria-expanded="true": 펼쳐진 상태 — 스크린리더가 "펼쳐짐"으로 읽음 -->
      <button type="button" class="accordion-button" aria-expanded="true" aria-controls="accordion-body-1" id="accordion-btn-1">
        자주 묻는 질문 1
      </button>
    </h3>
    <div id="accordion-body-1" role="region" aria-labelledby="accordion-btn-1">
      <div class="accordion-body">
        <!-- 답변 내용 -->
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h3 class="accordion-header">
      <!-- aria-expanded="false": 접힌 상태 — 스크린리더가 "접힘"으로 읽음 -->
      <button type="button" class="accordion-button collapsed" aria-expanded="false" aria-controls="accordion-body-2" id="accordion-btn-2">
        자주 묻는 질문 2
      </button>
    </h3>
    <div id="accordion-body-2" role="region" aria-labelledby="accordion-btn-2" hidden>
      <div class="accordion-body">
        <!-- 답변 내용 -->
      </div>
    </div>
  </div>
</div>
```

### 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `aria-expanded="true"` | 펼쳐진 상태 | "펼쳐짐" 상태를 스크린리더에 전달 |
| `aria-expanded="false"` | 접힌 상태 | "접힘" 상태를 스크린리더에 전달 |
| `aria-controls` | 패널 요소의 ID | 버튼이 제어하는 콘텐츠 영역 연결 |
| `role="region"` | — | 연관된 콘텐츠 묶음임을 명시 (항목이 6개 이상이면 생략 권장) |

---

## 6. 동적 콘텐츠 접근성 점검 항목

> **사용 방법:** 해당 UI 컴포넌트 구현 후 아래 항목을 검수한다.

- [ ] `aria-live` 영역이 페이지 초기 로드 시 DOM에 존재하는가 (JS로 나중에 삽입하지 않았는가)
- [ ] 폼 오류 메시지가 `role="alert"` 또는 `aria-live="assertive"`로 즉시 전달되는가
- [ ] 모달 열릴 때 포커스가 모달 내부 첫 번째 요소로 이동하는가
- [ ] 모달 내 Tab 순환이 모달 범위를 벗어나지 않는가 (포커스 트랩)
- [ ] 모달 닫힌 후 트리거 버튼으로 포커스가 복원되는가
- [ ] 탭 컴포넌트에서 방향키로 탭 간 이동이 가능한가
- [ ] 아코디언 버튼에 `aria-expanded` 상태가 올바르게 반영되는가
