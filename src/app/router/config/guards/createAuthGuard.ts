import type { Router } from 'vue-router';
import { useUserStore } from '@entities/user/model';

export function createAuthGuard(router: Router) {
  router.beforeEach(async (to) => {
    const userStore = useUserStore();

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    try {
      await userStore.check();
    } catch (error) {
      console.warn('[AuthGuard] Ошибка проверки пользователя:', error);
      userStore.logout();
    }

    if (requiresAuth && !userStore.token) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      };
    }

    if (['/login', '/register', '/confirm-code'].includes(to.path) && userStore.token) {
      return { path: '/' };
    }

    return true;
  });
}
