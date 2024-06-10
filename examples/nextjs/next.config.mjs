import mdx from "@next/mdx";
import remarkCallout from "@r4ai/remark-callout";

const withMDX = mdx({
  options: {
    remarkPlugins: [
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
            };
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
        },
      ],
    ],
    rehypePlugins: [],
  },
});

export default withMDX({
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
});
