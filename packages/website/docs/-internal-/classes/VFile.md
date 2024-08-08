[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / VFile

# Class: VFile

## Constructors

### new VFile()

> **new VFile**(`value`?): [`VFile`](VFile.md)

Create a new virtual file.

`options` is treated as:

*   `string` or `Uint8Array` — `{value: options}`
*   `URL` — `{path: options}`
*   `VFile` — shallow copies its data over to the new file
*   `object` — all fields are shallow copied over to the new file

Path related fields are set in the following order (least specific to
most specific): `history`, `path`, `basename`, `stem`, `extname`,
`dirname`.

You cannot set `dirname` or `extname` without setting either `history`,
`path`, `basename`, or `stem` too.

#### Parameters

• **value?**: `null` \| [`Compatible`](../type-aliases/Compatible.md)

File value.

#### Returns

[`VFile`](VFile.md)

New instance.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:24

## Properties

### cwd

> **cwd**: `string`

Base of `path` (default: `process.cwd()` or `'/'` in browsers).

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:30

***

### data

> **data**: [`Data`](../type-aliases/Data.md)

Place to store custom info (default: `{}`).

It’s OK to store custom data directly on the file but moving it to
`data` is recommended.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:39

***

### history

> **history**: `string`[]

List of file paths the file moved between.

The first is the original path and the last is the current path.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:47

***

### map

> **map**: `undefined` \| `null` \| [`Map`](../type-aliases/Map.md)

Source map.

This type is equivalent to the `RawSourceMap` type from the `source-map`
module.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:68

***

### messages

> **messages**: [`VFileMessage`](VFileMessage.md)[]

List of messages associated with the file.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:53

***

### result

> **result**: `unknown`

Custom, non-string, compiled, representation.

This is used by unified to store non-string results.
One example is when turning markdown into React nodes.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:77

***

### stored

> **stored**: `boolean`

Whether a file was saved to disk.

This is used by vfile reporters.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:85

***

### value

> **value**: [`Value`](../type-aliases/Value.md)

Raw value.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:59

## Accessors

### basename

> `get` **basename**(): `undefined` \| `string`

Get the basename (including extname) (example: `'index.min.js'`).

> `set` **basename**(`arg`): `void`

Set basename (including extname) (`'index.min.js'`).

Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
on windows).
Cannot be nullified (use `file.path = file.dirname` instead).

#### Parameters

• **arg**: `undefined` \| `string`

#### Returns

`undefined` \| `string`

Basename.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:105

***

### dirname

> `get` **dirname**(): `undefined` \| `string`

Get the parent path (example: `'~'`).

> `set` **dirname**(`arg`): `void`

Set the parent path (example: `'~'`).

Cannot be set if there’s no `path` yet.

#### Parameters

• **arg**: `undefined` \| `string`

#### Returns

`undefined` \| `string`

Dirname.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:143

***

### extname

> `get` **extname**(): `undefined` \| `string`

Get the extname (including dot) (example: `'.js'`).

> `set` **extname**(`arg`): `void`

Set the extname (including dot) (example: `'.js'`).

Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
on windows).
Cannot be set if there’s no `path` yet.

#### Parameters

• **arg**: `undefined` \| `string`

#### Returns

`undefined` \| `string`

Extname.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:163

***

### path

> `get` **path**(): `string`

Get the full path (example: `'~/index.min.js'`).

> `set` **path**(`arg`): `void`

Set the full path (example: `'~/index.min.js'`).

Cannot be nullified.
You can set a file URL (a `URL` object with a `file:` protocol) which will
be turned into a path with `url.fileURLToPath`.

#### Parameters

• **arg**: `string`

#### Returns

`string`

Path.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:125

***

### stem

> `get` **stem**(): `undefined` \| `string`

Get the stem (basename w/o extname) (example: `'index.min'`).

> `set` **stem**(`arg`): `void`

Set the stem (basename w/o extname) (example: `'index.min'`).

Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
on windows).
Cannot be nullified (use `file.path = file.dirname` instead).

#### Parameters

• **arg**: `undefined` \| `string`

#### Returns

`undefined` \| `string`

Stem.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:183

## Methods

### fail()

#### fail(reason, options)

> **fail**(`reason`, `options`?): `never`

##### Parameters

• **reason**: `string`

• **options?**: `null` \| [`Options`](../type-aliases/Options.md)

##### Returns

`never`

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:184

#### fail(reason, parent, origin)

> **fail**(`reason`, `parent`, `origin`?): `never`

##### Parameters

• **reason**: `string`

• **parent**: `undefined` \| `null` \| [`Node`](../interfaces/Node.md) \| [`NodeLike`](../type-aliases/NodeLike.md)

• **origin?**: `null` \| `string`

##### Returns

`never`

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:185

#### fail(reason, place, origin)

> **fail**(`reason`, `place`, `origin`?): `never`

##### Parameters

• **reason**: `string`

• **place**: `undefined` \| `null` \| [`Position`](../interfaces/Position.md) \| [`Point`](../interfaces/Point.md)

• **origin?**: `null` \| `string`

##### Returns

`never`

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:190

#### fail(reason, origin)

> **fail**(`reason`, `origin`?): `never`

##### Parameters

• **reason**: `string`

• **origin?**: `null` \| `string`

##### Returns

`never`

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:195

#### fail(cause, parent, origin)

