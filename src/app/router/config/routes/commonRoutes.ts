import type { RouteRecordRaw } from 'vue-router';

export const commonRoutes: RouteRecordRaw[] = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/not-found'),
    meta: { requiresAuth: false, layout: true, title: '404' },
  },
  { path: '/:catchAll(.*)', redirect: '404' },
  {
    path: '/policy',
    name: 'policy',
    component: () => import('@/views/policy/PolicyView.vue'),
    meta: { requiresAuth: false, layout: true, title: 'Политика конфиденциальности' },
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('@/views/agreement/AgreementView.vue'),
    meta: { requiresAuth: false, layout: true, title: 'Пользовательское соглашение' },
  },
];
