import { defineStore } from 'pinia';

interface ListStoreOptions<T> {
  id: number;
  fetcher: (id?: string) => Promise<T[]>;
}

interface State<T> {
  list: T[];
  isLoading: boolean;
}

export function defineListStore<T>({ id, fetcher }: ListStoreOptions<T>) {
  return defineStore(id, {
    state: (): State<T> => ({
      list: [],
      isLoading: false,
    }),
    actions: {
      async getData(id?: string) {
        if (this.list.length && !id) return;

        this.isLoading = true;

        try {
          this.list = await fetcher(id);
        } catch (e) {
          return this.list;
        } finally {
          this.isLoading = false;
        }
      },
    },
  });
}
