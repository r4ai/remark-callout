import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import { type Options as RemarkCalloutOptions, remarkCallout } from "@r4ai/remark-callout"
import { defineConfig } from "astro/config"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import metadata from "./src/lib/metadata"

// https://astro.build/config
export default defineConfig({
  site: metadata.site,
  base: metadata.base,
  vite: {
    ssr: {
      noExternal: ["@r4ai/remark-callout"],
    },
  },
  redirects: {
    "/docs/en": `${metadata.base}/docs/en/getting-started`,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      [
        remarkCallout,
        {
          root: (callout) => {
            return {
              tagName: "callout-root",
              properties: {
                type: callout.type,
                isFoldable: callout.isFoldable.toString(),
                defaultFolded: callout.defaultFolded?.toString(),
              },
            }
          },
          title: (callout) => ({
            tagName: "callout-title",
            properties: {
              type: callout.type,
              isFoldable: callout.isFoldable.toString(),
            },
          }),
          body: (callout) => ({
            tagName: "callout-body",
            properties: {},
          }),
        } satisfies RemarkCalloutOptions,
      ],
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: "material-theme-lighter",
        dark: "material-theme-darker",
      },
    },
  },
})
