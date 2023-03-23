/*
28.
동등 비교 연산자(==, !=)
-> loose comparison, 자동 타입 변환 후 값만 비교.
일치 비교 연산자(===, !==)
-> tight comparison, 값과 타입이 모두 같은지 비교.

29.
동등 비교 연산자는 결과를 예측하기 어려운 경우가 존재.
ex1) 0 == '0' --> true, 0 == '' --> true
ex2) false == undefined --> false, false == null --> false

30.
일치 비교 연산자(===, !==)에서 주의할 것은 NaN임.
NaN === NaN --> false
따라서 NaN인지 아닌지 확인하고자 할 때는,
Number.isNaN(value) 메서드를 활용해야 함.

31.
Object.is(value1, value2)
두 인수가 같은 값인지 여부를 나타냄.
다음의 경우 true를 반환.
둘 다 undefined
둘 다 null
둘 다 true 또는 둘 다 false
둘 다 같은 문자에 같은 길이인 문자열
둘 다 같은 객체
둘 다 숫자이며,
	둘 다 +0 또는, 둘 다 -0 또는, 둘 다 NaN
	둘 다 0이나 NaN이 아니고 같은 값을 지님
ex) -0 === +0 --> true, Object.is(-0, +0) --> false

32.
삼항 조건 연산자
조건식 ? true일 경우 반환할 값 : false일 경우 반환할 값
ex) var result = x%2 ? 'odd' : 'even'

33.
논리 연산자(|| : 논리합, && : 논리곲, ! : 부정)
주의할 점은, 논리 부정 연산자(!)는 언제나 불리언 값을 반환하지만,
논리합(||)과 논리곱(&&)의 경우, 평가 결과가 불리언 값이 아닐 수 있음
ex) 'Cat' && 'Dog' --> 'Dog'
이 부분은 "단축 평가" 파트에서 상세됨.

34.
쉼표 연산자(,)는 왼쪽 피연산자부터 차례대로 피연산자를 평가하고
마지막 피연산자의 평가가 끝나면 마지막 피연산자의 평가 결과를 반환함.
'''
var x, y, z;
result = (x=1, y=2, z=3);
console.log(result);	// 3
console.log(`${x}, ${y}, ${z}`);	// 1, 2, 3
'''

35.
typeof 연산자로 null값을 연산하면 결과값은 'Object'임에 주의.
따라서, null 타입을 확인하고자 할 경우, 일치 비교 연산자(===) 사용.
'''
var result = null;
console.log(typeof result);	// object
console.log(null === result);	// true
'''

36.
지수 연산자(**)
ES7부터 도입된 연산자로, 좌항 피연산자가 밑, 우항 피연산자가 지수임.
지수 연산자가 생기기 이전에는, Math.pow(밑, 지수)를 사용했음.
'''
var val = 2 ** 3;
console.log(val);	// 8
console.log(Math.pow(2, 3));	// 8
'''

37.
지수 연산자(**)에서 음수를 사용하고자 할 경우, 괄호('()')로 묶어줘야 함.
ex) (-5) ** 2 --> 25

38.
지수 연산자를 할당 연산자로 활용할 수도 있음.
'''
var num = 5;
num **= 2;
console.log(num);
'''
*/