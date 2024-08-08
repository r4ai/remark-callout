[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / List

# Interface: List

Markdown list.

## Extends

- [`Parent`](Parent.md)

## Properties

### children

> **children**: [`ListItem`](ListItem.md)[]

Children of list.

#### Overrides

[`Parent`](Parent.md).[`children`](Parent.md#children)

#### Defined in

node\_modules/@types/mdast/index.d.ts:873

***

### data?

> `optional` **data**: [`ListData`](ListData.md)

Data associated with the mdast list.

#### Overrides

[`Parent`](Parent.md).[`data`](Parent.md#data)

#### Defined in

node\_modules/@types/mdast/index.d.ts:877

***

### ordered?

> `optional` **ordered**: `null` \| `boolean`

Whether the items have been intentionally ordered (when `true`), or that
the order of items is not important (when `false` or not present).

#### Defined in

node\_modules/@types/mdast/index.d.ts:860

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

### spread?

> `optional` **spread**: `null` \| `boolean`

Whether one or more of the children are separated with a blank line from
its siblings (when `true`), or not (when `false` or not present).

#### Defined in

node\_modules/@types/mdast/index.d.ts:869

***

### start?

> `optional` **start**: `null` \| `number`

The starting number of the list, when the `ordered` field is `true`.

#### Defined in

node\_modules/@types/mdast/index.d.ts:864

***

### type

> **type**: `"list"`

Node type of mdast list.

#### Overrides

[`Parent`](Parent.md).[`type`](Parent.md#type)

#### Defined in

node\_modules/@types/mdast/index.d.ts:855
