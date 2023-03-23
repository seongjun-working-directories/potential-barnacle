const xlsx = require('xlsx');
const axios = require('axios');
const cheerio = require('cheerio');

// 엑셀 파일을 읽는 코드
const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.Sheet1;
const records = xlsx.utils.sheet_to_json(ws);
// [TEST] console.log(records);

// 웹 크롤링을 하는 코드
const simpleCrawler = async () => {
    /*
    // 순서를 보장하지 않더라도, 빠르게 처리하기 위해 Promise.all() 사용
    // records.map()을 순서 신경 쓰지 않고 처리함
    await Promise.all(records.map(async (r)=>{
        const response = await axios.get(r.링크);
        if (response.status === 200) {  // 응답 성공 시

            // response.data는 서버가 제공한 응답을 담고 있음
            const html = response.data;
            // [TEST] console.log(html);

            // 서버의 응답 안에서 html 코드를 추출함.
            // $ 변수를 통해 태그에 접근 가능.
            const $ = cheerio.load(html);

            const text = $('.score.score_left .star_score').text();
            console.log(r.제목, " 평점: " + text.trim());
        }
    }));
    */

    // 조금 느리게 처리되더라도, 순서를 보장하기 위해 for...of문과 await을 함께 사용
    for (const [i, r] of records.entries()) {
        const response = await axios.get(r.링크);
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            
            const text = $('.score.score_left .star_score').text();
            console.log(r.제목, " 평점: " + text.trim());
        }
    }
};

simpleCrawler();

/*
[ Chrome에서 태그를 검색하는 방법 ]
chrome에서 접근하고자 하는 요소에 오른쪽 버튼 클릭 후
검사 버튼을 누르면 DevTools에 해당 요소가 하이라이트되어 뜨게 됨.
하이라이트된 요소에 오른쪽 버튼 클릭 후 copy > copy selector 통해 쉽게 태그 추출 가능.

< Promise.all() >
매개변수 : Array와 같이 순회 가능한(iterable) 객체.

반환 값 :
매개변수로 주어진 순회 가능한 객체가 비어 있으면 이미 이행한 Promise.
객체에 프로미스가 없으면, 비동기적으로 이행하는 Promise.
    단, Google Chrome 58은 이미 이행한 프로미스를 반환.
그렇지 않은 경우, 대기 중인 Promise.
    결과로 반환하는 프로미스는 인자의 모든 프로미스가 이행하거나
    어떤 프로미스가 거부할 때 (호출 스택이 비는 즉시) 비동기적으로 이행/거부.
    반환하는 프로미스의 이행 값은 매개변수로 주어진 프로미스의 순서와 일치하며,
    완료 순서에 영향을 받지 않음.

설명 :
이 메서드는 여러 프로미스의 결과를 집계할 때 유용하게 사용 가능.
일반적으로 다음 코드를 계속 실행하기 전에
서로 연관된 비동기 작업 여러 개가 모두 이행되어야 하는 경우에 사용.

입력 값으로 들어온 프로미스 중 하나라도 거부 당하면 Promise.all()은 즉시 거부.
이에 비해, Promise.allSettled()가 반환하는 프로미스는 이행/거부 여부에 관계없이
주어진 프로미스가 모두 완료될 때까지 기다림.
결과적으로, 주어진 이터러블의 모든 프로미스와 함수의 결과 값을 최종적으로 반환.

이행 :
반환한 프로미스의 이행 결과값은 (프로미스가 아닌 값을 포함하여)
매개변수로 주어진 순회 가능한 객체에 포함된 모든 값을 담은 배열.

빈 객체를 전달한 경우, (동기적으로) 이미 이행한 프로미스를 반환.
전달받은 모든 프로미스가 이미 이행되어 있거나 프로미스가 없는 경우,
비동기적으로 이행하는 프로미스를 반환.

거부 :
주어진 프로미스 중 하나라도 거부하면,
다른 프로미스의 이행 여부에 상관없이 첫 번째 거부 이유를 사용해 거부.

< Array.prototype.map() >
배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환.
*/