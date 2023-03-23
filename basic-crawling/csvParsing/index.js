// npm install csv-parse 로 csv-parse 패키지를 설치함.
// https://csv.js.org/parse/api/sync/
// 원래는 require('csv-parse/dist/cjs/sync.cjs')라고 입력하면
// node_modules > dist > cjs > sync.cjs에 export 되어 있는 function을 사용하겠다는 의미임.
// 그런데, csv-parse 5버전에서 package.json에 "exports"에 적힌 내용을 보면 다음과 같이 선언되어 있음.
// "./sync": {
//    "import": "./lib/sync.js",
//    "require": "./dist/cjs/sync.cjs"
//  }
// 즉, parse 메서드를 사용하려면,
// require('csv-parse/sync')와 같이 작성하도록 설정해둠.
const { parse } = require('csv-parse/sync');
// csv 파일을 읽어야 하므로 fs 모듈 사용.
const fs = require('fs');

// csv 폴더의 data.csv 파일을 읽어들임.
// csv 변수의 형식은 버퍼(Buffer).
const csv = fs.readFileSync('csv/data.csv');
// csv 변수를 문자열 형식으로 바꿈.
// 그 후, csv-parse의 parse 메서드로 문자열을 2차원 배열로 변환.
const records = parse(csv.toString('utf-8'));
records.forEach((r, i)=>{
    // i는 인덱스이고, r은 배열 데이터임.
    console.log(i, r);
});