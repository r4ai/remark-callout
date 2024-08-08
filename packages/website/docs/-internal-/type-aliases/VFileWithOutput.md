[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / VFileWithOutput

# Type Alias: VFileWithOutput\<Result\>

> **VFileWithOutput**\<`Result`\>: `Result` *extends* [`Value`](Value.md) \| `undefined` ? [`VFile`](../classes/VFile.md) : [`VFile`](../classes/VFile.md) & `object`

Type to generate a [`VFile`](../classes/VFile.md) corresponding to a compiler result.

If a result that is not acceptable on a `VFile` is used, that will
be stored on the `result` field of [`VFile`](../classes/VFile.md).

## Type Parameters

• **Result** *extends* [`CompileResults`](CompileResults.md) \| `undefined`

## Defined in

node\_modules/unified/lib/index.d.ts:1019
