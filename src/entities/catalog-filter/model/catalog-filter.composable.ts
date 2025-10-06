import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import QueryHelper from '@shared/lib/utils/QueryHelper.ts';

const getInitialState = () => ({
  genres: [],
  statuses: [],
  years: [],
});

export const useCatalogFilter = () => {
  const router = useRouter();

  const filters = reactive(getInitialState());

  const reset = () => {
    Object.assign(filters, getInitialState());
    save();
  };

  const save = () => {
    router.push({ query: QueryHelper.toQueryRecord(QueryHelper.flatten(filters)) });
  };

  watch(
    () => router.currentRoute.value.query,
    (v) => {
      Object.assign(filters, QueryHelper.flatten(v));
    },
    { immediate: true }
  );

  return {
    filters,
    reset,
    save,
  };
};
