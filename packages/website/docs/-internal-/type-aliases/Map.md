[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Map

# Type Alias: Map

> **Map**: `object`

Raw source map.

See:
<https://github.com/mozilla/source-map/blob/60adcb0/source-map.d.ts#L15-L23>.

## Type declaration

### file

> **file**: `string`

The generated file this source map is associated with.

### mappings

> **mappings**: `string`

A string of base64 VLQs which contain the actual mappings.

### names

> **names**: `string`[]

An array of identifiers which can be referenced by individual mappings.

### sourceRoot?

> `optional` **sourceRoot**: `string`

The URL root from which all sources are relative.

### sources

> **sources**: `string`[]

An array of URLs to the original source files.

### sourcesContent?

> `optional` **sourcesContent**: `string`[]

An array of contents of the original source files.

### version

> **version**: `number`

Which version of the source map spec this map is following.

## Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:341
