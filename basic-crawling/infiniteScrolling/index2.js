const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

const infiniteScrollingCrawler = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: process.env.NODE_ENV === 'production'
        });
        const page = await browser.newPage();
        await page.goto('https://unsplash.com/');

        let results = [];

        while (results.length <= 100) {
            // SPA로 구현한 웹사이트 중 CSS 클래스에 해쉬가 걸려있는 사이트는
            // 클래스명이 자주 바뀌므로 querySelectorAll 안에 들어가있는 클래스명 재확인 요망
            const result = await page.evaluate(()=>{
                // while문이 도는 동안 계속 스크롤바가 내려가기만 하는데
                // 이미지 로딩 후 스크롤바를 다시 제일 위로 올리는 코드
                // 아래 window.scrollBy(0, -700)을 지우고 사용할 것
                // scrollBy는 상대 좌표, scrollTo는 절대 좌표
                window.scrollTo(0, 0);

                const imageElements = document.querySelectorAll('.VQW0y.Jl9NH');
                const imageSources = [];
                if (imageElements.length) {
                    imageElements.forEach((v)=>{
                        let src = v.querySelector('img').src;
                        if (src) {
                            imageSources.push(src);
                        }
                        // 크롤링 완료한 이미지 태그는 제거
                        // 그리고 아래 scrollBy와 waitForSelector로 새로운 이미지 태그 로딩
                        v.parentElement.removeChild(v);
                    });

                    // 마우스로 스크롤을 한 번 내린 효과
                    // x:0px, y:700px 만큼 스크롤을 내림
                    window.scrollBy(0, 700);

                    return imageSources;
                }
            });
            // [TEST] console.log(result);
            
            results = results.concat(result);

            // 선택자를 기다리는 코드
            await page.waitForSelector('.VQW0y.Jl9NH');
            // [TEST] console.log('새로운 이미지 태그 로딩 완료');
            
            // await page.evaluate(()=>{
            //    로딩한 뒤 다시 스크롤 올림
            //    window.scrollBy(0, -700);
            // });
        }

        console.log(results);
        console.log(results.length);
        
        await page.close();
        await browser.close();
    }
    catch (err) {
        console.error(err);
    }
};

infiniteScrollingCrawler();