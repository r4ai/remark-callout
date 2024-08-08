[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Definition

# Interface: Definition

Markdown definition.

## Extends

- [`Node`](Node.md).[`Association`](Association.md).[`Resource`](Resource.md)

## Properties

### data?

> `optional` **data**: [`DefinitionData`](DefinitionData.md)

Data associated with the mdast definition.

#### Overrides

[`Node`](Node.md).[`data`](Node.md#data-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:593

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

[`Association`](Association.md).[`identifier`](Association.md#identifier)

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

[`Association`](Association.md).[`label`](Association.md#label)

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

> **type**: `"definition"`

Node type of mdast definition.

#### Overrides

[`Node`](Node.md).[`type`](Node.md#type-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:589

***

### url

> **url**: `string`

URL to the referenced resource.

#### Inherited from

[`Resource`](Resource.md).[`url`](Resource.md#url)

#### Defined in

node\_modules/@types/mdast/index.d.ts:102
