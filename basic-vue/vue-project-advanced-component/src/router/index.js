import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NestedComponent from '../views/NestedComponent.vue'
import ParentComponent from '../views/ParentComponent.vue'
import ParentComponent2 from '../views/ParentComponent2.vue'
import ParentComponent3 from '../views/ParentComponent3.vue'
import ParentComponent4 from '../views/ParentComponent4.vue'

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
    path: '/nestedcomponent',
    name: 'Nested Component',
    component: NestedComponent
  },
  {
    path: '/parent-child',
    name: 'Parent and Child',
    component: ParentComponent
  },
  {
    path: '/parent-child-2',
    name: 'Parent and Child 2',
    component: ParentComponent2
  },
  {
    path: '/parent-child-3',
    name: 'Parent and Child 3',
    component: ParentComponent3
  },
  {
    path: '/parent-child-4',
    name: 'Parent and Child 4',
    component: ParentComponent4
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
