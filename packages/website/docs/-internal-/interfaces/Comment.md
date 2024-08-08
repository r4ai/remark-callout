[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Comment

# Interface: Comment

HTML comment.

## Extends

- [`Literal`](Literal.md)

## Properties

### data?

> `optional` **data**: [`CommentData`](CommentData.md)

Data associated with the comment.

#### Overrides

[`Literal`](Literal.md).[`data`](Literal.md#data)

#### Defined in

node\_modules/@types/hast/index.d.ts:175

***

### position?

> `optional` **position**: [`Position`](Position.md)

Position of a node in a source document.

Nodes that are generated (not in the original source document) must not
have a position.

#### Inherited from

[`Literal`](Literal.md).[`position`](Literal.md#position)

#### Defined in

node\_modules/@types/unist/index.d.ts:103

***

### type

> **type**: `"comment"`

Node type of HTML comments in hast.

#### Overrides

[`Literal`](Literal.md).[`type`](Literal.md#type)

#### Defined in

node\_modules/@types/hast/index.d.ts:171

***

### value

> **value**: `string`

Plain-text value.

#### Inherited from

[`Literal`](Literal.md).[`value`](Literal.md#value)

#### Defined in

node\_modules/@types/hast/index.d.ts:145
