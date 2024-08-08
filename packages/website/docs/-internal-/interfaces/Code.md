[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Code

# Interface: Code

Markdown code (flow) (block).

## Extends

- [`Literal`](Literal.md)

## Properties

### data?

> `optional` **data**: [`CodeData`](CodeData.md)

Data associated with the mdast code (flow).

#### Overrides

[`Literal`](Literal.md).[`data`](Literal.md#data-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:574

***

### lang?

> `optional` **lang**: `null` \| `string`

Language of computer code being marked up.

#### Defined in

node\_modules/@types/mdast/index.d.ts:564

***

### meta?

> `optional` **meta**: `null` \| `string`

Custom information relating to the node.

If the lang field is present, a meta field can be present.

#### Defined in

node\_modules/@types/mdast/index.d.ts:570

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

> **type**: `"code"`

Node type of mdast code (flow).

#### Overrides

[`Literal`](Literal.md).[`type`](Literal.md#type-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:560

***

### value

> **value**: `string`

Plain-text value.

#### Inherited from

[`Literal`](Literal.md).[`value`](Literal.md#value-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:472
