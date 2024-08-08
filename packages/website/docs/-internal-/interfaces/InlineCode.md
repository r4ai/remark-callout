[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / InlineCode

# Interface: InlineCode

Markdown code (text) (inline).

## Extends

- [`Literal`](Literal.md)

## Properties

### data?

> `optional` **data**: [`InlineCodeData`](InlineCodeData.md)

Data associated with the mdast code (text).

#### Overrides

[`Literal`](Literal.md).[`data`](Literal.md#data-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:794

***

### position?

> `optional` **position**: [`Position`](Position.md)

Position of a node in a source document.

Nodes that are generated (not in the original source document) must not
have a position.

#### Inherited from

[`Literal`](Literal.md).[`position`](Literal.md#position-1)

#### Defined in

node\_modules/@types/unist/index.d.ts:103

***

### type

> **type**: `"inlineCode"`

Node type of mdast code (text).

#### Overrides

[`Literal`](Literal.md).[`type`](Literal.md#type-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:790

***

### value

> **value**: `string`

Plain-text value.

#### Inherited from

[`Literal`](Literal.md).[`value`](Literal.md#value-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:472
