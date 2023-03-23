const xlsx = require('xlsx');

// xlsx의 readFile 메서드에 경로를 인수로 넣으면,
// 엑셀 파일을 변수로 가져올 수 있음.
const workbook = xlsx.readFile('xlsx/data.xlsx');
// [TEST] console.log(workbook);

// 엑셀의 시트명을 가져옴.
console.log(Object.keys(workbook.Sheets));

// ws변수에 Sheet1의 내용이 담김.
const ws = workbook.Sheets.Sheet1;
// [TEST] console.log(ws);

// https://docs.sheetjs.com/
// sheet_to_json은 시트의 자료를 자바스크립트 객체로 가져옴.
// 엑셀시트의 첫 번째 줄이 속성명이 되고, 그 아래로 속성값이 됨.
const records = xlsx.utils.sheet_to_json(ws);
// [TEST] console.log(records);

/* [TEST]
// Array.prototype.entries()
// 배열의 각 인덱스에 대한 키/값 쌍을 가지는 새로운 Array Iterator 객체를 반환.
for (const [i, r] of records.entries()) {
    console.log(i, r.제목, r.링크);
}

// Array.prototype.forEach()
// 주어진 함수를 배열 요소 각각에 대해 실행
records.forEach((r,i)=>{
    console.log(i, r.제목, r.링크);
});
*/

