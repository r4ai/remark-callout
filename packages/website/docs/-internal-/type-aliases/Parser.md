[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Parser

# Type Alias: Parser()\<Tree\>

> **Parser**\<`Tree`\>: (`document`, `file`) => `Tree`

A **parser** handles the parsing of text to a syntax tree.

It is used in the parse phase and is called with a `string` and
[`VFile`](../classes/VFile.md) of the document to parse.
It must return the syntax tree representation of the given file
([`Node`](Node.md)).

## Type Parameters

• **Tree** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) = [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md)

## Parameters

• **document**: `string`

• **file**: [`VFile`](../classes/VFile.md)

## Returns

`Tree`

## Defined in

node\_modules/unified/lib/index.d.ts:921
