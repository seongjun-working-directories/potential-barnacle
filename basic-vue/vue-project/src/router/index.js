// vue-router를 이용해 vue에서 라우팅을 처리
// 이와 같이 정의된 router는 main.js에 등록되어야 사용 가능
import { createRouter, createWebHashHistory } from 'vue-router'
// 이와 같이 Vue 파일을 import 하고, routes 안에 특정 path와 매핑하면
// 사용자가 접속하는 브라우저 url 주소에 따라 원하는 vue 파일을 보여줄 수 있음
import HomeView from '../views/HomeView.vue'

const routes = [
  // 2개의 라우트가 초기 등록되어 있음 : '/', '/about'
  {
    // 브라우저에 접속하는 url 주소를 정의
    path: '/',
    name: 'home',
    // 지정된 path로 들어왔을 때 보여줄 Vue 컴포넌트
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // /* webpackChunckName: ... */으로 chunk 파일의 이름을 정의함
    // 해당 경로로 사용자가 접근하기 전까지 vue 파일에 대한 import가 이뤄지지 않음
  }
]

/*
Lazy Load는 리소스를 컴포넌트 단위로 분리하여 컴포넌트 혹은 라우터 단위로
필요한 것들만 그때 그때 다운받을 수 있게 하는 방법
Lazy Load로 컴포넌트를 import한 것은 Vue CLI의 prefetch 기능을 사용한 것
prefetch는 미래에 사용될 수 있는 리소스(about과 같은 비동기 컴포넌트)를 캐시에 저장하여,
사용자가 접속했을 때 굉장히 빠르게 리소스를 내려줄 수 있음
단, 당장 사용하지 않더라도 캐시에 담는 비용이 발생함
Vue CLI에서는 prefetch 기능이 기본적으로 true로 설정되어 있음
prefetch를 false로 바꾸려는 경우, vue.config.js 파일을 수정해야 함
*/

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
