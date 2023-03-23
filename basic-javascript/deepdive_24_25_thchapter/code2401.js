/*
266.
'''
const x = 1;
function outerFunc() {
	const x = 10;
	function innerFunc() {
		console.log(x);
	}
	innerFunc();
}
outerFunc();	// 10

function foo() {
	const x = 10;
	bar();
}

function bar() {
	console.log(x);
}

foo();	// 1
bar();	// 1
'''
// 중접함수 innerFunc에서 outerFunc의 x 변수에 접근 가능.
// 자바스크립트는 호출이 아닌 선언된 위치를 기준으로,
// 함수의 상위 스코프를 결정하므로, foo(); bar();의 출력값은 1.

267.
자바스크립트는 렉시컬 스코프를 따르는 프로그래밍 언어.
자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라,
함수를 어디에 정의했는지에 따라 상위 스코프를 결정.(=렉시컬 스코프)
함수 정의가 평가되어 함수 객체를 생성할 때,
자신이 정의된 위치에 의해 결정된 상위 스코프의 참조를
함수 객체 자신의 내부 슬롯 [[Environment]]에 저장.

268.
<클로저(Closure)>
'''
const x=1;
function outer() {
	const x=10;
	const inner = function() {
		// x는 상위 스코프의 변수.
		// 여기서 x는 자유변수(free variable)임.
		console.log(x);
	};
	return inner;
}
const innerFunction = outer();
innerFunction();	// 10
// outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서는 제거되지만,
// outer 함수의 렉시컬 환경까지 소멸하는 것은 아님.
'''
외부 함수보다 중첩 함수가 더 오래 유지되는 경우,
중첩 함수는 이미 생명 주기가 종료된 외부 함수의 변수를 참조 가능.
이러한 환경의 중첩함수를 클로저(Closure)라고 함.

269.
함수를 어디서 호출하든 상관없이,
함수는 언제나 자신이 기억하는 상위 스코프의 식별자를 참조할 수 있음.
또한 식별자에 바인딩된 값을 변경할 수도 있음.

270.
클로저는 상태를 안전하게 변경하고 유지하기 위해 사용.
즉, 상태가 의도치 않게 변경되지 않도록 상태를 안전하게 은닉하고,
특정 함수에게만 상태 변경을 허용하기 위해 사용됨.
'''
// num을 외부로부터 보호하는 코드.
// increase()만 num변수를 참조하고 변경할 수 있도록 함.
const increase = (function() {
	let num = 0;
	return function() {
		return ++num;
	};
})();

console.log(increase());	// 1
console.log(increase());	// 2
'''

271.
위의 270번 코드 확장.
'''
const counter = (function() {
	let num = 0;
	return {
		increase() {
			return ++num;
		},
		decrease() {
			return num>0 ? (--num) : 0;
		}
	};
})();

console.log(counter.increase());	// 1
console.log(counter.increase());	// 2
console.log(counter.decrease());	// 1
'''

272.
외부 상태 변경이나 가변 데이터를 피하고,
불변성을 지향하는 함수형 프로그래밍에서 부수효과를 최대한 억제하여 오류를 피하고
프로그램의 안정성을 높이기 위해 클로저는 적극적으로 활용.
'''
// 연동되지 않는 counter
function makeCounter(aux) {
	let counter=0;
	return function() {
		counter = aux(counter);
		return counter;
	};
}
function increase(n) {
	return ++n;
}
function decrease(n) {
	return n>0 ? (--n) : 0;
}

const increaser = makeCounter(increase);
console.log(increaser());
console.log(increaser());

// increaser 함수와 별개의 독립돈 렉시컬 환경을 갖기 때문에
// 카운터 상태가 연동되지 않음.
const decreaser = makeCounter(decrease);
console.log(decreaser());
console.log(decreaser());
'''

273.
'''
// 연동되는 counter
const counter = (function() {
	let counter = 0;
	return function(aux) {
		counter = aux(counter);
		return counter;
	};
})();

function increase(n) {
	return ++n;
}

function decrease(n) {
	return n>0? (--n):0;
}

console.log(counter(increase));
console.log(counter(increase));
console.log(counter(decrease));
'''

274.
<캡슐화(Encapsulation)>
객체의 상태를 나타내는 프로퍼티와
프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것.
-> 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 함.

275.
'''
const Person = (function() {
	let _age = 0;	// private
	
	// 생성자 함수
	function Person(name, age) {
		this.name = name;	// public
		_age = age;
	}
	
	Person.prototype.sayHi= function() {
		console.log(`Hi! I'm ${this.name}, `
		+ `and I'm ${_age}.`);
	};
	
	return Person;
})();

const me = new Person('Lee', 20);
me.sayHi();	// Hi! I'm Lee, and I'm 20.
console.log(me.name);	// Lee
console.log(me._age);	// undefined

const you = new Person('Kim', 15);
you.sayHi();	// Hi! I'm Kim, and I'm 15.
console.log(you.name);	// Kim
console.log(you._age);	// undefined

me.sayHi();	// Hi! I'm Lee, and I'm 15.
// 왜냐하면, Person.prototype.sayHi 메서드는
// 단 한 번 생성되는 클로저이기 때문.
'''

276.
위의 클로저를 사용하는 것으로는 완벽하게 private을 구현할 수 없음.
다행히도, TC39 프로세스의 stage3(candidate)에는 클래스에
private 필드를 정의할 수 있는 새로운 표준 사양이 제안되었고,
표준 사양으로의 승급이 확실시되고 있음.

277.
'''
// 클로저를 사용할 때 자주 발생하는 실수.
// var 키워드가 함수 레벨 스코프를 지원하기 때문에 발생하는 오류.
var funcs = [];
for(var i=0; i<3; i++) {
	funcs[i] = function() { return i; };
}
for(var j=0; j<funcs.length; j++) {
	console.log(funcs[j]());
}
'''
i는 전역변수이므로, i는 첫번째 for문이 끝나면 3이 할당되어 있음.
두번째 for문에서 해당 함수를 호출하면 따라서, 모두 출력값을 3으로 함.

278.
'''
// 위의 277번을 수정한 코드 1
var funcs = []

for (var i=0; i<3; i++) {
	funcs[i] = (function(id) {
		// 매개변수에 저장된 값 또한 클로저가 상위 객체 참조로
		// 사용할 수 있음을 이용한 코드.
		// 즉, 여기에 'var id = i'를 넣어놓고 클로저를 반환한 격.
		return function() {
			return id;
		}
	})(i);
}

for (var j=0; j<funcs.length; j++) {
	console.log(funcs[j]());
}
'''


279.
'''
// 위의 277번을 수정한 코드 2
// let을 사용하면, 매번 새로운 렉시컬 환경이 생성되므로
// 오류가 해결됨.
var funcs = [];
for(let i=0; i<3; i++) {
	funcs[i] = function() { return i; };
}
for(let i=0; i<funcs.length; i++) {
	console.log(funcs[j]());
}
'''

280.
'''
// 위의 277번을 수정한 코드 3
// 고차함수를 활용하는 방법.
const funcs = Array.from(new Array(3), (_, i) => () => i);
funcs.forEach(f=>console.log(f()));
'''
*/