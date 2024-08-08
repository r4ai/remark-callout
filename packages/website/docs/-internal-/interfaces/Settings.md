[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Settings

# Interface: Settings

Interface of known extra options, that can be supported by parser and
compilers.

This exists so that users can use packages such as `remark`, which configure
both parsers and compilers (in this case `remark-parse` and
`remark-stringify`), and still provide options for them.

When you make parsers or compilers, that could be packaged up together,
you should support `this.data('settings')` as input and merge it with
explicitly passed `options`.
Then, to type it, using `remark-stringify` as an example, do something like:

```ts
declare module 'unified' {
  interface Settings {
    bullet: '*' | '+' | '-'
    // …
  }
}

export {} // You may not need this, but it makes sure the file is a module.
```

## Properties

### \[emptyObjectSymbol\]?

> `optional` **\[emptyObjectSymbol\]**: `undefined`

#### Defined in

node\_modules/unified/index.d.ts:105