> **fail**(`cause`, `parent`, `origin`?): `never`

##### Parameters

• **cause**: `Error` \| [`VFileMessage`](VFileMessage.md)

• **parent**: `undefined` \| `null` \| [`Node`](../interfaces/Node.md) \| [`NodeLike`](../type-aliases/NodeLike.md)

• **origin?**: `null` \| `string`

##### Returns

`never`

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:196

#### fail(cause, place, origin)

> **fail**(`cause`, `place`, `origin`?): `never`

##### Parameters

• **cause**: `Error` \| [`VFileMessage`](VFileMessage.md)

• **place**: `undefined` \| `null` \| [`Position`](../interfaces/Position.md) \| [`Point`](../interfaces/Point.md)

• **origin?**: `null` \| `string`

##### Returns

`never`

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:201

#### fail(cause, origin)

> **fail**(`cause`, `origin`?): `never`

##### Parameters

• **cause**: `Error` \| [`VFileMessage`](VFileMessage.md)

• **origin?**: `null` \| `string`

##### Returns

`never`

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:206

***

### info()

#### info(reason, options)

> **info**(`reason`, `options`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **reason**: `string`

• **options?**: `null` \| [`Options`](../type-aliases/Options.md)

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:207

#### info(reason, parent, origin)

> **info**(`reason`, `parent`, `origin`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **reason**: `string`

• **parent**: `undefined` \| `null` \| [`Node`](../interfaces/Node.md) \| [`NodeLike`](../type-aliases/NodeLike.md)

• **origin?**: `null` \| `string`

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:211

#### info(reason, place, origin)

> **info**(`reason`, `place`, `origin`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **reason**: `string`

• **place**: `undefined` \| `null` \| [`Position`](../interfaces/Position.md) \| [`Point`](../interfaces/Point.md)

• **origin?**: `null` \| `string`

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:216

#### info(reason, origin)

> **info**(`reason`, `origin`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **reason**: `string`

• **origin?**: `null` \| `string`

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:221

#### info(cause, parent, origin)

> **info**(`cause`, `parent`, `origin`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **cause**: `Error` \| [`VFileMessage`](VFileMessage.md)

• **parent**: `undefined` \| `null` \| [`Node`](../interfaces/Node.md) \| [`NodeLike`](../type-aliases/NodeLike.md)

• **origin?**: `null` \| `string`

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:222

#### info(cause, place, origin)

> **info**(`cause`, `place`, `origin`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **cause**: `Error` \| [`VFileMessage`](VFileMessage.md)

• **place**: `undefined` \| `null` \| [`Position`](../interfaces/Position.md) \| [`Point`](../interfaces/Point.md)

• **origin?**: `null` \| `string`

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:227

#### info(cause, origin)

> **info**(`cause`, `origin`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **cause**: `Error` \| [`VFileMessage`](VFileMessage.md)

• **origin?**: `null` \| `string`

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:232

***

### message()

#### message(reason, options)

> **message**(`reason`, `options`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **reason**: `string`

• **options?**: `null` \| [`Options`](../type-aliases/Options.md)

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:236

#### message(reason, parent, origin)

> **message**(`reason`, `parent`, `origin`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **reason**: `string`

• **parent**: `undefined` \| `null` \| [`Node`](../interfaces/Node.md) \| [`NodeLike`](../type-aliases/NodeLike.md)

• **origin?**: `null` \| `string`

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:240

#### message(reason, place, origin)

> **message**(`reason`, `place`, `origin`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **reason**: `string`

• **place**: `undefined` \| `null` \| [`Position`](../interfaces/Position.md) \| [`Point`](../interfaces/Point.md)

• **origin?**: `null` \| `string`

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:245

#### message(reason, origin)

> **message**(`reason`, `origin`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **reason**: `string`

• **origin?**: `null` \| `string`

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:250

#### message(cause, parent, origin)

> **message**(`cause`, `parent`, `origin`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **cause**: `Error` \| [`VFileMessage`](VFileMessage.md)

• **parent**: `undefined` \| `null` \| [`Node`](../interfaces/Node.md) \| [`NodeLike`](../type-aliases/NodeLike.md)

• **origin?**: `null` \| `string`

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:251

#### message(cause, place, origin)

> **message**(`cause`, `place`, `origin`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **cause**: `Error` \| [`VFileMessage`](VFileMessage.md)

• **place**: `undefined` \| `null` \| [`Position`](../interfaces/Position.md) \| [`Point`](../interfaces/Point.md)

• **origin?**: `null` \| `string`

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:256

#### message(cause, origin)

> **message**(`cause`, `origin`?): [`VFileMessage`](VFileMessage.md)

##### Parameters

• **cause**: `Error` \| [`VFileMessage`](VFileMessage.md)

• **origin?**: `null` \| `string`

##### Returns

[`VFileMessage`](VFileMessage.md)

##### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:261

***

### toString()

> **toString**(`encoding`?): `string`

Serialize the file.

> **Note**: which encodings are supported depends on the engine.
> For info on Node.js, see:
> <https://nodejs.org/api/util.html#whatwg-supported-encodings>.

#### Parameters

• **encoding?**: `null` \| `string`

Character encoding to understand `value` as when it’s a `Uint8Array`
  (default: `'utf-8'`).

#### Returns

`string`

Serialized file.

#### Defined in

node\_modules/unified/node\_modules/vfile/lib/index.d.ts:278
