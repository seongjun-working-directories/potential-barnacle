import { createRouter, createWebHashHistory } from 'vue-router';
import ProductList from '../views/ProductList.vue';
import ProductDetails from '../views/ProductDetails.vue';
import ProductCreate from '../views/ProductCreate.vue';
import ProductUpdate from '../views/ProductUpdate.vue';
import SalesList from '../views/SalesList.vue';
import ImageInsert from '../views/ImageInsert.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductList
  },
  {
    path: '/details',
    name: 'Product Details',
    component: ProductDetails
  },
  {
    path: '/create',
    name: 'Product Create',
    component: ProductCreate
  },
  {
    path: '/update',
    name: 'Product Update',
    component: ProductUpdate
  },
  {
    path: '/sales',
    name: 'Sales List',
    component: SalesList
  },
  {
    path: '/imageinsert',
    name: 'Image Insert',
    component: ImageInsert
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
