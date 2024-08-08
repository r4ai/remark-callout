[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / TableRow

# Interface: TableRow

Markdown GFM table row.

## Extends

- [`Parent`](Parent.md)

## Properties

### children

> **children**: [`TableCell`](TableCell.md)[]

Children of GFM table row.

#### Overrides

[`Parent`](Parent.md).[`children`](Parent.md#children)

#### Defined in

node\_modules/@types/mdast/index.d.ts:1025

***

### data?

> `optional` **data**: [`TableRowData`](TableRowData.md)

Data associated with the mdast GFM table row.

#### Overrides

[`Parent`](Parent.md).[`data`](Parent.md#data)

#### Defined in

node\_modules/@types/mdast/index.d.ts:1029

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

> **type**: `"tableRow"`

Node type of mdast GFM table row.

#### Overrides

[`Parent`](Parent.md).[`type`](Parent.md#type)

#### Defined in

node\_modules/@types/mdast/index.d.ts:1021
