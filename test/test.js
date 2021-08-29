import is from "../isType.mjs";


class Number2 extends Number { constructor(val){ super(val); } }
class Number3 extends Number { constructor(val){ super(val); this[Symbol.toStringTag] = "Number3"; } }

let i;

console.group("is()");
	i = 1;
	
	try{
		const t = is(nonExistentVar);
		console.assert(false, `${i++}. ${t} (should have thrown a ReferenceError)`);
	}catch(e){
		if(!(e instanceof ReferenceError))
			console.assert(false, `${i++}. threw a ${Object.prototype.toString.call(e).slice(8,-1)} (should have thrown a ReferenceError)`);
	}
	
	function testIs(result, expectedType, expectedObjectType){
		console.assert(result.type === expectedType && result.objectType === expectedObjectType,
			`${i++}. ${result.type}/${result.objectType} !== ${expectedType}/${expectedObjectType}`);
	}
	
	testIs(is({}), "object", "Object");
	testIs(is(new Object()), "object", "Object");
	
	testIs(is(), "undefined");
	testIs(is(null), "null");
	
	testIs(is(5), "number");
	testIs(is(new Number(5)), "number", "Number");
	testIs(is(1/0), "number");
	testIs(is(new Number(1/0)), "number", "Number");
	testIs(is(NaN), "number");
	testIs(is(new Number(NaN)), "number", "Number");
	testIs(is(new Number2(5)), "number", "Number");
	testIs(is(new Number3(5)), "number", "Number3");
	
	testIs(is(BigInt(5)), "bigint");
	testIs(is(false), "boolean");
	testIs(is(new Boolean()), "boolean", "Boolean");
	testIs(is(""), "string");
	testIs(is(new String("")), "string", "String");
	testIs(is(Symbol()), "symbol");
	testIs(is(function(){}), "function", "Function");
	testIs(is(new Function()), "function", "Function");
	testIs(is(()=>{}), "function", "Function");
	testIs(is(function*(){}), "function", "Function");
	
	testIs(is([]), "object", "Array");
	testIs(is(new Array()), "object", "Array");
	testIs(is(new Date()), "object", "Date");
	testIs(is(new Error()), "object", "Error");
	testIs(is(new ReferenceError()), "object", "Error");
	testIs(is(/a/), "object", "RegExp");
	testIs(is(new RegExp("a")), "object", "RegExp");
	
	(function (){
		testIs(is(arguments), "object", "Arguments");
	})();
	
console.groupEnd();

console.group("is.___()");
	i = 1;
	function testIsType(result, expected){
		console.assert(result === expected, `${i++}. ${result} !== ${expected}`);
	}
	
	testIsType(is.undefined(), true);
	testIsType(is.undefined(5), false);
	testIsType(is.null(null), true);
	testIsType(is.null(5), false);
	
	testIsType(is.number(5), true);
	testIsType(is.number(new Number()), true);
	testIsType(is.number.real(5), true);
	testIsType(is.number.real(new Number()), true);
	testIsType(is.number.real(1/0), false);
	testIsType(is.number.real(NaN), false);
	testIsType(is.number.real("5"), false);
	testIsType(is.number(1/0), true);
	testIsType(is.number(new Number(1/0)), true);
	testIsType(is.number.infinite(1/0), true);
	testIsType(is.number.infinite(new Number(1/0)), true);
	testIsType(is.number.infinite(5), false);
	testIsType(is.number.infinite(NaN), false);
	testIsType(is.number.infinite("Infinity"), false);
	testIsType(is.number(NaN), true);
	testIsType(is.number(new Number(NaN)), true);
	testIsType(is.number.NaN(NaN), true);
	testIsType(is.number.NaN(new Number(NaN)), true);
	testIsType(is.number.NaN(5), false);
	testIsType(is.number.NaN(1/0), false);
	testIsType(is.number.NaN("NaN"), false);
	testIsType(is.number(""), false);
	testIsType(is.number(new Date()), false);
	testIsType(is.number(1*(new Date())), true);
	testIsType(is.number(new Number2()), true);
	testIsType(is.number(new Number3()), true);
	
	testIsType(is.bigint(5n), true);
	testIsType(is.bigint(BigInt(5)), true);
	testIsType(is.bigint(5), false);
	testIsType(is.boolean(false), true);
	testIsType(is.boolean(true), true);
	testIsType(is.boolean(5), false);
	testIsType(is.string(""), true);
	testIsType(is.string(new String()), true);
	testIsType(is.string(5), false);
	testIsType(is.symbol(Symbol.toStringTag), true);
	testIsType(is.symbol(Symbol()), true);
	testIsType(is.symbol(5), false);
	testIsType(is.function(function(){}), true);
	testIsType(is.function(new Function()), true);
	testIsType(is.function(()=>{}), true);
	testIsType(is.function(function*(){}), true);
	testIsType(is.function(5), false);
	
	testIsType(is.array([]), true);
	testIsType(is.array(new Array()), true);
	(function (){
		testIsType(is.array(arguments), false);
	})();
	testIsType(is.date(new Date()), true);
	testIsType(is.date(1*(new Date())), false);
	testIsType(is.error(new Error()), true);
	testIsType(is.error(new ReferenceError()), true);
	testIsType(is.regexp(/a/), true);
	testIsType(is.regexp(new RegExp("a")), true);
	
	testIsType(is.object({}), true);
	testIsType(is.object(5), false);
	testIsType(is.object(new Number()), true);
	testIsType(is.object(function(){}), true);
	testIsType(is.object([]), true);
	testIsType(is.primitive(), true);
	testIsType(is.primitive(5), true);
	testIsType(is.primitive(new Number()), false);
	testIsType(is.primitive(NaN), true);
	testIsType(is.primitive(new Number(NaN)), false);
	testIsType(is.primitive([]), false);
	
console.groupEnd();
