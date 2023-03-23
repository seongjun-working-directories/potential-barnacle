// alert, confirm, prompt 대응 방법
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config();

const dealAlertConfirmPrompt = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production',
            args: ['--window-size=1600,900', '--disable-notifications'],
        });
        const page = await browser.newPage();

        await page.goto('https://youtube.com');
        await page.waitFor(1000);

        // 'dialog'는 alert, confirm, prompt에 대응
        // 실제 alert, confirm, prompt가 뜨는 페이지보다 먼저 리스너가 등록되어야 함
        
        /*
        // alert에 대응하는 코드
        page.on('dialog', async (dialog)=>{
            // dialog.type() : alert, confirm, prompt 중 무엇인지 나타냄
            console.log(dialog.type(), dialog.message());
            // dismiss()는 알림을 끄는 역할을 함
            await dialog.dismiss();
        });
        */

        // confirm에 대응하는 코드
        page.on('dialog', async (dialog)=>{
            console.log(dialog.type(), dialog.message());
            
            switch (dialog.type().toString()) {
            case 'alert':
                // dismiss()는 알림을 끄는 역할을 함
                await dialog.dismiss();
                break;
            case 'confirm':
                // accept()는 알림의 확인 버튼을 누르는 역할을 함
                await dialog.accept();
                // dismiss()는 알림의 취소(거절) 버튼을 누르는 역할을 함
                // await dialog.dismiss();
                break;
            case 'prompt':
                // accept()의 인자에 입력값을 넣으면 해당 데이터가 전송됨
                await dialog.accept('https://inflearn.com');
                break;
            default:
                new Error('ERROR!!');
            }
        });
        
        await page.evaluate(()=>{
            // alert는 확인을 누르지 않으면 넘어가지 않음
            alert('이 alert가 꺼져야 다음으로 넘어갑니다.');
            location.href = 'https://naver.com';
        });

        await page.waitFor(1000);

        await page.evaluate(()=>{
            // confirm에는 확인 버튼과 취소 버튼이 있음
            if (confirm('이 confirm이 꺼져야 다음으로 넘어갑니다.')) {
                location.href = 'https://daum.net';
            }
            else {
                location.href = 'https://facebook.com';
            }
        });

        await page.waitFor(1000);

        await page.evaluate(()=>{
            // prompt는 데이터를 입력받는 창임
            const data = prompt('주소를 입력하세요.');
            location.href = data;
        });

        await page.waitFor(3000);
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

dealAlertConfirmPrompt();