const {parse} = require('csv-parse/sync');
const {stringify} = require('csv-stringify/sync');

const fs = require('fs');
const puppeteer = require('puppeteer');

const csv = fs.readFileSync('csv/data.csv');
const records = parse(csv.toString('utf-8'));

const puppeteerCrawler = async () => {
    // 결과를 담을 배열
    const result = [];
    const browser = await puppeteer.launch({
        headless: process.env.NODE_ENV === 'production'
    });

    try {
        await Promise.all(records.map(async (r,i)=>{
            const page = await browser.newPage();
            await page.goto(r[1]);

            // 방법 1
            const text = await page.evaluate(()=>{
                // ** window나 document 객체를 사용하려면 무조건 page.evaluate 안의 콜백에서 써야 함 **
                // page.evaluate()에 인수로 들어가는 콜백에서는 document를 사용할 수 있음
                const score = document.querySelector('.score.score_left .star_score');
                if (score) { return score.textContent; }
            });
            if (text) {
                result[i] = [r[0], r[1], text.trim()];
            }
            
            /*
            // 방법 2
            const scoreElement = await page.$('.score.score_left .star_score');
            // scoreElement는 태그가 아닌 태그핸들러
            if (scoreElement) {
                const text = await page.evaluate(tag=>tag.textContent, scoreElement);
                // [TEST] console.log(text.trim());
                // 순서를 보장하기 위해 다음과 같은 코드로 작성
                result[i] = [r[0], r[1], text.trim()];
            }
            */
            await page.waitFor(500);
            await page.close();
        }));
    }
    catch (err) {
        console.error(err);
    }
    await browser.close();

    // csv 파일에 작성하는 코드
    const str = stringify(result);
    fs.writeFileSync('csv/result.csv', str);
};

puppeteerCrawler();