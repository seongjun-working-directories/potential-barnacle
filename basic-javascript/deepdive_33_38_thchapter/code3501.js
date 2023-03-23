/*
569.
<스프레드 문법>
`...`은 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만듦.
스프레드 문법은 Array, String, Map, Sat, arguments 등 for...of문으로
순회할 수 있는 이터러블에 한정됨.
'''
// 배열을 개별 요소로 분리
console.log(...[1,2,3]);  // 1 2 3
// 문자열, Map, Set은 이터러블
console.log(...'Hello');  // H e l l o
console.log(...new Map([['a','1'], ['b','2']]));  // ['a','1'], ['b','2']
console.log(...new Set([1,2,3]));  // 1 2 3
'''

570.
스프레드 문법의 결과는 값이 아님.
즉, 값을 생성하는 연산자가 아니므로, 스프레드 문법의 결과는 변수에 할당 불가.
""쉼표로 구분한 값의 목록을 사용하는 문맥에서만 사용 가능.""
(1) 함수 호출문의 인수 목록
(2) 배열 리터럴의 요소 목록
(3) 객체 리터럴의 프로퍼티 목록

571.
<함수 호출문의 인수 목록으로 사용>
배열을 펼쳐서 개별적인 값들의 목록으로 만든 후, 이를 함수의 인수 목록으로 전달할 때 사용.
'''
// 스프레드 문법 제공 이전에는 Function.prototype.apply를 사용했음
var arr = [1,2,3];
Math.max.apply(null, arr);	// 3

// 스프레드 문법
Math.max(1,2,3);	// 3
Math.max([1,2,3]);	// NaN
Math.max(...[1,2,3]);	// 3
'''

cf. Rest 파라미터는 함수에 전달된 개별 인수들의 목록을 배열로 전달받기 위해
매개 변수 이름 앞에 ...을 붙이는 것이므로 혼동하지 않도록 주의.
(Rest 파라미터와 스프레드 문법은 반대 개념에 가까움.)

572.
<배열 리터럴의 요소 목록으로 사용>
스프레드 문법을 배열 리터럴에서 사용하므로써 가독성을 높임.

(1) concat
'''
// ES5
var arr = [1,2].concat([3,4]);	// [1,2,3,4]

// ES6 이후
const arr = [...[1,2], ...[3,4]];	// [1,2,3,4]
'''

(2) splice : 배열 요소 변경
<tip> 배열의 중간에 다른 배열의 요소들을 추가하거나 제거하기 위해 사용.
<tip> 첫번째 인수는 배열의 변경을 시작할 인덱스, 두번째 인수는 삭제할 개수.
<tip> 세번째 인수로 배열을 전달하면 배열 자체가 추가됨.
'''
// ES5
var arr1 = [1,4];
var arr2 = [2,3];
arr1.splice(1,0,arr2);	// [1,[2,3],4]

// 따라서 [1,2,3,4]를 만드려면 Function.prototype.apply 메서드를 사용해야 함.
var arr3 = [1,4];
var arr4 = [2,3];
Array.prototype.splice.apply(arr3, [1,0].concat(arr2));

// ES6
const arr1 = [1,4];
const arr2 = [2,3];
arr1.splice(1, 0, ...arr2);	// [1,2,3,4]
'''

(3) slice : 배열 복사
<tip> 어떤 배열의 begin부터 end 이전까지 얕은 복사본을 새로운 배열 객체로 반환.
'''
// ES5
var originalArr = [1,2];
var copyArr = originalArr.slice();	// 주소값을 공유하지 않음
console.log(originalArr === copyArr);	// false

// ES6
const originalArr = [1,2];
const copyArr = [...originalArr];	// 주소값을 공유하지 않음
console.log(originalArr === copyArr);	// false
'''

(4) 이터러블을 배열로 반환
<tip> ES5까지는 '이터러블' 및 '이터러블이 아닌 유사 배열 객체'를 배열로 변환하려면,
<tip> apply()나 call()을 사용해 slice를 호출해야 했음.
'''
// ES5
function sum() {
	var args = Array.prototype.slice.call(arguments);
	return args.reduce(function(pre, cur) {
		return pre+cur;
	}, 0);
}

const arrayLike = {
	0:1, 1:2, 2:3, length:3
};
const arr = Array.prototype.slice.call(arrayLike);

// ES6 : 스프레드 문법 사용 시 간결한 표현 가능
function sum() {
	return [...arguments].reduce((pre,cur)=>pre+cur, 0);
}

// 사실 위보다 나은 방법은 Rest 파라미터를 사용하는 것
// args는 전달된 인수들의 목록을 배열로 받음
const sum = (...args) => args.reduce((pre,cur)=>pre+cur, 0);
'''

cf. 이터러블이 아닌 유사 배열 객체를 배열로 변경하려면 Array.from 메서드 사용.

573.
<객체 리터럴의 프로퍼티 목록으로 사용>
""스프레드 프로퍼티""
원래는 이터러블이어야 스프레드 문법 사용이 가능하지만,
일반 객체를 대상으로 스프레드 사용을 허락하도록 하는 것이 stage4 단계에 있음.
'''
// 스프레드 프로퍼티 도입 이전
// Object.assign 메서드를 사용해 여러 개의 객체를 병합하거나
// 특정 프로퍼티를 변경 또는 추가함
const merged = Object.assign({}, {x:1, y:2}, {y:10, z:3});
console.log(merged);	// {x:1, y:10, z:3}

// 스프레드 프로퍼티 도입 이후
const obj = {x:1, y:2};
const copy = {...obj};
console.log(copy);	// {x:1, y:2}

const merged = {x:1, y:2, ...{a:3,b:4}};
console.log(merged);	// {x:1, y:2, a:3, b:4}

// Object.assign 메서드를 대체할 수 있는 스프레드 프로퍼티
const merged = {...{x:1, y:2}, ...{y:10, z:3}};
console.log(merged);	// {x:1, y:10, z:3}

const changed = {...{x:1, y:2}, y:100};
// changed = {...{x:1, y:2}, {y:100}};

const added = {...{x:1, y:2}, z:0};
// added = {...{x:1, y:2}, ...{z:0}};
'''
*/