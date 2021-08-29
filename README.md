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

### The Type class

The **Type** class extends the **String** class. In addition to storing a type name, its properties reveal whether the tested value was an object or a primitive.

Syntax:
> `new Type(typeName)`  
> `new Type(typeName, objectType)`

Parameters:
- ***typeName*** - (string)
- ***objectType*** - (string) The object name used by `Object.prototype.toString()`. Include this for object types. Do not include this for primitive types.

| Property | Type | Description |
| --- | --- | --- |
| .**type** | string | The type name (`typeName`). This is also the instance's primitive value. |
| .**objectType** | string | The object name used by `Object.prototype.toString()`. |
| .**primitive** | string | For primitive types, this property is set to `typeName`. Otherwise, it's undefined. |
| .**object** | string | For object types, this property is set to `typeName`. Otherwise, it's undefined. |

### Example

```
is(2).type;	// "number"
is(2)+""	// "number"
is(2) == "number";	//true
is(2).primitive === "number";	// true
is(2).object === "number";	// false
is(2).objectType;	// undefined

let o = new Number(2);
is(o).type;	// "number"
is(o)+""	// "number"
is(o) == "number";	//true
is(o).primitive === "number";	// false
is(o).object === "number";	// true
is(o).objectType;	// "Number"
```

---


## Test for a type

For each of the type-testing methods, the only parameter is the item to be tested. The return value is a boolean.

**is.object()**  
**is.primitive()**  

**is.undefined()**  
**is.null()**  

**is.number()**  
**is.number.real()** - This is most likely what you actually want to use when testing for a number.  
**is.number.infinite()**  
**is.number.NaN()** - Note that JavaScript doesn't correctly treat all undefined forms as `NaN` (e.g., `1/0` and `0**0`).  

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
