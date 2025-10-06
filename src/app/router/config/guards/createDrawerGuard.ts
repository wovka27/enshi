import type { Router } from 'vue-router';
import { useDrawerStore } from '@shared/ui/ui-drawer/model';

export function createDrawerGuard(router: Router) {
  router.afterEach((to) => {
    const drawerStore = useDrawerStore();

    if (to.meta.drawer) drawerStore.configure(to.meta.drawer);

    if (drawerStore.isOpen) drawerStore.close();
  });
}
