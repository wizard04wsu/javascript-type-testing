# Improved JavaScript Type Testing

A robust alternative to type testing in vanilla JavaScript. Uses an expanded set of type names to simplify common tests.

See the [test page](https://wizard04wsu.github.io/javascript-type-testing/test/test.htm) for examples.

***Version 4 is not backwards compatible.***


## Syntax

> **is**(_value_)

The return value is an object that describes the argument.

| Member                 | Description
| - | -
| .type                  | The type name of _value_.
| .of(_class_)           | Tests if _value_ is an instance of _class_.
| .all(_...descriptors_) | Takes descriptor names as arguments. Returns `true` if **all** of them apply to _value_.
| .any(_...descriptors_) | Takes descriptor names as arguments. Returns `true` if **any** of them apply to _value_.
| \[_descriptor_\]       | Each [descriptor](#descriptors) property is a boolean that is `true` if it applies to _value_.

Enumerable properties of `is` are string constants of all the descriptor names. These can be used 
in the `.all()` and `.any()` methods instead of string literals.
For example, these are equivalent:

> <code>is(<i>value</i>).all("number", "object")</code>

> <code>is(<i>value</i>).all(is.number, is.object)</code>


## Types

Types in this module do not distinguish between primitives and objects. For example, `5` and `new Number(5)` are both of type "number".

| Type Names
| -
| array
| bigint
| boolean
| date
| error
| function
| map
| nan
| null
| number
| object[^1]
| promise
| regex
| set
| string
| symbol
| undefined
| weakmap
| weakset

[^1]: The "object" type name is only used if no other type name is appropriate.


## Descriptors

A descriptor is a boolean value that is `true` if it applies to the value being tested. For example, `5` is associated with the _primitive_, _number_, and _finite_ descriptors, among others.

| Descriptor       | Primitive Values              | Class Instances
| - | - | -
| defined          | not undefined                 | `Object`
| **undefined**    | undefined                     | 
| primitive        | any primitive value           | 
| **object**       |                               | `Object`
| objectish        | `null`                        | `Object`
| **null**         | `null`                        | 
| nullish          | undefined, `null`             | 
| **boolean**      | `false`, `true`               | 
| false            | `false`                       | 
| true             | `true`                        | 
| falsy            | undefined, `null`, `false`, `0n`, `NaN`, `0`, `""` | 
| truthy           | not a _falsy_ value           | `Object`
| **symbol**       | a `Symbol`                    | 
| **bigint**       | `0n`, `5n`                    | 
| numberish        | `0`, `5`, `Infinity`, `NaN`   | `Number`
| **nan**          | `NaN`                         | `Number` with value `NaN`
| **number**       | `0`, `5`, `Infinity`          | `Number` excluding those with value `NaN`
| real[^2]         | `0`, `5`                      | `Number` with a finite number value
| <a name="finite"></a>finite           | `0`, `5`                      | `Number` with a finite number value
| infinite         | `Infinity`                    | `Number` with an infinite value
| **string**       | `""`, `"foo"`                 | `String`
| **array**        | `[]`, `[1,2]`                 | `Array`
| **map**          |                               | `Map`
| **set**          |                               | `Set`
| **weakmap**      |                               | `WeakMap`
| **weakset**      |                               | `WeakSet`
| empty            | `""`, `[]`                    | `String` or `Array` with `.length === 0`,<br>`Map` or `Set` with `.size === 0`
| nonempty         | `"foo"`, `[1,2]`              | `String` or `Array` with `.length > 0`,<br>`Map` or `Set` with `.size > 0`
| **date**         |                               | `Date`
| **error**        |                               | `Error`
| **function**     |                               | `Function`
| **promise**      |                               | `Promise`
| **regex**        |                               | `RegExp`

[^2]: Deprecated. Use [_finite_](#finite) instead.
