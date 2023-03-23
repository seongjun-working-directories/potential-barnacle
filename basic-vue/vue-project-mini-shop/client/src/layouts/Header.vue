<template>
    <!--
        <nav> 태그는 다른 페이지 또는 현재 페이지의 다른 부분과 연결되는
        네비게이션 링크(navigation links)들의 집합을 정의할 때 사용
    -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">MINI SHOP</a>
            
            <!--
                Collapse(콜랩스) JavaScript 플러그인은, 콘텐츠의 표시와 숨김에 사용
                버튼과 앵커는, 토글 하는 특정 요소에 매핑된 트리거로 사용
                요소를 접으면 height가 기존 값에서 0으로 애니메이션화 됨

                data-bs-target의 값으로 들어가는 id 명의 div를 찾아서,
                해당 div가 button을 눌렀을 때 나타나도록 설정됨

                aria-label 속성은 현재 요소에 레이블을 정의하기 위해서 사용
                텍스트 레이블이 화면에 표시되지 않을 때에 사용
                만약에 요소에 레이블을 정의하는 화면에 보이는 텍스트가 있다면
                aria-labelledby을 대신 사용
            -->
            <button
                class="navbar-toggler" type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle Navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>


            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- 토글(Toggle)을 눌렀을 때 나타나는 목록 -->
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">
                            HOME
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/">
                            PRODUCT LIST
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/details">
                            PRODUCT DETAILS
                        </router-link>
                    </li>
                    <!-- <li v-if="user.email != undefined" class="nav-item"> -->
                    <li class="nav-item">
                        <router-link class="nav-link" to="/sales">
                            PRODUCT REGISTRATION
                        </router-link>
                    </li>
                    <!-- 사용자 정보가 없는 경우 로그인 버튼이 보이고, 정보가 있는 경우 로그아웃 버튼이 보임 -->
                    <li v-if="user.email==undefined">
                        <button class="btn btn-danger" type="button" @click="kakaoLogin">
                            로그인
                        </button>
                    </li>
                    <li v-else>
                        <button class="btn btn-danger" type="button" @click="kakaoLogout">
                            로그아웃
                        </button>
                    </li>
                </ul>

                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
/* eslint-disable */
export default {
    name: 'header',

    computed: {
        user() {
            return this.$store.state.user;
        }
    },

    methods: {
        kakaoLogin() {
            window.Kakao.Auth.login({
                scope: 'profile_nickname, profile_image, account_email, gender',
                success: this.getProfile
            });
        },

        getProfile(authObj) {
            // [TEST]
            console.log(authObj);

            window.Kakao.API.request({
                url: '/v2/user/me',
                success: res=>{
                    const kakao_account = res.kakao_account;
                    // [TEST]
                    console.log(kakao_account);

                    this.login(kakao_account);
                    alert('LOGIN SUCCESS!');
                }
            });
        },

        async login(kakao_account) {
            await this.$api('/api/login', {
                param: [
                    {email: kakao_account.email, nickname: kakao_account.profile.nickname},
                    {nickname: kakao_account.profile.nickname}
                ]
            });

            // user 값을 kakao_account로 수정
            this.$store.commit('user', kakao_account);
        },

        kakaoLogout() {
            window.Kaao.Auth.logout((res)=>{
                // [TEST]
                console.log(res);

                // user 값을 비움
                this.$store.commit('user', {});

                alert('LOGOUT SUCCESS!');

                // 다른 URL로 이동하려면 router.push를 사용
                // 이 메서드는 새로운 항목을 히스토리 스택에 넣어 사용자가 브라우저의 뒤로 가기 버튼을 클릭하면 이전 URL로 이동
                // 이것은 <router-link>를 클릭 할 때 내부적으로 호출되는 메소드이므로
                // <router-link :to="...">를 클릭하면 router.push(...)를 호출하는 것과 같음
                this.$router.push({path: '/'});
            })
        }
    }
}
</script>