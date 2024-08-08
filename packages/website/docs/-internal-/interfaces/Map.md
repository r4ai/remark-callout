[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Map

# Interface: Map

Raw source map.

See:
<https://github.com/mozilla/source-map/blob/60adcb0/source-map.d.ts#L15-L23>.

## Properties

### file

> **file**: `string`

The generated file this source map is associated with.

#### Defined in

node\_modules/vfile/index.d.ts:38

***

### mappings

> **mappings**: `string`

A string of base64 VLQs which contain the actual mappings.

#### Defined in

node\_modules/vfile/index.d.ts:42

***

### names

> **names**: `string`[]

An array of identifiers which can be referenced by individual mappings.

#### Defined in

node\_modules/vfile/index.d.ts:46

***

### sourceRoot?

> `optional` **sourceRoot**: `string`

The URL root from which all sources are relative.

#### Defined in

node\_modules/vfile/index.d.ts:54

***

### sources

> **sources**: `string`[]

An array of URLs to the original source files.

#### Defined in

node\_modules/vfile/index.d.ts:58

***

### sourcesContent?

> `optional` **sourcesContent**: `string`[]

An array of contents of the original source files.

#### Defined in

node\_modules/vfile/index.d.ts:50

***

### version

> **version**: `number`

Which version of the source map spec this map is following.

#### Defined in

node\_modules/vfile/index.d.ts:62
