[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Doctype

# Interface: Doctype

HTML document type.

## Extends

- [`Node`](Node.md)

## Properties

### data?

> `optional` **data**: [`DoctypeData`](DoctypeData.md)

Data associated with the doctype.

#### Overrides

[`Node`](Node.md).[`data`](Node.md#data)

#### Defined in

node\_modules/@types/hast/index.d.ts:194

***

### position?

> `optional` **position**: [`Position`](Position.md)

Position of a node in a source document.

Nodes that are generated (not in the original source document) must not
have a position.

#### Inherited from

[`Node`](Node.md).[`position`](Node.md#position)

#### Defined in

node\_modules/@types/unist/index.d.ts:103

***

### type

> **type**: `"doctype"`

Node type of HTML document types in hast.

#### Overrides

[`Node`](Node.md).[`type`](Node.md#type)

#### Defined in

node\_modules/@types/hast/index.d.ts:190
