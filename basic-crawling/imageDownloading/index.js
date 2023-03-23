const xlsx = require('xlsx');
const axios = require('axios');
const puppeteer = require('puppeteer');
const fs = require('fs');
const add_to_sheet = require('./add_to_sheet');

const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.Sheet1;
const records = xlsx.utils.sheet_to_json(ws);

fs.readdir('poster', (err)=>{
    if (err) {
        console.error('NO SUCH DIRECTORY : poster');
        fs.mkdirSync('poster');
    }
});

fs.readdir('screenshot', (err)=>{
    if (err) {
        console.error('NO SUCH DIRECTORY : screenshot');
        fs.mkdirSync('screenshot');
    }
});

// TIP! 태그를 제대로 찾은 건지 확인하기
// 개발자 도구(F12)에 Console 탭을 누르고, `$('.클래스명 태그명')`과 같이 입력해보기
// ex) $('.poster img')

const imageDownloader = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            // 브라우저 사이즈 키우기
            args: ['--window-size=1600,900']
        });
        const page = await browser.newPage();

        // 페이지 사이즈 키우기
        await page.setViewport({
            width:1600,
            height:900
        });
        // await page.setUserAgent('');
        
        add_to_sheet(ws, 'C1', 's', '평점');
        add_to_sheet(ws, 'D1', 's', '이미지');
        for (const [i, r] of records.entries()) {
            await page.goto(r.링크);

            // 특수 문자 제거용 정규 표현식
            const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi

            // 페이지 스크린샷
            const buffer = await page.screenshot({
                // 저장할 경로를 지정하는 옵션
                path: `screenshot/${r.제목.replace(reg, '')}.png`,
                // 브라우저와 페이지를 키우지 않고도 fullPage 속성을 true로 바꾸면
                // 페이지 전체를 스크린 캡쳐함
                fullPage: true,
                // 원하는 부분을 지정해 스크린 캡쳐하는 속성
                // 시작점(왼쪽 위 꼭지점의 x좌표, y좌표), 너비(w), 높이(h)를 필요로 함
                // clip: {
                //      x:100, y:100,
                //      width:300, height: 300
                // }
            });
            
            const result = await page.evaluate(()=>{
                const info = {};
                const scoreElement = document.querySelector('.score.score_left .star_score');
                if (scoreElement) {
                    info['score'] = scoreElement.textContent;
                }
                const imageElement = document.querySelector('.poster img');
                if (imageElement) {
                    info['image'] = imageElement.src;
                }
                return info;
            });

            if (result.score) {
                const newCell = 'C'+(i+2);
                add_to_sheet(ws, newCell, 'n', result.score.trim());
            }
            if (result.image) {
                // 이미지 주소를 보내서 이미지 데이터를 받아옴
                // 쿼리스트링을 제거하는 replace 메서드 또한 사용함
                const imgResult = await axios.get(result.image.replace(/\?.*$/, ''), {
                    // 이미지 데이터가 버퍼 형식이기 때문에 배열 형식의 버퍼로 받아야 함
                    responseType: 'arraybuffer'
                });
                fs.writeFileSync(`poster/${r.제목.replace(reg, '')}.jpg`, imgResult.data);

                const newCell = 'D'+(i+2);
                add_to_sheet(ws, newCell, 'n', result.image);
            }

            await page.waitFor((Math.random*150)+300);
        }
        await page.close();
        await browser.close();
        xlsx.writeFile(workbook, 'xlsx/result.xlsx');
    }
    catch (err) {
        console.error(err);
    }
};

imageDownloader();