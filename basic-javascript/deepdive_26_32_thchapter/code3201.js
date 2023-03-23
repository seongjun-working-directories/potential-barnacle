/*
512.
표준 빌트인 객체인 String 객체는 생성자 함수 객체.
따라서, new 연산자와 함께 호출하여 String 인스턴스를 생성할 수 있음.
'''
// 빈 문자열이 할당된 String 래퍼 객체
const strObj = new String();

console.log(strObj);
'''

513.
String 생성자 함수의 인수로 문자열을 전달하면서 new 연산자와 함께 호출하면,
인수로 전달받은 문자열을 할당한 String 래퍼 객체를 생성.
'''
const strObj = new String('lee');
console.log(strObj);
'''

514.
String 래퍼 객체는 배열과 마찬가지로 length 프로퍼티와
인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티 키로,
각 문자를 프로퍼티 값으로 갖는 유사 배열 객체이면서 이터러블임.
ex) console.log(strObj[0]);

단, 문자열은 원시값이므로 변경 불가. 이때 에러는 발생하지 않음.
ex) strObj[0] = 'S';	// (X)

515.
String 생성자 함수의 인수로 문자열이 아닌 값을 전달하면 인수를 문자열로 강제변환 후,
[[StringData]] 내부 슬롯에 변환된 문자열을 할당한 String 래퍼 객체를 생성.

516.
new 연산자 없이 String 생성자 함수를 호출하면,
String 인스턴스가 아닌 문자열을 반환.
이를 이용해 명시적으로 타입 변환 가능.
'''
String(1);	// "1"
String(NaN);	// "NaN"
String(Infinity);	// "Infinity"
String(true);	// "true"
'''

517.
length 프로퍼티는 문자열의 문자 개수를 반환.
ex) 'Hello'.length;	// 5

518.
String 객체에는 원본 String 래퍼 객체를 직접 변경하는 메서드는 존재하지 않음.
즉, String 객체의 메서드는 언제나 새로운 문자열을 반환.
문자열은 변경 불가능한 원시값이므로, String 래퍼 객체도 읽기 전용 객체로 제공됨.
즉, Object.getOwnPropertyDescriptors()로 확인해보면,
writable은 false임을 확인할 수 있음.

519.
<String.prototype.indexOf>
대상 문자열에서 인수로 전달받은 문자열을 검색하여 첫 번째 인덱스를 반환.
검색에 실패할 경우, -1을 반환.
'''
const str = 'Hello world';

str.indexOf('l');	// 2
str.indexOf('or');	// 7
str.indexOf('x');	// -1
'''

indexOf 메서드의 2번째 인수로 검색을 시작할 인덱스를 전달할 수 있음.
ex) str.indexOf('l', 3);

indexOf 메서드는 대상 문자열에 특정 문자열이 존재하는지 확인할 때 유용.
ex) if(str.indexOf('Hello') !== -1) { ... }

다만, ES6에서 도입된 String.prototype.includes를 사용하면 가독성이 향상됨.

520.
<String.prototype.search>
대상 문자열에서 인수로 전달 받은 정규 표현식과 매치하는 문자열을 검색하여,
일치하는 문자열의 인덱스를 반환. 검색에 실패하면, -1을 반환.
''''
const str = 'Hello world';
str.search(/o/);	// 4
str.search(/x/);	// -1
'''

521.
<String.prototype.includes>
대상 문자열에 인수로 전달받은 문자열이 포함되어 있는지 확인하여,
그 결과를 true 또는 false로 반환.
'''
const str = 'Hello world';
str.includes('Hello');	// true
str.includes('');	// true
str.includes();		// false
str.includes('x');	// false
'''
includes 메서드의 2번째 인수로 검색을 시작할 인덱스 전달 가능.

522.
<String.prototype.startsWith>
대상 문자열이 인수로 전달받은 문자열로 시작하는지 확인하여,
그 결과를 true 또는 false로 반환.
'''
const str = 'Hello world';
str.startsWith('He');	// true
'''
startsWith 메서드의 2번째 인수로 검색을 시작할 인덱스 전달 가능.

523.
<String.prototype.endsWith>
대상 문자열이 인수로 전달받은 문자열로 끝나는지 확인하여,
그 결과를 true 또는 false로 반환.
endsWith 메서드의 2번째 인수로 검색할 문자열의 길이를 전달 가능.
'''
const str = 'Hello world';
str.endsWith('ld');	// true

// 문자열 str의 처음부터 5자리까지가 'lo'로 끝나는지 확인
str.endsWith('lo', 5);
'''

524.
<String.prototype.charAt>
대상 문자열에서 인수로 전달받은 인덱스에 위치한 문자를 검색해 반환.
이 때 인덱스는 문자열의 범위 사이의 정수여야 하며,
해당 범위를 벗어날 경우, 빈 문자열을 반환함.
ex) const str = 'Hello'; str.charAt(1);	// e

525.
<String.prototype.substring>
대상 문자열에서 첫 번째 인수로 전달받은 인덱스에 위치하는 문자부터
두 번째 인수로 전달받은 인덱스에 위치하는 문자의 바로 이전 문자까지의 부분 문자열을 반환.
두 번째 인수를 생략할 경우, 마지막 문자까지 부분 문자열을 반환함.
'''
const str = 'Hello';
str.substring(1,3);	// el
'''

String.prototype.indexOf 메서드와 사용하면,
특정 문자열을 기준으로 앞뒤에 위치한 부분 문자열을 취득 가능.
'''
cosnt str = 'Hello world';

str.subString(0, str.indexOf(' '));	// Hello
str.subString(str.indexOf(' ')+1);	// world
'''

526.
<String.prototype.slice>
slice 메서드는 substring 메서드와 동일하게 동작.
단, slice 메서드에는 음수인 인수를 전달 가능.
음수인 인수를 전달하면, 대상 문자열의 가장 뒤에서부터 시작하여 문자열을 잘라내어 반환.
'''
const str = 'Hello world';

str.substring(0, 5);
str.slice(0, 5);

str.substring(2);
str.slice(2);

// substring은 인수 < 0 또는 NaN인 경우 0으로 취급.
str.substring(-5);	// Hello world
// slice는 음수를 전달하면, 뒤에서부터 음수의 절대값만큼 잘라내어 반환.
str.slice(-5);	// world
'''

527.
<String.prototype.toUpperCase>
대상 문자열을 모두 대문자로 변경한 문자열을 반환.
'''
let str = 'Hello World';
str = str.toUpperCase();
console.log(str);	// HELLO WORLD
'''

528.
<String.prototype.toLowerCase>
대상 문자열을 모두 소문자로 변경한 문자열을 반환.
'''
let str = 'Hello World';
str = str.toLowerCase();
console.log(str);	// hello world
'''

529.
<String.prototype.trim>
대상 문자열 앞뒤에 공백 문자가 있을 경우, 일ㄹ 제거한 문자열을 반환.
'''
const str = ' foo   ';
str.trim();	// "foo"
'''

cf.
String.prototype.replace 메서드에 정규표현식을 인수로 전달하여,
공백 문자를 제거할 수 있음.
[tip] \s는 space 를 표현하며 공백 문자를 의미한다. 
'''
const str = '   foo   ';
str.replace(/\s/g, '');		// "foo"
str.replace(/^\s+/g, '');	// "foo   "
str.replace(/\s+$/g, '');	// "   foo"
'''

530.
<String.prototype.repeat>
대상 문자열을 인수로 전달받은 정수만큼 반복해 연결한 새로운 문자열은 반환.
인수로 전달받은 정수가 0이면 빈 문자열 반환, 음수이면 RangeError 발생.
인수 생략 시 기본값 0이 설정.
'''
const abc = "abc";
str.repeat();	// ''
str.repeat(1);	// 'abc'
str.repeat(2);	// 'abcabc'
'''

531.
<String.prototype.replace>
대상 문자열에서 첫 번째 인수로 전달받은 문자열 또는 정규표현식을 검색하여,
두 번째 인수로 전달한 문자열로 치환한 문자열을 반환.
검색된 문자열이 여럿 존재할 경우 첫 번째로 검색된 문자열만 치환.
'''
const str = 'Hello world';
str.replace('world', 'Lee');	// Hello Lee

const str = 'Hello Hello';
str.replace(/hello/gi, "Lee");	// Lee Lee
'''
특수한 교체 패턴 사용 가능. 예를 들어, $&는 검색된 문자열을 의미.
교체 패턴에 대한 자세한 내용은 MDN의 함수 설명 참고.
'''
const str = 'Hello world';

// 다음의 코드는 검색된 문자열을 굵은 글씨로 바꿈
str.replace('world', '<strong>$&</strong>);
'''

532.
카멜 케이스를 스네이크 케이스로, 스네이크 케이스를 카멜 케이스로 변환하는 함수.
'''
// Camel -> Snake
function camel2snake(camel) {
	return camel.replace(/.[A-Z]/g, (match) => {
		console.log(match);	// 'oW'
		return match[0] + '_' + match[1].toLowerCase();
	});
}

// Snake -> Camel
function snake2camel(snake) {
	return camel.replace(/_[a-z]/g, (match) => {
		console.log(match);	// '_w'
		return match[1].toUpperCase();
	});
}
'''

533.
<String.prototype.split>
대상 문자열에서 첫 번째 인수로 전달한 문자열 또는 정규표현식을 검색하여
문자열을 구분한 후 분리된 각 문자열로 이뤄진 배열을 반환.
두 번째 인수로 배열의 길이를 지정할 수 있음.
'''
const str = 'How are you doing?';
str.split(' ');	// 같은 의미 : str.split(/\s/);

str.split(' ', 3);	// ["How", "are", "you"]
'''

534.
split 메서드는 배열을 반환.
따라서, Array.prototype.reverse, Array.prototype.join 메서드와 함께
사용할 경우, 문자열을 역순으로 뒤집을 수 있음.
'''
function reverseString(str) {
	return str.split('').reverse().join('');
}
reverseString('Hello World!');
'''
*/