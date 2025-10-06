import type { Router } from 'vue-router';
import { setPageTitle } from '@shared/lib/head/setPageTitle.ts';

export function createHeadManagerGuard(router: Router) {
  router.afterEach((to) => {
    const title = typeof to.meta.title === 'function' ? to.meta.title(to) : to.meta.title;

    if (title) setPageTitle(title);
  });
}
