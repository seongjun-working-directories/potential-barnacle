/*
281.
ES6이후로 클래스를 도입함.
다만, 기존의 프로토타입 기반 객체지향 모델을 폐지한 것이 아님.
클래스는 함수이며, 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼
사용할 수 있도록 한 문법적 설탕(syntactic sugar).

282.
클래스는 생성자 함수와 다르게 동작.
물론, 프로토타입 기반의 인스턴스 생성에는 변함이 없음.
클래스는 생성자 함수보다 엄격하며, 추가적인 기능을 제공함.
(1) 클래스를 new 연산자 없이 호출하면 에러 발생.
(2) 상속을 지원하는 extends와 super 키워드 제공.
(3) 호이스팅이 발생하지 않는 것처럼 동작.
(4) 클래스 내의 모든 코드는 암묵적으로 strict mode가 지정되어 실행.
(5) 클래스의 constructor, 프로토타입 메서드, 정적 메서드 모두
프로퍼티 어트리뷰트 [[Enumerable]] 값이 false임.(열거 불가능)

283.
클래스 몸체에는 0개 이상의 메서드만 정의 가능.
클래스 몸체에서 정의할 수 있는 메서드는
constructor(생성자) / 프로토타입 메서드 / 정적 메서드 세 가지임.
'''
class Person {
	// 생성자
	constructor(name) {
		// 인스턴스 생성 및 초기화
		this.name = name;
	}
	
	// 프로토타입 메서드
	sayHi() {
		console.log(`Hi! This is ${this.name}.`);
	}
	
	// 정적 메서드
	static sayHello() {
		console.log('Hello!');
	}
}

const me = new Person('Lee');
console.log(me.name);	// Lee
me.sayHi();	// Hi! This is Lee.
Person.sayHello();	// Hello!
'''

284.
위의 코드는 아래와 같다고 볼 수 있음.
'''
var Person = (function() {
    // constructor
    function Person(name) {
        this.name = name;
    }
    // prototype method
    Person.prototype.sayHi = function() {
        console.log(`Hi! This is ${this.name}.`);
    }
    // static
    Person.sayHello = function() {
        console.log('Hello');
    }
    return Person;
})();

const me = new Person('Lee');
console.log(me.name);
me.sayHi();
Person.sayHello();
'''

285.
클래스는 let, const 키워드로 선언한 변수처럼 호이스팅됨.
모든 선언문은 런타임 이전에 먼저 실행되기 때문.

286.
클래스 표현식으로 정의된 클래스의 경우,
다음 예제와 같이 클래스를 가리키는 식별자(Person)을 사용해 인스턴스를
생성하지 않고 기명 클래스 표현식의 클래스 이름(MyClass)을 사용해 인스턴스를
생성하면 에러가 발생함.
'''
const Person = class MyClass {
    constructor() {
        console.log(`class constructed!!`);
    }
    sayHello() {
        console.log('Hello!');
    }
    static sayHi() {
        console.log(`Hi!`);
    }
};

const me = new Person();
me.sayHello();
Person.sayHi();

// const you = new MyClass;    // ReferenceError
'''

287.
ES11에 따르면, 인스턴스의 프로퍼티는 반드시 constructor 내부에서 정의되어야 함.
constructor는 인스턴스를 생성하고 초기화하기 위한 특수 메서드.
constructor는 메서드로 해석되는 것이 아닌,
클래스가 평가되어 생성한 함수 객체 코드의 일부가 됨.
constructor는 클래스 내에 최대 한 개만 존재 가능.
constructor를 생략하면 클래스에 빈 constructor가 암묵적으로 정의됨.

288.
클래스의 constructor 내부에서 this에 추가한 프로퍼티는
클래스가 생성한 인스턴스의 프로퍼티로 추가된 것을 알 수 있음.
즉, 생성자 함수와 마찬가지로 constructor 내부에서 
this에 추가한 프로퍼티는 인스턴스 프로퍼티가 됨.

289.
constructor에도 arguments 객체가 있음.
따라서, constructor를 하나밖에 못 만들지만,
매개변수에 따라 정의를 다르게 하고 싶을 때 다음과 같이 활용 가능.
'''
class Person {
    constructor() {
        switch(arguments.length) {
        case 1:
            console.log(1);
            break;
        case 2:
            console.log(2);
            break;
        default:
            console.log(arguments);
        }
    }
}

const me1 = new Person(1);
const me2 = new Person(1, 2);
'''

290.
new 연산자와 함께 클래스가 호출되면 암묵저긍로 this 즉, 인스턴스를 반환함.
그러나, this가 아닌 다른 객체를 명시적으로 반환하면,
this 즉, 인스턴스가 반환되지 못하고 return 문에 명시된 객체가 반환됨.
'''
class Person {
	constructor(name) {
		this.name = name;
		// 명시적으로 객체를 반환하면, 암묵적으로 this 반환이 무시됨.
		return { a:1 };
	}
}

// constructor에서 명시적으로 반환한 객체가 반환됨.
const me = new Person('Lee');
console.log(me);	// {a:1}
'''
단, 원시값을 반환하면 원시값이 무시되고 암묵적으로 this가 반환됨.

291.
클래스 몸체에 아무것도 없이 정의한 메서드는 클래스의 프로토타입 메서드가 됨.
클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 됨.
결국, 클래스는 생성자 함수와 마찬가지로 프로토타입 기반의 객체 생성 메커니즘.

292.
클래스에서는 메서드에 static 키워드를 붙이면 정적 메서드(클래스 메서드)가 됨.
정적 메서드는 클래스에 바인딩된 메서드가 됨.
정적 메서드는 인스턴스로 호출할 수 없음.

293.
<정적 메서드 vs 프로토타입 메서드>
(1) 정적 메서드와 프로토타입 메서드는 자신이 속해 잇는 프로토타입 체인이 다름.
(2) 정적 메서드는 클래스로 호출, 프로토타입 메서드는 인스턴스로 호출.
(3) 정적 메서드는 인스턴스 프로퍼티로 참조 불가.
(4) 프로토타입 메서드는 인스턴스 프로퍼티로 참조 가능.

294.
메서드 내부에서 인스턴스 프로퍼티를 참조할 필요가 없다면,
static 메서드로 정의하기를 권장.

295.
<클래스에서 정의한 메서드의 특징>
(1) function 키워드를 생략한 메서드 축약 표현 사용.
(2) 클래스에 메서드를 정의할 때는 콤마가 필요 없음.
(3) 암묵적으로 strict mode로 실행.
(4) for...in문이나 Object.keys 등으로 열거 불가.
(5) 내무 메서드 [[Construct]]를 갖지 않는 non-constructor.

296.
클래스의 인스턴스 생성 과정
(1) constructor 내부 코드 실행 이전, 암묵적으로 빈 객체 생성.
(2) 해당 빈 객체는 this에 바인딩 됨.
(즉, constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킴.)
(3) 인스턴스 초기화.
(this에 바인딩된 인스턴스에 프로퍼티 추가 및 인수값으로 초기화.)
(4) 인스턴스 반환.(인스턴스가 바인딩된 this가 암묵적으로 반환됨.)

297.
인스턴스 프로퍼티는 constructor 내부에서 정의해야 함.
이 때, 정의된 인스턴스 프로퍼티는 public임.

298.
접근자 프로퍼티는 자체적으로 값을 갖지 않고, 다른 데이터 프로퍼티의 값을
읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티.
이 때, getter와 setter는 호출하는 것이 아닌,
"프로퍼티처럼 참조하는 형식으로 사용"함.
'''
// ES5
const person = {
    firstName : 'Kevin',
    lastName : 'De Bruyne',

    // getter
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    // setter
    set fullName(name) {
        [this.firstName, this.lastName]
            = name.split(' ');
    }
};

console.log(`${person.firstName} ${person.lastName}`);

// Setter 함수
person.fullName = `Heungmin Son`;
console.log(person);

// Getter 함수
console.log(person.fullName);

// fullName은 접근자 프로퍼티.
// 접근자 프로퍼티는 다음의 프로퍼티 어트리뷰트를 가짐.
// -> get, set, enumerable, configurable
console.log(Object.getOwnPropertyDescriptor(person, 'fullName'));
'''

299.
접근자 프로퍼티는 클래스에서도 사용 가능.
'''
// ES6
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // fullName은 접근자 함수로 구성된 접근자 프로퍼티.
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    set fullName(name) {
        [this.firstName, this.lastName] = name.split(' ');
    }
}

const me = new Person('Kevin', 'De Bruyne');
console.log(`${me.firstName} ${me.lastName}`);

me.fullName = 'Heungmin Son';
console.log(me);
console.log(me.fullName);

console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'fullName'));
'''

300.
<클래스 필드 정의 제안>
최신 브라우저(chrome 72 이상) 또는 최신 Node.js(12 version 이상)에서
자바스크립트 클래스에 클래스 필드를 정의해도 정상 작동함.
(곧, '클래스 필드 정의'가 정식 승인될 것으로 예상됨.)
'''
class Person {
	name = 'Lee';
}
const me = new Person();
console.log(me);
'''
단, 클래스 몸체에서 클래스 필드를 정의하는 경우, this에 클래스 필드를 바인딩하면 안됨.
this는 클래스의 constructor와 메서드 내에서만 유효하기 때문.
'''
class Person {
	// this.name = ' ';	// SyntaxError
}
'''
클래스 필드를 클래스의 메서드 내에서 참조하는 경우, 반드시 this를 사용해야 함.
클래스 필드에 초기값을 할당하지 않으면 undefined가 할당됨.
인스턴스 생성 시, 외부 초기값으로 클래스 필드를 초기화해야 한다면, constructor 사용.
'''
class Person {
	name;
	constructor(name) {
		this.name = name;
	}
}
'''
다만, 위와 같이 인스턴스를 생성할 때 클래스 필드를 초기화하는 경우라면,
constructor 밖에서 굳이 클래스 필드를 정의할 필요가 없음.

301.
함수 또한 클래스 필드에 할당 가능.
단, 이런 경우 프로토타입 메서드가 아닌 인스턴스 메서드가 됨.
모든 클래스 필드는 인스턴스 프로퍼티가 되기 때문.
'''
class Person {
    name = 'Lee';
    // 클래스 필드에 할당된 함수.
    getName = function() {
        return this.name;
    }
    // 또는 다음과 같이 화살표 함수 사용 가능.
    // getName = () => this.name;
}

const me = new Person();
console.log(me);
console.log(me.getName());
'''

302.
<private 필드 정의 제안>
최신 브라우저(chrome 72 이상) 또는 최신 Node.js(12 version 이상)에서
자바스크립트 클래스에 private 필드를 정의해도 정상 작동함.
(곧, 'private 필드 정의'가 정식 승인될 것으로 예상됨.)

303.
private 필드의 선두에는 #을 붙여줌.
private 필드를 참조할 때도 #을 붙여야함.
'''
class Person {
	#name = '';
	constructor(name, age) {
		this.#name = name;
		// 필드에서 우선 private 선언해야 함.
        	// this.#age = age;
	}
	getInfo() {
		console.log(`${this.#name} ${this.#age}`);
	}
}

const me = new Person('Lee', 15);
me.getInfo();

// console.log(me.#name);	// Error : Private Field
'''

304.
private 필드는 클래스 내부에서만 참조 가능.
(자식 클래스 내부 접근 및 클래스 인스턴스를 통한 접근이 불가능.)
클래스 외부에서 private 필드에 직접 접근할 수 있는 방법은
접근자 프로퍼티를 통해 간접적으로 접근하는 방법이 있음.
'''
class Person {
    #name = '';
    
    constructor(name) {
        this.#name = name;
    }

    get name() {
        // trim() : 앞뒤 공백 제거
        return this.#name.trim();
    }
}

const me = new Person(' Lee   ');
console.log(me.name);   // Lee
'''

305.
private 필드는 반드시 클래스 몸체에서 정의되어야 함.
private 필드를 직접 constructor에 정의하면 에러가 발생.

306.
<static 필드 정의 제안>
최신 브라우저(chrome 72 이상) 또는 최신 Node.js(12 version 이상)에서
자바스크립트 클래스에 static 필드를 정의해도 정상 작동함.
(곧, 'static 필드 정의'가 정식 승인될 것으로 예상됨.)

307.
static 키워드를 활용한 정적 메서드 정의만 가능했으나,
static 키워드를 사용해 정적 필드를 정의하는 것이 승인될 예정.
static public 필드, static private 필드, static private 메서드가
가능해질 것으로 예상됨.
'''
class MyMath {
	// static public 필드 정의
	static PI = 22/7;
	
	// static private 필드 정의
	static #num = 10;
	
	// static 메서드
	static increment() {
		return ++MyMath.#num;
	}
}

console.log(MyMath.PI);
console.log(MyMath.increment());
'''

308.
<클래스 상속>
상속에 의한 클래스 확장은 프로토타입 기반 상속과 다른 개념.
프로토타입 기반 상속은 프로토타입 체인을 통해 다른 객체의 자신을 상속받는 개념.
상속에 의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의하는 것.
즉, 부모 클래스의 속성을 그대로 사용하면서 자신만의 고유 속성만을 추가하여 확장 가능.
'''
class Animal {
	constructor(age, weight) {
		this.age = age;
		this.weight = weight;
	}
	eat() { return 'eat'; }
	move() { return 'move'; }
}

class Bird extends Animal {
	fly() { return 'fly'; }
}

const bird = new Bird(1, 5);
console.log(bird);
console.log(bird instanceof Animal);
console.log(bird instanceof Bird);

console.log(bird.eat());
console.log(bird.move());
console.log(bird.fly());
'''
클래스는 상속을 통해 다른 클래스를 확장할 수 있는 문법인 extends 키워드가 제공됨.

309.
클래스와 상속에 의한 클래스 확장을 흉내내었던 코드(참고용)
'''
// ES5
var Animal = (function() {
	function Animal(age, weight) {
		this.age = age;
		this.weight = weight;
	}
	
	Animal.prototype.eat = function() {
		return 'eat';
	}
	Animal.prototype.move = function() {
		return 'move';
	}
	
	return Animal;
})();

var Bird = (function() {
	function Bird() {
		// Animal 생성자 함수에게 this와 인수를 전달하면서 호출.
		Animal.apply(this, arguments);
	}

	// Bird.prototype을 Animal.prototype을 프로토타입으로 갖는 객체로 교체.
	Bird.prototype = Object.create(Animal.prototype);
	// Bird.prototype.constructor를 Animal에서 Bird로 교체.
	Bird.prototype.constructor = Bird;
	
	Bird.prototype.fly = function() {
		return 'fly';
	}
	
	return Bird;
})();

var bird = new Bird(1, 5);
console.log(bird);
console.log(bird.eat());
console.log(bird.move());
console.log(bird.fly());
'''

310.
상속을 통해 클래스를 확장하려면 extends 키워드를 사용.
'''
class Base {}	// super class, parent class
class Derived extends Base {}	// sub class, child class
'''

311.
수퍼 클래스와 서브 클래스는 인스턴스의 프로토타입 체인 뿐만 아니라,
클래스 간 프로토타입 체인도 생성함.
따라서, 프로토타입 메서드 및 정적 메서드 모두 상속 가능.

312.
<동적 상속>
extends 키워드는 클래스 뿐만 아니라 생성자 함수를 상속받아 클래스 확장 가능.
단, extends 키워드 앞에는 반드시 클래스가 와야 함.
'''
function Base(a) {
	this.a = a;
}

class Derived extends Base {}

const derived = new Derived(1);
console.log(derived);
'''

313.
extends 키워드 다음에는 클래스 뿐만 아니라 [[Construct]] 내부 메서드를 갖는
함수 객체로 평가될 수 있는 모든 표현식이 올 수 있음.
'''
function Base1() { }
class Base2() { }
let condition = true;

class Derived extends (condition ? Base1:Base2) { }

const derived = new Derived();
console.log(derived);

console.log(derived instanceof Base1);
console.log(derived instanceof Base2);
'''

314.
<서브 클래스의 constructor>
서브클래스에서 constructor를 생략하면,
클래스에 다음과 같은 constructor가 암묵적으로 정의됨.
'''
constructor(...args) { super(...args); }
'''
args는 new 연산자와 함께 클래스를 호출할 때 전달한 인수의 리스트.
super()는 수퍼클래스의 constructor를 호출하여 인스턴스를 생성.

315.
<Rest 파라미터>
매개변수에 ...을 붙이면, Rest 파라미터가 됨.
이는 함수에 전달된 인수들의 목록을 배열로 전달받음.

316.
<super 키워드>
(1) super를 호출하면, 수퍼클래스의 constructor가 호출됨.
'''
class Base {
	constructor(a,b) {
		this.a = a;
		this.b = b;
	}
}

class Derived extends Base {
	constructor(a,b,c) {
		super(a,b);
		this.c = c;
	}
}
'''

317.
[super 키워드 사용시 주의해야 할 사항]

a. 서브클래스에서 constructor를 생략하지 않는 경우,
서브클래스의 constructor에서는 반드시 super를 호출해야 함.
'''
class Base {}

class Derived extends Base {
	constructor() {
		// ReferenceError : Must call super constructor
		// in derived class before accessing 'this' or
		// returning from derived constructor
		console.log('constructor call');
	}
}
'''

b. 서브클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없음.
'''
class Base {}

class Derived extends Base {
	constructor() {
		// ReferenceError : Must call super constructor
		// in derived class before accessing 'this' or
		// returning from derived constructor
		console.log('constructor call');
		super();
	}
}
'''

c. super는 반드시 서브클래스의 constructor에서만 호출됨.
서브클래스가 아닌 클래스의 constructor나 함수에서 super를 호출하면 에러 발생.

318.
<super 키워드>
(2) super를 참조하면, 수퍼클래스의 메서드를 호출할 수 있음.
'''
// 서브클래스의 프로토타입 메서드 내에서 super.sayHi는
// 수퍼클래스의 프로토타입 메서드 sayHi를 가리킴.
class Base {
	constructor(name) {
		this.name = name;
	}
	sayHi() {
		return `Hi! ${this.name},`;
	}
}

class Derived extends Base {
	sayHi() {
		return `${super.sayHi()} how are you doing?`;
	}
}

const derived = new Derived('Lee');
console.log(derived.sayHi());	// Hi! Lee, how are you doing?
'''

319.
super 참조를 통해 수퍼클래스의 메서드를 참조하려면,
super가 수퍼클래스의 prototype 프로퍼티에 바인딩된 프로토타입을 참조할 수 있어야함.
쉽게 말해, 부모 객체의 프로토타입 객체를 자식 객체에서 찾을 수 있어야 함.
'''
class Base {
	constructor(name) {
		this.name = name;
	}
	sayHi() {
		return `Hi! ${this.name},`;
	}
}

class Derived extends Base {
	sayHi() {
		__super는 Base.prototype을 가리킴.
		const __super = Object.getPrototypeOf(Derived.prototype);
		return `${__super.sayHi.call(this)} how are you doing?`;
	}
}
'''

320.
[[HomeObject]]는 메서드 자신을 바인딩하고 있는 객체를 가리킴.
[[HomeObject]]를 통해 메서드 자신을 바인딩하고 있는 객체의 프로토타입을 찾을 수 있음.
ex) Derived 기준으로 Derived.prototype이 [[HomeObject]]

321.
주의할 점은 ES6의 메서드 축약 표현으로 정의된 함수만이 [[HomeObject]]를 가짐.
[[HomeObject]]를 가진 함수만이 super 참조 가능.
객체 리터럴 또한 메서드 축약 표현으로 정의되었다면, super 참조 사용 가능.
'''
const base = {
	name:'Lee',
	sayHi() {
		return `Hi! ${this.name},`;
	}
};

const derived = {
	__proto__:base,
	sayHi() {
		return `${super.sayHi()} how are you doing?`;
	}
};

console.log(derived.sayHi());
'''

322.
<표준 빌트인 생성자 함수 확장>
String, Number, Array 등과 같은 표준 빌트인 객체도
[[Construct]] 내부 메서드를 갖는 생성자 함수이므로,
extends 키워드를 통해 확장 가능.
'''
class MyArray extends Array {
	// 중복된 배열 요소를 제거한 뒤 반환.
	uniq() {
		return this.filter((v,i,self)=>self.indexOf(v) === i);
	}

	// 모든 배열 요소의 평균을 구함.
	avg() {
		return this.reduce((pre, cur)=>pre+cur, 0) / this.length;
	}
}

const myArray = new MyArray(1,1,2,3);
console.log(myArray);	// [1,1,2,3]
console.log(myArray.uniq());	// [1,2,3]
console.log(myArray.avg());	// 1.75

// 새로운 배열을 반환하는 메서드가 MyArray 클래스의 인스턴스를 반환.
console.log(myArray.filter(v=>v%2) instanceof MyArray);	// true
// 메서드 체이닝이 가능하도록 하기 위함.
console.log(myArray.filter(v=>v%2).uniq().avg());	// 2
'''

323.
만약 MyArray 클래스의 uniq 메서드가 MyArray 클래스가 생성한 인스턴스가 아닌,
Array가 생성한 인스턴스를 반환하게 하려면,
다음과 같이 Symbol.species를 사용하여, 정적 접근자 프로퍼티를 추가함.
'''
class MyArray extends Array {
	static get [Symbol.species]() { return Array; }
	// 중복된 배열 요소를 제거한 뒤 반환.
	uniq() {
		return this.filter((v,i,self)=>self.indexOf(v) === i);
	}
	// 모든 배열 요소의 평균을 구함.
	avg() {
		return this.reduce((pre, cur)=>pre+cur, 0) / this.length;
	}
}

const myArray = new MyArray(1,1,2,3);
console.log(myArray.uniq() instanceof MyArray);	// false
console.log(myArray.uniq() instanceof Array);	// true
// 단 메서드 체이닝 사용 불가.
'''
*/
