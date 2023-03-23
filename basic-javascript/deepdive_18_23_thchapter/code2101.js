/*
213.
자바스크립트의 객체
(1) 표준 빌트인 객체
ECMAScript 사양에 정의된 객체로, 애플리케이션 전역의 공통 기능을 제공.
표준 빌트인 객체는 전역 객체의 프로퍼티임.

(2) 호스트 객체
ECMAScript 사양에 정의되어 있지 않지만, 자바스크립트 실행 환경에서 추가로 제공하는 객체.
a. 브라우저 환경
DOM, BOM, Canvas, XMLHttpRequest, fetch, requestAnimationFrame, SVG,
Web Storage, Web Component, Web Worker 등 클라이언트 사이드 Web API
b. Node.js 환경
Node.js 고유의 API

(3) 사용자 정의 객체
사용자가 직접 정의한 객체.

214.
표준 빌트인 객체
Object, String, Number, Boolean, Symbol, Date, Math, RegExp, Array,
Map, Set, WeakMap, WeakSet, Promise, Reflect, Proxy, JSON, Error 등

215.
Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 인스턴스 생성 가능한 생성자 함수 객체.
-> 정적 메서드만 제공.

216.
표준 빌트인 객체의 인스턴스 생성.
'''
const strObj = new String('Lee');
const numObj = new Number(123);
const boolObj = new Boolean(true);
const func = new Function('x', 'return x*x');
const arr = new Array(1,2,3);
const regExp = new RegExp(/ab+c/i);
const date = new Date();
'''

217.
Number로 인스턴스 없이 정적으로 호출할 수 있는 메서드.
'''
const numObj = new Number(1.6);

// Number.prototype.toFixed는 소수점 자리를 반올림해 문자열로 반환
console.log(numObj.toFixed())	// 2

// Number.isInteger는 인수가 정수인지 검사해 그 결과를 불리언으로 반환
console.log(Number.isInteger(0.5));	// false
'''

218.
원시값은 객체가 아니므로 프로퍼티나 메서드를 가질 수 없음에도,
원시값인 무자열이 객체처럼 동작하는 이유는,
원시값에 마침표 표기법(또는 대괄호 표기법)으로 접근하면
자바스크립트 엔진이 일시적으로 원시값을 연관된 객체로 변환해주기 때문.
ex) const str = 'Hello'; console.log(str.length);

219.
래퍼 객체(wrapper object)
원시값에 대해 객체처럼 접근하면 생성되는 임시 객체.

220.
null과 undefined는 래퍼 객체를 생성하지 않음.

221.
브라우저 환경에서는 window(또는 self, this, frames)가 전역 객체를 가리킴.
Node.js 환경에서는 global이 전역 객체를 가리킴.

222.
<globalThis>
브라우저 환경과 Node.js 환경에서 전역 객체를 가리키던 다양한 식별자를 통일한 식별자.

223.
전역 객체의 프로퍼티를 참조할 때, window(또는 global)을 생략할 수 있음.
'''
console.log(window.parseInt('F', 16));	// 15
console.log(parseInt('F', 16));	// 15

// var키워드로 선언한 전역 변수, 선언하지 않은 변수에 값을 할당한 암묵 전역,
// 그리고 전역 함수는 전역 객체의 프로퍼티가 됨.
var foo = 1;
console.log(window.foo);

bar = 2;
console.log(window.bar);
'''

224.
let, const로 선언한 전역 변수는 전역 객체의 프로퍼티가 아님.
대신, 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드) 내에 존재.

225.
브라우저 환경의 모든 자바스크립트 코드는 하나의 전역 객체 window를 공유.
여러 개의 script 태그를 통해 자바스크립트를 분리해도,
하나의 전역 객체 window를 공유하는 것은 변함이 없음.
이는 분리되어 있는 자바스크립트 코드가 하나의 전역을 공유한다는 의미.

226.
전역 객체의 프로퍼티(=빌트인 전역 프로퍼티)
(1) Infinity : 무한대를 나타내는 숫자값
(2) NaN : 숫자가 아님을 나타내는 숫자값
(3) undefined

227.
전역 객체의 메서드(=빌트인 전역 함수)
(1) eval
코드를 문자열 형태로 인수로 전달 받아, 표현식이라면 런타임에 평가해 값을 생성하고,
표현식이 아닌 문이라면 문자열 코드를 런타임에 실행. 문자열 코드가 여러 개의 문으로
이뤄져 있다면 모든 문을 실행. 문자열 코드를 평가/실행한 값을 반환.
'''
eval('1+2;');
eval('var x=5;');
console.log(x);	// 5

// 객체 리터럴, 함수리터럴은 반드시 괄호로 둘러싸야 함.
const o = eval('({a:1})');
console.log(o);

// 인수로 전달 받은 문자열 코드가 여러 개의 문으로 이뤄져 있다면,
// 모든 문을 실행한 후 마지막 결과값을 반환.
console.log(eval('1+2; 3+4;'));	// 7
'''

228.
eval 함수는 자신이 호출된 위치에 해당하는 기존의 스코프를 런타임에 동적으로 수정.
쉽게 말하면, 원래는 런타임 이전에 먼저 함수 몸체 내부의 모든 선언문을 먼저 실행하고,
그 결과를 스코프에 등록하지만, eval 함수는 기존의 스코프를 런타임에 동적으로 수정.
'''
const x = 1;

function foo() {
	eval('var x=2;');
	console.log(x);	// 2
}

foo();
console.log(x);	// 1
'''
단, strict 모드에서 eval 함수는 기존 스코프를 수정하지 않고,
eval 함수 자신의 자체적인 스코프를 생성.
'''
const x = 1;

function foo() {
	'use strict';
	// 기존 스코프 수정 없이, eval 함수 자신의 자체적인 스코프를 생성
	eval('var x=2; console.log(x);');	// 2
	console.log(x);	// 1
}

foo();
console.log(x);	// 1
'''

229.
let, const를 사용해 선언한 변수는 strict mode가 자동 적용됨.

230.
eval 함수를 통해 사용자로부터 입력받은 콘텐츠를 실행하는 것은 보안에 매우 취약.
또는 자바스크립트 엔진에 의한 최적화가 수행되지 않음.
따라서, eval 함수의 사용은 금지해야 함.

231.
전역 객체의 메서드(=빌트인 전역 함수)
(2) isFinite
전달받은 인수가 정상적 유한수인지 검사.
전달받은 인수의 타입이 숫자가 아닌 경우, 숫자로 타입을 변환.
'''
isFinite(0);	// true
isFinite('10');	// true
isFinite(1/3);	// true
isFinite(null);	// true	// null -> 0
isFinite('Hi');	// false
'''

(3) isNaN
전달받은 인수가 NaN인지 검사해 그 결과를 불리언 타입으로 반환.

(4) parseFloat
전달받은 문자열 인수를 부동 소수점 숫자, 즉 실수로 해석해서 반환.
이 때, 공백으로 구분된 문자열은 첫 번째 문자열만 변환하며, 앞 뒤의 공백은 무시됨.

(5) parseInt
전달받은 문자열 인수를 정수로 해석해서 반환.
두 번째 인수로 진법을 나타내는 기수를 전달할 수 있음.

232.
'''
const x = 12;
console.log(x.toString(2));	// 1100	// 2진수
console.log(x.toString(8));	// 14	// 8진수
console.log(x.toString(16));	// c	// 16진수
'''

233.
전역 객체의 메서드(=빌트인 전역 함수)
(6) encodeURI/decodeURI
encodeURI 함수는 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩.
ex) const enc = encodeURI(uri); console.log(enc);
decodeURI 함수는 인코딩된 URI를 인수로 전달받아 이스케이프 처리 이전으로 디코딩.
'''
const uri = 'http://example.com?name=이땡땡&age=14';
const encodedUri = encodeURI(uri);
console.log(encodedUri);

const decodedUri = decodeURI(encodedUri);
console.log(decodedUri);
'''

cf.
URI = URL + RN
cf.
이스케이프 처리 :
네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자셋으로 변환하는 것.
(단, 알파벳/0~9/-_.!~*'() 문자는 이스케이프 처리에서 제외됨.)

(7) encodeURIComponent/decodeURIComponent
encodeURIComponent 함수는 URI 구성요소를 인수로 전달받아 인코딩.
decodeURIComponent 함수는 매개변수로 전달된 URI 구성요소를 디코딩.
'''
const uriComp = 'name=이땡땡&age=14';
let enc = encodeURIComponent(uriComp);
console.log(enc);

let dec = decodeURIComponent(enc);
console.log(dec);
'''

234.
encoeURIComponent 함수는 인수로 전달된 문자열을
URI의 구성요소인 쿼리 스트링의 일부로 간주.
따라서, 쿼리 스트링 구분자로 사용되는 =, ?, &은 인코팅하지 않음.

encodeURI 함수는 매개변수로 전달된 문자열을 완전한 URI 전체로 간주.
따라서, 쿼리 스트링 구분자로 사용되는 =, ?, &은 인코딩하지 않음.

cf.
쿼리 스트링이란?
URL의 뒤에 입력 데이터를 함께 제공하는 가장 단순한 데이터 전달 방법.
주로 GET방식으로 데이터를 요청할 때 쓰이는 방법.

235.
암묵적 전역
'''
// 전역변수는 호이스팅이 발생하지만,
// 암묵적 전역으로 프로퍼티가 된 경우 호이스팅이 발생하지 않음.
console.log(x);	// undefined;
// console.log(y);	// ReferenceError: y is not defined

var x = 10;

function foo() {
	y = 20;	// window.y=20;
}
foo();

console.log(x+y);	// 30
'''

236.
암묵적 전역은 변수가 아니라 단지 프로퍼티가 되도록 하므로, delete 연산자로 삭제 가능.
반대로, 전역 변수는 프로퍼티이지만 delete 연산자로 삭제할 수 없음.
*/