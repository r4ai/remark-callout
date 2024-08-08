[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Heading

# Interface: Heading

Markdown heading.

## Extends

- [`Parent`](Parent.md)

## Properties

### children

> **children**: [`PhrasingContent`](../type-aliases/PhrasingContent.md)[]

Children of heading.

#### Overrides

[`Parent`](Parent.md).[`children`](Parent.md#children)

#### Defined in

node\_modules/@types/mdast/index.d.ts:706

***

### data?

> `optional` **data**: [`HeadingData`](HeadingData.md)

Data associated with the mdast heading.

#### Overrides

[`Parent`](Parent.md).[`data`](Parent.md#data)

#### Defined in

node\_modules/@types/mdast/index.d.ts:710

***

### depth

> **depth**: `1` \| `2` \| `3` \| `4` \| `5` \| `6`

Heading rank.

A value of `1` is said to be the highest rank and `6` the lowest.

#### Defined in

node\_modules/@types/mdast/index.d.ts:702

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

> **type**: `"heading"`

Node type of mdast heading.

#### Overrides

[`Parent`](Parent.md).[`type`](Parent.md#type)

#### Defined in

node\_modules/@types/mdast/index.d.ts:696
