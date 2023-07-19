/** @module isType */

// Type names and the class each refers to.
const OBJECT_TYPES = {
	array:     Array,
	boolean:   Boolean,
	date:      Date,
	error:     Error,
	function:  Function,
	map:       Map,
	number:    Number,
	promise:   Promise,
	regex:     RegExp,
	set:       Set,
	string:    String,
	weakmap:   WeakMap,
	weakset:   WeakSet,
};

// Initial type names.
const TYPE_NAMES = [
	"array",
	"bigint",
	"boolean",
	"date",
	"error",
	"function",
	"map",
	"nan",
	"null",
	"number",
	"object",
	"promise",
	"regex",
	"set",
	"string",
	"symbol",
	"undefined",
	"weakmap",
	"weakset",
];


/**
 * Descriptors of a value's type.
 * @class Type
 * @extends {String}
 */
class Type extends String {
	
	#name;
	#typeofType;
	#toStringTag;
	#constructorName;
	#isPrimitive;
	
	/**
	 * @constructor
	 * @param {string} name - Custom type name.
	 * @param {string} typeofType - The value returned by the `typeof` operator.
	 * @param {string} [toStringTag] - For objects. The name used by `Object.prototype.toString.call()`.
	 * @param {string} [constructorName] - For objects. The name of the argument's constructor.
	 */
	constructor(name, typeofType, toStringTag, constructorName){
		
		super(name);
		this.#name = name;
		
		this.#typeofType = typeofType;
		this.#toStringTag = toStringTag;
		this.#constructorName = constructorName;
		
		this.#isPrimitive = constructorName === void 0;
	}
	
	/** @member {string} */
	get type(){ return this.#name; }
	
	/** @member {string} */
	get ["typeof"](){ return this.#typeofType; }
	
	/** @member {string} */
	get toStringTag(){ return this.#toStringTag; }
	
	/** @member {string} */
	get constructorName(){ return this.#constructorName; }
	
	/** @member {boolean} */
	get isPrimitive(){ return this.#isPrimitive; }
	
	/** @member {boolean} */
	get isObject(){ return !this.#isPrimitive; }
}



/**
 * Determine the type of a value.
 * @param {*} value
 * @returns {Type}
 */
function is(value){
	
	let typeName,
		typeofType = typeof value,
		toStringTag,
		constructorName;
	
	if(value instanceof Object){
		toStringTag = Object.prototype.toString.call(value).slice(8, -1);
		constructorName = value.constructor.name || "";
	}
	
	if(value === null)
		typeName = "null";
	else if(Number.isNaN(value) || (value instanceof Number && Number.isNaN(value.valueOf())))
		typeName = "nan";
	else if(!["object", "function"].includes(typeofType))
		typeName = typeofType;
	else{
		typeName = "object";
		for(const name in OBJECT_TYPES){
			if(value instanceof OBJECT_TYPES[name]){
				typeName = name;
				break;
			}
		}
	}
	
	return new Type(typeName, typeofType, toStringTag, constructorName);
}



// Create type testers.

for(const name of TYPE_NAMES){
	is[name] = (v)=> is(v).type === name;
}

is.object = (v)=> is(v).isObject;
is.primitive = (v)=> is(v).isPrimitive;

is.defined = (v)=> !is.undefined(v);
is.nullish = (v)=> (is.undefined(v) || is.null(v));

is.falsy = (v)=> !v;
is.truthy = (v)=> !!v;

is.numberish = (v)=> (is.number(v) || is.nan(v));
is.real = (v)=> (is.number(v) && Number.isFinite(v instanceof Number ? v.valueOf() : v));
is.infinite = (v)=> (is.number(v) && !Number.isFinite(v instanceof Number ? v.valueOf() : v));



// Create additional methods.

is.empty = (v)=> (v?.length === 0 || v?.size === 0);

is.of = (v, c)=> v instanceof c;



export { is as default };
