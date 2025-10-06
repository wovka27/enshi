import animeRandomService from '@entities/anime-random/model/anime-random.service.ts';
import type { IRandomAnime } from '@entities/anime-random/model/anime-random.types.ts';
import { defineListStore } from '@shared/lib/store';

export const useAnimeRandomStore = defineListStore<IRandomAnime>({
  id: 'anime-random',
  fetcher: animeRandomService.getData,
});
