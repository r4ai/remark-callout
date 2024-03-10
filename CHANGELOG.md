# @r4ai/remark-callout

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
