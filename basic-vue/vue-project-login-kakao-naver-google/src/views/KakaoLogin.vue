<template>
    <div>
        <!-- 로그인 -->
        <a id="custom-login-btn" @click="kakaoLogin()">
            <img
                src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
                width="220" />
        </a><br/>
        <!-- 로그아웃 -->
        <a @click="kakaoLogout()">
            로그아웃
        </a>
    </div>
</template>
<script>
    export default {
        methods: {
            kakaoLogin() {    
                if (window.Kakao.Auth.getAccessToken()) {
                    console.log('Already logged in.');
                    return;
                }
                window.Kakao.Auth.login({
                    // scope는 카카오 개발자 센터에서 동의 항목으로 활성화한 각 항목의 ID
                    scope: 'profile_nickname, profile_image, account_email',
                    success: this.getKakaoAccount,
                });
            },
            getKakaoAccount() {
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: (res)=>{
                        const kakao_account = res.kakao_account;
                        const nickname = kakao_account.profile.nickname;
                        const email = kakao_account.email;
                        const image = kakao_account.profile.profile_image_url;

                        console.log('res>> ', res);
                        console.log('nickname>>> ', nickname);
                        console.log('email>>> ', email);
                        console.log('image>>> ', image);

                        alert('LOGIN SUCCESS!');
                    },
                    fail: (err)=>{
                        console.error(err);
                    }
                })
            },
            
            kakaoLogout() {
                if (!window.Kakao.Auth.getAccessToken()) {
                    console.log('Not logged in.');
                    return;
                }
                window.Kakao.Auth.logout((res)=>{
                    console.log(res);
                });
                alert('LOGOUT SUCCESS!');
            }
        }
    }
</script>

<!--
Indicate whether to send a cookie in a cross-site request by specifying its SameSite attribute
https://velog.io/@jinhee5577/Cookie-SameSite-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-SameSite-%EA%B4%80%EB%A0%A8-%EA%B2%BD%EA%B3%A0

SameSite 를 None 으로 설정할 경우 모든 도메인에서 쿠키를 전송하고 사용할 수 있지만
사용자가 사이트 간 요청 위조(CSRF - Cross-site request forgery) 및 의도하지 않은 정보 유출에 취약해질 가능성이 있습니다.
이러한 취약점을 방지하기 위해 지금까지는 별도의 SameSite 속성 명시 없이 쿠키를 생성했을 때
"SameSite=None" 으로 설정한 것과 동일하게 동작 했지만 Chrome80 버전 이후에는
SameSite 속성 설정이 없는 쿠키는 "SameSite=Lax" 로 명시한 것과 동일하게 동작한다는 것입니다.

SameSite는 말 그대로 쿠키 전송에 있어 '같은 사이트'인지 체크하는 것입니다.
Cookie의 SameSite 속성은 서로 다른 도메인간의 쿠키 전송에 대한 보안을 설정한다.

"None"은 동일 사이트과 크로스 사이트에 모두 쿠키 전송이 가능하다.
그리고 "Strict"로 설정할 경우 서로 다른 도메인에서는 아예 전송이 불가능해 지기 때문에
CSRF를 100% 방지할 수 있으나 사용자 편의성을 많이 해치게 된다.

< SameSite 설정하기 >
SameSite 속성을 변경하는 방법은 쿠키 생성하는 시점부터 설정해 주거나 필터 등을 이용하여
기존 쿠키에 속성을 추가하는 방법이 있고 Apache 또는 Nginx 같은 HTTP / Proxy 서버를
사용중이라면 서버 설정을 통해 일괄로 변경하는 것도 가능하다.

// JavaScript
document.cookie = "safeCookie1=foo; SameSite=Lax"; 
document.cookie = "safeCookie2=foo"; 
document.cookie = "crossCookie=bar; SameSite=None; Secure";

SameSite 속성을 명시한 safeCookie1와 명시하지 않은 safeCookie2는 크롬80 이상부터 동일하게 동작한다. (Default Lax 적용)

주의해야할 점은 SameSite 속성을 None으로 설정할 경우 Secure 속성을 함께 추가해 주어야 한다.
Secure 속성이 추가된 쿠키는 HTTPS 프로토콜에서만 전송이 가능하며 SameSite가 None이지만
Secure 속성이 없을 경우 브라우저에서는 아래의 경고메시지와 함께 해당 쿠키를 적용하지 않는다.
-->

<!--
[vue-cookies 사용법]
https://kyounghwan01.github.io/blog/Vue/vue/vue-cookies/

0.
웹 개발자라면 필수로 알아야 하는 가장 기본 쿠키 사용법 입니다.
쿠키는 잘 아시다시피 사용자의 브라우저에 저장되고 서버에는 저장되지 않습니다.
그렇기 때문에 보안에 관련된 정보는 절대 넣으시면 안됩니다.(ex - 비밀번호)

저의 경우 브라우저에 뜨는 공지에 일주일간 안보기 선택한 경우 브라우저에서 쿠키를 만료일 7일 짜리로 설정하고
쿠키 만료시 다시 공지를 띄우는 형식으로 쿠키를 활용하였습니다.

1.
npm install vue-cookies vue-cooke랑 vue-cookies가 있는데,
후자가 더 다운로드 수가 더 높고 readme가 더 잘 작성되어서 후자를 쓰기로 하였습니다.

2.
글로벌 사용 명시 vue 프로젝트에서 가장 메인이 되는 곳에 쿠키를 사용한다 명시해 줍니다.
main.js or main.ts
'''
import VueCookies from "vue-cookies";
//쿠키를 사용한다.
Vue.use(VueCookies);
//쿠키의 만료일은 7일이다. (글로벌 세팅)
Vue.$cookies.config("7d");
'''

3.
만료일 시간 기준
'''
1 : 1초
60 * 60 * 12 : 12시간
60 * 60 * 25 * 30 : 1달
1d : 1일
new Date(2019,03,13).toUTCString(): 특정 시간
'''

4.  
set 쿠키는 key, value 쌍으로 저장됩니다.
'''
//2번처럼 글로벌로 쿠키를 사용한다 명시하면 this로 쿠키를 불러올 수 있습니다.
this.$cookies.set("키", "값", "만료일");
//만약 만료일이 명시되지 않는다면 2번 과정에서 세팅한 글로벌 만료일이 저장됩니다.
'''

5.
get get은 저장된 쿠키의 key 값으로 불러옵니다.
'''
this.$cookies.set(test, "testValue");
const cookie = this.$cookies.get(test);
console.log(cookie); //testValue
'''

6.  
remove remove는 저장된 쿠키의 key 값을 받아 있으면 삭제합니다.
'''
this.$cookies.remove("test");
'''

7.
기타
'''
//특정 쿠키가 있는지 확인
this.$cookies.isKey("test");
//모든 쿠키 키 가져오기
this.$cookies.keys().join("\n");
//모든 쿠키 다 지우기
this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
'''
-->