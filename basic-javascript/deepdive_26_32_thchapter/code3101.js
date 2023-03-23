/*
473.
정규표현식(Regular Expression)
일정한 패턴을 가진 문자열의 집합을 표현하기 위한 형식 언어.

474.
정규표현식은 문자열을 대상으로 패턴 매칭 기능을 제공함.
즉, 특정 패턴과 일치하는 문자열을 검색하거나 추출 또는 치환하는 기능을 제공.
'''
// 휴대폰 번호 패턴 체크
const tel = '010-1234-567팔';
const regExp = /^\d{3}-\d{4}-\d{4}/;
console.log(regExp.test(tel));	// false
'''

475.
정규표현식은 주석이나 공백을 허용하지 않고,
여러 가지 기호를 혼합하여 사용하므로 가독성이 좋지 않은 단점이 존재.

476.
정규 표현식 객체(RegExp 객체)를 생성하기 위해,
정규 표현식 리터럴과 RegExp 생성자 함수를 사용할 수 있음.
'''
const target = 'Is this all there is?';

// 패턴: is
// 플래그: i => 대소문자를 구분하지 않고 검색
const regExp = /is/i;

// test 메서드는 target 문자열에 대해 정규 표현식 regExp의 패턴을 검색해
// 매칭 결과를 불리언 값으로 반환함.
const boolVal = regExp.test(target);
console.log(boolVal);   // true
'''

477.
RegExp 생성자 함수를 이용해 RegExp 객체를 생성할 수도 있음.
-> new RegExp(pattern[, flags])
// pattern : 정규 표현식의 패턴
// flags : 정규 표현식의 플래그(g, i, m, u, y)
'''
const target = 'Is this all there is?';

const regExp = new RegExp(/is/i);	// ES6
// const regExp = new RegExp(/is/, 'i');
// const regExp = new RegExp('is', 'i');

regExp.test(target);	// true
'''

478.
RegExp 생성자 함수를 사용하면, 변수를 사용해 동적으로 RegExp 객체를 생성 가능.
'''
const count = (str, char) =>
	(str.match(new RegExp(char, 'gi')) ?? []).length;

count('Is this all there is?', 'is');	// 3
count('Is this all there is?', 'xx');	// 0
'''

479.
<RegExp.prototype.exec>
인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여,
매칭 결과를 배열로 반환. 매칭 결과가 없는 경우 null 반환.
'''
const target = 'Is this all there is?';
const regExp = /is/;

const arr = regExp.exec(target);
console.log(arr);
// [ 'is', index: 5,
// input: 'Is this all there is?', groups: undefined ]
'''
exec 메서드는 문자열 내의 모든 패턴을 검색하는 g 플래그를 지정해도,
첫 번째 매칭 결과만 반환함.

480.
<RegExp.prototype.test>
인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여,
매칭 결과를 불리언 값으로 반환.
'''
const target = 'Is this all there is?';
const regExp = /is/;

regExp.test(target);	// true
'''

481.
<String.prototype.match>
String 표준 빌트인 객체가 제공하는 match 메서드는
대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환.
'''
const target = 'Is this all there is?';
let regExp = /is/;

console.log(target.match(regExp));
// [ 'is', index: 5,
// input: 'Is this all there is?', groups: undefined ]

console.log(regExp.exec(target));
// [ 'is', index: 5,
// input: 'Is this all there is?', groups: undefined ]

regExp = /is/g;
console.log(target.match(regExp));
// [ 'is', 'is' ]
'''

482.
플래그
패턴과 함께 정규 표현식을 구성하며, 정규 표현식의 검색 방식을 설정하기 위해 사용.
i : Ignore case, 대소문자를 구별하지 않고 패턴을 검색.
g : Global, 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색.
m : Multi line, 문자열의 행이 바뀌더라도 패턴 검색을 계속.
어떠한 플래그를 사용하지 않은 경우, 대소문자를 구별해서 패턴을 검색.
문자열에 패턴 검색 매칭 대상이 1개 이상 존재해도 첫 번째 매칭한 대상만 검색하고 종료.
'''
const target = 'Is this all there  is?';

console.log(target.match(/is/));
// [ 'is', index: 5, input: 'Is this all there  is?', groups: undefined ]
console.log(target.match(/is/i));
// [ 'Is', index: 0, input: 'Is this all there  is?', groups: undefined ]
console.log(target.match(/is/g));
// [ 'is', 'is' ]
console.log(target.match(/is/ig));
// [ 'Is', 'is', 'is' ]
'''

483.
패턴
정규 표현식의 패턴은 문자열의 일정한 규칙을 표현하기 위해 사용.
패턴은 '/'로 열고 닫으며, 문자열의 따옴표는 생략함.
따옴표 포함 시 해당 따옴표까지도 패턴에 포함되어 검색됨.
패턴은 특별한 의미를 가지는 메타문자 또는 기호로 표현할 수 있음.

484.
정규 표현식의 패턴에 문자 또는 문자열을 지정하면,
검색 대상 문자열에서 패턴으로 지정한 문자 또는 문자열을 검색함.
기본적으로 검색 대상 문자열과 플래그를 생략한 정규 표현식의 매칭 결과를 구하면,
대소문자를 구별하여 정규 표현식과 매치한 첫 번째 결과만 반환.
'''
const target = 'Is this all there is?';

const regExp = /is/;
regExp.test(target);	// true

const result = target.match(regExp);
console.log(result);
'''

485.
대소문자를 구별하지 않으려면 플래그 i 사용.
ex) const regExp = /is/i;
모든 문자열을 전역 검색하려면 플래그 g 사용.
ex) const regExp = /is/ig;

486.
점(.)은 임의의 문자 한 개를 의미. 문자의 내용이 무엇이든 상관 없음.
'''
const target = "Is this all there is?'

// 문자 3개가 연속되는 것을 찾음
const regExp = /.../g;

target.match(regExp);
'''

487.
{m,n}은 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열을 의미.
콤마 뒤에 공백이 있으면 정상 동작하지 않으므로 주의.
'''
const target = 'A AA B BB Aa Bb AAA';

// A가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색
const regExp = /A{1,2}/g;

target.match(regExp);
'''

488.
{n}은 앞선 패턴이 n번 반복되는 문자열을 의미. 즉, {n,n}과 같음.
'''
const target = 'A AA B BB Aa Bb AAA';

// A가 2번 반복되는 문자열을 전역 검색
const regExp = /A{2}/g;

target.match(regExp);
'''

489.
{n,}는 앞선 패턴이 최소 n번 이상 반복되는 문자열을 의미.
'''
const target = 'A AA B BB Aa Bb AAA';

const regExp = /A{2,}/g;
target.match(regExp);
'''

490.
+는 앞선 패턴이 최소 한번 이상 반복되는 문자열을 의미.
'''
const target = 'A AA B BB Aa Bb AAA';

const regExp = /A+/g;
target.match(regExp);
'''

491.
?는 앞선 패턴이 최대 한 번(0번 포함) 이상 반복되는 문자열을 의미.
즉, {0,1}과 같음.
'''
const target = 'color colour colouur';

const regExp = /colou?r/g;
target.match(regExp);	// [ 'color', 'colour' ]
'''

492.
|는 or의 의미를 가짐.
'''
const target = 'A AA B BB Aa Bb';

// A 또는 B를 전역 검색
const regExp = /A|B/g;
target.match(regExp);
'''

493.
+는 분해되지 않은 단어 레벨로 검색하기 위해 사용.
'''
const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색
const regExp = /A+|B+/g;

target.match(regExp);
'''

494.
[] 내의 문자는 or로 동작. 그 뒤에 +를 사용하면 앞선 패턴을 한 번 이상 반복.
'''
const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색
const regExp = /[AB]+/g;

target.match(regExp);
'''

495.
밤위를 지정하려면 [] 내에 -를 사용.
'''
const target = 'A AA BB ZZ Aa Bb';

// 'A' ~ 'Z'가 한 번 이상 반복되는 문자열을 전역 검색.
const regExp = /[A-Z]+/g;

target.match(regExp);
'''

496.
대소문자를 구별하지 않고 알파벳을 검색하는 방법.
'''
const target = 'AA BB Aa B 12';

// 'A' ~ 'Z' 또는 'a' ~ 'z'가 한 번 이상 반복되는 문자열을 전역 검색.
const regExp = /[A-Za-z]+/g;

target.match(regExp);
'''

497.
숫자를 검색하는 방법.
'''
const target = 'AA BB 12,345';

// 0 ~ 9가 한번 이상 반복되는 문자열을 전역 검색
const regExp = /[0-9]+/g;

target.match(regExp);	// ["12", "345"]
'''

쉼표로 인해 매칭 결과가 분리되는 것을 방지하려면,
쉼표를 패턴에 포함시켜야 함.
'''
const target = 'AA BB 12,345';

// 0 ~ 9 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색
const regExp = /[0-9,]+/g;

target.match(regExp);	// ["12,345"]
'''

498.
\d는 [0-9]와 같음.
\D는 숫자가 아닌 문자를 의미함.
'''
const target = 'AA BB 12,345';

// 0 ~ 9 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색
let regExp = /[\d,]+/g;

target.match(regExp);	// ["12,345"]

// 0 ~ 9가 아닌 문자 또는 ','가 한 번 이상 반복되는 문자열을 전역 검색.
regExp = /[\D,]+/g;

target.match(regExp);	// ["AA BB ", ","]
'''

499.
\w는 알파벳, 숫자, 언더스코어를 의미. 즉, [A-Za-z0-9_]와 같음
\W는 알파벳, 숫자, 언더스코어가 아닌 문자를 의미.

500.
[...] 내의 ^는 not의 의미를 가짐.
ex) const regExp = /[^0-9]+/g;

501.
[...] 밖의 ^는 문자열의 시작을 의미.
'''
const target = 'https://www.naver.com';

// https로 시작하는지 검사
const regExp = /^https/;

regExp.test(target);	// true
'''

502.
$는 문자열의 마지막을 의미.
'''
const target = 'https://www.naver.com;

// com으로 끝나는지 검사
const regExp = /com$/;

regExp.test(target);	// true
'''

503.
다음의 504 ~ 511번은 자주 사용하는 정규표현식에 대한 예시.

504.
<특정 단어로 시작하는지 검사>
ex) 검색 대상 문자열이 'http://' 또는 'https://'으로 시작하는지 검사.
[tip] ?은 앞선 패턴이 최대 한 번(0번 포함) 이상 반복되는지를 의미.
'''
const url = 'https://example.com';

/^https?:\/\//.test(url);	// true
/^(http|https):\/\//.test(url);	// true
'''

505.
<특정 단어로 끝나는지 검사>
ex) 검색 대상 문자열이 html로 끝나는지 검사.
[tip] $는 문자열의 마지막을 의미.
'''
const fileName = 'index.html';

/html$/.test(fileName);	// true
'''

506.
<숫자로만 이뤄진 문자열인지 검사>
ex) 검색 대상 문자열이 숫자로만 이뤄진 문자열인지 검사.
[tip] [...] 바깥의 ^은 문자열의 시작을 의미.
[tip] \d는 숫자를 의미.
[tip] +는 앞선 패턴이 최소 한 번 이상 반복되는 문자열을 의미.
'''
const target = '12345';

/^\d+$/.test(target);	// true
'''

507.
<하나 이상의 공백으로 시작하는지 검사>
ex) 검색 대상 문자열이 하나 이상의 공백으로 시작하는지 검사.
[tip] \s는 여러 가지 공백 문자를 의미함. (= [\t\r\n\v\f] )
'''
const target = '  Hello!';

/^[\s]+/.test(target);	// true
'''

508.
<아이디로 사용 가능한지 검사>
ex) 검색 대상 문자열이 알파벳 대소문자, 숫자로 시작하고 끝나며 4~10자리인지 검사.
[tip] {n,m}은 앞선 패턴이 최소 n번, 최대 m번 반복되는 문자열을 의미.
'''
const id = 'abc1234';

/^[A-Za-z0-9]{4,10}$/.test(id);	// true
'''

509.
<메일 주소 형식에 맞는지 검사>
ex) 검색 대상 문자열이 메일 주소 형식에 맞는지 검사.
[tip] * 는 0개 이상 나타나는 문자로,
[tip] a*b는 'a'가 앞에 있을 수도 있고 여러개 있을 수도 있고,
[tip] 'b'도 뒤에 있을 수도 있고 여러 개 있을 수도 있음.
[tip] 'aab', 'ab', 'b'모두 가능
'''
const email = 'something@gmail.com';

/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z])*\.[a-zA-Z\{2,3}$/.test(email);	// true
'''

cf.
인터넷 메시지 형식 규약인 RFC 5322에 맞는 정교한 패턴 매칭이 필요할 경우,
다음의 링크를 통해 확인해야 함: https://emailregex.com/

(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])

510.
<핸드폰 번호 형식에 맞는지 검사>
ex) 검색 대상 문자열이 핸드폰 번호 형식에 맞는지 검사.
'''
const cellphone = '010-1234-1234';

/^\d{3}-\d{3,4}-\d{4}$/.test(cellphone);	// true
'''

511.
<특수 문자 포함 여부 검사>
ex) 검색 대상 문자열에 특수 문자가 포함되어 있는지 검사.
[tip] [...] 안의 ^는 not을 의미.
[tip] ()는 그룹을 의미.
[tip] 그룹이란, 텍스트를 괄호로 묶은 것.
[tip] 두 가지 이상의 패턴 중 하나를 선택하거나 서브패턴을 만들때 역참조하기 위해 사용.
'''
// 특수 문자는 A-Za-z0-9 이외의 문자를 의미.
const target = 'abc#1234';

(/[^A-Za-z0-9]/gi).test(target);	// true
'''

cf.
특수 문자를 제거하기 위해서는 String.prototype.replace 메서드를 사용.
ex) target.replace(/[^A-Za-z0-9]/gi, '');
*/
