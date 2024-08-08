[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Reference

# Interface: Reference

Marker that is associated to another node.

## Extends

- [`Association`](Association.md)

## Extended by

- [`ImageReference`](ImageReference.md)
- [`LinkReference`](LinkReference.md)

## Properties

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

### referenceType

> **referenceType**: [`ReferenceType`](../type-aliases/ReferenceType.md)

Explicitness of the reference.

#### Defined in

node\_modules/@types/mdast/index.d.ts:92
