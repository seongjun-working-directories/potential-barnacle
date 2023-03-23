import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import KakaoLogin from '../views/KakaoLogin.vue'
import GoogleLogin from '../views/GoogleLogin.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/kakaologin',
    name: 'KakaoLogin',
    component: KakaoLogin
  },
  {
    path: '/naverlogin',
    name: 'NaverLogin',
    component: () => import(/* webpackChunkName: "login-to-naver" */ '../views/NaverLogin.vue')
  },
  {
    path: '/googlelogin',
    name: 'GoogleLogin',
    component: GoogleLogin
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
