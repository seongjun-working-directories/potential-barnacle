/*
124.
모든 객체는 [[Prototype]]라는 내부 슬롯을 갖는데,
__proto__를 통해 간접적으로 접근할 수 있음.
ex) const o = {}; o.__proto__;

125.
프로퍼티 어트리뷰트
프로퍼티 생성 시, 프로퍼티의 상태를 나타냄.

[[value]], [[writeable]], [[enumerable]], [[configurable]]
프로퍼티값, 값 갱신 가능 여부, 열거 가능 여부, 재정의 가능 여부 순.
-> Object.getOwnPropertyDescriptor를 사용해서 확인 가능.

'''
const person = {
    name : 'lee',
    age : 16
};

console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// 결과값
// Object {
//  configurable: true, enumerable: true,
//  value: "lee", writable: true,
//  [[Prototype]]: Object
// }
'''

126.
Object.getOwnPropertyDescriptor의 첫 번째 인자에는 객체가 전달되고,
두 번째 인자에는 프로퍼티 키가 전달됨.
전체 프로퍼티에 대한 프로퍼티 어트리뷰트를 보고자 할 경우,
Object.getOwnPropertyDescriptors(객체 이름); 을 사용하면 됨.

127.
프로퍼티
(1) 데이터 프로퍼티 : 키와 값으로 구성된 일반적인 프로퍼티.
(2) 접근자 프로퍼티 : 자체적으로 값을 갖지 않고, 다른 데이터 프로퍼티를
읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티.

128.
데이터 프로퍼티 : value, writable, enumerable, configurable
'''
const person = { name : 'lee' };
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value:'lee', writable:true, enumerable:true, configurable:true}
'''

129.
접근자 프로퍼티 : get, set, enumerable, configurable
'''
const person = {
    firstName : 'iu',
    lastName : 'lee',
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(name) {
        [this.firstName, this.lastName] = name.split(' ');
    }
};

console.log(person.firstName + ' ' + person.lastName);
console.log(person.fullName);

person.fullName = 'IU LEE';
console.log(person.fullName);

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
'''

130.
프로퍼티 정의
새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나,
기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것.
Object.defineProperty 메서드 사용.
'''
const person = {};

Object.defineProperty(person, 'firstName', {
    value : 'IU',
    writable : true,
    enumerable : true,
    configurable : true
});

// 프로퍼티 속성을 누락시키면, undefined와 false가 기본값임.
// writable: false, enumarable: false, configurable: false 처리됨.
Object.defineProperty(person, 'lastName', {
    value : 'LEE'
});

console.log(person);
// {firstName: "IU", lastName: "LEE"}

let descriptor = Object.getOwnPropertyDescriptors(person);

// lastName 프로퍼티는 enumerable이 false이므로,
// for...in문이나 Object.keys 등으로 열거되지 않음.
console.log(Object.keys(person));
// Array(1) {0: "firstName, length: 1}

person.lastName = 'KIM';
console.log(person);
// {firstName: "IU", lastName: "LEE"}

// lastName 프로퍼티는 configurable이 false이므로, 삭제되지 않음.
delete person.lastName;
console.log(person);
// {firstName: "IU", lastName: "LEE"}

// 접근자 프로퍼티 재정의
Object.defineProperty(person, 'fullName', {
    get() {
        return `${this.firstName} ${this.lastName}`;
    },
    set(name) {
        [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable: true,
    configurable: true
});

descriptor = Object.getOwnPropertyDescriptors(person);
console.log(descriptor);
// firstName: {
//    value: 'IU', writable: true, enumerable: true, configurable: true
// }
// fullName: {
//    enumerable: true, configurable: true, get: ƒ, set: ƒ
// }
// lastName: {
//    value: 'LEE', writable: false, enumerable: false, configurable: false
// }
'''

131.
Object.defineProperties 메서드를 사용하면,
여러 개의 프로퍼티를 한 번에 정의할 수 있음.
'''
const person = {};

Object.defineProperties(person, {
    firstName: {
        value: 'IU',
        writable: true,
        enumerable: true,
        configurable: true
    },
    lastName: {
        value: 'Lee',
        writable: true,
        enumerable: true,
        configurable: true
    },
    fullName: {
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set() {
            [this.firstName, this.lastName] = name.split(' ');
        },
        enumerable: true,
        configurable: true
    }
});

person.fullName = 'TaeHee Kim';
console.log(person);
'''

132.
객체 변경 방지 메서드
[공통점: 프로퍼티 추가는 불가, 프로퍼티 값 읽기는 가능.]
(1) Object.preventExtensions : 객체 확장 금지
-> 프로퍼티 삭제 가능, 값 쓰기 가능, 어트리뷰트 재정의 가능
(2) Object.seal : 객체 밀봉
-> 프로퍼티 삭제 불가, 값 쓰기 가능, 어트리뷰트 재정의 불가
(3) Object.freeze : 객체 동결
-> 프로퍼티 삭제 불가, 값 쓰기 불가, 어트리뷰트 재정의 불가

cf.
프로퍼티 추가 방법 :
프로퍼티 동적 추가와 Object.defineProperty 메서드 추가.

133.
Object.preventExtensions
프로퍼티 추가만 불가.

cf.
확장 가능한 객체인지 여부 확인은 Object.isExtensible 메서드 사용.

'''
const person = {name: 'lee'};
console.log(Object.isExtensible(person));   // true

Object.preventExtensions(person);
console.log(Object.isExtensible(person));   // false

person.age = 20;    // 무시됨.
console.log(person);    // {name:'lee'}

person.name = 'kim';    // 쓰기는 허용됨.
console.log(person);    // {name:'kim'}

delete person.name; // 삭제는 허용됨.
console.log(person);    // {}
'''

134.
Object.seal
프로퍼티 추가 불가 & 프로퍼티 삭제 및 어트리뷰트 재정의 불가.
프로퍼티 읽기와 쓰기만 가능.

cf.
밀봉된 객체인지 여부 확인은 Object.isSealed 메서드 사용.

'''
const person = {name:'lee'};
console.log(Object.isSealed(person));   // false

Object.seal(person);
console.log(Object.isSealed(person));   // true

// 밀봉된 객체는 configurable이 false임.
console.log(Object.getOwnPropertyDescriptors(person));

person.age = 20;    // 무시됨.
console.log(person);    // {name:'lee'}

person.name = 'kim';    // 쓰기는 허용됨.
console.log(person);    // {name:'kim'}

delete person.name; // 무시됨.
console.log(person);    // {name:'kim'}

Object.defineProperty(person, 'name', {configurable:true});
// 프로퍼티 어트리뷰트 재정의 금지
// TypeError: Cannot redefine property: name
'''

135.
Object.freeze
프로퍼티 읽기만 가능.

cf.
동결된 객체인지 여부는 Object.isFrozen 메서드로 확인 가능.

const person = {name: 'lee'};
console.log(Object.isFrozen(person));   // false

Object.freeze(person);
console.log(Object.isFrozen(person));   // true

// 동결된 객체는 writable과 configurable이 false.
console.log(Object.getOwnPropertyDescriptors(person));

136.
Object.preventExtensions, Object.seal, Object.freeze는
얕은 변경 방지로 직속 프로퍼티만 변경이 방지됨.
따라서, 객체의 중첩 객체까지 동결하여 변경 불가능한 읽기 전용
불변 객체를 구현하려면, 재귀적으로 Object.freeze 메서드를 호출해야 함.
'''
function deepFreeze(target) {
    if (target && typeof target == 'object'
        && !Object.isFrozen(target)) {
            Object.freeze(target);
            Object.keys(target)
            .forEach(key=>deepFreeze(target[key]));
    }
    return target;
}

const person = {
    name:'lee',
    address:{city:'seoul'}
};

deepFreeze(person);

console.log(Object.isFrozen(person));   // true
console.log(Object.isFrozen(person.address));   // true

person.address.city = 'busan';
console.log(person);    // {name:'lee', address:{city:'seoul;}}
'''
*/