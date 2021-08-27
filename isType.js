/**
 * A more robust 'typeof'.
 * https://gist.github.com/wizard04wsu/8055356
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

(function (){
	
	"use strict";
	
	function is(o){
		if(o === void 0) return "undefined";
		let t = typeof o;
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
	
	let infinity = 1/0;	//Technically, 1/0 is an undefined form, but JavaScript treats it as Infinity.
	is.number.infinite = function (o){ return is.number(o) && Math.abs(o) === infinity; };
	is.number.real = function (o){ return is.number(o) && Math.abs(o) !== infinity; };
	
	is.object = function (o){ let t = typeof o; return (t === "object" && o !== null) || t === "function"; };
	is.primitive = function (o){ return !is.object(o); };
	
	
	
	let context = this,
		oldIs = context.is;
	Object.defineProperty(is, "noConflict", { value:function (){ context.is = oldIs; context = oldIs = null; delete is.noConflict; return is; }, writable:true, enumerable:false, configurable:true });
	
	
	this.is = is;
	
}).call(window);



(function test(){

	let i = 1,
		a = function (a,b){ console.assert(a === b, (i++)+". "+a+" !== "+b); };
	
	a(is(), "undefined");
	a(is(null), "null");
	a(is({}), "Object");
	a(is([]), "Array");
	a(is(arguments), "Arguments");
	if(window.BigInt) a(is(BigInt(5)), "bigint");
	else i++;
	a(is(false), "boolean");
	a(is(new Boolean()), "Boolean");
	a(is(new Date()), "Date");
	a(is(function(){}), "function");
	a(is(new Function()), "function");
	a(is(/a/), "RegExp");
	a(is(new RegExp("a")), "RegExp");
	a(is(""), "string");
	a(is(new String("")), "String");
	if(window.Symbol) a(is(Symbol()), "symbol");
	else i++;
	a(is(5), "number");
	a(is(new Number(5)), "Number");
	a(is(NaN), "NaN");
	a(is(new Number(NaN)), "NaN");
	a(is(1/0), "number");
	a(is(new Number(1/0)), "Number");

	a(is.defined(), false);
	a(is.defined(5), true);
	a(is.undefined(), true);
	a(is.undefined(5), false);
	a(is.null(null), true);
	a(is.null(5), false);
	a(is.array([]), true);
	a(is.array(5), false);
	a(is.array(arguments), false);
	if(window.BigInt) a(is.bigint(BigInt(5)), true);
	else i++;
	a(is.bigint(5), false);
	a(is.boolean(false), true);
	a(is.boolean(), false);
	a(is.boolean(5), false);
	a(is.date(new Date()), true);
	a(is.date(5), false);
	a(is.date(1*(new Date())), false);
	a(is.function(function(){}), true);
	a(is.function(new Function()), true);
	a(is.function(5), false);
	a(is.regexp(/a/), true);
	a(is.regexp(new RegExp("a")), true);
	a(is.regexp(5), false);
	a(is.string(""), true);
	a(is.string(new String()), true);
	a(is.string(5), false);
	if(window.Symbol) a(is.symbol(Symbol()), true);
	else i++;
	a(is.symbol(5), false);
	a(is.nan(NaN), true);
	a(is.nan(new Number(NaN)), true);
	a(is.nan(5), false);
	a(is.nan(new Number(5)), false);
	a(is.number(5), true);
	a(is.number(new Number()), true);
	a(is.number(NaN), false);
	a(is.number(new Number(NaN)), false);
	a(is.number(1/0), true);
	a(is.number(new Number(1/0)), true);
	a(is.number(""), false);
	a(is.number(new Date()), false);
	a(is.number(1*(new Date())), true);
	a(is.number.real(5), true);
	a(is.number.real(1/0), false);
	a(is.number.real(NaN), false);
	a(is.number.real("5"), false);
	a(is.number.infinite(1/0), true);
	a(is.number.infinite(5), false);
	a(is.number.infinite(NaN), false);
	a(is.number.infinite("Infinity"), false);
	
	a(is.object({}), true);
	a(is.object(5), false);
	a(is.object(new Number()), true);
	a(is.object(function(){}), true);
	a(is.primitive(), true);
	a(is.primitive(5), true);
	a(is.primitive(new Number()), false);
	a(is.primitive(NaN), true);
	a(is.primitive(new Number(NaN)), false);
	
})();
