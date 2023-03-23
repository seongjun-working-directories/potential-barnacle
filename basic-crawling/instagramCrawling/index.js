// 인스타그램 최초 로그인까지의 과정
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config();

const instagramCrawler = async () => {
    try {        
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: ['--window-size=1600,900', '--disable-notifications']
        });
        const page = await browser.newPage();
        await page.goto('https://www.instagram.com/');

        const id = process.env.LEFT;
        const pw = process.env.RIGHT;

        // '페이지가 완전히 로딩'될 때까지 기다리는 방법 2가지
        // 1. 불확실한 방법 : waitForSelector
        // 내가 입력하고자 하는 또는 검색하고자 하는 선택자를 기다림
        await page.waitForSelector('._2hvTZ.pexuQ.zyHYP');

        // 아이디, 비밀번호 입력
        const inputId = await page.$('input[name="username"]');
        const inputPw = await page.$('input[name="password"]');
        await inputId.click();
        await inputId.type(id);
        await page.waitFor(500);
        await inputPw.click();
        await inputPw.type(pw);

        // 로그인 버튼 클릭
        await page.evaluate(()=>{
            document.querySelector('button.sqdOP.L3NKy.y3zKF > .qF0y9.Igw0E').click();
        });

        // '페이지가 완전히 로딩'될 때까지 기다리는 방법 2가지
        // 2. 확실하게 페이지 로딩을 기다리는 방법 : waitForNavigation
        // waitForNavigation 은 현재 페이지가 다른 페이지로 리다이렉트 되기를 기다리는 메서드
        await page.waitForNavigation();
        await page.waitFor(500);

        // 로그인 정보를 저장하겠냐고 물어보는 창이 뜨는 경우
        let storeId;
        if (storeId = await page.$('.cmbtv > .sqdOP.yWX7d.y3zKF')) {
            await storeId.click();
        }

        await page.waitFor(30000);
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

instagramCrawler();