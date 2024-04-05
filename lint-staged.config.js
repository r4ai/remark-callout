// @ts-check

/** @type {import("lint-staged").Config} */
export default {
  "*.{js,cjs,mjs,ts,jsx,tsx,json,jsonc,html,css}": [
    "bunx @biomejs/biome check --apply",
  ],
};
