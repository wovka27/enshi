<script setup lang="ts">
  import AnimeCardCarousel from '@features/anime-card-carousel';
  import { useAnimeSimilarStore } from '@entities/anime-similar/model';

  const animeSimilarStore = useAnimeSimilarStore();
</script>

<template>
  <AnimeCardCarousel
    title="Похожие"
    :data="animeSimilarStore.list"
  />
</template>
