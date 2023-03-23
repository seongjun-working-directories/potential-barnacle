/*
124.
new 연산자와 함께 Object 생성자 함수를 호출하면, 빈 객체 생성 후 반환.
'''
const person = new Object();
person.name = 'lee';
person.sayHello = function() {
	console.log("Hello!");
};
console.log(person);
person.sayHello();
'''

125.
자바스크립트는 Object 생성자 함수 이외에도,
String, Number, Boolean, Function, Array, Date, RegExp, Promise 등의
빌트인 생성자 함수를 제공.
'''
// 전부 typeof가 object로 출력됨.
const strObj = new String('lee');
const numObj = new Number(123);
const boolObj = new Booelean(true);
const func = new Function('x', 'return x;');
const arr = new Array(1,2,3);
const regExp = new RegExp(/ab+c/i);
const date = new Date();
console.log(date);	// 현재시각이 출력됨.
'''
cf.
다른 기본 빌트인 생성자 함수와 달리,
String, Number, Boolean 생성자 함수는,
new 없이 호출할 경우 원시값을 반환함.

126.
객체 리터럴에 의해 객체를 생성할 경우, 단 하나의 객체만 생성하므로 비효율적.
생성자 함수를 통해 객체를 생성할 경우, 클래스처럼 생성자 함수를 이용해,
프로퍼티 구조가 동일한 객체를 여러 개 간편하게 생성 가능.
'''
function Circle(radius) {
	this.radius = radius;
	this.getDiameter = function() {
		return 2*this.radius;
	};
}

const circle1 = new Circle(3);
const circle2 = new Circle(5);
'''

127.
this는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수.
this 바인딩은 함수 호출 방식에 따라 동적으로 결정.
(1) 일반 함수로서 호출
-> 전역 객체
(2) 메서드로서 호출
-> 메서드를 호출한 객체
(3) 생성자 함수로서 호출
-> 생성자 함수가 생성할 인스턴스

128.
생성자 함수는 일반 함수와 동일한 방법으로 정의 후, new 키워드를 붙여 호출.
new 연산자를 제외하고 호출하면, 일반 함수로 동작.

129.
자바스크립트 엔진은 암묵적인 처리를 통해 생성자 함수로 인스턴스를 생성 후 반환.

130.
만약 생성자 함수에서, this가 아닌 다른 객체를 명시적으로 반환할 경우,
return 문에 명시한 객체가 반환됨.
'''
function Circle(radius) {
	this.radius = radius;
	this.getDiameter = function() {
		return 2*radius;
	};
	return {};
}
console.dir(new Circle(3));	// {}
'''

131.
위의 생성자 함수에서 반환값을 객체가 아닌 원시값으로 쓴다면,
원시값을 무시하고 this를 반환함.

132.
함수가 일반 함수로 호출되면, 함수 객체의 내부 메서드 [[call]]이 호출되고,
new 연산자와 함께 생성자 함수로 호출되면, 내부 메서드 [[construct]]가 호출됨. 

133.
함수 객체는 callable이면서 constructor이거나,
callable이면서 non-constructor임.
즉, 모든 함수 객체는 호출할 수 있지만,
모든 함수 객체를 생성자 함수로서 호출할 수 있는 것은 아님.
(1) constructor : 함수 선언문, 함수 표현식, 클래스
(2) non-constructor : 메서드(ES6 메서드 축약 표현), 화살표 함수

cf.
함수를 프로퍼티 값으로 사용하면, 일반적으로 메서드로 통칭.
이 또한 constructor이며, non-constructor가 되는 메서드는,
ES6 이후 메서드 축약 표현을 통해 생성한 함수임.

134.
생성자 함수가 new 연산자 없이 호출되는 것을 막기 위해 파스칼 케이스 컨벤션을 사용한다 해도,
실수가 발생할 수 있기 때문에, ES6에서는 "new.target"을 지원.

new.target은 constructor인 모든 함수 내부에서 암묵적인 지역 변수와 같이 사용되며,
메타 프로퍼티라고 불림.

함수 내부에서 new.target을 사용하면,
new 연산자와 함께 생성자 함수로서 호출되었는지 확인 가능.

new 연산자와 함께 생성자 함수로써 호출되면, new.target은 함수 자신을 가리킴.
new 연산자 없이 일반 함수로 호출된 함수 내부의 new.target은 undefined임.
'''
function Circle(radius) {
	if (!new.target) {
		return new Circle(radius);
	}
	this.radius = radius;
	this.getDiameter = function() {
		return 2*this.radius;
	};
}

const circle = Circle(5);
console.log(circle.getDiameter());
'''

135.
new.target을 사용할 수 없는 경우
'''
function Circle(radius) {
	if(!(this instanceof Circle)) {
		return new Circle(radius);
	}
	this.radius = radius;
	this.getDiameter = function() {
		return this.radius;
	};
}
'''
*/