/*
205.
암묵적 전역(Implicit Global)
'''
function foo() {
    x = 10;
}
foo();
console.log(x); // 10
'''
위의 코드에는, x를 전역변수나 지역변수로 선언하는 코드가 없음.
그럼에도 console.log(x)는 10을 출력함.
이유는, 자바스크립트 엔진이 암묵적으로 전역 객체에 x 프로퍼티를 동적으로 생성했기 때문.
이러한 개발자 의도와 관계없이 발생한 암묵적 전역은 오류의 원인이 될 수 있음.
이를 방지하기 위한 두 가지 방법이 있는데,
strict mode를 사용하는 것과 eslint 등 린트 도구를 활용하는 방법임.

206.
strict mode를 적용하려면, 전역의 선두 또는 함수의 몸체의 선두에
'use strict'; 를 추가하면 됨.

'''
'use strict';

function foo() {
    x = 10; // ReferenceError: x is not defined;
}
foo();
console.log(x);
'''

'''
'use strict';

function foo() {
    let x = 10;
}
foo();
console.log(x); // ReferenceError: x is not defined;
'''

207.
전역에 strict mode 사용은 피해야 함.
-> 전역에 적용한 strict mode는 스크립트 단위로 적용되기 때문에,
-> 한 스크립트에 적용한 strict mode가 다른 스크립트에서 작동하지 않음.

대신, 즉시 실행 함수로 스크립트 전체를 묶은 뒤,
스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용함.
'''
(function() {
    'use strict';
    // Do Something~
}());
'''

208.
함수 단위의 strict mode 사용도 피해야 함.
-> 위와 비슷하게, 어떤 함수는 strict mode이고,
-> 어떤 함수는 non-strict mode인 것은 바람직하지 않음.

209.
strict mode는 즉시 실행 함수로 묶은 뒤, 스크립트 단위로 적용하는 것이 바람직.

210.
strict mode가 발생시키는 에러.
(1) 암묵적 전역 : 선언하지 않은 변수의 참조.
(2) delete 연산자를 사용한 변수, 함수, 매개변수의 삭제.
(3) 매개변수 이름의 중복
(4) with문의 사용

211.
strict mode 적용에 따른 변화 : 일반 함수의 this
strict mode에서 함수를 일반 함수로서 호출하면, this에 undefined가 바인딩됨.
일반 함수 내부에서는 this를 사용할 필요가 없기 때문.

212.
strict mode에서는,
매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영하지 않음.
'''
function a(a) {
    a=2;
    console.log(arguments); // {0:2, length:1}
}
a(1);

(function (a) {
    'use strict';
    a=2;
    console.log(arguments); // {0:1, length:1}
}(1));
'''
*/
