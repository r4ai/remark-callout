import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

export const collections = {
  docs: defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/docs" }),
    schema: z.object({
      title: z.string(),
    }),
  }),
}
