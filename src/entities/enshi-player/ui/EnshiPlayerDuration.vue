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
    font-size: 21px;
    font-weight: var(--font-weight-500);

    @include mobile-s {
      display: none;
    }
  }
</style>
