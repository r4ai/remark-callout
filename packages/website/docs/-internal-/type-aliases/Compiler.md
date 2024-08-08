[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Compiler

# Type Alias: Compiler()\<Tree, Result\>

> **Compiler**\<`Tree`, `Result`\>: (`tree`, `file`) => `Result`

A **compiler** handles the compiling of a syntax tree to something else
(in most cases, text) (TypeScript type).

It is used in the stringify phase and called with a [`Node`](Node.md)
and [`VFile`](../classes/VFile.md) representation of the document to compile.
It should return the textual representation of the given tree (typically
`string`).

> **Note**: unified typically compiles by serializing: most compilers
> return `string` (or `Uint8Array`).
> Some compilers, such as the one configured with
> [`rehype-react`][rehype-react], return other values (in this case, a
> React tree).
> If you’re using a compiler that doesn’t serialize, expect different
> result values.
>
> To register custom results in TypeScript, add them to
> [`CompileResultMap`](CompileResultMap.md).

[rehype-react]: https://github.com/rehypejs/rehype-react

## Type Parameters

• **Tree** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) = [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md)

• **Result** *extends* [`CompileResults`](CompileResults.md) = [`CompileResults`](CompileResults.md)

## Parameters

• **tree**: `Tree`

• **file**: [`VFile`](../classes/VFile.md)

## Returns

`Result`

## Defined in

node\_modules/unified/lib/index.d.ts:912
