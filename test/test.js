import is from "../isType.mjs.js";


function _is(value, pseudocode, _type, _typeof, _toStringTag, _constructorName){
	
	const type = is(value);
	
	const tbody = document.getElementById("type_results");
	const tr = document.createElement("tr");
	tr.innerHTML = `<td>${pseudocode}</td>`;
	createCell(type.type, _type);
	createCell(type.typeof, _typeof);
	createCell(type.toStringTag, _toStringTag);
	createCell(type.constructorName, _constructorName);
	tbody.appendChild(tr);
	
	function createCell(actual, expected){
		const td = document.createElement("td");
		td.dataset.expected = expected === void 0 ? "undefined" : `"${expected}"`;
		td.innerHTML = actual === void 0 ? `<i>undefined</i>` : `"${actual}"`;
		if(actual !== expected) td.classList.add("fail");
		tr.appendChild(td);
	}
}

{
	_is([], "[]", "array", "object", "Array", "Array");
	_is(new Array(), "new Array()", "array", "object", "Array", "Array");
	_is(5n, "5n", "bigint", "bigint");
	_is(true, "true", "boolean", "boolean");
	_is(false, "false", "boolean", "boolean");
	_is(new Boolean(), "new Boolean()", "boolean", "object", "Boolean", "Boolean");
	_is(new Date(), "new Date()", "date", "object", "Date", "Date");
	_is(new Error(), "new Error()", "error", "object", "Error", "Error");
	_is(new TypeError(), "new TypeError()", "error", "object", "Error", "TypeError");
	_is(()=>{}, "()=>{}", "function", "function", "Function", "Function");
	_is(Object, "Object", "function", "function", "Function", "Function");
	_is(new Map(), "new Map()", "map", "object", "Map", "Map");
	_is(NaN, "NaN", "nan", "number");
	_is(new Number(NaN), "new Number(NaN)", "nan", "object", "Number", "Number");
	_is(new Number('a'), "new Number('a')", "nan", "object", "Number", "Number");
	_is(null, "null", "null", "object");
	_is(5, "5", "number", "number");
	_is(Infinity, "Infinity", "number", "number");
	_is(new Number(), "new Number()", "number", "object", "Number", "Number");
	_is({}, "{}", "object", "object", "Object", "Object");
	_is(new Object(), "new Object()", "object", "object", "Object", "Object");
	_is(new Promise(()=>{}), "new Promise(()=>{})", "promise", "object", "Promise", "Promise");
	_is(/a/, "/a/", "regex", "object", "RegExp", "RegExp");
	_is(new RegExp(), "new RegExp()", "regex", "object", "RegExp", "RegExp");
	_is(new Set(), "new Set()", "set", "object", "Set", "Set");
	_is("", '""', "string", "string");
	_is("a", '"a"', "string", "string");
	_is(new String(), "new String()", "string", "object", "String", "String");
	_is(Symbol(), "Symbol()", "symbol", "symbol");
	_is(void 0, "void 0", "undefined", "undefined");
	_is(new WeakMap(), "new WeakMap()", "weakmap", "object", "WeakMap", "WeakMap");
	_is(new WeakSet(), "new WeakSet()", "weakset", "object", "WeakSet", "WeakSet");
	{
		class Foo {}
		_is(new Foo(), "<i>class Foo {}</i><br>new Foo()", "object", "object", "Object", "Foo");
	}
	{
		class Foo extends String {}
		_is(new Foo(), "<i>class Foo extends String {}</i><br>new Foo()", "string", "object", "String", "Foo");
	}
	{
		class Foo { get [Symbol.toStringTag](){ return "Bar"; } }
		_is(new Foo(), "<i>class Foo { get [Symbol.toStringTag](){ return \"Bar\"; } }</i><br>new Foo()", "object", "object", "Bar", "Foo");
	}
}


function _tester(value, pseudocode, _testerNames){
	
	const testers = [
		"array",
		"bigint",
		"boolean",
		"date",
		"defined",
		"error",
		"falsy",
		"function",
		"infinite",
		"map",
		"nan",
		"null",
		"nullish",
		"number",
		"numberish",
		"object",
		"primitive",
		"promise",
		"real",
		"regex",
		"set",
		"string",
		"symbol",
		"truthy",
		"undefined",
		"weakmap",
		"weakset",
	];
	
	const tbody = document.getElementById("tester_results");
	const tr = document.createElement("tr");
	tr.innerHTML = `<td>${pseudocode}</td>`;
	const matches = [];
	for(const tester of testers){
		const match = is[tester](value);
		if(match) matches.push(tester);
	}
	createCell(matches.join(", "), _testerNames.sort().join(", "));
	tbody.appendChild(tr);
	
	function createCell(actual, expected){
		const td = document.createElement("td");
		td.dataset.expected = expected;
		td.innerHTML = actual;
		if(actual !== expected) td.classList.add("fail");
		tr.appendChild(td);
	}
}

