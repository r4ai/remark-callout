# remark-callout

[![npm version](https://badge.fury.io/js/@r4ai%2Fremark-callout.svg)](https://badge.fury.io/js/@r4ai%2Fremark-callout)
[![test coverage](https://codecov.io/gh/r4ai/remark-callout/graph/badge.svg?token=UFE88Y0Y8B)](https://codecov.io/gh/r4ai/remark-callout)
[![CI](https://github.com/r4ai/remark-callout/actions/workflows/ci.yml/badge.svg)](https://github.com/r4ai/remark-callout/actions/workflows/ci.yml)
[![Release](https://github.com/r4ai/remark-callout/actions/workflows/cd.yml/badge.svg)](https://github.com/r4ai/remark-callout/actions/workflows/cd.yml)
[![CodeQL](https://github.com/r4ai/remark-callout/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/r4ai/remark-callout/actions/workflows/github-code-scanning/codeql)

[![NPM](https://nodei.co/npm/@r4ai/remark-callout.png)](https://nodei.co/npm/@r4ai/remark-callout/)

> [!important]
> Website: [https://r4ai.github.io/remark-callout](https://r4ai.github.io/remark-callout)

A remark plugin to add obsidian style callouts to markdown.

```md
> [!note] title here
> body here
```

## Installation

```sh
# npm
npm install @r4ai/remark-callout

# pnpm
pnpm install @r4ai/remark-callout

# bun
bun add @r4ai/remark-callout
```

## Usage

See [Usage](https://r4ai.github.io/remark-callout/docs/en/#usage).

## Quick Start

### Vanilla JS

```ts
import remarkParse from "remark-parse";
import { unified } from "unified";
import remarkCallout from "@r4ai/remark-callout";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const md = `
  > [!note] title here
  > body here
`;

const html = unified()
  .use(remarkParse)
  .use(remarkCallout)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStringify)
  .processSync(md)
  .toString();

console.log(html);
```

yields:

```html
<div data-callout data-callout-type="note">
  <div data-callout-title>title here</div>
  <div data-callout-body>
    <p>body here</p>
  </div>
</div>
```

> [!WARNING]
> To display the callout icon as HTML using `options.icon` or `options.foldIcon`, you need to set the `allowDangerousHtml` option to `true` in `remark-rehype` and add `rehype-raw` as a plugin.

### Astro

1. Install the plugin:

   ```sh
   npm install @r4ai/remark-callout
   ```

2. Add `@r4ai/remark-callout` to remark plugins in your astro config file (e.g. `astro.config.ts`):

   ```ts
   // astro.config.ts
   import remarkCallout from "@r4ai/remark-callout";

   export default defineConfig({
     // ...
     markdown: {
       // ...
       remarkPlugins: [
         // ...
         remarkCallout,
       ],
     },
   });
   ```

   Note: This plugin works fine in MDX files as well. For instructions on how to use MDX with Astro, see [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/).

3. Start using callouts in your markdown or mdx files:

   ```md
   > [!note] title here
   > body here
   ```

   yields:

   ```html
   <div data-callout data-callout-type="note">
     <div data-callout-title>title here</div>
     <div data-callout-body>
       <p>body here</p>
     </div>
   </div>
   ```

   Now you can style the callouts using CSS. Following is an example of how you can style the callouts using Tailwind CSS:

   <https://github.com/r4ai/remark-callout/blob/40d857e9885d335ca0c688d6eb2755e54dd2567b/packages/website/src/pages/playground/_callout.css#L1-L384>

   Or if you are using MDX, you can use custom components to style the callouts:

   ```ts
   // astro.config.ts
   import { remarkCallout } from "@r4ai/remark-callout";

   export default defineConfig({
     // ...
     markdown: {
       // ...
       remarkPlugins: [
         // ...
         [
           remarkCallout,
           {
             root: (callout) => ({
               tagName: "callout",
               properties: {
                 calloutType: callout.type,
                 isFoldable: String(callout.isFoldable),
               },
             }),
             title: (callout) => ({
               tagName: "callout-title",
               properties: {
                 calloutType: callout.type,
                 isFoldable: String(callout.isFoldable),
               },
             }),
           },
         ],
       ],
     },
   });
   ```

   ```astro
   ---
   // src/components/Callout.astro

   type Props = {
     calloutType: string
     isFoldable: boolean
   }
   const { calloutType, isFoldable } = Astro.props
   ---

   <div
     class={/* Your TailwindCSS style here */}
   >
     <slot />
   </div>
   ```

   ```astro
   ---
   // src/components/CalloutTitle.astro

   type Props = {
     callouType: string
     isFoldable: boolean
   }
   const { calloutType, isFoldable } = Astro.props
   ---

   <div
     class={/* Your TailwindCSS style here */}
   >
     <SomeIconComponent />
     <slot />
   </div>
   ```

   ```astro
   ---
   // src/pages/callout-example.astro

   import { Content, components } from "../content.mdx";
   import Callout from "../components/Callout.astro";
   import CalloutTitle from "../components/CalloutTitle.astro";
   ---

   <Content components={{ ...components, callout: Callout, "callout-title": CalloutTitle }} />
   ```

## Options

Options type:

```ts
export type Options = OptionsBuilder<NodeOptions | NodeOptionsFunction>;

export type OptionsBuilder<N> = {
  /**
   * The root node of the callout.
   *
   * @default
   * (callout) => ({
   *   tagName: callout.isFoldable ? "details" : "div",
   *   properties: {
   *     dataCallout: true,
   *     dataCalloutType: callout.type,
   *     open: callout.defaultFolded === undefined ? false : !callout.defaultFolded,
   *   },
   * })
   */
  root?: N;

  /**
   * The title node of the callout.
   *
   * @default
   * (callout) => ({
   *   tagName: callout.isFoldable ? "summary" : "div",
   *   properties: {
   *     dataCalloutTitle: true,
   *   },
   * })
   */
  title?: N;

  /**
   * The body node of the callout.
   *
   * @default
   * () => ({
   *   tagName: "div",
   *   properties: {
   *     dataCalloutBody: true,
   *   },
   * })
   */
  body?: N;

  /**
   * The icon node of the callout.
   *
   * The icon node is added in the title node before the title text.
   *
   * - If `undefined`, no icon is added.
   * - If a `string`, the string is added as HTML in the title node before the title text.
   * - If a `object`, the object is added as a node before the title text.
   *
   * @example
   * () => '<svg class="lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/></svg>' // lucide:pencil
   *
   * @example
   * (callout) => ({
   *   tagName: "div",
   *   properties: {
   *     className: "callout-icon",
   *   },
   *   children:
   *     callout.type === "warn"
   *       ? '<svg class="lucide-circle-alert" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>' // lucide:circle-alert
   *       : '<svg class="lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/></svg>', // lucide:pencil
   * })
   *
   * @default
   * () => undefined
   */
  icon?: Optional<WithChildren<N>>;

  /**
   * The fold icon node of the callout.
   *
   * The fold icon node is added in the title node after the title text.
   *
   * - If `undefined`, no fold icon is added.
   * - If a `string`, the string is added as HTML in the title node after the title text.
   * - If a `object`, the object is added as a node after the title text.
   *
   * @example
   * (callout) =>
   *   callout.isFoldable
   *     ? {
   *         tagName: "div",
   *         properties: {
   *           className: "callout-fold-icon",
   *         },
   *         children:
   *           '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>', // lucide:chevron-right
   *       }
   *     : undefined,
   *
   * @default
   * () => undefined
   */
  foldIcon?: Optional<WithChildren<N>>;

  /**
   * A list of callout types that are supported.
   * - If `undefined`, all callout types are supported. This means that this plugin will not check if the given callout type is in `callouts` and never call `onUnknownCallout`.
   * - If a list, only the callout types in the list are supported. This means that if the given callout type is not in `callouts`, this plugin will call `onUnknownCallout`.
   * @example ["info", "warning", "danger"]
   * @default undefined
   */
  callouts?: string[] | null;

  /**
   * A function that is called when the given callout type is not in `callouts`.
   *
   * - If the function returns `undefined`, the callout is ignored. This means that the callout is rendered as a normal blockquote.
   * - If the function returns a `Callout`, the callout is replaced with the returned `Callout`.
   */
  onUnknownCallout?: (callout: Callout, file: VFile) => Callout | undefined;
};

export type NodeOptions = {
  /**
   * The HTML tag name of the node.
   *
   * @see https://github.com/syntax-tree/hast?tab=readme-ov-file#element
   */
  tagName: string;

  /**
   * The HTML properties of the node.
   *
   * @see https://github.com/syntax-tree/hast?tab=readme-ov-file#properties
   * @see https://github.com/syntax-tree/hast?tab=readme-ov-file#element
   * @example { "className": "callout callout-info" }
   */
  properties: hast.Properties;
};

export type NodeOptionsFunction = (callout: Callout) => NodeOptions;

// biome-ignore lint/suspicious/noExplicitAny: any is necessary for checking if N is a function
export type WithChildren<N> = N extends (...args: any) => any
  ? (...args: Parameters<N>) => WithChildren<ReturnType<N>>
  :
      | (N & {
          /**
           * The HTML children of the node.
           *
           * - If a `string`, the string is added as raw HTML in the node.
           * - If a `object[]`, the object array is added as a hast node.
           *
           * @see https://github.com/syntax-tree/mdast?tab=readme-ov-file#html
           * @see https://github.com/syntax-tree/hast?tab=readme-ov-file#element
           *
           * @example '<span class="icon">📝</span>'
           *
           * @example
           * [
           *   {
           *     type: "element",
           *     tagName: "span",
           *     properties: { className: ["icon"] },
           *     children: [
           *       {
           *         type: "text",
           *         value: "📝",
           *       },
           *     ],
           *   }
           * ]
           */
          children: hast.ElementContent[] | string;
        })
      | string;

// biome-ignore lint/suspicious/noExplicitAny: any is necessary for checking if T is a function
export type Optional<T> = T extends (args: any) => any
  ? (...args: Parameters<T>) => Optional<ReturnType<T>>
  : T | undefined;
```

Default options:

```ts
export const defaultOptions: Required<Options> = {
  root: (callout) => ({
    tagName: callout.isFoldable ? "details" : "div",
    properties: {
      dataCallout: true,
      dataCalloutType: formatForAttribute(callout.type),
      open:
        callout.defaultFolded === undefined ? false : !callout.defaultFolded,
    },
  }),
  title: (callout) => ({
    tagName: callout.isFoldable ? "summary" : "div",
    properties: {
      dataCalloutTitle: true,
    },
  }),
  icon: () => undefined,
  foldIcon: () => undefined,
  body: () => ({
    tagName: "div",
    properties: {
      dataCalloutBody: true,
    },
  }),
  callouts: null,
  onUnknownCallout: () => undefined,
};
```

## Development

### Commands

| Command                 | Description             |
| ----------------------- | ----------------------- |
| `bun install`           | Install dependencies    |
| `bun run build`         | Build the packages      |
| `bun run test`          | Run tests               |
| `bun run test:coverage` | Run tests with coverage |
| `bun run check`         | Check the code          |
| `bun run check:write`   | Check and fix the code  |
| `bun run changeset`     | Create a changeset      |

### Directory Structure

| Directory                 | Description                                  |
| ------------------------- | -------------------------------------------- |
| `examples/nextjs`         | Example Next.js project                      |
| `packages/remark-callout` | The remark-callout package                   |
| `packages/website`        | The documentation website for remark-callout |

### Getting Started

1. Install dependencies:

   ```bash
   bun install
   ```

2. Build the packages:

   ```bash
   bun run build
   ```

3. Check and fix the code:

   ```bash
   bun run check:write
   ```

4. Run tests with coverage:

   ```bash
   bun run test:coverage
   ```

5. Launch the documentation website:

   ```bash
   bun run --cwd packages/website dev
   ```
