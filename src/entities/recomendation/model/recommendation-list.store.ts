import { AxiosError } from 'axios';
import { fetchGetRecommendationsList } from '@entities/recomendation/api';
import { defineListStore } from '@shared/lib/store';

export const useRecommendationListStore = defineListStore({
  id: 'recommendation-list',
  fetcher: async () => {
    const response = await fetchGetRecommendationsList();

    if (!response.data) return [];

    if (response instanceof AxiosError) return [];

    return response.data;
  },
});
