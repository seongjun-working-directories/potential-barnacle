import SlotUseModalLayout from '../views/SlotUseModalLayout.vue'
import SlotModalLayout from '../views/SlotModalLayout.vue'
import ParentSlotComponent from '../views/ParentSlotComponent.vue'
import ChildSlotComponent from '../views/ChildSlotComponent.vue'
import ProvideInject from '../views/ProvideInject.vue'

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    path: '/slot',
    name: 'slot',
    component: SlotUseModalLayout
  },
  {
    path: '/slot2',
    name: 'slot2',
    component: SlotModalLayout
  },
  {
    path: '/slot3',
    name: 'slot3',
    component: ParentSlotComponent
  },
  {
    path: '/slot4',
    name: 'slot4',
    component: ChildSlotComponent
  },
  {
    path: '/provide-inject',
    name: 'provide-inject',
    component: ProvideInject
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
