import { defineStore } from 'pinia';
import { fetchGetList } from '@entities/watch-anime/api';

export const useListStore = defineStore('list', {
  state: () => ({
    list: [],
  }),
  actions: {
    async getData(type: 'popular' | 'new' = 'popular') {
      this.list = await fetchGetList(type);
    },
  },
});
