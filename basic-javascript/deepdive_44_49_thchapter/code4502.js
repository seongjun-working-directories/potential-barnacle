/*
18.
비동기 처리에서 발생한 에러는
then 메서드의 두 번째 콜백 함수로 처리 가능.
'''
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

promiseGet(wrongUrl).then(
    res => console.log(res),
    err => console.error(err)
);
'''

19.
비동기 처리에서 발생한 에러는 catch 메서드를 사용해 처리 가능.
'''
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

promiseGet(wrongUrl)
    .then(res=>console.log(res))
    .catch(err=>console.log(err));
'''

catch 메서드를 모든 then 메서드를 호출한 이후에 호출하면
비동기 처리에서 발생한 에러(rejected)뿐만 아니라
then 메서드 내부에서 발생한 에러까지 모두 캐치 가능.
따라서, 에러 처리는 then 대신 catch를 권장.

20.
<프로미스 체이닝(Promise Chaining)>
then, catch, finally 후속 처리 메서드는 언제나 프로미스를 반환하므로,
연속적으로 호출할 수 있음.
'''
const url = 'https://jsonplaceholder.typicode.com';

promiseGet(`${url}/posts/1`)
    .then(({userId})=>promiseGet(`${url}/users/${userId}`))
    .then(userInfo=>console.log(userInfo))
    .catch(err=>console.error(err));
'''

21.
async/await을 사용하면 프로미스의 후속 처리 메서드 없이
마치 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현 가능.

22.
프로미스(Promise)는 5가지 정적 메서드를 제공함.
-> resolve, reject, all, race, allSettled

23.
< Promise.resolve / Promise.reject >
Promise.resolve와 Promise.reject 메서드는
이미 존재하는 값을 래핑하여 프로미스를 생성하기 위해 사용.

(1) resolve는 인수로 전달받은 값을 resolve하는 프로미스를 생성.
'''
const resolvedPromise = Promise.resolve([1,2,3]);
// const resolvedPromise = new Promise(resolve=>resolve([1,2,3]));
resolvedPromise.then(console.log); // [1,2,3]
'''

(2) reject는 인수로 전달받은 값을 reject하는 프로미스 생성.
'''
const rejectedPromise = Promise.reject(new Error('Error!'));
// const rejectedPromise = new Promise(
//    (_, reject)=>reject(new Error('Error!))
// );
rejectedPromise.catch(console.log); // Error: Error!
'''

24.
< Promise.all >
여러 개의 비동기 처리를 모두 병렬 처리할 때 사용.
'''
const requestData1 = () =>
    new Promise(resolve=>setTimeout(()=>resolve(1), 3000));
const requestData2 = () =>
    new Promise(resolve=>setTimeout(()=>resolve(2), 2000));
const requestData3 = () =>
    new Promise(resolve=>setTimeout(()=>resolve(3), 1000));

// 세 개의 비동기 처리를 순차적으로 처리
// 그런데 세 개의 비동기 처리는 서로 의존하지 않고 개별적으로 수행됨
// 따라서, 세 개의 비동기 처리를 순차적으로 처리할 필요가 없음.
const res = [];
requestData1()
    .then(data=>{res.push(data); return requestData2();})
    .then(data=>{res.push(data); return requestData3();})
    .then(data=>{res.push(data); console.log(res);})
    .catch(console.error);
// 6초 소요

// 여러 개의 비동기 처리를 모두 병렬 처리
// Promise.all의 매개변수는 프로미스를 요소로 갖는 이터러블이어야 함
// 전달 받은 모든 프로미스가 모두 fulfilled 상태가 되면
// 모든 처리 결과를 배열에 저장해 새로운 프로미스를 반환
Promise.all([requestData1(), requestData2(), requestData3()])
    .then(console.log)  // [1,2,3]
    .catch(console.error);
// 3초 소요
'''
단, 첫 번째 프로미스가 가장 나중에 fulfilled 상태가 되더라도,
Promise.all 메서드는 첫 번째 프로미스가 resolve한 처리 결과부터
차례대로 배열에 저장해 그 배열을 resolve하는 새로운 프로미스를 반환.
즉, 처리 순서가 보장됨.

Promise.all 메서드는 인수로 전달받은 배열의 프로미스가 하나라도
rejected 상태가 되면, 나머지 프로미스가 fullfilled 상태가 되는 것을
기다리지 않고 즉시 종료한 뒤, 에러를 낸 프로미스에 대해 reject한 에러를
catch 메서드로 전달함.

25.
Promise.all 메서드는 인수로 전달받은 이터러블의 요소가 프로미스가 아닌 경우,
Promise.resolve 메서드를 통해 프로미스를 래핑함.
'''
Promise.all([
    1,  // Promise.resolve(1)
    2,  // Promise.resolve(2)
    3   // Promise.resolve(3)
])
    .then(console.log)
    .catch(console.error);
'''

26.
깃허브 아이디로 깃허브 사용자 이름을 취득하는 3개의 비동기 처리를
모두 병렬로 처리하는 예제.
'''
const promiseGet = url => {
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onload = ()=>{
            if(xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            }
            else {
                reject(new Error(xhr.status));
            }
        };
    });
};

const githubIds = ['jeresig', 'ahejlsberg', 'DoflaCode'];

Promise.all(githubIds.map(id=>promiseGet(`https://api.github.com/users/${id}`)))
    .then(users=>users.map(user=>user.name))
    .then(console.log)
    .catch(console.error);
'''

27.
< Promise.race >
프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달 받음.
Promise.all 처럼 모든 프로미스가 fulfilled 상태가 되는 것을 기다리는 것이 아닌,
가장 먼저 fulfilled 상태가 된 프로미스의 처리 결과를 resolve하는
새로운 프로미스를 반환.
'''
Promise.race([
    new Promise(resolve=>setTimeout(()=>resolve(1), 3000)),
    new Promise(resolve=>setTimeout(()=>resolve(2), 2000)),
    new Promise(resolve=>setTimeout(()=>resolve(3), 1000))
])
    .then(console.log)  // 3
    .catch(console.error);
'''

대신 프로미스가 rejected 상태가 되면 Promise.all 과 동일하게 동작.
즉, Promise.race도 전달된 프로미스가 하나라도 rejected 상태가 되면,
에러를 reject하는 새로운 프로미스를 즉시 반환.
'''
Promise.race([
    new Promise((_, reject)=>setTimeout(()=>reject(new Error('1')), 3000)),
    new Promise((_, reject)=>setTimeout(()=>reject(new Error('2')), 2000)),
    new Promise((_, reject)=>setTimeout(()=>reject(new Error('3')), 1000))
])
    .then(console.log)
    .catch(console.error);  // Error: 3
'''

28.
< Promise.allSettled >
프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받음.
전달받은 프로미스가 모두 settled 상태가 되면 처리결과를 배열로 반환.
(settled : 비동기 처리가 수행된 상태, 즉 fulfilled 또는 rejected)
'''
Promise.allSettled([
    new Promise(resolve=>setTimeout(()=>resolve(1), 2000)),
    new Promise((_, reject)=>setTimeout(()=>reject(new Error('2')), 1000))
]).then(console.log);
'''

Promise.allSettled가 인수로 전달받은 모든 프로미스의
처리 결과를 담은 배열을 반환.
(1) fulfilled 상태는 value 프로퍼티를 가짐.
(2) rejected 상태는 reasone 프로퍼티를 가짐.

29.
<마이크로태스크 큐>
'''
setTimeout(()=>console.log(1), 0);

Promise.resolve()
    .then(()=>console.log(2))
    .then(()=>console.log(3));

// RESULT: 2 3 1
'''
위와 같은 결과가 나오는 이유는,
프로미스의 후속 처리 메서드의 콜백 함수는 태스크 큐가 아닌
마이크로태스크 큐(Microtask Queue, Job Queue)에 저장되기 때문.

마이크로태스크 큐는 태스크 큐와 별도의 큐로,
프로미스의 후속 처리 메서드의 콜백 함수가 일시 저장되는 공간임.
마이크로태스크 큐는 태스크 큐보다 우선 순위가 높음.
즉, 이벤트 루프는 콜 스택이 비게 되면, 마이크로태스크 큐를 먼저 가져와 실행.

30.
<fetch>
XMLHttpRequest와 마친가지로
HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API.

fetch 함수는 프로미스를 지원하며,
HTTP 요청을 전송할 URL, HTTP 요청 메서드, HTTP 요청 헤더, 페이로드
등을 설정한 객체를 전달.
-> const promise = fetch(url [, options])

fetch 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환.
'''
// fetch 함수로 GET 요청
// 첫 번째 인수로 HTTP 요청을 전송할 URL만 전달하면 GET 요청 전송
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response=>console.log(response));
'''
// then 메서드는 프로미스가 resolve한 Response 객체를 전달받음.

31.
Response 객체는 HTTP 응답을 나타내는 다양한 프로퍼티 제공.
Response.prototype에는 Response 객체에 포함되어 있는
HTTP 응답 몸체를 위한 다양한 메서드를 제공.

32.
<Response.prototype.json>
Response 객체에서 HTTP 응답 몸체를 취득해 역직렬화함.

fetch 함수가 반환한 프로미스가 래핑하고 있는 MIME 타입이
application/json인 HTTP 응답 몸체 취득을 위한 예제.
'''
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response.response.json())
    .then(json=>console.log(json));
'''

33.
fetch 함수 사용 시 에러 처리에 주의.
'''
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

fetch(wrongUrl)
    .then(()=>console.log('ok'))
    .catch(()=>console.log('error'));

// RESULT : ok
'''

fetch 함수가 반환하는 프로미스는 404 NOT FOUND나
500 INTERNAL SERVER ERROR와 같은 HTTP 에러가 발생해도
에러를 reject하지 않고 불리언 타입의 ok 상태를 false로 설정한
Response 객체를 resolve함.

"fetch 함수는 오프라인 등의 네트워크 장애나 CORS 에러에 의해
요청이 완료되지 못한 경우에만 프로미스를 reject함."
'''
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

fetch(wrongUrl)
    .then(response=> {
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    })
    .then(todo=>console.log(todo))
    .catch(err=>console.log(err));
'''

34.
axios(node.js와 브라우저를 위한 Promise 기반 HTTP 클라이언트)는
모든 HTTP 에러를 reject하는 프로미스를 반환.
따라서 에러를 catch에서 처리할 수 있어 편리함.
또한 axios는 인터셉터, 요청 설정 등 fetch보다 다양한 기능 지원.

35.
fetch 함수를 통해 HTTP 요청하기.
fetch 함수에 첫 번째 인수로 HTTP 요청을 전송할 URL,
두 번째 인수로 HTTP 요청 메서드, HTTP 요청 헤더, 페이로드 등을 설정한 객체 전달.
'''
const request = {
    get(url) {
        // fetch() 함수는 첫번째 인자로 URL,
        // 두번째 인자로 옵션 객체를 받고,
        // Promise 타입의 객체를 반환.
        // 반환된 객체는, API 호출이 성공했을 경우에는
        // 응답(response) 객체를 resolve하고,
        // 실패했을 경우에는 예외(error) 객체를 reject함.
        return fetch(url);
    },
    // patch는 리소스를 부분 수정할 때 사용.
    patch(url, payload) {
        return fetch(url, {
            method:'PATCH',
            headers:{'content-Type':'application/json'},
            body:JSON.stringify(payload)
        });
    },
    delete(url) {
        return fetch(url, {method:'DELETE'});
    }
};

// GET
request.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response=>{
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    })
    .then(response=>todos=>console.log(todos))
    .catch(err=>console.log(err));

// POST
request.post('https://jsonplaceholder.typicode.com/todos', {
    userId: 1,
    title: 'javascript',
    completed: false
})
    .then(response=>{
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    })
    .then(todos=>console.log(todos))
    .catch(err=>console.log(err));

// PATCH
request.patch('https://jsonplaceholder.typicode.com/todos/1', {
    completed: true
})
    .then(response=>{
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    })
    .then(todos=>console.log(todos))
    .catch(err=>console.log(err));

// DELETE
request.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(response=>{
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    })
    .then()
    .catch(err=>console.log(err));

'''
*/