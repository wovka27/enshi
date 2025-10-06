import { onMounted, onUnmounted, ref } from 'vue';

export const useMatchMedia = (
  query: string,
  handleMedia: Parameters<ReturnType<typeof matchMedia>['addEventListener']>[1]
) => {
  const mql = ref<ReturnType<typeof matchMedia> | null>(null);

  onMounted(() => {
    mql.value = matchMedia(query);
    mql.value.addEventListener('change', handleMedia);
  });

  onUnmounted(() => {
    if (!mql.value) return;
    mql.value.removeEventListener('change', handleMedia);
  });
};
