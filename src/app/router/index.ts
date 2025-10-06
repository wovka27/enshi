import { createRouter, createWebHistory } from 'vue-router';
import { createAuthGuard, createDrawerGuard, createHeadManagerGuard } from '@app/router/config/guards';
import { routes } from '@app/router/config/routes';
import { scrollBehavior } from '@app/router/lib';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior,
  routes,
});

createDrawerGuard(router);
createAuthGuard(router);
createHeadManagerGuard(router);
