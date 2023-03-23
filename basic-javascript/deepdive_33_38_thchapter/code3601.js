/*
574.
<디스트럭처링 할당(Destructuring Assignment)>
(=구조 분해 할당)
구조화된 배열과 같은 이터러블 또는 객체를 파괴하여,
1개 이상의 변수에 개별적으로 할당하는 것.

575.
배열 디스트럭처링 할당은 배열의 각 요소를 배열로부터 추출하여 1개 이상의 변수에 할당함.
배열 디스트럭처링 할당의 대상(할당문의 우변)은 이터러블이어야 함.
배열 디스트럭처링 할당의 좌변에는 값을 할당받을 변수를 선언함.
이 때 변수를 배열 리터럴 형태로 선언함.
'''
const arr = [1,2,3,4];

// 변수 one, two, three를 선언하고 arr의 요소를 순차적으로 할당한 것.
const [one, two, three] = arr;
console.log(one, two, three);   // 1 2 3
'''

576.
배열 디스트럭처링 할당의 변수 선언문은 선언과 할당을 분리할 수 있으나,
이럴 경우에는 변수를 const로 선언할 수 없음.

577.
배열 디스트럭처링 할당을 위한 변수에 기본값 설정 가능.
'''
const [a, b=10, c=3] = [1, 2];
console.log(a, b, c);   // 1 2 3
'''

578.
배열 디스트럭처링 할당은 이터러블에서 필요한 요소만 추출해 변수에 할당하고자 할 때 유용.
'''
function parseUrl(url='') {
    // match() 메서드는 문자열이 정규식과 매치되는 부분을 검색.
    const parsedURL = url.match(/^(\w+):\/\/([^/]+)\/(.*)$/);
    console.log(parsedURL);

    if(!parsedURL) return {};

    const [, protocol, host, path] = parsedURL;
    return { protocol, host, path };
}

const parsedURL = parseURL('https://developer.mozilla.org/ko/docs/Web);
console.log(parsedURL);
'''

579.
객체 디스트럭처링 할당은 객체의 각 프로퍼티를 객체로부터 추출하여 1개 이상의 변수에 할당.
객체 디스트럭처링 할당의 대상(할당문의 우변)은 객체이어야 함.
할당 기준은 프로퍼티 키, 즉 선언된 변수 이름과 프로퍼티 키가 일치하면 할당.
'''
const user = {firstName:'Heungmin', lastName:'Son'};
const [firstName, lastName] = user;
console.log(firstName, lastName);
'''

580.
객체의 프로퍼티 키와 다른 변수 이름으로 프로퍼티 값을 할당받으려면,
다음과 같이 변수를 선언.
'''
const user = {firstName:'Heungmin', lastName:'Son'};
const [firstName:fn, lastName:ln] = user;
console.log(fn, ln);
'''

581.
객체 디스트럭처링 할당을 위한 변수에 기본값 설정 가능.
'''
const {firstName:fn='anonymous', lastName:ln} = {lastName:'Lee'};
console.log(fn, ln);
'''

582.
객체 디스트럭처링 할당은 프로퍼티 키로 필요한 프로퍼티 값만 추출해 변수 할당할 때 유용.
객체 디스트럭처링 할당은 객체를 인수로 전달받는 함수의 매개변수에도 사용 가능.
'''
const str = 'Hello';
const {length} = str;
console.log(length);    // 5

function printTodo({content, completed}) {
    console.log(`${content}은 ${completed?'완료':'미완료'} 상태입니다.`);
}
printTodo({id:1, content:'HTML', completed:true});
'''
*/