[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Data

# Interface: Data

Info associated with hast nodes by the ecosystem.

This space is guaranteed to never be specified by unist or hast.
But you can use it in utilities and plugins to store data.

This type can be augmented to register custom data.
For example:

```ts
declare module 'hast' {
  interface Data {
    // `someNode.data.myId` is typed as `number | undefined`
    myId?: number | undefined
  }
}
```

## Extends

- [`Data`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/interfaces/Data.md)

## Extended by

- [`CommentData`](CommentData.md)
- [`ElementData`](ElementData.md)
- [`TextData`](TextData.md)
- [`RootData`](RootData.md)
- [`DoctypeData`](DoctypeData.md)
