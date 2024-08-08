[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / UsePlugin

# Type Alias: UsePlugin\<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output\>

> **UsePlugin**\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`, `Input`, `Output`\>: `Input` *extends* `string` ? `Output` *extends* [`Node`](Node.md) \| `undefined` ? [`Processor`](../classes/Processor.md)\<`Output` *extends* `undefined` ? `ParseTree` : `Output`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\> : [`Processor`](../classes/Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\> : `Output` *extends* [`CompileResults`](CompileResults.md) ? `Input` *extends* [`Node`](Node.md) \| `undefined` ? [`Processor`](../classes/Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `Input` *extends* `undefined` ? `CompileTree` : `Input`, `Output` *extends* `undefined` ? `CompileResult` : `Output`\> : [`Processor`](../classes/Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\> : `Input` *extends* [`Node`](Node.md) \| `undefined` ? `Output` *extends* [`Node`](Node.md) \| `undefined` ? [`Processor`](../classes/Processor.md)\<`ParseTree`, `HeadTree` *extends* `undefined` ? `Input` : `HeadTree`, `Output` *extends* `undefined` ? `TailTree` : `Output`, `CompileTree`, `CompileResult`\> : [`Processor`](../classes/Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\> : [`Processor`](../classes/Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

Create a processor based on the input/output of a [plugin](Plugin.md).

## Type Parameters

• **ParseTree** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) \| `undefined`

• **HeadTree** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) \| `undefined`

• **TailTree** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) \| `undefined`

• **CompileTree** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) \| `undefined`

• **CompileResult** *extends* [`CompileResults`](CompileResults.md) \| `undefined`

• **Input** *extends* `string` \| [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) \| `undefined`

• **Output**

## Defined in

node\_modules/unified/lib/index.d.ts:1012
