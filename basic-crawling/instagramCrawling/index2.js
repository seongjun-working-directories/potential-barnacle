/*
puppeteer의 크로미움에서도 쿠키를 저장할 수 있는 방법이 있음
바로 userDataDir을 활용하는 것!!
browser 초기 설정 시 userDataDir 속성에 경로를 지정하면 해당 경로에 쿠키를 보관함
*/
const ncp = require("copy-paste")
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const db = require('./models');
dotenv.config();

const instagramCrawler = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: ['--window-size=1600,900', '--disable-notifications'],
            // puppeteer의 크로미움에서 사용한 쿠키를 저장할 경로를 지정 가능
            userDataDir: './myBrowserUsage'
        });
        const page = await browser.newPage();
        // 특징: 인스타그램은 virtual-list를 사용해 게시글을 보여줌
        await page.goto('https://www.instagram.com');
        
        // 최초로 사이트에 접속해 로그인이 필요한 경우
        if (!(await page.$('._2dbep.qNELH > img'))) {
            const id = process.env.LEFT;
            const pw = process.env.RIGHT;

            await page.waitForSelector('._2hvTZ.pexuQ.zyHYP');
            const inputId = await page.$('input[name="username"]');
            const inputPw = await page.$('input[name="password"]');
            await inputId.click();
            await inputId.type(id);
            await page.waitFor(500);
            await inputPw.click();
            await inputPw.type(pw);

            await page.evaluate(()=>{
                document.querySelector('button.sqdOP.L3NKy.y3zKF > .qF0y9.Igw0E').click();
            });

            await page.waitForNavigation();
            await page.waitFor(500);

            let storeId;
            if (storeId = await page.$('.cmbtv > .sqdOP.yWX7d.y3zKF')) {
                await storeId.click();
            }
        }

        // 로그인이 된 상태에서 진행할 코드 :
        // 게시글 긁어오기 --> 단, 인스타그램의 경우 virtual-list 기술을 적용함
        // 즉, article 태그의 수가 한정되고 콘텐츠를 바꿔 넣어 재활용하는 방식을 사용하므로
        // facebook 예제에서 사용했던 게시글을 읽고 지우는 방법을 사용할 수 없음
        // 따라서, 각 게시글마다 특정 구별 아이디를 찾아내서 해당 아이디를 Unique하게 유지해야 함

        // 가장 위의 게시글 정보를 firstfeed 변수에 저장
        await page.waitForSelector('article');
        const firstfeed = await page.$('article:first-child');
        await page.waitFor(500);
        // 게시글 정보를 인수로 받음 -> 작성자와 미디어 정보를 추출해냄
        // -> 좋아요 버튼이 눌려 있지 않는 경우 좋아요 버튼을 누름
        // -> 게시글은 댓글 바로 위에 있음
        // -> 게시글이 긴 경우 더보기 버튼을 누르고 게시글을 긁고, 아니라면 그냥 읽음
        // -> 그 뒤 기타 버튼을 누르고 링크 복사할 준비를 함

        await page.waitForSelector('header a.sqdOP');
        const articleInfo = await page.evaluate((firstfeed)=>{
            // 작성자를 긁어옴
            const writer = firstfeed.querySelector('header a.sqdOP').textContent;
            // 미디어가 동영상인지 이미지인지에 따라 가져와야 하는 태그가 다름
            let media;
            if (firstfeed.querySelector('.KL4Bh img') !== null) {
                media = firstfeed.querySelector('.KL4Bh img').src;
            }
            else {
                media = firstfeed.querySelector('._5wCQW video').src;
            }

            // 좋아요 버튼이 눌려있지 않다면 누름
            if (firstfeed.querySelector('.QBdPU.B58H7 svg._8-yf5').getAttribute('aria-label') === '좋아요') {
                firstfeed.querySelector('.QBdPU.rrUvL').click();
            }

            // 콘텐츠 읽기(단, 더보기 버튼이 있을 경우, 더보기 버튼을 누름)
            if (firstfeed.querySelector('.EtaWk span:nth-child(3) > span:nth-child(2) > div > div')) {
                firstfeed.querySelector('.EtaWk span:nth-child(3) > span:nth-child(2) > div > div').click();
            }
            const content = firstfeed.querySelector('div.EtaWk > div > div:nth-child(1) > div > span:nth-child(3) > span').textContent;

            // 해당 게시글의 `기타 기능` 버튼을 누름
            firstfeed.querySelector('.MEAGs button.wpO6b').click();

            // 작성자와 미디어 정보를 반환
            return {'writer': writer, 'media': media, 'content': content};
        }, firstfeed);

        // `기타 기능` 버튼이 눌려서 팝업이 뜰 때까지 기다림
        await page.waitForSelector('.mt3GC');
        await page.waitFor(500);
        await page.evaluate(()=>{
            // 5번째 버튼이 `링크 복사`라면 해당 버튼을 누르고, 아니라면 6번째 버튼을 누름
            if (document.querySelector('.mt3GC button:nth-child(5)').textContent === '링크 복사') {
                document.querySelector('.mt3GC button:nth-child(5)').click();
            }
            else {
                document.querySelector('.mt3GC button:nth-child(6)').click();
            }
        });

        // 링크 복사 버튼을 누르면 컴퓨터 System의 클립보드에 해당 링크가 저장됨
        // https://github.com/xavi-/node-copy-paste
        // `npm install copy-paste` `const ncp = require("copy-paste");`
        // 쿼리스트링 부분은 지움
        const postId = ncp.paste();
        articleInfo.postId = postId.substring(0, postId.indexOf('?'));

        await page.waitFor(5000);
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

instagramCrawler();