<script setup lang="ts">
  import AnimeCardCarousel from '@features/anime-card-carousel';
  import { useRecommendationListStore } from '@entities/recomendation/model/recommendation-list.store.ts';

  const recommendationListStore = useRecommendationListStore();

  recommendationListStore.getData();
</script>

<template>
  <AnimeCardCarousel
    id="recommendations"
    title="Рекомендации"
    :data="recommendationListStore.list"
  />
</template>
