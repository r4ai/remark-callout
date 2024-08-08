[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / DefinitionContentMap

# Interface: DefinitionContentMap

Registry of all mdast nodes that can occur where [DefinitionContent](../type-aliases/DefinitionContent.md)
is expected.

This interface can be augmented to register custom node types:

```ts
declare module 'mdast' {
  interface DefinitionContentMap {
    custom: Custom;
  }
}
```

For a union of all definition content, see [RootContent](../type-aliases/RootContent.md).

## Properties

### definition

> **definition**: [`Definition`](Definition.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:197

***

### footnoteDefinition

> **footnoteDefinition**: [`FootnoteDefinition`](FootnoteDefinition.md)

#### Defined in

node\_modules/@types/mdast/index.d.ts:198
