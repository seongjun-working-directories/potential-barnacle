const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config();

const loginAndLogout = async () => {
    try {
        // args에 --disable-notifications를 넣어주면, 팝업을 전부 무시할 수 있음
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: ['--window-size=1600,900', '--disable-notifications'],
        });
        // browser.userAgent(
        //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.0 Safari/537.36'
        // );
        const page = await browser.newPage();
        await page.setViewport({
            width: 1080, height: 1080
        });
        await page.goto('https://www.facebook.com');

        // 마우스의 움직임을 볼 수 있도록 하는 코드
        // https://github.com/Zerocho/nodejs-crawler/blob/master/8.facebook-login-logout/index.js
        await page.evaluate(() => {
            (() => {
                const box = document.createElement('div');
                box.classList.add('mouse-helper');
                const styleElement = document.createElement('style');
                styleElement.innerHTML = `
                    .mouse-helper {
                        pointer-events: none;
                        position: absolute;
                        z-index: 100000;
                        top: 0;
                        left: 0;
                        width: 20px;
                        height: 20px;
                        background: rgba(0,0,0,.4);
                        border: 1px solid white;
                        border-radius: 10px;
                        margin-left: -10px;
                        margin-top: -10px;
                        transition: background .2s, border-radius .2s, border-color .2s;
                    }
                    .mouse-helper.button-1 {
                        transition: none;
                        background: rgba(0,0,0,0.9);
                    }
                    .mouse-helper.button-2 {
                        transition: none;
                        border-color: rgba(0,0,255,0.9);
                    }
                    .mouse-helper.button-3 {
                        transition: none;
                        border-radius: 4px;
                    }
                    .mouse-helper.button-4 {
                        transition: none;
                        border-color: rgba(255,0,0,0.9);
                    }
                    .mouse-helper.button-5 {
                        transition: none;
                        border-color: rgba(0,255,0,0.9);
                    }
                `;
                document.head.appendChild(styleElement);
                document.body.appendChild(box);
                document.addEventListener('mousemove', event => {
                    box.style.left = event.pageX + 'px';
                    box.style.top = event.pageY + 'px';
                    updateButtons(event.buttons);
                }, true);
                document.addEventListener('mousedown', event => {
                    updateButtons(event.buttons);
                    box.classList.add('button-' + event.which);
                }, true);
                document.addEventListener('mouseup', event => {
                    updateButtons(event.buttons);
                    box.classList.remove('button-' + event.which);
                }, true);
                function updateButtons(buttons) {
                    for (let i = 0; i < 5; i++)
                        box.classList.toggle('button-' + i, !!(buttons & (1 << i)));
                }
            })();
        });
        
        const id = process.env.APPLE;
        const pw = process.env.BANANA;

        await page.type('#email', process.env.APPLE);
        await page.type('#pass', process.env.BANANA);
        await page.hover('._6ltg button');
        await page.waitFor(500);
        await page.click('._6ltg button');

        // 로그인 되었을 때 보내지는 요청과 응답이 성공할 때까지 기다리도록 함
        // 요청과 응답은 개발자 도구(F12)에서 Network의 Name로 찾을 수 있음
        // 페이지에 이벤트를 달아 놓으므로써 응답을 받음

        // 응답 대기 : 응답했는지 검사
        await page.waitForResponse((response)=>{
            // [TEST] console.log(response, response.url());
            return response.url().includes('privacy_mutation_token');
        });
        
        // 요청을 보내지 않는 경우, waitForSelector 사용

        // Single Page Application은 종종 화면이 바뀌어도 페이지 주소가 바뀌지 않는 경우가 있음
        // 그러나 주소가 바뀌지 않더라도, 화면의 콘텐츠가 바뀌면 요청과 응답은 반드시 변함
        // 따라서 waitForResponse나 waitForRequest를 사용해 검사 가능
        
        // 마우스 움직임을 활용하기 위해서는 정확한 좌표값을 찾아야 함
        // 단, 이는 setViewport에서 설정한 화면값을 기준으로 함(상단 배너 제외)
        // ex) await page.mouse.move(1000, 50); await page.mouse.click(1000, 50);
        await page.waitFor(2000);
        await page.mouse.move(1025, 30);
        await page.mouse.click(1025, 30, {button:'left'});
        await page.waitFor(2000);
        await page.mouse.move(770, 405);
        await page.mouse.click(770, 405, {button:'left'});

        /*
        // 마우스 드래그 방법
        // 1. 우선 드래그할 위치로 마우스를 이동
        await page.mouse.move(600, 140);
        // 2. 마우스를 꾹 누른 상태가 되도록 함
        await page.mouse.down();
        // 3. 드래그 완료하고자 하는 영역까지 이동
        await page.mouse.move(980, 540);
        // 4. 마우스 버튼에서 손을 뗌
        await page.mouse.up();
        */
        

        await page.waitFor(3000);
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
}

loginAndLogout();