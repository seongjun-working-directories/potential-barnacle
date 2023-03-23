/*
426.
Number 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면,
[[NumberData]] 내부 슬롯에 0을 할당한 Number 래퍼 객체를 생성.
'''
const numObj = new Number();
console.log(numObj);	// [Number: 0]
'''
Number 생성자 함수의 인수로 숫자를 전달하며 new 연산자와 호출하면,
인수로 전달받은 숫자를 할당한 Number 래퍼 객체를 생성.
'''
const numObj = new Number(10);
console.log(numObj);	// [Number: 10]
'''
Number 생성자 함수의 인수로 숫자가 아닌 값을 전달하면 숫자로 강제 변환함.
이때, 숫자로 변환할 수 없다면, NaN이 할당됨.
'''
let numObj = new Number('10');	// [Number: 10]
numObj = new Number('Hello');	// [Number: NaN]
'''

427.
Number를 new 연산자 없이 호출하면, Number 인스턴스가 아닌 "숫자"를 반환함.
이를 이용해, 명시적으로 타입을 변환하기도 함.
'''
Number('10');	// 10
Number(true);	// 1
Number(false);	// 0
'''

428.
<Number.EPSILON>
'1'과 '1보다 큰 숫자 중 가장 작은 숫자'와의 차이.
부동소수점 산술 연산이 정확한 결과 도출이 어려운 것을 감안해,
미세한 오차범위를 커버하기 위해 사용.
'''
console.log(0.1 + 0.2);	// 0.30000000000000004
console.log((0.1 + 0.2) === 0.3);	// false

// Number.EPSILON을 사용해 부동소수점으로 인해 발생하는 오차 해결.
function isEqual(a, b) {
	return Math.abs(a - b) < Number.EPSILON;
}
isEqual((0.1 + 0.2), 3);	// true
'''

429.
<Number.MAX_VALUE> & <Number.MIN_VALUE>
Number.MAX_VALUE는 자바스크립트에서 표현할 수 있는 가장 큰 양수값.
이보다 큰 숫자는 Infinity.
Number.MIN_VALUE는 자바스크립트에서 표현할 수 있는 가장 작은 양수값.
이보다 작은 숫자는 0.

430.
<Number.MAX_SAFE_INTEGER> & <Number.MIN_SAFE_INTEGER>
Number.MAX_SAFE_INTEGER는 자바스크립트에서 안전하게 표현할 수 있는
가장 큰 정수값.
Number.MIN_SAFE_INTEGER는 자바스크립트에서 안전하게 표현할 수 있는
가장 작은 정수값.

431.
<Number.POSITIVE_INFINITY> & <Number.NEGATIVE_INFINITY>
Number.POSITIVE_INFINITY는 양의 무한대를 나타내는 숫자값 Infinity와 같음.
Number.NEGATIVE_INFINITY는 음의 무한대를 나타내는 숫자값 -Infinity와 같음.

432.
<Number.NaN>
Number.NaN은 숫자가 아님을 나타내는 숫자값.
Number.NaN은 window.NaN과 같음.

433.
<Number.isFinite>
인수로 전달된 숫자값이 정상적인 유한수인지 검사. 즉, Infinity 또는 -Infinity인지를 검사.
인수가 NaN인 경우 언제나 false를 반환.
숫자가 아닌 인수가 주어졌을 때, 언제나 반환값은 false임.
Number.isFinite는 암묵적 타입 변환을 하지 않음.
Number.isFinite(0);	// true
Number.isFinite(Infinity);	// false
Number.isFinite('Hello');	// false

434.
<Number.isInteger>
인수로 전달된 숫자값이 정수인지 검사하여, 그 결과를 불리언으로 반환.
Number.isInteger는 암묵적 타입 변환을 하지 않음.
Number.isInteger(0);	// true
Number.isInteger(0.5);	// false

435.
<Number.isNaN>
인수로 전달된 숫자값이 NaN인지 검사하여, 그 결과를 불리언으로 반환.
Number.isNaN은 암묵적 타입 변환을 하지 않음.
Number.isNaN(NaN);	// true

436.
<Number.isSafeInteger>
인수로 전달된 숫자값이 안전한 정수인지 검사하여, 그 결과를 불리언으로 반환.
Number.isSafeInteger는 암묵적 타입 변환을 하지 않음.
Number.isSafeInteger(0);	// true
Number.isSafeInteger(false);	// false
Number.isSafeInteger('123');	// false

437.
<Number.prototype.toExponential>
숫자를 지수 표기법으로 변환하여 문자열로 반환.
인수로 소수점 이하로 표현할 자릿수를 전달 가능.
단, 숫자 리터럴과 함께 Number 프로토타입 메서드를 사용하면 에러 발생.
이유는 자바스크립트 엔진이 숫자 뒤의 .을 부동 소수점 숫자의 소수 구분 기호로 해석하기 때문.
따라서, 괄호를 붙여주면 에러가 해결됨.
(77.1234).toExponential();
(77.1234).toExponential(4);
77.toExponential();	// SyntaxError: Invalid or unexpected token
(77).toExponential();	// "7.7e+1"

438.
<Number.prototype.toFixed>
숫자를 반올림하여 문자열로 반환.
반올림하는 소수점 이하 자릿수를 나타내는 0~20 사이의 정수값을 인수로 전달 가능.
인수를 생략하면 기본값 0이 저장됨.
(12345.6789).toFixed();	// "12346"
(12345.6789).toFixed();	// "12345.7"

439.
<Number.prototype.toPrecision>
인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환.
인수를 생략하면 기본값이 0이 되어 그대로 문자열로 변환됨.
// 전체 1자릿수 유효, 나머지 반올림
(12345.6789).toPrecision(1);	// "1e+4"

440.
<Number.prototype.toString>
숫자를 문자열로 변환하여 반환.
진법을 나타내는 정수값을 인수로 전달 가능.
인수 생략 시 기본값 10진법이 지정.
(10).toString();	// "10"
*/