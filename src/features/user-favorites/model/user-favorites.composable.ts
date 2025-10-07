import { useUserStore } from '@entities/user/model';

export const useUserFavorites = () => {
  const userStore = useUserStore();

  return {
    isAuthUser: userStore.isAuthUser,
    favoriteAnimeList: userStore.favoriteAnimeList,
  };
};
