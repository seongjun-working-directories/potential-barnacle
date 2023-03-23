const { parse } = require('csv-parse/sync');
const fs = require('fs');
const puppeteer = require('puppeteer');

const csv = fs.readFileSync('csv/data.csv');
const records = parse(csv.toString('utf-8'));

// puppeteer로 브라우저 및 창 열고 닫기
const puppeteerTest = async () => {
    // 브라우저를 띄움
    // headless를 true로 하면, 화면을 띄우지 않고 이어지는 코드들을 처리함을 의미
    // 주로 개발모드일 때만 headless를 false로 해둠
    // const browser = await puppeteer.launch({headless:false});
    
    // 위의 headless를 배포환경에서만 headless가 true가 되도록 함
    const browser = await puppeteer.launch({
        headless: process.env.NODE_ENV === 'production'
    });
    
    // 페이지를 띄움
    const page = await browser.newPage();
    // 또 다른 페이지를 띄움
    const page2 = await browser.newPage();

    /*
    const [page, page2, page3] = await Promise.all([
        browser.newPage(), browser.newPage()
    ]);
    */
    
    // 링크로 페이지를 이동
    await page.goto('https://www.naver.com/');
    await page2.goto('https://github.com/')
    // 인수만큼의 밀리초를 기다림
    await page.waitFor(3000);
    await page2.waitFor(5000);

    await page.goto('https://youtube.com/');
    await page2.goto('https://docs.npmjs.com/cli/v6/commands/npm');
    await page.waitFor(5000);
    await page2.waitFor(2000);

    // 다만, 위의 방식은 동기로 이뤄짐
    // 각 탭이 서로 연관없는 일을 할 때는 상당히 비효율적
    // 따라서, Promise.all()을 사용해 비동기 처리를 해야 함
    await Promise.all([
        page.goto('https://www.naver.com'),
        page2.goto('https://github.com/')
    ]);

    await Promise.all([
        page.waitFor(3000),
        page2.waitFor(5000)
    ]);

    // 페이지 종료
    await page.close();
    await page2.close();
    // 브라우저 종료
    await browser.close();
};

puppeteerTest();