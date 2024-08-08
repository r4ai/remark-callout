[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Callable

# Type Alias: Callable\<T\>

> **Callable**\<`T`\>: `{ [P in keyof T]: ExtractFunction<T[P]> extends never ? T[P] : ExtractFunction<T[P]> }`

## Type Parameters

• **T**

## Defined in

[packages/remark-callout/src/plugin.ts:243](https://github.com/r4ai/remark-callout/blob/92c94b708c2f6bdda389d15e8cae58ca30d48f99/packages/remark-callout/src/plugin.ts#L243)
