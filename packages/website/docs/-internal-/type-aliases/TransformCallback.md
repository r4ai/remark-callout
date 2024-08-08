[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / TransformCallback

# Type Alias: TransformCallback()\<Output\>

> **TransformCallback**\<`Output`\>: (`error`?, `tree`?, `file`?) => `undefined`

Callback passed to transforms.

If the signature of a `transformer` accepts a third argument, the
transformer may perform asynchronous operations, and must call it.

## Type Parameters

• **Output** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) = [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md)

## Parameters

• **error?**: `Error`

• **tree?**: `Output`

• **file?**: [`VFile`](../classes/VFile.md)

## Returns

`undefined`

## Defined in

node\_modules/unified/lib/index.d.ts:989
