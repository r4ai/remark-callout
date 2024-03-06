import dedent from "dedent";
import type * as hast from "hast";
import { JSDOM } from "jsdom";
import type * as mdast from "mdast";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { beforeAll, describe, expect, test } from "vitest";
import { parseCallout, remarkCallout } from "./plugin";

const process = async (md: string) => {
  let hast: hast.Node;
  let mdast: mdast.Root;
  const html = (
    await unified()
      .use(remarkParse)
      .use(remarkCallout)
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

describe("parseCallout", () => {
  test("should parse callout without title", () => {
    const text = "[!info]";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("info");
    expect(callout?.isFoldable).toBe(false);
    expect(callout?.title).toBeUndefined();
  });

  test("should parse callout with title", () => {
    const text = "[!info] Hello, world! ";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("info");
    expect(callout?.isFoldable).toBe(false);
    expect(callout?.title).toBe("Hello, world! ");
  });

  test("should parse callout with title and foldable", () => {
    const text = "[!info]- Hello, world! ";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("info");
    expect(callout?.isFoldable).toBe(true);
    expect(callout?.title).toBe("Hello, world! ");
  });

  test("should not parse callout with no type", () => {
    const text = "[!]";
    const callout = parseCallout(text);
    expect(callout).toBeUndefined();
  });

  test("should not parse callout with no type and title", () => {
    const text = "[!] Hello, world!";
    const callout = parseCallout(text);
    expect(callout).toBeUndefined();
  });

  test("should not parse callout with no type and title and foldable", () => {
    const text = "[!]- Hello, world!";
    const callout = parseCallout(text);
    expect(callout).toBeUndefined();
  });

  test("should not parse as foldable when the format is invalid", () => {
    const text = "[!warn]? Hello, world!";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("warn");
    expect(callout?.isFoldable).toBe(false);
    expect(callout?.title).toBe("? Hello, world!");
  });
});

describe("remarkCallout", () => {
  let jsdom: JSDOM;
  let parser: DOMParser;

  beforeAll(() => {
    jsdom = new JSDOM();
    parser = new jsdom.window.DOMParser();
  });

  test("callout with title and body", async () => {
    const md = dedent`
      > [!note] title here
      > body here
    `;

    const { html } = await process(md);
    console.log(html);
    const doc = parser.parseFromString(html, "text/html");

    const callout = doc.querySelector("[data-callout]");
    expect(callout).not.toBeNull();
    expect(callout?.getAttribute("data-callout-type")).toBe("note");
    expect(callout?.getAttribute("data-callout-is-foldable")).toBe("false");

    const calloutTitle = callout?.querySelector("[data-callout-title]");
    expect(calloutTitle?.textContent).toBe("title here");

    const calloutBody = callout?.children[1];
    expect(calloutBody?.textContent).toBe("body here");
  });

  test("callout with title consisting of multiple nodes", async () => {
    const md = dedent`
      > [!note] title here \`inline code\`
      > body here
    `;

    const { html } = await process(md);
    const doc = parser.parseFromString(html, "text/html");

    const callout = doc.querySelector("[data-callout]");
    expect(callout).not.toBeNull();
    expect(callout?.getAttribute("data-callout-type")).toBe("note");
    expect(callout?.getAttribute("data-callout-is-foldable")).toBe("false");

    const calloutTitle = callout?.querySelector("[data-callout-title]");
    expect(calloutTitle?.innerHTML).toBe("title here <code>inline code</code>");

    const calloutBody = callout?.children[1];
    expect(calloutBody?.textContent).toBe("body here");
  });

  test("callout with body consisting of multiple nodes", async () => {
    const md = dedent`
      > [!warn] title here \`inline code\`
      > body first line \`code\` here
      >
      > - list 1
      > - list 2
      >
      > \`\`\`js
      > console.log("Hello, World!")
      > \`\`\`
    `;

    const { html } = await process(md);

    const doc = parser.parseFromString(html, "text/html");

    const callout = doc.querySelector("[data-callout]");
    expect(callout).not.toBeNull();
    expect(callout?.getAttribute("data-callout-type")).toBe("warn");
    expect(callout?.getAttribute("data-callout-is-foldable")).toBe("false");

    const calloutTitle = callout?.querySelector("[data-callout-title]");
    expect(calloutTitle?.innerHTML).toBe("title here <code>inline code</code>");

    const calloutBody = callout?.children[1];
    expect(calloutBody?.innerHTML).toBe(
      "body first line <code>code</code> here",
    );
  });

  test("foldable callout", async () => {
    const md = dedent`
      > [!warn]- title here \`inline code\`
      > body first line \`code\` here
      >
      > - list 1
      > - list 2
      >
      > \`\`\`js
      > console.log("Hello, World!")
      > \`\`\`
    `;

    const { html } = await process(md);

    const doc = parser.parseFromString(html, "text/html");

    const callout = doc.querySelector("[data-callout]");
    expect(callout).not.toBeNull();
    expect(callout?.getAttribute("data-callout-type")).toBe("warn");
    expect(callout?.getAttribute("data-callout-is-foldable")).toBe("true");

    const calloutTitle = callout?.querySelector("[data-callout-title]");
    expect(calloutTitle?.innerHTML).toBe("title here <code>inline code</code>");

    const calloutBody = callout?.children[1];
    expect(calloutBody?.innerHTML).toBe(
      "body first line <code>code</code> here",
    );
  });

  test("callout with strong, emphasis, and inline code", async () => {
    const md = dedent`
      > [!warn] title here
      > body **first** _line_ \`code\` here
    `;

    const { html } = await process(md);

    const doc = parser.parseFromString(html, "text/html");

    const callout = doc.querySelector("[data-callout]");
    expect(callout).not.toBeNull();
    expect(callout?.getAttribute("data-callout-type")).toBe("warn");
    expect(callout?.getAttribute("data-callout-is-foldable")).toBe("false");
    expect(callout?.children[1].innerHTML).toBe(
      "body <strong>first</strong> <em>line</em> <code>code</code> here",
    );
  });
});
