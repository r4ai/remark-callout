[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Plugin

# Type Alias: Plugin()\<PluginParameters, Input, Output\>

> **Plugin**\<`PluginParameters`, `Input`, `Output`\>: (`this`, ...`parameters`) => `Input` *extends* `string` ? `Output` *extends* [`Node`](Node.md) \| `undefined` ? `undefined` \| `void` : `never` : `Output` *extends* [`CompileResults`](CompileResults.md) ? `Input` *extends* [`Node`](Node.md) \| `undefined` ? `undefined` \| `void` : `never` : [`Transformer`](Transformer.md)\<`Input` *extends* [`Node`](Node.md) ? `Input` : [`Node`](Node.md), `Output` *extends* [`Node`](Node.md) ? `Output` : [`Node`](Node.md)\> \| `undefined` \| `void`

Single plugin.

Plugins configure the processors they are applied on in the following
ways:

*   they change the processor, such as the parser, the compiler, or by
  configuring data
*   they specify how to handle trees and files

In practice, they are functions that can receive options and configure the
processor (`this`).

> **Note**: plugins are called when the processor is *frozen*, not when
> they are applied.

## Type Parameters

• **PluginParameters** *extends* `unknown`[] = []

• **Input** *extends* `string` \| [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) \| `undefined` = [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md)

• **Output** = `Input`

## Parameters

• **this**: [`Processor`](../classes/Processor.md)

• ...**parameters**: `PluginParameters`

## Returns

`Input` *extends* `string` ? `Output` *extends* [`Node`](Node.md) \| `undefined` ? `undefined` \| `void` : `never` : `Output` *extends* [`CompileResults`](CompileResults.md) ? `Input` *extends* [`Node`](Node.md) \| `undefined` ? `undefined` \| `void` : `never` : [`Transformer`](Transformer.md)\<`Input` *extends* [`Node`](Node.md) ? `Input` : [`Node`](Node.md), `Output` *extends* [`Node`](Node.md) ? `Output` : [`Node`](Node.md)\> \| `undefined` \| `void`

## Defined in

node\_modules/unified/lib/index.d.ts:946
