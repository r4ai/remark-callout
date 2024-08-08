[**@r4ai/remark-callout**](../README.md) • **Docs**

***

[@r4ai/remark-callout](../globals.md) / Options

# Type Alias: Options

> **Options**: `object`

## Type declaration

### body?

> `optional` **body**: [`NodeOptions`](NodeOptions.md) \| (`callout`) => [`NodeOptions`](NodeOptions.md)

The body node of the callout.

#### Default

```ts
() => ({
  tagName: "div",
  properties: {
    dataCalloutBody: true,
  },
})
```

### callouts?

> `optional` **callouts**: `string`[] \| `null`

A list of callout types that are supported.
- If `undefined`, all callout types are supported. This means that this plugin will not check if the given callout type is in `callouts` and never call `onUnknownCallout`.
- If a list, only the callout types in the list are supported. This means that if the given callout type is not in `callouts`, this plugin will call `onUnknownCallout`.

#### Example

```ts
["info", "warning", "danger"]
```

#### Default

```ts
undefined
```

### foldIcon?

> `optional` **foldIcon**: [`NodeOptionsWithChildren`](NodeOptionsWithChildren.md) \| `string` \| (`callout`) => [`NodeOptionsWithChildren`](NodeOptionsWithChildren.md) \| `string` \| `undefined`

The fold icon node of the callout.

The fold icon node is added in the title node after the title text.

- If `undefined`, no fold icon is added.
- If a `string`, the string is added as HTML in the title node after the title text.
- If a `object`, the object is added as a node after the title text.

#### Example

```ts
(callout) =>
  callout.isFoldable
    ? {
        tagName: "div",
        properties: {
          className: "callout-fold-icon",
        },
        children:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>', // lucide:chevron-right
      }
    : undefined,
```

#### Default

```ts
() => undefined
```

### icon?

> `optional` **icon**: [`NodeOptionsWithChildren`](NodeOptionsWithChildren.md) \| `string` \| (`callout`) => [`NodeOptionsWithChildren`](NodeOptionsWithChildren.md) \| `string` \| `undefined`

The icon node of the callout.

The icon node is added in the title node before the title text.

- If `undefined`, no icon is added.
- If a `string`, the string is added as HTML in the title node before the title text.
- If a `object`, the object is added as a node before the title text.

#### Examples

```ts
() => '<svg class="lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/></svg>' // lucide:pencil
```

```ts
(callout) => ({
  tagName: "div",
  properties: {
    className: "callout-icon",
  },
  children:
    callout.type === "warn"
      ? '<svg class="lucide-circle-alert" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>' // lucide:circle-alert
      : '<svg class="lucide-pencil" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/></svg>', // lucide:pencil
})
```

#### Default

```ts
() => undefined
```

### onUnknownCallout()?

> `optional` **onUnknownCallout**: (`callout`, `file`) => [`Callout`](Callout.md) \| `undefined`

A function that is called when the given callout type is not in `callouts`.

- If the function returns `undefined`, the callout is ignored. This means that the callout is rendered as a normal blockquote.
- If the function returns a `Callout`, the callout is replaced with the returned `Callout`.

#### Parameters

• **callout**: [`Callout`](Callout.md)

• **file**: [`VFile`](../-internal-/classes/VFile.md)

#### Returns

[`Callout`](Callout.md) \| `undefined`

### root?

> `optional` **root**: [`NodeOptions`](NodeOptions.md) \| (`callout`) => [`NodeOptions`](NodeOptions.md)

The root node of the callout.

#### Default

```ts
(callout) => ({
  tagName: callout.isFoldable ? "details" : "div",
  properties: {
    dataCallout: true,
    dataCalloutType: callout.type,
    open: callout.defaultFolded === undefined ? false : !callout.defaultFolded,
  },
})
```

### title?

> `optional` **title**: [`NodeOptions`](NodeOptions.md) \| (`callout`) => [`NodeOptions`](NodeOptions.md)

The title node of the callout.

#### Default

```ts
(callout) => ({
  tagName: callout.isFoldable ? "summary" : "div",
  properties: {
    dataCalloutTitle: true,
  },
})
```

### titleInner?

> `optional` **titleInner**: [`NodeOptions`](NodeOptions.md) \| (`callout`, `options`) => [`NodeOptions`](NodeOptions.md) \| `undefined`

The inner title node of the callout.

This node is used to wrap the text content of the title.

- If `undefined`, title text is not wrapped.

  Example output:

  ```html
  <div data-callout data-callout-type="abstract">
    <div data-callout-title>
      <div data-callout-icon>😎</div>
      Title
    </div>
  </div>
  ````

- If a `object`, the object used as a node to wrap the title text.

  Example output with options `{ tagName: "div", properties: { dataCalloutTitleInner: true } }`:

  ```html
  <div data-callout data-callout-type="abstract">
    <div data-callout-title>
      <div data-callout-icon>😎</div>
      <div data-callout-title-inner>Title</div>
    </div>
  </div>
  ```

@example
() => undefined  // the title text will not be wrapped

@example
// the title text will be wrapped in a div with the class "callout-title-inner"
() => ({
  tagName: "div",
  properties: { className: "callout-title-inner" },
})

@default
(callout, options) =>
  options.icon(callout) == null && options.foldIcon(callout) == null
    ? undefined
    : {
        tagName: "div",
        properties: {
          dataCalloutTitleInner: true,
        },
      },

## Defined in

[packages/remark-callout/src/plugin.ts:8](https://github.com/r4ai/remark-callout/blob/92c94b708c2f6bdda389d15e8cae58ca30d48f99/packages/remark-callout/src/plugin.ts#L8)
