import type { RouteRecordRaw } from 'vue-router';
import { createAnimeDetailGuard, createCatalogGuard } from '@app/router/config/guards';

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main'),
    meta: {
      layout: true,
      title: 'Смотреть аниме онлайн',
      nlmt: true,
    },
  },
  {
    path: '/catalog',
    components: {
      default: () => import('@/views/catalog'),
      drawer: () => import('@/entities/catalog-filter'),
    },
    beforeEnter: createCatalogGuard,
    meta: {
      layout: true,
      title: 'Каталог',
    },
  },
  {
    path: '/anime-detail/:id',
    name: 'anime_page',
    component: () => import('@/views/anime-detail'),
    beforeEnter: createAnimeDetailGuard,
    meta: {
      layout: true,
      title: 'Просмотр',
      nlmt: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      requiresAuth: false,
      layout: 'auth',
      title: 'Авторизация',
      bgImg: 'login',
      authContent: {
        title: 'Авторизация',
      },
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register'),
    meta: {
      requiresAuth: false,
      layout: 'auth',
      title: 'Регистрация',
      bgImg: 'register',
      authContent: {
        title: 'Регистрация',
      },
    },
  },
  {
    path: '/confirm-code',
    name: 'confirm-code',
    component: () => import('@/views/verify'),
    meta: {
      requiresAuth: false,
      layout: 'auth',
      title: 'Подтверждение',
      bgImg: 'enter_code',
      authContent: {
        title: 'Нужно отправить код для подтверждения',
        subtitle: 'hdsd gsdsedg dh dsf asdg rg fasrf srg rsd',
      },
    },
  },
];
