import Vue from 'vue';
import VueRouter from 'vue-router';

const Index = () => import('@/views/Index');
const Empty = () => import('@/views/Empty');
const PictureDownload = () => import('@/views/picture-download/PictureDownload');
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      // requireAuth: true, // 是否需要登陸
      title: 'tools',
    },
  },
  {
    path: '/pictureDownload',
    name: 'PictureDownload',
    component: PictureDownload,
    meta: {
      // requireAuth: true, // 是否需要登陸
      title: 'tools',
    },
  },
  {
    path: '*',
    name: 'Empty',
    component: Empty,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
});

export default router;
