/*
플러그인은 특정 기능을 제공하는 코드를 의미
우리가 npm을 통해 다운로드 받는 패키지도 플러그인의 일종
대규모 프로젝트를 진행하다 보면,
해당 프로젝트에 맞게 특화된 플러그인을 제작해야 하는 상황 발생 가능
Vue에서는 직접 플러그인을 제작해서 전역으로 사용할 수 있게 함

i18n.js는 다국어 처리 플러그인으로서 제작됨
*/

export default {
    install: (app, options)=>{
        app.config.globalProperties.$translate = key => {
            return key.split('.').reduce((o, i)=>{
                if (o) return o[i];
            });
        };
        app.provide('i18n', options)
    }
}

/*
플러그인은 install 옵션에서 정의해 사용 가능
app.config.globalProperties를 선언하여 컴포넌트에서 $translate로 바로 접근해 사용 가능
또한 provide로 다국어 데이터를 전달해서 컴포넌트에서는 inject를 이용해서도 사용 가능
다국어 플러그인은 전역에서 사용해야 하므로,
main.js 파일을 열어 다국어 플러그인을 사용할 수 있도록 추가해야 함
*/