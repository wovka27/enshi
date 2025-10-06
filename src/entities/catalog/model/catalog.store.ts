import { defineStore } from 'pinia';
import catalogService from '@entities/catalog/model/catalog.service.ts';
import type { ICatalog, ICatalogMeta, ICatalogRequestMeta } from '@entities/catalog/model/catalog.types.ts';

interface CatalogState {
  data: ICatalog['data'];
  meta: ICatalogMeta;
}

export const useCatalogStore = defineStore('catalog', {
  state: (): CatalogState => ({
    meta: {} as ICatalogMeta,
    data: [],
  }),
  actions: {
    setMetaProperty(key: keyof ICatalogMeta, value: Required<ICatalogMeta[typeof key]>) {
      this.meta = { ...this.meta, [key]: value };
    },
    setMeta(meta: ICatalogMeta) {
      this.meta = meta;
    },
    setData(data: ICatalog['data']) {
      this.data = data;
    },

    async getData(meta?: ICatalogRequestMeta) {
      const response = await catalogService.getData(meta);

      this.setData(response.data);
      this.setMeta(response.meta);
    },
  },
});
