[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Node

# Interface: Node

Abstract hast node.

This interface is supposed to be extended.
If you can use [Literal](Literal.md) or [Parent](Parent.md), you should.
But for example in HTML, a `Doctype` is neither literal nor parent, but
still a node.

To register custom hast nodes, add them to [RootContentMap](RootContentMap.md) and other
places where relevant (such as [ElementContentMap](ElementContentMap.md)).

For a union of all registered hast nodes, see Nodes.

## Extends

- [`Node`](Node.md)

## Extended by

- [`Literal`](Literal.md)
- [`Parent`](Parent.md)

## Properties

### data?

> `optional` **data**: [`Data`](Data.md)

Info from the ecosystem.

#### Overrides

[`Node`](Node.md).[`data`](Node.md#data)

#### Defined in

node\_modules/@types/hast/index.d.ts:131

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

> **type**: `string`

Node type.

#### Inherited from

[`Node`](Node.md).[`type`](Node.md#type)

#### Defined in

node\_modules/@types/unist/index.d.ts:90
