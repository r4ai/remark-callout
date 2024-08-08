[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Link

# Interface: Link

Markdown link.

## Extends

- [`Parent`](Parent.md).[`Resource`](Resource.md)

## Properties

### children

> **children**: [`PhrasingContent`](../type-aliases/PhrasingContent.md)[]

Children of link.

#### Overrides

[`Parent`](Parent.md).[`children`](Parent.md#children)

#### Defined in

node\_modules/@types/mdast/index.d.ts:813

***

### data?

> `optional` **data**: [`LinkData`](LinkData.md)

Data associated with the mdast link.

#### Overrides

[`Parent`](Parent.md).[`data`](Parent.md#data)

#### Defined in

node\_modules/@types/mdast/index.d.ts:817

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

### title?

> `optional` **title**: `null` \| `string`

Advisory information for the resource, such as would be appropriate for
a tooltip.

#### Inherited from

[`Resource`](Resource.md).[`title`](Resource.md#title)

#### Defined in

node\_modules/@types/mdast/index.d.ts:107

***

### type

> **type**: `"link"`

Node type of mdast link.

#### Overrides

[`Parent`](Parent.md).[`type`](Parent.md#type)

#### Defined in

node\_modules/@types/mdast/index.d.ts:809

***

### url

> **url**: `string`

URL to the referenced resource.

#### Inherited from

[`Resource`](Resource.md).[`url`](Resource.md#url)

#### Defined in

node\_modules/@types/mdast/index.d.ts:102
