/*
107.
변수 선언은 코드가 한 줄씩 순차적으로 실행되는 시점인 런타임에 실행되는 것이 아니라,
런타임 이전 단계에서 자바스크립트 엔진에 의해 먼저 실행됨.
그러나 이는, 전역 변수에 한정하여 위와 같이 작동하는 것임.
함수 내부에서 선언한 변수는 함수가 호출된 직후 함수 몸체의 코드가
한 줄씩 순차적으로 실행되기 이전에 자바스크립트 엔진에 의해 먼저 실행됨.

108.
지역변수의 생명주기는 일반적으로, 함수의 생명주기와 일치.
그러나 지역변수의 생명주기가 함수의 생명주기보다 긴 경우도 존재.

109.
누군가 메모리 공간을 참조하고 있다면, 해제되지 않고 확보된 상태로 남아있음.
스코프도 누군가 참조하고 있다면, 소멸하지 않고 생존해있음. ex) 클로저

110.
var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 됨.

111.
'전역 객체'란?
코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해
어떤 객체보다도 먼저 생성되는 특수 객체.
전역 객체는 표준 빌트인 객체와 호스트 객체, 전역 변수, 전역 함수를 프로퍼티로 가짐.

브라우저에서는 window, 서버 환경에서는 global 객체를 의미.
전역 객체를 가리키는 식별자는 window, self, this, frames, global 등
다양했으나, ES11 이후로 globalThis로 통일됨.

112.
브라우저에서 전역 객체는 window이므로,
var로 선언된 전역변수는 전역 객체 window의 프로퍼티.
따라서, 브라우저에서 전역 변수는 웹페이지를 닫을 때까지 유효.

113.
전역 변수의 문제점
(1) 암묵적 결합
모든 코드가 전역 변수를 참조하고 변경할 수 있음.
-> 의도치 않은 상태 변경 가능성 존재.

(2) 긴 생명주기
생명 주기가 길어서 메모리 리소스를 오랜 기간 소비.
-> 의도치 않게 변수를 중복선언하여, 재할당이 이뤄질 수 있음.

(3) 스코프 체인 상에서 종점에 존재
전역 변수는 스코프 체인 상의 종점에 존재하므로,
전역 변수의 검색 속도가 가장 느림.

(4) 네임스페이스 오염   
파일이 분리되어 있더라도, 하나의 전역 스코프를 공유하기 때문에,
네임스페이스가 오염되어 예상치 못한 결과를 초래할 수 있음.

114.
전역 변수 사용을 억제하는 방법
(1) 즉시 실행 함수
모든 코드를 즉시 실행 함수로 감싸면, 모든 변수는 즉시 실행 함수의 지역변수가 됨.
'''
(function() {
	var foo = 10;	// 즉시 실행 함수의 지역변수
	// ...
}());
'''
이 방법은 전역변수를 생성하지 않아, 라이브러리에 자주 사용.

(2) 네임 스페이스 객체
전역에 네임스페이스 객체를 생성하고,
전역변수처럼 사용하고자 하는 변수를 프로퍼티로 추가하는 방법.
(다만, 네임스페이스가 전역변수에 할당되므로 효율성은 여전히 떨어짐.)
'''
var MYNAMESPACE = {};	// 전역 네임스페이스 객체
MYNAMESPACE.owner = "Park";
console.log(MYNAMESPACE.owner);	// Park
'''

또한 네임스페이스 객체에 또 다른 네임스페이스 객체를 프로퍼티로 추가해서
네임스페이스를 계층적으로 구성 가능.
'''
MYNAMESPACE.person = {
	name:'Lee',
	address:'Seoul'
};
console.log(MYNAMESPACE.person.name);	// Lee
'''

(3) 모듈 패턴
모듈 패턴은 클래스를 모방해서 관련 있는 변수와 함수를 모아
즉시 실행 함수로 감싸 하나의 모듈을 만드는 것.
-> 클로저를 기반으로 동작.
-> 전역 변수의 억제는 물론, 캡슐화까지 가능.

cf. 캡슐화(encapsulation)
객체 상태를 나타내는 프로퍼티와
프로퍼티를 참조하고 조작할 수 있는 동작 메서드를 하나로 묶는 것.
'''
var Counter = (function() {
	// private 변수
	// num은 반환되는 객체가 아닌, 즉시 실행함수 스코프에 존재
	var num = 0;
	// 객체를 반환
	return {
		increase() {
			return ++num;
		},
		decrease() {
			return ++num;
		}
	};
}());

// private 변수는 외부에 노출되지 않음.
console.log(Counter.num);	// undefined
console.log(Counter.increase());	// 1
console.log(Counter.decrease());	// 0
'''

(4) ES6 모듈
ES6 모듈을 사용하면 더는 전역 변수를 사용할 수 없음.
ES6 모듈은 파일 자체의 독자적인 모듈 스코프를 제공.
따라서 모듈 내에서 var 키워드로 선언한 변수는,
더는 전역 변수가 아니며, window 객체의 프로퍼티도 아님.
script 태그에 type="module" 속성을 추가하면,
로드된 자바스크립트 파일은 모듈로써 동작함.
모듈 파일 확장자는 mjs를 권장.
'''
<script type="module" src="lib.mjs"></script>
<script type="module" src="app.mjs"></script>
'''

cf.
ES6 모듈은 구형 브라우저에서는 동작하지 않으며,
브라우저의 ES6 모듈 기능을 사용해도 트랜스파일링이나 번들링이 필요하기 때문에,
아직까지는 Webpack 등 모듈 번들러를 사용하는 것이 일반적임.
*/