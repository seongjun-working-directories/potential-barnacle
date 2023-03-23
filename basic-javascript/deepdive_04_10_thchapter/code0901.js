/*
53.
명시적 타입 변환(=타입 캐스팅)
ex)
'''
var x = 10;
var str = x.toString();
console.log(typeof x, x);	// number 10
console.log(typeof str, str);	// string 10
'''
개발자의 의도에 따라 명시적으로 타입을 변경하는 방법은 다양함.
표준 빌트인 생성자 함수(String, Number, Boolean)을 new 연산자 없이 호출하는 방법과
빌트인 메서드를 사용하는 방법, 그리고 암묵적 타입 변환을 유도하는 법이 있음.

cf. 표준 빌트인(Built-in) 생성자 함수와 표준 빌트인(Built-in) 메서드는 자바스크립트의 기본 함수.
-> 표준 빌트인 생성자 함수 : 객체를 생성하기 위해 new 연산자와 함께 호출되는 함수.
-> 표준 빌트인 메서드 : 자바스크립트의 기본 제공 빌트인 객체의 메서드.

(1) 문자열 타입으로 변환
a. String 생성자 함수를 new 연산자 없이 호출.
-> ex) console.log(String(NaN)); --> "NaN"
b. Object.prototype.toString 메서드를 사용.
-> ex) console.log( (1).toString() ); --> "1"
c. 문자열 연결 연산자를 이용.
-> ex) 1+''; --> "1"

(2) 숫자 타입으로 변환
a. Number 생성자 함수를 new 연산자 없이 호출.
-> ex) Number('1') --> 1
b. parseInt, parseFloat 함수 사용.
-> ex) parseInt('100') --> 100, parseFloat('32.1') --> 32.1
c. '+' 단항 산술 연산자 이용.
-> ex) +'-1' --> -1, +false --> 0
d. '*' 산술 연잔사 이용.
-> ex) true*1 --> 1, '-10.32'*1 --> -10.32

(3) 불리언 타입으로 변환
a. Boolean 생성자 함수를 new 연산자 없이 호출.
-> ex) Boolean({}); --> true, Boolean([]); --> true
b. ! 부정 논리 연산자를 두 번 사용.
-> ex) !!{}; --> true, !!undefined; --> false

54.
암묵적 타입 변환(=타입 강제 변환)
ex)
'''
var x = 10;
var str = x+'';
console.log(typeof x, x);	// number 10
console.log(typeof str, str);	// string 10
'''

(1) 문자열 타입으로 변환
a. '+' 연산자는 하나 이상의 피연산자가 문자열일 경우, 문자열 연결 연산자로 동작.
-> ex) Math + '' --> "[object Math]"
b. ES6에 도입된 템플릿 리터럴의 표현식 삽입은 표현식의 평가 결과를 문자열 타입으로 변환.

(2) 숫자 타입으로 변환
a. 자바스크립트 엔진은 산술 연산자 표현식을 평가하기 위해,
산술 연산자의 피연산자 중 숫자 타입이 아닌 피연산자를 숫자 타입으로 암묵적으로 변환함.
-> 피연산자를 숫자 타입으로 변환할 수 없는 경우, 산술 연산을 수행할 수 없으므로 NaN을 도출.
-> ex) '1'>0 --> true, 1*'10' --> 10
b. '+' 단항 연산자는 피연산자가 숫자 타입의 값이 아니면, 숫자 타입의 값으로 암묵적으로 변환함.
-> ex) +'' --> 0, +null --> 0, +undefined --> NaN
-> ex) +(function(){}) --> NaN
c. 빈 문자열/빈 배열/null/false 는 0으로, true는 1로 변환됨.
d. 객체와 빈 배열이 아닌 배열, undefined는 변환되지 않아 NaN이 됨.

(3) 불리언 타입으로 변환
자바스크립트 엔진은 불리언 타입이 아닌 값을
Truthy값(참으로 평가되는 값), Falsy값(거짓으로 평가되는 값)으로 구분.
a. Falsy 값 : false, undefined, null, -0, 0, NaN, ''
b. isTruthy(), isFalsy()는 인자로 들어온 값이 truthy인지 falsy인지 판단.

55.
주의할 점은, 명시적/암묵적 타입 변환 모두 기존 원시값을 직접 변경하는 것은 아니라는 것.
변수 등에 저장하는 게 아니라면 자바스크립트 엔진은
표현식을 에러 없이 평가하기 위해, 암묵적 타입 변환으로 새로운 타입의 값을 만든 뒤,
단 한 번 사용하고 버림.

56.
'단축 평가'란?
표현식을 평가하는 도중 평가 결과가 확정된 경우, 나머지 평가 과정을 생략하는 것.

57.
논리 연산자를 사용한 단축 평가 방법.
(1) 논리곱(&&) 연산자 : "좌항이 true이면 우항을 반환하고, false이면 false를 반환"
(2) 논리합(||) 연산자 : "좌항이 true이면 true를 반환하고, false이면 우항을 반환"
-> 어떤 값이 truthy 값일 때 무언가를 해야 한다면, 논리곱 연산자를 활용해 if문 대체 가능.
-> 어떤 값이 falsy 값일 때 무언가를 해야 한다면, 논리합 연산자를 활용해 if문 대체 가능.

위와 같은 결과나 나오는 이유를 console.log('Cat'&&'Dog'); 를 통해 살펴보자면,
논리곱 연산자는 두 개의 피연산자가 모두 true로 평가될 때, true 반환.
또한, 평가의 진행 방향은 좌항에서 우항으로.
우선 'Cat' && 'Dog'의 경우, 'Cat' 즉, 좌항은 true임.
그러면 결국 'Dog' 즉, 우항이 true냐 false냐가 결과가 되므로,
단축 평가에 의해, 'Dog'를 반환하는 것.

'''
// 논리 연산자를 사용한 단축평가 활용 예시1
var sayHello = true;
var message = '';

// if (sayHello) { message = "Hello!"; }
message = sayHello && "Hello!";
console.log(message);

// 논리 연산자를 사용한 단축평가 활용 예시2
var dontSayHello = false;
var message = '';

// if(!dontSayHello) { message = "Hello!"; }
message = dontSayHello || "Hello!";
console.log(message);
'''

58.
단축 평가의 유용한 패턴
(1) 객체를 가리킬 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티 참조 시.
'''
ex1)
var element = null;
// var value = element.value;
// TypeError : Cannot Read Property 'value' of null

ex2)
var value = element && element.value;
'''

(2) 함수 매개변수에 기본값을 설정할 때.
'''
function getStringLength(str) {
	str = str || '';
	return str.length;
}
getStringLength();	// 0
getStringLength('Hi');	// 2

// ES6에선 매개변수의 기본값 설정 가능
function getStringLength(str = '') {
	return str.length;
}
getStringLength();	// 0
getStringLength('Hi');	// 2
'''

59.
옵셔널 체이닝 연산자(?.)
좌항의 피연산자가 null 또는 undefined일 경우, undefined를 반환.
그렇지 않으면, 우항의 프로퍼티를 참조.
'''
var element1 = null;
// element1이 null 또는 undefined이면, undefined 반환.
// 그렇지 않으면, 우항의 프로퍼티 참조를 이어감.
var value = element1?.value;
console.log(value);	// undefined

var element2 = {
	value : "someting",
	name : "element2"
};
value = element2?.value;
console.log(value);	// something
'''

주의해야 할 점은,
옵셔널 체이닝 연산자(?.)는 false로 평가되는
falsy값(false, undefined, null, 0, NaN, '')이라도,
null과 undefined가 아니면 우항의 프로퍼티 참조를 이어감.

60.
null 병합 연산자(??)
좌항의 피연산자가 null 또는 undefined인 경우, 우항의 피연산자를 반환하고
그렇지 않은 경우, 좌항의 피연산자를 반환.
-> 변수에 기본값을 설정할 때 유용.
'''
var foo = null;
var printValue = foo ?? "nothing in the foo value";
console.log(printValue);
'''

주의해야 할 점은,
null 병합 연산자(??)는 false로 평가되는
falsy값(false, undefined, null, 0, NaN, '')이라도,
null과 undefined가 아니면 좌항의 피연산자를 그대로 반환.
*/