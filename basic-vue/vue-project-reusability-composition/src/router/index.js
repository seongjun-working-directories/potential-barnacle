import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Composition from '../views/Composition.vue'
import Composition2 from '../views/Composition2.vue'
import Composition3 from '../views/Composition3.vue'
import CompositionProvide from '../views/CompositionProvide.vue'

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
    path: '/composition',
    name: 'composition',
    component: Composition
  },
  {
    path: '/composition2',
    name: 'composition2',
    component: Composition2
  },
  {
    path: '/composition3',
    name: 'composition3',
    component: Composition3
  },
  {
    path: '/composition-provide-inject',
    name: 'composition-provide-inject',
    component: CompositionProvide
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
