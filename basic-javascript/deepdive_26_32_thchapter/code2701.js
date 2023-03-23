/*
359.
배열은 배열 리터럴, Array 생성자 함수, Array.of, Array.from 메서드로 생성 가능.

360.
자바스크립트의 배열은 배열의 요소를 위한 각각의 메모리 공간이 동일한 크기일 필요가 없으며,
연속적으로 이어져 있지 않을 수도 있음. 즉, 자바스크립트의 배열은 일반적인 배열의 동작을
흉내 낸 특수 객체.

361.
자바스크립트 배열의 요소는 사실 프로퍼티값. 다음의 코드로 확인 가능.
ex) console.log(Object.getOwnPropertyDescriptors([1,2,3]));

362.
자바스크립트의 배열은 해시 테이블로 구현된 객체이므로,
인덱스로 요소에 접근하는 경우 일반적인 배열보다 성능적인 면에서 느릴 수밖에 없음.
그러나, 특정 요소를 검색하거나 요소를 삽입 또는 삭제하는 경우에는,
일반적인 배열보다 빠른 성능을 기대할 수 있음.

363.
일반 객체 vs 배열 성능 비교
'''
const arr = [];
console.time('Array Performance Test');

for(let i=0; i<10000000; i++) {
	arr[i] = i;
}
console.timeEnd('Array Performance Test');

const obj = {};
console.time('Object Performance Test');

for(let i=0; i<10000000; i++) {
	obj[i] = i;
}
console.timeEnd('Object Performance Test');
'''

364.
배열의 length 프로퍼티는 가장 큰 인덱스에 1을 더한 것과 같음.
ex) const arr=[1,2,3]; console.log(arr.length);

365.
length 프로퍼티 값은 임의의 숫자 값을 명시적으로 할당 할 수 있음.
현재 length 프로퍼티 값보다 작은 숫자 값을 할당하면 배열의 길이가 줄어들음.
주의할 것은, 현재 length 프로퍼티 값보다 큰 숫자를 할당하는 경우,
length 값은 변하지만, 실제로 배열의 길이가 늘어나지는 않는다는 것.
'''
const arr = [1,2,3,4,5];
arr.length = 3;
console.log(arr);	// [1,2,3]
'''

366.
배열의 요소가 연속적으로 위치하지 않고 일부가 비어 있는 배열을 희소 배열이라 함.
'''
const sparse = [,2, ,4];
console.log(sparse.length);	// 4
console.log(sparse);	// [empty, 2, empty, 4]

console.log(Object.getOwnPropertyDescriptors(sparse));
// Object
// 1: {value: 2, writable: true, enumerable: true, configurable: true}
// 3: {value: 4, writable: true, enumerable: true, configurable: true}
// length: {value: 4, writable: true, enumerable: false, configurable: false}
'''
배열을 생성할 경우, 희소 배열을 생성하지 않도록 주의.

367.
배열 리터럴을 활용한 배열 생성.
ex) const arr = [1,2,3];

368.
Array 생성자 함수를 통한 배열 생성. 이때, 전달된 인수의 개수에 따라 다르게 동작함.
(1) 전달된 인수가 1개이고 숫자인 경우, length 프로퍼티 값이 인수인 배열 생성.
ex) const arr = new Array(10);
(2) 전달된 인수가 없는 경우, 빈 배열 생성.
ex) const arr = new Array();
(3) 전달된 인수가 2개 이상이거나 숫자가 아닌 경우, 인수를 요소로 갖는 배열 생성.
ex) const arr = new Array(1,2,3); const arr2 = new Array({});

369.
<Array.of 메서드>
ES6부터 도입된 Array.of 메서드는 전달된 인수를 요소로 갖는 배열을 생성.
전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성.
ex) Array.of(1); //-> [1]
ex) Array.of(1,2,3); //-> [1,2,3]

370.
<Array.from 메서드>
ES6부터 도입된 Array.from 메서드는 유사배열 또는 이터러블 객체를 인수로 전달받아
배열로 변환하여 반환함.
ex) Array.from({length:2, 0:'a', 1:'b'});	// [a, b]
ex) Array.from('hello');	// [h, e, l, l, o]

371.
Array.from을 사용하면 두 번째 인수로 전달한 콜백 함수를 통해
값을 만들면서 요소를 채울 수 있음. Array.from 메서드는 두 번째 인수로
전달한 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값과 인덱스를
순차적으로 전달하면서 호출하고 콜백 함수의 반환값으로 구성된 배열을 반환.
ex) Array.from({length:3}, (_,i)=>i);	// [0,1,2]

372.
유사 배열 객체는 마치 배열 처럼 인덱스로 프로퍼티 값에 접근할 수 있고,
length 프로퍼티를 갖는 객체를 말함.

373.
이터러블 객체는 Symbol.iterator 메서드를 구현해 for...of 문으로 순회할 수 있으며,
스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있는 객체를 말함.

374.
배열 또한 객체처럼 요소를 동적으로 추가할 수 있는데,
존재하지 않는 인덱스를 사용해 값을 할당하면 새로운 요소가 추가됨.
이 때, length 프로퍼티는 자동 갱신됨.
ex) const arr = [0]; arr[1] = 1; console.log(arr);

375.
배열에 정수 이외의 값을 인덱스처럼 사용하면, 요소가 아닌 프로퍼티가 생성됨.
단, 정수 형태의 문자열을 사용하면 요소로 생성됨.
'''
const arr = [];
arr[0] = 1;
arr['1'] = 2;
arr['foo'] = 3;
arr.bar = 4;
console.log(arr.length);	// 2
'''

376.
배열 또한 객체이므로, 특정 요소 삭제를 위해 delete 연산자 사용 가능.(비권장)
ex) const arr=[1,2,3];	delete arr[1]; console.log(arr.length);
-> 위의 경우와 같은 상황에서는, [1, empty, 3]과 같이 희소배열이 됨.
-> 따라서, length는 여전히 3임.

377.
희소배열을 만들지 않고 배열의 특정 요소를 완전히 삭제하려면, 
Array.prototype.splice 메서드 사용.
'''
const arr = [1,2,3];

// Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소 수)
arr.splice(1,1);

console.log(arr);	// [1, 3]
console.log(arr.length);	// 2
'''

378.
Array 생성자 함수는 정적 메서드를 제공하며,
배열 객체의 프로토타입인 Array.prototype은 프로토타입 메서드를 제공.
배열 메서드는 결과물을 반환하는 패턴이 두 가지이므로 주의 필요.
즉, 원본 배열을 직접 변경하는 메서드와 새로운 배열을 생성해 반환하는 메서드가 있음.
'''
const arr = [1];

// 1. 원본 배열을 직접 변경하는 메서드
arr.push(2);
console.log(arr);	// [1,2]

// 2. 새로운 배열을 생성해 반환하는 메서드
const result = arr.concat(3);
console.log(arr);	// [1,2]
console.log(result);	// [1,2,3]
'''

379.
<Array.isArray>
전달된 인수가 배열이면 true, 배열이 아니면 false를 반환.
ex) Array.isArray(new Array());
ex) Array.isArray([1,2]);

380.
<Array.prototype.indexOf>
원본 배열에서 인수로 전달된 요소를 검색해 인덱스를 반환.
'''
const arr = [1,2,2,3];
arr.indexOf(2);	//-> 1
arr.indexOf(3);	//-> 3

// 두 번째 인수는 검색을 시작할 인덱스.
// 해당 인수를 생략하면, 처음부터 검색함.
arr.indexOf(1, 2);	// -1

// 찾으려는 요소가 없을 경우, -1을 반환.
// 원본 배열에 인수로 전달한 요소와 중복되는요소가 여러 개 있다면,
// 첫 번째로 검색된 요소의 인덱스를 반환.
'''

381.
<Array.prototype.includes>
배열이 특정 요소를 포함하고 있는지 판별함.
'''
const foods = ['apple', 'banana', 'orange'];

if (!foods.includes('orange')) {
	foods.push('orange');
}

console.log(foods);
'''

382.
<Array.prototype.push>
인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고,
변경된 length 프로퍼티 값을 반환.
'''
const arr = [1,2];

let result = arr.push(3,4);
console.log(result);	// 4

console.log(arr);	// [1,2,3,4]
'''
단, push는 성능 면에서 좋지 않음.
마지막 요소로 추가할 요소가 하나 뿐이라면,
length 프로퍼티를 사용해 배열의 마지막에 요소를 직접 추가하는 것을 권장.

스프레드 문법을 사용하면, 다음과 같이 마지막에 요소 추가 가능.
'''
const arr = [1,2];
const newArr = [...arr, 3];
console.log(newArr);	// [1,2,3]
'''

383.
<Array.prototype.pop>
원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환.
단, 원본 배열이 비어있을 경우, undefined를 반환.
pop 메서드는 우너본 배열을 직접 변경함.
'''
const arr = [1,2];

let result = arr.pop();
console.log(result);	// 2

console.log(arr);	// [1]
'''

384.
생성자 함수로 구현한 스택(Stack)
'''
const Stack = (function() {
	function Stack(array = []) {
	    if(!Array.isArray(array)) {
	        throw new TypeError(`${array} isn't an array.`);
	    }
	    this.array = array;
	}
	
	Stack.prototype = {
	    constructor: Stack,
	    push(value) {
	        return this.array.push(value)
	    },
	    pop() {
	        return this.array.pop();
	    },
	    // 스택의 복사본 배열을 반환
	    entries() {
	        return [...this.array];
	    }
	};
	
	return Stack;
})();

const stack = new Stack([1,2]);
console.log(stack.entries());

stack.push(3);
console.log(stack.entries());

stack.pop();
console.log(stack.entries());
'''

385.
클래스로 구현한 스택(Stack)
'''
class Stack {
    #array; // private class member
    constructor(array=[]) {
        if(!Array.isArray(array)) {
            throw new TypeError(`${array} isn't an array.`);
        }
        this.#array = array;
    }
    
    push(value) {
        return this.#array.push(value);
    }
    
    pop() {
        return this.#array.pop();
    }
    
    entries() {
        return [...this.#array];
    }
}

const stack = new Stack([1,2]);
console.log(stack.entries());

stack.push(3);
console.log(stack.entries());

stack.pop();
console.log(stack.entries());

386.
<Array.prototype.unshift>
unshift 메서드는 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고,
변경된 length 프로퍼티값을 반환. unshift 메서드는 원본 배열을 직접 변경.
'''
const arr = [1,2];

let result = arr.unshift(3,4);
console.log(result);	// 4

console.log(arr);	// [3,4,1,2]
'''

스프레드 문법을 사용하는 것을 권장.
'''
const arr = [1,2];
const newArr = [3, ...arr];
console.log(newArr);	// [3,1,2]
'''

387.
<Array.prototype.shift>
shift 메서드는 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환.
'''
const arr = [1,2];

let result = arr.shift();
console.log(result);	// 1

// shift 메서드는 원본 배열을 직접 변경
console.log(arr);	// [2]
'''

388.
생성자 함수로 구현한 큐(Queue)
* shift와 push 메서드를 사용하면 큐를 쉽게 구현할 수 있음.
'''
const Queue = (function() {
    function Queue(array = []) {
        if (!Array.isArray(array)) {
            throw new TypeError(`${array} isn't an array.`);
        }
        this.array = array;
    }
    
    Queue.prototype = {
        constructor:Queue,
        enqueue(value) {
            return this.array.push(value);
        },
        dequeue() {
            return this.array.shift();
        },
        entries() {
            return [...this.array];
        }
    };
    
    return Queue;
})();

const queue = new Queue([1,2,3]);
console.log(queue.entries());

queue.enqueue(4);
console.log(queue.entries()); // [1,2,3,4]

queue.dequeue();
console.log(queue.entries());   // [2,3,4]
'''

389.
클래스로 구현한 큐(Queue)
'''
class Queue {
    #array;
    constructor(array = []) {
        if(!Array.isArray(array)) {
            throw new TypeError(`${array} isn't an array.`);
        }
        this.#array = array;
    }
    
    enqueue(value) {
        return this.#array.push(value);
    }
    dequeue() {
        return this.#array.shift();
    }
    entries() {
        return [...this.#array];
    }
}

const queue = new Queue([1,2]);
console.log(queue.entries());   // [1,2]

queue.enqueue(3);
console.log(queue.entries());   // [1,2,3]

queue.dequeue();
console.log(queue.entries());   // [2,3]
'''

390.
<Array.prototype.concat>
인수로 전달된 값들을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환.
인수로 전달된 값이 배열인 경우, 배열을 해체하여 새로운 배열의 요소로 추가.
'''
const arr1 = [1,2];
const arr2 = [3,4];

let result = arr1.concat(arr2);
console.log(result);	// [1,2,3,4]

result = arr1.concat(3);
console.log(result);	// [1,2,3]

result = arr1.concat(arr2, 5);
console.log(result);	// [1,2,3,4,5]
'''

concat 메서드를 사용하는 대신 ES6의 스프레드 문법으로 대체 가능.
'''
let result = [1,2].concat([3,4]);
console.log(result);	// [1,2,3,4]

result = [...[1,2], ...[3,4]];
console.log(result);	// [1,2,3,4]
'''

391.
push와 unshift 메서드로 concat 메서드를 대체할 수 있음.
다만, push와 unshift는 원본 배열을 직접 변경하므로,
원본 배열을 반드시 변수에 저장해 두어야 함.
'''
const arr1 = [3,4];

arr1.unshift(1,2);	// 배열의 앞쪽에 추가
console.log(arr1);	// [1,2,3,4]

arr1.push(5,6);		// 배열의 뒷쪽에 추가
console.log(arr1);	// [1,2,3,4,5,6]
'''

392.
<Array.prototype.splice>
원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 제거하는 경우,
Array.prototype.splice 메서드 사용.
splice(시작 인덱스, 제거 요소의 수, (optional)제거한 위치에 삽입할 요소들)
'''
const arr = [1,2,3,4];
const result = arr.splice(1,2,20,30);
// 제거된 요소가 배열로 반환됨.
console.log(result);	// [2,3]
console.log(arr);	// [1, 20, 30, 4]
'''

splice 메서드의 두 번째 인수를 0으로 지정하면,
아무런 요소도 제거하지 않고 새로운 요소들을 삽입함.
'''
const arr = [1,2,3,4]
const result = arr.splice(1, 0, 100);

console.log(arr);	// [1, 100, 2, 3, 4]
console.log(result);	// []
'''

393.
배열에서 특정 요소를 제거하려면,
indexOf 메서드를 통해 특정 요소의 인덱스를 취득한 뒤 splice 메서드 사용.
'''
const arr = [1,2,3,1,2];

function remove(array, item) {
	const index = array.indexOf(item);
	if(index !== -1) {
		array.splice(index, 1);
	}
}

remove(arr,2);
console.log(arr);	// [1,3,1,2]
'''

filter 메서드를 사용하면, 특정 요소가 중복된 경우 모두 제거함.
'''
const arr = [1,2,3,1,2];

function removeAll(array, item) {
	return array.filter(v=>v!==item);
}

console.log(removeAll(arr,2));	// [1,3,1]
console.log(arr);		// [1,2,3,1,2]
'''

394.
<Array.prototype.slice>
인수로 전달된 범위의 요소들을 복사하여 배열로 반환. 원본 배열은 변경되지 않음.
slice(복사를 시작할 인덱스, 복사를 종료할 인덱스<--해당 인덱스는 포함되지 않음)
두 번째 인자는 생략 가능하며, 생략 시 기본 값은 length 프로퍼티 값.
'''
const arr = [1,2,3];
console.log(arr.slice(0,1));	// [1]
console.log(arr.slice(1));	// [2,3]
'''

slice 메서드의 첫번째 인수가 음수인 경우, 배열의 끝에서부터 요소를 복사해 배열로 반환.
'''
const arr = [1,2,3];

// 뒤에서부터 요소를 한 개 복사해 반환.
arr.splice(-1);	// [3]

// 뒤에서부터 요소를 두 개 복사해 반환.
arr.splice(-2);	// [2,3]
'''

slice 메서드의 인수를 모두 생략하면, 원본 배열 전체를 복사한 배열을 생성해 반환.
단, 이 때 생성된 복사본은 얕은 복사를 통해 생성됨.

395.
slice 메서드가 복사본을 생성하는 것을 이용해
arguments, HTMLCollection, NodeList 같은 유사 배열 객체를 배열로 변환 가능.
'''
function sum() {
	// 유사 배열 객체를 배열로 변환(ES5)
	var arr = Array.prototype.slice.call(arguments);
	console.log(arr);
	
	return arr.reduce(function(pre, cur) {
		return pre+cur;
	}, 0);
}

console.log(sum(1,2,3));	// 6
'''

396.
Array.from 메서드를 사용하면, 더욱 간단히 유사 배열 객체를 배열로 변환 가능.
'''
function sum() {
	const arr = Array.from(arguments);
	console.log(arr);
	return arr.reduce((pre,cur)=>pre+cur, 0);
}

console.log(sum(1,2,3));
'''

이터러블 객체는 ES6 스프레드 문법을 사용해 간단히 배열로 변환 가능.
'''
function sum() {
	const arr = [...arguments];
	console.log(arr);	// [1,2,3]
	return arr.reduce((pre,cur)=>pre+cur, 0);
}

console.log(sum(1,2,3));
'''

397.
<Array.prototype.join>
원본 배열의 모든 요소를 문자열로 변환 후,
인수로 전달받은 문자열 즉, 구분자로 연결한 문자열을 반환.
구분자는 생략 가능하며 기본 구분자는 콤마(',').
'''
const arr = [1,2,3,4];
arr.join();	// '1,2,3,4'
arr.join('');	// '1234'
arr.join(':');	// '1:2:3:4'
'''

398.
<Array.prototype.reverse>
원본 배열의 순서를 반대로 뒤집음. 이때, 원본 배열이 변경됨.
반환값은 변경된 배열.
'''
const arr = [1,2,3];
const result = arr.reverse();
console.log(arr);	// [3,2,1]
console.log(result);	// [3,2,1]
'''

399.
<Array.prototype.fill>
인수로 전달받은 값을 배열의 처음부터 끝까지 요소로 채움.
이때 원본 배열이 변경됨.
'''
const arr = [1,2,3];
arr.fill(0);
console.log(arr);	// [0,0,0]
'''

두번째 인수로 요소 채우기를 시작할 인덱스를 지정할 수 있음.
'''
const arr = [1,2,3,4];
arr.fill(0,1);
console.log(arr);	// [1,0,0,0]
'''

세번째 인수(해당 인수 미포함)로 요소 채우기를 종료할 인덱스를 지정할 수 있음.
'''
const arr = [1,2,3,4];
arr.fill(0,1,3);
console.log(arr);	// [1,0,0,4]
'''

400.
Array.from 메서드를 사용하면, 두 번째 인수로 전달한 콜백 함수를 통해,
요소값을 만들면서 배열을 채울 수 있음.
'''
// 첫번째 인수는 요소값(_), 두번째 인수는 인덱스값(i).
const sequences = (length=0)=>Array.from({length}, (_,i)=>i);
console.log(sequences(3));	// [0,1,2]
'''

401.
<Array.prototype.flat>
인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화함.
인수를 생략할 경우 기본값은 1이고,
Infinity를 전달할 경우, 중첩 배열 모두를 평탄화함.
'''
[1,[2,[3,[4]]]].flat();		// [1,2,[3,[4]]]
[1,[2,[3,[4]]]].flat(2);	// [1,2,3,[4]]
[1,[2,[3,[4]]]].flat(Infinity);	// [1,2,3,4]
'''

402.
배열 고차 함수(Higher-Order Function, HOF)
-> 함수를 인수로 전달 받거나, 함수를 반환하는 함수.
-> 고차 함수는 외부 상태의 변경이나 가변 데이터를 피하고 불변성을 지향하는
-> 함수형 프로그래밍에 기반을 두고 있음.

403.
함수형 프로그래밍은 순수 함수와 보조 함수의 조합을 통해,
로직 내에 존재하는 조건문과 반복문을 제거하여 복잡성을 해결하고,
변수 사용을 억제해 상태 변경을 피하려는 프로그래밍 패러다임.

404.
<Array.prototype.sort>
배열의 요소를 정렬. 원본 배열을 직접 변경. 정렬된 배열 반환.
기본적으로 오름차순으로 요소를 정렬.
'''
const fruits = ['Banana', 'Orange', 'Apple'];
fruits.sort();
console.log(fruits);	// [Apple, Banana, Orange]
'''

따라서 내림차순으로 정렬하려면,
오름차순으로 정렬한 후 reverse 메서드로 요소의 순서를 뒤집어야 함.
'''
const fruits = ['Banana', 'Orange', 'Apple'];
fruits.sort();
fruits.reverse();
console.log(fruits);	// [Orange, Banana, Apple]
'''

다만, 숫자 요소로 이뤄진 배열 정렬 시에는 주의해야 하는데,
배열의 요소가 숫자 타입이더라도, 일시적으로 문자열로 변환하기 때문에,
유니코드 코드 포인트의 순서를 기준으로 정렬됨.
'''
const points = [40, 1, 100, 2000];
points.sort();
console.log(points);	// [1,100,2000,40]
'''

따라서, 숫자 요소를 정렬할 때는
sort 메서드에 정렬 순서를 정의하는 비교함수를 인수로 전달해야 함.
비교 함수는 양수나 음수 또는 0을 반환해야 함.
비교 함수의 반환값이 0보다 작을 경우, 첫번째 인수를 우선 정렬.
0이면 정렬하지 않으며, 0보다 크면 두 번째 인수를 우선 정렬.
'''
const points = [40, 1, 100, 2000];
points.sort((a,b) => a-b);
console.log(points);	// [ 1, 40, 100, 2000 ]

points.sort((a,b) => b-a);
console.log(points);	// [ 2000, 100, 40, 1 ]
'''

405.
객체를 요소로 갖는 배열은 다음과 같이 정렬함.
'''
const todos = [
	{id:4, content:'Javascript'},
	{id:1, content:'HTML'},
	{id:2, content:'CSS'}
];

function compare(key) {
	return (a,b)=>(a[key]>b[key] ?
		1: (a[key]<b[key]? -1:0);
}

todos.sort(compare('id'));
console.log(todos);

todos.sort(compare('content'));
console.loG(todos);
'''

406.
<Array.prototype.forEach>
for문을 대체할 수 있는 고차 함수로, 자신의 내부에서 반복문을 실행함.
forEach 메서드는 반복문을 추상화한 고차 함수로
내부에서 반복문을 통해 자신을 호출한 배열을 순회하면서
수행해야 할 처리를 콜백 함수로 전달받아 반복 호출함.
'''
const numbers = [1,2,3];
const pows = [];

numbers.forEach(item=>pows.push(item**2));
console.log(pows);
'''

407.
forEach 메서드의 콜백 함수는
forEach 메서드를 호출한 배열의 요소값, 인덱스, forEach 메서드를 호출한 배열 자체(this)
를 순차적으로 전달받을 수 있음.
'''
const numbers = [1,2,3];
const pows = [];

numbers.forEach(
	(item1, item2, item3) => console.log(item1, item2, item3)
);
// 1 0 [ 1, 2, 3 ]
// 2 1 [ 1, 2, 3 ]
// 3 2 [ 1, 2, 3 ]
'''

408.
forEach 메서드는 원본 배열을 변경하지 않지만,
콜백 함수를 통해 원본 배열을 변경할 수 있음.
'''
const numbers = [1,2,3];

numbers.forEach((item,idx,arr) => {
	arr[idx] = item**2
});
console.log(numbers);
'''

409.
forEach의 두 번째 인자로 콜백 함수 내부에서 this로 사용할 객체 전달 가능.
'''
class Numbers {
	numArr = [];
	multiply(arr) {
		arr.forEach(function(item) {
			this.numArr.push(item*item);
		}, this);
		
		// 화살표 함수를 사용하면, this가 상위 스코프의 그것을 그대로 참조.
		// arr.forEach(item=>this.numArr.push(item*item));
	}
}

const numbers = new Numbers();
numbers.multiply([1,2,3]);
console.log(numbers.numArr);
'''

410.
forEach 메서드는 for문과 달리 break, continue 문을 사용할 수 없음.
또한, 희소배열의 경우 존재하지 않는 요소는 순회 대상에서 제외됨.

411.
<Array.prototype.map>
자신을 호출한 배열의 모든 요소를 순회하면서, 인수로 전달 받은 콜백 함수를 반복 호출.
그리고 콜백 함수의 "반환값"들로 구성된 새로운 배열을 반환. 즉, return이 반드시 있어야 함.
단, 원본 배열은 변경되지 않음.
'''
const numbers = [1,4,9];
const roots = numbers.map(item=>Math.sqrt(item));
console.log(roots);
'''
map 메서드의 콜백 함수는
map 메서드를 호출한 배열의 요소값, 인덱스, map을 호출한 배열 그 자체를
순차적으로 전달받을 수 있음.
'''
["a", "b", "c"].map((item, idx, arr) => {
	console.log(item, idx, arr);
	return item;
});
'''

412.
map 메서드의 두 번째 인자로 콜백 함수 내부에서 this로 사용할 객체 전달 가능.
'''
class Prefixer {
	constructor(prefix) {
		this.prefix = prefix;
	}
	add(arr) {
		return arr.map(function(item) {
			return this.prefix + item;
		}, this);
		
		// 화살표 함수 사용 시 다음과 같이 구현 가능
		// return arr.map(item=>this.prefix+item);
		// 
	}
}
const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
'''

413.
<Array.prototype.filter>
자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출.
콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환.
-> 자신을 호출한 배열에서 필터링 조건을 만족하는 특정 요소 추출 시 사용.
'''
const numbers = [1,2,3,4,5];
const odds = numbers.filter(item=>item%2);
console.log(odds);
'''
filter 메서드의 콜백 함수는
filter 메서드를 호출한 배열의 요소값, 인덱스, filter를 호출한 배열 그 자체를
순차적으로 전달받을 수 있음.

414.
filter 메서드의 두 번째 인자로 콜백 함수 내부에서 this로 사용할 객체 전달 가능.
또한, filter 메서드는 자신을 호출한 배열에서 특정 요소를 제거할 때도 사용 가능.
단, filter는 중복된 요소를 모두 제거하므로, 하나만 삭제하고자 할 경우 indexOf 사용.
'''
class Users {
	constructor() {
		this.users = [
			{id:1, name:'Lee'},
			{id:2, name:'Kim'}
		];
	}
	add(userName) {
	    const that = this;
		that.users.push({
		    id:(that.users.length)+1,
		    name:userName
		});
	}
	findById(id) {
		return this.users.filter(user=>user.id===id);
	}
	remove(id) {
		this.users = this.users.filter(user=>user.id!==id);
	}
	getUsers() {
	    this.users.forEach(item=>console.log(item));
	}
}

const users = new Users();
users.getUsers();

let user = users.findById(1);
console.log(user);

users.add('choi');
user = users.findById(3);
console.log(user);

users.remove(3);
user = users.findById(3);
console.log(user);
'''

415.
즉, forEach 메서드는 언제나 undefined를 반환하고,
map 메서드는 콜백 함수의 반환값들로 구성된 새로운 배열을 반환하며,
filter 메서드는 콜백 함수의 반환값이 true인 요소만 추출한 새로운 배열을 반환.

416.
<Array.prototype.reduce>
자신을 호출한 배열을 모든 요소를 순회하며 인수로 전달받은 콜백 함수를 반복 호출.
그리고 콜백 함수의 반환값을 다음 순회 시에 콜백 함수의 첫 번째 인수로 전달하면서,
콜백 함수를 호출하여, 하나의 결과값을 만들어 반환함.
단, 원본 배열은 변경되지 않음.

417.
reduce 메서드는 첫 번째 인수로 콜백 함수, 두 번째 인수로 초기값을 전달 받음.
reduce 메서드의 콜백 함수에는 4개의 인수 즉, 초기값 또는 콜백 함수의 이전 반환값,
reudce 메서드를 호출한 배열의 요소값, 인덱스, reduce를 호출한 배열 자체가 전달됨.
'''
// accumulator : 처음에는 초기값, 이후부터는 이전 콜백 함수의 반환값
// currentVal : 현재 순회중인 요소값
// idx : 현재 순회중인 요소의 인덱스값
// arr : reduce 메서드를 호출한 배열 그 자체
const sum = [1,2,3,4].reduce((accumulator, currentVal, idx, arr) => {
	accumulator+currentVal
}, 0);
console.log(sum);	// 10
'''
결과적으로 reduce 메서드는 하나의 결과값을 반환.

418.
reduce 메서드의 활용
(1) 평균 구하기
'''
const values = [1,2,3,4,5,6];

const avg = values.reduce((acc,cur,i,{length})=>{
	return i === length-1 ? (acc+cur)/length : acc+cur;
}, 0);

console.log(avg);
'''

(2) 최대값 구하기
'''
const values = [1,2,3,4,5];

const max = valeus.reduce((acc,cur)=>(acc>cur ? acc:cur), 0);
console.log(max);
'''

(3) 요소의 중복 횟수 구하기
'''
const fruits = ['banana', 'apple', 'orange', 'orange', 'apple'];

const count = fruits.reduce((acc,cur) => {
	acc[cur] = (acc[cur] || 0) + 1;
	return acc;
}, {});
'''

(4) 중복 요소 제거
'''
const values = [1,2,1,3,5,4,5,3,4,4];

const result = values.reduce((unique, val, i, _values)=>
	// indexOf가 첫 번째로 일치하는 요소의 인덱스값을 반환하는 기능을 이용.
	_values.indexOf(val) === i ? [...unqiue, val] : unqiue
, []);
'''

(5) 객체의 특정 프로퍼티 값을 합산
'''
const products = [
	{id:1, price:100},
	{id:2, price:200},
	{id:3, price:300}
];

const priceSum = products.reduce((acc,cur)=>acc+cur.price, 0);
console.log(priceSum);
'''

419.
중복 요소를 제거할 때는, 중복되지 않는 유일한 값들의 집합인 Set 사용 가능.
'''
const values = [1,2,1,3,5,4,5,3,4,4];

const result = [...new Set(values)];
console.log(result);
'''

420.
reduce 메서드를 호출할 때는 언제나 초기값을 전달하는 것이 안전함.

421.
<Array.prototype.some>
자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출.
이때, some 메서드는 콜백 함수의 반환값이 단 한 번이라도 참이면 true,
모두 거짓이면 false를 반환함.
단, some 메서드를 호출한 배열이 비어있다면, 언제나 false를 반환.
some 메서드의 콜백 함수는 요소값 / 인덱스 / 메서드를 호출한 배열 자체를 순서대로 전달 받음.
'''
[5, 10, 15].some(item=> item>10);	// true
[5, 10, 15].some(item=> item<0);	// false
['apple', 'banana', 'mango'].some(item=> item==='banana');	// true
[].some(item=> item>3);	// false
'''

422.
<Array.prototype.every>
자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출.
이때, every 메서드는 콜백 함수의 반환값이 모두 참이면 true,
단 한 번이라도 거짓이면 false를 반환.
단, every 메서드를 호출한 배열이 비어있다면, 언제나 true를 반환.
every 메서드의 콜백 함수는 요소값 / 인덱스 / 메서드를 호출한 배열 자체를 순서대로 전달 받음.
'''
[5, 10, 15].every(item=> item>3);	// true
[5, 10, 15].every(item=> item>10);	// false
[].every(item=> item>10);		// true
'''

423.
Array.prototype.some이나 Array.prototype.every는 모두 두 번째 인자로
this로 사용할 객체를 전달받을 수 있음. 더 나은 방법은 화살표 함수를 사용하는 것.

423.
<Array.prototype.find>
자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출하여,
반환값이 true인 첫 번째 요소를 반환. 
콜백 함수의 반환값이 true인 요소가 없다면, undefined를 반환.
'''
const users = [
	{id:1, name:'Lee'},
	{id:2, name:'Kim'},
	{id:3, name:'Choi'},
];
users.find(user => user.id ===2);	// {id:2, name:'Kim'}
'''
Array.prototype.find는 두 번째 인자로 this로 사용할 객체를 전달받을 수 있음.
더 나은 방법은 화살표 함수를 사용하는 것.

424.
<Array.prototype.findIndex>
자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출하여 반환값이
true인 첫 번째 요소의 인덱스를 반환.
콜백 함수의 반환값이 true인 요소가 없다면, -1을 반환.
콜백함수는 요소값 / 인덱스 / 호출한 배열 객체를 순차적으로 전달받을 수 있음
'''
const users = [
	{id:1, name:'Lee'},
	{id:2, name:'Kim'},
	{id:3, name:'Choi'}
];

users.findIndex(user=>userId===2);	// 1

// 위의 코드는 아래와 같이 추상화할 수 있음.
function predicate(key, value) {
	return item=>item[key]===value;
}

users.findIndex(predicate('id', 2));	// 1
'''
Array.prototype.findIndex는 두 번째 인자로 this로 사용할 객체를 전달받을 수 있음.
더 나은 방법은 화살표 함수를 사용하는 것.

425.
<Array.prototype.flatMap>
map 메서드를 통해 생성된 새로운 배열을 평탄화함.
즉, map 메서드와 flat 메서드를 순차적으로 실행하는 효과가 있음.
단, flatMap 메서드는 flat 메서드처럼 인수로 평탄화 깊이를 설정할 수 없음.
'''
const arr = ['hello', 'world'];
arr.map(x=>x.split('')).flat();
arr.flatMap(x=>x.split(''));
'''
*/