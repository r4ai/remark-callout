---
"@r4ai/remark-callout": minor
---

\[**BREAKING**\] Change default output HTML structure to use the details tag in collapsible callouts

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
