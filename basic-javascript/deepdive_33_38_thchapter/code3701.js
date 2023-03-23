/*
583.
<Set>
중복되지 않는 유일한 값들의 집합.

584.
Set 객체의 특징
(1) 동일한 값을 중복해 포함할 수 없음.
(2) 요소 순서에 의미가 없음.
(3) 인덱스로 요소에 접근할 수 없음.

585.
Set 생성자 함수로 생성하는 Set 객체.
'''
// 인수를 전달하지 않으면 빈 Set 객체가 생성됨.
const set = new Set();
console.log(set);

// Set 생성자 함수는 이터러블을 인수로 받아 Set 객체를 생성.
const set1 = new Set([1,2,3,3]);
console.log(set1);  // Set(3) {1,2,3}

// Set을 사용해 배열의 중복된 요소를 제거할 수 있음.
testArr = [2,1,2,3,4,3,4];

const uniq = arr => arr.filter(
    (v, i, self) => self.indexOf(v) === i;
);
console.log(uniq(testArr));

const uniq = arr => [...new Set(arr)];
console.log(uniq(testArr));
'''

cf.
Array.prototype.filter()
주어진 함수의 테스트를 통과하는 모든 요소를 모다 새로운 배열을 반환.
""arr.filter(callback(element[, index[, array]])[, thisArg])""
ex) arr.filter(word => word.length>6);

586.
<Set.prototype.size>
Set 객체의 요소 개수 확인.
'''
const {size} = new Set([1,2,3,3]);
console.log(size);  // 3

// size 프로퍼티는 임의로 변경할 수 없음.
console.log(Object.getOwnPropertyDescriptor(Set.prototype, 'size'));
'''

587.
<Set.prototype.add()>
Set 객체에 요소를 추가.
'''
const set = new Set();
console.log(set);

set.add(1);
console.log(set);

// add 메서드는 새로운 요소가 추가된 상태의 Set 객체를 반환하므로
// 연속적으로 사용 가능.
set.add(2).add(3);
console.log(set);
'''

588.
Set 객체 내의 NaN은 오로지 하나만 존재. NaN과 NaN을 같다고 평가함.
Set 객체 내의 +0, -0은 일치 비교 연산자(===)가 같다고 평가함.

589.
Set 객체는 객체나 배열과 같이 자바스크립트의 모든 값을 요소로 저장 가능.

590.
<Set.prototype.has()>
Set 객체에 특정 요소가 존재하는지 확인.
'''
const set = new Set([1,2,3,3]);

console.log(set.has(2));    // true
console.log(set.has(4));    // false
'''

591.
<Set.prototype.delete()>
Set 객체의 특정 요소를 삭제. 삭제 성공 여부를 불리언값으로 반환.
인자로는 삭제하려는 요소값을 전달.
'''
const set = new Set([1,2,3]);

console.log(set.delete(2)); // true
console.log(set.delete(2)); // false
console.log(set);   // Set(2) {1, 3}
'''

592.
<Set.prototype.clear()>
Set 객체의 모든 요소를 일괄적으로 삭제.
'''
const set = new Set([1,2,3]);

set.clear();
console.log(set);   // Set(0) {}
'''

593.
<Set.prototype.forEach()>
Set 객체의 요소를 순회.
콜백 함수와 콜백 함수 내부에서 this로 사용될 객체를 인수로 전달 받음.
콜백 함수는 다음 3개의 인수를 전달받음.
(1) 현재 순회 중인 요소값.
(2) 현재 순회 중인 요소값.
(3) 현재 순회 중인 Set 객체 자체.
'''
const set = new Set([1,2,3]);

set.forEach((v1, v2, set)=>{
    console.log(v1, v2, set);
});
'''

594.
Set 객체는 이터러블이므로,
for...of 문, 스프레드 문법, 배열 디스트럭처링의 대상이 될 수 있음.
'''
const set = new Set([1,2,3]);
console.log(Symbol.iterator in set);    // true

for (const value of set) {
    console.log(value);
}

// 스프레드 문법
console.log([...set]);

// 배열 디스트럭처링 할당의 대상
const [a, ...rest] = set;
console.log(a, rest);   // 1, [2, 3]
'''

595.
<교집합>
'''
Set.prototype.intersection = function(set) {
    const result = new Set();
    
    for(const value of set) {
        if(this.has(value)) {
            result.add(value);
        }
    }

    return result;
};

// 위의 intersection 메서드는 다음과 같이 구현 가능.
Set.prototype.intersection2 = function(set) {
    return new Set([...this].filter(v=>set.has(v)));
};

const setA = new Set([1,2,3,4]);
const setB = new Set([2,3]);

console.log(setA.intersection(setB));
console.log(setA.intersection2(setB));
'''

596.
<합집합>
'''
Set.prototype.union = function(set) {
    const result = new Set(this);

    for (const value of set) {
        return add(value);  // 어차피 중복값은 무시되므로.
    }

    return result;
};

// 위의 union 메서드는 다음과 같이 구현 가능.
Set.prototype.union2 = function(set) {
    return new Set([...this, ...set]);
};

const setA = new Set([1,2,3,4]);
const setB = new Set([2,3]);

console.log(setA.union(setB));
console.log(setA.union2(setB));
'''

597.
<차집합>
'''
Set.prototype.difference = function(set) {
    const result = new Set(this);
    
    for (const value of set) {
        result.delete(value);
    }
    
    return result;
};

// 위의 difference 메서드는 다음과 같이 구현 가능.
Set.prototype.difference2 = function(set) {
    return new Set([...this].filter(v=>!(set.has(v))));
};

const setA = new Set([1,2,3,4]);
const setB = new Set([2,3]);

console.log(setA.difference(setB));
console.log(setA.difference2(setB));
'''

598.
<부분 집합과 상위 집합>
'''
Set.prototype.isSupersetOf = function(subset) {
    for (const value of subset) {
        if (!this.has(value)) return false;
    }
    return true;
};

// 위의 isSupersetOf 메서드는 다음과 같이 구현 가능.
Set.prototype.isSupersetOf2 = function(subset) {
    const supersetArr = [...this];
    return [...subset].every(v=>supersetArr.includes(v));
};

const setA = new Set([1,2,3,4]);
const setB = new Set([2,3]);

console.log(setA.isSupersetOf(setB));
console.log(setA.isSupersetOf2(setB));
'''

599.
<Map>
키와 값의 쌍으로 이뤄진 컬렉션.
Map 객체의 특징
(1) 객체를 포함한 모든 값을 키로 사용할 수 있음.
(2) 이터러블임.
(3) map.size로 요소의 개수를 확인함.

600.
Map 생성자 함수로 생성되는 Map 객체.
'''
// Map 생성자 함수에 인수를 전달하지 않으면 빈 Map 객체가 생성됨.
const map = new Map();
console.log(map);

// Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성.
// 인수로 전달되는 이터러블은 키와 값의 쌍으로 이뤄진 요소여야 함.
const mapEx = new Map([
    ['key1', 'value1'], ['key2', 'value2']
]);
console.log(mapEx);

// 인수로 전달한 이터러블에 중복된 키를 갖는 요소가 존재하면 값이 덮어써짐.
// 따라서 Map 객체에는 중복된 키를 갖는 요소가 존재할 수 없음.
const mapEx2 = new Map([
   ['key1', 'value1'], ['key1', 'value2'] 
]);
console.log(mapEx2);
'''

601.
<Map.prototype.size>
Map 객체의 요소 개수 확인.
'''
const {size} = new Map([['k1', 'v1'], ['k2', 'v2']]);
console.log(size);

// size 프로퍼티는 임의로 변경할 수 없음.
console.log(Object.getOwnPropertyDescriptor(Map.prototype, 'size'));
'''

602.
<Map.prototype.set()>
Map 객체에 요소를 추가.
'''
const map = new Map();
console.log(map);

map.set('k1', 'v1');
console.log(map);

// set 메서드는 새로운 요소가 추가된 상태의 Map 객체를 반환하므로
// set 메서드를 연속적으로 호출 가능.
const map2 = new Map();
map2.set('k1', 'v1').set('k2', 'v2');
console.log(map2);

// 중복된 키와 함께 요소를 추가하면 기존 값이 덮어써짐.
const map3 = new Map();
map3.set('k1', 'v1').set('k1', 'v2');
console.log(map3);
'''

603.
Map 객체 내의 키로 NaN은 오로지 하나만 존재. NaN과 NaN을 같다고 평가함.
Map 객체 내의 키로 +0, -0은 일치 비교 연산자(===)가 같다고 평가함.

604.
Map 객체는 키 타입에 제한이 없음.
객체를 포함한 모든 값이 Map의 key로 사용될 수 있음.

605.
<Map.prototype.get()>
Map 객체에서 특정 요소를 취득.
인수로 키를 전달하면 Map 객체에서 해당 키를 갖는 값을 반환.
존재하지 않을 경우 undefined 반환.
'''
const map = new Map();
const lee = {name:'lee'};
const kim = {name:'kim'};

map
    .set(lee, 'developer')
    .set(kim, 'designer');

console.log(map.get(lee));      // developer
console.log(map.get('choi'));   // undefined
'''

606.
<Map.prototype.has()>
Map 객체에 특정 요소가 존재하는지 확인.
'''
const lee = {name:'lee'};
const kim = {name:'kim'};

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

console.log(map.has(lee));  //  true
console.log(map.has('choi'));   // false
'''

607.
<Map.prototype.delete()>
Map 객체의 요소 삭제.
삭제 성공 여부를 불리언값으로 반환.
'''
const lee = {name:'lee'};
const kim = {name:'kim'};

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

console.log(map.delete(lee));       // true
console.log(map.delete('yang'));    // false
'''

608.
<Map.prototype.clear()>
Map 객체의 요소를 일괄 삭제.
'''
const lee = {name:'lee'};
const kim = {name:'kim'};

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.clear();
console.log(map);
'''

609.
<Map.prototype.forEach()>
Map 객체의 요소를 순회.
콜백 함수와 콜백 함수 내부에서 this로 사용될 객체를 인수로 전달 받음.
콜백 함수는 다음 3개의 인수를 전달받음.
(1) 현재 순회 중인 요소값.
(2) 현재 순회 중인 요소키.
(3) 현재 순회 중인 Map 객체 자체.
'''
const lee = {name:'lee'};
const kim = {name:'kim'};

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.forEach((v, k, map)=>{
    console.log(v, k, map);
});
'''

610.
Map 객체는 이터러블이므로,
for...of 문, 스프레드 문법, 배열 디스트럭처링의 대상이 될 수 있음.
'''
const lee = {name:'lee'};
const kim = {name:'kim'};

const map = new Map([[lee, 'developer'], [kim, 'designer']]);
console.log(Symbol.iterator in map);    // true

for (const entry of map) {
    console.log(entry);
}

// 스프레드 문법
console.log([...map]);

// 배열 디스트럭처링
const [a, b] = map;
console.log(a, b);
'''

611.
Map 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드 제공.

(1) Map.prototype.keys
Map 객체에서 요소키를 값으로 갖는 이터러블이면서
동시에 이터레이터인 객체를 반환.

(2) Map.prototype.values
Map 객체에서 요소값을 값으로 갖는 이터러블이면서
동시에 이터레이터인 객체를 반환.

(3) Map.prototype.entries
Map 객체에서 요소키와 요소값을 갖는 이터러블이면서
동시에 이터레이터인 객체를 반환.

'''
const lee = {name:'lee'};
const kim = {name:'kim'};

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

for (const key of map.keys()) {
    console.log(key);
}
for (const value of map.values()) {
    console.log(value);
}
for (const entry of map.entries()) {
    console.log(entry);
}
'''
*/