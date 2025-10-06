import { fetchGetDependentList } from '@entities/anime-dependent/api';
import type { IDependentAnimeListItem } from '@entities/anime-dependent/model/anime-dependent.types.ts';
import { defineListStore } from '@shared/lib/store';

export const useAnimeDependentStore = defineListStore<IDependentAnimeListItem>({
  id: 'anime-dependent',
  fetcher: async (id) => {
    try {
      const response = await fetchGetDependentList(id!);

      if (!response.data) return [];

      return response.data;
    } catch {
      return [];
    }
  },
});
