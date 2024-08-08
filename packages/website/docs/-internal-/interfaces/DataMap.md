[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / DataMap

# Interface: DataMap

This map registers the type of the `data` key of a `VFile`.

This type can be augmented to register custom `data` types.

## Example

```ts
declare module 'vfile' {
  interface DataMap {
    // `file.data.name` is typed as `string`
    name: string
  }
}
```

## Properties

### \[emptyObjectSymbol\]?

> `optional` **\[emptyObjectSymbol\]**: `undefined`

#### Defined in

node\_modules/vfile/index.d.ts:79
