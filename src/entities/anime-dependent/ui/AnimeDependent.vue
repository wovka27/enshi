<script setup lang="ts">
  import AnimeCardCarousel from '@features/anime-card-carousel';
  import { useAnimeDependentStore } from '@entities/anime-dependent/model';

  const animeDependentStore = useAnimeDependentStore();
</script>

<template>
  <AnimeCardCarousel
    :is-shadow="false"
    title="Связанные релизы"
    :data="animeDependentStore.list"
  />
</template>
