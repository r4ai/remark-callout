[**@r4ai/remark-callout**](../README.md) • **Docs**

***

[@r4ai/remark-callout](../globals.md) / NodeOptionsWithChildren

# Type Alias: NodeOptionsWithChildren

> **NodeOptionsWithChildren**: [`NodeOptions`](NodeOptions.md) & `object`

## Type declaration

### children

> **children**: [`ElementContent`](../-internal-/type-aliases/ElementContent.md)[] \| `string`

The HTML children of the node.

- If a `string`, the string is added as raw HTML in the node.
- If a `object[]`, the object array is added as a hast node.

#### See

 - https://github.com/syntax-tree/mdast?tab=readme-ov-file#html
 - https://github.com/syntax-tree/hast?tab=readme-ov-file#element

#### Examples

```ts
'<span class="icon">📝</span>'
```

```ts
[
  {
    type: "element",
    tagName: "span",
    properties: { className: ["icon"] },
    children: [
      {
        type: "text",
        value: "📝",
      },
    ],
  }
]
```

## Defined in

[packages/remark-callout/src/plugin.ts:210](https://github.com/r4ai/remark-callout/blob/92c94b708c2f6bdda389d15e8cae58ca30d48f99/packages/remark-callout/src/plugin.ts#L210)
