<script setup lang="ts">
  import { computed, watch, ref, onMounted, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  interface Props {
    total?: number;
    initial?: number;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: 'set-page', page: number): void;
  }>();

  const route = useRoute();
  const router = useRouter();

  const page = ref(Number(props.initial) || Number(route.query.page) || 1);

  watch(
    () => route.query.page,
    (val) => {
      if (val) page.value = Number(val);
    }
  );

  const width = ref(window.innerWidth);
  function updateWidth() {
    width.value = window.innerWidth;
  }
  onMounted(() => window.addEventListener('resize', updateWidth));
  onUnmounted(() => window.removeEventListener('resize', updateWidth));

  const delta = computed(() => {
    if (width.value < 480) return 1;
    if (width.value < 768) return 1;
    return 2;
  });

  function goTo(p: number) {
    if (p < 1 || p > props.total) return;
    page.value = p;
    emit('set-page', p);

    router.replace({
      query: {
        ...route.query,
        page: String(p),
      },
    });
  }

  const pages = computed(() => {
    const total = props.total;
    const current = page.value;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta.value && i <= current + delta.value)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l !== undefined) {
        if (Number(i) - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (Number(i) - l > 2) {
          rangeWithDots.push('…');
        }
      }
      rangeWithDots.push(i);
      l = Number(i);
    }

    return rangeWithDots;
  });
</script>

<template>
  <nav class="pagination">
    <button
      class="pagination__arrow"
      :disabled="page === 1"
      @click="goTo(page - 1)"
    >
      <UiIcon
        :width="24"
        name="arrow-left"
      />
    </button>

    <button
      v-for="p in pages"
      :key="p"
      class="pagination__item"
      :class="{ 'pagination__item--active': p === page, pagination__dots: p === '…' }"
      :disabled="p === '…'"
      @click="p !== '…' && goTo(Number(p))"
    >
      {{ p }}
    </button>

    <button
      class="pagination__arrow"
      :disabled="page === total"
      @click="goTo(page + 1)"
    >
      <UiIcon
        :width="24"
        name="arrow-right"
      />
    </button>
  </nav>
</template>

<style lang="scss">
  .pagination {
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: sans-serif;
    color: #fff;
    flex-wrap: wrap;
  }

  .pagination__item {
    padding: 6px 10px;
    border-radius: 6px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    font-size: 14px;
    color: #fff;

    &:not(.pagination__item--active) {
      color: var(--theme-text);
    }
  }

  .pagination__item:hover:not(.pagination__item--active):not(.pagination__dots) {
    background: rgba(255, 255, 255, 0.1);
  }

  .pagination__item--active {
    background: #8854d0;
    font-weight: bold;
  }

  .pagination__dots {
    cursor: default;
    opacity: 0.6;
  }

  .pagination__arrow {
    background: transparent;
    border: none;
    color: var(--theme-text);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination__arrow:disabled {
    opacity: 0.4;
    cursor: default;
  }

  @include mobile {
    .pagination__item {
      padding: 4px 6px;
      font-size: 12px;
    }
  }
</style>
