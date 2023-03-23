/*
450.
Date 생성자 함수로 생성한 Date 객체는 현재 날짜와 시간을 나타내는 정수값을 가짐.
현재 날짜와 시간이 아닌 다른 날짜와 시간을 다루고자 하는 경우,
Date 생성자 함수에 명시적으로 해당 날짜와 시간 정보를 인수로 지정함.

451.
<new Date()>
Date 생성자 함수를 인수 없이 new 연산자와 함께 호출 시,
현재 날짜와 시간을 가지는 Date 객체를 반환함.
ex) new Date();

Date 생성자 함수를 new 연산자 없이 호출하면,
Date 객체를 반환하지 않고 날짜와 시간 정보를 나타내는 문자열을 반환함.
ex) Date();

452.
<new Date(milliseconds)>
Date 생성자 함수에 숫자 타입의 밀리초를 인수로 전달하면,
1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼
경과한 날짜와 시간을 나타내는 Date 객체를 반환함.
'''
const date_0 = new Date(0);
console.log(date_0); // 1970-01-01T00:00:00.000Z

// 86400000ms는 1Day를 의미
const date_86400000 = new Date(86400000);
console.log(date_86400000); // 1970-01-02T00:00:00.000Z
'''

453.
<new Date(dateString)>
Date 생성자 함수에 날짜와 시간을 나타내는 문자열을 인수로 전달하면,
지정된 날짜와 시간을 나타내는 Date 객체를 반환.
이때, 인수로 전달한 문자열은 Date.parse 메서드에 의해 해석 가능해야 함.
'''
new Date('May 26, 2020 10:00:00');
new Date('2020/05/26/10:00:00');
'''

454.
<new Date(year, month[,date,hour,minute,second,millisecond])>
Date 생성자 함수에 연,월,일,시,분,초,밀리초를 의미하는 숫자를 인수로 전달하면,
지정된 날짜와 시간을 나타내는 Date 객체를 반환함. 이때 연,월은 반드시 지정해야 함.
지정하지 않은 옵션 정보는 0 또는 1로 초기화됨.
-> year, month, day, hour, minute, second, millisecond
'''
let date = new Date(2020, 2);
console.log(date);

date = new Date(2020, 2, 26, 10, 00, 00, 0);
console.log(date);

date = new Date('2020/3/26/10:00:00:00');
console.log(date);
'''

455.
<Date.now>
1970년 1월 1일 00:00:00(UTC)을 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환.
'''
const now = Date.now();
new Date(now);
'''

456.
<Date.parse>
1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된
지정 시간까지의 밀리초를 숫자로 반환.
'''
// UTC
Date.parse('Jan 2, 1970 00:00:00 UTC');

// KST
Date.parse('1970/01/02/09:00:00');
'''

457.
<Date.UTC>
1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된
지정 시간까지의 밀리초를 숫자로 반환. 단, 로컬 타임(KST)이 아닌 UTC로 인식함.
month는 월을 의미하는 0~11까지의 정수임. 0부터 시작하므로 주의 필요.
ex) Date.UTC(1970, 0, 2);

458.
<Date.prototype.getFullYear> & <Date.prototype.setFullYear>
Date.prototype.getFullYear는 Date 객체의 연도를 나타내는 정수를 반환.
Date.prototype.setFullYear는 Date 객체의 연도를 나타내는 정수를 설정하며,
연도 이외에 옵션으로 월, 일도 설정 가능함.
'''
new Date('2020/07/26').getFullYear();	// 2020

const today = new Date();
console.log(today.getFullYear());	// 2022
today.setFullYear(2000);
console.log(today.getFullYear());	// 2000

today.setFullYear(1901, 0, 1);
console.log(today.getFullYear());	// 1901
'''

459.
<Date.prototype.getMonth> & <Date.prototype.setMonth>
Date.prototype.getMonth는 Date 객체의 월을 나타내는 0~11의 정수를 반환.
1월은 0, 12월은 11임.
Date.prototype.setMonth는 Date 객체의 월을 나타낸느 0~11의 정수를 설정함.
월 이외에 옵션으로 일도 설정 가능.
'''
const today = new Date();
today.setMonth(0);	// 1월
today.getMonth();	// 0

today.setMonth(11,1);	// 12월 1일
today.getMonth();	// 11
'''

460.
<Date.prototype.getDate> & <Date.prototype.setDate>
Date.prototype.getDate는 Date 객체의 날짜(1~31)를 나타내는 정수를 반환.
Date.prototype.setDate는 Date 객체의 날짜(1~31)를 나타내는 정수를 설정.
'''
const today = new Date();
today.setDate(1);
today.getDate();	// 1
'''

461.
<Date.prototype.getDay>
Date.prototype.getDay는 Date 객체의 요일(0~6)을 나타내는 정수를 반환.
0: 일요일, 6: 토요일
ex) new Date('2021/01/25').getDay();

462.
<Date.prototype.getHours> & <Date.prototype.setHours>
Date.prototype.getHours는 Date 객체의 시간(0~23)을 나타내는 정수를 반환.
Date.prototype.setHours는 Date 객체의 시간(0~23)을 나타내는 정수를 설정.
시간 이외에 옵션으로 분, 초, 밀리초 설정 가능.

463.
<Date.prototype.getMinutes> & <Date.prototype.setMinutes>
Date.prototype.getMinutes는 Date 객체의 분(0~59)을 나타내는 정수를 반환.
Date.prototype.setMinutes는 Date 객체의 분(0~59)을 나타내는 정수를 설정.
분 이외에 옵션으로 초, 밀리초 설정 가능.

464.
<Date.prototype.getSeconds> & <Date.prototype.setSeconds>
Date.prototype.getSeconds는 Date 객체의 초(0~59)를 나타내는 정수를 반환.
Date.prototype.setSeconds는 Date 객체의 초(0~59)를 나타내는 정수를 설정.
초 이외에 옵션으로 밀리초 설정 가능.

465.
<Date.prototype.getMilliseconds> & <Date.prototype.setMilliseconds>
Date.prototype.getMilliSeconds는 Date 객체의 밀리초(0~999)를 나타내는 정수를 반환.
Date.prototype.setMilliSeconds는 Date 객체의 밀리초(0~999)를 나타내는 정수를 설정.

466.
<Date.prototype.getTime> & <Date.prototype.setTime>
Date.prototype.getTime은 1970년 1월 1일 00:00:00(UTC)를 기점으로,
Date 객체의 시간까지 경과된 밀리초를 반환.
Date.prototype.setTime은 Date 객체에 1970년 1월 1일 00:00:00(UTC)를
기점으로 경과된 밀리초를 설정함.
'''
new Date('2020/09/13/11:50').getTime();

const today = new Date();
console.log(today);	// 2022-01-29T10:29:13.202Z

today.setTime(86400000);
console.log(today);	// 1970-01-02T00:00:00.000Z
'''

467.
<Date.prototype.getTimezoneOffset>
UTC와 Date 객체에 지정된 로캘(locale) 시간과의 차이를 분 단위로 반환.
KST는 UTC에 9시간을 더한 시간임. 즉, UTC = KST - 9h 임.
'''
const today = new Date();
today.getTimezoneOffset() / 60;	// -9
'''

468.
<Date.prototype.toDateString> & <Date.prototype.toTimeString>
Date.prototype.toDateString은
사람이 읽을 수 있는 형식의 문자열로 Date 객체의 "날짜"를 반환.
Date.prototype.toTimeString은
사람이 읽을 수 있는 형식의 문자열로 Date 객체의 "시간"을 반환.
'''
const today = new Date('2019/11/14/13:30');
console.log(today.toString());	// Thu Nov 14 2019 13:30:00 GMT+0000 (GMT)
console.log(today.toDateString());	// Thu Nov 14 2019
'''

469.
<Date.prototype.toISOString>
ISO 8601 형식으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환.
'''
const today = new Date('2021/10/19');
console.log(today.toString());
// expected output : Tue Oct 19 2021 00:00:00 GMT+0000 (GMT)
console.log(today.toISOString());
// expected output : 2021-10-19T00:00:00.000Z

console.log(today.toISOString().slice(0, 10));
// expected output : 2021-10-19

console.log(today.toISOString().slice(0, 10).replace(/-/g, ''));
// expected output : 20211019
'''

cf. Array.prototype.slice()
slice() 메서드는 어떤 배열의 begin부터 end까지(end 미포함)에 대한
얕은 복사본을 새로운 배열 객체로 반환. 원본 배열은 바뀌지 않음.

470.
<Date.prototype.toLocaleString>
인수로 전달한 로캘을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환함.
인수를 생략한 경우, 브라우저가 동작 중인 시스템의 로캘을 적용함.
'''
const today = new Date();
today.toString();
today.toLocaleString();
today.toLocaleString('ko-KR');
today.toLocaleString('en-US');
'''

471.
<Date.prototype.toLocaleTimeString>
인수로 전달한 로켈을 기준으로 Date 객체의 시간을 표현한 문자열을 반환.
인수를 생략한 경우 브라우저가 동작 중인 시스템의 로캘을 적용.
'''
const today = new Date();
today.toString();
today.toLocaleTimeString();
today.toLocaleTimeString('ko-KR');
today.toLocaleTimeString('en-US');
'''

472.
Date를 활용한 시계 예제
'''
(function printNow() {
	const today = new Date();
	
	const dayNames = [
		'(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'
	];
	
	const day = dayNames[today.getDay()];
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const date = today.getDate();
	let hour = today.getHours();
	let minute = today.getMinutes();
	let second = today.getSeconds();
	const ampm = hour>=12 ? 'PM':'AM';
	
	hour %= 12;
	hour = hour || 12;	// 0일 경우 12를 재할당
	
	minute = minute < 10 ? '0'+minute : minute;
	second = second < 10 ? '0'+second : second;
	
	const now =
	`${year} ${month} ${date} ${day} ${hour}:${minute}:${second}`
	+ ` ${ampm}`;
	
	console.log(now);
	
	setTimeout(printNow, 1000);
})();
'''
*/