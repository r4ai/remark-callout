[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Element

# Interface: Element

HTML element.

## Extends

- [`Parent`](Parent.md)

## Properties

### children

> **children**: [`ElementContent`](../type-aliases/ElementContent.md)[]

Children of element.

#### Overrides

[`Parent`](Parent.md).[`children`](Parent.md#children-1)

#### Defined in

node\_modules/@types/hast/index.d.ts:221

***

### content?

> `optional` **content**: [`Root`](Root.md)

When the `tagName` field is `'template'`, a `content` field can be
present.

#### Defined in

node\_modules/@types/hast/index.d.ts:226

***

### data?

> `optional` **data**: [`ElementData`](ElementData.md)

Data associated with the element.

#### Overrides

[`Parent`](Parent.md).[`data`](Parent.md#data-1)

#### Defined in

node\_modules/@types/hast/index.d.ts:230

***

### position?

> `optional` **position**: [`Position`](Position.md)

Position of a node in a source document.

Nodes that are generated (not in the original source document) must not
have a position.

#### Inherited from

[`Parent`](Parent.md).[`position`](Parent.md#position-1)

#### Defined in

node\_modules/@types/unist/index.d.ts:103

***

### properties

> **properties**: [`Properties`](Properties.md)

Info associated with the element.

#### Defined in

node\_modules/@types/hast/index.d.ts:217

***

### tagName

> **tagName**: `string`

Tag name (such as `'body'`) of the element.

#### Defined in

node\_modules/@types/hast/index.d.ts:213

***

### type

> **type**: `"element"`

Node type of elements.

#### Overrides

[`Parent`](Parent.md).[`type`](Parent.md#type-1)

#### Defined in

node\_modules/@types/hast/index.d.ts:209
