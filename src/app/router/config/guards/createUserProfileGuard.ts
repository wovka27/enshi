import type { NavigationGuard } from 'vue-router';
import { useUserStore } from '@entities/user/model';

export const createUserProfileGuard: NavigationGuard = async (to) => {
  const userStore = useUserStore();

  const id = to.params.id as string;

  await Promise.all([await userStore.getData(+id), userStore.getStats(+id), userStore.getFavorites()]);

  return true;
};
