/*
324.
ES6 이전의 함수는 동일한 함수라도 다양한 형태로 호출 가능.
이는 ES6 이전의 함수는 사용 목적에 따라 명확히 구분되지 않음을 의미.
즉, ES6 이전의 모든 함수는 callable이면서 constructor임.
'''
var foo = function() {
	return 1;
}

// 일반 함수로써 호출
foo();

// 생성자 함수로써 호출
new foo();

// 메서드로써 호출
var obj = { foo: foo };
obj.foo();

// 심지어 객체에 바인딩된 메서드조차도 callable이면서 constructor.
'''

325.
ES6부터는 함수의 사용 목적에 따라 세 가지 종류로 명확히 구분함.
[특성: constructor, prototype, super, arguments]
-> 일반 함수	: O, O, X, O	// 함수 선언문 or 함수 표현식
-> 메서드		: X, X, O, O
-> 화살표 함수	: X, X, X, X

326.
ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미함.
'''
const obj = {
	x:1,
	foo() { return this.x; }, // 메서드
	bar: function() { return this.x; } // 일반 함수
};

console.log(obj.foo());
console.log(obj.bar());
'''

327.
ES6 사양에서 정의한 메서드는 인스턴스를 생성할 수 없는 non-constructor.
(메서드 축약 표현으로 생성한 함수는 생성자 함수로 호출 불가.)
-> prototype 프로퍼티가 없고, 프로토타입도 생성하지 않음.
'''
// 위 326번 예제와 연동
obj.foo.hasOwnProperty('prototype');	// false
obj.bar.hasOwnProperty('prototype');	// true
'''

328.
표준 빌트인 객체가 제공하는 프로토타입 메서드와 정적 메서드는
모두 non-constructor.
'''
String.prototype.toUpperCase.prototype;	// undefined
String.fromCharCode.prototype;	// undefined
'''

329.
ES6 사양에서의 메서드(메서드 축약 표현으로 정의된 함수)는,
자신을 바인딩한 객체를 가리키는 내부 슬롯[[HomeObject]]를 가짐.
cf. super 참조는 내부 슬롯 [[HomeObject]]를 사용해 이뤄짐.
즉, [[HomeObject]]를 갖는 ES6 메서드만이 super 키워드를 사용 가능.
'''
const base = {
	name:`Lee`,
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
'''

330.
메서드를 정의할 때 프로퍼티 값으로 익명 함수 표현식을 할당하는 ES6 이전의 방식은
사용하지 않을 것을 권장.

331.
<화살표 함수(arrow function)>
화살표(=>, fat arrow)를 활용해, 기존 함수 정의 방식보다 간략한 함수 정의 가능.
화살표 함수는 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한
대안으로 유용함.

332.
화살표 함수는 함수 표현식으로 정의해야 함. 호출 방식은 기존 함수와 동일.
'''
const multiply = (x,y) => x*y;
multiply(2,3);
'''

333.
매개변수가 여러 개일 경우, 소괄호 () 안에 매개변수 선언.
ex) const arrowFunction = (x,y) => { ... };
매개변수가 하나인 경우, 소괄호를 생략할 수 있음.
ex) const arrowFunction = x => { ... };
매개변수가 없는 경우, 소괄호를 생략할 수 없음.
ex) const arrowFunction = () => { ... };

334.
함수 몸체가 하나의 문으로 구성된다면, 중괄호 {} 생략 가능.
이때, 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면
암묵적으로 반환됨.
'''
const power = x => x**2;
console.log(power(3));	// 9
'''
함수 몸체를 감싸는 중괄호를 생략한 경우,
함수 몸체 내부의 문이 표현식이 아닌 문(값으로 치환될 수 없는 문)이라면,
에러가 발생함.
따라서, 함수 몸체가 하나의 문으로 구성된다고 해도,
함수 몸체의 문이 표현식이 아닌 문이라면 중괄호 생략 불가.

335.
화살표 함수를 통해 객체 리터럴을 반환하는 경우,
객체 리터럴을 소괄호 ()로 감싸 주어야 함.
'''
const create = (id, content) => ({id, content});
create(1, 'js');	// {id:1, content:'js'}

// 위 표현은 아래와 같음.
const create = (id, content) => {
	return {id, content};
};
'''

336.
함수 몸체가 여러 개의 문으로 구성된다면,
함수 몸체를 감싸는 중괄호 {}를 생략할 수 없음.
'''
const sum = (a,b) => {
	const result = a+b;
	return result;
};
'''

337.
화살표 함수도 즉시 실행 함수로 사용 가능.
'''
const person = (name => ({
	sayHi() {
		return `Hi? This is ${name}.`;
	}
}))('Lee');
console.log(person.sayHi());	// Hi? This is Lee.
'''

338.
화살표 함수도 고차 함수(Higher-Order Function, HOF)에 인수로 전달 가능.
'''
// ES5
[1,2,3].map(function(v) {
	return v*2;
});

// ES6
[1,2,3].map(v=>v*2);
'''

339.
화살표 함수는 일반 함수의 기능을 간략화했으며, this도 편리하게 설계되어 있음.

340.
화살표 함수는 중복된 매개변수 이름을 선언할 수 없음.
ex) const arrow = (a,a) => a+a;
// SyntaxError: Duplicate parameter name not allowed in this context

341.
화살표 함수는 함수 자체의 this, arguments, super, new.target을 바인딩하지 않음.
따라서, 화살표 함수 내부에서 this, arguments, super, new.target을 참조하면,
스코프 체인을 통해 상위 스코프의 this, arguments, super, new.target을 참조.

화살표 함수는 다른 함수의 인수로 전달되어 콜백 함수로 사용되는 경우가 많음.
화살표 함수에서 this 바인딩은 함수가 어떻게 호출되었는지에 따라 동적으로 결정됨.
'''
// arr.map(callback(currentValue[, index[, array]])[, thisArg])
// map은 callback 함수를 각각의 요소에 대해 한번씩 순서대로 불러
// 그 함수의 반환값으로 새로운 배열을 생성. callback 함수는
// (undefined도 포함해서) 배열 값이 들어있는 인덱스에 대해서만 호출.
// 즉, 값이 삭제되거나 아직 값이 할당/정의되지 않은 인덱스에 대해서는 호출되지 않습니다.
// 반환 값 : 배열의 각 요소에 대해 실행한 callback의 결과를 모은 새로운 배열.
// callback : 새로운 배열 요소를 생성하는 함수. 다음 세 가지 인수를 가짐.
// currentValue : 처리할 현재 요소.
// index : (Optional)처리할 현재 요소의 인덱스.
// array : (Optional)map()을 호출한 배열.
class Prefixer {
	constructor(prefix) {
		this.prefix = prefix;
	}
	add(arr) {
		// this.prefix가 전역 객체에서 찾아지므로, 에러 발생.
		// return arr.map(function(item) {
		//	return this.prefix + item;
		// });
	}
}
const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
'''

342.
위의 341번 예제의 문제를 방지하기 위해, that 바인딩을 이용해야 함.(ES5)
'''
class Prefixer {
	constructor(prefix) {
		this.prefix = prefix;
	}
	add(arr) {
		const that = this;
		return arr.map(function(item) {
			return that.prefix + ' ' + item;
		});
	}
}
'''

343.
위의 341번 예제의 문제를 방지하기 위해, Array.prototype.map에 바인딩할 객체를 전달.
'''
class Prefixer {
	constructor(prefix) {
		this.prefix = prefix;
	}
	add(arr) {
		return arr.map(function(item) {
			return this.prefix + ' ' + item;
		}, this); // this에 바인딩된 갑싱 콜백 함수 내의 this에 바인딩됨.
	}
}
'''

344.
위의 341번 예제의 문제를 방지하기 위해, Function.prototype.bind 메서드 사용.
'''
class Prefixer {
	constructor(prefix) {
		this.prefix = prefix;
	}
	add(arr) {
		return arr.map(function(item) {
			return this.prefix + ' ' + item;
		}.bind(this));
	}
}
'''

345.
ES6부터는 화살표 함수를 통해 341번  예제의 문제를 간단히 해결 가능.
'''
class Prefixer {
	constructor(prefix) {
		this.prefix = prefix;
	}
	add(arr) {
		return arr.map(item=>this.prefix+item);
	}
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
'''
화살표 함수는 함수 자체의 this 바인딩을 갖지 않게 하므로써,
화살표 함수 내부의 this는 상위 스코프의 this를 그대로 참조함.
이를 lexical this라고 함.

346.
프로퍼티에 할당한 화살표 함수도 스코프 체인 상에서
가장 가까운 상위 함수 중 화살표 함수가 아닌 함수의 this를 참조.
'''
// increase 프로퍼티에 할당한 화살표 함수의 상위 스코프는 전역.
// 따라서 increase 프로퍼티에 할당한 화살표 함수의 this는 전역 객체를 가리킴.
const counter = {
	num: 1,
	increase: () => ++(this.num);
};
console.log(counter.increase());	// NaN
'''

347.
화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에,
Function.prototype.call, Function.prototype.apply,
Function.prototype.bind 메서드를 사용해도,
화살표 함수 내부의 this를 교체할 수 없음.
'''
const arrow = () => this.x;
console.log(arrow.call({x:10}));	// undefined
'''

348.
객체의 메서드를 화살표 함수로 정의하는 것은 피해야 함.
대신 메서드를 정의할 때는 ES6 메서드 축약 표현으로 정의한 ES6 메서드 사용을 권장.
또한, 프로퍼티를 동적으로 추가할 때는 ES6 메서드 축약 표현을 사용할 수 없으므로,
일반 함수를 할당해야 함.

349.
일반 함수가 아닌, ES6 메서드를 동적으로 추가하고 싶다면, 다음과 같이
객체 리터럴을 바인딩하고 프로토타입의 constructor 프로퍼티와 생성자 함수 간의 연결을 재설정.
'''
function Person(name) {
	this.name = name;
}

Person.prototype = {
	constructor: Person,
	sayHi() {
		console.log(`Hi! This is ${this.name}.`);
	}
};

const person = new Person('Lee');
persoon.sayHi();
'''

350.
클래스 필드 정의 제안을 사용해 클래스 필드에 화살표 함수를 할당 가능.
'''
// Bad
class Person {
	name = 'Lee';
	sayHi = ()=>console.log(`Hi! ${this.name});
}
const person = new Person();
person.sayHi();
'''
sayHi 클래스필드는 '인스턴스 프로퍼티'이므로,
sayHi 클래스필드에 할당한 화살표 함수의 상위 스코프는 함수 외부이지만,
this는 클래스 외부의 this를 참조하지 않고 클래스가 생성할 인스턴스를 참조.
따라서, sayHi 클래스필드에 할당한 화살표 함수 내부에서 참조한 this는
constructor 내부의 this 바인딩과 같음.
'''
class Person {
	constructor() {
		this.name='Lee';
		this.sayHi=()=>console.log(`Hi! ${this.name}`);s
	}
}
'''
그러나, 클래스 필드에 할당한 화살표 함수는 프로토타입 메서드가 아닌,
인스턴스 메서드가 되므로, ES6 축약 표현을 사용해 정의하는 것을 권장.

351.
화살표 함수는 함수 자체의 super 바인딩을 갖지 않음.
따라서, 화살표 함수 내부에서 super를 참조하면, 상위 스코프의 super를 참조함.
'''
class Base {
	constructor(name) {
		this.name = name;
	}
	sayHi() {
		return `Hi! ${this.name}`;
	}
}

// 클래스 필드에 할당한 화살표 함수는 constructor의 super 바인딩을 참조.
class Derived extends Base {
	sayHi = () => `${super.sayHi()}, how are you doing?`;
}

const derived = new Derived('Lee');
console.log(derived.sayHi());
'''

352.
화살표 함수는 함수 자체의 arguments 바인딩을 갖지 않음.
따라서, 화살표 함수 내부에서 arguments를 참조하면,
상위 스코프의 arguments를 참조.
'''
(function() {
	const foo = ()=>console.log(arguments);
	foo(3,4);
}(1,2));
// 결과값: { '0':1, '1':2 }
'''

353.
화살표 함수는 arguments 객체를 사용할 수 없으므로,
가변 인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야 함.

354.
<Rest 파라미터>
매개변수 이름 앞에 세 개의 점(...)을 붙여서 정의한 매개변수.
함수에 전달된 인수들의 목록을 배열로 전달받음.
'''
function foo(...rest) {
	console.log(rest);	// [1,2,3]
}
foo(1,2,3);
'''

355.
일반 매개변수와 Rest 파라미터는 함께 사용 가능하며,
이때 함수에 전달된 인수들은 매개변수와 Rest 파라미터에 순차적으로 할당됨.
단, Rest 파라미터는 반드시 마지막 파라미터이어야 함.
Rest 파라미터는 단 하나만 선언할 수 있음.
'''
function foo(param1, param2, ...rest) {
	console.log(param1);	// 1
	console.log(param2);	// 2
	console.log(rest);	// [3,4,5]
}
foo(1,2,3,4,5);
'''

356.
Rest 파라미터는 함수 정의 시 선언한 매개변수 개수를 
나타내는 함수 객체의 length 프로퍼티에 영향을 주지 않음
'''
function foo(...rest) { }
console.log(foo.length);	// 0

function bar(x, ...rest) { }
console.log(bar.length);	// 1
'''

357.
인수가 전달되지 않은 매개변수의 값은 undefined임.
이를 방치하면, 의도치 않은 결과가 발생할 수 있음.
따라서, ES6 이전까지는 다음과 같이 방어 코드가 필요했음.
'''
function sum(x,y) {
	x = x||0;
	y = y||0;
	return x+y;
}

console.log(sum(1,2));	// 3
console.log(sum(1));	// 1
'''

357.
<매개변수의 기본값>
ES6에서 도입된 매개변수 기본값을 사용하면,
함수 내에서 수행하던 인수 체크 및 초기화를 간소화할 수 있음.
'''
function sum(x=0, y=0) {
	return x+y;
}
console.log(sum(1,2));	// 3
console.log(sum(1));	// 1
'''
매개변수 기본값은 매개변수를 아예 전달하지 않거나,
undefined를 담아 전달한 경우에만 유효.

358.
매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는
함수 객체의 length 프로퍼티와 arguments 객체에는 아무런 영향을 주지 않음.
'''
function sum(x, y=0) {
	console.log(arugments);
}

console.log(sum.length);	// 1

sum(1);	// Arugments {'0':1}
sum(1,2);	// Arguments {'0':1, '1':2}
'''
*/