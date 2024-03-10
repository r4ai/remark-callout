# remark-callout

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

### Callout title

Callout title can include any inline element.

```md
> [!note] The **reason** for why _this_ ~~is~~ `true` when $a=1$.
> body here
```

yields:

```html
<div data-callout data-callout-type="note" data-callout-is-foldable="false">
  <div data-callout-title>
    The <strong>reason</strong> for why <em>this</em> <del>is</del>
    <code>true</code> when <code class="language-math math-inline">a=1</code>.
  </div>
  <div data-callout-body>
    <p>body here</p>
  </div>
</div>
```

<!-- prettier-ignore -->
> [!WARNING]
> `remark-gfm` and `remark-math` are required to use strike-through lines and math formulas

### Callout body

Callout body can include any block element.

````md
> [!note] title here
> The **reason** for why _this_ ~~is~~ `true` when $a=1$.
>
> - item 1
> - item 2
>
> ```js
> console.log("Hello, World!");
> ```
>
> $$
> \forall \epsilon > 0, \exists \delta > 0 \text{ s.t. } |x - a| < \delta \Rightarrow |f(x) - b| < \epsilon
> $$
>
> > Done is better than perfect.
````

yields:

```html
<div data-callout data-callout-type="note" data-callout-is-foldable="false">
  <div data-callout-title>title here</div>
  <div data-callout-body>
    <p>
      The <strong>reason</strong> for why <em>this</em> <del>is</del>
      <code>true</code> when <code class="language-math math-inline">a=1</code>.
    </p>
    <ul>
      <li>item 1</li>
      <li>item 2</li>
    </ul>
    <pre><code class="language-js">console.log("Hello, World!");
</code></pre>
    <pre><code class="language-math math-display">\forall \epsilon > 0, \exists \delta > 0 \text{ s.t. } |x - a| &#x3C; \delta \Rightarrow |f(x) - b| &#x3C; \epsilon</code></pre>
    <blockquote>
      <p>Done is better than perfect.</p>
    </blockquote>
  </div>
</div>
```

<!-- prettier-ignore -->
> [!WARNING]
> `remark-gfm` and `remark-math` are required to use strike-through lines and math formulas

Callouts can also be nested recursively.

```md
> [!note]
> Nested callout
>
> > [!info]
> > Further nested callout
> >
> > > [!warning]
> > > Even further nested callout
```

yields:

```html
<div data-callout data-callout-type="note" data-callout-is-foldable="false">
  <div data-callout-title></div>
  <div data-callout-body>
    <p>Nested callout</p>
    <div data-callout data-callout-type="info" data-callout-is-foldable="false">
      <div data-callout-title></div>
      <div data-callout-body>
        <p>Further nested callout</p>
        <div
          data-callout
          data-callout-type="warning"
          data-callout-is-foldable="false"
        >
          <div data-callout-title></div>
          <div data-callout-body>
            <p>Even further nested callout</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Foldable callouts

You can make a callout foldable by adding a plus (+) or a minus (-) directly after the type identifier.

A plus sign expands the callout by default, and a minus sign collapses it instead.

```md
> [!note]- title here
> body here
```

yields:

```html
<div
  data-callout
  data-callout-type="note"
  data-callout-is-foldable="true"
  data-callout-default-folded="true"
>
  <div data-callout-title>title here</div>
  <div data-callout-body>
    <p>body here</p>
  </div>
</div>
```

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
   div[data-callout] {
     & {
       @apply my-6 rounded-lg border p-4 pb-5;
     }

     & > div[data-callout-title] {
       & {
         @apply flex flex-row items-start gap-1 p-0 font-bold;
       }

       &:not:only-child {
         @apply mb-2;
       }

       &:empty::after {
         content: "Note";
       }

       &::before {
         @apply mt-1 block h-5 w-5 bg-current content-[""];
         mask-repeat: no-repeat;
         mask-size: cover;

         /* radix-icons:pencil-1 */
         mask-image: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none'  xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11. 1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12. 491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6. 2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3. 14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081  10.7808L4.42166 9.28547Z' fill='currentColor' fill-rule='evenodd' clip-rule='evenodd'%3E%3C/path%3E%3C/ svg%3E");
       }
     }
   }

   div[data-callout][data-callout-type="info"] {
     & {
       @apply border-blue-600/20 bg-blue-500/20 dark:border-blue-800/20;
     }

     & > div[data-callout-title] {
       & {
         @apply text-blue-500;
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
   // src/pages/callout-example.mdx

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
