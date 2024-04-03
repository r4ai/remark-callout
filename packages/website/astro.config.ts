import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { remarkCallout, type Options as RemarkCalloutOptions } from "@r4ai/remark-callout"

import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ["@r4ai/remark-callout"],
    },
  },
  redirects: {
    "/docs": "/docs/en",
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
            console.log(callout)
            return {
              tagName: "callout-root",
              properties: {
                type: callout.type,
                isFoldable: callout.isFoldable,
                defaultFolded: callout.defaultFolded,
              },
            }
          },
          title: (callout) => ({
            tagName: "callout-title",
            properties: {
              type: callout.type,
              isFoldable: callout.isFoldable,
              defaultFolded: callout.defaultFolded,
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
