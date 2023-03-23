const puppeteer = require('puppeteer');

// ./models/index.js에서 index.js는 생략 가능
const db = require('./models');

const usingProxy = async ()=>{
    // 데이터베이스를 연결하는 코드
    await db.sequelize.sync();
    
    try {
        let browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: ['--window-size=1600,900', '--disable-notifications'],
        });
        let page = await browser.newPage();
        await page.setViewport({
            width: 1080, height: 1080
        });

        // 아이피 확인
        await page.goto('https://ip.pe.kr/');

        // 해당 사이트에서 내 아이피 가져오기
        let myIP = await page.evaluate(()=>{
            return document.querySelector('.cover-heading').textContent;
        });
        console.log(myIP);

        // await page.goto('https://spys.one/free-proxy-list/KR/');
        await page.goto('https://spys.one/free-proxy-list/UK/');

        let proxies = await page.evaluate(()=>{
            // 표 형태로 웹사이트가 구성되어 있음
            // 표의 세로 줄마다 반복되는 선택자를 찾아내는게 중요
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
                    // type 줄의 분류를 나타내는 맨 위의 태그가 제거되지 않는 상태
                    // 따라서, 실제 type 값이 시작되는 3번째 태그부터 사용
                    type: types[i+2],
                    latency: latencies[i]
                };
            });
        });
        // [TEST] console.log(proxies);

        proxies = proxies
            .filter((v)=>v.type.startsWith('HTTP'))
            .sort((p, c)=>p.latency-c.latency);
        // [TEST] console.log(proxies);

        await Promise.all(proxies.map(async (v)=>{
            return db.Proxy.create({
                ip: v.ip,
                type: v.type,
                latency: v.latency
            });
        }));

        // 프록시 검색은 자신의 실제 주소로 검색했으므로,
        // 기존에 켜놓은 페이지와 브라우저는 우선 닫아둬야 함.
        await page.close();
        await browser.close();

        // DB에 넣어놓은 프록시 가져와서 쓰는 방법
        const fastestProxy = await db.Proxy.findOne({
            order: [['latency', 'ASC']]
        });

        browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: [
                '--window-size=1600,900',
                '--disable-notifications',
                // `--proxy-server=${proxies[0].ip}`,
                // `--proxy-server=${fastestProxy.ip}`,
                `--proxy-server=${fastestProxy.ip}`
            ]
        });
        // [TEST] console.log(proxies[0].ip);

        page = await browser.newPage();

        // 네이버에서 아이피 확인
        await page.goto('https://ip.pe.kr/');

        // 해당 사이트에서 내 아이피 가져오기
        myIP = await page.evaluate(()=>{
            return document.querySelector('.cover-heading').textContent;
        });
        console.log(myIP);

        await page.waitFor(10000);
        await db.sequelize.close();
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

usingProxy();