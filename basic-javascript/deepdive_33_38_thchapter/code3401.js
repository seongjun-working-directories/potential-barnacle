/*
552.
ES6에서는 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일함.
이에 따라, for...of문, 스프레드 문법, 배열 디스트럭처링 할당의 대상으로
사용할 수 있도록 일원화함.

553.
이터레이션 프로토콜에는 이터러블 프로토콜과 이터레이터 프로토콜이 있음.
(1) 이터러블 프로토콜(Iterable Protocol)
Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나
프로토타입 체인을 통해 상속 받은 Symbol.iterator 메서드를 호출하면
이터레이터 프로토콜을 준수한 이터레이터를 반환.
이러한 규약을 이터러블 프로토콜이라 하며,
이터러블 프로토콜을 준수한 객체를 이터러블이라 함.

(2) 이터레이터 프로토콜(Iterator Protocol)
이터러블의 Symbol.iterator 메서드를 호출하면
이터레이터 프로토콜을 준수한 이터레이터를 반환함.
이터레이터는 next 메서드를 소유하며, next 메서드를 호출하면
이터러블을 순회하며 value와 done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환함.
이러한 규약을 이터레이터 프로토콜이라 하며,
이터레이터 프로토콜을 준수한 객체를 이터레이터라 함.
이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 함.

554.
즉, 이터러블(Iterable)은 순회 가능한 자료 구조이고,
이터레이터(Iterator)는 이터러블의 요소를 탐색하기 위한 포인터임.

555.
이터러블은 Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나
프로토타입 체인을 통해 상속받은 객체를 의미.
'''
// 이터러블인지 확인하는 함수
const isIterable = v=>
	v!==null && typeof v[Symbol.iterator]==='function';

isIterable([]);	// true
isIterable('');	// true
isIterable(new Map());	// true
isIterable({});	// false
'''

556.
배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블.
'''
const array = [1,2,3];

console.log(Symbol.iterator in array);

for(const item of array) {
	console.log(item);
}

console.log([...aray]);

// 배열 디스트럭처링 할당
const [a, ...rest] = array;
console.log(a, rest);	// 1, [2,3]
'''

557.
Symbol.iterator 메서드를 직접 구현하지 않거나 상속받지 않은 일반 객체는
이터러블 프로토콜을 준수한 이터러블이 아니므로, for...of문으로 순회할 수 없으며
스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 없음.

558.
이터레이터
이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환.
이터러블의 Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 가짐.
'''
const array = [1,2,3];

const iterator = array[Symbol.iterator]();
console.log('next' in iterator);	// true
'''

559.
이터레이터의 next 메서드는 이터러블의 각 요소를 순회하기 위한 포인터 역할을 함.
즉, next 메서드를 호출하면 이터러블을 순차적으로 한 단계씩 순회하며
순회 결과를 나타내는 이터레이터 리절트 객체(Iterator Result Object)를 반환함.
'''
const array = [1,2,3];

const iterator = array[Symbol.iterator]();

let result;
while(!((result=iterator.next()).done)) {
	console.log(result);
}
console.log(result);
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }
'''

560.
빌트인 이터러블
-> 표준 빌트인 객체들은 빌트인 이터러블임.
Array.prototype[Symbol.iterator], String.prototype[Symbol.iterator]
Map.prototype[Symbol.iterator], Set.prototype[Symbol.iterator]
TypedArray.prototype[Symbol.iterator]
arugmenst[Symbol.iterator]
NodeList.prototype[Symbol.iterator]
HTMLCollection.prototype[Symbol.iterator]

561.
<for...of 문>
이터러블을 순회하며 이터러블의 요소를 변수에 할당함.
-> for (변수 선언문 of 이터러블) {...}

for...of 문은 for...in 문의 형식과 유사.
for...in 문은 프로토타입 체인 상의 모든 프로토타입 프로퍼티 중
프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거.
이때 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않음.
for...of 문은 내부적으로 이터레이터의 next 메서드를 호출하여,
이터러블을 순회하며 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을
for...of 문의 변수에 할당함.
'''
for (const item of [1,2,3]) {
	console.log(item);	// 1 2 3
}
'''

562.
유사 배열 객체는 length 프로퍼티를 갖기 때문에 for 문으로 순회할 수 있고,
인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티 키로 가지므로
마치 배열처럼 인덱스로 프로퍼티 값에 접근 가능.
따라서, 유사 배열 객체는 이터러블이 아닌 일반 객체이므로, Symbol.iterator 메서드가 없음.
for...of문으로 순회 불가.
다만, arguments, NodeList, HTMLCollection은 유사 배열 객체이지만 이터러블임.

563.
Array.from 메서드를 사용하면 배열로 간단히 변환 가능.
Array.from 메서드는 유사 배열 객체 또는 이터러블을 인수로 전달받아 배열로 변환하여 반환.
'''
const arrayLike = {
	0:1, 1:2, 2:3, length:3
};

const arr = Array.from(arrayLike);
console.log(arr);	// [1,2,3]
'''

563.
이터러블을 지원하는 데이터 소비자는 내부에서 Symbol.iterator 메서드를 호출해
이터레이터를 생성하고 이터레이터의 next 메서드를 호출하여 이터러블을 순회하며
이터레이터 리절트 객체를 반환. 그리고 이터레이터 리절트 객체의 value/done 값을 취득.

564.
이터레이션 프로토콜은 데이터 소비자(for...of, 스프레드 문법, 배열 디스트럭처링 할당,
Map/Set 생성자)와 데이터 공급자(Array, String, Map/Set, DOM 컬렉션) 사이의
인터페이스 역할을 함.

565.
<사용자 정의 이터러블 구현>
일반 객체도 이터레이션 프로토콜을 준수하도록 구현하면 사용자 정의 이터러블이 됨.
'''
// 피보나치 수열을 구현한 사용자 정의 이터러블 예제
const fibonacci = {
	// Symbol.iterator()는 next()를 소유한 이터레이터를 반환해야 함
	// next()는 이터레이터 리절트 객체를 반환해야 함
	[Symbol.iterator]() {
		let [pre, cur] = [0, 1];
		const max = 10;
		return {
			next() {
				[pre, cur] = [cur, pre+cur];
				return {value:cur, done:cur>=max};
			}
		};
	}
};

for (const num of fibonacci) {
	console.log(num);
}
'''

566.
이터러블은 for...of문 뿐만 아니라 스프레드 문법, 배열 디스트럭처링 할당에도 사용 가능.

567.
위의 565번 예제에서 최대값을 외부에서 전달받을 수 있도록 수정한 코드.
'''
// 수열의 최대값을 인수로 전달받아 이터러블을 반환하는 함수를 만듦
const fibonacciFunc = function(max) {
	let [pre, cur] = [0, 1];
	
	// 이터러블 반환
	// 이터레이터 생성을 위해 이터러블의 Symbol.iterator()를 호출해야 함
	return {
		[Symbol.iterator]() {
		  return {
		    next() {
		      [pre, cur] = [cur, pre+cur];
		      return {value:cur, done:cur>=max};
		    }
		  };
		}
	};
};

for (const num of fibonacciFunc(10)) {
	console.log(num);
}
'''

567.
이터러블이면서 이터레이터인 객체를 생성하면 Symbol.iterator()를 호출하지 않아도 됨.
Symbol.iterator()와 next()를 소유한 이터러블이면서 이터레이터인 객체.
Symbol.iterator()는 this를 반환하므로 next()를 갖는 이터레이터를 반환.
'''
const fibonacciFunc = function(max) {
	let [pre, cur] = [0, 1];
	
	// Symbol.iterator()와 next()를 소유한 이터러블이면서 이터레이터인 객체 반환
	return {
		[Symbol.iterator]() { return this; },
		// next()는 이터레이터 리절트 객체를 반환
		next() {
			[pre, cur] = [cur, pre+cur];
			return {value:cur, done:cur>=max};
		}
	};
};

let iter = fibonacciFunc(10);

for (const num of iter) {
	console.log(num);
}

iter = fibonacciFunc(5);
for(;;) {
	const nextObj = iter.next();
	console.log(nextObj);
	if (nextObj.done) {
		break;
	}
}
'''

568.
무한 이터러블과 지연 평가
지연 평가란, 데이터가 필요한 시점 이전까지는 미리 데이터를 생성하지 않다가,
데이터가 필요한 시점이 되면 그때 데이터를 생성하는 기법.
'''
// 무한 수열
const fibonacciFunc = function() {
	let [pre, cur] = [0, 1];
	return {
		[Symobl.iterator]() { return this; },
		next() {
			[pre, cur] = [cur, pre+cur];
			// 무한을 구현하기 위해 done 프로퍼티를 없앰
			return {value:cur};
		}
	};
};

for (const num of fibonacciFunc()) {
	if (num > 1000) break;
	console.log(num);
}

// 배열 디스트럭처링 할당으로 무한 이터러블에서 3개의 요소만 취득
// 배열 디스트럭처링 할당 등이 실행되기 이전까지 데이터 생성하지 않음
const [f1, f2, f3] = fibonacciFunc();
console.log(f1, f2, f3);
'''
*/