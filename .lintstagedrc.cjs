// @ts-check

/** @type {import("lint-staged").Config} */
module.exports = {
  "*.{js,cjs,mjs,ts}": ["bunx @biomejs/biome check --apply"],
};
