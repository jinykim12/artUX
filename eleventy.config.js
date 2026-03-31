import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

// Eleventy 3.x ESM 설정 — per D-01, D-02, D-03
export default function (eleventyConfig) {
  // 코드 하이라이트 (Prism.js 기반)
  eleventyConfig.addPlugin(syntaxHighlight);
  // dist/artux.css passthrough 복사 (per D-03)
  eleventyConfig.addPassthroughCopy({ "dist/artux.css": "css/artux.css" });
  // docs/js/ 복사
  eleventyConfig.addPassthroughCopy({ "docs/js": "js" });
  // docs/css/ 복사
  eleventyConfig.addPassthroughCopy({ "docs/css": "css" });

  return {
    dir: {
      input: "docs",      // per D-02
      output: "_site",    // per D-02
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",  // 마크다운 내 Nunjucks 허용
    htmlTemplateEngine: "njk",
  };
}
