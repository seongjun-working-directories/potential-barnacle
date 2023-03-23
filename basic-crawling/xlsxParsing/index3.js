// 엑셀시트가 여러 개일 경우 일괄적으로 처리하는 방법
const xlsx = require('xlsx');

const workbook = xlsx.readFile('xlsx/data.xlsx');
console.log(workbook.SheetNames);

for (const name of workbook.SheetNames) {
    const ws = workbook.Sheets[name];
    // 엑셀 시트별로 처리할 코드를 여기에 작성
}