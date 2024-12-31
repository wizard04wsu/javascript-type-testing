/** @module isType */

const TYPES = {
	array:     {                         class: Array    },
	bigint:    { primitive: "bigint"                     },
	boolean:   { primitive: "boolean",   class: Boolean  },
	date:      {                         class: Date     },
	error:     {                         class: Error    },
	function:  {                         class: Function },
	map:       {                         class: Map      },
	nan:       {},
	null:      {},
	number:    {},
	numberish: { primitive: "number",    class: Number   },
	object:    {},
	promise:   {                         class: Promise  },
	regex:     {                         class: RegExp   },
	set:       {                         class: Set      },
	string:    { primitive: "string",    class: String   },
	symbol:    { primitive: "symbol",                    },
	undefined: { primitive: "undefined",                 },
	weakmap:   {                         class: WeakMap  },
	weakset:   {                         class: WeakSet  },
};

/**
 * A collection of boolean properties indicating the type of the given value.
 * @class TypeTest
 * @extends {String}
 */
class TypeTest extends String {
	
	/**
	 * @constructor
	 * @param {*} value - The value to be tested.
	 */
	constructor(value){
		
		let typeName;
		
		if(value === null){
			typeName = "null";
		}
		else{
			typeName = "object";
			
			for(const name in TYPES){
				const type = TYPES[name];
				if(typeof value === type.primitive || (type.class && value instanceof type.class)){
					typeName = name;
					break;
				}
			}
		}
		
		if(typeName === "numberish"){
			if(Number.isNaN(value) || (value instanceof Number && Number.isNaN(value.valueOf()))){
				typeName = "nan";
			}
			else{
				typeName = "number";
			}
		}
		
		super(typeName);
		
		for(const name in TYPES){
			this[name] = typeName === name;
		}
		
		this.numberish = this.number || this.nan;
		if(this.number){
			this.real = Number.isFinite(this.object ? value.valueOf() : value);
			this.infinite = !this.real;
		}
		
		this.primitive = !this.object;
		this.objectish = this.object || this.null;
		
		this.defined = !this.undefined;
		this.nullish = this.undefined || this.null;
		
		this.falsy = !value;
		this.truthy = !this.falsy;
		
		if(this.string || this.array){
			this.empty = value.length === 0;
		}
		else if(this.map || this.set || this.weakmap || this.weakset){
			this.empty = value.size === 0;
		}
	}
}

function is(value){
	return new TypeTest(value);
}

export { is as default };
