<script setup lang="ts">
  import AnimeCardCarousel from '@features/anime-card-carousel';
  import { useNewSeriesStore } from '@entities/new-series/model/new-series.store.ts';

  const newSeriesStore = useNewSeriesStore();

  newSeriesStore.getData();
</script>

<template>
  <AnimeCardCarousel
    id="new-series"
    title="Новые серии"
    :data="newSeriesStore.list"
  />
</template>
