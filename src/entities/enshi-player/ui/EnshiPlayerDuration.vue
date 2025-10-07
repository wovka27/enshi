<script setup lang="ts">
  import { computed } from 'vue';
  import { useVideoStore } from '@entities/enshi-player/model/enshi-player.store.ts';
  import { formatDuration } from '@shared/lib/utils';

  const store = useVideoStore();
  const duration = computed(() => `${formatDuration(store.currentTime)}/${formatDuration(store.duration)}`);
</script>

<template>
  <p class="EnshiPlayerDuration">{{ duration }}</p>
</template>

<style lang="scss">
  .EnshiPlayerDuration {
    font-size: fluid(21, 14);
    font-weight: var(--font-weight-500);
  }
</style>
