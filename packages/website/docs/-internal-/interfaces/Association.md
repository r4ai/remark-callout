[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Association

# Interface: Association

Internal relation from one node to another.

Whether the value of `identifier` is expected to be a unique identifier or
not depends on the type of node including the Association.
An example of this is that they should be unique on [Definition](Definition.md),
whereas multiple [LinkReference](LinkReference.md)s can be non-unique to be associated
with one definition.

## Extended by

- [`Definition`](Definition.md)
- [`FootnoteDefinition`](FootnoteDefinition.md)
- [`FootnoteReference`](FootnoteReference.md)
- [`Reference`](Reference.md)

## Properties

### identifier

> **identifier**: `string`

Relation of association.

`identifier` is a source value: character escapes and character
references are not parsed.

It can match another node.

Its value must be normalized.
To normalize a value, collapse markdown whitespace (`[\t\n\r ]+`) to a space,
trim the optional initial and/or final space, and perform Unicode-aware
case-folding.

#### Defined in

node\_modules/@types/mdast/index.d.ts:71

***

### label?

> `optional` **label**: `null` \| `string`

Relation of association, in parsed form.

`label` is a `string` value: it works just like `title` on [Link](Link.md)
or a `lang` on [Code](Code.md): character escapes and character references
are parsed.

It can match another node.

#### Defined in

node\_modules/@types/mdast/index.d.ts:82
