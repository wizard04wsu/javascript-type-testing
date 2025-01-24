import is from "../isType.mjs.js";

window.is = is;

const COLUMNS = [
	"defined",
	"undefined",
	"primitive",
	"object",
	"objectish",
	"null",
	"nullish",
	"boolean",
	"false",
	"true",
	"falsy",
	"truthy",
	"symbol",
	"bigint",
	"numberish",
	"nan",
	"number",
	"real",
	"infinite",
	"string",
	"array",
	"map",
	"set",
	"weakmap",
	"weakset",
	"empty",
	"nonempty",
	"date",
	"error",
	"function",
	"promise",
	"regex",
];

let testResults = [];

{
	_is(()=>(void 0), is.undefined, is.primitive, is.nullish, is.falsy);
	_is(()=>(null), is.null, is.defined, is.primitive, is.nullish, is.objectish, is.falsy);
	_is(()=>(false), is.boolean, is.defined, is.primitive, is.false, is.falsy);
	_is(()=>(true), is.boolean, is.defined, is.primitive, is.true, is.truthy);
	_is(()=>(new Boolean(false)), is.object, is.defined, is.objectish, is.truthy);
	_is(()=>(Symbol()), is.symbol, is.defined, is.primitive, is.truthy);
	_is(()=>(Symbol.toStringTag), is.symbol, is.defined, is.primitive, is.truthy);
	_is(()=>(0n), is.bigint, is.defined, is.primitive, is.falsy);
	_is(()=>(5n), is.bigint, is.defined, is.primitive, is.truthy);
	_is(()=>(NaN), is.nan, is.defined, is.primitive, is.falsy, is.numberish);
	_is(()=>(+"a"), is.nan, is.defined, is.primitive, is.falsy, is.numberish);
	_is(()=>(new Number(NaN)), is.nan, is.defined, is.object, is.objectish, is.truthy, is.numberish);
	_is(()=>(new Number("a")), is.nan, is.defined, is.object, is.objectish, is.truthy, is.numberish);
	_is(()=>(0), is.number, is.defined, is.primitive, is.falsy, is.real, is.numberish);
	_is(()=>(5), is.number, is.defined, is.primitive, is.truthy, is.real, is.numberish);
	_is(()=>(new Number(0)), is.number, is.defined, is.object, is.objectish, is.truthy, is.real, is.numberish);
	_is(()=>(new Number(5)), is.number, is.defined, is.object, is.objectish, is.truthy, is.real, is.numberish);
	_is(()=>(Infinity), is.number, is.defined, is.primitive, is.truthy, is.infinite, is.numberish);
	_is(()=>(-1/0), is.number, is.defined, is.primitive, is.truthy, is.infinite, is.numberish);
	_is(()=>(new Number(Infinity)), is.number, is.defined, is.object, is.objectish, is.truthy, is.infinite, is.numberish);
	_is(()=>(""), is.string, is.defined, is.primitive, is.falsy, is.empty);
	_is(()=>("a"), is.string, is.defined, is.primitive, is.truthy, is.nonempty);
	_is(()=>(new String("")), is.string, is.defined, is.object, is.objectish, is.truthy, is.empty);
	_is(()=>(new String("a")), is.string, is.defined, is.object, is.objectish, is.truthy, is.nonempty);
	_is(()=>([]), is.array, is.defined, is.object, is.objectish, is.truthy, is.empty);
	_is(()=>([1,2]), is.array, is.defined, is.object, is.objectish, is.truthy, is.nonempty);
	_is(()=>(new Array()), is.array, is.defined, is.object, is.objectish, is.truthy, is.empty);
	_is(()=>(new Array(1,2)), is.array, is.defined, is.object, is.objectish, is.truthy, is.nonempty);
	_is(()=>(new Map()), is.map, is.defined, is.object, is.objectish, is.truthy, is.empty);
	_is(()=>((new Map()).set("a",1)), is.map, is.defined, is.object, is.objectish, is.truthy, is.nonempty);
	_is(()=>(new Set()), is.set, is.defined, is.object, is.objectish, is.truthy, is.empty);
	_is(()=>(new Set([1,2])), is.set, is.defined, is.object, is.objectish, is.truthy, is.nonempty);
	_is(()=>(new WeakMap()), is.weakmap, is.defined, is.object, is.objectish, is.truthy);
	_is(()=>(new WeakSet()), is.weakset, is.defined, is.object, is.objectish, is.truthy);
	_is(()=>(new Date()), is.date, is.defined, is.object, is.objectish, is.truthy);
	_is(()=>(new Error()), is.error, is.defined, is.object, is.objectish, is.truthy);
	_is(()=>(new TypeError()), is.error, is.defined, is.object, is.objectish, is.truthy);
	_is(()=>(()=>{}), is.function, is.defined, is.object, is.objectish, is.truthy);
	_is(()=>(new Function("")), is.function, is.defined, is.object, is.objectish, is.truthy);
	_is(()=>(Object), is.function, is.defined, is.object, is.objectish, is.truthy);
	_is(()=>(new Promise(()=>{})), is.promise, is.defined, is.object, is.objectish, is.truthy);
	_is(()=>(/a/), is.regex, is.defined, is.object, is.objectish, is.truthy);
	_is(()=>(new RegExp("a")), is.regex, is.defined, is.object, is.objectish, is.truthy);
	_is(()=>({}), is.object, is.defined, is.object, is.objectish, is.truthy);
	_is(()=>(new Object()), is.object, is.defined, is.objectish, is.truthy);
	class A{}
	_is(()=>(/*class A{}*/ new A()), is.object, is.defined, is.objectish, is.truthy);
	class B extends String{}
	_is(()=>(/*class B extends String{}*/ new B()), is.string, is.defined, is.object, is.objectish, is.truthy, is.empty);
	
}

document.addEventListener("DOMContentLoaded", ()=>{document.querySelector("#tests").innerHTML = createTableContent()});

/**
 * Perform a test and add the result details to the `testResults` array.
 *
 * @param {function} fn - An arrow function, in the form of `()=>(...)`, returning the value to be tested. The function body is saved as a string for later use.
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
function createTableContent(){
	
	let header = "<th></th><th><div>type</div></th>";
	for(const propName of COLUMNS){
		header += `<th><div>${propName}</div></th>`;
	}
	
	let rows = "";
	for(const result of testResults){
		rows += createRow(result);
	}
	
	return `<thead style="position:sticky;top:0;background:#FFF;"><tr>${header}</tr></thead><tbody>${rows}</tbody>`;
}

/**
 * Generate a row for the results table.
 *
 * @param {Object} result - An item in the `testResults` array.
 */
function createRow(result){
	
	let typeMatch = result.type.expected === result.type.actual;
	
	let code = result.code.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace("\"","&quot;");
	
	let cells = `<td><code>${code}</code></td><td class="${typeMatch ? "match" : "error"}">${result.type.actual}`;
	if(!typeMatch) cells += `<br>(expected ${result.type.expected})`;
	cells += `</td>`;
	
	for(const prop of COLUMNS){
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
	if(expected === actual) return `<td class="match">✔️</td>`;
	return `<td class="error" title="expected ${expected}">${actual ? "✔️" : ""}</td>`;
}
