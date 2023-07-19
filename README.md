# Improved JavaScript Type Testing

A robust alternative to JavaScript's built-in type testing.

See the test page for examples.


---


## Type Names

This module uses an expanded set of type names that make no distinction between primitive values and objects. 
For example, `5` and `new Number(5)` are both of type "number".  

| Type Name             | Values
| - | -
| array                 | `Array` objects
| bigint                | _bigint_ primitives
| boolean               | `false`, `true`, `Boolean` objects
| date                  | `Date` objects
| error                 | `Error` objects
| function              | `Function` objects
| map                   | `Map` objects
| nan                   | `NaN`
| null                  | `null`
| number                | _number_ primitives, `Number` objects; excludes `NaN`
| object                | instances of `Object` that don't match another type in this list
| promise               | `Promise` objects
| regex                 | `RegExp` objects
| set                   | `Set` objects
| string                | _string_ primitives, `String` objects
| symbol                | _symbol_ primitives
| undefined             | `undefined`
| weakmap               | `WeakMap` objects
| weakset               | `WeakSet` objects


## Determine a Type

The **is()** function returns an object describing the type of its argument.

Syntax:
> **is**(_value_)

Returned object:
| Property              | Description
| - | -
| .**type**             | The type name used by this module.
| .**typeof**           | The value returned by the `typeof` operator.
| .**toStringTag**      | The name used by `Object.prototype.toString()`. `undefined` for primitives.
| .**constructorName**  | The name of the argument's constructor. `undefined` for primitives.
| .**isObject**         | True if the value is an object.
| .**isPrimitive**      | True if the value is a primitive.


## Type Testing

Each of the type-testing methods return a boolean indicating if the argument is of that type.

Syntax:
> is._typeTester_(_value_)

### Basics

| Method              | Tests for
| - | -
| is.**function**()   | instance of `Function`
| is.**object**()     | instance of `Object`
| is.**primitive**()  | primitives
| is.**null**()       | `null`
| is.**nullish**()    | `undefined`, `null`
| is.**undefined**()  | `undefined`
| is.**defined**()    | not `undefined`

### Booleans

| Method              | Tests for
| - | -
| is.**boolean**()    | `false`, `true`, instance of `Boolean`
| is.**falsy**()      | `false`, `undefined`, `null`, `NaN`, `0`, `-0`, `0n`, `""`, [`document.all`](https://developer.mozilla.org/en-US/docs/Web/API/Document/all#conversion_to_boolean)
| is.**truthy**()     | not falsy

### Numbers

| Method              | Tests for
| - | -
| is.**bigint**()     | _bigint_ primitive
| is.**date**()       | instance of `Date`
| is.**numberish**()  | _number_ primitive, instance of `Number`

_Numberish_ values can be more explicitly tested using the following methods:

| Method              | Tests for
| - | -
| is.**real**()       | real numbers
| is.**infinite**()   | `Infinity`, `-Infinity`
| is.**number**()     | real numbers, `Infinity`, `-Infinity`
| is.**nan**()        | `NaN`

Note that JavaScript doesn't always treat mathematical expressions of undefined or indeterminate form as you might expect. For example, `1/0` is an undefined form, but JavaScript evaluates it as `Infinity`.

### Text

| Method              | Tests for
| - | -
| is.**regex**()      | instance of `RegExp`
| is.**string**()     | _string_ primitive, instance of `String`

### Collections

| Method              | Tests for
| - | -
| is.**array**()      | instance of `Array`
| is.**map**()        | instance of `Map`
| is.**set**()        | instance of `Set`
| is.**weakmap**()    | instance of `WeakMap`
| is.**weakset**()    | instance of `WeakSet`

### Other Common Types

| Method              | Tests for
| - | -
| is.**error**()      | instance of `Error`
| is.**promise**()    | instance of `Promise`
| is.**symbol**()     | _symbol_ primitive


## Additional Methods

| Method                       | Description
| - | -
| is.**empty**(_value_)        | Tests if an object's `.length` or `.size` property equals zero.
| is.**of**(_value_, _class_)  | Tests if _value_ is an instance of _class_. (Same as using the `instanceof` operator.)
