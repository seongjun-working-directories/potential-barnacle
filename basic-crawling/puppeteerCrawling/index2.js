const { parse } = require('csv-parse/sync');
const fs = require('fs');
const puppeteer = require('puppeteer');

const csv = fs.readFileSync('csv/data.csv');
const records = parse(csv.toString('utf-8'));

const puppeteerCrawler = async () => {
    const browser = await puppeteer.launch({
        headless: process.env.NODE_ENV === 'production'
    });
    try {
        await Promise.all(records.map(async (r, i)=>{
            const page = await browser.newPage();
            // csv의 두번째 값이 링크임. 해당 링크로 이동하도록 하는 코드.
            await page.goto(r[1]);
            // page.$(selector) :
            // The method runs document.querySelector within the page.
            // If no element matches the selector, the return value resolves to null.
            const scoreElement = await page.$('.score.score_left .star_score');
            // [TEST] console.log('scoreElement: ', scoreElement);
            
            if (scoreElement) {
                // page.evaluate(pageFunction[, ...args]) :
                // pageFunction: <function|string> Function to be evaluated in the page context.
                // ...args <...Serializable|JSHandle> Arguments to pass to pageFunction.
                // returns: <Promise<Serializable>> Promise which resolves to the return value of pageFunction.
                // If the function passed to the page.evaluate returns a Promise,
                // then page.evaluate would wait for the promise to resolve and return its value.
                const text = await page.evaluate((tag)=>tag.textContent, scoreElement);
                console.log(text.trim());
            }
            await page.waitFor(500);    // 크롤링 봇인걸 들키지 않기 위함
            await page.close();
        }));
    }
    catch(err) {
        console.error(err);
    }

    await browser.close();
};

puppeteerCrawler();