/*
78.
함수 선언문을 통한 함수 정의.
'''
function add(x, y) {
	return x+y;
}
'''

79.
함수 표현식을 통한 함수 정의.
'''
var add = function(x, y) {
	return x+y;
};
'''

80.
Function 생성자 함수를 통한 함수 정의.
'''
var add = new Function('x', 'y', 'return x+y');
'''

81.
화살표 함수를 통한 함수 정의.
'''
var add = (x,y) => x+y;
'''

cf.
ES6부터 도입된 화살표 함수는 화살표(=>)를 사용해 함수를 선언.
화살표 함수는 항상 익명 함수로 정의
화살표 함수는 생성자 함수로 사용할 수 없으며,
기존 함수와 this 바인딩 방식이 다르고,
prototype 프로퍼티가 없으며,
arguments 객체를 생성하지 않음.

82.
함수는 함수 이름으로 호출하는 것이 아닌, 객체를 가리키는 식별자로 호출.
ex)
var sum = function add(x,y) {
	return x+y;
};
console.log(sum(1,2);		// --> O
// console.log(add(1,2);	// --> X

83.
함수 생성 시점과 함수 호이스팅
'''
// 함수 참조
console.dir(add);	// f add(x,y)
console.dir(sub);	// undefined

// 함수 호출
console.log(add(2, 5));	// 7
console.log(sub(2, 5));	// TypeError : sub is not a function

// 함수 선언문
function add(x, y) {
	return x+y;
}

// 함수 표현식
var sub = function(x, y) {
	return x-y;
};
'''
앞서, 변수의 선언 및 undefined로의 초기화는 모든 코드 수행 이전에 진행됨을 밝힘.
그리고, 해당 변수의 할당은 런타임에 해당 줄까지 순차적으로 내려와야 이루어짐.
함수 선언문은 런타임 이전에 수행되어,
암묵적으로 생성된 식별자는 함수 객체로 초기화됨.

함수 선언문으로 정의한 함수는 함수 선언문 이전에 호출할 수 있음.
함수 표현식으로 정의한 함수는 함수 표현식 이전에 호출할 수 없음.
이는, 함수 선언문으로 함수를 정의한 경우
런타임 이전에 함수 객체가 먼저 생성되기 때문.
결국, 함수 선언문 이전에 함수를 참조할 수 있게 되는데,
함수 호이스팅이란, 함수 선언문이 코드의 선두로 끌어올려진 것처럼 동작하는 특징을 의미함.

84.
함수 선언문을 사용하면 함수 호이스팅이, 함수 표현식을 사용하면 변수 호이스팅이 나타남.

85.
함수는 매개변수의 개수와 실제 들어온 인수의 개수가 일치하는지 확인하지 않음.
인수가 부족해서 할당되지 않은 경우 undefined로 초기화되고,
인수가 많은 경우, 초과된 부분은 무시됨.

그러나, 사실 초과된 인수는 그냥 버려지는 것이 아니고,
모든 인수는 암묵적으로 arguments 객체의 프로퍼티로 보관됨.
'''
function add(x, y) {
	console.log(arguments);
	// Arguments(3) [2, 5, 10, callee:f, Symbol(Symbol.iterator):f]
	
	return x+y;
}
console.log(add(2,5,10));
'''

86.
return 키워드 뒤에 반환하는 값을 명시적으로 지정하지 않으면,
undefined가 반환됨.

87.
return 키워드와 반환값 사이에 줄바꿈이 있으면, 그 사이에 세미콜론이 추가되어,
반환값에 관계없이, undefined가 반환될 수 있음.

88.
값에 의한 전달과 참조에 의한 전달.
'''
function changeVal(primitive, obj) {
	primitive += 100;
	obj.name = 'Kim';
}

var num = 100;
ver person = { name:'Lee' };

console.log(num);	// 100
console.log(person);	// {name:'Lee'}

changeVal(num, person);

console.log(num);	// 100
console.log(person);	// {name:'Kim'}
'''

89.
원시타입 인수는 값 자체가 복사되어 매개변수에 전달되기 때문에,
함수 몸체에서 해당 인수값 변경 불가.
객체타입 인수는 주소가 복사되어 매개변수에 전달되기 때문에,
함수 몸체에서 해당 객체로 접근해 프로퍼티 변경 가능.

90.
객체의 변경을 추적하려면, 옵저버 패턴 등을 통해 참조를 공유하는 모든 이들에게
객체의 변경 사실을 통지하고 이에 대처하는 추가 대응을 해야 함.

91.
즉시 실행 함수
함수 정의와 동시에 즉시 호출되는 함수.
그룹 연산자 즉, 괄호('()')로 감싸야 함.
단 한 번만 호출되며 다시 호출할 수 없음.
익명 함수 사용이 일반적.

'''
// 예제1
var res = (function() {
	var a = 3;
	var b = 5;
	return a*b;
})();
console.log(res);	// 15

// 예제2
res = (function(a, b) {
	return a+b;
})(3, 5);
console.log(res);
'''

92.
재귀 함수
자기 자신을 호출하는 함수.
함수 내부에서는 함수 식별자 뿐만 아니라, 함수 이름으로 자기 자신을 호출할 수 있음.
재귀 함수는 자신을 무한 재귀 호출하므로, 탈출 조건을 반드시 만들어야 함.

'''
// 예제1
function countdown(n) {
	if (n<0) return;
	console.log(n);
	countdown(n-1);
}

countdown(5);	// 5\n4\n3\n2\n1\n0
'''

93.
중첩 함수(= 내부함수)
함수 내부에 정의된 함수.
중첩 함수는 외부 함수 내부에서만 호출 가능.
주로 외부 함수를 돕는 역할을 함.

'''
// 예제1
function outer() {
	var x = 1;
	function inner() {
		var y = 2;
		console.log(x, y);
	}
	inner();
}
outer();
'''

94.
콜백 함수
함수의 매개변수를 통해, 다른 함수의 내부로 전달되는 함수.
매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수는 고차 함수라고 함.
또는 반환값으로 함수를 반환하는 함수를 고차 함수라고 함.
콜백 함수는 함수형 프로그래밍 패러다임 뿐만 아니라,
비동기 처리(이벤트 처리, Ajax 통신, 타이머 함수 등)에 활용되는 중요 패턴.

'''
// 함수의 변하지 않는 공통 로직은 미리 정의해두고,
// 경우에 따라 변경되는 로직은 추상화해서 함수 외부에서 내부로 전달하는 코드.
function repeat(n, f) {
	for(var i=0; i<n; i++) {
		f(i);
	}
}

var logAll = function(i) {
	console.log(i);
};

var logOdds = function(i) {
	if (i%2) console.log(i);
};

repeat(5, logAll);	// 0 1 2 3 4
repeat(5, logOdds);	// 1 3
'''

콜백 함수가 고차 함수 내부에만 호출된다면,
익명 함수 리터럴로 정의하면서 곧바로 전달 가능.
'''
repeat(5, function(i) {
	if (i%2) {
		console.log(i);
	}
});
'''

95.
콜백 함수는 배열 고차 함수에서도 사용됨.
'''
// 콜백 함수를 사용하는 고차 함수 map
var res = [1,2,3].map(function(item) {
	return item*2;
});
console.log(res);	// [2, 4, 6]

// 콜백 함수를 사용하는 고차 함수 filter
res = [1,2,3].filter(function(item) {
	return item%2;
});
console.log(res);	// [1, 3]

// 콜백 함수를 사용하는 고차 함수 reduce
res = [1,2,3].reduce(function(acc, cur) {
	// acc는 누산기, cur은 현재 값
	// Array.prototype.reduce() 찾아볼 것
	return acc+cur;
}, 0);	// 0은 acc에 들어갈 값을 초기화하는 매개변수
console.log(res);	// 6
'''

96.
순수 함수와 비순수 함수
(1) 순수 함수
어떤 외부 상태에 의존하지도 않고, 외부 상태를 변경하지도 않는 함수.
동일한 인수가 전달되면 언제나 동일한 값을 반환.
즉, 매개변수를 통해 함수 내부로 전달된 인수에게만 의존해 값을 생성해 반환.
함수 내부 상태에만 의존한다 해도,
내부 상태가 호출될 때마다 변화하는 값(ex>현재시간)이라면 순수 함수 아님.
순수 함수는 일반적으로 최소 하나 이상의 인수를 전달받음.
순수 함수는 인수를 변경하지 않는 것이 기본.
'''
var count = 0;
function increase(n) {
	return ++n;
}

count = increase(count);
console.log(count);	// 1

count = increase(count);
console.log(count);	// 2
'''

(2) 비순수 함수
외부상태에 의존하거나 외부 상태를 변경하는 함수.
외부 상태(전역변수, 서버데이터, 파일, Console, DOM 등)에 따라 반환값이 달라짐.
비순수 함수의 사용은 상태 변화 추적을 어렵게 하므로, 순수 함수 사용 권장.
'''
var count = 0;
function increase() {
	return ++count;
}

increase();
console.log(count);	// 1

increase();
console.log(count);	// 2
'''

cf.
함수형 프로그래밍은 순수 함수와 보조 함수의 조합을 통해
외부 상태를 변경하는 부수 효과를 최소화해서 불변성을 지향하는 프로그래밍 패러다임.
조건문과 반복문 제거로 복잡성을 해결하며,
변수 사용을 억제하거나 생명주기를 최소화해서 상태 변경을 피함.
순수 함수를 통해 부수 효과를 최대한 억제해 오류를 피함.
*/