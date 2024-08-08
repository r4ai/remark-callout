[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / FootnoteDefinition

# Interface: FootnoteDefinition

Markdown GFM footnote definition.

## Extends

- [`Parent`](Parent.md).[`Association`](Association.md)

## Properties

### children

> **children**: ([`BlockContent`](../type-aliases/BlockContent.md) \| [`DefinitionContent`](../type-aliases/DefinitionContent.md))[]

Children of GFM footnote definition.

#### Overrides

[`Parent`](Parent.md).[`children`](Parent.md#children)

#### Defined in

node\_modules/@types/mdast/index.d.ts:658

***

### data?

> `optional` **data**: [`FootnoteDefinitionData`](FootnoteDefinitionData.md)

Data associated with the mdast GFM footnote definition.

#### Overrides

[`Parent`](Parent.md).[`data`](Parent.md#data)

#### Defined in

node\_modules/@types/mdast/index.d.ts:662

***

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

#### Inherited from

[`Association`](Association.md).[`identifier`](Association.md#identifier)

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

#### Inherited from

[`Association`](Association.md).[`label`](Association.md#label)

#### Defined in

node\_modules/@types/mdast/index.d.ts:82

***

### position?

> `optional` **position**: [`Position`](Position.md)

Position of a node in a source document.

Nodes that are generated (not in the original source document) must not
have a position.

#### Inherited from

[`Parent`](Parent.md).[`position`](Parent.md#position)

#### Defined in

node\_modules/@types/unist/index.d.ts:103

***

### type

> **type**: `"footnoteDefinition"`

Node type of mdast GFM footnote definition.

#### Overrides

[`Parent`](Parent.md).[`type`](Parent.md#type)

#### Defined in

node\_modules/@types/mdast/index.d.ts:654
