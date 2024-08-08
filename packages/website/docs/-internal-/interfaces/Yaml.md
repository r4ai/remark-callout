[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Yaml

# Interface: Yaml

Markdown YAML.

## Extends

- [`Literal`](Literal.md)

## Properties

### data?

> `optional` **data**: [`YamlData`](YamlData.md)

Data associated with the mdast YAML.

#### Overrides

[`Literal`](Literal.md).[`data`](Literal.md#data-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:1109

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

> **type**: `"yaml"`

Node type of mdast YAML.

#### Overrides

[`Literal`](Literal.md).[`type`](Literal.md#type-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:1105

***

### value

> **value**: `string`

Plain-text value.

#### Inherited from

[`Literal`](Literal.md).[`value`](Literal.md#value-1)

#### Defined in

node\_modules/@types/mdast/index.d.ts:472
