import { fetchGetSimilarList } from '@entities/anime-similar/api';
import type { SimilarAnimeListItem } from '@entities/anime-similar/model';
import { defineListStore } from '@shared/lib/store';

export const useAnimeSimilarStore = defineListStore<SimilarAnimeListItem>({
  id: 'anime-similar',
  fetcher: async (id) => {
    try {
      const response = await fetchGetSimilarList(id!);

      if (!response.data) return [];

      return response.data;
    } catch {
      return [];
    }
  },
});
