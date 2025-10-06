<script setup lang="ts">
  import ReleaseToday from '@features/release-today';
  import AnimeBanner from '@entities/anime-banner';
  import AnimeRandom from '@entities/anime-random/ui/AnimeRandom.vue';
  import LastComments from '@entities/last-comment/ui';
  import NewSeries from '@entities/new-series/ui';
  import RecommendationList from '@entities/recomendation/ui';
  import List from '@entities/watch-anime/ui/List.vue';
</script>

<template>
  <AnimeBanner />
  <NewSeries />
  <ReleaseToday />
  <RecommendationList />
  <AnimeRandom />
  <List />
  <LastComments />
</template>
