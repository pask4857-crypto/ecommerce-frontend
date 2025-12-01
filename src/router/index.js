import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/frontend/Home.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/frontend/Products.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/frontend/Cart.vue'),
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('@/views/frontend/Checkout.vue'),
      },
      {
        path: 'payment',
        name: 'Payment',
        component: () => import('@/views/frontend/Payment.vue'),
      },
      {
        path: ':pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/frontend/NotFound.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/LayoutAdmin.vue'),
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/admin/ProductsAdmin.vue'),
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/admin/OrdersAdmin.vue'),
      },
    ],
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/LoginAdmin.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
