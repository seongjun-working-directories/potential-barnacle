/*
253.
실행 컨텍스트(Execution Context)를 생성하는 4가지 타입의 소스코드.
[각각 실행 컨텍스트 생성과정과 관리내용이 다름.]
(1) 전역 코드
*단, 전역에 정의된 함수, 클래스 등의 '내부 코드'는 포함되지 않음.

(2) 함수 코드
*단, 함수 내부에 중첩된 함수, 클래스 등의 '내부 코드'는 포함되지 않음.

(3) eval 코드

(4) 모듈 코드 : 모듈 내부에 존재하는 소스 코드.
*단, 모듈 내부의 함수, 클래스 등의 '내부 코드'는 포함되지 않음.

254.
자바스크립트 엔진은 소스코드를 2개의 과정,
즉 "소스코드 평가"와 "소스코드 실행"으로 나눠 처리.
(1) 소스코드 평가
실행 컨텍스트 생성 후 변수, 함수 등의 선언문만 먼저 실행하여
생성된 변수나 함수 식별자를 키로 실행 컨텍스트가 관리하는 스코프에 등록.
(2) 소스코드 실행(=런타임)
선언문을 제외한 소스코드가 순차적으로 실행됨.

255.
코드 실행을 위해 아래와 같이 관리하는 것이 실행 컨텍스트.
(1)선언에 의해 생성된 모든 식별자들은 스코프를 구분하여 등록되고,
상태 변화가 지속적으로 관리되어야 함.
(2) 스코프는 중첩 관계에 의해 스코프 체인을 형성해야 함. 
즉, 스코프 체인을 통한 검색이 가능해야 함.
(3) 현재 실행 중인 코드의 실행 순서를 변경할 수 있어야 하며,
다시 되돌아갈 수도 있어야 함.

256.
<실행 컨텍스트>
소스코드를 실행하는 데 필요한 환경을 제공하고, 코드의 실행 결과를 실제로 관리하는 영역.
식별자를 등록하고 관리하는 스코프와 코드 실행 순서 관리를 구현한 내부 메커니즘.
모든 코드는 실행 컨텍스트를 통해 실행되고 관리됨.

257.
식별자와 스코프는 실행 컨텍스트의 렉시컬 환경으로 관리하고,
코드 실행 순서는 실행 컨텍스트 스택으로 관리됨.

258.
<실행 컨텍스트 스택> : 코드의 실행 순서를 관리.
실행 컨텍스트 스택에는 코드가 실행되는 시간의 흐름에 따라,
실행 컨텍스트가 추가(push)되고 제거(pop)됨.
'''
const x=1;
function foo() {
	const y=2;
	function bar() {
		const z= 3;
		console.log(x+y+z);
	}
	bar();
}
foo();	// 6
'''
// (1) nothing
// (2) 전역 실행 컨텍스트
// (3) 전역 -> foo 함수 실행 컨텍스트
// (4) 전역 -> foo -> bar 함수 실행 컨텍스트
// (5) 전역 -> foo 함수 실행 컨텍스트
// (6) 전역 실행 컨텍스트
// (7) nothing

259.
실행 컨텍스트 스택의 최상위에 존재하는 실행 컨텍스트는
언제나 현재 실행중인 실행 컨텍스트(running execution context)임.

260.
<렉시컬 환경>
식별자와 식별자에 바인딩된 값, 그리고 상위 스코프에 대한 참조를 기록하는 자료구조로,
실행 컨텍스트를 구성하는 컴포넌트. 스코프와 식별자를 관리.

261.
렉시컬 환경은 키와 값을 갖는 객체 형태의 스코프를 생성해,
식별자를 키로 등록하고 식별자에 바인딩된 값을 관리.
즉, 렉시컬 환경은 스코프를 구분하여 식별자를 등록하고 관리하는
저장소 역할을 하는 렉시컬 스코프의 실체.

262.
실행 컨텍스트는
LexicalEnvironment 컴포넌트와 VariableEnvironment 컴포넌트로 구성.

263.
LexicalEnvironment 컴포넌트는
'환경 레코드' 컴포넌트와 '외부 렉시컬 환경에 대한 참조' 컴포넌트로 구성.
(1) 환경 레코드(Environment Record)
[식별자와 식별자에 바인딩된 값을 기록]
스코프에 포함된 식별자를 등록하고, 등록된 식별자에 바인딩된 값을 관리하는 저장소.

(2) 외부 렉시컬 환경에 대한 참조(Outer Lexical Environment Reference)
[상위 스코프에 대한 참조를 기록]
상위 스코프를 가리킴. 이를 통해 단방향 링크드 리스트인 스코프 체인을 구현.

264.
'''
var x=1;
const y=2;

function foo(a) {
    var x=3;
    const y=4;

    function bar(b) {
        const z=5;
        console.log(a+b+x+y+z);
    }
    bar(10);
}

foo(20);
'''
(1) 전역 객체 생성
전역 객체는 전역 코드 평가 이전 생성.
전역 객체에는 빌트인 전역 프로퍼티, 빌트인 전역 함수, 표준 빌트인 객체 추가.
동작 환경에 따라 클라이언트 사이드 Web AIP 또는 특정 환경을 위한 호스트 객체 포함.
전역 객체도 Object.prototype을 상속 받음. 즉, 전역 객체도 프로토타입 체인의 일원.

(2) 전역 코드 평가
전역 실행 컨텍스트 생성 -> 전역 렉시컬 환경 생성((전역 환경 레코드 생성
[객체 환경, 선언적 환경 레코드] -> this 바인딩 -> 외부 렉시컬 환경에 대한 참조 결정))

(2-1)
단, let과 const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 되지 않고,
개념적인 블록 내에 존재하게 됨. 따라서, var 키워드로 선언된 전역 변수와
let, const로 선언된 전역 변수를 구분하기 위해, 전역 스코프 역할을 하는
전역 환경 레코드는 객체 환경 레코드와 선언적 환경 레코드로 구성됨.

(2-2)
객체 환경 레코드는 var 키워드의 전역 변수와 함수 선언문으로 정의한 전역 함수,
빌트인 전역 프로퍼티, 빌트인 전역 함수, 표준 빌트인 객체를 관리.
선언적 환경 레코드는 let, const 키워드로 선언한 전역 변수를 관리.

(2-3)
전역 코드 평가 과정에서 var 키워드로 선언한 전역 변수와 함수 선언문으로 정의된 전역 함수는
전역 환경 레코드의 객체 환경 레코드에 연결된 BindingObject(=전역 객체)를 통해
전역 객체의 프로퍼티와 메서드가 됨.

(2-4)
함수 선언문으로 정의한 함수가 평가되면,
함수 이름과 동일한 이름의 식별자를 객체 환경 레코드에 바인딩된 BindingObject를 통해
전역 객체에 키로 등록하고, 생성된 함수 객체를 즉시 할당.
따라서, 함수 선언문으로 정의한 함수는 함수 선언문 이전에 호출 가능.

(2-5)
this 바인딩은 객체 환경 레코드와 선언적 환경 레코드에 없고,
전역 환경 레코드와 함수 환경 레코드에만 존재.

(3) 전역 코드 실행

(4) foo 함수 코드 평가
foo 함수가 호출되면 전역 코드의 실행을 일시 중단하고,
foo 함수 내부로 코드의 제어권이 이동. 그리고 함수 코드 평가를 시작.

함수 실행 컨텍스트 생성 -> 함수 렉시컬 환경 생성((함수 환경 레코드 생성
-> this바인딩 -> 외부 렉시컬 환경에 대한 참조 결정))

(4-1)
foo 함수의 실행 컨텍스트가 우선 생성된 뒤,
생성된 함수 실행 컨텍스트는 함수 렉시컬 환경이 완성된 다음 실행 컨텍스트 스택에 푸쉬됨.

(4-2)
자바스크립트 엔진은 함수 정의를 평가하여 함수 객체를 생성할 때,
현재 실행 중인 실행 컨텍스트의 렉시컬 환경,
즉 함수의 상위 스코프를 함수 객체의 내부 슬롯[[Environment]]에 저장.
따라서, 함수 객체의 내부 슬롯 [[Environment]]가 렉시컬 스코프를 구현하는 메커니즘.

(5) foo 함수 코드 실행
이 과정에서 식별자 결정(Identifier Resolution)을 위해
실행 중인 실행 컨텍스트의 렉시컬 환경에서 식별자 검색을 시작.
만약 실행 중인 실행 컨텍스트의 렉시컬 환경에서 식별자 검색이 안된다면,
외부 렉시컬 환경에 대한 참조가 가리키는 렉시컬 환경으로 이동해 식별자 검색.

(6) bar 함수 코드 평가

(7) bar 함수 코드 실행

(8) bar 함수 코드 실행 종료
실행 컨텍스트 스택에서 bar 함수 실행 컨텍스트가 제거되었다고 해서,
bar 함수 렉시컬 환경까지 즉시 소멸하는 것은 아님.
렉시컬 환경은 실행 컨텍스트에 의해 참조되기는 하지만 독립적인 객체임.
객체를 포함한 모든 값은 누군가에 의해 참조되지 않을 때
비로소 가비지 컬렉터에 의해 메모리 공간의 확보가 해제되어 소멸함.

(9) foo 함수 코드 실행 종료

(10) 전역 코드 실행 종료

265.
<실행 컨텍스트와 블록 레벨 스코프>
var 키워드로 선언한 변수는 오로지 함수의 코드 블록만 지역 스코프로 인정하지만,
let과 const로 선언된 변수는 모든 코드 블록을 지역 스코프로 인정하는 블록 레벨 스코프.
코드 블록이 실행되면, 해당 코드 블록을 위한 블록 레벨 스코프를 생성.
이를 위해, 선언적 환경 레코드를 갖는 렉시컬 환경을 새롭게 생성해,
기존의 전역 렉시컬 환경을 교체.
이 때, 새롭게 생성된 코드 블록을 위한 렉시컬 환경의 외부 렉시컬 환경에 대한 참조는
해당 코드 블록이 실행되기 이전의 전역 렉시컬 환경을 가리킴.
그리고 코드 블록의 실행이 종료되면, 해당 코드 블록 실행 이전의 렉시컬 환경으로 되돌림.
*/
