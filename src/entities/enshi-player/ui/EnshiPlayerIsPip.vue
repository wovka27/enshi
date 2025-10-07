<script setup lang="ts">
  import { useVideoStore } from '@entities/enshi-player/model/enshi-player.store.ts';

  const store = useVideoStore();
  defineEmits<{
    (event: 'toggle'): void;
  }>();
</script>

<template>
  <button
    class="EnshiPlayer-controls__btn EnshiPlayer-controls__btn--pip hidden-mobile-s"
    @click="$emit('toggle')"
  >
    <UiIcon :name="store.isPip ? 'pip-off' : 'pip-on'" />
  </button>
</template>

<style lang="scss">
  .EnshiPlayer-controls__btn--pip {
    @include mobile-s {
      display: none;
    }
  }
</style>
