[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / ListItem

# Interface: ListItem

Markdown list item.

## Extends

- [`Parent`](Parent.md)

## Properties

### checked?

> `optional` **checked**: `null` \| `boolean`

Whether the item is a tasklist item (when `boolean`).

When `true`, the item is complete.
When `false`, the item is incomplete.

#### Defined in

node\_modules/@types/mdast/index.d.ts:899

***

### children

> **children**: ([`BlockContent`](../type-aliases/BlockContent.md) \| [`DefinitionContent`](../type-aliases/DefinitionContent.md))[]

Children of list item.

#### Overrides

[`Parent`](Parent.md).[`children`](Parent.md#children)

#### Defined in

node\_modules/@types/mdast/index.d.ts:908

***

### data?

> `optional` **data**: [`ListItemData`](ListItemData.md)

Data associated with the mdast list item.

#### Overrides

[`Parent`](Parent.md).[`data`](Parent.md#data)

#### Defined in

node\_modules/@types/mdast/index.d.ts:912

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

node\_modules/@types/mdast/index.d.ts:904

***

### type

> **type**: `"listItem"`

Node type of mdast list item.

#### Overrides

[`Parent`](Parent.md).[`type`](Parent.md#type)

#### Defined in

node\_modules/@types/mdast/index.d.ts:892
