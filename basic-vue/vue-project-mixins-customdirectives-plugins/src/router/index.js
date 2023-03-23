import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Mixins from '../views/Mixins.vue'
import Mixins2 from '../views/Mixins2.vue'
import CustomDirective from '../views/CustomDirective.vue'
import Plugins from '../views/Plugins.vue'

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
    path: '/mixins',
    name: 'mixins',
    component: Mixins
  },
  {
    path: '/mixins2',
    name: 'mixins2',
    component: Mixins2
  },
  {
    path: '/custom-directive',
    name: 'custom-directive',
    component: CustomDirective
  },
  {
    path: '/plugins',
    name: 'plugins',
    component: Plugins
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
