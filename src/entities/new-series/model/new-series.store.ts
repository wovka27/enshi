import { AxiosError } from 'axios';
import { fetchGetNewSeries } from '@entities/new-series/api';
import type { INewSeriesListItem } from '@entities/new-series/model/new-series.types.ts';
import { defineListStore } from '@shared/lib/store';

export const useNewSeriesStore = defineListStore<INewSeriesListItem>({
  id: 'new-series',
  fetcher: async () => {
    const response = await fetchGetNewSeries();

    if (!response.data) return [];

    if (response instanceof AxiosError) return [];

    return response.data;
  },
});
