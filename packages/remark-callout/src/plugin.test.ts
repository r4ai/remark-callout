import dedent from "dedent";
import type * as hast from "hast";
import { JSDOM } from "jsdom";
import type * as mdast from "mdast";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { beforeAll, describe, expect, test } from "vitest";
import {
  type Callout,
  type Options,
  parseCallout,
  remarkCallout,
} from "./plugin.js";

const process = async (md: string, options?: Options) => {
  let hast: hast.Node;
  let mdast: mdast.Root;
  const html = (
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkCallout, options)
      .use(() => (tree: mdast.Root) => {
        mdast = tree;
        return mdast;
      })
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
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
    expect(callout?.defaultFolded).toBe(undefined);
    expect(callout?.title).toBe("Info");
  });

  test("should parse callout with uppercase type", () => {
    const text = "[!INFO]";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("INFO");
    expect(callout?.isFoldable).toBe(false);
    expect(callout?.defaultFolded).toBe(undefined);
    expect(callout?.title).toBe("Info");
  });

  test("should parse callout with spaces in type", () => {
    const text = "[!type with spaces]";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("type with spaces");
    expect(callout?.isFoldable).toBe(false);
    expect(callout?.defaultFolded).toBe(undefined);
    expect(callout?.title).toBe("Type with spaces");
  });

  test("should parse callout only with foldable (-)", () => {
    const text = "[!info]-";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("info");
    expect(callout?.isFoldable).toBe(true);
    expect(callout?.defaultFolded).toBe(true);
    expect(callout?.title).toBe("Info");
  });

  test("should parse callout only with foldable (+)", () => {
    const text = "[!info]+";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("info");
    expect(callout?.isFoldable).toBe(true);
    expect(callout?.defaultFolded).toBe(false);
    expect(callout?.title).toBe("Info");
  });

  test("should parse callout with title", () => {
    const text = "[!info] Hello, world! ";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("info");
    expect(callout?.isFoldable).toBe(false);
    expect(callout?.defaultFolded).toBe(undefined);
    expect(callout?.title).toBe("Hello, world! ");
  });

  test("should parse callout with multiple spaces between type and title", () => {
    const text = "[!info]    Hello, world! ";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("info");
    expect(callout?.isFoldable).toBe(false);
    expect(callout?.defaultFolded).toBe(undefined);
    expect(callout?.title).toBe("   Hello, world! ");
  });

  test("should parse callout with [brackets] in title", () => {
    const text = "[!info] Title [123]";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("info");
    expect(callout?.isFoldable).toBe(false);
    expect(callout?.defaultFolded).toBe(undefined);
    expect(callout?.title).toBe("Title [123]");
  });

  test("should parse callout with title and foldable (-)", () => {
    const text = "[!info]- Hello, world! ";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("info");
    expect(callout?.isFoldable).toBe(true);
    expect(callout?.defaultFolded).toBe(true);
    expect(callout?.title).toBe("Hello, world! ");
  });

  test("should parse callout with title and foldable (+)", () => {
    const text = "[!info]+ Hello, world! ";
    const callout = parseCallout(text);
    expect(callout?.type).toBe("info");
    expect(callout?.isFoldable).toBe(true);
    expect(callout?.defaultFolded).toBe(false);
    expect(callout?.title).toBe("Hello, world! ");
  });

  test("should not parse callout with no type", () => {
    const text = "[!]";
    const callout = parseCallout(text);
    expect(callout).toBe(undefined);
  });

  test("should not parse callout with no type and title", () => {
    const text = "[!] Hello, world!";
    const callout = parseCallout(text);
    expect(callout).toBe(undefined);
  });

  test("should not parse callout with no type and title and foldable (-)", () => {
    const text = "[!]- Hello, world!";
    const callout = parseCallout(text);
    expect(callout).toBe(undefined);
  });

  test("should not parse callout with no type and title and foldable (+)", () => {
    const text = "[!]+ Hello, world!";
    const callout = parseCallout(text);
    expect(callout).toBe(undefined);
  });

  test("should not parse callout with invalid foldable format", () => {
    const text = "[!warn]? Hello, world!";
    const callout = parseCallout(text);
    expect(callout).toBe(undefined);
  });

  test("should not parse callout with missing space", () => {
    const text = "[!warn]Hello, world!";
    const callout = parseCallout(text);
    expect(callout).toBe(undefined);
  });
});

