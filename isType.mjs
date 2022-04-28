
const Object = globalThis["Object"];
const String = globalThis["String"];
const Number = globalThis["Number"];
const Boolean = globalThis["Boolean"];

class Type extends String {
	/**
	 * @constructor
	 * @param {string} typeName - The type's name, regardless of whether it's an object or a primitive.
	 * @param {string} [objectType] - If this is an object, the object's name. Falsy for a primitive.
	 */
	constructor(typeName, objectType){
		if(!(typeof typeName === "string" || typeName instanceof String))
			throw new TypeError("'typeName' must be a string");
		if(typeName == "")
			throw new RangeError("'typeName' cannot be an empty string");
		typeName = String(typeName);
		if(objectType){
			if(!(typeof objectType === "string" || objectType instanceof String))
				throw new TypeError("'objectType' must be a string");
			objectType = String(objectType);
		}
		
		super();
		
		this.type = typeName;
		if(objectType){
			this.objectType = objectType;
			this.object = true;
		}
		else{
			this.primitive = true;
		}
	}
}

function getToStringTag(obj){
	return Object.prototype.toString.call(obj).slice(8, -1);
}

function is(value){
	if(value === void 0)
		return new Type("undefined");
	if(value === null)
		return new Type("null");
	const type = typeof value;
	if(type === "function")
		return new Type("function", "Function");
	if(type === "object"){
		const toStringTag = getToStringTag(value);
		for(const objectType of ["Boolean","Number","String"]){
			if(value instanceof globalThis[objectType])
				return new Type(objectType.toLowerCase(), toStringTag);
		}
		return new Type(type, toStringTag);
	}
	return new Type(type);
}


is.object = (v)=>(v instanceof Object);
is.primitive = (v)=>!is.object(v);

const typeofTypes = [
	/*** primitives ***/
	"undefined",
	"null",
	"bigint",
	"symbol",
	
	/*** primitives & objects ***/
	"boolean",
	"number",
	"string",
	
	/*** objects ***/
	//"object",
	"function",
];
for(const type of typeofTypes){
	is[type] = (v)=>(is(v).type === type);
}

const isNumberish = is.number;
is.number = (v)=>(isNumberish(v) && Number.isFinite(v));
is.infinite = (v)=>(isNumberish(v) && !Number.isFinite(v) && !Number.isNaN(v));
is.nan = (v)=>(isNumberish(v) && Number.isNaN(v));	//Note that JavaScript doesn't correctly treat all undefined forms as NaN (e.g., 1/0 and 0**0 are undefined forms, but JavaScript treats them as Infinity).

const otherCommonTypes = [
	"Error",
	"Date",
	"RegExp",
	"Array",
	"Map",
	"Set",
	"WeakMap",
	"WeakSet",
	"Promise",
];
for(const objectType of otherCommonTypes){
	is[objectType.toLowerCase()] = (v)=>(v instanceof globalThis[objectType]);
}



export { is as default };
