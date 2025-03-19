# Improved JavaScript Type Testing

A robust alternative to JavaScript's built-in type testing.

See the [test page](https://wizard04wsu.github.io/javascript-type-testing/test/test.htm) for examples.

***Version 4 is not backwards compatible.***


---


This module uses an expanded set of type names and related descriptors to simplify common tests of values. 
Basic types do not distinguish between primitives and objects, but descriptors _primitive_ or _object_ 
can be used to determine that aspect.
For example, `5` and `new Number(5)` are both type _number_, but `5` has descriptor _primitive_ and `new Number(5)` has descriptor _object_.

The **is()** function returns an object that describes its argument.

Syntax:
> **is**(_value_)


## Return Value

| Member                 | Description
| - | -
| .type                  | The type of _value_ (using this module's type names).
| .of(_class_)           | Tests if _value_ is an instance of _class_.
| .all(_...descriptors)_ | Takes a list of descriptor names as arguments. Returns `true` if **all** of them applied to _value_.
| .any(_...descriptors_) | Takes a list of descriptor names as arguments. Returns `true` if **any** of them applied to _value_.
| \[_descriptor_\]       | Each [descriptor](#descriptors-and-type-names) property is a boolean that is `true` if it applied to _value_.

Enumerable properties of `is` are string constants of all the descriptor names. These can be used 
in the `.all()` and `.any()` methods instead of string literals.
For example, these are equivalent:

> <code>is(<i>value</i>).all("number", "object")</code>

> <code>is(<i>value</i>).all(is.number, is.object)</code>


## Descriptors and Type Names

| Descriptor       | Type Name | Primitive Values              | Instances Of Classes
| - | - | - | -
| defined          |           | not undefined                 | `Object`
| **undefined**    |    yes    | undefined                     | 
| primitive        |           | not an instance of `Object`   | 
| **object**       |    yes    |                               | `Object`
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
| real             |           | `0`, `5`                      | `Number` with a real number value
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

## Math Note

Note that JavaScript doesn't always treat mathematical expressions of undefined or indeterminate form as you might expect. For example, `1/0` is an undefined form, but JavaScript evaluates it as `Infinity`.
