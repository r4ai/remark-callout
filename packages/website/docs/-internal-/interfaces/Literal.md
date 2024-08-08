[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Literal

# Interface: Literal

Abstract mdast node that contains the smallest possible value.

This interface is supposed to be extended if you make custom mdast nodes.

For a union of all registered mdast literals, see Literals.

## Extends

- [`Node`](Node.md)

## Extended by

- [`Code`](Code.md)
- [`Html`](Html.md)
- [`InlineCode`](InlineCode.md)
- [`Text`](Text.md)
- [`Yaml`](Yaml.md)

## Properties

### data?

> `optional` **data**: [`Data`](Data.md)

Info from the ecosystem.

#### Inherited from

[`Node`](Node.md).[`data`](Node.md#data-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:492

***

### position?

> `optional` **position**: [`Position`](Position.md)

Position of a node in a source document.

Nodes that are generated (not in the original source document) must not
have a position.

#### Inherited from

[`Node`](Node.md).[`position`](Node.md#position-1)

#### Defined in

node\_modules/@types/unist/index.d.ts:103

***

### type

> **type**: `string`

Node type.

#### Inherited from

[`Node`](Node.md).[`type`](Node.md#type-1)

#### Defined in

node\_modules/@types/unist/index.d.ts:90

***

### value

> **value**: `string`

Plain-text value.

#### Defined in

node\_modules/@types/mdast/index.d.ts:472
