import { createRouter, createWebHistory } from 'vue-router'
import { parseQuery, stringifyQuery } from './helper/query'

const basicRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/router-a',
    name: 'RouterA',
    component: () => import('@/views/routerA.vue'),
  },
  {
    path: '/router-b',
    name: 'RouterB',
    component: () => import('@/views/routerB.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  stringifyQuery, // 序列化query参数
  parseQuery, // 反序列化query参数
})

export default router
