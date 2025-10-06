import type { NavigationGuard } from 'vue-router';
import { useAnimeDependentStore } from '@entities/anime-dependent/model';
import { useAnimeDetailStore } from '@entities/anime-detail/model';
import { useAnimeSimilarStore } from '@entities/anime-similar/model';

export const createAnimeDetailGuard: NavigationGuard = async (to) => {
  const animeDetailStore = useAnimeDetailStore();
  const animeDependentStore = useAnimeDependentStore();
  const animeSimilarStore = useAnimeSimilarStore();

  const id = to.params.id as string;

  animeDetailStore.$reset();
  await Promise.all([
    await animeDetailStore.getData(id),
    animeDependentStore.getData(id),
    animeSimilarStore.getData(id),
    animeDetailStore.getComments(id),
    animeDetailStore.checkFavorite(),
    animeDetailStore.showEstimation(),
  ]);

  return true;
};
