import { AxiosError } from 'axios';
import { fetchGetReleaseTodayList } from '@entities/release-today/api';
import type { IReleaseTodayListItem } from '@entities/release-today/model/release-today.types.ts';
import { defineListStore } from '@shared/lib/store';

export const useReleaseTodayStore = defineListStore<IReleaseTodayListItem>({
  id: 'release-today',
  fetcher: async () => {
    const response = await fetchGetReleaseTodayList();

    if (!response.data) return [];

    if (response instanceof AxiosError) return [];

    return response.data;
  },
});
