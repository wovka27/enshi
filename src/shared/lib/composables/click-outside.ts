import { onMounted, onBeforeUnmount, ref, type Ref } from 'vue';

export function useClickOutside(callback: (event: MouseEvent | TouchEvent) => void) {
  const $ref: Ref<HTMLElement | null> = ref(null);

  const handler = (event: MouseEvent | TouchEvent) => {
    const el = $ref.value;
    if (!el) return;
    if (event.target instanceof Node && !el.contains(event.target)) {
      callback(event);
    }
  };

  onMounted(() => {
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handler);
    document.removeEventListener('touchstart', handler);
  });

  return $ref;
}
