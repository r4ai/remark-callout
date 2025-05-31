// @ts-check

/**
 * @typedef {import("typedoc").TypeDocOptions} TypeDocOptions
 * @typedef {import("typedoc-plugin-markdown").PluginOptions} MarkdownPluginOptions
 * @typedef {import("typedoc-plugin-frontmatter").PluginOptions} FrontmatterPluginOptions
 * @typedef {import("typedoc-plugin-remark").PluginOptions} RemarkPluginOptions
 * @typedef {import("typedoc-plugin-replace-text").Config} ReplaceTextOptions
 *
 * @type {Partial<TypeDocOptions & MarkdownPluginOptions & FrontmatterPluginOptions & RemarkPluginOptions & ReplaceTextOptions>}
 **/
export default {
  fileExtension: ".mdx",
  out: "./src/content/docs/en/api-reference",
  tsconfig: "../remark-callout/tsconfig.build.json",
  entryPoints: ["../remark-callout/src/index.ts"],
  readme: "none",
  plugin: [
    "typedoc-plugin-missing-exports",
    "typedoc-plugin-markdown",
    "typedoc-plugin-remark",
    "typedoc-plugin-frontmatter",
    "./src/lib/typedoc-plugins/custom-frontmatter.js",
    "./src/lib/typedoc-plugins/entries.js",
  ],

  // typedoc-plugin-markdown options
  hidePageHeader: true,
  hideBreadcrumbs: true,
  hidePageTitle: true,
  parametersFormat: "table",
  enumMembersFormat: "table",
  indexFormat: "table",
  sanitizeComments: true,

  // typedoc-plugin-remark options
  remarkPlugins: [
    ["remark-mdx", {}],
    ["remark-typedoc-astro-link", {}],
  ],
}
