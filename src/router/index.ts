import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Weibo from '@/views/Weibo/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/weibo'
  },
  {
    path: '/weibo',
    name: 'Weibo',
    component: Weibo
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
