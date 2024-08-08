[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / BlockContentMap

# Interface: BlockContentMap

Registry of all mdast nodes that can occur where [BlockContent](../type-aliases/BlockContent.md) is
expected.

This interface can be augmented to register custom node types:

```ts
declare module 'mdast' {
  interface BlockContentMap {
    // Allow using MDX ESM nodes defined by `remark-mdx`.
    mdxjsEsm: MdxjsEsm;
  }
}
```

For a union of all block content, see [RootContent](../type-aliases/RootContent.md).

## Properties

### blockquote

> **blockquote**: [`Blockquote`](Blockquote.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:161

***

### code

> **code**: [`Code`](Code.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:162

***

### heading

> **heading**: [`Heading`](Heading.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:163

***

### html

> **html**: [`Html`](Html.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:164

***

### list

> **list**: [`List`](List.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:165

***

### paragraph

> **paragraph**: [`Paragraph`](Paragraph.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:166

***

### table

> **table**: [`Table`](Table.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:167

***

### thematicBreak

> **thematicBreak**: [`ThematicBreak`](ThematicBreak.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:168
