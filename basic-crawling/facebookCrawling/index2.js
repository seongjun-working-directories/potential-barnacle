// 게시글에 좋아요 누르기를 반복적으로 수행하며
// 데이터베이스에 읽은 피드를 저장하는 예제
// 또한, 한 번 저장된 게시글은 무시함
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

const db = require('./models');
dotenv.config();

const facebookCrawler = async () => {
    try {
        await db.sequelize.sync();
        
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: ['--window-size=1600,900', '--disable-notifications']
        });
        const page = await browser.newPage();

        await page.goto('https://facebook.com');
        
        const id = process.env.HAMISH;
        const pw = process.env.CODE;

        await page.type('#email', id);
        await page.type('#pass', pw);
        await page.click('._6ltg button');

        await page.waitForResponse((response)=>{
            return response.url().includes('privacy_mutation_token');
        });
        await page.keyboard.press('Escape');

        let result = [];
        while (result.length<10) {
            await page.waitForSelector('.lzcic4wl .rq0escxv.l9j0dhe7.du4w35lb>.j83agx80.l9j0dhe7.k4urcfbm>.rq0escxv.l9j0dhe7.du4w35lb.hybvsw6c.io0zqebd');
            await page.waitFor(Math.random()*1500);
            const newPost = await page.evaluate(()=>{
                // window.scrollTo(0, 0);
                const firstfeed = document.querySelector('.lzcic4wl .rq0escxv.l9j0dhe7.du4w35lb>.j83agx80.l9j0dhe7.k4urcfbm>.rq0escxv.l9j0dhe7.du4w35lb.hybvsw6c.io0zqebd:first-child');
                const name = firstfeed.querySelector('.qzhwtbm6.knvmm38d > span > h4')
                    && firstfeed.querySelector('.qzhwtbm6.knvmm38d > span > h4').textContent;
                const content = firstfeed.querySelector('.rq0escxv.l9j0dhe7.du4w35lb div:nth-child(2) > div > div:nth-child(3) .ecm0bbzt.hv4rvrfc.ihqw7lf3.dati1w0a')
                    && firstfeed.querySelector('.rq0escxv.l9j0dhe7.du4w35lb div:nth-child(2) > div > div:nth-child(3) .ecm0bbzt.hv4rvrfc.ihqw7lf3.dati1w0a').textContent;
                const img = firstfeed.querySelector('.bp9cbjyn.cwj9ozl2.j83agx80 .do00u71z.ni8dbmo4 .pmk7jnqg.kr520xx4 > img')
                    && firstfeed.querySelector('.bp9cbjyn.cwj9ozl2.j83agx80 .do00u71z.ni8dbmo4 .pmk7jnqg.kr520xx4 > img').src;
                const like = firstfeed.querySelector('.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.rj1gh0hx > .rq0escxv.l9j0dhe7.du4w35lb.j83agx80.cbu4d94t > .d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.lr9zc1uh > span');
                const sponsored = firstfeed.querySelector('b.t5a262vz.aenfhxwr.b6zbclly.l9j0dhe7.sdhka5h4');
                if (like.getAttribute('style') === null) {
                    if ((sponsored === null) || (sponsored.textContent !== 'Sponsored')) {
                        like.click();
                    }
                }
                return {name, content, img};
            });

            // 이미 저장된 게시글은 저장하지 않음
            const exist = await db.Facebook.findOne({
                where: {
                    writer: newPost.name,
                    content: newPost.content,
                    media: newPost.img
                }
            });
            if (!exist) {
                result.push(newPost);
            }
            
            await page.waitFor(Math.random()*1500);

            // 읽어온 피드를 제거함
            await page.evaluate(()=>{
                const firstfeed = document.querySelector('.lzcic4wl .rq0escxv.l9j0dhe7.du4w35lb>.j83agx80.l9j0dhe7.k4urcfbm>.rq0escxv.l9j0dhe7.du4w35lb.hybvsw6c.io0zqebd:first-child');
                firstfeed.parentNode.removeChild(firstfeed);
                // window.scrollBy(0, 250);
            });
        }
        console.log(result);
        
        // db에 result에 모은 게시글들을 넣음
        await Promise.all(result.map((v)=>{
            return db.Facebook.create({
                media: v.img,
                writer: v.name,
                content: v.content
            });
        }));

        await page.waitFor(Math.random()*1000);
        await db.sequelize.close();
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

facebookCrawler();