import type { NavigationGuard } from 'vue-router';
import { useCatalogStore } from '@entities/catalog/model';
import QueryHelper from '@shared/lib/utils/QueryHelper.ts';

export const createCatalogGuard: NavigationGuard = async (to) => {
  const catalogStore = useCatalogStore();

  await catalogStore.getData(QueryHelper.flatten(to.query));
  return true;
};
