import type { RouteRecordRaw } from 'vue-router';

export const privateRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    children: [
      {
        path: ':id(\\d+)/profile',
        component: () => import('@/views/profile'),
        meta: {
          requiresAuth: true,
          title: 'Профиль',
          layout: true,
          nlmt: true,
        },
      },
      {
        path: 'settings',
        component: () => import('@/views/settings'),
        meta: {
          requiresAuth: true,
          title: 'Настройки',
        },
      },
    ],
    meta: {
      requiresAuth: true,
      layout: true,
    },
  },
];
