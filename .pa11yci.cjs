/**
 * pa11y-ci 접근성 자동 테스트 설정
 * 기준: WCAG 2.1 AA (KWCAG 2.1 AA 대응)
 *
 * 실행 전 Eleventy dev 서버가 localhost:4000에서 실행 중이어야 합니다.
 * 보통은 `npm run test:a11y` 스크립트가 서버 기동을 포함합니다.
 */

/** @type {import('pa11y-ci').Options} */
const config = {
  // ─── 공통 옵션 ───────────────────────────────────────────────────────────
  defaults: {
    // WCAG 2.1 AA 기준 (htmlcs 러너 사용)
    standard: "WCAG2AA",

    // 페이지 로딩 타임아웃 30초
    timeout: 30000,

    // 요소 로드 대기 시간 (JS 렌더링 여유)
    wait: 500,

    // Chromium 경고 숨기기 (CI 환경 대비)
    chromeLaunchConfig: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },

    // 무시할 규칙 (Bootstrap 5 알려진 경고 등 필요 시 추가)
    ignore: [],
  },

  // ─── 테스트 대상 URL 목록 ─────────────────────────────────────────────────
  // Eleventy dev 서버: eleventy --serve --port=4000
  urls: [
    // 홈
    "http://localhost:4000/",

    // 컴포넌트 색인
    "http://localhost:4000/components/",

    // 컴포넌트 개별 페이지
    "http://localhost:4000/components/header/",
    "http://localhost:4000/components/button/",
    "http://localhost:4000/components/forms/",
    "http://localhost:4000/components/card/",
    "http://localhost:4000/components/modal/",
    "http://localhost:4000/components/table/",
    "http://localhost:4000/components/tab/",
    "http://localhost:4000/components/pagination/",
    "http://localhost:4000/components/breadcrumb/",
    "http://localhost:4000/components/slider/",

    // 접근성 색인
    "http://localhost:4000/accessibility/",

    // 접근성 개별 페이지
    "http://localhost:4000/accessibility/checklist/",
    "http://localhost:4000/accessibility/color-contrast/",
    "http://localhost:4000/accessibility/forms/",
    "http://localhost:4000/accessibility/images/",
    "http://localhost:4000/accessibility/keyboard/",
    "http://localhost:4000/accessibility/dynamic-content/",

    // 코딩 컨벤션
    "http://localhost:4000/conventions/",
    "http://localhost:4000/conventions/coding-style/",
    "http://localhost:4000/conventions/html-structure/",
    "http://localhost:4000/conventions/naming/",
    "http://localhost:4000/conventions/scss-rules/",
    "http://localhost:4000/conventions/git-rules/",

    // 디자인 토큰
    "http://localhost:4000/tokens/",

    // 스타터 킷
    "http://localhost:4000/starter/",
  ],
};

module.exports = config;
