# @r4ai/remark-callout

## 0.6.2

### Patch Changes

- [#193](https://github.com/r4ai/remark-callout/pull/193) [`d47cda0`](https://github.com/r4ai/remark-callout/commit/d47cda060c1b5806c651c84f64a7640ae87fc2f3) Thanks [@r4ai](https://github.com/r4ai)! - Fix broken bundge link in README

- [#191](https://github.com/r4ai/remark-callout/pull/191) [`bc160f2`](https://github.com/r4ai/remark-callout/commit/bc160f26ab46e1d6aa3e848644657fce7b876544) Thanks [@r4ai](https://github.com/r4ai)! - Add instruction to support nested css with Astro's TailwindCSS integration in README

## 0.6.1

### Patch Changes

- [#157](https://github.com/r4ai/remark-callout/pull/157) [`2fad8ef`](https://github.com/r4ai/remark-callout/commit/2fad8ef1c2d3e6f07805e6920e9b52db90b76e8b) Thanks [@r4ai](https://github.com/r4ai)! - Refactor the type definitions to make it easier to automatically generate the API Reference with Typedoc

## 0.6.0

### Minor Changes

- [#146](https://github.com/r4ai/remark-callout/pull/146) [`ca1e884`](https://github.com/r4ai/remark-callout/commit/ca1e884790446751e1d536e44827c3fa111eb4db) Thanks [@r4ai](https://github.com/r4ai)! - Don't render callout body when it is empty.

- [#149](https://github.com/r4ai/remark-callout/pull/149) [`93b6571`](https://github.com/r4ai/remark-callout/commit/93b65711c02a2fad2ea20572f57d58f7462f7b1b) Thanks [@r4ai](https://github.com/r4ai)! - Add `options.titleInner` to specify the HTML element that wraps the text of the callout title

- [#144](https://github.com/r4ai/remark-callout/pull/144) [`fe26ccb`](https://github.com/r4ai/remark-callout/commit/fe26ccb071624eec4f7dace1b0a6ab6c12759aab) Thanks [@r4ai](https://github.com/r4ai)! - Don't render an empty paragraph when the callout body is empty

- [#150](https://github.com/r4ai/remark-callout/pull/150) [`156f660`](https://github.com/r4ai/remark-callout/commit/156f6602a49da26e6b163d43583abc4290f83008) Thanks [@r4ai](https://github.com/r4ai)! - Fixed an issue where the body was rendered as the title in callouts with a title consisting only of line breaks

## 0.5.0

### Minor Changes

- [#127](https://github.com/r4ai/remark-callout/pull/127) [`d3aca4c`](https://github.com/r4ai/remark-callout/commit/d3aca4c6e0096ea7dcdd8f4f40b84f8939f1bfa2) Thanks [@eikowagenknecht](https://github.com/eikowagenknecht)! - Format attributes with spaces like Obsidian does it #113

- [#128](https://github.com/r4ai/remark-callout/pull/128) [`2835def`](https://github.com/r4ai/remark-callout/commit/2835def3e0fd7367a465cd7040c88b6754aa4a1a) Thanks [@r4ai](https://github.com/r4ai)! - Add options to add icon and foldIcon

- [#123](https://github.com/r4ai/remark-callout/pull/123) [`f8f2eac`](https://github.com/r4ai/remark-callout/commit/f8f2eac41b1382e460cf8183344b50f563170cf0) Thanks [@eikowagenknecht](https://github.com/eikowagenknecht)! - Fix regular expressions accepting invalid syntax #115

- [`d40d5b9`](https://github.com/r4ai/remark-callout/commit/d40d5b95dfbcc37c6c8df18c888a3660b38771c1) Thanks [@eikowagenknecht](https://github.com/eikowagenknecht)! - Handle titles like obsidian

### Patch Changes

- [#104](https://github.com/r4ai/remark-callout/pull/104) [`a1be19e`](https://github.com/r4ai/remark-callout/commit/a1be19e89d6651612904b6a4a55484c4e64a9f46) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependency rimraf to v6

## 0.4.0

### Minor Changes

- cd5d841: Fix error when encountering empty blockquote

## 0.3.4

### Patch Changes

- 6580da7: Fix tsconfig to generate ESM output

## 0.3.3

### Patch Changes

- a9ab147: chore: add exports field to package.json

## 0.3.2

### Patch Changes

- 4d3be99: Update README

## 0.3.1

### Patch Changes

- 93e078b: chore(deps): update dependency node to v21.7.2
- ca618dd: chore(deps): update dependency bun to v1.1.1

## 0.3.0

### Minor Changes

- faede33: \[**BREAKING**\] Change default output HTML structure to use the details tag in collapsible callouts

  This changes the default option as follows:

  ```diff
    export const defaultOptions: Required<Options> = {
      root: (callout) => ({
  -     tagName: "div",
  +     tagName: callout.isFoldable ? "details" : "div",
        properties: {
          dataCallout: true,
          dataCalloutType: callout.type,
  -       dataCalloutIsFoldable: String(callout.isFoldable),
  -       dataCalloutDefaultFolded:
  -         callout.defaultFolded == null
  -           ? undefined
  -           : String(callout.defaultFolded),
  +       open:
  +         callout.defaultFolded === undefined ? false : !callout.defaultFolded,
        },
      }),
      title: () => ({
  -     tagName: "div",
  +     tagName: callout.isFoldable ? "summary" : "div",
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

  When callout is foldable, it will use the `details` tag for the root and the `summary` tag for the title. The `detaCalloutIsFoldable` and `dataCalloutDefaultFolded` attributes are removed in favor of the `open` attribute.

  > [!important]
  > Note that the explicit setting of the following options will produce the same HTML-structured output as before:
  >
  > ```ts
  > import remarkParse from "remark-parse";
  > import { unified } from "unified";
  > import remarkCallout from "@r4ai/remark-callout";
  > import remarkRehype from "remark-rehype";
  > import rehypeStringify from "rehype-stringify";
  >
  > const md = `
  >   > [!note] title here
  >   > body here
  > `;
  >
  > const html = unified()
  >   .use(remarkParse)
  >   .use(remarkCallout, {
  >     root: (callout) => ({
  >       tagName: "div",
  >       properties: {
  >         dataCallout: true,
  >         dataCalloutType: callout.type,
  >         dataCalloutIsFoldable: String(callout.isFoldable),
  >         dataCalloutDefaultFolded:
  >           callout.defaultFolded == null
  >             ? undefined
  >             : String(callout.defaultFolded),
  >       },
  >     }),
  >     title: () => ({
  >       tagName: "div",
  >       properties: {
  >         dataCalloutTitle: true,
  >       },
  >     }),
  >   })
  >   .use(remarkRehype)
  >   .use(rehypeStringify)
  >   .processSync(md)
  >   .toString();
  >
  > console.log(html);
  > ```
  >
  > yields:
  >
  > ```html
  > <div data-callout data-callout-type="note" data-callout-is-foldable="false">
  >   <div data-callout-title>title here</div>
  >   <div data-callout-body>
  >     <p>body here</p>
  >   </div>
  > </div>
  > ```

### Patch Changes

- 552fae9: make repository mono-repository

## 0.2.0

### Minor Changes

- e7f21b3: ## Breaking Changes

  In v0.2.0, option to specify a HTML tag for the Body portion of the Callout is added.

  For example, In v0.1.x,

  ```md
  > [!note] title here
  > body here
  ```

  would be rendered as follows:

  ```html
  <div data-callout data-callout-type="note" data-callout-is-foldable="false">
    <div data-callout-title>title here</div>
    <p>body here</p>
  </div>
  ```

  however, in v0.2.0, the previous markdown is rendered as follows

  ```html
  <div data-callout data-callout-type="note" data-callout-is-foldable="false">
    <div data-callout-title>title here</div>
    <div data-callout-body>
      <p>body here</p>
    </div>
  </div>
  ```

  This change is a breaking change because it changes the structure of the rendered HTML. If you have any custom CSS or JavaScript that relies on the structure of the rendered HTML, you will need to update it to account for this change.

  Now you can specify a HTML tag and HTML attributes for the Body portion of the Callout by using the `body` option.

  Example:

  ```ts
  import remarkParse from "remark-parse";
  import { unified } from "unified";
  import remarkCallout from "../src/index";
  import remarkRehype from "remark-rehype";
  import rehypeStringify from "rehype-stringify";

  const md = `
    > [!note] title here
    > body here
  `;

  const html = unified()
    .use(remarkParse)
    .use(remarkCallout, {
      body: {
        tagName: "callout-body",
        properties: {
          className: "callout-body",
        },
      },
    })
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(md)
    .toString();

  console.log(html);
  ```

  yields

  ```html
  <div data-callout data-callout-type="note" data-callout-is-foldable="false">
    <div data-callout-title>title here</div>
    <callout-body class="callout-body">
      <p>body here</p>
    </callout-body>
  </div>
  ```

## 0.1.2

### Patch Changes

- 2106040: Update Copyright year to 2024

## 0.1.1

### Patch Changes

- d818fba: Fix typo in README.md

## 0.1.0

### Minor Changes

- e5eeb2f: Initialize the project.
