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
| \[_descriptor_\]       | Each [descriptor](#types-and-descriptors) property is a boolean that is `true` if it applies to _value_.

Enumerable properties of `is` are string constants of all the descriptor names. These can be used 
in the `.all()` and `.any()` methods instead of string literals.
For example, these are equivalent:

> <code>is(<i>value</i>).all("number", "object")</code>

> <code>is(<i>value</i>).all(is.number, is.object)</code>


## Types and Descriptors

Types in this module do not distinguish between primitives and objects. For example, `5` and `new Number(5)` are both of type "number".

A descriptor is a boolean value that is `true` if it applies to the value being tested. Type names are included as descriptors. For example, `5` is associated with the _primitive_, _number_, and _finite_ descriptors, among others.

| Descriptor       | Type Name | Primitive Values              | Instances Of Classes
| - | - | - | -
| defined          |           | not undefined                 | `Object`
| **undefined**    |    yes    | undefined                     | 
| primitive        |           | any primitive value           | 
| **object**       |  yes[^1]  |                               | `Object`
| objectish        |           | `null`                        | `Object`
| **null**         |    yes    | `null`                        | 
| nullish          |           | undefined, `null`             | 
| **boolean**      |    yes    | `false`, `true`               | 
| false            |           | `false`                       | 
| true             |           | `true`                        | 
| falsy            |           | undefined, `null`, `false`, `0n`, `NaN`, `0`, `""` | 
| truthy           |           | not a _falsy_ value           | `Object`
| **symbol**       |    yes    | a `Symbol`                    | 
| **bigint**       |    yes    | `0n`, `5n`                    | 
| numberish        |           | `0`, `5`, `Infinity`, `NaN`   | `Number`
| **nan**          |    yes    | `NaN`                         | `Number` with value `NaN`
| **number**       |    yes    | `0`, `5`, `Infinity`          | `Number` excluding those with value `NaN`
| real[^2]         |           | `0`, `5`                      | `Number` with a finite number value
| <a name="finite"></a>finite           |           | `0`, `5`                      | `Number` with a finite number value
| infinite         |           | `Infinity`                    | `Number` with an infinite value
| **string**       |    yes    | `""`, `"foo"`                 | `String`
| **array**        |    yes    | `[]`, `[1,2]`                 | `Array`
| **map**          |    yes    |                               | `Map`
| **set**          |    yes    |                               | `Set`
| **weakmap**      |    yes    |                               | `WeakMap`
| **weakset**      |    yes    |                               | `WeakSet`
| empty            |           | `""`, `[]`                    | `String` or `Array` with `.length === 0`,<br>`Map` or `Set` with `.size === 0`
| nonempty         |           | `"foo"`, `[1,2]`              | `String` or `Array` with `.length > 0`,<br>`Map` or `Set` with `.size > 0`
| **date**         |    yes    |                               | `Date`
| **error**        |    yes    |                               | `Error`
| **function**     |    yes    |                               | `Function`
| **promise**      |    yes    |                               | `Promise`
| **regex**        |    yes    |                               | `Regex`


[^1]: The "object" type is only used for a value if no other type is appropriate.
[^2]: Deprecated. Use [_finite_](#finite) instead.
