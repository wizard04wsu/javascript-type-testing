import is from "../isType.mjs.js";

let testResults = [];

{
	_is(()=>(void 0), is.undefined, is.primitive, is.nullish, is.falsy);
	_is(()=>(new Number(Infinity)), is.number, is.defined, is.object, is.objectish, is.truthy, is.infinite, is.numberish);
}

document.addEventListener("DOMContentLoaded", ()=>{document.body.innerHTML += createTable()});

/**
 * Perform a test and add the result details to the `testResults` array.
 *
 * @param {function} fn - An arrow function returning the value to be tested. The function body is saved as a string for later use.
 * @param {string} type - The expected type of the test value.
 * @param {...string} [trues] - Names of all additional properties of the test result that are expected to evaluate as `true`.
 */
function _is(fn, type, ...trues){
	
	trues.unshift(type);
	const code = fn.toString().slice(5,-1);
	const value = fn();
	const test = is(value);
	
	const testResult = {
		code: code,
		type: {
			expected: type,
			actual: test.type
		},
		properties: {},
	};
	
	for(const propName in is){
		
		const expected = trues.includes(propName);
		const actual = test[propName];
		
		testResult.properties[propName] = {
			expected: expected,
			actual: actual
		};
	}
	
	testResults.push(testResult);
}

/**
 * Create a table to show the results.
 */
function createTable(){
	
	let rows = "";
	for(const result of testResults){
		rows += createRow(result);
	}
	
	let header = "<th></th><th><div>type</div></th>";
	for(const propName in is){
		header += `<th><div>${propName}</div></th>`;
	}
	
	return `<table id="types"><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table>`;
}

/**
 * Generate a row for the results table.
 *
 * @param {Object} result - An item in the `testResults` array.
 */
function createRow(result){
	
	let typeMatch = result.type.expected !== result.type.actual;
	
	let code = result.code.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace("\"","&quot;");
	
	let cells = `<td>${code}</td><td ${!typeMatch ? 'class="error"' : ""}>${result.type.actual}`;
	if(typeMatch) cells += ` (expected ${result.type.expected})`;
	cells += `</td>`;
	
	for(const prop in result.properties){
		cells += createCell(result.properties[prop].expected, result.properties[prop].actual);
	}
	
	return `<tr>${cells}</tr>`;
}

/**
 * Generate a cell for the results table.
 *
 * @param {boolean} expected
 * @param {boolean} actual
 */
function createCell(expected, actual){
	
	if(!(expected || actual)) return `<td></td>`;
	return `<td class="${expected === actual ? "match" : "error"}">${expected ? "✔️" : "✖️"}</td>`;
}

/*{
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
}*/
