// @ts-check

/** @type {import("lint-staged").Config} */
export default {
  "*.{js,cjs,ts,jsx,tsx,astro,md,mdx,html,css,json,yaml,yml}": ["prettier --write"],
}
