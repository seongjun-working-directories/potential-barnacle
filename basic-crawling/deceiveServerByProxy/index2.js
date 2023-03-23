const puppeteer = require('puppeteer');

const db = require('./models');

const usingProxy = async ()=>{
    await db.sequelize.sync();
    try {
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: ['--window-size=1600,900', '--disable-notifications']
        });
        const page = await browser.newPage();

        await page.goto('https://spys.one/free-proxy-list/UK/');

        let proxies = await page.evaluate(()=>{
            const ips = Array
                .from(document.querySelectorAll('td:nth-child(1) > font.spy14'))
                .map((v)=>v.textContent.replace(/document\.write\(.+\)/, ''));
            const types = Array
                .from(document.querySelectorAll('td table tbody td:nth-child(2)'))
                .map((v)=>v.textContent);
            const latencies = Array
                .from(document.querySelectorAll('td:nth-child(6) > font.spy1'))
                .map((v)=>v.textContent);

            return ips.map((v, i)=>{
                return {
                    ip: v,
                    type: types[i+2],
                    latency: latencies[i]
                };
            });
        });

        proxies = proxies
            .filter((v)=>v.type.startsWith('HTTP'))
            .sort((p, c)=>p.latency-c.latency);
        
        await Promise.all(proxies.map(async (v)=>{
            return db.Proxy.create({
                ip: v.ip,
                type: v.type,
                latency: v.latency
            });
        }));

        await page.close();
        await browser.close();

        const fastestProxies = await db.Proxy.findAll({
            order: [['latency', 'ASC']]
        });

        const browser1 = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: [
                '--window-size=1600,900',
                '--disable-notifications',
                `--proxy-server=${fastestProxies[0].ip}`
            ]
        });
        const browser2 = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: [
                '--window-size=1600,900',
                '--disable-notifications',
                `--proxy-server=${fastestProxies[1].ip}`
            ]
        });
        const browser3 = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: [
                '--window-size=1600,900',
                '--disable-notifications',
                `--proxy-server=${fastestProxies[2].ip}`
            ]
        });

        const page1 = await browser1.newPage();
        const page2 = await browser2.newPage();
        const page3 = await browser3.newPage();
        
        await page1.goto('https://ip.pe.kr');
        await page2.goto('https://ip.pe.kr');
        await page3.goto('https://ip.pe.kr');

        /*
        // 크롬의 시크릿모드 브라우저를 여러 개 만들기
        const context1 = await browser.createIncognitoBrowserContext();
        const context2 = await browser.createIncognitoBrowserContext();
        const context3 = await browser.createIncognitoBrowserContext();

        console.log(await browser.browserContexts());

        const page1 = await context1.newPage();
        const page2 = await context2.newPage();
        const page3 = await context3.newPage();

        await page1.goto('https://ip.pe.kr');
        await page2.goto('https://ip.pe.kr');
        await page3.goto('https://ip.pe.kr');
        */

        let myIP = await page1.evaluate(()=>{
            return document.querySelector('.cover-heading');
        });
        console.log(myIP);
        myIP = await page2.evaluate(()=>{
            return document.querySelector('.cover-heading');
        });
        console.log(myIP);
        myIP = await page3.evaluate(()=>{
            return document.querySelector('.cover-heading');
        });
        console.log(myIP);

        await page1.waitFor(10000);
        await page2.waitFor(10000);
        await page3.waitFor(10000);
        await db.sequelize.close();

        await page1.close();
        await page2.close();
        await page3.close();
        await browser1.close();
        await browser2.close();
        await browser3.close();
    }
    catch (err) {
        console.error(err);
    }
}

usingProxy();