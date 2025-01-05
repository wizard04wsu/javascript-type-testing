import is from "../isType.mjs.js";


function _is(value, pseudocodeHTML, expectedType, expectedIsObject){
	
	const actualType = is(value);
	//console.log(actualType);
	
	const tbody = document.getElementById("type_results");
	const tr = document.createElement("tr");
	tr.innerHTML = `<td>${pseudocodeHTML}</td>`;
	createCell(actualType, expectedType);
	tbody.appendChild(tr);
	createCell(actualType.object, expectedIsObject);
	tbody.appendChild(tr);
	
	let props = "";
	for(const name in actualType){
		if(actualType[name]) props += `, ${name}`;
	}
	tr.innerHTML += `<td>${props.slice(2)}</td>`;
	
	function createCell(actual, expected){
		const td = document.createElement("td");
		td.dataset.expected = expected === void 0 ? "undefined" : expected;
		td.innerHTML = actual === void 0 ? `<i>undefined</i>` : actual.toString() === "" ? `<i>empty string</i>` : actual;
		if(actual != expected) td.classList.add("fail");
		tr.appendChild(td);
	}
}

{
	_is([], "[]", "array", true);
	_is(new Array(), "new Array()", "array", true);
	_is([1,2], "[1,2]", "array", true);
	_is(new Array(1,2), "new Array(1,2)", "array", true);
	_is(5n, "5n", "bigint", false);
	_is(true, "true", "boolean", false);
	_is(false, "false", "boolean", false);
	_is(new Boolean(), "new Boolean()", "object", true);
	_is(new Date(), "new Date()", "date", true);
	_is(new Error(), "new Error()", "error", true);
	_is(new TypeError(), "new TypeError()", "error", true);
	_is(()=>{}, "()=>{}", "function", true);
	_is(Object, "Object", "function", true);
	_is(new Map(), "new Map()", "map", true);
	_is(NaN, "NaN", "nan", false);
	_is(new Number(NaN), "new Number(NaN)", "nan", true);
	_is(new Number('a'), "new Number('a')", "nan", true);
	_is(null, "null", "null", false);
	_is(5, "5", "number", false);
	_is(Infinity, "Infinity", "number", false);
	_is(new Number(), "new Number()", "number", true);
	_is({}, "{}", "object", true);
	_is(new Object(), "new Object()", "object", true);
	_is(new Promise(()=>{}), "new Promise(()=>{})", "promise", true);
	_is(/a/, "/a/", "regex", true);
	_is(new RegExp(), "new RegExp()", "regex", true);
	_is(new Set(), "new Set()", "set", true);
	_is("", '""', "string", false);
	_is("a", '"a"', "string", false);
	_is(new String(), "new String()", "string", true);
	_is(Symbol(), "Symbol()", "symbol", false);
	_is(void 0, "void 0", "undefined", false);
	_is(new WeakMap(), "new WeakMap()", "weakmap", true);
	_is(new WeakSet(), "new WeakSet()", "weakset", true);
	{
		class Foo {}
		_is(new Foo(), "<i>class Foo {}</i><br>new Foo()", "object", true);
	}
	{
		class Foo extends String {}
		_is(new Foo(), "<i>class Foo extends String {}</i><br>new Foo()", "string", true);
	}
	{
		class Foo { get [Symbol.toStringTag](){ return "Bar"; } }
		_is(new Foo(), "<i>class Foo { get [Symbol.toStringTag](){ return \"Bar\"; } }</i><br>new Foo()", "object", true);
	}
}

/*
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
*/