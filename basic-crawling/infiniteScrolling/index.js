const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

fs.readdir('images', (err)=>{
    if (err) {
        console.error('NO SUCH DIRECTORIES : images');
        fs.mkdirSync('images');
    }
});

const infiniteScrollingCrawler = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production'
        });
        const page = await browser.newPage();
        await page.goto('https://unsplash.com/');

        let results = [];

        while (results.length <= 100) {
            const result = await page.evaluate(()=>{
                window.scrollTo(0, 0);

                const imageElements = document.querySelectorAll('.VQW0y.Jl9NH');
                const imageSources = [];
                if (imageElements.length) {
                    imageElements.forEach((v)=>{
                        let src = v.querySelector('img').src;
                        if (src) {
                            imageSources.push(src);
                        }
                        v.parentElement.removeChild(v);
                    });
                    window.scrollBy(0, 700);

                    return imageSources;
                }
            });
            
            results = results.concat(result);

            await page.waitForSelector('.VQW0y.Jl9NH');
        }
        
        await page.close();
        await browser.close();

        let i = 1;
        results.forEach(async (src)=>{
            const imgResult = await axios.get(src.replace(/\?.*$/, ''), {
                responseType: 'arraybuffer'
            });
            fs.writeFileSync(`images/${i++}.jpeg`, imgResult.data);
        });
    }
    catch (err) {
        console.error(err);
    }
};

infiniteScrollingCrawler();