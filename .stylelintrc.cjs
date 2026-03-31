module.exports = {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    // Phase 1: 경고만, 오류 없음 — 팀 적응 기간
    // 빈 SCSS 구분선 주석 허용 (// ===...=== 패턴)
    'scss/comment-no-empty': null,
  },
  ignoreFiles: ['node_modules/**', 'dist/**'],
};
