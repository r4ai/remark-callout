[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / PhrasingContentMap

# Interface: PhrasingContentMap

Registry of all mdast nodes that can occur where [PhrasingContent](../type-aliases/PhrasingContent.md)
is expected.

This interface can be augmented to register custom node types:

```ts
declare module 'mdast' {
  interface PhrasingContentMap {
    // Allow using MDX JSX (text) nodes defined by `remark-mdx`.
    mdxJsxTextElement: MDXJSXTextElement;
  }
}
```

For a union of all phrasing content, see [RootContent](../type-aliases/RootContent.md).

## Properties

### break

> **break**: [`Break`](Break.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:287

***

### delete

> **delete**: [`Delete`](Delete.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:288

***

### emphasis

> **emphasis**: [`Emphasis`](Emphasis.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:289

***

### footnoteReference

> **footnoteReference**: [`FootnoteReference`](FootnoteReference.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:290

***

### html

> **html**: [`Html`](Html.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:291

***

### image

> **image**: [`Image`](Image.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:292

***

### imageReference

> **imageReference**: [`ImageReference`](ImageReference.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:293

***

### inlineCode

> **inlineCode**: [`InlineCode`](InlineCode.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:294

***

### link

> **link**: [`Link`](Link.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:295

***

### linkReference

> **linkReference**: [`LinkReference`](LinkReference.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:296

***

### strong

> **strong**: [`Strong`](Strong.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:297

***

### text

> **text**: [`Text`](Text.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:298
