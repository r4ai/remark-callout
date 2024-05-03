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
import rehypeStringify from "rehype-stringify";

const md = `
  > [!note] title here
  > body here
`;

const html = unified()
  .use(remarkParse)
  .use(remarkCallout)
  .use(remarkRehype)
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

   https://github.com/r4ai/remark-callout/blob/40d857e9885d335ca0c688d6eb2755e54dd2567b/packages/website/src/pages/playground/_callout.css#L1-L384

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
export type Options = {
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
  root?: NodeOptions | NodeOptionsFunction;

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
  title?: NodeOptions | NodeOptionsFunction;

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
  body?: NodeOptions | NodeOptionsFunction;

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
   * The html properties of the node.
   *
   * @see https://github.com/syntax-tree/hast?tab=readme-ov-file#properties
   * @see https://github.com/syntax-tree/hast?tab=readme-ov-file#element
   * @example { "className": "callout callout-info" }
   */
  properties: Properties;
};

export type NodeOptionsFunction = (callout: Callout) => NodeOptions;

export type Callout = {
  /**
   * The type of the callout.
   */
  type: string;

  /**
   * Whether the callout is foldable.
   */
  isFoldable: boolean;

  /**
   * Whether the callout is folded by default.
   */
  defaultFolded?: boolean;

  /**
   * The title of the callout.
   */
  title?: string;
};
```

Default options:

```ts
export const defaultOptions: Required<Options> = {
  root: (callout) => ({
    tagName: callout.isFoldable ? "details" : "div",
    properties: {
      dataCallout: true,
      dataCalloutType: callout.type,
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

To install dependencies:

```bash
bun install
```

To run tests with web ui:

```bash
bun run test --ui
```

To build the project:

```bash
bun run build
```
