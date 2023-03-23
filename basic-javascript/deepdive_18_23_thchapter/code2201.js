/*
237.
자신이 속한 객체를 가리키는 식별자를 참조하는 방법
(1) 객체 리터럴 방식으로 생성한 경우, 재귀적으로 참조 가능.
'''
const circle = {
	radius:5,
	getDiameter() {
		return 2*circle.radius;
	}
};
console.log(circle.getDiameter());	// 10
'''
(2) 
this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 참조변수임.
this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드 참조 가능.
단, this 바인딩은 함수 호출 방식에 의해 동적으로 결정됨.
'''
const circle = {
	radius:5,
	getDiameter() {
		return 2*this.radius;
	}
};
console.log(circle.getDiameter());
'''
238.
객체 리터럴 메서드 내부에서의 this는 메서드를 호출한 객체를 가리킴.
생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킴.
일반 함수 내부에서 this는 전역 객체를 가리킴.
this는 어디서든 참조 가능.

239.
this 바인딩은 함수 "호출" 시점에 결정됨.
'''
const foo = function() {
    console.dir(this);
};

// 1. 일반 함수 호출
// 일반 함수로 호출된 모든 함수 내부의 this는 전역 객체가 바인딩됨.
foo();  // window

// 2. 메서드 호출
const obj = {foo};
obj.foo();  // obj

// 3. 생성자 함수 호출
new foo();  // foo {}

// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
const bar = {name:'bar'};
foo.call(bar);  // bar
foo.apply(bar); // bar
foo.bind(bar);  // bar
'''

240.
일반 함수에서 this는 의미가 없음.
따라서, strict mode 적용시, this에는 undefined가 바인딩됨.

241.
메서드 내 정의한 중첩 함수도 일반 함수로 호출되면 this에는 전역 객체가 바인딩됨.
'''
var value = 1;

const obj = {
	value:100,
	foo() {
	  console.log("foo's this: ", this);	// obj에 연결된 객체리터럴
	  console.log("foo's this.value: ", this.value);	// 100
	  function bar() {
	  	console.log("bar's this: ", bar);	// window
	  	console.log("bar's this.value: ", bar.value);	// 1
	  }
	  bar();
	}

};

obj.foo();
'''

242.
setTimeout 함수
두 번째 인수로 전달된 시간(ms)만큼 대기 후,
첫 번째 인수로 전달한 콜백 함수를 호출하는 타이머 함수.

243.
<that 바인딩>
메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을
메서드의 this 바인딩과 일치시키기 위한 방법.
'''
var value = 1;

const obj = {
    value:100,
    foo() {
        const that = this;
        setTimeout(function() {
            console.log(that.value);    // 100
        }, 100);
    }
};

obj.foo();
'''
이외에도, Function.prototype.apply, Function.prototype.call,
Function.prototype.bind 메서드를 제공.
'''
var value = 1;

const obj = {
	value:100,
	foo() {
		setTimeout(function() {
			console.log(this.value);	// 100
		}.bind(this),100);
	}
};

obj.foo();
'''

244.
화살표 함수를 사용해 this 바인딩을 일치시키는 방법.
'''
var value = 1;

const obj = {
	value:100,
	foo() {
	    setTimeout(()=>console.log(this.value), 100);	// 100
	}
};
'''

245.
메서드 내부의 this에는 메서드를 호출한 객체가 바인딩됨.
즉, 마침표 연산자 앞에 기술된 객체에 바인딩.
주의할 점은, 메서드 내부의 this는 메서드를 소유한 객체가 아닌
메서드를 호출한 객체에 바인딩된다는 것.
'''
const person = {
	name:'Lee',
	getName() {
		return this.name;
	}
};

console.log(person.getName());
console.dir(person.getName);
// 주의할 점은 person 객체의 getName 프로퍼티가 가리키는 함수 객체는
// person 객체에 포함된 것이 아닌, 독립적으로 존재하는 별도의 객체.

const anotherPerson = {
	name: 'Kim'
};
anotherPerson.getName = person.getName;
console.log(anotherPerson.getName());	// Kim

const getName = person.getName;
console.log(getName());	// ''
// window.name이 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이기 때문

var name = 'anonymous';
console.log(getName());	// anonymous
'''

246.
생성자 함수 내부의 this에는 생성자 함수가 생성할 인스턴스가 바인딩됨.
'''
function Circle(radius) {
	this.radius = radius;
	this.getDiameter = function() {
		return 2*this.radius;
	};
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter());
console.log(circle2.getDiameter());
'''

247.
<Function.prototype.apply/call/bind>
(1) Function.prototype.apply, Function.prototype.call
this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출.
두 메서드의 차이점은 인수를 입력하는 방식.
Function.prototype.apply(thisArg[, argsArray])	// 배열
Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
// call은 쉼표로 구분한 리스트 형식으로 전달 즉, 여러 인자를 전달
'''
var a=1;
const thisArg = {a:10};

function getThisBinding1() {
	return this;
}

console.log(getThisBinding1());	// window
console.log(getThisBinding1.apply(thisArg));	// {a:1}
console.log(getThisBinding1.call(thisArg));	// {a:1}

function getThisBinding2(propertyName) {
	return this[propertyName];
}

console.log(getThisBinding2("a"));	// 1
console.log(getThisBinding2.apply(thisArg, ["a"]));	// 10
console.log(getThisBinding2.call(thisArg, "a"));	// 10
'''

248.
Function.prototype.apply/call 메서드는
유사 배열 객체에 배열 메서드를 사용하고자 할 때 자주 사용.
'''
function convertArgsToArray() {
	// arguments는 유사 배열 객체
	console.log(arguments);
	
	// arguments 객체를 배열로 변환
	// Array.prototype.slice를 인수 없이 호출하면 배열의 복사본을 생성
	const arr = Array.prototype.slice.call(arguments);
	// 또는 Array.prototype.slice.apply(arguments);
	
	console.dir(arr);
	return arr;
}

convertArgsToArray(1,2,3);
'''

249.
<Function.prototype.apply/call/bind>
(2) Function.prototype.bind
Function.prototype.apply/call 메서드와 달리, 함수를 호출하지 않음.
대신, 첫 번째 인수로 전달한 값으로 this 바인딩이 교체된 함수를 새롭게 생성해 반환.
'''
function getThisBinding() {
	return this;
}

const thisArg = {a:1};

// bind 메서드는 첫 번째 인수로 전달한 thisArg로 this 바인딩이 교체된
// getThisBinding 함수를 새롭게 생성해 반환
console.log(getThisBinding.bind(thisArg));	// getThisBinding

// bind 메서드는 함수를 호출하지 않으므로, 명시적으로 호출해야 함
console.log(getThisBinding.bind(thisArg)());	// {a:1}
'''

250.
Function.prototype.bind 메서드는 메서드의 this와
메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 자주 사용.
'''
const person1 = {
	name: 'Lee',
	foo(callback) {
		setTimeout(callback, 100);
	}
};

person1.foo(function() {
	console.log(`Hi! My name is ${this.name}.`);
});
// 결과값: "Hi! My name is ."

const person2 = {
	name: 'Kim',
	foo(callback) {
		setTimeout(callback.bind(this), 100);
	}
};

person2.foo(function() {
	console.log(`Hi! My name is ${this.name}.`);
});
// 결과값: "Hi! My name is Kim."
'''


251.
<'콜백 함수' 복습>
콜백 함수는 코드를 통해 명시적으로 호출하는 함수가 아니라,
개발자는 단지 함수를 동록하기만 하고,
어떤 이벤트가 발생했거나 특정 시점에 도달했을 때 시스템에서 호출하는 함수.

252.
<this 바인딩 정리>
(1) 일반 함수 호출 -> 전역 객체
(2) 메서드 호출 -> 메서드를 호출한 객체
(3) 생성자 함수 호출 -> 생성자 함수가 생성할 인스턴스
(4) Function.prototype.apply/call/bind -> 첫번째 인수로 전달된 객체
*/