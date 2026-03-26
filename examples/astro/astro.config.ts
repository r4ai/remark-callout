import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import {
  type Options as RemarkCalloutOptions,
  remarkCallout,
} from "@r4ai/remark-callout";
import tailwindcss from "@tailwindcss/vite";
import type { AstroUserConfig } from "astro";
import { defineConfig } from "astro/config";

// NOTE: Temporary cast for Vite type-instance mismatch between Astro and @tailwindcss/vite.
// Ref: https://github.com/withastro/astro/issues/14030
// Ref: https://github.com/tailwindlabs/tailwindcss/issues/18802
type AstroVitePlugins = NonNullable<AstroUserConfig["vite"]>["plugins"];
const tailwindPlugin = [tailwindcss()] as unknown as AstroVitePlugins;

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  vite: {
    plugins: tailwindPlugin,
    ssr: {
      noExternal: ["@r4ai/remark-callout"],
    },
  },
  markdown: {
    remarkPlugins: [
      [
        remarkCallout,
        {
          root: (callout) => ({
            tagName: "callout-root",
            properties: {
              type: callout.type,
              isFoldable: String(callout.isFoldable),
              defaultFolded:
                callout.defaultFolded != null
                  ? String(callout.defaultFolded)
                  : undefined,
            },
          }),
          title: (callout) => ({
            tagName: "callout-title",
            properties: {
              type: callout.type,
              isFoldable: String(callout.isFoldable),
            },
          }),
          body: () => ({
            tagName: "callout-body",
            properties: {},
          }),
        } satisfies RemarkCalloutOptions,
      ],
    ],
  },
});
