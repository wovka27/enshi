<script setup lang="ts">
  import AnimeCard from '@entities/anime-card';
  import type { IAnimeCardProps } from '@entities/anime-card/model';

  interface IAnimeCardListProps {
    data: IAnimeCardProps[];
  }

  defineProps<IAnimeCardListProps>();
</script>

<template>
  <AnimeCard
    v-for="item of data"
    :key="item.id"
    :data="item"
  />
</template>
