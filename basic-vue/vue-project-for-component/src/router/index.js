import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DataBinding from '../views/DataBinding.vue';
import AttributeBinding from '../views/AttributeBinding.vue';
import HandleEventNComputedWatch from '../views/HandleEventNComputedWatch.vue';

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
    path: '/databinding',
    name: 'Data Binding',
    component: DataBinding
  },
  {
    path: '/attributebinding',
    name: 'Attribute Binding',
    component: AttributeBinding
  },
  {
    path: '/handleeventandcomputedwatch',
    name: 'Handle Event and Computed / Watch',
    component: HandleEventNComputedWatch
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
