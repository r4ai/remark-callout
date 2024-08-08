[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Root

# Interface: Root

Document fragment or a whole document.

Should be used as the root of a tree and must not be used as a child.

Can also be used as the value for the content field on a `'template'` element.

## Extends

- [`Parent`](Parent.md)

## Properties

### children

> **children**: [`RootContent`](../type-aliases/RootContent.md)[]

Children of root.

#### Overrides

[`Parent`](Parent.md).[`children`](Parent.md#children-1)

#### Defined in

node\_modules/@types/hast/index.d.ts:253

***

### data?

> `optional` **data**: [`RootData`](RootData.md)

Data associated with the hast root.

#### Overrides

[`Parent`](Parent.md).[`data`](Parent.md#data-1)

#### Defined in

node\_modules/@types/hast/index.d.ts:257

***

### position?

> `optional` **position**: [`Position`](Position.md)

Position of a node in a source document.

Nodes that are generated (not in the original source document) must not
have a position.

#### Inherited from

[`Parent`](Parent.md).[`position`](Parent.md#position-1)

#### Defined in

node\_modules/@types/unist/index.d.ts:103

***

### type

> **type**: `"root"`

Node type of hast root.

#### Overrides

[`Parent`](Parent.md).[`type`](Parent.md#type-1)

#### Defined in

node\_modules/@types/hast/index.d.ts:249