describe("remarkCallout", () => {
  let jsdom: JSDOM;
  let parser: DOMParser;

  beforeAll(() => {
    jsdom = new JSDOM();
    parser = new jsdom.window.DOMParser();
  });

  test("empty blockquote", async () => {
    const md = dedent`
      >
    `;

    const { html } = await process(md);
    const doc = parser.parseFromString(html, "text/html");

    const blockquote = doc.querySelector("blockquote");
    expect(blockquote).not.toBe(null);
  });

  test("callout with title and body", async () => {
    const md = dedent`
      > [!note] title here
      > body here
    `;

    const { html } = await process(md);
    const doc = parser.parseFromString(html, "text/html");

    const callout = doc.querySelector("[data-callout]");
    expect(callout).not.toBe(null);
    expect(callout?.getAttribute("data-callout-type")).toBe("note");
    expect(callout?.tagName.toLowerCase()).toBe("div");
    expect(callout?.getAttribute("open")).toBe(null);

    const calloutTitle = callout?.querySelector("[data-callout-title]");
    expect(calloutTitle?.textContent).toBe("title here");

    const calloutBody = callout?.querySelector("[data-callout-body]");
    expect(calloutBody?.children[0].textContent).toBe("body here");
  });

  test("callout with empty first line", async () => {
    const md = dedent`
      >
      > [!info]
      > body here
    `;

    const { html } = await process(md);
    const doc = parser.parseFromString(html, "text/html");

    const callout = doc.querySelector("[data-callout]");
    expect(callout).toBe(null);
  });

  test("callout with title consisting of multiple nodes", async () => {
    const md = dedent`
      > [!note] The **reason** for why _this_ ~~is~~ \`true\` when $a=1$.
      > body here
    `;

    const { html } = await process(md);
    const doc = parser.parseFromString(html, "text/html");

    const callout = doc.querySelector("[data-callout]");
    expect(callout).not.toBe(null);
    expect(callout?.getAttribute("data-callout-type")).toBe("note");
    expect(callout?.tagName.toLowerCase()).toBe("div");
    expect(callout?.getAttribute("open")).toBe(null);

    const calloutTitle = callout?.querySelector("[data-callout-title]");
    expect(calloutTitle?.innerHTML).toBe(
      'The <strong>reason</strong> for why <em>this</em> <del>is</del> <code>true</code> when <code class="language-math math-inline">a=1</code>.',
    );

    const calloutBody = callout?.querySelector("[data-callout-body]");
    expect(calloutBody?.children[0].textContent).toBe("body here");
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
    expect(callout).not.toBe(null);
    expect(callout?.getAttribute("data-callout-type")).toBe("warn");
    expect(callout?.tagName.toLowerCase()).toBe("div");
    expect(callout?.getAttribute("open")).toBe(null);

    const calloutTitle = callout?.querySelector("[data-callout-title]");
    expect(calloutTitle?.innerHTML).toBe("title here <code>inline code</code>");

    const calloutBody = callout?.querySelector("[data-callout-body]");
    expect(calloutBody?.innerHTML).toBe(
      [
        "",
        "<p>body first line <code>code</code> here</p>",
        "<ul>",
        "<li>list 1</li>",
        "<li>list 2</li>",
        "</ul>",
        '<pre><code class="language-js">console.log("Hello, World!")',
        "</code></pre>",
        "",
      ].join("\n"),
    );
  });

  test("callout with type with spaces and special characters", async () => {
    const md = dedent`
      > [!type with spaces and special characters + - _ : ! & " ' ...]
      > body here
    `;

    const { html } = await process(md, {
      callouts: ["info"],
      onUnknownCallout: (callout) => {
        const unknownCallout: Callout = {
          type: callout.type,
          isFoldable: callout.isFoldable,
        };

        if (callout.title != null) {
          unknownCallout.title = callout.title;
        }

        return unknownCallout;
      },
    });
    const doc = parser.parseFromString(html, "text/html");

    const callout = doc.querySelector("[data-callout]");
    expect(callout).not.toBe(null);
    expect(callout?.getAttribute("data-callout-type")).toBe(
      `type-with-spaces-and-special-characters-+---_-:-!-&-"-'-...`,
    );

    const calloutTitle = callout?.querySelector("[data-callout-title]");
    expect(calloutTitle?.textContent).toBe(
      `Type with spaces and special characters + - _ : ! & " ' ...`,
    );
  });

  test("foldable callout (-)", async () => {
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
    expect(callout).not.toBe(null);
    expect(callout?.getAttribute("data-callout-type")).toBe("warn");
    expect(callout?.tagName.toLowerCase()).toBe("details");
    expect(callout?.getAttribute("open")).toBe(null);

    const calloutTitle = callout?.querySelector("[data-callout-title]");
    expect(calloutTitle?.innerHTML).toBe("title here <code>inline code</code>");

    const calloutBody = callout?.querySelector("[data-callout-body]");
    expect(calloutBody?.innerHTML).toBe(
      [
        "",
        "<p>body first line <code>code</code> here</p>",
        "<ul>",
        "<li>list 1</li>",
        "<li>list 2</li>",
        "</ul>",
        '<pre><code class="language-js">console.log("Hello, World!")',
        "</code></pre>",
        "",
      ].join("\n"),
    );
  });

  test("foldable callout (+)", async () => {
    const md = dedent`
      > [!warn]+ title here \`inline code\`
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
    expect(callout).not.toBe(null);
    expect(callout?.getAttribute("data-callout-type")).toBe("warn");
    expect(callout?.tagName.toLowerCase()).toBe("details");
    expect(callout?.getAttribute("open")).not.toBe(null);

    const calloutTitle = callout?.querySelector("[data-callout-title]");
    expect(calloutTitle?.innerHTML).toBe("title here <code>inline code</code>");

    const calloutBody = callout?.querySelector("[data-callout-body]");
    expect(calloutBody?.innerHTML).toBe(
      [
        "",
        "<p>body first line <code>code</code> here</p>",
        "<ul>",
        "<li>list 1</li>",
        "<li>list 2</li>",
        "</ul>",
        '<pre><code class="language-js">console.log("Hello, World!")',
        "</code></pre>",
        "",
      ].join("\n"),
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
    expect(callout).not.toBe(null);
    expect(callout?.getAttribute("data-callout-type")).toBe("warn");
    expect(callout?.tagName.toLowerCase()).toBe("div");
    expect(callout?.getAttribute("open")).toBe(null);
    expect(
      callout?.querySelector("[data-callout-body]")?.children[0].innerHTML,
    ).toBe("body <strong>first</strong> <em>line</em> <code>code</code> here");
  });

  test("options.root", async () => {
    const md = dedent`
      > [!warn] title here
      > body here
    `;

    const { html } = await process(md, {
      root: (callout) => ({
        tagName: "callout",
        properties: {
          calloutType: callout.type,
          isFoldable: String(callout.isFoldable),
        },
      }),
    });

    const doc = parser.parseFromString(html, "text/html");

    const callout = doc.querySelector("callout");
    expect(callout).not.toBe(null);
    expect(callout?.getAttribute("calloutType")).toBe("warn");
    expect(callout?.getAttribute("isFoldable")).toBe("false");
    expect(callout?.getAttribute("open")).toBe(null);

    const calloutTitle = callout?.querySelector("[data-callout-title]");
    expect(calloutTitle?.textContent).toBe("title here");

    const calloutBody = callout?.querySelector("[data-callout-body]");
    expect(calloutBody?.children[0].textContent).toBe("body here");
  });

  test("options.title", async () => {
    const md = dedent`
      > [!warn] title here
      > body here
    `;

    const { html } = await process(md, {
      title: (callout) => ({
        tagName: "h2",
        properties: {
          className: "callout-title",
          calloutType: callout.type,
        },
      }),
    });

    const doc = parser.parseFromString(html, "text/html");

    const calloutTitle = doc.querySelector(".callout-title");
    expect(calloutTitle).not.toBe(null);
    expect(calloutTitle?.getAttribute("calloutType")).toBe("warn");
    expect(calloutTitle?.textContent).toBe("title here");
  });

  test("options.icon when children is hast", async () => {
    const md = dedent`
      > [!note] title here
      > body here
    `;

    const { html } = await process(md, {
      icon: () => ({
        tagName: "div",
        properties: {
          className: "callout-icon",
        },
        children: [
          {
            type: "element",
            tagName: "svg",
            properties: {
              className: "lucide-pencil",
              xmlns: "http://www.w3.org/2000/svg",
              width: "32",
              height: "32",
              viewBox: "0 0 24 24",
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: {
                  fill: "none",
                  stroke: "#888888",
                  strokeLineCap: "round",
                  strokeLineJoin: "round",
                  strokeWidth: "2",
                  d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4",
                },
                children: [],
              },
            ],
          },
        ],
      }),
    });

    const doc = parser.parseFromString(html, "text/html");

    const title = doc.querySelector("[data-callout-title]");

    const icon = title?.querySelector(".callout-icon");
    expect(icon).not.toBe(null);

    const iconSvg = icon?.querySelector("svg");
    expect(iconSvg).not.toBe(null);
    expect(iconSvg?.getAttribute("class")).toBe("lucide-pencil");
  });

  test("options.icon when children is string", async () => {
    const md = dedent`
      > [!warn] title here
      > body here
    `;

    const { html } = await process(md, {
      icon: (callout) => ({
        tagName: "div",
        properties: {
          className: "callout-icon",
        },
        children:
          callout.type === "warn"
            ? '<svg class="lucide-circle-alert" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>' // lucide:circle-alert
            : '<svg class="lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/></svg>', // lucide:pencil,
      }),
    });

    const doc = parser.parseFromString(html, "text/html");

    const title = doc.querySelector("[data-callout-title]");

    const icon = title?.querySelector(".callout-icon");
    expect(icon).not.toBe(null);

    const iconSvg = icon?.querySelector("svg");
    expect(iconSvg).not.toBe(null);
    expect(iconSvg?.getAttribute("class")).toBe("lucide-circle-alert");
  });

  test("options.icon when icon is string", async () => {
    const md = dedent`
      > [!note] title here
      > body here
    `;

    const { html } = await process(md, {
      icon: '<svg class="lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/></svg>',
    });

    const doc = parser.parseFromString(html, "text/html");

    const title = doc.querySelector("[data-callout-title]");

    const svgIcon = title?.querySelector("svg");
    expect(svgIcon).not.toBe(null);
    expect(svgIcon?.getAttribute("class")).toBe("lucide-pencil");
  });

  test("options.icon when icon is undefined", async () => {
    const md = dedent`
      > [!note] title here
      > body here
    `;

    const { html } = await process(md, {
      icon: () => undefined,
    });

    const doc = parser.parseFromString(html, "text/html");

    const svgIcon = doc.querySelector("svg");
    expect(svgIcon).toBe(null);
  });

  test("options.foldIcon when children is hast", async () => {
    const md = dedent`
      > [!note]- title here
      > body here
    `;

    const { html } = await process(md, {
      foldIcon: () => ({
        tagName: "div",
        properties: {
          className: "callout-fold-icon",
        },
        children: [
          {
            type: "element",
            tagName: "svg",
            properties: {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLineCap: "round",
              strokeLineJoin: "round",
              className: ["lucide", "lucide-chevron-right"],
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: { d: "m9 18 6-6-6-6" },
                children: [],
                position: {
                  start: { line: 1, column: 218, offset: 217 },
                  end: { line: 1, column: 243, offset: 242 },
                },
              },
            ],
          },
        ],
      }),
    });

    const doc = parser.parseFromString(html, "text/html");

    const title = doc.querySelector("[data-callout-title]");

    const foldIcon = title?.querySelector(".callout-fold-icon");
    expect(foldIcon).not.toBe(null);

    const foldIconSvg = foldIcon?.querySelector("svg");
    expect(foldIconSvg).not.toBe(null);
    expect(foldIconSvg?.getAttribute("class")).toBe(
      "lucide lucide-chevron-right",
    );
  });

  test("options.foldIcon when children is string", async () => {
    const md = dedent`
      > [!note]- title here
      > body here
    `;

    const { html } = await process(md, {
      foldIcon: (callout) =>
        callout.isFoldable
          ? {
              tagName: "div",
              properties: {
                className: "callout-fold-icon",
              },
              children:
                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>', // lucide:chevron-right
            }
          : undefined,
    });

    const doc = parser.parseFromString(html, "text/html");

    const title = doc.querySelector("[data-callout-title]");

    const foldIcon = title?.querySelector(".callout-fold-icon");
    expect(foldIcon).not.toBe(null);

    const foldIconSvg = foldIcon?.querySelector("svg");
    expect(foldIconSvg).not.toBe(null);
    expect(foldIconSvg?.getAttribute("class")).toBe(
      "lucide lucide-chevron-right",
    );
  });

  test("options.foldIcon when icon is string", async () => {
    const md = dedent`
      > [!note]- title here
      > body here
    `;

    const { html } = await process(md, {
      foldIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',
    });

    const doc = parser.parseFromString(html, "text/html");

    const title = doc.querySelector("[data-callout-title]");

    const foldIconSvg = title?.querySelector("svg");
    expect(foldIconSvg).not.toBe(null);
    expect(foldIconSvg?.getAttribute("class")).toBe(
      "lucide lucide-chevron-right",
    );
  });

  test("options.foldIcon when icon is undefined", async () => {
    const md = dedent`
      > [!note]- title here
      > body here
    `;

    const { html } = await process(md, {
      foldIcon: () => undefined,
    });

    const doc = parser.parseFromString(html, "text/html");

    const foldIconSvg = doc.querySelector("svg");
    expect(foldIconSvg).toBe(null);
  });

  test("options.callouts", async () => {
    for (const calloutType of ["info", "warn", "error"]) {
      const md = dedent`
        > [!${calloutType}] title here
        > body here
      `;

      const { html } = await process(md, {
        callouts: ["info", "warn"],
      });

      const doc = parser.parseFromString(html, "text/html");

      switch (calloutType) {
        case "info":
        case "warn": {
          const callout = doc.querySelector("[data-callout]");
          expect(callout).not.toBe(null);
          expect(callout?.getAttribute("data-callout-type")).toBe(calloutType);
          expect(callout?.tagName.toLowerCase()).toBe("div");
          expect(callout?.getAttribute("open")).toBe(null);

          const calloutTitle = callout?.querySelector("[data-callout-title]");
          expect(calloutTitle?.textContent).toBe("title here");

          const calloutBody = callout?.querySelector("[data-callout-body]");
          expect(calloutBody?.children[0].textContent).toBe("body here");
          break;
        }

        case "error": {
          const callout = doc.querySelector("[data-callout]");
          expect(callout).toBe(null);
          break;
        }
      }
    }
  });

  test("options.onUnknownCallout", async () => {
    const md = dedent`
      > [!warn] title here
      > body here
    `;

    const { html } = await process(md, {
      callouts: ["info"],
      onUnknownCallout: (callout) => {
        return {
          type: "info",
          isFoldable: callout.isFoldable,
          title: callout.title,
        };
      },
    });

    const doc = parser.parseFromString(html, "text/html");

    const callout = doc.querySelector("[data-callout]");
    expect(callout).not.toBe(null);
    expect(callout?.getAttribute("data-callout-type")).toBe("info");
    expect(callout?.tagName.toLowerCase()).toBe("div");
    expect(callout?.getAttribute("open")).toBe(null);

    const calloutTitle = callout?.querySelector("[data-callout-title]");
    expect(calloutTitle?.textContent).toBe("title here");

    const calloutBody = callout?.querySelector("[data-callout-body]");
    expect(calloutBody?.children[0].textContent).toBe("body here");
  });
});
