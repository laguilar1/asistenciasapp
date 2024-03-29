// Composables
import { createRouter, createWebHistory } from 'vue-router'

import  authGuard  from "../guards/auth-guard"
import  loginGuard  from "../guards/login-guard"
import logoutGuard from "../guards/logout-guard"

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    beforeEnter: authGuard,
    children: [
      {
        path: '',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
         component: () => import('@/views/Home.vue'),
        // component: '/views/Home.vue',
      },
      {
        path: '/alumns/:salon/:hora/:date',
        name: 'alumns',
        // component: () => import('@/views/AlumnsView.vue'),
        component: () => import('@/views/AlumnsView.vue'),
      },
      {
        path: '/send',
        name: 'send',
        // component: () => import('@/views/AlumnsView.vue'),
        component: () => import('@/views/SendView.vue'),
      },
      // {
      //   path: '/auth',
      //   name: 'auth',
      //   component: () => import('@/views/Auth.vue'),
      //   // beforeEnter: loginGuard
      //   meta: {loginGuard: false}
      // },
    ],
  },
  {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
      beforeEnter: loginGuard
  },
  {
      path: '/logout/',
      name: 'logout',
      component: () => import('@/views/LogoutView.vue'),
      beforeEnter: logoutGuard
  },
  {
      path: '/refresh/',
      name: 'refresh',
      component: () => import('@/views/LogoutView.vue'),
      beforeEnter: logoutGuard
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // history: createWebHistory('pwasistencias/home'),
  history: createWebHistory(import.meta.env.VITE_BASE_DIR),
  routes,
})



export default router
