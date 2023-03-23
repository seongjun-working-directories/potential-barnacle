/*
535.
ECMAScript의 타입 :
문자열/숫자/불리언/undefined/null/객체/Symbol

536.
Symbol(심벌)은 변경 불가능한 원시 타입의 값.
심벌 값은 다른 값과 중복되지 않는 유일무이한 값.
따라서, 주로 이름의 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용.

537.
심벌은 리터럴 표기법으로 생성할 수 없으므로, 심벌 값은 Symbol 함수를 호출하여 생성.
이때 생성된 심벌 값은 외부로 노출되지 않아 확인할 수 없으며,
다른 값과 절대 중복되지 않는 유일무이한 값.
'''
const mySymbol = Symbol();
console.log(typeof mySymbol);
// 심벌 값은 외부로 노출되지 않아 확인 불가
console.log(mySymbol());
'''

538.
Symbol 함수는 new 연산자와 함께 호출하지 않음.
이는 심벌 값이 변경 불가능한 원시 값이기 때문.

539.
Symbol 함수에는 선택적으로 문자열을 인수로 전달할 수 있으며,
이는 심벌 값에 대한 설명으로 디버깅 용도로만 사용됨.
즉, 심벌값에 대한 설명이 같더라도 생성된 심벌 값은 유일무이한 값임.
'''
const mySymbol1 = Symbol('mySymbol');
const mySymbol2 = Symbol('mySymbol');
console.log(mySymbol1 === mySymbol2);	// false
'''

540.
심벌 값도 객체처럼 접근할 경우, 래퍼 객체를 생성함.
'''
const mySymbol = Symbol('My Symbol');

console.log(mySymbol.description);	// My Symbol
console.log(mySymbol.toString());	// Symbol(My Symbol)
'''

541.
심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않음.
단, 불리언 타입으로는 암묵적 타입 변환이 가능.
'''
const mySymbol = Symbol();
console.log(!!mySymbol);	// true
if(mySymbol) console.log('mySymbol isn\'t empty.');
'''

542.
<Symbol.for>
인수로 전달받은 문자열을 키로 사용하여, 키와 심벌 값의 쌍들이 
저장되어 있는 전역 심벌 레지스트리(Global Symbol Registry)에서
해당 키와 일치하는 심벌 값을 검색함.
-> 검색에 성공하면 새로운 심벌 값을 생성하지 않고 검색된 심벌 값을 반환.
-> 실패 시, 새로운 심벌 값을 생성하여 Symbol.for 메서드의 인수로 전달된 키로
-> 전역 심벌 레지스트리에 저장 후, 생성된 심벌 값을 반환.
'''
const s1 = Symbol.for('mySymbol');
const s2 = Symbol.for('mySymbol');
console.log(s1 === s2);	// true
'''

543.
Symbol 함수는 호출될 때마다 유일무이한 심벌 값을 생성.
그러나 이렇게 생성된 심벌 값을 검색할 수 있는 키가 지정되지 않으므로,
전역 심벌 레지스트리에서 관리되지 않음.
그러나 Symbol.for 메서드를 사용하면 애플리케이션 전역에서 중복되지 않는 값을
단 하나만 생성하여 전역 심벌 레지스트리를 통해 공유 가능.

544.
<Symbol.keyFor>
전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있음.
'''
const s1 = Symbol.for('mySymbol');
Symbol.keyFor(s1);
'''

545.
심벌과 상수
'''
// 4개의 방향을 나타내는 상수를 정의하는 예제
const Direction = {
	UP : 1, DOWN : 2, LEFT : 3, RIGHT : 4
};

const myDirection = Direction.UP;

if(myDirection === Direction.UP) {
	console.log('You are going UP.');
}
'''

위 예제와 같이 값에 특별한 의미가 없고 상수 이름 자체에 의미가 있는경우,
심벌 값을 사용할 수 있음.
'''
const Direction = {
	UP : Symbol('up'), DOWN : Symbol('down'),
	LEFT : Symbol('left'), RIGHT : Symbol('right')
};

const myDirection = Direction.UP;

if(myDirection === Direction.UP) {
	console.log('You are going UP.');
}
'''

546.
자바스크립트는 다른 언어의 enum을 지원하기 않지만, 타입스크립트에서는 enum 지원.
자바스크립트에서 enum을 흉내내어 사용하려면,
다음과 같이 객체의 변경을 방지하기 위해 객체를 동결하는
Object.freeze 메서드와 심벌 값을 사용함.
'''
// Javascript enum
const Direction = Object.freeze({
	UP : Symbol('up'),
	DOWN : Symbol('down'),
	LEFT : Symbol('left'),
	RIGHT : Symbol('right')
});

const myDirection = Direction.UP;

if(myDirection === Direction.UP) {
	console.log('You are going UP.');
}
'''

547.
객체의 프로퍼티 키는 빈 문자열을 포함하는 모든 문자열 또는 심벌 값으로 만들 수 있으며,
동적으로 생성할 수 있음. 심벌 값으로 프로퍼티 키를 동적으로 생성할 수 있음.
단, 심벌 값을 프로퍼티 키로 사용하려면 프로퍼티 키로 사용할 심벌 값에 대괄호를 사용해야 함.
접근도 마찬가지로 대괄호를 사용.
'''
const obj = {
	[Symbol.for('mySymbol')] : 1
};

obj[Symbol.for('mySymbol')];
'''
심벌 값으로 프로퍼티 키를 만들면 다른 프로퍼티 키와 절대 충돌하지 않음.

548.
심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 for...in 문이나
Object.keys, Object.getOwnPropertyNames 메서드로 찾을 수 없음.
따라서, 심벌 값을 프로퍼티 키로 사용하면, 외부에 노출할 필요가 없는 프로퍼티를 은닉 가능.
'''
const obj = {
	[Symbol('mySymbol')] : 1
};

for (const key in obj) {
	console.log(key);	// 아무것도 출력되지 않음
}

console.log(Object.keys(obj));
console.log(Object.getOwnPropertyNames(obj));
'''

549.
Object.getOwnPropertySymbols 메서드를 사용하면
심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티를 찾을 수 있음.
'''
const obj = {
	[Symbol('mySymbol')] : 1
};

console.log(Object.getOwnPropertySymbols(obj));

const symbolKey1 = Object.getOwnPropertySymbols(obj)[0];
console.log(obj[symbolKey1]);	// 1
'''

550.
중복될 가능성이 없는 심벌 값으로 프로퍼티 키를 생성하여 표준 빌트인 객체를 확장하면,
표준 빌트인 객체의 기존 프로퍼티 키와 충돌하지 않는 것은 물론,
표준 사양의 버전이 올라감에 따라 추가될지 모르는 어떤 프로퍼티 키와도 충돌할 위험이 없음.
따라서, 안전하게 표준 빌트인 객체를 확장할 수 있음.
'''
Array.prototype[Symbol.for('sum')] = function() {
	return this.reduce((acc, cur)=>acc+cur, 0);
};

[1,2][Symbol.for('sum')]();	// 3
'''

551.
Well-Known Symbol이란 Symbol 함수의 프로퍼티로 할당되어 있는 빌트인 심벌 값임.
Array, String, Map, Set,TypedArray, arguments, NodeList와 같이
for...of문으로 순회 가능한 빌트인 이터러블은 Well-Known Symbol인 Symbol.iterator를
키로 갖는 메서드를 가지며, Symbol.iterator 메서드를 호출하면 이터레이터를 반환하도록
ECMAScript 사양에 규정되어 있음.
만약 일반 객체를 이터러블처럼 동작하도록 구현하고자 한다면,
이터레이션 프로토콜을 따르면 됨.
즉, Symbol.iterator를 키로 갖는 메서드를 객체에 추가하고,
이터레이터를 반환하도록 구현하면 그 객체는 이터러블이 됨.
'''
const iterable = {
	// Symbol.iterator 메서드를 구현해 이터러블 프로토콜을 준수
	[Symbol.iterator]() {
		let cur = 1;
		const max = 5;
		// Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환
		return {
			next() {
				return {value:cur++, done:cur>max+1};
			}
		}
	}

};
'''

cf. Generator.prototype.next()
next() 메서드는 done과 value 프로퍼티를 가진 객체를 반환.
next() 메서드를 호출할 때 매개변수를 제공하여 그 값을 generator에 전달 가능.
사용방법 : gen.next(value)
매개 변수 : value(Generator에 전달할 값)
반환값 : 두 개의 프로퍼티를 가진 객체
(1) done (boolean)
-> Iterator(반복자)가 마지막 반복 작업을 마쳤을 경우 true.
-> 만약 iterator(반복자)에 return 값이 있다면 value의 값으로 지정된다.
-> Iterator(반복자)의 작업이 남아있을 경우 false.
-> Iterator(반복자)에 done 프로퍼티 자체를 특정짓지 않은 것과 동일하다.
(2) value
-> Iterator로부터 반환되는 모든 자바스크립트 값이며 done이 true일 경우 생략 가능.
*/