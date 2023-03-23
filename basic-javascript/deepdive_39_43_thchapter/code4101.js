/*
1.
호출 스케줄링 :
함수를 명시적으로 호출하지 않고 일정 시간이 경과된 이후에 호출되도록
함수 호출을 예약하려면 타이머 함수를 사용함.

2.
<타이머 함수>
자바스크립트의 타이머 생성 함수 : setTimeout, setInterval
-> 일정 시간이 경과된 이후 콜백 함수가 호출되도록 타이머를 생성.
-> setTimeout은 단 한 번 동작하고, setInterval은 반복 동작함.

자바스크립트의 타이머 제거 함수 : clearTimeout, clearInterval

3.
타이머 함수는 호스트 객체임.

4.
자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 가지므로,
두 개 이상의 테스크 동시 실행 불가.(싱글 스레드)
따라서, setTimeout과 setInterval은 비동기 처리 방식으로 동작.

5.
< setTimeout / clearTimeout >
setTimeout은 두 번째 인수로 전달받은 시간(ms)으로 단 한 번 동작하는 타이머 생성.
타이머 만료 시, 첫 번째 인수로 전달받은 콜백 함수 호출.
ex) const timeoutId = setTimeout(func|code[, delay, param1, param2, ...]);
-> param1, param2는 콜백 함수에 전달해야 할 인수가 있는 경우 사용.
'''
setTimeout(()=>console.log('Hi!'), 1000);
setTimeout(name=>console.log(`Hi! ${name}.`), 1000, 'Lee');
setTimeout(()=>console.log('Hello~'));  // 두번째 인수 생략 시 기본값은 0
'''

setTimeout은 생성된 타이머를 식별할 수 있는 고유한 타이머 id 반환.
-> 브라우자: 숫자, Node.js: 객체

setTimeout의 타이머 id를 clearTimeout 함수의 인수로 전달해 타이머 취소 가능.
타이머가 취소될 경우 setTimeout 함수의 콜백 함수는 실행되지 않음.
'''
const timerId = setTimeout(()=>console.log('Hello'), 10000);
clearTimeout(timerId);
'''

6.
< setInterval / clearInterval >
setInterval은 두 번째 인수로 전달받은 시간(ms)으로 반복 동작하는 타이머 생성.
타이머가 만료될 때마다, 첫 번째 인수로 전달받은 콜백 함수 반복 호출.
두 번째 인수로 전달받은 시간이 경과할 때마다 반복 실행되도록 호출 스케줄링됨.
ex) const timerId = setInterval(func|code[,delay, param1, param2, ...]);

setInterval은 생성된 타이머를 식별할 수 있는 고유한 타이머 id 반환.

setInterval의 타이머 id를 clearInterval 함수의 인수로 전달해 타이머 취소 가능.
타이머가 취소될 경우 setInterval 함수의 콜백 함수는 실행되지 않음.
'''
let count = 1;

const timeoutId = setInterval(() => {
    if(count++ > 5) clearInterval(timeoutId);
    console.log(count);
}, 1000);
'''

7.
<디바운스와 스로틀>
디바운스와 스로틀은 짧은 시간 간격으로 연속해서 발생하는 이벤트를
그룹화해서 과도한 이벤트 핸들러의 호출을 방지하는 프로그래밍 기법.
'''
<!doctype html>
<html>
<!--
버튼을 짧은 시간 간격으로 연속해서 클릭했을 때,
일반/디바운스/스로틀 이벤트 핸들러의 호출 빈도 비교.
즉, 일반적인 이벤트 핸들러는 버튼을 빠르게 누르면 누른 만큼 수치가 올라가지만,
디바운스나 스로틀된 이벤트 핸들러는 누르는 그대로를 반응하지는 않음.
-->
<body>
    <button>click me</button>
    <pre>일반 클릭 이벤트 카운터   <span class="normal-msg">0</span></pre>
    <pre>디바운스 클릭 이벤트 카운터   <span class="debounce-msg">0</span></pre>
    <pre>스로틀 클릭 이벤트 카운터   <span class="throttle-msg">0</span></pre>
    <script>
        const $button = document.querySelector('button');
        const $normalMsg = document.querySelector('.normal-msg');
        const $debounceMsg = document.querySelector('.debounce-msg');
        const $throttleMsg = document.querySelector('.throttle-msg');

        const debounce = (callback, delay) => {
            let timerId;
            return event => {
                if(timerId) clearTimeout(timerId);
                timerId = setTimeout(callback, delay, event);
            };
        };

        const throttle = (callback, delay) => {
            let timerId;
            return event => {
                if (timerId) return;
                timerId = setTimeout(() => {
                    callback(event);
                    timerId = null;
                }, delay, event);
            };
        };

        $button.addEventListener('click', () => {
            $normalMsg.textContent = +$normalMsg.textContent + 1;
        });
        $button.addEventListener('click', debounce(()=> {
            $debounceMsg.textContent = +$debounceMsg.textContent + 1;
        }, 500));
        $button.addEventListener('click', throttle(()=> {
            $throttleMsg.textContent = +$throttleMsg.textContent + 1;
        }, 500));
    </script>
</body>
</html>
'''

8.
디바운스(debounce)
짧은 시간 간격으로 이벤트가 연속해서 발생하면, 이벤트 핸들러를 호출하지 않다가
일정 시간이 경과한 후 이벤트 핸들러가 한 번만 호출되도록 함.
즉, 짧은 시간 간격으로 발생한 이벤트를 그룹화해 마지막 한 번만 호출.
'''
<!doctype html>
<html>
<body>
    <input type="text">
    <div class="msg"></div>
    <script>
        // Document.querySelector()
        // -> 제공한 CSS 선택자 또는 선택자 뭉치와 일치하는 첫 번째 Element를 반환.
        const $input = document.querySelector('input');
        const $msg = document.querySelector('.msg');

        const debounce = (callback, delay) => {
            // debounce 함수는 timerId를 기억하는 클로저 반환.
            let timerId;
            return event => {
                // delay가 경과하기 이전에 이벤트가 발생하면,
                // 이전 타이머를 취소하고 새로운 타이머를 재설정.
                if (timerId) clearTimeout(timerId);
                // 콜백 함수, 설정한 시간, 콜백 함수의 매개변수 순.
                timerId = setTimeout(callback, delay, event);
            };
        };

        // oninput 이벤트 속성 :
        // 사용자가 요소에 정보를 입력하거나 요소의 값이 변경되면 실행되는 속성.
        $input.oninput = debounce(e=>{
            $msg.textContent = e.target.value;
        }, 300);
    </script>
</body>
</html>
'''

9.
스로틀(throttle)
짧은 시간 간격으로 이벤트가 연속해서 발생하더라도,
일정 시간 간격으로 이벤트 핸들러가 최대 한 번만 호출되도록 함.
즉, 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서,
일정 시간 단위로 이벤트 핸들러가 호출되도록 호출 주기를 만듦.
'''
<!doctype html>
<html>
<head>
    <style>
        .container {
            width: 300px;
            height: 300px;
            background-color: rebeccapurple;
            overflow: scroll;
        }
        .content {
            width: 300px;
            height: 1000vh;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">

        </div>
    </div>
    <div>
        <span class="normal-count">0</span>
    </div>
    <div>
        <span class="throttle-count">0</span>
    </div>

    <script>
        const $container = document.querySelector(".container");
        const $normalCount = document.querySelector(".normal-count");
        const $throttleCount = document.querySelector(".throttle-count");

        const throttle = (callback, delay)=> {
            let timerId;

            // throttle 함수는 timerId를 기억하는 클로저를 반환
            return event => {
                // delay가 경과하기 이전에 이벤트가 발생하면 아무것도 하지 않다가
                // delay가 경과했을 때 이벤트가 발생하면 새로운 타이머를 재설정.
                // 따라서, delay 간격으로 callback이 호출됨.
                if(timerId) return;
                timerId = setTimeout(()=> {
                    callback(event);
                    timerId = null;
                }, delay, event);
            };
        };

        let normalCount = 0;
        $container.addEventListener('scroll', ()=> {
            $normalCount.textContent = ++normalCount;
        });

        let throttleCount = 0;
        $container.addEventListener('scroll', throttle(()=> {
            $throttleCount.textContent = ++throttleCount;
        }, 100));
    </script>
</body>
</html>
'''
*/