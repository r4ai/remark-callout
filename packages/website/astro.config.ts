import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import { type Options as RemarkCalloutOptions, remarkCallout } from "@r4ai/remark-callout"
import tailwindcss from "@tailwindcss/vite"
import type { AstroUserConfig } from "astro"
import { defineConfig } from "astro/config"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import metadata from "./src/lib/metadata"

type AstroVitePlugins = NonNullable<AstroUserConfig["vite"]>["plugins"]
const tailwindPlugin = [tailwindcss()] as unknown as AstroVitePlugins

// https://astro.build/config
export default defineConfig({
  site: metadata.site,
  base: metadata.base,
  vite: {
    // NOTE: Temporary cast for Vite type-instance mismatch between Astro and @tailwindcss/vite.
    // Ref: https://github.com/withastro/astro/issues/14030
    // Ref: https://github.com/tailwindlabs/tailwindcss/issues/18802
    plugins: tailwindPlugin,
    ssr: {
      noExternal: ["@r4ai/remark-callout"],
    },
  },
  redirects: {
    "/docs/en": `${metadata.base}/docs/en/getting-started`,
  },
  integrations: [react(), mdx()],
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
