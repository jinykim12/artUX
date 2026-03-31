/**
 * copy.js — 코드 블록 복사 버튼
 *
 * per D-11: 바닐라 JS + navigator.clipboard.writeText
 * per D-12: 프레임워크 없이 querySelector 사용
 * 접근성: aria-label="코드 복사", 복사 성공 시 버튼 텍스트/aria-label 변경
 */

(function () {
  'use strict';

  function initCopyButtons() {
    var codeBlocks = document.querySelectorAll('pre > code');

    codeBlocks.forEach(function (code) {
      var pre = code.parentElement;

      // 이미 복사 버튼이 있으면 건너뜀
      if (pre.querySelector('.copy-btn')) {
        return;
      }

      // pre를 기준점으로 설정
      pre.style.position = 'relative';

      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.setAttribute('aria-label', '코드 복사');
      btn.textContent = '복사';

      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(code.textContent).then(function () {
          btn.textContent = '복사됨!';
          btn.setAttribute('aria-label', '코드가 복사되었습니다');

          setTimeout(function () {
            btn.textContent = '복사';
            btn.setAttribute('aria-label', '코드 복사');
          }, 2000);
        }).catch(function () {
          btn.textContent = '실패';

          setTimeout(function () {
            btn.textContent = '복사';
            btn.setAttribute('aria-label', '코드 복사');
          }, 2000);
        });
      });

      pre.appendChild(btn);
    });
  }

  // DOM 준비 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  } else {
    initCopyButtons();
  }

}());
