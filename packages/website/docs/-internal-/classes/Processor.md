[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / Processor

# Class: Processor()\<ParseTree, HeadTree, TailTree, CompileTree, CompileResult\>

## Extends

- [`CallableInstance`](../variables/CallableInstance.md)\<[], [`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>\>

## Type Parameters

• **ParseTree** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) \| `undefined` = `undefined`

Output of `parse` (optional).

• **HeadTree** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) \| `undefined` = `undefined`

Input for `run` (optional).

• **TailTree** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) \| `undefined` = `undefined`

Output for `run` (optional).

• **CompileTree** *extends* [`"/home/rai/src/repos/remark-callout/node_modules/@types/unist/index"`](../namespaces/home_rai_src_repos_remark-callout_node_modules_@types_unist_index/README.md) \| `undefined` = `undefined`

Input of `stringify` (optional).

• **CompileResult** *extends* [`CompileResults`](../type-aliases/CompileResults.md) \| `undefined` = `undefined`

Output of `stringify` (optional).

> **Processor**(...`parameters`): [`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

## Parameters

• ...**parameters**: []

## Returns

[`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

## Defined in

node\_modules/unified/lib/index.d.ts:15

## Constructors

### new Processor()

> **new Processor**\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>(): [`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

Create a processor.

#### Returns

[`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

#### Overrides

`CallableInstance<[], Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>>.constructor`

#### Defined in

node\_modules/unified/lib/index.d.ts:19

## Properties

### ~~Compiler~~

> **Compiler**: `undefined` \| [`Compiler`](../type-aliases/Compiler.md)\<`CompileTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `CompileTree`, `CompileResult` *extends* `undefined` ? [`CompileResults`](../type-aliases/CompileResults.md) : `CompileResult`\>

Compiler to use (deprecated).

#### Deprecated

Use `compiler` instead.

#### Defined in

node\_modules/unified/lib/index.d.ts:33

***

### ~~Parser~~

> **Parser**: `undefined` \| [`Parser`](../type-aliases/Parser.md)\<`ParseTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `ParseTree`\>

Parser to use (deprecated).

#### Deprecated

Use `parser` instead.

#### Defined in

node\_modules/unified/lib/index.d.ts:44

***

### ~~attachers~~

> **attachers**: [[`Plugin`](../type-aliases/Plugin.md)\<`unknown`[], `undefined`, `undefined`\>, `...parameters: unknown[]`][]

Internal list of configured plugins.

#### Deprecated

This is a private internal property and should not be used.

#### Defined in

node\_modules/unified/lib/index.d.ts:52

***

### compiler

> **compiler**: `undefined` \| [`Compiler`](../type-aliases/Compiler.md)\<`CompileTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `CompileTree`, `CompileResult` *extends* `undefined` ? [`CompileResults`](../type-aliases/CompileResults.md) : `CompileResult`\>

Compiler to use.

#### Defined in

node\_modules/unified/lib/index.d.ts:64

***

### ~~freezeIndex~~

> **freezeIndex**: `number`

Internal state to track where we are while freezing.

#### Deprecated

This is a private internal property and should not be used.

#### Defined in

node\_modules/unified/lib/index.d.ts:72

***

### ~~frozen~~

> **frozen**: `undefined` \| `boolean`

Internal state to track whether we’re frozen.

#### Deprecated

This is a private internal property and should not be used.

#### Defined in

node\_modules/unified/lib/index.d.ts:80

***

### ~~namespace~~

> **namespace**: [`Data`](../interfaces/Data.md)

Internal state.

#### Deprecated

This is a private internal property and should not be used.

#### Defined in

node\_modules/unified/lib/index.d.ts:88

***

### parser

> **parser**: `undefined` \| [`Parser`](../type-aliases/Parser.md)\<`ParseTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `ParseTree`\>

Parser to use.

#### Defined in

node\_modules/unified/lib/index.d.ts:97

***

### ~~transformers~~

> **transformers**: [`Pipeline`](../type-aliases/Pipeline.md)

Internal list of configured transformers.

#### Deprecated

This is a private internal property and should not be used.

#### Defined in

node\_modules/unified/lib/index.d.ts:105

## Methods

### ~~copy()~~

> **copy**(): [`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

Copy a processor.

#### Returns

[`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

New *unfrozen* processor ([`Processor`](Processor.md)) that is
  configured to work the same as its ancestor.
  When the descendant processor is configured in the future it does not
  affect the ancestral processor.

#### Deprecated

This is a private internal method and should not be used.

#### Defined in

node\_modules/unified/lib/index.d.ts:117

***

### data()

#### data()

> **data**\<`Key`\>(): [`Data`](../interfaces/Data.md)

Configure the processor with info available to all plugins.
Information is stored in an object.

Typically, options can be given to a specific plugin, but sometimes it
makes sense to have information shared with several plugins.
For example, a list of HTML elements that are self-closing, which is
needed during all phases.

> **Note**: setting information cannot occur on *frozen* processors.
> Call the processor first to create a new unfrozen processor.

> **Note**: to register custom data in TypeScript, augment the
> [`Data`](../interfaces/Data.md) interface.

##### Type Parameters

• **Key** *extends* `"settings"`

##### Returns

[`Data`](../interfaces/Data.md)

The current processor when setting, the value at `key` when getting, or
  the entire dataset when getting without key.

##### Example

This example show how to get and set info:

  ```js
  import {unified} from 'unified'

  const processor = unified().data('alpha', 'bravo')

  processor.data('alpha') // => 'bravo'

  processor.data() // => {alpha: 'bravo'}

  processor.data({charlie: 'delta'})

  processor.data() // => {charlie: 'delta'}
  ```

##### Defined in

node\_modules/unified/lib/index.d.ts:177

#### data(dataset)

> **data**\<`Key`\>(`dataset`): [`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

Configure the processor with info available to all plugins.
Information is stored in an object.

Typically, options can be given to a specific plugin, but sometimes it
makes sense to have information shared with several plugins.
For example, a list of HTML elements that are self-closing, which is
needed during all phases.

> **Note**: setting information cannot occur on *frozen* processors.
> Call the processor first to create a new unfrozen processor.

> **Note**: to register custom data in TypeScript, augment the
> [`Data`](../interfaces/Data.md) interface.

##### Type Parameters

• **Key** *extends* `"settings"`

##### Parameters

• **dataset**: [`Data`](../interfaces/Data.md)

##### Returns

[`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

The current processor when setting, the value at `key` when getting, or
  the entire dataset when getting without key.

##### Example

This example show how to get and set info:

  ```js
  import {unified} from 'unified'

  const processor = unified().data('alpha', 'bravo')

  processor.data('alpha') // => 'bravo'

  processor.data() // => {alpha: 'bravo'}

  processor.data({charlie: 'delta'})

  processor.data() // => {charlie: 'delta'}
  ```

##### Defined in

node\_modules/unified/lib/index.d.ts:237

#### data(key)

> **data**\<`Key`\>(`key`?): [`Data`](../interfaces/Data.md)\[`Key`\]

Configure the processor with info available to all plugins.
Information is stored in an object.

Typically, options can be given to a specific plugin, but sometimes it
makes sense to have information shared with several plugins.
For example, a list of HTML elements that are self-closing, which is
needed during all phases.

> **Note**: setting information cannot occur on *frozen* processors.
> Call the processor first to create a new unfrozen processor.

> **Note**: to register custom data in TypeScript, augment the
> [`Data`](../interfaces/Data.md) interface.

##### Type Parameters

• **Key** *extends* `"settings"`

##### Parameters

• **key?**: `Key`

##### Returns

[`Data`](../interfaces/Data.md)\[`Key`\]

The current processor when setting, the value at `key` when getting, or
  the entire dataset when getting without key.

##### Example

This example show how to get and set info:

  ```js
  import {unified} from 'unified'

  const processor = unified().data('alpha', 'bravo')

  processor.data('alpha') // => 'bravo'

  processor.data() // => {alpha: 'bravo'}

  processor.data({charlie: 'delta'})

  processor.data() // => {charlie: 'delta'}
  ```

##### Defined in

node\_modules/unified/lib/index.d.ts:297

#### data(key, value)

> **data**\<`Key`\>(`key`?, `value`?): [`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

Configure the processor with info available to all plugins.
Information is stored in an object.

Typically, options can be given to a specific plugin, but sometimes it
makes sense to have information shared with several plugins.
For example, a list of HTML elements that are self-closing, which is
needed during all phases.

> **Note**: setting information cannot occur on *frozen* processors.
> Call the processor first to create a new unfrozen processor.

> **Note**: to register custom data in TypeScript, augment the
> [`Data`](../interfaces/Data.md) interface.

##### Type Parameters

• **Key** *extends* `"settings"`

##### Parameters

• **key?**: `Key`

• **value?**: [`Data`](../interfaces/Data.md)\[`Key`\]

##### Returns

[`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

The current processor when setting, the value at `key` when getting, or
  the entire dataset when getting without key.

##### Example

This example show how to get and set info:

  ```js
  import {unified} from 'unified'

  const processor = unified().data('alpha', 'bravo')

  processor.data('alpha') // => 'bravo'

  processor.data() // => {alpha: 'bravo'}

  processor.data({charlie: 'delta'})

  processor.data() // => {charlie: 'delta'}
  ```

##### Defined in

node\_modules/unified/lib/index.d.ts:357

***

### freeze()

> **freeze**(): [`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

Freeze a processor.

Frozen processors are meant to be extended and not to be configured
directly.

When a processor is frozen it cannot be unfrozen.
New processors working the same way can be created by calling the
processor.

It’s possible to freeze processors explicitly by calling `.freeze()`.
Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
`.stringify()`, `.process()`, or `.processSync()` are called.

#### Returns

[`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

The current processor.

#### Defined in

node\_modules/unified/lib/index.d.ts:375

***

### parse()

> **parse**(`file`?): `ParseTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `ParseTree`

Parse text to a syntax tree.

> **Note**: `parse` freezes the processor if not already *frozen*.

> **Note**: `parse` performs the parse phase, not the run phase or other
> phases.

#### Parameters

• **file?**: [`Compatible`](../type-aliases/Compatible.md)

file to parse (optional); typically `string` or `VFile`; any value
  accepted as `x` in `new VFile(x)`.

#### Returns

`ParseTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `ParseTree`

Syntax tree representing `file`.

#### Defined in

node\_modules/unified/lib/index.d.ts:390

***

### process()

#### process(file, done)

> **process**(`file`?, `done`?): `undefined`

Process the given file as configured on the processor.

> **Note**: `process` freezes the processor if not already *frozen*.

> **Note**: `process` performs the parse, run, and stringify phases.

##### Parameters

• **file?**: [`Compatible`](../type-aliases/Compatible.md)

• **done?**: [`ProcessCallback`](../type-aliases/ProcessCallback.md)\<[`VFileWithOutput`](../type-aliases/VFileWithOutput.md)\<`CompileResult`\>\>

##### Returns

`undefined`

Nothing if `done` is given.
  Otherwise a promise, rejected with a fatal error or resolved with the
  processed file.

  The parsed, transformed, and compiled value is available at
  `file.value` (see note).

  > **Note**: unified typically compiles by serializing: most
  > compilers return `string` (or `Uint8Array`).
  > Some compilers, such as the one configured with
  > [`rehype-react`][rehype-react], return other values (in this case, a
  > React tree).
  > If you’re using a compiler that doesn’t serialize, expect different
  > result values.
  >
  > To register custom results in TypeScript, add them to
  > [`CompileResultMap`](../type-aliases/CompileResultMap.md).

  [rehype-react]: https://github.com/rehypejs/rehype-react

##### Defined in

node\_modules/unified/lib/index.d.ts:433

#### process(file)

> **process**(`file`?): `Promise`\<[`VFileWithOutput`](../type-aliases/VFileWithOutput.md)\<`CompileResult`\>\>

Process the given file as configured on the processor.

> **Note**: `process` freezes the processor if not already *frozen*.

> **Note**: `process` performs the parse, run, and stringify phases.

##### Parameters

• **file?**: [`Compatible`](../type-aliases/Compatible.md)

##### Returns

`Promise`\<[`VFileWithOutput`](../type-aliases/VFileWithOutput.md)\<`CompileResult`\>\>

Nothing if `done` is given.
  Otherwise a promise, rejected with a fatal error or resolved with the
  processed file.

  The parsed, transformed, and compiled value is available at
  `file.value` (see note).

  > **Note**: unified typically compiles by serializing: most
  > compilers return `string` (or `Uint8Array`).
  > Some compilers, such as the one configured with
  > [`rehype-react`][rehype-react], return other values (in this case, a
  > React tree).
  > If you’re using a compiler that doesn’t serialize, expect different
  > result values.
  >
  > To register custom results in TypeScript, add them to
  > [`CompileResultMap`](../type-aliases/CompileResultMap.md).

  [rehype-react]: https://github.com/rehypejs/rehype-react

##### Defined in

node\_modules/unified/lib/index.d.ts:476

***

### processSync()

> **processSync**(`file`?): [`VFileWithOutput`](../type-aliases/VFileWithOutput.md)\<`CompileResult`\>

Process the given file as configured on the processor.

An error is thrown if asynchronous transforms are configured.

> **Note**: `processSync` freezes the processor if not already *frozen*.

> **Note**: `processSync` performs the parse, run, and stringify phases.

#### Parameters

• **file?**: [`Compatible`](../type-aliases/Compatible.md)

File (optional); typically `string` or `VFile`; any value accepted as
  `x` in `new VFile(x)`.

#### Returns

[`VFileWithOutput`](../type-aliases/VFileWithOutput.md)\<`CompileResult`\>

The processed file.

  The parsed, transformed, and compiled value is available at
  `file.value` (see note).

  > **Note**: unified typically compiles by serializing: most
  > compilers return `string` (or `Uint8Array`).
  > Some compilers, such as the one configured with
  > [`rehype-react`][rehype-react], return other values (in this case, a
  > React tree).
  > If you’re using a compiler that doesn’t serialize, expect different
  > result values.
  >
  > To register custom results in TypeScript, add them to
  > [`CompileResultMap`](../type-aliases/CompileResultMap.md).

  [rehype-react]: https://github.com/rehypejs/rehype-react

#### Defined in

node\_modules/unified/lib/index.d.ts:508

***

### run()

#### run(tree, done)

> **run**(`tree`, `done`?): `undefined`

Run *transformers* on a syntax tree.

> **Note**: `run` freezes the processor if not already *frozen*.

> **Note**: `run` performs the run phase, not other phases.

##### Parameters

• **tree**: `HeadTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `HeadTree`

• **done?**: [`RunCallback`](../type-aliases/RunCallback.md)\<`TailTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `TailTree`\>

##### Returns

`undefined`

Nothing if `done` is given.
  Otherwise, a promise rejected with a fatal error or resolved with the
  transformed tree.

##### Defined in

node\_modules/unified/lib/index.d.ts:547

#### run(tree, file, done)

> **run**(`tree`, `file`?, `done`?): `undefined`

Run *transformers* on a syntax tree.

> **Note**: `run` freezes the processor if not already *frozen*.

> **Note**: `run` performs the run phase, not other phases.

##### Parameters

• **tree**: `HeadTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `HeadTree`

• **file?**: [`Compatible`](../type-aliases/Compatible.md)

• **done?**: [`RunCallback`](../type-aliases/RunCallback.md)\<`TailTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `TailTree`\>

##### Returns

`undefined`

Nothing if `done` is given.
  Otherwise, a promise rejected with a fatal error or resolved with the
  transformed tree.

##### Defined in

node\_modules/unified/lib/index.d.ts:586

#### run(tree, file)

> **run**(`tree`, `file`?): `Promise`\<`TailTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `TailTree`\>

Run *transformers* on a syntax tree.

> **Note**: `run` freezes the processor if not already *frozen*.

> **Note**: `run` performs the run phase, not other phases.

##### Parameters

• **tree**: `HeadTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `HeadTree`

• **file?**: [`Compatible`](../type-aliases/Compatible.md)

##### Returns

`Promise`\<`TailTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `TailTree`\>

Nothing if `done` is given.
  Otherwise, a promise rejected with a fatal error or resolved with the
  transformed tree.

##### Defined in

node\_modules/unified/lib/index.d.ts:625

***

### runSync()

> **runSync**(`tree`, `file`?): `TailTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `TailTree`

Run *transformers* on a syntax tree.

An error is thrown if asynchronous transforms are configured.

> **Note**: `runSync` freezes the processor if not already *frozen*.

> **Note**: `runSync` performs the run phase, not other phases.

#### Parameters

• **tree**: `HeadTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `HeadTree`

Tree to transform and inspect.

• **file?**: [`Compatible`](../type-aliases/Compatible.md)

File associated with `node` (optional); any value accepted as `x` in
  `new VFile(x)`.

#### Returns

`TailTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `TailTree`

Transformed tree.

#### Defined in

node\_modules/unified/lib/index.d.ts:643

***

### stringify()

> **stringify**(`tree`, `file`?): `CompileResult` *extends* `undefined` ? [`Value`](../type-aliases/Value.md) : `CompileResult`

Compile a syntax tree.

> **Note**: `stringify` freezes the processor if not already *frozen*.

> **Note**: `stringify` performs the stringify phase, not the run phase
> or other phases.

#### Parameters

• **tree**: `CompileTree` *extends* `undefined` ? [`Node`](../interfaces/Node.md) : `CompileTree`

Tree to compile.

• **file?**: [`Compatible`](../type-aliases/Compatible.md)

File associated with `node` (optional); any value accepted as `x` in
  `new VFile(x)`.

#### Returns

`CompileResult` *extends* `undefined` ? [`Value`](../type-aliases/Value.md) : `CompileResult`

Textual representation of the tree (see note).

  > **Note**: unified typically compiles by serializing: most compilers
  > return `string` (or `Uint8Array`).
  > Some compilers, such as the one configured with
  > [`rehype-react`][rehype-react], return other values (in this case, a
  > React tree).
  > If you’re using a compiler that doesn’t serialize, expect different
  > result values.
  >
  > To register custom results in TypeScript, add them to
  > [`CompileResultMap`](../type-aliases/CompileResultMap.md).

  [rehype-react]: https://github.com/rehypejs/rehype-react

#### Defined in

node\_modules/unified/lib/index.d.ts:673

***

### use()

#### use(preset)

> **use**\<`Parameters_1`, `Input`, `Output`\>(`preset`?): [`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

Configure the processor to use a plugin, a list of usable values, or a
preset.

If the processor is already using a plugin, the previous plugin
configuration is changed based on the options that are passed in.
In other words, the plugin is not added a second time.

> **Note**: `use` cannot be called on *frozen* processors.
> Call the processor first to create a new unfrozen processor.

##### Type Parameters

• **Parameters_1** *extends* `unknown`[] = []

• **Input** *extends* `undefined` \| `string` \| [`Node`](../interfaces/Node.md) = `undefined`

• **Output** = `Input`

##### Parameters

• **preset?**: `null` \| [`Preset`](../type-aliases/Preset.md)

##### Returns

[`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

Current processor.

##### Example

There are many ways to pass plugins to `.use()`.
  This example gives an overview:

  ```js
  import {unified} from 'unified'

  unified()
    // Plugin with options:
    .use(pluginA, {x: true, y: true})
    // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
    .use(pluginA, {y: false, z: true})
    // Plugins:
    .use([pluginB, pluginC])
    // Two plugins, the second with options:
    .use([pluginD, [pluginE, {}]])
    // Preset with plugins and settings:
    .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
    // Settings only:
    .use({settings: {position: false}})
  ```

##### Defined in

node\_modules/unified/lib/index.d.ts:731

#### use(list)

> **use**\<`Parameters_1`, `Input`, `Output`\>(`list`): [`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

Configure the processor to use a plugin, a list of usable values, or a
preset.

If the processor is already using a plugin, the previous plugin
configuration is changed based on the options that are passed in.
In other words, the plugin is not added a second time.

> **Note**: `use` cannot be called on *frozen* processors.
> Call the processor first to create a new unfrozen processor.

##### Type Parameters

• **Parameters_1** *extends* `unknown`[] = []

• **Input** *extends* `undefined` \| `string` \| [`Node`](../interfaces/Node.md) = `undefined`

• **Output** = `Input`

##### Parameters

• **list**: [`PluggableList`](../type-aliases/PluggableList.md)

##### Returns

[`Processor`](Processor.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`\>

Current processor.

##### Example

There are many ways to pass plugins to `.use()`.
  This example gives an overview:

  ```js
  import {unified} from 'unified'

  unified()
    // Plugin with options:
    .use(pluginA, {x: true, y: true})
    // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
    .use(pluginA, {y: false, z: true})
    // Plugins:
    .use([pluginB, pluginC])
    // Two plugins, the second with options:
    .use([pluginD, [pluginE, {}]])
    // Preset with plugins and settings:
    .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
    // Settings only:
    .use({settings: {position: false}})
  ```

##### Defined in

node\_modules/unified/lib/index.d.ts:789

#### use(plugin, parameters)

> **use**\<`Parameters_1`, `Input`, `Output`\>(`plugin`, ...`parameters`): [`UsePlugin`](../type-aliases/UsePlugin.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`, `Input`, `Output`\>

Configure the processor to use a plugin, a list of usable values, or a
preset.

If the processor is already using a plugin, the previous plugin
configuration is changed based on the options that are passed in.
In other words, the plugin is not added a second time.

> **Note**: `use` cannot be called on *frozen* processors.
> Call the processor first to create a new unfrozen processor.

##### Type Parameters

• **Parameters_1** *extends* `unknown`[] = []

• **Input** *extends* `undefined` \| `string` \| [`Node`](../interfaces/Node.md) = `undefined`

• **Output** = `Input`

##### Parameters

• **plugin**: [`Plugin`](../type-aliases/Plugin.md)\<`Parameters_1`, `Input`, `Output`\>

• ...**parameters**: `Parameters_1` \| [`boolean`]

##### Returns

[`UsePlugin`](../type-aliases/UsePlugin.md)\<`ParseTree`, `HeadTree`, `TailTree`, `CompileTree`, `CompileResult`, `Input`, `Output`\>

Current processor.

##### Example

There are many ways to pass plugins to `.use()`.
  This example gives an overview:

  ```js
  import {unified} from 'unified'

  unified()
    // Plugin with options:
    .use(pluginA, {x: true, y: true})
    // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
    .use(pluginA, {y: false, z: true})
    // Plugins:
    .use([pluginB, pluginC])
    // Two plugins, the second with options:
    .use([pluginD, [pluginE, {}]])
    // Preset with plugins and settings:
    .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
    // Settings only:
    .use({settings: {position: false}})
  ```

##### Defined in

node\_modules/unified/lib/index.d.ts:847
