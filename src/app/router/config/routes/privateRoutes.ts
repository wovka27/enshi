import type { RouteRecordRaw } from 'vue-router';
import { createUserProfileGuard } from '@app/router/config/guards/createUserProfileGuard.ts';

export const privateRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    children: [
      {
        path: ':id(\\d+)/profile',
        name: 'profile',
        component: () => import('@/views/profile'),
        beforeEnter: createUserProfileGuard,
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
