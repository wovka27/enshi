import { onBeforeUnmount, onMounted, ref } from 'vue';

export const useHideAppHeader = () => {
  const isHidden = ref(false);
  let lastScrollY = 0;

  const handleScroll = () => {
    const currentY = window.scrollY;

    isHidden.value = currentY > lastScrollY && currentY > 50;

    lastScrollY = currentY;
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return { isHidden };
};
