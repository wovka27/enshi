import { fetchGetMainBanner } from '@entities/anime-banner/api';
import type { IAnimeBannerSlide } from '@entities/anime-banner/model/anime-banner.types.ts';
import { defineListStore } from '@shared/lib/store';

export const useAnimeBannerStore = defineListStore<IAnimeBannerSlide>({
  id: 'anime-banner',
  fetcher: async () => {
    const response = await fetchGetMainBanner();

    return response.data!;
  },
});
