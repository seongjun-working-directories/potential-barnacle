const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
// const db = require('./models');
dotenv.config();

const facebookCrawler = async () => {
    try {
        // await db.sequelize.sync();

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

        // cf.
        // ^= : `오른쪽 피연산자로 시작하는`이라는 의미
        // document.querySelectorAll('[id^=FeedUnit_]');
        // $= : `오른쪽 피연산자로 끝나는`이라는 의미
        // document.querySelectorall('[id$=FeedUnit_]');
        
        // 콘텐츠 전체 : document.querySelectorAll('.lzcic4wl .rq0escxv.l9j0dhe7.du4w35lb>.j83agx80.l9j0dhe7.k4urcfbm>.rq0escxv.l9j0dhe7.du4w35lb.hybvsw6c.io0zqebd');
        // 사람 이름 : document.querySelectorAll('.qzhwtbm6.knvmm38d > span > h4');
        // 콘텐츠의 글 : document.querySelectorAll('.rq0escxv.l9j0dhe7.du4w35lb div:nth-child(2) > div > div:nth-child(3) .ecm0bbzt.hv4rvrfc.ihqw7lf3.dati1w0a');
        // 이미지 : document.querySelectorAll('.bp9cbjyn.cwj9ozl2.j83agx80 .do00u71z.ni8dbmo4 .pmk7jnqg.kr520xx4 > img');
        // 좋아요 : document.querySelector('.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.rj1gh0hx > .rq0escxv.l9j0dhe7.du4w35lb.j83agx80.cbu4d94t > .d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.lr9zc1uh');
        // 광고 제거 : document.querySelector('b.t5a262vz.aenfhxwr.b6zbclly.l9j0dhe7.sdhka5h4').textContent === 'Sponsored';
        
        // `좋아요`의 경우, 이미 `좋아요`가 눌려있다면 `좋아요` 버튼을 누르면 안됨.
        // 따라서 이와 같이 구현하려면, 좋아요를 누른 상태일 때와 누르지 않은 상태일 때의 속성을 비교해야 함.
        // 방법 1
        // 해당 태그의 경우 좋아요가 눌리면 엄지색이 바뀜
        // 따라서, style 속성의 변화를 지켜보는 방법이 있음
        // 방법 2
        // https://wepplication.github.io/tools/compareDoc/
        // 개발자 도구의 Element > Properties를 전체 복사해서 좋아요가 눌린 상태와 안 눌린 상태의 페이지를 복사해
        // 어떤 속성이 생기고 어떤 속성이 없어졌는지 확인해야 함.
        // 텍스트 대조는 위의 링크에서 진행할 수 있음.

        await page.waitForSelector('.lzcic4wl .rq0escxv.l9j0dhe7.du4w35lb>.j83agx80.l9j0dhe7.k4urcfbm>.rq0escxv.l9j0dhe7.du4w35lb.hybvsw6c.io0zqebd')
        
        await page.waitFor(1500);
        const newPost = await page.evaluate(()=>{
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

        console.log(newPost);
        await page.waitFor(1500);

        // 크롤링 완료한 게시글을 삭제
        await page.evaluate(()=>{
            const firstfeed = document.querySelector('.lzcic4wl .rq0escxv.l9j0dhe7.du4w35lb>.j83agx80.l9j0dhe7.k4urcfbm>.rq0escxv.l9j0dhe7.du4w35lb.hybvsw6c.io0zqebd:first-child');
            firstfeed.parentNode.removeChild(firstfeed);
        });

        await page.waitFor(3000);
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

facebookCrawler();