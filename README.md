# Improved JavaScript Type Testing
A robust alternative to JavaScript's `typeof` keyword.

This is a JavaScript module that exports: [`is`](#is) (default)

---


## Get the type

### is()

The **is()** function determines the type of its argument and returns a [Type](#the-type-class) object.

Syntax:
> `is(value)`

Parameters:
- ***value*** - The value to determine the type of.

Return value:
- A [Type](#the-type-class) object.

### Type objects

In addition to storing a type name, a **Type** object's properties reveal whether the tested value was an object or a primitive.

| Property        | Type   | Description
| - | - | -
| .**type**       | string | The type name returned by the `typeof` operator.
| .**objectType** | string | The object name used by `Object.prototype.toString()`. Undefined for primitive types.
| .**primitive**  | string | True for primitive types.
| .**object**     | string | True for object types.

### Example

```
is(2).type;	// "number"
is(2).toString()	// "number"
is(2) == "number";	//true
is(2).primitive;	// true
is(2).object;	// undefined
is(2).objectType;	// undefined

let o = new Number(2);
is(o).type;	// "number"
is(o).toString()	// "number"
is(o) == "number";	//true
is(o).primitive;	// undefined
is(o).object;	// true
is(o).objectType;	// "Number"
```

---


## Test for a type

For each of the type-testing methods, the only parameter is the item to be tested. The return value is a boolean.

**is.object()**  
**is.primitive()**  

**is.undefined()**  
**is.null()**  

**is.number()** - A real number.  
**is.infinite()** \*  
**is.nan()** \*  

\* Note that JavaScript doesn't correctly treat all undefined forms as `NaN`. For example, `1/0` and `0**0` are undefined forms, but JavaScript treats them as `Infinity`.  

**is.bigint()**  
**is.boolean()**  
**is.string()**  
**is.symbol()**  
**is.function()**  

**is.array()**  
**is.date()**  
**is.error()**  
**is.regexp()**  
**is.map()**  
**is.set()**  
**is.weakmap()**  
**is.weakset()**  
**is.promise()**  
