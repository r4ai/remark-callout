[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / VFileMessage

# Class: VFileMessage

Message.

## Extends

- `Error`

## Constructors

### new VFileMessage()

> **new VFileMessage**(`reason`, `options`?): [`VFileMessage`](VFileMessage.md)

#### Parameters

• **reason**: `string`

• **options?**: `null` \| [`Options`](../type-aliases/Options.md)

#### Returns

[`VFileMessage`](VFileMessage.md)

#### Overrides

`Error.constructor`

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:5

### new VFileMessage()

> **new VFileMessage**(`reason`, `parent`, `origin`?): [`VFileMessage`](VFileMessage.md)

#### Parameters

• **reason**: `string`

• **parent**: `undefined` \| `null` \| [`Node`](../interfaces/Node.md) \| [`NodeLike`](../type-aliases/NodeLike.md)

• **origin?**: `null` \| `string`

#### Returns

[`VFileMessage`](VFileMessage.md)

#### Overrides

`Error.constructor`

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:6

### new VFileMessage()

> **new VFileMessage**(`reason`, `place`, `origin`?): [`VFileMessage`](VFileMessage.md)

#### Parameters

• **reason**: `string`

• **place**: `undefined` \| `null` \| [`Position`](../interfaces/Position.md) \| [`Point`](../interfaces/Point.md)

• **origin?**: `null` \| `string`

#### Returns

[`VFileMessage`](VFileMessage.md)

#### Overrides

`Error.constructor`

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:11

### new VFileMessage()

> **new VFileMessage**(`reason`, `origin`?): [`VFileMessage`](VFileMessage.md)

#### Parameters

• **reason**: `string`

• **origin?**: `null` \| `string`

#### Returns

[`VFileMessage`](VFileMessage.md)

#### Overrides

`Error.constructor`

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:16

### new VFileMessage()

> **new VFileMessage**(`cause`, `parent`, `origin`?): [`VFileMessage`](VFileMessage.md)

#### Parameters

• **cause**: `Error` \| [`VFileMessage`](VFileMessage.md)

• **parent**: `undefined` \| `null` \| [`Node`](../interfaces/Node.md) \| [`NodeLike`](../type-aliases/NodeLike.md)

• **origin?**: `null` \| `string`

#### Returns

[`VFileMessage`](VFileMessage.md)

#### Overrides

`Error.constructor`

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:17

### new VFileMessage()

> **new VFileMessage**(`cause`, `place`, `origin`?): [`VFileMessage`](VFileMessage.md)

#### Parameters

• **cause**: `Error` \| [`VFileMessage`](VFileMessage.md)

• **place**: `undefined` \| `null` \| [`Position`](../interfaces/Position.md) \| [`Point`](../interfaces/Point.md)

• **origin?**: `null` \| `string`

#### Returns

[`VFileMessage`](VFileMessage.md)

#### Overrides

`Error.constructor`

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:22

### new VFileMessage()

> **new VFileMessage**(`cause`, `origin`?): [`VFileMessage`](VFileMessage.md)

#### Parameters

• **cause**: `Error` \| [`VFileMessage`](VFileMessage.md)

• **origin?**: `null` \| `string`

#### Returns

[`VFileMessage`](VFileMessage.md)

#### Overrides

`Error.constructor`

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:27

## Properties

### actual

> **actual**: `undefined` \| `string`

Specify the source value that’s being reported, which is deemed
incorrect.

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:92

***

### ancestors

> **ancestors**: `undefined` \| [`Node`](../interfaces/Node.md)[]

Stack of ancestor nodes surrounding the message.

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:33

***

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Defined in

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### column

> **column**: `undefined` \| `number`

Starting column of message.

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:39

***

### expected

> **expected**: `undefined` \| `string`[]

Suggest acceptable values that can be used instead of `actual`.

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:98

***

### fatal

> **fatal**: `undefined` \| `null` \| `boolean`

State of problem.

* `true` — error, file not usable
* `false` — warning, change may be needed
* `undefined` — change likely not needed

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:49

***

### file

> **file**: `undefined` \| `string`

Path of a file (used throughout the `VFile` ecosystem).

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:55

***

### line

> **line**: `undefined` \| `number`

Starting line of error.

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:61

***

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### note

> **note**: `undefined` \| `string`

Long form description of the message (you should use markdown).

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:104

***

### place

> **place**: `undefined` \| [`Position`](../interfaces/Position.md) \| [`Point`](../interfaces/Point.md)

Place of message.

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:67

***

### reason

> **reason**: `string`

Reason for message, should use markdown.

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:73

***

### ruleId

> **ruleId**: `undefined` \| `string`

Category of message (example: `'my-rule'`).

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:79

***

### source

> **source**: `undefined` \| `string`

Namespace of message (example: `'my-package'`).

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:85

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### url

> **url**: `undefined` \| `string`

Link to docs for the message.

> 👉 **Note**: this must be an absolute URL that can be passed as `x`
> to `new URL(x)`.

#### Defined in

node\_modules/vfile-message/lib/index.d.ts:113

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### Parameters

• **err**: `Error`

• **stackTraces**: [`CallSite`](../interfaces/CallSite.md)[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

#### Defined in

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Defined in

node\_modules/@types/node/globals.d.ts:30

## Methods

### captureStackTrace()

#### captureStackTrace(targetObject, constructorOpt)

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

##### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

##### Returns

`void`

##### Inherited from

`Error.captureStackTrace`

##### Defined in

node\_modules/@types/node/globals.d.ts:21

#### captureStackTrace(targetObject, constructorOpt)

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

##### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

##### Returns

`void`

##### Inherited from

`Error.captureStackTrace`

##### Defined in

node\_modules/bun-types/globals.d.ts:1637
