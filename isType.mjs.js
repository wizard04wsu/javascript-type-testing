/** @module isType */

const TYPES = {
	array:     {                         class: Array    },
	bigint:    { primitive: "bigint"                     },
	boolean:   { primitive: "boolean",                   },
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
 * A collection of boolean properties set according to the type, and sometimes value, of the argument.
 * @class TypeTest
 */
class TypeTest {
	
	#typeName;
	
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
		
		this.#typeName = typeName;
		
		for(const name in TYPES){
			this[name] = typeName === name;
		}
		
		this.numberish = this.number || this.nan;
		if(this.number){
			this.real = Number.isFinite(this.object ? value.valueOf() : value);
			this.infinite = !this.real;
		}
		
		this.object = value instanceof Object;
		this.primitive = !this.object;
		this.objectish = this.object || this.null;
		
		this.defined = !this.undefined;
		this.nullish = this.undefined || this.null;
		
		this.false = value === false;
		this.true = value === true;
		this.falsy = !value;
		this.truthy = !this.falsy;
		
		if(this.string || this.array){
			this.empty = value.length === 0;
			this.nonempty = !this.empty;
		}
		else if(this.map || this.set){
			this.empty = value.size === 0;
			this.nonempty = !this.empty;
		}
		else{
			this.empty = this.nonempty = void 0;
		}
	}
	
	toString(){
		return this.#typeName;
	}
}

class Is extends TypeTest {
	
	constructor(value){
		super(value);
	}
	
	get type(){
		return this.toString();
	}
	
	all(...propNames){
		return propNames.every(propName=>this[propName]);
	}
	
	any(...propNames){
		return propNames.some(propName=>this[propName]);
	}
}

/**
 * Determine the type of a value. The returned object includes boolean properties to quickly test against specific types or for specific states (e.g., 'empty').
 * @param {*} value - The value to be tested.
 * @returns {Is}
 */
function is(value){
	
	return new Is(value);
}

for(const propName in new TypeTest()){
	is[propName] = propName;
}

export { is as default };
