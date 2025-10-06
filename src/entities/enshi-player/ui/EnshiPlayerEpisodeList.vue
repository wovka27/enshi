<script setup lang="ts">
  import type { IEnshiPlayerEpisodeListProps } from '@entities/enshi-player/model/types.ts';
  import EnshiPlayerEpisode from '@entities/enshi-player/ui/EnshiPlayerEpisode.vue';

  defineProps<IEnshiPlayerEpisodeListProps>();

  const selectedEpisode = defineModel<object>({
    default: null,
  });
</script>

<template>
  <div
    v-if="episodes.length"
    v-grab-scroll
    class="EnshiPlayerEpisodeList"
  >
    <EnshiPlayerEpisode
      v-for="(item, idx) of episodes"
      :key="item.series_number"
      :episode_number="item.series_number"
      :episode_poster="item.poster_url"
      :not_viewed="selectedEpisode?.series_number !== item.series_number"
      :is_active="selectedEpisode?.series_number === item.series_number"
      @click="selectedEpisode = item"
    />
  </div>
</template>

<style lang="scss">
  .EnshiPlayerEpisodeList {
    overflow-x: auto;
    display: flex;
    gap: fluid(24, 16);
    @include hide-scroll();
  }
</style>
