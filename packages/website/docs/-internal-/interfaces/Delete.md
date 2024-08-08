[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Delete

# Interface: Delete

Markdown GFM delete (strikethrough).

## Extends

- [`Parent`](Parent.md)

## Properties

### children

> **children**: [`PhrasingContent`](../type-aliases/PhrasingContent.md)[]

Children of GFM delete.

#### Overrides

[`Parent`](Parent.md).[`children`](Parent.md#children)

#### Defined in

node\_modules/@types/mdast/index.d.ts:612

***

### data?

> `optional` **data**: [`DeleteData`](DeleteData.md)

Data associated with the mdast GFM delete.

#### Overrides

[`Parent`](Parent.md).[`data`](Parent.md#data)

#### Defined in

node\_modules/@types/mdast/index.d.ts:616

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

> **type**: `"delete"`

Node type of mdast GFM delete.

#### Overrides

[`Parent`](Parent.md).[`type`](Parent.md#type)

#### Defined in

node\_modules/@types/mdast/index.d.ts:608
