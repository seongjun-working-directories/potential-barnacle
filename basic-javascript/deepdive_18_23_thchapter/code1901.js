/*
160.
객체는 상태 데이터와 동작을 하나의 논리적 단위로 묶은 복합적 자료구조임.

161.
상속은 어떤 객체의 프로퍼티 또는 메서드를
다른 객체가 상속받아 그대로 사용할 수 있는 것을 의미함.

162.
동일한 생성자 함수에 의해 생성된 모든 인스턴스는
동일한 값 또는 메서드를 중복으로 소유하게 될 수 있는데,
이는 불필요하게 자원을 낭비하는 것.
-> 프로토타입 기반의 상속으로 중복을 제거할 수 있음.
'''
function Circle(radius) {
    this.radius = radius;
}

Circle.prototype.getArea() = function() {
    return Math.PI * (this.radius ** 2);
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

// 프로토타입 Circle.prototype으로부터
// 모든 인스턴스가 하나의 getArea 메서드를 공유함.
console.log(circle1.getArea === circle2.getAtrea);  // true
'''

163.
프로토타입 객체는 어떤 객체의 상위 객체 역할을 하는 객체로,
다른 객체에 공유 프로퍼티(메서드 포함)를 제공함.

164.
모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지며,
이 내부 슬롯의 값은 프로토타입의 주소임.

165.
객체 리터럴에 의해 생성된 객체의 프로토타입은 Object.prototype이고,
생성자 함수에 의해 생성된 객체의 프로토타입은 생성자 함수의 prototype에
바인딩되어 있는 객체임.

166.
(모던 자바스크립트 Deep Dive 265pg 그림 19-3)

167.
[[Prototype]] 내부 슬롯은 __proto__ 접근자 프로퍼티로 간접 접근 가능.
프로토타입 객체는 자신의 constructor 프로퍼티로 생성자 함수에 접근 가능.
생성자 함수는 자신의 prototype 프로퍼티로 프로토타입에 접근 가능.
'''
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const p1 = new Person('lee', 15);
console.dir(Person.prototype);
console.dir(Person.prototype.constructor);
console.dir(p1.__proto__);
'''
결과값 :
Object { constructor: ƒ Person(name, age) }
ƒ Person(name, age)
Object { constructor: ƒ Person(name, age) }

168.
__proto__ 접근자 프로퍼티를 사용함으로써,
상호 참조에 의한 프로토타입 체인 생성이 방지됨.
즉, 부모 객체가 자식을 가리키는 동시에,
자식 객체가 부모 객체를 가리키는 것을 막아줌.

169.
__proto__를 통해 프로토타입에 직접 접근하는 것은 바람직하지 않음.
이유는, Object.prototype을 상속받지 않는 객체를 생성할 수도 있기 때문.
대신, "getPrototypeOf/setPrototypeOf 메서드"를 사용하기를 권장.
'''
const obj = {};
cnost parent = {x:1};

console.log(Object.getPrototypeOf(obj));
// console.log(obj.__proto__);

Object.setPrototypeOf(obj);
// obj.__proto__ = parent;

console.log(obj.x);
'''

170.
함수 객체는 prototype 프로퍼티를 소유하지만,
일반 객체는 prototype 프로퍼티를 소유하지 않음.
'''
(function() {}).hasOwnProperty('prototype');    // true
({}).hasOwnProperty('prototype');   // false

171.
생성자 함수로 호출할 수 없는, non-constructor인 화살표 함수와,
ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며,
프로토타입도 생성하지 않음.

172.
객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아님.
그러나 큰 틀에서, 리터럴 표기법으로 생성한 객체도
생성자 함수로 생성한 객체와 본질적인 면에서 큰 차이가 없음.
따라서, 프로토타입의 constructor 프로퍼티로 연결되어 있는
생성자 함수를 리터럴 표기법으로 생성한 객체를 생성한
생성자 함수로 생각해도 크게 무리가 없음.

173.
모든 객체는 결국 생성자 함수와 연결되어 있으며,
프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성됨.

174.
<사용자 정의 생성자 함수와 프로토타입의 생성 시점>
생성자 함수가 prototype 프로퍼티로 호출할 수 있는 객체는,
함수 정의가 평가되어 함수 객체를 생성하는 시점에 더불어 생성됨.
'''
// 함수 정의는 runtime 이전에 진행되므로, 정상적으로 출력됨.
console.log(Person.prototype);
function Person(name) {
    this.name = name;
}
'''
이때 생성된 Person.prototype은 constructor 프로퍼티만을 갖고,
constructor는 Person 생성자 함수를 기리킴.

175.
<빌트인 생성자 함수와 프로토타입의 생성 시점>
Object, String, Number, Function, Array, RegExp, Date, Promise
등과 같은 빌트인 생성자 함수도 일반 함수와 마찬가지로
생성자 함수가 생성되는 시점에 프로토타입이 생성됨.
(빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성됨.)

176.
Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 생성자 함수.

177.
객체는 생성 방식에 관계없이,
추상 연산 OrdinaryObjectCreate에 의해 생성됨.

178.
<객체 생성 방식>
객체 리터럴, Object 생성자 함수,
생성자 함수, Object.create 메서드, 클래스(ES6)

179.
프로토타입에 프로퍼티를 추가하면 하위 객체가 상속받음.
'''
function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function() {
    console.log(`Hi! My name is ${this.name}.`);
};

const me = new Person('Lee');
const you = new Person('Kim');

me.sayHello();
you.sayHello();

// 사용자 정의 함수가 프로토타입 프로퍼티로 가리키는 객체는
// Object.prototype을 상속 받음.
console.log(me.hasOwnProperty('name'));

// Person.prototype
console.log(Object.getPrototypeOf(me));
// Object.prototype
console.log(Object.getPrototypeOf(Person.prototype));
'''

180.
<프로토타입 체인> : 상속과 프로퍼티 검색을 위한 메커니즘.
자바스크립트는 객체의 프로퍼티에 접근하려 할 때,
해당 객체에 접근하려는 프로퍼티가 없다면,
[[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는
프로토타입의 프로퍼티를 순차적으로 검색함.

181.
call 메서드는 22.2.4절 "Function.prototype.apply/call/bind"에서 설명.
'''
function Person(name) {
    this.name = name;
}
const me = new Person('Kim');

// true
console.log(Object.prototype.hasOwnProperty.call(me, 'name'));
'''

182.
프로토타입 체인의 종점인 Object.prototype에서도
프로퍼티를 검색할 수 없는 경우 undefined를 반환함.

183.
프로퍼티가 아닌, 식별자는 스코프 체인에서 검색함에 유의.

184.
<오버라이딩과 프로퍼티 섀도잉>
(1) 오버라이딩
상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식.
(2) 프로퍼티 섀도잉
상속 관계에 의해 프로퍼티가 가려지는 현상.
(3) 오버로딩
함수 이름은 동일하지만, 매개변수의 타입 또는 개수가 다른 메서를 구현하고,
매개변수에 의해 메서드를 구별하여 호출하는 방식.

cf. 자바스크립트는 오버로딩을 지원하지 않음.
cf. 대신 arguments 객체를 이용해 구현 가능.

'''
const Person = (function() {
    // 생성자 함수
    function Person(name) {
        this.name = name;
    }

    // 프로토타입 메서드
    // Person.prototype 객체에 메서드가 생김
    Person.prototype.sayHello = function() {
        console.log(`Hi! My name is ${this.name}.`);
    }

    return Person;
})();

const me = new Person('Lee');

// 오버라이딩 :
// 인스턴스에 새롭게 sayHello를 정의하여,
// Person.prototype 내의 sayHello 함수를 가림.
me.sayHello = function() {  // me 객체에 메서드가 생김
    console.log(`Hey! My name is ${this.name}.`);
}

me.sayHello();
'''

185.
하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능.
따라서, 프로토타입에 직접 접근하여 프로퍼티를 삭제해야 함.

186.
프로토타입은 임의의 다른 객체로 변경될 수 있음.
프로토타입은 생성자 함수 또는 인스턴스에 의해 교체 가능.
'''
const Person = (function() {
    function Person(name) {
        this.name = name;
    }
    // 프로토타입을 객체 리터럴을 활용해 교체.
    // constructor 프로퍼티가 없으므로, 생성자 함수를 검색하면
    // Object.prototype 프로퍼티를 통해 Object 생성자 함수가 나옴.
    Person.prototype = {
        sayHello() {
            console.log(`Hi! My name is ${this.name}.`);
        }
    };
    return Person;
})();

const me = new Person('Lee');
'''

187.
교체된 객체 리터럴에 constructor 프로퍼티를 만들어,
생성자 함수와의 연결을 되살려낼 수 있음.
'''
const Person = (function() {
    function Person(name) {
        this.name = name;
    }
    Person.prototype = {
        constructor:Person,
        sayHello() {
            console.log(`Hi! My name is ${this.name}`);
        }
    };
    return Person;
})();
const me = new Person('Lee');
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
'''

188.
인스턴스 객체의 __proto__ 접근자 프로퍼티 또는
Object.setPrototypeOf 메서드를 통해 프로토타입으로 교체 가능.
'''
function Person(name) {
    this.name = name;
}
const me = new Person('Lee');

Person.prototype.sayHello = function() {
    console.log(`Hey! My name is ${this.name}.`);
};
me.sayHello();

const Parent = {
    constructor:Person,
    sayHello() {
        console.log(`Hi! My name is ${this.name}.`);
    }
};

// me 객체의 프로토타입을
// Person.prototype 객체에서 Parent 객체로 교체.
Object.setPrototypeOf(me, Parent);
// 또는 me.__proto__ = Parent;

me.sayHello();
'''

189.
단, 인스턴스를 통해 프로토타입을 교체한 경우,
생성자 함수가 프로토타입을 가리키는 연결이 끊어짐.
따라서, 이 연결을 살리려면 다음과 같이 작성.
'''
function Person(name) {
    this.name = name;
}
const me = new Person('Lee');

const Parent = {
    constructor: Person,
    sayHello() {
        console.log(`Hi! My name is ${this.name}.`);
    }
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결 설정
Person.prototype = Parent;
Object.setPrototypeOf(me, parent);
me.sayHello();

console.log(me.constructor === Person);
console.log(Person.prototype === Object.getPrototypeOf(me));
'''

190.
<instanceof 연산자>
객체 instanceof 생성자 함수
ex) me instanceof Person;
-> 프로토타입 체인 내에서 발견 가능한 객체여야 true 반환.

191.
즉, instanceof는 생성자 함수의 prototype에 바인딩된 객체가
프로토타입 체인 상에 존재하는지 확인.
-> constructor 프로퍼티와 생성자 함수 간 연결 파괴는 무관.

192.
Object.create 메서드는 명시적으로 프로토타입을 지정해 새로운 객체를 생성.
첫 번째 매개변수는 생성할 객체의 프로토타입으로 지정할 객체가 들어감.
두 번째 매개변수는 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이뤄진 객체 전달.
'''
// null을 전달하므로써, 프로토타입 종점에 위치할 객체를 생성
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null);	// true

// "obj={};"와 동일
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype);	// true

obj = Object.create(Object.prototype, {
	x: {value:1, writable:true, enumerable:true, configurable:true},
	y: {value:2, writable:true, enumerable:true, configurable:true}
});
console.log(obj.x);
console.log(obj.y);

const myPrototype = {x:10};
obj = Object.create(myPrototype);
console.log(obj.x);

function Person(name) {
	this.name = name;
}

obj = Object.create(Person.prototype);
obj.name = 'Lee';
console.log(obj.name);
'''

193.
ES6에서는 객체 리터럴 내부에서 __proto__ 접근자 프로퍼티를 사용하여,
직접 상속을 구현할 수 있음.
'''
const myPrototype = {x:10};

const obj = {
	y:20,
	// 객체를 직접 상속받음
	// obj -> myPrototype -> Object.prototype -> null
	__proto__:myPrototype
};

console.log(obj.x, obj.y);
console.log(Object.getPrototypeOf(obj) === myPrototype);	// true
'''

194.
정적 프로퍼티/메서드는 생성자 함수로 인스턴스를 생성하지 않아도
참조 또는 호출할 수 있는 프로퍼티/메서드를 말함.
'''
function Person(name) {
	this.name = name;
}

Person.prototype.sayHello = function() {
	console.log(`Hi! My name is ${this.name}.`);
};

// 정적 프로퍼티
Person.myStaticProperty = 'This is a static property.';

// 정적 메서드
Person.myStaticMethod = function() {
	console.log('This is a static method.');
};

const me = new Person('Lee');

console.log(Person.myStaticProperty);	// This is a static property.
Person.myStaticMethod();	// This is a static method.

console.log(me.myStaticProperty);	// undefined
// me.myStaticMethod();	// TypeError: me.myStaticMethod is not a function
'''
정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조 또는 호출할 수 없음.

195.
정적 프로퍼티/메서드는 생성자 함수가 소유한 프로퍼티/메서드를 의미.

196.
in 연산자는 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인.
'''
const person = {
	name:'Lee',
	address:'Seoul'
};

console.log('name' in person);	// true
console.log('address' in person);	// true
console.log('age' in person);	// false
'''

197.
in 연산자는 확인 대상 객체의 모든 프로토타입 체인을 검사함.

198.
Reflect.has(객체, 프로퍼티) 메서드 또한 in과 동일하게 동작.
'''
const Person = {name:'Lee'};
console.log(Reflect.has(Person, 'name'));   // true
console.log(Reflect.has(Person, 'toString'));   // true
'''

199.
Object.prototype.hasOwnProperty 메서드를 활용하면,
객체에 특정 프로퍼티가 존재하는지 확인할 수 있음.
'''
console.log(person.hasOwnProperty('name'));
console.log(person.hasOwnProperty('age'));
'''
Object.prototype.hasOwnProperty의 경우,
고유의 프로퍼티 키인 경우만 true를 반환함.

200.
for...in문
'''
const person = {
    name: 'Lee',
    address: 'Seoul'
};

for (const key in person) {
    console.log(key + ":" + person[key]);
}
'''

201.
for...in문은 순회 대상 객체의 프로퍼티뿐만 아니라
상속받은 프로토타입의 프로퍼티까지 열거.
다만, toString과 같은 메서드는 열거할 수 없도록 정의되어
출력되지 않는 것 뿐임.

202.
for...in문은 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않음.

203.
객체 자신의 고유 프로퍼티만 열거하기 위해서는 for...in문 보다는
Object.keys/values/entries 메서드가 효과적임.

204.
(1)Object.keys 메서드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환.
(2)ES8부터 도입된 Object.values 메서드는
객체 자신의 열거 가능한 프로퍼티 값을 배열로 반환.
(3)ES8부터 도입된 Object.entries 메서드는
객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍 배열을 배열에 담아 반환.
'''
const person = {
    name:'Lee',
    address:'Seoul',
    __proto__:{age:30}
};
console.log(Object.keys(person));   // [name, address]
console.log(Object.values(person)); // [Lee, Seoul]
console.log(Object.entries(person));    // [name, Lee], [address, Seoul]
'''
*/