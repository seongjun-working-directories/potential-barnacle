/*
1.
비동기 처리를 위한 전통적인 콜백 패턴은
(1) 가독성이 나쁘고,
(2) 비동기 처리 중 발생한 에러의 처리가 곤란하며,
(3) 여러 개의 비동기 처리를 동시에 하는데 한계가 존재.

프로미스(Promise)는 비동기 처리를 위한 또 다른 패턴으로,
전통적인 콜백 패턴의 단점을 보완.
또한, 비동기 처리 시점을 명확히 표현 가능.

2.
비동기 처리를 위한 콜백 패턴의 단점 1 - 콜백 헬
<콜백 헬(Callback Hell)>
콜백 함수를 통해 비동기 처리 결과에 대한 후속 처리르 수행하는
비동기 함수가 비동기 처리 결과를 가지고 또 다시 비동기 함수를
호출해야 한다면 콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상.

'''
// 서버의 응답결과를 콘솔에 출력
const get = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    // onload가 비동기로 동작함.
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.response));
        }
        else {
            console.error(`${xhr.status}, ${xhr.statusText}`);
        }
    };
};

get('https://jsonplaceholder.typicode.com/posts/1');
'''
위 예제의 get은 비동기 함수로, 비동기로 동작하는 코드를 포함.
비동기 함수 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 이후에 완료됨.
따라서, 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를
외부로 반환하거나 상위 스코프의 변수에 할당하면 기대처럼 동작하지 않음.
'''
let g = 0;

setTimeout(()=>{g=100;}, 0);
console.log(g); // 0
'''

3.
위의 get 함수가 서버의 응답 결과를 반환하도록 하려면,
아래와 같이 수정해야 함.
'''
const get = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            return JSON.parse(xhr.response);
        }
        console.error(`${xhr.status}, ${xhr.statusText}`)'
    };
};

const response = get('https://jsonplaceholder.typicode.com/posts/1');
console.log(response);
'''
주의할 점은 JSON.parse(xhr.response)는 get 함수의 반환문이 아닌,
onload 이벤트 핸들러의 반환문임.
따라서, get 함수는 return 문을 설정하지 않았으므로 undefined가 할당됨.

4.
서버의 응답을 상위 스코프 변수에 할당해도 기대처럼 동작하지 않음.
onload 이벤트 핸들러 프로퍼티에 바인딩한 이벤트 핸들러는
console.log가 종료된 이후에 호출되기 때문임.
'''
let todos;

const get = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            todos = JSON.parse(xhr.response);
        }
        else {
            console.error(`${xhr.status}, ${xhr.statusText}`);
        }
    };
};

get('https://jsonplaceholder.typicode.com/posts/1');
console.log(todos);
'''
주의할 점은, xhr.onload 이벤트 핸들러는 load 이벤트가 발생하면
일단 태스크 큐에 저장되어 대기하다가, 콜 스택이 비면
이벤트 루프에 의해 콜 스택으로 푸시되어 실행됨.

5.
비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없으며,
상위 스코프의 변수에 할당할 수도 없음.
따라서, 비동기 함수의 처리 결과에 대한 후속 처리는
비동기 함수 내부에서 수행되어야 함.
이때 비동기 함수를 범용적으로 사용하기 위해
비동기 함수에 비동기 처리 결과에 대한 후속 처리를 수행하는
콜백함수를 전달하는 것이 일반적임.
필요에 따라 비동기 처리가 성공하면 호출될 콜백 함수와
비동기 처리가 실패하면 호출될 콜백 함수를 전달할 수 있음.
'''
const get = (url, successCallback, failureCallback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            successCallback(JSON.parse(xhr.response));
        }
        else {
            failureCallback(xhr.status);
        }
    };
};

get('https://jsonplaceholder.typicode.com/posts/1',
console.log, console.error);
'''

6.
콜백 헬의 전형적인 예제.
'''
const get = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            callback(JSON.parse(xhr.response));
        }
        else {
            console.error(`${xhr.status}, ${xhr.statusText}`);
        }
    };
};

const url = 'https://jsonplaceholder.typicode.com';

get(`${url}/posts/1`, ({userId})=> {
    console.log(userId);    // 1
    // post의 userId를 사용해 user 정보 취득
    get(`${url}/users/${userId}`, userInfo=> {
        console.log(userInfo);
    });
});
'''

7.
비동기 처리를 위한 콜백 패턴의 단점 2 - 에러 처리의 한계
'''
try {
    setTimeout(()=>{
        throw new Error('Error!');
    }, 1000);
}
catch(e) {
    // 에러를 캐치하지 못함
    console.error('캐치한 에러', e);
}
'''
에러는 호출자(Caller) 방향으로 전파되므로 콜 스택의 아래 방향
(실행 중인 실행 컨텍스트가 푸쉬되기 이전에 푸쉬된 실행 컨텍스트 방향)
으로 전파됨.

8.
Promise는 new 연산자와 함께 호출하여 객체를 생성함.
Promise 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달받음.
이 콜백 함수는 resolve와 reject 함수를 인수로 전달받음.
'''
const promise = new Promise((resolve, reject)=> {
    const isSuccessed = true;
    if(isSuccessed) {
        // 비동기 처리 성공 시
        resolve('result');
    }
    else {
        // 비동기 처리 실패 시
        reject('failure reason');
    }
});
'''

9.
Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서
비동기 처리를 수행하며, 비동기 처리가 성공하면 resolve 함수를 호출하고,
비동기 처리에 실패할 경우 reject 함수를 호출함.
'''
const promiseGet = url => {
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            }
            else {
                reject(new Error(xhr.status));
            }
        };
    });
};

promiseGet('https://jsonplaceholder.typicode.com/posts/1');
'''

10.
<Promise의 상태 정보, Status>
프로미스는 현재 비동기 처리가 어떻게
진행되고 있는지를 나타내는 상태 정보를 가짐.
fulfilled 또는 rejected 상태를 settled 상태라고 함.
일단 settled 상태가 되면 더는 다른 상태로 변화할 수 없음.
<프로미스의 상태 정보>  <의미>                              <상태 변경 조건>
pending                비동기 처리가 수행되지 않음          프로미스 생성 직후
fulfilled              비동기 처리가 성공적으로 수행됨      resolve 함수 호출
rejected               비동기 처리에 실패함                reject 함수 호출



11.
<Promise의 결과 정보, Result>
'''
const fulfilled = new Promise(resolve => resolve(1));
const rejected = new Promise((_, reject) =>
    reject(new Error('Error occcured'))
);
'''
비동기 처리가 성공하면 프로미스는 pending 상태에서 fulfilled 상태로 변화.
그리고 비동기 처리 결과인 1을 값으로 가짐.
비동기 처리가 실패하면 프로미스는 pending 상태에서 rejected 상태로 변화.
그리고 비동기 처리 결과인 Error 객체를 값으로 가짐.

12.
프로미스(Promise)는 비동기 처리 상태와 처리 결과를 관리하는 객체.

13.
프로미스의 비동기 처리 상태가 변화하면 이에 대한 후속 처리가 필요함.
이를 위해 프로미스는 후속 메서드 then, catch, finally를 제공.
프로미스의 비동기 처리 상태가 변화하면,
후속 처리 메서드에 인수로 전달한 콜백 함수가 선택적으로 호출됨.
모든 후속 처리 메서드는 프로미스를 반환하며 비동기로 동작.

14.
<Promise.prototype.then>
then 메서드는 두 개의 콜백 함수를 인수로 전달받음.
(1) 프로미스가 fulfilled 상태가 되면 호출될 콜백 함수.
이때 콜백 함수는 프로미스의 비동기 처리 결과를 인수로 전달받음.
(2) 프로미스가 rejected 상태가 되면 호출될 콜백 함수.
이때 콜백 함수는 프로미스의 에러를 인수로 전달받음.
'''
new Promise(resolve => resolve('fulfilled'))
    .then(v=>console.log(v), e=>console.error(e));

new Promise((_, reject) => reject(new Error('rejected')))
    .then(v=>console.log(v), e=>console.error(e));
'''
then은 언제나 프로미스를 반환하고, 콜백 함수가 프로미스가 아닌 값을 반환하면,
그 값을 암묵적으로 resolve 또는 reject하여 프로미스를 생성해 반환함.

15.
<Promise.prototype.catch>
catch 메서드는 한 개의 콜백 함수를 인수로 전달받음.
catch 메서드의 콜백 함수는 프로미스가 rejected 상태인 경우만 호출.
'''
new Promise((_, reject) => reject(new Error('rejected')))
    .catch(e=>console.log(e));
'''
catch는 then(undefined, onRejected)과 동일하게 동작.

16.
<Promise.prototype.finally>
finally 메서드는 한 개의 콜백 함수를 인수로 전달받음.
finally 메서드의 콜백 함수는 프로미스의 성공 또는 실패와 상관없이
무조건 한 번 호출됨.
'''
new Promise(()=>{})
    .finally(()=>console.log('finally'));
'''

17.
프로미스로 구현한 비동기 함수 get을 사용한 후속 처리 구현.
'''
const promiseGet = url => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            }
            else {
                reject(new Error(xhr.status));
            }
        }
    });
};

promiseGet('https://jsonplaceholder.typicode.com/posts/1')
    .then(res=>console.log(res));
    .catch(err=>console.error(err));
    .finally(()=>console.log('Bye~'));
'''
*/