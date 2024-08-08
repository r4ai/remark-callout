[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Parent

# Interface: Parent

Abstract hast node that contains other hast nodes (*children*).

This interface is supposed to be extended if you make custom hast nodes.

For a union of all registered hast parents, see Parents.

## Extends

- [`Node`](Node.md)

## Extended by

- [`Element`](Element.md)
- [`Root`](Root.md)

## Properties

### children

> **children**: [`RootContent`](../type-aliases/RootContent.md)[]

List of children.

#### Defined in

node\_modules/@types/hast/index.d.ts:159

***

### data?

> `optional` **data**: [`Data`](Data.md)

Info from the ecosystem.

#### Inherited from

[`Node`](Node.md).[`data`](Node.md#data-2)

#### Defined in

node\_modules/@types/hast/index.d.ts:131

***

### position?

> `optional` **position**: [`Position`](Position.md)

Position of a node in a source document.

Nodes that are generated (not in the original source document) must not
have a position.

#### Inherited from

[`Node`](Node.md).[`position`](Node.md#position-2)

#### Defined in

node\_modules/@types/unist/index.d.ts:103

***

### type

> **type**: `string`

Node type.

#### Inherited from

[`Node`](Node.md).[`type`](Node.md#type-2)

#### Defined in

node\_modules/@types/unist/index.d.ts:90
