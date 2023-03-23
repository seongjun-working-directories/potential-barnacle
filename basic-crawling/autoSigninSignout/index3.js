const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config();

// 입력폼에 대문자 입력하기
const capitalCharacter = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: ['--window-size=1600,900', '--disable-notifications'],
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1080, height: 1080
        });
        await page.goto('https://stackoverflow.com/');

        await page.click('.s-input.s-input__search.js-search-field');
        
        // 키보드를 꾹 누르고 있는 행위
        await page.keyboard.down('ShiftLeft');
        await page.keyboard.press('KeyP');
        await page.waitFor(200);
        await page.keyboard.press('KeyA');
        await page.waitFor(200);
        await page.keyboard.press('KeyR');
        await page.waitFor(200);
        await page.keyboard.press('KeyK');
        await page.waitFor(200);
        await page.keyboard.up('ShiftLeft');

        await page.waitFor(3000);
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

capitalCharacter();