{
	_tester([], "[]", ["array", "object", "defined", "truthy"]);
	_tester(new Array(), "new Array()", ["array", "object", "defined", "truthy"]);
	_tester(5n, "5n", ["bigint", "primitive", "defined", "truthy"]);
	_tester(0n, "0n", ["bigint", "primitive", "defined", "falsy"]);
	_tester(true, "true", ["boolean", "primitive", "defined", "truthy"]);
	_tester(false, "false", ["boolean", "primitive", "defined", "falsy"]);
	_tester(new Boolean(), "new Boolean()", ["boolean", "object", "defined", "truthy"]);
	_tester(new Date(), "new Date()", ["date", "object", "defined", "truthy"]);
	_tester(new Error(), "new Error()", ["error", "object", "defined", "truthy"]);
	_tester(new TypeError(), "new TypeError()", ["error", "object", "defined", "truthy"]);
	_tester(()=>{}, "()=>{}", ["function", "object", "defined", "truthy"]);
	_tester(Object, "Object", ["function", "object", "defined", "truthy"]);
	_tester(new Map(), "new Map()", ["map", "object", "defined", "truthy"]);
	_tester(NaN, "NaN", ["nan", "numberish", "primitive", "defined", "falsy"]);
	_tester(new Number(NaN), "new Number(NaN)", ["nan", "numberish", "object", "defined", "truthy"]);
	_tester(new Number('a'), "new Number('a')", ["nan", "numberish", "object", "defined", "truthy"]);
	_tester(null, "null", ["null", "nullish", "primitive", "defined", "falsy"]);
	_tester(5, "5", ["number", "numberish", "real", "primitive", "defined", "truthy"]);
	_tester(0, "0", ["number", "numberish", "real", "primitive", "defined", "falsy"]);
	_tester(-0, "-0", ["number", "numberish", "real", "primitive", "defined", "falsy"]);
	_tester(Infinity, "Infinity", ["number", "infinite", "numberish", "primitive", "defined", "truthy"]);
	_tester(new Number(5), "new Number(5)", ["number", "numberish", "real", "object", "defined", "truthy"]);
	_tester(new Number(0), "new Number(0)", ["number", "numberish", "real", "object", "defined", "truthy"]);
	_tester({}, "{}", ["object", "defined", "truthy"]);
	_tester(new Object(), "new Object()", ["object", "defined", "truthy"]);
	_tester(new Promise(()=>{}), "new Promise(()=>{})", ["promise", "object", "defined", "truthy"]);
	_tester(/a/, "/a/", ["regex", "object", "defined", "truthy"]);
	_tester(new RegExp(), "new RegExp()", ["regex", "object", "defined", "truthy"]);
	_tester(new Set(), "new Set()", ["set", "object", "defined", "truthy"]);
	_tester("", '""', ["string", "primitive", "defined", "falsy"]);
	_tester("a", '"a"', ["string", "primitive", "defined", "truthy"]);
	_tester(new String(), "new String()", ["string", "object", "defined", "truthy"]);
	_tester(Symbol(), "Symbol()", ["symbol", "primitive", "defined", "truthy"]);
	_tester(void 0, "void 0", ["undefined", "nullish", "primitive", "falsy"]);
	_tester(new WeakMap(), "new WeakMap()", ["weakmap", "object", "defined", "truthy"]);
	_tester(new WeakSet(), "new WeakSet()", ["weakset", "object", "defined", "truthy"]);
	_tester(document.all, "document.all", ["object", "nullish", "undefined", "falsy"]);
}


function _more(test, pseudocode, _result){
	
	const tbody = document.getElementById("additional_results");
	const tr = document.createElement("tr");
	tr.innerHTML = `<td>${pseudocode}</td>`;
	createCell(test, _result);
	tbody.appendChild(tr);
	
	function createCell(actual, expected){
		const td = document.createElement("td");
		td.dataset.expected = expected;
		td.innerHTML = actual;
		if(actual !== expected) td.classList.add("fail");
		tr.appendChild(td);
	}
}

{
	_more(is.empty(""), 'is.empty("")', true);
	_more(is.empty("a"), 'is.empty("a")', false);
	_more(is.empty([]), "is.empty([])", true);
	_more(is.empty([5]), "is.empty([5])", false);
	_more(is.empty(new Map()), "is.empty(new Map())", true);
	_more(is.empty(new Map([[1, "one"]])), 'is.empty(new Map([[1, "one"]]))', false);
	_more(is.of(5, Number), "is.of(5, Number)", false);
	_more(is.of(new Number(5), Number), "is.of(new Number(5), Number)", true);
}
