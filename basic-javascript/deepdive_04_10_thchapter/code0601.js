/*
11.
데이터 타입은 원시 타입과 객체 타입으로 나뉘며,
원시 타입에는 Number, String, Boolean, undefined, null, symbol이 있음.
(symbol은 ES6부터 추가된 7번째 타입)

12.
숫자타입은 64비트 부동소수점 형식을 따름.
즉, 모든 수를 실수로 처리.
따라서, 다음 코드의 결과값은 0.33333333333...으로 출력됨.
'''
var tmp = 1/3;
console.log(tmp);
'''

13.
숫자 타입에는 세 가지 특별한 값이 있음.
Infinity(cf. 10/0), -Infinity(cf. 10/-0), NaN(cf. 1*'string')
주의할 점은,
NaN은 값이 아닌 식별자로 해석된다는 점.

14.
문자열은 작은따옴표('), 큰따옴표("), 백틱(`)으로 텍스트를 감싸는 형태.
일반적으로 작은따옴표 사용.

15.
자바스크립트의 문자열은 변경 불가능한 값(immutable value)인 동시에, 원시타입임.

16.
ES6부터 템플릿 리터럴이라고 하는 새로운 문자열 표기법이 도입됨.
템플릿 리터럴은 멀티라인 문자열, 표현식 삽입, 태그드 템플릿 등 편리한 처리 기능 제공.
템플릿 리터럴은 백틱(`)을 사용해 표현.
'''
var template = `Template literal`;
console.log(template);

// 멀티라인 문자열 지원.
template =
`Hello
World~`;
console.log(template);

// 템플릿 리터럴을 사용하지 않는 경우 다음과 같이 써야 했음.
template = "Hello\nWorld~";
console.log(template);
'''

17.
템플릿 리터럴은 이스케이프 시퀀스를 사용하지 않고도,
줄바꿈이 허용되며 공백도 있는 그대로 적용함.

18.
일반 문자열은 '+' 연산자를 활용해 연결할 수 있음.
템플릿 리터럴은 다음과 같이 '표현식 삽입'을 통해 간단히 문자열을 삽입할 수 있음.
'''
var first = "sth";
var last = "good";
console.log(`My name is ${first} ${last}.`);
'''
주의할 점은,
표현식의 결과가 문자열이 아니더라도, 문자열로 강제로 타입을 변환한다는 것.
물론 표현식 내에서는 연산이 이뤄짐.
ex) console.log(`1+2=${1+2}`);	// 1+2=3

19.
undefined는 자바스크립트 엔진이 변수를 초기화할 때 사용하는 값.
즉, 사용자가 아직 초기화하지 않은 변수를 표현할 때 사용.
따라서, 사용자가 값이 없는 변수를 표현하고자 할 때는 null을 사용.
(물론, undefined를 직접 할당할 수 있지만, 권장 X.)

20.
함수가 유효한 값을 반환할 수 없는 경우, 명시적으로 null을 반환하기도 함.

21.
symbol(심벌)은 ES6에서 추가된 7번째 원시타입으로, 변경 불가능한 값.
symbol값은 다른 값과 중복되지 않는 유일무이한 값.
따라서, 주로 이름이 충돌할 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용.
심벌 이외의 원시값은 리터럴을 통해 생성하지만,
심벌의 경우 Symbol 함수를 호출해 생성함.
이때 생성된 심벌값은 외부에 노출되지 않으며, 다른 값과 절대 중복되지 않는 유일무이한 값.
'''
var key = Symbol("key");

var obj = {};
// 이름 충돌 위험이 없는 유일무이한 값인 심벌을 프로퍼티 키로 사용.
obj[key] = 'value';
console.log(obj[key]);

'''

22.
""자바스크립트를 이루는 거의 모든 것이 객체이다.""

23.
데이터 타입이 필요한 이유
(1) 값을 저장할 때 확보해야 하는 메모리 공간의 크기 결정을 위해
(2) 값을 참조할 때 한 번에 읽어 들여야 할 메모리 공간의 크기를 결정하기 위해
(3) 메모리에서 읽어들인 2진수를 어떻게 해석할지 결정하기 위해

24.
자바스크립트는 '동적 타입 언어'
정적 타입 언어는 다음 예시와 같이 변수의 타입을 변경할 수 없으며,
변수에 선언한 타입에 맞는 값만 할당 가능 ex) char c; int num;
그러나, 자바스크립트는 '동적 타입 언어'이므로,
어떤 데이터 타입의 값이라도 자유롭게 할당할 수 있음.

25.
자바스크립트의 언어는 선언이 아닌 할당에 의해 타입이 결정됨.
재할당에 의해 변수의 타입은 언제든지 동적으로 변할 수 있음.

26.
typeof 연산자로 변수의 데이터 타입 조사.
ex) console.log(typeof foo);

27.
변수 사용 시 주의사항
(1) 변수는 꼭 필요한 경우에 한해 제한적으로 사용.
(2) 변수의 유효 범위(스코프)는 최대한 좁게 만들어야 함.
(3) 전역 변수의 사용은 최대한 자제함.
(4) 변수보다는 상수를 사용해 값의 변경을 억제함.
(5) 변수 이름은 변수의 목적이나 의미가 파악될 수 있도록 네이밍함.
*/