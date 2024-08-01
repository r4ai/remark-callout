import type { Node } from "@/components/NavSideBar"

export type Metadata = {
  name: string
  site: string
  base: string
  description: string
  repository: {
    url: URL
  }
  entries: Node[]
}

export default {
  name: "@r4ai/remark-callout",
  site: "https://r4ai.github.io",
  base: "/remark-callout",
  description: "A remark plugin to add obsidian style callouts to markdown",
  repository: {
    url: new URL("https://github.com/r4ai/remark-callout"),
  },
  entries: [
    {
      type: "file",
      title: "Home",
      slug: "/",
    },
    {
      type: "directory",
      slug: "/docs/en",
      title: "Documentation",
      children: [
        { type: "file", title: "Getting Started", slug: "/docs/en/getting-started" },
        {
          type: "directory",
          title: "Examples",
          slug: "/docs/en/examples",
          children: [
            { type: "file", title: "Next.js", slug: "/docs/en/examples/nextjs" },
            { type: "file", title: "Astro", slug: "/docs/en/examples/astro" },
          ],
        },
      ],
    },
    {
      type: "file",
      title: "Playground",
      slug: "/playground",
    },
  ],
} as const satisfies Metadata
