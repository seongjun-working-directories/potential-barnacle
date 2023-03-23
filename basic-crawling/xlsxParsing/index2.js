// index.js는 엑셀시트의 첫번째 줄을 속성명으로 설정해야 했는데,
// 그러지 않고 첫번째 줄부터 속성값으로 사용하는 예제
const xlsx = require('xlsx');

const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.Sheet1;

// sheet_to_json의 두 번째 옵션 인수에 다음과 같이 작성
let records = xlsx.utils.sheet_to_json(ws, {header: 'A'});
console.log(records);

/*
// 만약 첫 번째 줄에 속성명을 입력해 놓은 상태이고
// 해당 줄을 지워야 한다면, shift() 메서드 사용
records.shift();
console.log(records);
*/

// 또는 특정 영역의 데이터만 엑셀시트에서 가져오고 싶은 경우
// 다음과 같이 코드를 사용
// [TEST] console.log(ws['!ref']);    // A1:B7

ws['!ref'] = ws['!ref'].split(":").map((v, i)=>{    // A2:B7
    if (i === 0) {
        return 'A2';
    }
    return v;
}).join(":");

records = xlsx.utils.sheet_to_json(ws, {header:'A'});
console.log(records);