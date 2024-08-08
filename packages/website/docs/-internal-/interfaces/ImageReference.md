[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / ImageReference

# Interface: ImageReference

Markdown image reference.

## Extends

- [`Alternative`](Alternative.md).[`Node`](Node.md).[`Reference`](Reference.md)

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

> `optional` **data**: [`ImageReferenceData`](ImageReferenceData.md)

Data associated with the mdast image reference.

#### Overrides

[`Node`](Node.md).[`data`](Node.md#data-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:775

***

### identifier

> **identifier**: `string`

Relation of association.

`identifier` is a source value: character escapes and character
references are not parsed.

It can match another node.

Its value must be normalized.
To normalize a value, collapse markdown whitespace (`[\t\n\r ]+`) to a space,
trim the optional initial and/or final space, and perform Unicode-aware
case-folding.

#### Inherited from

[`Reference`](Reference.md).[`identifier`](Reference.md#identifier)

#### Defined in

node\_modules/@types/mdast/index.d.ts:71

***

### label?

> `optional` **label**: `null` \| `string`

Relation of association, in parsed form.

`label` is a `string` value: it works just like `title` on [Link](Link.md)
or a `lang` on [Code](Code.md): character escapes and character references
are parsed.

It can match another node.

#### Inherited from

[`Reference`](Reference.md).[`label`](Reference.md#label)

#### Defined in

node\_modules/@types/mdast/index.d.ts:82

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

### referenceType

> **referenceType**: [`ReferenceType`](../type-aliases/ReferenceType.md)

Explicitness of the reference.

#### Inherited from

[`Reference`](Reference.md).[`referenceType`](Reference.md#referencetype)

#### Defined in

node\_modules/@types/mdast/index.d.ts:92

***

### type

> **type**: `"imageReference"`

Node type of mdast image reference.

#### Overrides

[`Node`](Node.md).[`type`](Node.md#type-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:771
