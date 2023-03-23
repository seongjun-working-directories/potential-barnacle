/*
61.
객체는 0개 이상의 프로퍼티로 구성된 집합이고, 프로퍼티와 메서드를 가짐.
객체의 프로퍼티는 key와 value로 구성되며,
객체의 메서드는 함수를 프로퍼티로 가진 경우를 의미함.

62.
객체 생성 방법 :
객체 리터럴, Object 생성자 함수, 생성자 함수, Object.create 메서드, 클래스(ES6)

63.
객체 리터럴로 객체를 생성하는 예시
'''
var person = {
	name : lee,
	sayHello : function() {
		console.log('Hello!');
	}
};
console.log(typeof person);
console.log(person);
'''

64.
식별자 네이밍 규칙을 따르지 않는 프로퍼티명을 사용할 수 있지만,
이 경우, 반드시 따옴표를 사용해 감싸야 함.
ex) 'last-name', 'hashtag#'

65.
프로퍼티 키에 문자열이나 심벌값 이외의 값을 사용하면 암묵적으로 문자열로 변환됨.

66.
이미 존재하는 프로퍼티 키를 중복 선언하면,
나중에 선언된 프로퍼티가 먼저 선언된 프로퍼티를 덮어씀.

67.
프로퍼티 접근법 :
마침표 표기법(.), 대괄호 표기법([])
'''
var person = {
	name : lee
};

console.log(person.name);
console.log(person['name']);
'''
주의할 점은, 대괄호 표기법 사용 시,
프로퍼티명을 반드시 따옴표로 감싸야 한다는 것.
또한, 식별자 네이밍 규칙을 따르지 않은 프로퍼티는,
무조건 대괄호 표기법을 통해 접근해야 함.

68.
객체에 존재하지 않는 프로퍼티에 접근하면 undefined가 반환됨.
(ReferenceError가 발생하지 않음.)

69.
존재하지 않는 프로퍼티에 값을 할당하면, 프로퍼티가 동적으로 생성된 뒤 값이 할당됨.
'''
var person = {
	name : lee
};
person.age = 14;
console.log(person);	// {name:lee, age:14}

70.
프로퍼티 삭제 시에는 delete 연산자 사용 가능.
'''
var person = {
	name : lee,
	age : 16
};
delete person.age;
console.log(person);	// {name:lee}

71.
ES6에 추가된 객체 리터럴의 확장 기능

(1) 프로퍼티값으로 변수를 사용하는 경우,
변수이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략할 수 있음.
이때 프로퍼티 키는 변수 이름으로 자동 생성됨.
'''
let x=1, y=2;
const obj = {x, y};
console.log(obj);	// {x:1, y:2}
'''

(2) 계산된 프로퍼티 이름 사용 가능
문자열 또는 문자열로 변환 가능한 값으로 평가되는 표현식을 사용해서,
키를 동적으로 생성 가능. 단, 프로퍼티 키로 사용할 표현식은 대괄호로 묶여야 함.
'''
// ES5
var prefix = 'prop'
var i=0;
var obj={};

obj[prefix+'-'+(++i)] = i;
obj[prefix+'-'+(++i)] = i;
console.log(obj);	// {prop-1:1, prop-2:2}

// ES6 이후
i=0;
obj[`${prefix}-${++i}`] = i;
obj[`${prefix}-${++i}`] = i;
console.log(obj);	// {prop-1:1, prop-2:2}
'''

(3) 메서드 축약 표현
'''
// ES5
var obj = {
	name:'lee',
	sayHello:function() {
		console.log("Hello");
	}
};
// 와 같이 작성했던 코드를 다음과 같이 작성 가능.

var obj_es6 = {
	name:'lee',
	sayHello() {
		console.log("Hello");
	}

};
'''
*/