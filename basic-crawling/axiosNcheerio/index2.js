// 크롤링한 데이터를 엑셀에 작성하는 예제
const xlsx = require('xlsx');
const axios = require('axios');
const cheerio = require('cheerio');
const add_to_sheet = require('./add_to_sheet');

const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.Sheet1;
const records = xlsx.utils.sheet_to_json(ws);

const simpleCrawler = async ()=>{
    add_to_sheet(ws, 'C1', 's', '평점');
    for (const [i, r] of records.entries()) {
        if (Response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            
            const text = $('.score.score_left .star_score').text();
            console.log(r.제목, " 평점: " + text.trim());

            // ws 객체에 평점 값을 넣어준 것
            const newCell = 'C'+(i+2);
            add_to_sheet(ws, newCell, 'n', parseFloat(text.trim()));
        }
    }
    // 편집된 ws 객체는 엑셀로 저장되어야 함
    xlsx.writeFile(workbook, 'xlsx/result.xlsx');
}

simpleCrawler();