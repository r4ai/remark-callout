[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / ThematicBreak

# Interface: ThematicBreak

Markdown thematic break (horizontal rule).

## Extends

- [`Node`](Node.md)

## Properties

### data?

> `optional` **data**: [`ThematicBreakData`](ThematicBreakData.md)

Data associated with the mdast thematic break.

#### Overrides

[`Node`](Node.md).[`data`](Node.md#data-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:1090

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

> **type**: `"thematicBreak"`

Node type of mdast thematic break.

#### Overrides

[`Node`](Node.md).[`type`](Node.md#type-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:1086
