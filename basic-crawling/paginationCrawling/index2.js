const puppeteer = require('puppeteer');

// 깃허브의 페이지네이션은
// 페이지가 새로 로딩되지 않고 SPA 방식으로 페이지네이션을 구현함
const githubCrawler = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: [
                '--window-size=1920,1080', '--disable-notifications', '--no-sandbox'
            ]
        });
        const page = await browser.newPage();
        
        const keyword = 'crawling';
        await page.goto(`https://github.com/search?q=${keyword}`, {
            waitUntil: 'networkidle0'
        });

        let results = [];
        let pageNum = 1;
        while (pageNum < 5) {
            await page.waitFor(2000+Math.random()*100);
            results = results.concat(await page.evaluate(()=>{
                const result = [];
                const tags = document.querySelectorAll('.repo-list-item');
                tags.forEach((tag)=>{
                    result.push({
                        name: tag.querySelector('.v-align-middle') && tag.querySelector('.v-align-middle').textContent,
                        stars: tag.querySelector('.Link--muted') && tag.querySelector('.Link--muted').textContent.trim()
                    });
                });
                return result;
            }));
            await page.waitForSelector('a.next_page');
            await page.click('a.next_page');
            pageNum++;
            // pjax라는 기술을 사용했기 때문에 개발자 도구의 Network에서 다음과 같은 응답이 완료되었는지 확인해야 함
            // https://github.com/search?p=3&q=processor&type=Repositories
            // https://github.com/search/count?p=2&q=crawling&type=Code
            await page.waitForResponse((response)=>{
                return response.url().startsWith(`https://github.com/search/count?p=${pageNum}`)
                    && response.status() === 200;
            });
        }
        console.log(results);

        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

githubCrawler();