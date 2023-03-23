<template>
    <div>
        <div id="naverIdLogin"></div> ||
        <button type="button" @click="logout">로그아웃</button>
    </div>
</template>
<script>
import axios from 'axios';

// 네이버 로그인 개발 가이드 링크 :
// https://developers.naver.com/docs/login/devguide/devguide.md#%EB%84%A4%EC%9D%B4%EB%B2%84%20%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B0%9C%EB%B0%9C%EA%B0%80%EC%9D%B4%EB%93%9C

// 네이버 로그인 API 명세 :
// https://developers.naver.com/docs/login/api/api.md
export default {
    /* eslint-disable */
    data() {
        return {
            naverLogin: null,
        };
    },
    async mounted() {
        this.naverLogin = await new window.naver.LoginWithNaverId({
            // 네이버에서 발급 받은 Client ID
            clientId: '',
            // app 등록 시 callbackurl에 추가했던 url
            callbackUrl: 'http://localhost:8080/naverlogin',
            isPopup: false,
            loginButton: {
                color: 'green', type:2, height: 50
            }
        });

        // 설정 정보 초기화 및 연동 준비
        await this.naverLogin.init();

        await this.naverLogin.getLoginStatus((status)=>{
            if (status) {
                alert(status);
                alert(this.naverLogin.user);
                console.log(status);
                console.log(this.naverLogin.user);

                const email = this.naverLogin.user.getEmail();
                if (email == undefined || email == null) {
                    alert('이메일은 필수 정보입니다. 정보 제공에 동의해주세요.');
                    this.naverLogin.reprompt();
                    return;
                }
                else {
                    console.log('callback 처리 실패!');
                }
            }
        });
    },

    methods: {
        // 네이버에서는 별도의 로그아웃 함수를 제공하지 않기 때문에,
        // 로그아웃에 대한 별도의 API가 없으며
        // 사용자가 직접 네이버 서비스에서 로그아웃 하도록 처리해야 함
        // 따라서, 로그아웃을 하려면 로그인 시 발급받은 토큰을 삭제해야 함
        async logout() {
            const client_secret = '';
            const client_id = '';
            const accessToken = this.naverLogin.accessToken;

            console.log('this.naverLogin>>>', this.naverLogin);
            console.log('this.naverLogin.accessToken>>>', this.naverLogin.accessToken);

            const url = `/oauth2.0/token?grant_type=delete&client_id=${client_id}&client_secret=${encodeURL(client_secret)}&access_token=${accessToken}&service_provider=NAVER`;
            // 단, 토큰 삭제 시 API를 axios로 호출하면,
            // cors 위배로 에러가 발생하므로, vue.config.js에서 proxy를 등록해야 함
            // module.exports = {
            //      chainWebpack: (config)=>{
            //          config.plugins.delete('prefetch');
            //      },
            //      devServer: {
            //          proxy: {
            //              '/oauth2.0': {
            //                  target: 'https://nid.naver.com'
            //              }
            //          }
            //      }
            // }

            await axios.get(url).then((res)=>{
                console.log(res.data);
            });
        }
    }
}
</script>

<!--
* Vue에서 환경변수를 사용하기 위해서는 프로젝트 루트경로에 .env 파일을 생성해야 한다.

.env :
development, production 등 모든 환경에 사용되는 환경 변수.

.env.local:
로컬 환경에서 사용할 환경변수.
여기에 들어가는 환경 변수는 git에 안올라간다.

.env.development:
development환경에서 사용할 환경 변수.
npm run serve를 별다른 옵션없이 사용하면 development 환경을 인식하기 때문에 이 환경변수를 사용한다.

.env.production:
production환경에서 사용할 환경 변수.
--mode production으로 production 모드를 사용할 경우 development대신 이 환경변수가 사용된다.
-->