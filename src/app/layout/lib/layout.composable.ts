import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { layoutResolver } from '@app/config';

export const useLayout = () => {
  const route = useRoute();

  const layout = computed(() => layoutResolver(route.meta.layout as string | boolean));

  return { layout, route };
};
