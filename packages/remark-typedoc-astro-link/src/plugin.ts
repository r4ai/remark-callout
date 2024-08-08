import { defu } from "defu";
import type * as mdast from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export type Options = {
  /**
   * A function to check if the URL of the link should be transformed.
   */
  urlMatcher?: (url: string) => boolean;

  /**
   * A function to transform the URL of the link.
   */
  urlTransformer?: (url: string) => string;
};

export const defaultOptions: Required<Options> = {
  urlMatcher: (url) => url.endsWith(".mdx") || url.endsWith(".md"),
  urlTransformer: (url) => {
    const isProduction = process.env.NODE_ENV === "production";
    const href = kebabCase(url.replace(/\.mdx$/, "").replace(/\.md$/, ""));
    return isProduction ? `../${href}` : href;
  },
};

export const remarkTypedocAstroLink: Plugin<[Options?], mdast.Root> = (
  _options,
) => {
  const options = defu(_options, defaultOptions);

  return (tree) => {
    visit(tree, "link", (node) => {
      if (options.urlMatcher(node.url)) {
        node.url = options.urlTransformer(node.url);
      }
    });
  };
};

export const kebabCase = (str: string) => str.toLowerCase().replace(/\s/g, "-");
