// 실무에 가깝게 웹 크롤러가 걸리지 않도록 수정한 예제
const xlsx = require('xlsx');
const puppeteer = require('puppeteer');
const add_to_sheet = require('./add_to_sheet');

const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.Sheet1;
const records = xlsx.utils.sheet_to_json(ws);

const puppeteerCrawler = async () => {
    try {
        const result = [];
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production'
        });
        const page = await browser.newPage();

        // 개발자 도구(F12)에서 Console 창에 navigator.userAgent를 입력하면
        // 사용자가 무슨 브라우저를 쓰고 있는지 알 수 있음
        // 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Mobile Safari/537.36'
        // 해당 내용을 setUserAgent의 인자로 넣음
        // await page.setUserAgent('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Mobile Safari/537.36');
        // [TEST] console.log(await page.evaluate('navigator.userAgent'));
        
        add_to_sheet(ws, 'C1', 's', '평점');

        for (const [i, r] of records.entries()) {
            await page.goto(r.링크);
            const text = await page.evaluate(()=>{
                const score = document.querySelector('.score.score_left .star_score');
                if (score) {
                    return score.textContent;
                }
            });
            if (text) {
                console.log(r.제목, ', 평점: ', text.trim());
                const newCell = 'C'+(i+2);
                add_to_sheet(ws, newCell, 'n', text.trim());
            }
            await page.waitFor((Math.random()*150) + 1000);
        }
        await page.close();
        await browser.close();

        xlsx.writeFile(workbook, 'xlsx/result.xlsx');
    }
    catch (err) {
        console.error(err);
    }
};

puppeteerCrawler();