import { z, defineCollection } from "astro:content"

export const collections = {
  docs: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
    }),
  }),
}
