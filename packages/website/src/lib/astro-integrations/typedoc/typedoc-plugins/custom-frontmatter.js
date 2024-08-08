// @ts-check
import { MarkdownPageEvent } from "typedoc-plugin-markdown"

/**
 * Add title to the frontmatter
 *
 * @param {import("typedoc-plugin-markdown").MarkdownApplication} app
 */
export const load = (app) => {
  app.renderer.on(
    MarkdownPageEvent.BEGIN,
    /** @param {import("typedoc-plugin-markdown").MarkdownPageEvent} page */
    (page) => {
      page.frontmatter = {
        title: page.model?.name,
        ...page.frontmatter,
      }
    },
  )
}
