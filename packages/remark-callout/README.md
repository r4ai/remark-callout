# remark-callout

[![npm version](https://badge.fury.io/js/@r4ai%2Fremark-callout.svg)](https://badge.fury.io/js/@r4ai%2Fremark-callout)
[![test coverage](https://codecov.io/gh/r4ai/remark-callout/graph/badge.svg?token=UFE88Y0Y8B)](https://codecov.io/gh/r4ai/remark-callout)
[![CI](https://github.com/r4ai/remark-callout/actions/workflows/ci.yml/badge.svg)](https://github.com/r4ai/remark-callout/actions/workflows/ci.yml)
[![Release](https://github.com/r4ai/remark-callout/actions/workflows/deploy-packages.yml/badge.svg)](https://github.com/r4ai/remark-callout/actions/workflows/deploy-packages.yml)
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

   To use the above CSS, you need to configure Astro's TailwindCSS integration to support nested syntax:

   ```ts
   // astro.config.ts
   import { defineConfig } from 'astro/config';
   import tailwind from '@astrojs/tailwind';

   export default defineConfig({
     integrations: [
       tailwind({
         // Example: Allow writing nested CSS declarations
         // alongside Tailwind's syntax
         nesting: true,
       }),
     ],
   });
   ```

   cf. <https://docs.astro.build/en/guides/integrations-guide/tailwind/#nesting>

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

See [r4ai.github.io/remark-callout/docs/en/api-reference/type-aliases/options](https://r4ai.github.io/remark-callout/docs/en/api-reference/type-aliases/options)

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
