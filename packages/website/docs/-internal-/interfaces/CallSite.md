[**@r4ai/remark-callout**](../../README.md) • **Docs**

***

[@r4ai/remark-callout](../../globals.md) / [\<internal\>](../README.md) / CallSite

# Interface: CallSite

## Methods

### getColumnNumber()

> **getColumnNumber**(): `null` \| `number`

Current column number [if this function was defined in a script]

#### Returns

`null` \| `number`

#### Defined in

node\_modules/@types/node/globals.d.ts:210

***

### getEnclosingColumnNumber()

> **getEnclosingColumnNumber**(): `number`

#### Returns

`number`

#### Defined in

node\_modules/@types/node/globals.d.ts:258

***

### getEnclosingLineNumber()

> **getEnclosingLineNumber**(): `number`

#### Returns

`number`

#### Defined in

node\_modules/@types/node/globals.d.ts:259

***

### getEvalOrigin()

> **getEvalOrigin**(): `undefined` \| `string`

A call site object representing the location where eval was called
[if this function was created using a call to eval]

#### Returns

`undefined` \| `string`

#### Defined in

node\_modules/@types/node/globals.d.ts:216

***

### getFileName()

> **getFileName**(): `undefined` \| `string`

Name of the script [if this function was defined in a script]

#### Returns

`undefined` \| `string`

#### Defined in

node\_modules/@types/node/globals.d.ts:200

***

### getFunction()

> **getFunction**(): `undefined` \| `Function`

Current function

#### Returns

`undefined` \| `Function`

#### Defined in

node\_modules/@types/node/globals.d.ts:182

***

### getFunctionName()

> **getFunctionName**(): `null` \| `string`

Name of the current function, typically its name property.
If a name property is not available an attempt will be made to try
to infer a name from the function's context.

#### Returns

`null` \| `string`

#### Defined in

node\_modules/@types/node/globals.d.ts:189

***

### getLineNumber()

> **getLineNumber**(): `null` \| `number`

Current line number [if this function was defined in a script]

#### Returns

`null` \| `number`

#### Defined in

node\_modules/@types/node/globals.d.ts:205

***

### getMethodName()

> **getMethodName**(): `null` \| `string`

Name of the property [of "this" or one of its prototypes] that holds
the current function

#### Returns

`null` \| `string`

#### Defined in

node\_modules/@types/node/globals.d.ts:195

***

### getPosition()

> **getPosition**(): `number`

#### Returns

`number`

#### Defined in

node\_modules/@types/node/globals.d.ts:260

***

### getPromiseIndex()

> **getPromiseIndex**(): `null` \| `number`

returns the index of the promise element that was followed in
Promise.all() or Promise.any() for async stack traces, or null
if the CallSite is not an async

#### Returns

`null` \| `number`

#### Defined in

node\_modules/@types/node/globals.d.ts:253

***

### getScriptHash()

> **getScriptHash**(): `string`

#### Returns

`string`

#### Defined in

node\_modules/@types/node/globals.d.ts:256

***

### getScriptNameOrSourceURL()

> **getScriptNameOrSourceURL**(): `string`

#### Returns

`string`

#### Defined in

node\_modules/@types/node/globals.d.ts:255

***

### getThis()

> **getThis**(): `unknown`

Value of "this"

#### Returns

`unknown`

#### Defined in

node\_modules/@types/node/globals.d.ts:169

***

### getTypeName()

> **getTypeName**(): `null` \| `string`

Type of "this" as a string.
This is the name of the function stored in the constructor field of
"this", if available.  Otherwise the object's [[Class]] internal
property.

#### Returns

`null` \| `string`

#### Defined in

node\_modules/@types/node/globals.d.ts:177

***

### isAsync()

> **isAsync**(): `boolean`

is this an async call (i.e. await, Promise.all(), or Promise.any())?

#### Returns

`boolean`

#### Defined in

node\_modules/@types/node/globals.d.ts:241

***

### isConstructor()

> **isConstructor**(): `boolean`

Is this a constructor call?

#### Returns

`boolean`

#### Defined in

node\_modules/@types/node/globals.d.ts:236

***

### isEval()

> **isEval**(): `boolean`

Does this call take place in code defined by a call to eval?

#### Returns

`boolean`

#### Defined in

node\_modules/@types/node/globals.d.ts:226

***

### isNative()

> **isNative**(): `boolean`

Is this call in native V8 code?

#### Returns

`boolean`

#### Defined in

node\_modules/@types/node/globals.d.ts:231

***

### isPromiseAll()

> **isPromiseAll**(): `boolean`

is this an async call to Promise.all()?

#### Returns

`boolean`

#### Defined in

node\_modules/@types/node/globals.d.ts:246

***

### isToplevel()

> **isToplevel**(): `boolean`

Is this a toplevel invocation, that is, is "this" the global object?

#### Returns

`boolean`

#### Defined in

node\_modules/@types/node/globals.d.ts:221

***

### toString()

> **toString**(): `string`

#### Returns

`string`

#### Defined in

node\_modules/@types/node/globals.d.ts:262
