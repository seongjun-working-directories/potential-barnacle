/*
441.
Math는 생성자 함수가 아니므로, 정적 프로퍼티와 정적 메서드만 제공.

442.
<Math.PI>
원주율 PI 값을 반환.
Math.PI;	// 3.141592653589793

443.
<Math.abs>
인수로 전달된 숫자의 절대값을 반환.
Math.abs(-1);	// 1
Math.abs();	// NaN
Math.abs({});	// NaN

444.
<Math.round>
인수로 전달된 숫자의 소수점 이하를 반올림한 정수를 반환.
Math.round(1.4);	// 1
Math.round(1.6);	// 2
Math.round();		// NaN

445.
<Math.ceil> & <Math.floor>
Math.ceil은 인수로 전달된 숫자의 소수점 이하를 올림한 정수를 반환.
Math.floor는 인수로 전달된 숫자의 소수점 이하를 내림한 정수를 반환.
Math.ceil(1.4);		// 2
Math.floor(1.4);	// 1

446.
<Math.sqrt>
인수로 전달된 숫자의 제곱근을 반환.
Math.sqrt(9);	// 3
Math.sqrt();	// NaN

447.
<Math.random>
임의의 0에서 1미만의 난수를 반환. 즉, 0은 포함되고 1은 포함되지 않음.
'''
// 1 ~ 10 사이의 난수를 random 변수에 저장
const random = Math.floor((Math.random() * 10) + 1);
console.log(random);
'''

448.
<Math.pow>
첫 번째 인수를 밑으로, 두 번째 인수를 지수로 거듭제곱한 결과를 반환.
Math.pow(2,3);	// 8

'**' 지수 연산자로 대신할 수 있음.
2 ** 2 ** 2;	// 16

449.
<Math.max> & <Math.min>
Math.max(1, 2);		// 2
Math.max(1, 2, 3,);	// 3
Math.max();	// Infinity
Math.max(1);	// 1
Math.min(1, 2);		// 1
Math.min(1, 2, 3);	// 1
Math.min();	// Infinity
Main.min(1);	// 1
'''
// 배열을 일수로 전달받아 배열의 요소 중 최대값을 구하려면,
// Function.prototype.apply 메서드나 스프레드 문법을 사용해야 함.
Math.max.apply(null, [1,2,3]);	// 3
Math.max(...[1,2,3]);	// 3
Math.min.apply(null, [1,2,3]);	// 1
Math.min(...[1,2,3]);	// 1
'''
*/