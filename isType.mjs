
class Type extends String {
	/**
	 * @constructor
	 * @param {string} typeName - The type's name, regardless of whether it's an object or a primitive.
	 * @param {string} [objectType] - If this is an object, the object's name. Falsy for a primitive.
	 */
	constructor(typeName, objectType){
		if(!(typeof typeName === "string" || typeName instanceof String))
			throw new TypeError("'typeName' must be a string");
		typeName = String(typeName);
		if(objectType){
			if(!(typeof objectType === "string" || objectType instanceof String))
				throw new TypeError("'objectType' must be a string");
			objectType = String(objectType);
		}
		
		super(typeName);
		
		if(objectType){
			this.type = this.object = typeName;
			this.objectType = objectType;
		}
		else{
			this.type = this.primitive = typeName;
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

is.number.real = (v)=>(is.number(v) && Number.isFinite(1*v));
is.number.infinite = (v)=>(is.number(v) && !Number.isFinite(1*v) && !Number.isNaN(1*v));
is.number.NaN = (v)=>(is.number(v) && Number.isNaN(1*v));	//Note that JavaScript doesn't correctly treat all undefined forms as NaN (e.g., 1/0 and 0**0).

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
