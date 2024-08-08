[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Run

# Type Alias: Run()

> **Run**: (...`input`) => `void`

Call all middleware.

Calls `done` on completion with either an error or the output of the
last middleware.

> 👉 **Note**: as the length of input defines whether async functions get a
> `next` function,
> it’s recommended to keep `input` at one value normally.

## Parameters

• ...**input**: `any`[]

## Returns

`void`

## Defined in

node\_modules/trough/lib/index.d.ts:100
