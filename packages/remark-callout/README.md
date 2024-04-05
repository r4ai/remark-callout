# remark-callout

[![npm version](https://badge.fury.io/js/@r4ai%2Fremark-callout.svg)](https://badge.fury.io/js/@r4ai%2Fremark-callout)
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
<div data-callout data-callout-type="note" data-callout-is-foldable="false">
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
   <div data-callout data-callout-type="note" data-callout-is-foldable="false">
     <div data-callout-title>title here</div>
     <div data-callout-body>
       <p>body here</p>
     </div>
   </div>
   ```

   Now you can style the callouts using CSS. Following is an example of how you can style the callouts using Tailwind CSS:

   ```css
   [data-callout] {
     & {
       @apply my-6 space-y-2 rounded-lg border border-blue-600/20 bg-blue-400/20 p-4 pb-5 dark:border-blue-800/20 dark:bg-blue-600/10;
     }

     & > [data-callout-title] {
       & {
         @apply flex flex-row items-start gap-2 p-0 font-bold text-blue-500;
       }

       &:not:only-child {
         @apply mb-2;
       }

       &:empty::after {
         content: "Note";
       }

       &[data-is-foldable="true"] {
         & {
           @apply cursor-pointer;
         }

         &::after {
           @apply w-full bg-contain bg-right bg-no-repeat;
           content: "Note";

           /* lucide:chevron-right */
           background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg4ODg4OCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIGQ9Im05IDE4bDYtNmwtNi02Ii8+PC9zdmc+");
         }
       }

       &::before {
         @apply mt-1 block h-5 w-5 bg-current content-[""];
         mask-repeat: no-repeat;
         mask-size: cover;

         /* lucide-pencil */
         mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTE3IDNhMi44NSAyLjgzIDAgMSAxIDQgNEw3LjUgMjAuNUwyIDIybDEuNS01LjVabS0yIDJsNCA0Ii8+PC9zdmc+");
       }
     }

     & > [data-callout-body] {
       & {
         @apply space-y-2;
       }

       & > * {
         @apply m-0;
       }
     }
   }

   [data-callout][open] > [data-callout-title]::after {
     /* lucide:chevron-down */
     background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg4ODg4OCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIGQ9Im02IDlsNiA2bDYtNiIvPjwvc3ZnPg==");
   }

   [data-callout][data-callout-type="info"] {
     & {
       @apply border-blue-600/20 bg-blue-400/20 dark:border-blue-800/20 dark:bg-blue-600/10;
     }

     & > [data-callout-title] {
       & {
         @apply text-blue-500;
       }

       &:empty::after {
         content: "Info";
       }

       &::before {
         /* radix-icons:info */
         mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 15 15'%3E%3Cpath fill='currentColor' fill-rule='evenodd' d='M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877ZM1.827 7.5a5.673 5.673 0 1 1 11.346 0a5.673 5.673 0 0 1-11.346 0Zm6.423-3a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0ZM6 6h1.5a.5.5 0 0 1 .5.5V10h1v1H6v-1h1V7H6V6Z' clip-rule='evenodd'/%3E%3C/svg%3E");
       }
     }
   }
   ```

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
   *   tagName: "div",
   *   properties: {
   *     "data-callout-type": callout.type,
   *     "data-callout-is-foldable": String(callout.isFoldable),
   *   },
   * })
   */
  root?: NodeOptions | NodeOptionsFunction;

  /**
   * The title node of the callout.
   *
   * @default
   * {
   *   tagName: "div",
   *   properties: {
   *     dataCalloutTitle: true,
   *   },
   * }
   */
  title?: NodeOptions | NodeOptionsFunction;

  /**
   * The body node of the callout.
   *
   * @default
   * {
   *   tagName: "div",
   *   properties: {
   *     dataCalloutBody: true,
   *   },
   * }
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
    tagName: "div",
    properties: {
      dataCallout: true,
      dataCalloutType: callout.type,
      dataCalloutIsFoldable: String(callout.isFoldable),
      dataCalloutDefaultFolded:
        callout.defaultFolded == null
          ? undefined
          : String(callout.defaultFolded),
    },
  }),
  title: () => ({
    tagName: "div",
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
