import type * as hast from "hast";
import { JSDOM } from "jsdom";
import type * as mdast from "mdast";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { beforeAll, describe, expect, test } from "vitest";
import { type Options, remarkTypedocAstroLink } from "./plugin.js";

const process = async (md: string, options?: Options) => {
  let hast: hast.Node;
  let mdast: mdast.Root;
  const html = (
    await unified()
      .use(remarkParse)
      .use(remarkTypedocAstroLink, options)
      .use(() => (tree: mdast.Root) => {
        mdast = tree;
        return mdast;
      })
      .use(remarkRehype)
      .use(() => (tree: hast.Node) => {
        hast = tree;
        return hast;
      })
      .use(rehypeStringify)
      .process(md)
  ).toString();

  // @ts-expect-error: hast and mdast is assigned
  return { hast, mdast, html };
};

describe("remark-typedoc-astro-link", () => {
  let jsdom: JSDOM;
  let parser: DOMParser;

  beforeAll(() => {
    jsdom = new JSDOM();
    parser = new jsdom.window.DOMParser();
  });

  test("should transform the url of the link with .mdx extension", async () => {
    const { html } = await process("[foo](BarHoge.mdx)");

    const doc = parser.parseFromString(html, "text/html");

    const a = doc.querySelector("a");
    expect(a).not.toBeNull();

    expect(a?.getAttribute("href")).toBe("barhoge");
  });

  test("should transform the url of the link with .md extension", async () => {
    const { html } = await process("[foo](BarHoge.md)");

    const doc = parser.parseFromString(html, "text/html");

    const a = doc.querySelector("a");
    expect(a).not.toBeNull();

    expect(a?.getAttribute("href")).toBe("barhoge");
  });
});
