import type { Router } from 'vue-router';
import { useUserStore } from '@entities/user/model';

export function createAuthGuard(router: Router) {
  router.beforeEach(async (to) => {
    const userStore = useUserStore();

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    await userStore.check();

    if (requiresAuth && !userStore.token) {
      return { path: '/login', query: { redirect: to.fullPath } };
    }

    return true;
  });
}
