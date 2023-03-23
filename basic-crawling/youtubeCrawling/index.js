// https://www.npmjs.com/package/puppeteer-extra
// https://marian-caikovski.medium.com/automatically-sign-in-with-google-using-puppeteer-cc2cc656da1c
// Partial workaround for fooling Google: puppeteer-extra
const puppeteer = require('puppeteer-extra');
// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// https://www.npmjs.com/package/ytdl-core
const ytdl = require('ytdl-core');
const fs = require('fs');

const dotenv = require('dotenv');
// const db = require('./models');
dotenv.config();

fs.readdir('myBrowserUsage', (err)=>{
    if (err) {
        console.error('NO SUCH DIRECTORY : myBrowserUsage');
        fs.mkdirSync('myBrowserUsage');
    }
});

const youtubeDownloader = async () => {
    try {
        // await db.sequelize.sync();

        await puppeteer.use(StealthPlugin());

        // fetch : 가져오다
        // const browserFetcher = await puppeteer.createBrowserFetcher();
        // https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html
        // const revisionInfo = await browserFetcher.download(
            // 버전 번호를 적음
            // 사용가능한 버전을 확인하기 위해서 아래의 파일 실행
            // "node check_availability.js"
            // '일련번호를 입력'
        // );

        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            // executablePath: revisionInfo.executablePath,
            args: ['--window-size=1920,1080', '--disable-notifications'],
            userDataDir: './myBrowserUsage'
        });
        browser.userAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.0 Safari/537.36'
        );

        const page = await browser.newPage();
        await page.setViewport({
            width:1080, height:1080
        });
        await page.goto('https://youtube.com', {
            // 페이지가 로딩되었다고 해서 콘텐츠가 완전히 불러와졌다는 보장이 없음
            // 왜냐하면, 페이지 로딩 후 링크, 스타일 태그 등에 대한 요청이 또 보내지기 때문
            // waitUntil로 기다려야 하는 수준을 결정하지 않으면, window.onload() 이후 await이 실행됨
            waitUntil: 'networkidle2'
            // domcontentloaded : 초기 HTML 문서를 완전히 불러오고 분석했을 때 await 실행
            // (단, domcontentloaded는 스타일 시트, 이미지, 하위 프레임의 로딩은 기다리지 않음)
            // networkidle0     : 모든 네트워크 요청이 끝나고 await을 실행
            // (단, 유튜브 동영상 로딩 시에는 networkidle0을 절대 사용하면 안됨)
            // networkidle2     : 2개 정도의 네트워크 요청을 제외하고 모든 네트워크 요청이 끝나면 await 실행
        });

        if (await page.$('#avatar-btn') === null) {
            // 로그인 버튼 클릭
            await page.waitForSelector('#buttons > ytd-button-renderer > a.ytd-button-renderer');
            await page.click('#buttons > ytd-button-renderer > a.ytd-button-renderer');
            // waitForNavigation은 현재 페이지가 다른 페이지로 리다이렉트 되기를 기다리는 메서드
            await page.waitForNavigation({
                waitUntil: 'networkidle0'
            });

            // 계정 기록이 남아있는 경우 `다른 계정 추가` 버튼 클릭
            if (await page.$('#identifierId') === null) {
                await page.click('ul > li:nth-child(2) > .lCoei');
            }
            
            // 아이디 입력
            await page.type('#identifierId', process.env.HAMISH);
            // document.querySelector('#identifierId').value = process.env.HAMISH;
            await page.click('#identifierNext');
            // document.querySelector('#identifierNext').click();
            await page.waitFor(1500);

            // 비밀번호 입력
            await page.waitForSelector('#password input');
            await page.type('#password input', process.env.CODE);
            await page.click('#passwordNext');
            await page.waitFor(3000);

            // 직접 본인 인증을 요구하는 경우 프로그램을 종료
            const needCertification = await page.evaluate(()=>{
                return (document.querySelector('h1#headingText') === null)
                    || (document.querySelector('h1#headingText').textContent === '본인 인증')
                    || (document.querySelector('h1#headingText').textContent === 'Verify it\'s you');
            });
            if (needCertification) {
                // 크로미움에서 직접 본인 인증이 필요함
                console.log('본인 인증이 필요합니다...');
                // 10초 안에 GMAIL 계정으로 들어가서 인증 버튼 누르기
                await page.waitFor(12000);
            }
        }

        await page.goto('https://youtube.com/feed/trending', {
            waitUntil: 'domcontentloaded'
        });

        await page.waitForSelector('#video-title');
        await page.evaluate(()=>{
            document.querySelector('#video-title').click();
        });

        // 현재 페이지의 url 및 제목을 가져옴
        const url = await page.url();
        const info = await ytdl.getInfo(url);
        const title = info['videoDetails'].title;
        // [TEST] console.log(info);
        // [TEST] console.log(url, "||", title);

        // 동영상 다운로드
        ytdl(url)
            .pipe(fs.createWriteStream(`${title.replace(/\u20A9/g, '')}.mp4`));
        // 윈도우는 경로구분자로 `\`를 사용하는데, Nodejs에서는 해당 경로 구분자를 없애주어야 함

        await page.waitFor(10000);
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

youtubeDownloader();