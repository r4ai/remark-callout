[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Table

# Interface: Table

Markdown GFM table.

## Extends

- [`Parent`](Parent.md)

## Properties

### align?

> `optional` **align**: `null` \| [`AlignType`](../type-aliases/AlignType.md)[]

How cells in columns are aligned.

#### Defined in

node\_modules/@types/mdast/index.d.ts:998

***

### children

> **children**: [`TableRow`](TableRow.md)[]

Children of GFM table.

#### Overrides

[`Parent`](Parent.md).[`children`](Parent.md#children)

#### Defined in

node\_modules/@types/mdast/index.d.ts:1002

***

### data?

> `optional` **data**: [`TableData`](TableData.md)

Data associated with the mdast GFM table.

#### Overrides

[`Parent`](Parent.md).[`data`](Parent.md#data)

#### Defined in

node\_modules/@types/mdast/index.d.ts:1006

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

> **type**: `"table"`

Node type of mdast GFM table.

#### Overrides

[`Parent`](Parent.md).[`type`](Parent.md#type)

#### Defined in

node\_modules/@types/mdast/index.d.ts:994
