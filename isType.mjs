
const basicTypes = [
	"undefined",
	"null",
	"number",
	"bigint",
	"boolean",
	"string",
	"symbol",
	"array",
	"date",
	"regexp",
	"function",
];

class Type extends String {
	/**
	 * @constructor
	 * @param {string} typeName - The type's name, regardless of whether it's an object or a primitive.
	 * @param {boolean} [isPrimitive] - Is this a primitive value?
	 */
	constructor(typeName, isPrimitive){
		typeName = String(typename);
		super(typeName);
		this.type = this[ isPrimitive ? "primitive" : "object" ] = typeName;
	}
}

function is(value){
	if(value === void 0)
		return new Type("undefined", true);
	if(value === null)
		return new Type("null", true);
	const type = typeof value;
	if(type === "function")
		return new Type("function", false);
	if(type === "object"){
		const deepType = Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
		if(deepType.match(new RegExp(`^${basicTypes.join("|")}$`, "ui")))
			return new Type(deepType, false);
		return new Type(type, false);
	}
	return new Type(type, true);
}

function fn(type){
	return (v)=>(is(v).type === type);
}

is.primitive = (v)=>(is(v).primitive !== void 0);
is.object = (v)=>(is(v).object !== void 0);

for(const type of basicTypes){
	is[type] = fn(type);
}

is.number.real = (v)=>(is.number(v) && Number.isFinite(1*v));
is.number.infinite = (v)=>(is.number(v) && !Number.isFinite(1*v) && !Number.isNaN(1*v));
is.number.NaN = (v)=>(is.number(v) && Number.isNaN(1*v));	//Note that JavaScript doesn't correctly treat all undefined forms as NaN (e.g., 1/0 and 0**0).



export { is as default };
