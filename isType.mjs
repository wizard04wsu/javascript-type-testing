/**
 * A more robust 'typeof'.
 * https://github.com/wizard04wsu/javascript-type-testing
 * 
 * 
 * For each of the type testing methods, the only parameter is the item to be tested. These methods do not perform coercion.
 * 
 * is(o) - Returns the item's type.
 *       - NaN is considered its own type (instead of a number), since it essentially represents something that cannot be converted to a number.
 *       - For objects, the type of the object is given instead of just 'object' (e.g., 'Array').
 * 
 * is.defined(o)
 * is.undefined(o)
 * is.null(o)
 * is.nan(o) - NaN or a Number object with value NaN
 * 
 * is.array(o)
 * is.bigint(o)
 * is.boolean(o)
 * is.date(o)
 * is.function(o)
 * is.number(o) - excludes NaN
 * is.number.infinite(o)
 * is.number.nan(o) - same as is.nan(o)
 * is.number.real(o)
 * is.regexp(o)
 * is.string(o)
 * is.symbol(o)
 * 
 * is.object(o)
 * is.primitive(o)
 * 
 * 
 * is.noConflict() - Restores 'is' to what it was before this script replaced it.
 */

function is(o){
	if(o === void 0) return "undefined";
	const t = typeof o;
	if(t === "object"){
		if(o === null) return "null";
		let name = Object.prototype.toString.call(o).slice(8, -1);
		if(name === "Number" && 1*o !== 1*o) return "NaN";
		return name;	//object type
	}
	if(o !== o) return "NaN";
	return t;	//primitive type or "function"
}

function fn(type, eitherCase){
	if(eitherCase) return function (o){ return is(o).toLowerCase() === type; };
	return function (o){ return is(o) === type; };
}

is.undefined = function (o){ return o === void 0; };
is.defined = function (o){ return o !== void 0; };
is.null = function (o){ return o === null; };

is.nan = fn("NaN");	//NaN or a Number object with value NaN
//Note that JavaScript doesn't correctly treat all undefined forms as NaN (e.g., 1/0 and 0**0).

is.array = fn("Array");
is.bigint = fn("bigint");
is.boolean = fn("boolean", true);
is.date = fn("Date");
is.function = fn("function");
is.number = fn("number", true);	//excludes NaN
is.number.nan = is.nan;
is.regexp = fn("RegExp");
is.string = fn("string", true);
is.symbol = fn("symbol");

const infinity = 1/0;	//Technically, 1/0 is an undefined form, but JavaScript treats it as Infinity.
is.number.infinite = function (o){ return is.number(o) && Math.abs(o) === infinity; };
is.number.real = function (o){ return is.number(o) && Math.abs(o) !== infinity; };

is.object = function (o){ let t = typeof o; return (t === "object" && o !== null) || t === "function"; };
is.primitive = function (o){ return !is.object(o); };



export { is as default };
