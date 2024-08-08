[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Image

# Interface: Image

Markdown image.

## Extends

- [`Alternative`](Alternative.md).[`Node`](Node.md).[`Resource`](Resource.md)

## Properties

### alt?

> `optional` **alt**: `null` \| `string`

Equivalent content for environments that cannot represent the node as
intended.

#### Inherited from

[`Alternative`](Alternative.md).[`alt`](Alternative.md#alt)

#### Defined in

node\_modules/@types/mdast/index.d.ts:45

***

### data?

> `optional` **data**: [`ImageData`](ImageData.md)

Data associated with the mdast image.

#### Overrides

[`Node`](Node.md).[`data`](Node.md#data-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:756

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

> **type**: `"image"`

Node type of mdast image.

#### Overrides

[`Node`](Node.md).[`type`](Node.md#type-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:752

***

### url

> **url**: `string`

URL to the referenced resource.

#### Inherited from

[`Resource`](Resource.md).[`url`](Resource.md#url)

#### Defined in

node\_modules/@types/mdast/index.d.ts:102
