[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Transformer

# Type Alias: Transformer()\<Input, Output\>

> **Transformer**\<`Input`, `Output`\>: (`tree`, `file`, `next`) => `Promise`\<`Output` \| `undefined` \| `void`\> \| `Promise`\<`never`\> \| `Output` \| `Error` \| `undefined` \| `void`

Transformers handle syntax trees and files.

They are functions that are called each time a syntax tree and file are
passed through the run phase.
When an error occurs in them (either because it’s thrown, returned,
rejected, or passed to `next`), the process stops.

The run phase is handled by [`trough`][trough], see its documentation for
the exact semantics of these functions.

> **Note**: you should likely ignore `next`: don’t accept it.
> it supports callback-style async work.
> But promises are likely easier to reason about.

[trough]: https://github.com/wooorm/trough#function-fninput-next

## Type Parameters

• **Input** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) = [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md)

• **Output** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) = `Input`

## Parameters

• **tree**: `Input`

• **file**: [`VFile`](../classes/VFile.md)

• **next**: [`TransformCallback`](TransformCallback.md)\<`Output`\>

## Returns

`Promise`\<`Output` \| `undefined` \| `void`\> \| `Promise`\<`never`\> \| `Output` \| `Error` \| `undefined` \| `void`

## Defined in

node\_modules/unified/lib/index.d.ts:1007
