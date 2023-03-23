/*
1.
<Ajax>
Ajax(Asynchronous Javascript and XML)란 자바스크립트를 사용하여
브라우저가 서버에게 비동기 방식으로 데이터를 요청하고,
서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식을 의미.

2.
Ajax는 Web API인 XMLHttpRequest 객체를 기반으로 동작.
XMLHttpRequest는 HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공.

3.
이전의 웹 페이지는 html 태그로 시작해 html 태그로 끝나는 완전한 HTML을
서버로부터 전송받아 웹페이지 전체를 처음부터 다시 렌더링하는 방식으로 동작했음.
다음과 같은 단점 존재.
(1) 이전 웹페이지와 차이가 없어서 변경할 필요가 없는 부분까지 서버로부터 매번 전송 받으므로,
불필요한 데이터 통신이 발생함.
(2) 변경할 필요가 없는 부분까지 처음부터 다시 렌더링함.
(3) 클라이언트-서버 간 통신이 동기 방식으로 동작하여 서버로부터 응답이 있을 때까지
다음 처리가 블로킹됨.

4.
Ajax는 서버로부터 웹페이지의 변경에 필요한 데이터만 비동기 방식으로 전송받아
웹페이지를 변경할 필요가 없는 부분은 다시 렌더링하지 않고, 변경할 필요가 있는 부분만
한정적으로 렌더링하는 방식이 가능하도록 함.

5.
<JSON>
JSON(Javascript Object Notation)은
클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷.
자바스크립트에 종속되지 않는 언어 독립형 데이터 포맷.

6.
JSON 표기 방식 : 키와 값으로 구성된 순수한 텍스트.
JSON의 키는 반드시 큰따옴표로 묶어야 함.
값은 객체 리터럴과 같은 표기법을 그대로 사용 가능.
그러나, 문자열은 반드시 큰따옴표로 묶어야 함.
ex)
{
	"name": "Son",
	"age": 20,
	"retirement": false,
	"position" : ["LW", "RW"]
}

7.
<JSON.stringify>
객체를 JSON 포맷의 문자열로 변환함.
클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야 하는데, 
이를 직렬화(Serializing)라고 함.
'''
const obj = {
	name: "Son",
	age:20
	retirement:false,
	position:['FW', 'RW']
};

// 객체를 JSON 포맷의 문자열로 변환
const json = JSON.stringify(obj);
console.log(typeof json);	// string
console.log(json);

// 객체를 JSON 포맷의 문자열로 변환하며 들여쓰기 함
const prettyJson = JSON.stringify(obj, null, 2);
console.log(typeof prettyJson);	// string
console.log(prettyJson);

// 값의 타입이 Number이면 필터링되어 반환되지 않음
function filter(key, value) {
	// undefined : 반환하지 않음
	return typeof value === 'number' ? undefined : value;
}

// JSON.stringify의 두 번째 인자로 replacer 함수 전달
const strFilteredObj = JSON.stringify(obj, filter, 2);
console.log(typeof strFilteredObj);
console.log(strFilteredObj);
'''

8.
JSON.stringify는 배열도 JSON 포맷의 문자열로 변환함.
'''
const todos = [
	{id:1, content:'HTML', completed:true},
	{id:2, content:'CSS', completed:false},
	{id:3, content:'javascript', completed:true}
];

const json = JSON.stringify(todos, null, 2);
console.log(typeof json);
console.log(json);
'''

9.
<JSON.parse>
JSON 포맷의 문자열을 객체로 변환.
서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열임.
이 문자열을 객체로 활용하려면 JSON 포맷의 문자열을 객체화해야 하는데
이를 역직렬화(Deserializing)라 함.
'''
const obj = {
	name:'Son',
	age:20
	retirement:false,
	position:['FW', 'RW']
};

const json = JSON.stringify(obj);
const parsed = JSON.parse(json);

console.log(typeof parsed);	// object
console.log(parsed);
'''

10.
배열이 JSON 포맷의 문자열로 변환되어 있는 경우,
JSON.parse는 문자열을 배열 객체로 변환함.
배열의 요소가 객체인 경우 배열의 요소까지 객체로 변환함.
'''
const todos = [
	{id:1, content:'HTML', completed:true},
	{id:2, content:'CSS', completed:false},
	{id:3, content:'javascript', completed:true}
];

const json = JSON.stringify(todos);
const parsed = JSON.parse(json);

console.log(typeof parsed);	// object
console.log(parsed);
'''

11.
<XMLHttpRequest>
브라우저는 주소창이나 HTML의 form 또는 a 태그를 통해
HTTP 요청 전송 기능을 기본 제공함.
XMLHttpRequest 객체를 사용해 자바스크립트로 HTTP 요청을 전송함.
XMLHttpRequest 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 메서드, 프로퍼티 제공.

12.
XMLHttpRequest 객체 생성.
브라우저에서 제공하는 Web API 이므로 브라우저 환경에서만 정상 작동.
const xhr = new XHMHttpRequest();

13.
XMLHttpRequest 객체는 다양한 프로퍼티와 메서드를 제공.
(1) XMLHttpRequest 객체의 프로토타입 프로퍼티
readyState  	: HTTP 요청의 현재 상태를 나타내는 정수.
status		    : HTTP 요청에 대한 응답 상태를 나타내는 정수.
statusText  	: HTTP 요청에 대한 응답 메시지를 나타내는 문자열.
responseType	: HTTP 응답 타입.
response	    : HTTP 요청에 대한 응답 몸체로 responseType에 따라 다름.
responseText	: 서버가 전송한 HTTP 요청에 대한 응답 문자열.

(2) XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티
onreadystatechange	: readyState 프로퍼티 값이 변경된 경우.
onloadstart	: HTTP 요청에 대한 응답을 받기 시작한 경우.
onprogress	: HTTP 요청에 대한 응답을 받는 도중 주기적으로 발생.
onabort		: abort 메서드에 의해 HTTP 요청이 중단된 경우.
onerror		: HTTP 요청에 에러가 발생한 경우.
onload		: HTTP 요청이 성공적으로 완료된 경우.
ontimeout	: HTTP 요청 시간이 초과한 경우.
onloadend	: HTTP 요청이 완료된 경우. HTTP 요청이 성공 또는 실패하면 발생.

(3) XMLHttpRequest 객체의 메서드
open	: HTTP 요청 초기화.
send	: HTTP 요청 전송.
abort	: 이미 전송된 HTTP 요청 중단.
setRequestHeader	: 특정 HTTP 요청 헤더의 값을 설정.
getResponseHeader	: 특정 HTTP 응답 헤더의 값을 문자열로 반환.

(4) XMLHttpRequest 객체의 정적 프로퍼티
UNSENT		    	0	open 메서드 호출 이전
OPENED		    	1	open 메서드 호출 이후
HEADERS_RECEIVED	2	send 메서드 호출 이후
LOADING		    	3	서버 응답중(응답 데이터 미완성)
DONE		    	4	서버 응답 완료

14.
<HTTP 요청 전송 순서>
(1) XMLHttpRequest.prototype.open 메서드로 HTTP 요청 초기화.
(2) 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로
특정 HTTP 요청의 헤더값을 설정.
(3) XMLHttpRequest.prototype.send 메서드로 HTTP 요청을 전송.
'''
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open('GET', '/users');

// HTTP 요청 헤더 설정
// 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정 : json
xhr.setRequestHeader('content-type', 'application/json');

// HTTP 요청 전송
xhr.send();
'''

15.
<XMLHttpRequest.prototype.open>
서버에 전송할 HTTP 요청을 초기화.
-> xhr.open(method, url[, async])
method	: HTTP 요청 메서드 ex) GET, POST, PUT, DELETE 등
url	: HTTP 요청을 전송할 url
async	: 비동기 요청 여부. 옵션으로 기본값은 true. 비동기 방식으로 동작.

16.
HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법.
주로 GET, POST, PUT, PATCH, DELETE를 사용해 CRUD를 구현.
HTTP 요청 메서드	종류		목적			페이로드
GET		index/retrieve	모든/특정 리소스 취득	X
POST		create		리소스 생성		O
PUT		replace		리소스의 전체 교체		O
PATCH		modify		리소스의 일부 수정		O
DELETE		delete		모든/특정 리소스 삭제	X

cf. 페이로드(payload)
사용에 있어서 전송되는 데이터를 뜻함. 전송의 근본적인 목적이 되는 데이터의 일부분.
함께 전송되는 헤더와 메타데이터와 같은 데이터는 제외함.

17.
<XMLHttpRequest.prototype.send>
send 메서드는 open 메서드로 초기화된 HTTP 요청을 서버에 전송.
GET : 데이터를 URL의 일부분인 쿼리 문자열로 서버에 전송.
POST : 데이터(페이로드)를 요청 몸체에 담아 전송.

send() 에서는 요청 몸체에 담아 전송할 데이터(페이로드)를 인수로 전달 가능.
페이로드가 객체라면, JSON.stringify() 를 사용해 직렬화한 뒤 전달해야 함.
ex) xhr.send(JSON.stringify({id:1, content:'HTML'}));

HTTP 요청 메서드가 GET인 경우 send 메서드에 페이로드로 전달한 인수는 무시됨.
요청 몸체는 null로 설정됨.

18.
<XMLHttpRequest.prototype.setRequestHeader>
특정 HTTP 요청의 헤더 값을 설정. 반드시 open 메서드 이후에 호출.
자주 사용하는 HTTP 요청 헤더로는 Content-type과 Accept가 있음.
(1) Content-type
요청 몸체에 담아 전송할 데이터의 MIME 타입의 정보를 표현.
text - text/plain, text/html, text/css, text/javascript
application - application/json, application/x-www-form-urlencode
multipart - multipart/formed-data
'''
const xhr = new XMLHttpRequest();
xhr.open('POST', '/users');

xhr.setRequestHeader('content-type', 'application/json');

xhr.send(JSON.stringify({id:1, content:'HTML'}));
'''

(2) Accept
서버가 응답할 데이터의 MIME 타입을 지정.
ex) xhr.setRequestHeader('accept', 'application/json');
Accept 헤더를 설정하지 않을 경우 send 메서드가 호출될 때 Accept 헤더가 * / *로 전송됨.

19.
<HTTP 응답 처리>
서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 함.
XMLHttpRequest의 이벤트 핸들러 프로퍼티를 가짐.
'''
// HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티 값이 변경된 경우
// 발생하는 readystatechange 이벤트를 캐치하여 HTTP 응답을 처리하는 예제.

const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

xhr.send();

// readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는
// readyState 프로퍼티가 변경될 때마다 발생.

xhr.onreadystatechange = () => {
	// readyState 프로퍼티는 HTTP 요청의 현재 상태를 나타냄.
	// 프로퍼티 값이 4가 아니면 서버 응답이 완료되지 않은 상태임.
	
	// 만약 서버 응답이 완료되지 않았다면 아무런 처리를 하지 않음
	if(xhr.readyState !== XMLHttpRequest.DONE) return;
	
	// status는 응답 상태 코드. 200일 경우 정상 응답.
	// 정상으로 응답된 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨 있음.
	if (xhr.status === 200) {
		console.log(JSON.parse(xhr.response));
	}
	else {
		console.log('Error', xhr.status, xhr.statusText);
	}
};
'''

20.
위의 예제를 readyStatechange가 아닌 load 이벤트로 캐치하는 예제.
load 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생.
따라서 load 이벤트를 캐치하는 경우,
xhr.readyState가 XMLHttpRequest.DONE인지 확인할 필요가 없음.
'''
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
// https://jsonplaceholder.typicode.com은 Fake REST API를 제공하는 서비스.
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
xhr.send();

xhr.onload = () => {
    if (xhr.status === 200) {
        console.log(JSON.parse(xhr.response));
    }
    else [
        console.error('Error', xhr.status, xhr.statusText);
    ]
};
'''
*/