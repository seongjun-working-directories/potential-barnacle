/*
149.
함수 객체의 프로퍼티를 확인하는 방법.
'''
function square(number) {
    return number * number;
}

console.dir(square);
console.log(Object.getOwnPropertyDescriptors(square));

// Object
// arguments: {value: null, writable: false, enumerable: false, configurable: false}
// caller: {value: null, writable: false, enumerable: false, configurable: false}
// length: {value: 1, writable: false, enumerable: false, configurable: true}
// name: {value: "square", writable: false, enumerable: false, configurable: true}
// prototype: {value: {…}, writable: true, enumerable: false, configurable: false}
// __proto__: Object
'''

150.
arguments, caller, length, name, prototype 프로퍼티는 모두 함수 객체의 데이터 프로퍼티.
다만, __proto__는 함수 객체의 고유 프로퍼티가 아닌,
Object.prototype 객체의 프로퍼티를 상속 받은 것.

151.
arguments 객체
함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체.
'''
function multiply(x, y) {
    console.log(arguments);
    return x*y;
}
console.log(multiply(1));       // {1}      // NaN
console.log(multiply(1,2));     // {1,2}    // 2
console.log(multiply(1,2,3));   // {1,2,3}  // 2
'''

152.
arguments 객체의 Symbol(Symbol.iterator) 프로퍼티는
arguments 객체를 순회 가능한 자료구조인 이터러블(Iterable)로 만들기 위한 프로퍼티임.
'''
function multiply(x, y) {
    let i;
    const iterator = arguments[Symbol.iterator]();

    // iterator의 next 메서드를 호출하여, 이터러블 객체 arguments를 순회.
    while((i = iterator.next()).value) {
        counter++;
        console.log(i);
    }

    return x*y;
}
multiply(1,2,3);

// Object {value:1, done:false}
// Object {value:2, done:false}
// Object {value:3, done:false}
'''

153.
arguments 객체는 가변 인자 함수 구현 시 유용.
'''
function sum() {
    let result = 0;
    for(let i=0; i<arguments.length; i++) {
        result += arguments[i];
    }
    return res;
}
'''

154.
유사 배열 객체가 표준 배열 메서드를 사용하기 위해서는,
Function.prototype.call, Function.prototype.apply를 사용해야 함.
'''
function sum() {
    const arr = Array.prototype.slice.call(arguments);
    return array.reduce(function (pre, cur) {
        return pre + cur;
    }, 0);
}

// 위의 번거로움을 해결하기 위해, ES6부터 Rest 파라미터가 도입됨.
function sum(...args) {
    return args.reduce((pre, cur) => pre+cur, 0);
} 
'''

155.
caller 프로퍼티는 함수 자신을 호출한 함수를 가리킴.(비표준 프로퍼티)
'''
function foo(func) {
    return func();
}

function bar() {
    return `caller: ${bar.caller}`;
}

console.log(foo(bar));
console.log(bar());
'''

156.
함수 객체의 length 프로퍼티는 함수를 정의할 때 선언한 매개변수의 개수를 가리킴.

157.
함수 객체의 name 프로퍼티는 함수 이름을 나타냄.

158.
__proto__ 프로퍼티는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에
접근하기 위해 사용하는 접근자 프로퍼티.
'''
const obj = {a:1};
console.log(obj.__proto__ === Object.prototype);    // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인
// Object.prototype의 프로퍼티를 상속 받음.
console.log(obj.hasOwnProperty('a'));
console.log(obj.hasOwnProperty('__proto__'));
'''

cf.
hasOwnProperty 메서드는 인수로 전달받은 프로퍼티 키가
객체의 고유 프로퍼티 키인 경우에만 true를 반환하고,
상속 받은 프로토타입의 프로퍼티 키인 경우 false를 반환.

159.
prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때,
생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킴.
'''
(function() {}).hasOwnProperty('prototype');    // true
({}).hasOwnProperty('prototype');   // false
'''
prototype 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체,
즉, constructor만이 소유하는 프로퍼티.
일반 객체와 생성자 함수로 호출할 수 없는 non-constructor에는 prototype 프로퍼티가 없음.
*/
