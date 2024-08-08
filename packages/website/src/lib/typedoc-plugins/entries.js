import fs from "node:fs"
import path from "node:path"
// @ts-check
import { ReflectionKind } from "typedoc"

/**
 * @typedef {import("typedoc-plugin-markdown").MarkdownApplication} MarkdownApplication
 * @typedef {import("typedoc-plugin-markdown").MarkdownRendererEvent["navigation"]} Navigation
 * @typedef {import("@/lib/metadata").Metadata["entries"][number]} Entry
 *
 * @param {MarkdownApplication} app
 */
export const load = (app) => {
  app.renderer.postRenderAsyncJobs.push(async (output) => {
    const base = "/docs/en/api-reference"
    /** @type {Entry} */
    const entry = {
      type: "directory",
      slug: base,
      title: "API Reference",
      children: [
        {
          type: "file",
          slug: `${base}/readme`,
          title: "API Index",
        },
        ...generateEntries(output.navigation, base),
      ],
    }

    const code = [
      'import type { Metadata } from "@/lib/metadata"',
      "",
      `export const entry = ${JSON.stringify(entry, null, 2)} as const satisfies Metadata["entries"][number]`,
    ].join("\n")
    fs.writeFileSync(path.join(output.outputDirectory, "entries.ts"), code)
  })
}

/**
 * @param {Navigation} items
 * @param {string} base
 */
const generateEntries = (items, base) => {
  /** @type {Entry[]} */
  const entries = []
  for (const item of items ?? []) {
    /** @type {Entry} */
    const entry =
      (item.children?.length ?? 0) > 0
        ? {
            type: "directory",
            slug: `${base}/${kebabCase(item.title)}`,
            title: item.title,
            children: [],
          }
        : {
            type: "file",
            slug: base,
            title: "Index",
          }
    if (entry.type === "file") return [entry]

    for (const child of item.children ?? []) {
      if (child.kind !== ReflectionKind.Module) {
        const name = kebabCase(path.parse(child.path ?? "").name)
        entry.children.push({
          type: "file",
          slug: `${entry.slug}/${name}`,
          title: child.title,
        })
      }
    }
    if (entry.children.length > 0) {
      entries.push(entry)
    }
  }
  return entries
}

/** @param {string} str */
export const kebabCase = (str) => str.toLowerCase().replace(/\s+/g, "-")
