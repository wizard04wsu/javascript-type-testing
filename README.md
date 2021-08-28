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
> `new Type(typeName, isPrimitive)`

Parameters:
- ***typeName*** - (string)
- ***isPrimitive*** - (boolean) Optional.

| Property | Type | Description |
| --- | --- | --- |
| .**type** | string | The type name. This is equivalent to the class's string value. |
| .**primitive** | string | If the `isPrimitive` argument was truthy when constructed, this property was set to the type name. Otherwise, it's undefined. |
| .**object** | string | If the `isPrimitive` argument was falsy when constructed, this property was set to the type name. Otherwise, it's undefined. |

### Example

```
let u;
let p = 2;
let o = new Number(3);

is(u).type;	// "undefined"
is(p).type;	// "number"
is(o).type;	// "number"
is(o)+""	// "number"

is(o) == "number";	//true
is(o).primitive === "number";	// false
is(o).object === "number";	// true
```

---


## Test for a type

For each of the type-testing methods, the only parameter is the item to be tested. The return value is a boolean.

**is.primitive()**  
**is.object()**  

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
**is.array()**  
**is.date()**  
**is.regexp()**  
**is.function()**  


