const ncp = require("copy-paste")
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const db = require('./models');
const fs = require('fs');
dotenv.config();

fs.readdir('myBrowserUsage', (err)=>{
    if (err) {
        console.error('NO SUCH DIRECTORY : myBrowserUsage');
        fs.mkdirSync('myBrowserUsage');
    }
});

const instagramCrawler = async () => {
    try {
        await db.sequelize.sync();

        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: ['--window-size=1600,900', '--disable-notifications'],
            userDataDir: './myBrowserUsage'
        });
        const page = await browser.newPage();
        await page.goto('https://www.instagram.com');

        // 로그인 기록이 없는 경우 로그인
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

        // 게시글을 특정 개수만큼 긁어옴
        const result = [];
        let prePostId = null;
        while (result.length < 10) {
            await page.waitFor(500);
            await page.evaluate(()=>{
                window.scrollBy(0, 450);
            });

            await page.waitForSelector('article');
            const firstfeed = await page.$('article:first-child');
            await page.waitForSelector('header a.sqdOP');
            const articleInfo = {};

            articleInfo.postId = await page.evaluate(()=>{
                return document.querySelector('article:first-child a.c-Yi7')
                    && document.querySelector('article:first-child a.c-Yi7').href;
            });

            if (prePostId === articleInfo.postId || articleInfo.postId === null) {
                continue;
            }

            articleInfo.writer = await page.evaluate((firstfeed)=>{
                return document.querySelector('article:first-child header a.sqdOP')
                    && document.querySelector('article:first-child header a.sqdOP').textContent;
            });

            await page.waitFor(500);
            articleInfo.media = await page.evaluate(()=>{
                if (document.querySelector('article:first-child .KL4Bh img') !== null) {
                    return document.querySelector('article:first-child .KL4Bh img')
                        && document.querySelector('article:first-child .KL4Bh img').src;
                }
                else {
                    return document.querySelector('article:first-child ._5wCQW video')
                        && document.querySelector('article:first-child ._5wCQW video').src;
                }
            });
            
            if (firstfeed === null) {
                await page.evaluate(()=>{
                    window.scrollBy(0, 300);
                });
            }

            await page.waitFor(500);
            articleInfo.content = await page.evaluate(()=>{
                if (document.querySelector('.EtaWk span:nth-child(3) > span:nth-child(2) > div > div') !== null) {
                    document.querySelector('.EtaWk span:nth-child(3) > span:nth-child(2) > div > div').click();
                }
                return document.querySelector('div.EtaWk > div > div:nth-child(1) > div > span:nth-child(3) > span')
                    && document.querySelector('div.EtaWk > div > div:nth-child(1) > div > span:nth-child(3) > span').textContent;    
            });

            // 좋아요 버튼 누르기
            await page.evaluate(()=>{
                if (document.querySelector('.QBdPU.B58H7 svg._8-yf5').getAttribute('aria-label') === '좋아요') {
                    document.querySelector('.QBdPU.rrUvL').click();
                }
            });

            if (!(result.find(v=>v.postId === articleInfo.postId))) {
                const exist = await db.Instagram.findOne({
                    where: {postId : articleInfo.postId}
                });
                if (!exist) {
                    result.push(articleInfo);
                }
            }

            prePostId = articleInfo.postId;
        }

        // [TEST] console.log(result);
        // [TEST] console.log(result.length);

        await Promise.all(result.map((v)=>{
            return db.Instagram.create({
                postId: v.postId,
                writer: v.writer,
                media: v.media,
                content: v.content
            });
        }));

        await page.waitFor(5000);
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

instagramCrawler();