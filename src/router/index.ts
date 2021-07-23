import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/weibo'
  },
  {
    path: '/weibo',
    name: 'Weibo',
    component: () => import('@/views/weibo.vue')
  },
  {
    path: '/douban',
    name: 'Douban',
    component: () => import('@/views/douban.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
