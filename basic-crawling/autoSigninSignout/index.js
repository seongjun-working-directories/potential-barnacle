const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config();

const autoLogin = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: ['--window-size=1600,900']
        });
        browser.userAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.0 Safari/537.36'
        );
        const page = await browser.newPage();
        await page.setViewport({
            width: 1080,
            height: 1080
        });

        await page.goto('https://www.facebook.com');

        const id = process.env.APPLE;
        const pw = process.env.BANANA;
        
        /*
        // 방법 1: 가장 단순한 로그인 방식
        await page.evaluate((id, pw)=>{
            // 아이디 입력
            document.querySelector('#email').value = id;
            // 비밀번호 입력
            document.querySelector('#pass').value = pw;
            // 로그인 버튼 클릭
            document.querySelector('._6ltg button').click();
        }, id, pw);
        */

        // 방법 2: puppeteer를 사용한 로그인 방식
        // page.type(선택자, 입력값) : 실제로 해당 선택자에 입력하는 것으로 작동
        await page.type('#email', process.env.APPLE);
        await page.type('#pass', process.env.BANANA);
        // hover는 특정 태그 위에 마우스를 올리는 행위를 의미
        await page.hover('._6ltg button');
        await page.waitFor(800);
        await page.click('._6ltg button');
        await page.waitFor(800);


        // 알림 팝업(마이크 허용, 카메라 허용 등) 없애기 -> esc 버튼을 한 번 누르기
        // page.keyboard.press()는 인자로 들어온 키를 누르는 동작을 함
        // https://github.com/wix-incubator/unidriver/blob/master/core/src/puppeteer-us-keyboard-layout.ts
        // ex) page.keyboard.press('Enter');
        await page.keyboard.press('Escape');

        await page.waitFor(1000);
        
        // 개발자 도구(F12)의 콘솔창에서 document.querySelectorAll(선택자)를 입력해서
        // 그 선택자가 한 개를 특정할 수 있는지 아니면 여러 개가 있어서 더 범위를 좁혀야하는지 확인해야 함

        // 로그아웃하는 코드 : 특정 text를 찾아 해당 text를 가진 요소를 클릭
        // https://stackoverflow.com/questions/47407791/how-to-click-on-element-with-text-in-puppeteer
        

        await page.waitFor(50000);
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

autoLogin();