/*
1.
<제너레이터(Generator)>
코드 블록을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수 함수.

2.
제너레이터의 특징
(1) 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도 가능.
(2) 제너레이터 함수는 함수 호출자와 함수의 상태를 주고 받을 수 있음.
-> 함수가 실행되는 동안 함수 외부에서 내부로 값을 전달해 함수 상태 변경 가능.
(3) 제너레이터 함수를 호출하면 제너레이터 객체를 반환.
-> 제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니고,
-> 이터러블이면서 동시에 이털이터인 제너레이터 객체를 반환.

3.
제너레이터 함수는 'function*' 키워드로 선언.
하나 이상의 yield 포현식을 포함.
'''
function* genDecFunc() {
    yield 1;
}

const genExpFunc = function* () {
    yield 1;
};

const obj = {
    * genObjMethod() {
        yield 1;
    }
};

class MyClass {
    * genClassMethod() {
        yield 1;
    }
}
'''

4.
제너레이터 함수는 화살표 함수로 정의할 수 없고,
new 연산자와 함께 생성자 함수로 호출할 수 없음.

5.
제너레이터 호출 시 함수 코드를 실행하는 것이 아닌,
이터러블이면서 동시에 이터레이터인 제너레이터 객체를 반환.
'''
function* genFunc() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = genFunc();

console.log(Symbol.iterator in gen);    // true
console.log('next' in gen); // true
'''

6.
제너레이터는 return, throw 메서드를 가지고 있음.
(1) next 메서드를 호출 시
제너레이터 함수의 yield 표현식까지 코드 블록을 실행하고,
yield된 값을 value 프로퍼티 값으로,
false를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체 반환.

(2)
return 메서드를 호출 시
인수로 전달받은 값을 value 프로퍼티 값으로,
true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체 반환.

(3)
throw 메서드 호출 시
인수로 전달받은 에러를 발생시키고, undefined를 value 프로퍼티 값으로,
true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체 반환.
'''
function* genFunc() {
    try {
        yield 1;
        yield 2;
        yield 3;
    }
    catch(e) {
        console.error(e);
    }
}

const gen = genFunc();
console.log(gen.next());    // {value:1, done:false}
console.log(gen.throw('Error:'));   // {value:undefined, done:true}
'''

7.

8.
<제너레이터의 일시 중지와 재개>
제너레이터는 yield와 next를 통해 실행을 일시 중지 후 필요 시점에 재개 가능.
제너레이터 함수는 호출 시 제너레이터 객체를 반환하고,
이렇게 반환된 제너레이터 객체의 next 메서드를 호출하므로써,
제너레이터 함수의 코드 블록을 실행함.
단, yield 표현식 까지만 실행.

yield 키워드는 제너레이터 함수의 실행을 일시 중지시키거나,
yield 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환.
'''
function* genFunc() {
    yield 1;
    yield 2;
    yield 3;
}
const generator = genFunc();
console.log(generator.next());
// 다시 next 메서드를 호출하면 두 번째 yield 표현식까지 실행하고 일시 중지.
// 이런 방식으로 제너레이터 함수의 마지막까지 실행되면,
// 제너레이터 객체가 반환한 이터레이터 리절트 객체는
// {value:undefined, done:true}를 가져서 함수의 끝을 알림.
'''

9.
제너레이터 객체의 next 메서드에는 인수를 전달할 수 있음.
제너레이터 객체의 next 메서드에 전달한 인수는
제너레이터 함수의 yield 표현식을 할당받는 변수에 할당됨.

yield 표현식을 할당받는 변수에 yield 표현식의 평가 결과가
할당되지 않는 것에 주의.
'''
function* genFunc() {
    // yield된 값은 next가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당
    // 즉, x 변수에는 아직 아무것도 할당되지 않음.
    // x 변수 값은 next 메서드가 두 번째 호출될 때 결정됨.
    const x = yield 1;

    // 두 번째 next 메서드를 호출할 때 전달한 인수 10은
    // 첫 번째 yield 표현식을 할당받는 x 변수에 할당.
    // 이후에, yield 된 x+10은
    // next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당됨.
    const y = yield (x+10);

    // 세 번째 next 메서드를 호출하면
    // 전달된 인수 20이 두 번째 yield 표현식을 할당받는 y 변수에 할당됨.
    // 세 번째 next 메서드를 호출하면 더 이상 yield가 없으므로
    // 함수 끝까지 실행됨.
    // 이때 제너레이터 함수의 반환값 x+y는
    // next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당됨.
    // 일반적으로 제너레이터의 반환값은 의미가 없으므로
    // 제너레이터는 값을 반환할 필요가 없고 return은 종료의 의미로만 사용.
    return x+y;
}

const gen = genFunc(0);

let res = gen.next();
console.log(res);   // { value: 1, done: false }

res = gen.next(10);
console.log(res);   // { value: 20, done: false }

res = gen.next(20);
console.log(res);   // { value: 30, done: true }
'''

10.
제너레이터 함수를 사용한 이터러블 구현.
'''
// 무한 피보나치 수열 생성
// done 속성을 정의하지 않으므로써 구현
const infiniteFibonacci = (function() {
    let [pre, cur] = [0, 1];
    return {
        [Symbol.iterator]() { return this; },
        next() {
            [pre, cur] = [cur, pre+cur];
            return {value:cur};
        }
    };
})();

// 제너레이터를 사용한 무한 피보나치 수열 구현
const gen_infiniteFibonacci = (function* () {
    let [pre, cur] = [0, 1];
    while(true) {
        [pre, cur] = [cur, pre+cur];
        yield cur;
    }
})();
'''

11.
next, yield를 통해 함수 호출자와 함수의 상태를 주고받을 수 있음.
이를 통해, 프로미스를 사용한 비동기 처리를 동기 처리처럼 구현 가능.
즉, then/catch/finally 없이 비동기 처리 결과 반환하도록 구현 가능.
'''
// node-fetch는 Node.js에서 window.fetch 함수를 사용하기 위한 패키지
// https://github.com/node-fetch/node-fetch
const fetch = require('node-fetch');
const async = genFunc => {
    const gen = genFunc();
    const onResolved = arg => {
        const result = gen.next(arg);
        return result.done
            ? result.value
            : result.value.then(res=>onResolved(res));
    };
    return onResolved;
};

(async(function* fetchTodo() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const response = yield fetch(url);
    const todo = yield response.json();
    console.log(todo);
}))();
'''

12.
제너레이터 실행기가 필요하다면,
직접 구현하기보다는 co 라이브러리 사용 권장.
'''
const fetch = require('node-fetch');
https://github.com/tj/co
const co = require('co');

co(function* fetchTodo() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const response = yield fetch(url);
    const todo = yield response.json();
    console.log(todo);
});
'''

13.
< async/await >
비동기 처리를 동기 처리처럼 구현하도록 지원.
async/await은 프로미스를 기반으로 동작.
async/await을 사용하면 then/catch/finally를 사용할 필요 없이
마치 동기 처리처럼 프로미스를 사용 가능.
즉, 프로미스의 후속 처리 메서드 없이
마치 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현 가능.
'''
const fetch = require('node-fetch');

async function fetchTodo() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const response = await fetch(url);
    const todo = await response.json();
    console.log(todo);
}

fetchTodo();
'''

14.
await 키워드는 반드시 async 함수 내부에서 사용.
async 함수는 async 키워드로 정의, 언제나 프로미스를 반환.
명시적으로 반환하지 않더라도, 암묵적으로 반환값을 resolve한 프로미스 반환.
'''
async function foo(n) { return n; }
foo(1).then(v=>console.log(v)); // 1

const bar = async function(n) { return n; }
bar(2).then(v=>console.log(v)); // 2

const baz = async n => n;
baz(3).then(v=>console.log(v)); // 3

const obj = {
    async foo(n) { return n; }
};
obj.foo(4).then(v=>console.log(v)); // 4

class MyClass {
    async bar(n) { return n; }
}
const myClass = new MyClass();
myClass.bar(5).then(v=>console.log(v)); // 5
'''

15.
클래스의 constructor 메서드는 인스턴스를 반환해야 하는데,
async 메서드는 프로미스를 반환하므로 constructor가 될 수 없음.

16.
await 키워드는 프로미스가 settled 상태가 될 때까지 대기하다가
settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환.
await 키워드는 반드시 프로미스 앞에서 사용해야 함.
'''
const fetch = require('node-fetch');

const getGithubUserName = async id => {
    // fetch 함수가 반환한 프로미스가 settled 상태가 될 때까지
    // 대가하다가 프로미스가 settled 상태가 되면, 프로미스가
    // resolve한 처리 결과가 res 변수에 할당됨.
    const res = await fetch(`https://api.github.com/users/${id}`);
    const {name} = await res.json();
    console.log(name);
}

getGithubUserName('DoflaCode');
'''

17.
await 키워드는 다음 실행을 일시 중지시켰다가
프로미스가 settled 상태가 되면 다시 재개함.
'''
async function foo() {
    const a = await new Promise(resolve=>setTimeout(()=>resolve(1), 3000));
    const b = await new Promise(resolve=>setTimeout(()=>resolve(2), 2000));
    const c = await new Promise(resolve=>setTimeout(()=>resolve(3), 1000));
    console.log([a,b,c]);   // [1,2,3]
}
foo();  // 약 6초 소요

// 개별적으로 수행되는 3개의 함수이므로
// 앞선 비동기 처리가 완료될 때까지 대기해 순차적으로 처리할 필요가 없음.
// 따라서 foo 함수는 다음과 같이 수정되어야 함.
async function foo() {
    const res = await Promise.all([
        new Promise(resolve=>setTimeout(()=>resolve(1), 3000)),
        new Promise(resolve=>setTimeout(()=>resolve(2), 2000)),
        new Promise(resolve=>setTimeout(()=>resolve(3), 1000))
    ]);
    console.log(res);   // [1,2,3]
}
foo();  // 약 3초 소요
'''

18.
다음의 bar 함수는 앞선 비동기 처리의 결과가 다음 비동기 처리 수행에 필요하므로,
비동기 처리의 순서가 보장되도록 모든 프로미스에 await 키워드를 써서
순차적으로 처리할 수밖에 없음.
'''
async function bar(n) {
    const a = await new Promise(resolve=>setTimeout(()=>resolve(n), 3000));
    const b = await new Promise(resolve=>setTimeout(()=>resolve(a+1), 2000));
    const c = await new Promise(resolve=>setTimeout(()=>resolve(b+1), 1000));
    console.log([a,b,c]);   // [1,2,3]
}
bar(1); // 약 6초 소요
'''

19.
async/await은 try...catch문으로 에러 처리가 가능.
콜백 함수를 인수로 전달받는 비동기 함수와 달리,
프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 
호출자가 명확함.
'''
// fetch는 api를 불러오고, 정보를 내보내는 함수
const fetch = require('node-fetch');
const foo = async () => {
    try {
        const wrongUrl = 'https://wrong.url';
        
        const response = await fetch(wrongUrl);
        const data = await response.json();
        console.log(data);
    }
    catch(err) {
        console.error(err);
    }
};
foo();
'''

20.
async 함수 내에서 catch로 에러를 처리하지 않으면,
async 함수는 발생한 에러를 reject하는 프로미스를 반환함.
'''
const fetch = require('node-fetch');

const foo = async () => {
    const wrongUrl = 'https://wrong.url';

    const response = await fetch(wrongUrl);
    const data = await response.json();
    return data;
};

foo()
    .then(console.log)
    .catch(console.error);
'''
*/