const puppeteer = require('puppeteer');

const amazonCrawler = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: [
                '--window-size=1920,1080', '--disable-notifications', '--no-sandbox'
            ]
        });
        
        let results = []
        await Promise.all([1,2,3,4,5,6,7,8,9,10].map(async (v)=>{
            const page = await browser.newPage();
            const keyword = 'mouse';    // 키워드 입력
            await page.goto(`https://www.amazon.com/s?k=${keyword}&page=${v}`, {
                waitUntil: `networkidle2`
            });
            
            results = results.concat(await page.evaluate(()=>{
                const tags = document.querySelectorAll('.s-result-item.s-asin');
                const result = [];
                tags.forEach(tag=>{
                    result.push({
                        name: tag.querySelector('h2') && tag.querySelector('h2').textContent,
                        price: tag.querySelector('.a-offscreen') && tag.querySelector('.a-offscreen').textContent
                    });
                });
                return result;
            }));
            
            await page.close();
        }));

        console.log(results);

        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

amazonCrawler();